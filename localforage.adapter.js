import { register, waitForGlobal } from './registry.js';

register('localforage', async () => {
  const localforage = await waitForGlobal('localforage');
  localforage.config({ name: 'omni-player', version: 1.0, storeName: 'kv' });
  window.OPBoost.lf = localforage;

  // 例: 簡易API
  window.OPBoost.kv = {
    get: (k, d=null) => localforage.getItem(k).then(v => (v===null? d : v)),
    set: (k, v) => localforage.setItem(k, v),
    del: (k) => localforage.removeItem(k)
  };
});
