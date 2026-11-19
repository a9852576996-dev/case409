(function () {
  'use strict';

  var STORAGE_KEY = 'case409_muted';
  var MASTER_VOLUME = 0.85;

  var ctx = null;
  var masterGain = null;
  var compressor = null;
  var whiteBuffer = null;
  var pinkBuffer = null;
  var unlocked = false;

  var muted = false;
  var ambientDesired = false;
  var ambientNodes = null;
  var ambientStopTimer = null;

  try {
    var saved = window.localStorage.getItem(STORAGE_KEY);
    muted = saved === 'true' || saved === '1';
  } catch (e) {
    muted = false;
  }

  function createNoiseBuffers(audioCtx) {
    var sampleRate = audioCtx.sampleRate || 44100;

    var whiteLen = Math.floor(sampleRate * 2);
    var wBuf = audioCtx.createBuffer(1, whiteLen, sampleRate);
    var wData = wBuf.getChannelData(0);
    for (var i = 0; i < whiteLen; i++) {
      wData[i] = Math.random() * 2 - 1;
    }

    var pinkLen = Math.floor(sampleRate * 3);
    var pBuf = audioCtx.createBuffer(1, pinkLen, sampleRate);
    var pData = pBuf.getChannelData(0);
    var b0 = 0;
    var b1 = 0;
    var b2 = 0;
    var b3 = 0;
    var b4 = 0;
    var b5 = 0;
    var b6 = 0;
    for (var j = 0; j < pinkLen; j++) {
      var white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      pData[j] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
      b6 = white * 0.115926;
    }

    whiteBuffer = wBuf;
    pinkBuffer = pBuf;
  }

  function ensureContext() {
    var AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) {
      return null;
    }

    if (!ctx) {
      ctx = new AudioCtx();

      compressor = ctx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-14, ctx.currentTime);
      compressor.knee.setValueAtTime(18, ctx.currentTime);
      compressor.ratio.setValueAtTime(6, ctx.currentTime);
      compressor.attack.setValueAtTime(0.005, ctx.currentTime);
      compressor.release.setValueAtTime(0.15, ctx.currentTime);

      masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(muted ? 0 : MASTER_VOLUME, ctx.currentTime);

      compressor.connect(masterGain);
      masterGain.connect(ctx.destination);

      createNoiseBuffers(ctx);
    }

    if (ctx.state === 'suspended') {
      var resumePromise = ctx.resume();
      if (resumePromise && typeof resumePromise.catch === 'function') {
        resumePromise.catch(function () {});
      }
    }

    if (!unlocked) {
      try {
        var silentBuf = ctx.createBuffer(1, 1, 22050);
        var silentSrc = ctx.createBufferSource();
        silentSrc.buffer = silentBuf;
        silentSrc.connect(ctx.destination);
        silentSrc.start(0);
        unlocked = true;
      } catch (e) {
        // Ignore unlock errors on restricted states
      }
    }

    return ctx;
  }

  function canPlaySfx() {
    if (muted) {
      return null;
    }
    return ensureContext();
  }

  function cleanupAmbientNodes() {
    if (!ambientNodes) {
      return;
    }

    var nodes = ambientNodes;
    ambientNodes = null;

    var stopList = [
      nodes.droneOsc1,
      nodes.droneOsc2,
      nodes.droneSub,
      nodes.droneLfo,
      nodes.rainSrc,
      nodes.rainLfo
    ];

    for (var i = 0; i < stopList.length; i++) {
      try {
        if (stopList[i]) {
          stopList[i].stop();
        }
      } catch (e) {
        // Already stopped
      }
    }

    var allNodes = [
      nodes.droneOsc1,
      nodes.droneOsc2,
      nodes.droneSub,
      nodes.droneLfo,
      nodes.droneLfoGain,
      nodes.droneFilter,
      nodes.droneGain,
      nodes.rainSrc,
      nodes.rainHighpass,
      nodes.rainLowpass,
      nodes.rainLfo,
      nodes.rainLfoGain,
      nodes.rainGain,
      nodes.ambientGain
    ];

    for (var j = 0; j < allNodes.length; j++) {
      try {
        if (allNodes[j]) {
          allNodes[j].disconnect();
        }
      } catch (e) {
        // Already disconnected
      }
    }
  }

  function startAmbientGraph(audioCtx) {
    var now = audioCtx.currentTime;

    var ambientGain = audioCtx.createGain();
    ambientGain.gain.setValueAtTime(0.0001, now);
    ambientGain.gain.linearRampToValueAtTime(1.0, now + 1.4);
    ambientGain.connect(compressor);

    // Night industrial drone (45-55 Hz core + subtle dark harmonics)
    var droneFilter = audioCtx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(145, now);
    droneFilter.Q.setValueAtTime(1.6, now);

    var droneGain = audioCtx.createGain();
    droneGain.gain.setValueAtTime(0.22, now);

    var droneOsc1 = audioCtx.createOscillator();
    droneOsc1.type = 'sawtooth';
    droneOsc1.frequency.setValueAtTime(48, now);

    var droneOsc2 = audioCtx.createOscillator();
    droneOsc2.type = 'triangle';
    droneOsc2.frequency.setValueAtTime(52.3, now);

    var droneSub = audioCtx.createOscillator();
    droneSub.type = 'sine';
    droneSub.frequency.setValueAtTime(46.5, now);

    var droneLfo = audioCtx.createOscillator();
    droneLfo.type = 'sine';
    droneLfo.frequency.setValueAtTime(0.08, now);

    var droneLfoGain = audioCtx.createGain();
    droneLfoGain.gain.setValueAtTime(36, now);

    droneLfo.connect(droneLfoGain);
    droneLfoGain.connect(droneFilter.frequency);

    droneOsc1.connect(droneFilter);
    droneOsc2.connect(droneFilter);
    droneSub.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(ambientGain);

    // Light rain / wet industrial haze (filtered pink noise)
    var rainSrc = audioCtx.createBufferSource();
    rainSrc.buffer = pinkBuffer;
    rainSrc.loop = true;

    var rainHighpass = audioCtx.createBiquadFilter();
    rainHighpass.type = 'highpass';
    rainHighpass.frequency.setValueAtTime(480, now);
    rainHighpass.Q.setValueAtTime(0.5, now);

    var rainLowpass = audioCtx.createBiquadFilter();
    rainLowpass.type = 'lowpass';
    rainLowpass.frequency.setValueAtTime(2100, now);
    rainLowpass.Q.setValueAtTime(0.6, now);

    var rainLfo = audioCtx.createOscillator();
    rainLfo.type = 'sine';
    rainLfo.frequency.setValueAtTime(0.12, now);

    var rainLfoGain = audioCtx.createGain();
    rainLfoGain.gain.setValueAtTime(340, now);

    rainLfo.connect(rainLfoGain);
    rainLfoGain.connect(rainLowpass.frequency);

    var rainGain = audioCtx.createGain();
    rainGain.gain.setValueAtTime(0.11, now);

    rainSrc.connect(rainHighpass);
    rainHighpass.connect(rainLowpass);
    rainLowpass.connect(rainGain);
    rainGain.connect(ambientGain);

    droneOsc1.start(now);
    droneOsc2.start(now);
    droneSub.start(now);
    droneLfo.start(now);
    rainSrc.start(now);
    rainLfo.start(now);

    ambientNodes = {
      ambientGain: ambientGain,
      droneOsc1: droneOsc1,
      droneOsc2: droneOsc2,
      droneSub: droneSub,
      droneLfo: droneLfo,
      droneLfoGain: droneLfoGain,
      droneFilter: droneFilter,
      droneGain: droneGain,
      rainSrc: rainSrc,
      rainHighpass: rainHighpass,
      rainLowpass: rainLowpass,
      rainLfo: rainLfo,
      rainLfoGain: rainLfoGain,
      rainGain: rainGain
    };
  }

  var GameAudio = {
    init: function () {
      try {
        var audioCtx = ensureContext();
        if (audioCtx && ambientDesired && !muted && !ambientNodes) {
          startAmbientGraph(audioCtx);
        }
      } catch (e) {
        // Safe fallback if audio is restricted
      }
    },

    toggleMute: function () {
      try {
        muted = !muted;

        try {
          window.localStorage.setItem(STORAGE_KEY, String(muted));
        } catch (storageErr) {
          // Ignore storage quota/privacy restrictions
        }

        var audioCtx = ensureContext();
        if (audioCtx && masterGain) {
          var now = audioCtx.currentTime;
          masterGain.gain.cancelScheduledValues(now);
          masterGain.gain.setTargetAtTime(muted ? 0 : MASTER_VOLUME, now, 0.04);

          if (!muted && ambientDesired && !ambientNodes) {
            startAmbientGraph(audioCtx);
          }
        }
      } catch (e) {
        // Safe fallback
      }
      return muted;
    },

    isMuted: function () {
      try {
        return Boolean(muted);
      } catch (e) {
        return false;
      }
    },

    playAmbient: function () {
      try {
        ambientDesired = true;

        var audioCtx = ensureContext();
        if (!audioCtx) {
          return;
        }

        if (ambientStopTimer !== null) {
          window.clearTimeout(ambientStopTimer);
          ambientStopTimer = null;
        }

        if (ambientNodes) {
          var now = audioCtx.currentTime;
          ambientNodes.ambientGain.gain.cancelScheduledValues(now);
          ambientNodes.ambientGain.gain.setValueAtTime(
            Math.max(ambientNodes.ambientGain.gain.value, 0.0001),
            now
          );
          ambientNodes.ambientGain.gain.linearRampToValueAtTime(1.0, now + 0.8);
          return;
        }

        if (muted) {
          return;
        }

        startAmbientGraph(audioCtx);
      } catch (e) {
        // Safe fallback
      }
    },

    stopAmbient: function () {
      try {
        ambientDesired = false;

        if (ambientStopTimer !== null) {
          window.clearTimeout(ambientStopTimer);
          ambientStopTimer = null;
        }

        if (!ambientNodes || !ctx) {
          cleanupAmbientNodes();
          return;
        }

        var now = ctx.currentTime;
        var fadeSec = 0.55;
        ambientNodes.ambientGain.gain.cancelScheduledValues(now);
        ambientNodes.ambientGain.gain.setValueAtTime(
          Math.max(ambientNodes.ambientGain.gain.value, 0.0001),
          now
        );
        ambientNodes.ambientGain.gain.linearRampToValueAtTime(0.0001, now + fadeSec);

        ambientStopTimer = window.setTimeout(function () {
          ambientStopTimer = null;
          try {
            cleanupAmbientNodes();
          } catch (e) {
            // Safe cleanup
          }
        }, Math.ceil(fadeSec * 1000) + 60);
      } catch (e) {
        // Safe fallback
      }
    },

    sfxClick: function () {
      try {
        var audioCtx = canPlaySfx();
        if (!audioCtx) {
          return;
        }

        var now = audioCtx.currentTime;

        // Mechanical body thump
        var osc = audioCtx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(195, now);
        osc.frequency.exponentialRampToValueAtTime(54, now + 0.036);

        var bodyFilter = audioCtx.createBiquadFilter();
        bodyFilter.type = 'lowpass';
        bodyFilter.frequency.setValueAtTime(520, now);

        var bodyGain = audioCtx.createGain();
        bodyGain.gain.setValueAtTime(0.32, now);
        bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.042);

        osc.connect(bodyFilter);
        bodyFilter.connect(bodyGain);
        bodyGain.connect(compressor);

        // Crisp latch transient
        var noise = audioCtx.createBufferSource();
        noise.buffer = whiteBuffer;

        var snapFilter = audioCtx.createBiquadFilter();
        snapFilter.type = 'bandpass';
        snapFilter.frequency.setValueAtTime(1750, now);
        snapFilter.Q.setValueAtTime(1.5, now);

        var snapGain = audioCtx.createGain();
        snapGain.gain.setValueAtTime(0.22, now);
        snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

        noise.connect(snapFilter);
        snapFilter.connect(snapGain);
        snapGain.connect(compressor);

        osc.start(now);
        osc.stop(now + 0.05);
        noise.start(now, Math.random() * 1.2, 0.03);
      } catch (e) {
        // Safe fallback
      }
    },

    sfxPaper: function () {
      try {
        var audioCtx = canPlaySfx();
        if (!audioCtx) {
          return;
        }

        var now = audioCtx.currentTime;

        // Primary dry page flick
        var src1 = audioCtx.createBufferSource();
        src1.buffer = whiteBuffer;

        var bp1 = audioCtx.createBiquadFilter();
        bp1.type = 'bandpass';
        bp1.frequency.setValueAtTime(2700, now);
        bp1.frequency.exponentialRampToValueAtTime(1350, now + 0.14);
        bp1.Q.setValueAtTime(1.7, now);

        var gain1 = audioCtx.createGain();
        gain1.gain.setValueAtTime(0.0001, now);
        gain1.gain.linearRampToValueAtTime(0.2, now + 0.016);
        gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.145);

        src1.connect(bp1);
        bp1.connect(gain1);
        gain1.connect(compressor);

        // Secondary paper settle friction
        var src2 = audioCtx.createBufferSource();
        src2.buffer = pinkBuffer;

        var bp2 = audioCtx.createBiquadFilter();
        bp2.type = 'bandpass';
        bp2.frequency.setValueAtTime(1850, now + 0.04);
        bp2.Q.setValueAtTime(1.1, now + 0.04);

        var gain2 = audioCtx.createGain();
        gain2.gain.setValueAtTime(0.0001, now + 0.04);
        gain2.gain.linearRampToValueAtTime(0.14, now + 0.068);
        gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.185);

        src2.connect(bp2);
        bp2.connect(gain2);
        gain2.connect(compressor);

        src1.start(now, Math.random() * 1.2, 0.17);
        src2.start(now + 0.04, Math.random() * 1.8, 0.18);
      } catch (e) {
        // Safe fallback
      }
    },

    sfxStamp: function () {
      try {
        var audioCtx = canPlaySfx();
        if (!audioCtx) {
          return;
        }

        var now = audioCtx.currentTime;

        // Deep punchy desk thud
        var subOsc = audioCtx.createOscillator();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(145, now);
        subOsc.frequency.exponentialRampToValueAtTime(36, now + 0.11);

        var subGain = audioCtx.createGain();
        subGain.gain.setValueAtTime(0.62, now);
        subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

        subOsc.connect(subGain);
        subGain.connect(compressor);

        // Wooden/case-file mid-low impact body
        var bodyOsc = audioCtx.createOscillator();
        bodyOsc.type = 'triangle';
        bodyOsc.frequency.setValueAtTime(102, now);
        bodyOsc.frequency.exponentialRampToValueAtTime(44, now + 0.085);

        var bodyLp = audioCtx.createBiquadFilter();
        bodyLp.type = 'lowpass';
        bodyLp.frequency.setValueAtTime(280, now);

        var bodyGain = audioCtx.createGain();
        bodyGain.gain.setValueAtTime(0.32, now);
        bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);

        bodyOsc.connect(bodyLp);
        bodyLp.connect(bodyGain);
        bodyGain.connect(compressor);

        // Short rubber-on-paper impact slap
        var slap = audioCtx.createBufferSource();
        slap.buffer = whiteBuffer;

        var slapBp = audioCtx.createBiquadFilter();
        slapBp.type = 'bandpass';
        slapBp.frequency.setValueAtTime(760, now);
        slapBp.Q.setValueAtTime(0.95, now);

        var slapGain = audioCtx.createGain();
        slapGain.gain.setValueAtTime(0.34, now);
        slapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.052);

        slap.connect(slapBp);
        slapBp.connect(slapGain);
        slapGain.connect(compressor);

        subOsc.start(now);
        subOsc.stop(now + 0.18);
        bodyOsc.start(now);
        bodyOsc.stop(now + 0.13);
        slap.start(now, Math.random() * 1.1, 0.07);
      } catch (e) {
        // Safe fallback
      }
    },

    sfxRadio: function () {
      try {
        var audioCtx = canPlaySfx();
        if (!audioCtx) {
          return;
        }

        var now = audioCtx.currentTime;

        // Opening static squelch
        var static1 = audioCtx.createBufferSource();
        static1.buffer = whiteBuffer;

        var bp1 = audioCtx.createBiquadFilter();
        bp1.type = 'bandpass';
        bp1.frequency.setValueAtTime(2200, now);
        bp1.Q.setValueAtTime(2.6, now);

        var g1 = audioCtx.createGain();
        g1.gain.setValueAtTime(0.0001, now);
        g1.gain.linearRampToValueAtTime(0.15, now + 0.008);
        g1.gain.exponentialRampToValueAtTime(0.0001, now + 0.058);

        static1.connect(bp1);
        bp1.connect(g1);
        g1.connect(compressor);

        // Service radio chirp tone (handset speaker bandpass)
        var chirp = audioCtx.createOscillator();
        chirp.type = 'square';
        chirp.frequency.setValueAtTime(1340, now + 0.028);
        chirp.frequency.setValueAtTime(980, now + 0.072);

        var chirpBp = audioCtx.createBiquadFilter();
        chirpBp.type = 'bandpass';
        chirpBp.frequency.setValueAtTime(1350, now + 0.028);
        chirpBp.Q.setValueAtTime(2.0, now + 0.028);

        var chirpGain = audioCtx.createGain();
        chirpGain.gain.setValueAtTime(0.0001, now + 0.025);
        chirpGain.gain.linearRampToValueAtTime(0.095, now + 0.032);
        chirpGain.gain.setValueAtTime(0.085, now + 0.105);
        chirpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.125);

        chirp.connect(chirpBp);
        chirpBp.connect(chirpGain);
        chirpGain.connect(compressor);

        // Closing squelch crackle tail
        var static2 = audioCtx.createBufferSource();
        static2.buffer = whiteBuffer;

        var bp2 = audioCtx.createBiquadFilter();
        bp2.type = 'bandpass';
        bp2.frequency.setValueAtTime(2800, now + 0.115);
        bp2.frequency.exponentialRampToValueAtTime(1500, now + 0.245);
        bp2.Q.setValueAtTime(3.2, now + 0.115);

        var g2 = audioCtx.createGain();
        g2.gain.setValueAtTime(0.0001, now + 0.112);
        g2.gain.linearRampToValueAtTime(0.19, now + 0.122);
        g2.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

        static2.connect(bp2);
        bp2.connect(g2);
        g2.connect(compressor);

        static1.start(now, Math.random() * 1.1, 0.07);
        chirp.start(now + 0.026);
        chirp.stop(now + 0.132);
        static2.start(now + 0.112, Math.random() * 1.1, 0.16);
      } catch (e) {
        // Safe fallback
      }
    },

    sfxHeartbeat: function () {
      try {
        var audioCtx = canPlaySfx();
        if (!audioCtx) {
          return;
        }

        var now = audioCtx.currentTime;

        function beat(startTime, startFreq, endFreq, peak, dur) {
          var lp = audioCtx.createBiquadFilter();
          lp.type = 'lowpass';
          lp.frequency.setValueAtTime(160, startTime);
          lp.Q.setValueAtTime(1.1, startTime);

          var env = audioCtx.createGain();
          env.gain.setValueAtTime(0.0001, startTime);
          env.gain.linearRampToValueAtTime(peak, startTime + 0.022);
          env.gain.exponentialRampToValueAtTime(0.0001, startTime + dur);

          var sine = audioCtx.createOscillator();
          sine.type = 'sine';
          sine.frequency.setValueAtTime(startFreq, startTime);
          sine.frequency.exponentialRampToValueAtTime(endFreq, startTime + dur * 0.72);

          var body = audioCtx.createOscillator();
          body.type = 'triangle';
          body.frequency.setValueAtTime(startFreq * 1.35, startTime);
          body.frequency.exponentialRampToValueAtTime(endFreq * 1.2, startTime + dur * 0.65);

          var bodyTrim = audioCtx.createGain();
          bodyTrim.gain.setValueAtTime(0.28, startTime);

          sine.connect(lp);
          body.connect(bodyTrim);
          bodyTrim.connect(lp);
          lp.connect(env);
          env.connect(compressor);

          sine.start(startTime);
          sine.stop(startTime + dur + 0.02);
          body.start(startTime);
          body.stop(startTime + dur + 0.02);
        }

        // Lub-dub double thump
        beat(now, 68, 34, 0.56, 0.18);
        beat(now + 0.21, 58, 28, 0.4, 0.2);
      } catch (e) {
        // Safe fallback
      }
    },

    sfxAlert: function () {
      try {
        var audioCtx = canPlaySfx();
        if (!audioCtx) {
          return;
        }

        var now = audioCtx.currentTime;
        var duration = 1.2;

        // Low dissonant noir cluster (D2, G#2, A2, D#3)
        var freqs = [73.42, 103.83, 110.0, 155.56];

        var filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(760, now);
        filter.frequency.exponentialRampToValueAtTime(165, now + duration);
        filter.Q.setValueAtTime(2.4, now);

        var masterEnv = audioCtx.createGain();
        masterEnv.gain.setValueAtTime(0.0001, now);
        masterEnv.gain.linearRampToValueAtTime(0.26, now + 0.024);
        masterEnv.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        filter.connect(masterEnv);
        masterEnv.connect(compressor);

        for (var i = 0; i < freqs.length; i++) {
          var osc = audioCtx.createOscillator();
          osc.type = i % 2 === 0 ? 'sawtooth' : 'triangle';
          osc.frequency.setValueAtTime(freqs[i], now);
          osc.frequency.linearRampToValueAtTime(freqs[i] * 0.972, now + duration);

          var voiceGain = audioCtx.createGain();
          voiceGain.gain.setValueAtTime(i === 0 ? 0.36 : 0.24, now);

          osc.connect(voiceGain);
          voiceGain.connect(filter);

          osc.start(now);
          osc.stop(now + duration + 0.04);
        }
      } catch (e) {
        // Safe fallback
      }
    },

    sfxSuccess: function () {
      try {
        var audioCtx = canPlaySfx();
        if (!audioCtx) {
          return;
        }

        var now = audioCtx.currentTime;

        // Restrained noir discovery chord (D minor add9)
        var notes = [
          { freq: 146.83, delay: 0.0, gain: 0.24 },
          { freq: 220.0, delay: 0.045, gain: 0.19 },
          { freq: 261.63, delay: 0.09, gain: 0.16 },
          { freq: 329.63, delay: 0.14, gain: 0.14 }
        ];

        var filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1050, now);
        filter.frequency.exponentialRampToValueAtTime(340, now + 1.15);
        filter.Q.setValueAtTime(0.8, now);
        filter.connect(compressor);

        for (var i = 0; i < notes.length; i++) {
          var n = notes[i];
          var start = now + n.delay;
          var tail = 0.95;

          var sine = audioCtx.createOscillator();
          sine.type = 'sine';
          sine.frequency.setValueAtTime(n.freq, start);

          var tri = audioCtx.createOscillator();
          tri.type = 'triangle';
          tri.frequency.setValueAtTime(n.freq * 2, start);

          var triTrim = audioCtx.createGain();
          triTrim.gain.setValueAtTime(0.14, start);

          var env = audioCtx.createGain();
          env.gain.setValueAtTime(0.0001, start);
          env.gain.linearRampToValueAtTime(n.gain, start + 0.025);
          env.gain.exponentialRampToValueAtTime(0.0001, start + tail);

          sine.connect(env);
          tri.connect(triTrim);
          triTrim.connect(env);
          env.connect(filter);

          sine.start(start);
          sine.stop(start + tail + 0.03);
          tri.start(start);
          tri.stop(start + tail + 0.03);
        }
      } catch (e) {
        // Safe fallback
      }
    }
  };

  window.GameAudio = GameAudio;
})();
