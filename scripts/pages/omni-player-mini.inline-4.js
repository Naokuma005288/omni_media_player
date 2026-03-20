(function(){
  const $=sel=>document.querySelector(sel);
  const v=$('#v'), wrap=$('#wrap'), ctrl=$('#ctrl'), seekWrap=$('#seekWrap'), seekEl=$('#seek'), seekTip=$('#seekTip');
  const tap=$('#tap'), tapBtn=$('#tapBtn'), dropHint=$('#dropHint');
  const MOBILE_NATIVE_MODE = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const IOS_WEBKIT = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const SAFE_NATIVE_PLAYBACK = true;
  const orientationMql = window.matchMedia ? window.matchMedia('(orientation: portrait)') : null;
  v.playsInline = true;
  v.setAttribute('playsinline','');
  v.setAttribute('webkit-playsinline','');
  function applyOrientationUi(){
    const portrait = orientationMql ? orientationMql.matches : window.innerHeight >= window.innerWidth;
    document.body.classList.toggle('mini-portrait', portrait);
    document.body.classList.toggle('mini-landscape', !portrait);
    document.body.dataset.orientation = portrait ? 'portrait' : 'landscape';
  }
  applyOrientationUi();
  if(orientationMql){
    const onOrientationChange = ()=>applyOrientationUi();
    if(typeof orientationMql.addEventListener === 'function') orientationMql.addEventListener('change', onOrientationChange);
    else if(typeof orientationMql.addListener === 'function') orientationMql.addListener(onOrientationChange);
  }
  window.addEventListener('resize', applyOrientationUi, { passive:true });

  // i18n
  const I={ ja:{ btn_play:'再生/一時停止', btn_back:'-10秒', btn_fwd:'+10秒', btn_prev:'前へ', btn_next:'次へ', btn_mute:'ミュート',
    btn_tips:'Tips', btn_settings:'設定', btn_loop:'ループ', btn_pip:'PiP', btn_fs:'全画面', close_btn:'閉じる (Esc)',
    btn_more:'詳細設定を表示', btn_less:'詳細設定を閉じる', mini_note:'mini は最小構成で表示中。詳細設定は必要時のみ開けます。',
    label_volume:'音量', label_rate:'速度', label_sleep:'タイマー',
    meta_now:'NOW PLAYING', meta_no_media:'メディア未読み込み', meta_source_idle:'待機', meta_source_local:'ローカル', meta_source_hls:'HLS', meta_source_url:'URL',
    meta_kind_audio:'音声', meta_kind_video:'動画', meta_kind_stream:'ストリーム', meta_kind_media:'メディア', meta_queue_single:'単体',
    sleep_off:'OFF',
    settings_title:'設定', source_title:'ソース', open_btn:'開く',
    fx_title:'アニメーションFX', fx_preset:'プリセット', fx_minimal:'Minimal', fx_glow:'Glow', fx_neon:'Neon', fx_clean:'Clean',
    tips_title:'Tips / ショートカット',
    tips:[ ['Space','再生/一時停止','←/→','10秒移動'], ['0..9','位置ジャンプ(%)','[ / ]','速度 ±1段階'],
           ['F','フルスクリーン','P','PiP'], ['M','ミュート','D','自動非表示 ON/OFF'],
           ['S','スクショPNG保存','A/B/L','ABループ 設定/設定/切替'], [', / .','前 / 次（Altで前後フレーム）','',''] ],
    badge_idle:'IDLE', badge_ready:'READY', badge_play:'再生', badge_pause:'一時停止', badge_muted:'ミュート',
    badge_play_loop:'再生・ループ', badge_pause_loop:'一時停止・ループ', badge_resume:'レジューム', badge_shot:'保存', badge_safe:'SAFE', badge_end:'終了'
  }, en:{ btn_play:'Play/Pause', btn_back:'-10s', btn_fwd:'+10s', btn_prev:'Prev', btn_next:'Next', btn_mute:'Mute',
    btn_tips:'Tips', btn_settings:'Settings', btn_loop:'Loop', btn_pip:'PiP', btn_fs:'Fullscreen', close_btn:'Close (Esc)',
    btn_more:'Show advanced', btn_less:'Hide advanced', mini_note:'mini starts in core mode. Open advanced settings only when needed.',
    label_volume:'Vol', label_rate:'Speed', label_sleep:'Sleep',
    meta_now:'NOW PLAYING', meta_no_media:'No media loaded', meta_source_idle:'IDLE', meta_source_local:'LOCAL', meta_source_hls:'HLS', meta_source_url:'URL',
    meta_kind_audio:'AUDIO', meta_kind_video:'VIDEO', meta_kind_stream:'STREAM', meta_kind_media:'MEDIA', meta_queue_single:'Single',
    sleep_off:'OFF',
    settings_title:'Settings', source_title:'Source', open_btn:'Open',
    fx_title:'Animation FX', fx_preset:'Preset', fx_minimal:'Minimal', fx_glow:'Glow', fx_neon:'Neon', fx_clean:'Clean',
    tips_title:'Tips / Shortcuts',
    tips:[ ['Space','Play/Pause','Left/Right','Seek 10s'], ['0..9','Jump (%)','[ / ]','Speed ±1 step'],
           ['F','Fullscreen','P','PiP'], ['M','Mute','D','Auto-hide toggle'],
           ['S','Save PNG','A/B/L','AB loop Set/Set/Toggle'], [', / .','Prev / Next (Alt=frame)','',''] ],
    badge_idle:'IDLE', badge_ready:'READY', badge_play:'PLAY', badge_pause:'PAUSE', badge_muted:'MUTED',
    badge_play_loop:'PLAY • LOOP', badge_pause_loop:'PAUSE • LOOP', badge_resume:'RESUME', badge_shot:'SHOT', badge_safe:'SAFE', badge_end:'ENDED'
  }};
  function getLang(){ try{ const pref=localStorage.getItem('pc.lang'); if(pref) return pref; return (navigator.language||'ja').toLowerCase().startsWith('ja')?'ja':'en'; }catch{return 'ja'} }
  let LANG=getLang(); const t=(k)=> (I[LANG]&&I[LANG][k]) || (I.ja[k]||k);
  function applyLang(){
    document.documentElement.lang=LANG; document.documentElement.setAttribute('data-lang',LANG);
    document.querySelectorAll('[data-i18n]').forEach(el=>{ const key=el.getAttribute('data-i18n'); const txt=t(key); if(txt) el.textContent=txt; });
    $('#settingsTitle').textContent=t('settings_title'); $('#tipsTitle').textContent=t('tips_title');
    $('#miniModeNote').textContent=t('mini_note');
    $('#source_note').textContent=(LANG==='ja')
      ? 'mini はローカル/HLS の軽量再生向け。file:// OK（CORS制限のあるURLは不可）'
      : 'mini is optimized for lightweight local/HLS playback. Local file:// OK (CORS-limited URLs not supported).';
    updateMiniAdvancedUi();
    renderTips();
    updateMiniMeta();
    updateMiniReadouts();
    maybeShowResumeButton();
    syncBadgeState();
  }
  function renderTips(){
    const tips = (I[LANG] || I.ja).tips, body=$('#tipsBody'); body.innerHTML='';
    for(const row of tips){
      const div=document.createElement('div'); div.className='kbd';
      const [a1,a2,b1,b2]=row;
      const p1=document.createElement('p'); p1.innerHTML= a1? `<kbd>${a1}</kbd> ${a2||''}` : (a2||''); div.appendChild(p1);
      if(b1||b2){ const p2=document.createElement('p'); p2.innerHTML=b1? `<kbd>${b1}</kbd> ${b2||''}` : (b2||''); div.appendChild(p2); }
      body.appendChild(div);
    }
  }
  $('#btnLang').addEventListener('click',()=>{ LANG=(LANG==='ja'?'en':'ja'); try{ localStorage.setItem('pc.lang',LANG);}catch{} applyLang(); });

  const setBadge=(txt)=> $('#badgeState').textContent=txt;
  let playProbeTimer = 0;
  function debugLog(stage, detail=''){}
  function debugStack(stage){}
  function mediaErrText(){
    const err=v?.error;
    return err ? `code=${err.code}` : 'no-media-error';
  }
  function schedulePlayProbe(tag){
    clearTimeout(playProbeTimer);
    const t0 = v.currentTime || 0;
    playProbeTimer = setTimeout(()=>{
      debugLog('play-probe', `${tag} paused=${v.paused?'1':'0'} ready=${v.readyState} net=${v.networkState} t0=${t0.toFixed(3)} t1=${(v.currentTime||0).toFixed(3)}`);
    }, 1200);
  }
  const originalPause = v.pause.bind(v);
  v.pause = function(...args){
    debugStack('pause-call');
    return originalPause(...args);
  };

  // ===== Mobile Unlock =====
  async function unlockAudio(){ markUserGesture(); await ensureAudioOn(); tap.classList.add('hide'); S.ignorePauseUntil = Date.now() + 900; }
  tapBtn.addEventListener('click', async (e)=>{ e.preventDefault(); e.stopPropagation(); await unlockAudio(); try{ await requestPlayImmediate('tap'); }catch{} });
  tap.addEventListener('click', async (e)=>{ e.preventDefault(); e.stopPropagation(); await unlockAudio(); });

  // ===== State =====
  const S={ dragging:false, duration:0, subOffset:0, subTrack:null, _hls:null,
    lastUrl:null, lastBlobUrl:null, autoHide:true, autoHideMs:3000, autoHideTimer:null,
    fileList:[], fileIndex:0, wakeLock:null, loopA:null, loopB:null, loopOn:false, loopWholePending:false,
    lastTap:0, lastTapX:0, sleepLeft:0, sleepTimer:null, watchTimers:[], ignorePauseUntil:0,
    triedOnce:false, lastUserGestureAt:0, playDesired:false, playToken:0, playDebounce:null,
    mediaMeta:null, mediaArtwork:[], artworkObjectUrls:[], artworkMimeMap:{}, artworkToken:0, bgAudio:null, bgMirror:false, bgSwitching:false, bgPrimedSrc:'', audioMaster:false, hiddenResumeBudget:0,
    // 追加: 設定の永続化領域
    sub:{ enable: loadBool('pc.sub.enable', true), plate: loadBool('pc.sub.plate', false), color: loadStr('pc.sub.color','#FFFFFF'), size: loadNum('pc.sub.size',28), outline: loadNum('pc.sub.outline',3), margin: loadNum('pc.sub.margin',30) },
    anim:{ micro: loadBool('pc.anim.micro', true), seek: loadBool('pc.anim.seek', true), play: loadBool('pc.anim.play', true), pip: loadBool('pc.anim.pip', true) },
    learn:{ auto: loadBool('pc.learn.auto', true), dict: loadJSON('pc.learn.dict', {}) }
  };
  let miniAdvanced = loadBool('pc.mini.advanced', false);
  function loadStr(k,def){ try{ const v=localStorage.getItem(k); return v!=null?v:def }catch{ return def } }
  function loadNum(k,def){ try{ const n=parseFloat(localStorage.getItem(k)||'NaN'); return isFinite(n)?n:def }catch{ return def } }
  function loadBool(k,def){ try{ const s=localStorage.getItem(k); if(s==null) return def; return s!=='0' }catch{ return def } }
  function loadJSON(k,def){ try{ const v=JSON.parse(localStorage.getItem(k)||'null'); return v==null?def:v }catch{ return def } }
  function save(k,v){ try{ if(typeof v==='object') localStorage.setItem(k, JSON.stringify(v)); else localStorage.setItem(k, String(v)); }catch{} }
  function updateMiniAdvancedUi(){
    document.querySelectorAll('.mini-advanced').forEach(el=>{ el.hidden = !miniAdvanced; });
    const btn = $('#btnMiniAdvanced');
    if(btn) btn.textContent = miniAdvanced ? t('btn_less') : t('btn_more');
  }

  const clamp=(x,a,b)=>Math.min(b,Math.max(a,x));
  const fmt=(t)=>{ if(!isFinite(t)||t<0) return '0:00'; const s=Math.floor(t%60).toString().padStart(2,'0'); const m=Math.floor(t/60); if(m>=60){ const h=Math.floor(m/60), mm=(m%60).toString().padStart(2,'0'); return `${h}:${mm}:${s}` } return `${m}:${s}`; };
  const fmtRemain=(sec)=>{ if(!isFinite(sec)||sec<=0) return t('sleep_off'); const m=Math.floor(sec/60).toString(); const s=Math.floor(sec%60).toString().padStart(2,'0'); return `${m}:${s}`; };
  function currentBaseBadge(){
    if(activeMedia().muted) return t('badge_muted');
    return activePaused() ? (S.loopOn? t('badge_pause_loop'): t('badge_pause')) : (S.loopOn? t('badge_play_loop'): t('badge_play'));
  }
  function syncBadgeState(){ setBadge(S.sleepLeft>0 ? `${currentBaseBadge()} • ${fmtRemain(S.sleepLeft)}` : currentBaseBadge()); }
  function currentDisplayTitle(){
    if(S.fileList.length && S.fileIndex>=0 && S.fileList[S.fileIndex]) return S.fileList[S.fileIndex].name || t('meta_no_media');
    const u = S.lastUrl || '';
    if(!u) return t('meta_no_media');
    try{
      const parsed = new URL(u, location.href);
      const tail = decodeURIComponent((parsed.pathname||'').split('/').pop() || '');
      return tail || parsed.hostname || u;
    }catch{
      return decodeURIComponent(u.split('/').pop() || u);
    }
  }
  function currentSourceKind(){
    if(S.fileList.length && S.fileList[S.fileIndex]) return t('meta_source_local');
    if(!S.lastUrl) return t('meta_source_idle');
    return isHls(S.lastUrl) ? t('meta_source_hls') : t('meta_source_url');
  }
  function currentMediaKind(){
    const file = S.fileList[S.fileIndex];
    const label = `${file?.type || ''} ${file?.name || ''} ${S.lastUrl || ''} ${v.currentSrc || ''}`.toLowerCase();
    if(/audio\/|\.mp3|\.m4a|\.aac|\.wav|\.flac|\.ogg|\.opus/.test(label)) return t('meta_kind_audio');
    if(isHls(S.lastUrl || v.currentSrc || '')) return t('meta_kind_stream');
    if(v.videoWidth > 0 || v.videoHeight > 0 || /video\/|\.mp4|\.webm|\.mov|\.mkv|\.avi|\.m4v/.test(label)) return t('meta_kind_video');
    return t('meta_kind_media');
  }
  function currentQueueState(){
    if(S.fileList.length > 1) return `${S.fileIndex + 1} / ${S.fileList.length}`;
    return t('meta_queue_single');
  }
  function currentDisplaySubline(){
    if(S.mediaMeta?.artist && S.mediaMeta?.album) return `${S.mediaMeta.artist} / ${S.mediaMeta.album}`;
    return S.mediaMeta?.artist || S.mediaMeta?.album || '';
  }
  function artworkTypeFromUrl(url=''){
    const src = String(url || '');
    if(S.artworkMimeMap && S.artworkMimeMap[src]) return S.artworkMimeMap[src];
    const m = src.match(/^data:(image\/[^;]+);/i);
    if(m) return m[1];
    if(/\.png(\?|$)/i.test(src)) return 'image/png';
    if(/\.webp(\?|$)/i.test(src)) return 'image/webp';
    if(/\.gif(\?|$)/i.test(src)) return 'image/gif';
    if(/\.svg(\?|$)/i.test(src)) return 'image/svg+xml';
    return 'image/jpeg';
  }
  function buildArtworkEntries(urls=[]){
    const uniq = [...new Set((urls||[]).filter(Boolean))].slice(0, 6);
    return uniq.map(src=>({ src, sizes:'512x512', type:artworkTypeFromUrl(src) }));
  }
  function makeIconDataUrl(kind='audio'){
    try{
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d', { alpha:false });
      const grad = ctx.createLinearGradient(0, 0, 512, 512);
      grad.addColorStop(0, kind === 'video' ? '#6e7dff' : '#8e5dff');
      grad.addColorStop(1, '#111827');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);
      ctx.fillStyle = 'rgba(255,255,255,.08)';
      ctx.beginPath(); ctx.arc(398, 112, 56, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(118, 404, 84, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.92)';
      if(kind === 'video'){
        ctx.beginPath();
        ctx.roundRect?.(182, 170, 148, 172, 22);
        if(ctx.roundRect) ctx.fill();
        else ctx.fillRect(182, 170, 148, 172);
        ctx.fillStyle = '#111827';
        ctx.beginPath();
        ctx.moveTo(224, 214); ctx.lineTo(320, 256); ctx.lineTo(224, 298);
        ctx.closePath(); ctx.fill();
      }else{
        ctx.beginPath(); ctx.arc(196, 310, 34, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(322, 286, 34, 0, Math.PI * 2); ctx.fill();
        ctx.fillRect(218, 170, 24, 138);
        ctx.save();
        ctx.translate(242, 176);
        ctx.rotate(-0.22);
        ctx.fillRect(0, 0, 118, 24);
        ctx.restore();
      }
      return canvas.toDataURL('image/png');
    }catch{
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9s4N2VQAAAAASUVORK5CYII=';
    }
  }
  function getMetadataLib(){
    return window.musicMetadata || window.musicMetadataBrowser || null;
  }
  async function parseWithJsMediaTags(file){
    const lib = window.jsmediatags;
    if(!lib || !(file instanceof Blob || file instanceof File)) return null;
    return await new Promise((resolve)=>{
      let done = false;
      const finish = (value)=>{ if(done) return; done = true; resolve(value); };
      try{
        lib.read(file, {
          onSuccess: (tag)=>{
            const tags = tag?.tags || {};
            let coverUrl = null;
            if(tags.picture?.data){
              const bytes = tags.picture.data instanceof Uint8Array ? tags.picture.data : new Uint8Array(tags.picture.data);
              coverUrl = bytesToDataUrl(bytes, tags.picture.format || sniffImageMime(bytes));
            }
            finish({
              title: tags.title || file.name || '',
              artist: tags.artist || '',
              album: tags.album || '',
              coverUrl
            });
          },
          onError: ()=>finish(null)
        });
        setTimeout(()=>finish(null), 2500);
      }catch{
        finish(null);
      }
    });
  }
  function sniffImageMime(u8){ if(!u8||!u8.length) return 'image/jpeg'; if(u8[0]===0xFF&&u8[1]===0xD8&&u8[2]===0xFF) return 'image/jpeg'; if(u8[0]===0x89&&u8[1]===0x50&&u8[2]===0x4E&&u8[3]===0x47) return 'image/png'; if(u8[0]===0x47&&u8[1]===0x49&&u8[2]===0x46&&u8[3]===0x38) return 'image/gif'; return 'image/jpeg'; }
  function trackArtworkUrl(url, mime='image/jpeg'){
    if(url && /^blob:/i.test(url)){
      if(!S.artworkObjectUrls.includes(url)) S.artworkObjectUrls.push(url);
      S.artworkMimeMap[url] = mime;
    }
    return url;
  }
  function bytesToObjectUrl(bytes, mime='image/jpeg'){
    try{
      const u8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
      return trackArtworkUrl(URL.createObjectURL(new Blob([u8], { type:mime })), mime);
    }catch{ return null; }
  }
  function bytesToDataUrl(bytes, mime='image/jpeg'){
    try{
      const u8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
      let binary = '';
      const chunk = 0x8000;
      for(let i=0;i<u8.length;i+=chunk) binary += String.fromCharCode(...u8.subarray(i, i+chunk));
      return `data:${mime};base64,${btoa(binary)}`;
    }catch{ return null; }
  }
  async function parseBlobArtwork(blob, name){
    try{
      const lib = getMetadataLib();
      if(!lib) return null;
      let mm = null;
      if(typeof lib.parseBlob === 'function'){
        try{ mm = await lib.parseBlob(blob); }catch{}
      }
      if(!mm && typeof lib.parseBuffer === 'function'){
        const buf = await blob.arrayBuffer();
        mm = await lib.parseBuffer(new Uint8Array(buf), { mimeType: blob.type || undefined, size: blob.size || undefined });
      }
      if(!mm) return null;
      const pic = mm.common?.picture?.[0];
      let coverUrl = null;
      if(pic?.data){
        coverUrl = bytesToDataUrl(pic.data, pic.format || sniffImageMime(pic.data));
      }
      return {
        title: mm.common?.title || name || '',
        artist: mm.common?.artist || mm.common?.artists?.[0] || '',
        album: mm.common?.album || '',
        coverUrl
      };
    }catch{
      return null;
    }
  }
  async function extractId3ApicArtwork(file){
    try{
      const buf = await file.slice(0, 1024 * 1024).arrayBuffer();
      const bytes = new Uint8Array(buf);
      if(bytes[0]!==0x49 || bytes[1]!==0x44 || bytes[2]!==0x33) return null;
      let pos = 10;
      const size = ((bytes[6]&0x7f)<<21) | ((bytes[7]&0x7f)<<14) | ((bytes[8]&0x7f)<<7) | (bytes[9]&0x7f);
      const end = pos + size;
      while(pos + 10 < end){
        const id = String.fromCharCode(bytes[pos], bytes[pos+1], bytes[pos+2], bytes[pos+3]);
        const frameSize = (bytes[pos+4]<<24) | (bytes[pos+5]<<16) | (bytes[pos+6]<<8) | bytes[pos+7];
        if(!id.trim() || frameSize <= 0) break;
        if(id === 'APIC'){
          const frame = bytes.slice(pos + 10, pos + 10 + frameSize);
          let i = 0;
          const encoding = frame[i++];
          let mime = '';
          while(i < frame.length && frame[i] !== 0){ mime += String.fromCharCode(frame[i++]); }
          i++;
          i++;
          if(encoding === 0 || encoding === 3){
            while(i < frame.length && frame[i] !== 0) i++;
            i++;
          }else{
            while(i + 1 < frame.length && !(frame[i]===0 && frame[i+1]===0)) i++;
            i += 2;
          }
          const imgData = frame.slice(i);
          return bytesToDataUrl(imgData, mime || sniffImageMime(imgData));
        }
        pos += 10 + frameSize;
      }
      return null;
    }catch{
      return null;
    }
  }
  async function extractVideoStill(source, atSec=0.08){
    return new Promise((resolve)=>{
      let tmpUrl='';
      let done=false;
      const video=document.createElement('video');
      video.muted=true;
      video.playsInline=true;
      video.preload='metadata';
      const clean=(result=null)=>{
        if(done) return;
        done=true;
        video.pause?.();
        video.removeAttribute('src');
        video.load?.();
        if(tmpUrl){ try{ URL.revokeObjectURL(tmpUrl); }catch{} }
        resolve(result);
      };
      const fail=()=>clean(null);
      const draw=()=>{
        try{
          const vw=video.videoWidth||0, vh=video.videoHeight||0;
          if(!vw || !vh) return fail();
          const scale=Math.min(1, 512/Math.max(vw, vh));
          const w=Math.max(1, Math.round(vw*scale));
          const h=Math.max(1, Math.round(vh*scale));
          const canvas=document.createElement('canvas');
          canvas.width=w; canvas.height=h;
          const ctx=canvas.getContext('2d', { alpha:false });
          ctx.drawImage(video,0,0,w,h);
          clean(canvas.toDataURL('image/jpeg', 0.72));
        }catch{ fail(); }
      };
      video.addEventListener('error', fail, { once:true });
      video.addEventListener('loadeddata', ()=>{
        const dur=Number.isFinite(video.duration)?video.duration:0;
        const target=dur>0 ? Math.min(Math.max(atSec,0), Math.max(0, dur-0.05)) : 0;
        if(target <= 0.001) return setTimeout(draw, 40);
        video.addEventListener('seeked', draw, { once:true });
        try{ video.currentTime = target; }catch{ draw(); }
      }, { once:true });
      if(source instanceof Blob || source instanceof File){
        tmpUrl = URL.createObjectURL(source);
        video.src = tmpUrl;
      }else{
        video.crossOrigin='anonymous';
        video.src = source;
      }
    });
  }
  async function extractVideoArtworkList(source){
    const points=[0.08, 0.22, 0.5, 0.78];
    const urls=[];
    for(const point of points){
      const still = await extractVideoStill(source, point);
      if(still) urls.push(still);
    }
    return [...new Set(urls)];
  }
  function clearMiniArtwork(){
    S.artworkObjectUrls.forEach(url=>{ try{ URL.revokeObjectURL(url); }catch{} });
    S.artworkObjectUrls = [];
    S.artworkMimeMap = {};
    S.mediaArtwork = [];
    S.mediaMeta = null;
    const artWrap = $('#miniArtWrap');
    const art = $('#miniArt');
    art?.removeAttribute('src');
    artWrap?.classList.remove('has-art');
    syncMiniArtworkStage();
  }
  function setMiniArtwork(urls=[]){
    S.mediaArtwork = buildArtworkEntries(urls);
    const first = S.mediaArtwork[0]?.src || '';
    const artWrap = $('#miniArtWrap');
    const art = $('#miniArt');
    if(first){
      art.src = first;
      artWrap?.classList.add('has-art');
    }else{
      art?.removeAttribute('src');
      artWrap?.classList.remove('has-art');
    }
    syncMiniArtworkStage();
  }
  function syncMiniArtworkStage(){
    const stage = $('#miniArtStage');
    const img = $('#miniArtImage');
    if(!stage || !img) return;
    const first = S.mediaArtwork[0]?.src || '';
    const show = !!first;
    if(show){
      img.src = first;
      stage.classList.add('show');
      stage.setAttribute('aria-hidden', 'false');
    }else{
      img.removeAttribute('src');
      stage.classList.remove('show');
      stage.setAttribute('aria-hidden', 'true');
    }
  }
  function updateMiniMeta(){
    const title = $('#nowTitle');
    const source = $('#sourceKind');
    const media = $('#mediaKind');
    const queue = $('#queueState');
    if(title) title.textContent = S.mediaMeta?.title || currentDisplayTitle();
    if(source) source.textContent = currentSourceKind();
    if(media) media.textContent = currentDisplaySubline() || currentMediaKind();
    if(queue) queue.textContent = currentQueueState();
  }
  function activeMedia(){
    return ((S.audioMaster || S.bgMirror) && S.bgAudio) ? S.bgAudio : v;
  }
  function activeCurrentTime(){
    return activeMedia().currentTime || 0;
  }
  function activeDuration(){
    const media = activeMedia();
    return Number.isFinite(media.duration) ? media.duration : (v.duration || 0);
  }
  function activePaused(){
    return !!activeMedia().paused;
  }
  function activePlaybackRate(){
    return activeMedia().playbackRate || v.playbackRate || 1;
  }
  function syncDisplayedVideoToActive(force=false){
    if(!(S.audioMaster && S.bgAudio)) return;
    const current = S.bgAudio.currentTime || 0;
    if(force || Math.abs((v.currentTime || 0) - current) > 0.18){
      try{ v.currentTime = current; }catch{}
    }
  }
  function updateMiniReadouts(){
    $('#volReadout').textContent = `${Math.round(((activeMedia().volume ?? v.volume) || 0) * 100)}%`;
    $('#rateReadout').textContent = `${(parseFloat($('#rateSel').value) || 1).toFixed(2)}x`;
    $('#sleepReadout').textContent = fmtRemain(S.sleepLeft || parseInt($('#sleepSel').value || '0', 10) || 0);
  }
  function currentMediaLabel(){
    const file = S.fileList[S.fileIndex];
    return `${file?.type || ''} ${file?.name || ''} ${S.lastUrl || ''} ${v.currentSrc || ''}`.toLowerCase();
  }
  function isCurrentVideoLike(){
    const label = currentMediaLabel();
    return !!(v.videoWidth > 0 || v.videoHeight > 0 || /video\/|\.mp4|\.webm|\.mov|\.mkv|\.avi|\.m4v|\.mpg|\.mpeg/.test(label));
  }
  function currentBackgroundMirrorSrc(){
    if(isHls(S.lastUrl || v.currentSrc || '')) return null;
    if(!isCurrentVideoLike()) return null;
    if(S.fileList[S.fileIndex] && S.lastBlobUrl) return S.lastBlobUrl;
    const src = v.currentSrc || S.lastUrl || '';
    if(!src) return null;
    if(/^blob:/i.test(src)) return src;
    if(/\.(mp4|webm|mov|mkv|avi|m4v|mpg|mpeg)(\?|$)/i.test(src)) return src;
    return null;
  }
  function shouldUseAudioMaster(){
    return IOS_WEBKIT && !!currentBackgroundMirrorSrc();
  }
  function setAudioMasterMode(enabled){
    S.audioMaster = !!enabled;
    if(S.audioMaster){
      v.muted = true;
      v.volume = 0;
      prepareBgAudioSource(currentBackgroundMirrorSrc());
    }else{
      v.muted = false;
      const vol = +($('#vol')?.value || 0.9) || 0.9;
      v.volume = vol;
    }
  }
  function syncBgAudioFromVideo(){
    if(!S.bgAudio) return;
    try{
      S.bgAudio.volume = v.volume;
      S.bgAudio.muted = v.muted;
      S.bgAudio.playbackRate = v.playbackRate || 1;
    }catch{}
  }
  function setActiveCurrentTime(nextTime){
    const media = activeMedia();
    const dur = Number.isFinite(media.duration) ? media.duration : (v.duration || 0);
    const safe = clamp(nextTime || 0, 0, dur || Number.MAX_SAFE_INTEGER);
    try{ media.currentTime = safe; }catch{}
  }
  function ensureBgAudio(){
    if(S.bgAudio) return S.bgAudio;
    const audio = new Audio();
    audio.preload = 'auto';
    audio.crossOrigin = 'anonymous';
    audio.playsInline = true;
    audio.setAttribute('playsinline', '');
    audio.style.display = 'none';
    audio.addEventListener('play', ()=>{
      if(!S.bgMirror) return;
      syncBadgeState();
      trySetupMediaSession();
    });
    audio.addEventListener('pause', ()=>{
      if(!S.bgMirror || S.bgSwitching) return;
      syncBadgeState();
      trySetupMediaSession();
      if(S.audioMaster && document.hidden && S.playDesired && S.hiddenResumeBudget > 0){
        S.hiddenResumeBudget--;
        setTimeout(()=>{ requestPlayImmediate('audioMaster:hidden-resume').catch(()=>{}); }, 80);
      }
    });
    audio.addEventListener('timeupdate', ()=>{
      if(!(S.bgMirror || S.audioMaster)) return;
      syncDisplayedVideoToActive();
      updateTimes();
      try{
        if('mediaSession' in navigator && typeof navigator.mediaSession.setPositionState === 'function' && Number.isFinite(audio.duration)){
          navigator.mediaSession.setPositionState({ duration:audio.duration || 0, position:audio.currentTime || 0, playbackRate:audio.playbackRate || 1 });
        }
      }catch{}
      if(Number.isFinite(audio.duration) && Math.floor(audio.currentTime)%5===0){
        try{
          localStorage.setItem('pc.lastUrl', S.lastUrl || '');
          localStorage.setItem('pc.lastTime', String(audio.currentTime || 0));
        }catch{}
      }
    });
    audio.addEventListener('ended', ()=>{
      if(!(S.bgMirror || S.audioMaster)) return;
      S.bgMirror = false;
      syncBadgeState();
      trySetupMediaSession();
      try{ v.pause(); }catch{}
      if(S.fileList.length>0 && S.fileIndex<S.fileList.length-1){
        S.fileIndex++;
        openLocalFile(S.fileList[S.fileIndex]);
      }
    });
    document.body.appendChild(audio);
    S.bgAudio = audio;
    return audio;
  }
  function prepareBgAudioSource(src){
    if(!src) return null;
    const audio = ensureBgAudio();
    if(audio.src !== src){
      try{
        audio.src = src;
        audio.load?.();
      }catch{}
    }
    syncBgAudioFromVideo();
    return audio;
  }
  async function primeBgAudioForCurrent(){
    const src = currentBackgroundMirrorSrc();
    if(!src || S.bgPrimedSrc === src) return false;
    const audio = prepareBgAudioSource(src);
    if(!audio) return false;
    try{
      const prevMuted = audio.muted;
      const prevVol = audio.volume;
      audio.muted = true;
      audio.volume = 0;
      if(Number.isFinite(v.currentTime) && v.currentTime > 0.01){
        try{ audio.currentTime = v.currentTime; }catch{}
      }
      const playPromise = audio.play();
      if(playPromise && typeof playPromise.then === 'function') await playPromise;
      audio.pause();
      S.bgPrimedSrc = src;
      debugLog('bg-mirror', 'primed');
      audio.muted = prevMuted;
      audio.volume = prevVol;
      syncBgAudioFromVideo();
      return true;
    }catch(err){
      debugLog('bg-mirror', `prime-fail ${err?.name||'Error'}`);
      return false;
    }
  }
  async function activateBackgroundAudioMirror(reason='hidden'){
    if(S.bgSwitching || S.bgMirror || v.paused) return false;
    const src = currentBackgroundMirrorSrc();
    if(!src) return false;
    const audio = prepareBgAudioSource(src);
    S.bgSwitching = true;
    try{
      syncBgAudioFromVideo();
      if(Number.isFinite(v.currentTime) && v.currentTime > 0.01){
        try{ audio.currentTime = v.currentTime; }catch{}
      }
      const playPromise = audio.play();
      if(playPromise && typeof playPromise.then === 'function') await playPromise;
      S.bgMirror = true;
      try{ v.pause(); }catch{}
      debugLog('bg-mirror', `on ${reason}`);
      trySetupMediaSession();
      return true;
    }catch(err){
      debugLog('bg-mirror', `on-fail ${err?.name||'Error'}`);
      try{ audio.pause(); }catch{}
      return false;
    }finally{
      setTimeout(()=>{ S.bgSwitching = false; }, 140);
    }
  }
  async function deactivateBackgroundAudioMirror(reason='visible'){
    if(!S.bgMirror || !S.bgAudio) return false;
    const audio = S.bgAudio;
    const wasPlaying = !audio.paused;
    const current = audio.currentTime || 0;
    S.bgSwitching = true;
    try{
      S.bgMirror = false;
      v.muted = audio.muted;
      v.volume = audio.volume;
      v.playbackRate = audio.playbackRate || 1;
      if(Number.isFinite(current) && current > 0){
        try{ v.currentTime = current; }catch{}
      }
      audio.pause();
      updateTimes();
      updateMiniReadouts();
      debugLog('bg-mirror', `off ${reason} t=${current.toFixed(2)}`);
      if(wasPlaying){
        await requestPlayImmediate('bg:return');
      }else{
        trySetupMediaSession();
      }
      syncDisplayedVideoToActive(true);
      return true;
    }catch(err){
      debugLog('bg-mirror', `off-fail ${err?.name||'Error'}`);
      return false;
    }finally{
      setTimeout(()=>{ S.bgSwitching = false; }, 140);
    }
  }
  function forceUnmute(){
    try{
      const fallback = +($('#vol')?.value || 0.9) || 0.9;
      if(S.audioMaster){
        v.muted = true;
        v.volume = 0;
        if(S.bgAudio){
          S.bgAudio.muted = false;
          if(!Number.isFinite(S.bgAudio.volume) || S.bgAudio.volume <= 0) S.bgAudio.volume = fallback;
        }
      }else{
        v.muted = false;
        v.removeAttribute('muted');
        if(!Number.isFinite(v.volume) || v.volume <= 0){
          v.volume = fallback;
          $('#vol').value = fallback;
        }
        if(S.bgAudio){
          S.bgAudio.muted = v.muted;
          if(!Number.isFinite(S.bgAudio.volume) || S.bgAudio.volume <= 0) S.bgAudio.volume = v.volume;
        }
      }
      updateMiniReadouts();
    }catch{}
  }
  function markUserGesture(){
    S.triedOnce = true;
    S.lastUserGestureAt = Date.now();
    forceUnmute();
    debugLog('gesture', `paused=${v.paused?'1':'0'} ready=${v.readyState}`);
  }
  function hasFreshGesture(){
    return !!S.lastUserGestureAt && (Date.now() - S.lastUserGestureAt) < 4000;
  }
  async function ensureAudioOn(){
    forceUnmute();
    try{
      if(navigator.audioSession) navigator.audioSession.type = 'playback';
      else if(navigator.mediaSession) navigator.mediaSession.playbackState = activePaused() ? 'paused' : 'playing';
    }catch{}
    if(SAFE_NATIVE_PLAYBACK){
      debugLog('audio', 'native-bypass');
      return;
    }
    try{
      await OPAudio.ensure(v);
      OPAudio.reconnect?.();
      debugLog('audio', 'ensure-ok');
    }catch(err){
      debugLog('audio', `ensure-fail ${err?.name||'Error'}`);
    }
    forceUnmute();
  }
  async function playElementWithFallback(){
    forceUnmute();
    const media = activeMedia();
    if(media !== v) syncBgAudioFromVideo();
    if(SAFE_NATIVE_PLAYBACK){
      try{
        const p = media.play();
        if(p && typeof p.then === 'function') await p;
        if(S.audioMaster){
          try{
            v.muted = true;
            const pv = v.play();
            if(pv && typeof pv.catch === 'function') pv.catch(()=>{});
          }catch{}
        }
        debugLog('play()', 'native-ok');
        return;
      }catch(err){
        debugLog('play()', `native-fail ${err?.name||'Error'}`);
      }
    }
    try{
      const p = media.play();
      if(p && typeof p.then === 'function') await p;
      if(S.audioMaster){
        try{
          v.muted = true;
          const pv = v.play();
          if(pv && typeof pv.catch === 'function') pv.catch(()=>{});
        }catch{}
      }
      debugLog('play()', 'primary-ok');
      return;
    }catch(err){
      debugLog('play()', `primary-fail ${err?.name||'Error'}`);
      const prevMuted = media.muted;
      const prevVol = media.volume;
      try{
        media.muted = true;
        const p2 = media.play();
        if(p2 && typeof p2.then === 'function') await p2;
        debugLog('play()', 'fallback-muted-ok');
        setTimeout(()=>{
          try{
            media.muted = prevMuted;
            if(!prevMuted && prevVol > 0) media.volume = prevVol;
            forceUnmute();
          }catch{}
        }, 120);
        return;
      }catch{}
      throw err;
    }
  }
  async function requestPlayImmediate(reason){
    S.playDesired = true;
    S.playToken++;
    clearTimeout(S.playDebounce);
    debugLog('requestPlayImmediate', `${reason||'-'} ready=${v.readyState}`);
    await ensureAudioOn();
    await playElementWithFallback();
    if(activeMedia() === v && currentBackgroundMirrorSrc() && hasFreshGesture()){
      primeBgAudioForCurrent().catch(()=>{});
    }
    S.ignorePauseUntil = Date.now() + 900;
  }
  function requestPlay(reason){
    if(hasFreshGesture()){
      debugLog('requestPlay', `${reason||'-'} -> immediate`);
      return requestPlayImmediate(reason);
    }
    S.playDesired = true;
    const token = ++S.playToken;
    clearTimeout(S.playDebounce);
    debugLog('requestPlay', `${reason||'-'} schedule ready=${v.readyState}`);
    S.playDebounce = setTimeout(async ()=>{
      if(token !== S.playToken || !S.playDesired) return;
      try{
        await ensureAudioOn();
        await playElementWithFallback();
      }catch(err){
        debugLog('requestPlay', `fail ${err?.name||'Error'}`);
      }
    }, 40);
  }
  window.state = S;
  window.$ = { v, vol: $('#vol'), rateSel: $('#rateSel'), sleepSel: $('#sleepSel') };
  window.forceUnmute = forceUnmute;
  window.requestPlay = requestPlay;
  window.requestPlayImmediate = requestPlayImmediate;

  // ===== Times / Buffer / Seek tip =====
  function updateSeekTip(){ if(!S.dragging) return; const rect=seekEl.getBoundingClientRect(); const p=+seekEl.value/1000; const x=rect.left+rect.width*p; seekTip.style.left=x+'px'; const sec=(activeDuration()||0)*p; seekTip.textContent=fmt(sec); }
  function updateTimes(){
    const current = activeCurrentTime();
    const duration = activeDuration();
    $('#cur').textContent=fmt(current||0); $('#dur').textContent=isFinite(duration)?fmt(duration):'0:00';
    if(!S.dragging && isFinite(duration)){ const p=Math.max(0,Math.min(1,(current||0)/(duration||1))); seekEl.value=Math.round(p*1000); }
    try{ const buf=v.buffered; let end=0; for(let i=0;i<buf.length;i++){ end=Math.max(end, buf.end(i)||0); } const b=(isFinite(v.duration)&&v.duration>0)? (end/v.duration*100).toFixed(1)+'%':'0%'; seekWrap.style.setProperty('--buf', b); seekWrap.dataset.buffer=b; }catch{}
    updateSeekTip();
  }

  // ===== Auto Hide =====
  function showUI(){ ctrl.classList.remove('is-hidden'); document.body.classList.remove('hide-cursor'); }
  function hideUI(){
    if(!S.autoHide) return;
    if(!activePaused() && !isAnyPanelOpen() && !S.dragging){
      ctrl.classList.add('is-hidden'); document.body.classList.add('hide-cursor');
    }
  }
  function bumpAutoHide(){
    showUI(); clearTimeout(S.autoHideTimer);
    if(!activePaused() && !isAnyPanelOpen()){
      S.autoHideTimer = setTimeout(hideUI, S.autoHideMs); // 3秒で完全に消える
    }
  }
  const isAnyPanelOpen=()=> $('#settingsScrim').classList.contains('show') || $('#tipsScrim').classList.contains('show');

  // ===== Wake Lock =====
  async function lockWake(){ try{ if('wakeLock' in navigator && !S.wakeLock){ S.wakeLock=await navigator.wakeLock.request('screen'); S.wakeLock.addEventListener?.('release',()=>S.wakeLock=null);} }catch{} }
  async function releaseWake(){ try{ await S.wakeLock?.release(); }catch{} finally{ S.wakeLock=null; } }
  document.addEventListener('visibilitychange', ()=>{
    if(document.visibilityState==='visible'){
      S.hiddenResumeBudget = 0;
      if(S.bgMirror) deactivateBackgroundAudioMirror('visible').catch(()=>{});
      else if(!activePaused()) lockWake();
      return;
    }
    if(S.audioMaster){
      S.hiddenResumeBudget = 3;
      if(!activePaused()) requestPlayImmediate('audioMaster:hidden-keepalive').catch(()=>{});
    }
    if(document.hidden && (S.playDesired || !activePaused()) && !S.audioMaster) activateBackgroundAudioMirror('hidden').catch(()=>{});
  });
  window.addEventListener('pagehide', ()=>{
    if(S.audioMaster){
      S.hiddenResumeBudget = 3;
      if(!activePaused()) requestPlayImmediate('audioMaster:pagehide-keepalive').catch(()=>{});
    }
    if((S.playDesired || !activePaused()) && !S.audioMaster) activateBackgroundAudioMirror('pagehide').catch(()=>{});
  });

  // ===== Watchdogs =====
  function clearWatchdogs(){ S.watchTimers.forEach(id=>clearTimeout(id)); S.watchTimers=[]; }
  function startWatchdogs(){
    clearWatchdogs();
    S.watchTimers.push(setTimeout(()=>{
      const ctx = window.OPAudio?.ctx;
      if (OPAudio?.eqEnabled && (!ctx || ctx.state!=='running')) {
        try{ OPAudio.setEnabled(false); OPAudio.resetGraph(); }catch{}
        v.muted=false; setBadge(t('badge_safe'));
        setTimeout(()=> syncBadgeState(),1100);
      }
    }, 550));
  }

  // ===== 再生時サニティチェック（無音対策） =====
  function sanityAfterPlay(){
    if(SAFE_NATIVE_PLAYBACK){
      forceUnmute();
      return;
    }
    setTimeout(async ()=>{
      const ctx = window.OPAudio?.ctx;
      if (ctx && ctx.state !== 'running'){
        try{ await ctx.resume(); }catch{}
      }
      // グラフ未使用なのに muted になっていたら解除
      if (!window.OPAudio?.usingGraph && v.muted){ v.muted=false; }
      // EQ要求だがコンテキストがダメなら安全側へ
      if (window.OPAudio?.eqEnabled && (!ctx || ctx.state!=='running')){
        try{ OPAudio.setEnabled(false); }catch{}
        v.muted=false;
      }
    }, 300);
  }

  // ===== Playback =====
  $('#btnPlay').addEventListener('click', async ()=>{
    markUserGesture();
    await ensureAudioOn();
    if($('#animPlay')?.value==='on' && S.anim.play){ $('#btnPlay').classList.remove('spring'); void $('#btnPlay').offsetWidth; $('#btnPlay').classList.add('spring'); }
    if(activePaused()){
      try{ await requestPlayImmediate('ui'); }catch{}
    } else {
      if(SAFE_NATIVE_PLAYBACK){ debugLog('pause-guard', 'btnPlay safe-native ignore'); return; }
      if(Date.now() < S.ignorePauseUntil){ debugLog('pause-guard', 'btnPlay ignored'); return; }
      S.playDesired = false; activeMedia().pause();
    }
  });

  v.addEventListener('play', async ()=>{
    debugLog('event:play', `t=${fmt(v.currentTime||0)}`);
    schedulePlayProbe('play');
    // どの経路で再生しても毎回グラフ＆Contextを復帰→サイレント対策の要
    if(!SAFE_NATIVE_PLAYBACK){
      try{ await OPAudio.ensure(v); OPAudio.reconnect(); }catch{}
    }
    syncBadgeState();
    try{ if('mediaSession' in navigator) navigator.mediaSession.playbackState='playing'; }catch{}
    trySetupMediaSession();
    lockWake(); bumpAutoHide(); tap.classList.add('hide'); startWatchdogs();
    sanityAfterPlay();
    // 学習AI：タイトル学習
    learnFrom(currentTitleForLearn());
  });

  v.addEventListener('playing', ()=>{ debugLog('event:playing', `t=${fmt(v.currentTime||0)}`); });
  v.addEventListener('progress', ()=>{ debugLog('event:progress', `buffered=${v.buffered?.length||0}`); });
  v.addEventListener('stalled', ()=>{ debugLog('event:stalled', `ready=${v.readyState} net=${v.networkState}`); });
  v.addEventListener('suspend', ()=>{ debugLog('event:suspend', `ready=${v.readyState} net=${v.networkState}`); });
  v.addEventListener('seeking', ()=>{ debugLog('event:seeking', `t=${fmt(v.currentTime||0)}`); });
  v.addEventListener('seeked', ()=>{ debugLog('event:seeked', `t=${fmt(v.currentTime||0)}`); });
  v.addEventListener('ratechange', ()=>{ debugLog('event:ratechange', `rate=${v.playbackRate}`); });
  v.addEventListener('pause', ()=>{
    debugLog('event:pause', `t=${fmt(v.currentTime||0)}`);
    syncBadgeState();
    try{
      if('mediaSession' in navigator) navigator.mediaSession.playbackState = activePaused() ? 'paused' : 'playing';
    }catch{}
    trySetupMediaSession();
    showUI();
    releaseWake();
    clearWatchdogs();
  });
  v.addEventListener('timeupdate', ()=>{ if((v.currentTime||0) > 0 && !S._loggedTimeAdvance){ S._loggedTimeAdvance = true; debugLog('event:timeadvance', `t=${fmt(v.currentTime||0)}`); } });

  v.addEventListener('loadedmetadata', ()=>{
    debugLog('event:loadedmetadata', `dur=${fmt(v.duration||0)} size=${v.videoWidth||0}x${v.videoHeight||0}`);
    S.duration=v.duration||0; updateTimes(); setBadge(t('badge_ready')); maybeShowResumeButton(); trySetupMediaSession(); updateMiniMeta(); syncMiniArtworkStage(); syncControlAvailability();
    if(S.playDesired) requestPlay('loadedmetadata');
    if(S.loopOn && S.loopWholePending && isFinite(v.duration) && v.duration>0){ S.loopA=0; S.loopB=v.duration; S.loopWholePending=false; updateABStyle(); }
  });
  v.addEventListener('canplay', ()=>{ debugLog('event:canplay', `ready=${v.readyState}`); if(S.playDesired) requestPlay('canplay'); });
  v.addEventListener('waiting', ()=>{ debugLog('event:waiting', `network=${v.networkState}`); });
  v.addEventListener('error', ()=>{ debugLog('event:error', mediaErrText()); });

  v.addEventListener('timeupdate', ()=>{
    if (S.loopOn && S.loopA!=null && S.loopB!=null && S.loopB>S.loopA){
      if (v.currentTime > S.loopB - 0.03){ v.currentTime = S.loopA; }
    }
    updateTimes();
    try{
      if('mediaSession' in navigator && typeof navigator.mediaSession.setPositionState === 'function' && isFinite(v.duration)){
        navigator.mediaSession.setPositionState({ duration:v.duration||0, position:v.currentTime||0, playbackRate:v.playbackRate||1 });
      }
    }catch{}
    if (S.sleepLeft>0 && !activePaused()){ S.sleepLeft -= 1; updateSleepBadge(); if (S.sleepLeft<=0){ activeMedia().pause(); } }
    if(isFinite(v.duration) && Math.floor(v.currentTime)%5===0){ try{ localStorage.setItem('pc.lastUrl', S.lastUrl||''); localStorage.setItem('pc.lastTime', String(v.currentTime||0)); }catch{} }
  });

  v.addEventListener('ended', ()=>{
    debugLog('event:ended', `loop=${S.loopOn?'1':'0'}`);
    if (S.loopOn){
      if(S.loopA!=null && S.loopB!=null && S.loopB>S.loopA){ v.currentTime=S.loopA; requestPlay('loop'); }
      else { v.currentTime=0; requestPlay('loop'); }
      return;
    }
    setBadge(t('badge_end')); showUI(); releaseWake(); clearWatchdogs();
    if(S.fileList.length>0 && S.fileIndex<S.fileList.length-1){ S.fileIndex++; openLocalFile(S.fileList[S.fileIndex]); }
  });

  // クリック（隠れている時はまずUIを出す）
  v.addEventListener('click', (e)=>{
    if (ctrl.classList.contains('is-hidden')) { bumpAutoHide(); return; }
    const now=performance.now(); const dx=Math.abs(e.clientX - S.lastTapX);
    const flash=()=>{ v.style.filter='brightness(1.15)'; setTimeout(()=> v.style.filter='',120); };
    if(now - S.lastTap < 320 && dx < 80){
      const x=e.clientX, w=wrap.clientWidth;
      if(x < w*0.4) setActiveCurrentTime(activeCurrentTime()-10);
      else if(x > w*0.6) setActiveCurrentTime(activeCurrentTime()+10);
      flash(); bumpAutoHide();
    }else{
      if (activePaused()) {
        markUserGesture(); requestPlayImmediate('videoTap').catch(()=>{});
      } else {
        if(Date.now() < S.ignorePauseUntil){ debugLog('pause-guard', 'videoTap ignored'); return; }
        S.playDesired = false; activeMedia().pause();
      }
    }
    S.lastTap=now; S.lastTapX=e.clientX;
  });

  // ダブルクリックでFS
  wrap.addEventListener('dblclick', ()=>{ toggleFS(); });

  wrap.addEventListener('wheel', (e)=>{
    if(isAnyPanelOpen()) return;
    if(e.shiftKey){ e.preventDefault(); const sign=(e.deltaY>0?1:-1); setActiveCurrentTime(activeCurrentTime()+sign*10); }
    else{ e.preventDefault(); v.volume=clamp((v.volume||0.9)+(e.deltaY>0?-0.05:0.05),0,1); $('#vol').value=v.volume; updateMiniReadouts(); }
    bumpAutoHide();
  }, {passive:false});

  $('#btnBack').addEventListener('click', ()=>{ setActiveCurrentTime(activeCurrentTime()-10); bumpAutoHide(); });
  $('#btnFwd') .addEventListener('click', ()=>{ setActiveCurrentTime(activeCurrentTime()+10); bumpAutoHide(); });
  $('#btnPrev').addEventListener('click', ()=>{ markUserGesture(); if(S.fileList.length>0 && S.fileIndex>0){ S.fileIndex--; openLocalFile(S.fileList[S.fileIndex]); } });
  $('#btnNext').addEventListener('click', ()=>{ markUserGesture(); if(S.fileList.length>0 && S.fileIndex<S.fileList.length-1){ S.fileIndex++; openLocalFile(S.fileList[S.fileIndex]); } });
  $('#btnMute').addEventListener('click', ()=>{
    v.muted=!v.muted;
    if(S.bgAudio) S.bgAudio.muted = v.muted;
    setBadge(v.muted ? t('badge_muted') : currentBaseBadge());
  });

  // Seek
  const startDrag=()=>{ S.dragging=true; showUI(); seekTip.classList.add('show'); updateSeekTip(); if($('#animMicro')?.value==='on' && S.anim.micro){ startMicroFade(); } };
  const endDrag =()=>{ S.dragging=false; seekTip.classList.remove('show'); bumpAutoHide(); stopMicroFade(); if($('#animSeek')?.value==='on' && S.anim.seek){ seekWrap.classList.remove('seek-bounce'); void seekWrap.offsetWidth; seekWrap.classList.add('seek-bounce'); } };
  seekEl.addEventListener('input', ()=>{ const p=+seekEl.value/1000; $('#cur').textContent=fmt((activeDuration()||0)*p); updateSeekTip(); });
  seekEl.addEventListener('change',()=>{ const p=+seekEl.value/1000; setActiveCurrentTime((activeDuration()||0)*p); endDrag(); });
  seekEl.addEventListener('mousedown', startDrag); seekEl.addEventListener('mouseup', endDrag);
  seekEl.addEventListener('touchstart', startDrag, {passive:true}); seekEl.addEventListener('touchend', endDrag);

  // volume / rate
  $('#vol').addEventListener('input', e=>{ v.volume=+e.target.value; syncBgAudioFromVideo(); updateMiniReadouts(); bumpAutoHide(); });
  const rateSel=$('#rateSel');
  function setPlaybackRateFromSelect(){ const val=parseFloat(rateSel.value); v.playbackRate=isFinite(val)?val:1.0; syncBgAudioFromVideo(); updateMiniReadouts(); }
  rateSel.addEventListener('change', ()=>{ setPlaybackRateFromSelect(); bumpAutoHide(); });
  function stepRate(delta){ const opts=Array.from(rateSel.options).map(o=>parseFloat(o.value)); const cur=parseFloat(rateSel.value); let idx=opts.findIndex(x=>x===cur); if(idx<0) idx=Math.max(0,opts.findIndex(x=>x===1.0)); idx=Math.min(Math.max(idx+delta,0),opts.length-1); rateSel.value=opts[idx].toFixed(2); setPlaybackRateFromSelect(); }

  // Sleep timer
  const sleepSel = $('#sleepSel');
  function applySleep(){ S.sleepLeft = parseInt(sleepSel.value||'0',10); clearInterval(S.sleepTimer); if (S.sleepLeft>0){ updateSleepBadge(); S.sleepTimer=setInterval(()=>{ if(!activePaused()){ S.sleepLeft -= 1; updateSleepBadge(); if (S.sleepLeft<=0){ clearInterval(S.sleepTimer); activeMedia().pause(); } } }, 1000); } else { syncBadgeState(); updateMiniReadouts(); } }
  function updateSleepBadge(){ syncBadgeState(); updateMiniReadouts(); }
  sleepSel.addEventListener('change', applySleep);

  // PiP / FS
  function canUsePiP(){
    if(typeof v.requestPictureInPicture === 'function' && document.pictureInPictureEnabled) return true;
    if(typeof v.webkitSupportsPresentationMode === 'function' && typeof v.webkitSetPresentationMode === 'function'){
      try{ return !!v.webkitSupportsPresentationMode('picture-in-picture'); }catch(e){}
    }
    return false;
  }
  function canUseFullscreen(){
    return !!(
      wrap.requestFullscreen ||
      wrap.webkitRequestFullscreen ||
      wrap.msRequestFullscreen ||
      v.webkitEnterFullscreen
    );
  }
  function syncControlAvailability(){
    $('#btnPip').disabled = !canUsePiP();
    $('#btnFs').disabled = !canUseFullscreen();
  }
  async function togglePiP(){ try{
      if(document.pictureInPictureElement){
        if($('#animPip')?.value==='on' && S.anim.pip){ wrap.classList.remove('pip-fade-enter'); wrap.classList.add('pip-fade-leave'); setTimeout(()=> wrap.classList.remove('pip-fade-leave'), 160); }
        await document.exitPictureInPicture();
        return;
      }
      if(typeof v.requestPictureInPicture === 'function' && document.pictureInPictureEnabled){
        await v.requestPictureInPicture();
        if($('#animPip')?.value==='on' && S.anim.pip){ wrap.classList.remove('pip-fade-leave'); wrap.classList.add('pip-fade-enter'); setTimeout(()=> wrap.classList.remove('pip-fade-enter'), 140); }
        return;
      }
      if(typeof v.webkitSupportsPresentationMode === 'function' && typeof v.webkitSetPresentationMode === 'function'){
        if(v.webkitSupportsPresentationMode('picture-in-picture')){
          const mode = v.webkitPresentationMode === 'picture-in-picture' ? 'inline' : 'picture-in-picture';
          v.webkitSetPresentationMode(mode);
          return;
        }
      }
    }catch(e){ setBadge('PiP NG') } }
  async function toggleFS(){
    if(document.fullscreenElement || document.webkitFullscreenElement){
      try{
        if(document.exitFullscreen) await document.exitFullscreen();
        else if(document.webkitExitFullscreen) document.webkitExitFullscreen();
      }catch{}
      return;
    }
    try{ if(wrap.requestFullscreen){ await wrap.requestFullscreen(); return; } }catch{}
    try{ if(wrap.webkitRequestFullscreen){ wrap.webkitRequestFullscreen(); return; } }catch{}
    try{ if(v.webkitEnterFullscreen){ v.webkitEnterFullscreen(); return; } }catch{}
  }
  $('#btnPip').addEventListener('click', ()=>{ togglePiP(); bumpAutoHide(); });
  $('#btnFs') .addEventListener('click', ()=>{ toggleFS();  bumpAutoHide(); });
  document.addEventListener('fullscreenchange', ()=>{
    ctrl.classList.toggle('fs-minimal', !!document.fullscreenElement);
    showUI(); bumpAutoHide();
  });
  document.addEventListener('webkitfullscreenchange', ()=>{
    ctrl.classList.toggle('fs-minimal', !!document.webkitFullscreenElement);
    showUI(); bumpAutoHide();
  });

  // URL / HLS / File
  function isHls(u){ return /\.m3u8($|\?)/i.test(u) }
  function stopHls(){ if(S._hls){ try{ S._hls.destroy() }catch(e){} S._hls=null } }
  function stopBgMirror(){
    if(S.bgAudio){
      try{ S.bgAudio.pause(); }catch{}
      try{ S.bgAudio.removeAttribute('src'); S.bgAudio.load?.(); }catch{}
    }
    try{ v.pause(); }catch{}
    S.bgMirror = false;
    S.bgSwitching = false;
    S.bgPrimedSrc = '';
  }
  function revokeBlob(){ if(S.lastBlobUrl){ try{ URL.revokeObjectURL(S.lastBlobUrl) }catch{} S.lastBlobUrl=null; } }
  async function openUrl(u){
    if(!u) return; stopBgMirror(); stopHls(); revokeBlob(); v.removeAttribute('src'); v.load();
    debugLog('openUrl', u);
    S.lastUrl=u; try{ localStorage.setItem('pc.lastUrl', u);}catch{}
    clearMiniArtwork();
    const artworkToken = ++S.artworkToken;
    rateSel.value='1.00'; setPlaybackRateFromSelect();
    v.volume = +($('#vol').value || 0.9) || 0.9;
    updateMiniMeta();
    try{ hidePanel($('#settingsScrim')); hidePanel($('#tipsScrim')); }catch{}
    if(isHls(u) && window.Hls && Hls.isSupported()){
      setAudioMasterMode(false);
      S._hls=new Hls({enableWorker:false}); S._hls.attachMedia(v);
      S._hls.on(Hls.Events.MEDIA_ATTACHED, ()=> S._hls.loadSource(u));
      S._hls.on(Hls.Events.MANIFEST_PARSED, async ()=>{ debugLog('hls', 'manifest-parsed'); await ensureAudioOn(); requestPlayImmediate('hls:manifest'); tap.classList.add('hide'); trySetupMediaSession(); updateMiniMeta(); syncControlAvailability(); learnFrom(currentTitleForLearn()); prepareArtworkForUrl(u, artworkToken).catch(()=>{}); });
    }else{
      v.src=u;
      setAudioMasterMode(IOS_WEBKIT && /\.(mp4|webm|mov|mkv|avi|m4v|mpg|mpeg)(\?|$)/i.test(String(u||'')));
      if(S.audioMaster) prepareBgAudioSource(currentBackgroundMirrorSrc());
      v.onloadedmetadata=async ()=>{ debugLog('url', 'loadedmetadata-hook'); await ensureAudioOn(); requestPlayImmediate('url:loadedmetadata'); tap.classList.add('hide'); v.onloadedmetadata=null; trySetupMediaSession(); updateMiniMeta(); syncControlAvailability(); learnFrom(currentTitleForLearn()); prepareArtworkForUrl(u, artworkToken).catch(()=>{}); };
    }
  }
  $('#openUrl').addEventListener('click', ()=>{ markUserGesture(); openUrl(($('#url').value||'').trim()); });

  function updatePrevNextUI(){
    const hasPrev = S.fileList.length>0 && S.fileIndex>0;
    const hasNext = S.fileList.length>0 && S.fileIndex<S.fileList.length-1;
    $('#btnPrev').disabled = !hasPrev;
    $('#btnNext').disabled = !hasNext;
    updateMiniMeta();
  }
  function openLocalFile(file){
    if(!file) return; stopBgMirror(); stopHls(); revokeBlob(); v.removeAttribute('src'); v.load();
    debugLog('openLocalFile', `${file.name||'unknown'} ${file.type||'-'}`);
    const url=URL.createObjectURL(file); S.lastBlobUrl=url; S.lastUrl='file:'+file.name;
    clearMiniArtwork();
    const artworkToken = ++S.artworkToken;
    rateSel.value='1.00'; setPlaybackRateFromSelect();
    v.volume = +($('#vol').value || 0.9) || 0.9;
    updateMiniMeta();
    try{ hidePanel($('#settingsScrim')); hidePanel($('#tipsScrim')); }catch{}
    const fileLabel = `${file.type||''} ${file.name||''}`.toLowerCase();
    setAudioMasterMode(IOS_WEBKIT && /video\/|\.mp4|\.webm|\.mov|\.mkv|\.avi|\.m4v|\.mpg|\.mpeg/.test(fileLabel));
    v.src=url;
    if(S.audioMaster) prepareBgAudioSource(url);
    v.load(); requestPlayImmediate('localFile').catch(()=>{}); tap.classList.add('hide');
    updatePrevNextUI(); trySetupMediaSession(file);
    learnFrom(currentTitleForLearn());
    prepareArtworkForFile(file, artworkToken).catch(()=>{});
  }
  $('#file').addEventListener('change', e=>{ markUserGesture(); S.fileList=Array.from(e.target.files||[]); S.fileIndex=0; openLocalFile(S.fileList[0]); updatePrevNextUI(); updateMiniMeta(); });

  // Drag & Drop
  ['dragenter','dragover'].forEach(ev=>{
    wrap.addEventListener(ev, e=>{ e.preventDefault(); dropHint.classList.add('show'); }, {passive:false});
  });
  ['dragleave','drop'].forEach(ev=>{
    wrap.addEventListener(ev, e=>{
      e.preventDefault();
      if(ev==='drop'){
        const files=Array.from(e.dataTransfer?.files||[]).filter(f=>/audio|video|mpegurl|mp4|mp3|m3u8/i.test(f.type) || /\.(m3u8|mp4|mp3|m4a|webm|ogg)$/i.test(f.name));
        if(files.length){ markUserGesture(); S.fileList=files; S.fileIndex=0; openLocalFile(files[0]); }
      }
      dropHint.classList.remove('show');
    }, {passive:false});
  });

  // captions（UIがあるので保存/反映）
  function srtToVtt(srt){ const vtt='WEBVTT\n\n'+String(srt).replace(/\r/g,'').replace(/^(\d+)\s*$/gm,'').replace(/(\d\d:\d\d:\d\d),(\d{3})/g,'$1.$2'); return new Blob([vtt],{type:'text/vtt'}); }
  function applySubStyle(){
    const size = +$('#subSize').value||28;
    const outline = +$('#subOutline').value||3;
    const margin = +$('#subMargin').value||30;
    const color = $('#subColor').value||'#FFFFFF';
    let style=document.getElementById('sub-style');
    if(!style){ style=document.createElement('style'); style.id='sub-style'; document.head.appendChild(style); }
    const bg = ($('#subPlate').value==='on' || S.sub.plate) ? ' background:rgba(0,0,0,.38); padding:.15em .45em; border-radius:6px; ' : '';
    style.textContent=`video::cue{font-family:"Noto Sans JP",system-ui;font-size:${size}px;line-height:1.2;color:${color};text-shadow:0 0 ${outline}px rgba(0,0,0,.9);${bg}} video::-webkit-media-text-track-container{ transform:translateY(-${margin}px);} `;
    // 表示/非表示
    try{ for(const tr of v.textTracks||[]){ tr.mode = ($('#subEnable').value==='on' && S.sub.enable)? 'showing':'disabled'; } }catch{}
  }
  function unloadTracks(){ Array.from(v.querySelectorAll('track')).forEach(t=>t.remove()); S.subTrack=null }
  function shiftCuesBy(offsetMs){ const trk=S.subTrack; if(!trk||!trk.cues) return; const off=(offsetMs|0)/1000; try{ for(let i=0;i<trk.cues.length;i++){ const c=trk.cues[i]; if(c && typeof c.startTime==='number'){ if(c._origStart==null){ c._origStart=c.startTime; c._origEnd=c.endTime; } const ns=c._origStart+off, ne=c._origEnd+off; c.startTime=Math.max(ns,0); c.endTime=Math.max(ne,0.01);} } }catch{} }
  $('#subFile').addEventListener('change', async (e)=>{ const f=e.target.files?.[0]; if(!f) return; unloadTracks(); let blob; if(f.name.endsWith('.vtt')) blob=new Blob([await f.text()],{type:'text/vtt'}); else blob=srtToVtt(await f.text()); const url=URL.createObjectURL(blob); const tr=document.createElement('track'); tr.kind='subtitles'; tr.label='ext'; tr.srclang=(LANG==='ja'?'ja':'en'); tr.default=true; tr.src=url; v.appendChild(tr); tr.addEventListener('load', ()=>{ tr.track.mode=(S.sub.enable?'showing':'disabled'); S.subTrack=tr.track; shiftCuesBy(S.subOffset); }); });
  $('#btnSubClear').addEventListener('click', ()=> unloadTracks());
  ['#subSize','#subOutline','#subMargin','#subColor','#subPlate','#subEnable'].forEach(sel=> $(sel).addEventListener('input', ()=>{
    S.sub.size=+$('#subSize').value||28; S.sub.outline=+$('#subOutline').value||3; S.sub.margin=+$('#subMargin').value||30;
    S.sub.color=$('#subColor').value||'#FFFFFF'; S.sub.plate=$('#subPlate').value==='on'; S.sub.enable=$('#subEnable').value==='on';
    save('pc.sub.size',S.sub.size); save('pc.sub.outline',S.sub.outline); save('pc.sub.margin',S.sub.margin); save('pc.sub.color',S.sub.color);
    save('pc.sub.plate',S.sub.plate?1:0); save('pc.sub.enable',S.sub.enable?1:0);
    applySubStyle();
  }));
  $('#subOffset').addEventListener('change', e=>{ S.subOffset=(+e.target.value)||0; shiftCuesBy(S.subOffset); save('pc.sub.offset', S.subOffset); });

  // Panels
  const showPanel=(scrim)=>{ scrim.classList.add('show'); scrim.setAttribute('aria-hidden','false'); showUI(); clearTimeout(S.autoHideTimer); };
  const hidePanel=(scrim)=>{ scrim.classList.remove('show'); scrim.setAttribute('aria-hidden','true'); bumpAutoHide(); };
  $('#btnSettings').addEventListener('click', ()=> showPanel($('#settingsScrim')));
  $('#btnTips')    .addEventListener('click', ()=> showPanel($('#tipsScrim')));
  $('#btnCloseSettings').addEventListener('click', ()=> hidePanel($('#settingsScrim')));
  $('#btnCloseTips')    .addEventListener('click', ()=> hidePanel($('#tipsScrim')));
  $('#btnMiniAdvanced').addEventListener('click', ()=>{
    miniAdvanced = !miniAdvanced;
    save('pc.mini.advanced', miniAdvanced?1:0);
    updateMiniAdvancedUi();
  });
  $('#settingsScrim').addEventListener('click', (e)=>{ if(e.target===e.currentTarget) hidePanel(e.currentTarget) });
  $('#tipsScrim').addEventListener('click',     (e)=>{ if(e.target===e.currentTarget) hidePanel(e.currentTarget) });

  // Loop
  function updateLoopBadge(){
    $('#btnLoop').classList.toggle('active', !!S.loopOn);
    syncBadgeState();
  }
  function updateABStyle(){
    const A = (S.loopA!=null && isFinite(v.duration) && v.duration>0) ? (S.loopA/v.duration*100).toFixed(2)+'%' : '0%';
    const B = (S.loopB!=null && isFinite(v.duration) && v.duration>0) ? (S.loopB/v.duration*100).toFixed(2)+'%' : '0%';
    seekWrap.style.setProperty('--abA', A); seekWrap.style.setProperty('--abB', B);
  }
  $('#btnLoop').addEventListener('click', ()=>{
    S.loopOn = !S.loopOn;
    if(S.loopOn && (S.loopA==null || S.loopB==null || S.loopB<=S.loopA)){
      if(isFinite(v.duration) && v.duration>0){ S.loopA = 0; S.loopB = v.duration; }
      else { S.loopWholePending = true; }
      updateABStyle();
    }
    updateLoopBadge();
    bumpAutoHide();
  });

  // Keys
  document.addEventListener('keydown', (e)=>{
    const tag=(document.activeElement?.tagName||'').toLowerCase(); const inForm=(tag==='input'||tag==='textarea'||tag==='select');
    if(inForm && e.key!=='Escape') return;
    if(e.key==='Escape'){ hidePanel($('#settingsScrim')); hidePanel($('#tipsScrim')); showUI(); }
    if(e.key===' '){ e.preventDefault(); $('#btnPlay').click(); }
    if(e.key==='ArrowLeft'){ $('#btnBack').click(); }
    if(e.key==='ArrowRight'){ $('#btnFwd').click(); }
    if(e.key==='['){ stepRate(-1); }
    if(e.key===']'){ stepRate(+1); }
    if(e.key==='f' || e.key==='F'){ toggleFS(); }
    if(e.key==='p' || e.key==='P'){ togglePiP(); }
    if(e.key==='m' || e.key==='M'){ $('#btnMute').click(); }
    if(e.key==='d' || e.key==='D'){ S.autoHide=!S.autoHide; if(!S.autoHide) showUI(); bumpAutoHide(); }
    if(e.key==='s' || e.key==='S'){ saveFramePNG(); }
    if(e.key==='A'){ S.loopA=activeCurrentTime(); S.loopOn=true; updateLoopBadge(); updateABStyle(); }
    if(e.key==='B'){ S.loopB=activeCurrentTime(); S.loopOn=true; updateLoopBadge(); updateABStyle(); }
    if(e.key==='L'){ S.loopOn=!S.loopOn; updateLoopBadge(); }
    if(e.key===',' ){ if(e.altKey && activePaused()){ setActiveCurrentTime(activeCurrentTime()-1/60); } else { $('#btnPrev').click(); } }
    if(e.key==='.' ){ if(e.altKey && activePaused()){ setActiveCurrentTime(activeCurrentTime()+1/60); } else { $('#btnNext').click(); } }
    if(e.key==='?'){ showPanel($('#tipsScrim')); }
    if(/^[0-9]$/.test(e.key) && isFinite(activeDuration())){ setActiveCurrentTime(activeDuration() * (+e.key/10)); }
    bumpAutoHide();
  });

  // keep UI awake
  ['mousemove','pointermove','keydown','touchstart'].forEach(ev=>{ document.addEventListener(ev, ()=> bumpAutoHide(), {passive:true}); });

  // FX preset
  $('#fxPreset').addEventListener('change', (e)=>{
    const root = wrap.querySelector('.opfx'); const ps=['minimal','clean','glow','neon'];
    root.classList.remove(...ps.map(p=>'preset-'+p));
    const val = e.target.value; root.classList.add('preset-'+(ps.includes(val)?val:'minimal'));
    save('pc.fx.preset', val);
  });

  // PNG frame save
  function saveFramePNG(){ try{ const c=document.createElement('canvas'); const r=wrap.getBoundingClientRect(); c.width=Math.floor(r.width); c.height=Math.floor(r.height);
    const g=c.getContext('2d'); g.drawImage(v,0,0,c.width,c.height); const url=c.toDataURL('image/png'); const a=document.createElement('a'); a.href=url; a.download='frame_'+Date.now()+'.png'; a.click();
    setBadge(t('badge_shot')); setTimeout(()=> syncBadgeState(), 1200);
  }catch{ setBadge('SHOT NG'); } }

  // ===== EQ UI =====
  const FREQS = window.OPAudio_FREQS || [32,64,125,250,500,1000,2000,4000,8000,16000];
  function renderEqBands(){
    const box = $('#eqBands'); box.innerHTML='';
    const gains = (window.OPAudio && OPAudio.filters.length) ? OPAudio.getGains() : (new Array(FREQS.length).fill(0));
    for(let i=0;i<FREQS.length;i++){
      const row = document.createElement('div'); row.className='eq-band';
      const lab = document.createElement('label'); lab.textContent = (FREQS[i]>=1000? (FREQS[i]/1000)+'k':FREQS[i]) + 'Hz';
      const out = document.createElement('output'); out.id = 'eqOut'+i; out.textContent = (gains[i]||0).toFixed(1) + 'dB';
      const slider = document.createElement('input'); slider.type='range'; slider.min='-12'; slider.max='12'; slider.step='0.5';
      slider.value = gains[i]||0; slider.id='eq'+i; slider.addEventListener('input', (e)=>{
        const val = parseFloat(e.target.value);
        out.textContent = val.toFixed(1) + 'dB';
        try{ OPAudio.setBand(i, val); $('#eqPreset').value='custom'; }catch{}
      });
      row.appendChild(lab); row.appendChild(slider); row.appendChild(out);
      box.appendChild(row);
    }
  }
  function applyEqEnabledUI(on){ $('#eqEnable').value = on ? 'on':'off'; }
  $('#eqEnable').addEventListener('change', (e)=>{ const on=e.target.value==='on'; try{ OPAudio.setEnabled(on); }catch{} applyEqEnabledUI(on); if(!on){ v.muted=false; } save('pc.eq.enabled', on?1:0); });
  $('#eqReset').addEventListener('click', ()=>{ try{ OPAudio.setPreset('flat'); $('#eqPreset').value='flat'; }catch{} renderEqBands(); });
  $('#eqPreset').addEventListener('change', (e)=>{ const p=e.target.value; try{ OPAudio.setPreset(p); }catch{} renderEqBands(); save('pc.eq.preset', p); });
  $('#limiterEnable').addEventListener('change', (e)=>{ const on=e.target.value==='on'; try{ OPAudio.setLimiter(on); }catch{} save('pc.limiter.enabled', on?1:0); });

  // Resume button
  function maybeShowResumeButton(){
    try{
      const lu = localStorage.getItem('pc.lastUrl')||''; const lt = parseFloat(localStorage.getItem('pc.lastTime')||'NaN');
      if(lu && S.lastUrl===lu && isFinite(lt) && lt>3 && isFinite(v.duration) && lt < v.duration - 3){
        const btn=$('#btnResume'); btn.style.display='inline-flex'; btn.textContent = (LANG==='ja' ? `⏱ レジューム (${fmt(lt)})` : `⏱ RESUME (${fmt(lt)})`);
        btn.onclick=()=>{ v.currentTime=lt; btn.style.display='none'; setBadge(t('badge_resume')); setTimeout(()=> syncBadgeState(), 1000); };
      }else{
        $('#btnResume').style.display='none';
      }
    }catch{}
  }

  async function prepareArtworkForFile(file, token=S.artworkToken){
    if(!file) return;
    const kind = `${file.type||''} ${file.name||''}`.toLowerCase();
    const isAudio = /audio\/|\.mp3|\.m4a|\.aac|\.wav|\.flac|\.ogg|\.opus/.test(kind);
    const isVideo = /video\/|\.mp4|\.webm|\.mov|\.mkv|\.avi|\.m4v/.test(kind);
    let meta = await parseWithJsMediaTags(file);
    if(!meta && getMetadataLib()) meta = await parseBlobArtwork(file, file.name);
    if(!meta?.coverUrl && isAudio) meta = { ...(meta||{}), coverUrl: await extractId3ApicArtwork(file) };
    if(token !== S.artworkToken) return;
    if(isAudio){
      S.mediaMeta = {
        title: meta?.title || file.name || t('meta_no_media'),
        artist: meta?.artist || '',
        album: meta?.album || ''
      };
      setMiniArtwork(meta?.coverUrl ? [meta.coverUrl] : [makeIconDataUrl('audio')]);
      trySetupMediaSession();
      updateMiniMeta();
      return;
    }
    if(isVideo){
      S.mediaMeta = {
        title: meta?.title || file.name || t('meta_no_media'),
        artist: meta?.artist || '',
        album: meta?.album || ''
      };
      if(meta?.coverUrl){
        setMiniArtwork([meta.coverUrl]);
      }else{
        const stills = await extractVideoArtworkList(file);
        if(token !== S.artworkToken) return;
        setMiniArtwork(stills.length ? stills : [makeIconDataUrl('video')]);
      }
      trySetupMediaSession();
      updateMiniMeta();
      return;
    }
    S.mediaMeta = { title:file.name || t('meta_no_media'), artist:'', album:'' };
    setMiniArtwork([makeIconDataUrl('audio')]);
    trySetupMediaSession();
    updateMiniMeta();
  }
  async function prepareArtworkForUrl(url, token=S.artworkToken){
    const label = String(url||'').toLowerCase();
    const isAudio = /(\.mp3|\.m4a|\.aac|\.wav|\.flac|\.ogg|\.opus)(\?|$)/.test(label);
    const isVideo = /(\.mp4|\.webm|\.mov|\.mkv|\.avi|\.m4v)(\?|$)/.test(label);
    S.mediaMeta = { title: currentDisplayTitle(), artist:'', album:'' };
    setMiniArtwork([makeIconDataUrl(isVideo ? 'video' : 'audio')]);
    updateMiniMeta();
    if(isVideo){
      const stills = await extractVideoArtworkList(url);
      if(token !== S.artworkToken) return;
      if(stills.length){
        setMiniArtwork(stills);
        trySetupMediaSession();
        updateMiniMeta();
      }
    }else if(isAudio){
      trySetupMediaSession();
    }
  }

  // Media Session API
  function trySetupMediaSession(file){
    try{
      if(!('mediaSession' in navigator)) return;
      const title = S.mediaMeta?.title || file?.name || (S.lastUrl||'').replace(/^.*\//,'') || 'Omni Player mini';
      const media = activeMedia();
      navigator.mediaSession.metadata = new MediaMetadata({
        title,
        artist: S.mediaMeta?.artist || '',
        album: S.mediaMeta?.album || '',
        artwork: S.mediaArtwork || []
      });
      navigator.mediaSession.playbackState = activePaused() ? 'paused' : 'playing';
      if(typeof navigator.mediaSession.setPositionState === 'function' && Number.isFinite(media.duration)){
        navigator.mediaSession.setPositionState({ duration:media.duration||0, position:media.currentTime||0, playbackRate:media.playbackRate||1 });
      }
      navigator.mediaSession.setActionHandler('play', ()=> requestPlayImmediate('mediaSession').catch(()=>{}));
      navigator.mediaSession.setActionHandler('pause', ()=> activeMedia().pause());
      navigator.mediaSession.setActionHandler('seekbackward', ()=> setActiveCurrentTime(activeCurrentTime()-10));
      navigator.mediaSession.setActionHandler('seekforward',  ()=> setActiveCurrentTime(activeCurrentTime()+10));
      navigator.mediaSession.setActionHandler('previoustrack', ()=> $('#btnPrev').click());
      navigator.mediaSession.setActionHandler('nexttrack',     ()=> $('#btnNext').click());
      navigator.mediaSession.setActionHandler('seekto', (d)=>{ if(typeof d.seekTime==='number'){ setActiveCurrentTime(d.seekTime); } });
    }catch{}
  }

  // Media devices change -> reconnect
  try{
    if(navigator.mediaDevices && 'ondevicechange' in navigator.mediaDevices){
      navigator.mediaDevices.ondevicechange = async ()=>{ try{ await OPAudio.ensure(v); OPAudio.reconnect(); }catch{} };
    }
  }catch{}

  /* ====== 追加: マイクロフェード ====== */
  const MASTER_DEFAULT = 1.0;
  let masterTarget = MASTER_DEFAULT;
  async function startMicroFade(){
    try{ await OPAudio.ensure(v); }catch{}
    const ok = OPAudio?.rampPreGain?.(Math.max(0.08, MASTER_DEFAULT*0.22), 0.06);
    if(!ok){
      // フォールバック：video自体の音量
      try{ v._preFadeVol = v.volume; v.volume = Math.max(0.08, v._preFadeVol*0.22); }catch{}
    }
    wrap.classList.add('microfade-on');
  }
  function stopMicroFade(){
    const ok = OPAudio?.rampPreGain?.(masterTarget, 0.10);
    if(!ok){
      try{ if(typeof v._preFadeVol==='number'){ v.volume = v._preFadeVol; delete v._preFadeVol; } }catch{}
    }
    wrap.classList.remove('microfade-on');
  }

  // ====== 追加: スマートおすすめ（ローカル） ======
  function currentTitleForLearn(){
    if(S.fileList.length && S.fileIndex>=0 && S.fileList[S.fileIndex]) return S.fileList[S.fileIndex].name||'';
    const u = S.lastUrl||''; try{ const path = new URL(u, location.href).pathname||''; return decodeURIComponent(path.split('/').pop()||''); }catch{ return u; }
  }
  function learnFrom(title){
    if(!S.learn.auto) return;
    if(!title) return;
    const key = (''+title).toLowerCase();
    const words = key.replace(/[^\p{L}\p{N}\s]/gu,' ').split(/\s+/).filter(w=>w.length>=2 && w.length<=24);
    const dict = S.learn.dict || {};
    for(const w of words){ dict[w]=(dict[w]||0)+1 }
    S.learn.dict=dict; save('pc.learn.dict', dict);
  }
  function suggest(query){
    const q = (query||'').toLowerCase().trim();
    const dict = S.learn.dict || {};
    const entries = Object.entries(dict).sort((a,b)=>b[1]-a[1]).slice(0,50);
    const tags = q ? q.split(/\s+/).filter(Boolean) : entries.slice(0,6).map(x=>x[0]);
    // 候補はローカルファイル群から
    const items = S.fileList.map((f,i)=>({i,title:f.name||'',file:f}));
    const scored = items.map(x=>{
      const name = (x.title||'').toLowerCase();
      let s=0; for(const t of tags){ if(name.includes(t)) s+=2 }
      for(const [w,c] of entries){ if(c>2 && name.includes(w)) s+=1 }
      return {...x,score:s};
    }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,8);

    const out = $('#recoOut');
    out.innerHTML='';
    const card=(h)=>{ const d=document.createElement('div'); d.style.border='1px solid #233044'; d.style.borderRadius='12px'; d.style.padding='.6rem'; d.innerHTML=h; return d };
    if(tags.length){
      const chips = tags.map(t=>`<span class="badge" style="display:inline-block;margin:.1rem .22rem .1rem 0">${t}</span>`).join('');
      out.appendChild(card(`<div class="subtle">キータグ</div>${chips}`));
    }
    if(scored.length){
      const list = scored.map(s=>`<div style="display:flex;align-items:center;gap:.4rem;margin:.2rem 0">
        <button class="btn ghost" data-i="${s.i}">▶</button>
        <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${s.title}</div>
        <span class="badge">score ${s.score}</span>
      </div>`).join('');
      const box = card(`<div class="subtle">プレイリストからのおすすめ</div>${list}`);
      out.appendChild(box);
      box.querySelectorAll('button[data-i]').forEach(b=>{
        b.onclick=()=>{ S.fileIndex=+b.dataset.i; openLocalFile(S.fileList[S.fileIndex]); };
      });
    }else{
      out.appendChild(card(`<div class="subtle">一致する候補が足りません。もう少し再生して学習させてください。</div>`));
    }
  }

  // ===== Boot =====
  window.addEventListener('DOMContentLoaded', ()=>{
    applyLang();
    if (!MOBILE_NATIVE_MODE){ tap.classList.add('hide'); }
    renderEqBands();
    applyEqEnabledUI(window.OPAudio ? OPAudio.eqEnabled : false);
    try{ $('#limiterEnable').value = (window.OPAudio && OPAudio.limiterEnabled) ? 'on':'off'; }catch{}
    if(SAFE_NATIVE_PLAYBACK){
      try{
        OPAudio?.setEnabled?.(false);
        OPAudio?.resetGraph?.();
      }catch{}
      const eqEnable = $('#eqEnable');
      const limiterEnable = $('#limiterEnable');
      if(eqEnable) eqEnable.value = 'off';
      if(limiterEnable) limiterEnable.value = 'off';
      debugLog('mode', 'eq-disabled-safe-native');
    }
    updatePrevNextUI();
    bumpAutoHide();
    // 設定UI 初期反映
    $('#subEnable').value = S.sub.enable?'on':'off';
    $('#subPlate').value  = S.sub.plate?'on':'off';
    $('#subColor').value  = S.sub.color;
    $('#subSize').value   = S.sub.size;
    $('#subOutline').value= S.sub.outline;
    $('#subMargin').value = S.sub.margin;
    $('#subOffset').value = loadNum('pc.sub.offset', 0);
    applySubStyle();

    $('#animMicro').value = S.anim.micro?'on':'off';
    $('#animSeek').value  = S.anim.seek?'on':'off';
    $('#animPlay').value  = S.anim.play?'on':'off';
    $('#animPip').value   = S.anim.pip?'on':'off';

    $('#fxPreset').value = (localStorage.getItem('pc.fx.preset')||'minimal');

    $('#recoAuto').value = S.learn.auto?'on':'off';
    updateMiniAdvancedUi();
    updateMiniMeta();
    updateMiniReadouts();
    syncBadgeState();
    syncControlAvailability();
  });

  // init prefs
  try{ localStorage.removeItem('pc.vol'); }catch(e){}
  v.volume=0.9;
  rateSel.value='1.00';
  setPlaybackRateFromSelect();
  $('#vol').value=v.volume;
  (function syncRateSel(){ const opts=Array.from($('#rateSel').options).map(o=>parseFloat(o.value)); const cur=v.playbackRate||1.0; let idx=0, best=Infinity; for(let i=0;i<opts.length;i++){ const d=Math.abs(opts[i]-cur); if(d<best){best=d; idx=i;} } $('#rateSel').value=opts[idx].toFixed(2); })();
  setPlaybackRateFromSelect();
  (function(){ const val = $('#sleepSel').value; $('#sleepSel').value=val; })();

  // 設定UIの永続化
  $('#animMicro').addEventListener('change', e=>{ S.anim.micro = e.target.value==='on'; save('pc.anim.micro', S.anim.micro?1:0); });
  $('#animSeek').addEventListener('change',  e=>{ S.anim.seek  = e.target.value==='on'; save('pc.anim.seek',  S.anim.seek?1:0);  });
  $('#animPlay').addEventListener('change',  e=>{ S.anim.play  = e.target.value==='on'; save('pc.anim.play',  S.anim.play?1:0);  });
  $('#animPip').addEventListener('change',   e=>{ S.anim.pip   = e.target.value==='on'; save('pc.anim.pip',   S.anim.pip?1:0);   });

  $('#recoAuto').addEventListener('change',  e=>{ S.learn.auto = e.target.value==='on'; save('pc.learn.auto', S.learn.auto?1:0); });

  // おすすめUI
  $('#recoSuggest').addEventListener('click', ()=> suggest($('#recoQuery').value));
  $('#recoRefresh').addEventListener('click', ()=> suggest($('#recoQuery').value));
  $('#recoClear').addEventListener('click', ()=>{ S.learn.dict={}; save('pc.learn.dict',{}); $('#recoOut').innerHTML=''; });

})();
