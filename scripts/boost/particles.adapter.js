import { register, waitForGlobal } from './registry.js';

register('particles', async () => {
  const particlesJS = await waitForGlobal('particlesJS');

  // コンテナが無ければ作る
  let layer = document.getElementById('particles-js');
  if (!layer) {
    layer = document.createElement('div');
    layer.id = 'particles-js';
    layer.style.position = 'fixed';
    layer.style.inset = '0';
    layer.style.zIndex = '-1';
    document.body.prepend(layer);
  }

  // 最小構成（重ければ数を下げてOK）
  particlesJS('particles-js', {
    particles: {
      number: { value: 60, density: { enable: true, value_area: 800 } },
      color: { value: '#9bd0ff' },
      opacity: { value: 0.3 },
      size: { value: 2, random: true },
      move: { enable: true, speed: 1, out_mode: 'out' },
      line_linked: { enable: false }
    },
    interactivity: { events: { onhover: { enable: false }, onclick: { enable: false } } }
  });
});
