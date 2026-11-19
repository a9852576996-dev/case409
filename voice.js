(function () {
  'use strict';

  /* ===== 1. GLOBAL VOICE PLAYER (window.GameVoice) ===== */

  var currentAudio = null;
  var playing = false;
  var playSessionId = 0;
  var boundEnded = null;
  var boundError = null;

  function isMutedSafe() {
    try {
      return Boolean(
        window.GameAudio &&
          typeof window.GameAudio.isMuted === 'function' &&
          window.GameAudio.isMuted()
      );
    } catch (e) {
      return false;
    }
  }

  function detachAndResetAudio(audioEl) {
    if (!audioEl) {
      return;
    }
    try {
      if (boundEnded) {
        audioEl.removeEventListener('ended', boundEnded);
      }
      if (boundError) {
        audioEl.removeEventListener('error', boundError);
      }
    } catch (e) {
      // Ignore listener removal issues
    }
    boundEnded = null;
    boundError = null;

    try {
      audioEl.pause();
    } catch (e) {
      // Ignore pause errors
    }
    try {
      audioEl.currentTime = 0;
    } catch (e) {
      // Ignore seek errors on unloaded media
    }
  }

  var GameVoice = {
    stop: function () {
      try {
        playSessionId += 1;
        playing = false;
        if (currentAudio) {
          var prev = currentAudio;
          currentAudio = null;
          detachAndResetAudio(prev);
        }
      } catch (e) {
        currentAudio = null;
        playing = false;
      }
    },

    play: function (src, onEnd) {
      try {
        GameVoice.stop();

        if (!src || typeof src !== 'string' || isMutedSafe()) {
          return;
        }

        var sid = ++playSessionId;
        var audio = new Audio();
        audio.preload = 'auto';
        audio.volume = 0.95;

        try {
          audio.setAttribute('playsinline', '');
        } catch (attrErr) {
          // Ignore attribute errors
        }

        boundEnded = function () {
          if (sid !== playSessionId) {
            return;
          }
          playing = false;
          var finished = currentAudio;
          currentAudio = null;
          detachAndResetAudio(finished);
          if (typeof onEnd === 'function') {
            try {
              onEnd();
            } catch (cbErr) {
              // Ignore callback errors
            }
          }
        };

        boundError = function () {
          if (sid !== playSessionId) {
            return;
          }
          playing = false;
          var failed = currentAudio;
          currentAudio = null;
          detachAndResetAudio(failed);
        };

        audio.addEventListener('ended', boundEnded);
        audio.addEventListener('error', boundError);

        currentAudio = audio;
        playing = true;
        audio.src = src;

        var playPromise = audio.play();
        if (playPromise && typeof playPromise.then === 'function') {
          playPromise.then(
            function () {
              if (sid !== playSessionId) {
                try {
                  audio.pause();
                  audio.currentTime = 0;
                } catch (e) {
                  // Ignore late stop errors
                }
              }
            },
            function () {
              if (sid === playSessionId) {
                playing = false;
                var rejected = currentAudio;
                currentAudio = null;
                detachAndResetAudio(rejected);
              }
            }
          );
        }
      } catch (e) {
        playing = false;
        currentAudio = null;
      }
    },

    isPlaying: function () {
      try {
        return Boolean(playing && currentAudio && !currentAudio.ended);
      } catch (e) {
        return false;
      }
    }
  };

  window.GameVoice = GameVoice;

  /* ===== 2. PROCEDURAL CHARACTER ACTION SFX ON window.GameAudio ===== */

  var actionCtx = null;
  var actionComp = null;
  var actionMaster = null;
  var whiteNoiseBuf = null;
  var pinkNoiseBuf = null;
  var actionUnlocked = false;

  function buildNoiseBuffers(ctx) {
    var sr = ctx.sampleRate || 44100;

    var wLen = Math.floor(sr * 2);
    var wBuf = ctx.createBuffer(1, wLen, sr);
    var wData = wBuf.getChannelData(0);
    for (var i = 0; i < wLen; i++) {
      wData[i] = Math.random() * 2 - 1;
    }

    var pLen = Math.floor(sr * 2.5);
    var pBuf = ctx.createBuffer(1, pLen, sr);
    var pData = pBuf.getChannelData(0);
    var b0 = 0;
    var b1 = 0;
    var b2 = 0;
    var b3 = 0;
    var b4 = 0;
    var b5 = 0;
    var b6 = 0;
    for (var j = 0; j < pLen; j++) {
      var white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      pData[j] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.085;
      b6 = white * 0.115926;
    }

    whiteNoiseBuf = wBuf;
    pinkNoiseBuf = pBuf;
  }

  function ensureActionCtx() {
    var AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) {
      return null;
    }

    if (!actionCtx) {
      actionCtx = new AudioCtx();

      actionComp = actionCtx.createDynamicsCompressor();
      actionComp.threshold.setValueAtTime(-14, actionCtx.currentTime);
      actionComp.knee.setValueAtTime(18, actionCtx.currentTime);
      actionComp.ratio.setValueAtTime(6, actionCtx.currentTime);
      actionComp.attack.setValueAtTime(0.004, actionCtx.currentTime);
      actionComp.release.setValueAtTime(0.14, actionCtx.currentTime);

      actionMaster = actionCtx.createGain();
      actionMaster.gain.setValueAtTime(0.85, actionCtx.currentTime);

      actionComp.connect(actionMaster);
      actionMaster.connect(actionCtx.destination);

      buildNoiseBuffers(actionCtx);
    }

    if (actionCtx.state === 'suspended') {
      var p = actionCtx.resume();
      if (p && typeof p.catch === 'function') {
        p.catch(function () {});
      }
    }

    if (!actionUnlocked) {
      try {
        var silent = actionCtx.createBuffer(1, 1, 22050);
        var src = actionCtx.createBufferSource();
        src.buffer = silent;
        src.connect(actionCtx.destination);
        src.start(0);
        actionUnlocked = true;
      } catch (e) {
        // Ignore unlock errors
      }
    }

    return actionCtx;
  }

  function getReadyActionCtx() {
    if (isMutedSafe()) {
      return null;
    }
    return ensureActionCtx();
  }

  document.addEventListener(
    'pointerdown',
    function () {
      try {
        if (!isMutedSafe()) {
          ensureActionCtx();
        }
      } catch (e) {
        // Safe fallback
      }
    },
    { once: true, passive: true }
  );

  if (window.GameAudio && typeof window.GameAudio === 'object') {
    var origToggleMute = window.GameAudio.toggleMute;
    if (typeof origToggleMute === 'function') {
      window.GameAudio.toggleMute = function () {
        var nowMuted = origToggleMute.apply(this, arguments);
        if (nowMuted) {
          GameVoice.stop();
        }
        return nowMuted;
      };
    }

    window.GameAudio.sfxLighter = function () {
      try {
        var ctx = getReadyActionCtx();
        if (!ctx) {
          return;
        }
        var now = ctx.currentTime;

        // Double metallic spark-wheel rasp clicks
        var clickTimes = [now, now + 0.022];
        for (var i = 0; i < clickTimes.length; i++) {
          var t = clickTimes[i];

          var sparkNoise = ctx.createBufferSource();
          sparkNoise.buffer = whiteNoiseBuf;

          var sparkBp = ctx.createBiquadFilter();
          sparkBp.type = 'bandpass';
          sparkBp.frequency.setValueAtTime(4600 - i * 450, t);
          sparkBp.Q.setValueAtTime(4.2, t);

          var sparkGain = ctx.createGain();
          sparkGain.gain.setValueAtTime(0.28, t);
          sparkGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.022);

          sparkNoise.connect(sparkBp);
          sparkBp.connect(sparkGain);
          sparkGain.connect(actionComp);
          sparkNoise.start(t, Math.random() * 1.1, 0.03);

          var ping = ctx.createOscillator();
          ping.type = 'triangle';
          ping.frequency.setValueAtTime(3100 - i * 320, t);
          ping.frequency.exponentialRampToValueAtTime(1650, t + 0.018);

          var pingGain = ctx.createGain();
          pingGain.gain.setValueAtTime(0.11, t);
          pingGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.02);

          ping.connect(pingGain);
          pingGain.connect(actionComp);
          ping.start(t);
          ping.stop(t + 0.025);
        }

        // Low flame ignition puff
        var puff = ctx.createBufferSource();
        puff.buffer = pinkNoiseBuf;

        var puffLp = ctx.createBiquadFilter();
        puffLp.type = 'lowpass';
        puffLp.frequency.setValueAtTime(340, now + 0.042);
        puffLp.frequency.exponentialRampToValueAtTime(115, now + 0.2);
        puffLp.Q.setValueAtTime(1.4, now + 0.042);

        var puffGain = ctx.createGain();
        puffGain.gain.setValueAtTime(0.0001, now + 0.04);
        puffGain.gain.linearRampToValueAtTime(0.38, now + 0.068);
        puffGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.21);

        puff.connect(puffLp);
        puffLp.connect(puffGain);
        puffGain.connect(actionComp);
        puff.start(now + 0.04, Math.random() * 1.2, 0.2);

        // Short gas flame hiss tail (~0.35s total)
        var hiss = ctx.createBufferSource();
        hiss.buffer = whiteNoiseBuf;

        var hissBp = ctx.createBiquadFilter();
        hissBp.type = 'bandpass';
        hissBp.frequency.setValueAtTime(1550, now + 0.048);
        hissBp.frequency.exponentialRampToValueAtTime(860, now + 0.35);
        hissBp.Q.setValueAtTime(1.0, now + 0.048);

        var hissGain = ctx.createGain();
        hissGain.gain.setValueAtTime(0.0001, now + 0.045);
        hissGain.gain.linearRampToValueAtTime(0.17, now + 0.088);
        hissGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

        hiss.connect(hissBp);
        hissBp.connect(hissGain);
        hissGain.connect(actionComp);
        hiss.start(now + 0.045, Math.random() * 1.1, 0.33);
      } catch (e) {
        // Safe fallback
      }
    };

    window.GameAudio.sfxInhale = function () {
      try {
        var ctx = getReadyActionCtx();
        if (!ctx) {
          return;
        }
        var now = ctx.currentTime;

        // Dry cigarette drag (0.00 - 0.27s)
        var drag = ctx.createBufferSource();
        drag.buffer = pinkNoiseBuf;

        var dragBp = ctx.createBiquadFilter();
        dragBp.type = 'bandpass';
        dragBp.frequency.setValueAtTime(2150, now);
        dragBp.frequency.linearRampToValueAtTime(3150, now + 0.25);
        dragBp.Q.setValueAtTime(2.3, now);

        var dragGain = ctx.createGain();
        dragGain.gain.setValueAtTime(0.0001, now);
        dragGain.gain.linearRampToValueAtTime(0.16, now + 0.12);
        dragGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.27);

        drag.connect(dragBp);
        dragBp.connect(dragGain);
        dragGain.connect(actionComp);
        drag.start(now, Math.random() * 1.2, 0.3);

        // Subtle dry paper-ember micro-crackles
        var crackles = [0.06, 0.13, 0.19];
        for (var i = 0; i < crackles.length; i++) {
          var ct = now + crackles[i];
          var crSrc = ctx.createBufferSource();
          crSrc.buffer = whiteNoiseBuf;

          var crHp = ctx.createBiquadFilter();
          crHp.type = 'highpass';
          crHp.frequency.setValueAtTime(4200, ct);

          var crGain = ctx.createGain();
          crGain.gain.setValueAtTime(0.065, ct);
          crGain.gain.exponentialRampToValueAtTime(0.0001, ct + 0.01);

          crSrc.connect(crHp);
          crHp.connect(crGain);
          crGain.connect(actionComp);
          crSrc.start(ct, Math.random() * 1.3, 0.016);
        }

        // Short soft smoke exhale (0.29 - 0.60s)
        var exhale = ctx.createBufferSource();
        exhale.buffer = pinkNoiseBuf;

        var exBp = ctx.createBiquadFilter();
        exBp.type = 'bandpass';
        exBp.frequency.setValueAtTime(980, now + 0.29);
        exBp.frequency.exponentialRampToValueAtTime(480, now + 0.6);
        exBp.Q.setValueAtTime(0.85, now + 0.29);

        var exGain = ctx.createGain();
        exGain.gain.setValueAtTime(0.0001, now + 0.29);
        exGain.gain.linearRampToValueAtTime(0.18, now + 0.37);
        exGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

        exhale.connect(exBp);
        exBp.connect(exGain);
        exGain.connect(actionComp);
        exhale.start(now + 0.29, Math.random() * 1.2, 0.34);
      } catch (e) {
        // Safe fallback
      }
    };

    window.GameAudio.sfxFlick = function () {
      try {
        var ctx = getReadyActionCtx();
        if (!ctx) {
          return;
        }
        var now = ctx.currentTime;

        // Crisp finger-nail flick on cigarette butt
        var snapNoise = ctx.createBufferSource();
        snapNoise.buffer = whiteNoiseBuf;

        var snapBp = ctx.createBiquadFilter();
        snapBp.type = 'bandpass';
        snapBp.frequency.setValueAtTime(3150, now);
        snapBp.Q.setValueAtTime(2.6, now);

        var snapGain = ctx.createGain();
        snapGain.gain.setValueAtTime(0.24, now);
        snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);

        snapNoise.connect(snapBp);
        snapBp.connect(snapGain);
        snapGain.connect(actionComp);
        snapNoise.start(now, Math.random() * 1.1, 0.03);

        var snapOsc = ctx.createOscillator();
        snapOsc.type = 'triangle';
        snapOsc.frequency.setValueAtTime(660, now);
        snapOsc.frequency.exponentialRampToValueAtTime(195, now + 0.024);

        var oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.2, now);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

        snapOsc.connect(oscGain);
        oscGain.connect(actionComp);
        snapOsc.start(now);
        snapOsc.stop(now + 0.032);

        // Light wet asphalt hit / mini puddle splash (~0.13 - 0.25s)
        var hitT = now + 0.135;
        var plop = ctx.createOscillator();
        plop.type = 'sine';
        plop.frequency.setValueAtTime(480, hitT);
        plop.frequency.exponentialRampToValueAtTime(860, hitT + 0.028);

        var plopGain = ctx.createGain();
        plopGain.gain.setValueAtTime(0.0001, hitT);
        plopGain.gain.linearRampToValueAtTime(0.085, hitT + 0.006);
        plopGain.gain.exponentialRampToValueAtTime(0.0001, hitT + 0.036);

        plop.connect(plopGain);
        plopGain.connect(actionComp);
        plop.start(hitT);
        plop.stop(hitT + 0.042);

        var wetHit = ctx.createBufferSource();
        wetHit.buffer = whiteNoiseBuf;

        var wetBp = ctx.createBiquadFilter();
        wetBp.type = 'bandpass';
        wetBp.frequency.setValueAtTime(2600, hitT);
        wetBp.frequency.exponentialRampToValueAtTime(1350, hitT + 0.11);
        wetBp.Q.setValueAtTime(1.5, hitT);

        var wetGain = ctx.createGain();
        wetGain.gain.setValueAtTime(0.13, hitT);
        wetGain.gain.exponentialRampToValueAtTime(0.0001, hitT + 0.115);

        wetHit.connect(wetBp);
        wetBp.connect(wetGain);
        wetGain.connect(actionComp);
        wetHit.start(hitT, Math.random() * 1.1, 0.13);
      } catch (e) {
        // Safe fallback
      }
    };

    window.GameAudio.sfxFootsteps = function () {
      try {
        var ctx = getReadyActionCtx();
        if (!ctx) {
          return;
        }
        var now = ctx.currentTime;
        var offsets = [0.0, 0.35, 0.7];

        for (var i = 0; i < offsets.length; i++) {
          var t = now + offsets[i];
          var pitchMul = i === 1 ? 0.93 : i === 2 ? 1.04 : 1.0;

          // Dull boot heel thud
          var thud = ctx.createOscillator();
          thud.type = 'triangle';
          thud.frequency.setValueAtTime(112 * pitchMul, t);
          thud.frequency.exponentialRampToValueAtTime(40, t + 0.088);

          var thudLp = ctx.createBiquadFilter();
          thudLp.type = 'lowpass';
          thudLp.frequency.setValueAtTime(230, t);

          var thudGain = ctx.createGain();
          thudGain.gain.setValueAtTime(0.36, t);
          thudGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);

          thud.connect(thudLp);
          thudLp.connect(thudGain);
          thudGain.connect(actionComp);
          thud.start(t);
          thud.stop(t + 0.11);

          // Wet gravel crunch
          var crunch = ctx.createBufferSource();
          crunch.buffer = pinkNoiseBuf;

          var crunchBp = ctx.createBiquadFilter();
          crunchBp.type = 'bandpass';
          crunchBp.frequency.setValueAtTime(1320 * pitchMul, t + 0.01);
          crunchBp.frequency.exponentialRampToValueAtTime(760, t + 0.13);
          crunchBp.Q.setValueAtTime(1.25, t + 0.01);

          var crunchGain = ctx.createGain();
          crunchGain.gain.setValueAtTime(0.0001, t + 0.008);
          crunchGain.gain.linearRampToValueAtTime(0.24, t + 0.025);
          crunchGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.135);

          crunch.connect(crunchBp);
          crunchBp.connect(crunchGain);
          crunchGain.connect(actionComp);
          crunch.start(t + 0.008, Math.random() * 1.2, 0.14);

          // Wet asphalt micro-splash
          var splash = ctx.createBufferSource();
          splash.buffer = whiteNoiseBuf;

          var splashBp = ctx.createBiquadFilter();
          splashBp.type = 'bandpass';
          splashBp.frequency.setValueAtTime(3400, t + 0.015);
          splashBp.Q.setValueAtTime(1.8, t + 0.015);

          var splashGain = ctx.createGain();
          splashGain.gain.setValueAtTime(0.065, t + 0.015);
          splashGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);

          splash.connect(splashBp);
          splashBp.connect(splashGain);
          splashGain.connect(actionComp);
          splash.start(t + 0.015, Math.random() * 1.1, 0.09);
        }
      } catch (e) {
        // Safe fallback
      }
    };

    window.GameAudio.sfxFolder = function () {
      try {
        var ctx = getReadyActionCtx();
        if (!ctx) {
          return;
        }
        var now = ctx.currentTime;

        // Heavy desk thump
        var desk = ctx.createOscillator();
        desk.type = 'sine';
        desk.frequency.setValueAtTime(130, now);
        desk.frequency.exponentialRampToValueAtTime(42, now + 0.115);

        var deskGain = ctx.createGain();
        deskGain.gain.setValueAtTime(0.54, now);
        deskGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

        desk.connect(deskGain);
        deskGain.connect(actionComp);
        desk.start(now);
        desk.stop(now + 0.165);

        // Flat cardboard body slap
        var bodyNoise = ctx.createBufferSource();
        bodyNoise.buffer = pinkNoiseBuf;

        var bodyBp = ctx.createBiquadFilter();
        bodyBp.type = 'bandpass';
        bodyBp.frequency.setValueAtTime(380, now);
        bodyBp.Q.setValueAtTime(0.85, now);

        var bodyGain = ctx.createGain();
        bodyGain.gain.setValueAtTime(0.45, now);
        bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.095);

        bodyNoise.connect(bodyBp);
        bodyBp.connect(bodyGain);
        bodyGain.connect(actionComp);
        bodyNoise.start(now, Math.random() * 1.2, 0.11);

        // Crisp paper-sheet settle flutter (~0.20s)
        var flutter = ctx.createBufferSource();
        flutter.buffer = whiteNoiseBuf;

        var flBp = ctx.createBiquadFilter();
        flBp.type = 'bandpass';
        flBp.frequency.setValueAtTime(1900, now + 0.012);
        flBp.frequency.exponentialRampToValueAtTime(1050, now + 0.195);
        flBp.Q.setValueAtTime(1.5, now + 0.012);

        var flGain = ctx.createGain();
        flGain.gain.setValueAtTime(0.0001, now + 0.01);
        flGain.gain.linearRampToValueAtTime(0.18, now + 0.025);
        flGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

        flutter.connect(flBp);
        flBp.connect(flGain);
        flGain.connect(actionComp);
        flutter.start(now + 0.01, Math.random() * 1.1, 0.2);
      } catch (e) {
        // Safe fallback
      }
    };

    window.GameAudio.sfxCuffs = function () {
      try {
        var ctx = getReadyActionCtx();
        if (!ctx) {
          return;
        }
        var now = ctx.currentTime;

        // Double ratcheting steel clicks (2 bursts of 3 tight teeth)
        var teeth = [
          { t: 0.0, gain: 0.22, pitch: 1.0 },
          { t: 0.024, gain: 0.26, pitch: 1.06 },
          { t: 0.048, gain: 0.3, pitch: 1.12 },
          { t: 0.135, gain: 0.24, pitch: 0.96 },
          { t: 0.158, gain: 0.32, pitch: 1.08 },
          { t: 0.182, gain: 0.36, pitch: 1.18 }
        ];

        for (var i = 0; i < teeth.length; i++) {
          var th = teeth[i];
          var t = now + th.t;

          var clickSrc = ctx.createBufferSource();
          clickSrc.buffer = whiteNoiseBuf;

          var clickHp = ctx.createBiquadFilter();
          clickHp.type = 'bandpass';
          clickHp.frequency.setValueAtTime(3800 * th.pitch, t);
          clickHp.Q.setValueAtTime(3.2, t);

          var clickGain = ctx.createGain();
          clickGain.gain.setValueAtTime(th.gain, t);
          clickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.018);

          clickSrc.connect(clickHp);
          clickHp.connect(clickGain);
          clickGain.connect(actionComp);
          clickSrc.start(t, Math.random() * 1.1, 0.024);

          var steel = ctx.createOscillator();
          steel.type = 'square';
          steel.frequency.setValueAtTime(2650 * th.pitch, t);

          var steelBp = ctx.createBiquadFilter();
          steelBp.type = 'bandpass';
          steelBp.frequency.setValueAtTime(2900 * th.pitch, t);
          steelBp.Q.setValueAtTime(5.0, t);

          var steelGain = ctx.createGain();
          steelGain.gain.setValueAtTime(th.gain * 0.42, t);
          steelGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.024);

          steel.connect(steelBp);
          steelBp.connect(steelGain);
          steelGain.connect(actionComp);
          steel.start(t);
          steel.stop(t + 0.028);
        }

        // Cold steel final lock ring tail (~0.30s total)
        var ringT = now + 0.182;
        var ringFreqs = [2840, 4210];
        for (var r = 0; r < ringFreqs.length; r++) {
          var ring = ctx.createOscillator();
          ring.type = 'sine';
          ring.frequency.setValueAtTime(ringFreqs[r], ringT);

          var ringGain = ctx.createGain();
          ringGain.gain.setValueAtTime(0.075, ringT);
          ringGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

          ring.connect(ringGain);
          ringGain.connect(actionComp);
          ring.start(ringT);
          ring.stop(now + 0.31);
        }
      } catch (e) {
        // Safe fallback
      }
    };

    window.GameAudio.sfxDoor = function () {
      try {
        var ctx = getReadyActionCtx();
        if (!ctx) {
          return;
        }
        var now = ctx.currentTime;
        var dur = 0.5;

        // Stick-slip LFO modulating iron hinge groan frequency
        var slipLfo = ctx.createOscillator();
        slipLfo.type = 'sawtooth';
        slipLfo.frequency.setValueAtTime(26, now);
        slipLfo.frequency.linearRampToValueAtTime(16, now + dur);

        var slipDepth1 = ctx.createGain();
        slipDepth1.gain.setValueAtTime(14, now);

        var slipDepth2 = ctx.createGain();
        slipDepth2.gain.setValueAtTime(24, now);

        var osc1 = ctx.createOscillator();
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(168, now);
        osc1.frequency.linearRampToValueAtTime(126, now + 0.22);
        osc1.frequency.linearRampToValueAtTime(144, now + 0.34);
        osc1.frequency.linearRampToValueAtTime(104, now + dur);

        var osc2 = ctx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(332, now);
        osc2.frequency.linearRampToValueAtTime(256, now + 0.22);
        osc2.frequency.linearRampToValueAtTime(286, now + 0.34);
        osc2.frequency.linearRampToValueAtTime(212, now + dur);

        slipLfo.connect(slipDepth1);
        slipDepth1.connect(osc1.frequency);
        slipLfo.connect(slipDepth2);
        slipDepth2.connect(osc2.frequency);

        // Resonant iron-grate bandpass formants
        var bpLow = ctx.createBiquadFilter();
        bpLow.type = 'bandpass';
        bpLow.frequency.setValueAtTime(410, now);
        bpLow.frequency.linearRampToValueAtTime(290, now + dur);
        bpLow.Q.setValueAtTime(5.2, now);

        var bpMid = ctx.createBiquadFilter();
        bpMid.type = 'bandpass';
        bpMid.frequency.setValueAtTime(920, now);
        bpMid.frequency.linearRampToValueAtTime(640, now + dur);
        bpMid.Q.setValueAtTime(4.0, now);

        var creakGain = ctx.createGain();
        creakGain.gain.setValueAtTime(0.0001, now);
        creakGain.gain.linearRampToValueAtTime(0.24, now + 0.055);
        creakGain.gain.linearRampToValueAtTime(0.16, now + 0.24);
        creakGain.gain.linearRampToValueAtTime(0.21, now + 0.34);
        creakGain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

        osc1.connect(bpLow);
        osc2.connect(bpMid);
        bpLow.connect(creakGain);
        bpMid.connect(creakGain);
        creakGain.connect(actionComp);

        // Faint rusty friction scrape layer
        var scrape = ctx.createBufferSource();
        scrape.buffer = pinkNoiseBuf;

        var scrapeBp = ctx.createBiquadFilter();
        scrapeBp.type = 'bandpass';
        scrapeBp.frequency.setValueAtTime(680, now);
        scrapeBp.Q.setValueAtTime(2.5, now);

        var scrapeGain = ctx.createGain();
        scrapeGain.gain.setValueAtTime(0.0001, now);
        scrapeGain.gain.linearRampToValueAtTime(0.065, now + 0.06);
        scrapeGain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

        scrape.connect(scrapeBp);
        scrapeBp.connect(scrapeGain);
        scrapeGain.connect(actionComp);

        slipLfo.start(now);
        slipLfo.stop(now + dur + 0.02);
        osc1.start(now);
        osc1.stop(now + dur + 0.02);
        osc2.start(now);
        osc2.stop(now + dur + 0.02);
        scrape.start(now, Math.random() * 1.2, dur + 0.02);
      } catch (e) {
        // Safe fallback
      }
    };
  }
})();
