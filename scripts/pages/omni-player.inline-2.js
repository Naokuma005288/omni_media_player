/* ========= Settings: Tabs ========= */
(function(){
  const pick = (title) => {
    const t = (title||'').toLowerCase();
    if (t.includes('字幕')) return 'sub';
    if (t.includes('スペクトラム')) return 'spec';
    if (t.includes('eq') || t.includes('10バンド')) return 'eq';
    if (t.includes('アニメ')) return 'anim';
    // 追加プラグイン系
    if (t.includes('ブックマーク') || t.includes('lrc') || t.includes('歌詞') ||
        t.includes('チャプター') || t.includes('スクリーンショット') ||
        t.includes('設定バックアップ') || t.includes('スリープ')) return 'ext';
    return 'ext';
  };

  function initSettingsTabs(){
    const card = qs('#settings .settings-card');
    if (!card || card.dataset.tabbified) return;
    if (card.querySelector('[data-settings-tab]') && card.querySelector('[data-settings-panel]')) {
      card.dataset.tabbified = '1';
      return;
    }

    const rootGrid = Array.from(card.children).find(node => node.classList?.contains('settings-grid'));
    if (!rootGrid || rootGrid.parentElement !== card) return;

    // タブとパネルの骨組みを作る
    const tabsData = [
      ['sub','字幕'],
      ['spec','スペクトラム'],
      ['eq','EQ'],
      ['anim','アニメ'],
      ['ext','拡張'],
      ['all','すべて']
    ];
    const tabs = document.createElement('div');
    tabs.className = 'settings-tabs';
    tabs.setAttribute('role','tablist');

    const panels = document.createElement('div');
    panels.className = 'settings-panels';

    const grids = {};
    for (const [key] of tabsData){
      const g = document.createElement('div');
      g.className = 'settings-grid';
      g.dataset.tabPanel = key;
      panels.appendChild(g);
      grids[key] = g;
    }

    // タイトル行（h3）の直後にタブ、パネルを挿入
    const head = card.querySelector('.settings-head');
    if (head && head.parentElement === card) {
      card.insertBefore(tabs, head.nextSibling);
    } else {
      card.insertBefore(tabs, rootGrid);
    }
    card.insertBefore(panels, rootGrid);

    // 既存セクションを仕分け
    const sections = Array.from(rootGrid.querySelectorAll('.settings-section'));
    sections.forEach(sec=>{
      const title = sec.querySelector('h4')?.textContent || '';
      const key = pick(title);
      (grids[key] || grids.ext).appendChild(sec);
    });
    // 元のグリッドは消す
    rootGrid.remove();

    // タブボタンを作成
    const activate = (key) => {
      // パネル表示切替
      Array.from(panels.querySelectorAll('.settings-grid')).forEach(g=>{
        const show = key==='all' || g.dataset.tabPanel===key;
        g.classList.toggle('active', show);
        g.style.display = show ? 'grid' : 'none';
      });
      // ボタンの状態
      Array.from(tabs.querySelectorAll('.tab')).forEach(b=>{
        b.setAttribute('aria-selected', b.dataset.tab===key ? 'true' : 'false');
      });
      try { store.set('pc.settings.tab', key); } catch(e){}
    };

    tabsData.forEach(([key,label])=>{
      const btn = document.createElement('button');
      btn.className = 'tab';
      btn.type = 'button';
      btn.dataset.tab = key;
      btn.setAttribute('role','tab');
      btn.textContent = label;
      btn.addEventListener('click', ()=>activate(key));
      tabs.appendChild(btn);
    });

    // 初期タブ
    const last = (store && store.get) ? store.get('pc.settings.tab','all') : 'all';
    activate(last);

    card.dataset.tabbified = '1';
  }

  // 起動時＆設定を開いたときに初期化
  window.addEventListener('load', initSettingsTabs);
  const b = document.getElementById('btnSettings');
  if (b) b.addEventListener('click', initSettingsTabs, { once:true });
})();
