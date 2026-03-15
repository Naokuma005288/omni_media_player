// hotkeys-plus.plugin.js
(() => {
  const PLUGIN = {
    init(api){
      if(!api.flags.get('hkplus', false)) return;  // 既定OFF
      const v=api.video(); if(!v) return;

      function inForm(){
        const el=document.activeElement; if(!el) return false;
        const tag=el.tagName.toLowerCase();
        return ['input','textarea','select'].includes(tag) || el.isContentEditable;
      }

      document.addEventListener('keydown', (e)=>{
        if(inForm()) return;
        if(e.shiftKey && e.key==='ArrowLeft'){ e.preventDefault(); v.currentTime=Math.max(0,(v.currentTime||0)-5) }
        if(e.shiftKey && e.key==='ArrowRight'){ e.preventDefault(); v.currentTime=Math.min(v.duration||0,(v.currentTime||0)+5) }
        if(e.key==='k'){ e.preventDefault(); (v.paused?v.play():v.pause())?.catch?.(()=>{}) }
        if(e.key==='m'){ e.preventDefault(); v.muted=!v.muted }
        if(e.key==='g'){ const cb=document.getElementById('specOverlay'); if(cb){ cb.checked=!cb.checked; cb.dispatchEvent(new Event('change')) } }
      });
    }
  };
  window.OPHost?.register?.(PLUGIN);
})();
