import { register, waitForGlobal } from './registry.js';

register('howler', async () => {
  const Howl = await waitForGlobal('Howl'); // window.Howl
  // 効果音に使いたければここでプリロードも可
  window.OPBoost.Howl = Howl;
});
