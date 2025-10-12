// シンプルな登録・初期化レジストリ
export const waitForGlobal = (path, timeout = 10000) =>
  new Promise((resolve, reject) => {
    const keys = path.split('.');
    const t0 = performance.now();
    (function poll() {
      let cur = window;
      for (const k of keys) cur = cur?.[k];
      if (cur) return resolve(cur);
      if (performance.now() - t0 > timeout) return reject(new Error('timeout: '+path));
      requestAnimationFrame(poll);
    })();
  });

const modules = [];
export function register(name, init) { modules.push({ name, init }); }

function initAll() {
  for (const m of modules) {
    Promise.resolve()
      .then(() => m.init())
      .then(() => console.info('[OPBoost]', m.name, 'ready'))
      .catch((e) => console.warn('[OPBoost]', m.name, e?.message || e));
  }
}

// 最小の公開API
window.OPBoost = { register, waitForGlobal };

// DOM 準備後に一括起動
window.addEventListener('DOMContentLoaded', initAll);
