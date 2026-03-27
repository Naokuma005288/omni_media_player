/* ========= util & refs ========= */
const qs=(s,r=document)=>r.querySelector(s); const qsa=(s,r=document)=>Array.from(r.querySelectorAll(s));
const $={
  v:qs('#v'),djDeckVideo:qs('#djDeckVideo'),wrap:qs('#playerWrap'),shell:qs('#playerShell'),ambientLight:qs('#ambientLight'),bgArt:qs('#bgArt'),artWrap:qs('#artWrap'),
  headerCanvas:qs('#headerCanvas'),statusCanvas:qs('#statusCanvas'),
  // ★ 追加: FX要素
  fxAurora:qs('#fxAurora'),fxStars:qs('#fxStars'),fxGrid:qs('#fxGrid'),fxBeams:qs('#fxBeams'),fxNebula:qs('#fxNebula'),

  // ★ 追加: ローダー
  loader:qs('#loader'),analysisLoader:qs('#analysisLoader'),analysisLoaderText:qs('#analysisLoaderText'),
  embedError:qs('#embedError'),embedErrorTitle:qs('#embedErrorTitle'),embedErrorText:qs('#embedErrorText'),embedErrorHint:qs('#embedErrorHint'),embedErrorAction:qs('#embedErrorAction'),embedErrorClose:qs('#embedErrorClose'),

  seek:qs('#seek'),seekProg:qs('#seekProg'),seekThumb:qs('#seekThumb'),seekPrev:qs('#seekPrev'),seekImg:qs('#seekImg'),seekTime:qs('#seekTime'),
  toasts:qs('#toasts'),url:qs('#url'),openUrl:qs('#openUrl'),file:qs('#fileInput'),
  fileMeta:qs('#fileMeta'),
  srt:qs('#srtInput'),aud:qs('#audInput'),unloadSub:qs('#btnUnloadSub'),unloadAud:qs('#btnUnloadAud'),driftMode:qs('#driftMode'),
  srtMeta:qs('#srtMeta'),audMeta:qs('#audMeta'),
  subSize:qs('#subSize'),subOutline:qs('#subOutline'),subMargin:qs('#subMargin'),subPreset:qs('#subPreset'),
  appAspect:qs('#appAspect'),
  djTransitionHud:qs('#djTransitionHud'),djTransitionPhase:qs('#djTransitionPhase'),djTransitionModeHud:qs('#djTransitionModeHud'),
  djTransitionCurrentTitle:qs('#djTransitionCurrentTitle'),djTransitionNextTitle:qs('#djTransitionNextTitle'),
  djTransitionMetaHud:qs('#djTransitionMetaHud'),djTransitionNoteHud:qs('#djTransitionNoteHud'),djTransitionBar:qs('#djTransitionBar'),
  vol:qs('#vol'),rate:qs('#rate'),master:qs('#master'),mixKey:qs('#mixKey'),
  volRead:qs('#volRead'),rateRead:qs('#rateRead'),masterRead:qs('#masterRead'),mixKeyRead:qs('#mixKeyRead'),
  play:qs('#play'),back10:qs('#back10'),fwd10:qs('#fwd10'),pip:qs('#pip'), fullscreen:qs('#fullscreen'),
  setA:qs('#setA'),setB:qs('#setB'),clearAB:qs('#clearAB'),abDisp:qs('#abDisp'),toggleABLoop:qs('#toggleABLoop'),abLoopStat:qs('#abLoopStat'),
  playlist:qs('#playlist'),btnClear:qs('#btnClear'),btnShuffle:qs('#btnShuffle'),dropMode:qs('#dropMode'),contPlay:qs('#contPlay'),
  helpBtn:qs('#btnHelp'),help:qs('#kbdHelp'),
  ratioAlert:qs('#ratioAlert'),ratioAlertClose:qs('#ratioAlertClose'),ratioAlertNever:qs('#ratioAlertNever'),
  deviceGuard:qs('#deviceGuard'),
  installPwa:qs('#btnInstallPwa'),pwaBadge:qs('#pwaBadge'),
  saveList:qs('#saveList'),loadList:qs('#loadList'),clearList:qs('#clearList'),
  themeSelect:qs('#themeSelect'), langSelect:qs('#langSelect'),
  assLayer:qs('#assLayer'), spectrum:qs('#spectrum'),
  fontInput:qs('#fontInput'), fontMeta:qs('#fontMeta'), btnClearFonts:qs('#btnClearFonts'),
  audioInfo:qs('#audioInfo'), audioCover:qs('#audioCover'), audioTitle:qs('#audioTitle'), audioSub:qs('#audioSub'),
  settings:qs('#settings'), btnSettings:qs('#btnSettings'), btnSettingsClose:qs('#btnSettingsClose'), btnSettingsCloseTop:qs('#btnSettingsCloseTop'),
  portraitSettingsDock:qs('#portraitSettingsDock'), portraitControlsSection:qs('#portraitControlsSection'),
  specMode:qs('#specMode'), specOverlay:qs('#specOverlay'), specSens:qs('#specSens'), specBins:qs('#specBins'),
  bpmRead:qs('#bpmRead'), bpmDock:qs('#bpmDock'), keyRead:qs('#keyRead'), beatSync:qs('#beatSync'), autoDj:qs('#autoDj'), metroEnable:qs('#metroEnable'), metroVolume:qs('#metroVolume'), metroRead:qs('#metroRead'), metroSubdivision:qs('#metroSubdivision'), metroVisual:qs('#metroVisual'), djTransition:qs('#djTransition'), djTransitionRead:qs('#djTransitionRead'), djStatus:qs('#djStatus'), djMode:qs('#djMode'), djCandidateWindow:qs('#djCandidateWindow'), djCandidateRead:qs('#djCandidateRead'), djRepeatGuard:qs('#djRepeatGuard'), djNextMode:qs('#djNextMode'), djNextTitle:qs('#djNextTitle'), djNextMeta:qs('#djNextMeta'), djNextReason:qs('#djNextReason'), djNextLock:qs('#djNextLock'), djNextReroll:qs('#djNextReroll'), djNextClear:qs('#djNextClear'),
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
function debugLog(stage, detail=''){}
const fmt=s=>{if(s==null||isNaN(s))return '-';const sec=Math.floor(s%60).toString().padStart(2,'0');const m=Math.floor(s/60);return `${m}:${sec}`};
function pct(v){ return `${Math.round((+v||0)*100)}%` }
function roundBpmValue(bpm, digits=1){
  const value=+bpm||0;
  if(!Number.isFinite(value) || value<=0) return 0;
  const precision=Math.max(0, digits|0);
  const scale=10**precision;
  return Math.round(value*scale)/scale;
}
function formatBpmValue(bpm, digits=1){
  const rounded=roundBpmValue(bpm, digits);
  if(!rounded) return '--';
  const precision=Math.max(0, digits|0);
  const scale=10**precision;
  return Math.abs(rounded-Math.round(rounded)) < (0.5/scale)
    ? String(Math.round(rounded))
    : rounded.toFixed(precision);
}
const OPPlayback = window.OmniPlaybackCore || {};
const OPPlatform = OPPlayback.detectPlatform ? OPPlayback.detectPlatform() : {
  isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent || ''),
  isStandalonePwa: window.matchMedia?.('(display-mode: standalone)')?.matches || window.navigator.standalone === true || document.referrer.startsWith?.('android-app://')
};
function isStandalonePwa(){
  return !!OPPlatform.isStandalonePwa;
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
function srcLooksLikeVideo(src=''){
  return /\.(mp4|m4v|mov|webm|mkv|avi|wmv|ogv)(\?|$)/i.test(String(src));
}
function itemLooksLikeVideoMedia(item){
  if(!item) return false;
  if(item.file) return fileLooksLikeVideo(item.file);
  const url = String(item.url || '');
  if(!url) return false;
  if(/\.m3u8($|\?)/i.test(url) || /\.mpd($|\?)/i.test(url)) return true;
  if(srcLooksLikeAudio(url)) return false;
  return srcLooksLikeVideo(url);
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
function currentManualKeyShift(){
  return clampValue(Math.round(+(($.mixKey?.value)||0)), -6, 6);
}
function currentManualKeyRate(){
  return semitoneToRate(currentManualKeyShift());
}
function currentDeckRate(){
  const baseRate=clampValue(+($.rate?.value || 1), 0.25, 2);
  return clampValue(baseRate * currentManualKeyRate(), 0.25, 2);
}
function currentMediaAllowsDjTempoMatch(){
  if(state.mediaKind!=='html5' || state.usingYouTube || state.usingIframe) return false;
  const currentItem=state.list[state.cur];
  if(currentItem) return !itemLooksLikeVideoMedia(currentItem);
  return currentHtml5IsAudio();
}
function currentMainPlaybackRate(){
  const baseRate=(state.mediaKind==='youtube')
    ? clampValue(+($.rate?.value || 1), 0.25, 2)
    : currentDeckRate();
  return clampValue(baseRate * (currentMediaAllowsDjTempoMatch() ? (state.dj.rateMul || 1) : 1), 0.25, 2);
}
function getDjVirtualCurrentBpm(){
  const currentBpm=getCurrentTrackBpm();
  return currentBpm ? roundBpmValue(currentBpm*(state.dj.rateMul || 1), 2) : 0;
}
function getDjRateStatusText(){
  if(!currentMediaAllowsDjTempoMatch()){
    const virtualBpm=getDjVirtualCurrentBpm();
    if(virtualBpm) return `${formatBpmValue(virtualBpm, 1)} BPM`;
  }
  return `${Math.round((state.dj.rateMul||1)*100)}%`;
}
function describeManualKeyShift(){
  const shift=currentManualKeyShift();
  const baseKey=parseTrackKey(getCurrentTrackKey());
  if(baseKey){
    const shifted=formatTrackKey(baseKey.pc + shift, baseKey.mode);
    return shift ? `${shifted} · ${shift>0?'+':''}${shift}st` : shifted;
  }
  return shift ? `${shift>0?'+':''}${shift}st` : '0st';
}
function updateMixKeyReadout(){
  if($.mixKeyRead){
    $.mixKeyRead.textContent=describeManualKeyShift();
  }
}
function updateMetronomeReadout(){
  if(!$.metroRead) return;
  if(!state.metronome.enabled){
    $.metroRead.textContent='OFF';
    return;
  }
  const bpm=getCurrentTrackMeterBpm() || getCurrentTrackBpm();
  if(!bpm){
    $.metroRead.textContent='WAIT';
    return;
  }
  $.metroRead.textContent=`${mediaPaused() ? 'READY' : 'ON'} ${formatBpmValue(bpm, 1)} · ${getMetronomeSubdivisionLabel()}`;
}
function getItemDisplayTitle(item){
  if(!item) return '--';
  const raw=String(item.title || item.file?.name || item.url || 'Item');
  return raw.replace(/\.[^/.?#]+(?=$|[?#])/, '') || raw;
}
function getDjPhaseBadgeLabel(phase=state.dj.phase, syncPlan=state.dj.syncPlan){
  const p=String(phase||'idle');
  if(p==='prepare') return 'PREP';
  if(p==='armed') return 'ARM';
  if(p==='mix') return syncPlan?.statusLabel || 'MIX';
  if(p==='handoff') return 'HANDOFF';
  if(p==='settle') return 'LOCK';
  if(p==='carry') return 'CARRY';
  if(p==='scan') return 'SCAN';
  return 'READY';
}
function resetDjTransitionTelemetry(){
  state.dj.mixProgress=0;
  state.dj.visualProgress=0;
  state.dj.handoffRetries=0;
  state.dj.handoffDelta=0;
  state.dj.handoffNote='';
  state.dj.handoffStage='';
}
function getDjEffectiveTransitionSec(baseTransition=state.dj.transitionSec, syncPlan=state.dj.syncPlan){
  const base=clampValue(+baseTransition || state.dj.transitionSec || 12, 6, 20);
  if(!syncPlan) return base;
  const overlapBars=clampValue(+syncPlan.overlapBars || Math.min(+syncPlan.introBars || 0, +syncPlan.outroBars || 0), 0, 4);
  const energyGap=clampValue(+syncPlan.energyGap || 0, 0, 1);
  const meterBpm=+syncPlan.currentMeterBpm || +syncPlan.nextMeterBpm || state.dj.currentBpm || 0;
  const barSec=meterBeatPeriodSec(meterBpm)*DJ_BEATS_PER_BAR;
  let effective=base;
  if(barSec){
    effective += Math.min(barSec*overlapBars*0.32, 3.2);
    if((+syncPlan.introBars || 0) >= 6) effective += Math.min(barSec*0.55, 1.8);
  }
  effective += base*clampValue((energyGap-0.24)/0.8, -0.12, 0.18);
  if((+syncPlan.introBars || 0) <= 1 && (+syncPlan.outroBars || 0) <= 1 && energyGap < 0.24){
    effective -= 0.8;
  }
  return clampValue(Math.round(effective*10)/10, 6, 20);
}
function getDjTransitionWindowProgress(){
  const dur=mediaDuration();
  const transition=Math.max(0.01, getDjEffectiveTransitionSec(state.dj.transitionSec, state.dj.syncPlan)||0);
  if(!Number.isFinite(dur) || dur<=0 || transition<=0) return 0;
  return clampValue(1-((dur-mediaCurrent())/transition), 0, 1);
}
function getDjTransitionOverlayState(){
  const syncPlan=state.dj.syncPlan;
  const phase=state.dj.handoffPending ? (state.dj.handoffStage || 'handoff') : (state.dj.phase || 'idle');
  const show=!!(
    state.dj.enabled &&
    (
      state.dj.handoffPending ||
      state.dj.active ||
      phase==='prepare' ||
      phase==='armed' ||
      phase==='carry' ||
      phase==='settle'
    )
  );
  if(!show){
    return { show:false, phase:'idle', phaseLabel:'READY', modeText:'AUTO DJ', currentTitle:'--', nextTitle:'--', meta:'', note:'', progress:0 };
  }
  const currentItem=state.list[state.cur] || null;
  const currentTitle=getItemDisplayTitle(currentItem);
  const preview=state.dj.enabled ? getDjPreviewState() : null;
  const nextIndex=(state.dj.nextIndex>=0 ? state.dj.nextIndex : preview?.index ?? -1);
  const nextItem=nextIndex>=0 ? state.list[nextIndex] : null;
  const nextTitle=getItemDisplayTitle(nextItem);
  const progress=phase==='carry'
    ? clampValue(1-((Math.max(0, state.dj.carryUntil-performance.now()))/5200), 0, 1)
    : (state.dj.handoffPending ? 1 : clampValue(state.dj.mixProgress || getDjTransitionWindowProgress(), 0, 1));
  const metaParts=[];
  if(state.dj.currentBpm && state.dj.nextBpm){
    metaParts.push(`${formatBpmValue(state.dj.currentBpm, 1)} → ${formatBpmValue(state.dj.nextBpm, 1)} BPM`);
  }else if(preview?.entry?.candidateBpm){
    metaParts.push(`NEXT ${formatBpmValue(preview.entry.candidateBpm, 1)} BPM`);
  }
  if(syncPlan?.effectiveTransitionSec) metaParts.push(`Fade ${syncPlan.effectiveTransitionSec.toFixed(1)}s`);
  if(syncPlan?.outroBars || syncPlan?.introBars) metaParts.push(`Bars ${Math.round(syncPlan.outroBars || 0)}→${Math.round(syncPlan.introBars || 0)}`);
  if(Number.isFinite(syncPlan?.energyGap)) metaParts.push(`Energy ${Math.round((1-clampValue(syncPlan.energyGap, 0, 1))*100)}%`);
  if(syncPlan?.analysisConfidence>0) metaParts.push(`Conf ${Math.round(syncPlan.analysisConfidence*100)}%`);
  if(syncPlan?.profileId) metaParts.push(syncPlan.profileId.toUpperCase());
  if(state.dj.handoffPending && Number.isFinite(state.dj.handoffDelta) && state.dj.handoffDelta>0){
    metaParts.push(`Δ ${state.dj.handoffDelta.toFixed(2)}s`);
  }
  if(state.dj.handoffRetries>0) metaParts.push(`Retry ${state.dj.handoffRetries}`);
  const note=state.dj.handoffNote || (
    phase==='prepare' ? '次の deck を先読みしています。' :
    phase==='armed' ? '小節境界を待って起動します。' :
    phase==='mix' ? 'クロスフェードと映像遷移を同期中です。' :
    phase==='settle' ? '本体へ追従した位置を確認しています。' :
    phase==='carry' ? 'handoff 後の基準を整えています。' :
    phase==='handoff' ? 'deck から本体へ映像と音声を引き継いでいます。' :
    'Auto DJ が次曲を準備中です。'
  );
  return {
    show:true,
    phase,
    phaseLabel:getDjPhaseBadgeLabel(phase, syncPlan),
    modeText:`AUTO DJ · ${getDjModeLabel()}`,
    currentTitle,
    nextTitle,
    meta:metaParts.join(' · ') || 'Auto DJ standby',
    note,
    progress
  };
}
function updateDjTransitionOverlay(){
  if(!$.djTransitionHud) return;
  const view=getDjTransitionOverlayState();
  if($.wrap){
    $.wrap.dataset.djPhase=view.show ? view.phase : 'idle';
    const visualProgress=clampValue(state.dj.visualProgress || state.dj.mixProgress || 0, 0, 1);
    const handoffBoost=view.phase==='handoff' ? 1 : (view.phase==='settle' ? 0.42 : 0);
    $.wrap.style.setProperty('--dj-mix-progress', visualProgress.toFixed(3));
    $.wrap.style.setProperty('--dj-handoff-boost', handoffBoost.toFixed(3));
  }
  $.djTransitionHud.hidden=!view.show;
  $.djTransitionHud.classList.toggle('show', !!view.show);
  if(!view.show) return;
  if($.djTransitionPhase) $.djTransitionPhase.textContent=view.phaseLabel;
  if($.djTransitionModeHud) $.djTransitionModeHud.textContent=view.modeText;
  if($.djTransitionCurrentTitle) $.djTransitionCurrentTitle.textContent=view.currentTitle;
  if($.djTransitionNextTitle) $.djTransitionNextTitle.textContent=view.nextTitle;
  if($.djTransitionMetaHud) $.djTransitionMetaHud.textContent=view.meta;
  if($.djTransitionNoteHud) $.djTransitionNoteHud.textContent=view.note;
  if($.djTransitionBar) $.djTransitionBar.style.width=`${Math.round(clampValue(view.progress, 0, 1)*1000)/10}%`;
}
function setDjPhase(nextPhase='idle'){
  const phase=String(nextPhase||'idle');
  if(state.dj.phase===phase){
    updateDjTransitionOverlay();
    return;
  }
  state.dj.phase=phase;
  state.dj.phaseStartedAt=performance.now();
  updateDjReadouts();
}
function updateSliderReadouts(){
  if($.volRead) $.volRead.textContent = pct($.vol?.value);
  if($.rateRead) $.rateRead.textContent = pct($.rate?.value);
  if($.masterRead) $.masterRead.textContent = pct($.master?.value);
  updateMixKeyReadout();
}
const APP_ASPECTS = {
  '16:9': { n:16/9, ratio:'16 / 9', layout:'standard' },
  '21:9': { n:21/9, ratio:'21 / 9', layout:'wide' },
  '4:3':  { n:4/3,  ratio:'4 / 3',  layout:'classic' },
  '9:16': { n:9/16, ratio:'9 / 16', layout:'portrait' }
};
const responsiveMql = {
  portrait: window.matchMedia ? window.matchMedia('(orientation: portrait)') : null,
  compact: window.matchMedia ? window.matchMedia('(max-width: 960px)') : null,
  tablet: window.matchMedia ? window.matchMedia('(max-width: 1200px)') : null,
  phone: window.matchMedia ? window.matchMedia('(max-width: 720px)') : null,
  wide: window.matchMedia ? window.matchMedia('(min-width: 1500px)') : null
};
function mqMatches(mql, fallback){
  return mql ? !!mql.matches : fallback;
}
function applyResponsiveUiState(){
  const portrait = mqMatches(responsiveMql.portrait, window.innerHeight >= window.innerWidth);
  const compact = mqMatches(responsiveMql.compact, window.innerWidth <= 960);
  const tablet = mqMatches(responsiveMql.tablet, window.innerWidth <= 1200);
  const phone = mqMatches(responsiveMql.phone, window.innerWidth <= 720);
  const wide = mqMatches(responsiveMql.wide, window.innerWidth >= 1500);
  let bp = 'desktop';
  if(phone) bp = 'phone';
  else if(compact) bp = 'compact';
  else if(tablet) bp = 'tablet';
  else if(wide) bp = 'wide';
  document.body.classList.toggle('app-orient-portrait', portrait);
  document.body.classList.toggle('app-orient-landscape', !portrait);
  document.body.classList.toggle('app-bp-phone', phone);
  document.body.classList.toggle('app-bp-compact', compact);
  document.body.classList.toggle('app-bp-tablet', !compact && tablet);
  document.body.classList.toggle('app-bp-wide', wide);
  document.body.classList.toggle('app-bp-desktop', !phone && !compact && !tablet && !wide);
  document.body.dataset.viewportBp = bp;
  document.body.dataset.viewportOrientation = portrait ? 'portrait' : 'landscape';
}
const clampValue=(n,min,max)=>Math.max(min,Math.min(max,n));
const DJ_BEATS_PER_BAR=4;
const DJ_MIX_PROFILE_PRESETS={
  balanced:{
    id:'balanced', statusLabel:'BAL',
    nextDelay:0.08, nextSpan:0.82, nextPower:1.02, nextFloor:0.02,
    currentDelay:0, currentSpan:0.92, currentPower:1,
    mixDelay:0.03, mixSpan:0.84,
    visualDelay:0.12, visualSpan:0.72,
    primeAtProgress:0.14, launchAtProgress:0.28
  },
  smooth:{
    id:'smooth', statusLabel:'SMOOTH',
    nextDelay:0.11, nextSpan:0.82, nextPower:1.12, nextFloor:0.02,
    currentDelay:0, currentSpan:0.96, currentPower:1.18,
    mixDelay:0.05, mixSpan:0.88,
    visualDelay:0.17, visualSpan:0.7,
    primeAtProgress:0.12, launchAtProgress:0.25
  },
  late:{
    id:'late', statusLabel:'LATE',
    nextDelay:0.18, nextSpan:0.68, nextPower:1.22, nextFloor:0.01,
    currentDelay:0, currentSpan:1, currentPower:1.24,
    mixDelay:0.1, mixSpan:0.72,
    visualDelay:0.25, visualSpan:0.58,
    primeAtProgress:0.1, launchAtProgress:0.34
  },
  tight:{
    id:'tight', statusLabel:'TIGHT',
    nextDelay:0.04, nextSpan:0.74, nextPower:0.92, nextFloor:0.04,
    currentDelay:0, currentSpan:0.78, currentPower:0.88,
    mixDelay:0.02, mixSpan:0.76,
    visualDelay:0.08, visualSpan:0.68,
    primeAtProgress:0.16, launchAtProgress:0.22
  },
  videoSafe:{
    id:'videoSafe', statusLabel:'VIDEO',
    nextDelay:0.12, nextSpan:0.78, nextPower:1.08, nextFloor:0.01,
    currentDelay:0, currentSpan:0.98, currentPower:1.12,
    mixDelay:0.06, mixSpan:0.84,
    visualDelay:0.28, visualSpan:0.56,
    primeAtProgress:0.1, launchAtProgress:0.3
  }
};
const DJ_MODE_LABELS={
  auto:'自動',
  smooth:'なめらか',
  late:'遅め',
  tight:'タイト',
  videoSafe:'動画優先'
};
function foldBpm(bpm){
  let v=+bpm||0;
  if(!Number.isFinite(v) || v<=0) return 0;
  while(v<72) v*=2;
  while(v>180) v/=2;
  return Math.round(v*10)/10;
}
function normalizeBpmRange(bpm, min=45, max=210){
  let v=+bpm||0;
  if(!Number.isFinite(v) || v<=0) return 0;
  while(v<min) v*=2;
  while(v>max) v/=2;
  return Math.round(v*10)/10;
}
function bucketBpm(bpm){
  const value=+bpm||0;
  if(!Number.isFinite(value) || value<=0) return 0;
  return Math.round(value*10)/10;
}
function addBpmVote(votes, bpm, weight){
  const bucket=bucketBpm(bpm);
  if(!bucket || !Number.isFinite(weight) || weight<=0) return;
  votes.set(bucket, (votes.get(bucket)||0) + weight);
}
function refineBpmFromVotes(votes, seed, radius=1.2){
  const center=bucketBpm(seed);
  if(!center || !votes?.size) return center;
  let total=0;
  let weighted=0;
  votes.forEach((score, value)=>{
    const bpm=+value||0;
    if(!bpm || Math.abs(bpm-center)>radius) return;
    total += score;
    weighted += bpm*score;
  });
  return total>0 ? bucketBpm(weighted/total) : center;
}
function collectMeterBpmCandidates(base){
  const candidateSet=new Set();
  const pushBand=(center, offsets)=>{
    offsets.forEach(offset=>{
      const candidate=bucketBpm(center+offset);
      if(candidate>=45 && candidate<=210) candidateSet.add(candidate);
    });
  };
  pushBand(base, [0, -0.6, -0.3, 0.3, 0.6]);
  if(base>=96) pushBand(base/2, [0, -0.4, 0.4]);
  if(base<=104) pushBand(base*2, [0, -0.6, 0.6]);
  return [...candidateSet];
}
function findClosestBpmEntry(entries, target){
  if(!entries?.length || !target) return null;
  let best=null;
  let bestDist=Infinity;
  for(const entry of entries){
    const dist=Math.abs((+entry?.bpm || 0)-target);
    if(dist<bestDist){
      best=entry;
      bestDist=dist;
    }
  }
  return best;
}
function meterBeatPeriodSec(bpm){
  const normalized=normalizeBpmRange(bpm, 45, 210);
  return normalized ? (60/normalized) : 0;
}
function beatPeriodSec(bpm){
  const folded=foldBpm(bpm);
  return folded ? (60/folded) : 0;
}
function beatPhaseAtTime(timeSec, bpm, anchorSec=0){
  const period=beatPeriodSec(bpm);
  if(!period) return 0;
  const pos=(((((+timeSec || 0) - (+anchorSec || 0)) % period) + period) % period);
  return pos/period;
}
function beatDistanceToBoundarySec(timeSec, bpm, anchorSec=0){
  const period=beatPeriodSec(bpm);
  if(!period) return Infinity;
  const pos=(((((+timeSec || 0) - (+anchorSec || 0)) % period) + period) % period);
  return Math.min(pos, period-pos);
}
function barPhaseAtTime(timeSec, bpm, anchorSec=0, beatsPerBar=DJ_BEATS_PER_BAR){
  const period=beatPeriodSec(bpm);
  const beats=Math.max(1, +beatsPerBar || DJ_BEATS_PER_BAR);
  if(!period) return 0;
  const barPeriod=period*beats;
  const pos=(((((+timeSec || 0) - (+anchorSec || 0)) % barPeriod) + barPeriod) % barPeriod);
  return pos/barPeriod;
}
function barDistanceToBoundarySec(timeSec, bpm, anchorSec=0, beatsPerBar=DJ_BEATS_PER_BAR){
  const period=beatPeriodSec(bpm);
  const beats=Math.max(1, +beatsPerBar || DJ_BEATS_PER_BAR);
  if(!period) return Infinity;
  const barPeriod=period*beats;
  const pos=(((((+timeSec || 0) - (+anchorSec || 0)) % barPeriod) + barPeriod) % barPeriod);
  return Math.min(pos, barPeriod-pos);
}
function shouldLaunchDjDeckOnBeat(currentTimeSec, currentBpm, leftSec, progress, currentItem=null, syncPlan=null){
  if(!state.bpm.beatSync) return true;
  const period=beatPeriodSec(currentBpm);
  if(!period) return true;
  const anchorSec=getItemBeatAnchorSec(currentItem);
  const beatWindow=clampValue(period*0.12, 0.028, 0.085);
  const barPeriod=period*DJ_BEATS_PER_BAR;
  const preferPhraseBars=(+syncPlan?.introBars || 0) >= 2 || (+syncPlan?.outroBars || 0) >= 2;
  const barWindow=clampValue(barPeriod*(preferPhraseBars ? 0.09 : 0.08), 0.075, 0.24);
  const hardEmergencySec=Math.max(period*1.15, 0.55);
  if(progress>=0.94 || leftSec<=hardEmergencySec) return true;
  if(barDistanceToBoundarySec(currentTimeSec, currentBpm, anchorSec) <= barWindow) return true;
  const softEmergencySec=Math.max(barPeriod*(preferPhraseBars ? 0.92 : 1.05), preferPhraseBars ? 2.1 : 1.6);
  if(progress>=(preferPhraseBars ? 0.88 : 0.82) || leftSec<=softEmergencySec){
    return beatDistanceToBoundarySec(currentTimeSec, currentBpm, anchorSec) <= Math.max(beatWindow, barWindow*0.34);
  }
  return false;
}
function getDjDeckStartOffset(currentTimeSec, currentBpm, nextBpm, nextItem=null, currentItem=null, syncPlan=null){
  const cueBase=getItemDjCueIn(nextItem);
  if(!state.bpm.beatSync) return cueBase;
  const nextPeriod=beatPeriodSec(nextBpm);
  if(!nextPeriod) return cueBase;
  const currentAnchor=getItemBeatAnchorSec(currentItem);
  const nextAnchor=getItemBeatAnchorSec(nextItem);
  const barPhase=barPhaseAtTime(currentTimeSec, currentBpm, currentAnchor);
  const normalized=barPhase>=0.985 ? 0 : barPhase;
  const barPeriod=nextPeriod*DJ_BEATS_PER_BAR;
  let alignedStart=Math.max(0, nextAnchor + normalized*barPeriod);
  while(alignedStart + 0.0001 < cueBase) alignedStart += barPeriod;
  const additional=Math.max(0, alignedStart-cueBase);
  const introBars=Math.max(1, Math.round(syncPlan?.introBars || getItemDjIntroBars(nextItem) || 1));
  const maxAdditional=itemLooksLikeVideoMedia(nextItem)
    ? Math.min(barPeriod*0.92, 2.2)
    : Math.min(barPeriod*Math.min(4, introBars)*0.98, 8);
  return cueBase + Math.min(additional, maxAdditional);
}
function getDjRateEase(progress){
  const p=clampValue(progress, 0, 1);
  if(state.bpm.beatSync){
    return 1 - Math.pow(1-p, 2.35);
  }
  return p*p*(3-2*p);
}
function smoothstep01(value){
  const v=clampValue(value, 0, 1);
  return v*v*(3-(2*v));
}
function getItemDjCueIn(item){
  const cue=+item?._djCueIn || 0;
  const confidence=+item?._djCueInConfidence || 0;
  if(!Number.isFinite(cue) || cue<=0.12) return 0;
  const maxCue=itemLooksLikeVideoMedia(item) ? 1.4 : 8;
  if(cue>maxCue) return 0;
  if(confidence<0.26 && cue>1.2) return 0;
  return clampValue(cue, 0, maxCue);
}
function getItemMeterBpm(item){
  const meter=roundBpmValue(+item?._meterBpm || 0, 2);
  if(meter) return meter;
  return roundBpmValue(+item?._bpm || 0, 2) || 0;
}
function getItemBeatAnchorSec(item){
  const meterBpm=getItemMeterBpm(item);
  const rawAnchor=+item?._beatAnchorSec;
  const confidence=+item?._beatAnchorConfidence || 0;
  const period=meterBeatPeriodSec(meterBpm);
  if(period && Number.isFinite(rawAnchor) && rawAnchor>=0 && confidence>=0.18){
    return rawAnchor;
  }
  return getItemDjCueIn(item);
}
function dbToGain(db){
  return Math.pow(10, (+db||0)/20);
}
function gainToDb(gain){
  return 20*Math.log10(Math.max(1e-5, +gain || 1));
}
function getItemDjLoudness(item){
  const loudness=+item?._djLoudness;
  return Number.isFinite(loudness) && loudness < 0 ? loudness : null;
}
function getItemDjMixConfidence(item){
  const confidence=+item?._djMixConfidence;
  return Number.isFinite(confidence) ? clampValue(confidence, 0, 1) : 0;
}
function getItemDjQuietness(item, edge='head'){
  const bodyDb=+item?._djBodyDb;
  const edgeDb=edge==='tail' ? +item?._djTailDb : +item?._djHeadDb;
  if(!Number.isFinite(bodyDb) || !Number.isFinite(edgeDb) || bodyDb>=0 || edgeDb>=0) return 0;
  return clampValue((bodyDb-edgeDb)/12, 0, 1);
}
function getItemDjIntroBars(item){
  const bars=+item?._djIntroBars;
  if(Number.isFinite(bars) && bars>=0) return clampValue(Math.round(bars), 0, 16);
  return clampValue(Math.round(getItemDjQuietness(item, 'head')*8), 0, 16);
}
function getItemDjOutroBars(item){
  const bars=+item?._djOutroBars;
  if(Number.isFinite(bars) && bars>=0) return clampValue(Math.round(bars), 0, 16);
  return clampValue(Math.round(getItemDjQuietness(item, 'tail')*8), 0, 16);
}
function getItemDjEntryEnergy(item){
  const energy=+item?._djEntryEnergy;
  if(Number.isFinite(energy)) return clampValue(energy, 0, 1);
  return clampValue(1-(getItemDjQuietness(item, 'head')*0.9), 0, 1);
}
function getItemDjExitEnergy(item){
  const energy=+item?._djExitEnergy;
  if(Number.isFinite(energy)) return clampValue(energy, 0, 1);
  return clampValue(1-(getItemDjQuietness(item, 'tail')*0.9), 0, 1);
}
function getItemDjPhraseConfidence(item){
  const confidence=+item?._djPhraseConfidence;
  if(Number.isFinite(confidence)) return clampValue(confidence, 0, 1);
  return clampValue(getItemDjMixConfidence(item)*0.72, 0, 1);
}
function getDjPhraseTransitionMetrics(currentItem, nextItem){
  const introBars=getItemDjIntroBars(nextItem);
  const outroBars=getItemDjOutroBars(currentItem);
  const entryEnergy=getItemDjEntryEnergy(nextItem);
  const exitEnergy=getItemDjExitEnergy(currentItem);
  const energyGap=Math.abs(exitEnergy-entryEnergy);
  const roomScore=clampValue((introBars+outroBars)/8, 0, 1);
  const barMatchScore=clampValue(1-(Math.abs(outroBars-introBars)/6), 0, 1);
  const energyScore=clampValue(1-(energyGap/0.72), 0, 1);
  const confidence=Math.min(getItemDjPhraseConfidence(currentItem), getItemDjPhraseConfidence(nextItem));
  return {
    introBars,
    outroBars,
    entryEnergy,
    exitEnergy,
    energyGap,
    roomScore,
    barMatchScore,
    energyScore,
    confidence,
    score:(roomScore*0.34) + (barMatchScore*0.28) + (energyScore*0.38)
  };
}
function getDjProfilePreset(id){
  return DJ_MIX_PROFILE_PRESETS[id] || DJ_MIX_PROFILE_PRESETS.balanced;
}
function getDjModeLabel(mode=state.dj.modePref){
  return DJ_MODE_LABELS[mode] || DJ_MODE_LABELS.auto;
}
function forwardPlaylistDistance(fromIndex, toIndex, total=state.list.length){
  const count=Math.max(0, total|0);
  if(count<=1) return 0;
  const from=((+fromIndex||0)%count+count)%count;
  const to=((+toIndex||0)%count+count)%count;
  return (to-from+count)%count;
}
function getDjCandidateIndices(fromIndex=state.cur, windowSize=state.dj.candidateWindow){
  const total=state.list.length||0;
  if(total<2 || fromIndex<0) return [];
  const limit=Math.max(1, Math.min(total-1, windowSize|0 || state.dj.candidateWindow || 5));
  const out=[];
  for(let step=1; step<=limit; step++){
    out.push((fromIndex+step)%total);
  }
  return out;
}
function getDjManualNextIndex(currentIndex=state.cur){
  const item=state.dj.manualNextItem;
  if(!item) return -1;
  const index=state.list.indexOf(item);
  if(index<0 || index===currentIndex){
    state.dj.manualNextItem=null;
    state.dj.manualNextSource='';
    return -1;
  }
  return index;
}
function getDjRerollSkipIndices(currentIndex=state.cur){
  const sourceItem=state.list[currentIndex];
  if(!sourceItem || state.dj.rerollSourceItem!==sourceItem){
    state.dj.rerollSourceItem=null;
    state.dj.rerollSkipItems.length=0;
    return [];
  }
  const indices=state.dj.rerollSkipItems
    .map(item=>state.list.indexOf(item))
    .filter(index=>index>=0 && index!==currentIndex);
  state.dj.rerollSkipItems=indices.map(index=>state.list[index]);
  return indices;
}
function clearDjNextOverrides(opts={}){
  const keepReroll=!!opts.keepReroll;
  state.dj.manualNextItem=null;
  state.dj.manualNextSource='';
  if(!keepReroll){
    state.dj.rerollSourceItem=null;
    state.dj.rerollSkipItems.length=0;
  }
}
function canAdjustDjNextCandidate(){
  return !state.dj.deck?.started && !state.dj.handoffPending && state.dj.phase!=='handoff';
}
function setDjManualNextIndex(index, source='manual'){
  if(index<0 || index>=state.list.length || index===state.cur) return false;
  if(!canAdjustDjNextCandidate()){
    toast('現在のミックス中は次曲を固定できません','warn',2600);
    return false;
  }
  state.dj.manualNextItem=state.list[index];
  state.dj.manualNextSource=String(source||'manual');
  state.dj.rerollSourceItem=state.list[state.cur] || null;
  state.dj.rerollSkipItems.length=0;
  state.dj.nextIndex=-1;
  state.dj.syncPlan=null;
  if(!state.dj.deck?.started) cleanupDjDeck();
  const nextItem=state.list[index];
  if(nextItem && !nextItem._analysisDone && !nextItem._bpmPromise){
    scheduleItemAnalysis(nextItem, 60, { priority:3 });
  }
  updateDjReadouts();
  renderPlaylist();
  return true;
}
function getDjAdvanceIndex(){
  if(
    state.dj.enabled &&
    state.dj.nextIndex>=0 &&
    state.dj.nextIndex!==state.cur &&
    (state.dj.deck?.started || state.dj.handoffPending)
  ) return state.dj.nextIndex;
  const manualIndex=getDjManualNextIndex();
  if(state.dj.enabled && manualIndex>=0){
    return manualIndex;
  }
  if(state.dj.enabled && state.cur>=0 && state.list.length>1){
    return chooseAutoDjNextIndex(state.cur);
  }
  if(!state.list.length || state.cur<0) return -1;
  const next=(state.cur+1)%state.list.length;
  return next===state.cur ? -1 : next;
}
function scoreDjCandidate(currentIndex, candidateIndex, currentItem, candidateItem, currentBpm){
  if(candidateIndex<0 || candidateIndex===currentIndex || !candidateItem) return null;
  const failedUntil=+candidateItem?._djAutoDjFailedUntil || 0;
  if(failedUntil>Date.now()) return null;
  const distance=forwardPlaylistDistance(currentIndex, candidateIndex, state.list.length);
  const proximityScore=clampValue(1-((Math.max(1, distance)-1)*0.16), 0.18, 1);
  const sameVisualClass=itemLooksLikeVideoMedia(currentItem)===itemLooksLikeVideoMedia(candidateItem);
  const typeScore=sameVisualClass ? 1 : 0.72;
  const candidateBpm=getTrackBpmInfo(candidateItem).bpm || getTrackMeterBpmInfo(candidateItem).bpm || 0;
  const bpmKnown=!!(currentBpm && candidateBpm);
  const bpmRatio=bpmKnown ? clampValue(candidateBpm/Math.max(1, currentBpm), 0.82, 1.18) : 1;
  const bpmDelta=bpmKnown ? Math.abs(1-bpmRatio) : 0.07;
  const bpmScore=bpmKnown ? clampValue(1-(bpmDelta/0.14), 0, 1) : 0.34;
  const currentLoudness=getItemDjLoudness(currentItem);
  const nextLoudness=getItemDjLoudness(candidateItem);
  const loudnessScore=(currentLoudness!=null && nextLoudness!=null)
    ? clampValue(1-(Math.abs(currentLoudness-nextLoudness)/6), 0.1, 1)
    : 0.55;
  const introQuietness=getItemDjQuietness(candidateItem, 'head');
  const outroQuietness=getItemDjQuietness(currentItem, 'tail');
  const cueIn=getItemDjCueIn(candidateItem);
  const cuePenalty=clampValue(cueIn/(itemLooksLikeVideoMedia(candidateItem) ? 2 : 4), 0, 0.8);
  const cueScore=1-(cuePenalty*0.45);
  const phraseMetrics=getDjPhraseTransitionMetrics(currentItem, candidateItem);
  const analysisConfidence=Math.min(
    Math.max(+currentItem?._bpmConfidence || 0, getItemDjMixConfidence(currentItem)),
    Math.max(+candidateItem?._bpmConfidence || 0, getItemDjMixConfidence(candidateItem))
  );
  const loudnessDeltaDb=(currentLoudness!=null && nextLoudness!=null) ? (currentLoudness-nextLoudness) : 0;
  const recentAgeMs=Date.now() - (+candidateItem?._djLastAutoPickedAt || 0);
  const repeatPenalty=(state.dj.repeatGuard && candidateItem?._djLastAutoPickedAt && recentAgeMs<1800000)
    ? clampValue((1800000-recentAgeMs)/1800000, 0, 1)*0.28
    : 0;
  const score=(
    proximityScore*0.15 +
    typeScore*0.11 +
    bpmScore*0.22 +
    loudnessScore*0.13 +
    outroQuietness*0.06 +
    introQuietness*0.07 +
    phraseMetrics.score*0.16 +
    cueScore*0.03 +
    analysisConfidence*0.07
  ) - repeatPenalty;
  return {
    index:candidateIndex,
    item:candidateItem,
    score,
    distance,
    candidateBpm,
    bpmKnown,
    bpmRatio,
    bpmScore,
    loudnessScore,
    loudnessDeltaDb,
    introQuietness,
    outroQuietness,
    introBars:phraseMetrics.introBars,
    outroBars:phraseMetrics.outroBars,
    entryEnergy:phraseMetrics.entryEnergy,
    exitEnergy:phraseMetrics.exitEnergy,
    energyGap:phraseMetrics.energyGap,
    phraseScore:phraseMetrics.score,
    phraseConfidence:phraseMetrics.confidence,
    analysisConfidence,
    cueIn,
    sameVisualClass,
    isAnalyzed:!!(candidateItem?._bpm && candidateItem?._analysisDone)
  };
}
function markDjCandidatePlaybackFailure(item, cooldownMs=180000){
  if(!item) return;
  item._djAutoDjFailedUntil=Date.now()+Math.max(15000, +cooldownMs || 180000);
}
function getDjCandidatePool(currentIndex=state.cur, opts={}){
  const currentItem=state.list[currentIndex];
  if(!currentItem || state.list.length<2) return { currentItem:null, fallbackIndex:-1, scored:[], analyzed:[], best:null };
  const skipSet=new Set((opts.skipIndices || getDjRerollSkipIndices(currentIndex)).filter(index=>index>=0 && index!==currentIndex));
  const fallbackIndices=getDjCandidateIndices(currentIndex, opts.windowSize || state.dj.candidateWindow).filter(index=>!skipSet.has(index));
  const fallback=fallbackIndices[0] ?? ((currentIndex+1)%state.list.length);
  const currentBpm=getTrackBpmInfo(currentItem).bpm || 0;
  const candidates=getDjCandidateIndices(currentIndex, opts.windowSize || state.dj.candidateWindow);
  const scored=candidates
    .filter(index=>!skipSet.has(index))
    .map(index=>scoreDjCandidate(currentIndex, index, currentItem, state.list[index], currentBpm))
    .filter(Boolean);
  const analyzed=scored.filter(entry=>entry.isAnalyzed);
  const pool=analyzed.length ? analyzed : scored;
  pool.sort((a,b)=>b.score-a.score);
  return {
    currentItem,
    currentBpm,
    fallbackIndex:fallback,
    scored,
    analyzed,
    best:pool[0] || null
  };
}
function chooseAutoDjNextIndex(currentIndex=state.cur, opts={}){
  const currentItem=state.list[currentIndex];
  if(!currentItem || state.list.length<2) return -1;
  const { fallbackIndex, scored, analyzed, best }=getDjCandidatePool(currentIndex, opts);
  const fallback=fallbackIndex;
  if(!scored.length) return fallback;
  const effectivePool=analyzed.length ? analyzed : scored;
  if(!effectivePool.length) return fallback;
  effectivePool.sort((a,b)=>b.score-a.score);
  const picked=best || effectivePool[0];
  const nextDefault=fallback;
  if(!picked) return nextDefault;
  if(picked.index!==nextDefault){
    const nextDefaultScore=scored.find(entry=>entry.index===nextDefault)?.score ?? -Infinity;
    if(picked.score < nextDefaultScore + 0.09){
      return nextDefault;
    }
  }
  return picked.index;
}
function describeDjCandidateMedia(item){
  return itemLooksLikeVideoMedia(item) ? 'VIDEO' : 'AUDIO';
}
function getDjPreviewState(currentIndex=state.cur){
  const currentItem=state.list[currentIndex];
  if(!currentItem || state.list.length<2) return null;
  const manualIndex=getDjManualNextIndex(currentIndex);
  const skipIndices=getDjRerollSkipIndices(currentIndex);
  const pool=getDjCandidatePool(currentIndex, { skipIndices });
  let entry=pool.best;
  let mode='auto';
  const frozenIndex=(
    state.dj.nextIndex>=0 &&
    state.dj.nextIndex!==currentIndex &&
    (state.dj.deck?.started || state.dj.handoffPending || !!state.dj.syncPlan)
  ) ? state.dj.nextIndex : -1;
  if(manualIndex>=0){
    const phraseMetrics=getDjPhraseTransitionMetrics(currentItem, state.list[manualIndex]);
    entry=scoreDjCandidate(currentIndex, manualIndex, currentItem, state.list[manualIndex], pool.currentBpm || 0) || {
      index:manualIndex,
      item:state.list[manualIndex],
      score:0,
      distance:forwardPlaylistDistance(currentIndex, manualIndex, state.list.length),
      candidateBpm:getTrackBpmInfo(state.list[manualIndex]).bpm || getTrackMeterBpmInfo(state.list[manualIndex]).bpm || 0,
      bpmKnown:false,
      bpmRatio:1,
      loudnessDeltaDb:0,
      introQuietness:getItemDjQuietness(state.list[manualIndex], 'head'),
      outroQuietness:getItemDjQuietness(currentItem, 'tail'),
      introBars:phraseMetrics.introBars,
      outroBars:phraseMetrics.outroBars,
      entryEnergy:phraseMetrics.entryEnergy,
      exitEnergy:phraseMetrics.exitEnergy,
      energyGap:phraseMetrics.energyGap,
      phraseScore:phraseMetrics.score,
      phraseConfidence:phraseMetrics.confidence,
      analysisConfidence:0,
      cueIn:getItemDjCueIn(state.list[manualIndex]),
      sameVisualClass:itemLooksLikeVideoMedia(currentItem)===itemLooksLikeVideoMedia(state.list[manualIndex]),
      isAnalyzed:!!(state.list[manualIndex]?._analysisDone)
    };
    mode='locked';
  }else if(frozenIndex>=0){
    const phraseMetrics=getDjPhraseTransitionMetrics(currentItem, state.list[frozenIndex]);
    entry=scoreDjCandidate(currentIndex, frozenIndex, currentItem, state.list[frozenIndex], pool.currentBpm || 0) || {
      index:frozenIndex,
      item:state.list[frozenIndex],
      score:0,
      distance:forwardPlaylistDistance(currentIndex, frozenIndex, state.list.length),
      candidateBpm:getTrackBpmInfo(state.list[frozenIndex]).bpm || getTrackMeterBpmInfo(state.list[frozenIndex]).bpm || 0,
      bpmKnown:false,
      bpmRatio:1,
      loudnessDeltaDb:0,
      introQuietness:getItemDjQuietness(state.list[frozenIndex], 'head'),
      outroQuietness:getItemDjQuietness(currentItem, 'tail'),
      introBars:phraseMetrics.introBars,
      outroBars:phraseMetrics.outroBars,
      entryEnergy:phraseMetrics.entryEnergy,
      exitEnergy:phraseMetrics.exitEnergy,
      energyGap:phraseMetrics.energyGap,
      phraseScore:phraseMetrics.score,
      phraseConfidence:phraseMetrics.confidence,
      analysisConfidence:0,
      cueIn:getItemDjCueIn(state.list[frozenIndex]),
      sameVisualClass:itemLooksLikeVideoMedia(currentItem)===itemLooksLikeVideoMedia(state.list[frozenIndex]),
      isAnalyzed:!!(state.list[frozenIndex]?._analysisDone)
    };
    mode='armed';
  }
  const nextIndex=entry?.index ?? (manualIndex>=0 ? manualIndex : pool.fallbackIndex);
  const nextItem=nextIndex>=0 ? state.list[nextIndex] : null;
  if(!nextItem) return null;
  const bpm=entry?.candidateBpm || getTrackBpmInfo(nextItem).bpm || getTrackMeterBpmInfo(nextItem).bpm || 0;
  const distance=entry?.distance ?? forwardPlaylistDistance(currentIndex, nextIndex, state.list.length);
  const bpmDeltaPct=(entry?.bpmKnown && Number.isFinite(entry?.bpmRatio)) ? ((entry.bpmRatio-1)*100) : null;
  const loudnessText=Number.isFinite(entry?.loudnessDeltaDb) ? `${entry.loudnessDeltaDb>0?'+':''}${entry.loudnessDeltaDb.toFixed(1)}dB` : '--';
  const introBars=Math.max(0, Math.round(entry?.introBars || 0));
  const outroBars=Math.max(0, Math.round(entry?.outroBars || 0));
  const entryEnergyPct=Math.round(clampValue(entry?.entryEnergy ?? 0.5, 0, 1)*100);
  const reasonParts=[
    bpm ? `${formatBpmValue(bpm, 1)} BPM${bpmDeltaPct!=null ? ` ${bpmDeltaPct>=0?'+':''}${bpmDeltaPct.toFixed(1)}%` : ''}` : 'BPM scan',
    `Bars O${outroBars}→I${introBars}`,
    `Entry ${entryEnergyPct}%`,
    `Loud ${loudnessText}`
  ];
  if(entry?.analysisConfidence>0) reasonParts.push(`Conf ${Math.round(entry.analysisConfidence*100)}%`);
  return {
    entry,
    index:nextIndex,
    item:nextItem,
    mode,
    title:nextItem.title || nextItem.file?.name || nextItem.url || 'Next item',
    modeLabel:mode==='locked' ? 'LOCK' : (mode==='armed' ? 'LIVE' : 'AUTO'),
    meta:`P${Math.max(1, distance)} · ${describeDjCandidateMedia(nextItem)}${entry?.isAnalyzed ? ' · READY' : ' · SCAN'}`,
    reason:reasonParts.join(' · '),
    canLock:mode==='auto' && canAdjustDjNextCandidate(),
    canReroll:state.dj.enabled && state.list.length>2 && canAdjustDjNextCandidate(),
    canClear:mode==='locked' || skipIndices.length>0
  };
}
function rerollDjNextCandidate(){
  if(!canAdjustDjNextCandidate()){
    toast('現在のミックス中は候補を選び直せません','warn',2600);
    return false;
  }
  const preview=getDjPreviewState();
  const currentItem=state.list[state.cur];
  if(!preview || !currentItem) return false;
  clearDjNextOverrides({ keepReroll:true });
  state.dj.rerollSourceItem=currentItem;
  if(preview.item && !state.dj.rerollSkipItems.includes(preview.item)){
    state.dj.rerollSkipItems.push(preview.item);
  }
  state.dj.nextIndex=-1;
  state.dj.syncPlan=null;
  cleanupDjDeck();
  queueDjCandidateAnalysis(state.cur, state.dj.candidateWindow);
  updateDjReadouts();
  renderPlaylist();
  return true;
}
function queueDjCandidateAnalysis(index=state.cur, windowSize=state.dj.candidateWindow){
  const indices=getDjCandidateIndices(index, windowSize);
  indices.forEach((candidateIndex, pos)=>{
    const candidateItem=state.list[candidateIndex];
    if(!candidateItem || candidateItem._bpmPromise || hasCompletedTrackAnalysis(candidateItem)) return;
    const priority=pos===0 ? 2 : 1;
    const delay=isDesktopOnlyAnalysisMode()
      ? (pos===0 ? 920 : (1600 + pos*380))
      : (2200 + pos*1200);
    scheduleItemAnalysis(candidateItem, delay, { priority });
  });
}
function getDjMixProfile(progress, syncPlan=null){
  const p=clampValue(progress, 0, 1);
  const spec=syncPlan?.mixProfile || DJ_MIX_PROFILE_PRESETS.balanced;
  const currentPhase=clampValue((p-(spec.currentDelay||0))/Math.max(0.24, spec.currentSpan||1), 0, 1);
  const currentCurve=Math.pow(smoothstep01(currentPhase), Math.max(0.55, spec.currentPower||1));
  const currentMul=Math.max(0, Math.cos((currentCurve*Math.PI)/2));
  const nextPhase=clampValue((p-(spec.nextDelay||0))/Math.max(0.24, spec.nextSpan||1), 0, 1);
  const nextAttack=Math.pow(smoothstep01(nextPhase), Math.max(0.55, spec.nextPower||1));
  const nextFloor=clampValue(spec.nextFloor ?? 0.02, 0, 0.25);
  const nextMul=clampValue(nextFloor + nextAttack*(1-nextFloor), 0, 1);
  const mixProgress=clampValue((p-(spec.mixDelay||0))/Math.max(0.24, spec.mixSpan||0.84), 0, 1);
  const visualProgress=clampValue((p-(spec.visualDelay||0))/Math.max(0.24, spec.visualSpan||0.72), 0, 1);
  return { currentMul, nextMul, mixProgress, visualProgress };
}
function hasCompletedTrackAnalysis(item){
  if(!item) return false;
  if(item._analysisDone===true) return true;
  return !!(item._bpm && item._key);
}
function getTrackBpmInfo(item, opts={}){
  if(!hasCompletedTrackAnalysis(item)) return { bpm:0, confidence:0, source:'none' };
  const analyzedBpm=roundBpmValue(item?._bpm || 0, 2);
  const analyzedConfidence=+(item?._bpmConfidence || 0);
  if(analyzedBpm) return { bpm:analyzedBpm, confidence:analyzedConfidence, source:'analysis' };
  return { bpm:0, confidence:0, source:'none' };
}
function getTrackMeterBpmInfo(item){
  if(!hasCompletedTrackAnalysis(item)) return { bpm:0, confidence:0, source:'none' };
  const analyzedBpm=roundBpmValue(item?._meterBpm || item?._bpm || 0, 2);
  const analyzedConfidence=+(item?._meterBpmConfidence ?? item?._bpmConfidence ?? 0);
  if(analyzedBpm) return { bpm:analyzedBpm, confidence:analyzedConfidence, source:'analysis' };
  return { bpm:0, confidence:0, source:'none' };
}
function getCurrentTrackBpm(){
  const item=state.list[state.cur];
  return getTrackBpmInfo(item).bpm || 0;
}
function getCurrentTrackMeterBpm(){
  const item=state.list[state.cur];
  return getTrackMeterBpmInfo(item).bpm || 0;
}
function getCurrentTrackBeatAnchor(){
  return getItemBeatAnchorSec(state.list[state.cur]);
}
function getMetronomeSubdivisionDivisor(value=state.metronome?.subdivision){
  return value==='eighth' ? 2 : 1;
}
function getMetronomeSubdivisionLabel(value=state.metronome?.subdivision){
  return value==='eighth' ? '8分' : '4分';
}
function getCurrentBeatGridSnapshot(timeSec=mediaCurrent(), item=state.list[state.cur]){
  const bpm=getItemMeterBpm(item) || roundBpmValue(+item?._bpm || 0, 2) || 0;
  const period=meterBeatPeriodSec(bpm);
  if(!item || !bpm || !period) return null;
  const anchorSec=getItemBeatAnchorSec(item);
  const beatFloat=(Math.max(0, +timeSec || 0)-anchorSec)/period;
  const beatIndex=Math.floor(beatFloat);
  const beatPhase=beatFloat-beatIndex;
  const beatInBar=((beatIndex % DJ_BEATS_PER_BAR) + DJ_BEATS_PER_BAR) % DJ_BEATS_PER_BAR;
  const barIndex=Math.floor(Math.max(0, beatIndex)/DJ_BEATS_PER_BAR);
  return {
    bpm,
    period,
    anchorSec,
    beatFloat,
    beatIndex,
    beatPhase:clampValue(beatPhase, 0, 1),
    beatInBar,
    barIndex,
    meterConfidence:+(item?._meterBpmConfidence || item?._bpmConfidence || 0),
    anchorConfidence:+(item?._beatAnchorConfidence || 0)
  };
}
function queueMetronomeFlash(when, level=1){
  if(!state.metronome.visual) return;
  if(!Number.isFinite(when)) return;
  state.metronome.flashQueue.push({
    when,
    until:when + (level>=2 ? 0.11 : 0.085),
    level:Math.max(0, level|0)
  });
  if(state.metronome.flashQueue.length>18){
    state.metronome.flashQueue.splice(0, state.metronome.flashQueue.length-18);
  }
}
function getActiveMetronomeFlash(){
  if(!state.metronome.visual) return null;
  const ac=state.audioCtx;
  if(!ac || !state.metronome.flashQueue.length) return null;
  const now=ac.currentTime;
  state.metronome.flashQueue=state.metronome.flashQueue.filter(entry=>(entry.until||0) >= (now-0.02));
  let active=null;
  for(const entry of state.metronome.flashQueue){
    if(now < entry.when || now > entry.until) continue;
    const span=Math.max(0.02, (entry.until-entry.when) || 0.08);
    const progress=clampValue((now-entry.when)/span, 0, 1);
    const strength=(1-progress) * (entry.level>=2 ? 1 : 0.72);
    if(!active || strength>active.strength){
      active={ level:entry.level, strength };
    }
  }
  return active;
}
function getCurrentTrackKey(){
  const item=state.list[state.cur];
  if(!hasCompletedTrackAnalysis(item)) return '';
  return (item?._key || '').trim();
}
const KEY_NAME_TO_PC={
  'C':0,'B#':0,
  'C#':1,'Db':1,
  'D':2,
  'D#':3,'Eb':3,
  'E':4,'Fb':4,
  'F':5,'E#':5,
  'F#':6,'Gb':6,
  'G':7,
  'G#':8,'Ab':8,
  'A':9,
  'A#':10,'Bb':10,
  'B':11,'Cb':11
};
const PC_TO_KEY_NAME=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B'];
function parseTrackKey(raw=''){
  const text=String(raw||'').trim();
  if(!text) return null;
  const m=text.match(/^([A-Ga-g](?:#|b)?)(m)?$/);
  if(!m) return null;
  const root=m[1].charAt(0).toUpperCase()+m[1].slice(1);
  const pc=KEY_NAME_TO_PC[root];
  if(!Number.isFinite(pc)) return null;
  return { pc, mode:m[2] ? 'minor' : 'major', text:`${PC_TO_KEY_NAME[pc]}${m[2] ? 'm' : ''}` };
}
function formatTrackKey(pc, mode='major'){
  const safe=((pc%12)+12)%12;
  return `${PC_TO_KEY_NAME[safe]}${mode==='minor' ? 'm' : ''}`;
}
function keyRelativePc(key){
  if(!key) return null;
  return key.mode==='major' ? ((key.pc + 9) % 12) : ((key.pc + 3) % 12);
}
function semitoneToRate(semi){
  return Math.pow(2, (+semi||0)/12);
}
function rateToSemitone(rate){
  return 12*Math.log2(Math.max(1e-6, +rate || 1));
}
function nearestSignedSemitone(rate){
  return Math.round(rateToSemitone(rate));
}
function signedPitchClassDiff(fromPc, toPc){
  let diff=(((+toPc||0) - (+fromPc||0)) % 12 + 12) % 12;
  if(diff>6) diff -= 12;
  return diff;
}
function keyCompatibilityScore(a, b){
  if(!a || !b) return 0;
  if(a.pc===b.pc && a.mode===b.mode) return 1;
  if(a.mode!==b.mode && keyRelativePc(a)===b.pc) return 0.92;
  const fifth=((b.pc-a.pc)%12+12)%12;
  if(a.mode===b.mode && (fifth===7 || fifth===5)) return 0.84;
  const dist=Math.abs(signedPitchClassDiff(a.pc, b.pc));
  if(a.mode===b.mode && dist===2) return 0.72;
  if(dist===1) return 0.64;
  return Math.max(0.12, 0.5 - dist*0.08);
}
function preservePitchProp(media){
  if(!media) return null;
  if('preservesPitch' in media) return 'preservesPitch';
  if('mozPreservesPitch' in media) return 'mozPreservesPitch';
  if('webkitPreservesPitch' in media) return 'webkitPreservesPitch';
  return null;
}
function setMediaPreservePitch(media, on){
  const prop=preservePitchProp(media);
  if(prop) media[prop]=!!on;
}
function currentEffectiveRate(){
  return currentMainPlaybackRate();
}
function setDjDeckBufferRate(deck, nextRate){
  if(!deck?.bufferSource || !state.audioCtx) return;
  const ctxTime=state.audioCtx.currentTime;
  const prevRate=+deck.startedRate || +deck.bufferSource.playbackRate.value || 1;
  deck.startOffset=Math.max(0, ((ctxTime - (deck.startedAtCtx || ctxTime)) * prevRate) + (deck.startOffset || 0));
  deck.startedAtCtx=ctxTime;
  deck.startedRate=nextRate;
  try{ deck.bufferSource.playbackRate.value = nextRate; }catch(e){}
}
function syncDjPitchPolicy(){
  const shouldDisablePreserve=!!(
    state.mediaKind==='html5' &&
    Math.abs(currentManualKeyShift())>=1
  );
  if(shouldDisablePreserve){
    const restore = state.dj.pitchRestore || (state.dj.pitchRestore = {});
    const capture = (name, media)=>{
      if(!media) return;
      if(restore[name]?.media===media) return;
      const prop=preservePitchProp(media);
      restore[name]={ media, prop, value:prop ? !!media[prop] : null };
    };
    capture('video', $.v);
    capture('ext', state.extAudio);
    capture('deck', state.dj.deck?.media);
    setMediaPreservePitch($.v, false);
    if(state.extAudio) setMediaPreservePitch(state.extAudio, false);
    if(state.dj.deck?.media) setMediaPreservePitch(state.dj.deck.media, false);
    return;
  }
  if(state.dj.pitchRestore){
    Object.values(state.dj.pitchRestore).forEach(entry=>{
      if(entry?.prop && entry.media) entry.media[entry.prop]=!!entry.value;
    });
    state.dj.pitchRestore=null;
  }
}
function updateDjReadouts(){
  const item=state.list[state.cur];
  const analysisDone=hasCompletedTrackAnalysis(item);
  const djBpm=getCurrentTrackBpm();
  const meterBpm=getCurrentTrackMeterBpm() || djBpm;
  const bpmConfidence=Math.round(Math.max((item?._bpmConfidence || 0), (item?._meterBpmConfidence || 0))*100);
  const bpmLabel=(meterBpm && djBpm && Math.abs(meterBpm-djBpm)>=8)
    ? `${formatBpmValue(meterBpm, 1)} BPM / DJ ${formatBpmValue(djBpm, 1)}`
    : `${formatBpmValue(djBpm || meterBpm, 1)} BPM`;
  const bpmText = (djBpm || meterBpm)
    ? `${bpmLabel}${bpmConfidence ? ` · ${bpmConfidence}%` : ''}`
    : '--';
  if($.bpmRead){
    $.bpmRead.textContent=bpmText;
  }
  if($.bpmDock){
    $.bpmDock.textContent=bpmText;
  }
  if($.keyRead){
    const keyConfidence=Math.round((item?._keyConfidence || 0)*100);
    const keyText=(analysisDone ? getCurrentTrackKey() : '') || '--';
    $.keyRead.textContent=(keyText!=='--' && keyConfidence>0) ? `${keyText} · ${keyConfidence}%` : keyText;
  }
  updateMixKeyReadout();
  updateMetronomeReadout();
  if($.djTransitionRead){
    const targetText=state.bpm.beatSync ? 'BPM と小節' : 'BPM';
    const transitionLabel=state.dj.syncPlan?.effectiveTransitionSec ? `${state.dj.syncPlan.effectiveTransitionSec.toFixed(1)}秒` : `${state.dj.transitionSec}秒`;
    $.djTransitionRead.textContent=(!currentMediaAllowsDjTempoMatch() && itemLooksLikeVideoMedia(item))
      ? `${transitionLabel}・${getDjModeLabel()} / 映像は等速のまま、${targetText} 基準でつなぎます。`
      : `${transitionLabel}・${getDjModeLabel()} / 次の曲の ${targetText} を寄せます。`;
  }
  if($.djCandidateRead){
    $.djCandidateRead.textContent=`先の${state.dj.candidateWindow}曲から候補選択${state.dj.repeatGuard ? ' · 再登場回避' : ''}`;
  }
  if($.djStatus){
    let text='OFF';
    if(state.dj.enabled){
      const syncPlan=state.dj.syncPlan;
      if(state.dj.handoffPending){
        const deltaText=state.dj.handoffDelta>0 ? ` Δ${state.dj.handoffDelta.toFixed(2)}s` : '';
        const retryText=state.dj.handoffRetries>0 ? ` R${state.dj.handoffRetries}` : '';
        text=`${getDjPhaseBadgeLabel(state.dj.handoffStage || 'handoff', syncPlan)}${deltaText}${retryText}`;
      }else if(state.dj.active){
        const rateText=getDjRateStatusText();
        const gainDb=syncPlan ? gainToDb(syncPlan.deckGainMul || 1) : 0;
        const gainText=Math.abs(gainDb)>=0.4 ? ` ${gainDb>0?'+':''}${gainDb.toFixed(1)}dB` : '';
        const hopText=(state.dj.nextIndex>=0 && state.dj.nextIndex!==((state.cur+1)%Math.max(1,state.list.length))) ? ` P${forwardPlaylistDistance(state.cur, state.dj.nextIndex, state.list.length)}` : '';
        const phaseLabel=state.dj.phase==='armed' ? 'ARM' : (state.dj.phase==='prepare' ? 'PREP' : (syncPlan?.statusLabel || 'MATCH'));
        text=`${phaseLabel} ${rateText}${gainText}${hopText}`;
      }else if(state.dj.carryUntil>performance.now()){
        text=`HANDOFF ${getDjRateStatusText()}`;
      }else if(item?._analysisUnsupported){
        text='N/A';
      }else if(state.dj.phase==='scan'){
        text='SCAN';
      }else if(state.dj.phase==='handoff'){
        text='HANDOFF';
      }else if(analysisDone && getCurrentTrackBpm()){
        text='READY';
      }else{
        text='SCAN';
      }
    }
    $.djStatus.textContent=text;
  }
  updateDjNextPreview();
  updateDjTransitionOverlay();
}
function updateDjNextPreview(){
  if(!$.djNextTitle && !$.djNextMeta && !$.djNextReason) return;
  const preview=state.dj.enabled ? getDjPreviewState() : null;
    if(!preview){
      if($.djNextMode) $.djNextMode.textContent=state.dj.enabled ? 'WAIT' : 'OFF';
      if($.djNextTitle) $.djNextTitle.textContent='--';
      if($.djNextMeta) $.djNextMeta.textContent=state.dj.enabled ? 'Auto DJ 候補を待機中' : 'Auto DJ OFF';
      if($.djNextReason) $.djNextReason.textContent='BPM / phrase / energy / loudness を見て次曲を決めます。';
    if($.djNextLock){
      $.djNextLock.disabled=true;
      $.djNextLock.textContent='固定';
    }
    if($.djNextReroll) $.djNextReroll.disabled=true;
    if($.djNextClear) $.djNextClear.disabled=true;
    return;
  }
  if($.djNextMode) $.djNextMode.textContent=preview.modeLabel;
  if($.djNextTitle) $.djNextTitle.textContent=preview.title;
  if($.djNextMeta) $.djNextMeta.textContent=preview.meta;
  if($.djNextReason) $.djNextReason.textContent=preview.reason;
  if($.djNextLock){
    $.djNextLock.disabled=!preview.canLock;
    $.djNextLock.textContent=preview.canLock ? '固定' : '固定中';
  }
  if($.djNextReroll) $.djNextReroll.disabled=!preview.canReroll;
  if($.djNextClear) $.djNextClear.disabled=!preview.canClear;
}
function applyDjRateMul(nextMul){
  const clamped=clampValue(nextMul||1, 0.88, 1.12);
  if(Math.abs((state.dj.rateMul||1)-clamped)<0.001) return;
  state.dj.rateMul=clamped;
  applyCurrentMediaTunables();
  updateDjReadouts();
}
function resetBeatTracking(){
  state.bpm.pulse=0;
  state.bpm.current=0;
  state.bpm.confidence=0;
  resetMetronomeSchedule();
  updateDjReadouts();
}
function clearPendingPause(){
  if(state.pauseTimer){
    clearTimeout(state.pauseTimer);
    state.pauseTimer=null;
  }
}
function cleanupDjDeck(){
  const deck=state.dj.deck;
  state.dj.handoffPending=false;
  state.dj.handoffToken++;
  resetDjTransitionTelemetry();
  if(!deck){
    updateDjTransitionOverlay();
    return;
  }
  try{ deck.bufferSource?.stop?.(0) }catch(e){}
  try{ deck.hls?.destroy?.() }catch(e){}
  try{ deck.dash?.reset?.() }catch(e){}
  try{ deck.bufferSource?.disconnect?.() }catch(e){}
  try{ deck.sourceNode?.disconnect?.() }catch(e){}
  try{ deck.gainNode?.disconnect?.() }catch(e){}
  try{ deck.analyser?.disconnect?.() }catch(e){}
  try{ deck.media?.pause?.() }catch(e){}
  try{ deck.media?.removeAttribute?.('src') }catch(e){}
  try{ deck.media?.load?.() }catch(e){}
  if($.djDeckVideo){
    $.djDeckVideo.classList.remove('active');
    $.djDeckVideo.style.opacity='0';
    $.djDeckVideo.style.transform='';
  }
  if($.v){
    $.v.style.opacity='1';
    $.v.style.filter='';
  }
  if(deck.objectUrl){ try{ URL.revokeObjectURL(deck.objectUrl) }catch(e){} }
  state.dj.deck=null;
  updateDjTransitionOverlay();
}
function resetAutoDj(full=true, preserveDeck=false){
  setDjPhase('idle');
  state.dj.active=false;
  state.dj.nextIndex=-1;
  state.dj.currentBpm=0;
  state.dj.nextBpm=0;
  state.dj.currentKey='';
  state.dj.nextKey='';
  state.dj.keyShiftSemitones=0;
  state.dj.keySyncActive=false;
  state.dj.syncPlan=null;
  state.dj.targetMul=1;
  state.dj.carryPrimed=false;
  resetDjTransitionTelemetry();
  if(full) clearDjNextOverrides();
  if(!preserveDeck) cleanupDjDeck();
  if(full){
    state.dj.carryFrom=1;
    state.dj.carryUntil=0;
    applyDjRateMul(1);
    syncDjPitchPolicy();
  }else{
    syncDjPitchPolicy();
    updateDjReadouts();
  }
}
applyResponsiveUiState();
enforceDesktopOnlyGuard();
Object.values(responsiveMql).forEach(mql=>{
  if(!mql) return;
  const handler = ()=>{ applyResponsiveUiState(); enforceDesktopOnlyGuard(); };
  if(typeof mql.addEventListener === 'function') mql.addEventListener('change', handler);
  else if(typeof mql.addListener === 'function') mql.addListener(handler);
});
window.addEventListener('resize', ()=>{ applyResponsiveUiState(); enforceDesktopOnlyGuard(); }, { passive:true });
function enforceDesktopOnlyGuard(){
  const blocked=!!(OPPlatform.isMobile || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent||''));
  document.body.classList.toggle('pc-only-guarded', blocked);
  if($.deviceGuard) $.deviceGuard.style.display=blocked ? 'flex' : 'none';
}
function showRatioAlert(){
  if($.ratioAlert) $.ratioAlert.style.display='flex';
}
function hideRatioAlert(){
  if($.ratioAlert) $.ratioAlert.style.display='none';
}
function relocatePortraitControlModules(isPortrait){
  const dock = qs('.ctrl.ctrl-dock');
  const host = $.portraitSettingsDock;
  const transport = qs('.transport-module');
  const mix = qs('.mix-module');
  const loop = qs('.loop-module');
  if(!dock || !host || !transport || !mix || !loop) return;
  if(isPortrait){
    host.appendChild(mix);
    host.appendChild(loop);
  }else{
    dock.appendChild(mix);
    dock.appendChild(loop);
  }
}
function applyAppAspect(value){
  const next = APP_ASPECTS[value] ? value : '16:9';
  const cfg = APP_ASPECTS[next];
  document.documentElement.style.setProperty('--app-stage-ratio-n', String(cfg.n));
  document.documentElement.style.setProperty('--app-stage-ratio-str', cfg.ratio);
  document.body.classList.toggle('app-ratio-wide', cfg.layout === 'wide');
  document.body.classList.toggle('app-ratio-classic', cfg.layout === 'classic');
  document.body.classList.toggle('app-ratio-portrait', cfg.layout === 'portrait');
  relocatePortraitControlModules(cfg.layout === 'portrait');
  if(cfg.layout === 'portrait' && !store.get('pc.aspect916.noticeDismissed', false)){
    showRatioAlert();
  }else{
    hideRatioAlert();
  }
  if($.appAspect) $.appAspect.value = next;
  store.set('pc.appAspect', next);
}
function setSettingsTab(tab){
  const next = tab || store.get('pc.settings.tab','subs') || 'subs';
  qsa('[data-settings-tab]').forEach(btn=>{
    const on = btn.dataset.settingsTab === next;
    btn.setAttribute('aria-selected', on ? 'true' : 'false');
  });
  qsa('[data-settings-panel]').forEach(panel=>{
    panel.classList.toggle('active', panel.dataset.settingsPanel === next);
  });
  store.set('pc.settings.tab', next);
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
  const rate = currentEffectiveRate();
  const deckRate = currentDeckRate();
  syncDjPitchPolicy();
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
  const deck=state.dj.deck;
  if(deck?.bufferSource){
    setDjDeckBufferRate(deck, deckRate);
  }else if(deck?.media){
    try{ deck.media.playbackRate = deckRate; }catch(e){}
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
  lastCoverUrl:null, lastObjUrl:null, mediaArtwork:[],
  thumbs:[], thumbAmbientBucket:-1, thumbAmbientKey:'', accentRestore:null,
  thumbBuildToken:0, thumbBuildCleanup:null,
  videoEdgeCanvas:null, videoEdgeCtx:null, videoEdgeKey:'',
  triedOnce:false, playToken:0, playDesired:false, playDebounce:null, pauseTimer:null, lastUserGestureAt:0,
  extAudioUrl:null, _unmuteWdg:null,
  _logRanges:null, _logCenters:null, _startTime:performance.now(),
  seekRAF:0,
  subCues:[],
  contPlay: store.get('pc.contPlay', true),
  bpm:{
    current:0, confidence:0, pulse:0, lastBeatAt:0, detectedAt:0,
    envelope:0, baseline:0, deviation:0, prev:0, onsets:[],
    beatSync: store.get('pc.bpm.beatSync', true)
  },
  metronome:{
    enabled: store.get('pc.metro.enabled', false),
    volume: clampValue(+(store.get('pc.metro.volume', 0.24) || 0.24), 0, 1),
    subdivision: store.get('pc.metro.subdivision', 'quarter')==='eighth' ? 'eighth' : 'quarter',
    visual: store.get('pc.metro.visual', true)!==false,
    gainNode:null, nextBeatIndex:null, trackSig:'', flashQueue:[]
  },
  dj:{
    enabled: store.get('pc.dj.enabled', true),
    transitionSec: Math.max(6, Math.min(20, store.get('pc.dj.transitionSec', 12))),
    modePref: store.get('pc.dj.modePref', 'auto'),
    candidateWindow: Math.max(2, Math.min(8, store.get('pc.dj.candidateWindow', 5))),
    repeatGuard: store.get('pc.dj.repeatGuard', true),
    phase:'idle', phaseStartedAt:0,
    active:false, nextIndex:-1, currentBpm:0, nextBpm:0, targetMul:1,
    rateMul:1, carryPrimed:false, carryFrom:1, carryUntil:0,
    handoffPending:false, handoffToken:0, handoffRetries:0, handoffDelta:0, handoffNote:'', handoffStage:'',
    mixProgress:0, visualProgress:0,
    currentKey:'', nextKey:'', keyShiftSemitones:0, keySyncActive:false, pitchRestore:null,
    manualNextItem:null, manualNextSource:'', rerollSourceItem:null, rerollSkipItems:[],
    syncPlan:null,
    deck:null
  },
  bpmScanToken:0,
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
  const beatGrid=getCurrentBeatGridSnapshot();
  const metroFlash=getActiveMetronomeFlash();

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

  if(metroFlash){
    const flashAlpha=clampValue(metroFlash.strength*0.2, 0, 0.22);
    const flashGrad=ctx.createLinearGradient(0,0,w,0);
    flashGrad.addColorStop(0,`rgba(126,214,255,${flashAlpha*0.35})`);
    flashGrad.addColorStop(.5,`rgba(126,214,255,${flashAlpha})`);
    flashGrad.addColorStop(1,`rgba(126,214,255,${flashAlpha*0.35})`);
    ctx.fillStyle=flashGrad;
    ctx.fillRect(0,0,w,h);
  }

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

  ctx.textAlign='right';
  ctx.textBaseline='alphabetic';
  ctx.font='700 11px system-ui, sans-serif';
  if(!beatGrid){
    ctx.fillStyle='rgba(236,246,255,.72)';
    ctx.fillText('BEAT --', w-24, h-22);
    return;
  }
  const currentBeat=(beatGrid.beatInBar % DJ_BEATS_PER_BAR) + 1;
  const beatPulse=1-beatGrid.beatPhase;
  ctx.fillStyle=`rgba(236,246,255,${0.76 + beatPulse*0.22})`;
  ctx.fillText(`BEAT ${currentBeat}`, w-24, h-22);
}
function initCanvasHud(){
  let raf=0;
  const loop=(t)=>{
    drawHeaderHud(t||0);
    if($.statusCanvas) drawStatusHud(t||0);
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

  if ('serviceWorker' in navigator && location.protocol === 'https:') {
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

// Absorbed from former omni-player.inline-2.js to reduce file count.
/* ========= Settings: Tabs ========= */
(function(){
  const pick = (title) => {
    const t = (title||'').toLowerCase();
    if (t.includes('字幕')) return 'sub';
    if (t.includes('スペクトラム')) return 'spec';
    if (t.includes('eq') || t.includes('10バンド')) return 'eq';
    if (t.includes('アニメ')) return 'anim';
    if (t.includes('ブックマーク') || t.includes('lrc') || t.includes('歌詞') ||
        t.includes('チャプター') || t.includes('スクリーンショット') ||
        t.includes('設定バックアップ') || t.includes('スリープ')) return 'ext';
    return 'ext';
  };

  function initSettingsTabs(){
    const card = qs('#settings .settings-card');
    if (!card || card.dataset.tabbified) return;
    if (card.querySelector('[data-settings-tab]') && card.querySelector('[data-settings-panel]')) {
      card.dataset.tabbified = '1';
      return;
    }

    const rootGrid = Array.from(card.children).find(node => node.classList?.contains('settings-grid'));
    if (!rootGrid || rootGrid.parentElement !== card) return;

    const tabsData = [
      ['sub','字幕'],
      ['spec','スペクトラム'],
      ['eq','EQ'],
      ['anim','アニメ'],
      ['ext','拡張'],
      ['all','すべて']
    ];
    const tabs = document.createElement('div');
    tabs.className = 'settings-tabs';
    tabs.setAttribute('role','tablist');

    const panels = document.createElement('div');
    panels.className = 'settings-panels';

    const grids = {};
    for (const [key] of tabsData){
      const g = document.createElement('div');
      g.className = 'settings-grid';
      g.dataset.tabPanel = key;
      panels.appendChild(g);
      grids[key] = g;
    }

    const head = card.querySelector('.settings-head');
    if (head && head.parentElement === card) card.insertBefore(tabs, head.nextSibling);
    else card.insertBefore(tabs, rootGrid);
    card.insertBefore(panels, rootGrid);

    const sections = Array.from(rootGrid.querySelectorAll('.settings-section'));
    sections.forEach(sec=>{
      const title = sec.querySelector('h4')?.textContent || '';
      const key = pick(title);
      (grids[key] || grids.ext).appendChild(sec);
    });
    rootGrid.remove();

    const activate = (key) => {
      Array.from(panels.querySelectorAll('.settings-grid')).forEach(g=>{
        const show = key==='all' || g.dataset.tabPanel===key;
        g.classList.toggle('active', show);
        g.style.display = show ? 'grid' : 'none';
      });
      Array.from(tabs.querySelectorAll('.tab')).forEach(b=>{
        b.setAttribute('aria-selected', b.dataset.tab===key ? 'true' : 'false');
      });
      try { store.set('pc.settings.tab', key); } catch(e){}
    };

    tabsData.forEach(([key,label])=>{
      const btn = document.createElement('button');
      btn.className = 'tab';
      btn.type = 'button';
      btn.dataset.tab = key;
      btn.setAttribute('role','tab');
      btn.textContent = label;
      btn.addEventListener('click', ()=>activate(key));
      tabs.appendChild(btn);
    });

    const last = (store && store.get) ? store.get('pc.settings.tab','all') : 'all';
    activate(last);
    card.dataset.tabbified = '1';
  }

  window.addEventListener('load', initSettingsTabs);
  const b = document.getElementById('btnSettings');
  if (b) b.addEventListener('click', initSettingsTabs, { once:true });
})();

// Absorbed from former omni-player.inline-4.js to reduce file count.
window.OPAnim?.init?.({ wrap: document.getElementById('playerWrap'), artWrap: document.getElementById('artWrap'), bg: document.getElementById('bgArt') });
window.OPAnim?.bindMedia?.(document.getElementById('v'));
window.OPFun?.init?.({ wrap: document.getElementById('playerWrap'), bg: document.getElementById('bgArt') });
window.OPAurora?.init?.({ wrap: document.getElementById('playerWrap'), bg: document.getElementById('bgArt') });
window.OPGrid?.init?.({ wrap: document.getElementById('playerWrap'), bg: document.getElementById('bgArt') });
window.OPBoot?.tick?.('エフェクト準備…');

/* ========= ローダー表示 ========= */
let loaderHideTimer=0;
let loaderHoldUntil=0;
let analysisLoaderHideTimer=0;
let analysisLoaderHoldUntil=0;
let analysisLoaderToken=0;
let analysisWorker=null;
let analysisWorkerBroken=false;
let analysisWorkerReq=0;
const analysisWorkerPending=new Map();
let analysisQueueToken=0;
let focusAnalysisTimer=0;
let analysisDispatchTimer=0;
let analysisDispatchDueAt=0;
let analysisRunningItem=null;
let analysisCooldownUntil=0;
let playlistAnalysisTimer=0;
let playlistAnalysisIdleHandle=0;
let playlistAnalysisRunning=false;
let playlistAnalysisBlockUntil=0;
let thumbWarmupTimer=0;
let thumbWarmupRunning=false;
let currentMetaTimer=0;
let currentMetaToken=0;
let ffmpegAnalysis=null;
let ffmpegAnalysisPromise=null;
let ffmpegAnalysisBroken=false;
let activeAnalysisController=null;
const FFMPEG_MODULE_URL=new URL('./scripts/vendor/ffmpeg/ffmpeg/index.js', location.href).href;
const FFMPEG_LOCAL_CORE_URL=new URL('./scripts/vendor/ffmpeg/core/ffmpeg-core.js', location.href).href;
const FFMPEG_LOCAL_WASM_URL=new URL('./scripts/vendor/ffmpeg/core/ffmpeg-core.wasm', location.href).href;
const FFMPEG_CDN_BASE_URL='https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.9/dist/umd/';
function getFfmpegLoadConfig(){
  try{
    const params=new URLSearchParams(location.search||'');
    if(params.get('ffmpegLocal')==='1'){
      return { coreURL:FFMPEG_LOCAL_CORE_URL, wasmURL:FFMPEG_LOCAL_WASM_URL };
    }
  }catch(e){}
  return {
    coreURL:`${FFMPEG_CDN_BASE_URL}ffmpeg-core.js`,
    wasmURL:`${FFMPEG_CDN_BASE_URL}ffmpeg-core.wasm`
  };
}
function showLoader(opts={}){
  try{
    const minMs=Math.max(0, +opts.minMs || 0);
    if(minMs) loaderHoldUntil=Math.max(loaderHoldUntil, Date.now()+minMs);
    if(loaderHideTimer){
      clearTimeout(loaderHideTimer);
      loaderHideTimer=0;
    }
    $.loader?.classList.add('show');
  }catch(e){}
}
function hideLoader(opts={}){
  try{
    const force=!!opts.force;
    if(loaderHideTimer){
      clearTimeout(loaderHideTimer);
      loaderHideTimer=0;
    }
    const wait=force ? 0 : Math.max(0, loaderHoldUntil-Date.now());
    if(wait>0){
      loaderHideTimer=setTimeout(()=>{
        loaderHideTimer=0;
        loaderHoldUntil=0;
        try{ $.loader?.classList.remove('show') }catch(e){}
      }, wait);
      return;
    }
    loaderHoldUntil=0;
    $.loader?.classList.remove('show');
  }catch(e){}
}
function showAnalysisLoader(message='BPM / Key 解析中…', opts={}){
  try{
    const minMs=Math.max(0, +opts.minMs || 0);
    if(minMs) analysisLoaderHoldUntil=Math.max(analysisLoaderHoldUntil, Date.now()+minMs);
    if(analysisLoaderHideTimer){
      clearTimeout(analysisLoaderHideTimer);
      analysisLoaderHideTimer=0;
    }
    if($.analysisLoaderText) $.analysisLoaderText.textContent=message;
    if($.analysisLoader){
      $.analysisLoader.hidden=false;
      $.analysisLoader.classList.add('show');
    }
  }catch(e){}
}
function flushAnalysisWorkerPending(err){
  analysisWorkerPending.forEach(({ reject, timer })=>{
    if(timer) clearTimeout(timer);
    reject(err);
  });
  analysisWorkerPending.clear();
}
function ensureAnalysisWorker(){
  if(analysisWorkerBroken) return null;
  if(analysisWorker) return analysisWorker;
  try{
    const worker=new Worker('./scripts/app/analysis.worker.js');
    worker.onmessage=(event)=>{
      const { id, ok, bpmResult, keyResult, error } = event.data || {};
      const pending=analysisWorkerPending.get(id);
      if(!pending) return;
      analysisWorkerPending.delete(id);
      if(pending.timer) clearTimeout(pending.timer);
      if(ok) pending.resolve({ bpmResult, keyResult });
      else pending.reject(new Error(error || 'analysis worker error'));
    };
    worker.onerror=(event)=>{
      analysisWorkerBroken=true;
      try{ worker.terminate() }catch(e){}
      analysisWorker=null;
      flushAnalysisWorkerPending(new Error(event?.message || 'analysis worker failed'));
    };
    analysisWorker=worker;
    return analysisWorker;
  }catch(e){
    analysisWorkerBroken=true;
    return null;
  }
}
function nextAnalysisTick(){
  return new Promise(resolve=>setTimeout(resolve, 0));
}
function isDesktopOnlyAnalysisMode(){
  return !OPPlatform.isMobile;
}
async function ensureFfmpegAnalysis(){
  if(!isDesktopOnlyAnalysisMode() || ffmpegAnalysisBroken) return null;
  if(ffmpegAnalysis) return ffmpegAnalysis;
  if(ffmpegAnalysisPromise) return ffmpegAnalysisPromise;
  ffmpegAnalysisPromise=(async()=>{
    try{
      const mod=await import(FFMPEG_MODULE_URL);
      const ffmpeg=new mod.FFmpeg();
      const { coreURL, wasmURL }=getFfmpegLoadConfig();
      await Promise.race([
        ffmpeg.load({ coreURL, wasmURL }),
        new Promise((_, reject)=>setTimeout(()=>reject(new Error('ffmpeg load timeout')), 12000))
      ]);
      ffmpegAnalysis=ffmpeg;
      return ffmpegAnalysis;
    }catch(e){
      try{ ffmpegAnalysis?.terminate?.() }catch(_e){}
      ffmpegAnalysis=null;
      ffmpegAnalysisBroken=true;
      return null;
    }finally{
      ffmpegAnalysisPromise=null;
    }
  })();
  return ffmpegAnalysisPromise;
}
function guessAnalysisInputName(item){
  const rawName=item?.file?.name || item?.title || item?.url?.split?.('/').pop?.() || 'input.bin';
  const safe=String(rawName||'input.bin').replace(/[^\w.\-]+/g,'_');
  return safe || 'input.bin';
}
async function runAnalysisWorkerDetailedFromPayload(payload){
  const worker=ensureAnalysisWorker();
  const source=payload.monoBuffer instanceof ArrayBuffer ? payload.monoBuffer : payload.monoBuffer.buffer;
  const fallbackMonoBuffer=source.slice(0);
  const monoView=new Float32Array(source);
  const cloneForFallback=()=>{
    return new Float32Array(fallbackMonoBuffer.slice(0));
  };
  const cueInResult=estimateDjCueInFromMonoDetailed(monoView, payload.sampleRate);
  const mixResult=estimateDjMixMetricsFromMonoDetailed(monoView, payload.sampleRate);
  const mergeLocalAnalysis=(result={})=>{
    const bpmSeed=result?.bpmResult?.meterBpm || result?.bpmResult?.bpm || 0;
    const phraseResult=estimateDjPhraseMetricsFromMonoDetailed(
      cloneForFallback(),
      payload.sampleRate,
      bpmSeed,
      result?.cueInResult?.cueIn || cueInResult?.cueIn || 0,
      result?.mixResult || mixResult
    );
    const beatAnchorResult=(payload.continuous===false)
      ? (result?.beatAnchorResult || { anchorSec:cueInResult?.cueIn || 0, confidence:0 })
      : estimateBeatAnchorFromMonoDetailed(cloneForFallback(), payload.sampleRate, bpmSeed, cueInResult?.cueIn || 0);
    return {
      ...(result||{}),
      cueInResult:result?.cueInResult || cueInResult,
      mixResult:result?.mixResult || mixResult,
      phraseResult:result?.phraseResult || phraseResult,
      beatAnchorResult:result?.beatAnchorResult || beatAnchorResult
    };
  };
  if(!worker){
    const mono=cloneForFallback();
    return mergeLocalAnalysis({
      bpmResult:estimateBpmFromMonoDetailed(mono, payload.sampleRate),
      keyResult:estimateKeyFromMonoDetailed(mono, payload.sampleRate)
    });
  }
  const id=++analysisWorkerReq;
  return await new Promise((resolve,reject)=>{
    const timer=setTimeout(()=>{
      analysisWorkerPending.delete(id);
      reject(new Error('analysis worker timeout'));
    }, 30000);
    analysisWorkerPending.set(id, { resolve, reject, timer });
    try{
      worker.postMessage({ id, monoBuffer:payload.monoBuffer, sampleRate:payload.sampleRate }, payload.transfer || []);
    }catch(e){
      clearTimeout(timer);
      analysisWorkerPending.delete(id);
      reject(e);
    }
  }).catch(()=>{
    const mono=cloneForFallback();
    return {
      bpmResult:estimateBpmFromMonoDetailed(mono, payload.sampleRate),
      keyResult:estimateKeyFromMonoDetailed(mono, payload.sampleRate)
    };
  }).then(result=>mergeLocalAnalysis(result));
}
async function extractMonoWithFfmpeg(item, maxSeconds=72, sampleRate=16000, signal){
  const ffmpeg=await ensureFfmpegAnalysis();
  if(!ffmpeg) return null;
  const ab=await getItemArrayBuffer(item, signal, { timeoutMs:12000 });
  if(!ab) return null;
  const inputName=guessAnalysisInputName(item);
  const outputName=`analysis-${Date.now()}-${Math.random().toString(36).slice(2)}.pcm`;
  try{
    if(signal?.aborted) throw new DOMException('analysis aborted', 'AbortError');
    await ffmpeg.writeFile(inputName, new Uint8Array(ab), { signal });
    const exitCode=await Promise.race([
      ffmpeg.exec([
        '-ss','0',
        '-t', String(maxSeconds),
        '-i', inputName,
        '-vn',
        '-ac','1',
        '-ar', String(sampleRate),
        '-f','s16le',
        outputName
      ], 45000, { signal }),
      new Promise((_, reject)=>setTimeout(()=>reject(new Error('ffmpeg exec timeout')), 20000))
    ]);
    if(exitCode!==0) return null;
    const raw=await ffmpeg.readFile(outputName, 'binary', { signal });
    const pcm=raw instanceof Uint8Array ? raw : new Uint8Array(raw || []);
    if(!pcm.length) return null;
    const sampleCount=Math.floor(pcm.byteLength/2);
    const view=new Int16Array(pcm.buffer, pcm.byteOffset, sampleCount);
    const mono=new Float32Array(sampleCount);
    const chunk=8192;
    for(let i=0;i<sampleCount;i+=chunk){
      const end=Math.min(sampleCount, i+chunk);
      for(let j=i;j<end;j++) mono[j]=view[j]/32768;
      if(end<sampleCount) await nextAnalysisTick();
    }
    return { monoBuffer:mono.buffer, sampleRate, transfer:[mono.buffer], continuous:true };
  }catch(e){
    return null;
  }finally{
    try{ await ffmpeg.deleteFile(outputName, { signal }); }catch(e){}
    try{ await ffmpeg.deleteFile(inputName, { signal }); }catch(e){}
  }
}
function cancelScheduledPlaylistAnalysis(){
  if(playlistAnalysisTimer){
    clearTimeout(playlistAnalysisTimer);
    playlistAnalysisTimer=0;
  }
  if(playlistAnalysisIdleHandle){
    try{
      (window.cancelIdleCallback || clearTimeout)(playlistAnalysisIdleHandle);
    }catch(e){}
    playlistAnalysisIdleHandle=0;
  }
}
function markPlaylistAnalysisBusy(ms=2200){
  playlistAnalysisBlockUntil=Math.max(playlistAnalysisBlockUntil, Date.now()+Math.max(0, ms));
}
function shouldHoldBpmKeyAnalysis(){
  if($.loader?.classList.contains('show')) return true;
  if(state.dj.handoffPending || state.dj.active) return true;
  if(state.mediaKind==='html5' && !mediaPaused()) return true;
  return false;
}
function canRunPriorityAnalysisDuringPlayback(item){
  if(!item) return false;
  if(!isDesktopOnlyAnalysisMode()) return false;
  if(!canAnalyzeTrackItem(item)) return false;
  if($.loader?.classList.contains('show')) return false;
  if(state.dj.handoffPending) return false;
  return getAnalysisItemPriority(item) >= 2;
}
function shouldDeferPlaylistAnalysis(){
  if(playlistAnalysisRunning) return true;
  if(Date.now() < playlistAnalysisBlockUntil) return true;
  if(shouldHoldBpmKeyAnalysis()) return true;
  return false;
}
function isDirectAnalysisUrl(url=''){
  const raw=String(url||'').trim();
  if(!raw) return false;
  if(raw.startsWith('blob:')) return true;
  if(/^data:(audio|video)\//i.test(raw)) return true;
  if(isHls(raw) || isDash(raw) || isYouTube(raw) || isNiconico(raw) || isSoundCloud(raw)) return false;
  return /\.(mp3|wav|flac|ogg|oga|opus|m4a|aac|aif|aiff|mp4|m4v|webm|mov|mkv|avi|wmv|mpg|mpeg)(?:$|[?#])/i.test(raw);
}
function canAnalyzeTrackItem(item){
  if(!item) return false;
  if(item.file) return true;
  if(item.url) return isDirectAnalysisUrl(item.url);
  return false;
}
function cancelActiveTrackAnalysis(reason=''){
  const controller=activeAnalysisController;
  if(controller && !controller.signal.aborted){
    try{ controller.abort(reason || 'analysis-cancelled'); }catch(e){}
  }
}
function findNextBackgroundAnalysisItem(){
  const currentIndex=state.cur;
  const nextIndex=getNextTrackIndex();
  for(let i=0;i<state.list.length;i++){
    if(i===currentIndex || i===nextIndex) continue;
    const item=state.list[i];
    if(!item || hasCompletedTrackAnalysis(item) || item._bpmPromise) continue;
    return item;
  }
  return null;
}
function getAnalysisItemPriority(item){
  if(!item) return 0;
  if(item===state.list[state.cur]) return 3;
  const nextIndex=getNextTrackIndex();
  if(nextIndex>=0 && item===state.list[nextIndex]) return 2;
  return 1;
}
function pickQueuedAnalysisItem(now=Date.now()){
  let best=null;
  for(const item of state.list){
    if(!item || !item._analysisQueued || item._bpmPromise || hasCompletedTrackAnalysis(item)) continue;
    if((item._analysisDueAt || 0) > now) continue;
    if(!best){
      best=item;
      continue;
    }
    const bestPriority=best._analysisPriority || 0;
    const itemPriority=item._analysisPriority || 0;
    if(itemPriority > bestPriority){
      best=item;
      continue;
    }
    const bestDue=best._analysisDueAt || 0;
    const itemDue=item._analysisDueAt || 0;
    if(itemPriority===bestPriority && itemDue < bestDue){
      best=item;
    }
  }
  return best;
}
function getNextQueuedAnalysisDelay(now=Date.now()){
  let minDelay=Infinity;
  for(const item of state.list){
    if(!item || !item._analysisQueued || item._bpmPromise || hasCompletedTrackAnalysis(item)) continue;
    const dueAt=item._analysisDueAt || 0;
    minDelay=Math.min(minDelay, Math.max(0, dueAt-now));
  }
  return Number.isFinite(minDelay) ? minDelay : -1;
}
function scheduleQueuedAnalysisRun(delay=0){
  const wait=Math.max(0, delay);
  const targetAt=Date.now()+wait;
  if(analysisDispatchTimer && analysisDispatchDueAt && analysisDispatchDueAt <= targetAt){
    return;
  }
  if(analysisDispatchTimer){
    clearTimeout(analysisDispatchTimer);
    analysisDispatchTimer=0;
  }
  analysisDispatchDueAt=targetAt;
  analysisDispatchTimer=setTimeout(()=>{
    analysisDispatchTimer=0;
    analysisDispatchDueAt=0;
    runQueuedAnalysis().catch(()=>{});
  }, wait);
}
async function runQueuedAnalysis(){
  if(analysisRunningItem || Date.now() < analysisCooldownUntil){
    scheduleQueuedAnalysisRun(Math.max(180, analysisCooldownUntil-Date.now()));
    return;
  }
  const now=Date.now();
  const nextItem=pickQueuedAnalysisItem(now);
  if(!nextItem){
    const nextDelay=getNextQueuedAnalysisDelay(now);
    if(nextDelay>=0) scheduleQueuedAnalysisRun(nextDelay+80);
    return;
  }
  if(shouldHoldBpmKeyAnalysis() && !canRunPriorityAnalysisDuringPlayback(nextItem)){
    scheduleQueuedAnalysisRun(2200);
    return;
  }
  analysisRunningItem=nextItem;
  nextItem._analysisQueued=false;
  nextItem._analysisDueAt=0;
  nextItem._analysisPriority=0;
  try{
    await analyzeItemBpm(nextItem);
  }catch(e){}
  finally{
    analysisRunningItem=null;
    const cooldown=getAnalysisItemPriority(nextItem)>=2 ? 520 : 980;
    analysisCooldownUntil=Date.now()+cooldown;
  }
  if(pickQueuedAnalysisItem() || getNextQueuedAnalysisDelay()>=0){
    scheduleQueuedAnalysisRun(Math.max(200, analysisCooldownUntil-Date.now()));
  }
}
function schedulePlaylistBpmScan(delay=2200){
  cancelScheduledPlaylistAnalysis();
  playlistAnalysisTimer=setTimeout(()=>{
    playlistAnalysisTimer=0;
    const runner=window.requestIdleCallback
      ? (cb)=>window.requestIdleCallback(cb, { timeout:1800 })
      : (cb)=>setTimeout(()=>cb({ timeRemaining:()=>12, didTimeout:true }), 120);
    playlistAnalysisIdleHandle=runner(async()=>{
      playlistAnalysisIdleHandle=0;
      if(shouldDeferPlaylistAnalysis()){
        schedulePlaylistBpmScan(1600);
        return;
      }
      const item=findNextBackgroundAnalysisItem();
      if(!item) return;
      playlistAnalysisRunning=true;
      try{
        scheduleItemAnalysis(item, 0, { priority:1 });
      }catch(e){}
      finally{
        playlistAnalysisRunning=false;
      }
      if(findNextBackgroundAnalysisItem()){
        schedulePlaylistBpmScan(4200);
      }
    });
  }, Math.max(0, delay));
}
async function buildAnalysisMonoPayload(audioBuffer, maxSeconds=60, targetRate=16000){
  if(!audioBuffer) return null;
  const inputRate=audioBuffer.sampleRate||44100;
  const totalInputSamples=audioBuffer.length||0;
  const chCount=Math.min(2, audioBuffer.numberOfChannels||1);
  if(!totalInputSamples || !chCount) return null;
  const outputRate=Math.min(inputRate, targetRate);
  const totalDuration=totalInputSamples/inputRate;
  const segmentSec=Math.min(12, Math.max(8, maxSeconds/5));
  const segmentInputLen=Math.max(1, Math.floor(inputRate*segmentSec));
  const maxSegments=Math.max(1, Math.min(5, Math.floor(maxSeconds/segmentSec)));
  const anchors=[0.04,0.2,0.42,0.64,0.84];
  const starts=[];
  if(totalInputSamples<=segmentInputLen){
    starts.push(0);
  }else{
    for(let i=0;i<maxSegments;i++){
      const anchor=anchors[i] ?? (i/Math.max(1, maxSegments-1));
      const start=Math.max(0, Math.min(totalInputSamples-segmentInputLen, Math.floor((totalInputSamples-segmentInputLen)*anchor)));
      starts.push(start);
    }
  }
  const uniqueStarts=[...new Set(starts)];
  const ratio=inputRate/outputRate;
  const outputLength=Math.max(1, uniqueStarts.reduce((sum,start)=>{
    const inputLen=Math.min(segmentInputLen, totalInputSamples-start);
    return sum + Math.max(1, Math.floor(inputLen/ratio));
  }, 0));
  const mono=new Float32Array(outputLength);
  const channels=[];
  for(let ch=0; ch<chCount; ch++) channels.push(audioBuffer.getChannelData(ch));
  const chunk=4096;
  let outIndex=0;
  for(const start of uniqueStarts){
    const inputLen=Math.min(segmentInputLen, totalInputSamples-start);
    const segmentOutLen=Math.max(1, Math.floor(inputLen/ratio));
    for(let segOutStart=0; segOutStart<segmentOutLen; segOutStart+=chunk){
      const segOutEnd=Math.min(segmentOutLen, segOutStart+chunk);
      for(let segOut=segOutStart; segOut<segOutEnd; segOut++){
        const srcIndex=Math.min(totalInputSamples-1, start + Math.floor(segOut*ratio));
        let sum=0;
        for(let ch=0; ch<chCount; ch++){
          sum += channels[ch][srcIndex] || 0;
        }
        mono[outIndex++]=sum/chCount;
      }
      if(segOutEnd<segmentOutLen) await nextAnalysisTick();
    }
    if(outIndex<outputLength) await nextAnalysisTick();
  }
  const trimmed=(outIndex===mono.length) ? mono : mono.slice(0, outIndex);
  return { monoBuffer:trimmed.buffer, sampleRate:outputRate, transfer:[trimmed.buffer], continuous:false };
}
async function analyzeDecodedBufferDetailed(audioBuffer){
  const decodedCueInResult=estimateDjCueInFromDecodedAudioDetailed(audioBuffer);
  const decodedMixResult=estimateDjMixMetricsFromDecodedAudioDetailed(audioBuffer);
  const payload=await buildAnalysisMonoPayload(audioBuffer);
  if(!payload){
    return {
      bpmResult:{ bpm:0, confidence:0 },
      keyResult:{ key:'', confidence:0 },
      cueInResult:decodedCueInResult,
      mixResult:decodedMixResult,
      phraseResult:estimateDjPhraseMetricsFromDecodedAudioDetailed(audioBuffer, 0, decodedCueInResult?.cueIn || 0, decodedMixResult),
      beatAnchorResult:{ anchorSec:decodedCueInResult?.cueIn || 0, confidence:0 }
    };
  }
  let results=await runAnalysisWorkerDetailedFromPayload(payload);
  if((decodedCueInResult?.confidence || 0) > ((results?.cueInResult?.confidence || 0) + 0.04)){
    results={
      ...(results||{}),
      cueInResult:decodedCueInResult,
      mixResult:((decodedMixResult?.confidence || 0) >= ((results?.mixResult?.confidence || 0) - 0.02))
        ? decodedMixResult
        : (results?.mixResult || decodedMixResult)
    };
  }
  if((decodedMixResult?.confidence || 0) > ((results?.mixResult?.confidence || 0) + 0.04)){
    results={ ...(results||{}), mixResult:decodedMixResult };
  }
  results={ ...(results||{}), mixResult:results?.mixResult || decodedMixResult };
  const decodedPhraseResult=estimateDjPhraseMetricsFromDecodedAudioDetailed(
    audioBuffer,
    results?.bpmResult?.meterBpm || results?.bpmResult?.bpm || 0,
    results?.cueInResult?.cueIn || decodedCueInResult?.cueIn || 0,
    results?.mixResult || decodedMixResult
  );
  if((decodedPhraseResult?.confidence || 0) > ((results?.phraseResult?.confidence || 0) + 0.04)){
    results={ ...(results||{}), phraseResult:decodedPhraseResult };
  }else{
    results={ ...(results||{}), phraseResult:results?.phraseResult || decodedPhraseResult };
  }
  const decodedBeatAnchorResult=estimateBeatAnchorFromDecodedAudioDetailed(
    audioBuffer,
    results?.bpmResult?.meterBpm || results?.bpmResult?.bpm || 0,
    results?.cueInResult?.cueIn || decodedCueInResult?.cueIn || 0
  );
  if((decodedBeatAnchorResult?.confidence || 0) > ((results?.beatAnchorResult?.confidence || 0) + 0.04)){
    return { ...(results||{}), beatAnchorResult:decodedBeatAnchorResult };
  }
  return { ...(results||{}), beatAnchorResult:results?.beatAnchorResult || decodedBeatAnchorResult };
}
function hideAnalysisLoader(opts={}){
  try{
    const force=!!opts.force;
    if(analysisLoaderHideTimer){
      clearTimeout(analysisLoaderHideTimer);
      analysisLoaderHideTimer=0;
    }
    const wait=force ? 0 : Math.max(0, analysisLoaderHoldUntil-Date.now());
    if(wait>0){
      analysisLoaderHideTimer=setTimeout(()=>{
        analysisLoaderHideTimer=0;
        analysisLoaderHoldUntil=0;
        try{
          if($.analysisLoader){
            $.analysisLoader.classList.remove('show');
            $.analysisLoader.hidden=true;
          }
        }catch(e){}
      }, wait);
      return;
    }
    analysisLoaderHoldUntil=0;
    if($.analysisLoader){
      $.analysisLoader.classList.remove('show');
      $.analysisLoader.hidden=true;
    }
  }catch(e){}
}

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
function markUserGesture(){ state.triedOnce=true; state.lastUserGestureAt=Date.now(); forceUnmute(); unlockAudioCtx(); startUnmuteWatchdog(); debugLog('gesture', `paused=${$.v.paused?'1':'0'} ready=${$.v.readyState}`) }

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
  const vol=0.9; $.v.volume=vol; $.vol.value=vol;
  $.v.playbackRate=1.0; $.rate.value=$.v.playbackRate;
  if($.mixKey) $.mixKey.value='0';
  if(!Number.isFinite($.v.volume)||$.v.volume===0){ $.vol.value=0.8; $.v.volume=0.8 }
  try{ localStorage.removeItem('pc.vol'); localStorage.removeItem('pc.rate'); }catch(e){}
  $.contPlay.checked = state.contPlay;
  if ($.langSelect) { $.langSelect.value = state.lang; $.langSelect.addEventListener('change',e=>{ state.lang=e.target.value; store.set('pc.lang', state.lang) }) }
  applyAppAspect(store.get('pc.appAspect','16:9'));
  $.appAspect?.addEventListener('change',(e)=>applyAppAspect(e.target.value));
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
function ensureMetronomeGraph(){
  if(!state.audioCtx || !state.outGain) return null;
  if(!state.metronome.gainNode){
    const g=state.audioCtx.createGain();
    g.gain.value=1;
    g.connect(state.outGain);
    state.metronome.gainNode=g;
  }
  return state.metronome.gainNode;
}
function resetMetronomeSchedule(){
  state.metronome.nextBeatIndex=null;
  state.metronome.trackSig='';
  state.metronome.flashQueue.length=0;
}
function scheduleMetronomeClick(when, level=1){
  const ac=state.audioCtx;
  const bus=ensureMetronomeGraph();
  if(!ac || !bus || !state.metronome.enabled) return;
  const accentLevel=Math.max(0, level|0);
  const peak=clampValue((state.metronome.volume||0.24) * (accentLevel>=2 ? 1.12 : (accentLevel===1 ? 0.84 : 0.54)), 0.001, 0.92);
  const duration=accentLevel>=2 ? 0.05 : (accentLevel===1 ? 0.036 : 0.026);
  const osc=ac.createOscillator();
  const filter=ac.createBiquadFilter();
  const gain=ac.createGain();
  filter.type='highpass';
  filter.frequency.value=accentLevel>=2 ? 920 : (accentLevel===1 ? 760 : 640);
  osc.type=accentLevel>=2 ? 'triangle' : (accentLevel===1 ? 'square' : 'sine');
  osc.frequency.setValueAtTime(accentLevel>=2 ? 1760 : (accentLevel===1 ? 1320 : 1040), when);
  osc.frequency.exponentialRampToValueAtTime(accentLevel>=2 ? 1280 : (accentLevel===1 ? 980 : 760), when+duration);
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(peak, when+0.0025);
  gain.gain.exponentialRampToValueAtTime(0.0001, when+duration);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(bus);
  queueMetronomeFlash(when, accentLevel);
  osc.start(when);
  osc.stop(when+duration+0.012);
  osc.onended=()=>{
    try{ osc.disconnect() }catch(e){}
    try{ filter.disconnect() }catch(e){}
    try{ gain.disconnect() }catch(e){}
  };
}
function updateMetronomeScheduler(){
  if(!state.metronome.enabled || state.mediaKind!=='html5' || state.usingYouTube || state.usingIframe){
    resetMetronomeSchedule();
    return;
  }
  const bpm=getCurrentTrackMeterBpm() || getCurrentTrackBpm();
  if(!bpm || mediaPaused()){
    resetMetronomeSchedule();
    return;
  }
  ensureAudioGraph();
  const ac=state.audioCtx;
  const bus=ensureMetronomeGraph();
  if(!ac || !bus || ac.state!=='running') return;
  const currentItem=state.list[state.cur];
  const period=meterBeatPeriodSec(bpm);
  if(!period) return;
  const anchorSec=getItemBeatAnchorSec(currentItem);
  const mediaNow=Math.max(0, mediaCurrent());
  const mediaRate=Math.max(0.25, currentEffectiveRate());
  const division=getMetronomeSubdivisionDivisor();
  const stepPeriod=period/division;
  const beatFloat=(mediaNow-anchorSec)/stepPeriod;
  const desiredNext=Math.max(0, Math.floor(beatFloat+0.02)+1);
  const trackSig=`${state.cur}|${roundBpmValue(bpm, 2)}|${anchorSec.toFixed(3)}|${division}`;
  if(
    state.metronome.trackSig!==trackSig ||
    !Number.isFinite(state.metronome.nextBeatIndex) ||
    state.metronome.nextBeatIndex < desiredNext ||
    state.metronome.nextBeatIndex > (desiredNext + 1)
  ){
    state.metronome.trackSig=trackSig;
    state.metronome.nextBeatIndex=desiredNext;
  }
  const lookAheadCtx=0.16;
  const mediaLookAhead=lookAheadCtx*mediaRate;
  const nowCtx=ac.currentTime;
  while((anchorSec + (state.metronome.nextBeatIndex*stepPeriod)) <= (mediaNow + mediaLookAhead)){
    const beatMediaTime=anchorSec + (state.metronome.nextBeatIndex*stepPeriod);
    const deltaMedia=beatMediaTime-mediaNow;
    const when=nowCtx + Math.max(0, deltaMedia/mediaRate);
    const stepIndex=state.metronome.nextBeatIndex;
    const barStepLength=DJ_BEATS_PER_BAR*division;
    const level=(stepIndex % barStepLength)===0 ? 2 : ((stepIndex % division)===0 ? 1 : 0);
    scheduleMetronomeClick(when, level);
    state.metronome.nextBeatIndex++;
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
async function ensureAudioOn(){ try{ if(!state.audioCtx) state.audioCtx=new (window.AudioContext||window.webkitAudioContext)(); if(state.audioCtx.state==='suspended' && state.triedOnce) await state.audioCtx.resume().catch(()=>{}); if (state.triedOnce) forceUnmute(); debugLog('audio','ensure-ok'); }catch(e){ debugLog('audio', `ensure-fail ${e?.name||'Error'}`) } }
async function performPlayAttempt(){
  debugLog('performPlayAttempt', `ready=${$.v.readyState} src=${$.v.currentSrc ? '1' : '0'}`);
  clearPendingPause();
  const mobileVideoNative = shouldUseMobileVideoNativePlayback();
  const result = await OPPlayback.performPlayAttempt({
    media: $.v,
    ignoreAbortError: true,
    allowMutedFallback: true,
    ensureReady: async()=>{
      await ensureAudioOn();
      forceUnmute();
      safeVolumeBump();
    },
    beforePlay: ()=>{
      if(mobileVideoNative) return;
      try{ ensureAudioGraph(); rampTo(0,0.01); }catch(e){ forceUnmute(); }
    },
    afterRestore: ()=>{ forceUnmute(); },
    onPrimaryError: (err)=>{ debugLog('play()', `primary-fail ${err?.name||'Error'}`); }
  });
  debugLog('play()', result?.mode === 'muted-fallback' ? 'fallback-muted-ok' : 'primary-ok');
  if(!mobileVideoNative) rampTo(+($.master?.value||1),0.12);
  setPlayingUI(true);
  if(state.extAudio && !$.v.paused && state.extAudio.paused){ try{ await state.extAudio.play() }catch(e){} }
  enforceBackdropPolicy();
}
async function requestPlay(reason){
  debugLog('requestPlay', `${reason||'-'} kind=${state.mediaKind}`);
  if(state.mediaKind!=='html5'){ if(state.usingYouTube) try{state.yt?.playVideo?.()}catch(e){}; setPlayingUI(true); enforceBackdropPolicy(); return }
  if(OPPlayback.hasFreshGesture ? OPPlayback.hasFreshGesture(state.lastUserGestureAt, 4000) : (state.lastUserGestureAt && (Date.now()-state.lastUserGestureAt)<4000)){ return requestPlayImmediate(reason) }
  state.playDesired=true; const my=++state.playToken; clearTimeout(state.playDebounce);
  state.playDebounce=setTimeout(async()=>{
    if(my!==state.playToken||!state.playDesired) return;
    try{ await performPlayAttempt() }catch(err){ if(err?.name==='AbortError')return; toast('再生に失敗: '+(err?.name||'Error')+' '+(err?.message||''),'warn',5000) }
  },60)
}
async function requestPlayImmediate(reason){
  debugLog('requestPlayImmediate', `${reason||'-'} kind=${state.mediaKind}`);
  if(state.mediaKind!=='html5'){ return requestPlay(reason) }
  state.playDesired=true;
  state.playToken++;
  clearTimeout(state.playDebounce);
  clearPendingPause();
  try{ await performPlayAttempt() }catch(err){ if(err?.name==='AbortError')return; toast('再生に失敗: '+(err?.name||'Error')+' '+(err?.message||''),'warn',5000) }
}
function safePause(immediate=false, preserveDjDeck=false){ state.playDesired=false; state.playToken++; clearPendingPause(); if(!preserveDjDeck){ cleanupDjDeck(); applyDjRateMul(1); } if(state.usingYouTube){ try{state.yt?.pauseVideo?.()}catch(e){} setPlayingUI(false); enforceBackdropPolicy(); return } if(immediate || shouldUseMobileVideoNativePlayback()){ try{$.v.pause()}catch(e){} setPlayingUI(false); enforceBackdropPolicy(); return } try{ ensureAudioGraph(); rampTo(0,0.12); state.pauseTimer=setTimeout(()=>{ state.pauseTimer=null; try{$.v.pause()}catch(e){}; setPlayingUI(false); enforceBackdropPolicy() },130) }catch(e){ try{$.v.pause()}catch(e2){}; setPlayingUI(false); enforceBackdropPolicy() } }

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
  $.artWrap?.classList.add('no-art');
  if(prev && typeof prev==='string' && prev.startsWith('blob:')){ try{URL.revokeObjectURL(prev)}catch(e){} }
  state.lastCoverUrl=null;
  setMediaArtwork([]);
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
function artworkTypeFromUrl(url=''){
  const src = String(url || '');
  const m = src.match(/^data:(image\/[^;]+);/i);
  if(m) return m[1];
  if(/\.png(\?|$)/i.test(src)) return 'image/png';
  if(/\.webp(\?|$)/i.test(src)) return 'image/webp';
  if(/\.gif(\?|$)/i.test(src)) return 'image/gif';
  if(/\.svg(\?|$)/i.test(src)) return 'image/svg+xml';
  return 'image/jpeg';
}
function buildArtworkEntries(urls=[]){
  if(OPPlayback.buildArtworkEntries) return OPPlayback.buildArtworkEntries(urls, artworkTypeFromUrl);
  const uniq = [...new Set((urls||[]).filter(Boolean))].slice(0, 6);
  return uniq.map(src=>({ src, sizes:'512x512', type:artworkTypeFromUrl(src) }));
}
function setMediaArtwork(urls=[]){
  state.mediaArtwork = buildArtworkEntries(urls);
  state._updateMediaSession?.();
}
function isMobileLike(){
  return !!OPPlatform.isMobile;
}
function shouldUseMobileVideoNativePlayback(){
  return !!(
    state.mediaKind === 'html5' &&
    isMobileLike() &&
    !currentHtml5IsAudio()
  );
}
function shouldKeepBackgroundPlayback(){
  return !!(
    state.mediaKind === 'html5' &&
    !$.v.paused &&
    (
      isMobileLike() ||
      isStandalonePwa() ||
      store.get('pc.bg.allow', false)
    )
  );
}
function estimateBpmFromOnsets(onsets){
  if(!onsets || onsets.length<5) return { bpm:0, confidence:0 };
  const scores=new Map();
  let total=0;
  for(let i=1;i<onsets.length;i++){
    const dt=onsets[i]-onsets[i-1];
    if(dt<250 || dt>1500) continue;
    const bpm=foldBpm(60000/dt);
    if(!bpm) continue;
    const weight=1 + i/onsets.length;
    addBpmVote(scores, bpm, weight);
    total += weight;
  }
  if(!scores.size || !total) return { bpm:0, confidence:0 };
  let bestBpm=0, bestScore=0;
  scores.forEach((score,bpm)=>{
    if(score>bestScore){ bestScore=score; bestBpm=bpm; }
  });
  return { bpm:bestBpm, confidence:bestScore/total };
}
function updateEstimatedBeatPulse(nowMs){
  const bpmValue=getCurrentTrackMeterBpm() || getCurrentTrackBpm();
  state.bpm.current=bpmValue || 0;
  state.bpm.confidence=Math.max(+(state.list[state.cur]?._bpmConfidence || 0), +(state.list[state.cur]?._meterBpmConfidence || 0));
  if(!bpmValue || mediaPaused()){
    state.bpm.pulse=0;
    return;
  }
  const period=60000/Math.max(1, bpmValue);
  const mediaMs=Math.max(0, mediaCurrent()*1000);
  const anchorMs=Math.max(0, getCurrentTrackBeatAnchor()*1000);
  const phase=((((mediaMs-anchorMs)%period)+period)%period)/period;
  state.bpm.pulse=Math.pow(Math.max(0, 1-phase), 4.5);
}
function buildMonoMix(audioBuffer, maxSeconds=180){
  if(!audioBuffer) return null;
  const sampleRate=audioBuffer.sampleRate||44100;
  const maxSamples=Math.min(audioBuffer.length, Math.floor(sampleRate*maxSeconds));
  const chCount=Math.min(2, audioBuffer.numberOfChannels||1);
  if(!maxSamples || !chCount) return null;
  const mono=new Float32Array(maxSamples);
  for(let ch=0; ch<chCount; ch++){
    const src=audioBuffer.getChannelData(ch);
    for(let i=0;i<maxSamples;i++) mono[i]+=src[i]/chCount;
  }
  return { mono, sampleRate };
}
function measureMonoWindowDb(mono, start=0, end=mono?.length||0, maxSamples=220000){
  if(!mono?.length) return { db:0, peakDb:0 };
  const a=Math.max(0, Math.min(Math.max(0, mono.length-1), Math.floor(start)));
  const b=Math.max(a+1, Math.min(mono.length, Math.floor(end)));
  const len=Math.max(1, b-a);
  const step=Math.max(1, Math.floor(len/Math.max(1, maxSamples)));
  let sumSq=0;
  let peak=0;
  let count=0;
  for(let i=a;i<b;i+=step){
    const sample=+mono[i] || 0;
    const abs=Math.abs(sample);
    sumSq += sample*sample;
    if(abs>peak) peak=abs;
    count++;
  }
  if(!count) return { db:0, peakDb:0 };
  const rms=Math.sqrt(sumSq/count);
  return {
    db:rms>1e-5 ? (20*Math.log10(rms)) : -72,
    peakDb:peak>1e-5 ? (20*Math.log10(peak)) : -72
  };
}
function measureAudioBufferWindowDb(audioBuffer, startSec=0, durationSec=0, maxSamples=220000){
  if(!audioBuffer) return { db:0, peakDb:0 };
  const sampleRate=audioBuffer.sampleRate||44100;
  const totalSamples=audioBuffer.length||0;
  const chCount=Math.min(2, audioBuffer.numberOfChannels||1);
  if(!sampleRate || !totalSamples || !chCount) return { db:0, peakDb:0 };
  const startSample=Math.max(0, Math.min(totalSamples-1, Math.floor(Math.max(0, startSec)*sampleRate)));
  const requestedEnd=durationSec>0 ? (startSample + Math.floor(durationSec*sampleRate)) : totalSamples;
  const endSample=Math.max(startSample+1, Math.min(totalSamples, requestedEnd));
  const len=Math.max(1, endSample-startSample);
  const step=Math.max(1, Math.floor(len/Math.max(1, maxSamples)));
  const channels=[];
  for(let ch=0; ch<chCount; ch++) channels.push(audioBuffer.getChannelData(ch));
  let sumSq=0;
  let peak=0;
  let count=0;
  for(let i=startSample;i<endSample;i+=step){
    let sample=0;
    for(let ch=0; ch<chCount; ch++) sample += channels[ch][i] || 0;
    sample/=chCount;
    const abs=Math.abs(sample);
    sumSq += sample*sample;
    if(abs>peak) peak=abs;
    count++;
  }
  if(!count) return { db:0, peakDb:0 };
  const rms=Math.sqrt(sumSq/count);
  return {
    db:rms>1e-5 ? (20*Math.log10(rms)) : -72,
    peakDb:peak>1e-5 ? (20*Math.log10(peak)) : -72
  };
}
function estimateDjMixMetricsFromMonoDetailed(mono, sampleRate){
  if(!mono?.length || !sampleRate) return { loudness:0, headDb:0, tailDb:0, bodyDb:0, introQuietness:0, outroQuietness:0, confidence:0 };
  const totalSec=Math.max(0.1, mono.length/sampleRate);
  const headSec=Math.min(10, Math.max(4, totalSec*0.16));
  const tailSec=Math.min(10, Math.max(4, totalSec*0.16));
  const bodySec=Math.min(18, Math.max(8, totalSec*0.22));
  const bodyStartSec=Math.max(headSec, Math.min(Math.max(0, totalSec-bodySec), totalSec*0.42));
  const loudness=measureMonoWindowDb(mono, 0, mono.length);
  const head=measureMonoWindowDb(mono, 0, Math.min(mono.length, Math.floor(headSec*sampleRate)));
  const tail=measureMonoWindowDb(mono, Math.max(0, mono.length-Math.floor(tailSec*sampleRate)), mono.length);
  const body=measureMonoWindowDb(mono, Math.floor(bodyStartSec*sampleRate), Math.min(mono.length, Math.floor((bodyStartSec+bodySec)*sampleRate)));
  const introQuietness=clampValue((body.db-head.db)/12, 0, 1);
  const outroQuietness=clampValue((body.db-tail.db)/12, 0, 1);
  const confidence=clampValue(
    0.2 +
    (totalSec>18 ? 0.18 : 0.08) +
    (body.peakDb>-30 ? 0.16 : 0.08) +
    (head.peakDb>-42 ? 0.1 : 0) +
    (tail.peakDb>-42 ? 0.1 : 0) +
    Math.min(0.18, Math.abs(body.db-loudness.db)*0.02),
    0,
    0.94
  );
  return { loudness:loudness.db, headDb:head.db, tailDb:tail.db, bodyDb:body.db, introQuietness, outroQuietness, confidence };
}
function estimateDjMixMetricsFromDecodedAudioDetailed(audioBuffer){
  if(!audioBuffer) return { loudness:0, headDb:0, tailDb:0, bodyDb:0, introQuietness:0, outroQuietness:0, confidence:0 };
  const totalSec=Math.max(0.1, +audioBuffer.duration || 0);
  if(!totalSec) return { loudness:0, headDb:0, tailDb:0, bodyDb:0, introQuietness:0, outroQuietness:0, confidence:0 };
  const headSec=Math.min(10, Math.max(4, totalSec*0.12));
  const tailSec=Math.min(10, Math.max(4, totalSec*0.12));
  const bodySec=Math.min(18, Math.max(8, totalSec*0.18));
  const bodyStartSec=Math.max(headSec, Math.min(Math.max(0, totalSec-bodySec), totalSec*0.44));
  const loudness=measureAudioBufferWindowDb(audioBuffer, 0, totalSec);
  const head=measureAudioBufferWindowDb(audioBuffer, 0, headSec);
  const tail=measureAudioBufferWindowDb(audioBuffer, Math.max(0, totalSec-tailSec), tailSec);
  const body=measureAudioBufferWindowDb(audioBuffer, bodyStartSec, bodySec);
  const introQuietness=clampValue((body.db-head.db)/12, 0, 1);
  const outroQuietness=clampValue((body.db-tail.db)/12, 0, 1);
  const confidence=clampValue(
    0.28 +
    (totalSec>22 ? 0.2 : 0.1) +
    (body.peakDb>-30 ? 0.14 : 0.06) +
    (head.peakDb>-42 ? 0.08 : 0) +
    (tail.peakDb>-42 ? 0.08 : 0) +
    Math.min(0.16, Math.abs(body.db-loudness.db)*0.018),
    0,
    0.96
  );
  return { loudness:loudness.db, headDb:head.db, tailDb:tail.db, bodyDb:body.db, introQuietness, outroQuietness, confidence };
}
function normalizeDjEnergyRelativeDb(db, bodyDb){
  if(!Number.isFinite(db) || !Number.isFinite(bodyDb) || bodyDb >= 0) return 0.5;
  return clampValue((db-(bodyDb-12))/12, 0, 1);
}
function measureOnsetWindowLevel(onsetData, startSec=0, durationSec=0){
  if(!onsetData?.smooth?.length || !Number.isFinite(startSec) || !Number.isFinite(durationSec) || durationSec<=0) return { mean:0, peak:0 };
  const start=Math.max(0, Math.floor(startSec*onsetData.framesPerSec));
  const end=Math.min(onsetData.smooth.length, Math.max(start+1, Math.ceil((startSec+durationSec)*onsetData.framesPerSec)));
  let sum=0;
  let peak=0;
  let count=0;
  for(let i=start;i<end;i++){
    const v=+onsetData.smooth[i] || 0;
    sum += v;
    peak=Math.max(peak, v);
    count++;
  }
  return count ? { mean:sum/count, peak } : { mean:0, peak:0 };
}
function estimateDjPhraseMetricsFromMonoDetailed(mono, sampleRate, bpm, cueInSec=0, mixResult=null){
  const empty={ introBars:0, outroBars:0, entryEnergy:0.5, exitEnergy:0.5, energyDelta:0, confidence:0 };
  if(!mono?.length || !sampleRate) return empty;
  const baseMix=(mixResult && Number.isFinite(mixResult.bodyDb))
    ? mixResult
    : estimateDjMixMetricsFromMonoDetailed(mono, sampleRate);
  const bodyDb=Number.isFinite(baseMix?.bodyDb) ? baseMix.bodyDb : -18;
  const headDb=Number.isFinite(baseMix?.headDb) ? baseMix.headDb : bodyDb;
  const tailDb=Number.isFinite(baseMix?.tailDb) ? baseMix.tailDb : bodyDb;
  const entryEnergy=normalizeDjEnergyRelativeDb(headDb, bodyDb);
  const exitEnergy=normalizeDjEnergyRelativeDb(tailDb, bodyDb);
  const meterBpm=normalizeBpmRange(bpm, 45, 210);
  let introBars=clampValue(Math.round((baseMix?.introQuietness || 0)*8), 0, 16);
  let outroBars=clampValue(Math.round(((baseMix?.outroQuietness || 0)*7) + ((1-exitEnergy)*2)), 0, 16);
  let confidence=clampValue((baseMix?.confidence || 0)*0.64 + (meterBpm ? 0.12 : 0), 0, 0.92);
  if(meterBpm){
    const barSec=meterBeatPeriodSec(meterBpm)*DJ_BEATS_PER_BAR;
    const totalSec=Math.max(0.1, mono.length/sampleRate);
    if(Number.isFinite(barSec) && barSec>=0.8 && barSec<=12){
      const onsetData=buildOnsetAnalysisFromMono(mono, sampleRate);
      const safeCue=clampValue(+cueInSec || 0, 0, Math.max(0, totalSec-(barSec*0.5)));
      const refStart=Math.max(
        safeCue + barSec*2,
        Math.min(Math.max(0, totalSec-(barSec*4)), totalSec*0.36)
      );
      const refWindow=Math.min(barSec*2, Math.max(barSec, totalSec-refStart));
      const refOnset=measureOnsetWindowLevel(onsetData, refStart, refWindow).mean;
      const activeDbThreshold=bodyDb-2.35;
      const activeOnsetThreshold=refOnset>0 ? refOnset*0.58 : 0;
      let countedIntroBars=0;
      const maxIntroBars=Math.max(1, Math.min(12, Math.floor(Math.max(barSec, totalSec-safeCue)/barSec)));
      for(let bar=0; bar<maxIntroBars; bar++){
        const startSec=safeCue + bar*barSec;
        if(startSec>=totalSec) break;
        const durationSec=Math.min(barSec, totalSec-startSec);
        if(durationSec < barSec*0.42) break;
        const winDb=measureMonoWindowDb(mono, Math.floor(startSec*sampleRate), Math.min(mono.length, Math.floor((startSec+durationSec)*sampleRate))).db;
        const onsetLevel=measureOnsetWindowLevel(onsetData, startSec, durationSec).mean;
        const quietDb=winDb < activeDbThreshold;
        const quietOnset=activeOnsetThreshold>0 ? (onsetLevel < activeOnsetThreshold) : (winDb < bodyDb-1.75);
        if(quietDb || quietOnset) countedIntroBars++;
        else break;
      }
      introBars=clampValue(Math.max(introBars, countedIntroBars), 0, 16);
      confidence=clampValue(confidence + (onsetData ? 0.14 : 0) + Math.min(0.08, introBars*0.016), 0, 0.97);
    }
  }
  return {
    introBars,
    outroBars,
    entryEnergy,
    exitEnergy,
    energyDelta:clampValue(exitEnergy-entryEnergy, -1, 1),
    confidence
  };
}
function estimateDjPhraseMetricsFromDecodedAudioDetailed(audioBuffer, bpm, cueInSec=0, mixResult=null){
  const empty={ introBars:0, outroBars:0, entryEnergy:0.5, exitEnergy:0.5, energyDelta:0, confidence:0 };
  if(!audioBuffer) return empty;
  const mono=buildMonoMix(audioBuffer, 120);
  if(!mono) return {
    introBars:0,
    outroBars:0,
    entryEnergy:normalizeDjEnergyRelativeDb(mixResult?.headDb, mixResult?.bodyDb),
    exitEnergy:normalizeDjEnergyRelativeDb(mixResult?.tailDb, mixResult?.bodyDb),
    energyDelta:0,
    confidence:mixResult?.confidence || 0
  };
  return estimateDjPhraseMetricsFromMonoDetailed(
    mono.mono,
    mono.sampleRate,
    bpm,
    cueInSec,
    mixResult || estimateDjMixMetricsFromDecodedAudioDetailed(audioBuffer)
  );
}
function estimateDjCueInFromMonoDetailed(mono, sampleRate, opts={}){
  if(!mono?.length || !sampleRate) return { cueIn:0, confidence:0 };
  const scanSeconds=clampValue(+opts.scanSeconds || 20, 8, 28);
  const frameSeconds=clampValue(+opts.frameSeconds || 0.05, 0.03, 0.08);
  const maxSamples=Math.min(mono.length, Math.floor(sampleRate*scanSeconds));
  const frameSize=Math.max(256, Math.floor(sampleRate*frameSeconds));
  const frameCount=Math.floor(maxSamples/frameSize);
  if(frameCount<12) return { cueIn:0, confidence:0 };
  const energies=new Float32Array(frameCount);
  const onsets=new Float32Array(frameCount);
  let prevEnergy=0;
  for(let frame=0; frame<frameCount; frame++){
    const start=frame*frameSize;
    let energy=0;
    let flux=0;
    let prevAbs=start>0 ? Math.abs(mono[start-1] || 0) : 0;
    for(let i=0;i<frameSize;i++){
      const v=Math.abs(mono[start+i] || 0);
      energy += v;
      const diff=v-prevAbs;
      if(diff>0) flux += diff;
      prevAbs=v;
    }
    const normalizedEnergy=energy/frameSize;
    energies[frame]=normalizedEnergy;
    onsets[frame]=Math.max(0, normalizedEnergy-prevEnergy)*0.55 + (flux/frameSize)*0.45;
    prevEnergy=normalizedEnergy;
  }
  let sumEnergy=0, maxEnergy=0, sumOnset=0;
  for(let i=0;i<frameCount;i++){
    sumEnergy += energies[i];
    maxEnergy=Math.max(maxEnergy, energies[i]);
    sumOnset += onsets[i];
  }
  if(maxEnergy<=1e-5) return { cueIn:0, confidence:0 };
  const avgEnergy=sumEnergy/frameCount;
  const avgOnset=sumOnset/frameCount;
  const baseThreshold=Math.max(avgEnergy*1.45, maxEnergy*0.18, 0.008);
  const onsetThreshold=Math.max(avgOnset*1.8, 0.004);
  const sustainFrames=Math.max(2, Math.round(0.18/frameSeconds));
  let bestFrame=-1;
  let bestScore=0;
  for(let i=0;i<=frameCount-sustainFrames;i++){
    let sustainEnergy=0;
    let sustainOnset=0;
    for(let j=0;j<sustainFrames;j++){
      sustainEnergy += energies[i+j];
      sustainOnset += onsets[i+j];
    }
    sustainEnergy/=sustainFrames;
    sustainOnset/=sustainFrames;
    const earlyPenalty=i<=1 ? 0.82 : 1;
    const energyScore=sustainEnergy/Math.max(baseThreshold, 1e-6);
    const onsetScore=sustainOnset/Math.max(onsetThreshold, 1e-6);
    const score=(energyScore*0.72 + onsetScore*0.28)*earlyPenalty;
    if(score>1.02 && score>bestScore){
      bestScore=score;
      bestFrame=i;
      if(i<=Math.max(2, Math.round(0.35/frameSeconds)) && score>1.45) break;
    }
  }
  if(bestFrame<0) return { cueIn:0, confidence:0 };
  let cueIn=Math.max(0, bestFrame*frameSeconds - 0.04);
  if(cueIn<0.12) cueIn=0;
  const confidence=clampValue((bestScore-1)*0.58 + Math.min(0.28, maxEnergy>avgEnergy*2.2 ? 0.16 : 0.08), 0, 0.96);
  return { cueIn, confidence };
}
function estimateDjCueInFromDecodedAudioDetailed(audioBuffer){
  const mix=buildMonoMix(audioBuffer, 24);
  if(!mix) return { cueIn:0, confidence:0 };
  return estimateDjCueInFromMonoDetailed(mix.mono, mix.sampleRate, { scanSeconds:24 });
}
function summarizeWeightedVotes(votes, fallbackValue=0){
  let total=0, bestValue=fallbackValue, bestScore=0, secondScore=0;
  votes.forEach((score, value)=>{
    total += score;
    if(score>bestScore){
      secondScore=bestScore;
      bestScore=score;
      bestValue=+value;
    }else if(score>secondScore){
      secondScore=score;
    }
  });
  const dominance=bestScore>0 ? (bestScore-secondScore)/bestScore : 0;
  const share=total>0 ? bestScore/total : 0;
  return {
    value:bestValue||fallbackValue||0,
    confidence:clampValue(share*0.7 + dominance*0.3, 0, 0.99),
    total, bestScore, secondScore
  };
}
function estimateBpmFromMono(mono, sampleRate){
  if(!mono?.length || !sampleRate) return 0;
  return estimateBpmFromMonoDetailed(mono, sampleRate).bpm;
}
function buildOnsetAnalysisFromMono(mono, sampleRate){
  if(!mono?.length || !sampleRate) return null;
  const hop=256;
  const win=1024;
  const env=[];
  let prevFrameEnergy=0;
  for(let i=0;i+win<mono.length;i+=hop){
    let sum=0;
    let flux=0;
    for(let j=0;j<win;j++){
      const s=mono[i+j];
      sum += Math.abs(s);
      if(j){
        const diff=Math.abs(s)-Math.abs(mono[i+j-1]);
        if(diff>0) flux += diff;
      }
    }
    const energy=sum/win;
    const onset=Math.max(0, energy-prevFrameEnergy)*0.45 + (flux/win)*0.55;
    env.push(onset);
    prevFrameEnergy=energy;
  }
  if(env.length<48) return null;
  const smooth=new Float32Array(env.length);
  for(let i=0;i<env.length;i++){
    let local=0,count=0;
    for(let k=Math.max(0,i-8);k<=Math.min(env.length-1,i+8);k++){ local+=env[k]; count++; }
    smooth[i]=Math.max(0, env[i] - (local/Math.max(1,count))*0.92);
  }
  const peakIdx=[];
  for(let i=1;i<smooth.length-1;i++){
    const v=smooth[i];
    if(v<=smooth[i-1] || v<smooth[i+1]) continue;
    let local=0,count=0, sq=0;
    for(let k=Math.max(0,i-12);k<=Math.min(smooth.length-1,i+12);k++){
      local+=smooth[k]; sq+=smooth[k]*smooth[k]; count++;
    }
    const mean=local/Math.max(1,count);
    const variance=Math.max(0, sq/Math.max(1,count)-mean*mean);
    const threshold=mean + Math.sqrt(variance)*0.45;
    if(v>Math.max(0.008, threshold)) peakIdx.push(i);
  }
  const rankedPeakIdx=peakIdx.slice().sort((a,b)=>(smooth[b]||0)-(smooth[a]||0)).slice(0, 96);
  return {
    hop,
    win,
    smooth,
    peakIdx,
    rankedPeakIdx,
    framesPerSec:sampleRate/hop
  };
}
function getInterpolatedSeriesValue(series, index){
  if(!series?.length) return 0;
  if(index<=0) return +series[0] || 0;
  const maxIndex=series.length-1;
  if(index>=maxIndex) return +series[maxIndex] || 0;
  const base=Math.floor(index);
  const frac=index-base;
  const a=+series[base] || 0;
  const b=+series[Math.min(maxIndex, base+1)] || 0;
  return a + ((b-a)*frac);
}
function getNormalizedLagCorrelation(series, lag){
  if(!series?.length || !Number.isFinite(lag) || lag<1) return 0;
  const maxIndex=series.length-1;
  const end=Math.floor(maxIndex-lag);
  if(end<2) return 0;
  let num=0, denA=0, denB=0;
  for(let i=0;i<=end;i++){
    const a=+series[i] || 0;
    const b=getInterpolatedSeriesValue(series, i+lag);
    num += a*b;
    denA += a*a;
    denB += b*b;
  }
  if(denA<=1e-9 || denB<=1e-9) return 0;
  return clampValue(num/Math.sqrt(denA*denB), 0, 1);
}
function estimateBeatAnchorFromOnsetData(onsetData, bpm, cueInSec=0){
  if(!onsetData?.smooth?.length || !bpm) return { anchorSec:Math.max(0, +cueInSec || 0), confidence:0, fitScore:0 };
  const periodFrames=onsetData.framesPerSec*60/Math.max(1, +bpm || 0);
  if(!Number.isFinite(periodFrames) || periodFrames<2) return { anchorSec:Math.max(0, +cueInSec || 0), confidence:0, fitScore:0 };
  const cueFrame=Math.max(0, (+cueInSec || 0) * onsetData.framesPerSec);
  const tolerance=Math.max(1.6, periodFrames*0.13);
  const peaks=(onsetData.rankedPeakIdx?.length ? onsetData.rankedPeakIdx : onsetData.peakIdx || []).filter(idx=>idx>=Math.max(0, cueFrame-(periodFrames*0.9)));
  const phases=[];
  const phaseKeys=new Set();
  const pushPhase=(frame)=>{
    const phase=((frame%periodFrames)+periodFrames)%periodFrames;
    const key=Math.round(phase*4);
    if(phaseKeys.has(key)) return;
    phaseKeys.add(key);
    phases.push(phase);
  };
  if(cueFrame>0) pushPhase(cueFrame);
  peaks.slice(0, 28).forEach(pushPhase);
  if(!phases.length) phases.push(0);
  const modDistance=(value, period)=>{
    const pos=((value%period)+period)%period;
    return Math.min(pos, period-pos);
  };
  let bestPhase=phases[0] || 0;
  let bestScore=0;
  let secondScore=0;
  let bestMatchRatio=0;
  for(const phase of phases){
    let weightedScore=0;
    let weightedTotal=0;
    let matchedWeight=0;
    for(const idx of peaks.slice(0, 64)){
      const weight=+onsetData.smooth[idx] || 0;
      if(weight<=0) continue;
      const dist=modDistance(idx-phase, periodFrames);
      const closeness=Math.max(0, 1-(dist/tolerance));
      weightedScore += weight*closeness;
      weightedTotal += weight;
      if(closeness>=0.72) matchedWeight += weight;
    }
    let phaseScore=weightedTotal>0 ? (weightedScore/weightedTotal) : 0;
    if(cueFrame>0){
      const cueDist=modDistance(cueFrame-phase, periodFrames);
      const cueBias=Math.max(0, 1-(cueDist/Math.max(1.6, periodFrames*0.22)));
      phaseScore=(phaseScore*0.88) + (cueBias*0.12);
    }
    if(phaseScore>bestScore){
      secondScore=bestScore;
      bestScore=phaseScore;
      bestPhase=phase;
      bestMatchRatio=weightedTotal>0 ? (matchedWeight/weightedTotal) : 0;
    }else if(phaseScore>secondScore){
      secondScore=phaseScore;
    }
  }
  let anchorFrame=bestPhase;
  if(cueFrame>0){
    const approxIndex=Math.floor((cueFrame-bestPhase + (periodFrames*0.22))/periodFrames);
    anchorFrame=bestPhase + Math.max(0, approxIndex)*periodFrames;
    while(anchorFrame + (periodFrames*0.22) < cueFrame) anchorFrame += periodFrames;
    while(anchorFrame - (periodFrames*0.78) > cueFrame) anchorFrame -= periodFrames;
  }
  const corr1=getNormalizedLagCorrelation(onsetData.smooth, periodFrames);
  const corr2=getNormalizedLagCorrelation(onsetData.smooth, periodFrames*2)*0.78;
  const fitScore=clampValue((bestScore*0.72) + (corr1*0.22) + (corr2*0.06), 0, 1);
  const separation=bestScore>0 ? (bestScore-secondScore)/bestScore : 0;
  const confidence=clampValue((fitScore*0.68) + (separation*0.18) + Math.min(0.14, bestMatchRatio*0.14), 0, 0.98);
  return {
    anchorSec:Math.max(0, anchorFrame/onsetData.framesPerSec),
    confidence,
    fitScore
  };
}
function resolveMeterBpmFromOnsetData(onsetData, djBpm, djConfidence=0){
  const base=bucketBpm(normalizeBpmRange(djBpm, 45, 210));
  if(!base || !onsetData) return { bpm:0, confidence:0 };
  const scored=collectMeterBpmCandidates(base)
    .map(candidate=>{
      const anchor=estimateBeatAnchorFromOnsetData(onsetData, candidate, 0);
      return { bpm:candidate, ...anchor };
    })
    .sort((a,b)=>b.fitScore-a.fitScore);
  const baseEntry=findClosestBpmEntry(scored, base) || scored[0] || { bpm:base, confidence:0, fitScore:0 };
  const halfEntry=base>=96 ? findClosestBpmEntry(scored, bucketBpm(base/2)) : null;
  const doubleEntry=base<=104 ? findClosestBpmEntry(scored, bucketBpm(base*2)) : null;
  let best=baseEntry;
  if(halfEntry && (halfEntry.fitScore >= (baseEntry.fitScore*0.9) || (base>=128 && halfEntry.fitScore >= (baseEntry.fitScore*0.82)))){
    best=halfEntry;
  }else if(doubleEntry && doubleEntry.fitScore > (baseEntry.fitScore*1.16)){
    best=doubleEntry;
  }else if(scored[0] && scored[0].fitScore > (baseEntry.fitScore*1.12)){
    best=scored[0];
  }
  return {
    bpm:bucketBpm(best?.bpm || base),
    confidence:clampValue(Math.max((+djConfidence || 0)*0.72, best?.confidence || 0), 0, 0.99),
    fitScore:best?.fitScore || 0
  };
}
function estimateBeatAnchorFromMonoDetailed(mono, sampleRate, bpm, cueInSec=0){
  if(!mono?.length || !sampleRate || !bpm) return { anchorSec:Math.max(0, +cueInSec || 0), confidence:0 };
  const onsetData=buildOnsetAnalysisFromMono(mono, sampleRate);
  if(!onsetData) return { anchorSec:Math.max(0, +cueInSec || 0), confidence:0 };
  return estimateBeatAnchorFromOnsetData(onsetData, bpm, cueInSec);
}
function estimateBeatAnchorFromDecodedAudioDetailed(audioBuffer, bpm, cueInSec=0){
  if(!audioBuffer || !bpm) return { anchorSec:Math.max(0, +cueInSec || 0), confidence:0 };
  const mix=buildMonoMix(audioBuffer, 72);
  if(!mix) return { anchorSec:Math.max(0, +cueInSec || 0), confidence:0 };
  return estimateBeatAnchorFromMonoDetailed(mix.mono, mix.sampleRate, bpm, cueInSec);
}
function estimateBpmFromMonoDetailed(mono, sampleRate){
  const onsetData=buildOnsetAnalysisFromMono(mono, sampleRate);
  if(!onsetData) return { bpm:0, meterBpm:0, confidence:0, meterConfidence:0, beatAnchorSec:0, beatAnchorConfidence:0 };
  const { smooth, peakIdx, framesPerSec }=onsetData;
  const scores=new Map();
  for(let i=0;i<peakIdx.length;i++){
    for(let j=i+1;j<Math.min(peakIdx.length, i+6);j++){
      const dt=(peakIdx[j]-peakIdx[i])/framesPerSec;
      if(dt<0.22 || dt>2.4) continue;
      const bpm=foldBpm(60/dt);
      if(!bpm) continue;
      const weight=(6-(j-i)) * smooth[peakIdx[i]];
      addBpmVote(scores, bpm, weight);
    }
  }
  const corrScores=new Map();
  const minLag=Math.floor(framesPerSec*60/180);
  const maxLag=Math.ceil(framesPerSec*60/72);
  let bestLag=0, corrBest=0;
  for(let lag=minLag;lag<=maxLag;lag++){
    let score=0;
    for(let i=0;i<smooth.length-lag;i++) score += smooth[i]*smooth[i+lag];
    if(score>0){
      addBpmVote(corrScores, foldBpm((60*framesPerSec)/lag), score);
    }
    if(score>corrBest){ corrBest=score; bestLag=lag; }
  }
  corrScores.forEach((score,bpm)=>{
    addBpmVote(scores, bpm, score*0.35);
  });
  const summary=summarizeWeightedVotes(scores, bestLag ? bucketBpm(foldBpm((60*framesPerSec)/bestLag)) : 0);
  const djBpm=refineBpmFromVotes(scores, summary.value || 0) || summary.value || 0;
  const djConfidence=djBpm ? clampValue(summary.confidence + (peakIdx.length>10 ? 0.08 : 0), 0, 0.98) : 0;
  const meterResult=resolveMeterBpmFromOnsetData(onsetData, djBpm, djConfidence);
  const beatAnchorResult=estimateBeatAnchorFromOnsetData(onsetData, meterResult.bpm || djBpm, 0);
  return {
    bpm:djBpm,
    meterBpm:meterResult.bpm || djBpm || 0,
    confidence:djConfidence,
    meterConfidence:meterResult.confidence || djConfidence || 0,
    beatAnchorSec:beatAnchorResult.anchorSec || 0,
    beatAnchorConfidence:beatAnchorResult.confidence || 0
  };
}
function estimateBpmFromDecodedAudio(audioBuffer){
  const details=estimateBpmFromDecodedAudioDetailed(audioBuffer);
  return details.bpm;
}
function estimateBpmFromDecodedAudioDetailed(audioBuffer){
  const mix=buildMonoMix(audioBuffer, 180);
  if(!mix) return { bpm:0, meterBpm:0, confidence:0, meterConfidence:0, beatAnchorSec:0, beatAnchorConfidence:0 };
  const { mono, sampleRate } = mix;
  const segmentSec=30;
  const segmentLen=Math.floor(sampleRate*segmentSec);
  const votes=new Map();
  const meterVotes=new Map();
  const starts=[0];
  if(mono.length > segmentLen*1.5){
    starts.push(Math.max(0, Math.floor((mono.length-segmentLen)/2)));
  }
  if(mono.length > segmentLen*2){
    starts.push(Math.max(0, mono.length-segmentLen));
  }
  starts.push(Math.max(0, Math.floor(mono.length*0.18)));
  starts.push(Math.max(0, Math.floor(mono.length*0.58)));
  const uniqueStarts=[...new Set(starts)].filter(start=>start+Math.floor(sampleRate*16) < mono.length);
  uniqueStarts.forEach(start=>{
    const slice=mono.subarray(start, Math.min(mono.length, start+segmentLen));
    const { bpm, meterBpm, confidence, meterConfidence }=estimateBpmFromMonoDetailed(slice, sampleRate);
    if(!bpm) return;
    const weight=Math.max(0.2, confidence || 0.2);
    addBpmVote(votes, bpm, weight);
    for(const alt of [bpm-0.4, bpm-0.2, bpm+0.2, bpm+0.4]){
      if(alt>70 && alt<181) addBpmVote(votes, alt, weight*(Math.abs(alt-bpm)<=0.2 ? 0.2 : 0.12));
    }
    if(meterBpm){
      const meter=bucketBpm(normalizeBpmRange(meterBpm, 45, 210));
      const meterWeight=Math.max(0.2, meterConfidence || confidence || 0.2);
      addBpmVote(meterVotes, meter, meterWeight);
      for(const alt of [meter-0.4, meter-0.2, meter+0.2, meter+0.4]){
        if(alt>=45 && alt<=210) addBpmVote(meterVotes, alt, meterWeight*(Math.abs(alt-meter)<=0.2 ? 0.2 : 0.12));
      }
    }
  });
  if(!votes.size) return estimateBpmFromMonoDetailed(mono, sampleRate);
  const fallback=estimateBpmFromMonoDetailed(mono, sampleRate);
  const summary=summarizeWeightedVotes(votes, fallback.bpm);
  const meterSummary=meterVotes.size
    ? summarizeWeightedVotes(meterVotes, fallback.meterBpm || fallback.bpm)
    : null;
  const refinedBpm=refineBpmFromVotes(votes, summary.value || fallback.bpm, 1.2) || summary.value || fallback.bpm || 0;
  const refinedMeterBpm=meterSummary
    ? (refineBpmFromVotes(meterVotes, meterSummary.value || fallback.meterBpm || fallback.bpm, 1.2) || meterSummary.value || fallback.meterBpm || fallback.bpm || 0)
    : (fallback.meterBpm || fallback.bpm || 0);
  return {
    ...fallback,
    bpm:refinedBpm,
    confidence:clampValue(Math.max(fallback.confidence*0.72, summary.confidence), 0, 0.99),
    meterBpm:refinedMeterBpm,
    meterConfidence:clampValue(Math.max((fallback.meterConfidence||0)*0.72, meterSummary?.confidence || 0), 0, 0.99)
  };
}
function goertzelEnergy(frame, freq, sampleRate){
  const N=frame.length;
  if(!N || !freq || freq>=sampleRate*0.5) return 0;
  const k=Math.round((N*freq)/sampleRate);
  const w=(2*Math.PI*k)/N;
  const cosine=Math.cos(w);
  const coeff=2*cosine;
  let q0=0,q1=0,q2=0;
  for(let i=0;i<N;i++){
    q0=coeff*q1-q2+frame[i];
    q2=q1;
    q1=q0;
  }
  return q1*q1 + q2*q2 - coeff*q1*q2;
}
function estimateKeyFromMono(mono, sampleRate){
  if(!mono?.length || !sampleRate) return '';
  return estimateKeyFromMonoDetailed(mono, sampleRate).key;
}
function estimateKeyFromMonoDetailed(mono, sampleRate){
  if(!mono?.length || !sampleRate) return { key:'', confidence:0 };
  const frameSize=4096;
  const hop=4096;
  const chroma=new Float64Array(12);
  const notes=[];
  for(let midi=36;midi<=95;midi++){
    notes.push({ pc:midi%12, freq:440*Math.pow(2,(midi-69)/12) });
  }
  const window=new Float32Array(frameSize);
  for(let start=0; start+frameSize<mono.length; start+=hop){
    let rms=0;
    for(let i=0;i<frameSize;i++){
      const w=0.5*(1-Math.cos((2*Math.PI*i)/(frameSize-1)));
      const s=mono[start+i]*w;
      window[i]=s;
      rms += s*s;
    }
    rms=Math.sqrt(rms/frameSize);
    if(rms<0.01) continue;
    for(const note of notes){
      const fundamental=goertzelEnergy(window, note.freq, sampleRate);
      const harmonic2=goertzelEnergy(window, note.freq*2, sampleRate)*0.54;
      const harmonic3=goertzelEnergy(window, note.freq*3, sampleRate)*0.28;
      chroma[note.pc] += fundamental + harmonic2 + harmonic3;
    }
  }
  const major=[6.35,2.23,3.48,2.33,4.38,4.09,2.52,5.19,2.39,3.66,2.29,2.88];
  const minor=[6.33,2.68,3.52,5.38,2.6,3.53,2.54,4.75,3.98,2.69,3.34,3.17];
  let bestScore=-Infinity, secondScore=-Infinity, bestName='';
  const total=Array.from(chroma).reduce((a,b)=>a+b,0);
  if(total<=0) return { key:'', confidence:0 };
  const normalized=Array.from(chroma).map(v=>v/total);
  const majorNorm=Math.sqrt(major.reduce((a,b)=>a+b*b,0));
  const minorNorm=Math.sqrt(minor.reduce((a,b)=>a+b*b,0));
  const sliceNorm=(arr, root)=>Math.sqrt(arr.reduce((acc,_,i)=>{
    const idx=(i+root)%12;
    return acc + arr[idx]*arr[idx];
  },0));
  for(let root=0;root<12;root++){
    let majorScore=0, minorScore=0;
    for(let i=0;i<12;i++){
      const idx=(i+root)%12;
      majorScore += normalized[idx]*major[i];
      minorScore += normalized[idx]*minor[i];
    }
    majorScore /= Math.max(1e-6, sliceNorm(normalized, root) * majorNorm);
    minorScore /= Math.max(1e-6, sliceNorm(normalized, root) * minorNorm);
    if(majorScore>bestScore){
      secondScore=bestScore;
      bestScore=majorScore;
      bestName=formatTrackKey(root, 'major');
    }else if(majorScore>secondScore){
      secondScore=majorScore;
    }
    if(minorScore>bestScore){
      secondScore=bestScore;
      bestScore=minorScore;
      bestName=formatTrackKey(root, 'minor');
    }else if(minorScore>secondScore){
      secondScore=minorScore;
    }
  }
  const separation=Math.max(0, bestScore-secondScore);
  const confidence=clampValue(((bestScore-0.58)*1.3) + (separation*1.6), 0, 0.99);
  return { key:bestName, confidence };
}
function estimateKeyFromDecodedAudio(audioBuffer){
  const details=estimateKeyFromDecodedAudioDetailed(audioBuffer);
  return details.key;
}
function estimateKeyFromDecodedAudioDetailed(audioBuffer){
  const mix=buildMonoMix(audioBuffer, 120);
  if(!mix) return { key:'', confidence:0 };
  const { mono, sampleRate } = mix;
  const segmentSec=24;
  const segmentLen=Math.floor(sampleRate*segmentSec);
  const starts=[0, Math.max(0, Math.floor(mono.length*0.16)), Math.max(0, Math.floor((mono.length-segmentLen)/2)), Math.max(0, Math.floor(mono.length*0.62)), Math.max(0, mono.length-segmentLen)];
  const votes=new Map();
  for(const start of [...new Set(starts)]){
    const slice=mono.subarray(start, Math.min(mono.length, start+segmentLen));
    if(slice.length < sampleRate*8) continue;
    const { key, confidence }=estimateKeyFromMonoDetailed(slice, sampleRate);
    if(key) votes.set(key, (votes.get(key)||0) + Math.max(0.2, confidence || 0.2));
  }
  const fallback=estimateKeyFromMonoDetailed(mono, sampleRate);
  if(!votes.size) return fallback;
  const summary=summarizeWeightedVotes(votes, 0);
  let best=fallback.key, score=0, total=0, second=0;
  votes.forEach((s,key)=>{
    total += s;
    if(s>score){
      second=score;
      score=s;
      best=key;
    }else if(s>second){
      second=s;
    }
  });
  const share=total>0 ? score/total : 0;
  const dominance=score>0 ? (score-second)/score : 0;
  return {
    key:best || fallback.key || '',
    confidence:clampValue(Math.max(fallback.confidence*0.72, share*0.68 + dominance*0.32), 0, 0.99)
  };
}
async function getItemArrayBuffer(item, signal, opts={}){
  if(item?.file) return await item.file.arrayBuffer();
  if(!item?.url || !canAnalyzeTrackItem(item)) return null;
  const timeoutMs=Math.max(2000, +opts.timeoutMs || 12000);
  const controller=new AbortController();
  const cleanup=()=>{
    clearTimeout(timer);
    signal?.removeEventListener?.('abort', onAbort);
  };
  const onAbort=()=>controller.abort(signal?.reason || 'analysis-abort');
  if(signal?.aborted) controller.abort(signal.reason || 'analysis-abort');
  else signal?.addEventListener?.('abort', onAbort, { once:true });
  const timer=setTimeout(()=>controller.abort('analysis-fetch-timeout'), timeoutMs);
  try{
    const res=await fetch(item.url,{ mode:'cors', signal:controller.signal, cache:'no-store' });
    if(!res.ok) throw new Error('bpm fetch failed');
    return await res.arrayBuffer();
  }finally{
    cleanup();
  }
}
function scheduleItemAnalysis(item, delay=0, opts={}){
  if(!item || hasCompletedTrackAnalysis(item) || item._bpmPromise) return;
  const priority=Math.max(1, +opts.priority || getAnalysisItemPriority(item));
  const dueAt=Date.now()+Math.max(0, delay);
  item._analysisDone=false;
  item._analysisQueued=true;
  item._analysisPriority=Math.max(priority, item._analysisPriority || 0);
  item._analysisDueAt=item._analysisDueAt ? Math.min(item._analysisDueAt, dueAt) : dueAt;
  if(item._analysisTimer){
    clearTimeout(item._analysisTimer);
    item._analysisTimer=0;
  }
  scheduleQueuedAnalysisRun(Math.max(40, Math.min(600, dueAt-Date.now())));
}
async function analyzeItemBpm(item){
  if(!item || item._bpmPromise) return item?._bpmPromise || null;
  if(hasCompletedTrackAnalysis(item)) return item._bpm;
  item._bpmPromise=(async()=>{
    let ownCtx=null;
    const controller=new AbortController();
    const currentAnalysis = state.list[state.cur]===item;
    const uiToken = currentAnalysis ? (++analysisLoaderToken) : 0;
    item._analysisUnsupported=false;
    item._analysisAbortController=controller;
    activeAnalysisController=controller;
    try{
      if(!canAnalyzeTrackItem(item)){
        item._bpm=0;
        item._meterBpm=0;
        item._key='';
        item._bpmConfidence=0;
        item._meterBpmConfidence=0;
        item._keyConfidence=0;
        item._djCueIn=0;
        item._djCueInConfidence=0;
        item._beatAnchorSec=0;
        item._beatAnchorConfidence=0;
        item._djLoudness=0;
        item._djHeadDb=0;
        item._djTailDb=0;
        item._djBodyDb=0;
        item._djMixConfidence=0;
        item._djIntroBars=0;
        item._djOutroBars=0;
        item._djEntryEnergy=0.5;
        item._djExitEnergy=0.5;
        item._djPhraseConfidence=0;
        item._analysisDone=true;
        item._analysisUnsupported=true;
        if(state.list[state.cur]===item) updateDjReadouts();
        return 0;
      }
      item._analysisDone=false;
      if(currentAnalysis) showAnalysisLoader('BPM / Key 解析中…', { minMs:420 });
      let results=null;
      if(isDesktopOnlyAnalysisMode()){
        const wasmPayload=await extractMonoWithFfmpeg(item, 72, 16000, controller.signal);
        if(wasmPayload){
          results=await runAnalysisWorkerDetailedFromPayload(wasmPayload);
        }
      }
      if(!results){
        const ab=await getItemArrayBuffer(item, controller.signal, { timeoutMs:12000 });
        if(!ab) return 0;
        const Ctx=window.AudioContext||window.webkitAudioContext;
        const ctx=state.audioCtx || (ownCtx=new Ctx());
        item._decodedBuffer=null;
        const decoded=await ctx.decodeAudioData(ab.slice(0));
        results=await analyzeDecodedBufferDetailed(decoded);
      }
      const {
        bpmResult,
        keyResult,
        cueInResult,
        mixResult,
        phraseResult,
        beatAnchorResult
      }=results || {
        bpmResult:{ bpm:0, confidence:0 },
        keyResult:{ key:'', confidence:0 },
        cueInResult:{ cueIn:0, confidence:0 },
        mixResult:{ loudness:0, headDb:0, tailDb:0, bodyDb:0, confidence:0 },
        phraseResult:{ introBars:0, outroBars:0, entryEnergy:0.5, exitEnergy:0.5, confidence:0 },
        beatAnchorResult:{ anchorSec:0, confidence:0 }
      };
      item._bpm=bpmResult.bpm||0;
      item._meterBpm=bpmResult.meterBpm||bpmResult.bpm||0;
      item._bpmConfidence=bpmResult.confidence||0;
      item._meterBpmConfidence=bpmResult.meterConfidence||bpmResult.confidence||0;
      item._key=keyResult.key||'';
      item._keyConfidence=keyResult.confidence||0;
      item._djCueIn=cueInResult?.cueIn || 0;
      item._djCueInConfidence=cueInResult?.confidence || 0;
      item._beatAnchorSec=beatAnchorResult?.anchorSec || 0;
      item._beatAnchorConfidence=beatAnchorResult?.confidence || 0;
      item._djLoudness=Number.isFinite(mixResult?.loudness) ? mixResult.loudness : 0;
      item._djHeadDb=Number.isFinite(mixResult?.headDb) ? mixResult.headDb : 0;
      item._djTailDb=Number.isFinite(mixResult?.tailDb) ? mixResult.tailDb : 0;
      item._djBodyDb=Number.isFinite(mixResult?.bodyDb) ? mixResult.bodyDb : 0;
      item._djMixConfidence=mixResult?.confidence || 0;
      item._djIntroBars=Number.isFinite(phraseResult?.introBars) ? phraseResult.introBars : 0;
      item._djOutroBars=Number.isFinite(phraseResult?.outroBars) ? phraseResult.outroBars : 0;
      item._djEntryEnergy=Number.isFinite(phraseResult?.entryEnergy) ? phraseResult.entryEnergy : 0.5;
      item._djExitEnergy=Number.isFinite(phraseResult?.exitEnergy) ? phraseResult.exitEnergy : 0.5;
      item._djPhraseConfidence=phraseResult?.confidence || 0;
      item._analysisDone=true;
      if(state.list[state.cur]===item) updateDjReadouts();
      return item._bpm;
    }catch(e){
      if(controller.signal.aborted){
        item._analysisDone=false;
        item._analysisUnsupported=false;
        return 0;
      }
      item._bpm=0;
      item._meterBpm=0;
      item._key='';
      item._bpmConfidence=0;
      item._meterBpmConfidence=0;
      item._keyConfidence=0;
      item._djCueIn=0;
      item._djCueInConfidence=0;
      item._beatAnchorSec=0;
      item._beatAnchorConfidence=0;
      item._djLoudness=0;
      item._djHeadDb=0;
      item._djTailDb=0;
      item._djBodyDb=0;
      item._djMixConfidence=0;
      item._djIntroBars=0;
      item._djOutroBars=0;
      item._djEntryEnergy=0.5;
      item._djExitEnergy=0.5;
      item._djPhraseConfidence=0;
      item._analysisDone=true;
      return 0;
    }finally{
      item._bpmPromise=null;
      if(item){
        item._analysisTimer=0;
        item._analysisQueued=false;
        item._analysisDueAt=0;
        item._analysisPriority=0;
        item._analysisAbortController=null;
      }
      if(activeAnalysisController===controller) activeAnalysisController=null;
      if(currentAnalysis && analysisLoaderToken===uiToken) hideAnalysisLoader();
      if(ownCtx){ try{ ownCtx.close() }catch(e){} }
    }
  })();
  return item._bpmPromise;
}
function chooseDjSyncProfile(currentItem, nextItem, currentBpm, nextBpm){
  const bpmTarget=clampValue((+nextBpm||0) / Math.max(1, +currentBpm||0), 0.9, 1.14);
  const bpmDelta=Math.abs(1-bpmTarget);
  const nextCue=getItemDjCueIn(nextItem);
  const introQuietness=getItemDjQuietness(nextItem, 'head');
  const outroQuietness=getItemDjQuietness(currentItem, 'tail');
  const phraseMetrics=getDjPhraseTransitionMetrics(currentItem, nextItem);
  const currentLoudness=getItemDjLoudness(currentItem);
  const nextLoudness=getItemDjLoudness(nextItem);
  const loudnessDeltaDb=(currentLoudness!=null && nextLoudness!=null)
    ? clampValue(currentLoudness-nextLoudness, -5.5, 5.5)
    : 0;
  const analysisConfidence=Math.min(
    Math.max(getItemDjMixConfidence(currentItem), +currentItem?._bpmConfidence || 0),
    Math.max(getItemDjMixConfidence(nextItem), +nextItem?._bpmConfidence || 0)
  );
  let profileId='balanced';
  if(state.dj.modePref && state.dj.modePref!=='auto'){
    profileId=state.dj.modePref;
  }else if(itemLooksLikeVideoMedia(currentItem) || itemLooksLikeVideoMedia(nextItem)){
    profileId='videoSafe';
  }else if(nextCue>=0.8 || introQuietness>=0.42 || phraseMetrics.introBars>=6){
    profileId='late';
  }else if(
    outroQuietness>=0.42 ||
    bpmDelta>=0.065 ||
    Math.abs(loudnessDeltaDb)>=2.8 ||
    phraseMetrics.energyGap>=0.42 ||
    (phraseMetrics.outroBars>=4 && phraseMetrics.introBars>=4)
  ){
    profileId='smooth';
  }else if(
    state.dj.transitionSec<=8 ||
    (nextCue<0.2 && introQuietness<0.18 && bpmDelta<0.04 && phraseMetrics.energyGap<0.24 && phraseMetrics.introBars<=1)
  ){
    profileId='tight';
  }
  if(analysisConfidence<0.2 && phraseMetrics.confidence<0.22 && profileId==='tight' && state.dj.modePref==='auto') profileId='balanced';
  const mixProfile=getDjProfilePreset(profileId);
  const tunedMixProfile={ ...mixProfile };
  let primeAtProgress=mixProfile.primeAtProgress;
  let launchAtProgress=mixProfile.launchAtProgress;
  const overlapBars=Math.max(0, Math.min(phraseMetrics.introBars, phraseMetrics.outroBars));
  if(overlapBars>=4 || phraseMetrics.introBars>=6){
    const bias=clampValue(Math.max((overlapBars-2)/4, (phraseMetrics.introBars-4)/4), 0, 1);
    primeAtProgress-=0.04*bias;
    launchAtProgress-=0.07*bias;
    tunedMixProfile.mixDelay=Math.max(0, tunedMixProfile.mixDelay-(0.04*bias));
    tunedMixProfile.mixSpan=clampValue(tunedMixProfile.mixSpan+(0.08*bias), 0.62, 0.96);
    tunedMixProfile.visualDelay=Math.max(0, tunedMixProfile.visualDelay-(0.02*bias));
    tunedMixProfile.visualSpan=clampValue(tunedMixProfile.visualSpan+(0.06*bias), 0.54, 0.88);
  }else if(phraseMetrics.introBars<=1 && phraseMetrics.outroBars<=1 && phraseMetrics.energyGap<0.24){
    const bias=clampValue((1-Math.max(phraseMetrics.introBars, phraseMetrics.outroBars))*0.75 + ((0.24-phraseMetrics.energyGap)/0.24)*0.25, 0, 1);
    primeAtProgress+=0.02*bias;
    launchAtProgress+=0.035*bias;
    tunedMixProfile.mixDelay=Math.min(0.16, tunedMixProfile.mixDelay+(0.025*bias));
    tunedMixProfile.mixSpan=clampValue(tunedMixProfile.mixSpan-(0.06*bias), 0.58, 0.92);
  }
  if(phraseMetrics.energyGap>=0.42){
    const stretch=clampValue((phraseMetrics.energyGap-0.42)/0.38, 0, 1);
    tunedMixProfile.currentSpan=clampValue(tunedMixProfile.currentSpan+(0.06*stretch), 0.76, 1.04);
    tunedMixProfile.nextSpan=clampValue(tunedMixProfile.nextSpan+(0.08*stretch), 0.66, 0.96);
    tunedMixProfile.mixSpan=clampValue(tunedMixProfile.mixSpan+(0.08*stretch), 0.62, 0.98);
  }
  const deckGainMul=clampValue(dbToGain(loudnessDeltaDb*0.38), 0.84, 1.18);
  const currentGainMul=clampValue(dbToGain(-loudnessDeltaDb*0.12), 0.92, 1.08);
  return {
    rateMul:bpmTarget,
    bpmTarget,
    profileId,
    mixProfile:tunedMixProfile,
    statusLabel:mixProfile.statusLabel,
    primeAtProgress:clampValue(primeAtProgress, 0.06, 0.34),
    launchAtProgress:clampValue(launchAtProgress, 0.14, 0.52),
    deckGainMul,
    currentGainMul,
    loudnessDeltaDb,
    introQuietness,
    outroQuietness,
    introBars:phraseMetrics.introBars,
    outroBars:phraseMetrics.outroBars,
    entryEnergy:phraseMetrics.entryEnergy,
    exitEnergy:phraseMetrics.exitEnergy,
    energyGap:phraseMetrics.energyGap,
    phraseScore:phraseMetrics.score,
    phraseConfidence:phraseMetrics.confidence,
    overlapBars,
    nextCue,
    analysisConfidence
  };
}
function getNextTrackIndex(){
  return getDjAdvanceIndex();
}
function queueBpmAnalysisAround(index=state.cur){
  const token=++analysisQueueToken;
  markPlaylistAnalysisBusy(2600);
  if(focusAnalysisTimer){
    clearTimeout(focusAnalysisTimer);
    focusAnalysisTimer=0;
  }
  const current=state.list[index];
  if(current){
    focusAnalysisTimer=setTimeout(()=>{
      focusAnalysisTimer=0;
      if(token!==analysisQueueToken) return;
      scheduleItemAnalysis(current, isDesktopOnlyAnalysisMode() ? 120 : 1200, { priority:3 });
      queueDjCandidateAnalysis(index, state.dj.candidateWindow);
      schedulePlaylistBpmScan(5200);
    }, isDesktopOnlyAnalysisMode() ? 80 : 900);
    return;
  }
  queueDjCandidateAnalysis(index, state.dj.candidateWindow);
  schedulePlaylistBpmScan(5200);
}
function startPlaylistBpmScan(){
  state.bpmScanToken++;
  schedulePlaylistBpmScan(5600);
}
function createItemSourceUrl(item){
  if(!item) return null;
  if(item.file){
    return { src:URL.createObjectURL(item.file), objectUrl:true };
  }
  if(item.url){
    return { src:item.url, objectUrl:false };
  }
  return null;
}
function getDjDeckMode(item){
  if(!item) return null;
  if(item._decodedBuffer) return 'decoded';
  if(itemLooksLikeVideoMedia(item)){
    if(item.url && isDash(item.url)) return 'dash';
    if(item.url && isHls(item.url)) return 'hls';
    return 'video';
  }
  return 'audio';
}
function primeDjDeck(nextIndex){
  const item=state.list[nextIndex];
  if(!item) return;
  if(state.dj.deck?.item===item) return;
  cleanupDjDeck();
  const source=createItemSourceUrl(item);
  if(!source?.src && !item._decodedBuffer) return;
  const mode=getDjDeckMode(item);
  const media=(mode==='video' || mode==='hls' || mode==='dash')
    ? $.djDeckVideo
    : new Audio();
  if(!media) return;
  media.preload='auto';
  media.crossOrigin='anonymous';
  media.playsInline=true;
  media.volume=0;
  media.playbackRate=currentDeckRate();
  if(media===$.djDeckVideo){
    media.classList.remove('active');
    media.style.opacity='0';
  }
  if(source?.src && mode!=='hls' && mode!=='dash') media.src=source.src;
  state.dj.deck={
    item, index:nextIndex, mode, media, video:media===$.djDeckVideo?media:null,
    objectUrl:source?.objectUrl?source.src:'', src:source?.src||'',
    started:false, handoff:false, mixProgress:0,
    sourceNode:null, gainNode:null, analyser:null, freqData:null, timeData:null,
    bufferSource:null, startedAtCtx:0, startOffset:0, startedRate:1, decoded:item._decodedBuffer||null,
    hls:null, dash:null
  };
  syncDjPitchPolicy();
  if(source?.src && mode!=='hls' && mode!=='dash'){ try{ media.load?.() }catch(e){} }
}
function ensureDjDeckGraph(deck){
  if(!deck || deck.analyser || !state.audioCtx) return;
  const analyser=state.audioCtx.createAnalyser();
  analyser.fftSize=2048;
  analyser.minDecibels=-95;
  analyser.maxDecibels=-20;
  analyser.smoothingTimeConstant=0.82;
  deck.analyser=analyser;
  if(deck.decoded){
    const gain=state.audioCtx.createGain();
    gain.gain.value=0;
    gain.connect(state.audioCtx.destination);
    gain.connect(analyser);
    deck.gainNode=gain;
  }else{
    const gain=state.audioCtx.createGain();
    gain.gain.value=0;
    const src=(deck.video && state.dj.videoSourceNode)
      ? state.dj.videoSourceNode
      : state.audioCtx.createMediaElementSource(deck.media);
    if(deck.video && !state.dj.videoSourceNode) state.dj.videoSourceNode = src;
    src.connect(gain);
    gain.connect(state.audioCtx.destination);
    gain.connect(analyser);
    deck.sourceNode=src;
    deck.gainNode=gain;
  }
}
async function prepareDjDeckMedia(deck){
  if(!deck || deck.decoded || !deck.media) return true;
  if(deck._ready) return true;
  if(deck._readyPromise) return deck._readyPromise;
  const media=deck.media;
  const waitUntilReady=()=>new Promise((resolve,reject)=>{
    let done=false;
    const timer=setTimeout(()=>finish(reject, new Error('dj deck ready timeout')), 12000);
    const finish=(fn,arg)=>{
      if(done) return;
      done=true;
      clearTimeout(timer);
      media.removeEventListener('loadedmetadata', onReady);
      media.removeEventListener('canplay', onReady);
      media.removeEventListener('error', onError);
      fn(arg);
    };
    const onReady=()=>finish(resolve, true);
    const onError=()=>finish(reject, new Error('dj deck media error'));
    media.addEventListener('loadedmetadata', onReady);
    media.addEventListener('canplay', onReady);
    media.addEventListener('error', onError);
  });
  deck._readyPromise=(async()=>{
    if(deck.mode==='hls'){
      if(window.Hls && Hls.isSupported()){
        await new Promise((resolve,reject)=>{
          const hls=new Hls({ enableWorker:true, maxBufferLength:30 });
          deck.hls=hls;
          let settled=false;
          const finish=(fn,arg)=>{
            if(settled) return;
            settled=true;
            hls.off(Hls.Events.MEDIA_ATTACHED, onAttached);
            hls.off(Hls.Events.MANIFEST_PARSED, onParsed);
            hls.off(Hls.Events.ERROR, onError);
            fn(arg);
          };
          const onAttached=()=>{ try{ hls.loadSource(deck.src); }catch(e){ finish(reject,e); } };
          const onParsed=()=>finish(resolve,true);
          const onError=(_,data)=>{ if(data?.fatal) finish(reject, new Error(data.type || 'hls error')); };
          hls.on(Hls.Events.MEDIA_ATTACHED, onAttached);
          hls.on(Hls.Events.MANIFEST_PARSED, onParsed);
          hls.on(Hls.Events.ERROR, onError);
          try{ hls.attachMedia(media); }catch(e){ finish(reject,e); }
        });
      }else{
        media.src=deck.src;
        media.load?.();
        await waitUntilReady();
      }
    }else if(deck.mode==='dash'){
      await new Promise((resolve,reject)=>{
        try{
          const player=dashjs.MediaPlayer().create();
          deck.dash=player;
          let settled=false;
          const finish=(fn,arg)=>{
            if(settled) return;
            settled=true;
            try{ player.off(dashjs.MediaPlayer.events.STREAM_INITIALIZED, onInit); }catch(e){}
            try{ player.off(dashjs.MediaPlayer.events.ERROR, onError); }catch(e){}
            fn(arg);
          };
          const onInit=()=>finish(resolve,true);
          const onError=()=>finish(reject, new Error('dash deck error'));
          try{ window.OPDash?.applyDefaults?.(player); }catch(e){}
          player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, onInit);
          player.on(dashjs.MediaPlayer.events.ERROR, onError);
          player.initialize(media, deck.src, false);
        }catch(e){ reject(e); }
      });
    }else{
      media.load?.();
      await waitUntilReady();
    }
    deck._ready=true;
    return true;
  })().catch(err=>{
    deck._readyPromise=null;
    throw err;
  });
  return deck._readyPromise;
}
async function startDjDeckPlayback(nextIndex, opts={}){
  primeDjDeck(nextIndex);
  const deck=state.dj.deck;
  if(!deck || deck.index!==nextIndex || deck.started) return false;
  const requestedStartAt=Math.max(0, +opts.startAtSec || 0);
  try{ await ensureAudioOn(); }catch(e){}
  ensureAudioGraph();
  try{ await prepareDjDeckMedia(deck); }catch(e){ return false; }
  ensureDjDeckGraph(deck);
  if(deck.decoded && deck.gainNode){
    try{
      const src=state.audioCtx.createBufferSource();
      src.buffer=deck.decoded;
      const deckRate=currentDeckRate();
      const decodedDur=+deck.decoded.duration || 0;
      const startAt=decodedDur>0
        ? Math.min(Math.max(0, decodedDur - 0.12), requestedStartAt)
        : requestedStartAt;
      src.playbackRate.value=deckRate;
      src.connect(deck.gainNode);
      deck.startOffset=startAt;
      deck.startedAtCtx=state.audioCtx.currentTime;
      deck.startedRate=deckRate;
      deck.bufferSource=src;
      src.start(0, startAt);
      deck.started=true;
      state.dj.handoffNote='次の deck を起動しました。';
      return true;
    }catch(e){
      return false;
    }
  }else{
    try{
      const mediaDur=+deck.media.duration || 0;
      const maxStart=mediaDur>0 ? Math.max(0, mediaDur - 0.12) : requestedStartAt;
      deck.media.currentTime=Math.min(maxStart, requestedStartAt);
    }catch(e){}
    try{
      if(deck.gainNode){
        deck.media.muted=false;
        deck.media.volume=1;
      }else{
        deck.media.volume=Math.max(0.001, +($.vol?.value || 1));
      }
      deck.media.playbackRate=currentDeckRate();
      await deck.media.play();
      if(deck.video) deck.video.classList.add('active');
      deck.started=true;
      state.dj.handoffNote='次の deck を起動しました。';
      return true;
    }catch(e){
      return false;
    }
  }
}
function applyDjDeckVideoVisual(progress){
  const deck=state.dj.deck;
  const deckVideo=deck?.video;
  if(!deckVideo){
    if($.djDeckVideo){
      $.djDeckVideo.classList.remove('active');
      $.djDeckVideo.style.opacity='0';
      $.djDeckVideo.style.transform='';
    }
    if($.v){
      $.v.style.opacity='1';
      $.v.style.filter='';
    }
    return;
  }
  const p=clampValue(progress, 0, 1);
  const mix=clampValue((p-0.02)/0.72, 0, 1);
  const deckReady=!!((+deckVideo.readyState || 0) >= 2 && ((+deckVideo.videoWidth || 0) > 0 || itemLooksLikeVideoMedia(deck?.item)));
  const visual=deckReady ? Math.pow(mix, 0.72) : 0;
  deckVideo.classList.toggle('active', visual>0.001);
  deckVideo.style.opacity=String(visual);
  deckVideo.style.transform=`scale(${0.988 + visual*0.012})`;
  const currentHasVideo=!currentHtml5IsAudio() && (+($.v?.videoWidth || 0) > 0 || itemLooksLikeVideoMedia(state.list[state.cur]));
  $.v.style.opacity=currentHasVideo ? String(clampValue(1 - visual*0.96, 0.03, 1)) : '1';
  $.v.style.filter=currentHasVideo ? `brightness(${1 - visual*0.16}) saturate(${1 - visual*0.12})` : '';
}
function applyDjMixVolumes(progress){
  const baseVol=Math.max(0, Math.min(1, +($.vol?.value || 0)));
  const deck=state.dj.deck;
  if(!deck?.started){
    state.dj.mixProgress=0;
    state.dj.visualProgress=0;
    $.v.volume=baseVol;
    if(state.extAudio) state.extAudio.volume=baseVol;
    applyDjDeckVideoVisual(0);
    return;
  }
  const p=clampValue(progress,0,1);
  const syncPlan=state.dj.syncPlan;
  const profile=getDjMixProfile(p, syncPlan);
  const currentGainMul=clampValue(syncPlan?.currentGainMul || 1, 0.9, 1.08);
  const deckGainMul=clampValue(syncPlan?.deckGainMul || 1, 0.84, 1.18);
  deck.mixProgress=profile.mixProgress;
  state.dj.mixProgress=profile.mixProgress;
  state.dj.visualProgress=profile.visualProgress;
  if(state.dj.active && !state.dj.handoffPending){
    state.dj.handoffNote=itemLooksLikeVideoMedia(deck?.item)
      ? '音声に合わせて映像をクロスフェードしています。'
      : '音声クロスフェードを進行中です。';
  }
  $.v.volume=clampValue(baseVol*profile.currentMul*currentGainMul, 0, 1);
  if(state.extAudio) state.extAudio.volume=clampValue(baseVol*profile.currentMul*currentGainMul, 0, 1);
  if(deck.gainNode){
    try{
      deck.media.muted=false;
      deck.media.volume=1;
    }catch(e){}
    try{ deck.gainNode.gain.setTargetAtTime(clampValue(baseVol*profile.nextMul*deckGainMul, 0, 1.18), state.audioCtx.currentTime, 0.04) }catch(e){ deck.gainNode.gain.value=clampValue(baseVol*profile.nextMul*deckGainMul, 0, 1.18); }
  }else{
    deck.media.volume=clampValue(baseVol*profile.nextMul*deckGainMul, 0, 1);
  }
  applyDjDeckVideoVisual(profile.visualProgress);
}
function djDeckCurrentTime(deck){
  if(!deck?.started) return 0;
  if(deck.bufferSource){
    return Math.max(0, (((state.audioCtx?.currentTime||0) - (deck.startedAtCtx||0)) * (+deck.startedRate || 1)) + (deck.startOffset||0));
  }
  return Math.max(0, deck.media?.currentTime || 0);
}
function beginDjDeckHandoff(deck, label){
  if(!deck?.started) return false;
  setDjPhase('handoff');
  const token = ++state.dj.handoffToken;
  state.dj.handoffPending = true;
  state.dj.handoffRetries = 0;
  state.dj.handoffDelta = 0;
  state.dj.handoffStage = 'handoff';
  state.dj.handoffNote = 'deck から本体へ引き継ぎを開始します。';
  applyDjDeckVideoVisual(Math.max(deck.mixProgress || 0, 0.92));
  const minReadyState = deck.video ? 3 : 2;
  const settleDelta = deck.video ? 0.14 : 0.22;
  const reseekDelta = deck.video ? 0.24 : 0.38;
  const hardTimeoutMs = deck.video ? 6200 : 4800;
  let readyKickTimer = 0;
  let monitorTimer = 0;
  let syncStarted = false;
  const clampTargetTime = (time)=>{
    const t = Math.max(0, +time || 0);
    const dur = +($.v?.duration || 0);
    if(Number.isFinite(dur) && dur > 0){
      return Math.max(0, Math.min(Math.max(0, dur - 0.12), t));
    }
    return t;
  };
  const clearReadyWatch = ()=>{
    if(readyKickTimer){
      clearTimeout(readyKickTimer);
      readyKickTimer = 0;
    }
    if(monitorTimer){
      clearTimeout(monitorTimer);
      monitorTimer = 0;
    }
    $.v.removeEventListener('loadedmetadata', syncFromDeck);
    $.v.removeEventListener('loadeddata', syncFromDeck);
    $.v.removeEventListener('canplay', syncFromDeck);
  };
  const ensureMainNearDeck = ()=>{
    const target = clampTargetTime(djDeckCurrentTime(deck));
    if(Math.abs((+($.v.currentTime || 0)) - target) > 0.04){
      try{ $.v.currentTime = target; }catch(e){}
    }
    return target;
  };
  const finalizeHandoff = ()=>{
    if(state.dj.handoffToken !== token) return;
    clearReadyWatch();
    state.dj.handoffPending = false;
    state.dj.handoffStage = 'settle';
    state.dj.handoffNote = 'handoff を確定しています。';
    try{ $.v.currentTime = clampTargetTime(djDeckCurrentTime(deck)); }catch(e){}
    applyCurrentMediaTunables();
    try{
      const baseVol=Math.max(0, Math.min(1, +($.vol?.value || 0)));
      $.v.volume=baseVol;
      if(state.extAudio) state.extAudio.volume=baseVol;
    }catch(e){}
    try{
      if(deck.gainNode){
        deck.gainNode.gain.setTargetAtTime(0, state.audioCtx.currentTime, 0.03);
      }else if(deck.media){
        deck.media.volume=0;
      }
    }catch(e){}
    try{ rampTo(+($.master?.value||1),0.08) }catch(e){}
    const finalize=()=>{
      cleanupDjDeck();
      updateDjReadouts();
      hideLoader();
    };
    if(deck.video && $.v){
      try{
        $.v.style.opacity='0';
        $.v.style.filter='brightness(.88) saturate(.9)';
        deck.video.style.opacity='1';
        deck.video.style.transform='scale(1)';
      }catch(e){}
      requestAnimationFrame(()=>{
        requestAnimationFrame(()=>{
          try{
            $.v.style.opacity='1';
            $.v.style.filter='';
            deck.video.style.opacity='0';
            deck.video.style.transform='scale(.996)';
          }catch(e){}
        });
      });
      setTimeout(finalize, 180);
      return;
    }
    finalize();
  };
  const monitorCatchUp = ()=>{
    if(state.dj.handoffToken !== token) return;
    let cycleStartedAt = performance.now();
    let stableHits = 0;
    let retriedPlay = false;
    let restartCycles = 0;
    const maxRestartCycles = deck.video ? 3 : 2;
    const tick = ()=>{
      if(state.dj.handoffToken !== token) return;
      const target = clampTargetTime(djDeckCurrentTime(deck));
      const current = +($.v.currentTime || 0);
      const ready = !$.v.paused && (+($.v.readyState || 0) >= minReadyState);
      const delta = Math.abs(current - target);
      state.dj.handoffDelta = delta;
      try{ $.v.volume = Math.max(0.02, Math.min(0.18, +($.vol?.value || 0)*0.16)); }catch(e){}
      if(ready && delta <= settleDelta){
        stableHits++;
        state.dj.handoffStage = 'settle';
        state.dj.handoffNote = `追従確認 ${stableHits}/3`;
        setDjPhase('settle');
      }else{
        stableHits=0;
        state.dj.handoffStage = 'handoff';
        state.dj.handoffNote = !ready
          ? '本体の再生準備を待っています。'
          : (delta > reseekDelta ? '本体を deck の位置へ再同期しています。' : 'deck と本体の差を詰めています。');
      }
      if(stableHits >= 3){
        finalizeHandoff();
        return;
      }
      if(delta > reseekDelta || current + settleDelta < target){
        try{ $.v.currentTime = target; }catch(e){}
      }
      if(!ready && !retriedPlay){
        retriedPlay = true;
        state.dj.handoffNote = '本体の再生を再要求しています。';
        requestPlayImmediate(label).catch(()=>{});
      }
      const elapsed = performance.now() - cycleStartedAt;
      if(elapsed >= hardTimeoutMs){
        if(delta <= Math.max(settleDelta*1.6, deck.video ? 0.28 : 0.36)){
          state.dj.handoffNote = '追従誤差が許容範囲に入ったため確定します。';
          finalizeHandoff();
          return;
        }
        if(restartCycles >= maxRestartCycles){
          state.dj.handoffStage = 'settle';
          state.dj.handoffNote = '追従上限に達したため現在位置で確定します。';
          try{ $.v.currentTime = target; }catch(e){}
          try{
            const baseVol=Math.max(0, Math.min(1, +($.vol?.value || 0)));
            $.v.volume=baseVol;
            if(state.extAudio) state.extAudio.volume=baseVol;
          }catch(e){}
          finalizeHandoff();
          return;
        }
        restartCycles++;
        state.dj.handoffRetries = restartCycles;
        state.dj.handoffStage = 'handoff';
        state.dj.handoffNote = `再同期をやり直します ${restartCycles}/${maxRestartCycles}`;
        cycleStartedAt = performance.now();
        retriedPlay = false;
        stableHits = 0;
        try{ $.v.pause(); }catch(e){}
        ensureMainNearDeck();
        requestPlayImmediate(label).catch(()=>{});
      }
      monitorTimer = setTimeout(tick, 70);
    };
    tick();
  };
  const playAfterSeek = ()=>{
    if(state.dj.handoffToken !== token) return;
    syncStarted = true;
    state.dj.handoffStage = 'handoff';
    state.dj.handoffNote = 'seek 完了後の再生を開始します。';
    try{ $.v.volume = Math.max(0.02, Math.min(0.18, +($.vol?.value || 0)*0.16)); }catch(e){}
    try{ ensureAudioOn(); }catch(e){}
    requestPlayImmediate(label).catch(()=>{});
    readyKickTimer = setTimeout(monitorCatchUp, 90);
  };
  function syncFromDeck(){
    if(state.dj.handoffToken !== token || syncStarted) return;
    const target = ensureMainNearDeck();
    state.dj.handoffNote = 'deck の時刻へ main を合わせています。';
    let settled = false;
    let seekTimer = 0;
    const finishSeek = ()=>{
      if(settled) return;
      settled = true;
      clearTimeout(seekTimer);
      $.v.removeEventListener('seeked', onSeeked);
      $.v.removeEventListener('timeupdate', onTimeupdate);
      playAfterSeek();
    };
    const onSeeked = ()=>{
      if(Math.abs((+($.v.currentTime || 0)) - target) <= reseekDelta){
        finishSeek();
        return;
      }
      try{ $.v.currentTime = target; }catch(e){}
    };
    const onTimeupdate = ()=>{
      if(Math.abs((+($.v.currentTime || 0)) - target) <= 0.2) finishSeek();
    };
    if(Math.abs((+($.v.currentTime || 0)) - target) <= 0.16){
      playAfterSeek();
      return;
    }
    $.v.addEventListener('seeked', onSeeked, { once:true });
    $.v.addEventListener('timeupdate', onTimeupdate);
    seekTimer = setTimeout(()=>{
      ensureMainNearDeck();
      finishSeek();
    }, 1200);
    try{
      $.v.currentTime = target;
    }catch(e){
      finishSeek();
    }
  }
  $.v.addEventListener('loadedmetadata', syncFromDeck);
  $.v.addEventListener('loadeddata', syncFromDeck);
  $.v.addEventListener('canplay', syncFromDeck);
  readyKickTimer = setTimeout(()=>{
    if(state.dj.handoffToken !== token || syncStarted) return;
    if((+($.v.readyState || 0)) >= 1) syncFromDeck();
  }, 100);
  $.v.addEventListener('error', ()=>{
    if(state.dj.handoffToken === token){
      clearReadyWatch();
      state.dj.handoffPending = false;
      state.dj.handoffStage = 'handoff';
      state.dj.handoffNote = '本体側でエラーが出たため handoff を中断しました。';
      if($.v){
        $.v.style.opacity='1';
        $.v.style.filter='';
      }
      updateDjReadouts();
    }
  }, { once:true });
  return true;
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
async function getCachedItemMeta(item){
  if(!item?.file) return null;
  if(item._metaLoaded) return item._meta || null;
  if(item._metaPromise) return item._metaPromise;
  item._metaPromise=(async()=>{
    const meta=await tryExtractFromBlob(item.file, item.file.name);
    item._meta=meta || null;
    item._metaLoaded=true;
    return item._meta;
  })();
  try{
    return await item._metaPromise;
  }finally{
    item._metaPromise=null;
  }
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
  if(item._thumbResolved) return null;
  if(item._thumbPromise) return item._thumbPromise;
  item._thumbPromise=(async()=>{
    let thumb=null;
    if(fileLooksLikeAudio(file)){
      const meta = await getCachedItemMeta(item);
      if(meta?.coverUrl){
        thumb=meta.coverUrl;
        setItemThumb(item, thumb);
        item._artwork = buildArtworkEntries([thumb]);
      }
    }else if(fileLooksLikeVideo(file)){
      const still = await extractVideoStill(file);
      if(still){
        thumb=still;
        setItemThumb(item, still);
        item._artwork = buildArtworkEntries([still]);
      }
    }
    item._thumbResolved=true;
    return thumb;
  })();
  try{
    return await item._thumbPromise;
  }finally{
    item._thumbPromise=null;
  }
}
function applyThumbAsCurrentCover(url, kind='video'){
  state.lastCoverUrl = url || null;
  if(url){
    $.artWrap?.classList.remove('no-art');
    $.audioCover.removeAttribute('src');
    $.audioCover.onerror = ()=>{ $.audioCover.removeAttribute('src'); $.audioCover.style.opacity='1'; $.artWrap?.classList.add('no-art'); };
    $.audioCover.onload = ()=>{ $.audioCover.style.opacity='1'; };
    $.audioCover.style.opacity = '0.001';
    $.audioCover.src = url;
    setMediaArtwork([url]);
  }else{
    $.audioCover.removeAttribute('src');
    $.audioCover.style.opacity='1';
    $.artWrap?.classList.add('no-art');
    setMediaArtwork([]);
  }
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
  const band = Math.max(32, Math.round(Math.min(aw, ah) * 0.18));
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
      const alpha = Math.pow(1-p, 1.18) * 0.96;
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
  $.audioCover.onerror=()=>{ $.audioCover.removeAttribute('src'); $.audioCover.style.opacity='1'; $.artWrap?.classList.add('no-art') };

  state.lastCoverUrl=meta?.coverUrl || null;
  if(meta?.coverUrl){
    $.artWrap?.classList.remove('no-art');
    $.audioCover.onload=()=>{ $.audioCover.style.opacity='1' };
    $.audioCover.style.opacity='0.001';
    $.audioCover.src=meta.coverUrl;
    setMediaArtwork([meta.coverUrl]);
  }else{
    $.audioCover.style.opacity='1';
    $.artWrap?.classList.add('no-art');
    setMediaArtwork([]);
  }

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
  const meta = item ? await getCachedItemMeta(item) : await tryExtractFromBlob(file,file.name);
  if(item && meta?.coverUrl){
    setItemThumb(item, meta.coverUrl);
    item._artwork = buildArtworkEntries([meta.coverUrl]);
  }
  setAudioMetaView(meta,file.name);
  updateAudioMetaVisibility();
}
function scheduleCurrentAudioMeta(item, delay=900){
  const token=++currentMetaToken;
  if(currentMetaTimer){
    clearTimeout(currentMetaTimer);
    currentMetaTimer=0;
  }
  currentMetaTimer=setTimeout(()=>{
    currentMetaTimer=0;
    const runner=window.requestIdleCallback
      ? (cb)=>window.requestIdleCallback(cb, { timeout:2000 })
      : (cb)=>setTimeout(cb, 120);
    runner(()=>{
      if(token!==currentMetaToken) return;
      if(state.list[state.cur]!==item || !fileLooksLikeAudio(item?.file)) return;
      handleAudioMetaForFile(item.file, item).then(()=>{
        if(token!==currentMetaToken || state.list[state.cur]!==item) return;
        renderPlaylist();
      }).catch(()=>{});
    });
  }, Math.max(0, delay));
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
    $.spectrum.classList.remove('mode-circular');
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
    const beatBoost = state.bpm.beatSync ? (state.bpm.pulse||0) * 0.045 : 0;
    const scale=(1 + loud*0.08 + beatBoost);
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
  const maxRadius=Math.min(W,H)*0.36;
  const minRadius=Math.max(10, maxRadius*0.42);
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

    const len=minRadius+(maxRadius-minRadius)*(ease*0.78)*state.spec.pausedFade;

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
    const deck=state.dj.deck;
    if(deck?.started && deck.analyser){
      if(!deck.freqData || deck.freqData.length!==deck.analyser.frequencyBinCount) deck.freqData=new Uint8Array(deck.analyser.frequencyBinCount);
      if(!deck.timeData || deck.timeData.length!==Math.min(1024, deck.analyser.fftSize)) deck.timeData=new Uint8Array(Math.min(1024, deck.analyser.fftSize));
      deck.analyser.getByteFrequencyData(deck.freqData);
      deck.analyser.getByteTimeDomainData(deck.timeData);
      const mix=clampValue(deck.mixProgress||0, 0, 1);
      const deckWeight=Math.max(0.18, mix);
      const mainWeight=Math.max(0.22, 1-mix);
      const freqLen=Math.min(state.spec.data.length, deck.freqData.length);
      for(let i=0;i<freqLen;i++){
        state.spec.data[i]=Math.max(
          state.spec.data[i],
          Math.min(255, Math.round(state.spec.data[i]*mainWeight + deck.freqData[i]*deckWeight))
        );
      }
      const timeLen=Math.min(state.spec.timeData.length, deck.timeData.length);
      for(let i=0;i<timeLen;i++){
        const main=(state.spec.timeData[i]-128)*mainWeight;
        const next=(deck.timeData[i]-128)*deckWeight;
        state.spec.timeData[i]=Math.max(0, Math.min(255, Math.round(128 + main + next)));
      }
    }
    const rms = computeRMS(state.spec.timeData);
    updateEstimatedBeatPulse(now);

    if(!state._logRanges||state._logRanges.length!==state.spec.bins){
      const r=makeLogBins(an,state.spec.bins);
      state._logRanges=r.ranges; state._logCenters=r.centers;
      state.spec.peaks=new Float32Array(state.spec.bins).fill(an.minDecibels);
      state.spec.peakY=new Float32Array(state.spec.bins).fill(0);
    }
    const targetFade=$.v.paused?0:1; state.spec.pausedFade = (state.spec.pausedFade*0.88) + (targetFade*0.12);

    const W=canvas.width, H=canvas.height;
    canvas.classList.toggle('mode-circular', state.spec.mode==='circular');
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
function updateAutoDjState(){
  const now=performance.now();
  if(state.dj.carryUntil>now && !state.dj.active){
    setDjPhase('carry');
    const duration=5200;
    const remain=state.dj.carryUntil-now;
    const carryProgress=clampValue(1-(remain/duration),0,1);
    const eased=1-Math.pow(1-carryProgress,2);
    applyDjRateMul(state.dj.carryFrom + (1-state.dj.carryFrom)*eased);
    if(carryProgress>=1){
      state.dj.carryUntil=0;
      state.dj.carryFrom=1;
      state.dj.keyShiftSemitones=0;
      state.dj.keySyncActive=false;
      applyDjRateMul(1);
      syncDjPitchPolicy();
      setDjPhase('idle');
    }
  }
  if(state.dj.handoffPending){
    updateDjTransitionOverlay();
    return;
  }
  if(!state.dj.enabled || state.mediaKind!=='html5' || mediaPaused() || !state.contPlay || state.list.length<2){
    if(state.dj.active) resetAutoDj(true);
    else setDjPhase('idle');
    return;
  }
  const nextIndex=getNextTrackIndex();
  const duration=mediaDuration();
  const current=mediaCurrent();
  if(nextIndex<0 || !Number.isFinite(duration) || duration<=0){
    if(state.dj.active) resetAutoDj(false);
    else setDjPhase('idle');
    return;
  }
  const transitionLead=Math.min(20, Math.max(state.dj.transitionSec, (state.dj.syncPlan?.effectiveTransitionSec || 0), state.dj.transitionSec + 3.5));
  const left=duration-current;
  if(left<=0.45 && state.dj.active){
    state.dj.carryPrimed=true;
    state.dj.carryFrom=state.dj.targetMul || state.dj.rateMul || 1;
  }
  if(left>transitionLead){
    if(state.dj.active){
      state.dj.active=false;
      state.dj.nextIndex=-1;
      state.dj.currentKey='';
      state.dj.nextKey='';
      state.dj.keyShiftSemitones=0;
      state.dj.keySyncActive=false;
      state.dj.syncPlan=null;
      state.dj.targetMul=1;
      applyDjRateMul(1);
      syncDjPitchPolicy();
    }
    return;
  }
  const currentBpm=getCurrentTrackBpm();
  const currentMeterBpm=getCurrentTrackMeterBpm() || currentBpm;
  const currentItem=state.list[state.cur];
  const nextItem=state.list[nextIndex];
  const nextBpm=getTrackBpmInfo(nextItem).bpm || 0;
  const nextMeterBpm=getTrackMeterBpmInfo(nextItem).bpm || nextBpm || 0;
  if(!currentBpm || !nextBpm){
    setDjPhase('scan');
    state.dj.handoffNote='解析待ちのため次曲候補をスキャンしています。';
    if(!shouldHoldBpmKeyAnalysis()){
      if(currentItem && !currentBpm && !currentItem._bpm && !currentItem._bpmPromise) scheduleItemAnalysis(currentItem, 80, { priority:3 });
      if(nextItem && !nextItem._bpm && !nextItem._bpmPromise) scheduleItemAnalysis(nextItem, 520, { priority:2 });
      queueDjCandidateAnalysis(state.cur, state.dj.candidateWindow);
    }
    state.dj.keyShiftSemitones=0;
    state.dj.keySyncActive=false;
    state.dj.syncPlan=null;
    syncDjPitchPolicy();
    updateDjReadouts();
    return;
  }
  if(!shouldHoldBpmKeyAnalysis()){
    if(currentItem && !currentItem._key && !currentItem._bpmPromise) scheduleItemAnalysis(currentItem, 120, { priority:3 });
    if(nextItem && !nextItem._key && !nextItem._bpmPromise) scheduleItemAnalysis(nextItem, 640, { priority:2 });
  }
  state.dj.active=true;
  state.dj.nextIndex=nextIndex;
  state.dj.currentBpm=currentBpm;
  state.dj.nextBpm=nextBpm;
  if(state.dj.syncPlan && (state.dj.syncPlan.currentIndex!==state.cur || state.dj.syncPlan.nextIndex!==nextIndex)){
    state.dj.syncPlan=null;
  }
  const planSeedTransition=Math.max(0.01, state.dj.syncPlan?.effectiveTransitionSec || state.dj.transitionSec || 12);
  const pSeed=clampValue(1-(left/planSeedTransition),0,1);
  let syncPlan=state.dj.syncPlan;
  if(!syncPlan){
      const freshPlan=chooseDjSyncProfile(currentItem, nextItem, currentBpm, nextBpm);
      if(pSeed>=0.08 || state.dj.deck?.started){
      syncPlan={ ...freshPlan, currentIndex:state.cur, nextIndex, currentMeterBpm, nextMeterBpm, lockedAt:performance.now() };
      state.dj.syncPlan=syncPlan;
    }else{
      syncPlan={ ...freshPlan, currentMeterBpm, nextMeterBpm };
    }
  }
  const effectiveTransition=getDjEffectiveTransitionSec(state.dj.transitionSec, syncPlan);
  syncPlan.effectiveTransitionSec=effectiveTransition;
  const mixProgress=clampValue(1-(left/effectiveTransition),0,1);
  state.dj.currentKey='';
  state.dj.nextKey='';
  state.dj.keyShiftSemitones=0;
  state.dj.keySyncActive=false;
  state.dj.targetMul=syncPlan.rateMul;
  const primeAtProgress=clampValue(syncPlan.primeAtProgress ?? 0.14, 0.06, 0.4);
  const launchAtProgress=clampValue(syncPlan.launchAtProgress ?? 0.28, primeAtProgress, 0.52);
  if(state.dj.deck?.started) setDjPhase('mix');
  else if(mixProgress>=primeAtProgress) setDjPhase('armed');
  else setDjPhase('prepare');
  if(state.dj.phase==='prepare') state.dj.handoffNote='次の deck を先読みしています。';
  else if(state.dj.phase==='armed') state.dj.handoffNote='小節境界を見て deck を起動します。';
  else if(state.dj.phase==='mix') state.dj.handoffNote='クロスフェードと位相合わせを継続中です。';
  const eased=getDjRateEase(mixProgress);
  applyDjRateMul(1 + (state.dj.targetMul-1)*eased);
  syncDjPitchPolicy();
  if(mixProgress>=primeAtProgress){
    primeDjDeck(nextIndex);
  }
  if(mixProgress>=launchAtProgress && !state.dj.deck?.started){
    if(shouldLaunchDjDeckOnBeat(current, currentMeterBpm || currentBpm, left, mixProgress, currentItem, syncPlan)){
      const startAtSec=getDjDeckStartOffset(current, currentMeterBpm || currentBpm, nextMeterBpm || nextBpm, nextItem, currentItem, syncPlan);
      startDjDeckPlayback(nextIndex, { startAtSec }).then(started=>{
        if(started) return;
        markDjCandidatePlaybackFailure(nextItem, itemLooksLikeVideoMedia(nextItem) ? 240000 : 120000);
        if(state.dj.nextIndex===nextIndex){
          state.dj.nextIndex=-1;
          state.dj.syncPlan=null;
        }
        cleanupDjDeck();
        updateDjReadouts();
      }).catch(()=>{
        markDjCandidatePlaybackFailure(nextItem, itemLooksLikeVideoMedia(nextItem) ? 240000 : 120000);
        if(state.dj.nextIndex===nextIndex){
          state.dj.nextIndex=-1;
          state.dj.syncPlan=null;
        }
        cleanupDjDeck();
        updateDjReadouts();
      });
    }
  }
  applyDjMixVolumes(p);
  updateDjTransitionOverlay();
}

/* ========= thumbs & seek ========= */
let buildThumbsTimer=null;
function buildThumbsDebounced(){
  clearTimeout(buildThumbsTimer);
  buildThumbsTimer=setTimeout(()=>{
    const runner=window.requestIdleCallback
      ? (cb)=>window.requestIdleCallback(cb, { timeout:2200 })
      : (cb)=>setTimeout(cb, 120);
    runner(()=>{
      if($.loader?.classList.contains('show') || state.dj.handoffPending){
        buildThumbsDebounced();
        return;
      }
      buildThumbs();
    });
  }, 1800);
}
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
      if(currentItem?.file && fileLooksLikeVideo(currentItem.file)){
        const artworkUrls = state.thumbs.slice(0,4).map(x=>x.url).filter(Boolean);
        if(artworkUrls.length){
          currentItem._artwork = buildArtworkEntries(artworkUrls);
          if(state.list[state.cur]===currentItem) setMediaArtwork(artworkUrls);
        }
      }
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
function startSeekRAF(){ cancelAnimationFrame(state.seekRAF); const draw=()=>{ state.seekRAF=requestAnimationFrame(draw); updateSeekUI(); const cur=mediaCurrent(); syncAmbientFromThumbTime(cur); syncVideoEdgeGlow(); updateAutoDjState(); updateMetronomeScheduler(); if(state.abLoop && state.a!=null && state.b!=null && state.b>state.a){ if(cur>=state.b-0.02){ mediaSeekTo(state.a) } } }; state.seekRAF=requestAnimationFrame(draw) }
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
  if($.v.volume>0) forceUnmute();
};
$.rate.oninput=()=>{
  updateSliderReadouts();
  applyCurrentMediaTunables();
};
$.mixKey.oninput=()=>{
  updateSliderReadouts();
  applyCurrentMediaTunables();
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
$.ratioAlertClose?.addEventListener('click', hideRatioAlert);
$.ratioAlertNever?.addEventListener('click', ()=>{ store.set('pc.aspect916.noticeDismissed', true); hideRatioAlert(); });
$.ratioAlert?.addEventListener('click',(e)=>{ if(e.target===$.ratioAlert) hideRatioAlert() });

/* ========= Settings modal ========= */
qsa('[data-settings-tab]').forEach(btn=>{
  btn.addEventListener('click',()=>setSettingsTab(btn.dataset.settingsTab));
});
setSettingsTab(store.get('pc.settings.tab','subs'));
$.btnSettings?.addEventListener('click',()=>{ $.settings.style.display='flex'; setSettingsTab(store.get('pc.settings.tab','subs')); applyAnimClassesToModal(); enforceBackdropPolicy() });
$.btnSettingsClose?.addEventListener('click',()=>{ $.settings.style.display='none' });
$.btnSettingsCloseTop?.addEventListener('click',()=>{ $.settings.style.display='none' });
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
  const preview=getDjPreviewState();
  const previewIndex=preview?.index ?? -1;
  const manualIndex=getDjManualNextIndex();
  state.list.forEach((it,i)=>{
    const el=document.createElement('div'); el.className='pl-item'; el.draggable=true; el.dataset.i=String(i);
    el.setAttribute('aria-current',String(i===state.cur));
    el.style.cssText='display:flex;align-items:center;gap:.6rem;padding:.55rem .7rem;border-bottom:1px solid color-mix(in oklab, var(--panel-2), #000 10%)';
    const fallbackThumb = it.url ? makeIconDataURL('video') : makeIconDataURL(fileLooksLikeAudio(it.file) ? 'audio' : 'video');
    const thumb = getItemThumb(it) || fallbackThumb;
    const rowFlags=[];
    if(i===state.cur) rowFlags.push('NOW');
    else if(i===manualIndex) rowFlags.push('LOCK');
    else if(i===previewIndex && state.dj.enabled) rowFlags.push('NEXT');
    const kindLabel=it.url?'URL':(it.file?'FILE':'?');
    const subLabel=[kindLabel].concat(rowFlags).join(' · ');
    const nextButtonLabel=(i===manualIndex) ? 'LOCK' : ((i===previewIndex && state.dj.enabled) ? 'NEXT' : '＋');
    const nextButtonTitle=(i===manualIndex) ? '固定中の次曲を解除' : 'この曲を次に回す';
    const nextButtonDisabled=i===state.cur || !state.dj.enabled;
    el.innerHTML='<span class="drag">☰</span><div class="pl-thumb" style="width:38px;height:38px;border-radius:10px;overflow:hidden;flex:0 0 auto;background:#0b1017;border:1px solid rgba(255,255,255,.08)"><img alt="" src="'+thumb+'" style="width:100%;height:100%;object-fit:cover;display:block"></div><div class="meta" style="flex:1;min-width:0"><div class="t" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+(it.title||it.url||(it.file?it.file.name:'Item'))+'</div><div class="s" style="color:var(--muted);font-size:12px">'+subLabel+'</div></div><button class="btn ghost qnext" title="'+nextButtonTitle+'"'+(nextButtonDisabled?' disabled':'')+'>'+nextButtonLabel+'</button><button class="btn ghost play">▶</button><button class="btn ghost rm">×</button>';
    el.querySelector('.qnext').onclick=()=>{
      if(i===state.cur) return;
      if(i===manualIndex){
        clearDjNextOverrides();
        state.dj.nextIndex=-1;
        state.dj.syncPlan=null;
        cleanupDjDeck();
        updateDjReadouts();
        renderPlaylist();
        return;
      }
      if(setDjManualNextIndex(i, 'playlist')){
        toast('次曲を固定しました','ok',2200);
      }
    };
    el.querySelector('.play').onclick=()=>{ markUserGesture(); selectIndex(i) };
    el.querySelector('.rm').onclick=()=>{
      if(state.list[i]===state.dj.manualNextItem || state.list[i]===state.dj.rerollSourceItem || state.dj.rerollSkipItems.includes(state.list[i])){
        clearDjNextOverrides();
      }
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
    el.addEventListener('drop',(e)=>{
      e.preventDefault();
      el.style.background='';
      const from=+e.dataTransfer.getData('text/plain');
      const to=i;
      if(from===to) return;
      const m=state.list.splice(from,1)[0];
      state.list.splice(to,0,m);
      renderPlaylist();
      refreshPriorityAnalysisForCurrent(160);
      savePlaylistAuto();
    });
    $.playlist.appendChild(el);
  });
}
function warmupPlaylistThumbs(items){
  items.filter(it=>it?.file).forEach(it=>{
    it._thumbWarmQueued=true;
  });
  scheduleThumbWarmup(360);
}
function findNextThumbWarmupItem(){
  return state.list.find(it=>it?.file && it._thumbWarmQueued && !it._thumbPromise && !it._thumbResolved && !getItemThumb(it)) || null;
}
function scheduleThumbWarmup(delay=420){
  if(thumbWarmupRunning) return;
  if(thumbWarmupTimer){
    clearTimeout(thumbWarmupTimer);
    thumbWarmupTimer=0;
  }
  thumbWarmupTimer=setTimeout(()=>{
    thumbWarmupTimer=0;
    runThumbWarmup().catch(()=>{});
  }, Math.max(0, delay));
}
async function runThumbWarmup(){
  if(thumbWarmupRunning) return;
  if($.loader?.classList.contains('show') || state.dj.handoffPending){
    scheduleThumbWarmup(900);
    return;
  }
  const item=findNextThumbWarmupItem();
  if(!item) return;
  thumbWarmupRunning=true;
  item._thumbWarmQueued=false;
  try{
    const thumb = await resolveFileThumb(item);
    if(thumb){
      renderPlaylist();
      if(state.list[state.cur]===item && !state.isAudioOnly){
        applyThumbAsCurrentCover(thumb, fileLooksLikeAudio(item.file)?'audio':'video');
      }
    }
  }catch(e){}
  finally{
    thumbWarmupRunning=false;
  }
  if(findNextThumbWarmupItem()) scheduleThumbWarmup(520);
}
function refreshPriorityAnalysisForCurrent(delay=120){
  if(state.cur<0 || state.cur>=state.list.length) return;
  const currentItem=state.list[state.cur];
  const nextIndex=getNextTrackIndex();
  const nextItem=nextIndex>=0 ? state.list[nextIndex] : null;
  if(analysisRunningItem && analysisRunningItem!==currentItem && analysisRunningItem!==nextItem){
    cancelActiveTrackAnalysis('reprioritize-current-next');
  }
  markPlaylistAnalysisBusy(2200);
  queueBpmAnalysisAround(state.cur);
  scheduleQueuedAnalysisRun(delay);
}
function addToPlaylist(items,replace){
  if(replace){
    state.list=[];
    state.cur=-1;
  }
  for(let i=0;i<items.length;i++){
    state.list.push(items[i]);
  }
  renderPlaylist();
  warmupPlaylistThumbs(items);
  startPlaylistBpmScan();
  if(state.cur===-1 && state.list.length){
    selectIndex(0);
    return;
  }
  refreshPriorityAnalysisForCurrent(140);
}
async function selectIndex(i, opts={}){
  markPlaylistAnalysisBusy(3200);
  currentMetaToken++;
  if(currentMetaTimer){
    clearTimeout(currentMetaTimer);
    currentMetaTimer=0;
  }
  state.cur=i; renderPlaylist();
  const it=state.list[i]; if(!it) return;
  if(opts.autoAdvance || opts.fromDjDeck){
    it._djLastAutoPickedAt=Date.now();
  }
  debugLog('selectIndex', `${i} ${it.file?.name || it.url || '-'}`);
  clearDjNextOverrides();
  const handoffDeck = opts.fromDjDeck && state.dj.deck?.item===it ? state.dj.deck : null;
  const shouldCarry = !!opts.keepDjCarry && !handoffDeck;
  resetBeatTracking();
  if(shouldCarry){
    state.dj.carryUntil=performance.now()+5200;
    state.dj.carryFrom=clampValue(state.dj.carryFrom||state.dj.rateMul||1, 0.94, 1.08);
    applyDjRateMul(state.dj.carryFrom);
    state.dj.carryPrimed=false;
    state.dj.active=false;
    state.dj.nextIndex=-1;
    state.dj.currentBpm=0;
    state.dj.nextBpm=0;
    state.dj.syncPlan=null;
  }else{
    resetAutoDj(true, !!handoffDeck);
  }
  cancelActiveTrackAnalysis('select-track');
  queueBpmAnalysisAround(i);
  rampTo(0,0.15);
  const autoAdvance=!!opts.autoAdvance || !!handoffDeck;
  const mobileVideoImmediate = autoAdvance || !!(it?.file && fileLooksLikeVideo(it.file) && isMobileLike());
  setTimeout(async()=>{
    safePause(true, !!handoffDeck); if(state.extAudio){ try{state.extAudio.pause()}catch(e){} }
    hideAnalysisLoader({ force:true });
    markUserGesture();
    showLoader({ minMs:260 });
    if(it.url) return loadUrl(it.url, { fromDjDeck: !!handoffDeck, autoAdvance });
    if(it.file){
      state.activeUrl = '';
      resetUiForHTML5(); resetHtml5Video({ preserveDjDeck: !!handoffDeck }); clearAudioMeta();
      let obj = handoffDeck?.src || '';
      const reusedDeckBlob = !!(handoffDeck?.objectUrl && handoffDeck.src===handoffDeck.objectUrl);
      if(!obj){
        obj = URL.createObjectURL(it.file);
      }else if(reusedDeckBlob){
        handoffDeck.objectUrl='';
      }
      if(state.lastObjUrl && state.lastObjUrl!==obj){ try{URL.revokeObjectURL(state.lastObjUrl)}catch(e){} }
      const waitingDjHandoff = beginDjDeckHandoff(handoffDeck, 'selectIndex:dj');
      state.lastObjUrl=/^blob:/i.test(obj) ? obj : '';
      $.v.autoplay = false; $.v.src=obj; $.v.load(); applyCurrentMediaTunables();
      if(fileLooksLikeAudio(it.file)){
        $.audioTitle.textContent = it.title || it.file.name || 'Audio';
        $.audioSub.textContent = 'Local audio';
        updateAudioMetaVisibility();
        scheduleCurrentAudioMeta(it, 1100);
      }else{
        $.audioTitle.textContent = it.title || it.file.name || 'Video';
        $.audioSub.textContent = 'Local video';
        applyThumbAsCurrentCover(getItemThumb(it) || makeIconDataURL('video'), 'video');
        updateAudioMetaVisibility();
        resolveFileThumb(it).then(thumb=>{
          if(!thumb) return;
          renderPlaylist();
          if(state.list[state.cur]===it){
            applyThumbAsCurrentCover(thumb, 'video');
            updateAudioMetaVisibility();
          }
        }).catch(()=>{});
      }
      buildThumbsDebounced();
      if(!waitingDjHandoff){
        requestPlayImmediate(autoAdvance ? 'selectIndex:auto' : 'selectIndex');
      }
      if(!mobileVideoImmediate) setTimeout(()=>rampTo(+($.master?.value||1),0.18),60);
    }
  }, mobileVideoImmediate ? 0 : 160);
}
const savePlaylistAuto=()=>{ store.set('pc.playlist', state.list.map(x=>({ url:(x.url||null), title:(x.title||null) }))) };
function savePlaylistManual(){ savePlaylistAuto(); toast('Playlist saved') }
function loadPlaylist(){ const arr=store.get('pc.playlist',[]); if(!arr.length){ toast('No saved playlist','warn'); return } const items=arr.filter(x=>!!x.url).map(x=>({ url:x.url, title:(x.title||x.url) })); addToPlaylist(items,true); toast('Playlist loaded') }
function clearPlaylistSaved(){ localStorage.removeItem('pc.playlist'); toast('Saved playlist cleared') }

/* ========= Spectrum settings binding ========= */
function applySpecControlsToState(){
  state.spec.mode=$.specMode.value; state.spec.overlayOnVideo=$.specOverlay.checked; state.spec.sens=+$.specSens.value; state.spec.bins=+$.specBins.value; state.spec.hueLow=+$.hueLow.value; state.spec.hueHigh=+$.hueHigh.value; state.spec.sat=+$.sat.value; state.spec.light=+$.light.value; state.spec.rainbowSpeed=+$.rainbowSpeed.value; state.spec.rainbowPhase=+$.rainbowPhase.value;
  state.bpm.beatSync=!!$.beatSync?.checked;
  state.dj.enabled=!!$.autoDj?.checked;
  state.metronome.enabled=!!$.metroEnable?.checked;
  state.metronome.volume=clampValue(+(($.metroVolume?.value)||0.24), 0, 1);
  state.metronome.subdivision=($.metroSubdivision?.value==='eighth') ? 'eighth' : 'quarter';
  state.metronome.visual=$.metroVisual ? !!$.metroVisual.checked : true;
  state.dj.transitionSec=clampValue(+(($.djTransition?.value)||12), 6, 20);
  state.dj.modePref=($.djMode?.value && DJ_MODE_LABELS[$.djMode.value]) ? $.djMode.value : 'auto';
  state.dj.candidateWindow=clampValue(+(($.djCandidateWindow?.value)||5), 2, 8);
  state.dj.repeatGuard=!!$.djRepeatGuard?.checked;
  store.set('pc.spec.mode',state.spec.mode); store.set('pc.spec.overlay',state.spec.overlayOnVideo); store.set('pc.spec.sens',state.spec.sens); store.set('pc.spec.bins',state.spec.bins); store.set('pc.spec.hueLow',state.spec.hueLow); store.set('pc.spec.hueHigh',state.spec.hueHigh); store.set('pc.spec.sat',state.spec.sat); store.set('pc.spec.light',state.spec.light); store.set('pc.spec.rainbowSpeed',state.spec.rainbowSpeed); store.set('pc.spec.rainbowPhase',state.spec.rainbowPhase);
  store.set('pc.bpm.beatSync', state.bpm.beatSync);
  store.set('pc.dj.enabled', state.dj.enabled);
  store.set('pc.metro.enabled', state.metronome.enabled);
  store.set('pc.metro.volume', state.metronome.volume);
  store.set('pc.metro.subdivision', state.metronome.subdivision);
  store.set('pc.metro.visual', state.metronome.visual);
  store.set('pc.dj.transitionSec', state.dj.transitionSec);
  store.set('pc.dj.modePref', state.dj.modePref);
  store.set('pc.dj.candidateWindow', state.dj.candidateWindow);
  store.set('pc.dj.repeatGuard', state.dj.repeatGuard);
  if(!state.metronome.visual) state.metronome.flashQueue.length=0;
  if(state.metronome.enabled){
    try{ ensureAudioOn(); }catch(e){}
    ensureAudioGraph();
  }else{
    resetMetronomeSchedule();
  }
  state._logRanges=null; state._logCenters=null; state.spec.lastDraw=0;
  updateDjReadouts();
}
function initSpecControlsFromState(){
  $.specMode.value=state.spec.mode; $.specOverlay.checked=state.spec.overlayOnVideo; $.specSens.value=state.spec.sens; $.specBins.value=state.spec.bins; $.hueLow.value=state.spec.hueLow; $.hueHigh.value=state.spec.hueHigh; $.sat.value=state.spec.sat; $.light.value=state.spec.light; $.rainbowSpeed.value=state.spec.rainbowSpeed; $.rainbowPhase.value=state.spec.rainbowPhase;
  if($.beatSync) $.beatSync.checked=!!state.bpm.beatSync;
  if($.autoDj) $.autoDj.checked=!!state.dj.enabled;
  if($.metroEnable) $.metroEnable.checked=!!state.metronome.enabled;
  if($.metroVolume) $.metroVolume.value=String(state.metronome.volume);
  if($.metroSubdivision) $.metroSubdivision.value=state.metronome.subdivision || 'quarter';
  if($.metroVisual) $.metroVisual.checked=!!state.metronome.visual;
  if($.djTransition) $.djTransition.value=String(state.dj.transitionSec);
  if($.djMode) $.djMode.value=state.dj.modePref || 'auto';
  if($.djCandidateWindow) $.djCandidateWindow.value=String(state.dj.candidateWindow);
  if($.djRepeatGuard) $.djRepeatGuard.checked=!!state.dj.repeatGuard;
  updateDjReadouts();
}
initSpecControlsFromState();
[$.specMode,$.specOverlay,$.specSens,$.specBins,$.hueLow,$.hueHigh,$.sat,$.light,$.rainbowSpeed,$.rainbowPhase,$.beatSync,$.autoDj,$.metroEnable,$.metroVolume,$.metroSubdivision,$.metroVisual,$.djTransition,$.djMode,$.djCandidateWindow,$.djRepeatGuard].filter(Boolean).forEach(el=>{
  el.addEventListener('change',()=>{ applySpecControlsToState(); updateSpectrumVisibility() });
  el.addEventListener('input',()=>{ applySpecControlsToState(); updateSpectrumVisibility() });
});
$.djNextLock?.addEventListener('click',()=>{
  const preview=getDjPreviewState();
  if(!preview) return;
  if(setDjManualNextIndex(preview.index, 'preview')){
    toast('次曲候補を固定しました','ok',2200);
  }
});
$.djNextReroll?.addEventListener('click',()=>{
  if(rerollDjNextCandidate()){
    toast('次曲候補を選び直しました','ok',2200);
  }
});
$.djNextClear?.addEventListener('click',()=>{
  clearDjNextOverrides();
  state.dj.nextIndex=-1;
  state.dj.syncPlan=null;
  cleanupDjDeck();
  updateDjReadouts();
  renderPlaylist();
  toast('次曲の手動介入を解除しました','ok',2200);
});

/* ========= HTML5 handlers ========= */
function wireMediaErrorHandlers(){
  $.v.onerror=()=>{ const err=$.v.error; debugLog('event:error', err? `code=${err.code}`:'no-error'); hideLoader(); toast('このメディアは再生できません'+(err? ' ('+err.code+')':''),'err',5000) };
  $.v.onloadstart=()=>{ debugLog('event:loadstart', `src=${$.v.currentSrc ? '1' : '0'}`); showLoader() };
  $.v.onloadedmetadata=()=>{ debugLog('event:loadedmetadata', `dur=${fmt($.v.duration||0)} size=${$.v.videoWidth||0}x${$.v.videoHeight||0}`); syncMediaPresentation(); unlockAudioCtx(); startUnmuteWatchdog(); ensureAudioOn(); applyCurrentMediaTunables(); if(state.dj.handoffPending) return; if(state.lastUserGestureAt && (Date.now()-state.lastUserGestureAt)<4000) requestPlayImmediate('loadedmetadata'); else requestPlay('loadedmetadata') };
  $.v.oncanplay=()=>{ debugLog('event:canplay', `ready=${$.v.readyState}`); hideLoader(); unlockAudioCtx(); startUnmuteWatchdog(); ensureAudioOn(); if(state.dj.handoffPending) return; if(state.lastUserGestureAt && (Date.now()-state.lastUserGestureAt)<4000) requestPlayImmediate('canplay'); else requestPlay('canplay') };
  $.v.onwaiting=()=>{ debugLog('event:waiting', `network=${$.v.networkState}`); showLoader() };
  $.v.onplaying=()=>{ debugLog('event:playing', `t=${fmt($.v.currentTime||0)}`); hideLoader(); };
  $.v.onplay=()=>{ debugLog('event:play', `t=${fmt($.v.currentTime||0)}`); try{state.audioCtx && state.audioCtx.state==='suspended' && state.audioCtx.resume()}catch(e){} setPlayingUI(true); enforceBackdropPolicy(); updateDjReadouts() };
  $.v.onpause=()=>{ debugLog('event:pause', `t=${fmt($.v.currentTime||0)}`); setPlayingUI(false); enforceBackdropPolicy(); resetMetronomeSchedule(); updateDjReadouts(); scheduleQueuedAnalysisRun(180); schedulePlaylistBpmScan(500); };
  $.v.onended=()=>{ debugLog('event:ended', `cont=${state.contPlay?'1':'0'}`); enforceBackdropPolicy(); scheduleQueuedAnalysisRun(180); schedulePlaylistBpmScan(500); if(!state.contPlay) return; if(state.list.length>0){ const next=getDjAdvanceIndex(); if(next>=0 && next!==state.cur){ selectIndex(next,{ keepDjCarry: !!state.dj.carryPrimed, autoAdvance:true, fromDjDeck: !!state.dj.deck?.started }) } } };
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
function resetHtml5Video(opts={}){ cancelThumbBuild(true); clearVideoEdgeGlow(); if($.v._hls){ try{$.v._hls.destroy()}catch(e){} $.v._hls=null } stopSpectrum(); safePause(false, !!opts.preserveDjDeck); resetBeatTracking(); if(!opts.preserveDjDeck) resetAutoDj(true); setPortraitFrameMode(false); $.v.srcObject=null; $.v.removeAttribute('src'); $.v.load() }

/* ========= URL読み込み ========= */
async function loadUrl(url, opts={}){
  if(!url) return;
  markPlaylistAnalysisBusy(2600);
  debugLog('loadUrl', url);
  state.activeUrl = url;
  const handoffDeck = opts.fromDjDeck && state.dj.deck?.item===state.list[state.cur] ? state.dj.deck : null;
  hideEmbedError();
  unloadASS(); stopSpectrum(); clearAudioMeta(); forceUnmute(); unlockAudioCtx(); startUnmuteWatchdog();
  if ($.v._hls) { try { $.v._hls.destroy() } catch(e) {} $.v._hls = null }

  if(isYouTube(url)) return switchToYouTube(url);
  if(isNiconico(url)) return switchToIframe(nicoEmbedUrl(url),'niconico');
  if(isSoundCloud(url)) return switchToIframe(scEmbedUrl(url),'soundcloud');
  if (isDash(url)) {
  resetUiForHTML5(); safePause(false, !!handoffDeck);
  $.v.autoplay = false; $.v.removeAttribute('src'); $.v.load(); applyCurrentMediaTunables();
  showLoader({ minMs:260 });
  const waitingDjHandoff = beginDjDeckHandoff(handoffDeck, 'loadUrl:dash:dj');
  try{
    const player = dashjs.MediaPlayer().create();
    window.OPDash?.applyDefaults?.(player); // ← dash.plugin.js の既定を適用
    player.initialize($.v, url, !waitingDjHandoff);
    player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
      debugLog('dash', 'stream-initialized');
      if(!waitingDjHandoff){
        safeVolumeBump(); ensureAudioOn(); requestPlayImmediate('dash:init');
      }
    });
  }catch(e){
    hideLoader({ force:true }); toast('DASH初期化に失敗','err');
  }
  return;
}


  resetUiForHTML5(); safePause(false, !!handoffDeck); $.v.autoplay = false; $.v.removeAttribute('src'); $.v.load(); applyCurrentMediaTunables();
  showLoader({ minMs:260 });
  const waitingDjHandoff = beginDjDeckHandoff(handoffDeck, 'loadUrl:dj');

  if(isHls(url)){
    if(window.Hls && Hls.isSupported()){
      const hls=new Hls({enableWorker:true,maxBufferLength:30});
      $.v._hls=hls; hls.attachMedia($.v);
      hls.on(Hls.Events.MEDIA_ATTACHED,()=>{ hls.loadSource(url) });
      hls.on(Hls.Events.MANIFEST_PARSED,()=>{
        debugLog('hls', 'manifest-parsed');
        if(!waitingDjHandoff){
          safeVolumeBump(); ensureAudioOn(); requestPlayImmediate('hls:manifest');
        }
      });
      hls.on(Hls.Events.ERROR,(_,data)=>{ if(data.fatal){ switch(data.type){ case Hls.ErrorTypes.NETWORK_ERROR:hls.startLoad();break; case Hls.ErrorTypes.MEDIA_ERROR:hls.recoverMediaError();break; default:hls.destroy(); } }});
    } else if($.v.canPlayType('application/vnd.apple.mpegurl')) {
      $.v.addEventListener('loadedmetadata', ()=>{
        if(!waitingDjHandoff){
          safeVolumeBump(); ensureAudioOn(); requestPlayImmediate('hls:native');
        }
      }, { once:true });
      $.v.src=url; applyCurrentMediaTunables();
    } else { hideLoader({ force:true }); toast('HLS not supported','err',6000) }
  } else {
    $.v.src=url; applyCurrentMediaTunables();
    handleAudioMetaForUrl(url).catch(()=>{});
  }
  buildThumbsDebounced();
}

/* ========= open / file / dnd ========= */
;(() => {
  $.openUrl.addEventListener('click',()=>{ markUserGesture(); const u=$.url.value.trim(); if(!u){ toast('URLを入力してね','warn'); return } const it={ url:u, title:u }; const replace=$.dropMode.checked && state.list.length===0; addToPlaylist([it],replace); selectIndex(state.list.length-1); savePlaylistAuto() });
  $.file.addEventListener('change',(e)=>{ markUserGesture(); const files=Array.from(e.target.files||[]); setFileMeta($.fileMeta, files, 'ファイル未選択'); if(!files.length) return; const replace=$.dropMode.checked; addToPlaylist(files.map(f=>({ file:f, title:f.name })),replace); if(state.cur===-1) selectIndex(0); savePlaylistAuto() });
  document.addEventListener('dragover',(e)=>{e.preventDefault()});
  document.addEventListener('drop',(e)=>{ e.preventDefault(); markUserGesture(); const files=Array.from(e.dataTransfer.files||[]); if(!files.length) return; const replace=$.dropMode.checked; addToPlaylist(files.map(f=>({ file:f, title:f.name })),replace); if(state.cur===-1) selectIndex(0); savePlaylistAuto() });
  $.btnClear.addEventListener('click',()=>{ clearDjNextOverrides(); state.list=[]; state.cur=-1; renderPlaylist(); resetUiForHTML5(); resetHtml5Video(); clearAudioMeta(); savePlaylistAuto() });
  $.btnShuffle.addEventListener('click',()=>{ state.list.sort(()=>Math.random()-0.5); renderPlaylist(); refreshPriorityAnalysisForCurrent(180); savePlaylistAuto() });
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
document.addEventListener('visibilitychange',()=>{
  try{
    if(document.hidden){
      if(!shouldKeepBackgroundPlayback()) state.audioCtx?.suspend?.();
    } else {
      state.audioCtx?.resume?.();
      state._updateMediaSession?.();
    }
  }catch(e){}
  try{ updateSpectrumVisibility() }catch(e){}
});
window.addEventListener('resize',()=>{ try{ updateSpectrumVisibility() }catch(e){} });

/* ========= init ========= */
const savedVol=0.9; $.v.volume=savedVol; $.vol.value=savedVol;
const savedRate=1.0; $.v.playbackRate=savedRate; $.rate.value=savedRate;
if($.mixKey) $.mixKey.value='0';
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
  const v=$.v;
  const bridge = OPPlayback.createMediaSessionBridge ? OPPlayback.createMediaSessionBridge({
    getMedia: ()=>v,
    isPaused: ()=>mediaPaused(),
    getMetadata: ()=>currentMetaFromUI(),
    onPlay: ()=>{ requestPlayImmediate('mediaSession').catch(()=>{}); },
    onPause: ()=>{ try{ v.pause() }catch(e){} },
    onSeekBackward: (d)=>{ try{ v.currentTime=Math.max(0, v.currentTime-(d?.seekOffset||10)) }catch(e){} },
    onSeekForward: (d)=>{ try{ v.currentTime=Math.min(v.duration||v.currentTime+10, v.currentTime+(d?.seekOffset||10)) }catch(e){} },
    onSeekTo: (d)=>{ try{ if(typeof d.seekTime==='number') v.currentTime=d.seekTime }catch(e){} },
    onPreviousTrack: ()=>{ if(state.list.length){ const prev=(state.cur-1+state.list.length)%state.list.length; selectIndex(prev) }},
    onNextTrack: ()=>{ if(state.list.length){ const next=(state.cur+1)%state.list.length; selectIndex(next) }}
  }) : null;
  if(!bridge) return;
  function baseTitleFromSrc(src){ try{ const u=new URL(src, location.href); const name=decodeURIComponent(u.pathname.split('/').pop()||''); return (name||'').replace(/\.[^/.]+$/, '') || 'Unknown' }catch(e){ return 'Unknown' } }
  function currentMetaFromUI(){
    const titleTxt=(($.audioTitle?.textContent)||'').trim();
    const subTxt=(($.audioSub?.textContent)||'').trim();
    let artist='',album=''; if(subTxt){ const parts=subTxt.split(' — '); artist=parts[0]||''; album=parts[1]||'' }
    const artwork=(state.mediaArtwork && state.mediaArtwork.length) ? state.mediaArtwork : buildArtworkEntries(state.lastCoverUrl ? [state.lastCoverUrl] : []);
    const title=titleTxt || baseTitleFromSrc(v.currentSrc||'');
    return {title,artist,album,artwork};
  }
  function updateMediaSession(meta){
    const payload = meta || currentMetaFromUI();
    bridge.update({
      title: payload.title || baseTitleFromSrc(v.currentSrc||''),
      artist: payload.artist || '',
      album: payload.album || '',
      artwork: payload.artwork || []
    });
  }
  ['loadedmetadata','play','pause','ratechange','ended'].forEach(ev=>{ v.addEventListener(ev,()=>{ updateMediaSession() }) });
  v.addEventListener('timeupdate', bridge.pushPosition);
  document.addEventListener('visibilitychange', ()=>{
    if(document.hidden && shouldKeepBackgroundPlayback()) updateMediaSession();
  });
  try{
    const mo=new MutationObserver(()=>updateMediaSession());
    if($.audioTitle) mo.observe($.audioTitle,{childList:true,subtree:true,characterData:true});
    if($.audioSub)   mo.observe($.audioSub  ,{childList:true,subtree:true,characterData:true});
  }catch(e){}
  state._updateMediaSession = updateMediaSession;
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
