(function () {
  'use strict';

  if (!window.GameMinigames || typeof window.GameMinigames.register !== 'function') {
    return;
  }

  var STYLE_ID = 'minigames-forensics-styles';

  // ============================================================================
  // SHARED UTILITIES & STYLES
  // ============================================================================

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      '.mg-wrap.mg-for-wrap {',
      '  box-sizing: border-box;',
      '  width: 100%;',
      '  max-width: 520px;',
      '  margin: 0 auto;',
      '  background: #0b0c0e;',
      '  color: #e5e7eb;',
      '  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;',
      '  display: flex;',
      '  flex-direction: column;',
      '  gap: 10px;',
      '  padding: 12px;',
      '  border: 1px solid #2a2e38;',
      '  border-radius: 10px;',
      '  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.72);',
      '  user-select: none;',
      '  -webkit-user-select: none;',
      '  position: relative;',
      '  overflow: hidden;',
      '}',
      '.mg-wrap.mg-for-wrap *, .mg-wrap.mg-for-wrap *::before, .mg-wrap.mg-for-wrap *::after {',
      '  box-sizing: border-box;',
      '}',
      '.mg-for-wrap .mg-header {',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: space-between;',
      '  gap: 10px;',
      '  padding-bottom: 10px;',
      '  border-bottom: 1px solid #2a2e38;',
      '}',
      '.mg-for-wrap .mg-header-info {',
      '  min-width: 0;',
      '  flex: 1;',
      '}',
      '.mg-for-wrap .mg-header-title {',
      '  font-family: "Oswald", sans-serif;',
      '  font-size: 18px;',
      '  font-weight: 600;',
      '  letter-spacing: 0.06em;',
      '  text-transform: uppercase;',
      '  color: #f3f4f6;',
      '  line-height: 1.15;',
      '  white-space: nowrap;',
      '  overflow: hidden;',
      '  text-overflow: ellipsis;',
      '}',
      '.mg-for-wrap .mg-header-sub {',
      '  font-family: "IBM Plex Mono", monospace;',
      '  font-size: 11px;',
      '  color: #c98a2e;',
      '  letter-spacing: 0.05em;',
      '  margin-top: 3px;',
      '  white-space: nowrap;',
      '  overflow: hidden;',
      '  text-overflow: ellipsis;',
      '}',
      '.mg-for-wrap .mg-cancel-btn {',
      '  flex-shrink: 0;',
      '  background: #15171c;',
      '  color: #9ca3af;',
      '  border: 1px solid #2a2e38;',
      '  border-radius: 6px;',
      '  padding: 7px 12px;',
      '  font-family: "IBM Plex Mono", monospace;',
      '  font-size: 11px;',
      '  font-weight: 600;',
      '  letter-spacing: 0.08em;',
      '  cursor: pointer;',
      '  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;',
      '}',
      '.mg-for-wrap .mg-cancel-btn:hover, .mg-for-wrap .mg-cancel-btn:active {',
      '  background: #1f232c;',
      '  color: #f3f4f6;',
      '  border-color: #4b5563;',
      '}',
      '.mg-for-body {',
      '  display: flex;',
      '  flex-direction: column;',
      '  gap: 10px;',
      '}',
      '.mg-for-stage {',
      '  position: relative;',
      '  width: 100%;',
      '  background: #07080a;',
      '  border: 1px solid #2a2e38;',
      '  border-radius: 8px;',
      '  overflow: hidden;',
      '}',
      '.mg-for-canvas {',
      '  display: block;',
      '  width: 100%;',
      '  height: 100%;',
      '  touch-action: none;',
      '  cursor: crosshair;',
      '}',
      '.mg-for-panel {',
      '  background: #15171c;',
      '  border: 1px solid #2a2e38;',
      '  border-radius: 8px;',
      '  padding: 10px 12px;',
      '  display: flex;',
      '  flex-direction: column;',
      '  gap: 8px;',
      '}',
      '.mg-for-row {',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: space-between;',
      '  gap: 8px;',
      '}',
      '.mg-for-label {',
      '  font-family: "IBM Plex Mono", monospace;',
      '  font-size: 11px;',
      '  color: #9ca3af;',
      '  letter-spacing: 0.05em;',
      '  text-transform: uppercase;',
      '}',
      '.mg-for-value {',
      '  font-family: "IBM Plex Mono", monospace;',
      '  font-size: 12px;',
      '  font-weight: 600;',
      '  color: #f59e0b;',
      '}',
      '.mg-for-value.is-ok {',
      '  color: #22c55e;',
      '}',
      '.mg-for-value.is-err {',
      '  color: #dc2626;',
      '}',
      '.mg-for-status {',
      '  font-family: "IBM Plex Mono", monospace;',
      '  font-size: 11px;',
      '  line-height: 1.35;',
      '  padding: 7px 10px;',
      '  border-radius: 6px;',
      '  background: #0f1116;',
      '  border: 1px solid #2a2e38;',
      '  color: #d1d5db;',
      '  min-height: 32px;',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: space-between;',
      '  gap: 8px;',
      '  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;',
      '}',
      '.mg-for-status.is-ok {',
      '  border-color: rgba(34, 197, 94, 0.55);',
      '  background: rgba(34, 197, 94, 0.08);',
      '  color: #86efac;',
      '}',
      '.mg-for-status.is-warn {',
      '  border-color: rgba(245, 158, 11, 0.55);',
      '  background: rgba(245, 158, 11, 0.08);',
      '  color: #fcd34d;',
      '}',
      '.mg-for-status.is-err {',
      '  border-color: rgba(220, 38, 38, 0.65);',
      '  background: rgba(220, 38, 38, 0.12);',
      '  color: #fca5a5;',
      '}',
      '.mg-for-slider-wrap {',
      '  display: flex;',
      '  flex-direction: column;',
      '  gap: 5px;',
      '}',
      '.mg-for-slider {',
      '  -webkit-appearance: none;',
      '  appearance: none;',
      '  width: 100%;',
      '  height: 28px;',
      '  background: transparent;',
      '  cursor: pointer;',
      '  margin: 0;',
      '}',
      '.mg-for-slider:focus {',
      '  outline: none;',
      '}',
      '.mg-for-slider::-webkit-slider-runnable-track {',
      '  height: 6px;',
      '  border-radius: 3px;',
      '  background: linear-gradient(90deg, #1f242e 0%, #2d3340 50%, #1f242e 100%);',
      '  border: 1px solid #374151;',
      '}',
      '.mg-for-slider::-webkit-slider-thumb {',
      '  -webkit-appearance: none;',
      '  appearance: none;',
      '  width: 22px;',
      '  height: 22px;',
      '  border-radius: 50%;',
      '  background: radial-gradient(circle at 35% 35%, #fbbf24, #c98a2e);',
      '  border: 2px solid #0b0c0e;',
      '  box-shadow: 0 0 0 1px #f59e0b, 0 2px 8px rgba(0, 0, 0, 0.6);',
      '  margin-top: -9px;',
      '  transition: transform 0.1s ease;',
      '}',
      '.mg-for-slider:active::-webkit-slider-thumb {',
      '  transform: scale(1.1);',
      '}',
      '.mg-for-slider::-moz-range-track {',
      '  height: 6px;',
      '  border-radius: 3px;',
      '  background: #252a35;',
      '  border: 1px solid #374151;',
      '}',
      '.mg-for-slider::-moz-range-thumb {',
      '  width: 22px;',
      '  height: 22px;',
      '  border-radius: 50%;',
      '  background: radial-gradient(circle at 35% 35%, #fbbf24, #c98a2e);',
      '  border: 2px solid #0b0c0e;',
      '  box-shadow: 0 0 0 1px #f59e0b;',
      '}',
      '.mg-for-btn {',
      '  width: 100%;',
      '  padding: 11px 14px;',
      '  border-radius: 7px;',
      '  border: 1px solid #c98a2e;',
      '  background: linear-gradient(180deg, #c98a2e 0%, #9b661b 100%);',
      '  color: #0b0c0e;',
      '  font-family: "Oswald", sans-serif;',
      '  font-size: 15px;',
      '  font-weight: 600;',
      '  letter-spacing: 0.08em;',
      '  text-transform: uppercase;',
      '  cursor: pointer;',
      '  transition: transform 0.1s ease, filter 0.15s ease, opacity 0.15s ease, background 0.15s ease, border-color 0.15s ease;',
      '}',
      '.mg-for-btn:active:not(:disabled) {',
      '  transform: translateY(1px);',
      '}',
      '.mg-for-btn:disabled {',
      '  opacity: 0.42;',
      '  cursor: not-allowed;',
      '  background: #1c2028;',
      '  border-color: #2a2e38;',
      '  color: #6b7280;',
      '}',
      '.mg-for-btn.is-ready {',
      '  border-color: #22c55e;',
      '  background: linear-gradient(180deg, #22c55e 0%, #15803d 100%);',
      '  color: #052e16;',
      '  box-shadow: 0 0 14px rgba(34, 197, 94, 0.35);',
      '}',
      '.mg-for-btn-sec {',
      '  background: #1b1f27;',
      '  color: #e5e7eb;',
      '  border: 1px solid #2f3542;',
      '  border-radius: 6px;',
      '  padding: 8px 10px;',
      '  font-family: "IBM Plex Mono", monospace;',
      '  font-size: 11px;',
      '  font-weight: 600;',
      '  letter-spacing: 0.04em;',
      '  cursor: pointer;',
      '  transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;',
      '}',
      '.mg-for-btn-sec:hover {',
      '  border-color: #c98a2e;',
      '  background: #232833;',
      '}',
      '.mg-for-btn-sec.is-active {',
      '  border-color: #f59e0b;',
      '  background: rgba(245, 158, 11, 0.16);',
      '  color: #fde68a;',
      '}',
      '.mg-for-btn-sec.is-marked {',
      '  border-color: #dc2626;',
      '  background: rgba(220, 38, 38, 0.18);',
      '  color: #fecaca;',
      '}',
      '.mg-for-btn-sec.is-ok {',
      '  border-color: #22c55e;',
      '  background: rgba(34, 197, 94, 0.16);',
      '  color: #bbf7d0;',
      '}',
      /* Camera filmstrip */
      '.mg-cam-stage { aspect-ratio: 4 / 3; max-height: 330px; }',
      '.mg-cam-strip {',
      '  display: grid;',
      '  grid-template-columns: repeat(5, 1fr);',
      '  gap: 6px;',
      '}',
      '.mg-cam-slot {',
      '  background: #0d0f13;',
      '  border: 1px dashed #2a2e38;',
      '  border-radius: 6px;',
      '  overflow: hidden;',
      '  display: flex;',
      '  flex-direction: column;',
      '  align-items: stretch;',
      '  min-height: 62px;',
      '  transition: border-color 0.2s ease, box-shadow 0.2s ease;',
      '}',
      '.mg-cam-slot.is-captured {',
      '  border-style: solid;',
      '  border-color: #22c55e;',
      '  box-shadow: 0 0 8px rgba(34, 197, 94, 0.2);',
      '}',
      '.mg-cam-thumb-box {',
      '  position: relative;',
      '  width: 100%;',
      '  aspect-ratio: 4 / 3;',
      '  background: #08090c;',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: center;',
      '}',
      '.mg-cam-thumb-canvas {',
      '  width: 100%;',
      '  height: 100%;',
      '  display: block;',
      '}',
      '.mg-cam-slot-num {',
      '  position: absolute;',
      '  font-family: "IBM Plex Mono", monospace;',
      '  font-size: 10px;',
      '  color: #4b5563;',
      '}',
      '.mg-cam-slot.is-captured .mg-cam-slot-num { display: none; }',
      '.mg-cam-slot-lbl {',
      '  font-family: "IBM Plex Mono", monospace;',
      '  font-size: 9px;',
      '  line-height: 1.15;',
      '  color: #6b7280;',
      '  text-align: center;',
      '  padding: 3px 2px;',
      '  white-space: nowrap;',
      '  overflow: hidden;',
      '  text-overflow: ellipsis;',
      '  border-top: 1px solid #1e222b;',
      '}',
      '.mg-cam-slot.is-captured .mg-cam-slot-lbl {',
      '  color: #d1fae5;',
      '  background: rgba(34, 197, 94, 0.08);',
      '}',
      /* Ballistics */
      '.mg-bal-steps {',
      '  display: grid;',
      '  grid-template-columns: 1fr 1fr;',
      '  gap: 6px;',
      '}',
      '.mg-bal-step {',
      '  font-family: "IBM Plex Mono", monospace;',
      '  font-size: 10px;',
      '  letter-spacing: 0.05em;',
      '  text-align: center;',
      '  padding: 5px 6px;',
      '  border-radius: 5px;',
      '  background: #12141a;',
      '  border: 1px solid #252933;',
      '  color: #6b7280;',
      '}',
      '.mg-bal-step.is-active {',
      '  border-color: #c98a2e;',
      '  color: #f59e0b;',
      '  background: rgba(201, 138, 46, 0.1);',
      '}',
      '.mg-bal-step.is-done {',
      '  border-color: rgba(34, 197, 94, 0.5);',
      '  color: #4ade80;',
      '  background: rgba(34, 197, 94, 0.08);',
      '}',
      '.mg-bal-stage { aspect-ratio: 4 / 3; max-height: 300px; }',
      '.mg-bal-choices {',
      '  display: grid;',
      '  grid-template-columns: repeat(3, 1fr);',
      '  gap: 6px;',
      '}',
      '.mg-bal-switcher {',
      '  display: flex;',
      '  align-items: center;',
      '  gap: 8px;',
      '}',
      '.mg-bal-nav {',
      '  width: 38px;',
      '  height: 38px;',
      '  flex-shrink: 0;',
      '  border-radius: 6px;',
      '  border: 1px solid #2f3542;',
      '  background: #1b1f27;',
      '  color: #f59e0b;',
      '  font-family: "IBM Plex Mono", monospace;',
      '  font-size: 16px;',
      '  font-weight: 700;',
      '  cursor: pointer;',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: center;',
      '}',
      '.mg-bal-nav:active { transform: scale(0.95); }',
      '.mg-bal-dossier {',
      '  flex: 1;',
      '  min-width: 0;',
      '  background: #0d0f13;',
      '  border: 1px solid #2a2e38;',
      '  border-radius: 6px;',
      '  padding: 6px 9px;',
      '}',
      '.mg-bal-dossier-code {',
      '  font-family: "IBM Plex Mono", monospace;',
      '  font-size: 11px;',
      '  font-weight: 600;',
      '  color: #f59e0b;',
      '  white-space: nowrap;',
      '  overflow: hidden;',
      '  text-overflow: ellipsis;',
      '}',
      '.mg-bal-dossier-meta {',
      '  font-family: "Inter", sans-serif;',
      '  font-size: 11px;',
      '  color: #9ca3af;',
      '  margin-top: 1px;',
      '  white-space: nowrap;',
      '  overflow: hidden;',
      '  text-overflow: ellipsis;',
      '}',
      /* Arson Lab */
      '.mg-arson-stage { aspect-ratio: 4 / 3; max-height: 310px; }',
      '.mg-arson-grid {',
      '  display: grid;',
      '  grid-template-columns: repeat(2, 1fr);',
      '  gap: 6px;',
      '}',
      '.mg-arson-inspect {',
      '  background: #0d0f13;',
      '  border: 1px solid #2a2e38;',
      '  border-radius: 6px;',
      '  padding: 8px 10px;',
      '  display: flex;',
      '  flex-direction: column;',
      '  gap: 5px;',
      '}',
      '.mg-arson-inspect-head {',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: space-between;',
      '  gap: 8px;',
      '}',
      '.mg-arson-inspect-title {',
      '  font-family: "Oswald", sans-serif;',
      '  font-size: 14px;',
      '  letter-spacing: 0.04em;',
      '  color: #f3f4f6;',
      '}',
      '.mg-arson-inspect-desc {',
      '  font-family: "IBM Plex Mono", monospace;',
      '  font-size: 10.5px;',
      '  line-height: 1.4;',
      '  color: #9ca3af;',
      '}',
      '.mg-arson-legend {',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: space-between;',
      '  gap: 8px;',
      '  font-family: "IBM Plex Mono", monospace;',
      '  font-size: 10px;',
      '  color: #9ca3af;',
      '}',
      '.mg-dot {',
      '  display: inline-block;',
      '  width: 8px;',
      '  height: 8px;',
      '  border-radius: 50%;',
      '  margin-right: 4px;',
      '  vertical-align: middle;',
      '}',
      '@keyframes mgForShake {',
      '  0%, 100% { transform: translateX(0); }',
      '  20% { transform: translateX(-5px); }',
      '  40% { transform: translateX(5px); }',
      '  60% { transform: translateX(-4px); }',
      '  80% { transform: translateX(4px); }',
      '}',
      '.mg-for-shake { animation: mgForShake 0.34s ease; }'
    ].join('\n');
    document.head.appendChild(style);
  }

  function haptic(type) {
    try {
      if (window.GameMinigames && typeof window.GameMinigames.haptic === 'function') {
        window.GameMinigames.haptic(type);
      }
    } catch (e) {}
  }

  function sfx(type) {
    try {
      if (window.GameMinigames && typeof window.GameMinigames.sfx === 'function') {
        window.GameMinigames.sfx(type);
      }
    } catch (e) {}
  }

  function createWinTrigger(callbacks) {
    var fired = false;
    return function triggerWin(result) {
      if (fired) return;
      fired = true;
      if (!callbacks) return;
      var fn =
        callbacks.onWin ||
        callbacks.onSuccess ||
        callbacks.onComplete ||
        callbacks.onFinish ||
        callbacks.win;
      if (typeof fn === 'function') {
        fn(result || { success: true });
      }
    };
  }

  function triggerCancel(callbacks) {
    if (callbacks && typeof callbacks.onCancel === 'function') {
      callbacks.onCancel();
    }
  }

  function clamp(v, min, max) {
    return v < min ? min : v > max ? max : v;
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function mulberry32(seed) {
    var a = seed >>> 0;
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function createTimerBag() {
    var timeouts = [];
    var intervals = [];
    var rafs = [];
    var cleared = false;

    return {
      isCleared: function () {
        return cleared;
      },
      setTimeout: function (fn, ms) {
        if (cleared) return 0;
        var id = window.setTimeout(function () {
          var idx = timeouts.indexOf(id);
          if (idx !== -1) timeouts.splice(idx, 1);
          if (!cleared) fn();
        }, ms);
        timeouts.push(id);
        return id;
      },
      setInterval: function (fn, ms) {
        if (cleared) return 0;
        var id = window.setInterval(function () {
          if (!cleared) fn();
        }, ms);
        intervals.push(id);
        return id;
      },
      raf: function (fn) {
        if (cleared) return 0;
        var id = window.requestAnimationFrame(function (ts) {
          var idx = rafs.indexOf(id);
          if (idx !== -1) rafs.splice(idx, 1);
          if (!cleared) fn(ts);
        });
        rafs.push(id);
        return id;
      },
      clearAll: function () {
        cleared = true;
        var i;
        for (i = 0; i < timeouts.length; i++) window.clearTimeout(timeouts[i]);
        for (i = 0; i < intervals.length; i++) window.clearInterval(intervals[i]);
        for (i = 0; i < rafs.length; i++) window.cancelAnimationFrame(rafs[i]);
        timeouts.length = 0;
        intervals.length = 0;
        rafs.length = 0;
      }
    };
  }

  function createListenerBag() {
    var list = [];
    return {
      on: function (el, ev, fn, opts) {
        if (!el) return;
        el.addEventListener(ev, fn, opts);
        list.push({ el: el, ev: ev, fn: fn, opts: opts });
      },
      clearAll: function () {
        for (var i = 0; i < list.length; i++) {
          var item = list[i];
          item.el.removeEventListener(item.ev, item.fn, item.opts);
        }
        list.length = 0;
      }
    };
  }

  function createShell(containerEl, opts) {
    injectStyles();
    containerEl.innerHTML = '';

    var wrap = document.createElement('div');
    wrap.className = 'mg-wrap mg-for-wrap' + (opts.extraClass ? ' ' + opts.extraClass : '');

    var header = document.createElement('div');
    header.className = 'mg-header';

    var info = document.createElement('div');
    info.className = 'mg-header-info';

    var titleEl = document.createElement('div');
    titleEl.className = 'mg-header-title';
    titleEl.textContent = opts.title || 'КРИМИНАЛИСТИКА';

    var subEl = document.createElement('div');
    subEl.className = 'mg-header-sub';
    subEl.textContent = opts.subtitle || 'ДЕЛО №418: ПЕПЕЛИЩЕ';

    info.appendChild(titleEl);
    info.appendChild(subEl);

    var cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'mg-cancel-btn';
    cancelBtn.textContent = 'НАЗАД';

    header.appendChild(info);
    header.appendChild(cancelBtn);

    var body = document.createElement('div');
    body.className = 'mg-for-body';

    wrap.appendChild(header);
    wrap.appendChild(body);
    containerEl.appendChild(wrap);

    return {
      wrap: wrap,
      body: body,
      cancelBtn: cancelBtn,
      titleEl: titleEl,
      subEl: subEl
    };
  }

  function setupResponsiveCanvas(canvas, stageEl, onResized) {
    var width = 360;
    var height = 270;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var ro = null;

    function measure() {
      var rect = stageEl.getBoundingClientRect();
      var w = Math.max(240, Math.round(rect.width || 360));
      var h = Math.max(180, Math.round(rect.height || Math.round(w * 0.75)));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (w !== width || h !== height || canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        width = w;
        height = h;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        if (typeof onResized === 'function') {
          onResized(width, height, dpr);
        }
      }
    }

    measure();

    if (typeof window.ResizeObserver === 'function') {
      ro = new window.ResizeObserver(measure);
      ro.observe(stageEl);
    }
    window.addEventListener('resize', measure);

    return {
      measure: measure,
      getMetrics: function () {
        return { width: width, height: height, dpr: dpr };
      },
      destroy: function () {
        if (ro) {
          ro.disconnect();
          ro = null;
        }
        window.removeEventListener('resize', measure);
      }
    };
  }

  function flashShake(el) {
    if (!el) return;
    el.classList.remove('mg-for-shake');
    void el.offsetWidth;
    el.classList.add('mg-for-shake');
  }

  // ============================================================================
  // MINIGAME 1: crime_camera
  // ============================================================================

  var DEFAULT_CAMERA_POINTS = [
    {
      id: 'panel',
      label: 'Щиток (обгорел снаружи)',
      shortLabel: 'ЩИТОК',
      x: 0.16,
      y: 0.38,
      focusTarget: 26,
      kind: 'panel'
    },
    {
      id: 'door',
      label: 'След лома на двери',
      shortLabel: 'ДВЕРЬ',
      x: 0.43,
      y: 0.47,
      focusTarget: 64,
      kind: 'door'
    },
    {
      id: 'floor',
      label: 'Три очага прогара',
      shortLabel: 'ПРОГАР',
      x: 0.54,
      y: 0.80,
      focusTarget: 46,
      kind: 'floor'
    },
    {
      id: 'beam',
      label: 'Пуля в обугленной балке',
      shortLabel: 'ПУЛЯ',
      x: 0.72,
      y: 0.21,
      focusTarget: 84,
      kind: 'beam'
    },
    {
      id: 'canister',
      label: 'Канистра в кустах',
      shortLabel: 'КАНИСТРА',
      x: 0.86,
      y: 0.74,
      focusTarget: 18,
      kind: 'canister'
    }
  ];

  function drawProceduralAshScene(offCanvas, points) {
    var w = offCanvas.width;
    var h = offCanvas.height;
    var ctx = offCanvas.getContext('2d');
    var rand = mulberry32(41801);
    var i;

    // 1. Night smoky sky + ambient dark interior gradient
    var bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#090b10');
    bgGrad.addColorStop(0.45, '#12141a');
    bgGrad.addColorStop(0.68, '#161413');
    bgGrad.addColorStop(1, '#0b0a09');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Distant orange sodium streetlight / cold moon glow through burnt roof opening
    var moonGlow = ctx.createRadialGradient(w * 0.62, h * 0.12, 10, w * 0.62, h * 0.12, w * 0.45);
    moonGlow.addColorStop(0, 'rgba(130, 155, 195, 0.22)');
    moonGlow.addColorStop(0.5, 'rgba(65, 80, 108, 0.08)');
    moonGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = moonGlow;
    ctx.fillRect(0, 0, w, h);

    var emberGlow = ctx.createRadialGradient(w * 0.48, h * 0.78, 12, w * 0.48, h * 0.78, w * 0.5);
    emberGlow.addColorStop(0, 'rgba(190, 92, 24, 0.16)');
    emberGlow.addColorStop(0.6, 'rgba(120, 48, 12, 0.05)');
    emberGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = emberGlow;
    ctx.fillRect(0, 0, w, h);

    // 2. Back charred timber wall (left to right-center)
    var wallLeft = w * 0.04;
    var wallRight = w * 0.78;
    var wallTop = h * 0.12;
    var floorY = h * 0.65;

    ctx.fillStyle = '#181617';
    ctx.fillRect(wallLeft, wallTop, wallRight - wallLeft, floorY - wallTop);

    // Horizontal charred logs/planks
    var plankCount = 11;
    var plankH = (floorY - wallTop) / plankCount;
    for (i = 0; i < plankCount; i++) {
      var py = wallTop + i * plankH;
      var tone = 18 + Math.floor(rand() * 14);
      ctx.fillStyle = 'rgb(' + (tone + 4) + ',' + (tone + 1) + ',' + tone + ')';
      ctx.fillRect(wallLeft, py, wallRight - wallLeft, plankH - 1.5);

      // Alligatoring char texture streaks
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.55)';
      ctx.lineWidth = 1;
      for (var s = 0; s < 14; s++) {
        var sx = wallLeft + rand() * (wallRight - wallLeft);
        var sw = 18 + rand() * 55;
        ctx.beginPath();
        ctx.moveTo(sx, py + rand() * plankH);
        ctx.lineTo(sx + sw, py + rand() * plankH);
        ctx.stroke();
      }
    }

    // Soot smoke plumes along upper wall
    for (i = 0; i < 16; i++) {
      var gx = wallLeft + rand() * (wallRight - wallLeft);
      var gy = wallTop + rand() * (floorY - wallTop) * 0.65;
      var gr = 35 + rand() * 70;
      var soot = ctx.createRadialGradient(gx, gy, 4, gx, gy, gr);
      soot.addColorStop(0, 'rgba(5, 5, 6, 0.62)');
      soot.addColorStop(1, 'rgba(5, 5, 6, 0)');
      ctx.fillStyle = soot;
      ctx.beginPath();
      ctx.arc(gx, gy, gr, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Burned wooden floor perspective plane
    var floorGrad = ctx.createLinearGradient(0, floorY, 0, h);
    floorGrad.addColorStop(0, '#171514');
    floorGrad.addColorStop(0.5, '#1d1917');
    floorGrad.addColorStop(1, '#0e0c0b');
    ctx.fillStyle = floorGrad;
    ctx.beginPath();
    ctx.moveTo(0, floorY);
    ctx.lineTo(w * 0.80, floorY);
    ctx.lineTo(w * 0.72, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    // Floorboard perspective lines
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.52)';
    ctx.lineWidth = 1.4;
    for (i = 0; i < 12; i++) {
      var t = i / 11;
      ctx.beginPath();
      ctx.moveTo(w * (0.02 + t * 0.75), floorY);
      ctx.lineTo(w * (-0.08 + t * 0.85), h);
      ctx.stroke();
    }

    // Scattered ash piles on floor
    for (i = 0; i < 90; i++) {
      ctx.fillStyle = 'rgba(135, 130, 125, ' + (0.04 + rand() * 0.1).toFixed(3) + ')';
      ctx.beginPath();
      ctx.ellipse(
        w * (0.05 + rand() * 0.72),
        floorY + rand() * (h - floorY),
        4 + rand() * 20,
        2 + rand() * 7,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // 4. Exterior porch yard & dark bushes on right side
    var yardGrad = ctx.createLinearGradient(w * 0.76, h * 0.35, w, h);
    yardGrad.addColorStop(0, '#0a0d12');
    yardGrad.addColorStop(1, '#0c100d');
    ctx.fillStyle = yardGrad;
    ctx.fillRect(w * 0.78, h * 0.12, w * 0.22, h * 0.88);

    // Porch railing post separating house & yard
    ctx.fillStyle = '#141211';
    ctx.fillRect(w * 0.765, h * 0.14, w * 0.028, h * 0.72);
    ctx.strokeStyle = 'rgba(120, 95, 70, 0.18)';
    ctx.strokeRect(w * 0.765, h * 0.14, w * 0.028, h * 0.72);

    // 5. Roof rafters & charred ceiling beams
    ctx.save();
    ctx.fillStyle = '#131110';
    // Horizontal main tie beam
    ctx.fillRect(0, h * 0.16, w * 0.88, h * 0.085);
    // Diagonal rafters
    var rafters = [0.14, 0.34, 0.56, 0.74];
    for (i = 0; i < rafters.length; i++) {
      ctx.beginPath();
      ctx.moveTo(w * rafters[i], 0);
      ctx.lineTo(w * (rafters[i] + 0.05), 0);
      ctx.lineTo(w * (rafters[i] - 0.03), h * 0.24);
      ctx.lineTo(w * (rafters[i] - 0.08), h * 0.24);
      ctx.closePath();
      ctx.fill();
    }
    // Wood grain cracks on main beam
    ctx.strokeStyle = 'rgba(180, 145, 110, 0.14)';
    ctx.lineWidth = 1;
    for (i = 0; i < 24; i++) {
      var bx = rand() * w * 0.86;
      var by = h * 0.165 + rand() * h * 0.075;
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(bx + 25 + rand() * 55, by + (rand() - 0.5) * 4);
      ctx.stroke();
    }
    ctx.restore();

    // 6. Draw forensic details mapped directly to each point coordinate
    function getPt(kind, fallbackX, fallbackY) {
      for (var k = 0; k < points.length; k++) {
        if (points[k].kind === kind || points[k].id === kind) {
          return { x: points[k].x * w, y: points[k].y * h, found: true };
        }
      }
      return { x: fallbackX * w, y: fallbackY * h, found: false };
    }

    // 6a. Electrical Breaker Panel (обгорел снаружи)
    var pPanel = getPt('panel', 0.16, 0.38);
    ctx.save();
    var pw = w * 0.095;
    var ph = h * 0.165;
    // External soot halo blowing around casing
    var halo = ctx.createRadialGradient(pPanel.x, pPanel.y, pw * 0.2, pPanel.x, pPanel.y, pw * 1.35);
    halo.addColorStop(0, 'rgba(10, 10, 10, 0.85)');
    halo.addColorStop(1, 'rgba(10, 10, 10, 0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(pPanel.x, pPanel.y, pw * 1.35, 0, Math.PI * 2);
    ctx.fill();
    // Metal cabinet body
    ctx.fillStyle = '#252930';
    ctx.fillRect(pPanel.x - pw / 2, pPanel.y - ph / 2, pw, ph);
    // Scorched outside door flap slightly ajar
    ctx.fillStyle = '#181a1f';
    ctx.fillRect(pPanel.x - pw / 2 + 4, pPanel.y - ph / 2 + 4, pw - 8, ph - 8);
    ctx.strokeStyle = '#525866';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(pPanel.x - pw / 2, pPanel.y - ph / 2, pw, ph);
    // Intact copper & blue wires inside (clue: burned externally, not short circuit)
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(pPanel.x - pw * 0.2, pPanel.y - ph * 0.32);
    ctx.lineTo(pPanel.x - pw * 0.2, pPanel.y + ph * 0.32);
    ctx.stroke();
    ctx.strokeStyle = '#38bdf8';
    ctx.beginPath();
    ctx.moveTo(pPanel.x + pw * 0.12, pPanel.y - ph * 0.3);
    ctx.lineTo(pPanel.x + pw * 0.12, pPanel.y + ph * 0.3);
    ctx.stroke();
    // Breakers row
    ctx.fillStyle = '#3f4552';
    for (i = 0; i < 3; i++) {
      ctx.fillRect(pPanel.x - pw * 0.3 + i * (pw * 0.22), pPanel.y - 6, pw * 0.16, 14);
    }
    // High voltage lightning triangle (partially blistered)
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.55)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(pPanel.x, pPanel.y - ph * 0.34);
    ctx.lineTo(pPanel.x + 8, pPanel.y - ph * 0.2);
    ctx.lineTo(pPanel.x - 8, pPanel.y - ph * 0.2);
    ctx.closePath();
    ctx.stroke();
    // Conduit pipe going up
    ctx.fillStyle = '#323741';
    ctx.fillRect(pPanel.x - 3, wallTop, 6, pPanel.y - ph / 2 - wallTop);
    ctx.restore();

    // 6b. Splintered Door Frame & Crowbar Pry Marks
    var pDoor = getPt('door', 0.43, 0.47);
    ctx.save();
    var dw = w * 0.17;
    var dh = h * 0.41;
    var dx = pDoor.x - dw * 0.5;
    var dy = floorY - dh;
    // Dark hallway beyond door
    ctx.fillStyle = '#060709';
    ctx.fillRect(dx, dy, dw, dh);
    // Heavy wooden jamb
    ctx.strokeStyle = '#2d241f';
    ctx.lineWidth = 9;
    ctx.strokeRect(dx, dy, dw, dh);
    // Partially broken door panel hanging askew
    ctx.fillStyle = '#231c18';
    ctx.beginPath();
    ctx.moveTo(dx + 4, dy + 4);
    ctx.lineTo(dx + dw * 0.72, dy + 10);
    ctx.lineTo(dx + dw * 0.68, dy + dh - 2);
    ctx.lineTo(dx + 4, dy + dh - 2);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#3b2f28';
    ctx.lineWidth = 1.4;
    ctx.stroke();
    // Lock plate & bright metallic pry-bar gouges right around pDoor
    ctx.fillStyle = '#7c8594';
    ctx.fillRect(pDoor.x + dw * 0.14, pDoor.y - 14, 9, 28);
    // Fresh pale wood splinters & steel scrape marks from crowbar
    ctx.strokeStyle = '#d6b48c';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pDoor.x + dw * 0.08, pDoor.y - 16);
    ctx.lineTo(pDoor.x + dw * 0.21, pDoor.y - 5);
    ctx.moveTo(pDoor.x + dw * 0.06, pDoor.y + 4);
    ctx.lineTo(pDoor.x + dw * 0.22, pDoor.y + 13);
    ctx.moveTo(pDoor.x + dw * 0.10, pDoor.y - 2);
    ctx.lineTo(pDoor.x + dw * 0.19, pDoor.y + 3);
    ctx.stroke();
    // Bent brass latch
    ctx.fillStyle = '#c98a2e';
    ctx.fillRect(pDoor.x + dw * 0.16, pDoor.y - 3, 12, 6);
    ctx.restore();

    // 6c. Three Arson Floor Char Craters (Три очага прогара)
    var pFloor = getPt('floor', 0.54, 0.80);
    ctx.save();
    var craters = [
      { ox: -w * 0.09, oy: -h * 0.015, rx: w * 0.055, ry: h * 0.036 },
      { ox: 0, oy: h * 0.025, rx: w * 0.062, ry: h * 0.042 },
      { ox: w * 0.09, oy: -h * 0.02, rx: w * 0.052, ry: h * 0.034 }
    ];
    for (i = 0; i < craters.length; i++) {
      var c = craters[i];
      var cx = pFloor.x + c.ox;
      var cy = pFloor.y + c.oy;
      var cg = ctx.createRadialGradient(cx, cy, 2, cx, cy, c.rx);
      cg.addColorStop(0, 'rgba(3, 3, 3, 0.96)');
      cg.addColorStop(0.55, 'rgba(20, 14, 12, 0.9)');
      cg.addColorStop(0.82, 'rgba(145, 130, 118, 0.36)');
      cg.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.ellipse(cx, cy, c.rx, c.ry, 0, 0, Math.PI * 2);
      ctx.fill();

      // Subtle glowing ember ring / ash crack inside crater
      ctx.strokeStyle = 'rgba(201, 138, 46, 0.32)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.ellipse(cx, cy, c.rx * 0.55, c.ry * 0.55, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // 6d. Deformed Bullet Embedded in Charred Ceiling Beam
    var pBeam = getPt('beam', 0.72, 0.21);
    ctx.save();
    // Impact splinter crater in beam
    ctx.fillStyle = '#080707';
    ctx.beginPath();
    ctx.ellipse(pBeam.x, pBeam.y, 13, 10, -0.2, 0, Math.PI * 2);
    ctx.fill();
    // Radiating light wood splinters
    ctx.strokeStyle = 'rgba(186, 152, 112, 0.65)';
    ctx.lineWidth = 1.3;
    for (i = 0; i < 6; i++) {
      var ang = (i / 6) * Math.PI * 2 + 0.3;
      ctx.beginPath();
      ctx.moveTo(pBeam.x + Math.cos(ang) * 7, pBeam.y + Math.sin(ang) * 5);
      ctx.lineTo(pBeam.x + Math.cos(ang) * 18, pBeam.y + Math.sin(ang) * 12);
      ctx.stroke();
    }
    // Metallic copper-jacketed bullet base glinting inside hole
    var bGrad = ctx.createRadialGradient(pBeam.x - 2, pBeam.y - 2, 1, pBeam.x, pBeam.y, 7.5);
    bGrad.addColorStop(0, '#fde68a');
    bGrad.addColorStop(0.55, '#c98a2e');
    bGrad.addColorStop(1, '#5c3712');
    ctx.fillStyle = bGrad;
    ctx.beginPath();
    ctx.arc(pBeam.x, pBeam.y, 6.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 6e. Partially Melted Fuel Canister in Bushes
    var pCan = getPt('canister', 0.86, 0.74);
    ctx.save();
    // Background bush silhouettes
    ctx.fillStyle = '#0f1712';
    for (i = 0; i < 7; i++) {
      ctx.beginPath();
      ctx.arc(pCan.x + (i - 3) * 18, pCan.y - 10 + (i % 2) * 16, 22 + (i % 3) * 7, 0, Math.PI * 2);
      ctx.fill();
    }
    // Red/rusty fuel jerrycan tilted on ground
    ctx.save();
    ctx.translate(pCan.x, pCan.y);
    ctx.rotate(-0.24);
    ctx.fillStyle = '#7f1d1d';
    ctx.fillRect(-18, -14, 34, 28);
    ctx.strokeStyle = '#b91c1c';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-18, -14, 34, 28);
    // Stamped X indentation on jerrycan
    ctx.strokeStyle = 'rgba(248, 113, 113, 0.42)';
    ctx.beginPath();
    ctx.moveTo(-12, -8);
    ctx.lineTo(10, 8);
    ctx.moveTo(10, -8);
    ctx.lineTo(-12, 8);
    ctx.stroke();
    // Handle & cap spout
    ctx.fillStyle = '#450a0a';
    ctx.fillRect(-14, -20, 22, 6);
    ctx.fillStyle = '#d97706';
    ctx.fillRect(9, -20, 7, 6);
    ctx.restore();
    // Foreground thorny branches partially concealing canister
    ctx.strokeStyle = '#1d2b21';
    ctx.lineWidth = 2.2;
    for (i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(pCan.x - 36 + i * 14, pCan.y + 30);
      ctx.quadraticCurveTo(pCan.x - 16 + i * 8, pCan.y - 2, pCan.x - 24 + i * 15, pCan.y - 28);
      ctx.stroke();
    }
    ctx.restore();

    // 7. Draw subtle clue markers for any custom points not matching default kinds
    for (i = 0; i < points.length; i++) {
      var pt = points[i];
      if (
        pt.kind !== 'panel' &&
        pt.kind !== 'door' &&
        pt.kind !== 'floor' &&
        pt.kind !== 'beam' &&
        pt.kind !== 'canister' &&
        pt.id !== 'panel' &&
        pt.id !== 'door' &&
        pt.id !== 'floor' &&
        pt.id !== 'beam' &&
        pt.id !== 'canister'
      ) {
        var cxCustom = pt.x * w;
        var cyCustom = pt.y * h;
        ctx.save();
        ctx.fillStyle = 'rgba(201, 138, 46, 0.25)';
        ctx.beginPath();
        ctx.arc(cxCustom, cyCustom, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(230, 195, 130, 0.45)';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(cxCustom, cyCustom, 5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
  function initCrimeCamera(containerEl, config, callbacks) {
    config = config || {};
    var timers = createTimerBag();
    var listeners = createListenerBag();
    var triggerWin = createWinTrigger(callbacks);
    var finished = false;

    var rawPoints =
      Array.isArray(config.points) && config.points.length > 0
        ? config.points
        : DEFAULT_CAMERA_POINTS;

    var points = rawPoints.map(function (p, idx) {
      return {
        id: p.id || 'pt_' + idx,
        label: p.label || 'Улика #' + (idx + 1),
        shortLabel: p.shortLabel || (p.label ? p.label.split(' ')[0].toUpperCase().slice(0, 9) : 'УЛИКА ' + (idx + 1)),
        x: clamp(typeof p.x === 'number' ? p.x : 0.2 + idx * 0.15, 0.08, 0.92),
        y: clamp(typeof p.y === 'number' ? p.y : 0.5, 0.1, 0.9),
        focusTarget: clamp(typeof p.focusTarget === 'number' ? p.focusTarget : 50, 8, 92),
        kind: p.kind || p.id || 'custom',
        captured: false
      };
    });

    var shell = createShell(containerEl, {
      title: config.title || 'Осмотр места: Пепелище',
      subtitle: config.subtitle || 'ДЕЛО №418 • ФОТОФИКСАЦИЯ УЛИК',
      extraClass: 'mg-cam-wrap'
    });

    listeners.on(shell.cancelBtn, 'click', function () {
      haptic('light');
      sfx('click');
      triggerCancel(callbacks);
    });

    // Stage canvas
    var stage = document.createElement('div');
    stage.className = 'mg-for-stage mg-cam-stage';
    var canvas = document.createElement('canvas');
    canvas.className = 'mg-for-canvas';
    stage.appendChild(canvas);
    shell.body.appendChild(stage);

    // Status bar
    var statusEl = document.createElement('div');
    statusEl.className = 'mg-for-status';
    var statusText = document.createElement('span');
    statusText.textContent = 'Наведите видоискатель на подозрительный участок';
    var countBadge = document.createElement('span');
    countBadge.className = 'mg-for-value';
    countBadge.textContent = '0 / ' + points.length;
    statusEl.appendChild(statusText);
    statusEl.appendChild(countBadge);
    shell.body.appendChild(statusEl);

    // Controls panel
    var panel = document.createElement('div');
    panel.className = 'mg-for-panel';

    var sliderWrap = document.createElement('div');
    sliderWrap.className = 'mg-for-slider-wrap';
    var sliderRow = document.createElement('div');
    sliderRow.className = 'mg-for-row';
    var sliderLabel = document.createElement('span');
    sliderLabel.className = 'mg-for-label';
    sliderLabel.textContent = 'РЕЗКОСТЬ / ФОКУС';
    var sliderVal = document.createElement('span');
    sliderVal.className = 'mg-for-value';
    sliderVal.textContent = '50% • 2.5м';
    sliderRow.appendChild(sliderLabel);
    sliderRow.appendChild(sliderVal);

    var focusSlider = document.createElement('input');
    focusSlider.type = 'range';
    focusSlider.className = 'mg-for-slider';
    focusSlider.min = '0';
    focusSlider.max = '100';
    focusSlider.step = '1';
    focusSlider.value = '50';

    sliderWrap.appendChild(sliderRow);
    sliderWrap.appendChild(focusSlider);
    panel.appendChild(sliderWrap);

    var shootBtn = document.createElement('button');
    shootBtn.type = 'button';
    shootBtn.className = 'mg-for-btn';
    shootBtn.textContent = 'СНЯТЬ КАДР';
    shootBtn.disabled = true;
    panel.appendChild(shootBtn);

    shell.body.appendChild(panel);

    // Filmstrip thumbnails
    var strip = document.createElement('div');
    strip.className = 'mg-cam-strip';
    strip.style.gridTemplateColumns = 'repeat(' + Math.min(points.length, 5) + ', 1fr)';

    var slotEls = [];
    for (var i = 0; i < points.length; i++) {
      var slot = document.createElement('div');
      slot.className = 'mg-cam-slot';

      var thumbBox = document.createElement('div');
      thumbBox.className = 'mg-cam-thumb-box';

      var thumbCanvas = document.createElement('canvas');
      thumbCanvas.className = 'mg-cam-thumb-canvas';
      thumbCanvas.width = 96;
      thumbCanvas.height = 72;

      var num = document.createElement('span');
      num.className = 'mg-cam-slot-num';
      num.textContent = '#0' + (i + 1);

      thumbBox.appendChild(thumbCanvas);
      thumbBox.appendChild(num);

      var lbl = document.createElement('div');
      lbl.className = 'mg-cam-slot-lbl';
      lbl.textContent = '???';

      slot.appendChild(thumbBox);
      slot.appendChild(lbl);
      strip.appendChild(slot);
      slotEls.push({ slot: slot, canvas: thumbCanvas, label: lbl });
    }
    shell.body.appendChild(strip);

    // Offscreen scene buffer + blur scratch canvas
    var sceneCanvas = document.createElement('canvas');
    sceneCanvas.width = 960;
    sceneCanvas.height = 720;
    drawProceduralAshScene(sceneCanvas, points);

    var blurCanvas = document.createElement('canvas');
    blurCanvas.width = 240;
    blurCanvas.height = 180;
    var blurCtx = blurCanvas.getContext('2d');

    // Optional external bgImage with graceful fallback
    var bgLoaded = false;
    var bgImg = null;
    if (config.bgImage && typeof config.bgImage === 'string') {
      bgImg = new Image();
      bgImg.onload = function () {
        if (timers.isCleared()) return;
        var sctx = sceneCanvas.getContext('2d');
        sctx.clearRect(0, 0, sceneCanvas.width, sceneCanvas.height);
        // Cover-fit image cleanly
        var sw = bgImg.naturalWidth || bgImg.width;
        var sh = bgImg.naturalHeight || bgImg.height;
        if (sw > 0 && sh > 0) {
          var scale = Math.max(sceneCanvas.width / sw, sceneCanvas.height / sh);
          var dw = sw * scale;
          var dh = sh * scale;
          sctx.drawImage(bgImg, (sceneCanvas.width - dw) / 2, (sceneCanvas.height - dh) / 2, dw, dh);
          bgLoaded = true;
        }
      };
      bgImg.onerror = function () {
        bgLoaded = false;
      };
      bgImg.src = config.bgImage;
    }

    // Floating embers for noir atmosphere
    var embers = [];
    var emberRand = mulberry32(41899);
    for (var e = 0; e < 24; e++) {
      embers.push({
        x: emberRand(),
        y: emberRand(),
        vy: 0.012 + emberRand() * 0.025,
        vx: (emberRand() - 0.5) * 0.012,
        r: 0.8 + emberRand() * 1.6,
        alpha: 0.25 + emberRand() * 0.55
      });
    }

    // Camera state
    var retX = 0.5;
    var retY = 0.5;
    var targetRetX = 0.5;
    var targetRetY = 0.5;
    var focusValue = 50;
    var dragging = false;
    var activePoint = null;
    var currentSharpness = 0;
    var wasLocked = false;
    var flashAlpha = 0;
    var shutterClose = 0;
    var lastFrameTime = performance.now();

    var canvasMgr = setupResponsiveCanvas(canvas, stage);

    function updatePointerPos(ev) {
      var rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      targetRetX = clamp((ev.clientX - rect.left) / rect.width, 0.12, 0.88);
      targetRetY = clamp((ev.clientY - rect.top) / rect.height, 0.14, 0.86);
    }

    listeners.on(canvas, 'pointerdown', function (ev) {
      if (finished) return;
      dragging = true;
      try {
        canvas.setPointerCapture(ev.pointerId);
      } catch (err) {}
      updatePointerPos(ev);
    });

    listeners.on(canvas, 'pointermove', function (ev) {
      if (!dragging || finished) return;
      updatePointerPos(ev);
    });

    listeners.on(canvas, 'pointerup', function () {
      dragging = false;
    });
    listeners.on(canvas, 'pointercancel', function () {
      dragging = false;
    });

    listeners.on(focusSlider, 'input', function () {
      if (finished) return;
      focusValue = parseInt(focusSlider.value, 10) || 0;
      var distM = (0.4 + (focusValue / 100) * 4.2).toFixed(1);
      sliderVal.textContent = focusValue + '% • ' + distM + 'м';
    });

    function evaluateTarget() {
      var frameHalfW = 0.145;
      var frameHalfH = 0.175;
      var nearestDist = 999;
      var inFrame = null;
      var inFrameDist = 999;

      for (var k = 0; k < points.length; k++) {
        var pt = points[k];
        var dx = pt.x - retX;
        var dy = pt.y - retY;
        var d = Math.hypot(dx, dy);
        if (!pt.captured && d < nearestDist) {
          nearestDist = d;
        }
        if (Math.abs(dx) <= frameHalfW && Math.abs(dy) <= frameHalfH) {
          if (!inFrame || (!pt.captured && inFrame.captured) || (pt.captured === inFrame.captured && d < inFrameDist)) {
            inFrame = pt;
            inFrameDist = d;
          }
        }
      }

      activePoint = inFrame;

      // Compute sharpness (0..100)
      var idealFocus = inFrame ? inFrame.focusTarget : 50;
      var diff = Math.abs(focusValue - idealFocus);
      currentSharpness = clamp(Math.round(100 - diff * 2.35), 0, 100);

      // Proximity signal for uncaptured points (0..1)
      var signal = nearestDist >= 999 ? 0 : clamp(1 - nearestDist / 0.42, 0, 1);

      var canShoot = !!(inFrame && !inFrame.captured && currentSharpness > 85 && !finished);

      if (canShoot && !wasLocked) {
        haptic('light');
        sfx('scan');
      }
      wasLocked = canShoot;

      shootBtn.disabled = !canShoot;
      if (canShoot) {
        shootBtn.classList.add('is-ready');
      } else {
        shootBtn.classList.remove('is-ready');
      }

      // Status bar feedback
      if (finished) {
        statusEl.className = 'mg-for-status is-ok';
        statusText.textContent = 'Все улики зафиксированы. Передача в протокол...';
      } else if (inFrame && inFrame.captured) {
        statusEl.className = 'mg-for-status is-ok';
        statusText.textContent = 'Уже снято: ' + inFrame.label;
      } else if (inFrame && !inFrame.captured) {
        if (currentSharpness > 85) {
          statusEl.className = 'mg-for-status is-ok';
          statusText.textContent = 'Фокус пойман (' + currentSharpness + '%) — нажмите «СНЯТЬ КАДР»';
        } else {
          statusEl.className = 'mg-for-status is-warn';
          statusText.textContent = 'Объект в кадре! Настройте резкость (' + currentSharpness + '%)';
        }
      } else if (signal > 0.55) {
        statusEl.className = 'mg-for-status is-warn';
        statusText.textContent = 'Сильный сигнал автофокуса — объект совсем рядом';
      } else if (signal > 0.2) {
        statusEl.className = 'mg-for-status';
        statusText.textContent = 'Слабый отклик автофокуса — осмотрите участок вокруг';
      } else {
        statusEl.className = 'mg-for-status';
        statusText.textContent = 'Водите видоискателем по сцене в поисках улик';
      }

      return { signal: signal, canShoot: canShoot, inFrame: inFrame };
    }

    function captureCurrentEvidence() {
      if (finished || !activePoint || activePoint.captured || currentSharpness <= 85) return;

      var pt = activePoint;
      pt.captured = true;
      flashAlpha = 1;
      shutterClose = 1;
      haptic('medium');
      sfx('click');

      // Render crisp thumbnail into filmstrip slot
      var idx = points.indexOf(pt);
      if (idx !== -1 && slotEls[idx]) {
        var slotObj = slotEls[idx];
        var tCtx = slotObj.canvas.getContext('2d');
        var cropW = sceneCanvas.width * 0.25;
        var cropH = sceneCanvas.height * 0.25;
        var sx = clamp(pt.x * sceneCanvas.width - cropW / 2, 0, sceneCanvas.width - cropW);
        var sy = clamp(pt.y * sceneCanvas.height - cropH / 2, 0, sceneCanvas.height - cropH);
        tCtx.drawImage(sceneCanvas, sx, sy, cropW, cropH, 0, 0, slotObj.canvas.width, slotObj.canvas.height);
        // Subtle forensic corner frame on thumbnail
        tCtx.strokeStyle = 'rgba(34, 197, 94, 0.8)';
        tCtx.lineWidth = 2;
        tCtx.strokeRect(2, 2, slotObj.canvas.width - 4, slotObj.canvas.height - 4);
        slotObj.slot.classList.add('is-captured');
        slotObj.label.textContent = pt.shortLabel;
        slotObj.slot.title = pt.label;
      }

      var capturedCount = 0;
      for (var k = 0; k < points.length; k++) {
        if (points[k].captured) capturedCount++;
      }
      countBadge.textContent = capturedCount + ' / ' + points.length;
      if (capturedCount === points.length) {
        countBadge.classList.add('is-ok');
        finished = true;
        shootBtn.disabled = true;
        shootBtn.classList.remove('is-ready');
        statusEl.className = 'mg-for-status is-ok';
        statusText.textContent = 'Снято: ' + pt.label + ' — протокол готов!';
        timers.setTimeout(function () {
          haptic('success');
          sfx('success');
          triggerWin({
            minigame: 'crime_camera',
            captured: points.map(function (item) {
              return { id: item.id, label: item.label };
            })
          });
        }, 900);
      } else {
        statusEl.className = 'mg-for-status is-ok';
        statusText.textContent = 'Зафиксировано: ' + pt.label;
      }
    }

    listeners.on(shootBtn, 'click', captureCurrentEvidence);

    function render(now) {
      var dt = Math.min((now - lastFrameTime) / 1000, 0.05);
      lastFrameTime = now;

      // Smooth viewfinder glide
      retX = lerp(retX, targetRetX, Math.min(1, dt * 16));
      retY = lerp(retY, targetRetY, Math.min(1, dt * 16));

      var state = evaluateTarget();
      var metrics = canvasMgr.getMetrics();
      var w = metrics.width;
      var h = metrics.height;
      var dpr = metrics.dpr;
      var ctx = canvas.getContext('2d');

      ctx.save();
      ctx.scale(dpr, dpr);

      // 1. Base scene (dimmed slightly outside viewfinder)
      ctx.drawImage(sceneCanvas, 0, 0, w, h);

      // Animated subtle floating embers
      for (var e = 0; e < embers.length; e++) {
        var em = embers[e];
        em.y -= em.vy * dt;
        em.x += em.vx * dt + Math.sin(now * 0.002 + e) * 0.004 * dt;
        if (em.y < -0.02) {
          em.y = 1.02;
          em.x = (em.x + 0.37) % 1;
        }
        ctx.fillStyle = 'rgba(245, 158, 11, ' + em.alpha.toFixed(2) + ')';
        ctx.beginPath();
        ctx.arc(em.x * w, em.y * h, em.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Subtle captured pin icons for already photographed clues
      for (var p = 0; p < points.length; p++) {
        var pt = points[p];
        if (pt.captured) {
          var px = pt.x * w;
          var py = pt.y * h;
          ctx.strokeStyle = 'rgba(34, 197, 94, 0.75)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(px, py, 8, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = '#22c55e';
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Viewfinder geometry
      var vfW = w * 0.44;
      var vfH = h * 0.48;
      var vfX = clamp(retX * w - vfW / 2, 10, w - vfW - 10);
      var vfY = clamp(retY * h - vfH / 2, 10, h - vfH - 10);

      // Dark matte outside viewfinder
      ctx.fillStyle = 'rgba(6, 8, 11, 0.56)';
      ctx.beginPath();
      ctx.rect(0, 0, w, h);
      ctx.rect(vfX, vfY, vfW, vfH);
      ctx.fill('evenodd');

      // 2. Magnified & optical-focus-simulated view inside viewfinder
      ctx.save();
      ctx.beginPath();
      ctx.rect(vfX, vfY, vfW, vfH);
      ctx.clip();

      var zoom = 1.32;
      var srcW = (vfW / w) * sceneCanvas.width / zoom;
      var srcH = (vfH / h) * sceneCanvas.height / zoom;
      var srcX = clamp(retX * sceneCanvas.width - srcW / 2, 0, sceneCanvas.width - srcW);
      var srcY = clamp(retY * sceneCanvas.height - srcH / 2, 0, sceneCanvas.height - srcH);

      var defocus = clamp((100 - currentSharpness) / 100, 0, 1);

      if (defocus > 0.06) {
        // Cross-platform smooth optical defocus via downscale-upscale + chromatic double contour
        var downScale = lerp(0.55, 0.11, defocus);
        var bw = Math.max(14, Math.round(vfW * downScale));
        var bh = Math.max(10, Math.round(vfH * downScale));
        blurCtx.clearRect(0, 0, blurCanvas.width, blurCanvas.height);
        blurCtx.imageSmoothingEnabled = true;
        blurCtx.drawImage(sceneCanvas, srcX, srcY, srcW, srcH, 0, 0, bw, bh);

        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(blurCanvas, 0, 0, bw, bh, vfX, vfY, vfW, vfH);

        // Optical double-contour ghosting proportional to defocus
        var shift = defocus * 7.5;
        ctx.globalAlpha = 0.24 * defocus;
        ctx.drawImage(blurCanvas, 0, 0, bw, bh, vfX - shift, vfY - shift * 0.4, vfW, vfH);
        ctx.drawImage(blurCanvas, 0, 0, bw, bh, vfX + shift, vfY + shift * 0.4, vfW, vfH);
        ctx.globalAlpha = 1;
      } else {
        // Crisp sharp optical view
        ctx.drawImage(sceneCanvas, srcX, srcY, srcW, srcH, vfX, vfY, vfW, vfH);
      }

      // Slight cool tactical lens tint inside viewfinder
      ctx.fillStyle = 'rgba(18, 28, 38, 0.08)';
      ctx.fillRect(vfX, vfY, vfW, vfH);

      // Subtle forensic target lock reticle around clue ONLY when inside frame & sharpness rising
      if (state.inFrame && !state.inFrame.captured && currentSharpness > 45) {
        var lockAlpha = clamp((currentSharpness - 45) / 45, 0, 1);
        var relX = ((state.inFrame.x * sceneCanvas.width - srcX) / srcW) * vfW + vfX;
        var relY = ((state.inFrame.y * sceneCanvas.height - srcY) / srcH) * vfH + vfY;
        var boxR = lerp(34, 20, lockAlpha);
        ctx.strokeStyle =
          currentSharpness > 85
            ? 'rgba(34, 197, 94, ' + (0.65 + 0.35 * Math.sin(now * 0.01)) + ')'
            : 'rgba(245, 158, 11, ' + (0.55 * lockAlpha) + ')';
        ctx.lineWidth = 1.6;
        ctx.setLineDash([6, 4]);
        ctx.strokeRect(relX - boxR, relY - boxR, boxR * 2, boxR * 2);
        ctx.setLineDash([]);
      }

      // Rule of thirds grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(vfX + vfW / 3, vfY);
      ctx.lineTo(vfX + vfW / 3, vfY + vfH);
      ctx.moveTo(vfX + (vfW * 2) / 3, vfY);
      ctx.lineTo(vfX + (vfW * 2) / 3, vfY + vfH);
      ctx.moveTo(vfX, vfY + vfH / 3);
      ctx.lineTo(vfX + vfW, vfY + vfH / 3);
      ctx.moveTo(vfX, vfY + (vfH * 2) / 3);
      ctx.lineTo(vfX + vfW, vfY + (vfH * 2) / 3);
      ctx.stroke();

      // Center crosshair
      var cx = vfX + vfW / 2;
      var cy = vfY + vfH / 2;
      ctx.strokeStyle = state.canShoot ? 'rgba(34, 197, 94, 0.9)' : 'rgba(245, 158, 11, 0.72)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(cx - 10, cy);
      ctx.lineTo(cx - 3, cy);
      ctx.moveTo(cx + 3, cy);
      ctx.lineTo(cx + 10, cy);
      ctx.moveTo(cx, cy - 10);
      ctx.lineTo(cx, cy - 3);
      ctx.moveTo(cx, cy + 3);
      ctx.lineTo(cx, cy + 10);
      ctx.stroke();

      // Shutter mechanical blades blink
      if (shutterClose > 0.01) {
        var bladeH = (vfH / 2) * shutterClose;
        ctx.fillStyle = '#050608';
        ctx.fillRect(vfX, vfY, vfW, bladeH);
        ctx.fillRect(vfX, vfY + vfH - bladeH, vfW, bladeH);
        shutterClose = Math.max(0, shutterClose - dt * 6.5);
      }

      ctx.restore();

      // 3. Viewfinder corner brackets & outline
      var frameColor = state.canShoot
        ? '#22c55e'
        : state.inFrame && !state.inFrame.captured
        ? '#f59e0b'
        : state.signal > 0.45
        ? '#c98a2e'
        : '#6b7280';

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.strokeRect(vfX, vfY, vfW, vfH);

      var br = 14;
      ctx.strokeStyle = frameColor;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      // TL
      ctx.moveTo(vfX, vfY + br);
      ctx.lineTo(vfX, vfY);
      ctx.lineTo(vfX + br, vfY);
      // TR
      ctx.moveTo(vfX + vfW - br, vfY);
      ctx.lineTo(vfX + vfW, vfY);
      ctx.lineTo(vfX + vfW, vfY + br);
      // BR
      ctx.moveTo(vfX + vfW, vfY + vfH - br);
      ctx.lineTo(vfX + vfW, vfY + vfH);
      ctx.lineTo(vfX + vfW - br, vfY + vfH);
      // BL
      ctx.moveTo(vfX + br, vfY + vfH);
      ctx.lineTo(vfX, vfY + vfH);
      ctx.lineTo(vfX, vfY + vfH - br);
      ctx.stroke();

      // 4. Camera HUD overlays (top-left REC/ISO, top-right AF signal meter, bottom-left sharpness)
      ctx.font = '600 10px "IBM Plex Mono", monospace';
      ctx.textBaseline = 'top';
      ctx.fillStyle = 'rgba(229, 231, 235, 0.82)';
      ctx.fillText('SK-CAM 35MM • ISO 3200', 10, 8);

      // AF Signal Bar (top right)
      var bars = 7;
      var activeBars = Math.round(state.signal * bars);
      if (state.inFrame && !state.inFrame.captured) activeBars = bars;
      var barStartX = w - 10 - bars * 7;
      ctx.fillStyle = 'rgba(156, 163, 175, 0.85)';
      ctx.textAlign = 'right';
      ctx.fillText('AF', barStartX - 5, 8);
      ctx.textAlign = 'left';

      for (var b = 0; b < bars; b++) {
        var bhBar = 5 + b * 1.4;
        var isLit = b < activeBars;
        ctx.fillStyle = isLit
          ? state.canShoot
            ? '#22c55e'
            : b >= 5
            ? '#f59e0b'
            : '#c98a2e'
          : 'rgba(75, 85, 99, 0.45)';
        ctx.fillRect(barStartX + b * 7, 19 - bhBar, 4.5, bhBar);
      }

      // Sharpness bar under viewfinder
      var hudY = vfY + vfH + 5;
      if (hudY > h - 16) hudY = vfY - 14;
      ctx.fillStyle = state.canShoot ? '#4ade80' : '#f59e0b';
      ctx.font = '600 10px "IBM Plex Mono", monospace';
      var sharpLabel = state.canShoot
        ? 'FOCUS LOCK ' + currentSharpness + '%'
        : 'SHARP ' + currentSharpness + '%';
      ctx.fillText(sharpLabel, vfX, hudY);

      // White camera flash decay
      if (flashAlpha > 0.005) {
        ctx.fillStyle = 'rgba(255, 252, 245, ' + flashAlpha.toFixed(3) + ')';
        ctx.fillRect(0, 0, w, h);
        flashAlpha = Math.max(0, flashAlpha - dt * 2.9);
      }

      ctx.restore();

      timers.raf(render);
    }

    timers.raf(render);

    return function cleanup() {
      timers.clearAll();
      listeners.clearAll();
      canvasMgr.destroy();
      if (bgImg) {
        bgImg.onload = null;
        bgImg.onerror = null;
      }
      containerEl.innerHTML = '';
    };
  }

  // ============================================================================
  // MINIGAME 2: ballistics
  // ============================================================================

  var DEFAULT_BALLISTICS_CONFIG = {
    title: 'Баллистическая экспертиза',
    subtitle: 'ДЕЛО №418 • СРАВНИТЕЛЬНЫЙ МИКРОСКОП',
    caliberMm: 9.2,
    caliberOptions: [
      { id: '545', label: '5.45×18 ПСМ', isCorrect: false },
      { id: '762', label: '7.62×25 ТТ', isCorrect: false },
      { id: '918', label: '9×18 мм ПМ', isCorrect: true }
    ],
    samples: [
      {
        id: 'lro_041',
        code: 'ЛРО-041 • ПМ-Т #88412',
        meta: 'Частный стрелковый тир «Вымпел»',
        seed: 1041,
        slope: 0.16,
        grooveCount: 3,
        isMatch: false
      },
      {
        id: 'lro_119',
        code: 'ЛРО-119 • ИЖ-71 #КН-2094',
        meta: 'ЧОП «Гранит» • списан в 2021',
        seed: 2119,
        slope: -0.14,
        grooveCount: 4,
        isMatch: false
      },
      {
        id: 'lro_207',
        code: 'ЛРО-207 • ПМ #АЕ-4719',
        meta: 'Табельный ствол • числится в розыске',
        seed: 41807,
        slope: 0.13,
        grooveCount: 4,
        isMatch: true
      },
      {
        id: 'lro_388',
        code: 'ЛРО-388 • МР-79 #90315',
        meta: 'Изъято по делу №392 • склад вещдоков',
        seed: 3882,
        slope: 0.13,
        grooveCount: 5,
        isMatch: false
      }
    ]
  };

  function buildStriationPattern(seed, grooveCount, period) {
    var rand = mulberry32(seed);
    var grooves = [];
    var scratches = [];
    var i;

    for (i = 0; i < grooveCount; i++) {
      var base = (i / grooveCount) * period;
      grooves.push({
        y: (base + rand() * (period / grooveCount) * 0.28) % period,
        width: 11 + rand() * 11,
        darkness: 0.24 + rand() * 0.2
      });
    }

    for (i = 0; i < 46; i++) {
      scratches.push({
        y: rand() * period,
        width: 0.7 + rand() * 2.1,
        bright: rand() > 0.48,
        alpha: 0.18 + rand() * 0.56
      });
    }

    return { grooves: grooves, scratches: scratches, period: period };
  }

  function initBallistics(containerEl, config, callbacks) {
    config = config || {};
    var timers = createTimerBag();
    var listeners = createListenerBag();
    var triggerWin = createWinTrigger(callbacks);
    var finished = false;

    var caliberMm = typeof config.caliberMm === 'number' ? config.caliberMm : DEFAULT_BALLISTICS_CONFIG.caliberMm;
    var caliberOptions =
      Array.isArray(config.caliberOptions) && config.caliberOptions.length > 0
        ? config.caliberOptions
        : DEFAULT_BALLISTICS_CONFIG.caliberOptions;

    var rawSamples =
      Array.isArray(config.samples) && config.samples.length > 0
        ? config.samples
        : DEFAULT_BALLISTICS_CONFIG.samples;

    var PERIOD = 160;
    var matchIdx = -1;
    for (var sIdx = 0; sIdx < rawSamples.length; sIdx++) {
      if (rawSamples[sIdx].isMatch) {
        matchIdx = sIdx;
        break;
      }
    }
    if (typeof config.matchIndex === 'number' && rawSamples[config.matchIndex]) {
      matchIdx = config.matchIndex;
    }
    if (matchIdx === -1) matchIdx = 0;

    var evidenceSeed = rawSamples[matchIdx].seed || 41807;
    var evidenceSlope = typeof rawSamples[matchIdx].slope === 'number' ? rawSamples[matchIdx].slope : 0.13;
    var evidenceGrooves = rawSamples[matchIdx].grooveCount || 4;
    var evidencePattern = buildStriationPattern(evidenceSeed, evidenceGrooves, PERIOD);

    var samples = rawSamples.map(function (s, idx) {
      var isMatch = idx === matchIdx;
      var pat = isMatch
        ? evidencePattern
        : buildStriationPattern(s.seed || 1000 + idx * 777, s.grooveCount || (3 + (idx % 3)), PERIOD);
      return {
        id: s.id || 'sample_' + idx,
        code: s.code || 'ОБРАЗЕЦ ЛРО #' + (idx + 1),
        meta: s.meta || 'Контрольный отстрел картотеки',
        slope: isMatch ? evidenceSlope : typeof s.slope === 'number' ? s.slope : 0.15,
        isMatch: isMatch,
        pattern: pat
      };
    });

    // Hidden rotational offset for the matching sample (non-trivial offset so player actively aligns)
    var targetShiftPx = typeof config.targetShift === 'number' ? config.targetShift % PERIOD : 104;
    if (targetShiftPx < 25 || targetShiftPx > PERIOD - 25) targetShiftPx = 98;

    var shell = createShell(containerEl, {
      title: config.title || DEFAULT_BALLISTICS_CONFIG.title,
      subtitle: config.subtitle || DEFAULT_BALLISTICS_CONFIG.subtitle,
      extraClass: 'mg-bal-wrap'
    });

    listeners.on(shell.cancelBtn, 'click', function () {
      haptic('light');
      sfx('click');
      triggerCancel(callbacks);
    });

    // Step indicator bar
    var stepsRow = document.createElement('div');
    stepsRow.className = 'mg-bal-steps';
    var step1Badge = document.createElement('div');
    step1Badge.className = 'mg-bal-step is-active';
    step1Badge.textContent = '1. ЗАМЕР КАЛИБРА';
    var step2Badge = document.createElement('div');
    step2Badge.className = 'mg-bal-step';
    step2Badge.textContent = '2. СОВМЕЩЕНИЕ НАРЕЗОВ';
    stepsRow.appendChild(step1Badge);
    stepsRow.appendChild(step2Badge);
    shell.body.appendChild(stepsRow);

    // Canvas stage
    var stage = document.createElement('div');
    stage.className = 'mg-for-stage mg-bal-stage';
    var canvas = document.createElement('canvas');
    canvas.className = 'mg-for-canvas';
    stage.appendChild(canvas);
    shell.body.appendChild(stage);

    // Status message
    var statusEl = document.createElement('div');
    statusEl.className = 'mg-for-status';
    var statusText = document.createElement('span');
    statusText.textContent = 'Сведите губки штангенциркуля к стенкам пули и укажите калибр';
    statusEl.appendChild(statusText);
    shell.body.appendChild(statusEl);

    // Controls panel (dynamically swapped between Stage 1 and Stage 2)
    var panel1 = document.createElement('div');
    panel1.className = 'mg-for-panel';

    var calSliderWrap = document.createElement('div');
    calSliderWrap.className = 'mg-for-slider-wrap';
    var calRow = document.createElement('div');
    calRow.className = 'mg-for-row';
    var calLbl = document.createElement('span');
    calLbl.className = 'mg-for-label';
    calLbl.textContent = 'ШТАНГЕНЦИРКУЛЬ (ММ)';
    var calVal = document.createElement('span');
    calVal.className = 'mg-for-value';
    calVal.textContent = '13.6 мм';
    calRow.appendChild(calLbl);
    calRow.appendChild(calVal);

    var calSlider = document.createElement('input');
    calSlider.type = 'range';
    calSlider.className = 'mg-for-slider';
    calSlider.min = '4.0';
    calSlider.max = '14.5';
    calSlider.step = '0.1';
    calSlider.value = '13.6';
    calSliderWrap.appendChild(calRow);
    calSliderWrap.appendChild(calSlider);
    panel1.appendChild(calSliderWrap);

    var choicesGrid = document.createElement('div');
    choicesGrid.className = 'mg-bal-choices';
    var choiceBtns = [];
    for (var c = 0; c < caliberOptions.length; c++) {
      (function (opt) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'mg-for-btn-sec';
        btn.textContent = opt.label;
        listeners.on(btn, 'click', function () {
          handleCaliberChoice(opt, btn);
        });
        choicesGrid.appendChild(btn);
        choiceBtns.push(btn);
      })(caliberOptions[c]);
    }
    panel1.appendChild(choicesGrid);

    // Stage 2 panel
    var panel2 = document.createElement('div');
    panel2.className = 'mg-for-panel';
    panel2.style.display = 'none';

    var switcher = document.createElement('div');
    switcher.className = 'mg-bal-switcher';
    var prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'mg-bal-nav';
    prevBtn.textContent = '<';
    var dossier = document.createElement('div');
    dossier.className = 'mg-bal-dossier';
    var dossierCode = document.createElement('div');
    dossierCode.className = 'mg-bal-dossier-code';
    var dossierMeta = document.createElement('div');
    dossierMeta.className = 'mg-bal-dossier-meta';
    dossier.appendChild(dossierCode);
    dossier.appendChild(dossierMeta);
    var nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'mg-bal-nav';
    nextBtn.textContent = '>';
    switcher.appendChild(prevBtn);
    switcher.appendChild(dossier);
    switcher.appendChild(nextBtn);
    panel2.appendChild(switcher);

    var shiftWrap = document.createElement('div');
    shiftWrap.className = 'mg-for-slider-wrap';
    var shiftRow = document.createElement('div');
    shiftRow.className = 'mg-for-row';
    var shiftLbl = document.createElement('span');
    shiftLbl.className = 'mg-for-label';
    shiftLbl.textContent = 'СДВИГ / ПОВОРОТ ОСИ';
    var shiftVal = document.createElement('span');
    shiftVal.className = 'mg-for-value';
    shiftVal.textContent = '0°';
    shiftRow.appendChild(shiftLbl);
    shiftRow.appendChild(shiftVal);

    var shiftSlider = document.createElement('input');
    shiftSlider.type = 'range';
    shiftSlider.className = 'mg-for-slider';
    shiftSlider.min = '0';
    shiftSlider.max = String(PERIOD);
    shiftSlider.step = '0.5';
    shiftSlider.value = '0';
    shiftWrap.appendChild(shiftRow);
    shiftWrap.appendChild(shiftSlider);
    panel2.appendChild(shiftWrap);

    var confirmBtn = document.createElement('button');
    confirmBtn.type = 'button';
    confirmBtn.className = 'mg-for-btn';
    confirmBtn.textContent = 'ПОДТВЕРДИТЬ СОВПАДЕНИЕ';
    panel2.appendChild(confirmBtn);

    shell.body.appendChild(panel1);
    shell.body.appendChild(panel2);

    // Game state
    var stageNum = 1;
    var caliperMm = 13.6;
    var caliperLocked = false;
    var currentSampleIdx = 0;
    var shiftPx = 0;
    var redFlash = 0;
    var greenLock = 0;
    var draggingCanvas = false;
    var dragStartY = 0;
    var dragStartShift = 0;
    var lastTs = performance.now();

    var canvasMgr = setupResponsiveCanvas(canvas, stage);

    function updateDossierUI() {
      var smp = samples[currentSampleIdx];
      dossierCode.textContent = '[' + (currentSampleIdx + 1) + '/' + samples.length + '] ' + smp.code;
      dossierMeta.textContent = smp.meta;
    }
    updateDossierUI();

    function updateCaliperUI() {
      calSlider.value = caliperMm.toFixed(1);
      var diff = Math.abs(caliperMm - caliberMmTarget());
      var isTouching = diff <= 0.35;
      calVal.textContent = caliperMm.toFixed(1) + ' мм' + (isTouching ? ' [КОНТАКТ]' : '');
      calVal.className = 'mg-for-value' + (isTouching ? ' is-ok' : '');
      if (isTouching && !caliperLocked) {
        caliperLocked = true;
        haptic('light');
        sfx('scan');
        statusEl.className = 'mg-for-status is-ok';
        statusText.textContent = 'Замер: ' + caliperMm.toFixed(1) + ' мм — выберите калибр ниже';
      } else if (!isTouching) {
        caliperLocked = false;
      }
    }

    function caliberMmTarget() {
      return caliberMm;
    }

    function handleCaliberChoice(opt, btnEl) {
      if (stageNum !== 1 || finished) return;
      var diff = Math.abs(caliperMm - caliberMmTarget());
      if (diff > 0.55) {
        haptic('error');
        sfx('error');
        flashShake(stage);
        statusEl.className = 'mg-for-status is-warn';
        statusText.textContent = 'Сначала подведите подвижную губку штангенциркуля к краю пули';
        return;
      }

      if (opt.isCorrect) {
        haptic('medium');
        sfx('success');
        btnEl.classList.add('is-ok');
        statusEl.className = 'mg-for-status is-ok';
        statusText.textContent = 'Калибр подтверждён: ' + opt.label + ' • Переход к микроскопу...';
        step1Badge.className = 'mg-bal-step is-done';
        step2Badge.className = 'mg-bal-step is-active';
        timers.setTimeout(function () {
          stageNum = 2;
          panel1.style.display = 'none';
          panel2.style.display = 'flex';
          statusEl.className = 'mg-for-status';
          statusText.textContent = 'Подберите образец ЛРО и совместите нарезы стык-в-стык';
        }, 620);
      } else {
        redFlash = 0.85;
        haptic('error');
        sfx('error');
        flashShake(stage);
        statusEl.className = 'mg-for-status is-err';
        statusText.textContent = 'Неверный калибр! Сопоставьте замер (' + caliperMm.toFixed(1) + ' мм) со шкалой';
      }
    }

    listeners.on(calSlider, 'input', function () {
      if (stageNum !== 1 || finished) return;
      caliperMm = clamp(parseFloat(calSlider.value) || 13.6, 4.0, 14.5);
      updateCaliperUI();
    });

    listeners.on(prevBtn, 'click', function () {
      if (stageNum !== 2 || finished) return;
      currentSampleIdx = (currentSampleIdx - 1 + samples.length) % samples.length;
      updateDossierUI();
      haptic('light');
      sfx('click');
    });

    listeners.on(nextBtn, 'click', function () {
      if (stageNum !== 2 || finished) return;
      currentSampleIdx = (currentSampleIdx + 1) % samples.length;
      updateDossierUI();
      haptic('light');
      sfx('click');
    });

    function syncShiftUI() {
      shiftSlider.value = String(shiftPx);
      var deg = Math.round((shiftPx / PERIOD) * 360);
      shiftVal.textContent = deg + '°';
    }

    listeners.on(shiftSlider, 'input', function () {
      if (stageNum !== 2 || finished) return;
      shiftPx = parseFloat(shiftSlider.value) || 0;
      syncShiftUI();
    });

    listeners.on(confirmBtn, 'click', function () {
      if (stageNum !== 2 || finished) return;
      var smp = samples[currentSampleIdx];
      var delta = Math.abs(((shiftPx - targetShiftPx) % PERIOD + PERIOD) % PERIOD);
      var circularErr = Math.min(delta, PERIOD - delta);

      if (smp.isMatch && circularErr <= 6.5) {
        finished = true;
        greenLock = 1;
        confirmBtn.disabled = true;
        confirmBtn.classList.add('is-ready');
        step2Badge.className = 'mg-bal-step is-done';
        statusEl.className = 'mg-for-status is-ok';
        statusText.textContent = 'СОВПАДЕНИЕ НАРЕЗОВ 99.1% • СТВОЛ ИДЕНТИФИЦИРОВАН';
        haptic('success');
        sfx('success');
        timers.setTimeout(function () {
          triggerWin({
            minigame: 'ballistics',
            caliberMm: caliberMmTarget(),
            matchedSample: smp.code
          });
        }, 1050);
      } else {
        redFlash = 0.95;
        haptic('error');
        sfx('error');
        flashShake(stage);
        statusEl.className = 'mg-for-status is-err';
        statusText.textContent = 'НАРЕЗЫ НЕ СОВПАДАЮТ — проверьте образец ЛРО и поворот оси';
      }
    });

    // Direct canvas interaction (Stage 1: drag caliper jaw; Stage 2: vertical drag on right half)
    function getCaliperLayout(w, h) {
      var pxPerMm = (w * 0.66) / 14.5;
      var zeroX = w * 0.20;
      var rulerY = h * 0.16;
      return { pxPerMm: pxPerMm, zeroX: zeroX, rulerY: rulerY };
    }

    listeners.on(canvas, 'pointerdown', function (ev) {
      if (finished) return;
      draggingCanvas = true;
      try {
        canvas.setPointerCapture(ev.pointerId);
      } catch (e) {}

      var rect = canvas.getBoundingClientRect();
      var x = ev.clientX - rect.left;
      var y = ev.clientY - rect.top;

      if (stageNum === 1) {
        var lay = getCaliperLayout(rect.width, rect.height);
        caliperMm = clamp(Math.round(((x - lay.zeroX) / lay.pxPerMm) * 10) / 10, 4.0, 14.5);
        updateCaliperUI();
      } else {
        dragStartY = y;
        dragStartShift = shiftPx;
      }
    });

    listeners.on(canvas, 'pointermove', function (ev) {
      if (!draggingCanvas || finished) return;
      var rect = canvas.getBoundingClientRect();
      var x = ev.clientX - rect.left;
      var y = ev.clientY - rect.top;

      if (stageNum === 1) {
        var lay = getCaliperLayout(rect.width, rect.height);
        caliperMm = clamp(Math.round(((x - lay.zeroX) / lay.pxPerMm) * 10) / 10, 4.0, 14.5);
        updateCaliperUI();
      } else {
        var dy = y - dragStartY;
        shiftPx = ((dragStartShift + dy) % PERIOD + PERIOD) % PERIOD;
        syncShiftUI();
      }
    });

    listeners.on(canvas, 'pointerup', function () {
      draggingCanvas = false;
    });
    listeners.on(canvas, 'pointercancel', function () {
      draggingCanvas = false;
    });

    function drawStage1(ctx, w, h) {
      // Dark lab workbench mat with millimeter grid
      ctx.fillStyle = '#0a0c10';
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(42, 46, 56, 0.45)';
      ctx.lineWidth = 1;
      var step = 18;
      var gx, gy;
      for (gx = 0; gx < w; gx += step) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h);
        ctx.stroke();
      }
      for (gy = 0; gy < h; gy += step) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }

      var lay = getCaliperLayout(w, h);
      var pxPerMm = lay.pxPerMm;
      var zeroX = lay.zeroX;
      var rulerY = lay.rulerY;
      var bulletW = caliberMmTarget() * pxPerMm;
      var bulletLeft = zeroX;
      var bulletRight = zeroX + bulletW;
      var bulletMidX = bulletLeft + bulletW / 2;
      var bulletBaseY = h * 0.87;
      var bulletTopY = h * 0.43;
      var bodyTopY = h * 0.56;

      // Subtle shadow beneath bullet
      ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
      ctx.beginPath();
      ctx.ellipse(bulletMidX + 4, bulletBaseY + 6, bulletW * 0.55, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Magnified deformed copper-jacketed bullet extracted from beam
      var metalGrad = ctx.createLinearGradient(bulletLeft, 0, bulletRight, 0);
      metalGrad.addColorStop(0, '#4c2c12');
      metalGrad.addColorStop(0.22, '#a86927');
      metalGrad.addColorStop(0.42, '#efc078');
      metalGrad.addColorStop(0.65, '#9d5f21');
      metalGrad.addColorStop(0.88, '#663a15');
      metalGrad.addColorStop(1, '#321c0b');

      ctx.save();
      ctx.fillStyle = metalGrad;
      ctx.beginPath();
      ctx.moveTo(bulletLeft, bulletBaseY);
      ctx.lineTo(bulletLeft, bodyTopY);
      // Slightly mushroomed/dented nose profile from wood beam impact
      ctx.bezierCurveTo(
        bulletLeft - 2,
        bulletTopY + 14,
        bulletMidX - bulletW * 0.34,
        bulletTopY + 2,
        bulletMidX - bulletW * 0.08,
        bulletTopY + 4
      );
      // Impact dent notch on nose
      ctx.lineTo(bulletMidX + bulletW * 0.14, bulletTopY + 10);
      ctx.bezierCurveTo(
        bulletMidX + bulletW * 0.38,
        bulletTopY + 9,
        bulletRight + 2,
        bodyTopY - 12,
        bulletRight,
        bodyTopY
      );
      ctx.lineTo(bulletRight, bulletBaseY);
      ctx.closePath();
      ctx.fill();

      // Exposed dark lead core inside the nose dent
      ctx.fillStyle = '#525763';
      ctx.beginPath();
      ctx.ellipse(bulletMidX + bulletW * 0.05, bulletTopY + 10, bulletW * 0.16, 5.5, 0.25, 0, Math.PI * 2);
      ctx.fill();

      // Angled rifling grooves visible along cylindrical jacket
      ctx.strokeStyle = 'rgba(28, 16, 6, 0.45)';
      ctx.lineWidth = 2.4;
      for (var r = 0; r < 4; r++) {
        var rx = bulletLeft + bulletW * (0.16 + r * 0.22);
        ctx.beginPath();
        ctx.moveTo(rx - 6, bulletBaseY - 4);
        ctx.lineTo(rx + 9, bodyTopY + 6);
        ctx.stroke();
      }

      // Soot smudge from fire
      var sootGrad = ctx.createRadialGradient(bulletRight - 8, bodyTopY + 24, 3, bulletRight - 8, bodyTopY + 24, bulletW * 0.45);
      sootGrad.addColorStop(0, 'rgba(8, 8, 10, 0.52)');
      sootGrad.addColorStop(1, 'rgba(8, 8, 10, 0)');
      ctx.fillStyle = sootGrad;
      ctx.fillRect(bulletLeft, bulletTopY, bulletW, bulletBaseY - bulletTopY);

      // Base bevel rim
      ctx.strokeStyle = 'rgba(253, 224, 171, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(bulletLeft + 2, bulletBaseY - 2);
      ctx.lineTo(bulletRight - 2, bulletBaseY - 2);
      ctx.stroke();
      ctx.restore();

      // Vernier Caliper Steel Beam (horizontal bar)
      var beamH = 26;
      var steelGrad = ctx.createLinearGradient(0, rulerY, 0, rulerY + beamH);
      steelGrad.addColorStop(0, '#4b5563');
      steelGrad.addColorStop(0.5, '#9ca3af');
      steelGrad.addColorStop(1, '#374151');
      ctx.fillStyle = steelGrad;
      ctx.fillRect(zeroX - 18, rulerY, w - zeroX + 6, beamH);
      ctx.strokeStyle = '#1f2937';
      ctx.lineWidth = 1;
      ctx.strokeRect(zeroX - 18, rulerY, w - zeroX + 6, beamH);

      // Millimeter ticks (0..15 mm)
      ctx.strokeStyle = '#111827';
      ctx.fillStyle = '#111827';
      ctx.font = '600 9px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      for (var mm = 0; mm <= 15; mm++) {
        var tx = zeroX + mm * pxPerMm;
        if (tx > w - 10) break;
        var isMajor = mm % 5 === 0;
        var tickH = isMajor ? 12 : 7;
        ctx.lineWidth = isMajor ? 1.4 : 1;
        ctx.beginPath();
        ctx.moveTo(tx, rulerY + beamH);
        ctx.lineTo(tx, rulerY + beamH - tickH);
        ctx.stroke();
        if (isMajor || mm % 2 === 0) {
          ctx.fillText(String(mm), tx, rulerY + 3);
        }
      }

      // Fixed Left Jaw (anchored at 0 mm = bulletLeft)
      var jawGrad = ctx.createLinearGradient(zeroX - 20, 0, zeroX, 0);
      jawGrad.addColorStop(0, '#374151');
      jawGrad.addColorStop(0.7, '#9ca3af');
      jawGrad.addColorStop(1, '#d1d5db');
      ctx.fillStyle = jawGrad;
      ctx.beginPath();
      ctx.moveTo(zeroX - 18, rulerY);
      ctx.lineTo(zeroX, rulerY);
      ctx.lineTo(zeroX, h * 0.85);
      ctx.lineTo(zeroX - 10, h * 0.78);
      ctx.lineTo(zeroX - 18, h * 0.62);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#111827';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Movable Right Jaw (positioned at caliperMm)
      var jawX = zeroX + caliperMm * pxPerMm;
      var touch = Math.abs(caliperMm - caliberMmTarget()) <= 0.35;

      var movGrad = ctx.createLinearGradient(jawX, 0, jawX + 24, 0);
      movGrad.addColorStop(0, '#e5e7eb');
      movGrad.addColorStop(0.35, '#9ca3af');
      movGrad.addColorStop(1, '#374151');
      ctx.fillStyle = movGrad;
      ctx.beginPath();
      ctx.moveTo(jawX, rulerY - 4);
      ctx.lineTo(jawX + 28, rulerY - 4);
      ctx.lineTo(jawX + 28, rulerY + beamH + 4);
      ctx.lineTo(jawX + 18, h * 0.62);
      ctx.lineTo(jawX + 10, h * 0.78);
      ctx.lineTo(jawX, h * 0.85);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = touch ? '#22c55e' : '#f59e0b';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Digital LCD readout mounted on movable jaw carriage
      var lcdW = 54;
      var lcdH = 20;
      var lcdX = clamp(jawX + 4, 10, w - lcdW - 8);
      var lcdY = rulerY - lcdH - 8;
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(lcdX, lcdY, lcdW, lcdH);
      ctx.strokeStyle = touch ? '#22c55e' : '#c98a2e';
      ctx.lineWidth = 1.2;
      ctx.strokeRect(lcdX, lcdY, lcdW, lcdH);
      ctx.fillStyle = touch ? '#4ade80' : '#f59e0b';
      ctx.font = '700 11px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(caliperMm.toFixed(1) + 'mm', lcdX + lcdW / 2, lcdY + lcdH / 2 + 0.5);

      // Optical laser contact line when caliper kisses right edge of bullet
      if (touch) {
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.75)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(bulletLeft, bodyTopY);
        ctx.lineTo(bulletLeft, bulletBaseY);
        ctx.moveTo(bulletRight, bodyTopY);
        ctx.lineTo(bulletRight, bulletBaseY);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Label bottom right
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillStyle = 'rgba(156, 163, 175, 0.75)';
      ctx.font = '500 10px "IBM Plex Mono", monospace';
      ctx.fillText('ОБЪЕКТ: ПУЛЯ ИЗ БАЛКИ (#418-Б)', 10, h - 8);
    }

    function drawBulletHalf(ctx, pattern, slope, xStart, xEnd, midX, viewTop, viewH, offsetY, isRight) {
      var period = pattern.period;
      var halfW = Math.abs(xEnd - xStart);

      // Cylindrical metallic copper-brass base shading across height
      var baseGrad = ctx.createLinearGradient(0, viewTop, 0, viewTop + viewH);
      baseGrad.addColorStop(0, '#2a1809');
      baseGrad.addColorStop(0.18, '#6e4219');
      baseGrad.addColorStop(0.45, '#be8442');
      baseGrad.addColorStop(0.55, '#d5a15e');
      baseGrad.addColorStop(0.82, '#6c4018');
      baseGrad.addColorStop(1, '#261408');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(Math.min(xStart, xEnd), viewTop, halfW, viewH);

      var yMin = viewTop - period;
      var yMax = viewTop + viewH + period;
      var normOffset = ((offsetY % period) + period) % period;

      // Repeat periodic rifling land/groove bands seamlessly
      var k, baseCycle, g, sc, yMid, yOuter;
      for (baseCycle = yMin - normOffset; baseCycle < yMax; baseCycle += period) {
        // Major rifling grooves
        for (k = 0; k < pattern.grooves.length; k++) {
          g = pattern.grooves[k];
          yMid = baseCycle + g.y;
          yOuter = isRight ? yMid + slope * halfW : yMid - slope * halfW;

          ctx.strokeStyle = 'rgba(20, 10, 4, ' + g.darkness.toFixed(2) + ')';
          ctx.lineWidth = g.width;
          ctx.beginPath();
          ctx.moveTo(midX, yMid);
          ctx.lineTo(isRight ? xEnd : xStart, yOuter);
          ctx.stroke();

          // Sharp groove shoulder edge
          ctx.strokeStyle = 'rgba(255, 224, 175, 0.24)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(midX, yMid - g.width * 0.5);
          ctx.lineTo(isRight ? xEnd : xStart, yOuter - g.width * 0.5);
          ctx.stroke();
        }

        // Fine unique micro-striation scratches
        for (k = 0; k < pattern.scratches.length; k++) {
          sc = pattern.scratches[k];
          yMid = baseCycle + sc.y;
          yOuter = isRight ? yMid + slope * halfW : yMid - slope * halfW;

          ctx.strokeStyle = sc.bright
            ? 'rgba(255, 232, 185, ' + sc.alpha.toFixed(2) + ')'
            : 'rgba(18, 9, 3, ' + sc.alpha.toFixed(2) + ')';
          ctx.lineWidth = sc.width;
          ctx.beginPath();
          ctx.moveTo(midX, yMid);
          ctx.lineTo(isRight ? xEnd : xStart, yOuter);
          ctx.stroke();
        }
      }

      // Subtle cylindrical lighting vignette on top & bottom
      var vig = ctx.createLinearGradient(0, viewTop, 0, viewTop + viewH);
      vig.addColorStop(0, 'rgba(0, 0, 0, 0.58)');
      vig.addColorStop(0.24, 'rgba(0, 0, 0, 0)');
      vig.addColorStop(0.76, 'rgba(0, 0, 0, 0)');
      vig.addColorStop(1, 'rgba(0, 0, 0, 0.58)');
      ctx.fillStyle = vig;
      ctx.fillRect(Math.min(xStart, xEnd), viewTop, halfW, viewH);
    }

    function drawStage2(ctx, w, h, now) {
      ctx.fillStyle = '#07080b';
      ctx.fillRect(0, 0, w, h);

      var padX = 14;
      var padTop = 26;
      var padBot = 24;
      var viewW = w - padX * 2;
      var viewH = h - padTop - padBot;
      var midX = w / 2;

      var smp = samples[currentSampleIdx];
      // Relative visual shift on right side: when shiftPx === targetShiftPx, effective shift = 0 (exact match!)
      var effectiveRightShift = shiftPx - targetShiftPx;

      // Left microscope half: Evidence bullet
      ctx.save();
      ctx.beginPath();
      ctx.rect(padX, padTop, viewW / 2, viewH);
      ctx.clip();
      drawBulletHalf(ctx, evidencePattern, evidenceSlope, padX, midX, midX, padTop, viewH, 0, false);
      ctx.restore();

      // Right microscope half: Control LRO bullet
      ctx.save();
      ctx.beginPath();
      ctx.rect(midX, padTop, viewW / 2, viewH);
      ctx.clip();
      drawBulletHalf(ctx, smp.pattern, smp.slope, midX, padX + viewW, midX, padTop, viewH, effectiveRightShift, true);
      ctx.restore();

      // Microscope optical frame vignette
      var radVig = ctx.createRadialGradient(midX, padTop + viewH / 2, Math.min(viewW, viewH) * 0.25, midX, padTop + viewH / 2, Math.max(viewW, viewH) * 0.62);
      radVig.addColorStop(0, 'rgba(0, 0, 0, 0)');
      radVig.addColorStop(1, 'rgba(0, 0, 0, 0.58)');
      ctx.fillStyle = radVig;
      ctx.fillRect(padX, padTop, viewW, viewH);

      // Center comparison hairline + micrometer ticks
      ctx.strokeStyle = greenLock > 0 ? '#22c55e' : '#f59e0b';
      ctx.lineWidth = greenLock > 0 ? 2.4 : 1.5;
      ctx.beginPath();
      ctx.moveTo(midX, padTop);
      ctx.lineTo(midX, padTop + viewH);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(245, 158, 11, 0.45)';
      ctx.lineWidth = 1;
      for (var ty = padTop + 14; ty < padTop + viewH - 10; ty += 16) {
        ctx.beginPath();
        ctx.moveTo(midX - 5, ty);
        ctx.lineTo(midX + 5, ty);
        ctx.stroke();
      }

      // Outer optical border
      ctx.strokeStyle = greenLock > 0 ? '#22c55e' : '#2a2e38';
      ctx.lineWidth = 1.6;
      ctx.strokeRect(padX, padTop, viewW, viewH);

      // Green optical lock scan sweep upon victory
      if (greenLock > 0) {
        var scanX = padX + ((now * 0.38) % viewW);
        var scanG = ctx.createLinearGradient(scanX - 24, 0, scanX + 24, 0);
        scanG.addColorStop(0, 'rgba(34, 197, 94, 0)');
        scanG.addColorStop(0.5, 'rgba(34, 197, 94, 0.34)');
        scanG.addColorStop(1, 'rgba(34, 197, 94, 0)');
        ctx.fillStyle = scanG;
        ctx.fillRect(padX, padTop, viewW, viewH);

        // Lock badge center
        ctx.fillStyle = 'rgba(5, 46, 22, 0.88)';
        ctx.fillRect(midX - 88, padTop + viewH / 2 - 16, 176, 32);
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 1.6;
        ctx.strokeRect(midX - 88, padTop + viewH / 2 - 16, 176, 32);
        ctx.fillStyle = '#4ade80';
        ctx.font = '700 12px "IBM Plex Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('СОВПАДЕНИЕ СТВОЛА', midX, padTop + viewH / 2 + 0.5);
      }

      // Header labels above split halves
      ctx.font = '600 10px "IBM Plex Mono", monospace';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#d1d5db';
      ctx.fillText('УЛИКА #418-Б (БАЛКА)', padX, 13);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#f59e0b';
      ctx.fillText('ЛРО #' + (currentSampleIdx + 1) + ' (ПРАВЫЙ КАНАЛ)', w - padX, 13);

      // Footer hint
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(156, 163, 175, 0.72)';
      ctx.font = '500 9.5px "IBM Plex Mono", monospace';
      ctx.fillText('УВЕЛИЧЕНИЕ ×40 • СОВМЕСТИТЕ ЛИНИИ ЧЕРЕЗ ЦЕНТРАЛЬНУЮ ОСЬ', midX, h - 11);
    }

    function render(now) {
      var dt = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;

      var metrics = canvasMgr.getMetrics();
      var w = metrics.width;
      var h = metrics.height;
      var dpr = metrics.dpr;
      var ctx = canvas.getContext('2d');

      ctx.save();
      ctx.scale(dpr, dpr);

      if (stageNum === 1) {
        drawStage1(ctx, w, h);
      } else {
        drawStage2(ctx, w, h, now);
      }

      if (redFlash > 0.01) {
        ctx.fillStyle = 'rgba(220, 38, 38, ' + (redFlash * 0.42).toFixed(3) + ')';
        ctx.fillRect(0, 0, w, h);
        redFlash = Math.max(0, redFlash - dt * 2.6);
      }

      ctx.restore();
      timers.raf(render);
    }

    timers.raf(render);

    return function cleanup() {
      timers.clearAll();
      listeners.clearAll();
      canvasMgr.destroy();
      containerEl.innerHTML = '';
    };
  }
  // ============================================================================
  // MINIGAME 3: arson_lab (mode: 'chem' | 'map')
  // ============================================================================

  var DEFAULT_CHEM_SUBSTANCES = [
    {
      id: 'gasoline',
      name: 'Бензин АИ-92',
      shortName: 'Бензин АИ-92',
      isMatch: false,
      peaks: [
        [0.14, 0.90, 0.015],
        [0.19, 0.60, 0.014],
        [0.24, 0.98, 0.016],
        [0.30, 0.72, 0.015],
        [0.36, 0.46, 0.017]
      ]
    },
    {
      id: 'diesel',
      name: 'Дизельное топливо',
      shortName: 'Дизель',
      isMatch: false,
      peaks: [
        [0.42, 0.46, 0.019],
        [0.50, 0.70, 0.019],
        [0.58, 0.86, 0.019],
        [0.66, 0.92, 0.019],
        [0.74, 0.76, 0.019],
        [0.82, 0.50, 0.019]
      ]
    },
    {
      id: 'whitespirit',
      name: 'Уайт-спирит / пром. растворитель',
      shortName: 'Уайт-спирит',
      isMatch: true,
      peaks: [
        [0.30, 0.94, 0.017],
        [0.36, 0.42, 0.015],
        [0.53, 0.82, 0.020],
        [0.59, 0.93, 0.018],
        [0.74, 0.45, 0.019]
      ]
    },
    {
      id: 'oil',
      name: 'Машинное масло',
      shortName: 'Маш. масло',
      isMatch: false,
      peaks: [
        [0.69, 0.34, 0.052],
        [0.81, 0.90, 0.068],
        [0.90, 0.52, 0.044]
      ]
    }
  ];

  function evalSpectrum(peaks, x, shift) {
    var sum = 0;
    for (var i = 0; i < peaks.length; i++) {
      var mu = peaks[i][0] + shift;
      var amp = peaks[i][1];
      var sigma = peaks[i][2];
      var d = (x - mu) / sigma;
      sum += amp * Math.exp(-0.5 * d * d);
    }
    return clamp(sum, 0, 1.05);
  }

  function initArsonChem(containerEl, config, callbacks) {
    var timers = createTimerBag();
    var listeners = createListenerBag();
    var triggerWin = createWinTrigger(callbacks);
    var finished = false;

    var rawSubs =
      Array.isArray(config.substances) && config.substances.length > 0
        ? config.substances
        : DEFAULT_CHEM_SUBSTANCES;

    var targetIdx = -1;
    var i;
    for (i = 0; i < rawSubs.length; i++) {
      if (config.targetId && rawSubs[i].id === config.targetId) {
        targetIdx = i;
        break;
      }
      if (!config.targetId && rawSubs[i].isMatch) {
        targetIdx = i;
        break;
      }
    }
    if (targetIdx === -1) targetIdx = Math.min(2, rawSubs.length - 1);

    var substances = rawSubs.map(function (s, idx) {
      return {
        id: s.id || 'sub_' + idx,
        name: s.name || 'Образец #' + (idx + 1),
        shortName: s.shortName || s.name || 'Образец #' + (idx + 1),
        peaks: s.peaks || DEFAULT_CHEM_SUBSTANCES[idx % DEFAULT_CHEM_SUBSTANCES.length].peaks,
        isMatch: idx === targetIdx
      };
    });

    // Unknown ash sample is the target substance shifted by a realistic column calibration offset
    var samplePhaseOffset = typeof config.phaseOffset === 'number' ? clamp(config.phaseOffset, -0.11, 0.11) : 0.078;
    var SAMPLE_POINTS = 180;
    var noiseRand = mulberry32(41844);
    var unknownCurve = [];
    for (i = 0; i < SAMPLE_POINTS; i++) {
      var xn = i / (SAMPLE_POINTS - 1);
      var noise = (noiseRand() - 0.5) * 0.022;
      var yVal = clamp(evalSpectrum(substances[targetIdx].peaks, xn, samplePhaseOffset) + noise, 0, 1.02);
      unknownCurve.push(yVal);
    }

    var shell = createShell(containerEl, {
      title: config.title || 'Газовый хроматограф',
      subtitle: config.subtitle || 'ДЕЛО №418 • АНАЛИЗ ПРОБЫ ЗОЛЫ',
      extraClass: 'mg-arson-wrap'
    });

    listeners.on(shell.cancelBtn, 'click', function () {
      haptic('light');
      sfx('click');
      triggerCancel(callbacks);
    });

    // Stage
    var stage = document.createElement('div');
    stage.className = 'mg-for-stage mg-arson-stage';
    var canvas = document.createElement('canvas');
    canvas.className = 'mg-for-canvas';
    stage.appendChild(canvas);
    shell.body.appendChild(stage);

    // Legend + match % status
    var statusEl = document.createElement('div');
    statusEl.className = 'mg-for-status';
    var legendSpan = document.createElement('span');
    legendSpan.innerHTML =
      '<span class="mg-dot" style="background:#38bdf8"></span>Зола  ' +
      '<span class="mg-dot" style="background:#f59e0b;margin-left:8px"></span>Эталон ЛВЖ';
    var matchBadge = document.createElement('span');
    matchBadge.className = 'mg-for-value';
    matchBadge.textContent = 'СОВП.: 0.0%';
    statusEl.appendChild(legendSpan);
    statusEl.appendChild(matchBadge);
    shell.body.appendChild(statusEl);

    // Controls panel
    var panel = document.createElement('div');
    panel.className = 'mg-for-panel';

    var subGrid = document.createElement('div');
    subGrid.className = 'mg-arson-grid';
    var subBtns = [];
    var selectedIdx = 0;
    var phaseShift = -0.04;
    var matchPct = 0;
    var wasAboveThreshold = false;
    var redFlash = 0;
    var dragging = false;
    var dragStartX = 0;
    var dragStartPhase = 0;

    function updateSubButtons() {
      for (var b = 0; b < subBtns.length; b++) {
        if (b === selectedIdx) {
          subBtns[b].classList.add('is-active');
        } else {
          subBtns[b].classList.remove('is-active');
        }
      }
    }

    for (i = 0; i < substances.length; i++) {
      (function (idx) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'mg-for-btn-sec';
        btn.textContent = substances[idx].shortName;
        listeners.on(btn, 'click', function () {
          if (finished) return;
          selectedIdx = idx;
          updateSubButtons();
          haptic('light');
          sfx('click');
          recomputeMatch();
        });
        subGrid.appendChild(btn);
        subBtns.push(btn);
      })(i);
    }
    updateSubButtons();
    panel.appendChild(subGrid);

    var sliderWrap = document.createElement('div');
    sliderWrap.className = 'mg-for-slider-wrap';
    var sliderRow = document.createElement('div');
    sliderRow.className = 'mg-for-row';
    var sliderLbl = document.createElement('span');
    sliderLbl.className = 'mg-for-label';
    sliderLbl.textContent = 'КАЛИБРОВКА БАЗЫ (СДВИГ ФАЗЫ)';
    var sliderVal = document.createElement('span');
    sliderVal.className = 'mg-for-value';
    sliderVal.textContent = '-0.80 мин';
    sliderRow.appendChild(sliderLbl);
    sliderRow.appendChild(sliderVal);

    var phaseSlider = document.createElement('input');
    phaseSlider.type = 'range';
    phaseSlider.className = 'mg-for-slider';
    phaseSlider.min = '-0.15';
    phaseSlider.max = '0.15';
    phaseSlider.step = '0.002';
    phaseSlider.value = String(phaseShift);

    sliderWrap.appendChild(sliderRow);
    sliderWrap.appendChild(phaseSlider);
    panel.appendChild(sliderWrap);

    var lockBtn = document.createElement('button');
    lockBtn.type = 'button';
    lockBtn.className = 'mg-for-btn';
    lockBtn.textContent = 'ЗАФИКСИРОВАТЬ ВЕЩЕСТВО';
    panel.appendChild(lockBtn);

    shell.body.appendChild(panel);

    var canvasMgr = setupResponsiveCanvas(canvas, stage);

    function recomputeMatch() {
      var refPeaks = substances[selectedIdx].peaks;
      var minSum = 0;
      var maxSum = 0;
      for (var k = 0; k < SAMPLE_POINTS; k++) {
        var xn = k / (SAMPLE_POINTS - 1);
        var a = unknownCurve[k];
        var b = evalSpectrum(refPeaks, xn, phaseShift);
        minSum += a < b ? a : b;
        maxSum += a > b ? a : b;
      }
      matchPct = maxSum > 0.0001 ? clamp((minSum / maxSum) * 100, 0, 99.6) : 0;

      var minutesStr = (phaseShift * 20).toFixed(2);
      sliderVal.textContent = (phaseShift >= 0 ? '+' : '') + minutesStr + ' мин';
      phaseSlider.value = phaseShift.toFixed(3);

      var ready = matchPct > 92;
      matchBadge.textContent = 'СОВП.: ' + matchPct.toFixed(1) + '%';
      matchBadge.className = 'mg-for-value' + (ready ? ' is-ok' : '');

      if (ready && !wasAboveThreshold) {
        haptic('light');
        sfx('scan');
      }
      wasAboveThreshold = ready;

      if (!finished) {
        if (ready) {
          statusEl.className = 'mg-for-status is-ok';
          lockBtn.classList.add('is-ready');
        } else {
          statusEl.className = 'mg-for-status';
          lockBtn.classList.remove('is-ready');
        }
      }
    }

    recomputeMatch();

    listeners.on(phaseSlider, 'input', function () {
      if (finished) return;
      phaseShift = clamp(parseFloat(phaseSlider.value) || 0, -0.15, 0.15);
      recomputeMatch();
    });

    // Direct horizontal drag on chromatograph canvas shifts amber reference curve
    listeners.on(canvas, 'pointerdown', function (ev) {
      if (finished) return;
      dragging = true;
      dragStartX = ev.clientX;
      dragStartPhase = phaseShift;
      try {
        canvas.setPointerCapture(ev.pointerId);
      } catch (e) {}
    });

    listeners.on(canvas, 'pointermove', function (ev) {
      if (!dragging || finished) return;
      var rect = canvas.getBoundingClientRect();
      if (!rect.width) return;
      var dxNorm = (ev.clientX - dragStartX) / rect.width;
      phaseShift = clamp(dragStartPhase + dxNorm, -0.15, 0.15);
      recomputeMatch();
    });

    listeners.on(canvas, 'pointerup', function () {
      dragging = false;
    });
    listeners.on(canvas, 'pointercancel', function () {
      dragging = false;
    });

    listeners.on(lockBtn, 'click', function () {
      if (finished) return;
      var sub = substances[selectedIdx];
      if (matchPct > 92 && sub.isMatch) {
        finished = true;
        lockBtn.disabled = true;
        lockBtn.classList.add('is-ready');
        statusEl.className = 'mg-for-status is-ok';
        legendSpan.textContent = 'ПОДТВЕРЖДЕНО: ' + sub.name;
        haptic('success');
        sfx('success');
        timers.setTimeout(function () {
          triggerWin({
            minigame: 'arson_lab',
            mode: 'chem',
            substanceId: sub.id,
            substanceName: sub.name,
            similarity: Number(matchPct.toFixed(1))
          });
        }, 950);
      } else {
        redFlash = 0.9;
        haptic('error');
        sfx('error');
        flashShake(stage);
        statusEl.className = 'mg-for-status is-err';
        matchBadge.className = 'mg-for-value is-err';
        matchBadge.textContent = 'НИЖЕ 92% (' + matchPct.toFixed(1) + '%)';
      }
    });

    var lastTs = performance.now();

    function render(now) {
      var dt = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;

      var metrics = canvasMgr.getMetrics();
      var w = metrics.width;
      var h = metrics.height;
      var dpr = metrics.dpr;
      var ctx = canvas.getContext('2d');

      ctx.save();
      ctx.scale(dpr, dpr);

      // Dark instrument panel background
      ctx.fillStyle = '#080a0e';
      ctx.fillRect(0, 0, w, h);

      var padL = 32;
      var padR = 12;
      var padT = 24;
      var padB = 26;
      var plotW = w - padL - padR;
      var plotH = h - padT - padB;

      // Grid lines
      ctx.strokeStyle = 'rgba(42, 46, 56, 0.65)';
      ctx.lineWidth = 1;
      var gx, gy;
      for (gx = 0; gx <= 10; gx++) {
        var px = padL + (gx / 10) * plotW;
        ctx.beginPath();
        ctx.moveTo(px, padT);
        ctx.lineTo(px, padT + plotH);
        ctx.stroke();
      }
      for (gy = 0; gy <= 5; gy++) {
        var py = padT + (gy / 5) * plotH;
        ctx.beginPath();
        ctx.moveTo(padL, py);
        ctx.lineTo(padL + plotW, py);
        ctx.stroke();
      }

      // Axes border
      ctx.strokeStyle = '#3b4252';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(padL, padT);
      ctx.lineTo(padL, padT + plotH);
      ctx.lineTo(padL + plotW, padT + plotH);
      ctx.stroke();

      // Axis labels
      ctx.fillStyle = '#6b7280';
      ctx.font = '500 9px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      for (gx = 0; gx <= 10; gx += 2) {
        ctx.fillText(String(gx * 2) + 'm', padL + (gx / 10) * plotW, padT + plotH + 6);
      }
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText('100', padL - 5, padT + 2);
      ctx.fillText('50', padL - 5, padT + plotH * 0.5);
      ctx.fillText('0', padL - 5, padT + plotH);

      // Top telemetry label
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillStyle = '#9ca3af';
      ctx.font = '600 9.5px "IBM Plex Mono", monospace';
      ctx.fillText('GC-FID • ПРОБА ЗОЛЫ #418-З', padL, 7);

      ctx.textAlign = 'right';
      ctx.fillStyle = matchPct > 92 ? '#4ade80' : '#f59e0b';
      ctx.fillText(substances[selectedIdx].shortName.toUpperCase(), w - padR, 7);

      // Draw Blue Unknown Sample Curve (with translucent area fill)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(padL, padT + plotH);
      var k, pxC, pyC;
      for (k = 0; k < SAMPLE_POINTS; k++) {
        pxC = padL + (k / (SAMPLE_POINTS - 1)) * plotW;
        pyC = padT + plotH - unknownCurve[k] * (plotH - 8);
        ctx.lineTo(pxC, pyC);
      }
      ctx.lineTo(padL + plotW, padT + plotH);
      ctx.closePath();
      var blueFill = ctx.createLinearGradient(0, padT, 0, padT + plotH);
      blueFill.addColorStop(0, 'rgba(56, 189, 248, 0.28)');
      blueFill.addColorStop(1, 'rgba(56, 189, 248, 0.02)');
      ctx.fillStyle = blueFill;
      ctx.fill();

      ctx.beginPath();
      for (k = 0; k < SAMPLE_POINTS; k++) {
        pxC = padL + (k / (SAMPLE_POINTS - 1)) * plotW;
        pyC = padT + plotH - unknownCurve[k] * (plotH - 8);
        if (k === 0) ctx.moveTo(pxC, pyC);
        else ctx.lineTo(pxC, pyC);
      }
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // Draw Amber Reference Curve (turns glowing green when matched > 92%)
      var refPeaks = substances[selectedIdx].peaks;
      var refColor = finished ? '#22c55e' : matchPct > 92 ? '#4ade80' : '#f59e0b';
      ctx.save();
      ctx.beginPath();
      for (k = 0; k < SAMPLE_POINTS; k++) {
        var xn = k / (SAMPLE_POINTS - 1);
        var val = evalSpectrum(refPeaks, xn, phaseShift);
        pxC = padL + xn * plotW;
        pyC = padT + plotH - val * (plotH - 8);
        if (k === 0) ctx.moveTo(pxC, pyC);
        else ctx.lineTo(pxC, pyC);
      }
      ctx.strokeStyle = refColor;
      ctx.lineWidth = 2.2;
      ctx.setLineDash(finished ? [] : [6, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Moving faint CRT chromatograph scan beam
      var scanX = padL + (((now * 0.06) % 1) * plotW);
      var beamGrad = ctx.createLinearGradient(scanX - 18, 0, scanX + 4, 0);
      beamGrad.addColorStop(0, 'rgba(245, 158, 11, 0)');
      beamGrad.addColorStop(1, 'rgba(245, 158, 11, 0.09)');
      ctx.fillStyle = beamGrad;
      ctx.fillRect(Math.max(padL, scanX - 18), padT, Math.min(22, padL + plotW - Math.max(padL, scanX - 18)), plotH);

      // Stamp on win
      if (finished) {
        ctx.fillStyle = 'rgba(5, 46, 22, 0.88)';
        ctx.fillRect(w / 2 - 96, padT + plotH * 0.35 - 16, 192, 34);
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 1.6;
        ctx.strokeRect(w / 2 - 96, padT + plotH * 0.35 - 16, 192, 34);
        ctx.fillStyle = '#4ade80';
        ctx.font = '700 12px "IBM Plex Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('СПЕКТР ПОДТВЕРЖДЁН', w / 2, padT + plotH * 0.35 + 1);
      }

      if (redFlash > 0.01) {
        ctx.fillStyle = 'rgba(220, 38, 38, ' + (redFlash * 0.38).toFixed(3) + ')';
        ctx.fillRect(0, 0, w, h);
        redFlash = Math.max(0, redFlash - dt * 2.5);
      }

      ctx.restore();
      timers.raf(render);
    }

    timers.raf(render);

    return function cleanup() {
      timers.clearAll();
      listeners.clearAll();
      canvasMgr.destroy();
      containerEl.innerHTML = '';
    };
  }

  // ---- Mode 'map': Схема прогара коттеджа ----

  var DEFAULT_MAP_NODES = [
    {
      id: 'living',
      room: 'Гостиная (у дивана)',
      x: 0.30,
      y: 0.36,
      isOrigin: true,
      isDecoy: false,
      charDepth: '19 мм',
      coneAngle: -0.45,
      coneOutward: true,
      note: 'Глубокий кольцевой прогар пола, следы розлива ЛВЖ, V-конус расходится от пола вверх.'
    },
    {
      id: 'study',
      room: 'Кабинет (под окном)',
      x: 0.74,
      y: 0.32,
      isOrigin: true,
      isDecoy: false,
      charDepth: '17 мм',
      coneAngle: 2.35,
      coneOutward: true,
      note: 'Изолированный кратер выгорания досок, между комнатами — полоса слабого обугливания.'
    },
    {
      id: 'hall',
      room: 'Прихожая (у порога)',
      x: 0.48,
      y: 0.74,
      isOrigin: true,
      isDecoy: false,
      charDepth: '16 мм',
      coneAngle: -1.55,
      coneOutward: true,
      note: 'Интенсивный локальный прогар на уровне плинтуса, самостоятельный расходящийся V-конус.'
    },
    {
      id: 'panel',
      room: 'Щитовая (электрощиток)',
      x: 0.19,
      y: 0.72,
      isOrigin: false,
      isDecoy: true,
      charDepth: '3 мм',
      coneAngle: 0.15,
      coneOutward: false,
      note: 'Корпус обгорел только СНАРУЖИ, медные жилы и автоматы внутри целы. Тепловой вектор входящий из прихожей.'
    },
    {
      id: 'kitchen',
      room: 'Кухня (газовая плита)',
      x: 0.77,
      y: 0.68,
      isOrigin: false,
      isDecoy: false,
      charDepth: '4 мм',
      coneAngle: 3.0,
      coneOutward: false,
      note: 'Газовый вентиль перекрыт, копоть преимущественно в верхней зоне под потолком — вторичный занос дыма.'
    },
    {
      id: 'veranda',
      room: 'Веранда (выход в сад)',
      x: 0.52,
      y: 0.18,
      isOrigin: false,
      isDecoy: false,
      charDepth: '2 мм',
      coneAngle: -1.55,
      coneOutward: false,
      note: 'Слабый налёт копоти от выходящего потока газов через выбитую раму. Очага на полу нет.'
    }
  ];

  function initArsonMap(containerEl, config, callbacks) {
    var timers = createTimerBag();
    var listeners = createListenerBag();
    var triggerWin = createWinTrigger(callbacks);
    var finished = false;

    var rawNodes =
      Array.isArray(config.nodes) && config.nodes.length > 0
        ? config.nodes
        : DEFAULT_MAP_NODES;

    var nodes = rawNodes.map(function (n, idx) {
      return {
        id: n.id || 'node_' + idx,
        room: n.room || 'Зона #' + (idx + 1),
        x: clamp(typeof n.x === 'number' ? n.x : 0.2 + idx * 0.12, 0.1, 0.9),
        y: clamp(typeof n.y === 'number' ? n.y : 0.5, 0.12, 0.88),
        isOrigin: !!n.isOrigin,
        isDecoy: !!n.isDecoy,
        charDepth: n.charDepth || (n.isOrigin ? '17 мм' : '3 мм'),
        coneAngle: typeof n.coneAngle === 'number' ? n.coneAngle : -1.2,
        coneOutward: typeof n.coneOutward === 'boolean' ? n.coneOutward : !!n.isOrigin,
        note: n.note || '',
        scanned: false,
        marked: false
      };
    });

    var requiredCount = 0;
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].isOrigin) requiredCount++;
    }
    if (requiredCount === 0) requiredCount = 3;

    var shell = createShell(containerEl, {
      title: config.title || 'Схема прогара коттеджа',
      subtitle: config.subtitle || 'ДЕЛО №418 • УСТАНОВЛЕНИЕ ОЧАГОВ',
      extraClass: 'mg-arson-wrap'
    });

    listeners.on(shell.cancelBtn, 'click', function () {
      haptic('light');
      sfx('click');
      triggerCancel(callbacks);
    });

    // Blueprint canvas
    var stage = document.createElement('div');
    stage.className = 'mg-for-stage mg-arson-stage';
    var canvas = document.createElement('canvas');
    canvas.className = 'mg-for-canvas';
    stage.appendChild(canvas);
    shell.body.appendChild(stage);

    // Status row
    var statusEl = document.createElement('div');
    statusEl.className = 'mg-for-status';
    var statusText = document.createElement('span');
    statusText.textContent = 'Нажмите на зоны плана для осмотра и отметьте ' + requiredCount + ' истинных очага';
    var countVal = document.createElement('span');
    countVal.className = 'mg-for-value';
    countVal.textContent = '0 / ' + requiredCount;
    statusEl.appendChild(statusText);
    statusEl.appendChild(countVal);
    shell.body.appendChild(statusEl);

    // Inspection dossier & toggle button panel
    var panel = document.createElement('div');
    panel.className = 'mg-for-panel';

    var inspectBox = document.createElement('div');
    inspectBox.className = 'mg-arson-inspect';
    var inspectHead = document.createElement('div');
    inspectHead.className = 'mg-arson-inspect-head';
    var inspectTitle = document.createElement('span');
    inspectTitle.className = 'mg-arson-inspect-title';
    inspectTitle.textContent = 'ТЕРМОСКАНЕР ГОТОВ';
    var togglePinBtn = document.createElement('button');
    togglePinBtn.type = 'button';
    togglePinBtn.className = 'mg-for-btn-sec';
    togglePinBtn.textContent = 'ОТМЕТИТЬ ОЧАГ';
    togglePinBtn.style.display = 'none';
    inspectHead.appendChild(inspectTitle);
    inspectHead.appendChild(togglePinBtn);

    var inspectDesc = document.createElement('div');
    inspectDesc.className = 'mg-arson-inspect-desc';
    inspectDesc.textContent = 'Коснитесь любой точки на чертеже, чтобы замерить глубину прогара и направление V-конуса.';

    inspectBox.appendChild(inspectHead);
    inspectBox.appendChild(inspectDesc);
    panel.appendChild(inspectBox);

    var submitBtn = document.createElement('button');
    submitBtn.type = 'button';
    submitBtn.className = 'mg-for-btn';
    submitBtn.textContent = 'ОФОРМИТЬ ЗАКЛЮЧЕНИЕ';
    panel.appendChild(submitBtn);

    shell.body.appendChild(panel);

    var focusedNode = null;
    var pointerX = -1;
    var pointerY = -1;
    var redFlash = 0;
    var lastTs = performance.now();

    var canvasMgr = setupResponsiveCanvas(canvas, stage);

    function countMarked() {
      var cnt = 0;
      for (var k = 0; k < nodes.length; k++) {
        if (nodes[k].marked) cnt++;
      }
      return cnt;
    }

    function updateInspectUI() {
      var cnt = countMarked();
      countVal.textContent = cnt + ' / ' + requiredCount;
      countVal.className = 'mg-for-value' + (cnt === requiredCount ? ' is-ok' : '');

      if (cnt === requiredCount && !finished) {
        submitBtn.classList.add('is-ready');
      } else if (!finished) {
        submitBtn.classList.remove('is-ready');
      }

      if (!focusedNode) {
        togglePinBtn.style.display = 'none';
        return;
      }

      inspectTitle.textContent = focusedNode.room + ' • Прогар ' + focusedNode.charDepth;
      inspectDesc.textContent = focusedNode.note;
      togglePinBtn.style.display = 'inline-block';

      if (focusedNode.marked) {
        togglePinBtn.textContent = 'СНЯТЬ МЕТКУ';
        togglePinBtn.className = 'mg-for-btn-sec is-marked';
      } else {
        togglePinBtn.textContent = 'ОТМЕТИТЬ ОЧАГ';
        togglePinBtn.className = 'mg-for-btn-sec is-active';
      }
    }

    function toggleNodeMark(node) {
      if (!node || finished) return;
      if (node.marked) {
        node.marked = false;
        haptic('light');
        sfx('click');
      } else {
        if (countMarked() >= requiredCount) {
          haptic('error');
          sfx('error');
          statusEl.className = 'mg-for-status is-warn';
          statusText.textContent = 'Уже выбрано ' + requiredCount + ' очага — снимите одну метку перед переносом';
          return;
        }
        node.marked = true;
        haptic('medium');
        sfx('click');
      }
      statusEl.className = 'mg-for-status';
      statusText.textContent =
        countMarked() === requiredCount
          ? 'Выбрано ' + requiredCount + ' очага — нажмите «ОФОРМИТЬ ЗАКЛЮЧЕНИЕ»'
          : 'Отметьте все ' + requiredCount + ' независимых очага возгорания';
      updateInspectUI();
    }

    listeners.on(togglePinBtn, 'click', function () {
      toggleNodeMark(focusedNode);
    });

    listeners.on(canvas, 'pointermove', function (ev) {
      if (finished) return;
      var rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointerX = (ev.clientX - rect.left) / rect.width;
      pointerY = (ev.clientY - rect.top) / rect.height;
    });

    listeners.on(canvas, 'pointerleave', function () {
      pointerX = -1;
      pointerY = -1;
    });

    listeners.on(canvas, 'pointerdown', function (ev) {
      if (finished) return;
      var rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      var nx = (ev.clientX - rect.left) / rect.width;
      var ny = (ev.clientY - rect.top) / rect.height;
      pointerX = nx;
      pointerY = ny;

      var best = null;
      var bestDist = 0.14;
      for (var k = 0; k < nodes.length; k++) {
        var d = Math.hypot(nodes[k].x - nx, nodes[k].y - ny);
        if (d < bestDist) {
          bestDist = d;
          best = nodes[k];
        }
      }

      if (best) {
        best.scanned = true;
        if (focusedNode === best) {
          // Second tap on same inspected node directly toggles its origin pin
          toggleNodeMark(best);
        } else {
          focusedNode = best;
          haptic('light');
          sfx('scan');
          updateInspectUI();
        }
      }
    });

    listeners.on(submitBtn, 'click', function () {
      if (finished) return;
      var markedNodes = [];
      var decoyMarked = false;
      var correctMarked = 0;

      for (var k = 0; k < nodes.length; k++) {
        if (nodes[k].marked) {
          markedNodes.push(nodes[k]);
          if (nodes[k].isOrigin) correctMarked++;
          if (nodes[k].isDecoy) decoyMarked = true;
        }
      }

      if (markedNodes.length !== requiredCount) {
        redFlash = 0.8;
        haptic('error');
        sfx('error');
        flashShake(stage);
        statusEl.className = 'mg-for-status is-warn';
        statusText.textContent = 'Нужно отметить ровно ' + requiredCount + ' независимых очага возгорания';
        return;
      }

      if (correctMarked === requiredCount) {
        finished = true;
        submitBtn.disabled = true;
        submitBtn.classList.add('is-ready');
        statusEl.className = 'mg-for-status is-ok';
        statusText.textContent = 'ЗАКЛЮЧЕНИЕ ОФОРМЛЕНО: УМЫШЛЕННЫЙ ПОДЖОГ (' + requiredCount + ' ОЧАГА)';
        haptic('success');
        sfx('success');
        timers.setTimeout(function () {
          triggerWin({
            minigame: 'arson_lab',
            mode: 'map',
            origins: markedNodes.map(function (n) {
              return n.id;
            })
          });
        }, 1000);
      } else {
        redFlash = 0.95;
        haptic('error');
        sfx('error');
        flashShake(stage);
        statusEl.className = 'mg-for-status is-err';
        statusText.textContent = decoyMarked
          ? 'ОШИБКА: Электрощиток — ложный очаг (обгорел снаружи)!'
          : 'ОШИБКА: Очаги не соответствуют V-конусам и глубине прогара';
      }
    });

    function drawBlueprint(ctx, w, h, now) {
      // Dark architectural blueprint slate
      ctx.fillStyle = '#090d14';
      ctx.fillRect(0, 0, w, h);

      // Fine blueprint millimeter grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      var g;
      for (g = 0; g < w; g += 16) {
        ctx.beginPath();
        ctx.moveTo(g, 0);
        ctx.lineTo(g, h);
        ctx.stroke();
      }
      for (g = 0; g < h; g += 16) {
        ctx.beginPath();
        ctx.moveTo(0, g);
        ctx.lineTo(w, g);
        ctx.stroke();
      }

      // House perimeter & interior rooms
      var bx = w * 0.09;
      var by = h * 0.13;
      var bw = w * 0.82;
      var bh = h * 0.76;

      // Subtle floor base fill
      ctx.fillStyle = 'rgba(17, 22, 31, 0.85)';
      ctx.fillRect(bx, by, bw, bh);

      // Thermal/char heat stains at nodes (origins have wider intense floor char craters; decoy has localized edge stain)
      for (var k = 0; k < nodes.length; k++) {
        var nd = nodes[k];
        var nx = nd.x * w;
        var ny = nd.y * h;
        var rad = nd.isOrigin ? Math.min(w, h) * 0.17 : nd.isDecoy ? Math.min(w, h) * 0.11 : Math.min(w, h) * 0.085;

        var heat = ctx.createRadialGradient(nx, ny, 2, nx, ny, rad);
        if (nd.isOrigin) {
          heat.addColorStop(0, 'rgba(220, 38, 38, 0.42)');
          heat.addColorStop(0.42, 'rgba(201, 138, 46, 0.28)');
          heat.addColorStop(0.78, 'rgba(12, 10, 10, 0.45)');
          heat.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else if (nd.isDecoy) {
          heat.addColorStop(0, 'rgba(201, 138, 46, 0.25)');
          heat.addColorStop(0.65, 'rgba(15, 16, 20, 0.35)');
          heat.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          heat.addColorStop(0, 'rgba(100, 116, 139, 0.22)');
          heat.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }
        ctx.fillStyle = heat;
        ctx.beginPath();
        ctx.arc(nx, ny, rad, 0, Math.PI * 2);
        ctx.fill();

        // Draw V-shaped flame/smoke cone vector if scanned, focused, or pointer loupe is near
        var nearLoupe = pointerX >= 0 && Math.hypot(pointerX - nd.x, pointerY - nd.y) < 0.20;
        if (nd.scanned || focusedNode === nd || nearLoupe || finished) {
          ctx.save();
          ctx.translate(nx, ny);
          ctx.rotate(nd.coneAngle);
          var coneLen = nd.isOrigin ? 34 : 24;
          var coneSpread = 0.42;

          ctx.strokeStyle = nd.coneOutward
            ? 'rgba(245, 158, 11, 0.72)'
            : 'rgba(56, 189, 248, 0.65)';
          ctx.fillStyle = nd.coneOutward
            ? 'rgba(245, 158, 11, 0.14)'
            : 'rgba(56, 189, 248, 0.10)';
          ctx.lineWidth = 1.3;

          ctx.beginPath();
          if (nd.coneOutward) {
            // V-cone fanning OUTWARD from true floor origin
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(-coneSpread) * coneLen, Math.sin(-coneSpread) * coneLen);
            ctx.lineTo(Math.cos(coneSpread) * coneLen, Math.sin(coneSpread) * coneLen);
          } else {
            // Incoming smoke drift cone pointing INTO wall/panel from outside
            ctx.moveTo(coneLen, 0);
            ctx.lineTo(4, -10);
            ctx.lineTo(4, 10);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }
      }

      // Crisp architectural walls
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2.4;
      ctx.strokeRect(bx, by, bw, bh);

      // Interior partition walls
      ctx.strokeStyle = 'rgba(203, 213, 225, 0.75)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      // Horizontal mid wall separating top rooms & bottom hall/utility/kitchen
      var midY = by + bh * 0.54;
      ctx.moveTo(bx, midY);
      ctx.lineTo(bx + bw * 0.36, midY);
      ctx.moveTo(bx + bw * 0.48, midY);
      ctx.lineTo(bx + bw * 0.62, midY);
      ctx.moveTo(bx + bw * 0.74, midY);
      ctx.lineTo(bx + bw, midY);

      // Vertical upper divider (Living | Study)
      var midXTop = bx + bw * 0.56;
      ctx.moveTo(midXTop, by);
      ctx.lineTo(midXTop, by + bh * 0.28);
      ctx.moveTo(midXTop, by + bh * 0.41);
      ctx.lineTo(midXTop, midY);

      // Vertical lower dividers (Panel | Hall | Kitchen)
      var xPanel = bx + bw * 0.29;
      ctx.moveTo(xPanel, midY);
      ctx.lineTo(xPanel, midY + bh * 0.14);
      ctx.moveTo(xPanel, midY + bh * 0.28);
      ctx.lineTo(xPanel, by + bh);

      var xKitchen = bx + bw * 0.67;
      ctx.moveTo(xKitchen, midY);
      ctx.lineTo(xKitchen, midY + bh * 0.18);
      ctx.moveTo(xKitchen, midY + bh * 0.32);
      ctx.lineTo(xKitchen, by + bh);
      ctx.stroke();

      // Room architectural labels
      ctx.font = '600 9px "IBM Plex Mono", monospace';
      ctx.fillStyle = 'rgba(148, 163, 184, 0.65)';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText('ГОСТИНАЯ', bx + 8, by + 7);
      ctx.fillText('КАБИНЕТ', midXTop + 8, by + 7);
      ctx.fillText('ЩИТОВАЯ', bx + 7, midY + 6);
      ctx.fillText('ПРИХОЖАЯ', xPanel + 8, midY + 6);
      ctx.fillText('КУХНЯ', xKitchen + 8, midY + 6);

      // Interactive pointer thermal scan ring
      if (pointerX >= 0 && pointerY >= 0 && !finished) {
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.42)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.arc(pointerX * w, pointerY * h, 28, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Forensic inspection nodes & origin markers
      var pulse = 0.5 + 0.5 * Math.sin(now * 0.006);
      for (k = 0; k < nodes.length; k++) {
        var node = nodes[k];
        var cx = node.x * w;
        var cy = node.y * h;
        var isFoc = focusedNode === node;

        if (node.marked) {
          // Red/Amber arson origin target marker
          ctx.fillStyle = finished ? 'rgba(34, 197, 94, 0.28)' : 'rgba(220, 38, 38, 0.28)';
          ctx.beginPath();
          ctx.arc(cx, cy, 15 + pulse * 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = finished ? '#22c55e' : '#ef4444';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(cx, cy, 11, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = finished ? '#4ade80' : '#fca5a5';
          ctx.font = '700 10px "IBM Plex Mono", monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('О', cx, cy + 0.5);
        } else {
          // Unmarked inspectable zone ring
          ctx.fillStyle = isFoc ? 'rgba(245, 158, 11, 0.25)' : 'rgba(15, 23, 42, 0.72)';
          ctx.beginPath();
          ctx.arc(cx, cy, isFoc ? 11 : 8.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = isFoc ? '#f59e0b' : node.scanned ? '#38bdf8' : '#94a3b8';
          ctx.lineWidth = isFoc ? 2 : 1.4;
          ctx.beginPath();
          ctx.arc(cx, cy, isFoc ? 11 : 8.5, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = isFoc ? '#fde68a' : '#cbd5e1';
          ctx.beginPath();
          ctx.arc(cx, cy, 2.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Blueprint header/footer metadata
      ctx.font = '600 9.5px "IBM Plex Mono", monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText('ПЛАН 1-ГО ЭТАЖА • МАСШТАБ 1:100', 10, 7);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#f59e0b';
      ctx.fillText('V-КОНУС: ТЕРМОАНАЛИЗ', w - 10, 7);

      if (finished) {
        ctx.fillStyle = 'rgba(5, 46, 22, 0.9)';
        ctx.fillRect(w / 2 - 105, h / 2 - 18, 210, 36);
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 1.6;
        ctx.strokeRect(w / 2 - 105, h / 2 - 18, 210, 36);
        ctx.fillStyle = '#4ade80';
        ctx.font = '700 12px "IBM Plex Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('ПОДЖОГ ПОДТВЕРЖДЁН', w / 2, h / 2 + 0.5);
      }

      if (redFlash > 0.01) {
        ctx.fillStyle = 'rgba(220, 38, 38, ' + (redFlash * 0.36).toFixed(3) + ')';
        ctx.fillRect(0, 0, w, h);
      }
    }

    function render(now) {
      var dt = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;
      if (redFlash > 0) redFlash = Math.max(0, redFlash - dt * 2.5);

      var metrics = canvasMgr.getMetrics();
      var ctx = canvas.getContext('2d');
      ctx.save();
      ctx.scale(metrics.dpr, metrics.dpr);
      drawBlueprint(ctx, metrics.width, metrics.height, now);
      ctx.restore();

      timers.raf(render);
    }

    timers.raf(render);

    return function cleanup() {
      timers.clearAll();
      listeners.clearAll();
      canvasMgr.destroy();
      containerEl.innerHTML = '';
    };
  }

  function initArsonLab(containerEl, config, callbacks) {
    config = config || {};
    if (config.mode === 'map') {
      return initArsonMap(containerEl, config, callbacks);
    }
    return initArsonChem(containerEl, config, callbacks);
  }

  // ============================================================================
  // REGISTRATION
  // ============================================================================

  window.GameMinigames.register('crime_camera', initCrimeCamera);
  window.GameMinigames.register('ballistics', initBallistics);
  window.GameMinigames.register('arson_lab', initArsonLab);
})();
