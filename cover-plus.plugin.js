// cover-plus.plugin.js
(() => {
  const v = document.getElementById('v');
  const bg = document.getElementById('bgArt');
  const coverImg = document.getElementById('audioCover');
  if (!v || !bg || !coverImg) return;

  /*** ちょいユーティリティ ***/
  const store = {
    get(k,d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d }catch{ return d } },
    set(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)) }catch{} }
  };
  const cacheKey = 'pc.cover.cache';                 // { key -> dataURL(or http url) }
  const coverCache = store.get(cacheKey, {});        // ほどほどのサイズで
  const isYT = u => /(?:youtube\.com|youtu\.be)\//i.test(u||'');
  const ytId = u => { try{
    const x = new URL(u, location.href);
    if (x.hostname.includes('youtu.be')) return x.pathname.slice(1);
    return x.searchParams.get('v') || (x.pathname.match(/\/embed\/([\w-]+)/)||[])[1] || null;
  }catch{ return null } };
  const isNico = u => /nicovideo\.jp\/watch\//i.test(u||'');
  const nicoId = u => { try{ const x=new URL(u,location.href); return (x.pathname.split('/').pop()||'').replace(/^sm/,''); }catch{ return null } };
  const isSC = u => /soundcloud\.com\//i.test(u||'');

  function setBG(url){
    if(!url) return;
    bg.style.backgroundImage = `url("${url}")`;
    bg.classList.add('show');
  }
  function setCover(url){
    if(!url) return;
    // audio-only時はカバー画像、動画/埋め込み時も背景を更新
    try { coverImg.src = url; coverImg.style.opacity = '1'; } catch {}
    setBG(url);
  }

  /*** プロバイダのサムネ自動取得 ***/
  async function tryProviderThumb(current){
    try{
      if (!current) return false;

      // キャッシュ命
      const key = keyOfCurrent();
      if (coverCache[key]) { setCover(coverCache[key]); return true; }

      // YouTube
      if (isYT(current)){
        const id = ytId(current);
        if (id){
          // i.ytimg はCORS不要で <img> 読める
          const url = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
          coverCache[key] = url; store.set(cacheKey, coverCache);
          setCover(url); return true;
        }
      }

      // ニコ動（静的サムネ: だいたいこれで行ける）
      if (isNico(current)){
        const id = (current.match(/watch\/(sm?\d+)/)||[])[1];
        if (id){
          const num = id.replace(/^sm/,'');
          const url = `https://tn.smilevideo.jp/smile?i=${num}`;
          coverCache[key] = url; store.set(cacheKey, coverCache);
          setCover(url); return true;
        }
      }

      // SoundCloud: oEmbed（CORS許可されてるはず）
      if (isSC(current)){
        const res = await fetch(`https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(current)}`);
        if (res.ok){
          const data = await res.json();
          if (data.thumbnail_url){
            coverCache[key] = data.thumbnail_url; store.set(cacheKey, coverCache);
            setCover(data.thumbnail_url); return true;
          }
        }
      }
    }catch{}
    return false;
  }

  /*** 手動でカバーを当てるUI（拡張タブに追加） ***/
  function pickGrid(){
    return document.querySelector('#settings .settings-panels [data-tab-panel="ext"]')
        || document.querySelector('#settings .settings-grid');
  }
  function keyOfCurrent(){
    // ローカルblobは currentSrc が blob: になる → タイトル（ファイル名相当）でキーにする
    const src = v.currentSrc || '';
    if (src.startsWith('blob:')){
      // タイトルUIが空なら src の末尾だけ
      const title = (document.getElementById('audioTitle')?.textContent||'').trim();
      return title || (src.split('/').pop() || src);
    }
    return src;
  }

  function buildUI(){
    const grid = pickGrid(); if(!grid) return;
    if (grid.querySelector('.settings-section[data-cover-plus]')) return;

    const sec = document.createElement('div');
    sec.className = 'settings-section';
    sec.dataset.coverPlus = '1';
    sec.innerHTML = `
      <h4>カバー画像（自動補完＋手動割り当て）</h4>
      <div class="row">
        <button class="btn" id="cpTryProvider">提供元サムネを取得</button>
        <span class="badge">YouTube / ニコ動 / SoundCloud</span>
      </div>
      <div class="row">
        <input type="file" id="cpFile" accept="image/*">
        <button class="btn ok" id="cpApply">このメディアに適用</button>
        <label class="switch" style="margin-left:.4rem">
          <input type="checkbox" id="cpRemember" checked>
          <label for="cpRemember">記憶して次回も使う</label>
        </label>
      </div>
      <div class="row"><button class="btn ghost" id="cpForget">このメディアのカバーを忘れる</button></div>
    `;
    grid.appendChild(sec);

    const $ = s => sec.querySelector(s);
    $('#cpTryProvider').onclick = async ()=>{
      const ok = await tryProviderThumb(v.currentSrc || '');
      (window.toast||console.log)(ok?'サムネ取得': '取得できませんでした');
    };
    $('#cpApply').onclick = async ()=>{
      const f = $('#cpFile').files?.[0];
      if (!f) return (window.toast||console.log)('画像ファイルを選んでね','warn');
      const url = URL.createObjectURL(f);
      setCover(url);
      if ($('#cpRemember').checked){
        coverCache[keyOfCurrent()] = url;
        store.set(cacheKey, coverCache);
      }
    };
    $('#cpForget').onclick = ()=>{
      const k = keyOfCurrent();
      if (coverCache[k]){ delete coverCache[k]; store.set(cacheKey, coverCache); }
      (window.toast||console.log)('保存済みカバーを削除');
    };
  }

  // 設定を開いたときにUIを差し込む
  document.getElementById('btnSettings')?.addEventListener('click', () => setTimeout(buildUI, 0), { once:true });
  window.addEventListener('load', () => setTimeout(buildUI, 300));

  /*** 変化を監視してサムネを補完 ***/
  // 1) メディアソースが切り替わったら：埋め込みサムネを試す／キャッシュ反映
  function onSourceMaybeChanged(){
    const k = keyOfCurrent();
    if (coverCache[k]) { setCover(coverCache[k]); return; }
    // 埋め込み系なら自動で試す
    tryProviderThumb(v.currentSrc||'');
  }
  v.addEventListener('loadedmetadata', onSourceMaybeChanged);
  v.addEventListener('play', onSourceMaybeChanged);

  // 2) 埋め込み（YouTube/ニコ/SC）のiframe追加を監視
  const wrap = document.getElementById('playerWrap');
  const mo = new MutationObserver(()=> {
    // 追加されたiframeのsrcを見る
    const ifr = wrap.querySelector('iframe');
    const src = ifr?.src || '';
    if (src) { tryProviderThumb(src); }
    // YT Iframe APIの #yt でもサムネ試行（currentSrcは空なので）
    const yt = wrap.querySelector('#yt');
    if (yt) { tryProviderThumb(location.href); } // IDは取れないが背景は直前URLからの推定でOK
  });
  mo.observe(wrap, { childList:true, subtree:true });

  /*** フォールバック検知：仮アイコンが当たったら差し替えを試す ***/
  const svgStubPrefix = 'data:image/svg+xml';
  coverImg.addEventListener('load', ()=>{
    try{
      const isFallback = (coverImg.src||'').startsWith(svgStubPrefix);
      if (isFallback) {
        const k = keyOfCurrent();
        if (coverCache[k]) setCover(coverCache[k]);
        else tryProviderThumb(v.currentSrc||'');
      }
    }catch{}
  });
})();
