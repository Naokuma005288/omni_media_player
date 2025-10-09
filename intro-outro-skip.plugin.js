// intro-outro-skip.plugin.js
(function(){
  const qs=(s,r=document)=>r.querySelector(s);
  const V = ()=>document.getElementById('v');
  const t=(m,ty='ok',ms=2000)=> (window.toast? toast(m,ty,ms): console.log(m));
  const key = (src)=> `pc.skip::${src||''}`;
  const load=(src)=>{ try{ return JSON.parse(localStorage.getItem(key(src))||'{"on":true,"intro":0,"outro":0,"ranges":[]}'); }catch{ return {on:true,intro:0,outro:0,ranges:[]} } };
  const save=(src,st)=>{ try{ localStorage.setItem(key(src),JSON.stringify(st)) }catch{} };
  const nowSrc = ()=> { try{ return V()?.currentSrc||'' }catch{ return '' } };

  let guard=0;

  function shouldSkip(st,cur,dur){
    if(!st.on) return null;
    const ranges=[...st.ranges];
    if(st.intro>0) ranges.push([0, Math.min(st.intro, dur-0.5)]);
    if(st.outro>0) ranges.push([Math.max(0,dur-st.outro), dur]);
    for(const [a,b] of ranges){
      if(cur>=a && cur<=b-0.08) return b;
    }
    return null;
  }

  function hook(){
    const v=V(); if(!v || v._skipHooked) return;
    v._skipHooked=true;
    v.addEventListener('timeupdate', ()=>{
      if(guard>0){ guard--; return; }
      const st=load(nowSrc()); const dur=v.duration||0, cur=v.currentTime||0;
      const to=shouldSkip(st,cur,dur);
      if(Number.isFinite(to)){
        v.currentTime = Math.min(dur-0.05, to);
        guard = 3; // ちょいガード
        t('自動スキップ');
      }
    });
  }

  function mountSettings(){
    const card=qs('#settings .settings-card'); if(!card || card.dataset.skipMounted) return;
    const grid=card.querySelector('.settings-panels [data-tabpanel="ext"]') || card.querySelector('.settings-grid');

    const sec=document.createElement('div'); sec.className='settings-section';
    sec.innerHTML=`
      <h4>拡張 — イントロ/アウトロ・スキップ</h4>
      <div class="row switch"><input id="skOn" type="checkbox" checked><label for="skOn">有効化</label></div>
      <div class="row split">
        <div class="col"><label>イントロ秒</label><input id="skIntro" type="number" min="0" max="600" step="1" value="0"></div>
        <div class="col"><label>アウトロ秒</label><input id="skOutro" type="number" min="0" max="600" step="1" value="0"></div>
      </div>
      <div class="row" style="gap:.4rem">
        <button class="btn ghost" id="skAdd">現在位置から +15s を範囲追加</button>
        <button class="btn ghost" id="skClear">範囲クリア</button>
      </div>
      <div id="skList" style="display:grid;gap:.4rem"></div>
    `;
    grid.appendChild(sec);

    const $on=sec.querySelector('#skOn'), $in=sec.querySelector('#skIntro'), $out=sec.querySelector('#skOutro'), $list=sec.querySelector('#skList');

    function syncUI(){
      const st=load(nowSrc()); $on.checked=!!st.on; $in.value=st.intro||0; $out.value=st.outro||0;
      $list.innerHTML='';
      st.ranges.forEach((r,i)=>{
        const row=document.createElement('div');
        row.style.cssText='display:flex;gap:.4rem;align-items:center';
        const a=Math.max(0,r[0]||0), b=Math.max(a, r[1]||0);
        row.innerHTML = `<span class="badge">${a.toFixed(1)}–${b.toFixed(1)}s</span><button class="btn danger" data-x="${i}">×</button>`;
        $list.appendChild(row);
      });
      $list.querySelectorAll('button[data-x]').forEach(b=>b.addEventListener('click',()=>{
        const st=load(nowSrc()); st.ranges.splice(+b.dataset.x,1); save(nowSrc(),st); syncUI();
      }));
    }

    $on.addEventListener('change',()=>{ const st=load(nowSrc()); st.on=$on.checked; save(nowSrc(),st) });
    $in.addEventListener('change',()=>{ const st=load(nowSrc()); st.intro=+($in.value||0); save(nowSrc(),st) });
    $out.addEventListener('change',()=>{ const st=load(nowSrc()); st.outro=+($out.value||0); save(nowSrc(),st) });

    sec.querySelector('#skAdd').addEventListener('click',()=>{
      const v=V(); if(!v) return;
      const a=v.currentTime||0, b=Math.min(v.duration||a+15, a+15);
      const st=load(nowSrc()); st.ranges.push([a,b]); st.ranges.sort((x,y)=>x[0]-y[0]); save(nowSrc(),st); syncUI();
    });
    sec.querySelector('#skClear').addEventListener('click',()=>{ const st=load(nowSrc()); st.ranges=[]; save(nowSrc(),st); syncUI() });

    syncUI(); hook();
    card.dataset.skipMounted='1';
  }

  document.getElementById('btnSettings')?.addEventListener('click', mountSettings, { once:true });
  window.addEventListener('load', hook);
})();
