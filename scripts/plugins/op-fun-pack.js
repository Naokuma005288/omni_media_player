;(() => {
  const F = { wrap:null, bg:null, cvs:null, ctx:null, raf:0, on:false, policyOff:false, stars:[], vel:1 };

  function ensureCanvas(){
    if(F.cvs) return;
    const cvs=document.createElement('canvas'); cvs.id='opStarfield';
    (F.wrap||document.body).insertBefore(cvs, (F.bg?.nextSibling)||null);
    F.cvs=cvs; F.ctx=cvs.getContext('2d');
    const resize=()=>{
      const rect=(F.wrap||document.body).getBoundingClientRect();
      const dpr=window.devicePixelRatio||1;
      cvs.style.width=rect.width+'px'; cvs.style.height=rect.height+'px';
      cvs.width=Math.max(1,rect.width*dpr); cvs.height=Math.max(1,rect.height*dpr);
      seed();
    };
    resize(); new ResizeObserver(resize).observe(F.wrap||document.body);
  }
  function seed(){
    const W=F.cvs.width, H=F.cvs.height;
    const n=Math.round(Math.min(600, Math.max(120,(W*H)/14000)));
    F.stars = new Array(n).fill(0).map(()=>({ x:(Math.random()*2-1)*W, y:(Math.random()*2-1)*H, z: Math.random()*W }));
  }
  function step(){
    F.raf = requestAnimationFrame(step);
    const {ctx,cvs}=F; const W=cvs.width, H=cvs.height; const cx=W/2, cy=H/2;
    ctx.clearRect(0,0,W,H); ctx.beginPath();
    for(const s of F.stars){
      s.z -= F.vel*6; if(s.z<=1){ s.x=(Math.random()*2-1)*W; s.y=(Math.random()*2-1)*H; s.z=W }
      const k = 128/s.z, px=cx+s.x*k, py=cy+s.y*k, r=Math.max(.5, 2 - s.z/W*2);
      if(px<0||px>W||py<0||py>H) continue;
      ctx.moveTo(px,py); ctx.arc(px,py,r,0,6.283);
    }
    ctx.fillStyle='rgba(255,255,255,.85)'; ctx.fill();
  }
  function run(){ if(F.on||F.policyOff) return; ensureCanvas(); F.on=true; if(!F.raf) F.raf=requestAnimationFrame(step) }
  function halt(){ if(!F.on && !F.cvs) return; F.on=false; cancelAnimationFrame(F.raf); F.raf=0; F.cvs?.remove(); F.cvs=null; F.ctx=null }
  function apply(){
    const cl=document.body.classList;
    if(F.policyOff) halt(); else if(cl.contains('anim-starfield')) run(); else halt();
  }

  const OPFun={
    init(opts={}){
      F.wrap=opts.wrap||document.getElementById('playerWrap')||document.body;
      F.bg=opts.bg||document.getElementById('bgArt');
      window.addEventListener('op:media-mode', (e)=>{ F.policyOff=!!(e.detail?.forceOff); apply() });
      new MutationObserver(apply).observe(document.body,{attributes:true,attributeFilter:['class']});
      apply();
    },
    setSpeed(x){ F.vel=Math.max(.2,Math.min(3,+x||1)) }
  };
  window.OPFun=OPFun;
})();
