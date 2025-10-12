import { register } from './registry.js';

register('fs-access', async () => {
  const secure = location.protocol === 'https:' || location.hostname === 'localhost';
  const supported = !!(window.showOpenFilePicker || window.showSaveFilePicker);

  window.OPBoost.fs = {
    supported: supported && secure,
    async open(opts = { multiple: false, types: [{ description: 'Media', accept: { 'video/*': ['.mp4', '.mkv'], 'audio/*': ['.mp3', '.flac'] } }] }) {
      if (!this.supported) throw new Error('FS API is only available on HTTPS/localhost');
      const handles = await showOpenFilePicker({ multiple: !!opts.multiple, types: opts.types });
      return Promise.all(handles.map(h => h.getFile()));
    },
    async save(filename = 'clip.webm', blob = new Blob()) {
      if (!this.supported) throw new Error('FS API is only available on HTTPS/localhost');
      const handle = await showSaveFilePicker({ suggestedName: filename });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return true;
    }
  };
});
