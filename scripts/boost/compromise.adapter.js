import { register, waitForGlobal } from './registry.js';

register('compromise', async () => {
  const nlp = await waitForGlobal('nlp'); // window.nlp
  window.OPBoost.nlp = nlp;

  // 例: 簡単な関数（字幕検索のキーワード正規化など）
  window.OPBoost.normalizeQuery = (q) => {
    try { return nlp(q).normalize({ whitespace: true, case: true }).text(); }
    catch { return String(q || '').trim(); }
  };
});
