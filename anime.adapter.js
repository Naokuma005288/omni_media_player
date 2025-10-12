import { register, waitForGlobal } from './registry.js';

register('anime', async () => {
  const anime = await waitForGlobal('anime');
  // 例: ヘッダのタイトルをふわっと
  const h1 = document.querySelector('header h1');
  if (h1) {
    h1.style.opacity = 0;
    anime({ targets: h1, opacity: [0, 1], translateY: [-6, 0], duration: 600, easing: 'easeOutQuad' });
  }
  // 触れるように公開だけしておく
  window.OPBoost.anime = anime;
});
