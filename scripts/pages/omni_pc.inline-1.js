/* ===== util & refs ===== */
const qs=(s,r=document)=>r.querySelector(s);
const qsa=(s,r=document)=>Array.from(r.querySelectorAll(s));
const $={
  v:qs('#v'),wrap:qs('#playerWrap'),bgArt:qs('#bgArt'),
  seek:qs('#seek'),seekProg:qs('#seekProg'),seekThumb:qs('#seekThumb'),seekPrev:qs('#seekPrev'),seekImg:qs('#seekImg'),seekTime:qs('#seekTime'),
  toasts:qs('#toasts'),url:qs('#url'),openUrl:qs('#openUrl'),file:qs('#fileInput'),
  srt:qs('#srtInput'),aud:qs('#audInput'),btnUnloadSub:qs('#btnUnloadSub'),btnUnloadAud:qs('#btnUnloadAud'),driftMode:qs('#driftMode'),
  subSize:qs('#subSize'),subOutline:qs('#subOutline'),subMargin:qs('#subMargin'),subPreset:qs('#subPreset'),
  subColor:qs('#subColor'), subFont:qs('#subFont'), subPos:qs('#subPos'), subOffset:qs('#subOffset'),
  subTrack:qs('#subTrack'),
  vol:qs('#vol'),rate:qs('#rate'),master:qs('#master'),
  play:qs('#play'),back10:qs('#back10'),fwd10:qs('#fwd10'),pip:qs('#pip'), fullscreen:qs('#fullscreen'),
  setA:qs('#setA'),setB:qs('#setB'),clearAB:qs('#clearAB'),abDisp:qs('#abDisp'),toggleABLoop:qs('#toggleABLoop'),abLoopStat:qs('#abLoopStat'),
  playlist:qs('#playlist'),btnClear:qs('#btnClear'),btnShuffle:qs('#btnShuffle'),dropMode:qs('#dropMode'),contPlay:qs('#contPlay'),
  helpBtn:qs('#kbdHelp')?qs('#btnHelp'):null,help:qs('#kbdHelp'),
  btnExportAB:qs('#btnExportAB'),btnExportStart:qs('#btnExportStart'),btnExportStop:qs('#btnExportStop'),
  saveList:qs('#saveList'),loadList:qs('#loadList'),clearList:qs('#clearList'),
  themeSelect:qs('#themeSelect'),
  themeSelect2:qs('#themeSelect2'),
  assLayer:qs('#assLayer'), spectrum:qs('#spectrum'),
  fontInput:qs('#fontInput'), btnClearFonts:qs('#btnClearFonts'),
  audioInfo:qs('#audioInfo'), audioCover:qs('#audioCover'), audioTitle:qs('#audioTitle'), audioSub:qs('#audioSub'),
  // Settings modal
  settings:qs('#settings'), btnSettings:qs('#btnSettings'), btnSettingsClose:qs('#btnSettingsClose'),
  // tabs
  tabs:qsa('.tab'), panels:qsa('[data-panel]'),
  // Spectrum settings
  specMode:qs('#specMode'), specOverlay:qs('#specOverlay'), specSens:qs('#specSens'), specBins:qs('#specBins'),
  hueLow:qs('#hueLow'), hueHigh:qs('#hueHigh'), sat:qs('#sat'), light:qs('#light'),
  rainbowSpeed:qs('#rainbowSpeed'), rainbowPhase:qs('#rainbowPhase'), pMax:qs('#pMax'), pLife:qs('#pLife'),
  // 字幕検索
  subSearch:qs('#subSearch'), btnSubSearch:qs('#btnSubSearch'), subHits:qs('#subHits'),
  // EQ
  eqGrid:qs('#eqGrid'), eqPreset:qs('#eqPreset'), eqBypass:qs('#eqBypass'), eqState:qs('#eqState'),
  // quality
  quality:qs('#quality'),
  // settings I/O
  btnExportSettings:qs('#btnExportSettings'), importSettings:qs('#importSettings'),
  vizOnVideo:qs('#vizOnVideo')
};
function toast(msg,type='ok',timeout=3400){
  const d=document.createElement('div');d.className='t '+type;d.textContent=msg;$.toasts.appendChild(d);setTimeout(()=>d.remove(),timeout);
}
const store={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const fmt=s=>{if(s==null||isNaN(s))return '-';const sec=Math.floor(s%60).toString().padStart(2,'0');const m=Math.floor(s/60);return m+':'+sec};

/* ===== State ===== */
const state={
  list:[],cur:-1,a:null,b:null,abLoop:false,
  yt:null,usingYouTube:false,iframe:null,usingIframe:false,ytEl:null,
  dash:null,
  extAudio:null,driftTimer:null,
  ass:null,assUrl:null,assFonts:[],
  theme:store.get('pc.theme','auto'),
  audioCtx:null,analyser:null,mediaNode:null,outGain:null,comp:null,
  // EQ
  eq:{ filters:[], enabled: store.get('pc.eq.enabled', true), values: store.get('pc.eq.values', null), preset: store.get('pc.eq.preset','flat') },
  // spectrum
  spec:{
    bins: store.get('pc.spec.bins',160),
    peakHoldMs: 550, peakFallDbPerS: 28, smoothAlpha: 0.28,
    data:null, peaks:null, peakY:null, lastDraw:0, maxFps: 48, sens: store.get('pc.spec.sens',1.05),
    pausedFade:0,
    mode: store.get('pc.spec.mode','mono'),
    overlayOnVideo: store.get('pc.spec.overlay', false),
    hueLow: store.get('pc.spec.hueLow',18),
    hueHigh: store.get('pc.spec.hueHigh',260),
    sat: store.get('pc.spec.sat',90),
    light: store.get('pc.spec.light',80),
    rainbowSpeed: store.get('pc.spec.rainbowSpeed',0.2),
    rainbowPhase: store.get('pc.spec.rainbowPhase',0),
    pMax: store.get('pc.spec.pMax',420),
    pLife: store.get('pc.spec.pLife',2.4)
  },
  // subtitles
  subCues:[], subBaseTimes:[], subOffsetMs: store.get('pc.sub.offset',0),
  subColor: store.get('pc.sub.color','#ffffff'),
  subFont: store.get('pc.sub.font',''),
  subPos: store.get('pc.sub.pos','bottom'),
  contPlay: store.get('pc.contPlay', true)
};

/* ===== Theme ===== */
function applyTheme(t){
  state.theme=t; store.set('pc.theme',t);
  const root=document.documentElement;
  const prefersDark=window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  root.classList.toggle('light', t==='light' || (t==='auto' && !prefersDark));
}
applyTheme(state.theme);
$.themeSelect.value=state.theme;
$.themeSelect.addEventListener('change',e=>applyTheme(e.target.value));
if($.themeSelect2){ $.themeSelect2.value=state.theme; $.themeSelect2.addEventListener('change',e=>applyTheme(e.target.value)); }

/* ===== Audio & EQ Graph ===== */
function ensureAudioGraph(){
  if(!state.audioCtx) state.audioCtx=new (window.AudioContext||window.webkitAudioContext)();
  if(!state.mediaNode) state.mediaNode = state.audioCtx.createMediaElementSource($.v);
  if(!state.eq.filters.length) state.eq.filters = makeEqFilters(state.audioCtx);
  if(!state.comp){
    const c = state.audioCtx.createDynamicsCompressor();
    c.threshold.value=-24;c.knee.value=24;c.ratio.value=3;c.attack.value=0.003;c.release.value=0.25;
    state.comp=c;
  }
  if(!state.outGain){
    const g = state.audioCtx.createGain(); g.gain.value=+($.master?.value||1); state.outGain=g;
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
  return bands.map(b=>{ const biq=ac.createBiquadFilter(); biq.type=b.type; biq.frequency.value=b.f; biq.Q.value=(b.type==='peaking'?0.8:0.7); biq.gain.value=0; return biq; });
}
function restoreEqValues(){
  const vals = state.eq.values;
  if(!vals) return;
  state.eq.filters.forEach((f,i)=>{ f.gain.value = state.eq.enabled ? (vals[i]||0) : 0; });
  qsa('#eqGrid input[type="range"]').forEach((r,i)=>{ r.value = vals[i]||0; const t=qs('#eqv'+i); if(t) t.textContent=String(vals[i]||0); });
}
function applyEqPreset(name){
  let vals = Array(10).fill(0);
  if(name==='bass'){ vals = [6,4,2,0,0,0,-1,-2,-3,-4]; }
  if(name==='vocal'){ vals = [-2,-2,0,1,3,4,3,1,0,-1]; }
  if(name==='treble'){ vals = [-3,-3,-2,-1,0,0,2,4,5,6]; }
  qsa('#eqGrid input[type="range"]').forEach((r,i)=>{
    r.value = vals[i];
    const t=qs('#eqv'+i); if(t) t.textContent=String(vals[i]);
    if(state.eq.filters[i]) state.eq.filters[i].gain.value = state.eq.enabled ? vals[i] : 0;
  });
  state.eq.values = vals; store.set('pc.eq.values', vals); state.eq.preset = name; store.set('pc.eq.preset', name);
}
function buildEqUI(){
  const freqs=['32','64','125','250','500','1k','2k','4k','8k','16k'];
  $.eqGrid.innerHTML='';
  freqs.forEach((f,i)=>{
    const cell=document.createElement('div'); cell.className='eq-cell';
    cell.innerHTML =
      '<label class="subtitle">'+f+'Hz</label>'+
      '<input type="range" min="-12" max="12" step="0.5" value="0" data-band="'+i+'" />'+
      '<div class="subtitle"><span id="eqv'+i+'">0</span> dB</div>';
    $.eqGrid.appendChild(cell);
  });
  $.eqGrid.addEventListener('input',(ev)=>{
    const r=ev.target; if(!(r instanceof HTMLInputElement)) return;
    const i=+r.dataset.band; const v=+r.value;
    const t=qs('#eqv'+i); if(t) t.textContent=String(v);
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
    state.eq.filters.forEach((f,i)=>{ f.gain.value = state.eq.enabled ? vals[i] : 0; });
  };
}
ensureAudioGraph(); buildEqUI();
if(state.eq.values){ restoreEqValues() } else { applyEqPreset(state.eq.preset||'flat') }

/* ===== Visualizer (簡易バー) ===== */
function stopSpectrum(){ if(state.spectrumRAF){ cancelAnimationFrame(state.spectrumRAF); state.spectrumRAF=0 } if ($.spectrum) $.spectrum.style.display='none' }
function startSpectrum(){
  ensureAudioGraph();
  $.spectrum.style.display='block';
  const draw=()=>{
    state.spectrumRAF=requestAnimationFrame(draw);
    const c=$.spectrum.getContext('2d'); const dpr=window.devicePixelRatio||1;
    const rect=$.wrap.getBoundingClientRect(); const H=Math.max(40,Math.floor(rect.height*0.3)); const W=Math.max(200,Math.floor(rect.width));
    $.spectrum.width=W*dpr; $.spectrum.height=H*dpr; $.spectrum.style.height=H+'px';
    c.scale(dpr,dpr); c.clearRect(0,0,W,H);
    const an=state.analyser; if(!an) return;
    if(!state.spec.data||state.spec.data.length!==an.frequencyBinCount) state.spec.data=new Uint8Array(an.frequencyBinCount);
    an.getByteFrequencyData(state.spec.data);
    const bins=state.spec.bins; const bw=W/bins; c.fillStyle='rgba(255,255,255,.88)';
    for(let i=0;i<bins;i++){
      const idx=Math.floor(i/an.frequencyBinCount*bins);
      const v=state.spec.data[idx]||0; const h=(v/255)*H;
      c.fillRect(i*bw,H-h,bw*0.7,h);
    }
  };
  state.spectrumRAF=requestAnimationFrame(draw);
}

/* ===== Subtitles ===== */
function unloadTracks(){
  qsa('track',$.v).forEach(t=>{ try{ if(t.src && t.src.startsWith('blob:')) URL.revokeObjectURL(t.src) }catch(e){}; t.remove(); });
  state.subCues=[]; state.subBaseTimes=[]; $.subHits.innerHTML=''; $.subTrack.innerHTML='<option value="">（なし）</option>';
}
function srtToVtt(srt){ const vtt='WEBVTT\n\n'+srt.replace(/\r/g,'').replace(/^(\d+)$/gm,'').replace(/(\d\d:\d\d:\d\d),(\d{3})/g,'$1.$2'); return new Blob([vtt],{type:'text/vtt'}) }
async function attachSrtOrVttFromFile(file){
  unloadTracks();
  const txt=await file.text();
  const blob=file.name.endsWith('.vtt')? new Blob([txt],{type:'text/vtt'}): srtToVtt(txt);
  const url=URL.createObjectURL(blob);
  const tr=document.createElement('track');
  tr.kind='subtitles'; tr.label=file.name; tr.srclang='ja'; tr.default=true; tr.src=url;
  $.v.appendChild(tr);
  tr.addEventListener('load',()=>{ tr.mode='showing'; collectCues(true); toast('Subtitles loaded'); populateTrackList() });
}
function unloadASS(){ if(state.ass){ try{state.ass.dispose()}catch(e){} state.ass=null } if(state.assUrl){ try{URL.revokeObjectURL(state.assUrl)}catch(e){} state.assUrl=null; $.assLayer.innerHTML='' } }
function initASSWithUrl(subUrl){ unloadTracks(); const workerUrl='https://cdn.jsdelivr.net/npm/subtitles-octopus@0.6.4/dist/subtitles-octopus-worker.js'; state.ass=new SubtitlesOctopus({ video: $.v, subUrl: subUrl, workerUrl: workerUrl, fonts: state.assFonts.map(f=>f.url), renderMode:'wasm', targetFps:60, blendRender:true, prescaleFactor:1 }); toast('ASS loaded') }
async function attachASSFromFile(file){ const blob=new Blob([await file.arrayBuffer()],{type:'text/plain'}); const url=URL.createObjectURL(blob); state.assUrl=url; initASSWithUrl(url); }
function collectCues(rebuildBase=false){
  try{
    state.subCues=[]; state.subBaseTimes=[];
    const tracks=$.v.textTracks;
    for(let i=0;i<tracks.length;i++){
      const tr=tracks[i]; tr.mode='hidden';
      for(const c of tr.cues||[]){
        state.subCues.push(c);
        if(rebuildBase) state.subBaseTimes.push({c,start:c.startTime,end:c.endTime});
      }
    }
  }catch(e){}
}
function applySubOffset(){
  const off = (+$.subOffset.value||0)/1000;
  store.set('pc.sub.offset', +$.subOffset.value||0);
  if(!state.subBaseTimes.length){ collectCues(true) }
  for(const {c,start,end} of state.subBaseTimes){
    try{ c.startTime=Math.max(0,start+off); c.endTime=Math.max(0,end+off) }catch(e){}
  }
  toast('字幕オフセット: '+(off>=0?'+':'')+Math.round(off*1000)+'ms');
}
function applySubStyle(){
  const size=+$.subSize.value||28, outline=+$.subOutline.value||3, margin=+$.subMargin.value||30;
  const color=$.subColor.value || '#ffffff';
  const font=($.subFont.value||'').trim();
  const pos=$.subPos.value==='top'?'translateY('+margin+'px)':'translateY(-'+margin+'px)';
  let style=qs('#sub-style'); if(!style){ style=document.createElement('style'); style.id='sub-style'; document.head.appendChild(style) }
  const fam = font? 'font-family:'+font+', "Noto Sans JP", system-ui;' : 'font-family:"Noto Sans JP", system-ui;';
  style.textContent =
    'video::cue{'+fam+'font-size:'+size+'px;line-height:1.2;color:'+color+';text-shadow:0 0 '+outline+'px rgba(0,0,0,.9);}\n'+
    'video::-webkit-media-text-track-container{transform:'+pos+';}';
  store.set('pc.sub.color', color); store.set('pc.sub.font', font); store.set('pc.sub.pos', $.subPos.value);
}
function bindSubControls(){
  const presetMap={std:{size:28,outline:3,margin:30},large:{size:40,outline:4,margin:40},small:{size:20,outline:2,margin:20},shadow:{size:28,outline:6,margin:30}};
  $.subPreset.addEventListener('change',e=>{ const p=presetMap[e.target.value]||presetMap.std; $.subSize.value=p.size; $.subOutline.value=p.outline; $.subMargin.value=p.margin; applySubStyle(); });
  ['input','change'].forEach(ev=>{
    $.subSize.addEventListener(ev,applySubStyle);
    $.subOutline.addEventListener(ev,applySubStyle);
    $.subMargin.addEventListener(ev,applySubStyle);
    $.subColor.addEventListener(ev,applySubStyle);
    $.subFont.addEventListener(ev,applySubStyle);
    $.subPos.addEventListener(ev,applySubStyle);
  });
  $.subOffset.addEventListener('change',applySubOffset);
}
function populateTrackList(){
  $.subTrack.innerHTML='<option value="">（なし）</option>';
  const tracks=$.v.textTracks||[];
  for(let i=0;i<tracks.length;i++){
    const tr=tracks[i]; const label=tr.label||tr.language||('track '+(i+1));
    const opt=document.createElement('option'); opt.value=String(i); opt.textContent=label; $.subTrack.appendChild(opt);
    if(tr.mode==='showing') $.subTrack.value=String(i);
  }
}
$.subTrack.addEventListener('change',()=>{
  const idx = $.subTrack.value==='' ? -1 : +$.subTrack.value;
  const tracks=$.v.textTracks||[];
  for(let i=0;i<tracks.length;i++) tracks[i].mode = (i===idx)?'showing':'disabled';
});
function searchSubs(q){
  $.subHits.innerHTML='';
  const needle=(q||'').trim().toLowerCase(); if(!needle) return;
  collectCues(false);
  const res=state.subCues
    .map((c,idx)=>({idx,c,t:String(c.text||'').toLowerCase()}))
    .filter(x=>x.t.includes(needle))
    .slice(0,200);
  for(const h of res){
    const div=document.createElement('div'); div.className='hit';
    const raw=String(h.c.text||''); const rx=new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi');
    const snip=raw.replace(rx, function(m){return '<b>'+m+'</b>';});
    div.innerHTML='<span>'+fmt(h.c.start)+'–'+fmt(h.c.end)+'</span><br>'+snip;
    div.onclick=function(){ $.v.currentTime=h.c.start+0.05; requestPlay(); };
    $.subHits.appendChild(div);
  }
  toast(res.length+'件ヒット');
}
$.btnSubSearch.addEventListener('click',()=> searchSubs($.subSearch.value));
$.subSearch.addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); searchSubs($.subSearch.value) }});

/* ===== External Audio Sync ===== */
async function attachAudio(file){
  detachAudio();
  const url=URL.createObjectURL(file); state.extAudioUrl=url; const a=new Audio(url);
  a.crossOrigin='anonymous'; a.loop=false; state.extAudio=a;
  const tick=function(){
    if(!state.extAudio||state.usingYouTube||state.usingIframe) return;
    const v=$.v; const A=state.extAudio; const diff=(A.currentTime||0)-(v.currentTime||0);
    const mode=$.driftMode.value; const thr=mode==='strong'?0.05:mode==='std'?0.12:99999;
    if(Math.abs(diff)>thr){ A.currentTime=v.currentTime }
    if(!v.paused && A.paused) A.play().catch(function(){});
    if(v.paused && !A.paused) A.pause();
    state.driftTimer=setTimeout(tick,120);
  };
  tick();
  toast('External audio loaded');
}
function detachAudio(){
  if(state.driftTimer){clearTimeout(state.driftTimer);state.driftTimer=null}
  if(state.extAudio){try{state.extAudio.pause()}catch(e){} state.extAudio=null }
  if(state.extAudioUrl){ try{URL.revokeObjectURL(state.extAudioUrl)}catch(e){} state.extAudioUrl=null }
}

/* ===== Playback & UI ===== */
function setPlayingUI(on){ document.body.classList.toggle('is-playing', !!on); $.play.textContent = on? '⏸' : '▶︎' }
function rampTo(value,t){ try{ ensureAudioGraph(); const g=state.outGain; const now=state.audioCtx.currentTime; const v0=g.gain.value; g.gain.cancelScheduledValues(now); g.gain.setValueAtTime(v0,now); g.gain.linearRampToValueAtTime(value, now+Math.max(0.01,t||0.12)) }catch(e){} }
async function requestPlay(){
  if(state.usingYouTube||state.usingIframe){ if(state.usingYouTube){ try{state.yt.playVideo()}catch(e){} } setPlayingUI(true); return; }
  try{ ensureAudioGraph(); rampTo(+($.master?.value||1),0.12); const p=$.v.play(); if(p&&typeof p.then==='function'){ await p } setPlayingUI(true); if(state.extAudio && !$.v.paused && state.extAudio.paused){ try{ await state.extAudio.play() }catch(e){} } }catch(err){ toast('再生に失敗: '+(err && err.name ? err.name : 'Error'),'warn',5000) }
}
function safePause(){
  if(state.usingYouTube){ try{state.yt.pauseVideo()}catch(e){} setPlayingUI(false); return }
  try{ ensureAudioGraph(); rampTo(0,0.12); setTimeout(function(){ try{$.v.pause()}catch(e){} setPlayingUI(false) },130) }catch(e){ try{$.v.pause()}catch(err){} setPlayingUI(false) }
}

/* ===== Seekbar ===== */
function mediaDuration(){ return state.usingYouTube ? (state.yt && state.yt.getDuration ? state.yt.getDuration() : 0) : ($.v.duration||0) }
function mediaCurrent(){ return state.usingYouTube ? (state.yt && state.yt.getCurrentTime ? state.yt.getCurrentTime() : 0) : ($.v.currentTime||0) }
function mediaSeekTo(t){
  if(state.usingYouTube){ try{ state.yt.seekTo(t,true) }catch(e){}; return }
  if(!state.usingIframe){ $.v.currentTime=Math.max(0, Math.min($.v.duration||0, t)) }
}
function updateSeekUI(){ const dur=mediaDuration(), cur=mediaCurrent(); if(dur<=0) return; const p=100*(cur/dur); $.seekProg.style.width=p+'%'; $.seekThumb.style.left=p+'%'; $.seek.setAttribute('aria-valuenow',String(Math.round(p))) }
function startSeekRAF(){ cancelAnimationFrame(state.seekRAF); const draw=function(){ state.seekRAF=requestAnimationFrame(draw); updateSeekUI(); if(state.abLoop && state.a!=null && state.b!=null && state.b>state.a){ const cur=mediaCurrent(); if(cur>=state.b-0.02){ mediaSeekTo(state.a) } } }; state.seekRAF=requestAnimationFrame(draw) }
startSeekRAF();
(function(){
  let dragging=false;
  function seekFromClientX(x){ const rect=$.seek.getBoundingClientRect(); const ratio=Math.min(1,Math.max(0,(x-rect.left)/rect.width)); mediaSeekTo((mediaDuration()||0)*ratio); rampTo(+($.master?.value||1),0.06) }
  function showPreview(x){ const rect=$.seek.getBoundingClientRect(); const ratio=Math.min(1,Math.max(0,(x-rect.left)/rect.width)); const t=(mediaDuration()||0)*ratio; $.seekPrev.style.display='block'; $.seekPrev.style.left=(rect.left+ratio*rect.width)+'px'; $.seekTime.textContent=fmt(t); $.seekImg.removeAttribute('src'); }
  const onMove=function(clientX){ showPreview(clientX); if(dragging) seekFromClientX(clientX) };
  $.seek.addEventListener('mousedown',function(e){ dragging=true; onMove(e.clientX); e.preventDefault() });
  window.addEventListener('mousemove',function(e){ if(dragging) onMove(e.clientX) });
  window.addEventListener('mouseup',function(){ if(dragging){ dragging=false; $.seekPrev.style.display='none' } });
  $.seek.addEventListener('touchstart',function(e){ dragging=true; onMove(e.touches[0].clientX) },{passive:false});
  $.seek.addEventListener('touchmove',function(e){ if(dragging) onMove(e.touches[0].clientX) },{passive:false});
  $.seek.addEventListener('touchend',function(){ dragging=false; $.seekPrev.style.display='none' });
  $.seek.addEventListener('mousemove',function(e){ if(!dragging) onMove(e.clientX) });
  $.seek.addEventListener('mouseleave',function(){ if(!dragging) $.seekPrev.style.display='none' });
})();

/* ===== Keyboard ===== */
document.addEventListener('keydown',function(e){
  if(e.key===' '){ e.preventDefault(); $.play.click() }
  if(e.key==='ArrowLeft') $.back10.click();
  if(e.key==='ArrowRight') $.fwd10.click();
  if(e.key==='['){ $.rate.value=(+$.rate.value-0.05).toFixed(2); $.rate.dispatchEvent(new Event('input')) }
  if(e.key===']'){ $.rate.value=(+$.rate.value+0.05).toFixed(2); $.rate.dispatchEvent(new Event('input')) }
  if(e.key==='f'){$.fullscreen.click()}
  if(e.key==='a'){ $.setA.click() } if(e.key==='b'){ $.setB.click() } if(e.key==='r'){ $.clearAB.click() } if(e.key==='l'){ $.toggleABLoop.click() }
});

/* ===== Controls ===== */
$.play.onclick=function(){ if($.v.paused) requestPlay(); else safePause(); };
$.back10.onclick=function(){ mediaSeekTo(Math.max(0, mediaCurrent()-10)) };
$.fwd10.onclick=function(){ mediaSeekTo(Math.min(mediaDuration(), mediaCurrent()+10)) };
$.pip.onclick=async function(){ if(state.usingYouTube||state.usingIframe){ toast('PiP not available for embed','warn'); return } try{ if(document.pictureInPictureElement){ await document.exitPictureInPicture() } else { await $.v.requestPictureInPicture() } }catch(e){ toast('PiP unsupported','warn') } };
$.vol.oninput=function(){ if(!state.usingIframe){ $.v.volume=+$.vol.value; if(state.extAudio) state.extAudio.volume=$.v.volume } store.set('pc.vol',$.vol.value) };
$.rate.oninput=function(){ if(!state.usingIframe){ $.v.playbackRate=+$.rate.value; if(state.extAudio) state.extAudio.playbackRate=$.v.playbackRate } store.set('pc.rate',$.rate.value) };
$.master.oninput=function(){ ensureAudioGraph(); const v=+$.master.value; try{ state.outGain.gain.setTargetAtTime(v, state.audioCtx.currentTime, 0.05) }catch(e){ state.outGain.gain.value=v } };
$.fullscreen.onclick=function(){ if(!document.fullscreenElement){ try{ $.wrap.requestFullscreen() }catch(e){toast('Fullscreen failed','err')} } else { try{ document.exitFullscreen() }catch(e){} } };

/* ===== A/B ===== */
function syncABDisp(){ $.abDisp.textContent='A:'+(state.a!=null?fmt(state.a):'-')+' B:'+(state.b!=null?fmt(state.b):'-'); $.abLoopStat.textContent='AB Loop: '+(state.abLoop?'ON':'OFF'); }
$.setA.onclick=function(){ state.a=mediaCurrent(); syncABDisp() };
$.setB.onclick=function(){ state.b=mediaCurrent(); syncABDisp() };
$.clearAB.onclick=function(){ state.a=null; state.b=null; state.abLoop=false; syncABDisp() };
$.toggleABLoop.onclick=function(){ if(state.a==null||state.b==null||!(state.b>state.a)){ toast('A/Bを設定してから','warn'); return } state.abLoop=!state.abLoop; syncABDisp(); toast(state.abLoop?'ABループON':'ABループOFF', state.abLoop?'ok':'warn') };
syncABDisp();

/* ===== Export (captureStream) ===== */
function canCapture(){ try{ return !!$.v.captureStream?.() }catch(e){ return false } }
let rec=null, recChunks=[];
function startRecording(){ if(rec){ toast('Recording...','warn'); return } if(state.usingYouTube||state.usingIframe){ toast('Embed not recordable','err'); return } if(!canCapture()){ toast('Capture not supported','err'); return } const stream=$.v.captureStream(); recChunks=[]; const r=new MediaRecorder(stream,{mimeType:'video/webm;codecs=vp9,opus'}); r.ondataavailable=function(e){ if(e.data && e.data.size>0) recChunks.push(e.data) }; r.onstop=function(){ const blob=new Blob(recChunks,{type:'video/webm'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='clip.webm'; a.click(); toast('Exported') }; rec=r; r.start(); toast('REC start') }
function stopRecording(){ if(!rec){ toast('Not recording','warn'); return } rec.stop(); rec=null }
async function exportAB(){ if(state.a==null||state.b==null||!(state.b>state.a)){ toast('Set A/B','warn'); return } if(state.usingYouTube||state.usingIframe){ toast('Embed not recordable','err'); return } if(!canCapture()){ toast('Capture not supported','err'); return } $.v.currentTime=state.a; requestPlay(); const stopAt=state.b; const tick=function(){ if((mediaCurrent()||0)>=stopAt-0.02){ stopRecording(); safePause(); return } requestAnimationFrame(tick) }; startRecording(); requestAnimationFrame(tick) }
$.btnExportStart.onclick=startRecording; $.btnExportStop.onclick=stopRecording; $.btnExportAB.onclick=exportAB;

/* ===== Playlist ===== */
function renderPlaylist(){
  $.playlist.innerHTML='';
  state.list.forEach(function(it,i){
    const el=document.createElement('div'); el.className='playlist-item'; el.dataset.i=String(i);
    el.innerHTML='<span class="drag">☰</span>'+
      '<div class="meta"><div class="t">'+(it.title||it.url||(it.file?it.file.name:'Item'))+'</div>'+
      '<div class="s" style="color:var(--muted);font-size:12px">'+(it.url?'URL':(it.file?'FILE':'?'))+'</div></div>'+
      '<button class="btn ghost play">▶</button><button class="btn ghost rm">×</button>';
    el.querySelector('.play').onclick=function(){ selectIndex(i) };
    el.querySelector('.rm').onclick=function(){ state.list.splice(i,1); if(i===state.cur){state.cur=-1; $.v.removeAttribute('src'); stopSpectrum()} renderPlaylist(); savePlaylistAuto(); };
    $.playlist.appendChild(el);
  });
}
function addToPlaylist(items,replace){
  if(replace){state.list=[];state.cur=-1}
  for(let i=0;i<items.length;i++){ state.list.push(items[i]) }
  renderPlaylist();
  if(state.cur===-1 && state.list.length) selectIndex(0)
}
async function selectIndex(i){
  state.cur=i; renderPlaylist();
  const it=state.list[i]; if(!it) return;
  safePause();
  if(it.url) return loadUrl(it.url);
  if(it.file){
    resetUiForHTML5(); clearAudioMeta();
    const obj=URL.createObjectURL(it.file);
    if(state.lastObjUrl){ try{URL.revokeObjectURL(state.lastObjUrl)}catch(e){} }
    state.lastObjUrl=obj; $.v.src=obj; $.v.load(); handleAudioMetaForFile(it.file);
    requestPlay(); startSpectrum();
  }
}
const savePlaylistAuto=function(){ store.set('pc.playlist', state.list.map(function(x){return { url:(x.url||null), title:(x.title||null) }; })) };
function savePlaylistManual(){ savePlaylistAuto(); toast('Playlist saved') }
function loadPlaylist(){ const arr=store.get('pc.playlist',[]); if(!arr.length){ toast('No saved playlist','warn'); return } const items=arr.filter(function(x){return !!x.url}).map(function(x){return { url:x.url, title:(x.title||x.url) }}); addToPlaylist(items,true); toast('Playlist loaded') }
function clearPlaylistSaved(){ localStorage.removeItem('pc.playlist'); toast('Saved playlist cleared') }
$.saveList.addEventListener('click',savePlaylistManual);
$.loadList.addEventListener('click',loadPlaylist);
$.clearList.addEventListener('click',clearPlaylistSaved);
$.btnClear.addEventListener('click',function(){ state.list=[]; state.cur=-1; renderPlaylist(); $.v.removeAttribute('src'); stopSpectrum(); clearAudioMeta(); savePlaylistAuto(); });
$.btnShuffle.addEventListener('click',function(){ state.list.sort(function(){return Math.random()-0.5}); renderPlaylist(); savePlaylistAuto(); });
$.contPlay.addEventListener('change',function(){ state.contPlay=$.contPlay.checked; store.set('pc.contPlay', state.contPlay) });

/* ===== Sources & URL ===== */
const isYouTube=function(u){ return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(u) };
const isHls=function(u){ return /\.m3u8($|\?)/i.test(u) };
const isDash=function(u){ return /\.mpd($|\?)/i.test(u) };
const isVimeo=function(u){ return /vimeo\.com\/(?!live)/i.test(u) };
const isDailymotion=function(u){ return /dailymotion\.com|dai\.ly\//i.test(u) };
const isNiconico=function(u){ return /nicovideo\.jp\/watch\//i.test(u) };
const isSoundCloud=function(u){ return /soundcloud\.com\//i.test(u) };
function extractYouTubeId(url){try{const u=new URL(url); if(u.hostname.includes('youtu.be'))return u.pathname.slice(1); if(u.searchParams.get('v'))return u.searchParams.get('v'); const m=u.pathname.match(/\/embed\/([\w-]+)/); if(m) return m[1];}catch(e){} return null;}
const nicoEmbedUrl=function(url){try{const u=new URL(url); const id=u.pathname.split('/').pop(); return 'https://embed.nicovideo.jp/watch/'+id+'?autoplay=1'}catch(e){ return null}};
const scEmbedUrl=function(url){try{const enc=encodeURIComponent(url); return 'https://w.soundcloud.com/player/?url='+enc+'&auto_play=true'}catch(e){ return null}};
const vimeoEmbedUrl=function(url){ try{ const u=new URL(url); const id = u.pathname.split('/').filter(function(p){return p}).pop(); return 'https://player.vimeo.com/video/'+id+'?autoplay=1&muted=0' }catch(e){ return null } };
const dmEmbedUrl=function(url){ try{ const u=new URL(url); let id=''; if(u.hostname.includes('dai.ly')) id=u.pathname.slice(1); else { const m=u.pathname.match(/video\/([^_?/]+)/); id=m?m[1]:''; } return id?('https://www.dailymotion.com/embed/video/'+id+'?autoplay=1'):null }catch(e){ return null } };
function injectYTApi(){ if(window.YT && window.YT.Player) return Promise.resolve(); return new Promise(function(res){ const s=document.createElement('script'); s.src='https://www.youtube.com/iframe_api'; window.onYouTubeIframeAPIReady=function(){res()}; document.head.appendChild(s); }); }

function switchToIframe(src,type){
  state.usingIframe=true; state.usingYouTube=false; if(state.dash){ try{state.dash.reset()}catch(e){} state.dash=null }
  unloadASS(); stopSpectrum(); clearAudioMeta(); safePause();
  $.v.style.display='none'; if(state.iframe){ state.iframe.remove() }
  const ifr=document.createElement('iframe'); ifr.allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'; ifr.referrerPolicy='strict-origin-when-cross-origin'; ifr.loading='lazy'; ifr.src=src; ifr.style.border='0'; ifr.style.width='100%'; ifr.style.height='100%'; $.wrap.appendChild(ifr); state.iframe=ifr;
  toast(type+' を埋め込み再生中');
  $.quality.innerHTML='<option value="auto">Auto</option>';
}
async function switchToYouTube(url){
  state.usingYouTube=true; state.usingIframe=false; if(state.dash){ try{state.dash.reset()}catch(e){} state.dash=null }
  unloadASS(); stopSpectrum(); clearAudioMeta(); safePause();
  $.v.style.display='none';
  if(state.iframe){ state.iframe.remove(); state.iframe=null }
  const old=state.ytEl||document.getElementById('yt'); if(old){ try{old.remove()}catch(e){} state.ytEl=null }
  const id=extractYouTubeId(url); if(!id){toast('Invalid YouTube URL','err');return}
  await injectYTApi();
  const holder=document.createElement('div'); holder.id='yt'; holder.style.width='100%'; holder.style.height='100%'; $.wrap.appendChild(holder); state.ytEl=holder;
  state.yt=new YT.Player('yt',{videoId:id,playerVars:{rel:0,playsinline:1},events:{ onReady:function(e){ e.target.playVideo(); startSeekRAF(); }, onStateChange:function(){ startSeekRAF(); }, onError:function(e){ toast('YouTube error: '+e.data,'err') } }});
  $.quality.innerHTML='<option value="auto">Auto</option>';
}
function resetUiForHTML5(){
  state.usingYouTube=false; state.usingIframe=false;
  if(state.yt){ try{state.yt.destroy?.()}catch(e){} state.yt=null; } const yEl=state.ytEl||document.getElementById('yt'); if(yEl){ try{yEl.remove()}catch(e){} state.ytEl=null }
  if(state.iframe){ state.iframe.remove(); state.iframe=null }
  if(state.dash){ try{state.dash.reset()}catch(e){} state.dash=null }
  $.v.style.display='block';
  $.quality.innerHTML='<option value="auto">Auto</option>';
}
function resetHtml5Video(){ if($.v._hls){ try{$.v._hls.destroy()}catch(e){} $.v._hls=null } stopSpectrum(); safePause(); $.v.srcObject=null; $.v.removeAttribute('src'); $.v.load(); }

async function loadUrl(url){
  if(!url) return;
  unloadASS(); stopSpectrum(); clearAudioMeta(); safePause();
  if ($.v._hls) { try { $.v._hls.destroy() } catch(e) {} $.v._hls = null }
  if (state.dash){ try{ state.dash.reset() }catch(e){} state.dash=null }

  if(isYouTube(url)) return switchToYouTube(url);
  if(isVimeo(url)) return switchToIframe(vimeoEmbedUrl(url),'Vimeo');
  if(isDailymotion(url)) return switchToIframe(dmEmbedUrl(url),'Dailymotion');
  if(isNiconico(url)) return switchToIframe(nicoEmbedUrl(url),'Niconico');
  if(isSoundCloud(url)) return switchToIframe(scEmbedUrl(url),'SoundCloud');

  resetUiForHTML5(); resetHtml5Video();

  if(isHls(url)){
    if(window.Hls && window.Hls.isSupported()){
      const hls=new Hls({enableWorker:true,maxBufferLength:30});
      $.v._hls=hls; hls.attachMedia($.v);
      hls.on(Hls.Events.MEDIA_ATTACHED,function(){ hls.loadSource(url) });
      hls.on(Hls.Events.MANIFEST_PARSED,function(){ buildQualityForHls(hls); requestPlay(); startSpectrum(); });
      hls.on(Hls.Events.ERROR,function(_,data){ if(data.fatal){ switch(data.type){ case Hls.ErrorTypes.NETWORK_ERROR:hls.startLoad();break; case Hls.ErrorTypes.MEDIA_ERROR:hls.recoverMediaError();break; default:hls.destroy(); } }});
    } else if($.v.canPlayType('application/vnd.apple.mpegurl')) {
      $.v.src=url; requestPlay(); startSpectrum();
      $.quality.innerHTML='<option value="auto">Auto</option>';
    } else { toast('HLS not supported','err',6000) }
  } else if(isDash(url)){
    try{
      const player = dashjs.MediaPlayer().create();
      player.initialize($.v, url, true);
      state.dash=player;
      player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED,function(){ buildQualityForDash(player); requestPlay(); startSpectrum(); });
    }catch(e){ toast('DASH not supported','err',6000) }
  } else {
    $.v.src=url; $.v.load(); requestPlay(); startSpectrum(); handleAudioMetaForUrl(url);
  }
}
function buildQualityForHls(hls){
  const lv=hls.levels||[]; $.quality.innerHTML='<option value="auto">Auto</option>';
  lv.forEach(function(L,i){
    const label=(L.height? L.height+'p' : (L.bitrate? Math.round(L.bitrate/1000)+'kbps' : 'L'+i));
    const opt=document.createElement('option'); opt.value=String(i); opt.textContent=label; $.quality.appendChild(opt);
  });
  $.quality.onchange=function(){ const v=$.quality.value; if(v==='auto') hls.currentLevel=-1; else hls.currentLevel=+v; toast('Quality: '+$.quality.options[$.quality.selectedIndex].text) };
}
function buildQualityForDash(player){
  const bitrates = player.getBitrateInfoListFor('video')||[];
  $.quality.innerHTML='<option value="auto">Auto</option>';
  bitrates.forEach(function(b){
    const label=(b.height? b.height+'p' : Math.round(b.bitrate/1000)+'kbps');
    const opt=document.createElement('option'); opt.value=String(b.qualityIndex); opt.textContent=label; $.quality.appendChild(opt);
  });
  $.quality.onchange=function(){ const v=$.quality.value; if(v==='auto'){ player.setAutoSwitchQualityFor('video',true); } else { player.setAutoSwitchQualityFor('video',false); player.setQualityFor('video', +v); } toast('Quality: '+$.quality.options[$.quality.selectedIndex].text) };
}

/* ===== Audio meta/art ===== */
function clearAudioMeta(){
  $.audioCover.removeAttribute('src'); $.audioTitle.textContent=''; $.audioSub.textContent='';
  $.bgArt.style.backgroundImage='none'; $.bgArt.classList.remove('show');
}
async function handleAudioMetaForFile(file){
  clearAudioMeta();
  try{
    const mm=await musicMetadata.parseBlob(file);
    const pic=mm.common && mm.common.picture && mm.common.picture[0];
    let coverUrl=null;
    if(pic && pic.data){
      const type=pic.format||'image/jpeg';
      coverUrl=URL.createObjectURL(new Blob([pic.data],{type:type}));
    }
    const title=(mm.common && (mm.common.title||'')) || file.name || '';
    const artist=mm.common && (mm.common.artist|| (mm.common.artists && mm.common.artists[0]) || '');
    const album=mm.common && (mm.common.album||'');
    const fmt=mm.format && (mm.format.container||mm.format.codec||'');
    const sr=mm.format && mm.format.sampleRate ? Math.round(mm.format.sampleRate) : '';
    const ch=mm.format && mm.format.numberOfChannels || '';
    const br=mm.format && mm.format.bitrate ? Math.round(mm.format.bitrate/1000) : '';
    const dur=mm.format && mm.format.duration ? Math.round(mm.format.duration) : '';
    setAudioMetaView({coverUrl,title,artist,album,fmt,sr,ch,br,dur}, file.name);
  }catch(e){
    setAudioMetaView(null,file.name);
  }
}
async function handleAudioMetaForUrl(url){
  clearAudioMeta();
  try{
    const res=await fetch(url,{mode:'cors'}); const blob=await res.blob();
    const name=url.split('/').pop()||url;
    let meta=null;
    try{ meta=await musicMetadata.parseBlob(blob) }catch(e){}
    let coverUrl=null,title='',artist='',album='',fmt='',sr='',ch='',br='',dur='';
    if(meta){
      const pic=meta.common && meta.common.picture && meta.common.picture[0];
      if(pic && pic.data){ const type=pic.format||'image/jpeg'; coverUrl=URL.createObjectURL(new Blob([pic.data],{type:type})); }
      title=(meta.common && meta.common.title)||name||'';
      artist=meta.common && (meta.common.artist|| (meta.common.artists && meta.common.artists[0]) || '');
      album=meta.common && meta.common.album || '';
      fmt=meta.format && (meta.format.container||meta.format.codec||'');
      sr=meta.format && meta.format.sampleRate ? Math.round(meta.format.sampleRate) : '';
      ch=meta.format && meta.format.numberOfChannels || '';
      br=meta.format && meta.format.bitrate ? Math.round(meta.format.bitrate/1000) : '';
      dur=meta.format && meta.format.duration ? Math.round(meta.format.duration) : '';
      setAudioMetaView({coverUrl,title,artist,album,fmt,sr,ch,br,dur}, name);
    } else {
      setAudioMetaView(null, name);
    }
  }catch(e){
    setAudioMetaView(null, url.split('/').pop()||url);
  }
}
function makeIconDataURL(kind){
  const bg1='#1b2432',bg2='#0f1622',fg='#e8edf2';
  const glyph= kind==='audio'
    ? 'M480 256v192c0 17.7-14.3 32-32 32H320v64h64c35.3 0 64 28.7 64 64H256V384h64v64h128V256h32zM96 448a96 96 0 1 0 0-192a96 96 0 1 0 0 192zM320 0l128 128H320V0z'
    : 'M64 0h256l128 128v352c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0z';
  const svg='<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 512 512">'+
  '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="'+bg1+'"/><stop offset="100%" stop-color="'+bg2+'"/></linearGradient></defs>'+
  '<rect width="512" height="512" rx="64" ry="64" fill="url(#g)"/><path fill="'+fg+'" d="'+glyph+'"/></svg>';
  return URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));
}
function setAudioMetaView(meta, fallback){
  const title=(meta && meta.title)||fallback||'';
  const lines=[]; if(meta && meta.artist) lines.push(meta.artist); if(meta && meta.album) lines.push(meta.album);
  const parts=[]; if(meta && meta.fmt) parts.push(meta.fmt); if(meta && meta.sr) parts.push(meta.sr+'Hz'); if(meta && meta.ch) parts.push(meta.ch+'ch'); if(meta && meta.br) parts.push(meta.br+'kbps'); if(meta && meta.dur) parts.push(meta.dur+'s');
  const sub=[lines.join(' / '),parts.join(' / ')].filter(function(x){return !!x}).join(' — ');
  let cover = meta && meta.coverUrl;
  if(!cover){ cover = makeIconDataURL('audio'); }
  $.audioCover.src=cover;
  $.bgArt.style.backgroundImage = meta && meta.coverUrl ? 'url("'+meta.coverUrl+'")' : 'none';
  $.bgArt.classList.toggle('show', !!(meta && meta.coverUrl));
  $.audioTitle.textContent=title;
  $.audioSub.textContent=sub;
  const isAudio=($.v.videoWidth===0&&$.v.videoHeight===0);
  $.audioInfo.style.display = (isAudio && !state.usingYouTube && !state.usingIframe) ? 'flex' : 'none';
}

/* ===== HTML5 handlers ===== */
function wireMediaErrorHandlers(){
  $.v.onerror=function(){ const err=$.v.error; toast('このメディアは再生できません'+(err? ' ('+err.code+')':''),'err',5000) };
  $.v.onloadedmetadata=function(){ updateSeekUI(); requestPlay(); collectCues(true); populateTrackList(); applySubOffset(); startSpectrum(); };
  $.v.oncanplay=function(){ requestPlay() };
  $.v.onplay=function(){ setPlayingUI(true) };
  $.v.onpause=function(){ setPlayingUI(false) };
  $.v.onended=function(){ if(!state.contPlay) return; if(state.list.length>0){ const next=(state.cur+1)%state.list.length; if(next!==state.cur){ selectIndex(next); } } }
}
wireMediaErrorHandlers();

/* ===== Inputs / DragDrop ===== */
$.openUrl.addEventListener('click',function(){ const u=$.url.value.trim(); if(!u){ toast('URLを入力してね','warn'); return } const it={ url: u, title: u }; const replace=$.dropMode.checked && state.list.length===0; addToPlaylist([it],replace); selectIndex(state.list.length-1); savePlaylistAuto(); });
$.file.addEventListener('change',function(e){ const files=Array.from(e.target.files||[]); if(!files.length) return; const replace=$.dropMode.checked; addToPlaylist(files.map(function(f){return { file: f, title: f.name }}),replace); if(state.cur===-1) selectIndex(0); savePlaylistAuto(); });
document.addEventListener('dragover',function(e){e.preventDefault()});
document.addEventListener('drop',function(e){ e.preventDefault(); const files=Array.from(e.dataTransfer.files||[]); if(!files.length) return; const replace=$.dropMode.checked; addToPlaylist(files.map(function(f){return { file: f, title: f.name }}),replace); if(state.cur===-1) selectIndex(0); savePlaylistAuto(); });
document.getElementById('btnUnloadSub').addEventListener('click',function(){unloadTracks();unloadASS();toast('字幕解除')});
document.getElementById('btnClearFonts').addEventListener('click',function(){ state.assFonts=[]; toast('ASSフォント解除') });
document.getElementById('fontInput').addEventListener('change',async function(e){
  const files=Array.from(e.target.files||[]);
  state.assFonts = await Promise.all(files.map(async function(f){return {name:f.name,url:URL.createObjectURL(f)};}));
  toast('フォント追加: '+files.length);
});
document.getElementById('srtInput').addEventListener('change',async function(e){
  const f=e.target.files && e.target.files[0]; if(!f) return;
  if(f.name.endsWith('.ass')) await attachASSFromFile(f); else await attachSrtOrVttFromFile(f);
});
document.getElementById('audInput').addEventListener('change',function(e){ const f=e.target.files && e.target.files[0]; if(f) attachAudio(f) });
document.getElementById('btnUnloadAud').addEventListener('click',detachAudio);

/* ===== Subtitle style init/bind ===== */
applySubStyle(); bindSubControls();

/* ===== Settings modal basic ===== */
if($.btnSettings){ $.btnSettings.addEventListener('click',function(){ $.settings.style.display='flex' }) }
if($.btnSettingsClose){ $.btnSettingsClose.addEventListener('click',function(){ $.settings.style.display='none' }) }
if($.settings){ $.settings.addEventListener('click',function(e){ if(e.target===$.settings) $.settings.style.display='none' }) }
$.tabs.forEach(function(t){ t.addEventListener('click',function(){ $.tabs.forEach(function(x){x.setAttribute('aria-selected','false')}); t.setAttribute('aria-selected','true'); const key=t.dataset.tab; $.panels.forEach(function(p){ p.style.display = (p.dataset.panel===key)?'grid':'none' }); }) });

/* ===== Export settings I/O ===== */
$.btnExportSettings.addEventListener('click',function(){
  const data={
    theme: state.theme,
    sub:{ color: state.subColor, font: state.subFont, pos: state.subPos, offset: state.subOffsetMs },
    spec: state.spec, eq:{ enabled: state.eq.enabled, values: state.eq.values, preset: state.eq.preset },
    contPlay: state.contPlay
  };
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download='omni_player_settings.json'; a.click();
  setTimeout(function(){URL.revokeObjectURL(url)}, 1000);
});
$.importSettings.addEventListener('change',async function(e){
  const f=e.target.files && e.target.files[0]; if(!f) return;
  try{
    const data=JSON.parse(await f.text());
    if(data.theme){ applyTheme(data.theme); $.themeSelect.value=data.theme; if($.themeSelect2) $.themeSelect2.value=data.theme; }
    if(data.sub){ if(data.sub.color){ $.subColor.value=data.sub.color } if(data.sub.font!=null){ $.subFont.value=data.sub.font } if(data.sub.pos){ $.subPos.value=data.sub.pos } if(isFinite(+data.sub.offset)){ $.subOffset.value=+data.sub.offset } applySubStyle(); applySubOffset(); }
    if(data.spec){ Object.assign(state.spec, data.spec); startSpectrum(); }
    if(data.eq){ state.eq.enabled=!!data.eq.enabled; state.eq.values=data.eq.values||state.eq.values; state.eq.preset=data.eq.preset||state.eq.preset; ensureAudioGraph(); restoreEqValues(); $.eqState.textContent= state.eq.enabled? 'ON' : 'BYPASS' }
    if('contPlay' in data){ state.contPlay=!!data.contPlay; $.contPlay.checked=state.contPlay; }
    toast('設定を読み込みました');
  }catch(e){ toast('読み込みに失敗しました','err') }
});

/* ===== Init ===== */
(function init(){
  const savedVol=store.get('pc.vol',0.9); $.v.volume=savedVol; $.vol.value=savedVol;
  const savedRate=store.get('pc.rate',1.0); $.v.playbackRate=savedRate; $.rate.value=savedRate;
  $.subColor.value = state.subColor;
  $.subFont.value = state.subFont;
  $.subPos.value = state.subPos;
  $.subOffset.value = state.subOffsetMs || 0;
  // 字幕プリセット初期値反映
  (function(){ const m={std:{size:28,outline:3,margin:30}}; const p=m.std; $.subSize.value=p.size; $.subOutline.value=p.outline; $.subMargin.value=p.margin; applySubStyle(); })();
  renderPlaylist();
  startSeekRAF();
})();
