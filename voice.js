window.GameVoice = (function () {
  var currentAudio = null;
  var muted = false;

  function stop() {
    if (currentAudio) {
      currentAudio.onended = null;
      currentAudio.onerror = null;
      try {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      } catch (e) {}
      currentAudio = null;
    }
  }

  function play(src, onDone) {
    stop();
    var finished = false;
    function done() {
      if (finished) return;
      finished = true;
      if (typeof onDone === 'function') onDone();
    }

    if (muted || !src) {
      done();
      return;
    }

    var audio = new Audio(src);
    currentAudio = audio;
    audio.onended = done;
    audio.onerror = done;

    var playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(function () {
        done();
      });
    }
  }

  function setMuted(val) {
    muted = Boolean(val);
    if (muted) stop();
  }

  function isMuted() {
    return muted;
  }

  return {
    play: play,
    stop: stop,
    setMuted: setMuted,
    isMuted: isMuted
  };
})();
