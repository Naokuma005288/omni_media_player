;(() => {
  const A = { wrap:null, bg:null, host:null, on:false, policyOff:false };

  function makeHost(){
    if(A.host) return;
    const d=document.createElement('div'); d.id='opAurora';
    for(let i=0;i<3;i++){ const w=document.createElement('div'); w.className='wave'; d.appendChild(w) }
    (A.wrap||document.body).insertBefore(d, (A.bg?.nextSibling)||null);
    A.host=d;
  }
  function run(){ if(A.on||A.policyOff) return; makeHost(); A.on=true }
  function halt(){ if(!A.on && !A.host) return; A.on=false; A.host?.remove(); A.host=null }

  function apply(){
    const cl=document.body.classList;
    if(A.policyOff) halt(); else if(cl.contains('anim-aurora')) run(); else halt();
  }

  const OPAurora={
    init(opts={}){
      A.wrap=opts.wrap||document.getElementById('playerWrap')||document.body;
      A.bg=opts.bg||document.getElementById('bgArt');
      window.addEventListener('op:media-mode', (e)=>{ A.policyOff=!!(e.detail?.forceOff); apply() });
      new MutationObserver(apply).observe(document.body,{attributes:true,attributeFilter:['class']});
      apply();
    }
  };
  window.OPAurora=OPAurora;
})();
