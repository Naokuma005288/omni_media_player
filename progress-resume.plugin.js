// progress-resume.plugin.js
(() => {
  const PLUGIN = {
    init(api){
      const v = api.video(); if(!v) return;
      let saveTimer=null;
      const key = () => (v.currentSrc ? 'pc.resume.'+v.currentSrc : null);
      const fmt = (s)=>{ const sec=String(Math.floor(s%60)).padStart(2,'0'); return `${Math.floor(s/60)}:${sec}` };

      function save(){
        const k=key(); if(!k) return;
        const pos=v.currentTime||0, dur=v.duration||0;
        if(dur>30 && pos>0) api.store.set(k,{pos,dur,ts:Date.now()});
      }
      api.on('media:time', ()=>{ if(!saveTimer){ saveTimer=setTimeout(()=>{ save(); saveTimer=null }, 2000) } });

      function promptResume(){
        const k=key(); if(!k) return;
        const d=api.store.get(k,null), dur=v.duration||0;
        if(!d || !dur || d.pos<3 || d.pos>dur-3) return;

        const box=document.getElementById('toasts') || (()=>{const d=document.createElement('div');d.id='toasts';d.className='toast';document.body.appendChild(d);return d})();
        const t=document.createElement('div'); t.className='t ok';
        t.innerHTML = `前回 <b>${fmt(d.pos)}</b> から再開しますか？ 
          <button class="btn" data-a="resume">再開</button>
          <button class="btn ghost" data-a="dismiss">最初から</button>`;
        box.appendChild(t);
        t.addEventListener('click',(ev)=>{
          const a=ev.target?.dataset?.a; if(!a) return;
          if(a==='resume'){ try{ v.currentTime=Math.min(d.pos, v.duration||d.pos); v.play?.().catch(()=>{});}catch{} }
          t.remove();
        });
      }
      api.on('media:sourcechange', ()=> setTimeout(promptResume, 120));
      api.on('media:loaded', ()=> setTimeout(promptResume, 120));
    }
  };
  window.OPHost?.register?.(PLUGIN);
})();
