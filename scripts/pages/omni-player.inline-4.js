  // アニメ・コア
  window.OPAnim?.init?.({ wrap: document.getElementById('playerWrap'), artWrap: document.getElementById('artWrap'), bg: document.getElementById('bgArt') });
  window.OPAnim?.bindMedia?.(document.getElementById('v'));

  // 追加エフェクト（スター/オーロラ/グリッド）
  window.OPFun?.init?.({    wrap: document.getElementById('playerWrap'), bg: document.getElementById('bgArt') });
  window.OPAurora?.init?.({ wrap: document.getElementById('playerWrap'), bg: document.getElementById('bgArt') });
  window.OPGrid?.init?.({   wrap: document.getElementById('playerWrap'), bg: document.getElementById('bgArt') });
  // ← ここで一歩
     window.OPBoot?.tick?.('エフェクト準備…');
