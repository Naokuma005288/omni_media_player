import { register, waitForGlobal } from './registry.js';

register('barba', async () => {
  const barba = await waitForGlobal('barba'); // window.barba
  try {
    // 単一ページなら効果は薄いので、初期化だけ
    barba.init({
      transitions: [{
        name: 'fade',
        leave({ current, next, done }) { current.container.style.opacity = 0; done(); },
        enter({ next, done }) { next.container.style.opacity = 1; done(); }
      }]
    });
  } catch { /* SPA で失敗しても無視 */ }
  window.OPBoost.barba = barba;
});
