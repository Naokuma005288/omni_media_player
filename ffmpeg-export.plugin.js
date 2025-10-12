// 無劣化AB切り出し（MP4/H.264, AAC想定, 実験版）
// 依存: FFmpeg(global) / toast() / state, $（既存）

(() => {
  const row = document.getElementById('btnExportStop')?.parentElement;
  if (!row) return;

  const btn = document.createElement('button');
  btn.id = 'btnExportLossless';
  btn.className = 'btn ghost';
  btn.textContent = 'AB無劣化(実験)';
  row.appendChild(btn);

  let ffmpeg; // lazy load

  async function ensureFF() {
    if (!window.FFmpeg || !FFmpeg.createFFmpeg) {
      window.toast?.('FFmpegが読み込まれていません','err', 4000);
      return false;
    }
    if (!ffmpeg) {
      ffmpeg = FFmpeg.createFFmpeg({ log: true });
      await ffmpeg.load();
    }
    return true;
  }

  function sec(n) { return Math.max(0, Math.round(n*1000)/1000).toString(); }

  btn.onclick = async () => {
    try {
      const a = window.state?.a, b = window.state?.b;
      if (!(a != null && b != null && b > a)) {
        window.toast?.('A/Bを設定してね','warn'); return;
      }

      // 埋め込みは対象外
      if (window.state?.usingYouTube || window.state?.usingIframe) {
        window.toast?.('埋め込みソースは無劣化切出し不可','warn'); return;
      }

      if (!await ensureFF()) return;

      const srcItem = window.state?.list?.[window.state?.cur];
      const srcUrl  = window.$?.v?.currentSrc || '';
      const name = (srcItem?.file?.name) || (srcUrl.split('/').pop() || 'in.mp4');

      // MP4以外は失敗しやすいので弾く（必要なら拡張してね）
      if (!/\.mp4(\?|$)/i.test(name)) {
        window.toast?.('MP4のみ対応（実験版）','warn', 4000); return;
      }

      const { fetchFile } = FFmpeg;
      const data = srcItem?.file ? await fetchFile(srcItem.file)
                                 : await fetchFile(srcUrl);

      ffmpeg.FS('writeFile', 'in.mp4', data);

      const dur = b - a;
      window.toast?.('FFmpeg: 切り出し中…（初回は重い）','ok', 6000);

      // キーフレーム境界で高速切り出し（再エンコード無し）
      await ffmpeg.run(
        '-ss',  sec(a),
        '-t',   sec(dur),
        '-i',   'in.mp4',
        '-c',   'copy',
        'clip.mp4'
      );

      const out = ffmpeg.FS('readFile', 'clip.mp4');
      const blob = new Blob([out.buffer], { type: 'video/mp4' });
      const aEl = document.createElement('a');
      aEl.href = URL.createObjectURL(blob);
      aEl.download = 'clip.mp4';
      aEl.click();
      window.toast?.('無劣化AB書き出し 完了');
    } catch (e) {
      window.toast?.('FFmpeg切り出しに失敗（CORS/形式/容量の可能性）','err', 6000);
    }
  };
})();
