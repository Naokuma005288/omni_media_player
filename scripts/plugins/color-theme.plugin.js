// カバー画像の色を --accent に反映（失敗時は無視）
// 依存: ColorThief / #audioCover

(() => {
  const img = document.getElementById('audioCover');
  if (!img || !window.ColorThief) return;

  function toCss(rgb) {
    const [r,g,b] = rgb;
    return `rgb(${r}, ${g}, ${b})`;
  }

  function applyFromImage() {
    try {
      const ct = new ColorThief();
      if (!img.complete || !img.naturalWidth) return;
      const rgb = ct.getColor(img); // CORSで取れない場合は例外
      document.documentElement.style.setProperty('--accent', toCss(rgb));
    } catch { /* cross-origin等は黙ってスキップ */ }
  }

  img.addEventListener('load', () => {
    // 画像が変わるたびに試す（ローカル/同一オリジン時はOK）
    applyFromImage();
  });

  // 既に読み込み済みだったら一度試す
  applyFromImage();
})();
