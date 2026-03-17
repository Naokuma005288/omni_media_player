/* ========= util & refs ========= */
const qs=(s,r=document)=>r.querySelector(s); const qsa=(s,r=document)=>Array.from(r.querySelectorAll(s));
const $={
  v:qs('#v'),wrap:qs('#playerWrap'),shell:qs('#playerShell'),ambientLight:qs('#ambientLight'),bgArt:qs('#bgArt'),artWrap:qs('#artWrap'),
  headerCanvas:qs('#headerCanvas'),statusCanvas:qs('#statusCanvas'),
  // ★ 追加: FX要素
  fxAurora:qs('#fxAurora'),fxStars:qs('#fxStars'),fxGrid:qs('#fxGrid'),fxBeams:qs('#fxBeams'),fxNebula:qs('#fxNebula'),

  // ★ 追加: ローダー
  loader:qs('#loader'),
  embedError:qs('#embedError'),embedErrorTitle:qs('#embedErrorTitle'),embedErrorText:qs('#embedErrorText'),embedErrorHint:qs('#embedErrorHint'),embedErrorAction:qs('#embedErrorAction'),embedErrorClose:qs('#embedErrorClose'),

  seek:qs('#seek'),seekProg:qs('#seekProg'),seekThumb:qs('#seekThumb'),seekPrev:qs('#seekPrev'),seekImg:qs('#seekImg'),seekTime:qs('#seekTime'),
  toasts:qs('#toasts'),url:qs('#url'),openUrl:qs('#openUrl'),file:qs('#fileInput'),
  fileMeta:qs('#fileMeta'),
  srt:qs('#srtInput'),aud:qs('#audInput'),unloadSub:qs('#btnUnloadSub'),unloadAud:qs('#btnUnloadAud'),driftMode:qs('#driftMode'),
  srtMeta:qs('#srtMeta'),audMeta:qs('#audMeta'),
  subSize:qs('#subSize'),subOutline:qs('#subOutline'),subMargin:qs('#subMargin'),subPreset:qs('#subPreset'),
  vol:qs('#vol'),rate:qs('#rate'),master:qs('#master'),
  volRead:qs('#volRead'),rateRead:qs('#rateRead'),masterRead:qs('#masterRead'),
  play:qs('#play'),back10:qs('#back10'),fwd10:qs('#fwd10'),pip:qs('#pip'), fullscreen:qs('#fullscreen'),
  setA:qs('#setA'),setB:qs('#setB'),clearAB:qs('#clearAB'),abDisp:qs('#abDisp'),toggleABLoop:qs('#toggleABLoop'),abLoopStat:qs('#abLoopStat'),
  playlist:qs('#playlist'),btnClear:qs('#btnClear'),btnShuffle:qs('#btnShuffle'),dropMode:qs('#dropMode'),contPlay:qs('#contPlay'),
  helpBtn:qs('#btnHelp'),help:qs('#kbdHelp'),
  installPwa:qs('#btnInstallPwa'),pwaBadge:qs('#pwaBadge'),
  saveList:qs('#saveList'),loadList:qs('#loadList'),clearList:qs('#clearList'),
  themeSelect:qs('#themeSelect'), langSelect:qs('#langSelect'),
  assLayer:qs('#assLayer'), spectrum:qs('#spectrum'),
  fontInput:qs('#fontInput'), fontMeta:qs('#fontMeta'), btnClearFonts:qs('#btnClearFonts'),
  audioInfo:qs('#audioInfo'), audioCover:qs('#audioCover'), audioTitle:qs('#audioTitle'), audioSub:qs('#audioSub'),
  settings:qs('#settings'), btnSettings:qs('#btnSettings'), btnSettingsClose:qs('#btnSettingsClose'),
  specMode:qs('#specMode'), specOverlay:qs('#specOverlay'), specSens:qs('#specSens'), specBins:qs('#specBins'),
  hueLow:qs('#hueLow'), hueHigh:qs('#hueHigh'), sat:qs('#sat'), light:qs('#light'),
  rainbowSpeed:qs('#rainbowSpeed'), rainbowPhase:qs('#rainbowPhase'),
  subSearch:qs('#subSearch'), btnSubSearch:qs('#btnSubSearch'), subHits:qs('#subHits'),
  eqGrid:qs('#eqGrid'), eqPreset:qs('#eqPreset'), eqBypass:qs('#eqBypass'), eqState:qs('#eqState'),
  // Anim toggles
  animBgKen:qs('#animBgKen'),animCoverTilt:qs('#animCoverTilt'),animCoverSpin:qs('#animCoverSpin'),animBtnLift:qs('#animBtnLift'),
  animSpecGlow:qs('#animSpecGlow'),animSpecTrails:qs('#animSpecTrails'),animThumbPulse:qs('#animThumbPulse'),
  animToastSlide:qs('#animToastSlide'),animModalZoom:qs('#animModalZoom'),animPlSlide:qs('#animPlSlide'),
  animAbBlink:qs('#animAbBlink'),animHeaderShim:qs('#animHeaderShim'),animParticles:qs('#animParticles'),animCardParallax:qs('#animCardParallax'),
  // New basic
  animBokeh:qs('#animBokeh'),animScanlines:qs('#animScanlines'),animGradBorder:qs('#animGradBorder'),animCRT:qs('#animCRT'),
  animVideoEdge:qs('#animVideoEdge'),
  animVignette:qs('#animVignette'),animGlitch:qs('#animGlitch'),animSpecBeat:qs('#animSpecBeat'),animCoverBob:qs('#animCoverBob'),
  // DX
  animFxAurora:qs('#animFxAurora'),animFxStars:qs('#animFxStars'),animFxGrid:qs('#animFxGrid'),animFxBeams:qs('#animFxBeams'),animFxNebula:qs('#animFxNebula'),

  // ★ 反映ボタン系
  btnApplyAnim:qs('#btnApplyAnim'),btnAnimRevert:qs('#btnAnimRevert'),animDirtyBadge:qs('#animDirtyBadge')
};
const store={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
function toast(msg,type='ok',timeout=3400){const d=document.createElement('div');d.className='t '+type;d.textContent=msg;$.toasts.appendChild(d);setTimeout(()=>d.remove(),timeout)}
const fmt=s=>{if(s==null||isNaN(s))return '-';const sec=Math.floor(s%60).toString().padStart(2,'0');const m=Math.floor(s/60);return `${m}:${sec}`};
function pct(v){ return `${Math.round((+v||0)*100)}%` }
function isStandalonePwa(){
  return window.matchMedia?.('(display-mode: standalone)').matches ||
    window.navigator.standalone === true ||
    document.referrer.startsWith?.('android-app://');
}
function fileLooksLikeVideo(file){
  const name = String(file?.name || '');
  return !!(file?.type?.startsWith?.('video/') || /\.(mp4|m4v|mov|webm|mkv|avi|wmv|ogv)$/i.test(name));
}
function fileLooksLikeAudio(file){
  const name = String(file?.name || '');
  return !!(file?.type?.startsWith?.('audio/') || /\.(mp3|m4a|aac|flac|wav|ogg|opus|oga)$/i.test(name));
}
function srcLooksLikeAudio(src=''){
  return /\.(mp3|m4a|aac|flac|wav|ogg|opus|oga)(\?|$)/i.test(String(src));
}
function currentHtml5IsAudio(){
  if(state.mediaKind !== 'html5') return false;
  const currentItem = state.list[state.cur];
  if(currentItem?.file){
    if(fileLooksLikeAudio(currentItem.file)) return true;
    if(fileLooksLikeVideo(currentItem.file)) return false;
  }
  const src = $.v?.currentSrc || $.v?.src || state.activeUrl || '';
  if(srcLooksLikeAudio(src)) return true;
  const vw = +($.v?.videoWidth || 0);
  const vh = +($.v?.videoHeight || 0);
  if(vw > 0 || vh > 0) return false;
  return false;
}
function setFileMeta(el, files, emptyText){
  if(!el) return;
  const list = Array.from(files||[]).filter(Boolean);
  if(!list.length){ el.textContent = emptyText; return; }
  if(list.length===1){ el.textContent = list[0].name || emptyText; return; }
  el.textContent = `${list[0].name} +${list.length-1}`;
}
function updateSliderReadouts(){
  if($.volRead) $.volRead.textContent = pct($.vol?.value);
  if($.rateRead) $.rateRead.textContent = pct($.rate?.value);
  if($.masterRead) $.masterRead.textContent = pct($.master?.value);
}
function clearEmbedErrorAction(){
  if($.embedErrorAction){
    $.embedErrorAction.hidden = true;
    $.embedErrorAction.onclick = null;
  }
  if($.embedErrorHint){
    $.embedErrorHint.hidden = true;
    $.embedErrorHint.textContent = '';
  }
}
function setPortraitFrameMode(on){
  $.wrap?.classList.remove('portrait-frame');
}
function updateVideoFrameMode(){
  setPortraitFrameMode(false);
}
function canUsePiP(){
  const v = $.v;
  if(state.mediaKind !== 'html5' || !v) return false;
  if(typeof v.requestPictureInPicture === 'function' && document.pictureInPictureEnabled) return true;
  if(typeof v.webkitSupportsPresentationMode === 'function' && typeof v.webkitSetPresentationMode === 'function'){
    try{ return !!v.webkitSupportsPresentationMode('picture-in-picture'); }catch(e){}
  }
  return false;
}
function canUseFullscreen(){
  const v = $.v, wrap = $.shell || $.wrap;
  if(state.mediaKind !== 'html5' || !v || !wrap) return false;
  return !!(
    wrap.requestFullscreen ||
    wrap.webkitRequestFullscreen ||
    wrap.msRequestFullscreen ||
    v.webkitEnterFullscreen
  );
}
function syncMediaControlAvailability(){
  const kind = state.mediaKind || 'html5';
  const isHtml5 = kind === 'html5';
  const isIframeMode = kind === 'iframe';
  if($.pip) $.pip.disabled = !canUsePiP();
  if($.fullscreen) $.fullscreen.disabled = !canUseFullscreen();
  [$.setA,$.setB,$.clearAB,$.toggleABLoop].forEach(el=>{ if(el) el.disabled = isIframeMode; });
  [$.srt,$.unloadSub,$.subSearch,$.btnSubSearch].forEach(el=>{ if(el) el.disabled = !isHtml5; });
  if($.rate) $.rate.disabled = isIframeMode;
  if($.vol) $.vol.disabled = isIframeMode;
}
function applyCurrentMediaTunables(){
  const vol = Math.max(0, Math.min(1, +($.vol?.value || 0)));
  const rate = +($.rate?.value || 1);
  if(state.mediaKind === 'youtube'){
    try{
      state.yt?.setVolume?.(Math.round(vol*100));
      if(vol===0) state.yt?.mute?.(); else state.yt?.unMute?.();
      state.yt?.setPlaybackRate?.(rate);
    }catch(e){}
    return;
  }
  if(state.mediaKind !== 'html5') return;
  $.v.volume = vol;
  $.v.playbackRate = rate;
  if(state.extAudio){
    state.extAudio.volume = vol;
    state.extAudio.playbackRate = rate;
  }
}
function syncMediaPresentation(){
  updateVideoFrameMode();
  updateSpectrumVisibility();
  syncMediaControlAvailability();
  enforceBackdropPolicy();
}
function setMediaMode(kind, extra={}){
  state.mediaKind = kind;
  state.activeUrl = extra.url || state.activeUrl || '';
  state.usingYouTube = kind === 'youtube';
  state.usingIframe = kind === 'iframe';
  if(kind !== 'html5') state.isAudioOnly = false;
  syncMediaControlAvailability();
}
function hideEmbedError(){
  clearEmbedErrorAction();
  if($.embedError) $.embedError.hidden=true;
}
function showEmbedError(title,text,opts={}){
  if($.embedErrorTitle) $.embedErrorTitle.textContent=title||'埋め込みを開始できません';
  if($.embedErrorText) $.embedErrorText.textContent=text||'URL を確認してもう一度お試しください。';
  if($.embedErrorHint){
    $.embedErrorHint.hidden = !opts.hint;
    $.embedErrorHint.textContent = opts.hint || '';
  }
  if($.embedErrorAction){
    $.embedErrorAction.hidden = !(opts.actionLabel && opts.actionHandler);
    $.embedErrorAction.textContent = opts.actionLabel || '開く';
    $.embedErrorAction.onclick = opts.actionHandler || null;
  }
  if($.embedError) $.embedError.hidden=false;
}
$.embedErrorClose?.addEventListener('click', hideEmbedError);

/* ★ 追加：字幕検索用 安全なエスケープ */
const escHTML=(t)=>String(t).replace(/[&<>"']/g,m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));

/* ★ 追加：グローバル hsl（スペクトラム用） */
function hsl(h, s, l, a) {
  h = ((h % 360) + 360) % 360;
  return `hsla(${h}, ${s}%, ${l}%, ${a == null ? 1 : a})`;
}

/* ========= state ========= */
const prefersReduced = matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const defaultAnim = prefersReduced ? {
  bgKen:false,coverTilt:false,coverSpin:false,coverBob:false,btnHoverLift:false,specGlow:false,specTrails:false,
  thumbPulse:false,toastSlide:false,modalZoom:false,plSlide:false,abBlink:false,headerShim:false,particles:false,cardParallax:false,
  bokeh:false,scanlines:false,gradBorder:false,videoEdgeGlow:false,crt:false,vignette:false,glitchPause:false,specBeat:false,
  // DX
  fxAurora:false,fxStars:false,fxGrid:false,fxBeams:false,fxNebula:false
} : {
  bgKen:true,coverTilt:true,coverSpin:true,coverBob:false,btnHoverLift:true,specGlow:true,specTrails:false,
  thumbPulse:true,toastSlide:true,modalZoom:true,plSlide:true,abBlink:true,headerShim:true,particles:false,cardParallax:true,
  bokeh:false,scanlines:false,gradBorder:false,videoEdgeGlow:false,crt:false,vignette:false,glitchPause:false,specBeat:true,
  // DX（既定オフ）
  fxAurora:false,fxStars:false,fxGrid:false,fxBeams:false,fxNebula:false
};

const state={
  list:[],cur:-1,a:null,b:null, abLoop:false,
  mediaKind:'html5', activeUrl:'',
  yt:null, usingYouTube:false, iframe:null, usingIframe:false, ytEl:null,
  extAudio:null, driftTimer:null,
  ass:null, assUrl:null, assFonts:[],
  theme:'auto', lang: store.get('pc.lang','ja'),
  audioCtx:null, analyser:null, spectrumRAF:0, mediaNode:null, outGain:null, comp:null,
  eq:{ filters:[], enabled: store.get('pc.eq.enabled', true), values: store.get('pc.eq.values', null), preset: store.get('pc.eq.preset','flat') },
  isAudioOnly:false,
  spec:{
    bins: store.get('pc.spec.bins',160),
    peakHoldMs: 550, peakFallDbPerS: 30, smoothAlpha: 0.24,
    data:null, timeData:null, peaks:null, peakY:null, lastDraw:0, maxFps:Math.max(50, Math.min(60, store.get('pc.spec.maxFps', 60))), sens: store.get('pc.spec.sens',1.02),
    canvasCssW:0, canvasCssH:0, canvasPxW:0, canvasPxH:0,
    pausedFade:0,
    mode: store.get('pc.spec.mode','mono'),
    overlayOnVideo: store.get('pc.spec.overlay', false),
    hueLow: store.get('pc.spec.hueLow',18),
    hueHigh: store.get('pc.spec.hueHigh',260),
    sat: store.get('pc.spec.sat',88),
    light: store.get('pc.spec.light',82),
    rainbowSpeed: store.get('pc.spec.rainbowSpeed',0.18),
    rainbowPhase: store.get('pc.spec.rainbowPhase',0)
  },
  lastCoverUrl:null, lastObjUrl:null,
  thumbs:[], thumbAmbientBucket:-1, thumbAmbientKey:'', accentRestore:null,
  thumbBuildToken:0, thumbBuildCleanup:null,
  videoEdgeCanvas:null, videoEdgeCtx:null, videoEdgeKey:'',
  triedOnce:false, playToken:0, playDesired:false, playDebounce:null, lastUserGestureAt:0,
  extAudioUrl:null, _unmuteWdg:null,
  _logRanges:null, _logCenters:null, _startTime:performance.now(),
  seekRAF:0,
  subCues:[],
  contPlay: store.get('pc.contPlay', true),
  anim: store.get('pc.anim', defaultAnim),
  // interactivity handles
  _coverTiltOn:false,_cardParallaxOn:false
};
function setPlayingUI(on){ document.body.classList.toggle('is-playing', !!on) }

// Plugins are written against globals, so keep the page state in sync there too.
window.$ = $;
window.state = state;
window.toast = toast;
const spectrumOverlayRenderers = new Set();
window.OPRuntime = {
  get refs(){ return $; },
  get state(){ return state; },
  toast,
  registerSpectrumOverlay(renderer){
    if(typeof renderer!=='function') return ()=>{};
    spectrumOverlayRenderers.add(renderer);
    return ()=>spectrumOverlayRenderers.delete(renderer);
  },
  renderSpectrumOverlays(frame){
    spectrumOverlayRenderers.forEach(fn=>{
      try{ fn(frame) }catch(e){ console.warn('spectrum overlay error', e) }
    });
  }
};

/* ========= canvas HUD ========= */
function fitHudCanvas(canvas){
  if(!canvas) return null;
  const dpr=Math.max(1, window.devicePixelRatio||1);
  const rect=canvas.getBoundingClientRect();
  const w=Math.max(1, Math.round(rect.width));
  const h=Math.max(1, Math.round(rect.height));
  const pxW=Math.max(1, Math.round(w*dpr));
  const pxH=Math.max(1, Math.round(h*dpr));
  if(canvas.width!==pxW || canvas.height!==pxH){ canvas.width=pxW; canvas.height=pxH; }
  const ctx=canvas.getContext('2d');
  ctx.setTransform(dpr,0,0,dpr,0,0);
  return { ctx, w, h };
}
function drawHeaderHud(t){
  const fit=fitHudCanvas($.headerCanvas); if(!fit) return;
  const {ctx,w,h}=fit;
  ctx.clearRect(0,0,w,h);
  const grad=ctx.createLinearGradient(0,0,w,h);
  grad.addColorStop(0,'rgba(39,110,241,.18)');
  grad.addColorStop(1,'rgba(255,255,255,.02)');
  ctx.fillStyle=grad;
  ctx.fillRect(0,0,w,h);

  const types=['html5','youtube','iframe'];
  const active=types.indexOf(state.mediaKind);
  for(let i=0;i<6;i++){
    const x=18+i*18;
    const y=h/2;
    const on=i<=Math.max(0,active+1);
    ctx.beginPath();
    ctx.arc(x,y, on?4.5:3, 0, Math.PI*2);
    ctx.fillStyle=on?'rgba(121,197,255,.95)':'rgba(255,255,255,.18)';
    ctx.shadowBlur=on?12:0;
    ctx.shadowColor='rgba(80,170,255,.55)';
    ctx.fill();
  }
  ctx.shadowBlur=0;
  ctx.lineWidth=2;
  ctx.strokeStyle='rgba(255,255,255,.16)';
  ctx.beginPath();
  ctx.moveTo(18,h/2);
  ctx.lineTo(108,h/2);
  ctx.stroke();

  const pulse = mediaPaused() ? 0.28 : 0.58 + Math.sin(t/420)*0.14;
  ctx.beginPath();
  for(let i=0;i<36;i++){
    const x=128 + i*2.25;
    const p=i/35;
    const y=(h/2) + Math.sin((t/220)+(p*8))*7*pulse;
    if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  }
  ctx.strokeStyle='rgba(154,224,255,.95)';
  ctx.shadowBlur=10;
  ctx.shadowColor='rgba(70,170,255,.42)';
  ctx.stroke();
  ctx.shadowBlur=0;
}
function drawStatusHud(t){
  const fit=fitHudCanvas($.statusCanvas); if(!fit) return;
  const {ctx,w,h}=fit;
  ctx.clearRect(0,0,w,h);
  const base=ctx.createLinearGradient(0,0,w,h);
  base.addColorStop(0,'rgba(255,255,255,.028)');
  base.addColorStop(1,'rgba(39,110,241,.075)');
  ctx.fillStyle=base;
  ctx.fillRect(0,0,w,h);

  const vol=+($.vol?.value||0);
  const rate=Math.max(0.25, Math.min(2, +($.rate?.value||1)));
  const master=Math.max(0, Math.min(2, +($.master?.value||1)));
  const pulse=mediaPaused() ? 0.18 : 0.34 + Math.sin(t/420)*0.08;

  const glowA=ctx.createRadialGradient(w*0.18,h*0.5,8,w*0.18,h*0.5,w*0.22);
  glowA.addColorStop(0,`rgba(110,196,255,${0.18 + vol*0.16})`);
  glowA.addColorStop(1,'rgba(110,196,255,0)');
  ctx.fillStyle=glowA;
  ctx.fillRect(0,0,w,h);

  const glowB=ctx.createRadialGradient(w*0.52,h*0.52,10,w*0.52,h*0.52,w*0.26);
  glowB.addColorStop(0,`rgba(89,134,255,${0.12 + Math.abs(rate-1)*0.22})`);
  glowB.addColorStop(1,'rgba(89,134,255,0)');
  ctx.fillStyle=glowB;
  ctx.fillRect(0,0,w,h);

  const glowC=ctx.createRadialGradient(w*0.84,h*0.48,8,w*0.84,h*0.48,w*0.18);
  glowC.addColorStop(0,`rgba(163,218,255,${0.12 + master*0.08})`);
  glowC.addColorStop(1,'rgba(163,218,255,0)');
  ctx.fillStyle=glowC;
  ctx.fillRect(0,0,w,h);

  ctx.lineWidth=1;
  ctx.strokeStyle='rgba(255,255,255,.08)';
  ctx.beginPath();
  ctx.moveTo(20,h-18);
  ctx.lineTo(w-20,h-18);
  ctx.stroke();

  ctx.strokeStyle='rgba(154,224,255,.28)';
  ctx.shadowBlur=16;
  ctx.shadowColor='rgba(70,170,255,.18)';
  ctx.beginPath();
  for(let i=0;i<48;i++){
    const p=i/47;
    const x=24 + p*(w-48);
    const y=(h*0.62) + Math.sin((t/250)+(p*8.5))*8*pulse;
    if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  }
  ctx.stroke();
  ctx.shadowBlur=0;
}
function initCanvasHud(){
  let raf=0;
  const loop=(t)=>{
    drawHeaderHud(t||0);
    drawStatusHud(t||0);
    raf=requestAnimationFrame(loop);
  };
  if(!raf) raf=requestAnimationFrame(loop);
}

/* ========= PWA ========= */
;(() => {
  const installBtn = $.installPwa;
  const pwaBadge = $.pwaBadge;
  const canOfferInstall = () => location.protocol === 'https:' || location.hostname === 'localhost';
  if(canOfferInstall()){
    if(!document.querySelector('link[rel="manifest"]')){
      const manifest = document.createElement('link');
      manifest.rel = 'manifest';
      manifest.href = './assets/pwa/omni-player.webmanifest';
      document.head.appendChild(manifest);
    }
    if(!document.querySelector('script[data-cast-sdk="1"]')){
      const castSdk = document.createElement('script');
      castSdk.src = 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1';
      castSdk.async = true;
      castSdk.dataset.castSdk = '1';
      document.head.appendChild(castSdk);
    }
  }
  const showStandalone = () => {
    const on = isStandalonePwa();
    document.body.classList.toggle('app-standalone', on);
    if (pwaBadge) {
      pwaBadge.hidden = !on;
      pwaBadge.textContent = on ? 'PWA' : '';
    }
    if (on) store.set('pc.bg.allow', true);
    if (installBtn) installBtn.style.display = (!on && canOfferInstall()) ? 'inline-flex' : 'none';
  };
  showStandalone();

  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn && !isStandalonePwa()) installBtn.style.display = 'inline-flex';
  });
  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    if (installBtn) installBtn.style.display = 'none';
    showStandalone();
    toast('Omni Player をインストールしました','ok');
  });
  installBtn?.addEventListener('click', async () => {
    if (!deferredPrompt) {
      toast('ブラウザのメニューから「インストール」または「アプリとして追加」を選んでください。','warn', 5200);
      return;
    }
    deferredPrompt.prompt();
    try { await deferredPrompt.userChoice; } catch (e) {}
    deferredPrompt = null;
    installBtn.style.display = 'none';
  });

  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    navigator.serviceWorker.register('./sw.js').then((reg) => {
      if (reg.waiting) {
        toast('PWA 更新があります。再読み込みで反映できます。','warn', 5000);
      }
      reg.addEventListener('updatefound', () => {
        const sw = reg.installing;
        if (!sw) return;
        sw.addEventListener('statechange', () => {
          if (sw.state === 'installed' && navigator.serviceWorker.controller) {
            toast('PWA 更新が適用可能です。再読み込みしてください。','warn', 5000);
          }
        });
      });
    }).catch(() => {});
  }
  window.matchMedia?.('(display-mode: standalone)')?.addEventListener?.('change', showStandalone);
})();

/* ========= ローダー表示 ========= */
function showLoader(){ try{$.loader?.classList.add('show')}catch(e){} }
function hideLoader(){ try{$.loader?.classList.remove('show')}catch(e){} }

/* ========= ボタン・リップル ========= */
document.addEventListener('click', (e)=>{
  const btn = e.target.closest?.('.btn');
  if(!btn) return;
  const rect = btn.getBoundingClientRect();
  const span = document.createElement('span');
  span.className='ripple';
  const x = (e.clientX ?? (e.touches?.[0]?.clientX||0)) - rect.left;
  const y = (e.clientY ?? (e.touches?.[0]?.clientY||0)) - rect.top;
  span.style.left = (x-5)+'px';
  span.style.top  = (y-5)+'px';
  btn.appendChild(span);
  setTimeout(()=>span.remove(),650);
});

/* ========= Audio volume/mute helpers ========= */
function forceUnmute(){ try{ $.v.muted=false; $.v.removeAttribute('muted'); if (Number.isFinite($.v.volume) && $.v.volume===0) $.v.volume=0.5; const slider=+($.vol?.value ?? 0); if (slider===0){ $.vol.value=0.5; $.v.volume=0.5 } if(state.extAudio){ state.extAudio.muted=false; state.extAudio.volume=$.v.volume } }catch(e){} }
function safeVolumeBump(msg=''){ try{ if ($.v.muted || $.v.volume===0){ forceUnmute(); if (msg) toast(msg,'warn',2500) } }catch(e){} }

/* ========= AudioContext unlock ========= */
function unlockAudioCtx(){ try{ if(!state.audioCtx) state.audioCtx=new (window.AudioContext||window.webkitAudioContext)(); if(state.audioCtx.state!=='running'){ state.audioCtx.resume().catch(()=>{}); const src=state.audioCtx.createBufferSource(); src.buffer=state.audioCtx.createBuffer(1,1,state.audioCtx.sampleRate); src.connect(state.audioCtx.destination); src.start(0); setTimeout(()=>{try{src.stop()}catch(e){}},0) } }catch(e){} }
function startUnmuteWatchdog(){ try{ clearInterval(state._unmuteWdg) }catch(e){} const t0=Date.now(); state._unmuteWdg=setInterval(()=>{ forceUnmute(); if (!Number.isFinite($.v.volume)||$.v.volume===0){ const f=+($.vol?.value||0.8)||0.8; $.vol.value=f; $.v.volume=f } if (state.extAudio){ state.extAudio.muted=false; if (state.extAudio.volume===0) state.extAudio.volume=$.v.volume } if (Date.now()-t0>4000) clearInterval(state._unmuteWdg) },120) }
function markUserGesture(){ state.triedOnce=true; state.lastUserGestureAt=Date.now(); forceUnmute(); unlockAudioCtx(); startUnmuteWatchdog() }

/* ========= Theme/lang ========= */
function applyTheme(t){
  state.theme=t; store.set('pc.theme',t);
  const root=document.documentElement;
  const prefersDark=window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  root.classList.toggle('light', t==='light' || (t==='auto' && !prefersDark));
}
function initTheme(){
  const saved=store.get('pc.theme','auto');
  $.themeSelect.value=saved;
  applyTheme(saved);
  $.themeSelect.addEventListener('change',(e)=>{ applyTheme(e.target.value) });
}
function initPrefs(){
  const vol=store.get('pc.vol',0.9); $.v.volume=vol; $.vol.value=vol;
  $.v.playbackRate=store.get('pc.rate',1.0); $.rate.value=$.v.playbackRate;
  if(!Number.isFinite($.v.volume)||$.v.volume===0){ $.vol.value=0.8; $.v.volume=0.8 }
  $.contPlay.checked = state.contPlay;
  if ($.langSelect) { $.langSelect.value = state.lang; $.langSelect.addEventListener('change',e=>{ state.lang=e.target.value; store.set('pc.lang', state.lang) }) }
}
initTheme(); initPrefs();

/* ========= Audio Graph + EQ ========= */
function ensureAudioGraph(){
  if(!state.audioCtx) state.audioCtx=new (window.AudioContext||window.webkitAudioContext)();
  if(!state.mediaNode){ state.mediaNode = state.audioCtx.createMediaElementSource($.v) }
  if(!state.eq.filters.length){ state.eq.filters = makeEqFilters(state.audioCtx) }
  if(!state.comp){
    const c=state.audioCtx.createDynamicsCompressor();
    c.threshold.value=-24; c.knee.value=24; c.ratio.value=3; c.attack.value=0.003; c.release.value=0.25; state.comp=c;
  }
  if(!state.outGain){
    const g=state.audioCtx.createGain(); g.gain.value=+($.master?.value||1); state.outGain=g;
    if(!state.analyser){
      const a=state.audioCtx.createAnalyser();
      a.fftSize=2048; a.minDecibels=-95; a.maxDecibels=-20; a.smoothingTimeConstant=0.82;
      state.analyser=a;
    }
    try{ state.mediaNode.disconnect() }catch(e){}
    for(const f of state.eq.filters){ try{ f.disconnect() }catch(e){} }
    try{ state.comp.disconnect() }catch(e){}
    try{ state.outGain.disconnect() }catch(e){}
    try{ state.analyser.disconnect() }catch(e){}

    let node=state.mediaNode;
    for(const f of state.eq.filters){ node.connect(f); node=f; }
    node.connect(state.comp);
    state.comp.connect(state.outGain);
    state.outGain.connect(state.audioCtx.destination);

    state.mediaNode.connect(state.analyser);

    restoreEqValues();
    $.eqState.textContent = state.eq.enabled? 'ON' : 'BYPASS';
  }
}
function makeEqFilters(ac){
  const bands=[{f:32,type:'lowshelf'},{f:64,type:'peaking'},{f:125,type:'peaking'},{f:250,type:'peaking'},{f:500,type:'peaking'},{f:1000,type:'peaking'},{f:2000,type:'peaking'},{f:4000,type:'peaking'},{f:8000,type:'peaking'},{f:16000,type:'highshelf'}];
  return bands.map(b=>{ const biq=ac.createBiquadFilter(); biq.type=b.type; biq.frequency.value=b.f; biq.Q.value=(b.type==='peaking'?0.8:0.7); biq.gain.value=0; return biq });
}
function restoreEqValues(){
  const vals = state.eq.values;
  if(!vals) return;
  state.eq.filters.forEach((f,i)=>{ f.gain.value = state.eq.enabled ? (vals[i]||0) : 0 });
  qsa('#eqGrid input[type="range"]').forEach((r,i)=>{ r.value = vals[i]||0 });
}
function applyEqPreset(name){
  let vals=Array(10).fill(0);
  if(name==='bass') vals=[6,4,2,0,0,0,-1,-2,-3,-4];
  if(name==='vocal') vals=[-2,-2,0,1,3,4,3,1,0,-1];
  if(name==='treble') vals=[-3,-3,-2,-1,0,0,2,4,5,6];
  qsa('#eqGrid input[type="range"]').forEach((r,i)=>{ r.value=vals[i]; qs('#eqv'+i).textContent=vals[i]; if(state.eq.filters[i]) state.eq.filters[i].gain.value = state.eq.enabled ? vals[i] : 0 });
  state.eq.values=vals; store.set('pc.eq.values', vals); state.eq.preset=name; store.set('pc.eq.preset', name);
}
function buildEqUI(){
  const freqs=['32','64','125','250','500','1k','2k','4k','8k','16k'];
  $.eqGrid.innerHTML='';
  freqs.forEach((f,i)=>{
    const cell=document.createElement('div'); cell.className='eq-cell';
    cell.innerHTML=`<label class="subtitle">${f}Hz</label>
      <input type="range" min="-12" max="12" step="0.5" value="0" data-band="${i}" />
      <div class="subtitle"><span id="eqv${i}">0</span> dB</div>`;
    $.eqGrid.appendChild(cell);
  });
  $.eqGrid.addEventListener('input',(ev)=>{
    const r=ev.target; if(!(r instanceof HTMLInputElement)) return;
    const i=+r.dataset.band; const v=+r.value;
    qs('#eqv'+i).textContent=v;
    if(state.eq.filters[i]) state.eq.filters[i].gain.value = state.eq.enabled ? v : 0;
    const vals=qsa('#eqGrid input[type="range"]').map(x=>+x.value);
    state.eq.values=vals; store.set('pc.eq.values', vals);
  });
  $.eqPreset.value = state.eq.preset || 'flat';
  $.eqPreset.onchange = ()=> applyEqPreset($.eqPreset.value);
  $.eqBypass.onclick = ()=>{
    state.eq.enabled = !state.eq.enabled; store.set('pc.eq.enabled', state.eq.enabled);
    $.eqState.textContent = state.eq.enabled? 'ON' : 'BYPASS';
    const vals=state.eq.values || Array(10).fill(0);
    state.eq.filters.forEach((f,i)=>{ f.gain.value = state.eq.enabled ? vals[i] : 0 });
  };
}

/* ========= Fade ========= */
function rampTo(value,t=0.12){ try{ ensureAudioGraph(); const g=state.outGain; const now=state.audioCtx.currentTime; const v0=g.gain.value; g.gain.cancelScheduledValues(now); g.gain.setValueAtTime(v0,now); g.gain.linearRampToValueAtTime(value, now+Math.max(0.01,t)) }catch(e){} }

/* ========= Play serialization ========= */
async function ensureAudioOn(){ try{ if(!state.audioCtx) state.audioCtx=new (window.AudioContext||window.webkitAudioContext)(); if(state.audioCtx.state==='suspended' && state.triedOnce) await state.audioCtx.resume().catch(()=>{}); if (state.triedOnce) forceUnmute(); }catch(e){} }
async function performPlayAttempt(){
  await ensureAudioOn(); forceUnmute(); safeVolumeBump();
  ensureAudioGraph(); rampTo(0,0.01);
  const p=$.v.play();
  if(p&&typeof p.then==='function'){ await p.catch(err=>{ if(err?.name!=='AbortError') throw err }) }
  rampTo(+($.master?.value||1),0.12); setPlayingUI(true);
  if(state.extAudio && !$.v.paused && state.extAudio.paused){ try{ await state.extAudio.play() }catch(e){} }
  enforceBackdropPolicy();
}
async function requestPlay(reason){
  if(state.mediaKind!=='html5'){ if(state.usingYouTube) try{state.yt?.playVideo?.()}catch(e){}; setPlayingUI(true); enforceBackdropPolicy(); return }
  state.playDesired=true; const my=++state.playToken; clearTimeout(state.playDebounce);
  state.playDebounce=setTimeout(async()=>{
    if(my!==state.playToken||!state.playDesired) return;
    try{ await performPlayAttempt() }catch(err){ if(err?.name==='AbortError')return; toast('再生に失敗: '+(err?.name||'Error')+' '+(err?.message||''),'warn',5000) }
  },60)
}
async function requestPlayImmediate(reason){
  if(state.mediaKind!=='html5'){ return requestPlay(reason) }
  state.playDesired=true;
  state.playToken++;
  clearTimeout(state.playDebounce);
  try{ await performPlayAttempt() }catch(err){ if(err?.name==='AbortError')return; toast('再生に失敗: '+(err?.name||'Error')+' '+(err?.message||''),'warn',5000) }
}
function safePause(){ state.playDesired=false; state.playToken++; if(state.usingYouTube){ try{state.yt?.pauseVideo?.()}catch(e){} setPlayingUI(false); enforceBackdropPolicy(); return } try{ ensureAudioGraph(); rampTo(0,0.12); setTimeout(()=>{ try{$.v.pause()}catch(e){}; setPlayingUI(false); enforceBackdropPolicy() },130) }catch(e){ try{$.v.pause()}catch(e2){}; setPlayingUI(false); enforceBackdropPolicy() } }

/* ========= First gesture ========= */
;(() => {
  const fire=()=>{
    markUserGesture();
    ensureAudioOn(); requestPlayImmediate('gesture');
    document.removeEventListener('click',fire);
    document.removeEventListener('keydown',fire);
    document.removeEventListener('touchstart',fire);
  };
  document.addEventListener('click',fire,{once:true});
  document.addEventListener('keydown',fire,{once:true});
  document.addEventListener('touchstart',fire,{once:true,passive:true});
})();

/* ========= Captions ========= */
function unloadTracks(){ qsa('track',$.v).forEach(t=>{ try{ if(t.src && t.src.startsWith('blob:')) URL.revokeObjectURL(t.src) }catch(e){}; t.remove() }); state.subCues=[]; $.subHits.innerHTML='' }
function srtToVtt(srt){ const vtt='WEBVTT\n\n'+srt.replace(/\r/g,'').replace(/^(\d+)$/gm,'').replace(/(\d\d:\d\d:\d\d),(\d{3})/g,'$1.$2'); return new Blob([vtt],{type:'text/vtt'}) }
async function attachSrtOrVttFromFile(file){ unloadTracks(); const txt=await file.text(); const blob=file.name.endsWith('.vtt')? new Blob([txt],{type:'text/vtt'}): srtToVtt(txt); const url=URL.createObjectURL(blob); const tr=document.createElement('track'); tr.kind='subtitles'; tr.label='ext'; tr.srclang='ja'; tr.default=true; tr.src=url; $.v.appendChild(tr); tr.addEventListener('load',()=>{ tr.mode='showing'; collectCues(); toast('Subtitles loaded') }) }
function unloadASS(){ if(state.ass){ try{state.ass.dispose()}catch(e){} state.ass=null } if(state.assUrl){ URL.revokeObjectURL(state.assUrl); state.assUrl=null } $.assLayer.innerHTML='' }
function initASSWithUrl(subUrl){ unloadTracks(); const workerUrl='https://cdn.jsdelivr.net/npm/subtitles-octopus@0.6.4/dist/subtitles-octopus-worker.js'; state.ass=new SubtitlesOctopus({ video: $.v, subUrl: subUrl, workerUrl: workerUrl, fonts: state.assFonts.map(f=>f.url), renderMode:'wasm', targetFps:60, blendRender:true, prescaleFactor:1 }); toast('ASS loaded') }
async function attachASSFromFile(file){ const blob=new Blob([await file.arrayBuffer()],{type:'text/plain'}); const url=URL.createObjectURL(blob); state.assUrl=url; initASSWithUrl(url) }
function applySubStyle(){ const size=+$.subSize.value||28, outline=+$.subOutline.value||3, margin=+$.subMargin.value||30; let style=qs('#sub-style'); if(!style){style=document.createElement('style');style.id='sub-style';document.head.appendChild(style)} style.textContent='video::cue{font-family:"Noto Sans JP",system-ui;font-size:'+size+'px;line-height:1.2;color:#fff;text-shadow:0 0 '+outline+'px rgba(0,0,0,.9);} video::-webkit-media-text-track-container{transform:translateY(-'+margin+'px);}'; }
function bindSubControls(){ $.subPreset.addEventListener('change',(e)=>{ const m={std:{size:28,outline:3,margin:30},large:{size:40,outline:4,margin:40},small:{size:20,outline:2,margin:20},shadow:{size:28,outline:6,margin:30}}; const p=m[e.target.value]||m.std; $.subSize.value=p.size; $.subOutline.value=p.outline; $.subMargin.value=p.margin; applySubStyle() }); ['input','change'].forEach(ev=>{ $.subSize.addEventListener(ev,applySubStyle); $.subOutline.addEventListener(ev,applySubStyle); $.subMargin.addEventListener(ev,applySubStyle) }) }
applySubStyle(); bindSubControls();

/* ========= 字幕cue収集 & 検索（XSSセーフ） ========= */
function collectCues(){ try{ state.subCues=[]; const tracks=$.v.textTracks; for(let i=0;i<tracks.length;i++){ const tr=tracks[i]; tr.mode='hidden'; for(const c of tr.cues||[]){ state.subCues.push({start:c.startTime,end:c.endTime,text:String(c.text)}) } } }catch(e){} }
function searchSubs(q){
  $.subHits.innerHTML='';
  const needle=(q||'').trim().toLowerCase(); if(!needle) return;
  const escNeedle = needle.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const res=state.subCues.map((c,idx)=>({idx,c,t:c.text.toLowerCase()})).filter(x=>x.t.includes(needle)).slice(0,200);
  for(const h of res){
    const div=document.createElement('div'); div.className='hit';
    const safe = escHTML(h.c.text).replace(new RegExp(escNeedle,'gi'), m=>`<b>${escHTML(m)}</b>`);
    div.innerHTML=`<span>${fmt(h.c.start)}–${fmt(h.c.end)}</span><br>${safe}`;
    div.onclick=()=>{ $.v.currentTime=h.c.start+0.05; requestPlay('subHit') };
    $.subHits.appendChild(div)
  }
  toast(res.length+'件ヒット')
}

/* ========= audio meta / 背景アート ========= */
function clearAudioMeta(){
  restoreAmbientAccent();
  try { $.audioCover.onerror = null } catch(e){}
  const prev = state.lastCoverUrl;
  $.audioCover.removeAttribute('src'); $.audioTitle.textContent=''; $.audioSub.textContent='';
  if(prev && typeof prev==='string' && prev.startsWith('blob:')){ try{URL.revokeObjectURL(prev)}catch(e){} }
  state.lastCoverUrl=null;
  $.bgArt.style.backgroundImage='none'; $.bgArt.classList.remove('show');
}
function updateAudioMetaVisibility(){ $.audioInfo.style.display = (state.isAudioOnly && !state.usingYouTube && !state.usingIframe) ? 'flex' : 'none' }
function sniffImageMime(u8){ if(!u8||!u8.length) return 'image/jpeg'; if(u8[0]===0xFF&&u8[1]===0xD8&&u8[2]===0xFF) return 'image/jpeg'; if(u8[0]===0x89&&u8[1]===0x50&&u8[2]===0x4E&&u8[3]===0x47) return 'image/png'; if(u8[0]===0x47&&u8[1]===0x49&&u8[2]===0x46&&u8[3]===0x38) return 'image/gif'; return 'image/jpeg' }
function bytesToDataUrl(bytes, mime='image/jpeg'){
  try{
    let binary='';
    const chunk=0x8000;
    for(let i=0;i<bytes.length;i+=chunk){
      binary += String.fromCharCode(...bytes.subarray(i, i+chunk));
    }
    return `data:${mime};base64,${btoa(binary)}`;
  }catch(e){ return null }
}
function makeIconDataURL(kind='audio'){
  const bg1='#1b2432',bg2='#0f1622',fg='#e8edf2';
  const glyph= kind==='audio'
   ? 'M480 256v192c0 17.7-14.3 32-32 32H320v64h64c35.3 0 64 28.7 64 64H256V384h64v64h128V256h32zM96 448a96 96 0 1 0 0-192a96 96 0 1 0 0 192zM320 0l128 128H320V0z'
   : 'M64 0h256l128 128v352c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0z';
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 512 512"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${bg1}"/><stop offset="100%" stop-color="${bg2}"/></linearGradient></defs><rect width="512" height="512" rx="64" ry="64" fill="url(#g)"/><path fill="${fg}" d="${glyph}"/></svg>`;
  return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}
async function tryExtractFromBlob(blob,name){
  try{
    const mm=await musicMetadata.parseBlob(blob);
    const pic=mm.common?.picture?.[0];
    let coverUrl=null;
    if(pic && pic.data){
      const type=pic.format || sniffImageMime(pic.data);
      coverUrl=bytesToDataUrl(pic.data, type || 'image/jpeg');
    }
    const title=mm.common?.title||name||''; const artist=mm.common?.artist||mm.common?.artists?.[0]||''; const album=mm.common?.album||'';
    const fmt=mm.format?.container||mm.format?.codec||''; const sr=mm.format?.sampleRate?Math.round(mm.format.sampleRate):''; const ch=mm.format?.numberOfChannels||'';
    const br=mm.format?.bitrate?Math.round(mm.format.bitrate/1000):''; const dur=mm.format?.duration?Math.round(mm.format.duration):'';
    return { coverUrl, title, artist, album, fmt, sr, ch, br, dur };
  }catch(e){ return null }
}
async function extractVideoStill(source, atSec=0.06){
  return new Promise((resolve)=>{
    let settled=false;
    let tmpUrl='';
    const video=document.createElement('video');
    video.muted=true;
    video.playsInline=true;
    video.preload='metadata';
    const clean=(result=null)=>{
      if(settled) return;
      settled=true;
      video.pause?.();
      video.removeAttribute('src');
      video.load?.();
      if(tmpUrl){ try{ URL.revokeObjectURL(tmpUrl) }catch(e){} }
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
        ctx.drawImage(video, 0, 0, w, h);
        clean(canvas.toDataURL('image/jpeg', 0.86));
      }catch(e){ fail() }
    };
    video.addEventListener('error', fail, { once:true });
    video.addEventListener('loadeddata', ()=>{
      const dur = Number.isFinite(video.duration) ? video.duration : 0;
      const target = dur>0 ? Math.min(Math.max(atSec, 0), Math.max(0, dur-0.05)) : 0;
      if(target <= 0.001){
        setTimeout(draw, 40);
      }else{
        const onSeeked=()=>draw();
        video.addEventListener('seeked', onSeeked, { once:true });
        try{ video.currentTime = target; }catch(e){ draw() }
      }
    }, { once:true });
    if(source instanceof File || source instanceof Blob){
      tmpUrl = URL.createObjectURL(source);
      video.src = tmpUrl;
    }else{
      video.crossOrigin='anonymous';
      video.src = source;
    }
  });
}
function setItemThumb(item, url){
  if(!item) return;
  item.thumbUrl = url || null;
}
function getItemThumb(item){
  return item?.thumbUrl || null;
}
async function resolveFileThumb(item){
  const file = item?.file;
  if(!file) return null;
  if(getItemThumb(item)) return getItemThumb(item);
  const meta = await tryExtractFromBlob(file, file.name);
  if(meta?.coverUrl){
    setItemThumb(item, meta.coverUrl);
    item._meta = meta;
    return meta.coverUrl;
  }
  if(fileLooksLikeVideo(file)){
    const still = await extractVideoStill(file);
    if(still){
      setItemThumb(item, still);
      return still;
    }
  }
  item._meta = meta || null;
  return null;
}
function applyThumbAsCurrentCover(url, kind='video'){
  const fallback = makeIconDataURL(kind);
  const cover = url || fallback;
  state.lastCoverUrl = cover;
  $.audioCover.removeAttribute('src');
  $.audioCover.onerror = ()=>{ $.audioCover.src = fallback; $.audioCover.style.opacity='1' };
  $.audioCover.onload = ()=>{ $.audioCover.style.opacity='1' };
  $.audioCover.style.opacity = url ? '0.001' : '1';
  $.audioCover.src = cover;
  if(url){
    $.bgArt.style.backgroundImage=`url("${url}")`;
    const imgProbe=new Image();
    imgProbe.onload=()=>$.bgArt.classList.add('show');
    imgProbe.onerror=()=>{ $.bgArt.style.backgroundImage='none'; $.bgArt.classList.remove('show') };
    imgProbe.src=url;
  }else{
    $.bgArt.style.backgroundImage='none';
    $.bgArt.classList.remove('show');
  }
}
function sampleCanvasColor(ctx, w, h){
  try{
    const data = ctx.getImageData(0,0,w,h).data;
    const stride = Math.max(4, Math.floor(Math.max(w,h)/28));
    let r=0,g=0,b=0,weightSum=0;
    let totalLuma=0, totalSat=0, samples=0, brightHits=0;
    for(let y=0;y<h;y+=stride){
      for(let x=0;x<w;x+=stride){
        const i=((y*w)+x)*4;
        const a=data[i+3];
        if(a<32) continue;
        const pr=data[i], pg=data[i+1], pb=data[i+2];
        const hi=Math.max(pr,pg,pb), lo=Math.min(pr,pg,pb);
        const sat=hi-lo;
        const luma=(pr*0.2126)+(pg*0.7152)+(pb*0.0722);
        samples++;
        totalLuma += luma;
        totalSat += sat;
        if(luma>96 || (luma>72 && sat>36)) brightHits++;
        if(luma<18 && sat<10) continue;
        const weight = 0.85 + Math.max(0, (luma-42)/180)*1.7 + Math.max(0, sat-18)/180;
        r += pr*weight;
        g += pg*weight;
        b += pb*weight;
        weightSum += weight;
      }
    }
    if(!weightSum) return null;
    const avgLuma = samples ? (totalLuma / samples) : 0;
    const avgSat = samples ? (totalSat / samples) : 0;
    if(avgLuma < 20 && avgSat < 16 && brightHits===0) return null;
    let color = {
      r: Math.round(r/weightSum),
      g: Math.round(g/weightSum),
      b: Math.round(b/weightSum)
    };
    const peak=Math.max(color.r,color.g,color.b,1);
    const mildTarget = avgLuma > 42 ? 170 : 146;
    const lift=Math.min(1.12, Math.max(1, mildTarget/peak));
    if(avgLuma > 24 || avgSat > 22){
      color = {
        r: Math.min(255, Math.round(color.r*lift)),
        g: Math.min(255, Math.round(color.g*lift)),
        b: Math.min(255, Math.round(color.b*lift))
      };
    }
    return color;
  }catch(e){ return null }
}
function applyAmbientAccent(rgb){
  if(!rgb) return;
  const root = document.documentElement;
  if(state.accentRestore===null){
    state.accentRestore = root.style.getPropertyValue('--accent');
  }
  root.style.setProperty('--accent', `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
}
function restoreAmbientAccent(){
  if(state.accentRestore===null) return;
  const root = document.documentElement;
  if(state.accentRestore){
    root.style.setProperty('--accent', state.accentRestore);
  }else{
    root.style.removeProperty('--accent');
  }
  state.accentRestore = null;
  state.thumbAmbientBucket = -1;
  state.thumbAmbientKey = '';
}
function syncAmbientFromThumbTime(t){
  if(state.mediaKind!=='html5' || state.isAudioOnly || !state.thumbs?.length) return;
  const source = state.thumbs;
  const time = Math.max(0, +t || 0);
  let nearest = source[0];
  let prev = null;
  let next = null;
  for(let i=0;i<source.length;i++){
    const item = source[i];
    if(Math.abs(item.t-time) < Math.abs((nearest?.t ?? 0)-time)) nearest = item;
    if(item.t <= time && item.color) prev = item;
    if(item.t >= time && item.color){ next = item; break; }
  }
  if(!nearest?.color){
    if(state.thumbAmbientKey!=='__none'){
      state.thumbAmbientKey='__none';
      restoreAmbientAccent();
    }
    return;
  }
  if(!prev) prev = next || nearest;
  if(!next) next = prev || nearest;
  let color = prev?.color || next?.color;
  if(prev?.color && next?.color && next.t > prev.t){
    const p = Math.max(0, Math.min(1, (time - prev.t) / (next.t - prev.t)));
    color = {
      r: Math.round(prev.color.r + (next.color.r - prev.color.r) * p),
      g: Math.round(prev.color.g + (next.color.g - prev.color.g) * p),
      b: Math.round(prev.color.b + (next.color.b - prev.color.b) * p)
    };
  }
  if(!color) return;
  const key = `${color.r}|${color.g}|${color.b}`;
  if(key===state.thumbAmbientKey) return;
  state.thumbAmbientKey = key;
  applyAmbientAccent(color);
}
function clearVideoEdgeGlow(){
  state.videoEdgeKey = '';
  const cvs = $.ambientLight;
  if(cvs){
    const ctx = cvs.getContext('2d');
    if(ctx) ctx.clearRect(0,0,cvs.width,cvs.height);
  }
}
function ensureVideoEdgeSampler(){
  if(state.videoEdgeCanvas && state.videoEdgeCtx) return { canvas:state.videoEdgeCanvas, ctx:state.videoEdgeCtx };
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently:true });
  if(!ctx) return null;
  state.videoEdgeCanvas = canvas;
  state.videoEdgeCtx = ctx;
  return { canvas, ctx };
}
function fitAmbientCanvas(){
  const canvas = $.ambientLight;
  const shell = $.shell;
  if(!canvas || !shell) return null;
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  const pad = 18;
  const rect = shell.getBoundingClientRect();
  const w = Math.max(1, Math.round(rect.width + pad*2));
  const h = Math.max(1, Math.round(rect.height + pad*2));
  const pxW = Math.max(1, Math.round(w * dpr));
  const pxH = Math.max(1, Math.round(h * dpr));
  if(canvas.width !== pxW || canvas.height !== pxH){
    canvas.width = pxW;
    canvas.height = pxH;
  }
  const ctx = canvas.getContext('2d');
  if(!ctx) return null;
  ctx.setTransform(dpr,0,0,dpr,0,0);
  return { canvas, ctx, width:w, height:h, pad };
}
function sampleVideoEdgeColor(){
  if(state.mediaKind!=='html5' || currentHtml5IsAudio() || !state.anim.videoEdgeGlow) return null;
  const v = $.v;
  if(!v || v.readyState < 2 || !v.videoWidth || !v.videoHeight) return null;
  const sampler = ensureVideoEdgeSampler();
  if(!sampler) return null;
  const { canvas, ctx } = sampler;
  const targetW = 128;
  const targetH = Math.max(72, Math.round(targetW * (v.videoHeight / v.videoWidth)));
  if(canvas.width !== targetW || canvas.height !== targetH){
    canvas.width = targetW;
    canvas.height = targetH;
  }
  try{
    ctx.drawImage(v, 0, 0, targetW, targetH);
    const data = ctx.getImageData(0,0,targetW,targetH).data;
    const margin = 0;
    return {
      canvas,
      width: targetW,
      height: targetH,
      margin
    };
  }catch(e){
    return null;
  }
}
function syncVideoEdgeGlow(){
  if(!state.anim.videoEdgeGlow || state.mediaKind!=='html5' || currentHtml5IsAudio()){
    clearVideoEdgeGlow();
    return;
  }
  const frame = sampleVideoEdgeColor();
  const ambient = fitAmbientCanvas();
  if(!frame || !ambient){
    clearVideoEdgeGlow();
    return;
  }
  const { ctx, width:aw, height:ah, pad } = ambient;
  const band = Math.max(28, Math.round(Math.min(aw, ah) * 0.16));
  const coreW = aw - pad*2;
  const coreH = ah - pad*2;
  const src = frame.canvas;
  const sw = frame.width;
  const sh = frame.height;
  const m = frame.margin;
  ctx.clearRect(0,0,aw,ah);
  const drawBand = (sourceRect, drawRect, horizontal=true, invert=false)=>{
    const steps = horizontal ? band : Math.round(band * 0.82);
    for(let i=0;i<steps;i++){
      const p = i / Math.max(1, steps-1);
      const alpha = Math.pow(1-p, 1.28) * 0.82;
      if(alpha <= 0.002) continue;
      ctx.globalAlpha = alpha;
      if(horizontal){
        const y = invert ? (drawRect.y + drawRect.h - i - 1) : (drawRect.y + i);
        ctx.drawImage(src, sourceRect.x, sourceRect.y, sourceRect.w, sourceRect.h, drawRect.x, y, drawRect.w, 1);
      }else{
        const x = invert ? (drawRect.x + drawRect.w - i - 1) : (drawRect.x + i);
        ctx.drawImage(src, sourceRect.x, sourceRect.y, sourceRect.w, sourceRect.h, x, drawRect.y, 1, drawRect.h);
      }
    }
  };
  drawBand({ x:m, y:m, w:Math.max(1, sw - m*2), h:1 }, { x:pad, y:pad, w:coreW, h:band }, true, false);
  drawBand({ x:m, y:Math.max(0, sh-m-1), w:Math.max(1, sw - m*2), h:1 }, { x:pad, y:pad + coreH - band, w:coreW, h:band }, true, true);
  drawBand({ x:m, y:m, w:1, h:Math.max(1, sh - m*2) }, { x:pad, y:pad, w:band, h:coreH }, false, false);
  drawBand({ x:Math.max(0, sw-m-1), y:m, w:1, h:Math.max(1, sh - m*2) }, { x:pad + coreW - band, y:pad, w:band, h:coreH }, false, true);
  ctx.globalAlpha = 1;
}
function setAudioMetaView(meta,fallback){
  const title=(meta&&meta.title)||fallback||''; const lines=[]; if(meta?.artist) lines.push(meta.artist); if(meta?.album) lines.push(meta.album);
  const parts=[]; if(meta?.fmt) parts.push(meta.fmt); if(meta?.sr) parts.push(meta.sr+'Hz'); if(meta?.ch) parts.push(meta.ch+'ch'); if(meta?.br) parts.push(meta.br+'kbps'); if(meta?.dur) parts.push(meta.dur+'s');
  const sub=[lines.join(' / '),parts.join(' / ')].filter(Boolean).join(' — ');

  $.audioCover.removeAttribute('src');
  $.audioCover.onerror=()=>{ const fallbackUrl=makeIconDataURL('audio'); if($.audioCover.src!==fallbackUrl) $.audioCover.src=fallbackUrl; $.audioCover.style.opacity='1' };

  const cover=meta?.coverUrl || makeIconDataURL('audio');
  state.lastCoverUrl=cover;
  $.audioCover.onload=()=>{ $.audioCover.style.opacity='1' };
  $.audioCover.style.opacity=meta?.coverUrl?'0.001':'1';
  $.audioCover.src=cover;

  if(meta?.coverUrl){
    $.bgArt.style.backgroundImage=`url("${meta.coverUrl}")`;
    const imgProbe=new Image();
    imgProbe.onload=()=>$.bgArt.classList.add('show');
    imgProbe.onerror=()=>{ $.bgArt.style.backgroundImage='none'; $.bgArt.classList.remove('show') };
    imgProbe.src=meta.coverUrl;
  }else{
    $.bgArt.style.backgroundImage='none'; $.bgArt.classList.remove('show');
  }

  $.audioTitle.textContent=title;
  $.audioSub.textContent=sub;
}
async function handleAudioMetaForFile(file,item=null){
  clearAudioMeta();
  const meta = item?._meta || await tryExtractFromBlob(file,file.name);
  if(item && meta?.coverUrl) setItemThumb(item, meta.coverUrl);
  setAudioMetaView(meta,file.name);
  updateAudioMetaVisibility();
}
async function handleAudioMetaForUrl(url){
  clearAudioMeta();
  try{ const res=await fetch(url,{mode:'cors'}); const blob=await res.blob(); const name=url.split('/').pop()||url; const meta=await tryExtractFromBlob(blob,name); setAudioMetaView(meta,name) }
  catch(e){ setAudioMetaView(null,url.split('/').pop()||url) }
  updateAudioMetaVisibility();
}

/* ========= Spectrum ========= */
function stopSpectrum(){
  if(state.spectrumRAF){ cancelAnimationFrame(state.spectrumRAF); state.spectrumRAF=0 }
  if($.spectrum){
    $.spectrum.style.display='none';
    $.spectrum.style.setProperty('--spec-beat','1');
  }
}
function drawBarSpectrum(c,W,H,dtSec,rms){
  const an=state.analyser;
  const barW=W/state.spec.bins; const pad=Math.max(2,Math.floor(barW*0.12)); const inner=Math.max(1,barW-pad);
  const capH=Math.max(2,Math.floor(H*0.012));
  const minDb=an.minDecibels, maxDb=an.maxDecibels, range=maxDb-minDb, alpha=state.spec.smoothAlpha;
  const loud=Math.min(1,rms*1.8);
  const peaks=state.spec.peaks, bins=state.spec.bins, data=state.spec.data;
  const fallPerFrameDb = state.spec.peakFallDbPerS * dtSec;

  const hueLow=+state.spec.hueLow, hueHigh=+state.spec.hueHigh, sat=+state.spec.sat, baseL=+state.spec.light;
  const time=(performance.now()-state._startTime)/1000;
  const rainbowSpeed=+state.spec.rainbowSpeed, rainbowPhase=+state.spec.rainbowPhase;

  const colorForBand = (i) => {
    if(state.spec.mode==='mono'){ const l=baseL*(0.78+0.22*loud)*state.spec.pausedFade; return hsl(0,0,l,1) }
    if(state.spec.mode==='pitch'||state.spec.mode==='circular'){ const f=state._logCenters[i], ny=(state.audioCtx?.sampleRate||48000)/2; const p=Math.log10(Math.max(30,f))/Math.log10(ny); const h=hueLow+(hueHigh-hueLow)*p; const l=baseL*(0.78+0.22*loud)*state.spec.pausedFade; return hsl(h,sat,l,1) }
    const phase=(i/bins)*360+rainbowPhase+time*360*rainbowSpeed; const l=baseL*(0.78+0.22*loud)*state.spec.pausedFade; return hsl(phase,sat,l,1);
  };

  if(state.anim.specBeat){
    const scale=(1 + loud*0.08);
    $.spectrum?.style.setProperty('--spec-beat', scale.toFixed(3));
  }else{
    $.spectrum?.style.setProperty('--spec-beat','1');
  }

  const glowBlur = state.anim.specGlow ? Math.max(10, Math.floor(inner*1.8)) : 0;

  for(let i=0;i<bins;i++){
    const pair=state._logRanges[i]; const a=pair[0]; const b=pair[1];
    let sum=0,count=0; for(let k=a;k<b;k++){ sum+=data[k]; count++ }
    const mag=count?(sum/count):0;
    const db=minDb + (mag/255)*(maxDb-minDb);
    const prev=peaks[i]; const smoothed=(1-alpha)*db+alpha*prev;
    if(smoothed>peaks[i]) peaks[i]=smoothed; else peaks[i]=Math.max(minDb,peaks[i]-fallPerFrameDb);

    let val=(smoothed-minDb)/range; val=Math.max(0,Math.min(1,val*state.spec.sens));
    const ease=val*val;
    const h=Math.floor(ease*(H-capH*1.6)*state.spec.pausedFade);
    const x=i*barW+pad/2; const y=H-h;
    const bandColor=colorForBand(i);

    c.shadowBlur=glowBlur;
    c.shadowColor=bandColor;
    c.fillStyle=bandColor; c.fillRect(x,y,inner,h);

    if(state.anim.specGlow){
      c.shadowBlur=0;
      c.fillStyle=document.documentElement.classList.contains('light')?'rgba(0,0,0,.85)':'rgba(255,255,255,.9)';
      const dpr=window.devicePixelRatio||1;
      const pv=(Math.max(0,Math.min(1,(peaks[i]-minDb)/range))*state.spec.sens);
      const ph=Math.floor((pv*pv)*(H-capH*1.6)*state.spec.pausedFade); const py=H-ph;
      const capY=Math.max(0,Math.round(py-capH)*dpr)/dpr;
      c.fillRect(x,capY,inner,capH);
      c.shadowBlur=glowBlur;
      c.shadowColor=bandColor;
    }
  }
}
function drawCircularSpectrum(c,W,H,rms){
  const an=state.analyser;
  const minDb=an.minDecibels, maxDb=an.maxDecibels, range=maxDb-minDb, alpha=state.spec.smoothAlpha;
  const peaks=state.spec.peaks, bins=state.spec.bins, data=state.spec.data;
  const cx=W/2, cy=H/2;
  const maxRadius=Math.min(W,H)*0.4;
  const minRadius=Math.max(10, maxRadius*0.3);
  const barWidth=(2*Math.PI*minRadius)/bins*0.8;

  const hueLow=+state.spec.hueLow, hueHigh=+state.spec.hueHigh, sat=+state.spec.sat, baseL=+state.spec.light;

  const loud=Math.min(1,rms*1.8);

  const colorForBand = (i) => {
    const f=state._logCenters[i], ny=(state.audioCtx?.sampleRate||48000)/2;
    const p=Math.log10(Math.max(30,f))/Math.log10(ny);
    const h=hueLow+(hueHigh-hueLow)*p;
    const l=baseL*(0.78+0.22*loud)*state.spec.pausedFade;
    return hsl(h,sat,l,1);
  };

  c.lineWidth=barWidth; c.lineCap='round';

  for(let i=0;i<bins;i++){
    const pair=state._logRanges[i];
    const a=pair[0], b=pair[1];

    const end = Math.min(b, data.length);
    let sum=0, count=0;
    for(let k=a; k<end; k++){
      sum += data[k];
      count++;
    }

    const mag = count ? (sum / count) : 0;
    const db  = minDb + (mag/255)*(maxDb-minDb);
    const prev= peaks[i];
    const smoothed=(1-alpha)*db + alpha*prev;
    peaks[i]=smoothed;

    let val=(smoothed-minDb)/range;
    val=Math.max(0,Math.min(1,val*state.spec.sens));
    const ease=val*val;

    const len=minRadius+(maxRadius-minRadius)*ease*state.spec.pausedFade;

    const angle=(i/bins)*(2*Math.PI)-Math.PI/2;
    const x1=cx+minRadius*Math.cos(angle), y1=cy+minRadius*Math.sin(angle);
    const x2=cx+len*Math.cos(angle),     y2=cy+len*Math.sin(angle);

    c.beginPath();
    c.moveTo(x1,y1);
    c.lineTo(x2,y2);
    c.strokeStyle=colorForBand(i);
    c.stroke();
  }
}
;(() => {
  let resizeObs=null;
  function makeLogBins(analyser,bins){
    const sr=state.audioCtx?.sampleRate||48000; const ny=sr/2; const N=analyser.frequencyBinCount;
    const fmin=30,fmax=ny; const edges=new Array(bins+1).fill(0).map((_,i)=>{ const p=i/bins; const f=fmin*Math.pow(fmax/fmin,p); return Math.max(0,Math.min(N-1,Math.round(f/fmax*N))) });
    const ranges=[],centers=[];
    for(let i=0;i<bins;i++){ const a=edges[i], b=Math.max(a+1,edges[i+1]); ranges.push([a,b]); const pf=(i+0.5)/bins; centers.push(fmin*Math.pow(fmax/fmin,pf)) }
    return { ranges, centers };
  }
  function computeRMS(source){
    let arr=source;
    if(!(arr instanceof Uint8Array)){
      const an=source;
      const N=1024;
      arr=new Uint8Array(Math.min(N,an.fftSize));
      an.getByteTimeDomainData(arr);
    }
    let acc=0;
    for(let i=0;i<arr.length;i++){ const v=(arr[i]-128)/128; acc+=v*v }
    return Math.sqrt(acc/arr.length);
  }
  window.computeRMS=computeRMS;

  function drawSpectrum(){
    state.spectrumRAF=requestAnimationFrame(drawSpectrum);
    const now=performance.now(), minDt=1000/state.spec.maxFps; const dt=now-state.spec.lastDraw;
    if(dt<minDt) return; state.spec.lastDraw=now;

    const canvas=$.spectrum, c=canvas.getContext('2d'); const dpr=window.devicePixelRatio||1;
    const rect=$.wrap.getBoundingClientRect();
    const Hpx=Math.max(40,Math.floor(rect.height*0.36)), Wpx=Math.max(120,Math.floor(rect.width));
    const cssH=(state.spec.mode==='circular'? Wpx : Hpx);
    const pxW=Math.max(1,Wpx*dpr);
    const pxH=Math.max(1,cssH*dpr);
    if(state.spec.canvasCssW!==Wpx || state.spec.canvasCssH!==cssH){
      canvas.style.width=Wpx+'px';
      canvas.style.height=cssH+'px';
      state.spec.canvasCssW=Wpx;
      state.spec.canvasCssH=cssH;
    }
    if(state.spec.canvasPxW!==pxW || state.spec.canvasPxH!==pxH){
      canvas.width=pxW;
      canvas.height=pxH;
      state.spec.canvasPxW=pxW;
      state.spec.canvasPxH=pxH;
    }
    canvas.style.display='block';
    c.setTransform(1,0,0,1,0,0);
    c.globalAlpha=1;
    c.globalCompositeOperation='source-over';
    c.shadowBlur=0;
    c.shadowColor='transparent';
    c.filter='none';

    ensureAudioGraph(); const an=state.analyser;
    if(!state.spec.data||state.spec.data.length!==an.frequencyBinCount) state.spec.data=new Uint8Array(an.frequencyBinCount);
    if(!state.spec.timeData||state.spec.timeData.length!==Math.min(1024,an.fftSize)) state.spec.timeData=new Uint8Array(Math.min(1024,an.fftSize));
    an.getByteFrequencyData(state.spec.data);
    an.getByteTimeDomainData(state.spec.timeData);

    if(!state._logRanges||state._logRanges.length!==state.spec.bins){
      const r=makeLogBins(an,state.spec.bins);
      state._logRanges=r.ranges; state._logCenters=r.centers;
      state.spec.peaks=new Float32Array(state.spec.bins).fill(an.minDecibels);
      state.spec.peakY=new Float32Array(state.spec.bins).fill(0);
    }
    const targetFade=$.v.paused?0:1; state.spec.pausedFade = (state.spec.pausedFade*0.88) + (targetFade*0.12);
    const rms = computeRMS(state.spec.timeData);

    const W=canvas.width, H=canvas.height;
    if(state.anim.specTrails){
      c.globalAlpha=0.18; c.fillStyle='#000'; c.fillRect(0,0,W,H); c.globalAlpha=1;
    }else{
      c.clearRect(0,0,W,H);
    }

    const dtSec=Math.max(0.001,dt/1000);
    if(state.spec.mode==='circular'){ drawCircularSpectrum(c,W,H,rms) } else { drawBarSpectrum(c,W,H,dtSec,rms) }

    window.OPRuntime?.renderSpectrumOverlays?.({
      canvas,
      ctx:c,
      width:W,
      height:H,
      dpr,
      dtMs:dt,
      dtSec,
      analyser:an,
      freqData:state.spec.data,
      timeData:state.spec.timeData,
      bins:state.spec.bins,
      ranges:state._logRanges,
      centers:state._logCenters,
      rms,
      mode:state.spec.mode,
      overlayOnVideo:state.spec.overlayOnVideo,
      isAudioOnly:state.isAudioOnly
    });

    $.spectrum.classList.toggle('on-video', !currentHtml5IsAudio());
  }

  function startSpectrum(){
    try{
      ensureAudioGraph();
      state._logRanges=null; state._startTime=performance.now(); state.spec.lastDraw=0;
      state.spec.canvasCssW=0; state.spec.canvasCssH=0; state.spec.canvasPxW=0; state.spec.canvasPxH=0;
      $.spectrum.style.display='block';
      if(resizeObs){ try{resizeObs.disconnect()}catch(e){} }
      resizeObs=new ResizeObserver(()=>{ state.spec.lastDraw=0 });
      resizeObs.observe($.wrap);
      if(state.spectrumRAF) cancelAnimationFrame(state.spectrumRAF);
      state.spectrumRAF=requestAnimationFrame(drawSpectrum);
      if(currentHtml5IsAudio()) toast('音声モード（カラー・スペクトラム）');
    }catch(e){ stopSpectrum() }
  }
function updateSpectrumVisibility(){
    const isAudio=currentHtml5IsAudio();
    state.isAudioOnly=isAudio; updateAudioMetaVisibility();
    if(isAudio) clearVideoEdgeGlow();
    const shouldShow=(isAudio&&state.mediaKind==='html5')||(state.spec.overlayOnVideo&&state.mediaKind==='html5');
    if(shouldShow){ startSpectrum() } else { stopSpectrum() }
    enforceBackdropPolicy(); // ★ 背景ポリシー適用（重要）
  }
  window.updateSpectrumVisibility=updateSpectrumVisibility;
})();

/* ========= external audio sync ========= */
async function attachAudio(file){ detachAudio(); const url=URL.createObjectURL(file); state.extAudioUrl=url; const a=new Audio(url); a.crossOrigin='anonymous'; a.loop=false; state.extAudio=a; const tick=function(){ if(!state.extAudio||state.usingYouTube||state.usingIframe) return; const v=$.v; const A=state.extAudio; const diff=(A.currentTime||0)-(v.currentTime||0); const mode=$.driftMode.value; const thr=mode==='strong'?0.05:mode==='std'?0.12:9e9; if(Math.abs(diff)>thr){ A.currentTime=v.currentTime } if(!v.paused && A.paused) A.play().catch(()=>{}); if(v.paused && !A.paused) A.pause(); state.driftTimer=setTimeout(tick,120) }; tick(); toast('External audio loaded') }
function detachAudio(){ if(state.driftTimer){clearTimeout(state.driftTimer);state.driftTimer=null} if(state.extAudio){try{state.extAudio.pause()}catch(e){} state.extAudio=null; } if(state.extAudioUrl){ try{URL.revokeObjectURL(state.extAudioUrl)}catch(e){} state.extAudioUrl=null } if($.aud){ $.aud.value='' } setFileMeta($.audMeta, [], '音声未選択') }

/* ========= Media abstraction ========= */
function mediaDuration(){ return state.usingYouTube ? (state.yt?.getDuration?.()||0) : ($.v.duration||0) }
function mediaCurrent(){ return state.usingYouTube ? (state.yt?.getCurrentTime?.()||0) : ($.v.currentTime||0) }
function mediaSeekTo(t){ if(state.usingYouTube){ try{ state.yt?.seekTo?.(t,true) }catch(e){}; return } if(state.mediaKind==='html5'){ $.v.currentTime=Math.max(0,Math.min($.v.duration||0,t)) } }
function mediaPaused(){ return state.usingYouTube ? !(state.yt && state.yt.getPlayerState && state.yt.getPlayerState()===1) : !!$.v.paused }

/* ========= thumbs & seek ========= */
let buildThumbsTimer=null;
function buildThumbsDebounced(){ clearTimeout(buildThumbsTimer); buildThumbsTimer=setTimeout(buildThumbs,500) }
function cancelThumbBuild(clearThumbs=false){
  clearTimeout(buildThumbsTimer);
  state.thumbBuildToken++;
  if(state.thumbBuildCleanup){
    try{ state.thumbBuildCleanup() }catch(e){}
    state.thumbBuildCleanup = null;
  }
  if(clearThumbs){
    state.thumbs = [];
    state.thumbAmbientBucket = -1;
    state.thumbAmbientKey = '';
  }
}
async function createThumbSampler(){
  const currentItem = state.list[state.cur];
  const video = document.createElement('video');
  let tempUrl = '';
  video.muted = true;
  video.playsInline = true;
  video.preload = 'auto';
  video.crossOrigin = 'anonymous';
  const src = currentItem?.file ? (tempUrl = URL.createObjectURL(currentItem.file)) : ($.v.currentSrc || $.v.src || state.activeUrl || '');
  if(!src) return null;
  const cleanup = ()=>{
    video.pause?.();
    video.removeAttribute('src');
    video.load?.();
    if(tempUrl){ try{ URL.revokeObjectURL(tempUrl) }catch(e){} }
  };
  try{
    await new Promise((resolve,reject)=>{
      let done = false;
      const finish = (fn,arg)=>{ if(done) return; done = true; video.removeEventListener('loadedmetadata', onMeta); video.removeEventListener('error', onErr); fn(arg); };
      const onMeta = ()=>finish(resolve);
      const onErr = ()=>finish(reject, new Error('thumb sampler error'));
      video.addEventListener('loadedmetadata', onMeta, { once:true });
      video.addEventListener('error', onErr, { once:true });
      video.src = src;
      video.load?.();
    });
    if(!video.videoWidth || !video.duration){ cleanup(); return null; }
    return { video, cleanup };
  }catch(e){
    cleanup();
    return null;
  }
}
async function seekThumbSampler(video, t){
  return new Promise((resolve,reject)=>{
    let done = false;
    const timer = setTimeout(()=>finish(reject, new Error('thumb seek timeout')), 8000);
    const finish = (fn,arg)=>{
      if(done) return;
      done = true;
      clearTimeout(timer);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('error', onError);
      fn(arg);
    };
    const onSeeked = ()=>finish(resolve);
    const onError = ()=>finish(reject, new Error('thumb seek error'));
    video.addEventListener('seeked', onSeeked, { once:true });
    video.addEventListener('error', onError, { once:true });
    try{ video.currentTime = t; }catch(e){ finish(reject, e); }
  });
}
async function buildThumbs(){
  cancelThumbBuild(true);
  const v=$.v;
  if(state.usingYouTube||state.usingIframe) return;
  if(!v.videoWidth||!v.duration) return;
  const token = state.thumbBuildToken;
  const sampler = await createThumbSampler();
  if(token!==state.thumbBuildToken || !sampler) return;
  const { video, cleanup } = sampler;
  state.thumbBuildCleanup = cleanup;
  try{
    const cvs=document.createElement('canvas'), ctx=cvs.getContext('2d', { willReadFrequently:true });
    const stepSec=1;
    const w=144; const h=Math.max(1, Math.round(w*video.videoHeight/video.videoWidth));
    const totalSec=Math.max(0, Math.floor(video.duration));
    cvs.width=w; cvs.height=h;
    const currentItem = state.list[state.cur];
    for(let sec=0;sec<=totalSec;sec+=stepSec){
      if(token!==state.thumbBuildToken) break;
      const t=Math.min(video.duration-0.05,Math.max(0,sec));
      await seekThumbSampler(video, t);
      ctx.drawImage(video,0,0,w,h);
      let url=''; try{ url=cvs.toDataURL('image/jpeg',0.34) }catch(e){ url='' }
      const color = sampleCanvasColor(ctx, w, h);
      state.thumbs.push({t,url,color});
      if(sec===0 && currentItem?.file && fileLooksLikeVideo(currentItem.file) && url){
        if(!getItemThumb(currentItem)) setItemThumb(currentItem, url);
        if(!state.lastCoverUrl || state.lastCoverUrl===makeIconDataURL('video')){
          applyThumbAsCurrentCover(getItemThumb(currentItem) || url, 'video');
        }
        if(color) applyAmbientAccent(color);
        renderPlaylist();
      }
      await new Promise(r=>setTimeout(r, 16));
    }
    if(token===state.thumbBuildToken) toast('プレビュー生成完了');
  }catch(e){ toast('プレビュー失敗（CORS？）','warn',6000) }
  finally{
    if(token===state.thumbBuildToken){
      cleanup();
      state.thumbBuildCleanup = null;
    }
  }
}
function updateSeekUI(){ const dur=mediaDuration(), cur=mediaCurrent(); if(dur<=0) return; const p=100*(cur/dur); $.seekProg.style.width=p+'%'; $.seekThumb.style.left=p+'%'; $.seek.setAttribute('aria-valuenow',String(Math.round(p))) }
function startSeekRAF(){ cancelAnimationFrame(state.seekRAF); const draw=()=>{ state.seekRAF=requestAnimationFrame(draw); updateSeekUI(); const cur=mediaCurrent(); syncAmbientFromThumbTime(cur); syncVideoEdgeGlow(); if(state.abLoop && state.a!=null && state.b!=null && state.b>state.a){ if(cur>=state.b-0.02){ mediaSeekTo(state.a) } } }; state.seekRAF=requestAnimationFrame(draw) }
startSeekRAF();
function seekFromClientX(x){ const rect=$.seek.getBoundingClientRect(); const ratio=Math.min(1,Math.max(0,(x-rect.left)/rect.width)); mediaSeekTo((mediaDuration()||0)*ratio); rampTo(+($.master?.value||1),0.06) }
function showPreview(clientX){
  const seekRect=$.seek.getBoundingClientRect(); const wrapRect=$.wrap.getBoundingClientRect();
  const ratio=Math.min(1,Math.max(0,(clientX-seekRect.left)/seekRect.width));
  const t=(mediaDuration()||0)*ratio;
  $.seekPrev.style.display='block';
  const localLeft=(seekRect.left-wrapRect.left)+ratio*seekRect.width;
  $.seekPrev.style.left=localLeft+'px';
  $.seekTime.textContent=fmt(t);
  if(state.usingYouTube||state.usingIframe){ $.seekImg.removeAttribute('src'); return }
  const th=state.thumbs.reduce((b,c)=>Math.abs(c.t-t)<Math.abs(b.t-t)?c:b, state.thumbs[0]||{t:0,url:''});
  if(th&&th.url){ $.seekImg.src=th.url } else { $.seekImg.removeAttribute('src') }
}

/* ========= controls ========= */
$.play.onclick=()=>{ markUserGesture(); if(mediaPaused()) requestPlayImmediate('ui'); else safePause() };
$.back10.onclick=()=>{ mediaSeekTo(Math.max(0, mediaCurrent()-10)) };
$.fwd10.onclick=()=>{ mediaSeekTo(Math.min(mediaDuration(), mediaCurrent()+10)) };
$.pip.onclick=async()=>{
  if(state.usingYouTube||state.usingIframe){ toast('PiP not available for embed','warn'); return }
  try{
    const v = $.v;
    if(document.pictureInPictureElement){
      await document.exitPictureInPicture();
      return;
    }
    if(typeof v.requestPictureInPicture === 'function' && document.pictureInPictureEnabled){
      await v.requestPictureInPicture();
      return;
    }
    if(typeof v.webkitSupportsPresentationMode === 'function' && typeof v.webkitSetPresentationMode === 'function'){
      if(v.webkitSupportsPresentationMode('picture-in-picture')){
        const mode = v.webkitPresentationMode === 'picture-in-picture' ? 'inline' : 'picture-in-picture';
        v.webkitSetPresentationMode(mode);
        return;
      }
    }
    toast('PiP unsupported','warn');
  }catch(e){ toast('PiP unsupported','warn') }
};
$.vol.oninput=()=>{
  updateSliderReadouts();
  applyCurrentMediaTunables();
  store.set('pc.vol',$.vol.value);
  if($.v.volume>0) forceUnmute();
};
$.rate.oninput=()=>{
  updateSliderReadouts();
  applyCurrentMediaTunables();
  store.set('pc.rate',$.rate.value);
};
$.master.oninput=()=>{ updateSliderReadouts(); ensureAudioGraph(); const v=+$.master.value; try{ state.outGain.gain.setTargetAtTime(v, state.audioCtx.currentTime, 0.05) }catch(e){ state.outGain.gain.value=v } };
$.fullscreen.onclick=()=>{
  try{
    const wrap = $.shell || $.wrap;
    const v = $.v;
    const doc = document;
    if(doc.fullscreenElement || doc.webkitFullscreenElement){
      if(doc.exitFullscreen) doc.exitFullscreen();
      else if(doc.webkitExitFullscreen) doc.webkitExitFullscreen();
      return;
    }
    if(wrap.requestFullscreen) { wrap.requestFullscreen(); return; }
    if(wrap.webkitRequestFullscreen) { wrap.webkitRequestFullscreen(); return; }
    if(v.webkitEnterFullscreen) { v.webkitEnterFullscreen(); return; }
    toast('Fullscreen unsupported','warn');
  }catch(e){ toast('Fullscreen failed','err') }
};

document.addEventListener('keydown',(e)=>{
  if(e.key===' '){ e.preventDefault(); $.play.click() }
  if(e.key==='ArrowLeft') $.back10.click();
  if(e.key==='ArrowRight') $.fwd10.click();
  if(e.key==='['){ $.rate.value=(+$.rate.value-0.05).toFixed(2); $.rate.dispatchEvent(new Event('input')) }
  if(e.key===']'){ $.rate.value=(+$.rate.value+0.05).toFixed(2); $.rate.dispatchEvent(new Event('input')) }
  if(e.key==='f'){$.fullscreen.click()}
  if(e.key==='?'){ $.help.style.display='flex'; applyAnimClassesToModal() }
  if(e.key==='Escape'){
    if($.settings?.style.display==='flex') $.settings.style.display='none';
    else if($.help?.style.display==='flex') $.help.style.display='none';
  }
  if(/^[0-9]$/.test(e.key)){ const n=+e.key; const dur= mediaDuration(); const t=dur*(n/10); mediaSeekTo(t) }
  if(e.key==='a'){ $.setA.click() }
  if(e.key==='b'){ $.setB.click() }
  if(e.key==='r'){ $.clearAB.click() }
  if(e.key==='l'){ $.toggleABLoop.click() }
});
$.helpBtn.addEventListener('click',()=>{ $.help.style.display='flex'; applyAnimClassesToModal() });
$.help.addEventListener('click',(e)=>{ if(e.target===$.help) $.help.style.display='none' });

/* ========= Settings modal ========= */
$.btnSettings?.addEventListener('click',()=>{ $.settings.style.display='flex'; applyAnimClassesToModal(); enforceBackdropPolicy() });
$.btnSettingsClose?.addEventListener('click',()=>{ $.settings.style.display='none' });
$.settings?.addEventListener('click',(e)=>{ if(e.target===$.settings) $.settings.style.display='none' });

/* ========= seekbar events ========= */
;(() => {
  let dragging=false;
  const onMove=(clientX)=>{ showPreview(clientX); if(dragging) seekFromClientX(clientX) };
  $.seek.addEventListener('mousedown',(e)=>{ dragging=true; onMove(e.clientX); e.preventDefault() });
  window.addEventListener('mousemove',(e)=>{ if(dragging) onMove(e.clientX) });
  window.addEventListener('mouseup',()=>{ if(dragging){ dragging=false; $.seekPrev.style.display='none' } });
  $.seek.addEventListener('touchstart',(e)=>{ dragging=true; onMove(e.touches[0].clientX) },{passive:false});
  $.seek.addEventListener('touchmove',(e)=>{ if(dragging) onMove(e.touches[0].clientX) },{passive:false});
  $.seek.addEventListener('touchend',()=>{ dragging=false; $.seekPrev.style.display='none' });
  $.seek.addEventListener('mousemove',(e)=>{ if(!dragging) onMove(e.clientX) });
  $.seek.addEventListener('mouseleave',()=>{ if(!dragging) $.seekPrev.style.display='none' });
})();

/* ========= playlist ========= */
function renderPlaylist(){
  $.playlist.innerHTML='';
  state.list.forEach((it,i)=>{
    const el=document.createElement('div'); el.className='pl-item'; el.draggable=true; el.dataset.i=String(i);
    el.setAttribute('aria-current',String(i===state.cur));
    el.style.cssText='display:flex;align-items:center;gap:.6rem;padding:.55rem .7rem;border-bottom:1px solid color-mix(in oklab, var(--panel-2), #000 10%)';
    const fallbackThumb = it.url ? makeIconDataURL('video') : makeIconDataURL(fileLooksLikeAudio(it.file) ? 'audio' : 'video');
    const thumb = getItemThumb(it) || fallbackThumb;
    el.innerHTML='<span class="drag">☰</span><div class="pl-thumb" style="width:38px;height:38px;border-radius:10px;overflow:hidden;flex:0 0 auto;background:#0b1017;border:1px solid rgba(255,255,255,.08)"><img alt="" src="'+thumb+'" style="width:100%;height:100%;object-fit:cover;display:block"></div><div class="meta" style="flex:1;min-width:0"><div class="t" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+(it.title||it.url||(it.file?it.file.name:'Item'))+'</div><div class="s" style="color:var(--muted);font-size:12px">'+(it.url?'URL':(it.file?'FILE':'?'))+'</div></div><button class="btn ghost play">▶</button><button class="btn ghost rm">×</button>';
    el.querySelector('.play').onclick=()=>{ markUserGesture(); selectIndex(i) };
    el.querySelector('.rm').onclick=()=>{
      state.list.splice(i,1);
      if(i===state.cur){
        state.cur=-1;
        resetUiForHTML5();
        resetHtml5Video();
        clearAudioMeta();
      }
      renderPlaylist();
      savePlaylistAuto();
    };
    el.addEventListener('dragstart',(e)=>{e.dataTransfer.setData('text/plain',String(i))});
    el.addEventListener('dragover',(e)=>{e.preventDefault(); el.style.background='color-mix(in oklab, var(--panel-2), transparent 25%)'});
    el.addEventListener('dragleave',()=>{el.style.background=''});
    el.addEventListener('drop',(e)=>{ e.preventDefault(); el.style.background=''; const from=+e.dataTransfer.getData('text/plain'); const to=i; if(from===to) return; const m=state.list.splice(from,1)[0]; state.list.splice(to,0,m); renderPlaylist(); savePlaylistAuto() });
    $.playlist.appendChild(el);
  });
}
function warmupPlaylistThumbs(items){
  items.filter(it=>it?.file).forEach(async(it)=>{
    const thumb = await resolveFileThumb(it);
    if(thumb){
      renderPlaylist();
      if(state.list[state.cur]===it && !state.isAudioOnly){
        applyThumbAsCurrentCover(thumb, fileLooksLikeAudio(it.file)?'audio':'video');
      }
    }
  });
}
function addToPlaylist(items,replace){ if(replace){state.list=[];state.cur=-1} for(let i=0;i<items.length;i++){ state.list.push(items[i]) } renderPlaylist(); warmupPlaylistThumbs(items); if(state.cur===-1 && state.list.length) selectIndex(0) }
async function selectIndex(i){
  state.cur=i; renderPlaylist();
  const it=state.list[i]; if(!it) return;
  rampTo(0,0.15);
  setTimeout(async()=>{
    safePause(); if(state.extAudio){ try{state.extAudio.pause()}catch(e){} }
    markUserGesture();
    showLoader();
    if(it.url) return loadUrl(it.url).finally(()=>hideLoader());
    if(it.file){
      state.activeUrl = '';
      resetUiForHTML5(); resetHtml5Video(); clearAudioMeta();
      const obj=URL.createObjectURL(it.file);
      if(state.lastObjUrl){ try{URL.revokeObjectURL(state.lastObjUrl)}catch(e){} }
      const thumb = await resolveFileThumb(it);
      state.lastObjUrl=obj; $.v.src=obj; $.v.load(); applyCurrentMediaTunables();
      if(fileLooksLikeAudio(it.file)){
        handleAudioMetaForFile(it.file, it);
      }else{
        $.audioTitle.textContent = it.title || it.file.name || 'Video';
        $.audioSub.textContent = 'Local video';
        applyThumbAsCurrentCover(thumb, 'video');
        updateAudioMetaVisibility();
      }
      buildThumbsDebounced();
      requestPlay('selectIndex'); setTimeout(()=>rampTo(+($.master?.value||1),0.18),60);
      hideLoader();
    }
  },160);
}
const savePlaylistAuto=()=>{ store.set('pc.playlist', state.list.map(x=>({ url:(x.url||null), title:(x.title||null) }))) };
function savePlaylistManual(){ savePlaylistAuto(); toast('Playlist saved') }
function loadPlaylist(){ const arr=store.get('pc.playlist',[]); if(!arr.length){ toast('No saved playlist','warn'); return } const items=arr.filter(x=>!!x.url).map(x=>({ url:x.url, title:(x.title||x.url) })); addToPlaylist(items,true); toast('Playlist loaded') }
function clearPlaylistSaved(){ localStorage.removeItem('pc.playlist'); toast('Saved playlist cleared') }

/* ========= Spectrum settings binding ========= */
function applySpecControlsToState(){
  state.spec.mode=$.specMode.value; state.spec.overlayOnVideo=$.specOverlay.checked; state.spec.sens=+$.specSens.value; state.spec.bins=+$.specBins.value; state.spec.hueLow=+$.hueLow.value; state.spec.hueHigh=+$.hueHigh.value; state.spec.sat=+$.sat.value; state.spec.light=+$.light.value; state.spec.rainbowSpeed=+$.rainbowSpeed.value; state.spec.rainbowPhase=+$.rainbowPhase.value;
  store.set('pc.spec.mode',state.spec.mode); store.set('pc.spec.overlay',state.spec.overlayOnVideo); store.set('pc.spec.sens',state.spec.sens); store.set('pc.spec.bins',state.spec.bins); store.set('pc.spec.hueLow',state.spec.hueLow); store.set('pc.spec.hueHigh',state.spec.hueHigh); store.set('pc.spec.sat',state.spec.sat); store.set('pc.spec.light',state.spec.light); store.set('pc.spec.rainbowSpeed',state.spec.rainbowSpeed); store.set('pc.spec.rainbowPhase',state.spec.rainbowPhase);
  state._logRanges=null; state._logCenters=null; state.spec.lastDraw=0;
}
function initSpecControlsFromState(){
  $.specMode.value=state.spec.mode; $.specOverlay.checked=state.spec.overlayOnVideo; $.specSens.value=state.spec.sens; $.specBins.value=state.spec.bins; $.hueLow.value=state.spec.hueLow; $.hueHigh.value=state.spec.hueHigh; $.sat.value=state.spec.sat; $.light.value=state.spec.light; $.rainbowSpeed.value=state.spec.rainbowSpeed; $.rainbowPhase.value=state.spec.rainbowPhase;
}
initSpecControlsFromState();
[$.specMode,$.specOverlay,$.specSens,$.specBins,$.hueLow,$.hueHigh,$.sat,$.light,$.rainbowSpeed,$.rainbowPhase].forEach(el=>{
  el.addEventListener('change',()=>{ applySpecControlsToState(); updateSpectrumVisibility() });
  el.addEventListener('input',()=>{ applySpecControlsToState(); updateSpectrumVisibility() });
});

/* ========= HTML5 handlers ========= */
function wireMediaErrorHandlers(){
  $.v.onerror=()=>{ const err=$.v.error; hideLoader(); toast('このメディアは再生できません'+(err? ' ('+err.code+')':''),'err',5000) };
  $.v.onloadstart=()=>{ showLoader() };
  $.v.onloadedmetadata=()=>{ syncMediaPresentation(); unlockAudioCtx(); startUnmuteWatchdog(); ensureAudioOn(); applyCurrentMediaTunables(); requestPlay('loadedmetadata') };
  $.v.oncanplay=()=>{ hideLoader(); unlockAudioCtx(); startUnmuteWatchdog(); ensureAudioOn(); requestPlay('canplay') };
  $.v.onwaiting=()=>{ showLoader() };
  $.v.onplaying=()=>{ hideLoader(); };
  $.v.onplay=()=>{ try{state.audioCtx && state.audioCtx.state==='suspended' && state.audioCtx.resume()}catch(e){} setPlayingUI(true); enforceBackdropPolicy() };
  $.v.onpause=()=>{ setPlayingUI(false); enforceBackdropPolicy() };
  $.v.onended=()=>{ enforceBackdropPolicy(); if(!state.contPlay) return; if(state.list.length>0){ const next=(state.cur+1)%state.list.length; if(next!==state.cur){ selectIndex(next) } } };
}
wireMediaErrorHandlers();

/* ========= YouTube / Iframe 判定 ========= */
function parseYouTubeTime(raw){
  if(!raw) return 0;
  if(/^\d+$/.test(raw)) return +raw;
  const m = String(raw).match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/i);
  if(!m) return 0;
  return (+m[1]||0)*3600 + (+m[2]||0)*60 + (+m[3]||0);
}
function parseYouTubeUrl(url){
  try{
    const normalized = /^(https?:)?\/\//i.test(String(url).trim()) ? String(url).trim().replace(/^\/\//,'https://') : 'https://' + String(url).trim().replace(/^\/+/,'');
    const u = new URL(normalized);
    const host = u.hostname.replace(/^www\./i,'').replace(/^m\./i,'');
    const isYT = host==='youtu.be' || host==='youtube.com' || host==='music.youtube.com';
    if(!isYT) return null;
    const parts = u.pathname.split('/').filter(Boolean);
    const data = {
      videoId:null,
      listId:u.searchParams.get('list')||null,
      start:parseYouTubeTime(u.searchParams.get('t') || u.searchParams.get('start'))
    };
    if(host==='youtu.be') data.videoId = parts[0] || null;
    else if(u.searchParams.get('v')) data.videoId = u.searchParams.get('v');
    else if(parts[0]==='embed' || parts[0]==='shorts' || parts[0]==='live') data.videoId = parts[1] || null;
    else if(parts[0]==='playlist' && data.listId) data.videoId = null;
    if(data.videoId) data.videoId = data.videoId.replace(/[^\w-]/g,'');
    if(data.listId) data.listId = data.listId.replace(/[^\w-]/g,'');
    if(!data.videoId && !data.listId) return null;
    return data;
  }catch(e){ return null }
}
function canUseYouTubeEmbed(){
  return /^https?:$/i.test(location.protocol) && !!location.origin && location.origin !== 'null';
}
function getYouTubeContextMessage(){
  return 'YouTube 埋め込みは file:// 直開きでは失敗します。http://localhost などの HTTP(S) 経由で開いて再試行してください。';
}
const isYouTube=u=>!!parseYouTubeUrl(u);
const isHls=u=>/\.m3u8($|\?)/i.test(u);
const isNiconico=u=>/nicovideo\.jp\/watch\//i.test(u);
const isSoundCloud=u=>/soundcloud\.com\//i.test(u);
const isDash = u => /\.mpd($|\?)/i.test(u);
const nicoEmbedUrl=url=>{try{const u=new URL(url); const id=u.pathname.split('/').pop(); return 'https://embed.nicovideo.jp/watch/'+id+'?autoplay=1'}catch(e){return null}};
const scEmbedUrl=url=>{try{const enc=encodeURIComponent(url); return 'https://w.soundcloud.com/player/?url='+enc+'&auto_play=true'}catch(e){return null}};

/* ========= YouTube API ========= */
let ytApiPromise=null;
function injectYTApi(){
  if(window.YT?.Player) return Promise.resolve(window.YT);
  if(ytApiPromise) return ytApiPromise;
  ytApiPromise = new Promise((resolve,reject)=>{
    const prevReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      try{ if(typeof prevReady==='function') prevReady() }catch(e){}
      resolve(window.YT);
    };
    const existing = document.querySelector('script[data-yt-iframe-api="1"]');
    if(existing) return;
    const s=document.createElement('script');
    s.src='https://www.youtube.com/iframe_api';
    s.async=true;
    s.defer=true;
    s.dataset.ytIframeApi='1';
    s.onerror=()=>reject(new Error('YouTube IFrame API failed to load'));
    document.head.appendChild(s);
  });
  return ytApiPromise;
}

/* ========= 背景ポリシー ========= */
function enforceBackdropPolicy(){
  const m=state.anim;

  const videoActive = state.usingYouTube || state.usingIframe || (!state.isAudioOnly && !$.v.paused);

  document.body.classList.toggle('anim-scanlines', !!m.scanlines);
  document.body.classList.toggle('anim-grad-border', !!m.gradBorder);
  document.body.classList.toggle('anim-crt', !!m.crt);
  document.body.classList.toggle('anim-vignette-breathe', !!m.vignette);
  document.body.classList.toggle('anim-glitch', !!m.glitchPause);

  const allow = (flag)=> !!flag && !videoActive;
  document.body.classList.toggle('anim-particles', allow(m.particles));
  document.body.classList.toggle('anim-bokeh',     allow(m.bokeh));

  $.fxAurora.classList.toggle('show', allow(m.fxAurora));
  $.fxStars .classList.toggle('show', allow(m.fxStars));
  $.fxGrid  .classList.toggle('show', allow(m.fxGrid));
  $.fxBeams .classList.toggle('show', allow(m.fxBeams));
  $.fxNebula.classList.toggle('show', allow(m.fxNebula));

  try{ window.OPAnim?.setBackdropsEnabled?.(!videoActive) }catch(e){}
  try{ window.OPAurora?.enable?.(allow(m.fxAurora)) }catch(e){}
  try{ window.OPFun?.enableStars?.(allow(m.fxStars)) }catch(e){}
  try{ window.OPGrid?.enable?.(allow(m.fxGrid)) }catch(e){}
}

/* ========= 切替系 ========= */
function switchToIframe(src,type){
  hideEmbedError();
  setPortraitFrameMode(false);
  setMediaMode('iframe',{ url:src });
  state.isAudioOnly=false; updateAudioMetaVisibility(); unloadASS(); stopSpectrum(); clearAudioMeta(); safePause();
  $.v.style.display='none'; if(state.iframe){ state.iframe.remove() }
  const ifr=document.createElement('iframe');
  ifr.allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share';
  ifr.allowFullscreen=true; ifr.referrerPolicy='strict-origin-when-cross-origin'; ifr.loading='lazy'; ifr.src=src; ifr.style.border='0';
  $.wrap.appendChild(ifr); state.iframe=ifr;
  showLoader(); setTimeout(()=>hideLoader(),500);
  toast(type==='niconico'?'ニコニコ動画 を埋め込み再生中':'SoundCloud を埋め込み再生中');
  window.OPAnim?.setEmbedPlaying?.(true);
  syncMediaPresentation();
}
async function switchToYouTube(url){
  hideEmbedError();
  setPortraitFrameMode(false);
  state.activeUrl = url;
  state.isAudioOnly=false; updateAudioMetaVisibility();
  unloadASS(); stopSpectrum(); clearAudioMeta(); safePause();
  $.v.style.display='none'; if(state.iframe){ state.iframe.remove(); state.iframe=null }
  const old=state.ytEl||document.getElementById('yt'); if(old){ try{old.remove()}catch(e){} state.ytEl=null }
  const ytData=parseYouTubeUrl(url);
  if(!ytData){
    setMediaMode('html5');
    $.v.style.display='block';
    toast('Invalid YouTube URL','err');
    showEmbedError('YouTube URL を解析できません','`youtu.be` / `youtube.com/watch` / `shorts` / `playlist` 形式を確認してください。');
    return;
  }
  if(!canUseYouTubeEmbed()){
    setMediaMode('html5');
    $.v.style.display='block';
    toast('YouTube は HTTP(S) 経由で開いてください','err');
    showEmbedError('YouTube はこの開き方では再生できません', getYouTubeContextMessage(), {
      hint:'このアプリは `http://localhost` やローカルサーバー経由で開いてください。URL 自体は直接 YouTube で開けます。',
      actionLabel:'YouTubeで開く',
      actionHandler:()=>window.open(url,'_blank','noopener')
    });
    return;
  }
  setMediaMode('youtube',{ url });
  showLoader();
  try{
    await injectYTApi();
  }catch(e){
    setMediaMode('html5');
    $.v.style.display='block';
    hideLoader();
    toast('YouTube API load failed','err');
    showEmbedError('YouTube API の読み込みに失敗しました','ネットワーク制限か CDN ブロックの可能性があります。時間を置いて再試行してください。',{
      actionLabel:'YouTubeで開く',
      actionHandler:()=>window.open(url,'_blank','noopener')
    });
    return;
  }
  const holder=document.createElement('div'); holder.id='yt'; holder.style.width='100%'; holder.style.height='100%'; $.wrap.appendChild(holder); state.ytEl=holder;
  const origin = canUseYouTubeEmbed() ? location.origin : undefined;
  let seekApplied = false;
  state.yt=new YT.Player(holder,{
    ...(ytData.videoId ? {videoId:ytData.videoId} : {}),
    playerVars:{
      rel:0,
      playsinline:1,
      autoplay:1,
      enablejsapi:1,
      mute:1,
      ...(ytData.listId ? {list:ytData.listId} : {}),
      ...(!ytData.videoId && ytData.listId ? {listType:'playlist'} : {}),
      ...(ytData.start ? {start:ytData.start} : {}),
      ...(origin ? { origin } : {})
    },
    events:{
      onReady:(e)=>{
        try{ e.target.mute?.() }catch(err){}
        try{ e.target.playVideo?.() }catch(err){}
        if(ytData.start && !seekApplied){
          seekApplied = true;
          setTimeout(()=>{ try{ e.target.seekTo?.(ytData.start, true) }catch(err){} },120);
        }
        if(state.triedOnce){
          setTimeout(()=>{
            try{
              e.target.unMute?.();
            }catch(err){}
          }, 250);
        }
        applyCurrentMediaTunables();
        startSeekRAF();
        window.OPAnim?.setEmbedPlaying?.(true);
        hideLoader();
        syncMediaPresentation();
      },
      onStateChange:()=>{ startSeekRAF(); syncMediaPresentation(); },
      onError:(e)=>{
        hideLoader();
        const code=e?.data;
        let title='YouTube 埋め込みエラー';
        let message='再生を開始できませんでした。';
        let hint='';
        if(code===2){ title='URL または動画IDが不正です'; message='URL 形式が崩れているか、対応していない動画 ID です。'; }
        else if(code===5){ title='プレイヤー初期化に失敗しました'; message='ブラウザ側で HTML5 プレイヤーを開始できませんでした。'; }
        else if(code===100){ title='動画が見つからないか非公開です'; message='削除済み、非公開、または移動済みの可能性があります。'; }
        else if(code===101 || code===150){ title='埋め込み再生が禁止されています'; message='この動画は YouTube 外部サイトへの埋め込みが許可されていません。'; hint='埋め込み不可でも、YouTube 本体では再生できる場合があります。'; }
        else if(code===153){ title='YouTube がクライアント情報を確認できません'; message=getYouTubeContextMessage(); hint='`file://` 直開きや Referer が送れない環境で発生します。'; }
        if(code===153){
          window.OPAnim?.setEmbedPlaying?.(false);
          syncMediaPresentation();
        }
        showEmbedError(title,message,{
          hint,
          actionLabel:url ? 'YouTubeで開く' : '',
          actionHandler:url ? (()=>window.open(url,'_blank','noopener')) : null
        });
        toast('YouTube error: '+code,'err');
      }
    }
  });
}
function resetUiForHTML5(){
  cancelThumbBuild(true);
  clearVideoEdgeGlow();
  hideEmbedError();
  setPortraitFrameMode(false);
  setMediaMode('html5');
  if(state.yt){ try{state.yt.destroy?.()}catch(e){} state.yt=null; }
  const yEl=state.ytEl||document.getElementById('yt'); if(yEl){ try{yEl.remove()}catch(e){} state.ytEl=null }
  if(state.iframe){ state.iframe.remove(); state.iframe=null }
  state.isAudioOnly=false; updateAudioMetaVisibility();
  $.v.style.display='block';
  window.OPAnim?.setEmbedPlaying?.(false);
  syncMediaPresentation();
}
function resetHtml5Video(){ cancelThumbBuild(true); clearVideoEdgeGlow(); if($.v._hls){ try{$.v._hls.destroy()}catch(e){} $.v._hls=null } stopSpectrum(); safePause(); setPortraitFrameMode(false); $.v.srcObject=null; $.v.removeAttribute('src'); $.v.load() }

/* ========= URL読み込み ========= */
async function loadUrl(url){
  if(!url) return;
  state.activeUrl = url;
  hideEmbedError();
  unloadASS(); stopSpectrum(); clearAudioMeta(); forceUnmute(); unlockAudioCtx(); startUnmuteWatchdog();
  if ($.v._hls) { try { $.v._hls.destroy() } catch(e) {} $.v._hls = null }

  if(isYouTube(url)) return switchToYouTube(url);
  if(isNiconico(url)) return switchToIframe(nicoEmbedUrl(url),'niconico');
  if(isSoundCloud(url)) return switchToIframe(scEmbedUrl(url),'soundcloud');
  if (isDash(url)) {
  resetUiForHTML5(); safePause();
  $.v.removeAttribute('src'); $.v.load(); applyCurrentMediaTunables();
  showLoader();
  try{
    const player = dashjs.MediaPlayer().create();
    window.OPDash?.applyDefaults?.(player); // ← dash.plugin.js の既定を適用
    player.initialize($.v, url, true);
    player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
      hideLoader();
      safeVolumeBump(); ensureAudioOn(); requestPlay('dash:init');
    });
  }catch(e){
    hideLoader(); toast('DASH初期化に失敗','err');
  }
  return;
}


  resetUiForHTML5(); safePause(); $.v.removeAttribute('src'); $.v.load(); applyCurrentMediaTunables();
  showLoader();

  if(isHls(url)){
    if(window.Hls && Hls.isSupported()){
      const hls=new Hls({enableWorker:true,maxBufferLength:30});
      $.v._hls=hls; hls.attachMedia($.v);
      hls.on(Hls.Events.MEDIA_ATTACHED,()=>{ hls.loadSource(url) });
      hls.on(Hls.Events.MANIFEST_PARSED,()=>{ safeVolumeBump(); ensureAudioOn(); requestPlay('hls:manifest'); hideLoader(); });
      hls.on(Hls.Events.ERROR,(_,data)=>{ if(data.fatal){ switch(data.type){ case Hls.ErrorTypes.NETWORK_ERROR:hls.startLoad();break; case Hls.ErrorTypes.MEDIA_ERROR:hls.recoverMediaError();break; default:hls.destroy(); } }});
    } else if($.v.canPlayType('application/vnd.apple.mpegurl')) {
      $.v.src=url; applyCurrentMediaTunables();
    } else { hideLoader(); toast('HLS not supported','err',6000) }
  } else {
    $.v.src=url; applyCurrentMediaTunables(); handleAudioMetaForUrl(url).finally(()=>hideLoader());
  }
  buildThumbsDebounced();
}

/* ========= open / file / dnd ========= */
;(() => {
  $.openUrl.addEventListener('click',()=>{ markUserGesture(); const u=$.url.value.trim(); if(!u){ toast('URLを入力してね','warn'); return } const it={ url:u, title:u }; const replace=$.dropMode.checked && state.list.length===0; addToPlaylist([it],replace); selectIndex(state.list.length-1); savePlaylistAuto() });
  $.file.addEventListener('change',(e)=>{ markUserGesture(); const files=Array.from(e.target.files||[]); setFileMeta($.fileMeta, files, 'ファイル未選択'); if(!files.length) return; const replace=$.dropMode.checked; addToPlaylist(files.map(f=>({ file:f, title:f.name })),replace); if(state.cur===-1) selectIndex(0); savePlaylistAuto() });
  document.addEventListener('dragover',(e)=>{e.preventDefault()});
  document.addEventListener('drop',(e)=>{ e.preventDefault(); markUserGesture(); const files=Array.from(e.dataTransfer.files||[]); if(!files.length) return; const replace=$.dropMode.checked; addToPlaylist(files.map(f=>({ file:f, title:f.name })),replace); if(state.cur===-1) selectIndex(0); savePlaylistAuto() });
  $.btnClear.addEventListener('click',()=>{ state.list=[]; state.cur=-1; renderPlaylist(); resetUiForHTML5(); resetHtml5Video(); clearAudioMeta(); savePlaylistAuto() });
  $.btnShuffle.addEventListener('click',()=>{ state.list.sort(()=>Math.random()-0.5); renderPlaylist(); savePlaylistAuto() });
  $.saveList.addEventListener('click',savePlaylistManual);
  $.loadList.addEventListener('click',loadPlaylist);
  $.clearList.addEventListener('click',clearPlaylistSaved);
  $.contPlay.addEventListener('change',()=>{ state.contPlay=$.contPlay.checked; store.set('pc.contPlay', state.contPlay) });
})();

/* ========= A/B 操作（＋ループ） ========= */
function syncABDisp(){ $.abDisp.textContent='A:'+(state.a!=null?fmt(state.a):'-')+' B:'+(state.b!=null?fmt(state.b):'-'); $.abLoopStat.textContent='AB Loop: '+(state.abLoop?'ON':'OFF'); document.body.classList.toggle('ab-on', state.abLoop) }
$.setA.onclick=()=>{ state.a=mediaCurrent(); syncABDisp() }
$.setB.onclick=()=>{ state.b=mediaCurrent(); syncABDisp() }
$.clearAB.onclick=()=>{ state.a=null; state.b=null; state.abLoop=false; syncABDisp() }
$.toggleABLoop.onclick=()=>{ if(state.a==null||state.b==null||!(state.b>state.a)){ toast('A/Bを設定してから','warn'); return } state.abLoop=!state.abLoop; syncABDisp(); toast(state.abLoop?'ABループON':'ABループOFF', state.abLoop?'ok':'warn') }
syncABDisp();

/* ========= visibility ========= */
document.addEventListener('visibilitychange',()=>{ try{ if(document.hidden){ state.audioCtx?.suspend?.() } else { state.audioCtx?.resume?.() } }catch(e){} try{ updateSpectrumVisibility() }catch(e){} });
window.addEventListener('resize',()=>{ try{ updateSpectrumVisibility() }catch(e){} });

/* ========= init ========= */
const savedVol=store.get('pc.vol',0.9); $.v.volume=savedVol; $.vol.value=savedVol;
const savedRate=store.get('pc.rate',1.0); $.v.playbackRate=savedRate; $.rate.value=savedRate;
updateSliderReadouts();
syncMediaControlAvailability();
function applySubStylePreset(v){ const m={std:{size:28,outline:3,margin:30},large:{size:40,outline:4,margin:40},small:{size:20,outline:2,margin:20},shadow:{size:28,outline:6,margin:30}}; const p=m[v]||m.std; $.subSize.value=p.size; $.subOutline.value=p.outline; $.subMargin.value=p.margin; applySubStyle() }
function applyPresetStd(){ $.subPreset.value='std'; applySubStylePreset('std') }
applyPresetStd();
renderPlaylist();
startSeekRAF();
initCanvasHud();

/* ========= メニュー/検索/EQ ========= */
qs('#btnUnloadSub')?.addEventListener('click',()=>{unloadTracks();unloadASS();toast('字幕解除')});
qs('#btnUnloadSub')?.addEventListener('click',()=>{ if($.srt) $.srt.value=''; setFileMeta($.srtMeta, [], '字幕未選択') });
qs('#btnClearFonts')?.addEventListener('click',()=>{ state.assFonts=[]; if($.fontInput) $.fontInput.value=''; setFileMeta($.fontMeta, [], 'フォント未選択'); toast('ASSフォント解除') });
qs('#fontInput')?.addEventListener('change',async(e)=>{ const files=Array.from(e.target.files||[]); setFileMeta($.fontMeta, files, 'フォント未選択'); state.assFonts=await Promise.all(files.map(async f=>({name:f.name,url:URL.createObjectURL(f)}))); if(files.length) toast('フォント追加: '+files.length) });
qs('#srtInput')?.addEventListener('change',async(e)=>{ const f=e.target.files?.[0]; setFileMeta($.srtMeta, f?[f]:[], '字幕未選択'); if(!f) return; if(f.name.endsWith('.ass')) await attachASSFromFile(f); else await attachSrtOrVttFromFile(f) });
qs('#audInput')?.addEventListener('change',(e)=>{ const f=e.target.files?.[0]; setFileMeta($.audMeta, f?[f]:[], '音声未選択'); if(f) attachAudio(f) });
qs('#btnUnloadAud')?.addEventListener('click',detachAudio);
$.btnSubSearch.addEventListener('click',()=> searchSubs($.subSearch.value));
$.subSearch.addEventListener('keydown',(e)=>{ if(e.key==='Enter'){ e.preventDefault(); searchSubs($.subSearch.value) }});
setFileMeta($.fileMeta, [], 'ファイル未選択');
setFileMeta($.srtMeta, [], '字幕未選択');
setFileMeta($.fontMeta, [], 'フォント未選択');
setFileMeta($.audMeta, [], '音声未選択');
ensureAudioGraph(); buildEqUI();
if(state.eq.values){ restoreEqValues() } else { applyEqPreset(state.eq.preset||'flat') }

/* ========= Media Session ========= */
;(() => {
  if(!('mediaSession' in navigator)) return;
  const v=$.v;
  function baseTitleFromSrc(src){ try{ const u=new URL(src, location.href); const name=decodeURIComponent(u.pathname.split('/').pop()||''); return (name||'').replace(/\.[^/.]+$/, '') || 'Unknown' }catch(e){ return 'Unknown' } }
  function currentMetaFromUI(){
    const titleTxt=(($.audioTitle?.textContent)||'').trim();
    const subTxt=(($.audioSub?.textContent)||'').trim();
    let artist='',album=''; if(subTxt){ const parts=subTxt.split(' — '); artist=parts[0]||''; album=parts[1]||'' }
    const artwork=[]; try{ const cover=state.lastCoverUrl; if(cover) artwork.push({src:cover,sizes:'512x512',type:'image/png'}) }catch(e){}
    const title=titleTxt || baseTitleFromSrc(v.currentSrc||'');
    return {title,artist,album,artwork};
  }
  function pushPosition(){ try{ if(typeof navigator.mediaSession.setPositionState==='function' && isFinite(v.duration)){ navigator.mediaSession.setPositionState({ duration:v.duration||0, position:v.currentTime||0, playbackRate:v.playbackRate||1 }) } }catch(e){} }
  function syncPlaybackState(){ try{ navigator.mediaSession.playbackState = mediaPaused() ? 'paused' : 'playing' }catch(e){} }
  function updateMediaSession(meta){ meta=meta||currentMetaFromUI(); try{ navigator.mediaSession.metadata=new MediaMetadata({ title:meta.title||baseTitleFromSrc(v.currentSrc||''), artist:meta.artist||'', album:meta.album||'', artwork:meta.artwork||[] }); pushPosition(); syncPlaybackState() }catch(e){} }
  try{
    navigator.mediaSession.setActionHandler('play',()=>{ v.play().catch(()=>{}) });
    navigator.mediaSession.setActionHandler('pause',()=>{ try{ v.pause() }catch(e){} });
    navigator.mediaSession.setActionHandler('seekbackward',(d)=>{ try{ v.currentTime=Math.max(0, v.currentTime-(d?.seekOffset||10)) }catch(e){} });
    navigator.mediaSession.setActionHandler('seekforward',(d)=>{ try{ v.currentTime=Math.min(v.duration||v.currentTime+10, v.currentTime+(d?.seekOffset||10)) }catch(e){} });
    navigator.mediaSession.setActionHandler('seekto',(d)=>{ try{ if(typeof d.seekTime==='number') v.currentTime=d.seekTime }catch(e){} });
    navigator.mediaSession.setActionHandler('previoustrack',()=>{ if(state.list.length){ const prev=(state.cur-1+state.list.length)%state.list.length; selectIndex(prev) }});
    navigator.mediaSession.setActionHandler('nexttrack',()=>{ if(state.list.length){ const next=(state.cur+1)%state.list.length; selectIndex(next) }});
  }catch(e){}
  ['loadedmetadata','play','pause','ratechange','ended'].forEach(ev=>{ v.addEventListener(ev,()=>{ updateMediaSession() }) });
  v.addEventListener('timeupdate', pushPosition);
  try{
    const mo=new MutationObserver(()=>updateMediaSession());
    if($.audioTitle) mo.observe($.audioTitle,{childList:true,subtree:true,characterData:true});
    if($.audioSub)   mo.observe($.audioSub  ,{childList:true,subtree:true,characterData:true});
  }catch(e){}
  if(v.currentSrc) updateMediaSession();
})();

/* ========= アニメ：状態 ⇄ クラス ⇄ インタラクション ========= */
function applyAnimClasses(){
  const root=document.body.classList;
  const m=state.anim;
  root.toggle('anim-bgken',!!m.bgKen);
  root.toggle('anim-cover-spin',!!m.coverSpin);
  root.toggle('anim-cover-bob',!!m.coverBob);
  root.toggle('anim-btn-lift',!!m.btnHoverLift);
  root.toggle('anim-thumb-pulse',!!m.thumbPulse);
  root.toggle('anim-toast-slide',!!m.toastSlide);
  root.toggle('anim-modal-zoom',!!m.modalZoom);
  root.toggle('anim-pl-slide',!!m.plSlide);
  root.toggle('anim-ab-blink',!!m.abBlink);
  root.toggle('anim-header-shimmer',!!m.headerShim);
  root.toggle('anim-card-parallax',!!m.cardParallax);
  root.toggle('anim-spec-beat',!!m.specBeat);

  if(!m.videoEdgeGlow) clearVideoEdgeGlow();
  enforceBackdropPolicy();
}
function applyAnimClassesToModal(){ document.body.classList.toggle('anim-modal-zoom', !!state.anim.modalZoom) }

/* --- インタラクション（カバー傾き／カードパララックス） --- */
function enableCoverTilt(){
  if(state._coverTiltOn) return;
  state._coverTiltOn=true;
  const el=$.artWrap;
  let raf=0, rect=null, px=0, py=0;
  const measure=()=>{ rect=el.getBoundingClientRect() };
  const flush=()=>{
    raf=0;
    if(!rect) measure();
    const rx=px-rect.left, ry=py-rect.top;
    const nx=(rx/rect.width)-.5, ny=(ry/rect.height)-.5;
    const max=10;
    el.style.setProperty('--cover-tilt', `rotateY(${nx*max}deg) rotateX(${-ny*max}deg)`);
  };
  const queue=(e)=>{
    px=(e.clientX ?? (e.touches?.[0]?.clientX||0));
    py=(e.clientY ?? (e.touches?.[0]?.clientY||0));
    if(!raf) raf=requestAnimationFrame(flush);
  };
  const onEnter=()=>{ measure(); el.classList.add('rt-active') };
  const onMove=(e)=>{ if(!rect) onEnter(); queue(e) };
  const onLeave=()=>{
    if(raf){ cancelAnimationFrame(raf); raf=0 }
    rect=null;
    el.classList.remove('rt-active');
    el.style.setProperty('--cover-tilt','rotateX(0deg) rotateY(0deg)');
  };
  el.__tiltHandlers={onEnter,onMove,onLeave};
  el.addEventListener('mouseenter',onEnter);
  el.addEventListener('mousemove',onMove);
  el.addEventListener('mouseleave',onLeave);
  el.addEventListener('touchmove',onMove,{passive:true});
  el.addEventListener('touchstart',onEnter,{passive:true});
  el.addEventListener('touchend',onLeave);
}
function disableCoverTilt(){
  if(!state._coverTiltOn) return;
  state._coverTiltOn=false;
  const el=$.artWrap, h=el.__tiltHandlers||{};
  el.removeEventListener('mouseenter',h.onEnter);
  el.removeEventListener('mousemove',h.onMove);
  el.removeEventListener('mouseleave',h.onLeave);
  el.removeEventListener('touchstart',h.onEnter);
  el.removeEventListener('touchmove',h.onMove);
  el.removeEventListener('touchend',h.onLeave);
  el.classList.remove('rt-active');
  el.style.setProperty('--cover-tilt','rotateX(0deg) rotateY(0deg)');
}
function enableCardParallax(){
  if(state._cardParallaxOn) return;
  state._cardParallaxOn=true;
  const el=$.shell || $.wrap;
  let raf=0, rect=null, px=0, py=0;
  const measure=()=>{ rect=el.getBoundingClientRect() };
  const flush=()=>{
    raf=0;
    if(!rect) measure();
    const nx=((px-rect.left)/rect.width)-.5;
    const ny=((py-rect.top)/rect.height)-.5;
    el.style.setProperty('--card-rot', `rotateY(${nx*4}deg) rotateX(${-ny*3}deg)`);
  };
  const queue=(e)=>{
    px=e.clientX; py=e.clientY;
    if(!raf) raf=requestAnimationFrame(flush);
  };
  const onEnter=()=>{ measure(); el.classList.add('rt-active') };
  const onMove=(e)=>{ if(!rect) onEnter(); queue(e) };
  const onLeave=()=>{
    if(raf){ cancelAnimationFrame(raf); raf=0 }
    rect=null;
    el.classList.remove('rt-active');
    el.style.setProperty('--card-rot','rotateX(0deg) rotateY(0deg)');
  };
  el.__parallaxHandlers={onEnter,onMove,onLeave};
  el.addEventListener('mouseenter',onEnter);
  el.addEventListener('mousemove',onMove);
  el.addEventListener('mouseleave',onLeave);
}
function disableCardParallax(){
  if(!state._cardParallaxOn) return;
  state._cardParallaxOn=false;
  const el=$.shell || $.wrap, h=el.__parallaxHandlers||{};
  el.removeEventListener('mouseenter',h.onEnter);
  el.removeEventListener('mousemove',h.onMove);
  el.removeEventListener('mouseleave',h.onLeave);
  el.classList.remove('rt-active');
  el.style.setProperty('--card-rot','rotateX(0deg) rotateY(0deg)');
}
function applyAnimInteractivity(){
  if(state.anim.coverTilt) enableCoverTilt(); else disableCoverTilt();
  if(state.anim.cardParallax) enableCardParallax(); else disableCardParallax();
}

/* --- UIロード & 反映ボタン対応（ステージング） --- */
function loadAnimTogglesToUI(){
  const safe=(el,val)=>{ if(el) el.checked=!!val };
  const a=state.anim;
  safe($.animBgKen, a.bgKen);  safe($.animCoverTilt, a.coverTilt);  safe($.animCoverSpin, a.coverSpin);
  safe($.animCoverBob, a.coverBob); safe($.animBtnLift, a.btnHoverLift);
  safe($.animSpecGlow, a.specGlow); safe($.animSpecTrails, a.specTrails);
  safe($.animThumbPulse, a.thumbPulse); safe($.animToastSlide, a.toastSlide);
  safe($.animModalZoom, a.modalZoom); safe($.animPlSlide, a.plSlide);
  safe($.animAbBlink, a.abBlink); safe($.animHeaderShim, a.headerShim);
  safe($.animParticles, a.particles); safe($.animCardParallax, a.cardParallax);
  safe($.animBokeh, a.bokeh); safe($.animScanlines, a.scanlines);
  safe($.animGradBorder, a.gradBorder); safe($.animVideoEdge, a.videoEdgeGlow); safe($.animCRT, a.crt);
  safe($.animVignette, a.vignette); safe($.animGlitch, a.glitchPause);
  safe($.animSpecBeat, a.specBeat);
  safe($.animFxAurora, a.fxAurora); safe($.animFxStars, a.fxStars);
  safe($.animFxGrid, a.fxGrid); safe($.animFxBeams, a.fxBeams); safe($.animFxNebula, a.fxNebula);
}
function gatherAnimFromUI(){
  return {
    bgKen:$.animBgKen?.checked, coverTilt:$.animCoverTilt?.checked, coverSpin:$.animCoverSpin?.checked, coverBob:$.animCoverBob?.checked,
    btnHoverLift:$.animBtnLift?.checked, specGlow:$.animSpecGlow?.checked, specTrails:$.animSpecTrails?.checked,
    thumbPulse:$.animThumbPulse?.checked, toastSlide:$.animToastSlide?.checked, modalZoom:$.animModalZoom?.checked, plSlide:$.animPlSlide?.checked,
    abBlink:$.animAbBlink?.checked, headerShim:$.animHeaderShim?.checked, particles:$.animParticles?.checked, cardParallax:$.animCardParallax?.checked,
    bokeh:$.animBokeh?.checked, scanlines:$.animScanlines?.checked, gradBorder:$.animGradBorder?.checked, videoEdgeGlow:$.animVideoEdge?.checked, crt:$.animCRT?.checked,
    vignette:$.animVignette?.checked, glitchPause:$.animGlitch?.checked, specBeat:$.animSpecBeat?.checked,
    fxAurora:$.animFxAurora?.checked, fxStars:$.animFxStars?.checked, fxGrid:$.animFxGrid?.checked, fxBeams:$.animFxBeams?.checked, fxNebula:$.animFxNebula?.checked
  };
}
function isAnimDirty(){
  const staged=gatherAnimFromUI(), cur=state.anim;
  return Object.keys(staged).some(k=>!!staged[k]!==!!cur[k]);
}
function updateAnimDirtyBadge(){
  const dirty=isAnimDirty();
  if($.animDirtyBadge) $.animDirtyBadge.style.display = dirty ? 'inline-flex' : 'none';
}

/* 変更の検知だけ（即時適用しない） */
function bindAnimUI(){
  const list=[
    $.animBgKen,$.animCoverTilt,$.animCoverSpin,$.animCoverBob,$.animBtnLift,$.animSpecGlow,$.animSpecTrails,$.animThumbPulse,$.animToastSlide,$.animModalZoom,$.animPlSlide,$.animAbBlink,$.animHeaderShim,$.animParticles,$.animCardParallax,
    $.animBokeh,$.animScanlines,$.animGradBorder,$.animVideoEdge,$.animCRT,$.animVignette,$.animGlitch,$.animSpecBeat,
    $.animFxAurora,$.animFxStars,$.animFxGrid,$.animFxBeams,$.animFxNebula
  ].filter(Boolean);
  list.forEach(el=> el.addEventListener('change', updateAnimDirtyBadge));
  updateAnimDirtyBadge();

  $.btnApplyAnim?.addEventListener('click', ()=>{
    showLoader();
    state.anim = gatherAnimFromUI();
    store.set('pc.anim', state.anim);
    applyAnimClasses();
    applyAnimInteractivity();
    updateAnimDirtyBadge();
    setTimeout(()=>{ hideLoader(); toast('アニメーション設定を適用しました','ok'); }, 300);
  });
  $.btnAnimRevert?.addEventListener('click', ()=>{
    loadAnimTogglesToUI();
    updateAnimDirtyBadge();
    toast('未保存の変更を破棄しました','warn');
  });
}
loadAnimTogglesToUI(); applyAnimClasses(); applyAnimInteractivity(); bindAnimUI();

/* ========= クリーンアップ ========= */
window.addEventListener('beforeunload',()=>{
  try{ if(state.lastObjUrl) URL.revokeObjectURL(state.lastObjUrl) }catch(e){}
  try{ if(state.lastCoverUrl && state.lastCoverUrl.startsWith('blob:')) URL.revokeObjectURL(state.lastCoverUrl) }catch(e){}
  try{ if(state.extAudioUrl) URL.revokeObjectURL(state.extAudioUrl)}catch(e){}
  try{ unloadTracks() }catch(e){}
  try{ unloadASS() }catch(e){}
});

/* ========= Splash++ Boot Manager ========= */
/* なるべく実ステップで前進、足りない分はタイムベースでなめらかに */
(function(){
  const sp = qs('#splash');
  if (!sp) return;

  const fill = qs('#splashFill');
  const step = qs('#splashStep');
  const skip = qs('#splashSkip');

  // 進捗管理
  const Boot = {
    total: 7,   // だいたいのステップ数（後で増やしてもOK）
    done: 0,
    minShowMs: 800,   // 最低表示時間（短すぎるチラつき防止）
    startTs: performance.now(),
    setTotal(n){ this.total = Math.max(1,n) },
    tick(label){
      this.done = Math.min(this.total, this.done+1);
      if (step) step.textContent = label || '初期化中…';
      this.render();
    },
    render(){
      const p = Math.min(100, Math.round((this.done / this.total) * 100));
      if (fill) fill.style.width = p + '%';
    },
    finish(){
      const elapsed = performance.now() - this.startTs;
      const remain = Math.max(0, this.minShowMs - elapsed);
      setTimeout(()=>{
        sp.classList.add('hide');
        setTimeout(()=> sp.remove(), 700);
      }, remain);
    }
  };
  window.OPBoot = Boot;

  // ===== 実際のフック =====
  // 1) DOM は既に構築済み
  Boot.tick('UIを初期化…');

  // 2) 言語/テーマ/保存済み設定の適用あたりで1歩
  try { Boot.tick('設定を適用…'); } catch(e){}

  // 3) EQ UI 構築後（buildEqUI呼び出しの直後あたりでもう1歩）
  queueMicrotask(()=>Boot.tick('EQ を初期化…'));

  // 4) 追加エフェクト初期化（下の init 呼び出し後に進捗）
  const afterFxInit = ()=> Boot.tick('背景エフェクト…');

  // 5) 画像/フォントなどリソース読み込み完了
  window.addEventListener('load', ()=> Boot.tick('リソース読み込み…'));

  // 6) セーフガード: 1.8秒で強制的に完了
  setTimeout(()=>Boot.finish(), 1800);

  // 7) スキップ
  skip?.addEventListener('click', ()=> Boot.finish());

  // 進行中の見た目（なめらかに70%まで）※実ステップが遅い端末用
  let soft = 0, raf;
  const ease = (a,b,t)=> a+(b-a)*t;
  const loop = ()=>{
    raf = requestAnimationFrame(loop);
    // 実ステップが動かないときでも 70% まではゆっくり伸びる
    soft = Math.min(70, soft + 0.35);
    const hard = (Boot.done/Boot.total)*100;
    const p = Math.max(hard, soft);
    if (fill) fill.style.width = Math.min(100, p)+'%';
  };
  raf = requestAnimationFrame(loop);

  // 後で sp.remove() したらループを止める
  const mo = new MutationObserver(()=>{
    if(!document.body.contains(sp)) cancelAnimationFrame(raf);
  });
  mo.observe(document.body, {childList:true,subtree:true});
})();
