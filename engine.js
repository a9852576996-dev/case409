(function () {
  'use strict';

  var SAVE_KEY = (window.ACTIVE_CASE_ID || 'case409') + '_save_v1';
  var BEATS_STYLE_ID = 'engine-beats-styles';
  var DEFAULT_HINT = 'В этом деле осталась деталь, мимо которой прошли в темноте.';

  window.GameStory = window.GameStory || {
    clues: {},
    suspects: {},
    veiledHints: [],
    nodes: {}
  };
  window.GameStory.clues = window.GameStory.clues || {};
  window.GameStory.suspects = window.GameStory.suspects || {};
  window.GameStory.veiledHints = window.GameStory.veiledHints || [];
  window.GameStory.nodes = window.GameStory.nodes || {};

  window.registerStoryNodes = function (nodesObj) {
    window.GameStory = window.GameStory || {
      clues: {},
      suspects: {},
      veiledHints: [],
      nodes: {}
    };
    window.GameStory.clues = window.GameStory.clues || {};
    window.GameStory.suspects = window.GameStory.suspects || {};
    window.GameStory.veiledHints = window.GameStory.veiledHints || [];
    window.GameStory.nodes = window.GameStory.nodes || {};
    if (nodesObj && typeof nodesObj === 'object') {
      Object.assign(window.GameStory.nodes, nodesObj);
    }
  };

  var BEATS_CSS =
    '@keyframes engineBeatFadeIn {' +
      'from { opacity: 0; transform: translateY(3px); }' +
      'to { opacity: 1; transform: translateY(0); }' +
    '}' +
    '.beat-action {' +
      'display: block;' +
      'font-style: italic;' +
      'font-size: 13.5px;' +
      'line-height: 1.48;' +
      'color: #a99573;' +
      'margin: 8px 0;' +
      'animation: engineBeatFadeIn 0.24s ease-out;' +
    '}' +
    '.beat-line {' +
      'display: block;' +
      'font-style: normal;' +
      'font-size: 15px;' +
      'line-height: 1.55;' +
      'color: #e2dfd7;' +
      'margin: 8px 0;' +
      'animation: engineBeatFadeIn 0.22s ease-out;' +
    '}' +
    '#scene-text > .beat-action:first-child,' +
    '#scene-text > .beat-line:first-child {' +
      'margin-top: 0;' +
    '}' +
    '#scene-text > .beat-action:last-child,' +
    '#scene-text > .beat-line:last-child {' +
      'margin-bottom: 0;' +
    '}' +
    '#scene-view.mood-dossier .beat-action {' +
      'color: #5b4d3a;' +
    '}' +
    '#scene-view.mood-dossier .beat-line {' +
      'color: #1a1815;' +
    '}';

  var ICON_SOUND_ON =
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>' +
    '<path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>' +
    '<path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>' +
    '</svg>';

  var ICON_SOUND_OFF =
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>' +
    '<line x1="23" y1="9" x2="17" y2="15"/>' +
    '<line x1="17" y1="9" x2="23" y2="15"/>' +
    '</svg>';

  var dom = {};
  var tg = null;
  var initialized = false;
  var audioUnlocked = false;
  var userInteracted = false;
  var activeTab = 'scene';
  var testScaleTimer = null;

  var typewriterState = {
    timer: null,
    items: [],
    itemIndex: 0,
    charIndex: 0,
    active: false,
    onDone: null,
    autoScroll: false
  };

  var beatsState = {
    active: false,
    sessionId: 0,
    beatToken: 0,
    beats: [],
    index: 0,
    delayTimer: null,
    awaitingDelay: false,
    awaitingAudio: false,
    onAudioDoneCurrent: null,
    skipPrimed: false,
    onComplete: null
  };

  var interrogationState = {
    active: false,
    nodeId: null,
    stepId: null,
    composure: 100,
    maxComposure: 100
  };

  function createDefaultState() {
    return {
      nodeId: 'start',
      hours: 48,
      pressure: 70,
      threat: 10,
      flags: {},
      clues: [],
      suspectNotes: {},
      log: []
    };
  }

  var state = createDefaultState();

  function injectBeatsStyles() {
    if (document.getElementById(BEATS_STYLE_ID)) {
      return;
    }
    var styleEl = document.createElement('style');
    styleEl.id = BEATS_STYLE_ID;
    styleEl.textContent = BEATS_CSS;
    document.head.appendChild(styleEl);
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function clamp(num, min, max) {
    return Math.max(min, Math.min(max, num));
  }

  function formatHours(hoursVal) {
    var safe = Math.max(0, Number(hoursVal) || 0);
    var totalMinutes = Math.round(safe * 60);
    var hh = Math.floor(totalMinutes / 60);
    var mm = totalMinutes % 60;
    var hhStr = hh < 10 ? '0' + hh : String(hh);
    var mmStr = mm < 10 ? '0' + mm : String(mm);
    return hhStr + ':' + mmStr;
  }

  function formatHoursDelta(deltaHours) {
    var num = Number(deltaHours);
    if (!num) {
      return '';
    }
    var sign = num > 0 ? '+' : '-';
    var abs = Math.abs(num);
    var mins = Math.round(abs * 60);
    var h = Math.floor(mins / 60);
    var m = mins % 60;
    if (h > 0 && m > 0) {
      return sign + h + 'Ч ' + m + 'М';
    }
    if (h > 0) {
      return sign + h + ' Ч';
    }
    return sign + m + ' МИН';
  }

  function scrollStageToBottom() {
    if (!dom.stage) {
      return;
    }
    try {
      dom.stage.scrollTop = dom.stage.scrollHeight;
    } catch (e) {
      // Ignore scroll errors
    }
  }

  function getAudio() {
    return window.GameAudio || null;
  }

  function getVoice() {
    return window.GameVoice || null;
  }

  function stopVoiceSafe() {
    var voice = getVoice();
    if (voice && typeof voice.stop === 'function') {
      try {
        voice.stop();
      } catch (e) {
        // Ignore voice stop errors
      }
    }
  }

  function playVoiceSafe(src, onDone) {
    if (!src) {
      if (typeof onDone === 'function') {
        onDone();
      }
      return;
    }
    var voice = getVoice();
    if (voice && typeof voice.play === 'function') {
      try {
        if (typeof onDone === 'function') {
          voice.play(src, onDone);
        } else {
          voice.play(src);
        }
      } catch (e) {
        if (typeof onDone === 'function') {
          onDone();
        }
      }
    } else if (typeof onDone === 'function') {
      onDone();
    }
  }

  function unlockAudioOnce() {
    if (audioUnlocked) {
      return;
    }
    audioUnlocked = true;
    var audio = getAudio();
    if (audio) {
      try {
        audio.init();
        audio.playAmbient();
      } catch (e) {
        // Ignore audio unlock errors
      }
    }
  }

  function playSfx(name) {
    if (!name) {
      return;
    }
    var audio = getAudio();
    if (!audio) {
      return;
    }
    try {
      if (typeof audio[name] === 'function') {
        audio[name]();
        return;
      }
      var prefixed = 'sfx' + name.charAt(0).toUpperCase() + name.slice(1);
      if (typeof audio[prefixed] === 'function') {
        audio[prefixed]();
      }
    } catch (e) {
      // Ignore SFX errors
    }
  }

  function haptic(type) {
    try {
      if (!tg || !tg.HapticFeedback) {
        return;
      }
      if (type === 'light' || type === 'medium' || type === 'heavy') {
        if (typeof tg.HapticFeedback.impactOccurred === 'function') {
          tg.HapticFeedback.impactOccurred(type);
        }
      } else if (type === 'error' || type === 'success' || type === 'warning') {
        if (typeof tg.HapticFeedback.notificationOccurred === 'function') {
          tg.HapticFeedback.notificationOccurred(type);
        }
      } else if (type === 'selection') {
        if (typeof tg.HapticFeedback.selectionChanged === 'function') {
          tg.HapticFeedback.selectionChanged();
        }
      }
    } catch (e) {
      // Safe fallback outside Telegram
    }
  }

  function initTelegram() {
    try {
      if (window.Telegram && window.Telegram.WebApp) {
        tg = window.Telegram.WebApp;
        if (typeof tg.ready === 'function') {
          tg.ready();
        }
        if (typeof tg.expand === 'function') {
          tg.expand();
        }
        if (typeof tg.setHeaderColor === 'function') {
          tg.setHeaderColor('#0b0c0e');
        }
        if (typeof tg.setBackgroundColor === 'function') {
          tg.setBackgroundColor('#0b0c0e');
        }
        if (typeof tg.disableVerticalSwipes === 'function') {
          tg.disableVerticalSwipes();
        }
      }
    } catch (e) {
      // Safe fallback outside Telegram
    }
  }

  function canUseCloudStorage() {
    try {
      if (!tg || !tg.CloudStorage) {
        return false;
      }
      if (typeof tg.isVersionAtLeast === 'function' && !tg.isVersionAtLeast('6.9')) {
        return false;
      }
      return (
        typeof tg.CloudStorage.setItem === 'function' &&
        typeof tg.CloudStorage.getItem === 'function'
      );
    } catch (e) {
      return false;
    }
  }

  function sanitizeLoadedState(raw) {
    if (!raw || typeof raw !== 'object') {
      return null;
    }
    var base = createDefaultState();
    base.nodeId = typeof raw.nodeId === 'string' && raw.nodeId ? raw.nodeId : 'start';
    base.hours = typeof raw.hours === 'number' && !isNaN(raw.hours) ? Math.max(0, raw.hours) : 48;
    base.pressure =
      typeof raw.pressure === 'number' && !isNaN(raw.pressure)
        ? clamp(Math.round(raw.pressure), 0, 100)
        : 70;
    base.threat =
      typeof raw.threat === 'number' && !isNaN(raw.threat)
        ? clamp(Math.round(raw.threat), 0, 100)
        : 10;
    base.flags = raw.flags && typeof raw.flags === 'object' ? Object.assign({}, raw.flags) : {};
    base.clues = Array.isArray(raw.clues) ? raw.clues.slice() : [];
    base.suspectNotes =
      raw.suspectNotes && typeof raw.suspectNotes === 'object'
        ? JSON.parse(JSON.stringify(raw.suspectNotes))
        : {};
    base.log = Array.isArray(raw.log) ? raw.log.slice() : [];
    return base;
  }

  function saveState() {
    var payload = '';
    try {
      payload = JSON.stringify(state);
    } catch (e) {
      return;
    }

    try {
      window.localStorage.setItem(SAVE_KEY, payload);
    } catch (e) {
      // Ignore storage quota/privacy restrictions
    }

    if (canUseCloudStorage()) {
      try {
        var cloudPayload = payload;
        if (cloudPayload.length > 3900) {
          var compact = JSON.parse(payload);
          if (Array.isArray(compact.log) && compact.log.length > 20) {
            compact.log = compact.log.slice(compact.log.length - 20);
          }
          cloudPayload = JSON.stringify(compact);
        }
        if (cloudPayload.length <= 4096) {
          tg.CloudStorage.setItem(SAVE_KEY, cloudPayload, function () {});
        }
      } catch (e) {
        // Ignore cloud storage failures
      }
    }
  }

  function clearSavedState() {
    try {
      window.localStorage.removeItem(SAVE_KEY);
    } catch (e) {
      // Ignore storage errors
    }

    if (canUseCloudStorage() && typeof tg.CloudStorage.removeItem === 'function') {
      try {
        tg.CloudStorage.removeItem(SAVE_KEY, function () {});
      } catch (e) {
        // Ignore cloud storage errors
      }
    }
  }

  function loadLocalState() {
    try {
      var raw = window.localStorage.getItem(SAVE_KEY);
      if (!raw) {
        return null;
      }
      return sanitizeLoadedState(JSON.parse(raw));
    } catch (e) {
      return null;
    }
  }

  function tryRestoreCloudState(callback) {
    if (!canUseCloudStorage()) {
      return;
    }
    try {
      tg.CloudStorage.getItem(SAVE_KEY, function (err, value) {
        if (err || !value || userInteracted) {
          return;
        }
        try {
          var parsed = sanitizeLoadedState(JSON.parse(value));
          if (parsed && typeof callback === 'function') {
            callback(parsed);
          }
        } catch (parseErr) {
          // Ignore malformed cloud save
        }
      });
    } catch (e) {
      // Ignore cloud storage read errors
    }
  }

  function cacheDom() {
    dom.statHours = document.getElementById('stat-hours');
    dom.statPressureVal = document.getElementById('stat-pressure-val');
    dom.statPressureBar = document.getElementById('stat-pressure-bar');
    dom.statThreatVal = document.getElementById('stat-threat-val');
    dom.statThreatBar = document.getElementById('stat-threat-bar');
    dom.btnSound = document.getElementById('btn-sound');
    dom.btnMenu = document.getElementById('btn-menu');
    dom.stage = document.getElementById('stage');
    dom.sceneView = document.getElementById('scene-view');
    dom.sceneAct = document.getElementById('scene-act');
    dom.sceneLocation = document.getElementById('scene-location');
    dom.portraitWrap = document.getElementById('portrait-wrap');
    dom.sceneSpeaker = document.getElementById('scene-speaker');
    dom.interrogationHud = document.getElementById('interrogation-hud');
    dom.composureBar = document.getElementById('composure-bar');
    dom.composureVal = document.getElementById('composure-val');
    dom.sceneText = document.getElementById('scene-text');
    dom.choicesContainer = document.getElementById('choices-container');
    dom.endingView = document.getElementById('ending-view');
    dom.endingStamp = document.getElementById('ending-stamp');
    dom.endingTitle = document.getElementById('ending-title');
    dom.endingText = document.getElementById('ending-text');
    dom.endingHint = document.getElementById('ending-hint');
    dom.btnRestartEnding = document.getElementById('btn-restart-ending');
    dom.bottomNav = document.getElementById('bottom-nav');
    dom.navButtons = document.querySelectorAll('#bottom-nav .nav-btn');
    dom.modalOverlay = document.getElementById('modal-overlay');
    dom.modalTitle = document.getElementById('modal-title');
    dom.btnCloseModal = document.getElementById('btn-close-modal');
    dom.modalBody = document.getElementById('modal-body');
    dom.minigameOverlay = document.getElementById('minigame-overlay');
    dom.minigameContainer = document.getElementById('minigame-container');
  }

  function updateSoundButtonUI() {
    if (!dom.btnSound) {
      return;
    }
    var audio = getAudio();
    var muted = audio && typeof audio.isMuted === 'function' ? audio.isMuted() : false;
    dom.btnSound.innerHTML = muted ? ICON_SOUND_OFF : ICON_SOUND_ON;
    dom.btnSound.classList.toggle('is-muted', muted);
    dom.btnSound.classList.toggle('muted', muted);
    dom.btnSound.setAttribute('aria-label', muted ? 'Включить звук' : 'Выключить звук');
  }

  function updateStatsUI(overrideStats) {
    var hours = overrideStats ? overrideStats.hours : state.hours;
    var pressure = overrideStats ? overrideStats.pressure : state.pressure;
    var threat = overrideStats ? overrideStats.threat : state.threat;

    hours = Math.max(0, Number(hours) || 0);
    pressure = clamp(Math.round(Number(pressure) || 0), 0, 100);
    threat = clamp(Math.round(Number(threat) || 0), 0, 100);

    if (dom.statHours) {
      dom.statHours.textContent = formatHours(hours);
      dom.statHours.classList.toggle('danger-pulse', hours <= 8);
    }

    if (dom.statPressureVal) {
      dom.statPressureVal.textContent = String(pressure);
      dom.statPressureVal.classList.toggle('danger-pulse', pressure <= 25);
    }
    if (dom.statPressureBar) {
      dom.statPressureBar.style.width = pressure + '%';
      dom.statPressureBar.classList.toggle('danger-pulse', pressure <= 25);
    }

    if (dom.statThreatVal) {
      dom.statThreatVal.textContent = String(threat);
      dom.statThreatVal.classList.toggle('danger-pulse', threat >= 75);
    }
    if (dom.statThreatBar) {
      dom.statThreatBar.style.width = threat + '%';
      dom.statThreatBar.classList.toggle('danger-pulse', threat >= 75);
    }
  }

  function updateComposureUI(val, max) {
    var safeMax = max && max > 0 ? max : 100;
    var safeVal = clamp(Math.round(Number(val) || 0), 0, safeMax);
    var pct = clamp(Math.round((safeVal / safeMax) * 100), 0, 100);

    if (dom.composureVal) {
      dom.composureVal.textContent = String(safeVal);
      dom.composureVal.classList.toggle('danger-pulse', pct <= 25);
    }
    if (dom.composureBar) {
      dom.composureBar.style.width = pct + '%';
    }
  }

  function buildPlaceholderSvg(labelText) {
    var safeLabel = escapeHtml((labelText || 'ДЕЛО №409 // ВЕТКА').toUpperCase());
    if (safeLabel.length > 34) {
      safeLabel = safeLabel.slice(0, 33) + '…';
    }

    return (
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">' +
      '<defs>' +
      '<radialGradient id="phBg" cx="50%" cy="38%" r="72%">' +
      '<stop offset="0%" stop-color="#232833"/>' +
      '<stop offset="68%" stop-color="#12141a"/>' +
      '<stop offset="100%" stop-color="#090a0d"/>' +
      '</radialGradient>' +
      '<pattern id="phScan" width="4" height="4" patternUnits="userSpaceOnUse">' +
      '<rect width="4" height="1" fill="#ffffff" fill-opacity="0.035"/>' +
      '</pattern>' +
      '<linearGradient id="phSil" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#191d26"/>' +
      '<stop offset="100%" stop-color="#0b0c0f"/>' +
      '</linearGradient>' +
      '</defs>' +
      '<rect width="400" height="200" fill="url(#phBg)"/>' +
      '<g opacity="0.22" stroke="#5e636e" stroke-width="0.7" fill="none">' +
      '<line x1="0" y1="50" x2="400" y2="50"/>' +
      '<line x1="0" y1="100" x2="400" y2="100"/>' +
      '<line x1="0" y1="150" x2="400" y2="150"/>' +
      '<line x1="100" y1="0" x2="100" y2="200"/>' +
      '<line x1="200" y1="0" x2="200" y2="200"/>' +
      '<line x1="300" y1="0" x2="300" y2="200"/>' +
      '</g>' +
      '<circle cx="200" cy="76" r="28" fill="url(#phSil)" stroke="#2e3442" stroke-width="1.2"/>' +
      '<path d="M134 200 C138 144 166 116 200 116 C234 116 262 144 266 200 Z" fill="url(#phSil)" stroke="#2e3442" stroke-width="1.2"/>' +
      '<rect width="400" height="200" fill="url(#phScan)"/>' +
      '<g stroke="#c98a2e" stroke-opacity="0.45" stroke-width="1.4" fill="none">' +
      '<path d="M14 26 L14 14 L26 14"/>' +
      '<path d="M374 14 L386 14 L386 26"/>' +
      '<path d="M14 174 L14 186 L26 186"/>' +
      '<path d="M374 186 L386 186 L386 174"/>' +
      '</g>' +
      '<g transform="translate(24 24)">' +
      '<rect x="0" y="0" width="132" height="20" rx="2" fill="#991b1b" fill-opacity="0.22" stroke="#dc2626" stroke-width="1"/>' +
      '<circle cx="11" cy="10" r="3" fill="#dc2626"/>' +
      '<text x="20" y="13.5" fill="#f0b4b4" font-family="IBM Plex Mono, monospace" font-size="9.5" font-weight="600" letter-spacing="0.8">АРХИВ // НЕТ ФОТО</text>' +
      '</g>' +
      '<text x="382" y="37" text-anchor="end" fill="#6f7582" font-family="IBM Plex Mono, monospace" font-size="9" letter-spacing="1">' + getCaseCode() + '</text>' +
      '<text x="200" y="160" text-anchor="middle" fill="#b7afa0" fill-opacity="0.72" font-family="IBM Plex Mono, monospace" font-size="10.5" font-weight="600" letter-spacing="1.4">' +
      safeLabel +
      '</text>' +
      '</svg>'
    );
  }


  var ASSET_MAP = {
    sery: 'assets/portraits/sery.jpg',
    krasnov: 'assets/portraits/krasnov.jpg',
    kravtsov: 'assets/portraits/kravtsov.jpg',
    gromov: 'assets/portraits/gromov.jpg',
    ryabova: 'assets/portraits/ryabova.jpg',
    ditch_night: 'assets/locations/ditch_night.jpg',
    ditch_climax: 'assets/locations/ditch_climax.jpg',
    knife_uv: 'assets/items/knife_uv.jpg',
    phone_broken: 'assets/items/phone_broken.jpg',
    archive_falsification: 'assets/items/archive_falsification.jpg',
    personal_ruins: 'assets/items/personal_ruins.jpg'
  };

  function getCaseCode() {
    var cid = (window.ACTIVE_CASE_ID || 'case409').toLowerCase();
    if (cid === 'case412') return 'СК-412';
    if (cid === 'case418') return 'СК-418';
    return 'СК-409';
  }

  function getCaseNumber() {
    var cid = (window.ACTIVE_CASE_ID || 'case409').toLowerCase();
    if (cid === 'case412') return '№412';
    if (cid === 'case418') return '№418';
    return '№409';
  }

  var ASSET_CACHE_VER = 'v20261121';

  function withCacheBust(url) {
    if (typeof url !== 'string' || !url || url.indexOf('data:') === 0) return url;
    return url.indexOf('?') === -1 ? (url + '?' + ASSET_CACHE_VER) : url;
  }

  function resolveAssetPath(src) {
    if (typeof src !== 'string') return src;
    var clean = src.trim();
    if (!clean) return clean;
    if (clean.indexOf('cases/') === 0 || clean.indexOf('/cases/') === 0) {
      return withCacheBust(clean);
    }
    var cid = (window.ACTIVE_CASE_ID || 'case409').toLowerCase();
    if (cid === 'case409') {
      var m = clean.match(/([^/\\]+)\.(?:jpg|jpeg|png|webp)$/i);
      if (m) {
        var key = m[1].toLowerCase();
        if (ASSET_MAP[key]) return withCacheBust(ASSET_MAP[key]);
      }
    }
    return withCacheBust(clean);
  }

  function renderPortrait(portraitSrc, fallbackLabel) {
    if (!dom.portraitWrap) {
      return;
    }
    dom.portraitWrap.innerHTML = '';

    if (typeof portraitSrc === 'string' && portraitSrc.trim()) {
      var trimmed = portraitSrc.trim();
      if (trimmed.indexOf('<svg') === 0) {
        dom.portraitWrap.innerHTML = trimmed;
        return;
      }

      var img = document.createElement('img');
      img.alt = fallbackLabel || '';
      img.decoding = 'async';
      img.onerror = function () {
        if (dom.portraitWrap) {
          dom.portraitWrap.innerHTML = buildPlaceholderSvg(fallbackLabel);
        }
      };
      img.src = resolveAssetPath(trimmed);
      dom.portraitWrap.appendChild(img);
      return;
    }

    dom.portraitWrap.innerHTML = buildPlaceholderSvg(fallbackLabel);
  }

  /* ===== TYPEWRITER & SEQUENTIAL BEATS ENGINE ===== */

  function cancelTypewriter() {
    if (typewriterState.timer !== null) {
      window.clearInterval(typewriterState.timer);
      typewriterState.timer = null;
    }
    typewriterState.items = [];
    typewriterState.itemIndex = 0;
    typewriterState.charIndex = 0;
    typewriterState.active = false;
    typewriterState.onDone = null;
    typewriterState.autoScroll = false;
  }

  function finishTypewriterInstant(triggerCallback) {
    if (!typewriterState.active) {
      return;
    }
    var cb = typewriterState.onDone;
    if (typewriterState.timer !== null) {
      window.clearInterval(typewriterState.timer);
      typewriterState.timer = null;
    }
    for (var i = typewriterState.itemIndex; i < typewriterState.items.length; i++) {
      typewriterState.items[i].node.nodeValue = typewriterState.items[i].fullText;
    }
    var shouldScroll = typewriterState.autoScroll;
    typewriterState.items = [];
    typewriterState.itemIndex = 0;
    typewriterState.charIndex = 0;
    typewriterState.active = false;
    typewriterState.onDone = null;
    typewriterState.autoScroll = false;

    if (shouldScroll) {
      scrollStageToBottom();
    }
    if (triggerCallback && typeof cb === 'function') {
      cb();
    }
  }

  function collectTextNodes(root, list) {
    var child = root.firstChild;
    while (child) {
      if (child.nodeType === 3) {
        if (child.nodeValue && child.nodeValue.length > 0) {
          list.push({
            node: child,
            fullText: child.nodeValue
          });
          child.nodeValue = '';
        }
      } else if (child.nodeType === 1) {
        collectTextNodes(child, list);
      }
      child = child.nextSibling;
    }
  }

  function setElementContent(el, rawText) {
    var text = String(rawText == null ? '' : rawText);
    if (/<[a-z][\s\S]*>/i.test(text)) {
      el.innerHTML = text;
    } else {
      el.textContent = text;
    }
  }

  function typewriteIntoElement(targetEl, rawText, options) {
    cancelTypewriter();
    if (!targetEl) {
      return;
    }
    var opts = options || {};
    var text = String(rawText == null ? '' : rawText);
    targetEl.innerHTML = '';

    var temp = document.createElement('div');
    setElementContent(temp, text);

    var items = [];
    collectTextNodes(temp, items);

    while (temp.firstChild) {
      targetEl.appendChild(temp.firstChild);
    }

    if (items.length === 0) {
      if (opts.autoScroll) {
        scrollStageToBottom();
      }
      if (typeof opts.onDone === 'function') {
        opts.onDone();
      }
      return;
    }

    typewriterState.items = items;
    typewriterState.itemIndex = 0;
    typewriterState.charIndex = 0;
    typewriterState.active = true;
    typewriterState.onDone = typeof opts.onDone === 'function' ? opts.onDone : null;
    typewriterState.autoScroll = Boolean(opts.autoScroll);

    var charsPerTick = opts.charsPerTick || 1;
    var intervalMs = opts.intervalMs || 80;

    typewriterState.timer = window.setInterval(function () {
      var remaining = charsPerTick;
      while (remaining > 0 && typewriterState.itemIndex < typewriterState.items.length) {
        var current = typewriterState.items[typewriterState.itemIndex];
        var nextPos = Math.min(current.fullText.length, typewriterState.charIndex + remaining);
        remaining -= nextPos - typewriterState.charIndex;
        current.node.nodeValue = current.fullText.slice(0, nextPos);
        typewriterState.charIndex = nextPos;

        if (typewriterState.charIndex >= current.fullText.length) {
          typewriterState.itemIndex += 1;
          typewriterState.charIndex = 0;
        }
      }

      if (typewriterState.autoScroll) {
        scrollStageToBottom();
      }

      if (typewriterState.itemIndex >= typewriterState.items.length) {
        var doneCb = typewriterState.onDone;
        cancelTypewriter();
        if (typeof doneCb === 'function') {
          doneCb();
        }
      }
    }, Math.max(10, Math.round((intervalMs) / (window.GameVoice && typeof window.GameVoice.getRate === 'function' ? window.GameVoice.getRate() : 1.5))));
  }

  function typewriteText(rawText) {
    stopBeats();
    if (dom.choicesContainer) {
      dom.choicesContainer.classList.remove('hidden');
    }
    typewriteIntoElement(dom.sceneText, rawText, {
      autoScroll: false
    });
  }

  function stopBeats() {
    beatsState.sessionId += 1;
    beatsState.beatToken += 1;
    if (beatsState.delayTimer !== null) {
      window.clearTimeout(beatsState.delayTimer);
      beatsState.delayTimer = null;
    }
    beatsState.active = false;
    beatsState.beats = [];
    beatsState.index = 0;
    beatsState.awaitingDelay = false;
    beatsState.awaitingAudio = false;
    beatsState.onAudioDoneCurrent = null;
    beatsState.skipPrimed = false;
    beatsState.onComplete = null;
  }

  function stopAllPlayback() {
    stopBeats();
    cancelTypewriter();
    stopVoiceSafe();
  }

  function finishAllBeatsImmediate() {
    if (!beatsState.active) {
      return;
    }

    var remainingBeats = beatsState.beats;
    var nextIndex = beatsState.index + 1;
    var completeCb = beatsState.onComplete;

    beatsState.beatToken += 1;

    if (beatsState.delayTimer !== null) {
      window.clearTimeout(beatsState.delayTimer);
      beatsState.delayTimer = null;
    }

    finishTypewriterInstant(false);
    stopVoiceSafe();

    for (var i = nextIndex; i < remainingBeats.length; i++) {
      var b = remainingBeats[i];
      if (!b) {
        continue;
      }
      var el = document.createElement('div');
      el.className = b.type === 'action' ? 'beat-action' : 'beat-line';
      setElementContent(el, b.text || '');
      if (dom.sceneText) {
        dom.sceneText.appendChild(el);
      }
    }

    beatsState.active = false;
    beatsState.beats = [];
    beatsState.index = 0;
    beatsState.awaitingDelay = false;
    beatsState.awaitingAudio = false;
    beatsState.onAudioDoneCurrent = null;
    beatsState.skipPrimed = false;
    beatsState.onComplete = null;

    if (dom.choicesContainer) {
      dom.choicesContainer.classList.remove('hidden');
    }
    scrollStageToBottom();

    if (typeof completeCb === 'function') {
      completeCb();
    }
  }

  function scheduleNextBeat(sessionId, delayMs) {
    if (!beatsState.active || sessionId !== beatsState.sessionId) {
      return;
    }
    beatsState.awaitingDelay = true;
    beatsState.delayTimer = window.setTimeout(function () {
      beatsState.delayTimer = null;
      beatsState.awaitingDelay = false;
      if (!beatsState.active || sessionId !== beatsState.sessionId) {
        return;
      }
      beatsState.index += 1;
      runCurrentBeat(sessionId);
    }, Math.max(0, Math.round((Number(delayMs) || 0) / (window.GameVoice && typeof window.GameVoice.getRate === 'function' ? window.GameVoice.getRate() : 1.5))));
  }

  function skipCurrentBeat() {
    if (!beatsState.active) {
      return;
    }

    var sessionId = beatsState.sessionId;
    beatsState.beatToken += 1;

    if (beatsState.delayTimer !== null) {
      window.clearTimeout(beatsState.delayTimer);
      beatsState.delayTimer = null;
    }

    beatsState.awaitingDelay = false;
    beatsState.awaitingAudio = false;
    beatsState.onAudioDoneCurrent = null;

    if (typewriterState.active) {
      finishTypewriterInstant(false);
    }

    stopVoiceSafe();

    if (!beatsState.active || sessionId !== beatsState.sessionId) {
      return;
    }

    beatsState.index += 1;
    runCurrentBeat(sessionId);
  }

  function runCurrentBeat(sessionId) {
    if (!beatsState.active || sessionId !== beatsState.sessionId) {
      return;
    }

    beatsState.beatToken += 1;
    beatsState.awaitingDelay = false;
    beatsState.awaitingAudio = false;
    beatsState.onAudioDoneCurrent = null;

    if (beatsState.index >= beatsState.beats.length) {
      var completeCb = beatsState.onComplete;
      beatsState.active = false;
      beatsState.skipPrimed = false;
      beatsState.beats = [];
      beatsState.index = 0;
      beatsState.onComplete = null;

      if (dom.choicesContainer) {
        dom.choicesContainer.classList.remove('hidden');
      }
      scrollStageToBottom();

      if (typeof completeCb === 'function') {
        completeCb();
      }
      return;
    }

    var beat = beatsState.beats[beatsState.index];
    if (!beat) {
      beatsState.index += 1;
      runCurrentBeat(sessionId);
      return;
    }

    if (beat.speaker && dom.sceneSpeaker) {
      dom.sceneSpeaker.textContent = beat.speaker;
    }

    if (beat.type === 'action') {
      var actionEl = document.createElement('div');
      actionEl.className = 'beat-action';
      setElementContent(actionEl, beat.text || '');
      if (dom.sceneText) {
        dom.sceneText.appendChild(actionEl);
      }
      scrollStageToBottom();

      if (beat.sfx) {
        playSfx(beat.sfx);
      }
      if (beat.haptic) {
        haptic(beat.haptic);
      }

      var actionDelay = typeof beat.delay === 'number' ? beat.delay : 1300;
      scheduleNextBeat(sessionId, actionDelay);
    } else {
      var speechEl = document.createElement('div');
      speechEl.className = 'beat-line';
      if (dom.sceneText) {
        dom.sceneText.appendChild(speechEl);
      }
      scrollStageToBottom();

      if (beat.sfx) {
        playSfx(beat.sfx);
      }
      if (beat.haptic) {
        haptic(beat.haptic);
      }

      var speechDelay = typeof beat.delay === 'number' ? beat.delay : 1300;
      var currentToken = beatsState.beatToken;
      var textDone = false;
      var audioDone = true;
      var transitionScheduled = false;

      var tryAdvanceAfterSpeech = function () {
        if (
          transitionScheduled ||
          !beatsState.active ||
          sessionId !== beatsState.sessionId ||
          currentToken !== beatsState.beatToken
        ) {
          return;
        }
        if (textDone && audioDone) {
          transitionScheduled = true;
          beatsState.awaitingAudio = false;
          beatsState.onAudioDoneCurrent = null;
          scheduleNextBeat(sessionId, speechDelay);
        }
      };

      if (beat.type === 'speech' && beat.voice) {
        audioDone = false;
        beatsState.awaitingAudio = true;

        var onAudioDone = function () {
          if (
            audioDone ||
            !beatsState.active ||
            sessionId !== beatsState.sessionId ||
            currentToken !== beatsState.beatToken
          ) {
            return;
          }
          audioDone = true;
          beatsState.awaitingAudio = false;
          beatsState.onAudioDoneCurrent = null;
          tryAdvanceAfterSpeech();
        };

        beatsState.onAudioDoneCurrent = onAudioDone;
        playVoiceSafe(beat.voice, onAudioDone);
      } else if (beat.voice) {
        playVoiceSafe(beat.voice);
      }

      typewriteIntoElement(speechEl, beat.text || '', {
        autoScroll: true,
        charsPerTick: 2,
        intervalMs: 20,
        onDone: function () {
          if (
            !beatsState.active ||
            sessionId !== beatsState.sessionId ||
            currentToken !== beatsState.beatToken
          ) {
            return;
          }
          textDone = true;
          tryAdvanceAfterSpeech();
        }
      });
    }
  }

  function playBeats(beatsArray, onComplete) {
    stopAllPlayback();

    if (!dom.sceneText) {
      return;
    }
    dom.sceneText.innerHTML = '';

    if (dom.choicesContainer) {
      dom.choicesContainer.classList.add('hidden');
    }

    var list = Array.isArray(beatsArray) ? beatsArray.slice() : [];
    if (list.length === 0) {
      if (dom.choicesContainer) {
        dom.choicesContainer.classList.remove('hidden');
      }
      if (typeof onComplete === 'function') {
        onComplete();
      }
      return;
    }

    var sid = ++beatsState.sessionId;
    beatsState.active = true;
    beatsState.beats = list;
    beatsState.index = 0;
    beatsState.delayTimer = null;
    beatsState.awaitingDelay = false;
    beatsState.awaitingAudio = false;
    beatsState.onAudioDoneCurrent = null;
    beatsState.skipPrimed = false;
    beatsState.onComplete = typeof onComplete === 'function' ? onComplete : null;

    runCurrentBeat(sid);
  }

  function renderNarrativeBody(sourceObj, onBeatsDone) {
    if (sourceObj && Array.isArray(sourceObj.beats) && sourceObj.beats.length > 0) {
      playBeats(sourceObj.beats, onBeatsDone);
      return;
    }

    if (sourceObj && sourceObj.voice) {
      playVoiceSafe(sourceObj.voice);
    }
    typewriteText((sourceObj && sourceObj.text) || '');
    if (typeof onBeatsDone === 'function') {
      onBeatsDone();
    }
  }

  function clearMoodClasses() {
    if (!dom.sceneView) {
      return;
    }
    var toRemove = [];
    for (var i = 0; i < dom.sceneView.classList.length; i++) {
      var cls = dom.sceneView.classList[i];
      if (cls.indexOf('mood-') === 0) {
        toRemove.push(cls);
      }
    }
    for (var j = 0; j < toRemove.length; j++) {
      dom.sceneView.classList.remove(toRemove[j]);
    }
  }

  function applyMood(mood) {
    clearMoodClasses();
    if (dom.sceneView && typeof mood === 'string' && mood.trim()) {
      dom.sceneView.classList.add('mood-' + mood.trim());
    }
  }

  function addCluesToState(cluesInput) {
    if (!cluesInput) {
      return false;
    }
    var list = Array.isArray(cluesInput) ? cluesInput : [cluesInput];
    var addedAny = false;
    for (var i = 0; i < list.length; i++) {
      var clueId = list[i];
      if (typeof clueId === 'string' && clueId && state.clues.indexOf(clueId) === -1) {
        state.clues.push(clueId);
        addedAny = true;
      }
    }
    return addedAny;
  }

  function addSingleSuspectNote(suspectId, noteText) {
    if (!suspectId || !noteText) {
      return;
    }
    if (!Array.isArray(state.suspectNotes[suspectId])) {
      state.suspectNotes[suspectId] = [];
    }
    if (state.suspectNotes[suspectId].indexOf(noteText) === -1) {
      state.suspectNotes[suspectId].push(noteText);
    }
  }

  function addSuspectNotesToState(noteInput) {
    if (!noteInput) {
      return;
    }
    if (Array.isArray(noteInput)) {
      for (var i = 0; i < noteInput.length; i++) {
        addSuspectNotesToState(noteInput[i]);
      }
      return;
    }
    if (typeof noteInput === 'object') {
      if (noteInput.suspectId || noteInput.id) {
        var sid = noteInput.suspectId || noteInput.id;
        var text = noteInput.text || noteInput.note || noteInput.fact;
        if (Array.isArray(text)) {
          for (var j = 0; j < text.length; j++) {
            addSingleSuspectNote(sid, text[j]);
          }
        } else {
          addSingleSuspectNote(sid, text);
        }
        return;
      }

      var keys = Object.keys(noteInput);
      for (var k = 0; k < keys.length; k++) {
        var key = keys[k];
        var val = noteInput[key];
        if (Array.isArray(val)) {
          for (var m = 0; m < val.length; m++) {
            addSingleSuspectNote(key, val[m]);
          }
        } else if (typeof val === 'string') {
          addSingleSuspectNote(key, val);
        }
      }
    }
  }

  function setFlagsInState(flagsInput) {
    if (!flagsInput) {
      return;
    }
    if (Array.isArray(flagsInput)) {
      for (var i = 0; i < flagsInput.length; i++) {
        if (typeof flagsInput[i] === 'string' && flagsInput[i]) {
          state.flags[flagsInput[i]] = true;
        }
      }
      return;
    }
    if (typeof flagsInput === 'object') {
      var keys = Object.keys(flagsInput);
      for (var j = 0; j < keys.length; j++) {
        state.flags[keys[j]] = flagsInput[keys[j]];
      }
    }
  }

  function addLogEntries(logInput) {
    if (!logInput) {
      return;
    }
    var list = Array.isArray(logInput) ? logInput : [logInput];
    for (var i = 0; i < list.length; i++) {
      var entry = list[i];
      var text = '';
      var timeLabel = formatHours(state.hours);
      if (typeof entry === 'string') {
        text = entry.trim();
      } else if (entry && typeof entry === 'object' && entry.text) {
        text = String(entry.text).trim();
        if (entry.time) {
          timeLabel = String(entry.time);
        }
      }
      if (!text) {
        continue;
      }
      var last = state.log.length > 0 ? state.log[state.log.length - 1] : null;
      var lastText = last ? (typeof last === 'string' ? last : last.text) : null;
      if (lastText === text) {
        continue;
      }
      state.log.push({
        time: timeLabel,
        text: text
      });
    }
  }

  function applyDelta(delta, allowAutoEnding) {
    if (!delta || typeof delta !== 'object') {
      return null;
    }

    var prevThreat = state.threat;

    if (typeof delta.hours === 'number' && !isNaN(delta.hours)) {
      state.hours = Math.max(0, Math.round((state.hours + delta.hours) * 100) / 100);
    }
    if (typeof delta.pressure === 'number' && !isNaN(delta.pressure)) {
      state.pressure = clamp(Math.round(state.pressure + delta.pressure), 0, 100);
    }
    if (typeof delta.threat === 'number' && !isNaN(delta.threat)) {
      state.threat = clamp(Math.round(state.threat + delta.threat), 0, 100);
    }

    updateStatsUI();

    if (state.threat >= 75 && state.threat > prevThreat) {
      playSfx('sfxHeartbeat');
      haptic('warning');
    }

    if (allowAutoEnding !== false) {
      var nodes = window.GameStory.nodes || {};
      if (state.hours <= 0 && nodes.ending_timeout) {
        return 'ending_timeout';
      }
      if (state.pressure <= 0 && nodes.ending_fired) {
        return 'ending_fired';
      }
    }

    return null;
  }

  function applyEffects(effectObj, options) {
    if (!effectObj || typeof effectObj !== 'object') {
      return null;
    }
    var opts = options || {};
    var addedClue = false;

    if (effectObj.addClues) {
      addedClue = addCluesToState(effectObj.addClues) || addedClue;
    }
    if (effectObj.addClue) {
      addedClue = addCluesToState(effectObj.addClue) || addedClue;
    }
    if (effectObj.addSuspectNote) {
      addSuspectNotesToState(effectObj.addSuspectNote);
    }
    if (effectObj.addSuspectNotes) {
      addSuspectNotesToState(effectObj.addSuspectNotes);
    }
    if (effectObj.setFlags) {
      setFlagsInState(effectObj.setFlags);
    }
    if (effectObj.addLog) {
      addLogEntries(effectObj.addLog);
    }

    if (interrogationState.active) {
      var compDelta = null;
      if (typeof effectObj.composureDelta === 'number') {
        compDelta = effectObj.composureDelta;
      } else if (effectObj.delta && typeof effectObj.delta.composure === 'number') {
        compDelta = effectObj.delta.composure;
      } else if (typeof effectObj.reduceComposure === 'number') {
        compDelta = -Math.abs(effectObj.reduceComposure);
      }
      if (compDelta !== null) {
        interrogationState.composure = clamp(
          interrogationState.composure + compDelta,
          0,
          interrogationState.maxComposure
        );
        updateComposureUI(interrogationState.composure, interrogationState.maxComposure);
      }
    }

    if (effectObj.sfx) {
      playSfx(effectObj.sfx);
    } else if (addedClue && !opts.suppressAutoSfx) {
      playSfx('sfxSuccess');
      haptic('success');
    }

    if (effectObj.haptic) {
      haptic(effectObj.haptic);
    }

    var autoEndingId = null;
    if (effectObj.delta) {
      autoEndingId = applyDelta(effectObj.delta, opts.allowAutoEnding !== false);
    }

    return autoEndingId;
  }

  function passesConditions(item) {
    if (!item || typeof item !== 'object') {
      return true;
    }

    if (item.reqFlags) {
      if (Array.isArray(item.reqFlags)) {
        for (var rf = 0; rf < item.reqFlags.length; rf++) {
          if (!state.flags[item.reqFlags[rf]]) return false;
        }
      } else if (typeof item.reqFlags === 'object') {
        var rfKeys = Object.keys(item.reqFlags);
        for (var rfk = 0; rfk < rfKeys.length; rfk++) {
          if (Boolean(state.flags[rfKeys[rfk]]) !== Boolean(item.reqFlags[rfKeys[rfk]])) return false;
        }
      }
    }
    if (Array.isArray(item.hideIfFlags)) {
      for (var hf = 0; hf < item.hideIfFlags.length; hf++) {
        if (state.flags[item.hideIfFlags[hf]]) return false;
      }
    }
    if (item.next && window.GameStory && window.GameStory.nodes) {
      var nextNode = window.GameStory.nodes[item.next];
      if (nextNode && nextNode.type === 'minigame' && nextNode.onWin && nextNode.onWin.setFlags) {
        var mgKeys = Object.keys(nextNode.onWin.setFlags);
        if (mgKeys.length > 0) {
          var allMgDone = true;
          for (var mk = 0; mk < mgKeys.length; mk++) {
            if (Boolean(state.flags[mgKeys[mk]]) !== Boolean(nextNode.onWin.setFlags[mgKeys[mk]])) {
              allMgDone = false;
              break;
            }
          }
          if (allMgDone) return false;
        }
      }
    }
    if (item.requiresFlags) {
      if (Array.isArray(item.requiresFlags)) {
        for (var i = 0; i < item.requiresFlags.length; i++) {
          if (!state.flags[item.requiresFlags[i]]) {
            return false;
          }
        }
      } else if (typeof item.requiresFlags === 'object') {
        var reqKeys = Object.keys(item.requiresFlags);
        for (var j = 0; j < reqKeys.length; j++) {
          if (Boolean(state.flags[reqKeys[j]]) !== Boolean(item.requiresFlags[reqKeys[j]])) {
            return false;
          }
        }
      }
    }

    if (item.forbidsFlags) {
      var forbidList = Array.isArray(item.forbidsFlags)
        ? item.forbidsFlags
        : Object.keys(item.forbidsFlags);
      for (var k = 0; k < forbidList.length; k++) {
        if (state.flags[forbidList[k]]) {
          return false;
        }
      }
    }

    if (Array.isArray(item.requiresClues)) {
      for (var c = 0; c < item.requiresClues.length; c++) {
        if (state.clues.indexOf(item.requiresClues[c]) === -1) {
          return false;
        }
      }
    }

    if (Array.isArray(item.forbidsClues)) {
      for (var fc = 0; fc < item.forbidsClues.length; fc++) {
        if (state.clues.indexOf(item.forbidsClues[fc]) !== -1) {
          return false;
        }
      }
    }

    return true;
  }

  function createChoiceButton(options) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'choice-btn';

    if (options.extraClass) {
      var classes = String(options.extraClass).split(/\s+/);
      for (var i = 0; i < classes.length; i++) {
        if (classes[i]) {
          btn.classList.add(classes[i]);
        }
      }
    }

    var textSpan = document.createElement('span');
    textSpan.className = 'choice-text';
    textSpan.textContent = options.text || '';
    btn.appendChild(textSpan);

    if (options.meta) {
      var metaSpan = document.createElement('span');
      metaSpan.className = 'choice-meta';
      metaSpan.textContent = options.meta;
      btn.appendChild(metaSpan);
    }

    btn.addEventListener('click', function () {
      userInteracted = true;
      unlockAudioOnce();
      if (typeof options.onClick === 'function') {
        options.onClick();
      }
    });

    return btn;
  }

  function setActiveNavTab(tabName) {
    activeTab = tabName;
    if (!dom.navButtons) {
      return;
    }
    for (var i = 0; i < dom.navButtons.length; i++) {
      var btn = dom.navButtons[i];
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
    }
  }

  function openModal(title, renderFn) {
    if (!dom.modalOverlay || !dom.modalTitle || !dom.modalBody) {
      return;
    }
    dom.modalTitle.textContent = title || '';
    dom.modalBody.innerHTML = '';
    if (typeof renderFn === 'function') {
      renderFn(dom.modalBody);
    }
    dom.modalOverlay.classList.remove('hidden');
  }

  function closeModal(keepTabHighlight) {
    if (dom.modalOverlay) {
      dom.modalOverlay.classList.add('hidden');
    }
    if (!keepTabHighlight) {
      setActiveNavTab('scene');
    }
  }

  function renderCluesModalContent(bodyEl) {
    if (!state.clues.length) {
      var empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = 'Улики пока не приобщены к материалам дела №409.';
      bodyEl.appendChild(empty);
      return;
    }

    var cluesMap = window.GameStory.clues || {};

    for (var i = 0; i < state.clues.length; i++) {
      (function (clueId) {
        var clue = cluesMap[clueId] || {
          title: clueId,
          shortText: 'Вещественное доказательство приобщено к делу.'
        };

        var card = document.createElement('div');
        card.className = 'clue-card';

        var header = document.createElement('div');
        header.className = 'clue-header';

        var title = document.createElement('div');
        title.className = 'clue-title';
        title.textContent = clue.title || clueId;

        var tag = document.createElement('span');
        tag.className = 'clue-tag';
        tag.textContent = clue.tag || clue.code || 'ВЕЩДОК';

        header.appendChild(title);
        header.appendChild(tag);
        card.appendChild(header);

        var desc = document.createElement('div');
        desc.className = 'clue-desc';
        desc.textContent = clue.shortText || clue.desc || clue.description || '';
        card.appendChild(desc);

        if (clue.detailText) {
          var detail = document.createElement('div');
          detail.className = 'clue-meta hidden';
          detail.style.whiteSpace = 'pre-line';
          detail.style.borderTop = '1px dashed rgba(26, 24, 21, 0.35)';
          detail.style.paddingTop = '8px';
          detail.style.marginTop = '8px';
          detail.style.color = '#1a1815';
          detail.textContent = clue.detailText;

          var hint = document.createElement('div');
          hint.className = 'clue-meta';
          hint.textContent = '▸ Нажмите, чтобы изучить подробности протокола';

          card.appendChild(hint);
          card.appendChild(detail);
          card.style.cursor = 'pointer';

          card.addEventListener('click', function () {
            var isHidden = detail.classList.contains('hidden');
            detail.classList.toggle('hidden', !isHidden);
            hint.textContent = isHidden
              ? '▾ Скрыть подробности протокола'
              : '▸ Нажмите, чтобы изучить подробности протокола';
            playSfx('sfxPaper');
            haptic('light');
          });
        }

        bodyEl.appendChild(card);
      })(state.clues[i]);
    }
  }

  function renderSuspectsModalContent(bodyEl) {
    var suspectsMap = window.GameStory.suspects || {};
    var keys = Object.keys(suspectsMap);
    var renderedCount = 0;

    for (var i = 0; i < keys.length; i++) {
      var sid = keys[i];
      var suspect = suspectsMap[sid];
      if (!suspect) {
        continue;
      }

      var notes = Array.isArray(state.suspectNotes[sid]) ? state.suspectNotes[sid] : [];
      if (suspect.requiresFlag && !state.flags[suspect.requiresFlag] && notes.length === 0) {
        continue;
      }
      if (suspect.hidden && notes.length === 0 && !state.flags['met_' + sid]) {
        continue;
      }

      renderedCount += 1;

      var card = document.createElement('div');
      card.className = 'suspect-card';

      var header = document.createElement('div');
      header.className = 'suspect-header';

      var left = document.createElement('div');
      var nameEl = document.createElement('div');
      nameEl.className = 'suspect-name';
      nameEl.textContent = suspect.name || sid;
      left.appendChild(nameEl);

      if (suspect.role) {
        var roleEl = document.createElement('div');
        roleEl.className = 'suspect-role';
        roleEl.textContent = suspect.role;
        left.appendChild(roleEl);
      }

      var statusEl = document.createElement('span');
      statusEl.className = 'suspect-status';
      if (suspect.statusType === 'danger' || suspect.statusType === 'prime') {
        statusEl.classList.add('status-danger');
      } else if (suspect.statusType === 'cleared') {
        statusEl.classList.add('status-cleared');
      }
      statusEl.textContent = suspect.status || 'ФИГУРАНТ';

      header.appendChild(left);
      header.appendChild(statusEl);
      card.appendChild(header);

      var bioText = suspect.bio || suspect.desc || suspect.description || '';
      if (bioText) {
        var bioEl = document.createElement('div');
        bioEl.className = 'suspect-notes';
        bioEl.textContent = bioText;
        card.appendChild(bioEl);
      }

      if (notes.length > 0) {
        var notesEl = document.createElement('div');
        notesEl.className = 'suspect-alibi';
        notesEl.style.whiteSpace = 'pre-line';
        var lines = [];
        for (var n = 0; n < notes.length; n++) {
          lines.push('• ' + notes[n]);
        }
        notesEl.textContent = lines.join('\n');
        card.appendChild(notesEl);
      }

      bodyEl.appendChild(card);
    }

    if (renderedCount === 0) {
      var empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = 'Досье фигурантов пока пусты.';
      bodyEl.appendChild(empty);
    }
  }

  function renderLogModalContent(bodyEl) {
    if (!state.log.length) {
      var empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = 'Записи в оперативном журнале пока отсутствуют.';
      bodyEl.appendChild(empty);
      return;
    }

    for (var i = state.log.length - 1; i >= 0; i--) {
      var entry = state.log[i];
      var item = document.createElement('div');
      item.className = 'log-item';

      if (entry && typeof entry === 'object') {
        if (entry.time) {
          var timeEl = document.createElement('span');
          timeEl.className = 'log-time';
          timeEl.textContent = 'ТАЙМЕР ' + entry.time;
          item.appendChild(timeEl);
        }
        var textEl = document.createElement('div');
        textEl.className = 'log-text';
        textEl.textContent = entry.text || '';
        item.appendChild(textEl);
      } else {
        var plainEl = document.createElement('div');
        plainEl.className = 'log-text';
        plainEl.textContent = String(entry || '');
        item.appendChild(plainEl);
      }

      bodyEl.appendChild(item);
    }
  }

  function openMenuModal() {
    playSfx('sfxClick');
    haptic('light');

    openModal('ТЕРМИНАЛ ДЕЛА №409', function (bodyEl) {
      var list = document.createElement('div');
      list.className = 'menu-list';

      var btnContinue = document.createElement('button');
      btnContinue.type = 'button';
      btnContinue.className = 'menu-btn';
      btnContinue.textContent = 'Продолжить';
      btnContinue.addEventListener('click', function () {
        playSfx('sfxClick');
        haptic('light');
        closeModal();
      });

      var confirmArmed = false;
      var btnRestart = document.createElement('button');
      btnRestart.type = 'button';
      btnRestart.className = 'menu-btn menu-btn-danger';
      btnRestart.textContent = 'Начать смену заново (сброс прогресса)';
      btnRestart.addEventListener('click', function () {
        if (!confirmArmed) {
          confirmArmed = true;
          btnRestart.textContent = 'Подтвердить сброс? Нажмите ещё раз';
          playSfx('sfxAlert');
          haptic('warning');
          return;
        }
        playSfx('sfxStamp');
        haptic('heavy');
        closeModal();
        restartGame();
      });

      list.appendChild(btnContinue);
      list.appendChild(btnRestart);

      var info = document.createElement('div');
      info.className = 'menu-info';
      info.textContent =
        'Осталось времени: ' +
        formatHours(state.hours) +
        ' · Улик: ' +
        state.clues.length +
        ' · Записей в журнале: ' +
        state.log.length;

      bodyEl.appendChild(list);
      bodyEl.appendChild(info);
    });
  }

  function openTab(tabName) {
    userInteracted = true;
    unlockAudioOnce();

    if (tabName === 'scene') {
      playSfx('sfxClick');
      haptic('light');
      closeModal();
      return;
    }

    setActiveNavTab(tabName);
    playSfx('sfxPaper');
    haptic('light');

    if (tabName === 'clues') {
      openModal('ВЕЩЕСТВЕННЫЕ УЛИКИ', renderCluesModalContent);
    } else if (tabName === 'suspects') {
      openModal('ДОСЬЕ ФИГУРАНТОВ', renderSuspectsModalContent);
    } else if (tabName === 'log') {
      openModal('ЖУРНАЛ РАССЛЕДОВАНИЯ', renderLogModalContent);
    }
  }

  /* ===== STANDBY TEST MODE ===== */

  function renderStandbyScreen() {
    stopAllPlayback();
    interrogationState.active = false;

    if (dom.endingView) {
      dom.endingView.classList.add('hidden');
    }
    if (dom.interrogationHud) {
      dom.interrogationHud.classList.add('hidden');
    }
    if (dom.minigameOverlay) {
      dom.minigameOverlay.classList.add('hidden');
    }
    if (dom.sceneView) {
      dom.sceneView.classList.remove('hidden');
    }

    applyMood('');

    if (dom.sceneAct) {
      dom.sceneAct.textContent = 'СИСТЕМА';
    }
    if (dom.sceneLocation) {
      dom.sceneLocation.textContent = 'ТЕРМИНАЛ СК // ТЕСТОВЫЙ РЕЖИМ';
    }
    if (dom.sceneSpeaker) {
      dom.sceneSpeaker.textContent = 'ОЖИДАНИЕ МАТЕРИАЛОВ ДЕЛА №409';
    }

    renderPortrait(null, 'ТЕРМИНАЛ СК // ДЕЛО ' + getCaseNumber());

    typewriteText(
      'Ядро движка, система поэтапных реплик (beats), озвучка и процедурный звук готовы к работе.\n\n' +
        'Подключите файлы сценария (story_core.js, story_act1.js–story_act4.js) для запуска расследования. ' +
        'Ниже доступны тесты постановки, рации, печати и шкал.'
    );

    if (dom.choicesContainer) {
      dom.choicesContainer.innerHTML = '';
      dom.choicesContainer.classList.remove('hidden');

      var cigaretteDemoBeats = [
        {
          type: 'action',
          text: '*чиркает зажигалкой, прикуривая от слабого огонька*',
          sfx: 'sfxLighter',
          delay: 700
        },
        {
          type: 'speech',
          text: '— Да-а-а, ну и денёк сегодня выдался...',
          voice: 'voice/test_01.mp3',
          delay: 400
        },
        {
          type: 'action',
          text: '*делает глубокую затяжку*',
          sfx: 'sfxInhale',
          delay: 800
        },
        {
          type: 'speech',
          text: '— Зачем мы вообще туда полезли?',
          voice: 'voice/test_02.mp3',
          delay: 400
        },
        {
          type: 'action',
          text: '*щелчком отправляет окурок в лужу*',
          sfx: 'sfxFlick',
          delay: 500
        }
      ];

      dom.choicesContainer.appendChild(
        createChoiceButton({
          text: 'ТЕСТ СЦЕНЫ С СИГАРЕТОЙ (ПОЭТАПНЫЙ ТЕКСТ + ЗВУК)',
          meta: 'BEATS',
          onClick: function () {
            var audio = getAudio();
            if (audio) {
              audio.init();
              audio.playAmbient();
            }
            haptic('light');
            if (dom.sceneSpeaker) {
              dom.sceneSpeaker.textContent = 'СЛЕДОВАТЕЛЬ // ДЕМО-ПОСТАНОВКА';
            }
            playBeats(cigaretteDemoBeats);
          }
        })
      );

      dom.choicesContainer.appendChild(
        createChoiceButton({
          text: 'ПРОВЕРИТЬ РАЦИЮ И ВИБРООТКЛИК',
          meta: 'АУДИО',
          onClick: function () {
            var audio = getAudio();
            if (audio) {
              audio.init();
              audio.playAmbient();
              audio.sfxRadio();
            }
            haptic('medium');
          }
        })
      );

      dom.choicesContainer.appendChild(
        createChoiceButton({
          text: 'ПРОВЕРИТЬ УДАР ПЕЧАТИ И ШКАЛЫ',
          meta: 'ТЕСТ UI',
          extraClass: 'choice-evidence',
          onClick: function () {
            var audio = getAudio();
            if (audio) {
              audio.init();
              audio.sfxStamp();
            }
            haptic('heavy');

            if (testScaleTimer !== null) {
              window.clearTimeout(testScaleTimer);
              testScaleTimer = null;
            }

            updateStatsUI({
              hours: 6.5,
              pressure: 18,
              threat: 84
            });

            testScaleTimer = window.setTimeout(function () {
              testScaleTimer = null;
              updateStatsUI();
            }, 2200);
          }
        })
      );
    }

    updateStatsUI();
  }

  /* ===== ENDING NODE ===== */

  function renderEndingNode(node) {
    stopAllPlayback();
    interrogationState.active = false;

    if (dom.minigameOverlay) {
      dom.minigameOverlay.classList.add('hidden');
    }
    if (dom.interrogationHud) {
      dom.interrogationHud.classList.add('hidden');
    }
    if (dom.sceneView) {
      dom.sceneView.classList.add('hidden');
    }
    if (dom.endingView) {
      dom.endingView.classList.remove('hidden');
    }
    if (dom.stage) {
      dom.stage.scrollTop = 0;
    }

    if (dom.endingStamp) {
      dom.endingStamp.textContent = node.stamp || 'ДЕЛО ЗАКРЫТО';
      dom.endingStamp.classList.remove('stamp-green', 'stamp-amber');
      if (node.isTrueEnding === true || node.stampStyle === 'green') {
        dom.endingStamp.classList.add('stamp-green');
      } else if (node.stampStyle === 'amber') {
        dom.endingStamp.classList.add('stamp-amber');
      }
    }

    if (dom.endingTitle) {
      dom.endingTitle.textContent = node.title || 'РАССЛЕДОВАНИЕ ЗАВЕРШЕНО';
    }

    if (dom.endingText) {
      dom.endingText.textContent = node.text || '';
    }

    if (dom.endingHint) {
      if (node.isTrueEnding === true) {
        dom.endingHint.textContent = '';
        dom.endingHint.classList.add('hidden');
      } else {
        var hintText = DEFAULT_HINT;
        var hints = Array.isArray(window.GameStory.veiledHints)
          ? window.GameStory.veiledHints
          : [];
        for (var i = 0; i < hints.length; i++) {
          var rule = hints[i];
          if (rule && rule.missingFlag && !state.flags[rule.missingFlag]) {
            hintText = rule.text || rule.hint || DEFAULT_HINT;
            break;
          }
        }
        dom.endingHint.textContent = hintText;
        dom.endingHint.classList.remove('hidden');
      }
    }

    if (node.voice) {
      playVoiceSafe(node.voice);
    }

    if (node.sfx) {
      playSfx(node.sfx);
    } else if (
      node.isBadEnding === true ||
      state.nodeId === 'ending_timeout' ||
      state.nodeId === 'ending_fired' ||
      node.mood === 'danger'
    ) {
      playSfx('sfxAlert');
      haptic('error');
    } else {
      playSfx('sfxStamp');
      haptic(node.isTrueEnding === true ? 'success' : 'heavy');
    }
  }

  /* ===== MINIGAME NODE ===== */

  function launchMinigame(node) {
    if (!dom.minigameOverlay || !dom.minigameContainer) {
      return;
    }

    stopAllPlayback();
    dom.minigameContainer.innerHTML = '';
    dom.minigameOverlay.classList.remove('hidden');

    var settled = false;

    var callbacks = {
      onSuccess: function () {
        if (settled) {
          return;
        }
        settled = true;
        dom.minigameOverlay.classList.add('hidden');
        dom.minigameContainer.innerHTML = '';
        playSfx('sfxSuccess');
        haptic('success');

        if (node.onWin) {
          var autoEnd = applyEffects(node.onWin, { suppressAutoSfx: true });
          saveState();
          if (autoEnd) {
            goToNode(autoEnd);
            return;
          }
          var nextWin = node.onWin.nextNode || node.onWin.next;
          if (nextWin) {
            goToNode(nextWin);
          }
        }
      },

      onFail: function () {
        if (settled) {
          return;
        }
        settled = true;
        dom.minigameOverlay.classList.add('hidden');
        dom.minigameContainer.innerHTML = '';
        playSfx('sfxAlert');
        haptic('error');

        if (node.onFail) {
          var autoEnd = applyEffects(node.onFail, { suppressAutoSfx: true });
          saveState();
          if (autoEnd) {
            goToNode(autoEnd);
            return;
          }
          var nextFail = node.onFail.nextNode || node.onFail.next;
          if (nextFail) {
            goToNode(nextFail);
          }
        }
      },

      onCancel: function () {
        if (settled) {
          return;
        }
        settled = true;
        dom.minigameOverlay.classList.add('hidden');
        dom.minigameContainer.innerHTML = '';
        playSfx('sfxClick');
        haptic('light');

        if (node.onCancelNext) {
          goToNode(node.onCancelNext);
        }
      }
    };

    if (window.GameMinigames && typeof window.GameMinigames.start === 'function') {
      try {
        window.GameMinigames.start(
          node.minigameId,
          dom.minigameContainer,
          node.minigameConfig || {},
          callbacks
        );
        return;
      } catch (e) {
        // Fall through to safe fallback UI
      }
    }

    var header = document.createElement('div');
    header.className = 'mg-header';

    var title = document.createElement('div');
    title.className = 'mg-title';
    title.textContent = 'МОДУЛЬ ЭКСПЕРТИЗЫ';
    header.appendChild(title);

    var board = document.createElement('div');
    board.className = 'mg-board';

    var msg = document.createElement('div');
    msg.className = 'mg-subtitle';
    msg.style.textAlign = 'center';
    msg.textContent =
      'Мини-игра «' +
      (node.minigameId || 'unknown') +
      '» пока не загружена. Вы можете пропустить экспертизу или вернуться к материалам дела.';
    board.appendChild(msg);

    var actions = document.createElement('div');
    actions.className = 'mg-actions';

    var btnBack = document.createElement('button');
    btnBack.type = 'button';
    btnBack.className = 'mg-btn';
    btnBack.textContent = 'ВЕРНУТЬСЯ';
    btnBack.addEventListener('click', function () {
      callbacks.onCancel();
    });
    actions.appendChild(btnBack);

    if (node.onWin && (node.onWin.next || node.onWin.nextNode)) {
      var btnSkip = document.createElement('button');
      btnSkip.type = 'button';
      btnSkip.className = 'mg-btn mg-btn-primary';
      btnSkip.textContent = 'ПРОПУСТИТЬ';
      btnSkip.addEventListener('click', function () {
        callbacks.onSuccess();
      });
      actions.appendChild(btnSkip);
    }

    dom.minigameContainer.appendChild(header);
    dom.minigameContainer.appendChild(board);
    dom.minigameContainer.appendChild(actions);
  }

  function renderMinigameNode(node) {
    interrogationState.active = false;
    if (dom.endingView) {
      dom.endingView.classList.add('hidden');
    }
    if (dom.interrogationHud) {
      dom.interrogationHud.classList.add('hidden');
    }
    if (dom.sceneView) {
      dom.sceneView.classList.remove('hidden');
    }

    applyMood(node.mood || '');

    if (dom.sceneAct) {
      dom.sceneAct.textContent = node.act || 'ЭКСПЕРТИЗА';
    }
    if (dom.sceneLocation) {
      dom.sceneLocation.textContent = node.location || 'КРИМИНАЛИСТИЧЕСКИЙ ТЕРМИНАЛ';
    }
    if (dom.sceneSpeaker) {
      dom.sceneSpeaker.textContent = node.speaker || '';
    }

    renderPortrait(node.portrait || node.scene, node.speaker || node.location || 'ЭКСПЕРТИЗА');
    typewriteText(
      node.text ||
        'Криминалистическая процедура приостановлена. Вы можете свериться с уликами и возобновить проверку.'
    );

    if (dom.choicesContainer) {
      dom.choicesContainer.innerHTML = '';
      dom.choicesContainer.classList.remove('hidden');

      dom.choicesContainer.appendChild(
        createChoiceButton({
          text: node.launchButtonText || 'ЗАПУСТИТЬ ЭКСПЕРТИЗУ ЗАНОВО',
          meta: 'ТЕРМИНАЛ',
          extraClass: 'choice-evidence',
          onClick: function () {
            playSfx('sfxClick');
            haptic('light');
            launchMinigame(node);
          }
        })
      );

      dom.choicesContainer.appendChild(
        createChoiceButton({
          text: 'ОТКРЫТЬ ПАПКУ УЛИК',
          meta: 'АРХИВ',
          onClick: function () {
            openTab('clues');
          }
        })
      );

      if (node.onCancelNext) {
        dom.choicesContainer.appendChild(
          createChoiceButton({
            text: 'ОТЛОЖИТЬ И ВЕРНУТЬСЯ',
            onClick: function () {
              playSfx('sfxClick');
              haptic('light');
              goToNode(node.onCancelNext);
            }
          })
        );
      }
    }

    launchMinigame(node);
  }

  /* ===== INTERROGATION NODE ===== */

  function handleInterrogationOutcome(node, outcome, defaultComposureDelta, isPositive) {
    if (!outcome || typeof outcome !== 'object') {
      return;
    }

    if (
      typeof outcome.composureDelta !== 'number' &&
      !(outcome.delta && typeof outcome.delta.composure === 'number') &&
      typeof outcome.reduceComposure !== 'number' &&
      defaultComposureDelta
    ) {
      interrogationState.composure = clamp(
        interrogationState.composure + defaultComposureDelta,
        0,
        interrogationState.maxComposure
      );
      updateComposureUI(interrogationState.composure, interrogationState.maxComposure);
    }

    var autoEnd = applyEffects(outcome, { suppressAutoSfx: true });
    saveState();

    if (autoEnd) {
      goToNode(autoEnd);
      return;
    }

    if (outcome.nextStep) {
      renderInterrogationStep(node, outcome.nextStep);
      return;
    }

    var nextNodeId = outcome.nextNode || outcome.next;
    if (nextNodeId) {
      goToNode(nextNodeId);
      return;
    }

    if (interrogationState.composure <= 0 && node.onBreak) {
      var breakTarget =
        typeof node.onBreak === 'string'
          ? node.onBreak
          : node.onBreak.nextNode || node.onBreak.next;
      if (typeof node.onBreak === 'object') {
        var breakEnd = applyEffects(node.onBreak, { suppressAutoSfx: true });
        saveState();
        if (breakEnd) {
          goToNode(breakEnd);
          return;
        }
      }
      if (breakTarget) {
        goToNode(breakTarget);
        return;
      }
    }

    var feedbackText = outcome.message || outcome.text;
    if (feedbackText) {
      typewriteText(feedbackText);
    } else if (!isPositive) {
      typewriteText('Подозреваемый лишь усмехается. Аргумент не сработал — вы теряете инициативу.');
    }
  }

  function openEvidenceCheckModal(node, check) {
    playSfx('sfxPaper');
    haptic('light');

    openModal('ПРЕДЪЯВИТЬ УЛИКУ', function (bodyEl) {
      if (check.prompt) {
        var promptEl = document.createElement('div');
        promptEl.className = 'log-item';
        promptEl.textContent = check.prompt;
        bodyEl.appendChild(promptEl);
      }

      if (!state.clues.length) {
        var empty = document.createElement('div');
        empty.className = 'empty-state';
        empty.textContent = 'У вас нет собранных улик, которые можно предъявить на допросе.';
        bodyEl.appendChild(empty);
        return;
      }

      var cluesMap = window.GameStory.clues || {};

      for (var i = 0; i < state.clues.length; i++) {
        (function (clueId) {
          var clue = cluesMap[clueId] || { title: clueId, shortText: '' };

          var card = document.createElement('div');
          card.className = 'clue-card';
          card.style.cursor = 'pointer';

          var header = document.createElement('div');
          header.className = 'clue-header';

          var title = document.createElement('div');
          title.className = 'clue-title';
          title.textContent = clue.title || clueId;

          var tag = document.createElement('span');
          tag.className = 'clue-tag';
          tag.textContent = 'ПРЕДЪЯВИТЬ';

          header.appendChild(title);
          header.appendChild(tag);
          card.appendChild(header);

          if (clue.shortText || clue.desc) {
            var desc = document.createElement('div');
            desc.className = 'clue-desc';
            desc.textContent = clue.shortText || clue.desc;
            card.appendChild(desc);
          }

          card.addEventListener('click', function () {
            closeModal();

            var expected = check.expectedClueId;
            var isMatch = false;
            if (Array.isArray(expected)) {
              isMatch = expected.indexOf(clueId) !== -1;
            } else if (Array.isArray(check.expectedClueIds)) {
              isMatch = check.expectedClueIds.indexOf(clueId) !== -1;
            } else {
              isMatch = clueId === expected;
            }

            if (isMatch) {
              playSfx('sfxSuccess');
              haptic('success');
              handleInterrogationOutcome(node, check.onCorrect || {}, -35, true);
            } else {
              playSfx('sfxAlert');
              haptic('error');
              var wrongOutcome = check.onWrong || {
                delta: { pressure: -5, threat: 5 },
                message: 'Эта улика не бьёт в цель. Подозреваемый перехватывает инициативу.'
              };
              handleInterrogationOutcome(node, wrongOutcome, 0, false);
            }
          });

          bodyEl.appendChild(card);
        })(state.clues[i]);
      }
    });
  }

  function openCatchTrapModal(node, trap) {
    playSfx('sfxClick');
    haptic('warning');

    openModal('ЗАФИКСИРОВАТЬ ОГОВОРКУ', function (bodyEl) {
      if (trap.prompt) {
        var promptEl = document.createElement('div');
        promptEl.className = 'log-item';
        promptEl.textContent = trap.prompt;
        bodyEl.appendChild(promptEl);
      }

      var options = Array.isArray(trap.options) ? trap.options : [];
      if (!options.length) {
        var empty = document.createElement('div');
        empty.className = 'empty-state';
        empty.textContent = 'Нет зафиксированных фраз для анализа.';
        bodyEl.appendChild(empty);
        return;
      }

      var list = document.createElement('div');
      list.className = 'menu-list';

      for (var i = 0; i < options.length; i++) {
        (function (opt) {
          var btn = createChoiceButton({
            text: opt.text || opt.label || '',
            extraClass: 'choice-trap',
            onClick: function () {
              closeModal();
              if (opt.isTrap === true) {
                playSfx('sfxSuccess');
                haptic('success');
                handleInterrogationOutcome(node, trap.onCatch || {}, -30, true);
              } else {
                playSfx('sfxAlert');
                haptic('error');
                var missOutcome = trap.onMiss || {
                  delta: { pressure: -5, threat: 5 },
                  message:
                    'Мимо. Подозреваемый спокойно отводит претензию — в этой фразе не было противоречия.'
                };
                handleInterrogationOutcome(node, missOutcome, 0, false);
              }
            }
          });
          list.appendChild(btn);
        })(options[i]);
      }

      bodyEl.appendChild(list);
    });
  }

  function renderInterrogationStep(node, stepId) {
    stopAllPlayback();

    var steps = node.steps || {};
    var step = steps[stepId];
    if (!step) {
      var keys = Object.keys(steps);
      if (keys.length > 0) {
        stepId = keys[0];
        step = steps[stepId];
      }
    }
    if (!step) {
      return;
    }

    interrogationState.stepId = stepId;

    if (step.onEnter) {
      var autoEnd = applyEffects(step.onEnter);
      saveState();
      if (autoEnd) {
        goToNode(autoEnd);
        return;
      }
    }

    if (dom.stage) {
      dom.stage.scrollTop = 0;
    }

    applyMood(step.mood || node.mood || 'interrogation');

    if (dom.sceneAct) {
      dom.sceneAct.textContent = step.act || node.act || 'ДОПРОС';
    }
    if (dom.sceneLocation) {
      dom.sceneLocation.textContent = step.location || node.location || 'КАБИНЕТ ДОПРОСА';
    }
    if (dom.sceneSpeaker) {
      dom.sceneSpeaker.textContent = step.speaker !== undefined ? step.speaker : node.speaker || '';
    }

    var portrait = step.portrait !== undefined ? step.portrait : (node.portrait || node.scene);
    renderPortrait(portrait, step.speaker || node.speaker || node.location || 'ДОПРОС');
    updateComposureUI(interrogationState.composure, interrogationState.maxComposure);

    if (dom.choicesContainer) {
      dom.choicesContainer.innerHTML = '';

      var choices = Array.isArray(step.choices) ? step.choices : [];
      for (var i = 0; i < choices.length; i++) {
        (function (choice) {
          if (!passesConditions(choice)) {
            return;
          }

          var metaText =
            choice.meta ||
            (choice.delta && choice.delta.hours ? formatHoursDelta(choice.delta.hours) : '');
          var extra = choice.className || '';
          if (choice.style === 'evidence' || choice.isEvidence) {
            extra += ' choice-evidence';
          }
          if (choice.style === 'trap' || choice.isTrap) {
            extra += ' choice-trap';
          }

          dom.choicesContainer.appendChild(
            createChoiceButton({
              text: choice.text || choice.label || '',
              meta: metaText,
              extraClass: extra.trim(),
              onClick: function () {
                if (!choice.sfx) {
                  playSfx('sfxClick');
                }
                haptic('light');

                var autoEndInner = applyEffects(choice);
                saveState();
                if (autoEndInner) {
                  goToNode(autoEndInner);
                  return;
                }

                if (choice.nextStep) {
                  renderInterrogationStep(node, choice.nextStep);
                } else if (choice.nextNode || choice.next) {
                  goToNode(choice.nextNode || choice.next);
                }
              }
            })
          );
        })(choices[i]);
      }

      if (step.evidenceCheck && passesConditions(step.evidenceCheck)) {
        dom.choicesContainer.appendChild(
          createChoiceButton({
            text: step.evidenceCheck.buttonText || 'ПРЕДЪЯВИТЬ УЛИКУ',
            meta: 'УЛИКА',
            extraClass: 'choice-evidence',
            onClick: function () {
              openEvidenceCheckModal(node, step.evidenceCheck);
            }
          })
        );
      }

      if (step.catchTrap && passesConditions(step.catchTrap)) {
        dom.choicesContainer.appendChild(
          createChoiceButton({
            text: step.catchTrap.buttonText || 'ЗАФИКСИРОВАТЬ ОГОВОРКУ',
            meta: 'ОГОВОРКА',
            extraClass: 'choice-trap',
            onClick: function () {
              openCatchTrapModal(node, step.catchTrap);
            }
          })
        );
      }
    }

    renderNarrativeBody(step);
  }

  function renderInterrogationNode(node) {
    if (dom.endingView) {
      dom.endingView.classList.add('hidden');
    }
    if (dom.minigameOverlay) {
      dom.minigameOverlay.classList.add('hidden');
    }
    if (dom.sceneView) {
      dom.sceneView.classList.remove('hidden');
    }
    if (dom.interrogationHud) {
      dom.interrogationHud.classList.remove('hidden');
    }

    var startComposure = typeof node.composure === 'number' ? node.composure : 100;
    interrogationState.active = true;
    interrogationState.nodeId = state.nodeId;
    interrogationState.maxComposure = startComposure > 0 ? startComposure : 100;
    interrogationState.composure = clamp(startComposure, 0, interrogationState.maxComposure);

    var firstStepId = node.startStep;
    if (!firstStepId && node.steps) {
      var stepKeys = Object.keys(node.steps);
      firstStepId = stepKeys.length > 0 ? stepKeys[0] : null;
    }

    updateComposureUI(interrogationState.composure, interrogationState.maxComposure);
    renderInterrogationStep(node, firstStepId);
  }

  /* ===== STANDARD SCENE NODE ===== */

  function renderStandardNode(node) {
    interrogationState.active = false;

    if (dom.endingView) {
      dom.endingView.classList.add('hidden');
    }
    if (dom.interrogationHud) {
      dom.interrogationHud.classList.add('hidden');
    }
    if (dom.minigameOverlay) {
      dom.minigameOverlay.classList.add('hidden');
    }
    if (dom.sceneView) {
      dom.sceneView.classList.remove('hidden');
    }
    if (dom.stage) {
      dom.stage.scrollTop = 0;
    }

    applyMood(node.mood || '');

    if (node.mood === 'dossier' && !(node.onEnter && node.onEnter.sfx) && !node.sfx) {
      playSfx('sfxPaper');
    }

    if (dom.sceneAct) {
      dom.sceneAct.textContent = node.act || '';
    }
    if (dom.sceneLocation) {
      dom.sceneLocation.textContent = node.location || '';
    }
    if (dom.sceneSpeaker) {
      dom.sceneSpeaker.textContent = node.speaker || '';
    }

    renderPortrait(node.portrait || node.scene, node.speaker || node.location || ('ДЕЛО ' + getCaseNumber()));

    if (dom.choicesContainer) {
      dom.choicesContainer.innerHTML = '';

      var choices = Array.isArray(node.choices) ? node.choices : [];
      for (var i = 0; i < choices.length; i++) {
        (function (choice) {
          if (!passesConditions(choice)) {
            return;
          }

          var metaText =
            choice.meta ||
            (choice.delta && choice.delta.hours ? formatHoursDelta(choice.delta.hours) : '');
          var extra = choice.className || '';
          if (choice.style === 'evidence' || choice.isEvidence) {
            extra += ' choice-evidence';
          }
          if (choice.style === 'trap' || choice.isTrap) {
            extra += ' choice-trap';
          }

          dom.choicesContainer.appendChild(
            createChoiceButton({
              text: choice.text || choice.label || '',
              meta: metaText,
              extraClass: extra.trim(),
              onClick: function () {
                if (!choice.sfx) {
                  playSfx('sfxClick');
                }
                haptic('light');

                var autoEnd = applyEffects(choice);
                saveState();
                if (autoEnd) {
                  goToNode(autoEnd);
                  return;
                }

                var targetId = choice.nextNode || choice.next;
                if (targetId) {
                  goToNode(targetId);
                }
              }
            })
          );
        })(choices[i]);
      }
    }

    renderNarrativeBody(node);
  }

  /* ===== NAVIGATION & LIFECYCLE ===== */

  function goToNode(nodeId) {
    stopAllPlayback();

    var nodes = (window.GameStory && window.GameStory.nodes) || {};

    if (!nodes.start) {
      renderStandbyScreen();
      return;
    }

    var targetId = nodeId && nodes[nodeId] ? nodeId : 'start';
    var node = nodes[targetId];
    if (!node) {
      renderStandbyScreen();
      return;
    }

    closeModal();
    state.nodeId = targetId;

    var isEnding = node.type === 'ending';

    if (node.sfx) {
      playSfx(node.sfx);
    }

    if (node.onEnter) {
      var autoEndingId = applyEffects(node.onEnter, {
        allowAutoEnding: !isEnding
      });
      if (autoEndingId && autoEndingId !== targetId && nodes[autoEndingId]) {
        saveState();
        goToNode(autoEndingId);
        return;
      }
    }

    updateStatsUI();
    saveState();

    if (isEnding) {
      renderEndingNode(node);
    } else if (node.type === 'interrogation') {
      renderInterrogationNode(node);
    } else if (node.type === 'minigame') {
      renderMinigameNode(node);
    } else {
      renderStandardNode(node);
    }
  }

  function renderNodeWithoutReapplyingOnEnter(nodeId) {
    stopAllPlayback();

    var nodes = (window.GameStory && window.GameStory.nodes) || {};
    var node = nodes[nodeId];
    if (!node) {
      goToNode('start');
      return;
    }

    closeModal();
    updateStatsUI();

    if (node.type === 'ending') {
      renderEndingNode(node);
    } else if (node.type === 'interrogation') {
      renderInterrogationNode(node);
    } else if (node.type === 'minigame') {
      renderMinigameNode(node);
    } else {
      renderStandardNode(node);
    }
  }

  function restartGame() {
    stopAllPlayback();

    if (testScaleTimer !== null) {
      window.clearTimeout(testScaleTimer);
      testScaleTimer = null;
    }

    if (window.GameMinigames && typeof window.GameMinigames.destroy === 'function') {
      try {
        window.GameMinigames.destroy();
      } catch (e) {
        // Ignore minigame destroy errors
      }
    }

    interrogationState.active = false;
    state = createDefaultState();
    clearSavedState();

    if (dom.minigameOverlay) {
      dom.minigameOverlay.classList.add('hidden');
    }
    if (dom.minigameContainer) {
      dom.minigameContainer.innerHTML = '';
    }

    closeModal();
    updateStatsUI();

    if (window.GameStory && window.GameStory.nodes && window.GameStory.nodes.start) {
      goToNode('start');
    } else {
      renderStandbyScreen();
    }
  }

  function handleSceneTextTap() {
    if (beatsState.active) {
      skipCurrentBeat();
      haptic('light');
      return;
    }

    if (typewriterState.active) {
      finishTypewriterInstant(true);
      haptic('light');
    }
  }

  function bindEvents() {
    document.addEventListener(
      'pointerdown',
      function () {
        unlockAudioOnce();
      },
      { passive: true }
    );

    if (dom.sceneText) {
      dom.sceneText.addEventListener('click', handleSceneTextTap);
    }

    if (dom.btnSound) {
      dom.btnSound.addEventListener('click', function () {
        userInteracted = true;
        var audio = getAudio();
        if (audio) {
          audio.init();
          var nowMuted = audio.toggleMute();
          updateSoundButtonUI();
          if (nowMuted) {
            stopVoiceSafe();
            if (
              beatsState.active &&
              beatsState.awaitingAudio &&
              typeof beatsState.onAudioDoneCurrent === 'function'
            ) {
              beatsState.onAudioDoneCurrent();
            }
          } else {
            audio.playAmbient();
            audio.sfxClick();
          }
        }
        haptic('light');
      });
    }

    if (dom.btnMenu) {
      dom.btnMenu.addEventListener('click', function () {
        userInteracted = true;
        unlockAudioOnce();
        openMenuModal();
      });
    }

    if (dom.btnCloseModal) {
      dom.btnCloseModal.addEventListener('click', function () {
        playSfx('sfxClick');
        haptic('light');
        closeModal();
      });
    }

    if (dom.modalOverlay) {
      dom.modalOverlay.addEventListener('click', function (e) {
        if (e.target === dom.modalOverlay) {
          playSfx('sfxClick');
          haptic('light');
          closeModal();
        }
      });
    }

    if (dom.btnRestartEnding) {
      dom.btnRestartEnding.addEventListener('click', function () {
        userInteracted = true;
        unlockAudioOnce();
        playSfx('sfxClick');
        haptic('medium');
        restartGame();
      });
    }

    if (dom.navButtons) {
      for (var i = 0; i < dom.navButtons.length; i++) {
        (function (btn) {
          btn.addEventListener('click', function () {
            var tab = btn.getAttribute('data-tab');
            if (tab) {
              if (
                tab === activeTab &&
                tab !== 'scene' &&
                dom.modalOverlay &&
                !dom.modalOverlay.classList.contains('hidden')
              ) {
                openTab('scene');
              } else {
                openTab(tab);
              }
            }
          });
        })(dom.navButtons[i]);
      }
    }
  }

  function init() {
    if (initialized) {
      return;
    }
    initialized = true;

    injectBeatsStyles();
    initTelegram();
    cacheDom();
    bindEvents();
    updateSoundButtonUI();

    var nodes = (window.GameStory && window.GameStory.nodes) || {};

    if (!nodes.start) {
      state = createDefaultState();
      updateStatsUI();
      renderStandbyScreen();
      return;
    }

    var localSave = loadLocalState();
    if (localSave && nodes[localSave.nodeId]) {
      state = localSave;
      updateStatsUI();
      renderNodeWithoutReapplyingOnEnter(state.nodeId);
      return;
    }

    state = createDefaultState();
    updateStatsUI();
    goToNode('start');

    tryRestoreCloudState(function (cloudState) {
      var currentNodes = (window.GameStory && window.GameStory.nodes) || {};
      if (cloudState && currentNodes[cloudState.nodeId] && cloudState.nodeId !== 'start') {
        state = cloudState;
        saveState();
        updateStatsUI();
        renderNodeWithoutReapplyingOnEnter(state.nodeId);
      }
    });
  }

  function getState() {
    return JSON.parse(JSON.stringify(state));
  }

  window.GameEngine = {
    init: init,
    goToNode: goToNode,
    restartGame: restartGame,
    haptic: haptic,
    getState: getState,
    openTab: openTab
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
