// Simple crossfade helper for two media elements.
// OPCrossfade.start({ current: <HTMLMediaElement>, next: <HTMLMediaElement>, duration: 1600 })
(() => {
  const OPCrossfade = {
    start({ current, next, duration = 1600 }) {
      if (!current || !next) return;
      const now = performance.now();
      const end = now + Math.max(200, duration|0);

      // 視覚フェード
      [current, next].forEach(el => {
        el.style.transition = 'opacity 120ms linear';
        el.style.willChange = 'opacity';
        el.style.opacity = '1';
        el.style.position = 'absolute';
        el.style.inset = '0';
      });

      next.volume = Math.min(1, next.volume || 1);
      const startVolNext = 0;
      const startVolCurr = current.volume ?? 1;

      try { next.currentTime = Math.max(0, next.currentTime || 0); } catch {}
      next.style.opacity = '0';
      next.play?.().catch(()=>{});

      const tick = (t) => {
        const p = Math.min(1, (t - now) / (end - now));
        const e = p*p*(3-2*p); // smootherstep
        // audio
        try {
          current.volume = Math.max(0, startVolCurr * (1 - e));
          next.volume = Math.min(1, startVolNext + e);
        } catch {}
        // visual
        next.style.opacity = String(0 + e);
        current.style.opacity = String(1 - e);

        if (p < 1) requestAnimationFrame(tick);
        else {
          current.pause?.();
          current.style.opacity = '0';
          next.style.opacity = '1';
        }
      };
      requestAnimationFrame(tick);
    }
  };

  window.OPCrossfade = OPCrossfade;
})();
