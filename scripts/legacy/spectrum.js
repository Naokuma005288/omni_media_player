// Simple audio spectrum visualizer for <video>/<audio>
// window.OPSpectrum.attach(videoEl, wrapEl)
// Properties: overlayOnVideo, sens, bins, offsetBottom
(() => {
  const OPSpectrum = {
    overlayOnVideo: true,
    sens: 1.02,
    bins: 160,
    offsetBottom: 18,
    _ctx: null,
    _analyser: null,
    _srcNode: null,
    _raf: 0,
    _mode: 'bars', // 'bars' | 'circular'
    _canvas: null,
    _g: null,
    _video: null,

    setMode(mode) {
      this._mode = (mode === 'circular') ? 'circular' : 'bars';
    },

    _ensureCanvas(wrap) {
      if (this._canvas && this._canvas.isConnected) return;
      const c = document.createElement('canvas');
      c.id = 'op-spectrum-canvas';
      c.className = 'opspec-canvas';
      wrap.appendChild(c);
      this._canvas = c;
      this._g = c.getContext('2d', { alpha: true });
      const fit = () => {
        const r = wrap.getBoundingClientRect();
        c.width = Math.max(1, Math.floor(r.width  * devicePixelRatio));
        c.height= Math.max(1, Math.floor(r.height * devicePixelRatio));
      };
      fit();
      new ResizeObserver(fit).observe(wrap);
    },

    _ensureAudio(video) {
      if (this._video === video && this._ctx) return;
      this._video = video;
      // 既存を破棄
      try { this._srcNode?.disconnect(); } catch {}
      this._srcNode = null;
      // Context
      if (!this._ctx) {
        this._ctx = new (window.AudioContext || window.webkitAudioContext)();
      }
      // Analyser
      const analyser = this._analyser ?? this._ctx.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.84;
      this._analyser = analyser;

      // MediaElementSource は同じ media に対し一度きり
      try {
        this._srcNode = this._ctx.createMediaElementSource(video);
      } catch (e) {
        // すでに紐づいている場合はそのまま流用（Safariで例外になりやすい）
        if (!this._srcNode) {
          // 既存を諦め、可視化だけは無音読みで続行（analyser は動くがゼロに近い）
          this._srcNode = null;
          return;
        }
      }
      if (this._srcNode) {
        try {
          this._srcNode.disconnect();
        } catch {}
        try {
          this._srcNode.connect(analyser);
          analyser.connect(this._ctx.destination);
        } catch {}
      }
    },

    _drawLoop() {
      cancelAnimationFrame(this._raf);
      const g = this._g, c = this._canvas, an = this._analyser;
      if (!g || !c || !an) return;

      const n = Math.max(16, Math.min(1024, this.bins|0));
      const data = new Uint8Array(an.frequencyBinCount);
      const render = () => {
        this._raf = requestAnimationFrame(render);
        if (!this._video) return;

        an.getByteFrequencyData(data);
        // ピークをサンプリング
        const step = Math.floor(data.length / n);
        const bins = n;
        const arr = new Float32Array(bins);
        for (let i = 0; i < bins; i++) {
          let peak = 0;
          const start = i * step;
          for (let k = 0; k < step; k++) {
            const v = data[start + k] || 0;
            if (v > peak) peak = v;
          }
          arr[i] = (peak / 255) * this.sens;
        }

        // クリア
        g.clearRect(0,0,c.width,c.height);

        // 描画領域
        const px = (v)=> Math.max(0, Math.min(v, 1));
        const pad = Math.round(12 * devicePixelRatio);
        const W = c.width, H = c.height;
        const bottomOffset = Math.round(this.offsetBottom * devicePixelRatio);
        const baseY = H - bottomOffset - pad;

        if (this._mode === 'circular') {
          // 中央円グラフ
          const cx = W/2, cy = H - Math.max(H*0.28, 180*devicePixelRatio);
          const radius = Math.min(W, H) * 0.22;
          g.save();
          g.translate(cx, cy);
          const seg = (Math.PI * 2) / bins;
          for (let i=0;i<bins;i++){
            const amp = px(arr[i]);
            const len = radius * (0.35 + amp * 0.95);
            const a = i * seg;
            const x1 = Math.cos(a) * (radius * 0.65);
            const y1 = Math.sin(a) * (radius * 0.65);
            const x2 = Math.cos(a) * len;
            const y2 = Math.sin(a) * len;
            g.strokeStyle = `rgba(88,170,255,${0.35 + amp*0.65})`;
            g.lineWidth = Math.max(1, Math.min(6*devicePixelRatio, 1.5*devicePixelRatio + amp*4*devicePixelRatio));
            g.beginPath(); g.moveTo(x1,y1); g.lineTo(x2,y2); g.stroke();
          }
          g.restore();
        } else {
          // 下部バー
          const w = (W - pad*2) / bins;
          for (let i=0;i<bins;i++){
            const amp = px(arr[i]);
            const h = Math.min(baseY - pad, amp * (H * 0.5));
            const x = pad + i*w;
            const y = baseY - h;
            // 背景のうっすら
            g.fillStyle = 'rgba(255,255,255,0.06)';
            g.fillRect(x, baseY - Math.max(2*devicePixelRatio, h*0.08), Math.max(1, w*0.9), Math.max(2*devicePixelRatio, h*0.08));
            // 本体
            g.fillStyle = `rgba(45,126,247,${0.22 + amp*0.55})`;
            g.fillRect(x, y, Math.max(1, w*0.9), h);
          }
        }
      };
      render();
    },

    attach(video, wrap) {
      if (!video || !wrap) return;
      this._ensureCanvas(wrap);
      this._ensureAudio(video);
      // キャンバス位置：overlayOnVideo=true なら全面。false でも背景扱いでOK（UIは変えない）
      this._canvas.classList.toggle('opspec-hidden', false);
      this._drawLoop();
    }
  };

  // 外からも使えるよう公開
  window.OPSpectrum = OPSpectrum;
})();
