// Resume AudioContext(s) on first user gesture.
// Works with OPSpectrum._ctx if present.
(() => {
  const contexts = new Set();

  // 外部登録用（必要なら使える）
  window.AudioUnlock = {
    register(ctx) { if (ctx && typeof ctx.resume === 'function') contexts.add(ctx); }
  };

  function collectKnown() {
    try {
      if (window.OPSpectrum && OPSpectrum._ctx) contexts.add(OPSpectrum._ctx);
    } catch {}
  }

  let done = false;
  async function unlock() {
    if (done) return;
    done = true;
    collectKnown();
    for (const ctx of contexts) {
      try { await ctx.resume(); } catch {}
    }
    cleanup();
  }

  function cleanup() {
    document.removeEventListener('pointerdown', unlock, true);
    document.removeEventListener('keydown', unlock, true);
    document.removeEventListener('touchstart', unlock, true);
  }

  document.addEventListener('pointerdown', unlock, true);
  document.addEventListener('keydown', unlock, true);
  document.addEventListener('touchstart', unlock, true);
})();
