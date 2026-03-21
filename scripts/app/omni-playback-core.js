(function(){
  const root = window;
  const userAgent = navigator.userAgent || '';

  function detectPlatform(){
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
    const isAndroid = /Android/i.test(userAgent);
    const isMobile = isIOS || isAndroid;
    const isStandalonePwa =
      root.matchMedia?.('(display-mode: standalone)')?.matches ||
      root.navigator.standalone === true ||
      document.referrer.startsWith?.('android-app://');
    return { userAgent, isIOS, isAndroid, isMobile, isStandalonePwa };
  }

  function hasFreshGesture(lastGestureAt, windowMs){
    const threshold = Number.isFinite(windowMs) ? windowMs : 4000;
    return !!lastGestureAt && (Date.now() - lastGestureAt) < threshold;
  }

  async function performPlayAttempt(options){
    const media = options?.getMedia ? options.getMedia() : options?.media;
    if(!media || typeof media.play !== 'function') throw new Error('No playable media');

    if(typeof options?.ensureReady === 'function') await options.ensureReady();
    if(typeof options?.beforePlay === 'function') await options.beforePlay(media);

    const settle = async(mode)=>{
      if(typeof options?.afterPlay === 'function') await options.afterPlay(media, mode);
      return { mode };
    };

    try{
      const primary = media.play();
      if(primary && typeof primary.then === 'function'){
        await primary.catch(err=>{
          if(options?.ignoreAbortError && err?.name === 'AbortError') return;
          throw err;
        });
      }
      return settle('primary');
    }catch(err){
      if(typeof options?.onPrimaryError === 'function') options.onPrimaryError(err, media);
      if(!options?.allowMutedFallback) throw err;

      const prevMuted = !!media.muted;
      const prevVol = Number.isFinite(media.volume) ? media.volume : 1;
      media.muted = true;

      try{
        const fallback = media.play();
        if(fallback && typeof fallback.then === 'function'){
          await fallback.catch(error=>{
            if(options?.ignoreAbortError && error?.name === 'AbortError') return;
            throw error;
          });
        }
        const restoreDelay = Number.isFinite(options?.restoreDelay) ? options.restoreDelay : 120;
        root.setTimeout(()=>{
          try{
            media.muted = prevMuted;
            if(!prevMuted && prevVol > 0) media.volume = prevVol;
            if(typeof options?.afterRestore === 'function') options.afterRestore(media);
          }catch(e){}
        }, restoreDelay);
        return settle('muted-fallback');
      }catch(fallbackErr){
        if(typeof options?.onFallbackError === 'function') options.onFallbackError(fallbackErr, media);
        throw fallbackErr;
      }
    }
  }

  function inferArtworkType(src){
    const value = String(src || '');
    const m = value.match(/^data:(image\/[^;]+);/i);
    if(m) return m[1];
    if(/\.png(\?|$)/i.test(value)) return 'image/png';
    if(/\.webp(\?|$)/i.test(value)) return 'image/webp';
    if(/\.gif(\?|$)/i.test(value)) return 'image/gif';
    if(/\.svg(\?|$)/i.test(value)) return 'image/svg+xml';
    return 'image/jpeg';
  }

  function buildArtworkEntries(urls, resolveType){
    const uniq = [...new Set((urls || []).filter(Boolean))].slice(0, 6);
    const resolver = typeof resolveType === 'function' ? resolveType : inferArtworkType;
    return uniq.map(src=>({ src, sizes:'512x512', type: resolver(src) }));
  }

  function createMediaSessionBridge(options){
    if(!('mediaSession' in navigator)) return null;

    const getMedia = ()=> options?.getMedia ? options.getMedia() : options?.media;
    const getMetadata = ()=> options?.getMetadata ? options.getMetadata() : {};
    const isPaused = ()=>{
      if(typeof options?.isPaused === 'function') return !!options.isPaused();
      const media = getMedia();
      return !media || !!media.paused;
    };

    function pushPosition(){
      const media = getMedia();
      if(!media) return;
      try{
        if(typeof navigator.mediaSession.setPositionState === 'function' && Number.isFinite(media.duration)){
          navigator.mediaSession.setPositionState({
            duration: media.duration || 0,
            position: media.currentTime || 0,
            playbackRate: media.playbackRate || 1
          });
        }
      }catch(e){}
    }

    function syncPlaybackState(){
      try{ navigator.mediaSession.playbackState = isPaused() ? 'paused' : 'playing'; }catch(e){}
    }

    function update(metaOverride){
      const meta = metaOverride || getMetadata() || {};
      const title = meta.title || '';
      const artist = meta.artist || '';
      const album = meta.album || '';
      const artwork = Array.isArray(meta.artwork) ? meta.artwork : [];
      try{
        navigator.mediaSession.metadata = new MediaMetadata({ title, artist, album, artwork });
      }catch(e){}
      pushPosition();
      syncPlaybackState();
    }

    function bindHandler(name, fn){
      try{ navigator.mediaSession.setActionHandler(name, typeof fn === 'function' ? fn : null); }catch(e){}
    }

    bindHandler('play', options?.onPlay);
    bindHandler('pause', options?.onPause);
    bindHandler('seekbackward', options?.onSeekBackward);
    bindHandler('seekforward', options?.onSeekForward);
    bindHandler('seekto', options?.onSeekTo);
    bindHandler('previoustrack', options?.onPreviousTrack);
    bindHandler('nexttrack', options?.onNextTrack);

    return { update, pushPosition, syncPlaybackState };
  }

  root.OmniPlaybackCore = {
    detectPlatform,
    hasFreshGesture,
    performPlayAttempt,
    buildArtworkEntries,
    inferArtworkType,
    createMediaSessionBridge
  };
})();
