// op-plugin-host.js
(() => {
  const bus = new EventTarget();
  const store = {
    get(k, d){ try{const v=localStorage.getItem(k); return v==null?d:JSON.parse(v)}catch{ return d } },
    set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)) }catch{} }
  };
  const flags = (() => {
    const q = new URLSearchParams(location.search);
    function get(name, def=false){
      if(q.has(name)) return q.get(name)==='1'||q.get(name)==='true';
      const all = store.get('pc.flags', {});
      return name in all ? !!all[name] : !!def;
    }
    function set(name, val){
      const all = store.get('pc.flags', {});
      all[name] = !!val; store.set('pc.flags', all);
    }
    return { get, set };
  })();

  function toast(msg, type='ok', timeout=3200){
    const box = document.getElementById('toasts') || (() => {
      const d=document.createElement('div'); d.id='toasts'; d.className='toast';
      document.body.appendChild(d); return d;
    })();
    const t = document.createElement('div'); t.className = 't '+type;
    t.textContent = msg; box.appendChild(t);
    setTimeout(()=>t.remove(), timeout);
  }

  function on(name, cb){ bus.addEventListener(name, cb) }
  function off(name, cb){ bus.removeEventListener(name, cb) }
  function emit(name, detail){ bus.dispatchEvent(new CustomEvent(name, { detail })) }

  const Host = {
    _plugins: [], _ready:false,
    api: { version:'1.0.0', video:()=>document.getElementById('v'), on, off, toast, store, flags }
  };
  window.OPHost = {
    register(p){ try{ Host._plugins.push(p); if(Host._ready && p?.init) p.init(Host.api) }catch(e){ console.warn('plugin init error', e)} }
  };

  function bindVideo(){
    const v=document.getElementById('v'); if(!v) return;
    let lastSrc='';
    v.addEventListener('loadedmetadata', ()=>{
      if(v.currentSrc!==lastSrc){ lastSrc=v.currentSrc||''; emit('media:sourcechange',{src:lastSrc}) }
      emit('media:loaded',{duration:v.duration||0});
    });
    v.addEventListener('play', ()=>emit('media:play'));
    v.addEventListener('pause',()=>emit('media:pause'));
    v.addEventListener('timeupdate',()=>emit('media:time',{t:v.currentTime||0,d:v.duration||0}));
    v.addEventListener('ended',()=>emit('media:ended'));
    window.addEventListener('beforeunload',()=>emit('app:unload'));
  }

  window.addEventListener('DOMContentLoaded', ()=>{
    bindVideo();
    Host._ready = true;
    Host._plugins.forEach(p=>{ try{ p?.init?.(Host.api) }catch(e){ console.warn(e) } });
  });
})();
