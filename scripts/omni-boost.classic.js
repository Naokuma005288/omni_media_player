(function () {
  function waitForGlobal(path, timeout) {
    var limit = typeof timeout === 'number' ? timeout : 10000;
    return new Promise(function (resolve, reject) {
      var keys = String(path || '').split('.');
      var t0 = performance.now();
      (function poll() {
        var cur = window;
        for (var i = 0; i < keys.length; i += 1) {
          cur = cur && cur[keys[i]];
        }
        if (cur) return resolve(cur);
        if (performance.now() - t0 > limit) return reject(new Error('timeout: ' + path));
        requestAnimationFrame(poll);
      })();
    });
  }

  var modules = [];

  function register(name, init) {
    modules.push({ name: name, init: init });
  }

  function initAll() {
    modules.forEach(function (mod) {
      Promise.resolve()
        .then(function () { return mod.init(); })
        .then(function () { console.info('[OPBoost]', mod.name, 'ready'); })
        .catch(function (err) { console.warn('[OPBoost]', mod.name, err && err.message ? err.message : err); });
    });
  }

  window.OPBoost = window.OPBoost || {};
  window.OPBoost.register = register;
  window.OPBoost.waitForGlobal = waitForGlobal;

  register('particles', async function () {
    var particlesJS = await waitForGlobal('particlesJS');
    var layer = document.getElementById('particles-js');
    if (!layer) {
      layer = document.createElement('div');
      layer.id = 'particles-js';
      layer.style.position = 'fixed';
      layer.style.inset = '0';
      layer.style.zIndex = '-1';
      document.body.prepend(layer);
    }

    particlesJS('particles-js', {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: '#9bd0ff' },
        opacity: { value: 0.3 },
        size: { value: 2, random: true },
        move: { enable: true, speed: 1, out_mode: 'out' },
        line_linked: { enable: false }
      },
      interactivity: { events: { onhover: { enable: false }, onclick: { enable: false } } }
    });
  });

  register('anime', async function () {
    var anime = await waitForGlobal('anime');
    var h1 = document.querySelector('header h1');
    if (h1) {
      h1.style.opacity = 0;
      anime({ targets: h1, opacity: [0, 1], translateY: [-6, 0], duration: 600, easing: 'easeOutQuad' });
    }
    window.OPBoost.anime = anime;
  });

  register('howler', async function () {
    var Howl = await waitForGlobal('Howl');
    window.OPBoost.Howl = Howl;
  });

  register('fs-access', async function () {
    var secure = location.protocol === 'https:' || location.hostname === 'localhost';
    var supported = !!(window.showOpenFilePicker || window.showSaveFilePicker);

    window.OPBoost.fs = {
      supported: supported && secure,
      open: async function (opts) {
        var options = opts || {
          multiple: false,
          types: [{ description: 'Media', accept: { 'video/*': ['.mp4', '.mkv'], 'audio/*': ['.mp3', '.flac'] } }]
        };
        if (!this.supported) throw new Error('FS API is only available on HTTPS/localhost');
        var handles = await showOpenFilePicker({ multiple: !!options.multiple, types: options.types });
        return Promise.all(handles.map(function (handle) { return handle.getFile(); }));
      },
      save: async function (filename, blob) {
        if (!this.supported) throw new Error('FS API is only available on HTTPS/localhost');
        var handle = await showSaveFilePicker({ suggestedName: filename || 'clip.webm' });
        var writable = await handle.createWritable();
        await writable.write(blob || new Blob());
        await writable.close();
        return true;
      }
    };
  });

  register('tfjs', async function () {
    var tf = await waitForGlobal('tf');
    await tf.ready();
    tf.tidy(function () { return tf.matMul(tf.ones([2, 2]), tf.ones([2, 2])); });
    window.OPBoost.tf = tf;
  });

  register('compromise', async function () {
    var nlp = await waitForGlobal('nlp');
    window.OPBoost.nlp = nlp;
    window.OPBoost.normalizeQuery = function (q) {
      try {
        return nlp(q).normalize({ whitespace: true, case: true }).text();
      } catch (_err) {
        return String(q || '').trim();
      }
    };
  });

  register('barba', async function () {
    var barba = await waitForGlobal('barba');
    try {
      barba.init({
        transitions: [{
          name: 'fade',
          leave: function (_ref) {
            var current = _ref.current;
            var done = _ref.done;
            current.container.style.opacity = 0;
            done();
          },
          enter: function (_ref2) {
            var next = _ref2.next;
            var done = _ref2.done;
            next.container.style.opacity = 1;
            done();
          }
        }]
      });
    } catch (_err) {
      // 単一ページでの失敗は無視
    }
    window.OPBoost.barba = barba;
  });

  register('localforage', async function () {
    var localforage = await waitForGlobal('localforage');
    localforage.config({ name: 'omni-player', version: 1.0, storeName: 'kv' });
    window.OPBoost.lf = localforage;
    window.OPBoost.kv = {
      get: function (k, d) {
        return localforage.getItem(k).then(function (v) { return v === null ? (d == null ? null : d) : v; });
      },
      set: function (k, v) { return localforage.setItem(k, v); },
      del: function (k) { return localforage.removeItem(k); }
    };
  });

  window.addEventListener('DOMContentLoaded', initAll);
})();
