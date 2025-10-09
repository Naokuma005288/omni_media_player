// video-fx.plugin.js
(() => {
  const $ = s => document.querySelector(s);
  const store = {
    get(k, d){ try{ const v = localStorage.getItem(k); return v==null? d: JSON.parse(v) }catch(e){ return d } },
    set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)) }catch(e){} }
  };

  const state = {
    enabled:  true,
    bright:   100,   // %
    contrast: 100,   // %
    sat:      100,   // %
    hue:      0,     // deg
    gamma:    100,   // % (簡易。CSSにガンマは無いので擬似)
    rotate:   0,     // 0/90/180/270
    flipH:    false,
    flipV:    false,
    zoom:     100,   // %
    panX:     0,     // %
    panY:     0,     // %
    deintLite:false  // 簡易デインタレース（弱ブラー）
  };

  // ---- load / save
  Object.assign(state, store.get('pc.vfx', state));
  function persist(){ store.set('pc.vfx', state) }

  // ---- apply（CSSフィルタ＋変形）
  function apply(){
    const v = $('#v'); if (!v) return;
    const wrap = $('#playerWrap');
    if (wrap) wrap.style.overflow = 'hidden';

    const g = state.gamma/100;
    // ガンマはCSSに直接無いので近似: brightness と contrast の組合せで弱めに再現
    // （正確なガンマはWebGLでやる。ここは軽量優先）
    const gammaHackContrast = 100 + (g-1)*20; // ざっくり
    const gammaHackBright   = 100 + (g-1)*10;

    const blurForDeint = state.deintLite ? ' blur(0.25px)' : '';

    const filter = 
      `brightness(${state.bright}%) contrast(${state.contrast}%) ` +
      `saturate(${state.sat}%) hue-rotate(${state.hue}deg)` +
      ` brightness(${gammaHackBright}%) contrast(${gammaHackContrast}%)` +
      blurForDeint;

    const r = (state.rotate%360+360)%360;
    const sx = state.flipH ? -1 : 1;
    const sy = state.flipV ? -1 : 1;
    const sc = state.zoom/100;
    const tx = state.panX/100, ty = state.panY/100;

    v.style.filter   = filter;
    v.style.transform = 
      `translate(${tx* (wrap?.clientWidth||0) * 0.5}px, ${ty* (wrap?.clientHeight||0) * 0.5}px) ` +
      `rotate(${r}deg) scale(${sx*sc}, ${sy*sc})`;
    v.style.transformOrigin = 'center center';
  }

  // ---- UI（Settings → 拡張タブへ差し込む）
  function injectUI(){
    const card = $('#settings .settings-card');
    if (!card) return;

    // どのグリッドに置くか：タブ化後は data-tab-panel="ext"
    let grid = card.querySelector('.settings-panels .settings-grid[data-tab-panel="ext"]');
    if (!grid) grid = card.querySelector('.settings-grid'); // タブ化前の保険

    const sec = document.createElement('div');
    sec.className = 'settings-section';
    sec.innerHTML = `
      <h4>ビデオ効果（軽量）</h4>
      <div class="row switch"><input id="vfxOn" type="checkbox"><label for="vfxOn">有効</label></div>

      <div class="row split">
        <div class="col"><label>明るさ</label>   <input id="vfxBright"   type="range" min="50"  max="150" step="1"></div>
        <div class="col"><label>コントラスト</label><input id="vfxContrast" type="range" min="50"  max="150" step="1"></div>
      </div>
      <div class="row split">
        <div class="col"><label>彩度</label>     <input id="vfxSat"      type="range" min="0"   max="200" step="1"></div>
        <div class="col"><label>色相</label>     <input id="vfxHue"      type="range" min="-180" max="180" step="1"></div>
      </div>
      <div class="row"><label>ガンマ（簡易）</label><input id="vfxGamma" type="range" min="60" max="140" step="1"></div>

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
        <div class="col"><label>パンX</label> <input id="vfxPanX" type="range" min="-100" max="100" step="1"></div>
      </div>
      <div class="row"><label>パンY</label> <input id="vfxPanY" type="range" min="-100" max="100" step="1"></div>

      <div class="row switch"><input id="vfxDeint" type="checkbox"><label for="vfxDeint">簡易デインタレース（軽量ブラー）</label></div>

      <div class="row" style="justify-content:flex-end;gap:.4rem">
        <button class="btn ghost" id="vfxReset">リセット</button>
        <button class="btn ok"    id="vfxApply">適用 & 保存</button>
      </div>
    `;
    grid?.appendChild(sec);

    // 値をUIへ
    $('#vfxOn').checked      = !!state.enabled;
    $('#vfxBright').value    = state.bright;
    $('#vfxContrast').value  = state.contrast;
    $('#vfxSat').value       = state.sat;
    $('#vfxHue').value       = state.hue;
    $('#vfxGamma').value     = state.gamma;
    $('#vfxRotate').value    = state.rotate;
    $('#vfxFlipH').checked   = state.flipH;
    $('#vfxFlipV').checked   = state.flipV;
    $('#vfxZoom').value      = state.zoom;
    $('#vfxPanX').value      = state.panX;
    $('#vfxPanY').value      = state.panY;
    $('#vfxDeint').checked   = state.deintLite;

    // 変更イベント
    const bind = (sel, fn) => { const el = $(sel); el && el.addEventListener('input', fn) };
    const applyFromUi = () => {
      state.enabled   = $('#vfxOn').checked;
      state.bright    = +$('#vfxBright').value;
      state.contrast  = +$('#vfxContrast').value;
      state.sat       = +$('#vfxSat').value;
      state.hue       = +$('#vfxHue').value;
      state.gamma     = +$('#vfxGamma').value;
      state.rotate    = +$('#vfxRotate').value;
      state.flipH     = $('#vfxFlipH').checked;
      state.flipV     = $('#vfxFlipV').checked;
      state.zoom      = +$('#vfxZoom').value;
      state.panX      = +$('#vfxPanX').value;
      state.panY      = +$('#vfxPanY').value;
      state.deintLite = $('#vfxDeint').checked;

      if (!state.enabled){
        // 無効時はフィルタ/変形を外す
        const v = $('#v'); if (v){ v.style.filter=''; v.style.transform=''; }
      }else{
        apply();
      }
    };

    ['#vfxOn','#vfxBright','#vfxContrast','#vfxSat','#vfxHue','#vfxGamma',
     '#vfxRotate','#vfxFlipH','#vfxFlipV','#vfxZoom','#vfxPanX','#vfxPanY','#vfxDeint'
    ].forEach(sel => bind(sel, applyFromUi));

    $('#vfxApply')?.addEventListener('click', () => { persist(); applyFromUi(); (window.toast||console.log)('ビデオ効果を保存しました') });
    $('#vfxReset')?.addEventListener('click', () => {
      Object.assign(state, {
        enabled:true, bright:100, contrast:100, sat:100, hue:0, gamma:100,
        rotate:0, flipH:false, flipV:false, zoom:100, panX:0, panY:0, deintLite:false
      });
      persist(); injectRefresh();
    });

    // 初期適用
    applyFromUi();
  }

  function injectRefresh(){
    // UIを作り直すとき用（今は簡略に、値だけ流し込んで apply）
    const assigns = {
      '#vfxOn':'enabled','#vfxBright':'bright','#vfxContrast':'contrast','#vfxSat':'sat','#vfxHue':'hue','#vfxGamma':'gamma',
      '#vfxRotate':'rotate','#vfxFlipH':'flipH','#vfxFlipV':'flipV','#vfxZoom':'zoom','#vfxPanX':'panX','#vfxPanY':'panY','#vfxDeint':'deintLite'
    };
    for (const sel in assigns){
      const key = assigns[sel]; const el = $(sel); if (!el) continue;
      if (typeof state[key] === 'boolean') el.checked = !!state[key];
      else el.value = state[key];
    }
    apply();
  }

  // 設定画面が開かれたタイミングでも注入されるように
  window.addEventListener('load', injectUI);
  document.getElementById('btnSettings')?.addEventListener('click', injectUI, { once:true });

  // メディア切替時にも効果が継続するように
  const v = document.getElementById('v');
  if (v){
    ['loadedmetadata','canplay'].forEach(ev => v.addEventListener(ev, () => {
      if (state.enabled) apply();
    }));
  }
})();
