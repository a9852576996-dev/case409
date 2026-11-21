window.GameVoice = (function () {
  var audio = new Audio();
  audio.preload = 'auto';
  var muted = false;
  var unlocked = false;
  var playId = 0;
  var rate = 1.15;
  var SILENT_WAV = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';

  function applyRate() {
    try {
      audio.defaultPlaybackRate = rate;
      audio.playbackRate = rate;
      if ('preservesPitch' in audio) audio.preservesPitch = true;
      if ('mozPreservesPitch' in audio) audio.mozPreservesPitch = true;
      if ('webkitPreservesPitch' in audio) audio.webkitPreservesPitch = true;
    } catch (e) {}
  }

  applyRate();

  function unlockAudio() {
    if (unlocked) return;
    unlocked = true;
    document.removeEventListener('pointerdown', unlockAudio, true);
    document.removeEventListener('touchstart', unlockAudio, true);
    document.removeEventListener('keydown', unlockAudio, true);

    if (!audio.getAttribute('data-real')) {
      try {
        audio.muted = true;
        audio.src = SILENT_WAV;
        var p = audio.play();
        if (p && typeof p.then === 'function') {
          p.then(function () {
            if (!audio.getAttribute('data-real')) {
              audio.pause();
              audio.currentTime = 0;
              audio.muted = muted;
            }
          }).catch(function () {
            audio.muted = muted;
          });
        }
      } catch (e) {
        audio.muted = muted;
      }
    }
  }

  document.addEventListener('pointerdown', unlockAudio, true);
  document.addEventListener('touchstart', unlockAudio, true);
  document.addEventListener('keydown', unlockAudio, true);

  function clearHandlers() {
    audio.onended = null;
    audio.onerror = null;
    audio.onloadedmetadata = null;
    audio.onplaying = null;
  }

  function stop() {
    playId += 1;
    clearHandlers();
    try {
      audio.pause();
      audio.currentTime = 0;
    } catch (e) {}
  }

  function play(src, onDone) {
    stop();
    var myId = playId;
    var finished = false;

    function done() {
      if (finished || myId !== playId) return;
      finished = true;
      clearHandlers();
      if (typeof onDone === 'function') onDone();
    }

    if (muted || !src) {
      done();
      return;
    }

    unlocked = true;
    audio.setAttribute('data-real', '1');
    audio.muted = false;
    audio.onended = done;
    audio.onerror = done;
    audio.onloadedmetadata = applyRate;
    audio.onplaying = applyRate;
    audio.src = src;

    try {
      audio.load();
      applyRate();
      var playPromise = audio.play();
      applyRate();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.then(applyRate).catch(function (err) {
          console.warn('[GameVoice] play failed:', src, err);
          done();
        });
      }
    } catch (e) {
      done();
    }
  }

  function setMuted(val) {
    muted = Boolean(val);
    audio.muted = muted;
    if (muted) stop();
  }

  function isMuted() {
    return muted;
  }

  function setRate(val) {
    var n = Number(val);
    if (!isNaN(n) && n >= 0.5 && n <= 3.0) {
      rate = n;
      applyRate();
    }
  }

  function getRate() {
    return rate;
  }

  return {
    play: play,
    stop: stop,
    setMuted: setMuted,
    isMuted: isMuted,
    setRate: setRate,
    getRate: getRate
  };
})();
