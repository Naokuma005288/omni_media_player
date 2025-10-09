// thumb-vtt-export.plugin.js
(function(){
  const qs=(s,r=document)=>r.querySelector(s);
  const V = ()=>document.getElementById('v');
  const t=(m,ty='ok',ms=2600)=> (window.toast? toast(m,ty,ms): console.log(m));

  async function genThumbVTT(interval=5, cols=10, tileW=160){
    const v=V(); if(!v) return;
    if(!v.videoWidth || !v.duration){ return t('動画を読み込んでから実行してね','warn'); }
    // CORS制約で drawImage できない場合がある
    const testCanvas=document.createElement('canvas');
    testCanvas.width=1; testCanvas.height=1;
    const ctx=testCanvas.getContext('2d'); 
    try{ ctx.drawImage(v,0,0,1,1); testCanvas.toDataURL('image/jpeg',0.5); }catch(e){ return t('CORSでサムネ生成不可（同一オリジン動画のみ）','err',4000); }

    const dur=v.duration;
    const times=[]; for(let t0=0; t0<dur; t0+=interval){ times.push(Math.min(dur-0.05, t0)) }

    const tileH = Math.round(tileW * v.videoHeight / v.videoWidth);
    const rows = Math.ceil(times.length / cols);
    const perSheet = cols*cols; // 1シート上限（ざっくり）
    const sheets = Math.ceil(times.length / perSheet);

    const urls=[];
    const vPrev = { time: v.currentTime, paused: v.paused, rate: v.playbackRate, volume: v.volume, muted: v.muted };
    v.pause();

    for(let s=0; s<sheets; s++){
      const startIndex = s*perSheet;
      const endIndex = Math.min(times.length, (s+1)*perSheet);
      const count = endIndex - startIndex;
      const cCols = cols;
      const cRows = Math.ceil(count / cCols);
      const cvs=document.createElement('canvas');
      cvs.width = cCols*tileW;
      cvs.height= cRows*tileH;
      const ctx=cvs.getContext('2d');

      for(let i=0; i<count; i++){
        const idx = startIndex + i;
        const tmark = times[idx];
        v.currentTime = tmark;
        await new Promise(r=> v.onseeked = r);
        const x=(i % cCols)*tileW;
        const y=Math.floor(i/cCols)*tileH;
        ctx.drawImage(v,0,0,v.videoWidth,v.videoHeight, x,y, tileW, tileH);
      }
      const url = cvs.toDataURL('image/jpeg',0.8);
      urls.push(url);
    }

    // VTT 書き出し（#xywh を使う）
    const toHMS=(sec)=> {
      const z= (n,l=2)=> String(n).padStart(l,'0');
      const h=Math.floor(sec/3600), m=Math.floor((sec%3600)/60), s=Math.floor(sec%60), ms=Math.floor((sec - Math.floor(sec))*1000);
      return `${z(h)}:${z(m)}:${z(s)}.${z(ms,3)}`;
    };

    let vtt='WEBVTT\n\n';
    const colsUsed = cols;
    const tileWpx = tileW, tileHpx = tileH;

    for(let i=0;i<times.length;i++){
      const a = times[i];
      const b = Math.min(dur, a + interval);
      const sheet = Math.floor(i / (cols*cols)); // 同じ係数使ってるので上の perSheet と一致
      const local = i - sheet*(cols*cols);
      const x = (local % colsUsed)*tileWpx;
      const y = Math.floor(local/colsUsed)*tileHpx;
      const imgName = `thumbs_${sheet+1}.jpg`;
      vtt += `${toHMS(a)} --> ${toHMS(b)}\n${imgName}#xywh=${x},${y},${tileWpx},${tileHpx}\n\n`;
    }

    // 画像とVTTをダウンロード
    urls.forEach((u,idx)=>{
      const a=document.createElement('a'); a.href=u; a.download=`thumbs_${idx+1}.jpg`; a.click();
      setTimeout(()=>URL.revokeObjectURL(u),1500);
    });
    const blob=new Blob([vtt],{type:'text/vtt'}); const a=document.createElement('a');
    a.href=URL.createObjectURL(blob); a.download='thumbnails.vtt'; a.click();
    setTimeout(()=>URL.revokeObjectURL(a.href),1500);

    // 巻き戻し
    v.currentTime = vPrev.time; v.playbackRate=vPrev.rate; v.volume=vPrev.volume; v.muted=vPrev.muted; if(!vPrev.paused){ v.play().catch(()=>{}); }
    t('サムネVTTを書き出しました');
  }

  function mountSettings(){
    const card=qs('#settings .settings-card'); if(!card || card.dataset.thumbVttMounted) return;
    const grid=card.querySelector('.settings-panels [data-tabpanel="ext"]') || card.querySelector('.settings-grid');
    const sec=document.createElement('div'); sec.className='settings-section';
    sec.innerHTML=`
      <h4>拡張 — サムネイルVTT書き出し</h4>
      <div class="row split">
        <div class="col"><label>間隔(秒)</label><input id="tvInterval" type="number" min="1" max="60" step="1" value="5"></div>
        <div class="col"><label>列数</label><input id="tvCols" type="number" min="4" max="20" step="1" value="10"></div>
      </div>
      <div class="row"><label>サムネ幅(px)</label><input id="tvW" type="number" min="80" max="320" step="10" value="160"></div>
      <div class="row" style="gap:.4rem">
        <button class="btn ok" id="tvRun">書き出し</button>
        <span class="badge">同一オリジン動画のみ対応</span>
      </div>
    `;
    grid.appendChild(sec);
    sec.querySelector('#tvRun').addEventListener('click', ()=>{
      const interval=+sec.querySelector('#tvInterval').value||5;
      const cols=+sec.querySelector('#tvCols').value||10;
      const w=+sec.querySelector('#tvW').value||160;
      genThumbVTT(interval, cols, w);
    });
    card.dataset.thumbVttMounted='1';
  }

  document.getElementById('btnSettings')?.addEventListener('click', mountSettings, { once:true });
})();
