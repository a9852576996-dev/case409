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
  // MINIGAME 1: crime_camera (Multi-scenario 3-phase forensic camera & CCTV)
  // ============================================================================

  var CAM_EXTRA_STYLE_ID = 'minigames-forensics-cam-extra';

  var CAM_EXTRA_CSS = [
    '.mg-cam-meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-top: 3px; }',
    '.mg-cam-stat { font-family: "IBM Plex Mono", monospace; font-size: 10.5px; font-weight: 600; color: var(--case-accent, #c98a2e); }',
    '.mg-cam-err { font-family: "IBM Plex Mono", monospace; font-size: 10.5px; font-weight: 600; color: #9ca3af; }',
    '.mg-cam-err.is-warn { color: #f87171; }',
    '.mg-cam-views { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; }',
    '.mg-cam-vbtn {',
    '  display: flex; align-items: center; justify-content: center; gap: 6px;',
    '  padding: 7px 6px; border-radius: 6px; background: #14171f; border: 1px solid #2b3140;',
    '  font-family: "IBM Plex Mono", monospace; font-size: 10px; font-weight: 600;',
    '  color: #8f98a8; text-transform: uppercase; cursor: pointer;',
    '}',
    '.mg-cam-vbtn.is-active { background: #1f2532; border-color: var(--case-accent, #c98a2e); color: #f3ece0; }',
    '.mg-cam-vdot { width: 6px; height: 6px; border-radius: 50%; background: var(--case-accent, #c98a2e); flex-shrink: 0; }',
    '.mg-cam-vbtn.is-done .mg-cam-vdot { background: #22c55e; box-shadow: 0 0 6px rgba(34, 197, 94, 0.65); }',
    '.mg-cam-modes { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; }',
    '.mg-cam-mbtn {',
    '  padding: 8px 6px; border-radius: 6px; background: #161a23; border: 1px solid #2f3646;',
    '  font-family: "IBM Plex Mono", monospace; font-size: 10px; font-weight: 700;',
    '  color: #9ca3af; text-transform: uppercase; cursor: pointer;',
    '}',
    '.mg-cam-mbtn.is-norm { background: rgba(212, 202, 180, 0.14); border-color: #d4cab4; color: #f5efe2; }',
    '.mg-cam-mbtn.is-spec { background: rgba(201, 138, 46, 0.24); border-color: var(--case-accent, #f59e0b); color: #fde68a; box-shadow: 0 0 10px rgba(245, 158, 11, 0.24); }',
    '.mg-cam-deduce { display: flex; flex-direction: column; gap: 9px; padding: 12px; background: #14171f; border: 1px solid #353b4a; border-top: 3px solid var(--case-accent, #c98a2e); border-radius: 8px; }',
    '.mg-cam-dkicker { font-family: "IBM Plex Mono", monospace; font-size: 10px; font-weight: 700; color: var(--case-accent, #c98a2e); text-transform: uppercase; }',
    '.mg-cam-dfacts { padding: 8px 9px; background: #0d1016; border: 1px solid #262b36; border-radius: 6px; font-family: "IBM Plex Mono", monospace; font-size: 10px; line-height: 1.4; color: #c2cad8; display: flex; flex-direction: column; gap: 3px; }',
    '.mg-cam-dq { font-size: 12.8px; line-height: 1.4; color: #f3efe6; font-weight: 500; }',
    '.mg-cam-dopts { display: flex; flex-direction: column; gap: 6px; }',
    '.mg-cam-dopt { width: 100%; text-align: left; padding: 9px 10px; background: #1b202b; border: 1px solid #353d4e; border-radius: 6px; color: #e4e0d8; font-size: 12px; line-height: 1.36; cursor: pointer; }',
    '.mg-cam-dopt.is-wrong { border-color: #ef4444; background: rgba(153, 27, 27, 0.25); color: #fecaca; }',
    '.mg-cam-dopt.is-correct { border-color: #22c55e; background: rgba(34, 197, 94, 0.2); color: #bbf7d0; }',
    '.mg-cam-dfb { font-family: "IBM Plex Mono", monospace; font-size: 10.5px; line-height: 1.38; min-height: 16px; color: #fca5a5; }',
    '.mg-cam-dfb.is-ok { color: #86efac; }',
    '.mg-cam-stamp-box { padding: 24px 14px; background: #0d1016; border: 1px solid #2a2e38; border-radius: 8px; display: flex; flex-direction: column; align-items: center; gap: 14px; text-align: center; }',
    '.mg-cam-stamp { padding: 8px 16px; font-family: "Oswald", sans-serif; font-size: 19px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #ef4444; border: 3px double #ef4444; border-radius: 4px; transform: rotate(-5deg); }',
    '.mg-cam-stamp.is-ok { color: #4ade80; border-color: #22c55e; background: rgba(34, 197, 94, 0.12); }'
  ].join('\n');

  function injectCamStyles() {
    if (document.getElementById(CAM_EXTRA_STYLE_ID)) return;
    var el = document.createElement('style');
    el.id = CAM_EXTRA_STYLE_ID;
    el.textContent = CAM_EXTRA_CSS;
    document.head.appendChild(el);
  }

  function createFailTrigger(callbacks) {
    var fired = false;
    return function triggerFail(result) {
      if (fired) return;
      fired = true;
      if (callbacks && typeof callbacks.onFail === 'function') {
        callbacks.onFail(result || { success: false });
      }
    };
  }

  function buildCamCase418Scenario(config) {
    return {
      id: 'case418_act1_camera',
      theme: 'ash',
      title: config.title || 'ОСМОТР МЕСТА: ПЕПЕЛИЩЕ',
      subtitle: config.subtitle || 'ДЕЛО №418 • ФОТОФИКСАЦИЯ УЛИК',
      hudTag: 'SK-CAM 35MM • ISO 3200',
      modeNormalLabel: '1. ВИД / РАСЧИСТКА',
      modeSpecLabel: '2. КОСАЯ ВСПЫШКА',
      shootLabel: 'СНЯТЬ КАДР',
      stampWin: 'ПРОТОКОЛ ОСМОТРА ГОТОВ',
      views: [
        { id: 0, label: '1. ВНУТРИ ДОМА' },
        { id: 1, label: '2. БАЛКИ И ДВОР' }
      ],
      spots: [
        {
          id: 'panel', view: 0, x: 0.18, y: 0.38, focusTarget: 26, kind: 'panel',
          isEvidence: true, requiredMode: 'spec', debris: 0,
          shortLabel: 'ЩИТОК', label: 'Щиток (целый внутри, обгорел снаружи)',
          readNormal: 'Корпус электрощитка чёрный от копоти. Внутри темно — включите КОСУЮ ВСПЫШКУ, чтобы увидеть жилы.',
          readSpec: 'ВСПЫШКА: медные жилы и автоматы внутри щитка абсолютно целые — короткого замыкания не было!',
          wrongModeMsg: 'Без КОСОЙ ВСПЫШКИ не видно целые провода внутри щитка — включите вспышку!'
        },
        {
          id: 'door', view: 0, x: 0.50, y: 0.44, focusTarget: 64, kind: 'door',
          isEvidence: true, requiredMode: 'spec', debris: 0,
          shortLabel: 'ДВЕРЬ', label: 'След отжима ломом на дверной коробке',
          readNormal: 'Тёмная щель у замка перекошенной двери. Включите КОСУЮ ВСПЫШКУ для выявления рельефа вмятин.',
          readSpec: 'ВСПЫШКА: свежие светлые щепки и парные вмятины стального лома прямо у защёлки замка!',
          wrongModeMsg: 'Рельеф следа от лома не читается без КОСОЙ ВСПЫШКИ — включите вспышку!'
        },
        {
          id: 'floor', view: 0, x: 0.58, y: 0.80, focusTarget: 46, kind: 'floor',
          isEvidence: true, requiredMode: 'any', debris: 1.0, debrisKind: 'ash',
          debrisHint: 'Мокрая куча пепла и штукатурки — потрите пальцем в режиме ВИД/РАСЧИСТКА.',
          shortLabel: 'ПРОГАР', label: 'Три независимых очага прогара на полу',
          readNormal: 'Три глубокие кольцевые воронки прогара на досках с чистыми перемычками между ними!',
          readSpec: 'ВСПЫШКА: чёткий контур трёх отдельных очагов розлива горючего на полу!',
          wrongModeMsg: ''
        },
        {
          id: 'decoy_kettle', view: 0, x: 0.82, y: 0.64, focusTarget: 52, kind: 'kettle',
          isEvidence: false, requiredMode: 'any', debris: 0,
          shortLabel: '', label: 'Оплавленный электрочайник',
          readNormal: 'Корпус бытового электрочайника потёк на полу у перегородки.',
          readSpec: 'ВСПЫШКА: вилка не в розетке, пластик расплавился от внешнего жара сверху.',
          falseReason: 'ЛОЖНЫЙ СЛЕД: бытовой чайник расплавился от общего жара, его вилка даже не была включена.'
        },
        {
          id: 'decoy_glass', view: 0, x: 0.24, y: 0.76, focusTarget: 34, kind: 'glass',
          isEvidence: false, requiredMode: 'any', debris: 0,
          shortLabel: '', label: 'Осколки оконного стекла',
          readNormal: 'Мелкая паутина оплавленного оконного стекла на полу.',
          readSpec: 'ВСПЫШКА: типичное термическое разрушение рамы изнутри при пожаре.',
          falseReason: 'ЛОЖНЫЙ СЛЕД: обычные осколки лопнувшего от жара стекла — не улика поджога.'
        },
        {
          id: 'beam', view: 1, x: 0.34, y: 0.26, focusTarget: 82, kind: 'beam',
          isEvidence: true, requiredMode: 'spec', debris: 0,
          shortLabel: 'ПУЛЯ', label: 'Пуля в обугленной потолочной балке',
          readNormal: 'Тёмное отверстие в обугленной балке — похоже на выпавший сучок. Проверьте КОСОЙ ВСПЫШКОЙ!',
          readSpec: 'ВСПЫШКА: глубоко в щепках блестит медная оболочка деформированной пули!',
          wrongModeMsg: 'В тусклом свете отверстие неотличимо от сучка — подсветите пулю КОСОЙ ВСПЫШКОЙ!'
        },
        {
          id: 'canister', view: 1, x: 0.76, y: 0.68, focusTarget: 20, kind: 'canister',
          isEvidence: true, requiredMode: 'any', debris: 1.0, debrisKind: 'bush',
          debrisHint: 'Густые обгоревшие ветки за крыльцом — раздвиньте пальцем в режиме ВИД/РАСЧИСТКА.',
          shortLabel: 'КАНИСТРА', label: 'Оплавленная канистра в кустах за крыльцом',
          readNormal: 'Красная канистра с резким запахом растворителя, брошенная за крыльцом!',
          readSpec: 'ВСПЫШКА: чётко видны оплавленный угол канистры и отпечаток пробки!',
          wrongModeMsg: ''
        },
        {
          id: 'decoy_knot', view: 1, x: 0.70, y: 0.24, focusTarget: 76, kind: 'knot',
          isEvidence: false, requiredMode: 'any', debris: 0,
          shortLabel: '', label: 'Выемка в балке справа',
          readNormal: 'Тёмное углубление в обгоревшем брусе над верандой.',
          readSpec: 'ВСПЫШКА: гладкие стенки старого выпавшего сучка, металла внутри нет.',
          falseReason: 'ЛОЖНЫЙ СЛЕД: это пустой древесный сучок без металлических фрагментов.'
        },
        {
          id: 'decoy_watering', view: 1, x: 0.24, y: 0.72, focusTarget: 30, kind: 'watering',
          isEvidence: false, requiredMode: 'any', debris: 0,
          shortLabel: '', label: 'Пластиковая лейка у крыльца',
          readNormal: 'Зелёная садовая ёмкость, закопчённая с одного бока.',
          readSpec: 'ВСПЫШКА: обычная дачная лейка с рассеивателем, внутри дождевая вода.',
          falseReason: 'ЛОЖНЫЙ СЛЕД: старая садовая лейка с водой — не канистра поджигателя.'
        }
      ],
      conclusion: {
        question: 'На пяти резких кадрах: щиток цел внутри, дверь отжата ломом, на полу три очага, в балке пуля, в кустах канистра. Вывод:',
        options: [
          {
            id: 'wiring',
            text: 'Пожар начался из-за короткого замыкания щитка, а дверь выломали пожарные при тушении.',
            isCorrect: false,
            reason: 'Противоречие: медные жилы внутри щитка целы, а в балке застряла пуля.'
          },
          {
            id: 'arson_murder',
            text: 'Это не бытовой пожар: в дом вломились ломом, открыли стрельбу и устроили умышленный поджог из трёх очагов.',
            isCorrect: true,
            reason: 'Верно: все пять снимков опровергают версию о проводке и доказывают насильственный поджог.'
          },
          {
            id: 'accident',
            text: 'Вспыхнула случайная канистра у крыльца, а чайник вызвал взрыв оконных стёкол.',
            isCorrect: false,
            reason: 'Противоречие: три изолированных очага внутри дома, след лома и пуля в балке исключают случайность.'
          }
        ]
      }
    };
  }

  function buildCamCase412Scenario(config) {
    return {
      id: 'case412_act2_camera',
      theme: 'cctv',
      title: config.title || 'БУФЕР КАМЕРЫ БЕЛЯЕВА // ДЕЛО №412',
      subtitle: config.subtitle || 'АКТ II • ВОССТАНОВЛЕНИЕ ПОВРЕЖДЁННЫХ КАДРОВ',
      hudTag: 'CCTV-REC #12 • IR CACHE',
      modeNormalLabel: '1. КЭШ / ДЕФРАГМ.',
      modeSpecLabel: '2. ИК-КОНТРАСТ',
      shootLabel: 'СОХРАНИТЬ КАДР',
      stampWin: 'ФРАГМЕНТЫ КАМЕРЫ ВОССТАНОВЛЕНЫ',
      views: [
        { id: 0, label: '1. НОЧЬ 21:53' },
        { id: 1, label: '2. УТРО 08:15' }
      ],
      spots: [
        {
          id: 'car_dark', view: 0, x: 0.24, y: 0.56, focusTarget: 34, kind: 'car',
          isEvidence: true, requiredMode: 'any', debris: 1.0, debrisKind: 'glitch',
          debrisHint: 'Битые сектора видеокэша — сотрите помехи пальцем в режиме КЭШ/ДЕФРАГМ.',
          shortLabel: 'УНИВЕРСАЛ', label: 'Тёмный универсал без фар у забора №14',
          readNormal: 'Между забором Беляева и участком №14 стоит тёмный универсал с погашенными фарами!',
          readSpec: 'ИК-КОНТРАСТ: кузов универсала с открытым багажником припаркован прямо у ворот Кравцова.',
          wrongModeMsg: ''
        },
        {
          id: 'silhouette', view: 0, x: 0.72, y: 0.54, focusTarget: 72, kind: 'silhouette',
          isEvidence: true, requiredMode: 'spec', debris: 0,
          shortLabel: 'СИЛУЭТ', label: 'Силуэт тащит тяжесть в открытый гараж Кравцова',
          readNormal: 'Глубокая ночная тень у открытых створок гаража №14. Включите ИК-КОНТРАСТ, чтобы проявить контур!',
          readSpec: 'ИК-КОНТРАСТ: сгорбленный силуэт затаскивает тяжёлую ношу прямо в старый гараж Кравцова!',
          wrongModeMsg: 'В темноте силуэт сливается со стеной гаража — включите ИК-КОНТРАСТ!'
        },
        {
          id: 'timecode_gap', view: 0, x: 0.22, y: 0.18, focusTarget: 18, kind: 'timecode',
          isEvidence: true, requiredMode: 'spec', debris: 0,
          shortLabel: '21:53 GAP', label: 'Таймкод 21:53 и вырезанный интервал 14 минут',
          readNormal: 'Верхний штамп времени 21:53 выглядит смазанным. Проверьте метаданные в режиме ИК-КОНТРАСТ!',
          readSpec: 'ИК-КОНТРАСТ: CRC-разрыв буфера! После 21:53 вручную стёрты ровно 14 минут записи (до 22:07)!',
          wrongModeMsg: 'Служебный маркер стирания виден только в режиме ИК-КОНТРАСТ!'
        },
        {
          id: 'decoy_cat', view: 0, x: 0.50, y: 0.80, focusTarget: 48, kind: 'cat',
          isEvidence: false, requiredMode: 'any', debris: 0,
          shortLabel: '', label: 'Движение у канавы',
          readNormal: 'Две яркие белые точки в траве на краю Садовой улицы.',
          readSpec: 'ИК-КОНТРАСТ: бродячий кот перебегает дренажную канаву — ложное срабатывание датчика.',
          falseReason: 'ЛОЖНЫЙ СЛЕД: это бродячий кот у канавы, не имеющий отношения к пропаже.'
        },
        {
          id: 'decoy_glare', view: 0, x: 0.84, y: 0.24, focusTarget: 84, kind: 'glare',
          isEvidence: false, requiredMode: 'any', debris: 0,
          shortLabel: '', label: 'Засвет на заборе',
          readNormal: 'Светлое пятно в верхнем правом углу кадра.',
          readSpec: 'ИК-КОНТРАСТ: блик уличного фонаря на мокром профлисте под дождём.',
          falseReason: 'ЛОЖНЫЙ СЛЕД: обычный блик ночного фонаря на мокром заборе.'
        },
        {
          id: 'patrol_uaz', view: 1, x: 0.30, y: 0.54, focusTarget: 40, kind: 'patrol',
          isEvidence: true, requiredMode: 'any', debris: 1.0, debrisKind: 'glitch',
          debrisHint: 'Повреждённый блок утреннего кэша — сотрите помехи пальцем в режиме КЭШ/ДЕФРАГМ.',
          shortLabel: 'ПАТРУЛЬ', label: 'Патрульный УАЗ Громова у ворот Беляева (08:15)',
          readNormal: 'Утром в 08:15 прямо у ворот участка №12 стоит служебный патрульный автомобиль Громова!',
          readSpec: 'ИК-КОНТРАСТ: чётко видна синяя полоса МВД и бортовой номер машины участкового Громова!',
          wrongModeMsg: ''
        },
        {
          id: 'gromov_usb', view: 1, x: 0.72, y: 0.50, focusTarget: 68, kind: 'usb',
          isEvidence: true, requiredMode: 'spec', debris: 0,
          shortLabel: 'ИЗЪЯТИЕ', label: 'Передача накопителя у калитки Беляева',
          readNormal: 'Две фигуры у калитки №12 в контровом утреннем свете. Включите ИК-КОНТРАСТ для детализации!',
          readSpec: 'ИК-КОНТРАСТ: сосед Беляев передаёт участковому Громову накопитель с видеорегистратора!',
          wrongModeMsg: 'В контровом свете не видно, что передают у калитки — включите ИК-КОНТРАСТ!'
        },
        {
          id: 'decoy_postbox', view: 1, x: 0.86, y: 0.72, focusTarget: 26, kind: 'postbox',
          isEvidence: false, requiredMode: 'any', debris: 0,
          shortLabel: '', label: 'Ящик на столбе у забора',
          readNormal: 'Металлический короб на углу забора участка №12.',
          readSpec: 'ИК-КОНТРАСТ: обычный почтовый ящик с номером дома «12».',
          falseReason: 'ЛОЖНЫЙ СЛЕД: обычный почтовый ящик Беляева без признаков взлома.'
        },
        {
          id: 'decoy_rut', view: 1, x: 0.48, y: 0.82, focusTarget: 55, kind: 'rut',
          isEvidence: false, requiredMode: 'any', debris: 0,
          shortLabel: '', label: 'Следы на обочине',
          readNormal: 'Широкие грязные полосы вдоль раскисшей обочины.',
          readSpec: 'ИК-КОНТРАСТ: старая глубокая колея от трактора, заполненная дождевой водой.',
          falseReason: 'ЛОЖНЫЙ СЛЕД: старая размытая колея коммунальной техники на обочине.'
        }
      ],
      conclusion: {
        question: 'В 21:53 у участка №14 стоял тёмный универсал, силуэт тащил тяжесть в гараж Кравцова, 14 минут записи стёрты, а в 08:15 приезжал Громов. Вывод:',
        options: [
          {
            id: 'artem_theory',
            text: 'Алина уехала с Артёмом на универсале, а ночная запись повредилась сама из-за грозы.',
            isCorrect: false,
            reason: 'Противоречие: силуэт тащил тяжесть внутрь гаража Кравцова, а утром запись изымал Громов.'
          },
          {
            id: 'garage_coverup',
            text: 'В 21:53 Алину затащили в гараж Кравцова (участок №14), а утром участковый Громов помог зачистить 14 минут с камеры Беляева.',
            isCorrect: true,
            reason: 'Верно: все пять кадров буфера складываются в единую картину похищения и сокрытия улик.'
          },
          {
            id: 'belyaev_alone',
            text: 'Камера Беляева сняла только случайного кота и утренний объезд участкового без нарушений.',
            isCorrect: false,
            reason: 'Противоречие: в буфере зафиксированы силуэт у открытого гаража №14 и ручное удаление 14 минут.'
          }
        ]
      }
    };
  }

  function buildCamGenericScenario(config, storyNode) {
    var title = (config && config.title) || (storyNode && storyNode.title) || 'ФОТОФИКСАЦИЯ УЛИК';
    var raw = Array.isArray(config && config.points) && config.points.length > 0 ? config.points : [
      { id: 'pt_1', label: 'Улика #1 (левый сектор)', shortLabel: 'УЛИКА 1', x: 0.25, y: 0.42, focusTarget: 32 },
      { id: 'pt_2', label: 'Улика #2 (центр)', shortLabel: 'УЛИКА 2', x: 0.54, y: 0.56, focusTarget: 62 },
      { id: 'pt_3', label: 'Улика #3 (правый сектор)', shortLabel: 'УЛИКА 3', x: 0.78, y: 0.36, focusTarget: 78 }
    ];
    var spots = raw.map(function (p, i) {
      return {
        id: p.id || 'pt_' + i,
        view: 0,
        x: clamp(typeof p.x === 'number' ? p.x : 0.25 + i * 0.22, 0.14, 0.86),
        y: clamp(typeof p.y === 'number' ? p.y : 0.48, 0.18, 0.82),
        focusTarget: clamp(typeof p.focusTarget === 'number' ? p.focusTarget : 45 + i * 15, 14, 86),
        kind: p.kind || 'custom',
        isEvidence: true,
        requiredMode: i === 0 ? 'spec' : 'any',
        debris: i === 1 ? 1.0 : 0,
        debrisKind: 'ash',
        debrisHint: 'Помеха перекрывает объект — потрите пальцем в режиме ОСМОТР.',
        shortLabel: p.shortLabel || ('УЛИКА ' + (i + 1)),
        label: p.label || ('Улика #' + (i + 1)),
        readNormal: 'Зафиксируйте объект при чётком фокусе (включите СПЕЦСВЕТ при необходимости).',
        readSpec: 'СПЕЦСВЕТ: ключевые признаки улики отчётливо читаются в кадре!',
        wrongModeMsg: 'Переключитесь в СПЕЦСВЕТ для фиксации скрытой детали!'
      };
    });
    spots.push({
      id: 'gen_decoy', view: 0, x: 0.36, y: 0.76, focusTarget: 40, kind: 'glass',
      isEvidence: false, requiredMode: 'any', debris: 0, shortLabel: '',
      label: 'Посторонний бытовой фрагмент',
      readNormal: 'Случайный мусор на месте осмотра.',
      readSpec: 'СПЕЦСВЕТ: следов преступления не обнаружено.',
      falseReason: 'ЛОЖНЫЙ СЛЕД: посторонний бытовой предмет без криминалистической ценности.'
    });

    return {
      id: 'generic_camera',
      theme: 'ash',
      title: title,
      subtitle: (config && config.subtitle) || 'КРИМИНАЛИСТИЧЕСКАЯ СЪЁМКА',
      hudTag: 'SK-CAM • FORENSIC',
      modeNormalLabel: '1. ВИД / РАСЧИСТКА',
      modeSpecLabel: '2. СПЕЦСВЕТ',
      shootLabel: 'СНЯТЬ КАДР',
      stampWin: 'ФОТОПРОТОКОЛ ЗАВЕРШЁН',
      views: [{ id: 0, label: 'ОСНОВНОЙ РАКУРС' }],
      spots: spots,
      conclusion: {
        question: 'Все ключевые вещественные детали зафиксированы в фотопротоколе. Итоговый вывод:',
        options: [
          { id: 'noise', text: 'Снимки показывают только бытовой шум без следов преступления.', isCorrect: false, reason: 'Противоречие: в кадре зафиксированы явные криминалистические улики.' },
          { id: 'confirmed', text: 'Фотопротокол подтверждает наличие вещественных улик, подлежащих приобщению к делу.', isCorrect: true, reason: 'Верно: снимки пригодны для приобщения к материалам.' },
          { id: 'defect', text: 'Камера неисправна, кадры непригодны.', isCorrect: false, reason: 'Противоречие: все кадры сняты с резкостью выше 85%.' }
        ]
      }
    };
  }

  function resolveCamScenario(config) {
    var cfg = config || {};
    var caseId = String(window.ACTIVE_CASE_ID || '').toLowerCase();
    var nodeId = '';
    try {
      if (window.GameEngine && typeof window.GameEngine.getState === 'function') {
        var st = window.GameEngine.getState();
        if (st && st.nodeId) nodeId = String(st.nodeId);
      }
    } catch (e) {}
    var storyNode = null;
    try {
      if (window.GameStory && window.GameStory.nodes && nodeId) {
        storyNode = window.GameStory.nodes[nodeId] || null;
      }
    } catch (e) {}

    if (Array.isArray(cfg.points) && cfg.points.length > 0) {
      return buildCamGenericScenario(cfg, storyNode);
    }
    var hint = String(cfg.title || (storyNode && storyNode.title) || '');
    if (cfg.preset === 'case412_cctv' || caseId === 'case412' || nodeId === 'act2_mg_camera' || /беляев|буфер/i.test(hint)) {
      return buildCamCase412Scenario(cfg);
    }
    if (cfg.preset === 'case418_ash' || caseId === 'case418' || nodeId === 'act1_camera_game') {
      return buildCamCase418Scenario(cfg);
    }
    return buildCamGenericScenario(cfg, storyNode);
  }

  /* ===== PROCEDURAL SCENE RENDERERS (CASE418 & CASE412) ===== */

  function findSpotCoord(spots, kind, view, w, h, fx, fy) {
    for (var i = 0; i < spots.length; i++) {
      if (spots[i].view === view && spots[i].kind === kind) {
        return { x: spots[i].x * w, y: spots[i].y * h };
      }
    }
    return { x: fx * w, y: fy * h };
  }

  function drawCamSceneLayer(offCanvas, scenario, viewId, isSpec) {
    var w = offCanvas.width;
    var h = offCanvas.height;
    var ctx = offCanvas.getContext('2d');
    var spots = scenario.spots;
    var rand = mulberry32(scenario.id === 'case412_act2_camera' ? 41202 + viewId * 91 : 41801 + viewId * 77);
    var i;

    if (scenario.id === 'case412_act2_camera') {
      // Grainy green-grey CCTV night/morning camera
      var isNight = viewId === 0;
      var bg = ctx.createLinearGradient(0, 0, 0, h);
      if (isNight) {
        bg.addColorStop(0, isSpec ? '#081a14' : '#060c0a');
        bg.addColorStop(0.55, isSpec ? '#112922' : '#0b1411');
        bg.addColorStop(1, isSpec ? '#0c1d17' : '#070c0a');
      } else {
        bg.addColorStop(0, isSpec ? '#1a2630' : '#263038');
        bg.addColorStop(0.45, isSpec ? '#1f2b33' : '#303940');
        bg.addColorStop(1, isSpec ? '#10181d' : '#181e22');
      }
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Perspective street & fence horizon
      var horizonY = h * 0.44;
      ctx.fillStyle = isNight ? (isSpec ? '#152c23' : '#0e1714') : '#1f262b';
      ctx.beginPath();
      ctx.moveTo(0, h * 0.62);
      ctx.lineTo(w, h * 0.56);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();

      // Fence planks across background
      ctx.fillStyle = isNight ? (isSpec ? '#173026' : '#0d1512') : '#232c33';
      ctx.fillRect(0, h * 0.24, w, h * 0.36);
      ctx.strokeStyle = isNight ? 'rgba(134, 239, 172, 0.14)' : 'rgba(203, 213, 225, 0.16)';
      ctx.lineWidth = 2;
      for (i = 0; i < w; i += 28) {
        ctx.beginPath(); ctx.moveTo(i, h * 0.24); ctx.lineTo(i, h * 0.60); ctx.stroke();
      }

      if (isNight) {
        // FRAME 0: NIGHT 21:53
        // Open brick garage on right side
        var gx = w * 0.60;
        var gy = h * 0.25;
        ctx.fillStyle = isSpec ? '#1c352a' : '#121c18';
        ctx.fillRect(gx, gy, w * 0.28, h * 0.40);
        // Open dark garage doorway
        ctx.fillStyle = '#030605';
        ctx.fillRect(gx + w * 0.05, gy + h * 0.08, w * 0.17, h * 0.32);
        // Open double doors swung outward
        ctx.strokeStyle = isSpec ? '#4ade80' : '#263b32';
        ctx.lineWidth = 3;
        ctx.strokeRect(gx + w * 0.01, gy + h * 0.08, w * 0.04, h * 0.31);
        ctx.strokeRect(gx + w * 0.22, gy + h * 0.08, w * 0.04, h * 0.31);

        // 1. Dark station wagon (car)
        var pCar = findSpotCoord(spots, 'car', 0, w, h, 0.24, 0.56);
        ctx.save();
        ctx.translate(pCar.x, pCar.y);
        ctx.fillStyle = isSpec ? '#233d33' : '#111916';
        ctx.beginPath();
        ctx.moveTo(-110, 26); ctx.lineTo(-104, -12); ctx.lineTo(-56, -42);
        ctx.lineTo(58, -42); ctx.lineTo(106, -12); ctx.lineTo(114, 26); ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = isSpec ? '#86efac' : '#2d473d';
        ctx.lineWidth = 2;
        ctx.stroke();
        // Darkened glass windows & unlit headlights
        ctx.fillStyle = '#060c0a';
        ctx.fillRect(-46, -34, 42, 22);
        ctx.fillRect(4, -34, 48, 22);
        ctx.fillStyle = '#0a0d0c';
        ctx.beginPath(); ctx.arc(-66, 26, 20, 0, Math.PI * 2); ctx.arc(68, 26, 20, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = isSpec ? '#6ee7b7' : '#334155';
        ctx.stroke();
        // Open tailgate hint
        ctx.strokeStyle = isSpec ? '#fde68a' : '#2d473d';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(58, -42); ctx.lineTo(118, -64); ctx.stroke();
        ctx.restore();

        // 2. Hunched silhouette dragging bundle toward open garage
        var pSil = findSpotCoord(spots, 'silhouette', 0, w, h, 0.72, 0.54);
        ctx.save();
        ctx.translate(pSil.x, pSil.y);
        ctx.fillStyle = isSpec ? '#a7f3d0' : '#0a120f';
        ctx.strokeStyle = isSpec ? '#4ade80' : 'rgba(60, 95, 80, 0.22)';
        ctx.lineWidth = isSpec ? 3 : 1;
        // Hunched person torso + head + dragging arms
        ctx.beginPath(); ctx.arc(-18, -46, 15, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-26, -30); ctx.quadraticCurveTo(4, -22, 16, 12);
        ctx.lineTo(-10, 56); ctx.lineTo(-34, 56); ctx.lineTo(-28, 6); ctx.closePath();
        ctx.fill(); ctx.stroke();
        // Dragged heavy silhouette bundle
        ctx.fillStyle = isSpec ? '#fde68a' : '#070e0b';
        ctx.beginPath(); ctx.ellipse(28, 30, 38, 17, 0.22, 0, Math.PI * 2); ctx.fill();
        if (isSpec) { ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2.2; ctx.stroke(); }
        ctx.restore();

        // 3. Timecode overlay + 14-min CRC deletion gap (top-left)
        var pTc = findSpotCoord(spots, 'timecode', 0, w, h, 0.22, 0.18);
        ctx.save();
        ctx.fillStyle = 'rgba(4, 10, 8, 0.82)';
        ctx.fillRect(pTc.x - 120, pTc.y - 36, 240, 72);
        ctx.strokeStyle = isSpec ? '#ef4444' : 'rgba(134, 239, 172, 0.35)';
        ctx.lineWidth = 2;
        ctx.strokeRect(pTc.x - 120, pTc.y - 36, 240, 72);
        ctx.font = '700 22px "IBM Plex Mono", monospace';
        ctx.fillStyle = '#bbf7d0';
        ctx.textAlign = 'center';
        ctx.fillText('CAM-12  21:53:04', pTc.x, pTc.y - 6);
        if (isSpec) {
          ctx.font = '700 14px "IBM Plex Mono", monospace';
          ctx.fillStyle = '#f87171';
          ctx.fillText('! GAP: 21:54-22:07 (14M DEL) !', pTc.x, pTc.y + 22);
        } else {
          ctx.font = '600 12px "IBM Plex Mono", monospace';
          ctx.fillStyle = 'rgba(134, 239, 172, 0.38)';
          ctx.fillText('REC • IR AUTO', pTc.x, pTc.y + 20);
        }
        ctx.restore();

        // Decoy: Cat glowing eyes near ditch
        var pCat = findSpotCoord(spots, 'cat', 0, w, h, 0.50, 0.80);
        ctx.fillStyle = '#0c1411';
        ctx.beginPath(); ctx.ellipse(pCat.x, pCat.y + 10, 22, 13, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ecfccb';
        ctx.beginPath(); ctx.arc(pCat.x - 7, pCat.y, 4, 0, Math.PI * 2); ctx.arc(pCat.x + 7, pCat.y, 4, 0, Math.PI * 2); ctx.fill();

        // Decoy: Wet lamp glare on fence
        var pGlare = findSpotCoord(spots, 'glare', 0, w, h, 0.84, 0.24);
        var gg = ctx.createRadialGradient(pGlare.x, pGlare.y, 4, pGlare.x, pGlare.y, 42);
        gg.addColorStop(0, 'rgba(220, 252, 231, 0.65)');
        gg.addColorStop(1, 'rgba(220, 252, 231, 0)');
        ctx.fillStyle = gg;
        ctx.beginPath(); ctx.arc(pGlare.x, pGlare.y, 42, 0, Math.PI * 2); ctx.fill();
      } else {
        // FRAME 1: MORNING 08:15
        // Timestamp top-left
        ctx.fillStyle = 'rgba(10, 14, 18, 0.78)';
        ctx.fillRect(28, 22, 225, 38);
        ctx.font = '700 20px "IBM Plex Mono", monospace';
        ctx.fillStyle = '#e2e8f0';
        ctx.textAlign = 'left';
        ctx.fillText('CAM-12  08:15:41', 42, 48);

        // 4. Police patrol UAZ at Belyaev's gate
        var pPat = findSpotCoord(spots, 'patrol', 1, w, h, 0.30, 0.54);
        ctx.save();
        ctx.translate(pPat.x, pPat.y);
        ctx.fillStyle = isSpec ? '#cbd5e1' : '#94a3b8';
        ctx.fillRect(-102, -46, 204, 72);
        // Blue MVD police stripe
        ctx.fillStyle = isSpec ? '#2563eb' : '#1d4ed8';
        ctx.fillRect(-102, -6, 204, 16);
        // Police roof beacon
        ctx.fillStyle = '#ef4444'; ctx.fillRect(-26, -58, 24, 12);
        ctx.fillStyle = '#3b82f6'; ctx.fillRect(2, -58, 24, 12);
        // Windows & wheels
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(-86, -38, 48, 24); ctx.fillRect(-28, -38, 56, 24); ctx.fillRect(38, -38, 46, 24);
        ctx.fillStyle = '#0f172a';
        ctx.beginPath(); ctx.arc(-62, 28, 22, 0, Math.PI * 2); ctx.arc(62, 28, 22, 0, Math.PI * 2); ctx.fill();
        if (isSpec) {
          ctx.font = '700 13px "IBM Plex Mono", monospace';
          ctx.fillStyle = '#fde68a'; ctx.textAlign = 'center';
          ctx.fillText('ПОЛИЦИЯ • БОРТ 014', 0, 6);
        }
        ctx.restore();

        // 5. Gromov receiving flash drive from Belyaev at gate
        var pUsb = findSpotCoord(spots, 'usb', 1, w, h, 0.72, 0.50);
        ctx.save();
        ctx.translate(pUsb.x, pUsb.y);
        // Uniformed officer figure (left) & neighbor figure (right)
        ctx.fillStyle = isSpec ? '#1e3a8a' : '#1e293b';
        ctx.beginPath(); ctx.arc(-44, -46, 16, 0, Math.PI * 2); ctx.fill();
        ctx.fillRect(-62, -28, 36, 84);
        ctx.fillStyle = isSpec ? '#475569' : '#334155';
        ctx.beginPath(); ctx.arc(44, -42, 15, 0, Math.PI * 2); ctx.fill();
        ctx.fillRect(28, -24, 34, 80);
        // Outstretched hands exchanging USB stick
        ctx.strokeStyle = isSpec ? '#fde68a' : '#94a3b8';
        ctx.lineWidth = 6;
        ctx.beginPath(); ctx.moveTo(-26, -8); ctx.lineTo(-4, -2); ctx.moveTo(28, -8); ctx.lineTo(8, -2); ctx.stroke();
        // Metallic flash drive glint
        ctx.fillStyle = isSpec ? '#fef08a' : '#cbd5e1';
        ctx.fillRect(-8, -7, 18, 9);
        if (isSpec) {
          ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2;
          ctx.strokeRect(-14, -14, 30, 22);
        }
        ctx.restore();

        // Decoy: Postbox
        var pBox = findSpotCoord(spots, 'postbox', 1, w, h, 0.86, 0.72);
        ctx.fillStyle = '#334155'; ctx.fillRect(pBox.x - 18, pBox.y - 24, 36, 48);
        ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.strokeRect(pBox.x - 18, pBox.y - 24, 36, 48);
        ctx.fillStyle = '#cbd5e1'; ctx.font = '700 14px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
        ctx.fillText('12', pBox.x, pBox.y + 5);

        // Decoy: Muddy tractor rut
        var pRut = findSpotCoord(spots, 'rut', 1, w, h, 0.48, 0.82);
        ctx.strokeStyle = 'rgba(15, 23, 42, 0.72)'; ctx.lineWidth = 14;
        ctx.beginPath(); ctx.moveTo(pRut.x - 90, pRut.y + 12); ctx.quadraticCurveTo(pRut.x, pRut.y - 8, pRut.x + 90, pRut.y + 10); ctx.stroke();
      }

      // CCTV scanlines & digital grain
      ctx.fillStyle = 'rgba(0, 0, 0, 0.16)';
      for (i = 0; i < h; i += 4) ctx.fillRect(0, i, w, 1.5);
      for (i = 0; i < 220; i++) {
        ctx.fillStyle = rand() > 0.5 ? 'rgba(200,255,220,0.06)' : 'rgba(0,0,0,0.12)';
        ctx.fillRect(rand() * w, rand() * h, 3, 2);
      }
      return;
    }

    // ===== CASE418 & GENERIC BURNT COTTAGE SCENES =====
    var bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, isSpec ? '#15171e' : '#090b10');
    bgGrad.addColorStop(0.6, isSpec ? '#1e1b18' : '#121112');
    bgGrad.addColorStop(1, '#0b0a09');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    var floorY = h * 0.64;
    if (viewId === 0) {
      // ANGLE 0: INSIDE CHARRED COTTAGE (Panel, Door, 3 Floor Craters + Decoys)
      ctx.fillStyle = isSpec ? '#231f1e' : '#161415';
      ctx.fillRect(w * 0.04, h * 0.10, w * 0.92, floorY - h * 0.10);
      for (i = 0; i < 10; i++) {
        var py = h * 0.10 + i * ((floorY - h * 0.10) / 10);
        ctx.strokeStyle = 'rgba(0,0,0,0.48)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(w * 0.04, py); ctx.lineTo(w * 0.96, py); ctx.stroke();
      }
      // Floor
      ctx.fillStyle = isSpec ? '#241e1b' : '#141211';
      ctx.fillRect(0, floorY, w, h - floorY);
      ctx.strokeStyle = 'rgba(0,0,0,0.5)'; ctx.lineWidth = 1.5;
      for (i = 0; i < 12; i++) {
        ctx.beginPath(); ctx.moveTo(i * (w / 11), floorY); ctx.lineTo((i - 0.5) * (w / 10), h); ctx.stroke();
      }

      // 1. Breaker Panel
      var pPanel = findSpotCoord(spots, 'panel', 0, w, h, 0.18, 0.38);
      var pw = w * 0.11, ph = h * 0.20;
      ctx.fillStyle = '#0c0d10';
      ctx.fillRect(pPanel.x - pw * 0.6, pPanel.y - ph * 0.6, pw * 1.2, ph * 1.2);
      ctx.fillStyle = '#20242d';
      ctx.fillRect(pPanel.x - pw / 2, pPanel.y - ph / 2, pw, ph);
      ctx.strokeStyle = isSpec ? '#94a3b8' : '#374151'; ctx.lineWidth = 2;
      ctx.strokeRect(pPanel.x - pw / 2, pPanel.y - ph / 2, pw, ph);
      if (isSpec) {
        // Strobe reveals bright intact copper & blue wires + crisp unmelted breakers!
        ctx.fillStyle = '#11151d';
        ctx.fillRect(pPanel.x - pw * 0.4, pPanel.y - ph * 0.4, pw * 0.8, ph * 0.8);
        ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(pPanel.x - pw * 0.2, pPanel.y - ph * 0.35); ctx.lineTo(pPanel.x - pw * 0.2, pPanel.y + ph * 0.35); ctx.stroke();
        ctx.strokeStyle = '#38bdf8';
        ctx.beginPath(); ctx.moveTo(pPanel.x + pw * 0.16, pPanel.y - ph * 0.35); ctx.lineTo(pPanel.x + pw * 0.16, pPanel.y + ph * 0.35); ctx.stroke();
        ctx.fillStyle = '#cbd5e1';
        for (i = 0; i < 3; i++) ctx.fillRect(pPanel.x - pw * 0.3 + i * (pw * 0.22), pPanel.y - 10, pw * 0.16, 20);
      } else {
        ctx.fillStyle = 'rgba(6, 7, 9, 0.88)';
        ctx.fillRect(pPanel.x - pw * 0.42, pPanel.y - ph * 0.42, pw * 0.84, ph * 0.84);
      }

      // 2. Door with crowbar pry marks
      var pDoor = findSpotCoord(spots, 'door', 0, w, h, 0.50, 0.44);
      var dw = w * 0.20, dh = h * 0.44;
      ctx.fillStyle = '#060709';
      ctx.fillRect(pDoor.x - dw / 2, floorY - dh, dw, dh);
      ctx.strokeStyle = '#332821'; ctx.lineWidth = 10;
      ctx.strokeRect(pDoor.x - dw / 2, floorY - dh, dw, dh);
      ctx.fillStyle = '#241c17';
      ctx.fillRect(pDoor.x - dw / 2 + 6, floorY - dh + 6, dw * 0.68, dh - 8);
      ctx.fillStyle = '#64748b';
      ctx.fillRect(pDoor.x + dw * 0.15, pDoor.y - 18, 10, 36);
      if (isSpec) {
        // Strobe exposes bright fresh pale splinters & crowbar steel gouges!
        ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 3.2;
        ctx.beginPath();
        ctx.moveTo(pDoor.x + dw * 0.06, pDoor.y - 20); ctx.lineTo(pDoor.x + dw * 0.24, pDoor.y - 4);
        ctx.moveTo(pDoor.x + dw * 0.04, pDoor.y + 4); ctx.lineTo(pDoor.x + dw * 0.26, pDoor.y + 18);
        ctx.stroke();
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(pDoor.x + dw * 0.17, pDoor.y - 4, 15, 8);
      }

      // 3. Three floor char craters
      var pFloor = findSpotCoord(spots, 'floor', 0, w, h, 0.58, 0.80);
      var cr = [[-82, -10], [0, 14], [82, -12]];
      for (i = 0; i < cr.length; i++) {
        var cx = pFloor.x + cr[i][0], cy = pFloor.y + cr[i][1];
        var cg = ctx.createRadialGradient(cx, cy, 4, cx, cy, 52);
        cg.addColorStop(0, '#020202');
        cg.addColorStop(0.58, '#1a110e');
        cg.addColorStop(0.84, 'rgba(201, 138, 46, 0.42)');
        cg.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = cg;
        ctx.beginPath(); ctx.ellipse(cx, cy, 52, 28, 0, 0, Math.PI * 2); ctx.fill();
      }

      // Decoy: Melted electric kettle
      var pKet = findSpotCoord(spots, 'kettle', 0, w, h, 0.82, 0.64);
      ctx.fillStyle = isSpec ? '#64748b' : '#334155';
      ctx.beginPath(); ctx.ellipse(pKet.x, pKet.y, 26, 20, -0.3, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(pKet.x + 18, pKet.y - 4, 12, -1.2, 1.3); ctx.stroke();

      // Decoy: Cracked glass pile
      var pGls = findSpotCoord(spots, 'glass', 0, w, h, 0.24, 0.76);
      ctx.strokeStyle = isSpec ? 'rgba(186,230,253,0.75)' : 'rgba(148,163,184,0.38)';
      ctx.lineWidth = 1.6;
      for (i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(pGls.x - 24 + i * 9, pGls.y - 10 + (i % 2) * 14);
        ctx.lineTo(pGls.x - 10 + i * 9, pGls.y + 8 - (i % 2) * 10);
        ctx.stroke();
      }
    } else {
      // ANGLE 1: CHARRED ROOF BEAMS & PORCH BUSHES (Bullet, Canister + Decoys)
      // Heavy overhead charred timber beam
      ctx.fillStyle = isSpec ? '#231d19' : '#141110';
      ctx.fillRect(0, h * 0.14, w, h * 0.24);
      ctx.strokeStyle = 'rgba(180,145,110,0.16)'; ctx.lineWidth = 1.4;
      for (i = 0; i < 18; i++) {
        var bx = rand() * w, by = h * 0.16 + rand() * h * 0.20;
        ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + 60, by + 2); ctx.stroke();
      }
      // Dark yard & bushes in lower half
      ctx.fillStyle = isSpec ? '#111915' : '#090e0b';
      ctx.fillRect(0, h * 0.42, w, h * 0.58);

      // 4. Bullet in beam
      var pBeam = findSpotCoord(spots, 'beam', 1, w, h, 0.34, 0.26);
      ctx.fillStyle = '#050506';
      ctx.beginPath(); ctx.ellipse(pBeam.x, pBeam.y, 18, 13, -0.15, 0, Math.PI * 2); ctx.fill();
      if (isSpec) {
        // Strobe reveals bright copper bullet jacket & splinter stars!
        ctx.strokeStyle = '#e6c59c'; ctx.lineWidth = 1.8;
        for (i = 0; i < 6; i++) {
          var ang = (i / 6) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(pBeam.x + Math.cos(ang) * 10, pBeam.y + Math.sin(ang) * 8);
          ctx.lineTo(pBeam.x + Math.cos(ang) * 26, pBeam.y + Math.sin(ang) * 18);
          ctx.stroke();
        }
        var bgBullet = ctx.createRadialGradient(pBeam.x - 2, pBeam.y - 2, 1, pBeam.x, pBeam.y, 10);
        bgBullet.addColorStop(0, '#fef08a');
        bgBullet.addColorStop(0.55, '#d97706');
        bgBullet.addColorStop(1, '#78350f');
        ctx.fillStyle = bgBullet;
        ctx.beginPath(); ctx.arc(pBeam.x, pBeam.y, 9, 0, Math.PI * 2); ctx.fill();
      }

      // Decoy: Empty wood knot on right of beam
      var pKnot = findSpotCoord(spots, 'knot', 1, w, h, 0.70, 0.24);
      ctx.fillStyle = '#070606';
      ctx.beginPath(); ctx.ellipse(pKnot.x, pKnot.y, 16, 11, 0.2, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = isSpec ? '#5c4b3c' : '#261f1a'; ctx.lineWidth = 2; ctx.stroke();

      // 5. Melted red fuel canister in bushes
      var pCan = findSpotCoord(spots, 'canister', 1, w, h, 0.76, 0.68);
      ctx.save();
      ctx.translate(pCan.x, pCan.y);
      ctx.rotate(-0.22);
      ctx.fillStyle = isSpec ? '#b91c1c' : '#7f1d1d';
      ctx.fillRect(-30, -24, 58, 46);
      ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2; ctx.strokeRect(-30, -24, 58, 46);
      ctx.strokeStyle = 'rgba(254, 202, 202, 0.5)';
      ctx.beginPath(); ctx.moveTo(-20, -14); ctx.lineTo(18, 14); ctx.moveTo(18, -14); ctx.lineTo(-20, 14); ctx.stroke();
      ctx.fillStyle = '#450a0a'; ctx.fillRect(-22, -34, 34, 10);
      ctx.fillStyle = '#f59e0b'; ctx.fillRect(14, -34, 12, 10);
      ctx.restore();

      // Decoy: Garden watering can on left
      var pWat = findSpotCoord(spots, 'watering', 1, w, h, 0.24, 0.72);
      ctx.fillStyle = isSpec ? '#15803d' : '#14532d';
      ctx.fillRect(pWat.x - 24, pWat.y - 16, 42, 34);
      ctx.strokeStyle = '#22c55e'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(pWat.x + 18, pWat.y + 4); ctx.lineTo(pWat.x + 42, pWat.y - 14); ctx.stroke();
    }
  }


  function drawDebrisOverlay(ctx, spot, w, h, now) {
    if (!spot || spot.debris <= 0.02) return;
    var cx = spot.x * w;
    var cy = spot.y * h;
    var alpha = clamp(spot.debris, 0.15, 1);

    ctx.save();
    ctx.globalAlpha = alpha;
    if (spot.debrisKind === 'glitch') {
      var gw = w * 0.28;
      var gh = h * 0.24;
      ctx.fillStyle = '#07130f';
      ctx.fillRect(cx - gw / 2, cy - gh / 2, gw, gh);
      var rows = 7;
      for (var r = 0; r < rows; r++) {
        var shift = Math.sin(now * 0.015 + r * 2.1) * 6;
        ctx.fillStyle = r % 2 === 0 ? 'rgba(74, 222, 128, 0.42)' : 'rgba(226, 232, 240, 0.28)';
        ctx.fillRect(cx - gw / 2 + shift, cy - gh / 2 + r * (gh / rows), gw * 0.88, gh / rows - 2);
      }
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.4;
      ctx.setLineDash([4, 3]);
      ctx.strokeRect(cx - gw / 2, cy - gh / 2, gw, gh);
      ctx.setLineDash([]);
    } else if (spot.debrisKind === 'bush') {
      ctx.fillStyle = '#0e1711';
      for (var b = 0; b < 7; b++) {
        ctx.beginPath();
        ctx.arc(cx + (b - 3) * 14, cy + (b % 2 === 0 ? -8 : 10), 22, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.strokeStyle = '#243529';
      ctx.lineWidth = 3;
      for (var k = 0; k < 6; k++) {
        ctx.beginPath();
        ctx.moveTo(cx - 34 + k * 14, cy + 28);
        ctx.quadraticCurveTo(cx - 12 + k * 8, cy, cx - 22 + k * 14, cy - 26);
        ctx.stroke();
      }
    } else {
      // Wet ash & plaster mound
      ctx.fillStyle = '#3d3935';
      ctx.beginPath();
      ctx.ellipse(cx, cy, w * 0.14, h * 0.09, 0.08, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#5c554e';
      ctx.beginPath();
      ctx.ellipse(cx - 10, cy - 5, w * 0.08, h * 0.05, -0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(212, 202, 180, 0.65)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.ellipse(cx, cy, w * 0.145, h * 0.095, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Small visual badge cue
    ctx.globalAlpha = 0.92;
    ctx.font = '700 9px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = spot.debrisKind === 'glitch' ? '#fca5a5' : '#fde68a';
    ctx.fillText(spot.debrisKind === 'glitch' ? 'СБОЙ КЭША (СОТРИТЕ)' : 'ПЕРЕКРЫТО (РАСЧИСТИТЕ)', cx, cy);
    ctx.restore();
  }

  function initCrimeCamera(containerEl, config, callbacks) {
    config = config || {};
    injectCamStyles();

    var timers = createTimerBag();
    var listeners = createListenerBag();
    var triggerWin = createWinTrigger(callbacks);
    var triggerFail = createFailTrigger(callbacks);

    var scenario = resolveCamScenario(config);
    var spots = scenario.spots.map(function (s) {
      return Object.assign({}, s, { captured: false });
    });
    var evidenceSpots = spots.filter(function (s) {
      return s.isEvidence;
    });

    var maxErrors = typeof config.maxErrors === 'number' && config.maxErrors > 0 ? config.maxErrors : 4;
    var activeView = 0;
    var activeMode = 'normal';
    var capturedCount = 0;
    var errorsCount = 0;
    var phase = 'shoot';

    var shell = createShell(containerEl, {
      title: scenario.title,
      subtitle: scenario.subtitle,
      extraClass: 'mg-cam-wrap'
    });

    // Replace plain subtitle with counter + error tracker
    shell.subEl.style.display = 'none';
    var metaRow = document.createElement('div');
    metaRow.className = 'mg-cam-meta';
    var statFound = document.createElement('span');
    statFound.className = 'mg-cam-stat';
    var statErr = document.createElement('span');
    statErr.className = 'mg-cam-err';
    metaRow.appendChild(statFound);
    metaRow.appendChild(statErr);
    shell.subEl.parentNode.appendChild(metaRow);

    listeners.on(shell.cancelBtn, 'click', function () {
      haptic('light');
      sfx('click');
      triggerCancel(callbacks);
    });

    // View switcher tabs (if > 1 view)
    var viewsBar = document.createElement('div');
    viewsBar.className = 'mg-cam-views';
    var viewButtons = [];
    if (scenario.views.length > 1) {
      for (var vi = 0; vi < scenario.views.length; vi++) {
        (function (vw) {
          var vb = document.createElement('button');
          vb.type = 'button';
          vb.className = 'mg-cam-vbtn';
          vb.innerHTML = '<span class="mg-cam-vdot"></span><span>' + vw.label + '</span>';
          listeners.on(vb, 'click', function () {
            if (phase !== 'shoot' || activeView === vw.id) return;
            activeView = vw.id;
            rebuildViewLayers();
            syncHeaderAndViews();
            haptic('light');
            sfx('click');
          });
          viewsBar.appendChild(vb);
          viewButtons.push({ id: vw.id, el: vb });
        })(scenario.views[vi]);
      }
      shell.body.appendChild(viewsBar);
    }

    // Viewfinder stage
    var stage = document.createElement('div');
    stage.className = 'mg-for-stage mg-cam-stage';
    var canvas = document.createElement('canvas');
    canvas.className = 'mg-for-canvas';
    stage.appendChild(canvas);
    shell.body.appendChild(stage);

    // Live status bar
    var statusEl = document.createElement('div');
    statusEl.className = 'mg-for-status';
    var statusText = document.createElement('span');
    statusEl.appendChild(statusText);
    shell.body.appendChild(statusEl);

    // Control panel
    var panel = document.createElement('div');
    panel.className = 'mg-for-panel';

    // Mode buttons (Normal/Clear vs Special Flash/IR-Contrast)
    var modesRow = document.createElement('div');
    modesRow.className = 'mg-cam-modes';
    var btnModeNorm = document.createElement('button');
    btnModeNorm.type = 'button';
    btnModeNorm.className = 'mg-cam-mbtn';
    btnModeNorm.textContent = scenario.modeNormalLabel;
    var btnModeSpec = document.createElement('button');
    btnModeSpec.type = 'button';
    btnModeSpec.className = 'mg-cam-mbtn';
    btnModeSpec.textContent = scenario.modeSpecLabel;

    listeners.on(btnModeNorm, 'click', function () {
      if (phase !== 'shoot' || activeMode === 'normal') return;
      activeMode = 'normal';
      syncModeButtons();
      haptic('light');
      sfx('click');
    });
    listeners.on(btnModeSpec, 'click', function () {
      if (phase !== 'shoot' || activeMode === 'spec') return;
      activeMode = 'spec';
      syncModeButtons();
      haptic('light');
      sfx('click');
    });
    modesRow.appendChild(btnModeNorm);
    modesRow.appendChild(btnModeSpec);
    panel.appendChild(modesRow);

    // Focus slider
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
    shootBtn.textContent = scenario.shootLabel;
    shootBtn.disabled = true;
    panel.appendChild(shootBtn);
    shell.body.appendChild(panel);

    // Filmstrip thumbnails
    var strip = document.createElement('div');
    strip.className = 'mg-cam-strip';
    strip.style.gridTemplateColumns = 'repeat(' + Math.min(evidenceSpots.length, 5) + ', 1fr)';
    var slotEls = [];
    for (var si = 0; si < evidenceSpots.length; si++) {
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
      num.textContent = '#0' + (si + 1);
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

    // Offscreen scene buffers (normal + special strobe/IR)
    var sceneNormal = document.createElement('canvas');
    var sceneSpec = document.createElement('canvas');
    sceneNormal.width = sceneSpec.width = 960;
    sceneNormal.height = sceneSpec.height = 720;

    var blurCanvas = document.createElement('canvas');
    blurCanvas.width = 240;
    blurCanvas.height = 180;
    var blurCtx = blurCanvas.getContext('2d');

    function rebuildViewLayers() {
      drawCamSceneLayer(sceneNormal, scenario, activeView, false);
      drawCamSceneLayer(sceneSpec, scenario, activeView, true);
    }
    rebuildViewLayers();

    // Optional external bgImage fallback
    var bgImg = null;
    if (config.bgImage && typeof config.bgImage === 'string') {
      bgImg = new Image();
      bgImg.onload = function () {
        if (timers.isCleared()) return;
        var sw = bgImg.naturalWidth || bgImg.width;
        var sh = bgImg.naturalHeight || bgImg.height;
        if (sw > 0 && sh > 0) {
          var scale = Math.max(sceneNormal.width / sw, sceneNormal.height / sh);
          var dw = sw * scale, dh = sh * scale;
          var ox = (sceneNormal.width - dw) / 2, oy = (sceneNormal.height - dh) / 2;
          sceneNormal.getContext('2d').drawImage(bgImg, ox, oy, dw, dh);
          sceneSpec.getContext('2d').drawImage(bgImg, ox, oy, dw, dh);
        }
      };
      bgImg.src = config.bgImage;
    }

    // Floating embers/grain particles + scrubbed debris particles
    var embers = [];
    var eRand = mulberry32(41899);
    for (var ei = 0; ei < 20; ei++) {
      embers.push({
        x: eRand(), y: eRand(),
        vy: 0.012 + eRand() * 0.022,
        vx: (eRand() - 0.5) * 0.01,
        r: 0.8 + eRand() * 1.5,
        alpha: 0.22 + eRand() * 0.48
      });
    }
    var debrisParticles = [];

    var retX = 0.5;
    var retY = 0.5;
    var targetRetX = 0.5;
    var targetRetY = 0.5;
    var lastNormX = 0.5;
    var lastNormY = 0.5;
    var focusValue = 50;
    var dragging = false;
    var activeSpot = null;
    var currentSharpness = 0;
    var wasLocked = false;
    var flashAlpha = 0;
    var errFlashAlpha = 0;
    var shutterClose = 0;
    var tempStatus = null;
    var lastFrameTime = performance.now();

    var canvasMgr = setupResponsiveCanvas(canvas, stage);

    function syncHeaderAndViews() {
      statFound.textContent = 'СНИМКИ: ' + capturedCount + ' / ' + evidenceSpots.length;
      statErr.textContent = 'ОШИБКИ: ' + errorsCount + ' / ' + maxErrors;
      statErr.classList.toggle('is-warn', errorsCount >= maxErrors - 1);

      for (var i = 0; i < viewButtons.length; i++) {
        var vw = viewButtons[i];
        var viewDone = true;
        for (var j = 0; j < spots.length; j++) {
          if (spots[j].view === vw.id && spots[j].isEvidence && !spots[j].captured) {
            viewDone = false;
            break;
          }
        }
        vw.el.classList.toggle('is-active', activeView === vw.id);
        vw.el.classList.toggle('is-done', viewDone);
      }
    }

    function syncModeButtons() {
      btnModeNorm.className = 'mg-cam-mbtn' + (activeMode === 'normal' ? ' is-norm' : '');
      btnModeSpec.className = 'mg-cam-mbtn' + (activeMode === 'spec' ? ' is-spec' : '');
    }

    function setTempStatus(text, tone, ms) {
      tempStatus = { text: text, tone: tone || 'err', until: performance.now() + (ms || 1750) };
    }

    function scrubDebrisAt(nx, ny, distNorm) {
      if (activeMode !== 'normal') return;
      for (var i = 0; i < spots.length; i++) {
        var sp = spots[i];
        if (sp.view !== activeView || sp.debris <= 0) continue;
        if (Math.hypot(sp.x - nx, sp.y - ny) <= 0.15) {
          sp.debris = Math.max(0, sp.debris - Math.max(0.14, distNorm * 2.5));
          for (var p = 0; p < 3; p++) {
            debrisParticles.push({
              x: sp.x + (Math.random() - 0.5) * 0.08,
              y: sp.y + (Math.random() - 0.5) * 0.06,
              vx: (Math.random() - 0.5) * 0.25,
              vy: (Math.random() - 0.3) * 0.22 + 0.06,
              r: 1.5 + Math.random() * 2.2,
              kind: sp.debrisKind,
              alpha: 0.9
            });
          }
          if (sp.debris <= 0.14) {
            sp.debris = 0;
            haptic('medium');
            sfx('paper');
            setTempStatus('Помеха расчищена! Теперь наведите фокус и снимите кадр.', 'ok', 1500);
          }
        }
      }
    }

    function updatePointerPos(ev) {
      var rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      var nx = clamp((ev.clientX - rect.left) / rect.width, 0.10, 0.90);
      var ny = clamp((ev.clientY - rect.top) / rect.height, 0.12, 0.88);
      var dist = Math.hypot(nx - lastNormX, ny - lastNormY);
      lastNormX = nx;
      lastNormY = ny;
      targetRetX = nx;
      targetRetY = ny;
      scrubDebrisAt(nx, ny, dist);
    }

    listeners.on(canvas, 'pointerdown', function (ev) {
      if (phase !== 'shoot') return;
      dragging = true;
      try { canvas.setPointerCapture(ev.pointerId); } catch (err) {}
      var rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        lastNormX = clamp((ev.clientX - rect.left) / rect.width, 0.10, 0.90);
        lastNormY = clamp((ev.clientY - rect.top) / rect.height, 0.12, 0.88);
      }
      updatePointerPos(ev);
    });
    listeners.on(canvas, 'pointermove', function (ev) {
      if (!dragging || phase !== 'shoot') return;
      updatePointerPos(ev);
    });
    listeners.on(canvas, 'pointerup', function () { dragging = false; });
    listeners.on(canvas, 'pointercancel', function () { dragging = false; });

    listeners.on(focusSlider, 'input', function () {
      if (phase !== 'shoot') return;
      focusValue = parseInt(focusSlider.value, 10) || 0;
      var distM = (0.4 + (focusValue / 100) * 4.2).toFixed(1);
      sliderVal.textContent = focusValue + '% • ' + distM + 'м';
    });

    function showFailScreen(reason, msg) {
      phase = 'fail';
      if (viewsBar.parentNode) viewsBar.style.display = 'none';
      stage.style.display = 'none';
      statusEl.style.display = 'none';
      panel.style.display = 'none';
      strip.style.display = 'none';

      var box = document.createElement('div');
      box.className = 'mg-cam-stamp-box';
      var st = document.createElement('div');
      st.className = 'mg-cam-stamp';
      st.textContent = 'СЪЁМКА ПРОВАЛЕНА';
      var txt = document.createElement('div');
      txt.className = 'mg-cam-dq';
      txt.textContent = msg || 'Превышен лимит ошибок фотофиксации. Повторите осмотр.';
      box.appendChild(st);
      box.appendChild(txt);
      shell.body.appendChild(box);

      timers.setTimeout(function () {
        triggerFail({ minigame: 'crime_camera', scenarioId: scenario.id, reason: reason, errors: errorsCount });
      }, 950);
    }

    function openDeductionPhase() {
      phase = 'deduce';
      if (viewsBar.parentNode) viewsBar.style.display = 'none';
      stage.style.display = 'none';
      statusEl.style.display = 'none';
      panel.style.display = 'none';
      strip.style.display = 'none';

      var card = document.createElement('div');
      card.className = 'mg-cam-deduce';
      var kicker = document.createElement('div');
      kicker.className = 'mg-cam-dkicker';
      kicker.textContent = 'ФАЗА 3 // КРИМИНАЛИСТИЧЕСКИЙ ВЫВОД';
      card.appendChild(kicker);

      var facts = document.createElement('div');
      facts.className = 'mg-cam-dfacts';
      for (var i = 0; i < evidenceSpots.length; i++) {
        var row = document.createElement('div');
        row.textContent = '• ' + evidenceSpots[i].label;
        facts.appendChild(row);
      }
      card.appendChild(facts);

      var q = document.createElement('div');
      q.className = 'mg-cam-dq';
      q.textContent = scenario.conclusion.question;
      card.appendChild(q);

      var optsWrap = document.createElement('div');
      optsWrap.className = 'mg-cam-dopts';
      var fb = document.createElement('div');
      fb.className = 'mg-cam-dfb';

      var settled = false;
      var opts = scenario.conclusion.options || [];
      for (var oi = 0; oi < opts.length; oi++) {
        (function (opt) {
          var ob = document.createElement('button');
          ob.type = 'button';
          ob.className = 'mg-cam-dopt';
          ob.textContent = opt.text;
          listeners.on(ob, 'click', function () {
            if (settled || phase !== 'deduce') return;
            if (opt.isCorrect) {
              settled = true;
              ob.classList.add('is-correct');
              fb.className = 'mg-cam-dfb is-ok';
              fb.textContent = opt.reason;
              haptic('success');
              sfx('stamp');
              timers.setTimeout(function () {
                card.innerHTML = '';
                var box = document.createElement('div');
                box.className = 'mg-cam-stamp-box';
                var st = document.createElement('div');
                st.className = 'mg-cam-stamp is-ok';
                st.textContent = scenario.stampWin;
                var btnDone = document.createElement('button');
                btnDone.type = 'button';
                btnDone.className = 'mg-for-btn is-ready';
                btnDone.textContent = 'ПРИОБЩИТЬ К ДЕЛУ';
                listeners.on(btnDone, 'click', function () {
                  haptic('success');
                  sfx('success');
                  triggerWin({
                    minigame: 'crime_camera',
                    scenarioId: scenario.id,
                    errors: errorsCount,
                    deduced: opt.id,
                    captured: evidenceSpots.map(function (it) { return { id: it.id, label: it.label }; })
                  });
                });
                box.appendChild(st);
                box.appendChild(btnDone);
                card.appendChild(box);
              }, 550);
            } else {
              errorsCount += 1;
              syncHeaderAndViews();
              ob.classList.add('is-wrong');
              fb.className = 'mg-cam-dfb';
              fb.textContent = opt.reason;
              haptic('error');
              sfx('alert');
              flashShake(card);
              if (errorsCount >= maxErrors) {
                settled = true;
                timers.setTimeout(function () {
                  showFailScreen('wrong_deduction', 'Лимит ошибок исчерпан — вывод по снимкам отклонён.');
                }, 700);
              }
            }
          });
          optsWrap.appendChild(ob);
        })(opts[oi]);
      }

      card.appendChild(optsWrap);
      card.appendChild(fb);
      shell.body.appendChild(card);
    }

    function triggerCamError(msg) {
      errorsCount += 1;
      errFlashAlpha = 0.85;
      syncHeaderAndViews();
      haptic('error');
      sfx('alert');
      flashShake(stage);
      if (errorsCount >= maxErrors) {
        showFailScreen('too_many_errors', msg);
        return;
      }
      setTempStatus(msg, 'err', 1950);
    }

    function evaluateTarget(now) {
      var frameHalfW = 0.14;
      var frameHalfH = 0.17;
      var nearestDist = 999;
      var inFrame = null;
      var inFrameDist = 999;

      for (var k = 0; k < spots.length; k++) {
        var sp = spots[k];
        if (sp.view !== activeView) continue;
        var dx = sp.x - retX;
        var dy = sp.y - retY;
        var d = Math.hypot(dx, dy);
        if (sp.isEvidence && !sp.captured && d < nearestDist) {
          nearestDist = d;
        }
        if (Math.abs(dx) <= frameHalfW && Math.abs(dy) <= frameHalfH) {
          if (!inFrame || (!sp.captured && inFrame.captured) || (sp.captured === inFrame.captured && d < inFrameDist)) {
            inFrame = sp;
            inFrameDist = d;
          }
        }
      }

      activeSpot = inFrame;
      var idealFocus = inFrame ? inFrame.focusTarget : 50;
      var diff = Math.abs(focusValue - idealFocus);
      currentSharpness = clamp(Math.round(100 - diff * 2.2), 0, 100);

      var signal = nearestDist >= 999 ? 0 : clamp(1 - nearestDist / 0.44, 0, 1);
      var canShoot = !!(inFrame && !inFrame.captured && inFrame.debris <= 0 && currentSharpness > 85 && phase === 'shoot');

      if (canShoot && !wasLocked) {
        haptic('light');
        sfx('click');
      }
      wasLocked = canShoot;

      shootBtn.disabled = !canShoot;
      shootBtn.classList.toggle('is-ready', canShoot);

      if (tempStatus && now < tempStatus.until) {
        statusEl.className = 'mg-for-status ' + (tempStatus.tone === 'ok' ? 'is-ok' : 'is-err');
        statusText.textContent = tempStatus.text;
        return { signal: signal, canShoot: canShoot, inFrame: inFrame };
      }
      tempStatus = null;

      if (inFrame && inFrame.captured) {
        statusEl.className = 'mg-for-status is-ok';
        statusText.textContent = 'Зафиксировано: ' + inFrame.label;
      } else if (inFrame && inFrame.debris > 0) {
        statusEl.className = 'mg-for-status is-warn';
        statusText.textContent = inFrame.debrisHint || 'Перекрыто — потрите пальцем в режиме 1, чтобы расчистить.';
      } else if (inFrame && currentSharpness > 85) {
        statusEl.className = 'mg-for-status is-ok';
        statusText.textContent = activeMode === 'spec' ? inFrame.readSpec : inFrame.readNormal;
      } else if (inFrame) {
        statusEl.className = 'mg-for-status is-warn';
        statusText.textContent = 'Объект в кадре! Наведите резкость >85% (' + currentSharpness + '%).';
      } else if (signal > 0.52) {
        statusEl.className = 'mg-for-status is-warn';
        statusText.textContent = 'Сильный сигнал автофокуса — улика совсем рядом.';
      } else {
        statusEl.className = 'mg-for-status';
        statusText.textContent = 'Водите видоискателем и переключайте ракурсы сверху.';
      }

      return { signal: signal, canShoot: canShoot, inFrame: inFrame };
    }

    listeners.on(shootBtn, 'click', function () {
      if (phase !== 'shoot' || !activeSpot || activeSpot.captured || activeSpot.debris > 0 || currentSharpness <= 85) {
        return;
      }

      if (!activeSpot.isEvidence) {
        triggerCamError(activeSpot.falseReason || 'ЛОЖНЫЙ СЛЕД: объект не имеет отношения к делу.');
        return;
      }

      if (activeSpot.requiredMode === 'spec' && activeMode !== 'spec') {
        triggerCamError(activeSpot.wrongModeMsg || 'Включите специальный оптический режим (кнопка 2)!');
        return;
      }

      var sp = activeSpot;
      sp.captured = true;
      capturedCount += 1;
      flashAlpha = 1;
      shutterClose = 1;
      haptic('medium');
      sfx('stamp');

      var evIdx = evidenceSpots.indexOf(sp);
      var activeLayer = activeMode === 'spec' ? sceneSpec : sceneNormal;
      if (evIdx !== -1 && slotEls[evIdx]) {
        var slotObj = slotEls[evIdx];
        var tCtx = slotObj.canvas.getContext('2d');
        var cropW = activeLayer.width * 0.26;
        var cropH = activeLayer.height * 0.26;
        var sx = clamp(sp.x * activeLayer.width - cropW / 2, 0, activeLayer.width - cropW);
        var sy = clamp(sp.y * activeLayer.height - cropH / 2, 0, activeLayer.height - cropH);
        tCtx.drawImage(activeLayer, sx, sy, cropW, cropH, 0, 0, slotObj.canvas.width, slotObj.canvas.height);
        tCtx.strokeStyle = 'rgba(34, 197, 94, 0.85)';
        tCtx.lineWidth = 2;
        tCtx.strokeRect(2, 2, slotObj.canvas.width - 4, slotObj.canvas.height - 4);
        slotObj.slot.classList.add('is-captured');
        slotObj.label.textContent = sp.shortLabel;
      }

      syncHeaderAndViews();
      setTempStatus('Снято: ' + sp.label, 'ok', 1450);

      if (capturedCount >= evidenceSpots.length) {
        timers.setTimeout(function () {
          if (phase === 'shoot') openDeductionPhase();
        }, 720);
      }
    });

    syncHeaderAndViews();
    syncModeButtons();

    function render(now) {
      var dt = Math.min((now - lastFrameTime) / 1000, 0.05);
      lastFrameTime = now;

      if (phase === 'shoot') {
        retX = lerp(retX, targetRetX, Math.min(1, dt * 16));
        retY = lerp(retY, targetRetY, Math.min(1, dt * 16));

        var st = evaluateTarget(now);
        var metrics = canvasMgr.getMetrics();
        var w = metrics.width;
        var h = metrics.height;
        var dpr = metrics.dpr;
        var ctx = canvas.getContext('2d');
        var activeLayer = activeMode === 'spec' ? sceneSpec : sceneNormal;

        ctx.save();
        ctx.scale(dpr, dpr);

        ctx.drawImage(activeLayer, 0, 0, w, h);

        // Ambient ash embers (case418) or subtle CCTV static drift
        if (scenario.theme === 'ash') {
          for (var e = 0; e < embers.length; e++) {
            var em = embers[e];
            em.y -= em.vy * dt;
            if (em.y < -0.02) { em.y = 1.02; em.x = (em.x + 0.37) % 1; }
            ctx.fillStyle = 'rgba(245, 158, 11, ' + em.alpha.toFixed(2) + ')';
            ctx.beginPath();
            ctx.arc(em.x * w, em.y * h, em.r, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Draw obstructions & captured green badges
        for (var p = 0; p < spots.length; p++) {
          var sp = spots[p];
          if (sp.view !== activeView) continue;
          if (sp.debris > 0) {
            drawDebrisOverlay(ctx, sp, w, h, now);
          }
          if (sp.captured) {
            ctx.strokeStyle = 'rgba(34, 197, 94, 0.85)';
            ctx.lineWidth = 1.8;
            ctx.beginPath(); ctx.arc(sp.x * w, sp.y * h, 10, 0, Math.PI * 2); ctx.stroke();
            ctx.fillStyle = '#22c55e';
            ctx.beginPath(); ctx.arc(sp.x * w, sp.y * h, 3, 0, Math.PI * 2); ctx.fill();
          }
        }

        // Scrubbed debris flying particles
        for (var dp = debrisParticles.length - 1; dp >= 0; dp--) {
          var part = debrisParticles[dp];
          part.x += part.vx * dt;
          part.y += part.vy * dt;
          part.alpha -= dt * 1.8;
          if (part.alpha <= 0) { debrisParticles.splice(dp, 1); continue; }
          ctx.fillStyle =
            part.kind === 'glitch'
              ? 'rgba(74, 222, 128, ' + part.alpha.toFixed(2) + ')'
              : part.kind === 'bush'
              ? 'rgba(34, 197, 94, ' + part.alpha.toFixed(2) + ')'
              : 'rgba(180, 172, 162, ' + part.alpha.toFixed(2) + ')';
          ctx.beginPath();
          ctx.arc(part.x * w, part.y * h, part.r, 0, Math.PI * 2);
          ctx.fill();
        }

        // Viewfinder window
        var vfW = w * 0.44;
        var vfH = h * 0.48;
        var vfX = clamp(retX * w - vfW / 2, 10, w - vfW - 10);
        var vfY = clamp(retY * h - vfH / 2, 10, h - vfH - 10);

        ctx.fillStyle = 'rgba(6, 8, 11, 0.54)';
        ctx.beginPath();
        ctx.rect(0, 0, w, h);
        ctx.rect(vfX, vfY, vfW, vfH);
        ctx.fill('evenodd');

        ctx.save();
        ctx.beginPath();
        ctx.rect(vfX, vfY, vfW, vfH);
        ctx.clip();

        var zoom = 1.32;
        var srcW = (vfW / w) * activeLayer.width / zoom;
        var srcH = (vfH / h) * activeLayer.height / zoom;
        var srcX = clamp(retX * activeLayer.width - srcW / 2, 0, activeLayer.width - srcW);
        var srcY = clamp(retY * activeLayer.height - srcH / 2, 0, activeLayer.height - srcH);
        var defocus = clamp((100 - currentSharpness) / 100, 0, 1);

        if (defocus > 0.06) {
          var downScale = lerp(0.55, 0.12, defocus);
          var bw = Math.max(14, Math.round(vfW * downScale));
          var bh = Math.max(10, Math.round(vfH * downScale));
          blurCtx.clearRect(0, 0, blurCanvas.width, blurCanvas.height);
          blurCtx.drawImage(activeLayer, srcX, srcY, srcW, srcH, 0, 0, bw, bh);
          ctx.drawImage(blurCanvas, 0, 0, bw, bh, vfX, vfY, vfW, vfH);
        } else {
          ctx.drawImage(activeLayer, srcX, srcY, srcW, srcH, vfX, vfY, vfW, vfH);
        }

        // Re-draw magnified debris inside viewfinder if uncleared
        if (st.inFrame && st.inFrame.debris > 0) {
          ctx.fillStyle = 'rgba(10, 12, 16, ' + (st.inFrame.debris * 0.72).toFixed(2) + ')';
          ctx.fillRect(vfX, vfY, vfW, vfH);
          ctx.fillStyle = '#fde68a';
          ctx.font = '700 10px "IBM Plex Mono", monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('РАСЧИСТИТЕ ПОМЕХУ', vfX + vfW / 2, vfY + vfH / 2);
        }

        // Rule of thirds & center crosshair
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(vfX + vfW / 3, vfY); ctx.lineTo(vfX + vfW / 3, vfY + vfH);
        ctx.moveTo(vfX + (vfW * 2) / 3, vfY); ctx.lineTo(vfX + (vfW * 2) / 3, vfY + vfH);
        ctx.moveTo(vfX, vfY + vfH / 3); ctx.lineTo(vfX + vfW, vfY + vfH / 3);
        ctx.moveTo(vfX, vfY + (vfH * 2) / 3); ctx.lineTo(vfX + vfW, vfY + (vfH * 2) / 3);
        ctx.stroke();

        var cx = vfX + vfW / 2, cy = vfY + vfH / 2;
        ctx.strokeStyle = st.canShoot ? '#22c55e' : '#f59e0b';
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(cx - 10, cy); ctx.lineTo(cx - 3, cy);
        ctx.moveTo(cx + 3, cy); ctx.lineTo(cx + 10, cy);
        ctx.moveTo(cx, cy - 10); ctx.lineTo(cx, cy - 3);
        ctx.moveTo(cx, cy + 3); ctx.lineTo(cx, cy + 10);
        ctx.stroke();

        if (shutterClose > 0.01) {
          var bladeH = (vfH / 2) * shutterClose;
          ctx.fillStyle = '#050608';
          ctx.fillRect(vfX, vfY, vfW, bladeH);
          ctx.fillRect(vfX, vfY + vfH - bladeH, vfW, bladeH);
          shutterClose = Math.max(0, shutterClose - dt * 6.5);
        }
        ctx.restore();

        // Corner brackets
        var br = 14;
        ctx.strokeStyle = st.canShoot ? '#22c55e' : st.inFrame && !st.inFrame.captured ? '#f59e0b' : '#9ca3af';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(vfX, vfY + br); ctx.lineTo(vfX, vfY); ctx.lineTo(vfX + br, vfY);
        ctx.moveTo(vfX + vfW - br, vfY); ctx.lineTo(vfX + vfW, vfY); ctx.lineTo(vfX + vfW, vfY + br);
        ctx.moveTo(vfX + vfW, vfY + vfH - br); ctx.lineTo(vfX + vfW, vfY + vfH); ctx.lineTo(vfX + vfW - br, vfY + vfH);
        ctx.moveTo(vfX + br, vfY + vfH); ctx.lineTo(vfX, vfY + vfH); ctx.lineTo(vfX, vfY + vfH - br);
        ctx.stroke();

        // Top HUD & AF bar
        ctx.font = '600 10px "IBM Plex Mono", monospace';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillStyle = 'rgba(229, 231, 235, 0.85)';
        ctx.fillText(scenario.hudTag + (activeMode === 'spec' ? ' [SPEC]' : ''), 10, 8);

        var bars = 7;
        var activeBars = st.inFrame && !st.inFrame.captured ? bars : Math.round(st.signal * bars);
        var barStartX = w - 10 - bars * 7;
        for (var b = 0; b < bars; b++) {
          var bhBar = 5 + b * 1.4;
          ctx.fillStyle = b < activeBars ? (st.canShoot ? '#22c55e' : '#f59e0b') : 'rgba(75, 85, 99, 0.45)';
          ctx.fillRect(barStartX + b * 7, 19 - bhBar, 4.5, bhBar);
        }

        var hudY = vfY + vfH + 5 > h - 16 ? vfY - 14 : vfY + vfH + 5;
        ctx.fillStyle = st.canShoot ? '#4ade80' : '#f59e0b';
        ctx.fillText(st.canShoot ? 'FOCUS LOCK ' + currentSharpness + '%' : 'SHARP ' + currentSharpness + '%', vfX, hudY);

        if (flashAlpha > 0.005) {
          ctx.fillStyle = 'rgba(255, 252, 245, ' + flashAlpha.toFixed(3) + ')';
          ctx.fillRect(0, 0, w, h);
          flashAlpha = Math.max(0, flashAlpha - dt * 2.9);
        }
        if (errFlashAlpha > 0.005) {
          ctx.fillStyle = 'rgba(220, 38, 38, ' + (errFlashAlpha * 0.38).toFixed(3) + ')';
          ctx.fillRect(0, 0, w, h);
          errFlashAlpha = Math.max(0, errFlashAlpha - dt * 2.5);
        }

        ctx.restore();
      }

      timers.raf(render);
    }

    timers.raf(render);

    return function cleanup() {
      timers.clearAll();
      listeners.clearAll();
      canvasMgr.destroy();
      if (bgImg) { bgImg.onload = null; }
      containerEl.innerHTML = '';
    };
  }

  // ============================================================================
  // MINIGAME 2: ballistics (3-phase soot cleaning, caliper, oblique ×40 & verdict)
  // ============================================================================

  var BAL_EXTRA_STYLE_ID = 'minigames-forensics-bal-extra';

  var BAL_EXTRA_CSS = [
    '.mg-bal-meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-top: 3px; }',
    '.mg-bal-stat { font-family: "IBM Plex Mono", monospace; font-size: 10.5px; font-weight: 600; color: var(--case-accent, #c98a2e); }',
    '.mg-bal-err { font-family: "IBM Plex Mono", monospace; font-size: 10.5px; font-weight: 600; color: #9ca3af; }',
    '.mg-bal-err.is-warn { color: #f87171; }',
    '.mg-bal-steps3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; }',
    '.mg-bal-tools { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; }',
    '.mg-bal-tbtn {',
    '  padding: 7px 6px; border-radius: 6px; background: #161a23; border: 1px solid #2f3646;',
    '  font-family: "IBM Plex Mono", monospace; font-size: 10px; font-weight: 700;',
    '  color: #9ca3af; text-transform: uppercase; cursor: pointer;',
    '}',
    '.mg-bal-tbtn.is-norm { background: rgba(212, 202, 180, 0.14); border-color: #d4cab4; color: #f5efe2; }',
    '.mg-bal-tbtn.is-oblique { background: rgba(245, 158, 11, 0.22); border-color: var(--case-accent, #f59e0b); color: #fde68a; box-shadow: 0 0 10px rgba(245, 158, 11, 0.24); }',
    '.mg-bal-deduce { display: flex; flex-direction: column; gap: 9px; padding: 12px; background: #14171f; border: 1px solid #353b4a; border-top: 3px solid var(--case-accent, #c98a2e); border-radius: 8px; }',
    '.mg-bal-dkicker { font-family: "IBM Plex Mono", monospace; font-size: 10px; font-weight: 700; color: var(--case-accent, #c98a2e); text-transform: uppercase; }',
    '.mg-bal-dfacts { padding: 8px 9px; background: #0d1016; border: 1px solid #262b36; border-radius: 6px; font-family: "IBM Plex Mono", monospace; font-size: 10px; line-height: 1.4; color: #c2cad8; display: flex; flex-direction: column; gap: 3px; }',
    '.mg-bal-dq { font-size: 12.8px; line-height: 1.4; color: #f3efe6; font-weight: 500; }',
    '.mg-bal-dopts { display: flex; flex-direction: column; gap: 6px; }',
    '.mg-bal-dopt { width: 100%; text-align: left; padding: 9px 10px; background: #1b202b; border: 1px solid #353d4e; border-radius: 6px; color: #e4e0d8; font-size: 12px; line-height: 1.36; cursor: pointer; }',
    '.mg-bal-dopt.is-wrong { border-color: #ef4444; background: rgba(153, 27, 27, 0.25); color: #fecaca; }',
    '.mg-bal-dopt.is-correct { border-color: #22c55e; background: rgba(34, 197, 94, 0.2); color: #bbf7d0; }',
    '.mg-bal-dfb { font-family: "IBM Plex Mono", monospace; font-size: 10.5px; line-height: 1.38; min-height: 16px; color: #fca5a5; }',
    '.mg-bal-dfb.is-ok { color: #86efac; }',
    '.mg-bal-stamp-box { padding: 24px 14px; background: #0d1016; border: 1px solid #2a2e38; border-radius: 8px; display: flex; flex-direction: column; align-items: center; gap: 14px; text-align: center; }',
    '.mg-bal-stamp { padding: 8px 16px; font-family: "Oswald", sans-serif; font-size: 19px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #ef4444; border: 3px double #ef4444; border-radius: 4px; transform: rotate(-5deg); }',
    '.mg-bal-stamp.is-ok { color: #4ade80; border-color: #22c55e; background: rgba(34, 197, 94, 0.12); }'
  ].join('\n');

  function injectBalStyles() {
    if (document.getElementById(BAL_EXTRA_STYLE_ID)) return;
    var el = document.createElement('style');
    el.id = BAL_EXTRA_STYLE_ID;
    el.textContent = BAL_EXTRA_CSS;
    document.head.appendChild(el);
  }

  function buildBalCase418Scenario(config) {
    return {
      id: 'case418_act3_ballistics',
      title: config.title || 'БАЛЛИСТИЧЕСКАЯ ЭКСПЕРТИЗА',
      subtitle: config.subtitle || 'ДЕЛО №418 • ЭКЦ • СРАВНИТЕЛЬНЫЙ МИКРОСКОП',
      evidenceCode: 'УЛИКА #418-Б (БАЛКА)',
      stampWin: 'СТВОЛ ИДЕНТИФИЦИРОВАН // ЛРО-207',
      caliberMm: typeof config.caliberMm === 'number' ? config.caliberMm : 9.2,
      caliberLabel: '9×18 мм ПМ',
      caliberOptions: Array.isArray(config.caliberOptions) && config.caliberOptions.length > 0
        ? config.caliberOptions
        : [
            { id: '545', label: '5.45×18 ПСМ', isCorrect: false, wrongMsg: 'Диаметр 5.45×18 ПСМ — около 5.6 мм, а пуля #418-Б заметно крупнее (9.2 мм).' },
            { id: '762', label: '7.62×25 ТТ', isCorrect: false, wrongMsg: 'Диаметр 7.62×25 ТТ — около 7.8 мм, что не соответствует замеру 9.2 мм.' },
            { id: '918', label: '9×18 мм ПМ', isCorrect: true, wrongMsg: '' }
          ],
      samples: Array.isArray(config.samples) && config.samples.length > 0
        ? config.samples
        : [
            {
              id: 'lro_041',
              code: 'ЛРО-041 • ПМ-Т #88412',
              meta: 'Частный стрелковый тир «Вымпел» (3 нареза)',
              seed: 1041,
              slope: 0.17,
              grooveCount: 3,
              hasBurr: false,
              isMatch: false,
              mismatchReason: 'ЛОЖНЫЙ СТВОЛ: у ЛРО-041 только 3 нареза с другим шагом — не совпадает с 4 нарезами пули #418-Б.'
            },
            {
              id: 'lro_119',
              code: 'ЛРО-119 • ИЖ-71 #КН-2094',
              meta: 'ЧОП «Гранит» • списан в 2021 (левые нарезы)',
              seed: 2119,
              slope: -0.13,
              grooveCount: 4,
              hasBurr: false,
              isMatch: false,
              mismatchReason: 'ЛОЖНЫЙ СТВОЛ: у ЛРО-119 левосторонний наклон нарезов, а на пуле #418-Б — правосторонние.'
            },
            {
              id: 'lro_207',
              code: 'ЛРО-207 • ПМ #АЕ-4719',
              meta: 'Числится в розыске • архивное дело 90-х',
              seed: 41807,
              slope: 0.13,
              grooveCount: 4,
              hasBurr: true,
              isMatch: true,
              mismatchReason: ''
            },
            {
              id: 'lro_388',
              code: 'ЛРО-388 • МР-79 #90315',
              meta: 'Склад вещдоков • 4 правых нареза (двойник)',
              seed: 3882,
              slope: 0.13,
              grooveCount: 4,
              hasBurr: false,
              isMatch: false,
              mismatchReason: 'ЛОЖНЫЙ СТВОЛ: шаг 4 правых нарезов похож, но в КОСОМ СВЕТЕ ×40 микротрассы и заусенец ствола не сходятся!'
            }
          ],
      conclusion: {
        question: 'Пуля #418-Б из обугленной балки — 9×18 мм ПМ (9.2 мм), а в косом свете ×40 её микротрассы и дефект ствола на 99.1% совпали с ЛРО-207. Вывод:',
        options: [
          {
            id: 'chop',
            text: 'Стреляли из служебного ИЖ-71 охраны ЧОП «Гранит» (ЛРО-119), а деформация от пожара исказила наклон нарезов.',
            isCorrect: false,
            reason: 'Противоречие: нагрев не способен поменять левосторонние нарезы ЛРО-119 на правосторонние.'
          },
          {
            id: 'lro207_hit',
            text: 'В коттедже стреляли из «грязного» ПМ #АЕ-4719 (карточка ЛРО-207) — необходимо немедленно поднять дело старого владельца ствола.',
            isCorrect: true,
            reason: 'Верно: точное совпадение калибра 9×18 мм ПМ и уникальных микротрасс канала ствола выводит на ЛРО-207.'
          },
          {
            id: 'inconclusive',
            text: 'Сходство с МР-79 (ЛРО-388) доказывает, что баллистика не позволяет выделить конкретный пистолет.',
            isCorrect: false,
            reason: 'Противоречие: в косом свете ×40 микротрассы ЛРО-388 разошлись, тогда как ЛРО-207 дал совпадение 99.1%.'
          }
        ]
      }
    };
  }

  function buildBalGenericScenario(config) {
    var cal = typeof config.caliberMm === 'number' ? config.caliberMm : 9.2;
    var samples = Array.isArray(config.samples) && config.samples.length > 0
      ? config.samples
      : [
          { id: 's_1', code: 'ОБРАЗЕЦ #01', meta: 'Контрольный отстрел (3 нареза)', seed: 501, slope: 0.16, grooveCount: 3, hasBurr: false, isMatch: false, mismatchReason: 'ЛОЖНЫЙ СТВОЛ: не совпадает число нарезов.' },
          { id: 's_2', code: 'ОБРАЗЕЦ #02', meta: 'Контрольный отстрел (совпадение)', seed: 777, slope: 0.13, grooveCount: 4, hasBurr: true, isMatch: true, mismatchReason: '' },
          { id: 's_3', code: 'ОБРАЗЕЦ #03', meta: 'Контрольный отстрел (схожий шаг)', seed: 913, slope: 0.13, grooveCount: 4, hasBurr: false, isMatch: false, mismatchReason: 'ЛОЖНЫЙ СТВОЛ: микротрассы в косом свете не сходятся.' }
        ];
    var calOpts = Array.isArray(config.caliberOptions) && config.caliberOptions.length > 0
      ? config.caliberOptions
      : [
          { id: 'c1', label: '5.45 мм', isCorrect: false, wrongMsg: 'Замер не соответствует 5.45 мм.' },
          { id: 'c2', label: '7.62 мм', isCorrect: false, wrongMsg: 'Замер не соответствует 7.62 мм.' },
          { id: 'c3', label: '9×18 мм', isCorrect: true, wrongMsg: '' }
        ];
    return {
      id: 'generic_ballistics',
      title: config.title || 'БАЛЛИСТИЧЕСКАЯ ЭКСПЕРТИЗА',
      subtitle: config.subtitle || 'ЭКЦ • СРАВНИТЕЛЬНЫЙ МИКРОСКОП',
      evidenceCode: config.evidenceCode || 'ВЕЩДОК // ПУЛЯ',
      stampWin: config.stampWin || 'СОВПАДЕНИЕ ПОДТВЕРЖДЕНО',
      caliberMm: cal,
      caliberLabel: config.caliberLabel || (cal.toFixed(1) + ' мм'),
      caliberOptions: calOpts,
      samples: samples,
      conclusion: config.conclusion || {
        question: 'Замер калибра и сверка микронарезов в косом свете ×40 завершены. Вывод экспертизы:',
        options: [
          { id: 'no_match', text: 'Ствол не установлен — микротрассы случайны.', isCorrect: false, reason: 'Противоречие: микротрассы и заусенец канала ствола сошлись точно по оси.' },
          { id: 'ok', text: 'Вещдок отстрелян именно из идентифицированного контрольного образца картотеки.', isCorrect: true, reason: 'Верно: баллистическая идентификация подтверждена.' },
          { id: 'wrong_cal', text: 'Калибр не соответствует ни одному из образцов.', isCorrect: false, reason: 'Противоречие: замер штангенциркулем полностью подтвердил калибр.' }
        ]
      }
    };
  }

  function resolveBalScenario(config) {
    var cfg = config || {};
    var caseId = String(window.ACTIVE_CASE_ID || '').toLowerCase();
    var nodeId = '';
    try {
      if (window.GameEngine && typeof window.GameEngine.getState === 'function') {
        var st = window.GameEngine.getState();
        if (st && st.nodeId) nodeId = String(st.nodeId);
      }
    } catch (e) {}

    if (cfg.preset === 'generic' || (caseId && caseId !== 'case418' && nodeId !== 'act3_ballistics_game')) {
      return buildBalGenericScenario(cfg);
    }
    return buildBalCase418Scenario(cfg);
  }

  function buildStriationPattern(seed, grooveCount, period, hasBurr) {
    var rand = mulberry32(seed);
    var grooves = [];
    var scratches = [];
    var i;

    for (i = 0; i < grooveCount; i++) {
      var base = (i / grooveCount) * period;
      grooves.push({
        y: (base + rand() * (period / grooveCount) * 0.22) % period,
        width: 11 + rand() * 10,
        darkness: 0.26 + rand() * 0.18
      });
    }

    for (i = 0; i < 44; i++) {
      scratches.push({
        y: rand() * period,
        width: 0.7 + rand() * 1.9,
        bright: rand() > 0.46,
        alpha: 0.22 + rand() * 0.56
      });
    }

    // Signature twin barrel-burr defect (crucial in Oblique ×40 light to separate true match from decoy!)
    var burr = hasBurr ? { y1: period * 0.34, y2: period * 0.375 } : null;
    return { grooves: grooves, scratches: scratches, period: period, burr: burr };
  }

  function drawBulletHalf(ctx, pattern, slope, xStart, xEnd, midX, viewTop, viewH, offsetY, isRight, isOblique) {
    var period = pattern.period;
    var halfW = Math.abs(xEnd - xStart);

    var baseGrad = ctx.createLinearGradient(0, viewTop, 0, viewTop + viewH);
    if (isOblique) {
      baseGrad.addColorStop(0, '#1c0f05');
      baseGrad.addColorStop(0.22, '#5a3210');
      baseGrad.addColorStop(0.48, '#d4984c');
      baseGrad.addColorStop(0.56, '#e5b168');
      baseGrad.addColorStop(0.80, '#5a3210');
      baseGrad.addColorStop(1, '#190d04');
    } else {
      baseGrad.addColorStop(0, '#2a1809');
      baseGrad.addColorStop(0.2, '#69411b');
      baseGrad.addColorStop(0.5, '#b68044');
      baseGrad.addColorStop(0.8, '#663f1a');
      baseGrad.addColorStop(1, '#241408');
    }
    ctx.fillStyle = baseGrad;
    ctx.fillRect(Math.min(xStart, xEnd), viewTop, halfW, viewH);

    var yMin = viewTop - period;
    var yMax = viewTop + viewH + period;
    var normOffset = ((offsetY % period) + period) % period;
    var k, baseCycle, g, sc, yMid, yOuter;

    for (baseCycle = yMin - normOffset; baseCycle < yMax; baseCycle += period) {
      for (k = 0; k < pattern.grooves.length; k++) {
        g = pattern.grooves[k];
        yMid = baseCycle + g.y;
        yOuter = isRight ? yMid + slope * halfW : yMid - slope * halfW;

        ctx.strokeStyle = 'rgba(18, 9, 3, ' + (g.darkness * (isOblique ? 1.25 : 0.9)).toFixed(2) + ')';
        ctx.lineWidth = g.width;
        ctx.beginPath();
        ctx.moveTo(midX, yMid);
        ctx.lineTo(isRight ? xEnd : xStart, yOuter);
        ctx.stroke();

        ctx.strokeStyle = isOblique ? 'rgba(255, 232, 178, 0.42)' : 'rgba(255, 224, 175, 0.16)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(midX, yMid - g.width * 0.5);
        ctx.lineTo(isRight ? xEnd : xStart, yOuter - g.width * 0.5);
        ctx.stroke();
      }

      // Fine micro-striations stand out vividly in Oblique ×40 light!
      var microBoost = isOblique ? 1.0 : 0.24;
      for (k = 0; k < pattern.scratches.length; k++) {
        sc = pattern.scratches[k];
        yMid = baseCycle + sc.y;
        yOuter = isRight ? yMid + slope * halfW : yMid - slope * halfW;
        ctx.strokeStyle = sc.bright
          ? 'rgba(255, 238, 194, ' + (sc.alpha * microBoost).toFixed(2) + ')'
          : 'rgba(14, 7, 2, ' + (sc.alpha * microBoost).toFixed(2) + ')';
        ctx.lineWidth = isOblique ? sc.width * 1.1 : sc.width * 0.7;
        ctx.beginPath();
        ctx.moveTo(midX, yMid);
        ctx.lineTo(isRight ? xEnd : xStart, yOuter);
        ctx.stroke();
      }

      // Unique twin barrel-burr scar visible sharply in Oblique ×40 light
      if (pattern.burr && isOblique) {
        var bYs = [baseCycle + pattern.burr.y1, baseCycle + pattern.burr.y2];
        for (var bi = 0; bi < bYs.length; bi++) {
          var byM = bYs[bi];
          var byO = isRight ? byM + slope * halfW : byM - slope * halfW;
          ctx.strokeStyle = '#fef08a';
          ctx.lineWidth = 2.1;
          ctx.beginPath(); ctx.moveTo(midX, byM); ctx.lineTo(isRight ? xEnd : xStart, byO); ctx.stroke();
          ctx.strokeStyle = 'rgba(12, 6, 2, 0.85)';
          ctx.lineWidth = 1.3;
          ctx.beginPath(); ctx.moveTo(midX, byM + 2.2); ctx.lineTo(isRight ? xEnd : xStart, byO + 2.2); ctx.stroke();
        }
      }
    }

    var vig = ctx.createLinearGradient(0, viewTop, 0, viewTop + viewH);
    vig.addColorStop(0, 'rgba(0, 0, 0, 0.6)');
    vig.addColorStop(0.22, 'rgba(0, 0, 0, 0)');
    vig.addColorStop(0.78, 'rgba(0, 0, 0, 0)');
    vig.addColorStop(1, 'rgba(0, 0, 0, 0.6)');
    ctx.fillStyle = vig;
    ctx.fillRect(Math.min(xStart, xEnd), viewTop, halfW, viewH);
  }


  function initBallistics(containerEl, config, callbacks) {
    config = config || {};
    injectBalStyles();

    var timers = createTimerBag();
    var listeners = createListenerBag();
    var triggerWin = createWinTrigger(callbacks);
    var failFired = false;
    function triggerBalFail(res) {
      if (failFired) return;
      failFired = true;
      if (callbacks && typeof callbacks.onFail === 'function') {
        callbacks.onFail(res || { success: false });
      }
    }

    var scenario = resolveBalScenario(config);
    var caliberTarget = scenario.caliberMm;
    var caliberOptions = scenario.caliberOptions;
    var rawSamples = scenario.samples;
    var maxErrors = typeof config.maxErrors === 'number' && config.maxErrors > 0 ? config.maxErrors : 4;

    var PERIOD = 160;
    var matchIdx = 0;
    for (var si = 0; si < rawSamples.length; si++) {
      if (rawSamples[si].isMatch) { matchIdx = si; break; }
    }
    if (typeof config.matchIndex === 'number' && rawSamples[config.matchIndex]) {
      matchIdx = config.matchIndex;
    }

    var evSample = rawSamples[matchIdx];
    var evidenceSlope = typeof evSample.slope === 'number' ? evSample.slope : 0.13;
    var evidencePattern = buildStriationPattern(
      evSample.seed || 41807,
      evSample.grooveCount || 4,
      PERIOD,
      true
    );

    var samples = rawSamples.map(function (s, idx) {
      var isMatch = idx === matchIdx;
      var pat = isMatch
        ? evidencePattern
        : buildStriationPattern(s.seed || (1000 + idx * 777), s.grooveCount || 4, PERIOD, Boolean(s.hasBurr));
      return {
        id: s.id || 'sample_' + idx,
        code: s.code || ('ОБРАЗЕЦ ЛРО #' + (idx + 1)),
        meta: s.meta || 'Контрольный отстрел картотеки',
        slope: isMatch ? evidenceSlope : (typeof s.slope === 'number' ? s.slope : 0.13),
        isMatch: isMatch,
        mismatchReason: s.mismatchReason || 'НАРЕЗЫ НЕ СОВПАДАЮТ: проверьте другой образец ЛРО.',
        pattern: pat
      };
    });

    var targetShiftPx = typeof config.targetShift === 'number' ? config.targetShift % PERIOD : 104;
    if (targetShiftPx < 25 || targetShiftPx > PERIOD - 25) targetShiftPx = 98;

    var shell = createShell(containerEl, {
      title: scenario.title,
      subtitle: scenario.subtitle,
      extraClass: 'mg-bal-wrap'
    });

    shell.subEl.style.display = 'none';
    var metaRow = document.createElement('div');
    metaRow.className = 'mg-bal-meta';
    var statStage = document.createElement('span');
    statStage.className = 'mg-bal-stat';
    var statErr = document.createElement('span');
    statErr.className = 'mg-bal-err';
    metaRow.appendChild(statStage);
    metaRow.appendChild(statErr);
    shell.subEl.parentNode.appendChild(metaRow);

    listeners.on(shell.cancelBtn, 'click', function () {
      haptic('light');
      sfx('click');
      triggerCancel(callbacks);
    });

    // 3-step indicator
    var stepsRow = document.createElement('div');
    stepsRow.className = 'mg-bal-steps3';
    var step1Badge = document.createElement('div');
    step1Badge.className = 'mg-bal-step is-active';
    step1Badge.textContent = '1. ОЧИСТКА/ЗАМЕР';
    var step2Badge = document.createElement('div');
    step2Badge.className = 'mg-bal-step';
    step2Badge.textContent = '2. МИКРОСКОП';
    var step3Badge = document.createElement('div');
    step3Badge.className = 'mg-bal-step';
    step3Badge.textContent = '3. ВЫВОД';
    stepsRow.appendChild(step1Badge);
    stepsRow.appendChild(step2Badge);
    stepsRow.appendChild(step3Badge);
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
    statusText.textContent = 'Сначала сотрите гарь и щепки с пули пальцем (инструмент САЛФЕТКА).';
    statusEl.appendChild(statusText);
    shell.body.appendChild(statusEl);

    // === PANEL 1: CLEANING + CALIPER + CALIBER ===
    var panel1 = document.createElement('div');
    panel1.className = 'mg-for-panel';

    var p1Tools = document.createElement('div');
    p1Tools.className = 'mg-bal-tools';
    var btnSwab = document.createElement('button');
    btnSwab.type = 'button';
    btnSwab.className = 'mg-bal-tbtn is-oblique';
    btnSwab.textContent = '1. САЛФЕТКА (ГАРЬ)';
    var btnCalTool = document.createElement('button');
    btnCalTool.type = 'button';
    btnCalTool.className = 'mg-bal-tbtn';
    btnCalTool.textContent = '2. ШТАНГЕНЦИРКУЛЬ';
    p1Tools.appendChild(btnSwab);
    p1Tools.appendChild(btnCalTool);
    panel1.appendChild(p1Tools);

    var calSliderWrap = document.createElement('div');
    calSliderWrap.className = 'mg-for-slider-wrap';
    var calRow = document.createElement('div');
    calRow.className = 'mg-for-row';
    var calLbl = document.createElement('span');
    calLbl.className = 'mg-for-label';
    calLbl.textContent = 'ШТАНГЕНЦИРКУЛЬ (ММ)';
    var calVal = document.createElement('span');
    calVal.className = 'mg-for-value';
    calVal.textContent = 'ОЧИСТИТЕ ПУЛЮ';
    calRow.appendChild(calLbl);
    calRow.appendChild(calVal);

    var calSlider = document.createElement('input');
    calSlider.type = 'range';
    calSlider.className = 'mg-for-slider';
    calSlider.min = '4.0';
    calSlider.max = '14.5';
    calSlider.step = '0.1';
    calSlider.value = '13.6';
    calSlider.disabled = true;
    calSliderWrap.appendChild(calRow);
    calSliderWrap.appendChild(calSlider);
    panel1.appendChild(calSliderWrap);

    var choicesGrid = document.createElement('div');
    choicesGrid.className = 'mg-bal-choices';
    for (var c = 0; c < caliberOptions.length; c++) {
      (function (opt) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'mg-for-btn-sec';
        btn.textContent = opt.label;
        listeners.on(btn, 'click', function () { handleCaliberChoice(opt, btn); });
        choicesGrid.appendChild(btn);
      })(caliberOptions[c]);
    }
    panel1.appendChild(choicesGrid);

    // === PANEL 2: COMPARISON MICROSCOPE ×40 ===
    var panel2 = document.createElement('div');
    panel2.className = 'mg-for-panel';
    panel2.style.display = 'none';

    var p2Lights = document.createElement('div');
    p2Lights.className = 'mg-bal-tools';
    var btnLightNorm = document.createElement('button');
    btnLightNorm.type = 'button';
    btnLightNorm.className = 'mg-bal-tbtn is-norm';
    btnLightNorm.textContent = '1. ОБЫЧНЫЙ СВЕТ';
    var btnLightObl = document.createElement('button');
    btnLightObl.type = 'button';
    btnLightObl.className = 'mg-bal-tbtn';
    btnLightObl.textContent = '2. КОСОЙ СВЕТ ×40';
    p2Lights.appendChild(btnLightNorm);
    p2Lights.appendChild(btnLightObl);
    panel2.appendChild(p2Lights);

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
    shiftLbl.textContent = 'ПОВОРОТ ОСИ БАРАБАНА';
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

    // State
    var stageNum = 1; // 1 | 2 | 3 | 99 (fail/win)
    var p1Tool = 'swab'; // 'swab' | 'caliper'
    var sootLevel = 1.0;
    var sootParticles = [];
    var caliperMm = 13.6;
    var caliperLocked = false;
    var lightMode = 'normal'; // 'normal' | 'oblique'
    var currentSampleIdx = 0;
    var shiftPx = 0;
    var wasAlignedHaptic = false;
    var errorsCount = 0;
    var redFlash = 0;
    var greenLock = 0;
    var draggingCanvas = false;
    var dragStartY = 0;
    var dragStartShift = 0;
    var lastCanvasX = 0;
    var lastCanvasY = 0;
    var matchedCode = '';
    var lastTs = performance.now();

    var canvasMgr = setupResponsiveCanvas(canvas, stage);

    function syncHeaderMeta() {
      statStage.textContent = stageNum <= 3 ? ('ЭТАП ' + stageNum + ' / 3') : 'ЭКЦ // ПРОТОКОЛ';
      statErr.textContent = 'ОШИБКИ: ' + errorsCount + ' / ' + maxErrors;
      statErr.classList.toggle('is-warn', errorsCount >= maxErrors - 1);
    }

    function syncP1Tools() {
      btnSwab.className = 'mg-bal-tbtn' + (p1Tool === 'swab' ? ' is-oblique' : '');
      btnCalTool.className = 'mg-bal-tbtn' + (p1Tool === 'caliper' ? ' is-norm' : '');
      calSlider.disabled = sootLevel > 0.01;
    }

    function syncP2Lights() {
      btnLightNorm.className = 'mg-bal-tbtn' + (lightMode === 'normal' ? ' is-norm' : '');
      btnLightObl.className = 'mg-bal-tbtn' + (lightMode === 'oblique' ? ' is-oblique' : '');
    }

    function updateDossierUI() {
      var smp = samples[currentSampleIdx];
      dossierCode.textContent = '[' + (currentSampleIdx + 1) + '/' + samples.length + '] ' + smp.code;
      dossierMeta.textContent = smp.meta;
    }

    function updateCaliperUI() {
      if (sootLevel > 0.01) {
        calVal.textContent = 'ГАРЬ: ' + Math.round(sootLevel * 100) + '%';
        calVal.className = 'mg-for-value';
        return;
      }
      calSlider.value = caliperMm.toFixed(1);
      var isTouching = Math.abs(caliperMm - caliberTarget) <= 0.35;
      calVal.textContent = caliperMm.toFixed(1) + ' мм' + (isTouching ? ' [КОНТАКТ]' : '');
      calVal.className = 'mg-for-value' + (isTouching ? ' is-ok' : '');
      if (isTouching && !caliperLocked) {
        caliperLocked = true;
        haptic('light');
        sfx('click');
        statusEl.className = 'mg-for-status is-ok';
        statusText.textContent = 'Замер: ' + caliperMm.toFixed(1) + ' мм — выберите калибр ниже.';
      } else if (!isTouching) {
        caliperLocked = false;
      }
    }

    function showFailScreen(reason, msg) {
      stageNum = 99;
      stepsRow.style.display = 'none';
      stage.style.display = 'none';
      statusEl.style.display = 'none';
      panel1.style.display = 'none';
      panel2.style.display = 'none';

      var box = document.createElement('div');
      box.className = 'mg-bal-stamp-box';
      var st = document.createElement('div');
      st.className = 'mg-bal-stamp';
      st.textContent = 'ЭКСПЕРТИЗА ПРОВАЛЕНА';
      var txt = document.createElement('div');
      txt.className = 'mg-bal-dq';
      txt.textContent = msg || 'Превышен лимит ошибок баллистической экспертизы.';
      box.appendChild(st);
      box.appendChild(txt);
      shell.body.appendChild(box);

      timers.setTimeout(function () {
        triggerBalFail({ minigame: 'ballistics', scenarioId: scenario.id, reason: reason, errors: errorsCount });
      }, 950);
    }

    function registerError(msg, reason) {
      errorsCount += 1;
      redFlash = 0.9;
      syncHeaderMeta();
      haptic('error');
      sfx('alert');
      flashShake(stage);
      statusEl.className = 'mg-for-status is-err';
      statusText.textContent = msg;
      if (errorsCount >= maxErrors) {
        timers.setTimeout(function () {
          showFailScreen(reason || 'too_many_errors', msg);
        }, 520);
      }
    }

    function openDeductionPhase() {
      stageNum = 3;
      syncHeaderMeta();
      step2Badge.className = 'mg-bal-step is-done';
      step3Badge.className = 'mg-bal-step is-active';
      stage.style.display = 'none';
      statusEl.style.display = 'none';
      panel1.style.display = 'none';
      panel2.style.display = 'none';

      var card = document.createElement('div');
      card.className = 'mg-bal-deduce';
      var kicker = document.createElement('div');
      kicker.className = 'mg-bal-dkicker';
      kicker.textContent = 'ФАЗА 3 // ЗАКЛЮЧЕНИЕ БАЛЛИСТА';
      card.appendChild(kicker);

      var facts = document.createElement('div');
      facts.className = 'mg-bal-dfacts';
      facts.innerHTML =
        '<div>• Калибр пули: ' + scenario.caliberLabel + ' (замер ' + caliberTarget.toFixed(1) + ' мм после очистки)</div>' +
        '<div>• Косой свет ×40: 4 правонаклонных нареза + уникальный двойной заусенец ствола</div>' +
        '<div>• Картотека ЭКЦ: совпадение 99.1% с ' + matchedCode + '</div>';
      card.appendChild(facts);

      var q = document.createElement('div');
      q.className = 'mg-bal-dq';
      q.textContent = scenario.conclusion.question;
      card.appendChild(q);

      var optsWrap = document.createElement('div');
      optsWrap.className = 'mg-bal-dopts';
      var fb = document.createElement('div');
      fb.className = 'mg-bal-dfb';

      var settled = false;
      var opts = scenario.conclusion.options || [];
      for (var oi = 0; oi < opts.length; oi++) {
        (function (opt) {
          var ob = document.createElement('button');
          ob.type = 'button';
          ob.className = 'mg-bal-dopt';
          ob.textContent = opt.text;
          listeners.on(ob, 'click', function () {
            if (settled || stageNum !== 3) return;
            if (opt.isCorrect) {
              settled = true;
              step3Badge.className = 'mg-bal-step is-done';
              ob.classList.add('is-correct');
              fb.className = 'mg-bal-dfb is-ok';
              fb.textContent = opt.reason;
              haptic('success');
              sfx('stamp');
              timers.setTimeout(function () {
                card.innerHTML = '';
                var box = document.createElement('div');
                box.className = 'mg-bal-stamp-box';
                var st = document.createElement('div');
                st.className = 'mg-bal-stamp is-ok';
                st.textContent = scenario.stampWin;
                var btnDone = document.createElement('button');
                btnDone.type = 'button';
                btnDone.className = 'mg-for-btn is-ready';
                btnDone.textContent = 'ПРИОБЩИТЬ К ДЕЛУ';
                listeners.on(btnDone, 'click', function () {
                  haptic('success');
                  sfx('success');
                  triggerWin({
                    minigame: 'ballistics',
                    scenarioId: scenario.id,
                    caliberMm: caliberTarget,
                    matchedSample: matchedCode,
                    errors: errorsCount,
                    deduced: opt.id
                  });
                });
                box.appendChild(st);
                box.appendChild(btnDone);
                card.appendChild(box);
              }, 550);
            } else {
              errorsCount += 1;
              syncHeaderMeta();
              ob.classList.add('is-wrong');
              fb.className = 'mg-bal-dfb';
              fb.textContent = opt.reason;
              haptic('error');
              sfx('alert');
              flashShake(card);
              if (errorsCount >= maxErrors) {
                settled = true;
                timers.setTimeout(function () {
                  showFailScreen('wrong_deduction', 'Лимит ошибок исчерпан — заключение баллиста отклонено.');
                }, 700);
              }
            }
          });
          optsWrap.appendChild(ob);
        })(opts[oi]);
      }

      card.appendChild(optsWrap);
      card.appendChild(fb);
      shell.body.appendChild(card);
    }

    function handleCaliberChoice(opt, btnEl) {
      if (stageNum !== 1) return;
      if (sootLevel > 0.01) {
        haptic('light');
        statusEl.className = 'mg-for-status is-warn';
        statusText.textContent = 'Пуля в гари и щепе — сначала сотрите копоть салфеткой!';
        return;
      }
      if (Math.abs(caliperMm - caliberTarget) > 0.55) {
        haptic('light');
        statusEl.className = 'mg-for-status is-warn';
        statusText.textContent = 'Сначала сведите подвижную губку штангенциркуля к стенке пули.';
        return;
      }

      if (opt.isCorrect) {
        haptic('medium');
        sfx('success');
        btnEl.classList.add('is-ok');
        statusEl.className = 'mg-for-status is-ok';
        statusText.textContent = 'Калибр подтверждён: ' + opt.label + ' • Переход к микроскопу ×40...';
        step1Badge.className = 'mg-bal-step is-done';
        step2Badge.className = 'mg-bal-step is-active';
        timers.setTimeout(function () {
          if (stageNum !== 1) return;
          stageNum = 2;
          syncHeaderMeta();
          panel1.style.display = 'none';
          panel2.style.display = 'flex';
          statusEl.className = 'mg-for-status';
          statusText.textContent = 'Подберите ствол ЛРО, включите КОСОЙ СВЕТ ×40 и совместите микротрассы.';
        }, 620);
      } else {
        registerError(opt.wrongMsg || ('Неверный калибр при замере ' + caliberMm.toFixed(1) + ' мм!'), 'wrong_caliber');
      }
    }

    listeners.on(btnSwab, 'click', function () {
      if (stageNum !== 1) return;
      p1Tool = 'swab';
      syncP1Tools();
      haptic('light'); sfx('click');
    });
    listeners.on(btnCalTool, 'click', function () {
      if (stageNum !== 1) return;
      if (sootLevel > 0.01) {
        statusEl.className = 'mg-for-status is-warn';
        statusText.textContent = 'Сначала сотрите гарь салфеткой, иначе губки дадут неточный замер!';
        haptic('light');
        return;
      }
      p1Tool = 'caliper';
      syncP1Tools();
      haptic('light'); sfx('click');
    });

    listeners.on(calSlider, 'input', function () {
      if (stageNum !== 1 || sootLevel > 0.01) return;
      p1Tool = 'caliper';
      syncP1Tools();
      caliperMm = clamp(parseFloat(calSlider.value) || 13.6, 4.0, 14.5);
      updateCaliperUI();
    });

    listeners.on(btnLightNorm, 'click', function () {
      if (stageNum !== 2) return;
      lightMode = 'normal';
      syncP2Lights();
      haptic('light'); sfx('click');
    });
    listeners.on(btnLightObl, 'click', function () {
      if (stageNum !== 2) return;
      lightMode = 'oblique';
      syncP2Lights();
      haptic('light'); sfx('click');
      statusEl.className = 'mg-for-status is-ok';
      statusText.textContent = 'КОСОЙ СВЕТ ×40: сравнивайте тонкие микротрассы и двойной заусенец ствола.';
    });

    listeners.on(prevBtn, 'click', function () {
      if (stageNum !== 2) return;
      currentSampleIdx = (currentSampleIdx - 1 + samples.length) % samples.length;
      updateDossierUI();
      haptic('light'); sfx('click');
    });
    listeners.on(nextBtn, 'click', function () {
      if (stageNum !== 2) return;
      currentSampleIdx = (currentSampleIdx + 1) % samples.length;
      updateDossierUI();
      haptic('light'); sfx('click');
    });

    function checkAlignmentTactile() {
      var smp = samples[currentSampleIdx];
      var delta = Math.abs(((shiftPx - targetShiftPx) % PERIOD + PERIOD) % PERIOD);
      var err = Math.min(delta, PERIOD - delta);
      var aligned = smp.isMatch && lightMode === 'oblique' && err <= 6.5;
      if (aligned && !wasAlignedHaptic) {
        haptic('light');
      }
      wasAlignedHaptic = aligned;
    }

    function syncShiftUI() {
      shiftSlider.value = String(shiftPx);
      shiftVal.textContent = Math.round((shiftPx / PERIOD) * 360) + '°';
      checkAlignmentTactile();
    }

    listeners.on(shiftSlider, 'input', function () {
      if (stageNum !== 2) return;
      shiftPx = parseFloat(shiftSlider.value) || 0;
      syncShiftUI();
    });

    listeners.on(confirmBtn, 'click', function () {
      if (stageNum !== 2) return;
      if (lightMode !== 'oblique') {
        registerError('НАРУШЕНА МЕТОДИКА: в обычном свете видны лишь общие нарезы — проверьте микротрассы в КОСОМ СВЕТЕ ×40!', 'wrong_light');
        return;
      }
      var smp = samples[currentSampleIdx];
      if (!smp.isMatch) {
        registerError(smp.mismatchReason, 'wrong_sample');
        return;
      }
      var delta = Math.abs(((shiftPx - targetShiftPx) % PERIOD + PERIOD) % PERIOD);
      var circularErr = Math.min(delta, PERIOD - delta);
      if (circularErr > 7.5) {
        registerError('Ось повёрнута: совместите нарезы и двойной заусенец стык-в-стык по центральной линии!', 'misaligned');
        return;
      }

      matchedCode = smp.code;
      greenLock = 1;
      confirmBtn.disabled = true;
      confirmBtn.classList.add('is-ready');
      statusEl.className = 'mg-for-status is-ok';
      statusText.textContent = 'СОВПАДЕНИЕ 99.1% (' + smp.code + ') • Формирование вывода...';
      haptic('success');
      sfx('success');
      timers.setTimeout(function () {
        if (stageNum === 2) openDeductionPhase();
      }, 920);
    });

    function getCaliperLayout(w, h) {
      return { pxPerMm: (w * 0.66) / 14.5, zeroX: w * 0.20, rulerY: h * 0.16 };
    }

    function scrubSoot(px, py, distPx, w, h) {
      if (sootLevel <= 0) return;
      var lay = getCaliperLayout(w, h);
      var bx1 = lay.zeroX - 10;
      var bx2 = lay.zeroX + caliberTarget * lay.pxPerMm + 12;
      if (px >= bx1 && px <= bx2 && py >= h * 0.36 && py <= h * 0.90) {
        sootLevel = Math.max(0, sootLevel - Math.max(0.08, distPx * 0.008));
        for (var k = 0; k < 3; k++) {
          sootParticles.push({
            x: px + (Math.random() - 0.5) * 14,
            y: py + (Math.random() - 0.5) * 14,
            vx: (Math.random() - 0.5) * 65,
            vy: (Math.random() - 0.2) * 45 + 18,
            r: 1.5 + Math.random() * 2.3,
            alpha: 0.9
          });
        }
        updateCaliperUI();
        if (sootLevel <= 0.12) {
          sootLevel = 0;
          p1Tool = 'caliper';
          syncP1Tools();
          updateCaliperUI();
          haptic('medium');
          sfx('paper');
          statusEl.className = 'mg-for-status is-ok';
          statusText.textContent = 'Оболочка очищена! Сведите губки штангенциркуля к стенке пули.';
        }
      }
    }

    listeners.on(canvas, 'pointerdown', function (ev) {
      if (stageNum !== 1 && stageNum !== 2) return;
      draggingCanvas = true;
      try { canvas.setPointerCapture(ev.pointerId); } catch (e) {}
      var rect = canvas.getBoundingClientRect();
      var x = ev.clientX - rect.left;
      var y = ev.clientY - rect.top;
      lastCanvasX = x;
      lastCanvasY = y;

      if (stageNum === 1) {
        if (p1Tool === 'swab' || sootLevel > 0.01) {
          scrubSoot(x, y, 12, rect.width, rect.height);
        } else {
          var lay = getCaliperLayout(rect.width, rect.height);
          caliperMm = clamp(Math.round(((x - lay.zeroX) / lay.pxPerMm) * 10) / 10, 4.0, 14.5);
          updateCaliperUI();
        }
      } else {
        dragStartY = y;
        dragStartShift = shiftPx;
      }
    });

    listeners.on(canvas, 'pointermove', function (ev) {
      if (!draggingCanvas || (stageNum !== 1 && stageNum !== 2)) return;
      var rect = canvas.getBoundingClientRect();
      var x = ev.clientX - rect.left;
      var y = ev.clientY - rect.top;
      var dist = Math.hypot(x - lastCanvasX, y - lastCanvasY);
      lastCanvasX = x;
      lastCanvasY = y;

      if (stageNum === 1) {
        if (p1Tool === 'swab' || sootLevel > 0.01) {
          scrubSoot(x, y, dist, rect.width, rect.height);
        } else {
          var lay = getCaliperLayout(rect.width, rect.height);
          caliperMm = clamp(Math.round(((x - lay.zeroX) / lay.pxPerMm) * 10) / 10, 4.0, 14.5);
          updateCaliperUI();
        }
      } else {
        var dy = y - dragStartY;
        shiftPx = ((dragStartShift + dy) % PERIOD + PERIOD) % PERIOD;
        syncShiftUI();
      }
    });

    listeners.on(canvas, 'pointerup', function () { draggingCanvas = false; });
    listeners.on(canvas, 'pointercancel', function () { draggingCanvas = false; });

    function drawStage1(ctx, w, h, dt) {
      ctx.fillStyle = '#0a0c10';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(42, 46, 56, 0.45)';
      ctx.lineWidth = 1;
      for (var gx = 0; gx < w; gx += 18) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke(); }
      for (var gy = 0; gy < h; gy += 18) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke(); }

      var lay = getCaliperLayout(w, h);
      var pxPerMm = lay.pxPerMm, zeroX = lay.zeroX, rulerY = lay.rulerY;
      var bulletW = caliberTarget * pxPerMm;
      var bulletLeft = zeroX, bulletRight = zeroX + bulletW, bulletMidX = bulletLeft + bulletW / 2;
      var bulletBaseY = h * 0.87, bulletTopY = h * 0.43, bodyTopY = h * 0.56;

      // Bullet body
      var metalGrad = ctx.createLinearGradient(bulletLeft, 0, bulletRight, 0);
      metalGrad.addColorStop(0, '#4c2c12');
      metalGrad.addColorStop(0.25, '#a86927');
      metalGrad.addColorStop(0.45, '#efc078');
      metalGrad.addColorStop(0.7, '#9d5f21');
      metalGrad.addColorStop(1, '#321c0b');

      ctx.save();
      ctx.fillStyle = metalGrad;
      ctx.beginPath();
      ctx.moveTo(bulletLeft, bulletBaseY);
      ctx.lineTo(bulletLeft, bodyTopY);
      ctx.bezierCurveTo(bulletLeft - 2, bulletTopY + 14, bulletMidX - bulletW * 0.34, bulletTopY + 2, bulletMidX - bulletW * 0.08, bulletTopY + 4);
      ctx.lineTo(bulletMidX + bulletW * 0.14, bulletTopY + 10);
      ctx.bezierCurveTo(bulletMidX + bulletW * 0.38, bulletTopY + 9, bulletRight + 2, bodyTopY - 12, bulletRight, bodyTopY);
      ctx.lineTo(bulletRight, bulletBaseY);
      ctx.closePath();
      ctx.fill();

      // Lead dent
      ctx.fillStyle = '#525763';
      ctx.beginPath();
      ctx.ellipse(bulletMidX + bulletW * 0.05, bulletTopY + 10, bulletW * 0.16, 5.5, 0.25, 0, Math.PI * 2);
      ctx.fill();

      // Rifling grooves
      ctx.strokeStyle = 'rgba(28, 16, 6, 0.45)';
      ctx.lineWidth = 2.4;
      for (var r = 0; r < 4; r++) {
        var rx = bulletLeft + bulletW * (0.16 + r * 0.22);
        ctx.beginPath(); ctx.moveTo(rx - 6, bulletBaseY - 4); ctx.lineTo(rx + 9, bodyTopY + 6); ctx.stroke();
      }

      // Physical soot & charred splinter crust (progressively brushed off!)
      if (sootLevel > 0.01) {
        ctx.globalAlpha = clamp(sootLevel, 0.12, 0.96);
        ctx.fillStyle = '#12100f';
        ctx.beginPath();
        ctx.ellipse(bulletMidX + 4, (bodyTopY + bulletBaseY) * 0.5, bulletW * 0.66, (bulletBaseY - bodyTopY) * 0.58, 0.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#473a2c';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(bulletLeft + 6, bodyTopY + 14); ctx.lineTo(bulletRight + 6, bodyTopY + 34);
        ctx.moveTo(bulletLeft - 4, bulletBaseY - 26); ctx.lineTo(bulletRight - 6, bulletBaseY - 10);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.font = '700 10px "IBM Plex Mono", monospace';
        ctx.fillStyle = '#fde68a';
        ctx.textAlign = 'center';
        ctx.fillText('ПОТРИТЕ ГАРЬ (' + Math.round(sootLevel * 100) + '%)', bulletMidX, bodyTopY - 12);
      }
      ctx.restore();

      // Flying soot particles
      for (var p = sootParticles.length - 1; p >= 0; p--) {
        var sp = sootParticles[p];
        sp.x += sp.vx * dt; sp.y += sp.vy * dt; sp.alpha -= dt * 1.9;
        if (sp.alpha <= 0) { sootParticles.splice(p, 1); continue; }
        ctx.fillStyle = 'rgba(42, 36, 32, ' + sp.alpha.toFixed(2) + ')';
        ctx.beginPath(); ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2); ctx.fill();
      }

      // Caliper steel beam & ticks
      var beamH = 26;
      var steelGrad = ctx.createLinearGradient(0, rulerY, 0, rulerY + beamH);
      steelGrad.addColorStop(0, '#4b5563'); steelGrad.addColorStop(0.5, '#9ca3af'); steelGrad.addColorStop(1, '#374151');
      ctx.fillStyle = steelGrad;
      ctx.fillRect(zeroX - 18, rulerY, w - zeroX + 6, beamH);

      ctx.strokeStyle = '#111827'; ctx.fillStyle = '#111827';
      ctx.font = '600 9px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      for (var mm = 0; mm <= 15; mm++) {
        var tx = zeroX + mm * pxPerMm;
        if (tx > w - 10) break;
        var tickH = mm % 5 === 0 ? 12 : 7;
        ctx.lineWidth = mm % 5 === 0 ? 1.4 : 1;
        ctx.beginPath(); ctx.moveTo(tx, rulerY + beamH); ctx.lineTo(tx, rulerY + beamH - tickH); ctx.stroke();
        if (mm % 5 === 0 || mm % 2 === 0) ctx.fillText(String(mm), tx, rulerY + 3);
      }

      // Fixed left jaw
      ctx.fillStyle = '#9ca3af';
      ctx.beginPath();
      ctx.moveTo(zeroX - 18, rulerY); ctx.lineTo(zeroX, rulerY); ctx.lineTo(zeroX, h * 0.85);
      ctx.lineTo(zeroX - 10, h * 0.78); ctx.lineTo(zeroX - 18, h * 0.62); ctx.closePath();
      ctx.fill();

      // Movable right jaw
      var jawX = zeroX + caliperMm * pxPerMm;
      var touch = sootLevel <= 0.01 && Math.abs(caliperMm - caliberTarget) <= 0.35;
      ctx.fillStyle = sootLevel > 0.01 ? '#4b5563' : '#d1d5db';
      ctx.beginPath();
      ctx.moveTo(jawX, rulerY - 4); ctx.lineTo(jawX + 26, rulerY - 4); ctx.lineTo(jawX + 26, rulerY + beamH + 4);
      ctx.lineTo(jawX + 16, h * 0.62); ctx.lineTo(jawX + 9, h * 0.78); ctx.lineTo(jawX, h * 0.85); ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = touch ? '#22c55e' : '#f59e0b'; ctx.lineWidth = 1.6; ctx.stroke();

      // LCD readout
      var lcdW = 54, lcdH = 20, lcdX = clamp(jawX + 4, 10, w - lcdW - 8), lcdY = rulerY - lcdH - 8;
      ctx.fillStyle = '#0d1117'; ctx.fillRect(lcdX, lcdY, lcdW, lcdH);
      ctx.strokeStyle = touch ? '#22c55e' : '#c98a2e'; ctx.lineWidth = 1.2; ctx.strokeRect(lcdX, lcdY, lcdW, lcdH);
      ctx.fillStyle = touch ? '#4ade80' : '#f59e0b';
      ctx.font = '700 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(sootLevel > 0.01 ? '---' : (caliperMm.toFixed(1) + 'mm'), lcdX + lcdW / 2, lcdY + lcdH / 2 + 0.5);

      ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
      ctx.fillStyle = 'rgba(156, 163, 175, 0.78)'; ctx.font = '500 10px "IBM Plex Mono", monospace';
      ctx.fillText('ОБЪЕКТ: ' + scenario.evidenceCode, 10, h - 8);
    }

    function drawStage2(ctx, w, h, now) {
      ctx.fillStyle = '#07080b';
      ctx.fillRect(0, 0, w, h);

      var padX = 14, padTop = 26, padBot = 24;
      var viewW = w - padX * 2, viewH = h - padTop - padBot, midX = w / 2;
      var smp = samples[currentSampleIdx];
      var isObl = lightMode === 'oblique';
      var effectiveRightShift = shiftPx - targetShiftPx;

      ctx.save();
      ctx.beginPath(); ctx.rect(padX, padTop, viewW / 2, viewH); ctx.clip();
      drawBulletHalf(ctx, evidencePattern, evidenceSlope, padX, midX, midX, padTop, viewH, 0, false, isObl);
      ctx.restore();

      ctx.save();
      ctx.beginPath(); ctx.rect(midX, padTop, viewW / 2, viewH); ctx.clip();
      drawBulletHalf(ctx, smp.pattern, smp.slope, midX, padX + viewW, midX, padTop, viewH, effectiveRightShift, true, isObl);
      ctx.restore();

      ctx.strokeStyle = greenLock > 0 ? '#22c55e' : isObl ? '#f59e0b' : '#94a3b8';
      ctx.lineWidth = greenLock > 0 ? 2.4 : 1.5;
      ctx.beginPath(); ctx.moveTo(midX, padTop); ctx.lineTo(midX, padTop + viewH); ctx.stroke();

      ctx.strokeStyle = greenLock > 0 ? '#22c55e' : '#2a2e38';
      ctx.lineWidth = 1.6;
      ctx.strokeRect(padX, padTop, viewW, viewH);

      if (greenLock > 0) {
        ctx.fillStyle = 'rgba(5, 46, 22, 0.9)';
        ctx.fillRect(midX - 92, padTop + viewH / 2 - 16, 184, 32);
        ctx.strokeStyle = '#22c55e'; ctx.lineWidth = 1.6;
        ctx.strokeRect(midX - 92, padTop + viewH / 2 - 16, 184, 32);
        ctx.fillStyle = '#4ade80'; ctx.font = '700 12px "IBM Plex Mono", monospace';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('СОВПАДЕНИЕ 99.1%', midX, padTop + viewH / 2 + 0.5);
      }

      ctx.font = '600 10px "IBM Plex Mono", monospace';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'left'; ctx.fillStyle = '#d1d5db';
      ctx.fillText(scenario.evidenceCode, padX, 13);
      ctx.textAlign = 'right'; ctx.fillStyle = '#f59e0b';
      ctx.fillText('ЛРО #' + (currentSampleIdx + 1) + (isObl ? ' [КОСОЙ ×40]' : ' [ОБЫЧН.]'), w - padX, 13);
      ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(156, 163, 175, 0.75)';
      ctx.font = '500 9.5px "IBM Plex Mono", monospace';
      ctx.fillText(isObl ? 'КОСОЙ СВЕТ ×40 • СОВМЕСТИТЕ МИКРОТРАССЫ И ДВОЙНОЙ ЗАУСЕНЕЦ' : 'ВКЛЮЧИТЕ КОСОЙ СВЕТ ×40 ДЛЯ ПРОЯВКИ МИКРОТРАСС', midX, h - 11);
    }

    syncHeaderMeta();
    syncP1Tools();
    syncP2Lights();
    updateDossierUI();
    updateCaliperUI();

    function render(now) {
      var dt = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;

      if (stageNum === 1 || stageNum === 2) {
        var metrics = canvasMgr.getMetrics();
        var ctx = canvas.getContext('2d');
        ctx.save();
        ctx.scale(metrics.dpr, metrics.dpr);

        if (stageNum === 1) {
          drawStage1(ctx, metrics.width, metrics.height, dt);
        } else {
          drawStage2(ctx, metrics.width, metrics.height, now);
        }

        if (redFlash > 0.01) {
          ctx.fillStyle = 'rgba(220, 38, 38, ' + (redFlash * 0.4).toFixed(3) + ')';
          ctx.fillRect(0, 0, metrics.width, metrics.height);
          redFlash = Math.max(0, redFlash - dt * 2.5);
        }
        ctx.restore();
      }
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
