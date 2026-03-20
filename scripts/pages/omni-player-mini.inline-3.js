(()=> {
  const FREQS = [32,64,125,250,500,1000,2000,4000,8000,16000];
  const PRESETS = {
    flat:  [0,0,0,0,0,0,0,0,0,0],
    bass:  [6,5,4,2,0,-1,-2,-3,-4,-4],
    treble:[-3,-3,-2,-1,0,1,3,4,5,6],
    vocal: [-2,-1,0,2,3,3,2,0,-1,-2],
    pop:   [0,2,3,2,0,0,2,3,2,0],
    rock:  [4,3,1,-1,-2,0,2,3,4,5]
  };
  const clamp=(x,a,b)=>Math.min(b,Math.max(a,x));

  const OPAudio = {
    ctx:null, preGain:null, comp:null,
    filters:[], eqEnabled:false, limiterEnabled:true,
    usingGraph:false, safeFallback:true,
    _video:null,
    srcNode:null, srcMediaNode:null, srcStreamNode:null,

    async ensure(video){
      if (this._video !== video){ this._video = video; this.resetGraph(); }

      if (!this.ctx) {
        try{ this.ctx = new (window.AudioContext||window.webkitAudioContext)(); }
        catch(e){ this.safeFallback = true; return; }
      }
      if (this.ctx.state !== 'running'){
        try{ await this.ctx.resume(); }catch(e){}
      }

      if (!this.preGain){
        try{ this.preGain = this.ctx.createGain(); this.preGain.gain.value = 1.0; }
        catch(e){ this.safeFallback=true; return; }
      }
      if (!this.comp){
        try{
          this.comp = this.ctx.createDynamicsCompressor();
          this.comp.threshold.value = -10; this.comp.knee.value = 18;
          this.comp.ratio.value = 12; this.comp.attack.value = 0.003; this.comp.release.value = 0.25;
        }catch(e){ /* optional */ }
      }
      if (this.filters.length===0){
        const gains = this._loadGains();
        for(let i=0;i<FREQS.length;i++){
          const f = this.ctx.createBiquadFilter();
          f.type = (i===0) ? 'lowshelf' : (i===FREQS.length-1 ? 'highshelf' : 'peaking');
          f.frequency.value = FREQS[i];
          f.Q.value = (f.type==='peaking') ? 0.9 : 0.707;
          f.gain.value = gains[i]||0;
          this.filters.push(f);
        }
        this.eqEnabled = this._loadEnabled();
        this.limiterEnabled = this._loadLimiter();
      }

      if (!this.srcNode){
        try{
          this.srcMediaNode = this.ctx.createMediaElementSource(video);
          this.srcNode = this.srcMediaNode;
        }catch(e){
          try{
            const stream = (video.captureStream?.() || video.mozCaptureStream?.());
            if (stream){
              this.srcStreamNode = this.ctx.createMediaStreamSource(stream);
              this.srcNode = this.srcStreamNode;
            }else{
              this.safeFallback = true; this.usingGraph = false; video.muted = false; return;
            }
          }catch(e2){
            this.safeFallback = true; this.usingGraph = false; video.muted = false; return;
          }
        }
      }

      this.reconnect();
    },

    reconnect(){
      if (!this.srcNode){ this.usingGraph=false; return; }
      try{ this.srcNode.disconnect(); }catch{}
      try{ this.preGain.disconnect(); }catch{}
      try{ this.comp?.disconnect(); }catch{}
      for(const n of this.filters){ try{ n.disconnect(); }catch{} }

      if (this.eqEnabled){
        this._connectEqChain();
        this.usingGraph = true;
        this._video.muted = true;
      }else{
        this.usingGraph = false;
        this._video.muted = false;
      }
    },

    _connectEqChain(){
      let node = this.srcNode;
      try{
        node.connect(this.preGain); node = this.preGain;
        if (this.limiterEnabled && this.comp){ node.connect(this.comp); node = this.comp; }
        for(const f of this.filters){ node.connect(f); node = f; }
        node.connect(this.ctx.destination);
      }catch(e){
        this._video.muted = false;
        this.usingGraph = false;
        this.safeFallback = true;
      }
    },

    setEnabled(on){ this.eqEnabled = !!on; this._saveEnabled(this.eqEnabled); this.reconnect(); },
    setLimiter(on){ this.limiterEnabled = !!on; this._saveLimiter(this.limiterEnabled); this.reconnect(); },

    setBand(i, gain){
      if(!this.filters[i]) return;
      const g = clamp(+gain, -12, 12);
      this.filters[i].gain.value = g;
      this._saveGains();
    },
    setPreset(name){ const g = PRESETS[name] || PRESETS.flat; for(let i=0;i<g.length;i++){ this.setBand(i, g[i]); } },
    getGains(){ return this.filters.map(f=> Number(f.gain.value.toFixed(2))); },

    /* ==== 追加: マイクロフェード用ユーティリティ ==== */
    rampPreGain(target, durSec){
      try{
        const ctx = this.ctx; if(!ctx || !this.preGain) return false;
        const now = ctx.currentTime;
        const g = this.preGain.gain;
        g.cancelScheduledValues(now);
        g.setValueAtTime(g.value, now);
        g.linearRampToValueAtTime(Math.max(0, target), now + Math.max(0.01, durSec||0.08));
        return true;
      }catch{ return false; }
    },

    resetGraph(){
      try{ this.srcNode?.disconnect(); }catch{}
      try{ this.preGain?.disconnect(); }catch{}
      try{ this.comp?.disconnect(); }catch{}
      this.srcMediaNode=null; this.srcStreamNode=null; this.srcNode=null; this.usingGraph=false;
      if (this._video) this._video.muted=false;
    },

    _saveGains(){ try{ localStorage.setItem('pc.eq.gains', JSON.stringify(this.getGains())); }catch{} },
    _loadGains(){ try{ const s=JSON.parse(localStorage.getItem('pc.eq.gains')||'[]'); if(Array.isArray(s)&&s.length===FREQS.length) return s; }catch{} return PRESETS.flat.slice(); },
    _saveEnabled(v){ try{ localStorage.setItem('pc.eq.enabled', v?'1':'0'); }catch{} },
    _loadEnabled(){ try{ const s=localStorage.getItem('pc.eq.enabled'); return s ? s!=='0' : false; }catch{ return false; } },
    _saveLimiter(v){ try{ localStorage.setItem('pc.limiter.enabled', v?'1':'0'); }catch{} },
    _loadLimiter(){ try{ const s=localStorage.getItem('pc.limiter.enabled'); return s ? s!=='0' : true; }catch{ return true; } }
  };

  window.OPAudio = OPAudio;
  window.OPAudio_FREQS = FREQS;
  window.OPAudio_PRESETS = PRESETS;
})();
