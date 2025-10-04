;(() => {
  const G = { wrap:null, bg:null, host:null, on:false, policyOff:false };

  function makeHost(){
    if(G.host) return;
    const root=document.createElement('div'); root.id='opGrid';
    const plane=document.createElement('div'); plane.className='plane';
    const fade =document.createElement('div'); fade.className='fade';
    const scan =document.createElement('div'); scan.className='scan';
    root.appendChild(plane); root.appendChild(fade); root.appendChild(scan);
    (G.wrap||document.body).insertBefore(root, (G.bg?.nextSibling)||null);
    G.host=root;
  }
  function run(){ if(G.on||G.policyOff) return; makeHost(); G.on=true }
  function halt(){ if(!G.on && !G.host) return; G.on=false; G.host?.remove(); G.host=null }

  function apply(){
    const cl=document.body.classList;
    if(G.policyOff) halt(); else if(cl.contains('anim-grid')) run(); else halt();
  }

  const OPGrid={
    init(opts={}){
      G.wrap=opts.wrap||document.getElementById('playerWrap')||document.body;
      G.bg=opts.bg||document.getElementById('bgArt');
      window.addEventListener('op:media-mode', (e)=>{ G.policyOff=!!(e.detail?.forceOff); apply() });
      new MutationObserver(apply).observe(document.body,{attributes:true,attributeFilter:['class']});
      apply();
    }
  };
  window.OPGrid=OPGrid;
})();
