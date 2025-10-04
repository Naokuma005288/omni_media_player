/* Omni Player — Animation Pack (JS)
   - カバー傾き / カードパララックス
   - 粒子 / ボケのDOM管理（動画再生中は強制OFF）
   - メディア状態を 'op:media-mode' で通知（追加エフェクトが利用）
*/
;(() => {
  const prefersReduced = matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  const S = {
    wrap:null, artWrap:null, bg:null,
    tilt:{ on:false, el:null, rect:null, raf:0, ax:0, ay:0, handler:null, leave:null },
    parallax:{ on:false, el:null, rect:null, raf:0, ax:0, ay:0, z:1, handler:null, leave:null },
    particles:{ on:false, cvs:null, ctx:null, raf:0, items:[] },
    bokeh:{ on:false, host:null, blobs:[] },
    observer:null,
    media:{ videoEl:null, isVideo:false, isPlaying:false, isEmbed:false }
  };

  const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
  const lerp=(a,b,t)=>a+(b-a)*t;

  /* ===== tilt ===== */
  function tiltRAF(){
    S.tilt.raf = requestAnimationFrame(tiltRAF);
    if(!S.tilt.el) return;
    document.documentElement.style.setProperty('--cover-tilt', `rotateX(${S.tilt.ax.toFixed(2)}deg) rotateY(${S.tilt.ay.toFixed(2)}deg)`);
  }
  function onTiltMove(ev){
    if(!S.tilt.el) return;
    const rect = S.tilt.rect || (S.tilt.rect = S.tilt.el.getBoundingClientRect());
    const pt=('touches' in ev)? ev.touches[0] : ev;
    const nx=clamp((pt.clientX-(rect.left+rect.width/2))/(rect.width/2),-1,1);
    const ny=clamp((pt.clientY-(rect.top +rect.height/2))/(rect.height/2),-1,1);
    S.tilt.ay = nx*8; S.tilt.ax = -ny*8;
  }
  function onTiltLeave(){ S.tilt.ax=0; S.tilt.ay=0; S.tilt.rect=null }

  /* ===== parallax ===== */
  function parallaxRAF(){
    S.parallax.raf = requestAnimationFrame(parallaxRAF);
    document.documentElement.style.setProperty('--card-rot', `rotateX(${S.parallax.ax.toFixed(2)}deg) rotateY(${S.parallax.ay.toFixed(2)}deg)`);
    document.documentElement.style.setProperty('--card-zoom', `scale(${S.parallax.z.toFixed(3)})`);
  }
  function onParallaxMove(ev){
    if(!S.parallax.el) return;
    const rect = S.parallax.rect || (S.parallax.rect = S.parallax.el.getBoundingClientRect());
    const pt=('touches' in ev)? ev.touches[0] : ev;
    const nx=clamp((pt.clientX-rect.left)/rect.width,0,1);
    const ny=clamp((pt.clientY-rect.top )/rect.height,0,1);
    const dx=(nx-.5)*2, dy=(ny-.5)*2;
    S.parallax.ay=dx*6; S.parallax.ax=-dy*6; S.parallax.z=lerp(1.0,1.02,Math.hypot(dx,dy));
  }
  function onParallaxLeave(){ S.parallax.ax=0; S.parallax.ay=0; S.parallax.z=1; S.parallax.rect=null }

  /* ===== particles (canvas) ===== */
  function ensureParticleCanvas(){
    if(S.particles.cvs) return;
    const cvs=document.createElement('canvas'); cvs.id='opParticles';
    (S.wrap||document.body).insertBefore(cvs, (S.bg?.nextSibling)||null);
    S.particles.cvs=cvs; S.particles.ctx=cvs.getContext('2d');
    const resize=()=>{
      const rect=(S.wrap||document.body).getBoundingClientRect();
      const dpr=window.devicePixelRatio||1;
      cvs.style.width=rect.width+'px'; cvs.style.height=rect.height+'px';
      cvs.width=Math.max(1,rect.width*dpr); cvs.height=Math.max(1,rect.height*dpr);
    };
    resize(); new ResizeObserver(resize).observe(S.wrap||document.body);
  }
  function startParticles(){
    if(S.particles.on || prefersReduced) return;
    ensureParticleCanvas();
    const {cvs}=S.particles; const W=cvs.width, H=cvs.height;
    const make=()=>({ x:Math.random()*W, y:Math.random()*H, vx:(Math.random()-.5), vy:(Math.random()-.5), r:Math.random()*2+1.2, a:Math.random()*6.28 });
    S.particles.items = new Array(Math.round(Math.min(160, Math.max(40,(W*H)/22000)))).fill(0).map(make);
    S.particles.on=true;
    const step=()=>{
      S.particles.raf = requestAnimationFrame(step);
      const {ctx,items}=S.particles; const W=cvs.width, H=cvs.height;
      ctx.clearRect(0,0,W,H); ctx.globalCompositeOperation='lighter';
      for(const p of items){
        p.x+=p.vx; p.y+=p.vy; p.a+=0.02;
        if(p.x<-10)p.x=W+10; if(p.x>W+10)p.x=-10; if(p.y<-10)p.y=H+10; if(p.y>H+10)p.y=-10;
        const rr=p.r*(1+0.25*Math.sin(p.a)); ctx.beginPath(); ctx.arc(p.x,p.y,rr,0,Math.PI*2);
        ctx.fillStyle=`hsla(${(p.x/W)*260+20},80%,65%,.12)`; ctx.fill();
      }
    };
    S.particles.raf = requestAnimationFrame(step);
  }
  function stopParticles(){
    if(!S.particles.on && !S.particles.cvs) return;
    cancelAnimationFrame(S.particles.raf); S.particles.raf=0; S.particles.on=false; S.particles.items=[];
    S.particles.cvs?.remove(); S.particles.cvs=null; S.particles.ctx=null;
  }

  /* ===== bokeh (div blobs) ===== */
  function startBokeh(){
    if(S.bokeh.on || prefersReduced) return;
    const host=document.createElement('div'); host.id='opBokeh';
    (S.wrap||document.body).insertBefore(host, (S.bg?.nextSibling)||null);
    S.bokeh.host=host; S.bokeh.on=true;
    for(let i=0;i<8;i++){
      const b=document.createElement('div'); b.className='blob';
      const size=(Math.random()*28+18)+'vmin'; b.style.width=size; b.style.height=size;
      b.style.left=(Math.random()*90)+'%'; b.style.top=(Math.random()*70)+'%';
      b.style.animationDuration=(10+Math.random()*8)+'s'; b.style.animationDelay=(-Math.random()*8)+'s';
      b.style.filter=`blur(${Math.round(Math.random()*14+14)}px)`; b.style.opacity=String(0.35+Math.random()*0.35);
      b.style.background=`radial-gradient(circle at 30% 30%, hsla(${Math.round(Math.random()*200+20)}, 90%, 70%, 1), rgba(255,255,255,.06) 60%, transparent 70%)`;
      host.appendChild(b); S.bokeh.blobs.push(b);
    }
  }
  function stopBokeh(){
    if(!S.bokeh.on && !S.bokeh.host) return;
    S.bokeh.on=false; S.bokeh.blobs.forEach(x=>x.remove()); S.bokeh.blobs=[];
    S.bokeh.host?.remove(); S.bokeh.host=null;
  }

  /* ===== policy: video再生中は粒子/ボケ 強制OFF ===== */
  function applyBackgroundPolicy(){
    const forceOff = (S.media.isPlaying && (S.media.isVideo || S.media.isEmbed));
    if(forceOff){ stopParticles(); stopBokeh() }
    else{
      const cl=document.body.classList;
      if(cl.contains('anim-particles')) startParticles(); else stopParticles();
      if(cl.contains('anim-bokeh'))     startBokeh();    else stopBokeh();
    }
    // 追加エフェクト向けに配信
    window.dispatchEvent(new CustomEvent('op:media-mode', {
      detail:{ isVideo:S.media.isVideo, isPlaying:S.media.isPlaying, isEmbed:S.media.isEmbed, forceOff }
    }));
  }
  function recomputeVideoFlag(){
    const v=S.media.videoEl;
    S.media.isVideo = !!(v && v.videoWidth>0 && v.videoHeight>0);
  }
  function bindVideoEvents(v){
    const onMeta=()=>{ recomputeVideoFlag(); applyBackgroundPolicy() };
    const onPlay =()=>{ S.media.isPlaying=true;  applyBackgroundPolicy() };
    const onPause=()=>{ S.media.isPlaying=false; applyBackgroundPolicy() };
    const onEmpty=()=>{ S.media.isPlaying=false; S.media.isVideo=false; applyBackgroundPolicy() };
    v.addEventListener('loadedmetadata', onMeta);
    v.addEventListener('canplay',       onMeta);
    v.addEventListener('play',          onPlay);
    v.addEventListener('pause',         onPause);
    v.addEventListener('emptied',       onEmpty);
  }

  /* ===== class watcher ===== */
  function watchBodyClasses(){
    if(S.observer) return;
    S.observer=new MutationObserver(()=>applyBackgroundPolicy());
    S.observer.observe(document.body,{attributes:true,attributeFilter:['class']});
    applyBackgroundPolicy();
  }

  const OPAnim = {
    init(opts={}){
      S.wrap=opts.wrap||document.getElementById('playerWrap')||document.body;
      S.artWrap=opts.artWrap||document.getElementById('artWrap');
      S.bg=opts.bg||document.getElementById('bgArt');
      document.addEventListener('visibilitychange', ()=>{
        const hid=document.hidden;
        if(hid){ cancelAnimationFrame(S.tilt.raf); S.tilt.raf=0; cancelAnimationFrame(S.parallax.raf); S.parallax.raf=0; cancelAnimationFrame(S.particles.raf); S.particles.raf=0; }
        else{
          if(S.tilt.on && !S.tilt.raf)      S.tilt.raf=requestAnimationFrame(tiltRAF);
          if(S.parallax.on && !S.parallax.raf)S.parallax.raf=requestAnimationFrame(parallaxRAF);
        }
      });
      watchBodyClasses();
    },
    bindMedia(videoEl){
      S.media.videoEl = videoEl || document.querySelector('video');
      if(S.media.videoEl) bindVideoEvents(S.media.videoEl);
      recomputeVideoFlag(); S.media.isPlaying = !S.media.videoEl?.paused;
      applyBackgroundPolicy();
    },
    setEmbedPlaying(on){ S.media.isEmbed=!!on; applyBackgroundPolicy() },

    enableCoverTilt(el){ if(prefersReduced) return; S.tilt.el=el||S.artWrap; if(!S.tilt.el||S.tilt.on) return; S.tilt.on=true;
      S.tilt.handler=(e)=>onTiltMove(e); S.tilt.leave=()=>onTiltLeave();
      window.addEventListener('mousemove', S.tilt.handler);
      window.addEventListener('touchmove', S.tilt.handler, {passive:true});
      window.addEventListener('mouseleave', S.tilt.leave);
      S.tilt.raf=requestAnimationFrame(tiltRAF);
    },
    disableCoverTilt(){ if(!S.tilt.on) return; S.tilt.on=false;
      window.removeEventListener('mousemove', S.tilt.handler);
      window.removeEventListener('touchmove', S.tilt.handler);
      window.removeEventListener('mouseleave', S.tilt.leave);
      cancelAnimationFrame(S.tilt.raf); S.tilt.raf=0; S.tilt.el=null; S.tilt.rect=null; S.tilt.ax=0; S.tilt.ay=0;
      document.documentElement.style.setProperty('--cover-tilt','rotateX(0deg) rotateY(0deg)');
    },

    enableCardParallax(el){ if(prefersReduced) return; S.parallax.el=el||S.wrap; if(!S.parallax.el||S.parallax.on) return; S.parallax.on=true;
      S.parallax.handler=(e)=>onParallaxMove(e); S.parallax.leave=()=>onParallaxLeave();
      S.parallax.el.addEventListener('mousemove', S.parallax.handler);
      S.parallax.el.addEventListener('touchmove', S.parallax.handler, {passive:true});
      S.parallax.el.addEventListener('mouseleave', S.parallax.leave);
      S.parallax.raf=requestAnimationFrame(parallaxRAF);
    },
    disableCardParallax(){ if(!S.parallax.on) return; S.parallax.on=false;
      S.parallax.el?.removeEventListener('mousemove', S.parallax.handler);
      S.parallax.el?.removeEventListener('touchmove', S.parallax.handler);
      S.parallax.el?.removeEventListener('mouseleave', S.parallax.leave);
      cancelAnimationFrame(S.parallax.raf); S.parallax.raf=0;
      S.parallax.el=null; S.parallax.rect=null; S.parallax.ax=0; S.parallax.ay=0; S.parallax.z=1;
      document.documentElement.style.setProperty('--card-rot','rotateX(0deg) rotateY(0deg)');
      document.documentElement.style.setProperty('--card-zoom','scale(1)');
    }
  };

  window.OPAnim = OPAnim;
})();
