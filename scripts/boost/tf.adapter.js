import { register, waitForGlobal } from './registry.js';

register('tfjs', async () => {
  const tf = await waitForGlobal('tf');
  await tf.ready();
  // 軽いウォームアップ
  tf.tidy(() => tf.matMul(tf.ones([2,2]), tf.ones([2,2])));
  window.OPBoost.tf = tf;
});
