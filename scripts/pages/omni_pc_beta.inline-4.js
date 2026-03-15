(function(){
  const $=sel=>document.querySelector(sel);
  const v=$('#v'), wrap=$('#wrap'), ctrl=$('#ctrl'), seekWrap=$('#seekWrap'), seekEl=$('#seek'), seekTip=$('#seekTip');
  const tap=$('#tap'), tapBtn=$('#tapBtn'), dropHint=$('#dropHint');

  // i18n
  const I={ ja:{ btn_play:'再生/一時停止', btn_back:'-10秒', btn_fwd:'+10秒', btn_prev:'前へ', btn_next:'次へ', btn_mute:'ミュート',
    btn_tips:'Tips', btn_settings:'設定', btn_loop:'ループ', btn_pip:'PiP', btn_fs:'全画面', close_btn:'閉じる (Esc)',
    btn_more:'詳細設定を表示', btn_less:'詳細設定を閉じる', mini_note:'mini は最小構成で表示中。詳細設定は必要時のみ開けます。',
    label_volume:'音量', label_rate:'速度', label_sleep:'タイマー',
    settings_title:'設定', source_title:'ソース', open_btn:'開く',
    fx_title:'アニメーションFX', fx_preset:'プリセット', fx_minimal:'Minimal', fx_glow:'Glow', fx_neon:'Neon', fx_clean:'Clean',
    tips_title:'Tips / ショートカット',
    tips:[ ['Space','再生/一時停止','←/→','10秒移動'], ['0..9','位置ジャンプ(%)','[ / ]','速度 ±1段階'],
           ['F','フルスクリーン','P','PiP'], ['M','ミュート','D','自動非表示 ON/OFF'],
           ['S','スクショPNG保存','A/B/L','ABループ 設定/設定/切替'], [', / .','前 / 次（Altで前後フレーム）','',''] ],
    badge_idle:'IDLE', badge_ready:'READY', badge_play:'再生', badge_pause:'一時停止', badge_muted:'ミュート',
    badge_play_loop:'再生・ループ', badge_pause_loop:'一時停止・ループ', badge_resume:'レジューム', badge_shot:'保存', badge_safe:'SAFE'
  }, en:{ btn_play:'Play/Pause', btn_back:'-10s', btn_fwd:'+10s', btn_prev:'Prev', btn_next:'Next', btn_mute:'Mute',
    btn_tips:'Tips', btn_settings:'Settings', btn_loop:'Loop', btn_pip:'PiP', btn_fs:'Fullscreen', close_btn:'Close (Esc)',
    btn_more:'Show advanced', btn_less:'Hide advanced', mini_note:'mini starts in core mode. Open advanced settings only when needed.',
    label_volume:'Vol', label_rate:'Speed', label_sleep:'Sleep',
    settings_title:'Settings', source_title:'Source', open_btn:'Open',
    fx_title:'Animation FX', fx_preset:'Preset', fx_minimal:'Minimal', fx_glow:'Glow', fx_neon:'Neon', fx_clean:'Clean',
    tips_title:'Tips / Shortcuts',
    tips:[ ['Space','Play/Pause','Left/Right','Seek 10s'], ['0..9','Jump (%)','[ / ]','Speed ±1 step'],
           ['F','Fullscreen','P','PiP'], ['M','Mute','D','Auto-hide toggle'],
           ['S','Save PNG','A/B/L','AB loop Set/Set/Toggle'], [', / .','Prev / Next (Alt=frame)','',''] ],
    badge_idle:'IDLE', badge_ready:'READY', badge_play:'PLAY', badge_pause:'PAUSE', badge_muted:'MUTED',
    badge_play_loop:'PLAY • LOOP', badge_pause_loop:'PAUSE • LOOP', badge_resume:'RESUME', badge_shot:'SHOT', badge_safe:'SAFE'
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
  }
  function renderTips(){
    const tips = I[LANG].tips, body=$('#tipsBody'); body.innerHTML='';
    for(const row of tips){
      const div=document.createElement('div'); div.className='kbd';
      const [a1,a2,b1,b2]=row;
      const p1=document.createElement('p'); p1.innerHTML= a1? `<kbd>${a1}</kbd> ${a2||''}` : (a2||''); div.appendChild(p1);
      if(b1||b2){ const p2=document.createElement('p'); p2.innerHTML=b1? `<kbd>${b1}</kbd> ${b2||''}` : (b2||''); div.appendChild(p2); }
      body.appendChild(div);
    }
  }
  $('#btnLang').addEventListener('click',()=>{ LANG=(LANG==='ja'?'en':'ja'); try{ localStorage.setItem('pc.lang',LANG);}catch{} applyLang(); setBadge(v.paused ? t('badge_pause') : t('badge_play')); });

  const setBadge=(txt)=> $('#badgeState').textContent=txt;

  // ===== Mobile Unlock =====
  async function unlockAudio(){ try{ await OPAudio.ensure(v); }catch{} tap.classList.add('hide'); }
  tapBtn.addEventListener('click', async ()=>{ await unlockAudio(); try{ await v.play(); }catch{} }, {passive:true});
  tap.addEventListener('click', async ()=>{ await unlockAudio(); }, {passive:true});

  // ===== State =====
  const S={ dragging:false, duration:0, subOffset:0, subTrack:null, _hls:null,
    lastUrl:null, lastBlobUrl:null, autoHide:true, autoHideMs:3000, autoHideTimer:null,
    fileList:[], fileIndex:0, wakeLock:null, loopA:null, loopB:null, loopOn:false, loopWholePending:false,
    lastTap:0, lastTapX:0, sleepLeft:0, sleepTimer:null, watchTimers:[],
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

  // ===== Times / Buffer / Seek tip =====
  function updateSeekTip(){ if(!S.dragging) return; const rect=seekEl.getBoundingClientRect(); const p=+seekEl.value/1000; const x=rect.left+rect.width*p; seekTip.style.left=x+'px'; const sec=(v.duration||0)*p; seekTip.textContent=fmt(sec); }
  function updateTimes(){
    $('#cur').textContent=fmt(v.currentTime||0); $('#dur').textContent=isFinite(v.duration)?fmt(v.duration):'0:00';
    if(!S.dragging && isFinite(v.duration)){ const p=Math.max(0,Math.min(1,(v.currentTime||0)/(v.duration||1))); seekEl.value=Math.round(p*1000); }
    try{ const buf=v.buffered; let end=0; for(let i=0;i<buf.length;i++){ end=Math.max(end, buf.end(i)||0); } const b=(isFinite(v.duration)&&v.duration>0)? (end/v.duration*100).toFixed(1)+'%':'0%'; seekWrap.style.setProperty('--buf', b); seekWrap.dataset.buffer=b; }catch{}
    updateSeekTip();
  }

  // ===== Auto Hide =====
  function showUI(){ ctrl.classList.remove('is-hidden'); document.body.classList.remove('hide-cursor'); }
  function hideUI(){
    if(!S.autoHide) return;
    if(!v.paused && !isAnyPanelOpen() && !S.dragging){
      ctrl.classList.add('is-hidden'); document.body.classList.add('hide-cursor');
    }
  }
  function bumpAutoHide(){
    showUI(); clearTimeout(S.autoHideTimer);
    if(!v.paused && !isAnyPanelOpen()){
      S.autoHideTimer = setTimeout(hideUI, S.autoHideMs); // 3秒で完全に消える
    }
  }
  const isAnyPanelOpen=()=> $('#settingsScrim').classList.contains('show') || $('#tipsScrim').classList.contains('show');

  // ===== Wake Lock =====
  async function lockWake(){ try{ if('wakeLock' in navigator && !S.wakeLock){ S.wakeLock=await navigator.wakeLock.request('screen'); S.wakeLock.addEventListener?.('release',()=>S.wakeLock=null);} }catch{} }
  async function releaseWake(){ try{ await S.wakeLock?.release(); }catch{} finally{ S.wakeLock=null; } }
  document.addEventListener('visibilitychange', ()=>{ if(document.visibilityState==='visible' && !v.paused) lockWake(); });

  // ===== Watchdogs =====
  function clearWatchdogs(){ S.watchTimers.forEach(id=>clearTimeout(id)); S.watchTimers=[]; }
  function startWatchdogs(){
    clearWatchdogs();
    S.watchTimers.push(setTimeout(()=>{
      const ctx = window.OPAudio?.ctx;
      if (OPAudio?.eqEnabled && (!ctx || ctx.state!=='running')) {
        try{ OPAudio.setEnabled(false); OPAudio.resetGraph(); }catch{}
        v.muted=false; setBadge(t('badge_safe'));
        setTimeout(()=> setBadge(v.paused ? t('badge_pause'): t('badge_play')),1100);
      }
    }, 550));
  }

  // ===== 再生時サニティチェック（無音対策） =====
  function sanityAfterPlay(){
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
    await OPAudio.ensure(v); // クリック再生は確実に復帰
    if($('#animPlay')?.value==='on' && S.anim.play){ $('#btnPlay').classList.remove('spring'); void $('#btnPlay').offsetWidth; $('#btnPlay').classList.add('spring'); }
    if(v.paused){ try{ await v.play(); }catch{} } else v.pause();
  });

  v.addEventListener('play', async ()=>{
    // どの経路で再生しても毎回グラフ＆Contextを復帰→サイレント対策の要
    try{ await OPAudio.ensure(v); OPAudio.reconnect(); }catch{}
    setBadge(S.loopOn? I[LANG].badge_play_loop : I[LANG].badge_play);
    lockWake(); bumpAutoHide(); tap.classList.add('hide'); startWatchdogs();
    sanityAfterPlay();
    // 学習AI：タイトル学習
    learnFrom(currentTitleForLearn());
  });

  v.addEventListener('pause', ()=>{ setBadge(S.loopOn? I[LANG].badge_pause_loop : I[LANG].badge_pause); showUI(); releaseWake(); clearWatchdogs(); });

  v.addEventListener('loadedmetadata', ()=>{
    S.duration=v.duration||0; updateTimes(); setBadge(I[LANG].badge_ready); maybeShowResumeButton(); trySetupMediaSession();
    if(S.loopOn && S.loopWholePending && isFinite(v.duration) && v.duration>0){ S.loopA=0; S.loopB=v.duration; S.loopWholePending=false; updateABStyle(); }
  });

  v.addEventListener('timeupdate', ()=>{
    if (S.loopOn && S.loopA!=null && S.loopB!=null && S.loopB>S.loopA){
      if (v.currentTime > S.loopB - 0.03){ v.currentTime = S.loopA; }
    }
    updateTimes();
    if (S.sleepLeft>0 && !v.paused){ S.sleepLeft -= 1; updateSleepBadge(); if (S.sleepLeft<=0){ v.pause(); } }
    if(isFinite(v.duration) && Math.floor(v.currentTime)%5===0){ try{ localStorage.setItem('pc.lastUrl', S.lastUrl||''); localStorage.setItem('pc.lastTime', String(v.currentTime||0)); }catch{} }
  });

  v.addEventListener('ended', ()=>{
    if (S.loopOn){
      if(S.loopA!=null && S.loopB!=null && S.loopB>S.loopA){ v.currentTime=S.loopA; v.play().catch(()=>{}); }
      else { v.currentTime=0; v.play().catch(()=>{}); }
      return;
    }
    setBadge('ENDED'); showUI(); releaseWake(); clearWatchdogs();
    if(S.fileList.length>0 && S.fileIndex<S.fileList.length-1){ S.fileIndex++; openLocalFile(S.fileList[S.fileIndex]); }
  });

  // クリック（隠れている時はまずUIを出す）
  v.addEventListener('click', (e)=>{
    if (ctrl.classList.contains('is-hidden')) { bumpAutoHide(); return; }
    const now=performance.now(); const dx=Math.abs(e.clientX - S.lastTapX);
    const flash=()=>{ v.style.filter='brightness(1.15)'; setTimeout(()=> v.style.filter='',120); };
    if(now - S.lastTap < 320 && dx < 80){
      const x=e.clientX, w=wrap.clientWidth;
      if(x < w*0.4) v.currentTime = Math.max(0,(v.currentTime||0)-10);
      else if(x > w*0.6) v.currentTime = Math.min(v.duration||0,(v.currentTime||0)+10);
      flash(); bumpAutoHide();
    }else{
      if (v.paused) { v.play().catch(()=>{}); } else { v.pause(); }
    }
    S.lastTap=now; S.lastTapX=e.clientX;
  });

  // ダブルクリックでFS
  wrap.addEventListener('dblclick', ()=>{ toggleFS(); });

  wrap.addEventListener('wheel', (e)=>{
    if(isAnyPanelOpen()) return;
    if(e.shiftKey){ e.preventDefault(); const sign=(e.deltaY>0?1:-1); v.currentTime=clamp((v.currentTime||0)+sign*10,0,v.duration||Number.MAX_SAFE_INTEGER); }
    else{ e.preventDefault(); v.volume=clamp((v.volume||0.9)+(e.deltaY>0?-0.05:0.05),0,1); $('#vol').value=v.volume; try{ localStorage.setItem('pc.vol', v.volume);}catch{} }
    bumpAutoHide();
  }, {passive:false});

  $('#btnBack').addEventListener('click', ()=>{ v.currentTime=Math.max(0,(v.currentTime||0)-10); bumpAutoHide(); });
  $('#btnFwd') .addEventListener('click', ()=>{ v.currentTime=Math.min((v.duration||0),(v.currentTime||0)+10); bumpAutoHide(); });
  $('#btnPrev').addEventListener('click', ()=>{ if(S.fileList.length>0 && S.fileIndex>0){ S.fileIndex--; openLocalFile(S.fileList[S.fileIndex]); } });
  $('#btnNext').addEventListener('click', ()=>{ if(S.fileList.length>0 && S.fileIndex<S.fileList.length-1){ S.fileIndex++; openLocalFile(S.fileList[S.fileIndex]); } });
  $('#btnMute').addEventListener('click', ()=>{ v.muted=!v.muted; setBadge(v.muted? I[LANG].badge_muted : (S.loopOn? I[LANG].badge_play_loop: I[LANG].badge_play)); });

  // Seek
  const startDrag=()=>{ S.dragging=true; showUI(); seekTip.classList.add('show'); updateSeekTip(); if($('#animMicro')?.value==='on' && S.anim.micro){ startMicroFade(); } };
  const endDrag =()=>{ S.dragging=false; seekTip.classList.remove('show'); bumpAutoHide(); stopMicroFade(); if($('#animSeek')?.value==='on' && S.anim.seek){ seekWrap.classList.remove('seek-bounce'); void seekWrap.offsetWidth; seekWrap.classList.add('seek-bounce'); } };
  seekEl.addEventListener('input', ()=>{ const p=+seekEl.value/1000; $('#cur').textContent=fmt((v.duration||0)*p); updateSeekTip(); });
  seekEl.addEventListener('change',()=>{ const p=+seekEl.value/1000; v.currentTime=(v.duration||0)*p; endDrag(); });
  seekEl.addEventListener('mousedown', startDrag); seekEl.addEventListener('mouseup', endDrag);
  seekEl.addEventListener('touchstart', startDrag, {passive:true}); seekEl.addEventListener('touchend', endDrag);

  // volume / rate
  $('#vol').addEventListener('input', e=>{ v.volume=+e.target.value; bumpAutoHide(); });
  const rateSel=$('#rateSel');
  function setPlaybackRateFromSelect(){ const val=parseFloat(rateSel.value); v.playbackRate=isFinite(val)?val:1.0; try{ localStorage.setItem('pc.rate.'+(S.lastUrl||'default'), String(v.playbackRate)); }catch{} }
  rateSel.addEventListener('change', ()=>{ setPlaybackRateFromSelect(); bumpAutoHide(); });
  function stepRate(delta){ const opts=Array.from(rateSel.options).map(o=>parseFloat(o.value)); const cur=parseFloat(rateSel.value); let idx=opts.findIndex(x=>x===cur); if(idx<0) idx=Math.max(0,opts.findIndex(x=>x===1.0)); idx=Math.min(Math.max(idx+delta,0),opts.length-1); rateSel.value=opts[idx].toFixed(2); setPlaybackRateFromSelect(); }

  // Sleep timer
  const sleepSel = $('#sleepSel');
  function applySleep(){ S.sleepLeft = parseInt(sleepSel.value||'0',10); clearInterval(S.sleepTimer); if (S.sleepLeft>0){ S.sleepTimer=setInterval(()=>{ if(!v.paused){ S.sleepLeft -= 1; updateSleepBadge(); if (S.sleepLeft<=0){ clearInterval(S.sleepTimer); v.pause(); } } }, 1000); } else { setBadge(v.paused ? (S.loopOn? I[LANG].badge_pause_loop: I[LANG].badge_pause) : (S.loopOn? I[LANG].badge_play_loop : I[LANG].badge_play)); } }
  function updateSleepBadge(){ if (S.sleepLeft>0){ const mm=Math.floor(S.sleepLeft/60).toString(); const ss=Math.floor(S.sleepLeft%60).toString().padStart(2,'0'); const suffix=` • ${mm}:${ss}`; const base=v.paused ? (S.loopOn? I[LANG].badge_pause_loop: I[LANG].badge_pause) : (S.loopOn? I[LANG].badge_play_loop : I[LANG].badge_play); setBadge(base+suffix); } }
  sleepSel.addEventListener('change', applySleep);

  // PiP / FS
  async function togglePiP(){ try{
      if(document.pictureInPictureElement){
        if($('#animPip')?.value==='on' && S.anim.pip){ wrap.classList.remove('pip-fade-enter'); wrap.classList.add('pip-fade-leave'); setTimeout(()=> wrap.classList.remove('pip-fade-leave'), 160); }
        await document.exitPictureInPicture();
      } else {
        const el = await v.requestPictureInPicture();
        if($('#animPip')?.value==='on' && S.anim.pip){ wrap.classList.remove('pip-fade-leave'); wrap.classList.add('pip-fade-enter'); setTimeout(()=> wrap.classList.remove('pip-fade-enter'), 140); }
      }
    }catch(e){ setBadge('PiP NG') } }
  async function toggleFS(){ try{ if(!document.fullscreenElement){ await wrap.requestFullscreen?.(); } else { await document.exitFullscreen?.(); } }catch{} }
  $('#btnPip').addEventListener('click', ()=>{ togglePiP(); bumpAutoHide(); });
  $('#btnFs') .addEventListener('click', ()=>{ toggleFS();  bumpAutoHide(); });
  document.addEventListener('fullscreenchange', ()=>{
    ctrl.classList.toggle('fs-minimal', !!document.fullscreenElement);
    showUI(); bumpAutoHide();
  });

  // URL / HLS / File
  function isHls(u){ return /\.m3u8($|\?)/i.test(u) }
  function stopHls(){ if(S._hls){ try{ S._hls.destroy() }catch(e){} S._hls=null } }
  function revokeBlob(){ if(S.lastBlobUrl){ try{ URL.revokeObjectURL(S.lastBlobUrl) }catch{} S.lastBlobUrl=null; } }
  async function openUrl(u){
    if(!u) return; stopHls(); revokeBlob(); v.removeAttribute('src'); v.load();
    S.lastUrl=u; try{ localStorage.setItem('pc.lastUrl', u);}catch{}
    try{ const r = parseFloat(localStorage.getItem('pc.rate.'+S.lastUrl)||'NaN'); if(isFinite(r)){ rateSel.value=r.toFixed(2); setPlaybackRateFromSelect(); } }catch{}
    if(isHls(u) && window.Hls && Hls.isSupported()){
      S._hls=new Hls({enableWorker:false}); S._hls.attachMedia(v);
      S._hls.on(Hls.Events.MEDIA_ATTACHED, ()=> S._hls.loadSource(u));
      S._hls.on(Hls.Events.MANIFEST_PARSED, async ()=>{ await OPAudio.ensure(v); try{ await v.play(); }catch{} tap.classList.add('hide'); trySetupMediaSession(); learnFrom(currentTitleForLearn()); });
    }else{
      v.src=u;
      v.onloadedmetadata=async ()=>{ await OPAudio.ensure(v); try{ await v.play(); }catch{} tap.classList.add('hide'); v.onloadedmetadata=null; trySetupMediaSession(); learnFrom(currentTitleForLearn()); };
    }
  }
  $('#openUrl').addEventListener('click', ()=>{ openUrl(($('#url').value||'').trim()); });

  function updatePrevNextUI(){
    const hasPrev = S.fileList.length>0 && S.fileIndex>0;
    const hasNext = S.fileList.length>0 && S.fileIndex<S.fileList.length-1;
    $('#btnPrev').disabled = !hasPrev;
    $('#btnNext').disabled = !hasNext;
  }
  function openLocalFile(file){
    if(!file) return; stopHls(); revokeBlob(); v.removeAttribute('src'); v.load();
    const url=URL.createObjectURL(file); S.lastBlobUrl=url; S.lastUrl='file:'+file.name;
    try{ const r = parseFloat(localStorage.getItem('pc.rate.'+S.lastUrl)||'NaN'); if(isFinite(r)){ rateSel.value=r.toFixed(2); setPlaybackRateFromSelect(); } }catch{}
    v.src=url; v.play().catch(()=>{}); tap.classList.add('hide');
    updatePrevNextUI(); trySetupMediaSession(file);
    learnFrom(currentTitleForLearn());
  }
  $('#file').addEventListener('change', e=>{ S.fileList=Array.from(e.target.files||[]); S.fileIndex=0; openLocalFile(S.fileList[0]); updatePrevNextUI(); });

  // Drag & Drop
  ['dragenter','dragover'].forEach(ev=>{
    wrap.addEventListener(ev, e=>{ e.preventDefault(); dropHint.classList.add('show'); }, {passive:false});
  });
  ['dragleave','drop'].forEach(ev=>{
    wrap.addEventListener(ev, e=>{
      e.preventDefault();
      if(ev==='drop'){
        const files=Array.from(e.dataTransfer?.files||[]).filter(f=>/audio|video|mpegurl|mp4|mp3|m3u8/i.test(f.type) || /\.(m3u8|mp4|mp3|m4a|webm|ogg)$/i.test(f.name));
        if(files.length){ S.fileList=files; S.fileIndex=0; openLocalFile(files[0]); }
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
    setBadge(v.paused ? (S.loopOn? I[LANG].badge_pause_loop: I[LANG].badge_pause) : (S.loopOn? I[LANG].badge_play_loop : I[LANG].badge_play));
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
    if(e.key==='A'){ S.loopA=v.currentTime||0; S.loopOn=true; updateLoopBadge(); updateABStyle(); }
    if(e.key==='B'){ S.loopB=v.currentTime||0; S.loopOn=true; updateLoopBadge(); updateABStyle(); }
    if(e.key==='L'){ S.loopOn=!S.loopOn; updateLoopBadge(); }
    if(e.key===',' ){ if(e.altKey && v.paused){ v.currentTime=Math.max(0,(v.currentTime||0)-1/60); } else { $('#btnPrev').click(); } }
    if(e.key==='.' ){ if(e.altKey && v.paused){ v.currentTime=Math.min(v.duration||0,(v.currentTime||0)+1/60); } else { $('#btnNext').click(); } }
    if(e.key==='?'){ showPanel($('#tipsScrim')); }
    if(/^[0-9]$/.test(e.key) && isFinite(v.duration)){ v.currentTime = v.duration * (+e.key/10) }
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
    setBadge(I[LANG].badge_shot); setTimeout(()=> setBadge(v.paused?(S.loopOn? I[LANG].badge_pause_loop: I[LANG].badge_pause):(S.loopOn? I[LANG].badge_play_loop: I[LANG].badge_play)), 1200);
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
        btn.onclick=()=>{ v.currentTime=lt; btn.style.display='none'; setBadge(I[LANG].badge_resume); setTimeout(()=> setBadge(v.paused? I[LANG].badge_pause : I[LANG].badge_play), 1000); };
      }else{
        $('#btnResume').style.display='none';
      }
    }catch{}
  }

  // Media Session API
  function trySetupMediaSession(file){
    try{
      if(!('mediaSession' in navigator)) return;
      const title = (S.lastUrl||'').replace(/^.*\//,'');
      navigator.mediaSession.metadata = new MediaMetadata({
        title: file?.name || title || 'Omni Player mini',
        artist: '', album: '', artwork: []
      });
      navigator.mediaSession.setActionHandler('play', ()=> v.play());
      navigator.mediaSession.setActionHandler('pause', ()=> v.pause());
      navigator.mediaSession.setActionHandler('seekbackward', ()=> v.currentTime=Math.max(0,(v.currentTime||0)-10));
      navigator.mediaSession.setActionHandler('seekforward',  ()=> v.currentTime=Math.min(v.duration||0,(v.currentTime||0)+10));
      navigator.mediaSession.setActionHandler('previoustrack', ()=> $('#btnPrev').click());
      navigator.mediaSession.setActionHandler('nexttrack',     ()=> $('#btnNext').click());
      navigator.mediaSession.setActionHandler('seekto', (d)=>{ if(typeof d.seekTime==='number'){ v.currentTime=d.seekTime; } });
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
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile){ tap.classList.add('hide'); }
    renderEqBands();
    applyEqEnabledUI(window.OPAudio ? OPAudio.eqEnabled : false);
    try{ $('#limiterEnable').value = (window.OPAudio && OPAudio.limiterEnabled) ? 'on':'off'; }catch{}
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
  });

  // init prefs
  try{ v.volume=+localStorage.getItem('pc.vol')||0.9 }catch(e){}
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
