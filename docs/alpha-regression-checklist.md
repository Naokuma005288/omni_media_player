# Alpha Regression Checklist

## Playback Paths

- HTML5 local file: play, pause, seek, next track, volume, rate, master
- HLS URL: manifest load, playback start, seek, next track
- DASH URL: stream init, playback start, seek, next track
- YouTube URL: normal watch URL, `youtu.be`, `shorts`, playlist
- iframe embeds: NicoNico and SoundCloud open, close, next track

## Media Layout

- Portrait video renders inside a 16:9 frame
- Switching portrait -> landscape resets frame mode
- Switching embed -> HTML5 removes stale iframe/YouTube player
- Audio-only file shows cover/audio mode and spectrum correctly

## Subtitle And Controls

- HTML5 mode enables subtitle import/search/unload
- iframe mode disables subtitle import/search and PiP
- YouTube mode keeps volume/rate sync with UI
- Clearing playlist resets player state and removes embed state

## Spectrum And Waveform

- Spectrum base and Boost overlay stay aligned
- Peak indicator is single-source only
- Waveform overlay follows the same FPS cap as core spectrum
- AutoLow reduces waveform/orbit effects when frame time rises

## Error UI

- YouTube `153` shows HTTP(S) / localhost guidance
- YouTube `101/150` shows embed disabled guidance and fallback open action
- Invalid URL shows parse error without leaving stale embed state
