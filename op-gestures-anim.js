<!-- op-gestures-anim.js -->
<script>
(() => {
  const qs=(s,r=document)=>r.querySelector(s);
  const $wrap = qs('#playerWrap');
  const $v = qs('#v');
  const $seek = qs('#seek');
  const $ctrl = qs('.ctrl');

  const state = window.state || (window.state={});
  const toast = window.toast || ((m)=>console.log('[toast]',m));

  // --- CSS注入（UIフェード & ダブルタップガイド）
  const css = `
    .ui-fade .ctrl, .ui-fade .seekbar { transition: opacity .25s ease, visibility .25s ease }
    .ui-hide .ctrl, .ui-hide .seekbar { opacity:0; visibility:hidden; pointer-events:none }
    .tap-hint { position:absolute; inset:auto; bottom:18%; width:120px; height:120px; border-radius:999px;
      border:2px solid rgba(255,255,255,.85); opacity:0; transform:scale(.6); pointer-events:none; z-index:40; }
    .tap-hint.show { animation: tap-pop .45s ease both }
    .tap-hint.left  { left:12% }
    .tap-hint.right { right:12% }
    @keyframes tap-pop { 0%{opacity:0;transform:scale(.6)} 20%{opacity:.95;transform:scale(1)} 100%{opacity:0;transform:scale(1.25)} }
  `;
  const st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  // ヒント円
  function pulse(side){
    const d=document.createElement('div');
    d.className='tap-hint '+side+' show';
    $wrap.appendChild(d);
    setTimeout(()=>d.remove(), 500);
  }

  // --- UIオートフェード
  let uiTimer=0;
  function showUI(){
    document.body.classList.add('ui-fade');
    document.body.classList.remove('ui-hide');
    clearTimeout(uiTimer);
    uiTimer=setTimeout(()=>document.body.classList.add('ui-hide'), 2500);
  }
  ['mousemove','mousedown','keydown','touchstart'].forEach(ev=>{
    document.addEventListener(ev, showUI, {passive:true});
  });
  showUI();

  // --- 高速アクセス関数（埋め込み対応）
  const media = {
    duration(){ return state.usingYouTube ? (state.yt?.getDuration?.()||0) : ($v.duration||0) },
    current(){  return state.usingYouTube ? (state.yt?.getCurrentTime?.()||0) : ($v.currentTime||0) },
    seek(t){    if(state.usingYouTube){ try{state.yt?.seekTo?.(t,true)}catch(e){} } else { $v.currentTime=Math.max(0,Math.min($v.duration||0,t)) } },
    paused(){   return state.usingYouTube ? !(state.yt && state.yt.getPlayerState && state.yt.getPlayerState()===1) : !!$v.paused },
    play(){     return state.usingYouTube ? state.yt?.playVideo?.() : $v.play() },
    pause(){    return state.usingYouTube ? state.yt?.pauseVideo?.() : $v.pause() },
  };

  // --- タッチジェスチャ
  let lastTapT=0, lastTapX=0, pressTimer=0, longPressed=false;

  function onTap(e){
    const now=performance.now();
    const x=(e.touches? e.touches[0].clientX : e.clientX);
    const rect=$wrap.getBoundingClientRect();
    const rel=(x-rect.left)/rect.width;
    const dt=now-lastTapT;
    const isDouble = (dt<300 && Math.abs(x-lastTapX)<150);

    if(isDouble){
      if(rel<0.45){
        // back 10s
        const t=Math.max(0, media.current()-10);
        media.seek(t);
        pulse('left');
        toast('⟲ 10s');
      }else if(rel>0.55){
        const t=Math.min(media.duration(), media.current()+10);
        media.seek(t);
        pulse('right');
        toast('⟳ 10s');
      }else{
        // 中央ダブルはPiPなどに振ってもOK
      }
      lastTapT=0; lastTapX=0;
    }else{
      // シングルタップ = 再生/停止
      if(media.paused()) media.play(); else media.pause();
      lastTapT=now; lastTapX=x;
    }
  }

  function onPressStart(){
    clearTimeout(pressTimer);
    longPressed=false;
    pressTimer=setTimeout(()=>{
      longPressed=true;
      if(!media.paused()) media.pause();
    }, 450);
  }
  function onPressEnd(){
    clearTimeout(pressTimer);
    if(longPressed) { media.play() }
  }

  // プレイヤー面でのみ発火
  $wrap.addEventListener('touchstart', (e)=>{ onPressStart(); showUI() }, {passive:true});
  $wrap.addEventListener('touchend',   (e)=>{ onPressEnd(); onTap(e); }, {passive:true});
  $wrap.addEventListener('click',      (e)=>{ onTap(e) });

  // --- 音連動ワブル（軽め）
  function startWobble(){
    if(!state.analyser) return; // 初回はAudioGraph初期化後
    let raf=0;
    const run=()=>{
      raf=requestAnimationFrame(run);
      try{
        // 動画ではオフ、音声時のみ
        const isAudio = ($v.videoWidth===0 && $v.videoHeight===0 && !state.usingYouTube && !state.usingIframe);
        if(!isAudio){ document.documentElement.style.setProperty('--card-wobble', 'translate3d(0,0,0)'); return; }

        const N=256;
        const arr=new Uint8Array(Math.min(N, state.analyser.fftSize));
        state.analyser.getByteTimeDomainData(arr);
        let acc=0; for(let i=0;i<arr.length;i++){ const v=(arr[i]-128)/128; acc+=v*v }
        const rms=Math.sqrt(acc/arr.length); // 0..~0.5程度
        const y= Math.min(6, rms*24); // px
        document.documentElement.style.setProperty('--card-wobble', `translate3d(0, ${y.toFixed(2)}px, 0)`);
      }catch(e){}
    };
    raf=requestAnimationFrame(run);
  }

  // AudioGraphが遅れて作られる場合があるのでリトライ
  let retries=0;
  const wait = setInterval(()=>{
    if(state.analyser){ clearInterval(wait); startWobble() }
    if(++retries>60) clearInterval(wait);
  }, 250);
})();
</script>
