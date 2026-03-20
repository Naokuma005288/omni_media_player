// video-fx.plugin.js
(() => {
  const $ = s => document.querySelector(s);
  const store = {
    get(k, d){ try{ const v = localStorage.getItem(k); return v==null ? d : JSON.parse(v) }catch{ return d } },
    set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)) }catch{} }
  };

  const LEGACY_KEY = 'pc.vfx';
  const COLOR_KEY = 'pc.vfx.color';
  const GEOMETRY_KEY = 'pc.vfx.geometry';

  const COLOR_DEFAULTS = {
    enabled: true,
    bright: 100,
    contrast: 100,
    sat: 100,
    hue: 0,
    gamma: 100,
    deintLite: false
  };
  const GEOMETRY_DEFAULTS = {
    rotate: 0,
    flipH: false,
    flipV: false,
    zoom: 100,
    panX: 0,
    panY: 0
  };

  const legacy = store.get(LEGACY_KEY, {});
  const color = Object.assign({}, COLOR_DEFAULTS, legacy, store.get(COLOR_KEY, {}));
  const geometry = Object.assign({}, GEOMETRY_DEFAULTS, legacy, store.get(GEOMETRY_KEY, {}));
  const state = { color, geometry };
  let lastSrc = '';

  function persistColor(){ store.set(COLOR_KEY, state.color) }
  function persistGeometry(){ store.set(GEOMETRY_KEY, state.geometry) }
  function persistAll(){ persistColor(); persistGeometry() }

  function apply(){
    const v = $('#v');
    if (!v) return;
    const wrap = $('#playerWrap');
    if (wrap) wrap.style.overflow = 'hidden';

    if (!state.color.enabled){
      v.style.filter = '';
      v.style.transform = '';
      v.style.transformOrigin = '';
      return;
    }

    const c = state.color;
    const g = state.geometry;
    const gammaRatio = c.gamma / 100;
    const gammaHackContrast = 100 + (gammaRatio - 1) * 20;
    const gammaHackBright = 100 + (gammaRatio - 1) * 10;
    const blurForDeint = c.deintLite ? ' blur(0.25px)' : '';
    const filter =
      `brightness(${c.bright}%) contrast(${c.contrast}%) ` +
      `saturate(${c.sat}%) hue-rotate(${c.hue}deg)` +
      ` brightness(${gammaHackBright}%) contrast(${gammaHackContrast}%)` +
      blurForDeint;

    const r = (g.rotate % 360 + 360) % 360;
    const sx = g.flipH ? -1 : 1;
    const sy = g.flipV ? -1 : 1;
    const sc = g.zoom / 100;
    const tx = g.panX / 100;
    const ty = g.panY / 100;

    v.style.filter = filter;
    v.style.transform =
      `translate(${tx * (wrap?.clientWidth || 0) * 0.5}px, ${ty * (wrap?.clientHeight || 0) * 0.5}px) ` +
      `rotate(${r}deg) scale(${sx * sc}, ${sy * sc})`;
    v.style.transformOrigin = 'center center';
  }

  function syncUi(sec){
    const byId = id => sec?.querySelector('#' + id);
    if (!sec) return;
    byId('vfxOn').checked = !!state.color.enabled;
    byId('vfxBright').value = state.color.bright;
    byId('vfxContrast').value = state.color.contrast;
    byId('vfxSat').value = state.color.sat;
    byId('vfxHue').value = state.color.hue;
    byId('vfxGamma').value = state.color.gamma;
    byId('vfxDeint').checked = state.color.deintLite;
    byId('vfxRotate').value = state.geometry.rotate;
    byId('vfxFlipH').checked = state.geometry.flipH;
    byId('vfxFlipV').checked = state.geometry.flipV;
    byId('vfxZoom').value = state.geometry.zoom;
    byId('vfxPanX').value = state.geometry.panX;
    byId('vfxPanY').value = state.geometry.panY;
  }

  function readUi(sec){
    const byId = id => sec.querySelector('#' + id);
    state.color.enabled = byId('vfxOn').checked;
    state.color.bright = +byId('vfxBright').value;
    state.color.contrast = +byId('vfxContrast').value;
    state.color.sat = +byId('vfxSat').value;
    state.color.hue = +byId('vfxHue').value;
    state.color.gamma = +byId('vfxGamma').value;
    state.color.deintLite = byId('vfxDeint').checked;
    state.geometry.rotate = +byId('vfxRotate').value;
    state.geometry.flipH = byId('vfxFlipH').checked;
    state.geometry.flipV = byId('vfxFlipV').checked;
    state.geometry.zoom = +byId('vfxZoom').value;
    state.geometry.panX = +byId('vfxPanX').value;
    state.geometry.panY = +byId('vfxPanY').value;
  }

  function resetGeometry(sec){
    Object.assign(state.geometry, GEOMETRY_DEFAULTS);
    persistGeometry();
    syncUi(sec);
    apply();
  }

  function resetAll(sec){
    Object.assign(state.color, COLOR_DEFAULTS);
    Object.assign(state.geometry, GEOMETRY_DEFAULTS);
    persistAll();
    syncUi(sec);
    apply();
  }

  function injectUI(){
    const card = $('#settings .settings-card');
    if (!card) return;
    let grid = card.querySelector('.settings-panels .settings-grid[data-tab-panel="ext"]');
    if (!grid) grid = card.querySelector('.settings-grid');
    if (!grid || grid.querySelector('[data-video-fx="1"]')) return;

    const sec = document.createElement('div');
    sec.className = 'settings-section';
    sec.dataset.videoFx = '1';
    sec.innerHTML = `
      <h4>ビデオ効果</h4>
      <div class="row switch"><input id="vfxOn" type="checkbox"><label for="vfxOn">色補正を有効化</label></div>

      <div class="row"><span class="badge">色補正</span><span class="subtitle">動画を切り替えても維持</span></div>
      <div class="row split">
        <div class="col"><label>明るさ</label><input id="vfxBright" type="range" min="50" max="150" step="1"></div>
        <div class="col"><label>コントラスト</label><input id="vfxContrast" type="range" min="50" max="150" step="1"></div>
      </div>
      <div class="row split">
        <div class="col"><label>彩度</label><input id="vfxSat" type="range" min="0" max="200" step="1"></div>
        <div class="col"><label>色相</label><input id="vfxHue" type="range" min="-180" max="180" step="1"></div>
      </div>
      <div class="row"><label>ガンマ（簡易）</label><input id="vfxGamma" type="range" min="60" max="140" step="1"></div>
      <div class="row switch"><input id="vfxDeint" type="checkbox"><label for="vfxDeint">簡易デインタレース（軽量ブラー）</label></div>

      <div class="row" style="margin-top:.4rem"><span class="badge">形状補正</span><span class="subtitle">次の動画で自動リセット</span></div>
      <div class="row split">
        <div class="col"><label>回転</label>
          <select id="vfxRotate">
            <option value="0">0°</option><option value="90">90°</option>
            <option value="180">180°</option><option value="270">270°</option>
          </select>
        </div>
        <div class="col"><label>反転</label>
          <div class="row" style="gap:.6rem">
            <label class="switch"><input id="vfxFlipH" type="checkbox"><span>水平</span></label>
            <label class="switch"><input id="vfxFlipV" type="checkbox"><span>垂直</span></label>
          </div>
        </div>
      </div>
      <div class="row split">
        <div class="col"><label>ズーム</label><input id="vfxZoom" type="range" min="100" max="300" step="1"></div>
        <div class="col"><label>パンX</label><input id="vfxPanX" type="range" min="-100" max="100" step="1"></div>
      </div>
      <div class="row"><label>パンY</label><input id="vfxPanY" type="range" min="-100" max="100" step="1"></div>

      <div class="row" style="justify-content:flex-end;gap:.4rem">
        <button class="btn ghost" id="vfxResetGeometry">形状だけ戻す</button>
        <button class="btn ghost" id="vfxReset">全部戻す</button>
        <button class="btn ok" id="vfxApply">保存</button>
      </div>
    `;
    grid.appendChild(sec);
    syncUi(sec);

    const applyFromUi = () => {
      readUi(sec);
      apply();
    };
    sec.addEventListener('input', applyFromUi);
    sec.addEventListener('change', applyFromUi);
    sec.querySelector('#vfxApply')?.addEventListener('click', () => {
      readUi(sec);
      persistAll();
      apply();
      (window.OPRuntime?.toast || window.toast || console.log)('ビデオ効果を保存しました');
    });
    sec.querySelector('#vfxResetGeometry')?.addEventListener('click', () => resetGeometry(sec));
    sec.querySelector('#vfxReset')?.addEventListener('click', () => resetAll(sec));
    apply();
  }

  function onSourceChange(){
    const v = $('#v');
    if (!v) return;
    const src = v.currentSrc || '';
    if (!src || src === lastSrc) return;
    lastSrc = src;
    Object.assign(state.geometry, GEOMETRY_DEFAULTS);
    persistGeometry();
    const sec = document.querySelector('[data-video-fx="1"]');
    if (sec) syncUi(sec);
    apply();
  }

  window.addEventListener('load', injectUI);
  document.getElementById('btnSettings')?.addEventListener('click', injectUI, { once:true });

  const v = document.getElementById('v');
  if (v){
    v.addEventListener('loadedmetadata', onSourceChange);
    ['loadedmetadata','canplay'].forEach(ev => v.addEventListener(ev, apply));
  }
})();
