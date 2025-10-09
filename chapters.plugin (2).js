// chapters.plugin.js
(function(){
  const qs = (s,r=document)=>r.querySelector(s);
  const V  = ()=>document.getElementById('v');
  const t  = (m,ty='ok',ms=2200)=> (window.toast? toast(m,ty,ms): console.log(m));
  const fmt = (s)=>{ if(!Number.isFinite(s)) return '-'; const m=Math.floor(s/60), ss=String(Math.floor(s%60)).padStart(2,'0'); return `${m}:${ss}`; };
  const key = (src)=> `pc.chapters::${src||''}`;
  const load = (src)=>{ try{ return JSON.parse(localStorage.getItem(key(src))||'[]'); }catch{ return [] } };
  const save = (src,arr)=>{ try{ localStorage.setItem(key(src), JSON.stringify(arr)); }catch{} };
  const nowSrc = ()=> { try{ return V()?.currentSrc||'' }catch{ return '' } };

  function addChapterAtCur(){
    const v=V(); if(!v) return;
    const src=nowSrc(); if(!src) return t('メディア未読込','warn');
    const list=load(src);
    const cur=Math.max(0,Math.min(v.duration||0,v.currentTime||0));
    list.push({t:cur,label:`Chapter ${list.length+1}`});
    list.sort((a,b)=>a.t-b.t);
    save(src,list); render();
    t(`チャプター追加 ${fmt(cur)}`);
  }
  function removeChapter(i){
    const src=nowSrc(); const list=load(src); list.splice(i,1); save(src,list); render();
  }
  function jump(i){
    const v=V(); const list=load(nowSrc()); const c=list[i]; if(!v||!c) return;
    v.currentTime=c.t+0.05; v.play?.();
  }

  function toVTT(chaps, dur){
    const pad = (n)=>String(n).padStart(2,'0');
    const ms = (f)=> pad(f.toFixed(3).split('.')[1]||'000');
    const hhmmss = (sec)=>{
      const h=Math.floor(sec/3600), m=Math.floor((sec%3600)/60), s=(sec%60);
      return `${pad(h)}:${pad(m)}:${pad(Math.floor(s))}.${ms(s-Math.floor(s))}`;
    };
    let out='WEBVTT\n\n';
    for(let i=0;i<chaps.length;i++){
      const a=chaps[i].t, b=(i+1<chaps.length? chaps[i+1].t : (dur||a+0.001)) - 0.001;
      out += `${hhmmss(a)} --> ${hhmmss(Math.max(a,b))}\n${chaps[i].label||('Chapter '+(i+1))}\n\n`;
    }
    return out;
  }
  function fromVTT(txt){
    const lines=txt.replace(/\r/g,'').split('\n');
    const rx=/(\d+):(\d+):(\d+)\.(\d{3})\s*-->\s*(\d+):/;
    const ch=[]; let i=0;
    const toSec=(h,m,s,ms)=> (+h)*3600+(+m)*60+(+s)+(+ms)/1000;
    while(i<lines.length){
      const L=lines[i++];
      const m=rx.exec(L); if(!m) continue;
      const start = toSec(m[1],m[2],m[3],m[4]);
      let label=''; while(i<lines.length && lines[i].trim()!==''){ label = lines[i++].trim() }
      ch.push({t:start,label:label||`Chapter ${ch.length+1}`});
    }
    ch.sort((a,b)=>a.t-b.t);
    // 先頭に0が無ければ足す派
    if(ch[0] && ch[0].t>0.8) ch.unshift({t:0,label:ch[0].label||'Intro'});
    return ch;
  }

  function render(){
    const card = qs('#settings .settings-card'); if(!card) return;
    const box = card.querySelector('#chapList'); if(!box) return;
    const src=nowSrc(); const list=load(src);
    box.innerHTML='';
    list.forEach((c,i)=>{
      const row=document.createElement('div');
      row.style.cssText='display:flex;gap:.4rem;align-items:center';
      row.innerHTML = `
        <button class="btn ghost" data-i="${i}">▶ ${fmt(c.t)}</button>
        <input class="label" value="${(c.label||'').replace(/"/g,'&quot;')}" style="flex:1;min-width:0">
        <button class="btn danger" data-x="${i}">×</button>
      `;
      box.appendChild(row);
    });
    box.querySelectorAll('button[data-i]').forEach(b=>b.addEventListener('click',()=>jump(+b.dataset.i)));
    box.querySelectorAll('button[data-x]').forEach(b=>b.addEventListener('click',()=>removeChapter(+b.dataset.x)));
    box.querySelectorAll('.label').forEach((inp,idx)=>{
      inp.addEventListener('change',()=>{
        const src=nowSrc(); const arr=load(src); if(arr[idx]){ arr[idx].label=inp.value; save(src,arr); }
      });
    });
  }

  function mountSettings(){
    const card = qs('#settings .settings-card'); if(!card || card.dataset.chapsMounted) return;
    const grid = card.querySelector('.settings-panels [data-tabpanel="ext"]') || card.querySelector('.settings-grid');
    const sec = document.createElement('div');
    sec.className='settings-section';
    sec.innerHTML=`
      <h4>拡張 — チャプター</h4>
      <div class="row" style="gap:.4rem">
        <button class="btn ok" id="chapAdd">現在位置を追加</button>
        <button class="btn ghost" id="chapExport">.vtt に書き出し</button>
        <input id="chapImport" type="file" accept=".vtt, text/vtt" style="display:none">
        <button class="btn ghost" id="chapImportBtn">.vtt から読込</button>
      </div>
      <div id="chapList" style="display:grid;gap:.4rem"></div>
    `;
    grid.appendChild(sec);
    sec.querySelector('#chapAdd').addEventListener('click', addChapterAtCur);
    sec.querySelector('#chapExport').addEventListener('click', ()=>{
      const v=V(); const src=nowSrc(); const list=load(src);
      const vtt = toVTT(list, v?.duration||0);
      const blob=new Blob([vtt],{type:'text/vtt'}); const a=document.createElement('a');
      a.href=URL.createObjectURL(blob); a.download='chapters.vtt'; a.click();
      setTimeout(()=>URL.revokeObjectURL(a.href),1500);
    });
    sec.querySelector('#chapImportBtn').addEventListener('click', ()=> sec.querySelector('#chapImport').click());
    sec.querySelector('#chapImport').addEventListener('change', async e=>{
      const f=e.target.files?.[0]; if(!f) return;
      try{ const txt=await f.text(); const arr=fromVTT(txt); save(nowSrc(),arr); render(); t('チャプター読み込み'); }
      catch{ t('VTT解析に失敗','err',3200) }
    });
    card.dataset.chapsMounted='1';
    render();
  }

  document.getElementById('btnSettings')?.addEventListener('click', mountSettings, { once:true });
})();
