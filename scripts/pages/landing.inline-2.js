/* ===== Refs ===== */
const meta = document.getElementById('themeColorMeta');
const themeBtn = document.getElementById('themeBtn');
const langBtn  = document.getElementById('langBtn');

/* Sections/grids */
const grid   = document.getElementById('grid');      // Omni Player セクションのグリッド
const gridSoon = document.getElementById('gridSoon'); // 新シリーズ（下段）

const cursor = document.getElementById('cursor');
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const soonModal = document.getElementById('soonModal');
const soonTitle = document.getElementById('soonTitle');
const soonText = document.getElementById('soonText');
const soonPoints = document.getElementById('soonPoints');
const optReduce = document.getElementById('optReduce');
const optTilt = document.getElementById('optTilt');
const optFocus = document.getElementById('optFocus');
const optConfetti = document.getElementById('optConfetti');
const optParticles = document.getElementById('optParticles');
const optTheme = document.getElementById('optTheme');
const optAccent = document.getElementById('optAccent');
const optAccentRand = document.getElementById('optAccentRand');
const optAccentCycle = document.getElementById('optAccentCycle');
const optFps = document.getElementById('optFps');
const optFavFirst = document.getElementById('optFavFirst');
const optAutoReduce = document.getElementById('optAutoReduce');
const optDragOrder = document.getElementById('optDragOrder');
/* 新規表示系 */
const optCompact = document.getElementById('optCompact');
const optListView = document.getElementById('optListView');
const optTitleShimmer = document.getElementById('optTitleShimmer');
const optClock = document.getElementById('optClock');

const filterInput = document.getElementById('filter');
const installBtn = document.getElementById('installBtn');
const shareBtn = document.getElementById('shareBtn');
const helpBtn = document.getElementById('helpBtn');
const helpModal = document.getElementById('helpModal');
const splash = document.getElementById('splash');
const ctxMenu = document.getElementById('ctx');
const fpsBox = document.getElementById('fps');
const netBadge = document.getElementById('netBadge');
const nebulaEl = document.getElementById('nebula');

const beams = document.getElementById('beams');
const stars = document.getElementById('stars2');
const warp  = document.getElementById('warp');
const scan  = document.getElementById('scan');
const bgEl  = document.getElementById('bg');
const auroraEl = document.getElementById('aurora');

/* Effects refs */
const optBeams = document.getElementById('optBeams');
const optStars = document.getElementById('optStars');
const optWarp  = document.getElementById('optWarp');
const optScan  = document.getElementById('optScan');
const optTrail = document.getElementById('optTrail');
const optSheen = document.getElementById('optSheen');
const optMagnet= document.getElementById('optMagnet');
const optAutoCycle = document.getElementById('optAutoCycle');

const optExport=document.getElementById('optExport');
const optImport=document.getElementById('optImport');
const optReset=document.getElementById('optReset');
const optResetOrder=document.getElementById('optResetOrder');

const clockTime = document.getElementById('clockTime');
const clockDate = document.getElementById('clockDate');
const clockRing = document.getElementById('clockRing');
const clockBatt = document.getElementById('clockBatt');
const clockHud  = document.getElementById('clockHud');

/* Section scroll cue */
const scrollToNew = document.getElementById('scrollToNew');

/* ===== Store & keys ===== */
const store={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch{ return d }},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};
const themeKey='om.theme', settingsKey='om.settings', favKey='om.favs', accentKey='om.accent', orderKey='om.order';

/* ===== Settings with defaults ===== */
const settings = Object.assign(
  /* base */
  { reduce:false, autoReduce:true, tilt:true, focus:true, confetti:true, particles:(innerWidth>1200?90:48),
    accentCycle:false, dragOrder:true },
  /* effects */
  { beams:true, stars:true, warp:false, scan:false, trail:true, sheen:true, magnet:true, autoCycle:false },
  /* ui */
  { fps:false, favFirst:true, compact:false, listView:false, titleShimmer:true, clock:true },
  store.get(settingsKey, {})
);

/* ===== Mute flag (TDZ回避) ===== */
let fxMuted = false;
/* URL fx=off 先適用 */
(function(){ try{ const u=new URL(location.href); if((u.searchParams.get('fx')||'').toLowerCase()==='off'){ fxMuted = true; } }catch{} })();

/* ===== Accent ===== */
let accent = store.get(accentKey, getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#74b3ff');
applyAccent(accent);
function applyAccent(hex){ document.documentElement.style.setProperty('--accent', hex); if(optAccent) optAccent.value = hex; }

/* Accent auto shift */
let accentShiftTimer=null, accentHue=0;
function hexToHsl(H){let r=0,g=0,b=0;if(H.length===4){r="0x"+H[1]+H[1];g="0x"+H[2]+H[2];b="0x"+H[3]+H[3]}else{r="0x"+H[1]+H[2];g="0x"+H[3]+H[4];b="0x"+H[5]+H[6]}r/=255;g/=255;b/=255;const cmin=Math.min(r,g,b), cmax=Math.max(r,g,b), delta=cmax-cmin;let h=0,s=0,l=(cmax+cmin)/2;if(delta!==0){if(cmax===r) h=((g-b)/delta)%6; else if(cmax===g) h=(b-r)/delta+2; else h=(r-g)/delta+4; h=Math.round(h*60); if(h<0) h+=360; s=delta/(1-Math.abs(2*l-1));} s=Math.round(s*100); l=Math.round(l*100); return [h,s,l];}
function hslToHex(h,s,l){s/=100;l/=100;const k=n=> (n+ h/30)%12;const a=s*Math.min(l,1-l);const f=n=> l - a*Math.max(-1, Math.min(k(n)-3, Math.min(9-k(n),1)));const toHex=x=> Math.round(x*255).toString(16).padStart(2,'0');return "#"+toHex(f(0))+toHex(f(8))+toHex(f(4));}
function startAccentShift(){ if(accentShiftTimer) return; const [h,s,l]=hexToHsl(accent); accentHue=h; accentShiftTimer=setInterval(()=>{ accentHue=(accentHue+0.6)%360; applyAccent(hslToHex(accentHue,s,l)); }, 1000); }
function stopAccentShift(){ if(accentShiftTimer){ clearInterval(accentShiftTimer); accentShiftTimer=null; applyAccent(accent); }}

/* ===== Theme ===== */
const themePref = store.get(themeKey,'dark');
applyTheme(themePref);
if(optTheme) optTheme.value = themePref;
themeBtn.textContent = displayThemeIcon(themePref);
function getSystemTheme(){ return matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' }
function timeOfDayTheme(){ const h=new Date().getHours(); return (h>=19||h<7)?'dark':'light' }
function applyTheme(mode){
  const m = mode==='auto' ? getSystemTheme() : (mode==='auto-time' ? timeOfDayTheme() : mode);
  document.documentElement.setAttribute('data-theme', m);
  meta.setAttribute('content', m==='light' ? '#f4f7fb' : '#0b0e12');
}
function displayThemeIcon(mode){ if(mode==='auto') return '🌓'; if(mode==='auto-time') return '⏰'; return mode==='light' ? '☀️' : '🌙'; }
themeBtn.addEventListener('click',()=>{
  const cur = store.get(themeKey,'dark');
  const seq = ['dark','light','auto','auto-time'];
  const next = seq[(seq.indexOf(cur)+1)%seq.length];
  store.set(themeKey,next); themeBtn.textContent=displayThemeIcon(next); applyTheme(next);
});
optTheme?.addEventListener('change',()=>{ store.set(themeKey, optTheme.value); themeBtn.textContent=displayThemeIcon(optTheme.value); applyTheme(optTheme.value) });
(function(){const mql=matchMedia('(prefers-color-scheme: dark)'); const cb=()=>{ if(store.get(themeKey,'dark')==='auto') applyTheme('auto') }; mql.addEventListener? mql.addEventListener('change',cb):mql.addListener(cb); })();

/* ===== Language ===== */
const dict={
  ja:{lang:"JP",footer:"© 2025 OmniMedia – Built with ChatGPT-4o + ChatGPT-5.4",alpha:"推奨",beta:"mini",old:"非推奨",
      alphaTitle:"Omni Player",betaTitle:"Omni Player mini",oldTitle:"Omni Player PC",
      alphaDesc:"安定版。完全機能・低負荷で推奨バージョン。",betaDesc:"軽量でシンプルな操作に絞ったミニモデル。",oldDesc:"旧版。過去構成用として残存。",
      alphaPoints:["全部入りUI","YouTube / 埋め込み対応","プレイリスト・字幕向け"],betaPoints:["最短操作","ローカル / HLS に最適化","詳細設定は任意"],oldPoints:["旧版UI","互換維持のみ","新規利用は非推奨"],
      searchPH:"検索: Omni Player / mini / PC …", secOmni:"Omni Player シリーズ", secOmniHint:"主要ラインアップ",
      secNew:"新シリーズ", secNewHint:"Coming Soon", cueNew:"新シリーズ（Coming Soon）へ",
      betaBadge:"β版", openBtn:"開く", soonBtn:"準備中", comingSoon:"Coming Soon",
      convertTitle:"Omni Convert", convertDesc:"現在開発中です。",
      editorTitle:"Omni Editor",  editorDesc:"現在開発中です。", close:"閉じる"},
  en:{lang:"EN",footer:"© 2025 OmniMedia – Built with ChatGPT-4o + ChatGPT-5.4",alpha:"Rec",beta:"mini",old:"Old",
      alphaTitle:"Omni Player",betaTitle:"Omni Player mini",oldTitle:"Omni Player PC",
      alphaDesc:"Stable build. Fully featured and optimized.",betaDesc:"A lighter, simpler mini model focused on core playback.",oldDesc:"Legacy version kept for compatibility.",
      alphaPoints:["Full feature set","YouTube / embed ready","Built for playlists and subtitles"],betaPoints:["Fast core controls","Optimized for local / HLS","Advanced panels are optional"],oldPoints:["Old UI stack","Compatibility only","Not recommended for new use"],
      searchPH:"Search: Omni Player / mini / PC …", secOmni:"Omni Player Series", secOmniHint:"Main lineup",
      secNew:"New Series", secNewHint:"Coming Soon", cueNew:"Go to New Series (Coming Soon)",
      betaBadge:"Beta", openBtn:"Open", soonBtn:"Coming Soon", comingSoon:"Coming Soon",
      convertTitle:"Omni Convert", convertDesc:"Currently under development.",
      editorTitle:"Omni Editor",  editorDesc:"Currently under development.", close:"Close"},
  ko:{lang:"KR",footer:"© 2025 OmniMedia – Built with ChatGPT-4o + ChatGPT-5.4",alpha:"추천",beta:"mini",old:"비추천",
      alphaTitle:"Omni Player",betaTitle:"Omni Player mini",oldTitle:"Omni Player PC",
      alphaDesc:"안정 버전, 완전한 기능과 최적화 성능.",betaDesc:"핵심 재생에 집중한 가벼운 미니 모델.",oldDesc:"이전 버전(비추천).",
      alphaPoints:["풀 기능 UI","YouTube / 임베드 대응","재생목록 / 자막용"],betaPoints:["빠른 핵심 조작","로컬 / HLS 최적화","고급 설정은 선택"],oldPoints:["구형 UI","호환성 유지용","신규 사용 비권장"],
      searchPH:"검색: Omni Player / mini / PC …", secOmni:"Omni Player 시리즈", secOmniHint:"주요 라인업",
      secNew:"신규 시리즈", secNewHint:"Coming Soon", cueNew:"신규 시리즈(출시 예정)로",
      betaBadge:"베타", openBtn:"열기", soonBtn:"준비 중", comingSoon:"Coming Soon",
      convertTitle:"Omni Convert", convertDesc:"현재 개발 중입니다.",
      editorTitle:"Omni Editor",  editorDesc:"현재 개발 중입니다.", close:"닫기"},
  zh:{lang:"中文",footer:"© 2025 OmniMedia – Built with ChatGPT-4o + ChatGPT-5.4",alpha:"推荐",beta:"mini",old:"旧版",
      alphaTitle:"Omni Player",betaTitle:"Omni Player mini",oldTitle:"Omni Player PC",
      alphaDesc:"稳定版，完整功能与最佳性能。",betaDesc:"聚焦核心播放体验的轻量 mini 型号。",oldDesc:"旧版本，仅保留兼容。",
      alphaPoints:["完整功能","支持 YouTube / 嵌入","适合播放列表和字幕"],betaPoints:["最快上手","针对本地 / HLS","高级设置可选"],oldPoints:["旧版界面","仅保留兼容","不建议新使用"],
      searchPH:"搜索: Omni Player / mini / PC …", secOmni:"Omni Player 系列", secOmniHint:"主力产品线",
      secNew:"新系列", secNewHint:"Coming Soon", cueNew:"前往新系列（敬请期待）",
      betaBadge:"测试版", openBtn:"打开", soonBtn:"开发中", comingSoon:"Coming Soon",
      convertTitle:"Omni Convert", convertDesc:"目前仍在开发中。",
      editorTitle:"Omni Editor",  editorDesc:"目前仍在开发中。", close:"关闭"},
  ru:{lang:"RU",footer:"© 2025 OmniMedia – Built with ChatGPT-4o + ChatGPT-5.4",alpha:"Реком.",beta:"mini",old:"Стар.",
      alphaTitle:"Omni Player",betaTitle:"Omni Player mini",oldTitle:"Omni Player PC",
      alphaDesc:"Стабильная версия с полной функциональностью.",betaDesc:"Облегчённая mini-версия с упором на базовое воспроизведение.",oldDesc:"Старая версия (не рекомендуется).",
      alphaPoints:["Полный набор функций","YouTube / встраивание","Плейлисты и субтитры"],betaPoints:["Быстрый базовый режим","Оптимизирован для local / HLS","Расширенные панели по желанию"],oldPoints:["Старая UI-линия","Только для совместимости","Не рекомендуется для нового старта"],
      searchPH:"Поиск: Omni Player / mini / PC …", secOmni:"Серия Omni Player", secOmniHint:"Основная линейка",
      secNew:"Новая серия", secNewHint:"Coming Soon", cueNew:"К новой серии (скоро)",
      betaBadge:"Бета", openBtn:"Открыть", soonBtn:"Скоро", comingSoon:"Coming Soon",
      convertTitle:"Omni Convert", convertDesc:"Сейчас в разработке.",
      editorTitle:"Omni Editor",  editorDesc:"Сейчас в разработке.", close:"Закрыть"},
  fr:{lang:"FR",footer:"© 2025 OmniMedia – Built with ChatGPT-4o + ChatGPT-5.4",alpha:"Recom.",beta:"mini",old:"Anc.",
      alphaTitle:"Omni Player",betaTitle:"Omni Player mini",oldTitle:"Omni Player PC",
      alphaDesc:"Version stable, complète et optimisée.",betaDesc:"Un modèle mini, léger et centré sur l’essentiel.",oldDesc:"Ancienne version (non recommandée).",
      alphaPoints:["Fonctions complètes","YouTube / embeds prêts","Pensé pour playlists et sous-titres"],betaPoints:["Commandes essentielles rapides","Optimisé local / HLS","Réglages avancés optionnels"],oldPoints:["Ancienne interface","Compatibilité uniquement","Déconseillé pour un nouvel usage"],
      searchPH:"Rechercher : Omni Player / mini / PC …", secOmni:"Série Omni Player", secOmniHint:"Gamme principale",
      secNew:"Nouvelle série", secNewHint:"Coming Soon", cueNew:"Aller à la nouvelle série (bientôt)",
      betaBadge:"Bêta", openBtn:"Ouvrir", soonBtn:"Bientôt", comingSoon:"Coming Soon",
      convertTitle:"Omni Convert", convertDesc:"Actuellement en cours de développement.",
      editorTitle:"Omni Editor",  editorDesc:"Actuellement en cours de développement.", close:"Fermer"},
};
const soonInfo={
  convert:{
    ja:{title:'Omni Convert',text:'変換専用の新シリーズです。現時点では導線のみ残し、開発中表示に戻しています。',points:['複数フォーマット変換の再設計','ブラウザ内処理の再評価','軽量版との役割分離']},
    en:{title:'Omni Convert',text:'A dedicated conversion line. The card remains visible, but the page is back to Coming Soon.',points:['Rework multi-format conversion flow','Re-evaluate in-browser processing','Separate roles from playback models']}
  },
  live:{
    ja:{title:'Omni Live',text:'ライブ視聴向けの新シリーズです。低遅延とマルチストリームを想定した企画枠です。',points:['低遅延ライブ視聴','複数ストリーム切替','将来の配信UI候補']},
    en:{title:'Omni Live',text:'A new line for live viewing. The concept targets low-latency, multi-stream playback.',points:['Low-latency live playback','Multi-stream switching','Future streaming UI experiments']}
  },
  editor:{
    ja:{title:'Omni Editor',text:'編集専用の新シリーズです。現在はプレイヤー系と分離して設計を見直しています。',points:['編集ワークフローの再設計','重い処理の責務分離','将来の書き出しUI候補']},
    en:{title:'Omni Editor',text:'A dedicated editing line. It is currently split from the player line and under redesign.',points:['Rebuild editing workflows','Separate heavy processing concerns','Future export-focused UI']}
  }
};
const langKey='om.lang';
let lang = store.get(langKey,null);
if(!lang){
  const nav=(navigator.language||'ja').slice(0,2);
  lang=(['ja','en','zh','ko','ru','fr'].includes(nav))?(nav==='ja'?'ja':nav):'ja';
  store.set(langKey, lang);
}
applyLang(lang);
langBtn.addEventListener('click',()=>{
  const keys=Object.keys(dict);
  lang=keys[(keys.indexOf(lang)+1)%keys.length];
  store.set(langKey,lang);applyLang(lang);startClock();
});
function el(id){return document.getElementById(id)}
function fillCompare(id, items){
  const node=el(id); if(!node) return;
  node.innerHTML=(items||[]).map(v=>`<span class="pill">${v}</span>`).join('');
}
function applyLang(l){
  const d=dict[l]||dict.ja;
  const setText=(id,val)=>{ const node=el(id); if(node) node.textContent=val; };
  setText('markAlpha',d.alpha); setText('markBeta',d.beta); setText('markPc',d.old);
  setText('titleAlpha',d.alphaTitle); setText('titleBeta',d.betaTitle); setText('titlePc',d.oldTitle);
  setText('descAlpha',d.alphaDesc); setText('descBeta',d.betaDesc); setText('descPc',d.oldDesc);
  setText('footerText',d.footer); langBtn.textContent='🌐 '+d.lang; filterInput.placeholder=d.searchPH; document.documentElement.lang=l;
  setText('secOmniTitle',d.secOmni); setText('secOmniHint',d.secOmniHint);
  setText('secNewTitle',d.secNew); setText('secNewHint',d.secNewHint);
  setText('cueNewText',d.cueNew);
  setText('soonClose', d.close || 'Close');
  fillCompare('cmpAlpha', d.alphaPoints);
  fillCompare('cmpBeta', d.betaPoints);
  fillCompare('cmpPc', d.oldPoints);
  /* 下段(新シリーズ)のi18n要素に一括反映 */
  document.querySelectorAll('#gridSoon [data-i18n]').forEach(el => { el.textContent = d[el.dataset.i18n] || el.textContent; });
  document.querySelectorAll('#gridSoon [data-i18n-mark]').forEach(el => { el.textContent = d[el.dataset.i18nMark] || el.textContent; });
}
function openSoonCard(key){
  const info=(soonInfo[key] && (soonInfo[key][lang] || soonInfo[key].en || soonInfo[key].ja)) || null;
  if(!info || !soonModal) return;
  soonTitle.textContent=info.title;
  soonText.textContent=info.text;
  soonPoints.innerHTML=(info.points||[]).map(v=>`<div class="point">${v}</div>`).join('');
  soonModal.classList.add('show');
}

/* ===== Clock HUD + Battery ===== */
let clockTimer=null; function pad(n){ return String(n).padStart(2,'0') }
function startClock(){
  if(clockTimer) clearInterval(clockTimer);
  const wjp=['日','月','火','水','木','金','土'], wen=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'], wko=['일','월','화','수','목','금','토'], wzhs=['日','一','二','三','四','五','六'], wru=['Вс','Пн','Вт','Ср','Чт','Пт','Сб'], wfr=['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];
  const pickW=d=>({ja:wjp,ko:wko,zh:wzhs,ru:wru,fr:wfr}[lang]?.[d]||wen[d]);
  const monthShort=m=>({fr:['Janv','Févr','Mars','Avr','Mai','Juin','Juil','Août','Sept','Oct','Nov','Déc'],ru:['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек']}[lang]?.[m]||['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m]);
  const tick=()=>{const now=new Date();const hh=pad(now.getHours()),mm=pad(now.getMinutes()),ss=pad(now.getSeconds());const y=now.getFullYear(), m=now.getMonth()+1, d=now.getDate(); clockTime.textContent=`${hh}:${mm}:${ss}`;
    const w=pickW(now.getDay()); let dateText=''; if(lang==='ja'||lang==='zh'){dateText=`${y}年${m}月${d}日（${w}）`;} else if(lang==='ko'){dateText=`${y}.${m}.${d} (${w})`;} else if(lang==='ru'){dateText=`${d} ${monthShort(m-1)} ${y} (${w})`;} else if(lang==='fr'){dateText=`${w} ${d} ${monthShort(m-1)} ${y}`;} else {dateText=`${w}, ${monthShort(m-1)} ${d}, ${y}`;} clockDate.textContent=dateText;
    const sec = now.getSeconds() + now.getMilliseconds()/1000; clockRing.style.setProperty('--sec', ((sec/60)*100).toFixed(2)+'%'); };
  tick(); clockTimer=setInterval(tick,150);
}
startClock();
/* Battery */
if(navigator.getBattery){ navigator.getBattery().then(b=>{const upd=()=>{clockBatt.textContent=Math.round(b.level*100)+'%'+(b.charging?'⚡':'' ); clockBatt.hidden=false}; ['levelchange','chargingchange'].forEach(ev=>b.addEventListener(ev,upd)); upd(); }).catch(()=>{}); }

/* ===== Cursor & ripple ===== */
window.addEventListener('mousemove',(e)=>{cursor.style.transform=`translate(${e.clientX-170}px,${e.clientY-170}px)`});
document.addEventListener('click',(e)=>{const btn=e.target.closest('.btn');if(!btn)return;const r=btn.getBoundingClientRect();const span=document.createElement('span');span.className='ripple';span.style.left=(e.clientX-r.left)+'px';span.style.top=(e.clientY-r.top)+'px';btn.appendChild(span);setTimeout(()=>span.remove(),650)});

/* ===== Trail ===== */
let trailOn=false, trailPool=[];
function enableTrail(){ if(trailOn) return; trailOn=true; window.addEventListener('mousemove', trailTick) }
function disableTrail(){ if(!trailOn) return; trailOn=false; window.removeEventListener('mousemove', trailTick) }
function trailTick(e){ if(document.documentElement.classList.contains('reduce') || !settings.trail) return; const d=document.createElement('div'); d.className='trail'; d.style.left=e.clientX+'px'; d.style.top=e.clientY+'px'; document.body.appendChild(d); trailPool.push(d); if(trailPool.length>36){ const x=trailPool.shift(); x.remove() } setTimeout(()=>d.remove(),650); }

/* ===== Apply settings ===== */
function applySettings(){
  document.documentElement.classList.toggle('reduce', !!settings.reduce);
  optReduce && (optReduce.checked=!!settings.reduce);
  optAutoReduce && (optAutoReduce.checked=!!settings.autoReduce);
  optTilt   && (optTilt.checked=!!settings.tilt);
  optFocus  && (optFocus.checked=!!settings.focus);
  optConfetti && (optConfetti.checked=!!settings.confetti);
  optParticles && (optParticles.value=+settings.particles);
  optTheme  && (optTheme.value = store.get(themeKey,'dark'));
  optBeams  && (optBeams.checked=!!settings.beams);
  optStars  && (optStars.checked=!!settings.stars);
  optWarp   && (optWarp.checked =!!settings.warp);
  optScan   && (optScan.checked =!!settings.scan);
  optTrail  && (optTrail.checked=!!settings.trail);
  optSheen  && (optSheen.checked=!!settings.sheen);
  optMagnet && (optMagnet.checked=!!settings.magnet);
  optAutoCycle && (optAutoCycle.checked=!!settings.autoCycle);
  optFps    && (optFps.checked=!!settings.fps);
  optFavFirst && (optFavFirst.checked=!!settings.favFirst);
  optDragOrder && (optDragOrder.checked=!!settings.dragOrder);
  optAccentCycle && (optAccentCycle.checked=!!settings.accentCycle);
  /* 新規UI反映 */
  optCompact && (optCompact.checked=!!settings.compact);
  optListView && (optListView.checked=!!settings.listView);
  optTitleShimmer && (optTitleShimmer.checked=!!settings.titleShimmer);
  optClock && (optClock.checked=!!settings.clock);

  const titleEl=document.querySelector('header h1');
  if(titleEl) titleEl.classList.toggle('shimmer', !!settings.titleShimmer);
  document.documentElement.classList.toggle('sheen-on', !!settings.sheen);
  document.body.classList.toggle('compact', !!settings.compact);
  document.body.classList.toggle('list', !!settings.listView);
  if(clockHud) clockHud.style.display = settings.clock ? '' : 'none';
  if(fpsBox) fpsBox.classList.toggle('show', !!settings.fps);

  if(settings.accentCycle) startAccentShift(); else stopAccentShift();
  applyFX();
}
applySettings();

/* ===== Particles ===== */
(function spawnParticles(){
  const prefersReduced = matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const N = (settings.reduce||prefersReduced) ? 0 : ( +settings.particles || (innerWidth > 1200 ? 90 : 48) );
  for(let i=0;i<N;i++){
    const p=document.createElement('div'); p.className='particle';
    p.style.setProperty('--x',Math.random()*100+'vw'); p.style.setProperty('--spd',(6+Math.random()*8)+'s'); p.style.setProperty('--z',(Math.random()*200-100)+'px');
    p.style.animationDelay=(Math.random()*10)+'s'; document.body.appendChild(p);
  }
})();

/* ===== Cards (上段のみ) & favorites ===== */
const cards = Array.from(document.querySelectorAll('#grid .card')); // 下段（gridSoon）は除外
let favs = new Set(store.get(favKey, []));
document.querySelectorAll('#grid .card .fav').forEach(btn=>{
  const card = btn.closest('.card'); const slug=card.dataset.slug;
  if(favs.has(slug)) btn.classList.add('on');
  btn.addEventListener('click',(e)=>{
    e.stopPropagation();
    if(favs.has(slug)){ favs.delete(slug); btn.classList.remove('on'); toast('お気に入りを解除'); }
    else{ favs.add(slug); btn.classList.add('on'); confetti(btn); toast('お気に入りに追加'); }
    store.set(favKey, Array.from(favs));
    if(settings.favFirst) reorderFavs();
  });
});
function reorderFavs(){
  const list=[...grid.children];
  list.sort((a,b)=>{
    const A=favs.has(a.dataset.slug), B=favs.has(b.dataset.slug);
    if(A&&!B) return -1; if(!A&&B) return 1;
    return 0;
  }).forEach(node=>grid.appendChild(node));
}

/* ===== Drag & drop order（上段のみ） ===== */
let dragged=null;
function saveOrder(){ const arr=[...grid.children].map(n=>n.dataset.slug); store.set(orderKey, arr); }
function applyStoredOrder(){
  const order=store.get(orderKey,null); if(!order) return;
  const map={}; [...grid.children].forEach(n=>map[n.dataset.slug]=n);
  order.forEach(slug=>{ const n=map[slug]; if(n) grid.appendChild(n); });
}
function enableDrag(){
  grid.querySelectorAll('.card').forEach(c=>{
    c.setAttribute('draggable','true');
    c.addEventListener('dragstart',()=>{ c.style.opacity='.5'; });
    c.addEventListener('dragend',()=>{ c.style.opacity=''; saveOrder(); });
    c.addEventListener('dragover',e=>{ e.preventDefault(); if(!dragged||dragged===c) return; const rect=c.getBoundingClientRect(); const before=(e.clientY-rect.top)<rect.height/2; grid.insertBefore(dragged, before? c : c.nextSibling); });
    c.addEventListener('dragenter',()=>{ dragged=c; });
  });
}
function disableDrag(){ grid.querySelectorAll('.card').forEach(c=>c.removeAttribute('draggable')); }
if(settings.dragOrder) enableDrag(); else disableDrag();

/* Apply order then fav-first */
applyStoredOrder();
if(settings.favFirst) reorderFavs();

/* ===== 3D tilt / spotlight（上段のみ） ===== */
cards.forEach((card)=>{
  card.addEventListener('mousemove',(e)=>{
    if(!settings.tilt) return;
    const r=card.getBoundingClientRect(); const x=e.clientX-r.left, y=e.clientY-r.top; const midX=r.width/2, midY=r.height/2;
    card.style.setProperty('--rY',((x-midX)/midX)*10+'deg'); card.style.setProperty('--rX',((midY-y)/midY)*10+'deg');
    card.style.setProperty('--spot-x',(x/r.width*100)+'%'); card.style.setProperty('--spot-y',(y/r.height*100)+'%');
  });
  card.addEventListener('mouseleave',()=>{card.style.setProperty('--rY','0deg');card.style.setProperty('--rX','0deg')});
});

/* ===== Confetti ===== */
function confetti(anchor){
  if(!settings.confetti) return;
  const prefersReduced=matchMedia?.('(prefers-reduced-motion: reduce)').matches; if(prefersReduced) return;
  const r=anchor.getBoundingClientRect(); const N=16;
  for(let i=0;i<N;i++){
    const s=document.createElement('div'); const size=6+Math.random()*8;
    s.style.position='fixed'; s.style.left=(r.left+r.width/2)+'px'; s.style.top=(r.top+10)+'px';
    s.style.width=size+'px'; s.style.height=size+'px'; s.style.background=`hsl(${Math.random()*360},90%,60%)`;
    s.style.borderRadius='2px'; s.style.boxShadow='0 2px 8px rgba(0,0,0,.25)'; s.style.zIndex=30; s.style.pointerEvents='none';
    const vx=(Math.random()-0.5)*3, vy=-(2+Math.random()*2), rot=(Math.random()*360)+'deg'; const life=900+Math.random()*500;
    document.body.appendChild(s); const t0=performance.now();
    (function tick(now){ const dt=(now-t0)/1000; const x=vx*60*dt; const y=vy*60*dt+80*dt*dt;
      s.style.transform=`translate(${x}px,${y}px) rotate(${rot})`; s.style.opacity=String(1-dt/(life/1000));
      if(now-t0<life) requestAnimationFrame(tick); else s.remove();
    })(t0);
  }
}

/* ===== UI sound ===== */
let audioCtx=null, buffer=null, seLoaded=false;
async function initAudio(){ if(seLoaded) return; try{ audioCtx=new (window.AudioContext||window.webkitAudioContext)(); const res=await fetch('./assets/audio/Sound1.mp3',{cache:'no-store'}); const arr=await res.arrayBuffer(); buffer=await audioCtx.decodeAudioData(arr); seLoaded=true }catch(e){ seLoaded=false } }
window.addEventListener('click',()=>{ initAudio() },{once:true});
async function playSE(){ if(!audioCtx || !buffer) return; if(audioCtx.state==='suspended'){ try{ await audioCtx.resume() }catch{} } const src=audioCtx.createBufferSource(); src.buffer=buffer; src.connect(audioCtx.destination); src.start(0) }

/* ===== Focus / open（上段のみ） ===== */
function openCard(card, newtab=false){
  const href=card.getAttribute('data-href')||card.querySelector('a.btn')?.href; if(!href) return;
  if(newtab) window.open(href,'_blank'); else location.href=href;
}
function focusCard(card){
  cards.forEach(c=>c.classList.remove('focused')); grid.classList.add('focus-mode'); card.classList.add('focused');
  if(nebulaEl){ nebulaEl.classList.add('flare'); setTimeout(()=>nebulaEl.classList.remove('flare'),800); }
  confetti(card); playSE(); if(navigator.vibrate) navigator.vibrate([8,30,8]);
  store.set('om.last', card.dataset.slug||''); history.replaceState(null,'', '#'+(card.dataset.slug||''));
}
cards.forEach((card)=>{
  card.addEventListener('click',()=>{ if(!settings.focus){ openCard(card); return } const was=card.classList.contains('focused'); if(!was) focusCard(card); else grid.classList.remove('focus-mode'); });
  let touchTimer=null; card.addEventListener('touchstart',()=>{ touchTimer=setTimeout(()=>focusCard(card),400) },{passive:true});
  card.addEventListener('touchend',()=>{ clearTimeout(touchTimer) });
});

/* ===== Outside click（モーダル等除外） ===== */
document.addEventListener('click',(e)=>{ if(!e.target.closest('#grid .card') && !e.target.closest('#settingsBtn') && !e.target.closest('#settingsModal') && !e.target.closest('#helpModal')){ grid.classList.remove('focus-mode'); cards.forEach(c=>c.classList.remove('focused')) }});
document.querySelectorAll('#gridSoon .card.soon').forEach(card=>{
  const open=()=>openSoonCard(card.dataset.soonKey);
  card.addEventListener('click', open);
  card.addEventListener('keydown',(e)=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); open(); } });
});

/* ===== Keys ===== */
document.addEventListener('keydown',(e)=>{
  const isTyping = /^(input|textarea)$/i.test(e.target.tagName) || e.target.isContentEditable;
  const idx = document.activeElement && document.activeElement.classList.contains('card') ? cards.indexOf(document.activeElement) : -1;
  if((e.key==='k' && (e.ctrlKey||e.metaKey)) || e.key==='/'){ e.preventDefault(); filterInput?.focus(); filterInput?.select(); return }
  if(e.key==='?'){ e.preventDefault(); helpModal?.classList.add('show'); return }
  if(e.key==='ArrowRight'){ e.preventDefault(); cards[(idx+1+cards.length)%cards.length]?.focus() }
  if(e.key==='ArrowLeft'){ e.preventDefault(); cards[(idx-1+cards.length)%cards.length]?.focus() }
  if(e.key==='Enter'){ if(idx>=0){ const card=cards[idx]; if(card.classList.contains('focused')) openCard(card); else focusCard(card) } }
  if(e.key==='o'){ if(idx>=0){ const card=cards[idx]; openCard(card) } }
  if(e.key==='Escape'){ grid.classList.remove('focus-mode'); cards.forEach(c=>c.classList.remove('focused')); settingsModal?.classList.remove('show'); helpModal?.classList.remove('show'); soonModal?.classList.remove('show') }
  if(/^[1-9]$/.test(e.key)){ const n=+e.key-1; if(n<cards.length){ cards[n]?.focus(); if(!settings.focus) openCard(cards[n]); } }
  /* 追加ショートカット */
  if(!isTyping && e.key.toLowerCase()==='x'){ fxMuted=!fxMuted; applyFX(); toast(fxMuted?'FXをミュート':'FXを再開'); }
  if(!isTyping && e.key.toLowerCase()==='l'){ settings.listView=!settings.listView; store.set(settingsKey,settings); applySettings(); toast(settings.listView?'リスト表示':'グリッド表示'); }
  if(!isTyping && e.key.toLowerCase()==='c'){ settings.compact=!settings.compact; store.set(settingsKey,settings); applySettings(); toast(settings.compact?'コンパクト表示':'標準表示'); }
});

/* ===== Filter + highlight（上段のみ） ===== */
function clearMarks(el){ el.querySelectorAll('mark').forEach(m=>{const t=document.createTextNode(m.textContent); m.replaceWith(t)}) }
function highlight(el, q){ if(!q){ clearMarks(el); return } clearMarks(el); const walk=(node)=>{ if(node.nodeType===3){ const i=node.nodeValue.toLowerCase().indexOf(q); if(i>-1){ const span=document.createElement('mark'); const r=node.splitText(i); r.splitText(q.length); span.textContent=r.nodeValue; r.replaceWith(span) } } else if(node.nodeType===1){ node.childNodes.forEach(walk) } }; ['h2','p'].forEach(sel=>{ el.querySelectorAll(sel).forEach(walk) }); }
function applyFilter(){ const q=(filterInput.value||'').trim().toLowerCase(); cards.forEach(card=>{ const text = card.innerText.toLowerCase() + ' ' + (card.dataset.tags||'').toLowerCase() + (favs.has(card.dataset.slug)?' fav favorite':''); card.style.display = text.includes(q) ? '' : 'none'; highlight(card, q); }); }
filterInput?.addEventListener('input', applyFilter);

/* ===== Section scroll cue ===== */
scrollToNew?.addEventListener('click',()=>{ document.getElementById('series-new')?.scrollIntoView({behavior:'smooth', block:'start'}) });

/* ===== Settings modal wiring ===== */
settingsBtn?.addEventListener('click',()=>{ settingsModal?.classList.add('show') });
settingsModal?.addEventListener('click',(e)=>{ if(e.target===settingsModal) settingsModal.classList.remove('show') });
document.getElementById('optClose')?.addEventListener('click',()=>settingsModal?.classList.remove('show'));
soonModal?.addEventListener('click',(e)=>{ if(e.target===soonModal) soonModal.classList.remove('show') });
document.getElementById('soonClose')?.addEventListener('click',()=>soonModal?.classList.remove('show'));
optReduce?.addEventListener('change',()=>{ settings.reduce=optReduce.checked; store.set(settingsKey,settings); applySettings(); location.reload() });
optAutoReduce?.addEventListener('change',()=>{ settings.autoReduce=optAutoReduce.checked; store.set(settingsKey,settings) });
optTilt?.addEventListener('change',()=>{ settings.tilt=optTilt.checked; store.set(settingsKey,settings) });
optFocus?.addEventListener('change',()=>{ settings.focus=optFocus.checked; store.set(settingsKey,settings) });
optConfetti?.addEventListener('change',()=>{ settings.confetti=optConfetti.checked; store.set(settingsKey,settings) });
optParticles?.addEventListener('input',()=>{ settings.particles=+optParticles.value; store.set(settingsKey,settings) });
optFps?.addEventListener('change',()=>{ settings.fps=optFps.checked; store.set(settingsKey,settings); fpsBox?.classList.toggle('show', !!settings.fps) });
optFavFirst?.addEventListener('change',()=>{ settings.favFirst=optFavFirst.checked; store.set(settingsKey,settings); if(settings.favFirst) reorderFavs(); else applyStoredOrder(); });
optDragOrder?.addEventListener('change',()=>{ settings.dragOrder=optDragOrder.checked; store.set(settingsKey,settings); settings.dragOrder? enableDrag(): disableDrag() });

;['optBeams','optStars','optWarp','optScan','optTrail','optSheen','optMagnet','optAutoCycle'].forEach(id=>{
  const _el=document.getElementById(id); _el?.addEventListener('change',()=>{
    settings.beams=document.getElementById('optBeams')?.checked ?? settings.beams;
    settings.stars=document.getElementById('optStars')?.checked ?? settings.stars;
    settings.warp =document.getElementById('optWarp')?.checked  ?? settings.warp;
    settings.scan =document.getElementById('optScan')?.checked  ?? settings.scan;
    settings.trail=document.getElementById('optTrail')?.checked ?? settings.trail;
    settings.sheen=document.getElementById('optSheen')?.checked ?? settings.sheen;
    settings.magnet=document.getElementById('optMagnet')?.checked?? settings.magnet;
    settings.autoCycle=document.getElementById('optAutoCycle')?.checked ?? settings.autoCycle;
    store.set(settingsKey,settings);
    document.documentElement.classList.toggle('sheen-on', !!settings.sheen);
    applyFX(); bindMagnet();
  })
});

/* 新規設定イベント */
optCompact?.addEventListener('change',()=>{ settings.compact=optCompact.checked; store.set(settingsKey,settings); applySettings(); });
optListView?.addEventListener('change',()=>{ settings.listView=optListView.checked; store.set(settingsKey,settings); applySettings(); });
optTitleShimmer?.addEventListener('change',()=>{ settings.titleShimmer=optTitleShimmer.checked; store.set(settingsKey,settings); applySettings(); });
optClock?.addEventListener('change',()=>{ settings.clock=optClock.checked; store.set(settingsKey,settings); applySettings(); });

optAccent?.addEventListener('input',()=>{ accent=optAccent.value; store.set(accentKey,accent); if(!settings.accentCycle) applyAccent(accent) });
optAccentRand?.addEventListener('click',()=>{ const rand = '#'+Math.floor(Math.random()*0xffffff).toString(16).padStart(6,'0'); accent = rand; store.set(accentKey,accent); if(!settings.accentCycle) applyAccent(accent); });
optAccentCycle?.addEventListener('change',()=>{ settings.accentCycle=optAccentCycle.checked; store.set(settingsKey,settings); settings.accentCycle? startAccentShift(): stopAccentShift(); });

/* Export/Import/Reset */
optExport?.addEventListener('click',()=>{
  const blob = new Blob([JSON.stringify({settings:settings, accent:accent, theme:store.get(themeKey), order:store.get(orderKey)}, null, 2)], {type:'application/json'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='omni_settings.json'; a.click(); URL.revokeObjectURL(a.href);
  toast('設定をエクスポートしました');
});
optImport?.addEventListener('change',(e)=>{
  const f=e.target.files?.[0]; if(!f) return;
  const fr=new FileReader(); fr.onload=()=>{
    try{
      const data=JSON.parse(fr.result);
      if(data.theme) store.set(themeKey, data.theme);
      if(data.accent){ accent=data.accent; store.set(accentKey, accent) }
      if(data.settings){ Object.assign(settings, data.settings); store.set(settingsKey, settings) }
      if(data.order) store.set(orderKey, data.order);
      applyAccent(accent); applyTheme(store.get(themeKey,'dark')); applySettings(); applyStoredOrder(); if(settings.favFirst) reorderFavs();
      toast('設定を読み込みました。再読み込みで反映が安定します', {action:'再読み込み', onAction:()=>location.reload()});
    }catch{ toast('読み込みに失敗しました', {type:'error'}) }
  };
  fr.readAsText(f);
});
optReset?.addEventListener('click',()=>{ localStorage.removeItem(settingsKey); localStorage.removeItem(accentKey); localStorage.removeItem(themeKey); localStorage.removeItem(orderKey); toast('設定を初期化しました', {action:'再読み込み', onAction:()=>location.reload()}); });
optResetOrder?.addEventListener('click',()=>{ localStorage.removeItem(orderKey); toast('順序を初期化しました', {action:'再読み込み', onAction:()=>location.reload()}); });

/* ===== Splash boot with progress ===== */
(function(){
  const bar = document.getElementById('sProgress')?.querySelector('.bar');
  const setP = (n)=>{ if(bar) bar.style.setProperty('--p', Math.max(0, Math.min(100, n)) + '%') };
  let p = 6; setP(p); const t0 = performance.now(); const MIN_SHOW = 800; const MAX_WAIT = 2600;
  const step = (delta)=>{ p = Math.min(100, p + delta); setP(p) };
  const fReady = (document.fonts?.ready || Promise.resolve()).then(()=>step(35));
  const idle = new Promise(r => (window.requestIdleCallback ? requestIdleCallback(()=>r(), {timeout:900}) : setTimeout(r, 500))).then(()=>step(30));
  window.addEventListener('load', ()=> step(25), { once:true });
  function closeSplash(){ const elapsed = performance.now() - t0; const wait = Math.max(0, MIN_SHOW - elapsed);
    setTimeout(()=>{ document.body.classList.add('loaded'); splash.classList.add('hide'); setTimeout(()=> splash.remove(), 800); }, wait); }
  Promise.race([ Promise.allSettled([fReady, idle]).then(()=>true), new Promise(r=>setTimeout(()=>r(true), MAX_WAIT)) ]).then(closeSplash);
  const reduced = document.documentElement.classList.contains('reduce') || (matchMedia?.('(prefers-reduced-motion: reduce)').matches);
  if (reduced) { setTimeout(()=>{ setP(100) }, 200); }
})();

/* ===== Context menu（上段のみ） ===== */
let ctxTarget=null;
document.addEventListener('contextmenu',(e)=>{
  const card=e.target.closest('.card');
  if(!card || !card.closest('#grid') || card.classList.contains('soon')) return;
  e.preventDefault(); ctxTarget=card; ctxMenu.style.display='block';
  const w=ctxMenu.offsetWidth, h=ctxMenu.offsetHeight;
  const x=Math.min(innerWidth-w-8, Math.max(8, e.clientX));
  const y=Math.min(innerHeight-h-8, Math.max(8, e.clientY));
  ctxMenu.style.left=x+'px'; ctxMenu.style.top=y+'px';
},{passive:false});
document.addEventListener('click',(e)=>{ if(e.target.closest('#ctx .row')) return; ctxMenu.style.display='none' });
ctxMenu.addEventListener('click',(e)=>{
  const cmd=e.target.dataset.cmd; if(!cmd||!ctxTarget) return;
  const href=ctxTarget.getAttribute('data-href')||ctxTarget.querySelector('a.btn')?.href;
  if(cmd==='open') openCard(ctxTarget);
  if(cmd==='newtab') openCard(ctxTarget,true);
  if(cmd==='copy' && href){ navigator.clipboard?.writeText(href).then(()=>{ e.target.textContent='コピー済み'; setTimeout(()=>e.target.textContent='リンクをコピー',900) }) }
  if(cmd==='fav'){ const slug=ctxTarget.dataset.slug; const btn=ctxTarget.querySelector('.fav'); btn?.click(); toast(favs.has(slug)?'お気に入りに追加':'お気に入りを解除') }
  ctxMenu.style.display='none';
});

/* ===== PWA ===== */
let deferredPrompt=null;
window.addEventListener('beforeinstallprompt',(e)=>{ e.preventDefault(); deferredPrompt=e; if(installBtn) installBtn.style.display='inline-flex' });
installBtn?.addEventListener('click',async()=>{ if(!deferredPrompt) return; deferredPrompt.prompt(); try{ await deferredPrompt.userChoice }catch{} deferredPrompt=null; if(installBtn) installBtn.style.display='none' });

/* ===== Share (file:// safe) ===== */
shareBtn?.addEventListener('click', async ()=>{
  const slug = (document.querySelector('#grid .card.focused')?.dataset.slug)||'';
  const base = (location.origin && location.origin !== 'null') ? (location.origin + location.pathname) : location.href.replace(location.hash,'');
  const shareUrl = slug ? (base + '#' + slug) : base;
  const data={ title:document.title, text:'OmniMedia – ランディング', url:shareUrl };
  if(navigator.share){ try{ await navigator.share(data) }catch{} }
  else if(navigator.clipboard){ try{ await navigator.clipboard.writeText(shareUrl); shareBtn.textContent='コピー済み'; setTimeout(()=>shareBtn.textContent='共有',1200) }catch{} }
});

/* ===== Deep link（上段のみ） ===== */
function cardBySlug(slug){ return cards.find(c=> (c.dataset.slug||'')===slug) }
function bootRoute(){
  const url=new URL(location.href);
  const open=url.searchParams.get('open');
  const hash=(location.hash||'').replace(/^#/,'');
  const fx=url.searchParams.get('fx'); if(fx==='off'){ fxMuted=true; applyFX(); toast('FXをミュートして起動中'); }
  if(open){ const c=cardBySlug(open); if(c) { openCard(c); return } }
  if(hash){ const c=cardBySlug(hash); if(c){ focusCard(c); c.focus(); return } }
  const last=store.get('om.last',''); if(last){ const c=cardBySlug(last); if(c){ c.focus() } }
}
bootRoute();

/* ===== SW update notice ===== */
if('serviceWorker' in navigator && (location.protocol==='https:'||location.hostname==='localhost')){
  navigator.serviceWorker.register('./sw.js').then(reg=>{
    if(reg.waiting){ toast('更新があります',{action:'再読み込み', onAction:()=>location.reload()}) }
    reg.addEventListener('updatefound',()=>{
      const sw=reg.installing; if(sw){ sw.addEventListener('statechange',()=>{ if(sw.state==='installed' && navigator.serviceWorker.controller){ toast('更新が適用可能です',{action:'再読み込み', onAction:()=>location.reload()}) } }) }
    });
  }).catch(()=>{});
}

/* ===== Visibility ===== */
document.addEventListener('visibilitychange',()=>{ if(document.hidden) document.documentElement.classList.add('reduce'); else document.documentElement.classList.toggle('reduce', !!settings.reduce); });

/* ===== Parallax ===== */
(function(){
  let raf=0, tx=0, ty=0, dx=0, dy=0;
  window.addEventListener('mousemove',(e)=>{ const cx=innerWidth/2, cy=innerHeight/2; dx=(e.clientX-cx)/cx; dy=(e.clientY-cy)/cy; if(!raf) raf=requestAnimationFrame(loop); });
  function loop(){ tx += (dx-tx)*0.08; ty += (dy-ty)*0.08; const t1=`translate(${tx*10}px,${ty*10}px)`, t2=`translate(${tx*18}px,${ty*14}px)`, t3=`translate(${tx*12}px,${ty*12}px)`; bgEl.style.transform=t1; auroraEl.style.transform=t2; nebulaEl.style.transform=t3; if(Math.abs(dx-tx)<0.001 && Math.abs(dy-ty)<0.001){ cancelAnimationFrame(raf); raf=0 } else { raf=requestAnimationFrame(loop) } }
})();

/* ===== Magnet buttons ===== */
let magnetOn=false, btns=[];
function bindMagnet(){ btns = Array.from(document.querySelectorAll('.btn')); if(settings.magnet && !magnetOn){ window.addEventListener('mousemove',magnetMove); magnetOn=true } if(!settings.magnet && magnetOn){ window.removeEventListener('mousemove',magnetMove); magnetOn=false; btns.forEach(b=>{ b.style.setProperty('--mx','0px'); b.style.setProperty('--my','0px'); b.style.setProperty('--ms','1') }) } }
bindMagnet();
function magnetMove(e){ if(document.documentElement.classList.contains('reduce')) return; btns.forEach(b=>{ const r=b.getBoundingClientRect(); const cx=r.left+r.width/2, cy=r.top+r.height/2; const dx=e.clientX-cx, dy=e.clientY-cy; const dist=Math.hypot(dx,dy); const influence = Math.max(0, 1 - Math.min(dist,240)/240); const mx= (dx*0.08*influence).toFixed(2)+'px'; const my= (dy*0.08*influence).toFixed(2)+'px'; b.style.setProperty('--mx', mx); b.style.setProperty('--my', my); }); }

/* ===== FX apply with mute flag & auto reduce ===== */
function applyFX(){
  const reduced = document.documentElement.classList.contains('reduce') || matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const block = reduced || fxMuted;
  beams?.classList.toggle('show', !!settings.beams && !block);
  stars?.classList.toggle('show', !!settings.stars && !block);
  warp ?.classList.toggle('show', !!settings.warp  && !block);
  scan ?.classList.toggle('show', !!settings.scan  && !block);
  if(settings.trail && !reduced && !fxMuted) enableTrail(); else disableTrail();
}
applyFX();

/* ===== FPS + auto reduce ===== */
(function(){
  let last=performance.now(), frames=0, acc=0, lowAcc=0;
  function tick(now){
    const dt=now-last; last=now; frames++; acc+=dt; lowAcc+=dt;
    if(acc>=500){ const fps=Math.round(frames/(acc/1000)); if(settings.fps && fpsBox){ fpsBox.textContent='fps: '+fps+(fxMuted?' (auto-low)':'') } frames=0; acc=0 }
    if(settings.autoReduce){
      if(lowAcc>=1000){ const fpsEst = Math.round(frames/(lowAcc/1000));
        if(fpsEst<30){ if(!fxMuted){ fxMuted=true; applyFX(); netBadge.textContent='AutoLow'; netBadge.classList.add('off'); toast('自動節電：FXを一時ミュート中') } }
        else if(fpsEst>45){ if(fxMuted){ fxMuted=false; applyFX(); updateNetBadge(); toast('FXを再開しました') } }
        lowAcc=0; frames=0;
      }
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

/* ===== Network badge ===== */
function updateNetBadge(){ const on = navigator.onLine; netBadge.textContent = on?'Online':'Offline'; netBadge.classList.toggle('off', !on); }
window.addEventListener('online', ()=>{ updateNetBadge(); toast('オンラインになりました') });
window.addEventListener('offline',()=>{ updateNetBadge(); toast('オフラインです', {type:'error'}) });
updateNetBadge();

/* ===== Help ===== */
helpBtn?.addEventListener('click',()=>helpModal?.classList.add('show'));
helpModal?.addEventListener('click',(e)=>{ if(e.target===helpModal) helpModal.classList.remove('show') });
document.getElementById('helpClose')?.addEventListener('click',()=>helpModal?.classList.remove('show'));

/* ===== Toast ===== */
function toast(msg, opt={}){ const box=document.getElementById('toasts'); if(!box) return; const t=document.createElement('div'); t.className='toast'; if(opt.type==='error') t.style.borderLeftColor='var(--err)'; t.textContent=msg; if(opt.action){ const a=document.createElement('span'); a.className='act'; a.textContent=' '+opt.action; a.addEventListener('click',()=>{ opt.onAction?.(); t.remove() }); t.appendChild(a) } box.appendChild(t); setTimeout(()=>t.remove(), 4000); }

/* ===== Low spec propose (first run) ===== */
(function(){ const flagKey='om.lowspec.prompted'; if(store.get(flagKey,false)) return; const hc=navigator.hardwareConcurrency||8, mem=navigator.deviceMemory||8; if(hc<=4 || mem<=4){ toast('低スペック環境を検出。省エネモードを推奨します',{action:'有効化', onAction:()=>{ settings.reduce=true; store.set(settingsKey,settings); applySettings(); location.reload() }}); } store.set(flagKey,true); })();

/* ===== Konami ===== */
(function(){ const seq=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']; let i=0; window.addEventListener('keydown',(e)=>{ i = (e.key===seq[i]) ? i+1 : (e.key===seq[0]?1:0); if(i===seq.length){ i=0; for(let k=0;k<8;k++) setTimeout(()=>confetti(document.querySelector('.brand')), k*120); toast('🎉 Secret!') } }); })();

/* ===== Settings UI (tabs / search / presets) ===== */
(function initSettingsUI(){
  const modal = document.getElementById('settingsModal'); if(!modal) return;
  const tabs = Array.from(modal.querySelectorAll('.tabs .tab'));
  const panels = Array.from(modal.querySelectorAll('.panel'));
  const key = 'om.ui.settingsTab';
  function activate(name){ tabs.forEach(b=> b.setAttribute('aria-selected', String(b.dataset.tab===name))); panels.forEach(p=> p.classList.toggle('active', p.dataset.panel===name)); try{ localStorage.setItem(key, JSON.stringify(name)) }catch{} }
  tabs.forEach(b=> b.addEventListener('click', ()=> activate(b.dataset.tab)));
  let lastTab='display'; try{ lastTab=JSON.parse(localStorage.getItem(key))||'display' }catch{}; activate(panels.some(p=>p.dataset.panel===lastTab)?lastTab:'display');

  document.getElementById('settingsBtn')?.addEventListener('click', ()=>{ setTimeout(()=> document.getElementById('settingsSearch')?.focus(), 50); });

  const q = document.getElementById('settingsSearch'); const filter=()=>{ const s=(q.value||'').trim().toLowerCase(); panels.forEach(panel=>{ panel.querySelectorAll('.opt').forEach(opt=>{ const text=opt.innerText.toLowerCase(); opt.style.display = s ? (text.includes(s)?'':'none') : ''; }); }); };
  q?.addEventListener('input', filter);

  const apply=()=>{ try{ localStorage.setItem(settingsKey, JSON.stringify(settings)) }catch{}; applySettings(); if(settings.favFirst) reorderFavs(); else applyStoredOrder(); applyFX?.(); bindMagnet?.(); };
  document.getElementById('presetBalanced')?.addEventListener('click',()=>{ Object.assign(settings,{ reduce:false, autoReduce:true, tilt:true, focus:true, confetti:true, beams:true, stars:true, warp:false, scan:false, trail:true, sheen:true, magnet:true, particles:(innerWidth>1200?72:42), fps:false, dragOrder:true, accentCycle:false, compact:false, listView:false, titleShimmer:true, clock:true, autoCycle:false }); apply(); });
  document.getElementById('presetPerformance')?.addEventListener('click',()=>{ Object.assign(settings,{ reduce:true, autoReduce:true, tilt:false, focus:false, confetti:false, beams:false, stars:false, warp:false, scan:false, trail:false, sheen:false, magnet:false, particles:0, fps:false, dragOrder:false, accentCycle:false, compact:true, listView:true, titleShimmer:false, clock:true, autoCycle:false }); apply(); });
  document.getElementById('presetAesthetic')?.addEventListener('click',()=>{ Object.assign(settings,{ reduce:false, autoReduce:false, tilt:true, focus:true, confetti:true, beams:true, stars:true, warp:true, scan:true, trail:true, sheen:true, magnet:true, particles:(innerWidth>1200?100:72), fps:false, dragOrder:true, accentCycle:true, compact:false, listView:false, titleShimmer:true, clock:true, autoCycle:true }); apply(); });
})();

/* ===== Idle screensaver + auto focus cycle（上段のみ） ===== */
let idleTimer=null; const IDLE_MS=45000;
let cycleTimer=null, cycleIdx=0;
function startCycle(){ if(cycleTimer||!settings.autoCycle) return; const visCards=[...cards].filter(c=>c.style.display!=='none'); if(visCards.length===0) return; cycleIdx = Math.max(0, visCards.findIndex(c=>c.classList.contains('focused'))); cycleTimer=setInterval(()=>{ if(!settings.focus) return; cycleIdx=(cycleIdx+1)%visCards.length; focusCard(visCards[cycleIdx]); }, 5000); }
function stopCycle(){ if(!cycleTimer) return; clearInterval(cycleTimer); cycleTimer=null }
function setIdle(on){ document.body.classList.toggle('idle', on); if(on){ startCycle() } else { stopCycle() } }
function resetIdle(){ setIdle(false); clearTimeout(idleTimer); idleTimer=setTimeout(()=>setIdle(true), IDLE_MS); }
['mousemove','keydown','click','scroll','touchstart'].forEach(ev=>window.addEventListener(ev, resetIdle, {passive:true}));
resetIdle();

/* ===== Final init ===== */
window.addEventListener('load',()=>{ document.body.classList.add('loaded') });

