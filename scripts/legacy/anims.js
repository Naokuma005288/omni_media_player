// Lightweight background FX manager
// window.OPFX.init({wrap}) / OPFX.setPreset('minimal'|'clean'|'glow'|'neon')
(() => {
  const OPFX = {
    _wrap: null,
    _root: null,
    _preset: 'minimal',
    init({ wrap }) {
      if (!wrap || this._root) return;
      this._wrap = wrap;
      const root = document.createElement('div');
      root.className = 'opfx preset-minimal';
      const grad = document.createElement('div');
      grad.className = 'fx-layer grad';
      const grain = document.createElement('div');
      grain.className = 'fx-layer grain';
      root.appendChild(grad);
      root.appendChild(grain);
      // 背景なので video の下側に置きたい：wrap の先頭に差し込む
      wrap.prepend(root);
      this._root = root;
    },
    setPreset(name) {
      if (!this._root) return;
      const presets = ['minimal','clean','glow','neon'];
      if (!presets.includes(name)) name = 'minimal';
      this._root.classList.remove(...presets.map(p => 'preset-'+p));
      this._root.classList.add('preset-' + name);
      this._preset = name;
    }
  };
  window.OPFX = OPFX;
})();
