(function () {
  'use strict';

  if (!window.GameMinigames || typeof window.GameMinigames.register !== 'function') {
    return;
  }

  var STYLE_ID = 'minigames-forensics2-styles';

  // ============================================================================
  // SHARED STYLES & UTILITIES
  // ============================================================================

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      '.mg-wrap.mg-f2-wrap {',
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
      '  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.74);',
      '  user-select: none;',
      '  -webkit-user-select: none;',
      '  position: relative;',
      '  overflow: hidden;',
      '}',
      '.mg-wrap.mg-f2-wrap *, .mg-wrap.mg-f2-wrap *::before, .mg-wrap.mg-f2-wrap *::after {',
      '  box-sizing: border-box;',
      '}',
      '.mg-f2-wrap .mg-header {',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: space-between;',
      '  gap: 10px;',
      '  padding-bottom: 10px;',
      '  border-bottom: 1px solid #2a2e38;',
      '}',
      '.mg-f2-wrap .mg-header-info {',
      '  min-width: 0;',
      '  flex: 1;',
      '}',
      '.mg-f2-wrap .mg-header-title {',
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
      '.mg-f2-wrap .mg-header-sub {',
      '  font-family: "IBM Plex Mono", monospace;',
      '  font-size: 11px;',
      '  color: #c98a2e;',
      '  letter-spacing: 0.05em;',
      '  margin-top: 3px;',
      '  white-space: nowrap;',
      '  overflow: hidden;',
      '  text-overflow: ellipsis;',
      '}',
      '.mg-f2-wrap .mg-cancel-btn {',
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
      '.mg-f2-wrap .mg-cancel-btn:hover, .mg-f2-wrap .mg-cancel-btn:active {',
      '  background: #1f232c;',
      '  color: #f3f4f6;',
      '  border-color: #4b5563;',
      '}',
      '.mg-f2-body {',
      '  display: flex;',
      '  flex-direction: column;',
      '  gap: 10px;',
      '  position: relative;',
      '}',
      '.mg-f2-stage {',
      '  position: relative;',
      '  width: 100%;',
      '  background: #07090d;',
      '  border: 1px solid #2a2e38;',
      '  border-radius: 8px;',
      '  overflow: hidden;',
      '}',
      '.mg-f2-canvas {',
      '  display: block;',
      '  width: 100%;',
      '  height: 100%;',
      '  touch-action: none;',
      '  cursor: crosshair;',
      '}',
      '.mg-f2-panel {',
      '  background: #15171c;',
      '  border: 1px solid #2a2e38;',
      '  border-radius: 8px;',
      '  padding: 10px 12px;',
      '  display: flex;',
      '  flex-direction: column;',
      '  gap: 8px;',
      '}',
      '.mg-f2-row {',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: space-between;',
      '  gap: 8px;',
      '}',
      '.mg-f2-label {',
      '  font-family: "IBM Plex Mono", monospace;',
      '  font-size: 11px;',
      '  color: #9ca3af;',
      '  letter-spacing: 0.05em;',
      '  text-transform: uppercase;',
      '}',
      '.mg-f2-value {',
      '  font-family: "IBM Plex Mono", monospace;',
      '  font-size: 12px;',
      '  font-weight: 600;',
      '  color: #f59e0b;',
      '}',
      '.mg-f2-value.is-ok { color: #22c55e; }',
      '.mg-f2-value.is-err { color: #dc2626; }',
      '.mg-f2-value.is-uv { color: #818cf8; }',
      '.mg-f2-status {',
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
      '.mg-f2-status.is-ok {',
      '  border-color: rgba(34, 197, 94, 0.55);',
      '  background: rgba(34, 197, 94, 0.08);',
      '  color: #86efac;',
      '}',
      '.mg-f2-status.is-warn {',
      '  border-color: rgba(245, 158, 11, 0.55);',
      '  background: rgba(245, 158, 11, 0.08);',
      '  color: #fcd34d;',
      '}',
      '.mg-f2-status.is-err {',
      '  border-color: rgba(220, 38, 38, 0.65);',
      '  background: rgba(220, 38, 38, 0.12);',
      '  color: #fca5a5;',
      '}',
      '.mg-f2-status.is-uv {',
      '  border-color: rgba(99, 102, 241, 0.65);',
      '  background: rgba(99, 102, 241, 0.12);',
      '  color: #c7d2fe;',
      '}',
      '.mg-f2-slider-wrap {',
      '  display: flex;',
      '  flex-direction: column;',
      '  gap: 4px;',
      '}',
      '.mg-f2-slider {',
      '  -webkit-appearance: none;',
      '  appearance: none;',
      '  width: 100%;',
      '  height: 26px;',
      '  background: transparent;',
      '  cursor: pointer;',
      '  margin: 0;',
      '}',
      '.mg-f2-slider:focus { outline: none; }',
      '.mg-f2-slider::-webkit-slider-runnable-track {',
      '  height: 6px;',
      '  border-radius: 3px;',
      '  background: linear-gradient(90deg, #1f242e 0%, #2d3340 50%, #1f242e 100%);',
      '  border: 1px solid #374151;',
      '}',
      '.mg-f2-slider::-webkit-slider-thumb {',
      '  -webkit-appearance: none;',
      '  appearance: none;',
      '  width: 20px;',
      '  height: 20px;',
      '  border-radius: 50%;',
      '  background: radial-gradient(circle at 35% 35%, #fbbf24, #c98a2e);',
      '  border: 2px solid #0b0c0e;',
      '  box-shadow: 0 0 0 1px #f59e0b, 0 2px 8px rgba(0, 0, 0, 0.6);',
      '  margin-top: -8px;',
      '}',
      '.mg-f2-slider::-moz-range-track {',
      '  height: 6px;',
      '  border-radius: 3px;',
      '  background: #252a35;',
      '  border: 1px solid #374151;',
      '}',
      '.mg-f2-slider::-moz-range-thumb {',
      '  width: 20px;',
      '  height: 20px;',
      '  border-radius: 50%;',
      '  background: radial-gradient(circle at 35% 35%, #fbbf24, #c98a2e);',
      '  border: 2px solid #0b0c0e;',
      '  box-shadow: 0 0 0 1px #f59e0b;',
      '}',
      '.mg-f2-btn {',
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
      '  transition: transform 0.1s ease, opacity 0.15s ease, background 0.15s ease, border-color 0.15s ease;',
      '}',
      '.mg-f2-btn:active:not(:disabled) { transform: translateY(1px); }',
      '.mg-f2-btn:disabled {',
      '  opacity: 0.42;',
      '  cursor: not-allowed;',
      '  background: #1c2028;',
      '  border-color: #2a2e38;',
      '  color: #6b7280;',
      '}',
      '.mg-f2-btn.is-ready {',
      '  border-color: #22c55e;',
      '  background: linear-gradient(180deg, #22c55e 0%, #15803d 100%);',
      '  color: #052e16;',
      '  box-shadow: 0 0 14px rgba(34, 197, 94, 0.35);',
      '}',
      '.mg-f2-btn-sec {',
      '  background: #1b1f27;',
      '  color: #d1d5db;',
      '  border: 1px solid #2f3542;',
      '  border-radius: 6px;',
      '  padding: 8px 6px;',
      '  font-family: "IBM Plex Mono", monospace;',
      '  font-size: 10.5px;',
      '  font-weight: 600;',
      '  letter-spacing: 0.04em;',
      '  cursor: pointer;',
      '  text-align: center;',
      '  transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;',
      '}',
      '.mg-f2-btn-sec:hover { border-color: #c98a2e; background: #232833; }',
      '.mg-f2-btn-sec.is-active {',
      '  border-color: #f59e0b;',
      '  background: rgba(245, 158, 11, 0.16);',
      '  color: #fde68a;',
      '}',
      '.mg-f2-btn-sec.is-uv {',
      '  border-color: #6366f1;',
      '  background: rgba(99, 102, 241, 0.22);',
      '  color: #c7d2fe;',
      '  box-shadow: 0 0 12px rgba(99, 102, 241, 0.3);',
      '}',
      /* dental_xray */
      '.mg-xray-stage { aspect-ratio: 4 / 3; max-height: 320px; }',
      '.mg-xray-modes, .mg-doc-lights {',
      '  display: grid;',
      '  grid-template-columns: repeat(3, 1fr);',
      '  gap: 6px;',
      '}',
      '.mg-xray-found-list, .mg-doc-clues {',
      '  display: grid;',
      '  grid-template-columns: repeat(3, 1fr);',
      '  gap: 6px;',
      '}',
      '.mg-f2-pill {',
      '  background: #0d0f13;',
      '  border: 1px dashed #2a2e38;',
      '  border-radius: 6px;',
      '  padding: 6px 6px;',
      '  font-family: "IBM Plex Mono", monospace;',
      '  font-size: 9.5px;',
      '  line-height: 1.25;',
      '  color: #6b7280;',
      '  text-align: center;',
      '  min-height: 40px;',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: center;',
      '  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;',
      '}',
      '.mg-f2-pill.is-found {',
      '  border-style: solid;',
      '  border-color: #22c55e;',
      '  background: rgba(34, 197, 94, 0.1);',
      '  color: #bbf7d0;',
      '}',
      '.mg-f2-pill.is-mismatch {',
      '  border-style: solid;',
      '  border-color: #dc2626;',
      '  background: rgba(220, 38, 38, 0.12);',
      '  color: #fecaca;',
      '}',
      /* doc_forgery */
      '.mg-doc-stage { aspect-ratio: 4 / 3; max-height: 330px; }',
      /* timeline_reconstruct */
      '.mg-tl-board {',
      '  position: relative;',
      '  display: flex;',
      '  flex-direction: column;',
      '  gap: 10px;',
      '}',
      '.mg-tl-slots {',
      '  display: flex;',
      '  flex-direction: column;',
      '  gap: 6px;',
      '  position: relative;',
      '}',
      '.mg-tl-slot {',
      '  display: flex;',
      '  align-items: stretch;',
      '  gap: 8px;',
      '  background: #12141a;',
      '  border: 1px solid #2a2e38;',
      '  border-radius: 7px;',
      '  padding: 6px 8px;',
      '  cursor: pointer;',
      '  transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;',
      '}',
      '.mg-tl-slot:hover { border-color: #4b5563; }',
      '.mg-tl-slot.is-selected {',
      '  border-color: #f59e0b;',
      '  background: rgba(245, 158, 11, 0.11);',
      '  box-shadow: 0 0 0 1px rgba(245, 158, 11, 0.45);',
      '}',
      '.mg-tl-slot.is-correct {',
      '  border-color: #22c55e;',
      '  background: rgba(34, 197, 94, 0.11);',
      '}',
      '.mg-tl-slot.is-wrong {',
      '  border-color: #dc2626;',
      '  background: rgba(220, 38, 38, 0.13);',
      '}',
      '.mg-tl-time {',
      '  flex-shrink: 0;',
      '  width: 50px;',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: center;',
      '  font-family: "IBM Plex Mono", monospace;',
      '  font-size: 12px;',
      '  font-weight: 700;',
      '  color: #f59e0b;',
      '  background: #0b0c0e;',
      '  border: 1px solid #2a2e38;',
      '  border-radius: 5px;',
      '  padding: 4px 2px;',
      '}',
      '.mg-tl-slot.is-correct .mg-tl-time { color: #4ade80; border-color: rgba(34, 197, 94, 0.45); }',
      '.mg-tl-slot.is-wrong .mg-tl-time { color: #f87171; border-color: rgba(220, 38, 38, 0.5); }',
      '.mg-tl-slot-content {',
      '  flex: 1;',
      '  min-width: 0;',
      '  display: flex;',
      '  flex-direction: column;',
      '  justify-content: center;',
      '  gap: 2px;',
      '}',
      '.mg-tl-placeholder {',
      '  font-family: "IBM Plex Mono", monospace;',
      '  font-size: 10.5px;',
      '  color: #4b5563;',
      '  letter-spacing: 0.03em;',
      '}',
      '.mg-tl-card-title {',
      '  font-family: "Inter", sans-serif;',
      '  font-size: 12px;',
      '  font-weight: 600;',
      '  color: #f3f4f6;',
      '  line-height: 1.25;',
      '}',
      '.mg-tl-card-tag {',
      '  font-family: "IBM Plex Mono", monospace;',
      '  font-size: 9.5px;',
      '  color: #c98a2e;',
      '  letter-spacing: 0.04em;',
      '}',
      '.mg-tl-clear {',
      '  flex-shrink: 0;',
      '  width: 24px;',
      '  height: 24px;',
      '  align-self: center;',
      '  border: 1px solid #2f3542;',
      '  background: #181b22;',
      '  color: #9ca3af;',
      '  border-radius: 4px;',
      '  font-family: "IBM Plex Mono", monospace;',
      '  font-size: 12px;',
      '  cursor: pointer;',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: center;',
      '}',
      '.mg-tl-clear:hover { color: #f87171; border-color: #dc2626; }',
      '.mg-tl-pool {',
      '  display: grid;',
      '  grid-template-columns: 1fr;',
      '  gap: 6px;',
      '}',
      '.mg-tl-card {',
      '  background: #181b22;',
      '  border: 1px solid #2f3542;',
      '  border-left: 3px solid #c98a2e;',
      '  border-radius: 6px;',
      '  padding: 7px 9px;',
      '  cursor: pointer;',
      '  display: flex;',
      '  flex-direction: column;',
      '  gap: 2px;',
      '  transition: border-color 0.15s ease, background 0.15s ease, transform 0.1s ease;',
      '}',
      '.mg-tl-card:hover { background: #1f242e; }',
      '.mg-tl-card.is-selected {',
      '  border-color: #f59e0b;',
      '  background: rgba(245, 158, 11, 0.15);',
      '  box-shadow: 0 0 12px rgba(245, 158, 11, 0.22);',
      '}',
      '.mg-tl-stamp {',
      '  position: absolute;',
      '  inset: 0;',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: center;',
      '  background: rgba(11, 12, 14, 0.72);',
      '  border-radius: 8px;',
      '  pointer-events: none;',
      '  z-index: 5;',
      '}',
      '.mg-tl-stamp-inner {',
      '  border: 2.5px solid #22c55e;',
      '  background: rgba(5, 46, 22, 0.92);',
      '  color: #4ade80;',
      '  padding: 12px 16px;',
      '  border-radius: 6px;',
      '  font-family: "Oswald", sans-serif;',
      '  font-size: 16px;',
      '  font-weight: 700;',
      '  letter-spacing: 0.08em;',
      '  text-align: center;',
      '  text-transform: uppercase;',
      '  transform: rotate(-4deg);',
      '  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.8);',
      '}',
      '@keyframes mgF2Shake {',
      '  0%, 100% { transform: translateX(0); }',
      '  20% { transform: translateX(-5px); }',
      '  40% { transform: translateX(5px); }',
      '  60% { transform: translateX(-4px); }',
      '  80% { transform: translateX(4px); }',
      '}',
      '.mg-f2-shake { animation: mgF2Shake 0.34s ease; }'
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
    wrap.className = 'mg-wrap mg-f2-wrap' + (opts.extraClass ? ' ' + opts.extraClass : '');

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
    body.className = 'mg-f2-body';

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
    el.classList.remove('mg-f2-shake');
    void el.offsetWidth;
    el.classList.add('mg-f2-shake');
  }

  // ============================================================================
  // MINIGAME 1: dental_xray (3-phase negatoscope, film cleaning, alignment & verdict)
  // ============================================================================

  var XRAY_EXTRA_STYLE_ID = 'minigames-f2-xray-extra';

  var XRAY_EXTRA_CSS = [
    '.mg-xr-meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-top: 3px; }',
    '.mg-xr-stat { font-family: "IBM Plex Mono", monospace; font-size: 10.5px; font-weight: 600; color: var(--case-accent, #c98a2e); }',
    '.mg-xr-err { font-family: "IBM Plex Mono", monospace; font-size: 10.5px; font-weight: 600; color: #9ca3af; }',
    '.mg-xr-err.is-warn { color: #f87171; }',
    '.mg-xr-inspector { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 8px 10px; background: #12151d; border: 1px solid #2b3140; border-radius: 7px; }',
    '.mg-xr-ins-info { flex: 1; min-width: 0; }',
    '.mg-xr-ins-title { font-family: "IBM Plex Mono", monospace; font-size: 10px; font-weight: 700; color: var(--case-accent, #f59e0b); text-transform: uppercase; margin-bottom: 2px; }',
    '.mg-xr-ins-title.is-ok { color: #4ade80; }',
    '.mg-xr-ins-title.is-err { color: #f87171; }',
    '.mg-xr-ins-desc { font-size: 11.2px; line-height: 1.35; color: #d6d3cb; }',
    '.mg-xr-fix-btn { flex-shrink: 0; width: auto; padding: 8px 11px; font-size: 12px; }',
    '.mg-xr-deduce { display: flex; flex-direction: column; gap: 9px; padding: 12px; background: #14171f; border: 1px solid #353b4a; border-top: 3px solid var(--case-accent, #c98a2e); border-radius: 8px; }',
    '.mg-xr-dkicker { font-family: "IBM Plex Mono", monospace; font-size: 10px; font-weight: 700; color: var(--case-accent, #c98a2e); text-transform: uppercase; }',
    '.mg-xr-dfacts { padding: 8px 9px; background: #0d1016; border: 1px solid #262b36; border-radius: 6px; font-family: "IBM Plex Mono", monospace; font-size: 10px; line-height: 1.4; color: #c2cad8; display: flex; flex-direction: column; gap: 3px; }',
    '.mg-xr-dq { font-size: 12.8px; line-height: 1.4; color: #f3efe6; font-weight: 500; }',
    '.mg-xr-dopts { display: flex; flex-direction: column; gap: 6px; }',
    '.mg-xr-dopt { width: 100%; text-align: left; padding: 9px 10px; background: #1b202b; border: 1px solid #353d4e; border-radius: 6px; color: #e4e0d8; font-size: 12px; line-height: 1.36; cursor: pointer; }',
    '.mg-xr-dopt.is-wrong { border-color: #ef4444; background: rgba(153, 27, 27, 0.25); color: #fecaca; }',
    '.mg-xr-dopt.is-correct { border-color: #22c55e; background: rgba(34, 197, 94, 0.2); color: #bbf7d0; }',
    '.mg-xr-dfb { font-family: "IBM Plex Mono", monospace; font-size: 10.5px; line-height: 1.38; min-height: 16px; color: #fca5a5; }',
    '.mg-xr-dfb.is-ok { color: #86efac; }',
    '.mg-xr-stamp-box { padding: 24px 14px; background: #0d1016; border: 1px solid #2a2e38; border-radius: 8px; display: flex; flex-direction: column; align-items: center; gap: 14px; text-align: center; }',
    '.mg-xr-stamp { padding: 8px 14px; font-family: "Oswald", sans-serif; font-size: 17px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #ef4444; border: 3px double #ef4444; border-radius: 4px; transform: rotate(-5deg); line-height: 1.25; }',
    '.mg-xr-stamp.is-ok { color: #fca5a5; background: rgba(153, 27, 27, 0.22); }'
  ].join('\n');

  function injectXrayStyles() {
    if (document.getElementById(XRAY_EXTRA_STYLE_ID)) return;
    var el = document.createElement('style');
    el.id = XRAY_EXTRA_STYLE_ID;
    el.textContent = XRAY_EXTRA_CSS;
    document.head.appendChild(el);
  }

  var DEFAULT_DENTAL_TEETH = [
    {
      num: '17', shape: 'molar', clinicType: 'rootcanal', bodyType: 'rootcanal',
      isMismatch: false, requiredMode: 'none', smudge: 1.0,
      readLight: 'В каналах видны светлые линии. Проверьте плотность в НЕГАТИВЕ.',
      readNeg: 'НЕГАТИВ: пломбирование обоих корней гуттаперчей полностью совпадает с картой 2019 г.',
      readOverlay: 'НАЛОЖЕНИЕ: контуры каналов зуба 17 совпадают с картой клиники.',
      matchReason: 'СОВПАДЕНИЕ (+1 ОШИБКА): пломбировка каналов зуба 17 одинакова и в карте, и у тела.'
    },
    {
      num: '16', shape: 'molar', clinicType: 'implant', bodyType: 'normal',
      isMismatch: true, requiredMode: 'negative', smudge: 1.0,
      shortDesc: 'Зуб 16: нет импланта',
      desc: 'Зуб 16: в карте Сафонова — титановый имплант с резьбой, у тела родной живой моляр с корнями.',
      readLight: 'В карте виден имплант, а у тела живые корни — подтвердите контраст металла в режиме НЕГАТИВ!',
      readNeg: 'НЕГАТИВ: на снимке карты титановый штифт чёрный от плотности, а у тела — обычные живые корни!',
      readOverlay: 'НАЛОЖЕНИЕ: видны расходящиеся корни — для доказательства отсутствия металла переключитесь в НЕГАТИВ!',
      wrongModeMsg: 'МЕТОДИКА: отсутствие рентгеноконтрастного титана доказывается в режиме 2. НЕГАТИВ!'
    },
    {
      num: '14', shape: 'premolar', clinicType: 'filling', bodyType: 'filling',
      isMismatch: false, requiredMode: 'none', smudge: 0,
      readLight: 'Небольшая старая пломба на жевательной поверхности.',
      readNeg: 'НЕГАТИВ: форма и размер пломбы на зубе 14 совпадают на обоих снимках.',
      readOverlay: 'НАЛОЖЕНИЕ: зуб 14 и старая пломба точно ложатся друг на друга.',
      matchReason: 'СОВПАДЕНИЕ (+1 ОШИБКА): старая пломба на зубе 14 идентична на обоих снимках.'
    },
    {
      num: '12', shape: 'incisor', clinicType: 'normal', bodyType: 'normal',
      isMismatch: false, requiredMode: 'none', smudge: 0,
      readLight: 'Здоровый боковой резец без следов лечения.',
      readNeg: 'НЕГАТИВ: эмаль и корень без металлических включений на обоих снимках.',
      readOverlay: 'НАЛОЖЕНИЕ: полная анатомическая идентичность зуба 12.',
      matchReason: 'СОВПАДЕНИЕ (+1 ОШИБКА): зуб 12 здоров и совпадает на обоих снимках.'
    },
    {
      num: '11', shape: 'incisor', clinicType: 'normal', bodyType: 'normal',
      isMismatch: false, requiredMode: 'none', smudge: 0,
      readLight: 'Центральный резец, пломб и протезов нет.',
      readNeg: 'НЕГАТИВ: плотность дентина и корня идентична.',
      readOverlay: 'НАЛОЖЕНИЕ: контуры центрального резца совпадают.',
      matchReason: 'СОВПАДЕНИЕ (+1 ОШИБКА): центральный резец 11 не имеет расхождений.'
    },
    {
      num: '21', shape: 'incisor', clinicType: 'normal', bodyType: 'normal',
      isMismatch: false, requiredMode: 'none', smudge: 0,
      readLight: 'Центральный резец слева без вмешательств.',
      readNeg: 'НЕГАТИВ: однородная ткань зуба на обоих снимках.',
      readOverlay: 'НАЛОЖЕНИЕ: форма зуба 21 совпадает с картой.',
      matchReason: 'СОВПАДЕНИЕ (+1 ОШИБКА): зуб 21 совпадает с картой клиники.'
    },
    {
      num: '24', shape: 'premolar', clinicType: 'missing', bodyType: 'normal',
      isMismatch: true, requiredMode: 'overlay', smudge: 0,
      shortDesc: 'Зуб 24: зуб на месте',
      desc: 'Зуб 24: по карте удалён в 2019 году (пустая лунка), но у тела стоит целый премоляр.',
      readLight: 'По карте зуб 24 удалён, а у тела он на месте — совместите плёнки в режиме 3. НАЛОЖЕНИЕ!',
      readNeg: 'НЕГАТИВ: виден живой корень зуба 24 — наложите плёнку карты (3. НАЛОЖЕНИЕ), чтобы зафиксировать пустую лунку!',
      readOverlay: 'НАЛОЖЕНИЕ: пустой пунктир удалённого зуба 24 в карте ложится прямо поверх живого зуба тела!',
      wrongModeMsg: 'МЕТОДИКА: наложите плёнку карты на снимок тела в режиме 3. НАЛОЖЕНИЕ и выровняйте сдвиг!'
    },
    {
      num: '26', shape: 'molar', clinicType: 'filling', bodyType: 'filling',
      isMismatch: false, requiredMode: 'none', smudge: 0,
      readLight: 'Пломба на коронковой части моляра.',
      readNeg: 'НЕГАТИВ: рентгеноконтрастная пломба зуба 26 совпадает с картой.',
      readOverlay: 'НАЛОЖЕНИЕ: контуры зуба 26 и пломбы совпадают.',
      matchReason: 'СОВПАДЕНИЕ (+1 ОШИБКА): пломба на зубе 26 присутствует и в карте, и у тела.'
    },
    {
      num: '36', shape: 'molar', clinicType: 'normal', bodyType: 'crown',
      isMismatch: true, requiredMode: 'negative', smudge: 1.0,
      shortDesc: 'Зуб 36: чужая коронка',
      desc: 'Зуб 36: у тела свежая металлокерамическая коронка, которой нет в карте Сафонова.',
      readLight: 'Коронка зуба 36 выглядит ярче остальных — подтвердите металлический колпачок в режиме 2. НЕГАТИВ!',
      readNeg: 'НЕГАТИВ: сплошной чёрный металлический каркас свежей металлокерамической коронки (в карте 2019 — родной зуб)!',
      readOverlay: 'НАЛОЖЕНИЕ: форма отличается — подтвердите рентгеноконтрастный металл коронки в режиме 2. НЕГАТИВ!',
      wrongModeMsg: 'МЕТОДИКА: металлический каркас коронки доказывается в режиме 2. НЕГАТИВ!'
    },
    {
      num: '37', shape: 'molar', clinicType: 'normal', bodyType: 'normal',
      isMismatch: false, requiredMode: 'none', smudge: 0,
      readLight: 'Здоровый крайний моляр без следов протезирования.',
      readNeg: 'НЕГАТИВ: корни и коронка без отличий.',
      readOverlay: 'НАЛОЖЕНИЕ: совпадение по обоим снимкам.',
      matchReason: 'СОВПАДЕНИЕ (+1 ОШИБКА): моляр 37 полностью совпадает с картой.'
    }
  ];

  function resolveDentalScenario(config) {
    var cfg = config || {};
    var caseId = String(window.ACTIVE_CASE_ID || '').toLowerCase();
    var isCase418 = cfg.preset === 'case418' || !caseId || caseId === 'case418';

    return {
      id: isCase418 ? 'case418_act2_dental' : 'generic_dental',
      title: cfg.title || 'СВЕРКА РЕНТГЕНА И ЗУБНОЙ КАРТЫ',
      clinicHeader: isCase418 ? 'КАРТА О. САФОНОВА (КЛИНИКА, 2019)' : 'АРХИВНАЯ ЗУБНАЯ КАРТА',
      bodyHeader: isCase418 ? 'СНИМОК ТЕЛА ИЗ ДОМА (#418-Т)' : 'СНИМОК НЕОПОЗНАННОГО ТЕЛА',
      stampWin: isCase418 ? 'ЛИЧНОСТЬ НЕ ПОДТВЕРЖДЕНА: ЭТО НЕ САФОНОВ' : 'ЛИЧНОСТЬ НЕ СОВПАДАЕТ С КАРТОЙ',
      teeth: Array.isArray(cfg.teeth) && cfg.teeth.length > 0 ? cfg.teeth : DEFAULT_DENTAL_TEETH,
      conclusion: cfg.conclusion || (isCase418
        ? {
            question: 'У тела #418-Т нет титанового импланта (зуб 16), на месте удалённый в 2019 г. зуб 24 и стоит неучтённая коронка (зуб 36). Вывод СМЭ:',
            options: [
              {
                id: 'regrow',
                text: 'Тело принадлежит Олегу Сафонову: зуб 24 мог отрасти заново, а карту клиники заполнили с опечаткой.',
                isCorrect: false,
                reason: 'Противоречие: удалённый коренной зуб не вырастает заново, а титановый имплант не превращается в живой корень.'
              },
              {
                id: 'not_safonov',
                text: 'Погибший в коттедже мужчина — НЕ Олег Сафонов! На месте поджога оставили чужое тело, а настоящий Сафонов скрыт или убит отдельно.',
                isCorrect: true,
                reason: 'Верно: три анатомических несовпадения полностью исключают личность Сафонова.'
              },
              {
                id: 'melted',
                text: 'Огонь расплавил титановый имплант 16 и сплавил соседнюю эмаль в коронку на зубе 36.',
                isCorrect: false,
                reason: 'Противоречие: титан плавится выше 1660°C, и пожар не способен вырастить на его месте родной живой моляр.'
              }
            ]
          }
        : {
            question: 'Выявлены три анатомических и протезных несовпадения между картой и снимком тела. Вывод экспертизы:',
            options: [
              { id: 'match', text: 'Снимки принадлежат одному человеку.', isCorrect: false, reason: 'Противоречие: выявленные несовпадения по импланту и удалённому зубу исключают совпадение.' },
              { id: 'diff', text: 'Личность тела не совпадает с архивной стоматологической картой.', isCorrect: true, reason: 'Верно: идентификация исключена.' },
              { id: 'artifact', text: 'Все отличия — дефект проявки плёнки.', isCorrect: false, reason: 'Противоречие: плёнка очищена и проверена в негативе и наложении.' }
            ]
          })
    };
  }

  function drawToothXray(ctx, cx, gumY, cellW, toothH, shape, type, palette, rootUp) {
    var dir = rootUp ? -1 : 1;
    var crownW = shape === 'molar' ? cellW * 0.78 : shape === 'premolar' ? cellW * 0.64 : cellW * 0.56;
    var crownH = toothH * 0.44;
    var rootH = toothH * 0.56;
    var halfW = crownW / 2;

    ctx.save();
    ctx.translate(cx, gumY);

    if (type === 'missing') {
      ctx.strokeStyle = palette.missingStroke;
      ctx.lineWidth = 1.2;
      ctx.setLineDash([3, 3]);
      ctx.strokeRect(-halfW * 0.8, dir > 0 ? -crownH * 0.65 : -rootH * 0.4, crownW * 0.8, crownH * 0.65);
      ctx.setLineDash([]);
      ctx.fillStyle = palette.missingText;
      ctx.font = '600 8px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('УДАЛ.', 0, dir > 0 ? -crownH * 0.32 : crownH * 0.32);
      ctx.restore();
      return;
    }

    if (type === 'implant') {
      var screwW = crownW * 0.42;
      var screwLen = rootH * 0.92;
      ctx.fillStyle = palette.metal;
      ctx.fillRect(-screwW / 2, dir > 0 ? 0 : -screwLen, screwW, screwLen);
      ctx.strokeStyle = palette.metalDetail;
      ctx.lineWidth = 1.2;
      for (var t = 4; t < screwLen - 2; t += 4.5) {
        var ty = dir * t;
        ctx.beginPath();
        ctx.moveTo(-screwW * 0.68, ty);
        ctx.lineTo(screwW * 0.68, ty + dir * 1.5);
        ctx.stroke();
      }
      ctx.fillStyle = palette.metalBright;
      ctx.fillRect(-halfW * 0.92, dir > 0 ? -crownH : 0, crownW * 0.92, crownH);
      ctx.strokeStyle = palette.metalEdge;
      ctx.lineWidth = 1.1;
      ctx.strokeRect(-halfW * 0.92, dir > 0 ? -crownH : 0, crownW * 0.92, crownH);
      ctx.fillStyle = palette.metalDetail;
      ctx.fillRect(-screwW * 0.62, -1.5, screwW * 1.24, 3);
      ctx.restore();
      return;
    }

    ctx.fillStyle = palette.dentin;
    ctx.strokeStyle = palette.outline;
    ctx.lineWidth = 1;

    if (shape === 'molar') {
      ctx.beginPath();
      ctx.moveTo(-halfW * 0.72, 0);
      ctx.quadraticCurveTo(-halfW * 0.85, dir * rootH * 0.55, -halfW * 0.42, dir * rootH);
      ctx.quadraticCurveTo(-halfW * 0.14, dir * rootH * 0.55, -halfW * 0.05, dir * rootH * 0.18);
      ctx.closePath(); ctx.fill(); ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(halfW * 0.72, 0);
      ctx.quadraticCurveTo(halfW * 0.85, dir * rootH * 0.55, halfW * 0.42, dir * rootH);
      ctx.quadraticCurveTo(halfW * 0.14, dir * rootH * 0.55, halfW * 0.05, dir * rootH * 0.18);
      ctx.closePath(); ctx.fill(); ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(-halfW * 0.68, 0);
      ctx.quadraticCurveTo(-halfW * 0.42, dir * rootH * 0.75, 0, dir * rootH);
      ctx.quadraticCurveTo(halfW * 0.42, dir * rootH * 0.75, halfW * 0.68, 0);
      ctx.closePath(); ctx.fill(); ctx.stroke();
    }

    var cyTop = dir > 0 ? -crownH : 0;
    ctx.fillStyle = type === 'crown' ? palette.metalBright : palette.enamel;
    ctx.strokeStyle = type === 'crown' ? palette.metalEdge : palette.outline;
    ctx.lineWidth = type === 'crown' ? 1.5 : 1.1;

    ctx.beginPath();
    if (shape === 'molar') {
      ctx.moveTo(-halfW, 0);
      ctx.quadraticCurveTo(-halfW * 1.06, -dir * crownH * 0.68, -halfW * 0.68, -dir * crownH);
      ctx.quadraticCurveTo(0, -dir * crownH * 0.84, halfW * 0.68, -dir * crownH);
      ctx.quadraticCurveTo(halfW * 1.06, -dir * crownH * 0.68, halfW, 0);
    } else {
      ctx.moveTo(-halfW, 0);
      ctx.quadraticCurveTo(-halfW * 0.96, -dir * crownH * 0.78, -halfW * 0.48, -dir * crownH);
      ctx.lineTo(halfW * 0.48, -dir * crownH);
      ctx.quadraticCurveTo(halfW * 0.96, -dir * crownH * 0.78, halfW, 0);
    }
    ctx.closePath(); ctx.fill(); ctx.stroke();

    if (type !== 'crown') {
      ctx.fillStyle = palette.pulp;
      ctx.beginPath();
      ctx.ellipse(0, -dir * crownH * 0.34, halfW * 0.28, crownH * 0.24, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    if (type === 'crown') {
      ctx.strokeStyle = palette.metalDetail;
      ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(-halfW * 0.72, -dir * 3); ctx.lineTo(halfW * 0.72, -dir * 3); ctx.stroke();
      ctx.fillStyle = palette.metal;
      ctx.fillRect(-halfW * 0.62, cyTop + (dir > 0 ? 4 : crownH - 9), crownW * 0.62, 5);
    } else if (type === 'filling') {
      ctx.fillStyle = palette.metalBright;
      ctx.beginPath();
      ctx.ellipse(halfW * 0.16, -dir * crownH * 0.72, halfW * 0.42, crownH * 0.24, -0.2, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === 'rootcanal') {
      ctx.strokeStyle = palette.metalBright;
      ctx.lineWidth = 1.5;
      if (shape === 'molar') {
        ctx.beginPath();
        ctx.moveTo(-halfW * 0.22, -dir * crownH * 0.3); ctx.lineTo(-halfW * 0.45, dir * rootH * 0.88);
        ctx.moveTo(halfW * 0.22, -dir * crownH * 0.3); ctx.lineTo(halfW * 0.45, dir * rootH * 0.88);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(0, -dir * crownH * 0.3); ctx.lineTo(0, dir * rootH * 0.88);
        ctx.stroke();
      }
    }

    ctx.restore();
  }


  function initDentalXray(containerEl, config, callbacks) {
    config = config || {};
    injectXrayStyles();

    var timers = createTimerBag();
    var listeners = createListenerBag();
    var triggerWin = createWinTrigger(callbacks);
    var failFired = false;
    function triggerXrayFail(res) {
      if (failFired) return;
      failFired = true;
      if (callbacks && typeof callbacks.onFail === 'function') {
        callbacks.onFail(res || { success: false });
      }
    }

    var scenario = resolveDentalScenario(config);
    var maxErrors = typeof config.maxErrors === 'number' && config.maxErrors > 0 ? config.maxErrors : 4;

    var teeth = scenario.teeth.map(function (t, idx) {
      return {
        num: String(t.num || (11 + idx)),
        shape: t.shape || 'molar',
        clinicType: t.clinicType || 'normal',
        bodyType: t.bodyType || 'normal',
        isMismatch: Boolean(t.isMismatch),
        requiredMode: t.requiredMode || 'none',
        smudge: typeof t.smudge === 'number' ? t.smudge : 0,
        shortDesc: t.shortDesc || ('Зуб ' + (t.num || idx + 1) + ': расхождение'),
        desc: t.desc || ('Выявлено несовпадение по зубу ' + (t.num || idx + 1)),
        readLight: t.readLight || 'Осмотрите зуб в разных режимах негатоскопа.',
        readNeg: t.readNeg || t.readLight || '',
        readOverlay: t.readOverlay || t.readLight || '',
        wrongModeMsg: t.wrongModeMsg || 'Проверьте расхождение в профильном режиме негатоскопа!',
        matchReason: t.matchReason || ('СОВПАДЕНИЕ (+1 ОШИБКА): зуб ' + (t.num || idx + 1) + ' совпадает с картой.'),
        found: false,
        errFlash: 0
      };
    });

    var totalMismatches = 0;
    for (var i = 0; i < teeth.length; i++) {
      if (teeth[i].isMismatch) totalMismatches += 1;
    }
    if (totalMismatches === 0) totalMismatches = 3;

    var shell = createShell(containerEl, {
      title: scenario.title,
      subtitle: '',
      extraClass: 'mg-xray-wrap'
    });

    shell.subEl.style.display = 'none';
    var metaRow = document.createElement('div');
    metaRow.className = 'mg-xr-meta';
    var statFound = document.createElement('span');
    statFound.className = 'mg-xr-stat';
    var statErr = document.createElement('span');
    statErr.className = 'mg-xr-err';
    metaRow.appendChild(statFound);
    metaRow.appendChild(statErr);
    shell.subEl.parentNode.appendChild(metaRow);

    listeners.on(shell.cancelBtn, 'click', function () {
      haptic('light'); sfx('click');
      triggerCancel(callbacks);
    });

    var stage = document.createElement('div');
    stage.className = 'mg-f2-stage mg-xray-stage';
    var canvas = document.createElement('canvas');
    canvas.className = 'mg-f2-canvas';
    stage.appendChild(canvas);
    shell.body.appendChild(stage);

    // Inspector dock (no accidental errors on tap!)
    var inspectorEl = document.createElement('div');
    inspectorEl.className = 'mg-xr-inspector';
    var insInfo = document.createElement('div');
    insInfo.className = 'mg-xr-ins-info';
    var insTitle = document.createElement('div');
    insTitle.className = 'mg-xr-ins-title';
    var insDesc = document.createElement('div');
    insDesc.className = 'mg-xr-ins-desc';
    insInfo.appendChild(insTitle);
    insInfo.appendChild(insDesc);

    var fixBtn = document.createElement('button');
    fixBtn.type = 'button';
    fixBtn.className = 'mg-f2-btn mg-xr-fix-btn';
    fixBtn.textContent = 'ЗАФИКСИРОВАТЬ';
    fixBtn.disabled = true;

    inspectorEl.appendChild(insInfo);
    inspectorEl.appendChild(fixBtn);
    shell.body.appendChild(inspectorEl);

    var panel = document.createElement('div');
    panel.className = 'mg-f2-panel';

    var modesRow = document.createElement('div');
    modesRow.className = 'mg-xray-modes';
    var modeDefs = [
      { id: 'light', label: '1. СВЕТ / ЧИСТКА' },
      { id: 'negative', label: '2. НЕГАТИВ' },
      { id: 'overlay', label: '3. НАЛОЖЕНИЕ' }
    ];
    var modeBtns = {};
    var viewMode = 'light';
    var overlayAlpha = 0.62;
    var filmShiftPx = 22; // misaligned film in overlay mode until centered near 0

    for (i = 0; i < modeDefs.length; i++) {
      (function (md) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'mg-f2-btn-sec';
        btn.textContent = md.label;
        listeners.on(btn, 'click', function () {
          if (phase !== 'scan' || viewMode === md.id) return;
          viewMode = md.id;
          tempFlash = null;
          haptic('light'); sfx('click');
          syncModeUI();
          syncInspector();
        });
        modesRow.appendChild(btn);
        modeBtns[md.id] = btn;
      })(modeDefs[i]);
    }
    panel.appendChild(modesRow);

    // Alignment slider (for Overlay mode film shift)
    var alignWrap = document.createElement('div');
    alignWrap.className = 'mg-f2-slider-wrap';
    var alignRow = document.createElement('div');
    alignRow.className = 'mg-f2-row';
    var alignLbl = document.createElement('span');
    alignLbl.className = 'mg-f2-label';
    alignLbl.textContent = 'СДВИГ ПЛЁНКИ КАРТЫ (НАЛОЖЕНИЕ)';
    var alignVal = document.createElement('span');
    alignVal.className = 'mg-f2-value';
    alignRow.appendChild(alignLbl);
    alignRow.appendChild(alignVal);

    var alignSlider = document.createElement('input');
    alignSlider.type = 'range';
    alignSlider.className = 'mg-f2-slider';
    alignSlider.min = '-30';
    alignSlider.max = '30';
    alignSlider.step = '1';
    alignSlider.value = String(filmShiftPx);
    alignWrap.appendChild(alignRow);
    alignWrap.appendChild(alignSlider);
    panel.appendChild(alignWrap);

    var foundList = document.createElement('div');
    foundList.className = 'mg-xray-found-list';
    foundList.style.gridTemplateColumns = 'repeat(' + Math.min(totalMismatches, 3) + ', 1fr)';
    var pills = [];
    for (i = 0; i < totalMismatches; i++) {
      var pill = document.createElement('div');
      pill.className = 'mg-f2-pill';
      pill.textContent = 'РАСХОЖДЕНИЕ #' + (i + 1);
      foundList.appendChild(pill);
      pills.push(pill);
    }
    panel.appendChild(foundList);
    shell.body.appendChild(panel);

    var canvasMgr = setupResponsiveCanvas(canvas, stage);
    var phase = 'scan'; // 'scan' | 'deduce' | 'fail'
    var selectedIdx = -1;
    var foundCount = 0;
    var errorsCount = 0;
    var globalErrFlash = 0;
    var dragging = false;
    var lastX = 0;
    var lastY = 0;
    var smudgeParticles = [];
    var tempFlash = null;
    var wasAlignedHaptic = false;
    var lastTs = performance.now();

    function isOverlayAligned() {
      return Math.abs(filmShiftPx) <= 4;
    }

    function syncHeaderMeta() {
      statFound.textContent = 'НЕСОВПАДЕНИЯ: ' + foundCount + ' / ' + totalMismatches;
      statErr.textContent = 'ОШИБКИ: ' + errorsCount + ' / ' + maxErrors;
      statErr.classList.toggle('is-warn', errorsCount >= maxErrors - 1);
    }

    function syncModeUI() {
      for (var k in modeBtns) {
        if (Object.prototype.hasOwnProperty.call(modeBtns, k)) {
          modeBtns[k].classList.toggle('is-active', k === viewMode);
        }
      }
      alignWrap.style.display = viewMode === 'overlay' ? 'flex' : 'none';
      if (viewMode === 'overlay') {
        var ok = isOverlayAligned();
        alignVal.textContent = ok ? '0 мм [СОВМЕЩЕНО]' : ((filmShiftPx > 0 ? '+' : '') + filmShiftPx + ' px');
        alignVal.className = 'mg-f2-value' + (ok ? ' is-ok' : '');
      }
    }

    function setTempFlash(title, desc, tone, ms) {
      tempFlash = { title: title, desc: desc, tone: tone || 'err', until: performance.now() + (ms || 1800) };
      syncInspector();
    }

    function syncInspector() {
      var now = performance.now();
      if (tempFlash && now < tempFlash.until) {
        insTitle.textContent = tempFlash.title;
        insTitle.className = 'mg-xr-ins-title ' + (tempFlash.tone === 'ok' ? 'is-ok' : 'is-err');
        insDesc.textContent = tempFlash.desc;
        fixBtn.disabled = selectedIdx === -1 || teeth[selectedIdx].found || phase !== 'scan';
        return;
      }
      tempFlash = null;

      if (selectedIdx === -1) {
        insTitle.className = 'mg-xr-ins-title';
        insTitle.textContent = viewMode === 'light' ? 'СВЕТ / ПРОТИРКА ПЛЁНКИ' : viewMode === 'negative' ? 'НЕГАТИВ (МЕТАЛЛ / ИМПЛАНТЫ)' : 'НАЛОЖЕНИЕ КАРТЫ НА ТЕЛО';
        insDesc.textContent = viewMode === 'light'
          ? 'Сотрите пальцем тёмные пятна копоти на нижнем снимке и нажимайте на зубы для сверки.'
          : viewMode === 'overlay' && !isOverlayAligned()
          ? 'Выровняйте сдвиг янтарной плёнки карты до 0 мм, затем выберите зуб с расхождением.'
          : 'Тапните по зубу на снимке тела и нажмите «ЗАФИКСИРОВАТЬ» на расхождении.';
        fixBtn.disabled = true;
        return;
      }

      var th = teeth[selectedIdx];
      if (th.found) {
        insTitle.className = 'mg-xr-ins-title is-ok';
        insTitle.textContent = 'ЗАФИКСИРОВАНО // ЗУБ ' + th.num;
        insDesc.textContent = th.desc;
        fixBtn.disabled = true;
        return;
      }
      if (th.smudge > 0.02) {
        insTitle.className = 'mg-xr-ins-title';
        insTitle.textContent = 'ЗАСВЕТ / КОПОТЬ // ЗУБ ' + th.num;
        insDesc.textContent = viewMode === 'light'
          ? 'Потрите пальцем по зубу ' + th.num + ' на нижнем снимке, чтобы очистить плёнку.'
          : 'Переключитесь в 1. СВЕТ / ЧИСТКА, чтобы протереть пятно на плёнке.';
        fixBtn.disabled = true;
        return;
      }

      insTitle.className = 'mg-xr-ins-title';
      insTitle.textContent = 'ЗУБ ' + th.num + ' // ' + (viewMode === 'negative' ? 'НЕГАТИВ' : viewMode === 'overlay' ? 'НАЛОЖЕНИЕ' : 'СВЕТ');
      insDesc.textContent = viewMode === 'negative' ? th.readNeg : viewMode === 'overlay' ? th.readOverlay : th.readLight;
      fixBtn.disabled = false;
    }

    function showFailScreen(reason, msg) {
      phase = 'fail';
      stage.style.display = 'none';
      inspectorEl.style.display = 'none';
      panel.style.display = 'none';
      var box = document.createElement('div');
      box.className = 'mg-xr-stamp-box';
      var st = document.createElement('div');
      st.className = 'mg-xr-stamp';
      st.textContent = 'АКТ СМЭ ОТКЛОНЁН';
      var txt = document.createElement('div');
      txt.className = 'mg-xr-dq';
      txt.textContent = msg || 'Превышен лимит ошибок при сверке рентгена.';
      box.appendChild(st);
      box.appendChild(txt);
      shell.body.appendChild(box);
      timers.setTimeout(function () {
        triggerXrayFail({ minigame: 'dental_xray', scenarioId: scenario.id, reason: reason, errors: errorsCount });
      }, 950);
    }

    function openDeductionPhase() {
      phase = 'deduce';
      stage.style.display = 'none';
      inspectorEl.style.display = 'none';
      panel.style.display = 'none';

      var card = document.createElement('div');
      card.className = 'mg-xr-deduce';
      var kicker = document.createElement('div');
      kicker.className = 'mg-xr-dkicker';
      kicker.textContent = 'ФАЗА 3 // АКТ ОПОЗНАНИЯ СМЭ';
      card.appendChild(kicker);

      var facts = document.createElement('div');
      facts.className = 'mg-xr-dfacts';
      for (var k = 0; k < teeth.length; k++) {
        if (teeth[k].isMismatch) {
          var line = document.createElement('div');
          line.textContent = '• ' + teeth[k].desc;
          facts.appendChild(line);
        }
      }
      card.appendChild(facts);

      var q = document.createElement('div');
      q.className = 'mg-xr-dq';
      q.textContent = scenario.conclusion.question;
      card.appendChild(q);

      var optsWrap = document.createElement('div');
      optsWrap.className = 'mg-xr-dopts';
      var fb = document.createElement('div');
      fb.className = 'mg-xr-dfb';

      var settled = false;
      var opts = scenario.conclusion.options || [];
      for (var oi = 0; oi < opts.length; oi++) {
        (function (opt) {
          var ob = document.createElement('button');
          ob.type = 'button';
          ob.className = 'mg-xr-dopt';
          ob.textContent = opt.text;
          listeners.on(ob, 'click', function () {
            if (settled || phase !== 'deduce') return;
            if (opt.isCorrect) {
              settled = true;
              ob.classList.add('is-correct');
              fb.className = 'mg-xr-dfb is-ok';
              fb.textContent = opt.reason;
              haptic('success'); sfx('stamp');
              timers.setTimeout(function () {
                card.innerHTML = '';
                var box = document.createElement('div');
                box.className = 'mg-xr-stamp-box';
                var st = document.createElement('div');
                st.className = 'mg-xr-stamp is-ok';
                st.textContent = scenario.stampWin;
                var btnDone = document.createElement('button');
                btnDone.type = 'button';
                btnDone.className = 'mg-f2-btn is-ready';
                btnDone.textContent = 'ПРИОБЩИТЬ К ДЕЛУ';
                listeners.on(btnDone, 'click', function () {
                  haptic('success'); sfx('success');
                  triggerWin({
                    minigame: 'dental_xray',
                    scenarioId: scenario.id,
                    errors: errorsCount,
                    deduced: opt.id,
                    mismatches: teeth.filter(function (t) { return t.isMismatch; }).map(function (t) { return t.num; })
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
              fb.className = 'mg-xr-dfb';
              fb.textContent = opt.reason;
              haptic('error'); sfx('alert');
              flashShake(card);
              if (errorsCount >= maxErrors) {
                settled = true;
                timers.setTimeout(function () {
                  showFailScreen('wrong_deduction', 'Лимит ошибок исчерпан — акт опознания СМЭ отклонён.');
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

    function triggerXrayError(title, desc, toothObj) {
      errorsCount += 1;
      globalErrFlash = 0.8;
      if (toothObj) toothObj.errFlash = 1.0;
      syncHeaderMeta();
      haptic('error'); sfx('alert');
      flashShake(stage);
      if (errorsCount >= maxErrors) {
        timers.setTimeout(function () { showFailScreen('too_many_errors', desc); }, 520);
        return;
      }
      setTempFlash(title, desc, 'err', 1900);
    }

    listeners.on(alignSlider, 'input', function () {
      if (phase !== 'scan') return;
      filmShiftPx = parseInt(alignSlider.value, 10) || 0;
      var ok = isOverlayAligned();
      if (ok && !wasAlignedHaptic) { haptic('light'); sfx('click'); }
      wasAlignedHaptic = ok;
      syncModeUI();
      syncInspector();
    });

    listeners.on(fixBtn, 'click', function () {
      if (phase !== 'scan' || selectedIdx === -1) return;
      var th = teeth[selectedIdx];
      if (th.found || th.smudge > 0.02) return;

      if (!th.isMismatch) {
        triggerXrayError('ЛОЖНОЕ РАСХОЖДЕНИЕ (+1)', th.matchReason, th);
        return;
      }
      if (th.requiredMode === 'negative' && viewMode !== 'negative') {
        triggerXrayError('НАРУШЕНА МЕТОДИКА (+1)', th.wrongModeMsg, th);
        return;
      }
      if (th.requiredMode === 'overlay' && (viewMode !== 'overlay' || !isOverlayAligned())) {
        triggerXrayError(
          'НАРУШЕНА МЕТОДИКА (+1)',
          viewMode !== 'overlay' ? th.wrongModeMsg : 'Сначала выровняйте сдвиг плёнки карты до 0 мм!',
          th
        );
        return;
      }

      th.found = true;
      foundCount += 1;
      haptic('success'); sfx('stamp');
      if (pills[foundCount - 1]) {
        pills[foundCount - 1].classList.add('is-mismatch');
        pills[foundCount - 1].textContent = th.shortDesc;
      }
      syncHeaderMeta();
      setTempFlash('РАСХОЖДЕНИЕ ЗАФИКСИРОВАНО', th.desc, 'ok', 1500);

      if (foundCount >= totalMismatches) {
        timers.setTimeout(function () {
          if (phase === 'scan') openDeductionPhase();
        }, 720);
      }
    });

    function getToothRects(w, h) {
      var padX = 14;
      var cellW = (w - padX * 2) / teeth.length;
      var rects = [];
      for (var k = 0; k < teeth.length; k++) {
        rects.push({
          index: k,
          x: padX + cellW * k,
          y: viewMode === 'overlay' ? h * 0.18 : h * 0.48,
          w: cellW,
          h: viewMode === 'overlay' ? h * 0.68 : h * 0.48,
          cx: padX + cellW * (k + 0.5),
          cy: viewMode === 'overlay' ? h * 0.54 : h * 0.74
        });
      }
      return rects;
    }

    function pickToothAt(px, py, w, h) {
      var boxes = getToothRects(w, h);
      for (var k = 0; k < boxes.length; k++) {
        var b = boxes[k];
        if (px >= b.x && px <= b.x + b.w && py >= b.y && py <= b.y + b.h) return k;
      }
      return -1;
    }

    function scrubSmudgeAt(px, py, distPx, w, h) {
      if (viewMode !== 'light') return;
      var boxes = getToothRects(w, h);
      for (var k = 0; k < boxes.length; k++) {
        var th = teeth[k];
        if (th.smudge <= 0) continue;
        if (Math.hypot(px - boxes[k].cx, py - boxes[k].cy) <= boxes[k].w * 0.95) {
          th.smudge = Math.max(0, th.smudge - Math.max(0.14, distPx * 0.015));
          for (var p = 0; p < 2; p++) {
            smudgeParticles.push({
              x: boxes[k].cx + (Math.random() - 0.5) * 14,
              y: boxes[k].cy + (Math.random() - 0.5) * 14,
              vx: (Math.random() - 0.5) * 44,
              vy: (Math.random() - 0.3) * 32 + 12,
              r: 1.5 + Math.random() * 2,
              alpha: 0.85
            });
          }
          if (th.smudge <= 0.14) {
            th.smudge = 0;
            haptic('medium'); sfx('paper');
            setTempFlash('ПЛЁНКА ОЧИЩЕНА', 'Участок зуба ' + th.num + ' чист — проверьте его в НЕГАТИВЕ или НАЛОЖЕНИИ.', 'ok', 1450);
          }
        }
      }
    }

    listeners.on(canvas, 'pointerdown', function (ev) {
      if (phase !== 'scan') return;
      dragging = true;
      try { canvas.setPointerCapture(ev.pointerId); } catch (e) {}
      var rect = canvas.getBoundingClientRect();
      var x = ev.clientX - rect.left;
      var y = ev.clientY - rect.top;
      lastX = x; lastY = y;

      scrubSmudgeAt(x, y, 10, rect.width, rect.height);
      var idx = pickToothAt(x, y, rect.width, rect.height);
      if (idx !== -1) {
        selectedIdx = idx;
        tempFlash = null;
        haptic('light'); sfx('click');
        syncInspector();
      }
    });

    listeners.on(canvas, 'pointermove', function (ev) {
      if (!dragging || phase !== 'scan') return;
      var rect = canvas.getBoundingClientRect();
      var x = ev.clientX - rect.left;
      var y = ev.clientY - rect.top;
      var dist = Math.hypot(x - lastX, y - lastY);
      lastX = x; lastY = y;
      scrubSmudgeAt(x, y, dist, rect.width, rect.height);
    });
    listeners.on(canvas, 'pointerup', function () { dragging = false; });
    listeners.on(canvas, 'pointercancel', function () { dragging = false; });

    function getPalettes(isNeg) {
      if (isNeg) {
        return {
          bgTop: '#cbd5e1', bgBot: '#94a3b8', bone: 'rgba(100, 116, 139, 0.34)', grid: 'rgba(15, 23, 42, 0.12)',
          label: '#0f172a', subLabel: '#1e293b',
          tooth: {
            enamel: 'rgba(30, 41, 59, 0.85)', dentin: 'rgba(51, 65, 85, 0.65)', pulp: 'rgba(203, 213, 225, 0.55)',
            outline: 'rgba(15, 23, 42, 0.92)', metal: '#020617', metalBright: '#090d16',
            metalDetail: '#64748b', metalEdge: '#000000', missingStroke: 'rgba(15, 23, 42, 0.48)', missingText: 'rgba(15, 23, 42, 0.72)'
          }
        };
      }
      return {
        bgTop: '#06111e', bgBot: '#0a1e33', bone: 'rgba(56, 130, 196, 0.15)', grid: 'rgba(125, 211, 252, 0.08)',
        label: '#bae6fd', subLabel: '#7dd3fc',
        tooth: {
          enamel: 'rgba(186, 230, 253, 0.62)', dentin: 'rgba(125, 211, 252, 0.34)', pulp: 'rgba(7, 22, 40, 0.72)',
          outline: 'rgba(224, 242, 254, 0.82)', metal: '#e0f2fe', metalBright: '#ffffff',
          metalDetail: '#0c4a6e', metalEdge: '#7dd3fc', missingStroke: 'rgba(125, 211, 252, 0.35)', missingText: 'rgba(125, 211, 252, 0.65)'
        },
        overlayClinic: {
          enamel: 'rgba(245, 158, 11, 0.58)', dentin: 'rgba(201, 138, 46, 0.36)', pulp: 'rgba(30, 18, 5, 0.45)',
          outline: 'rgba(253, 224, 71, 0.9)', metal: '#fde047', metalBright: '#fef08a',
          metalDetail: '#78350f', metalEdge: '#f59e0b', missingStroke: 'rgba(251, 191, 36, 0.85)', missingText: 'rgba(253, 224, 71, 0.95)'
        }
      };
    }

    syncHeaderMeta();
    syncModeUI();
    syncInspector();

    function render(now) {
      var dt = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;
      if (globalErrFlash > 0) globalErrFlash = Math.max(0, globalErrFlash - dt * 2.6);
      for (var tIdx = 0; tIdx < teeth.length; tIdx++) {
        if (teeth[tIdx].errFlash > 0) teeth[tIdx].errFlash = Math.max(0, teeth[tIdx].errFlash - dt * 2.2);
      }

      if (phase === 'scan') {
        var metrics = canvasMgr.getMetrics();
        var w = metrics.width, h = metrics.height, dpr = metrics.dpr;
        var ctx = canvas.getContext('2d');
        var isNeg = viewMode === 'negative';
        var pal = getPalettes(isNeg);

        ctx.save();
        ctx.scale(dpr, dpr);

        var bgGrad = ctx.createRadialGradient(w / 2, h / 2, 20, w / 2, h / 2, Math.max(w, h) * 0.72);
        bgGrad.addColorStop(0, pal.bgBot); bgGrad.addColorStop(1, pal.bgTop);
        ctx.fillStyle = bgGrad; ctx.fillRect(0, 0, w, h);

        var padX = 14, innerW = w - padX * 2, cellW = innerW / teeth.length;
        ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
        for (var k = 0; k <= teeth.length; k++) {
          var gx = padX + k * cellW;
          ctx.beginPath(); ctx.moveTo(gx, 22); ctx.lineTo(gx, h - 12); ctx.stroke();
        }

        if (viewMode === 'overlay') {
          ctx.font = '600 9.5px "IBM Plex Mono", monospace';
          ctx.textAlign = 'left'; ctx.textBaseline = 'top'; ctx.fillStyle = '#bae6fd';
          ctx.fillText('НАЛОЖЕНИЕ: ТЕЛО (СИНИЙ) + КАРТА (ЯНТАРЬ)', 14, 7);

          var gumY = h * 0.55, toothH = Math.min(h * 0.44, 118);
          ctx.fillStyle = pal.bone;
          ctx.fillRect(padX, gumY - toothH * 0.62, innerW, toothH * 0.66);

          for (k = 0; k < teeth.length; k++) {
            var th = teeth[k], cx = padX + cellW * (k + 0.5);
            if (selectedIdx === k) {
              ctx.fillStyle = 'rgba(245, 158, 11, 0.14)';
              ctx.fillRect(padX + k * cellW + 1, h * 0.19, cellW - 2, h * 0.66);
            }
            drawToothXray(ctx, cx, gumY, cellW, toothH, th.shape, th.bodyType, pal.tooth, true);
            ctx.save();
            ctx.globalAlpha = overlayAlpha;
            drawToothXray(ctx, cx + filmShiftPx, gumY, cellW, toothH, th.shape, th.clinicType, pal.overlayClinic, true);
            ctx.restore();

            ctx.font = '600 10px "IBM Plex Mono", monospace';
            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
            ctx.fillStyle = th.found ? '#f87171' : selectedIdx === k ? '#fde68a' : '#93c5fd';
            ctx.fillText(th.num, cx, gumY + toothH * 0.48);

            if (th.smudge > 0.02) {
              ctx.fillStyle = 'rgba(12, 10, 10, ' + (th.smudge * 0.85).toFixed(2) + ')';
              ctx.beginPath(); ctx.ellipse(cx, gumY - 12, cellW * 0.52, toothH * 0.42, 0, 0, Math.PI * 2); ctx.fill();
            }
            if (th.found) {
              ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2;
              ctx.strokeRect(padX + k * cellW + 2, h * 0.21, cellW - 4, h * 0.62);
            } else if (selectedIdx === k) {
              ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 1.6;
              ctx.strokeRect(padX + k * cellW + 2, h * 0.21, cellW - 4, h * 0.62);
            }
          }
        } else {
          var midY = h * 0.50;
          ctx.strokeStyle = isNeg ? 'rgba(15, 23, 42, 0.42)' : 'rgba(125, 211, 252, 0.35)';
          ctx.lineWidth = 1.4;
          ctx.beginPath(); ctx.moveTo(10, midY); ctx.lineTo(w - 10, midY); ctx.stroke();

          ctx.font = '600 9.5px "IBM Plex Mono", monospace';
          ctx.textAlign = 'left'; ctx.textBaseline = 'top'; ctx.fillStyle = pal.label;
          ctx.fillText(scenario.clinicHeader, 14, 6);
          ctx.fillStyle = isNeg ? '#991b1b' : '#f59e0b';
          ctx.fillText(scenario.bodyHeader + ' — ВЫБЕРИТЕ ЗУБ', 14, midY + 5);

          var topGumY = h * 0.31, botGumY = h * 0.77, splitToothH = Math.min(h * 0.26, 68);
          ctx.fillStyle = pal.bone;
          ctx.fillRect(padX, topGumY - splitToothH * 0.58, innerW, splitToothH * 0.60);
          ctx.fillRect(padX, botGumY - splitToothH * 0.58, innerW, splitToothH * 0.60);

          for (k = 0; k < teeth.length; k++) {
            var tooth = teeth[k], tcx = padX + cellW * (k + 0.5);
            if (selectedIdx === k) {
              ctx.fillStyle = isNeg ? 'rgba(15, 23, 42, 0.12)' : 'rgba(245, 158, 11, 0.12)';
              ctx.fillRect(padX + k * cellW + 1, 22, cellW - 2, h - 30);
            }
            drawToothXray(ctx, tcx, topGumY, cellW, splitToothH, tooth.shape, tooth.clinicType, pal.tooth, true);
            ctx.font = '600 9px "IBM Plex Mono", monospace';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillStyle = tooth.found ? '#ef4444' : selectedIdx === k ? '#f59e0b' : pal.subLabel;
            ctx.fillText(tooth.num, tcx, midY - 7);
            drawToothXray(ctx, tcx, botGumY, cellW, splitToothH, tooth.shape, tooth.bodyType, pal.tooth, true);

            if (tooth.smudge > 0.02) {
              ctx.save();
              ctx.globalAlpha = clamp(tooth.smudge, 0.18, 0.92);
              ctx.fillStyle = '#181412';
              ctx.beginPath(); ctx.ellipse(tcx, botGumY - 6, cellW * 0.54, splitToothH * 0.58, 0.1, 0, Math.PI * 2); ctx.fill();
              ctx.strokeStyle = 'rgba(245, 158, 11, 0.7)'; ctx.lineWidth = 1; ctx.setLineDash([2, 2]); ctx.stroke(); ctx.setLineDash([]);
              ctx.restore();
            }

            if (tooth.found) {
              ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2;
              ctx.strokeRect(padX + k * cellW + 2, midY + 19, cellW - 4, h - midY - 26);
            } else if (selectedIdx === k) {
              ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 1.5;
              ctx.strokeRect(padX + k * cellW + 2, midY + 19, cellW - 4, h - midY - 26);
            } else if (tooth.errFlash > 0.02) {
              ctx.fillStyle = 'rgba(220, 38, 38, ' + (tooth.errFlash * 0.35).toFixed(2) + ')';
              ctx.fillRect(padX + k * cellW + 2, midY + 19, cellW - 4, h - midY - 26);
            }
          }
        }

        // Flying smudge wipe particles
        for (var p = smudgeParticles.length - 1; p >= 0; p--) {
          var sp = smudgeParticles[p];
          sp.x += sp.vx * dt; sp.y += sp.vy * dt; sp.alpha -= dt * 1.9;
          if (sp.alpha <= 0) { smudgeParticles.splice(p, 1); continue; }
          ctx.fillStyle = 'rgba(42, 36, 32, ' + sp.alpha.toFixed(2) + ')';
          ctx.beginPath(); ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2); ctx.fill();
        }

        if (globalErrFlash > 0.01) {
          ctx.fillStyle = 'rgba(220, 38, 38, ' + (globalErrFlash * 0.28).toFixed(3) + ')';
          ctx.fillRect(0, 0, w, h);
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
  // MINIGAME 2: doc_forgery (3-phase 2.2x loupe, clearing, decoys & Phase 3)
  // ============================================================================

  var DOC_EXTRA_STYLE_ID = 'minigames-f2-doc-extra';

  var DOC_EXTRA_CSS = [
    '.mg-df-meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-top: 3px; }',
    '.mg-df-stat { font-family: "IBM Plex Mono", monospace; font-size: 10.5px; font-weight: 600; color: var(--case-accent, #c98a2e); }',
    '.mg-df-err { font-family: "IBM Plex Mono", monospace; font-size: 10.5px; font-weight: 600; color: #9ca3af; }',
    '.mg-df-err.is-warn { color: #f87171; }',
    '.mg-df-inspector { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 8px 10px; background: #12151d; border: 1px solid #2b3140; border-radius: 7px; }',
    '.mg-df-ins-info { flex: 1; min-width: 0; }',
    '.mg-df-ins-title { font-family: "IBM Plex Mono", monospace; font-size: 9.8px; font-weight: 700; color: var(--case-accent, #f59e0b); text-transform: uppercase; margin-bottom: 2px; }',
    '.mg-df-ins-title.is-ok { color: #4ade80; }',
    '.mg-df-ins-title.is-err { color: #f87171; }',
    '.mg-df-ins-title.is-uv { color: #818cf8; }',
    '.mg-df-ins-desc { font-size: 11.2px; line-height: 1.34; color: #d6d3cb; }',
    '.mg-df-fix-btn { flex-shrink: 0; width: auto; padding: 8px 11px; font-size: 12px; }',
    '.mg-df-deduce { display: flex; flex-direction: column; gap: 9px; padding: 12px; background: #14171f; border: 1px solid #353b4a; border-top: 3px solid var(--case-accent, #c98a2e); border-radius: 8px; }',
    '.mg-df-dkicker { font-family: "IBM Plex Mono", monospace; font-size: 10px; font-weight: 700; color: var(--case-accent, #c98a2e); text-transform: uppercase; }',
    '.mg-df-dfacts { padding: 8px 9px; background: #0d1016; border: 1px solid #262b36; border-radius: 6px; font-family: "IBM Plex Mono", monospace; font-size: 10px; line-height: 1.4; color: #c2cad8; display: flex; flex-direction: column; gap: 3px; }',
    '.mg-df-dq { font-size: 12.8px; line-height: 1.4; color: #f3efe6; font-weight: 500; }',
    '.mg-df-dopts { display: flex; flex-direction: column; gap: 6px; }',
    '.mg-df-dopt { width: 100%; text-align: left; padding: 9px 10px; background: #1b202b; border: 1px solid #353d4e; border-radius: 6px; color: #e4e0d8; font-size: 12px; line-height: 1.36; cursor: pointer; }',
    '.mg-df-dopt.is-wrong { border-color: #ef4444; background: rgba(153, 27, 27, 0.25); color: #fecaca; }',
    '.mg-df-dopt.is-correct { border-color: #22c55e; background: rgba(34, 197, 94, 0.2); color: #bbf7d0; }',
    '.mg-df-dfb { font-family: "IBM Plex Mono", monospace; font-size: 10.5px; line-height: 1.38; min-height: 16px; color: #fca5a5; }',
    '.mg-df-dfb.is-ok { color: #86efac; }',
    '.mg-df-stamp-box { padding: 24px 14px; background: #0d1016; border: 1px solid #2a2e38; border-radius: 8px; display: flex; flex-direction: column; align-items: center; gap: 14px; text-align: center; }',
    '.mg-df-stamp { padding: 8px 14px; font-family: "Oswald", sans-serif; font-size: 18px; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase; color: #ef4444; border: 3px double #ef4444; border-radius: 4px; transform: rotate(-5deg); line-height: 1.25; }',
    '.mg-df-stamp.is-ok { color: #4ade80; border-color: #22c55e; background: rgba(34, 197, 94, 0.12); }'
  ].join('\n');

  function injectDocStyles() {
    if (document.getElementById(DOC_EXTRA_STYLE_ID)) return;
    var el = document.createElement('style');
    el.id = DOC_EXTRA_STYLE_ID;
    el.textContent = DOC_EXTRA_CSS;
    document.head.appendChild(el);
  }

  var DEFAULT_DOC_SPOTS = [
    {
      id: 'date_etch', isEvidence: true, requiredLight: 'uv', cover: 1.0, coverLabel: 'Стикер реестра',
      x: 0.27, y: 0.26, radius: 0.10,
      shortLabel: 'УФ: Травление даты',
      label: 'Химическое травление даты (09.10 → 14.10)',
      readings: {
        white: 'В графе даты «14.10.2024» бумага чуть матовая. Проверьте на химическое травление в УФ 365 нм!',
        oblique: 'КОСОЙ: волокна бумаги слегка взъерошены — состав травления подтверждается в УФ 365 нм.',
        uv: 'УФ 365 нм: яркое голубое пятно кислоты/хлора и проступающая старая дата «09.10.2024»!'
      },
      wrongModeMsg: 'МЕТОДИКА: химическое травление бумаги доказывается в режиме 3. УФ 365 нм!'
    },
    {
      id: 'sig_indent', isEvidence: true, requiredLight: 'oblique', cover: 1.0, coverLabel: 'Налёт пыли / калька',
      x: 0.72, y: 0.74, radius: 0.105,
      shortLabel: 'Косой: Обводка подписи',
      label: 'Продавленный след сухой обводки подписи',
      readings: {
        white: 'Синяя шариковая подпись Сафонова выглядит правдоподобно. Проверьте рельеф нажима в КОСОМ СВЕТЕ!',
        oblique: 'КОСОЙ СВЕТ: чёткая двойная продавленная борозда стилуса и пыль копирки рядом с чернилами!',
        uv: 'УФ 365 нм: обычные шариковые чернила не флуоресцируют — рельеф обводки виден в КОСОМ СВЕТЕ!'
      },
      wrongModeMsg: 'МЕТОДИКА: продавленная борозда обводки выявляется в режиме 2. КОСОЙ СВЕТ!'
    },
    {
      id: 'seal_micro', isEvidence: true, requiredLight: 'white', cover: 0, coverLabel: '',
      x: 0.30, y: 0.74, radius: 0.105,
      shortLabel: 'Белый: Брак печати',
      label: 'Струйный растр печати и чужой шрифт реестра',
      readings: {
        white: 'БЕЛЫЙ 2.2×: вокруг ободка печати точки струйного принтера, внутри «КОПИЯ #00», шрифт реестра чужой!',
        oblique: 'КОСОЙ: краска плоская, рельефа мокрого клише нет — растр и микротекст чётче в БЕЛОМ СВЕТЕ 2.2×.',
        uv: 'УФ 365 нм: печать тёмная — подмену шрифта и струйный растр фиксируйте в БЕЛОМ СВЕТЕ 2.2×!'
      },
      wrongModeMsg: 'МЕТОДИКА: подмену шрифта и струйный растр микротекста фиксируйте в 1. БЕЛОМ СВЕТЕ!'
    },
    {
      id: 'decoy_fold', isEvidence: false, requiredLight: 'none', cover: 0, coverLabel: '',
      x: 0.54, y: 0.45, radius: 0.09,
      shortLabel: '', label: 'Поперечный сгиб листа',
      readings: {
        white: 'Обычная линия сгиба посередине нотариального бланка.',
        oblique: 'КОСОЙ: ровная складка от хранения бумаги сложенной пополам в папке.',
        uv: 'УФ 365 нм: защитные волокна бланка целые, травления на сгибе нет.'
      },
      falseReason: 'ЛОЖНЫЙ СЛЕД: обычный бытовой сгиб листа от хранения в папке — не признак подделки.'
    },
    {
      id: 'decoy_coffee', isEvidence: false, requiredLight: 'none', cover: 0, coverLabel: '',
      x: 0.82, y: 0.28, radius: 0.09,
      shortLabel: '', label: 'Желтоватое пятно на полях',
      readings: {
        white: 'Бледный бурый развод у правого края бланка.',
        oblique: 'КОСОЙ: поверхность бумаги гладкая, механического соскабливания нет.',
        uv: 'УФ 365 нм: тусклое пятно бытового кофе/чая без свечения хлора и кислот.'
      },
      falseReason: 'ЛОЖНЫЙ СЛЕД: бытовое пятно кофе на полях — в УФ нет реакции на химикаты.'
    },
    {
      id: 'decoy_header', isEvidence: false, requiredLight: 'none', cover: 0, coverLabel: '',
      x: 0.52, y: 0.14, radius: 0.09,
      shortLabel: '', label: 'Типографская шапка бланка',
      readings: {
        white: 'Серия 77 АГ — чёткая офсетная типографская печать государственного бланка.',
        oblique: 'КОСОЙ: гильошная рамка заводского исполнения без правок.',
        uv: 'УФ 365 нм: подлинные люминесцентные защитные волокна бумаги присутствуют.'
      },
      falseReason: 'ЛОЖНЫЙ СЛЕД: сам бланк серии 77 АГ подлинный — подделаны дата, подпись и печать.'
    }
  ];

  var DEFAULT_LOCK_SPOTS = [
    {
      id: 'tension_scratch', isEvidence: true, requiredLight: 'oblique', cover: 1.0, coverLabel: 'Мазут и грязь у скважины',
      x: 0.24, y: 0.65, radius: 0.10,
      shortLabel: 'Косой: Натяжитель',
      label: 'Свежие поперечные царапины от натяжителя',
      readings: {
        white: 'В нижней части скважины заметны мелкие потёртости. Проверьте глубину и блеск в КОСОМ СВЕТЕ!',
        oblique: 'КОСОЙ СВЕТ: свежие яркие поперечные задиры латуни с резкой тенью от стального натяжителя!',
        uv: 'УФ 365 нм: металл не светится — рельефные задиры натяжителя фиксируйте в КОСОМ СВЕТЕ!'
      },
      wrongModeMsg: 'МЕТОДИКА: свежие задиры от натяжителя доказываются в режиме 2. КОСОЙ СВЕТ!'
    },
    {
      id: 'pin3_burr', isEvidence: true, requiredLight: 'oblique', cover: 1.0, coverLabel: 'Слой старой смазки/стружки',
      x: 0.65, y: 0.45, radius: 0.10,
      shortLabel: 'Косой: Заусенец пина #3',
      label: 'Свежий заусенец на 3-м пине от отмычки',
      readings: {
        white: 'На 3-м пине у линии разъёма неровная кромка. Высветите микрорельеф в КОСОМ СВЕТЕ!',
        oblique: 'КОСОЙ СВЕТ: острый вывернутый заусенец и диагональные риски прочёсывающей отмычки на пине #3!',
        uv: 'УФ 365 нм: металлический заусенец не флуоресцирует — переключитесь в КОСОЙ СВЕТ!'
      },
      wrongModeMsg: 'МЕТОДИКА: заусенец на 3-м пине от отмычки фиксируется в режиме 2. КОСОЙ СВЕТ!'
    },
    {
      id: 'graphite_uv', isEvidence: true, requiredLight: 'uv', cover: 0, coverLabel: '',
      x: 0.24, y: 0.29, radius: 0.10,
      shortLabel: 'УФ: Графит. смазка',
      label: 'Следы чужой графитовой смазки на торце',
      readings: {
        white: 'Едва заметный тёмный мазок на верхнем торце личинки. Проверьте состав в УФ 365 нм!',
        oblique: 'КОСОЙ: царапин на торце нет — для опознания смазки включите УФ 365 нм!',
        uv: 'УФ 365 нм: яркая сине-голубая флуоресценция синтетической графитовой смазки взломщика!'
      },
      wrongModeMsg: 'МЕТОДИКА: флуоресцентная графитовая смазка доказывается в режиме 3. УФ 365 нм!'
    },
    {
      id: 'decoy_keywear', isEvidence: false, requiredLight: 'none', cover: 0, coverLabel: '',
      x: 0.24, y: 0.46, radius: 0.085,
      shortLabel: '', label: 'Выработка у входа ключа',
      readings: {
        white: 'Заполированный до блеска вход в замочную скважину.',
        oblique: 'КОСОЙ: старые сглаженные продольные дорожки от многолетнего входа родного ключа.',
        uv: 'УФ 365 нм: посторонних смазок в этой зоне нет.'
      },
      falseReason: 'ЛОЖНЫЙ СЛЕД: старая гладкая выработка от родного ключа Белова — не след отмычки.'
    },
    {
      id: 'decoy_pin1', isEvidence: false, requiredLight: 'none', cover: 0, coverLabel: '',
      x: 0.54, y: 0.46, radius: 0.085,
      shortLabel: '', label: 'Первый пин (штатный износ)',
      readings: {
        white: 'Первый кодовый пин на линии разъёма.',
        oblique: 'КОСОЙ: равномерный естественный износ кончика от обычного ключа, заусенцев нет.',
        uv: 'УФ 365 нм: посторонних следов не выявлено.'
      },
      falseReason: 'ЛОЖНЫЙ СЛЕД: естественный износ 1-го пина без свежих задиров отмычки.'
    },
    {
      id: 'decoy_rust', isEvidence: false, requiredLight: 'none', cover: 0, coverLabel: '',
      x: 0.11, y: 0.56, radius: 0.085,
      shortLabel: '', label: 'Коррозия стального кольца',
      readings: {
        white: 'Бурое пятно ржавчины на внешнем корпусе цилиндра.',
        oblique: 'КОСОЙ: рыхлый старый окисел от влаги на уличных воротах гаража.',
        uv: 'УФ 365 нм: свечения смазки или реагентов нет.'
      },
      falseReason: 'ЛОЖНЫЙ СЛЕД: обычная атмосферная ржавчина на стальном корпусе замка.'
    }
  ];

  function resolveDocScenario(config) {
    var cfg = config || {};
    var mode = cfg.mode === 'lock' ? 'lock' : 'doc';
    var caseId = String(window.ACTIVE_CASE_ID || '').toLowerCase();
    var isCase418 = !caseId || caseId === 'case418';

    if (mode === 'lock') {
      return {
        id: isCase418 ? 'case418_act3_lock' : 'generic_lock',
        mode: 'lock',
        title: cfg.title || 'ТРАСОЛОГИЯ ЗАМКА ГАРАЖА',
        stampWin: 'ВСКРЫТИЕ ОТМЫЧКОЙ ДОКАЗАНО',
        spots: Array.isArray(cfg.defects) && cfg.defects.length > 0 ? cfg.defects : DEFAULT_LOCK_SPOTS,
        conclusion: cfg.conclusion || (isCase418
          ? {
              question: 'На замке гаража Белова — свежие задиры натяжителя, заусенец на 3-м пине от отмычки и чужая графитовая смазка в УФ. Вывод:',
              options: [
                {
                  id: 'belov_own',
                  text: 'Белов сам открыл гараж родным ключом и взял свой старый пистолет — следы вызваны ржавчиной.',
                  isCorrect: false,
                  reason: 'Противоречие: родной ключ не оставляет поперечных задиров натяжителя и свежего заусенца на 3-м пине.'
                },
                {
                  id: 'picked_framing',
                  text: 'Гараж Белова бесшумно вскрыл профессиональный взломщик отмычками, чтобы похитить ствол ЛРО-207 и подставить Белова.',
                  isCorrect: true,
                  reason: 'Верно: следы натяжителя, прочёсывания 3-го пина и графитовой смазки полностью подтверждают тайный взлом.'
                },
                {
                  id: 'crowbar',
                  text: 'Ворота грубо выломали ломом, сорвав все пять пинов цилиндра.',
                  isCorrect: false,
                  reason: 'Противоречие: корпус и остальные пины целы — замок открыли тихо и чисто инструментом.'
                }
              ]
            }
          : {
              question: 'Трасология выявила следы натяжителя, заусенец на пине и графитовую смазку. Вывод:',
              options: [
                { id: 'wear', text: 'Это обычный износ замка от родного ключа.', isCorrect: false, reason: 'Противоречие: поперечные задиры и заусенец характерны именно для отмычки.' },
                { id: 'picked', text: 'Замок был криминально вскрыт отмычкой с применением смазки.', isCorrect: true, reason: 'Верно: криминальное вскрытие подтверждено.' },
                { id: 'rust', text: 'Замок заклинило из-за ржавчины.', isCorrect: false, reason: 'Противоречие: выявлены свежие следы стального инструмента.' }
              ]
            })
      };
    }

    return {
      id: isCase418 ? 'case418_act5_doc' : 'generic_doc',
      mode: 'doc',
      title: cfg.title || 'ЭКСПЕРТИЗА ДОВЕРЕННОСТИ',
      stampWin: 'ПОДДЕЛКА ДОКУМЕНТА ДОКАЗАНА',
      spots: Array.isArray(cfg.defects) && cfg.defects.length > 0 ? cfg.defects : DEFAULT_DOC_SPOTS,
      conclusion: cfg.conclusion || (isCase418
        ? {
            question: 'На доверенности Зуева: УФ-травление даты (09.10→14.10), продавленная обводка подписи Сафонова и струйный растр печати. Вывод:',
            options: [
              {
                id: 'valid_poa',
                text: 'Бланк серии 77 АГ подлинный, поэтому доверенность юридически действительна — мелкие дефекты допустимы.',
                isCorrect: false,
                reason: 'Противоречие: настоящий бланк использовали как основу, вытравив дату и подделав подпись с печатью.'
              },
              {
                id: 'zuev_forgery',
                text: 'Аркадий Зуев сфабриковал доверенность задним числом на украденном/старом бланке, чтобы захватить активы ООО «Север-Лес» после убийства.',
                isCorrect: true,
                reason: 'Верно: химическое травление даты, обводка подписи и поддельный микротекст печати неопровержимо доказывают подлог.'
              },
              {
                id: 'coffee_damage',
                text: 'Следы на дате и печати появились из-за пролитого кофе и сгиба бланка в папке.',
                isCorrect: false,
                reason: 'Противоречие: кофе не даёт УФ-травления даты 09.10 и не создаёт продавленную борозду обводки подписи.'
              }
            ]
          }
        : {
            question: 'Установлены УФ-травление даты, след обводки подписи и подмена микротекста печати. Вывод:',
            options: [
              { id: 'real', text: 'Документ подлинный.', isCorrect: false, reason: 'Противоречие: выявлены три независимых признака фальсификации.' },
              { id: 'fake', text: 'Документ является криминальной подделкой с изменёнными реквизитами.', isCorrect: true, reason: 'Верно: подделка доказана.' },
              { id: 'printer', text: 'Это заводской брак типографии.', isCorrect: false, reason: 'Противоречие: типография не оставляет следов ручной обводки подписи и травления.' }
            ]
          })
    };
  }

  function buildDocCanvases(spots) {
    var W = 960, H = 720;
    var cWhite = document.createElement('canvas');
    var cOblique = document.createElement('canvas');
    var cUv = document.createElement('canvas');
    cWhite.width = cOblique.width = cUv.width = W;
    cWhite.height = cOblique.height = cUv.height = H;

    function getPt(id, fx, fy) {
      for (var k = 0; k < spots.length; k++) {
        if (spots[k].id === id) return { x: spots[k].x * W, y: spots[k].y * H };
      }
      return { x: fx * W, y: fy * H };
    }

    var ptDate = getPt('date_etch', 0.27, 0.26);
    var ptSig = getPt('sig_indent', 0.72, 0.74);
    var ptSeal = getPt('seal_micro', 0.30, 0.74);
    var ptCoffee = getPt('decoy_coffee', 0.82, 0.28);

    function drawBase(ctx, mode) {
      var rand = mulberry32(41855), i;
      ctx.fillStyle = mode === 'uv' ? '#070614' : mode === 'oblique' ? '#0d0c0b' : '#121318';
      ctx.fillRect(0, 0, W, H);

      var px = 56, py = 36, pw = W - 112, ph = H - 72;
      if (mode === 'uv') {
        ctx.fillStyle = '#141133';
      } else if (mode === 'oblique') {
        var og = ctx.createLinearGradient(px, py, px + pw, py + ph);
        og.addColorStop(0, '#c8b693'); og.addColorStop(0.5, '#a89674'); og.addColorStop(1, '#7c6d51');
        ctx.fillStyle = og;
      } else {
        var wg = ctx.createLinearGradient(px, py, px, py + ph);
        wg.addColorStop(0, '#ece4d0'); wg.addColorStop(1, '#dfd4bb');
        ctx.fillStyle = wg;
      }
      ctx.fillRect(px, py, pw, ph);

      for (i = 0; i < 200; i++) {
        var fx = px + rand() * pw, fy = py + rand() * ph, fl = 6 + rand() * 14, fa = rand() * Math.PI;
        if (mode === 'uv' && i % 5 === 0) {
          ctx.strokeStyle = i % 10 === 0 ? 'rgba(99, 102, 241, 0.45)' : 'rgba(56, 189, 248, 0.35)';
          ctx.lineWidth = 1.1;
          ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx + Math.cos(fa) * fl, fy + Math.sin(fa) * fl); ctx.stroke();
        } else if (mode === 'oblique') {
          ctx.strokeStyle = i % 2 === 0 ? 'rgba(255,245,220,0.14)' : 'rgba(30,22,12,0.18)';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx + fl * 0.7, fy + 1.2); ctx.stroke();
        }
      }

      // Decoy horizontal fold crease across middle
      ctx.strokeStyle = mode === 'oblique' ? 'rgba(20, 14, 8, 0.38)' : 'rgba(90, 75, 55, 0.22)';
      ctx.lineWidth = mode === 'oblique' ? 2.4 : 1.4;
      ctx.beginPath(); ctx.moveTo(px, H * 0.45); ctx.lineTo(px + pw, H * 0.45); ctx.stroke();

      // Decoy faint coffee ring stain on right margin
      ctx.strokeStyle = mode === 'uv' ? 'rgba(65, 55, 110, 0.22)' : 'rgba(130, 88, 40, 0.24)';
      ctx.lineWidth = 5;
      ctx.beginPath(); ctx.arc(ptCoffee.x, ptCoffee.y, 34, 0, Math.PI * 2); ctx.stroke();

      var borderCol = mode === 'uv' ? 'rgba(129, 140, 248, 0.42)' : mode === 'oblique' ? '#4a3d28' : '#574a35';
      ctx.strokeStyle = borderCol; ctx.lineWidth = 3;
      ctx.strokeRect(px + 18, py + 18, pw - 36, ph - 36);
      ctx.lineWidth = 1; ctx.strokeRect(px + 25, py + 25, pw - 50, ph - 50);

      var inkCol = mode === 'uv' ? 'rgba(165, 180, 252, 0.38)' : mode === 'oblique' ? '#261e14' : '#18181b';
      var inkSub = mode === 'uv' ? 'rgba(129, 140, 248, 0.32)' : mode === 'oblique' ? '#3d3020' : '#3f3f46';
      ctx.fillStyle = inkCol; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.font = '700 22px "Oswald", sans-serif';
      ctx.fillText('РОССИЙСКАЯ ФЕДЕРАЦИЯ • НОТАРИАЛЬНАЯ ДОВЕРЕННОСТЬ', W / 2, py + 40);
      ctx.font = '600 13px "IBM Plex Mono", monospace'; ctx.fillStyle = inkSub;
      ctx.fillText('БЛАНК СЕРИИ 77 АГ № 4918204 • Г. МОСКВА', W / 2, py + 72);

      // Date line (Defect 1: UV chemical etching)
      ctx.textAlign = 'left'; ctx.font = '600 17px "IBM Plex Mono", monospace'; ctx.fillStyle = inkCol;
      ctx.fillText('Дата выдачи:  14.10.2024 г.', ptDate.x - 140, ptDate.y - 10);
      if (mode === 'uv') {
        var eg = ctx.createRadialGradient(ptDate.x + 25, ptDate.y, 12, ptDate.x + 25, ptDate.y, 92);
        eg.addColorStop(0, 'rgba(129, 140, 248, 0.92)');
        eg.addColorStop(0.5, 'rgba(56, 189, 248, 0.58)');
        eg.addColorStop(1, 'rgba(99, 102, 241, 0)');
        ctx.fillStyle = eg;
        ctx.beginPath(); ctx.ellipse(ptDate.x + 25, ptDate.y, 96, 38, -0.06, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#e0f2fe'; ctx.font = '700 18px "IBM Plex Mono", monospace';
        ctx.fillText('09.10.2024', ptDate.x - 2, ptDate.y - 16);
        ctx.font = '600 11px "IBM Plex Mono", monospace';
        ctx.fillText('СЛЕД ТРАВЛЕНИЯ (ХЛОР/КИСЛОТА)', ptDate.x - 26, ptDate.y + 18);
      }

      var bodyLines = [
        'Я, гр. Сафонов Олег Викторович, 1974 г.р., паспорт 45 18 № 704921,',
        'настоящей доверенностью уполномочиваю гр. Зуева Аркадия Павловича',
        'распоряжаться долями ООО «Север-Лес», счетами и недвижимым имуществом,',
        'подписывать договоры отчуждения и получать наличные средства без ограничений.',
        'Доверенность выдана сроком на три года с правом передоверия третьим лицам.'
      ];
      ctx.font = '400 17px "Inter", sans-serif'; ctx.fillStyle = inkCol;
      for (i = 0; i < bodyLines.length; i++) ctx.fillText(bodyLines[i], px + 54, py + 215 + i * 36);

      ctx.strokeStyle = borderCol; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(px + 54, py + 412); ctx.lineTo(px + pw - 54, py + 412); ctx.stroke();

      // Defect 3: Seal & counterfeit font/raster (sharp in WHITE light)
      ctx.save();
      ctx.translate(ptSeal.x, ptSeal.y);
      var sealCol = mode === 'uv' ? 'rgba(99, 102, 241, 0.32)' : mode === 'oblique' ? 'rgba(42, 54, 92, 0.55)' : '#1d4ed8';
      ctx.strokeStyle = sealCol; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(0, 0, 68, 0, Math.PI * 2); ctx.stroke();
      ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.arc(0, 0, 56, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = sealCol; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.font = '700 11px "IBM Plex Mono", monospace'; ctx.fillText('НОТАРИАЛЬНЫЙ ОКРУГ', 0, -24);
      ctx.font = '700 14px "Oswald", sans-serif'; ctx.fillText('Г. МОСКВА', 0, 0);
      if (mode === 'white') {
        ctx.fillStyle = '#1e3a8a'; ctx.font = '700 11px "Arial", sans-serif';
        ctx.fillText('НОТАРIУС • КОПИЯ #00', 0, 22);
        ctx.fillStyle = 'rgba(29, 78, 216, 0.45)';
        for (i = 0; i < 42; i++) {
          var a = (i / 42) * Math.PI * 2, rDot = 59 + (i % 3) * 3.5;
          ctx.fillRect(Math.cos(a) * rDot, Math.sin(a) * rDot, 2.2, 2.2);
        }
        ctx.fillStyle = '#0f172a'; ctx.font = '400 13px "Georgia", serif';
        ctx.fillText('Реестр:', -42, 86);
        ctx.fillStyle = '#b91c1c'; ctx.font = '700 15px "Courier New", monospace';
        ctx.fillText('№77-99/Ф', 44, 86);
      } else {
        ctx.font = '600 10px "IBM Plex Mono", monospace'; ctx.fillText('РЕЕСТР № 77-99', 0, 22);
      }
      ctx.restore();

      // Defect 2: Signature tracing groove (visible in OBLIQUE light)
      ctx.save();
      ctx.translate(ptSig.x, ptSig.y);
      ctx.fillStyle = inkSub; ctx.font = '600 14px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
      ctx.fillText('Подпись доверителя:', 0, -54);
      ctx.strokeStyle = borderCol; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(-110, 22); ctx.lineTo(110, 22); ctx.stroke();
      ctx.font = '500 14px "Inter", sans-serif'; ctx.fillText('/ Сафонов О.В. /', 0, 42);

      function traceSig(ox, oy) {
        ctx.beginPath();
        ctx.moveTo(-88 + ox, 10 + oy);
        ctx.bezierCurveTo(-72 + ox, -42 + oy, -44 + ox, -38 + oy, -38 + ox, 8 + oy);
        ctx.bezierCurveTo(-24 + ox, -26 + oy, -2 + ox, -20 + oy, 4 + ox, 6 + oy);
        ctx.bezierCurveTo(22 + ox, -32 + oy, 50 + ox, -14 + oy, 38 + ox, 12 + oy);
        ctx.bezierCurveTo(56 + ox, -8 + oy, 78 + ox, -22 + oy, 92 + ox, 4 + oy);
      }
      if (mode === 'oblique') {
        ctx.strokeStyle = 'rgba(18, 12, 6, 0.85)'; ctx.lineWidth = 4.2; traceSig(-6, -4); ctx.stroke();
        ctx.strokeStyle = 'rgba(255, 240, 195, 0.92)'; ctx.lineWidth = 2.2; traceSig(-3, -2); ctx.stroke();
        ctx.strokeStyle = 'rgba(20, 12, 4, 0.75)'; ctx.lineWidth = 2.5; traceSig(8, 7); ctx.stroke();
        ctx.strokeStyle = 'rgba(255, 232, 168, 0.85)'; ctx.lineWidth = 1.3; traceSig(10, 8); ctx.stroke();
      }
      ctx.strokeStyle = mode === 'uv' ? 'rgba(99, 102, 241, 0.35)' : '#1e3a8a';
      ctx.lineWidth = 3.2; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      traceSig(0, 0); ctx.stroke();
      ctx.restore();
    }

    drawBase(cWhite.getContext('2d'), 'white');
    drawBase(cOblique.getContext('2d'), 'oblique');
    drawBase(cUv.getContext('2d'), 'uv');
    return { white: cWhite, oblique: cOblique, uv: cUv };
  }

  function buildLockCanvases(spots) {
    var W = 960, H = 720;
    var cWhite = document.createElement('canvas');
    var cOblique = document.createElement('canvas');
    var cUv = document.createElement('canvas');
    cWhite.width = cOblique.width = cUv.width = W;
    cWhite.height = cOblique.height = cUv.height = H;

    function getPt(id, fx, fy) {
      for (var k = 0; k < spots.length; k++) {
        if (spots[k].id === id) return { x: spots[k].x * W, y: spots[k].y * H };
      }
      return { x: fx * W, y: fy * H };
    }

    var ptTension = getPt('tension_scratch', 0.24, 0.65);
    var ptPin3 = getPt('pin3_burr', 0.65, 0.45);
    var ptGraphite = getPt('graphite_uv', 0.24, 0.29);
    var ptRust = getPt('decoy_rust', 0.11, 0.56);

    function drawLock(ctx, mode) {
      var i;
      ctx.fillStyle = mode === 'uv' ? '#070614' : '#0c0e13';
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = mode === 'uv' ? 'rgba(99,102,241,0.08)' : 'rgba(148,163,184,0.07)';
      ctx.lineWidth = 1;
      for (i = 0; i < W; i += 32) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke(); }
      for (i = 0; i < H; i += 32) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(W, i); ctx.stroke(); }

      ctx.fillStyle = mode === 'uv' ? 'rgba(165, 180, 252, 0.55)' : '#94a3b8';
      ctx.font = '600 16px "IBM Plex Mono", monospace'; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      ctx.fillText('ТРАСОЛОГИЯ ЛИЧИНКИ ЗАМКА • ГАРАЖ БЕЛОВА (#418-З)', 36, 26);

      // Cylinder front face
      var faceCx = W * 0.24, faceCy = H * 0.48, outerR = 165, plugR = 112;
      ctx.fillStyle = mode === 'uv' ? '#171538' : mode === 'oblique' ? '#334155' : '#3b4452';
      ctx.beginPath(); ctx.arc(faceCx, faceCy, outerR, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = mode === 'uv' ? '#4338ca' : '#64748b'; ctx.lineWidth = 3; ctx.stroke();

      // Decoy rust patch on outer steel ring
      ctx.fillStyle = mode === 'uv' ? 'rgba(55, 40, 80, 0.4)' : 'rgba(146, 64, 14, 0.55)';
      ctx.beginPath(); ctx.ellipse(ptRust.x, ptRust.y, 26, 36, -0.3, 0, Math.PI * 2); ctx.fill();

      // Brass core face
      ctx.fillStyle = mode === 'uv' ? '#241e44' : mode === 'oblique' ? '#b07e28' : '#9d742c';
      ctx.beginPath(); ctx.arc(faceCx, faceCy, plugR, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#0b0c0e'; ctx.lineWidth = 4; ctx.stroke();

      // Keyway slot
      ctx.fillStyle = '#050608';
      ctx.beginPath();
      ctx.moveTo(faceCx - 16, faceCy - 72); ctx.lineTo(faceCx + 16, faceCy - 72);
      ctx.lineTo(faceCx + 16, faceCy - 20); ctx.lineTo(faceCx + 28, faceCy - 6);
      ctx.lineTo(faceCx + 14, faceCy + 14); ctx.lineTo(faceCx + 18, faceCy + 84);
      ctx.lineTo(faceCx - 18, faceCy + 84); ctx.lineTo(faceCx - 18, faceCy + 24);
      ctx.lineTo(faceCx - 28, faceCy + 6); ctx.lineTo(faceCx - 16, faceCy - 12); ctx.closePath();
      ctx.fill();

      // UV Defect 3: Fluorescent graphite lubricant
      if (mode === 'uv') {
        var sg = ctx.createRadialGradient(ptGraphite.x, ptGraphite.y, 10, ptGraphite.x, ptGraphite.y, 76);
        sg.addColorStop(0, 'rgba(129, 140, 248, 0.92)');
        sg.addColorStop(0.5, 'rgba(56, 189, 248, 0.65)');
        sg.addColorStop(1, 'rgba(99, 102, 241, 0)');
        ctx.fillStyle = sg;
        ctx.beginPath(); ctx.ellipse(ptGraphite.x, ptGraphite.y, 72, 42, 0.25, 0, Math.PI * 2); ctx.fill();
      } else {
        ctx.fillStyle = 'rgba(12, 12, 15, 0.24)';
        ctx.beginPath(); ctx.ellipse(ptGraphite.x, ptGraphite.y, 44, 22, 0.2, 0, Math.PI * 2); ctx.fill();
      }

      // Oblique Defect 1: Transverse tension wrench scratches
      if (mode === 'oblique') {
        for (i = 0; i < 7; i++) {
          var sy = ptTension.y - 26 + i * 8.5;
          ctx.strokeStyle = '#fef08a'; ctx.lineWidth = 3;
          ctx.beginPath(); ctx.moveTo(ptTension.x - 38, sy); ctx.lineTo(ptTension.x + 38, sy + 2.5); ctx.stroke();
          ctx.strokeStyle = 'rgba(0,0,0,0.85)'; ctx.lineWidth = 1.6;
          ctx.beginPath(); ctx.moveTo(ptTension.x - 36, sy + 3); ctx.lineTo(ptTension.x + 36, sy + 5.5); ctx.stroke();
        }
      }

      // Right cutaway: 5 pins along shear line
      var cutX = W * 0.48, cutY = H * 0.16, cutW = W * 0.46, cutH = H * 0.66, shearY = H * 0.46;
      ctx.fillStyle = mode === 'uv' ? '#13112a' : '#1e2430';
      ctx.fillRect(cutX, cutY, cutW, cutH);
      ctx.strokeStyle = mode === 'uv' ? '#4338ca' : '#475569'; ctx.lineWidth = 2.5;
      ctx.strokeRect(cutX, cutY, cutW, cutH);
      ctx.fillStyle = mode === 'uv' ? '#1f1a3d' : '#7b581e';
      ctx.fillRect(cutX + 4, shearY, cutW - 8, cutY + cutH - shearY - 4);

      ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 1.6; ctx.setLineDash([8, 5]);
      ctx.beginPath(); ctx.moveTo(cutX - 8, shearY); ctx.lineTo(cutX + cutW + 8, shearY); ctx.stroke();
      ctx.setLineDash([]);

      var pinSpacing = cutW / 5.4, pinW = 34;
      for (var p = 0; p < 5; p++) {
        var pcx = cutX + pinSpacing * (p + 0.7);
        var chamberTop = cutY + 26, chamberBot = shearY + 135;
        ctx.fillStyle = '#090b10';
        ctx.fillRect(pcx - pinW / 2 - 4, chamberTop, pinW + 8, chamberBot - chamberTop);

        ctx.strokeStyle = mode === 'uv' ? '#6366f1' : '#94a3b8'; ctx.lineWidth = 2.2;
        ctx.beginPath();
        for (var sp = 0; sp < 6; sp++) {
          var y1 = chamberTop + 8 + sp * 11;
          ctx.moveTo(pcx - pinW * 0.42, y1); ctx.lineTo(pcx + pinW * 0.42, y1 + 5.5); ctx.lineTo(pcx - pinW * 0.42, y1 + 11);
        }
        ctx.stroke();

        var splitY = shearY + (p === 2 ? -12 : p % 2 === 0 ? 18 : -22);
        ctx.fillStyle = mode === 'uv' ? '#4338ca' : '#d6a44e';
        ctx.fillRect(pcx - pinW / 2, chamberTop + 76, pinW, Math.max(24, splitY - (chamberTop + 76) - 2));
        ctx.beginPath();
        ctx.moveTo(pcx - pinW / 2, splitY + 2); ctx.lineTo(pcx + pinW / 2, splitY + 2);
        ctx.lineTo(pcx + pinW / 2, chamberBot - 22); ctx.lineTo(pcx, chamberBot - 4);
        ctx.lineTo(pcx - pinW / 2, chamberBot - 22); ctx.closePath(); ctx.fill();

        ctx.fillStyle = mode === 'uv' ? '#818cf8' : '#cbd5e1';
        ctx.font = '600 13px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
        ctx.fillText('#' + (p + 1), pcx, chamberBot + 16);

        // Oblique Defect 2: Sharp burr & rake scratches on Pin #3
        if (p === 2 && mode === 'oblique') {
          ctx.fillStyle = '#fef08a';
          ctx.beginPath();
          ctx.moveTo(ptPin3.x - 16, ptPin3.y - 6); ctx.lineTo(ptPin3.x - 24, ptPin3.y + 4); ctx.lineTo(ptPin3.x - 12, ptPin3.y + 12);
          ctx.closePath(); ctx.fill();
          for (var sc = 0; sc < 5; sc++) {
            ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2.4;
            ctx.beginPath(); ctx.moveTo(ptPin3.x - 18, ptPin3.y - 16 + sc * 9); ctx.lineTo(ptPin3.x + 18, ptPin3.y - 4 + sc * 9); ctx.stroke();
          }
        }
      }
    }

    drawLock(cWhite.getContext('2d'), 'white');
    drawLock(cOblique.getContext('2d'), 'oblique');
    drawLock(cUv.getContext('2d'), 'uv');
    return { white: cWhite, oblique: cOblique, uv: cUv };
  }


  function initDocForgery(containerEl, config, callbacks) {
    config = config || {};
    injectDocStyles();

    var timers = createTimerBag();
    var listeners = createListenerBag();
    var triggerWin = createWinTrigger(callbacks);
    var failFired = false;
    function triggerDocFail(res) {
      if (failFired) return;
      failFired = true;
      if (callbacks && typeof callbacks.onFail === 'function') {
        callbacks.onFail(res || { success: false });
      }
    }

    var scenario = resolveDocScenario(config);
    var mode = scenario.mode;
    var maxErrors = typeof config.maxErrors === 'number' && config.maxErrors > 0 ? config.maxErrors : 4;

    var spots = scenario.spots.map(function (d, idx) {
      return {
        id: d.id || ('def_' + idx),
        isEvidence: typeof d.isEvidence === 'boolean' ? d.isEvidence : true,
        requiredLight: d.requiredLight || 'uv',
        cover: typeof d.cover === 'number' ? d.cover : 0,
        coverLabel: d.coverLabel || 'Загрязнение',
        x: clamp(typeof d.x === 'number' ? d.x : 0.25 + idx * 0.2, 0.08, 0.92),
        y: clamp(typeof d.y === 'number' ? d.y : 0.5, 0.10, 0.90),
        radius: typeof d.radius === 'number' ? d.radius : 0.095,
        shortLabel: d.shortLabel || ('Улика #' + (idx + 1)),
        label: d.label || ('Участок #' + (idx + 1)),
        readings: d.readings || { white: d.label || '', oblique: d.label || '', uv: d.label || '' },
        wrongModeMsg: d.wrongModeMsg || 'Проверьте этот участок в другом спектре света!',
        falseReason: d.falseReason || 'ЛОЖНЫЙ СЛЕД: бытовой дефект без признаков фальсификации.',
        found: false
      };
    });

    var evidenceSpots = spots.filter(function (s) { return s.isEvidence; });
    var totalEvidence = evidenceSpots.length || 3;

    var shell = createShell(containerEl, {
      title: scenario.title,
      subtitle: '',
      extraClass: 'mg-doc-wrap'
    });

    shell.subEl.style.display = 'none';
    var metaRow = document.createElement('div');
    metaRow.className = 'mg-df-meta';
    var statFound = document.createElement('span');
    statFound.className = 'mg-df-stat';
    var statErr = document.createElement('span');
    statErr.className = 'mg-df-err';
    metaRow.appendChild(statFound);
    metaRow.appendChild(statErr);
    shell.subEl.parentNode.appendChild(metaRow);

    listeners.on(shell.cancelBtn, 'click', function () {
      haptic('light'); sfx('click');
      triggerCancel(callbacks);
    });

    var stage = document.createElement('div');
    stage.className = 'mg-f2-stage mg-doc-stage';
    var canvas = document.createElement('canvas');
    canvas.className = 'mg-f2-canvas';
    stage.appendChild(canvas);
    shell.body.appendChild(stage);

    // Inspector dock
    var inspectorEl = document.createElement('div');
    inspectorEl.className = 'mg-df-inspector';
    var insInfo = document.createElement('div');
    insInfo.className = 'mg-df-ins-info';
    var insTitle = document.createElement('div');
    insTitle.className = 'mg-df-ins-title';
    var insDesc = document.createElement('div');
    insDesc.className = 'mg-df-ins-desc';
    insInfo.appendChild(insTitle);
    insInfo.appendChild(insDesc);

    var fixBtn = document.createElement('button');
    fixBtn.type = 'button';
    fixBtn.className = 'mg-f2-btn mg-df-fix-btn';
    fixBtn.textContent = 'ЗАФИКСИРОВАТЬ';
    fixBtn.disabled = true;

    inspectorEl.appendChild(insInfo);
    inspectorEl.appendChild(fixBtn);
    shell.body.appendChild(inspectorEl);

    var panel = document.createElement('div');
    panel.className = 'mg-f2-panel';

    var lightsRow = document.createElement('div');
    lightsRow.className = 'mg-doc-lights';
    var lightDefs = [
      { id: 'white', label: '1. БЕЛЫЙ / ЧИСТКА' },
      { id: 'oblique', label: '2. КОСОЙ СВЕТ' },
      { id: 'uv', label: '3. УФ 365 НМ' }
    ];
    var lightBtns = {};
    var activeLight = 'white';

    for (var li = 0; li < lightDefs.length; li++) {
      (function (ld) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'mg-f2-btn-sec';
        btn.textContent = ld.label;
        listeners.on(btn, 'click', function () {
          if (phase !== 'inspect' || activeLight === ld.id) return;
          activeLight = ld.id;
          tempFlash = null;
          haptic('light'); sfx('click');
          syncLightUI();
          syncInspector();
        });
        lightsRow.appendChild(btn);
        lightBtns[ld.id] = btn;
      })(lightDefs[li]);
    }
    panel.appendChild(lightsRow);

    var cluesRow = document.createElement('div');
    cluesRow.className = 'mg-doc-clues';
    cluesRow.style.gridTemplateColumns = 'repeat(' + Math.min(totalEvidence, 3) + ', 1fr)';
    var cluePills = [];
    for (var pi = 0; pi < totalEvidence; pi++) {
      var pill = document.createElement('div');
      pill.className = 'mg-f2-pill';
      pill.textContent = 'УЛИКА #' + (pi + 1);
      cluesRow.appendChild(pill);
      cluePills.push(pill);
    }
    panel.appendChild(cluesRow);
    shell.body.appendChild(panel);

    var layers = mode === 'lock' ? buildLockCanvases(spots) : buildDocCanvases(spots);
    var canvasMgr = setupResponsiveCanvas(canvas, stage);

    var phase = 'inspect'; // 'inspect' | 'deduce' | 'fail'
    var loupeX = 0.5;
    var loupeY = 0.5;
    var targetX = 0.5;
    var targetY = 0.5;
    var lastDragX = 0.5;
    var lastDragY = 0.5;
    var dragging = false;
    var currentSpot = null;
    var foundCount = 0;
    var errorsCount = 0;
    var captureFlash = 0;
    var errFlash = 0;
    var coverParticles = [];
    var tempFlash = null;
    var lastTs = performance.now();

    function syncHeaderMeta() {
      statFound.textContent = 'УЛИКИ: ' + foundCount + ' / ' + totalEvidence;
      statErr.textContent = 'ОШИБКИ: ' + errorsCount + ' / ' + maxErrors;
      statErr.classList.toggle('is-warn', errorsCount >= maxErrors - 1);
    }

    function syncLightUI() {
      for (var k in lightBtns) {
        if (Object.prototype.hasOwnProperty.call(lightBtns, k)) {
          lightBtns[k].classList.remove('is-active', 'is-uv');
          if (k === activeLight) {
            lightBtns[k].classList.add(k === 'uv' ? 'is-uv' : 'is-active');
          }
        }
      }
    }

    function setTempFlash(title, desc, tone, ms) {
      tempFlash = { title: title, desc: desc, tone: tone || 'err', until: performance.now() + (ms || 1800) };
      syncInspector();
    }

    function syncInspector() {
      var now = performance.now();
      if (tempFlash && now < tempFlash.until) {
        insTitle.textContent = tempFlash.title;
        insTitle.className = 'mg-df-ins-title ' + (tempFlash.tone === 'ok' ? 'is-ok' : 'is-err');
        insDesc.textContent = tempFlash.desc;
        fixBtn.disabled = !currentSpot || currentSpot.found || currentSpot.cover > 0.02 || phase !== 'inspect';
        return;
      }
      tempFlash = null;

      if (!currentSpot) {
        insTitle.className = 'mg-df-ins-title' + (activeLight === 'uv' ? ' is-uv' : '');
        insTitle.textContent = activeLight === 'uv' ? 'УФ 365 НМ // СПЕКТРАЛЬНЫЙ ОСМОТР' : activeLight === 'oblique' ? 'КОСОЙ СВЕТ // РЕЛЬЕФ И БОРОЗДЫ' : 'БЕЛЫЙ СВЕТ 2.2× // ОЧИСТКА';
        insDesc.textContent = 'Водите лупой по зонам, счищайте помехи в 1. БЕЛОМ СВЕТЕ и сверяйте детали.';
        fixBtn.disabled = true;
        return;
      }

      if (currentSpot.found) {
        insTitle.className = 'mg-df-ins-title is-ok';
        insTitle.textContent = 'ЗАФИКСИРОВАНО // ' + currentSpot.shortLabel;
        insDesc.textContent = currentSpot.label;
        fixBtn.disabled = true;
        return;
      }

      if (currentSpot.cover > 0.02) {
        insTitle.className = 'mg-df-ins-title';
        insTitle.textContent = 'ПЕРЕКРЫТИЕ // ' + currentSpot.coverLabel;
        insDesc.textContent = activeLight === 'white'
          ? 'Потрите лупой поверх этого участка, чтобы снять накладку/грязь.'
          : 'Переключитесь в 1. БЕЛЫЙ / ЧИСТКА, чтобы очистить этот участок.';
        fixBtn.disabled = true;
        return;
      }

      insTitle.className = 'mg-df-ins-title' + (activeLight === 'uv' ? ' is-uv' : '');
      insTitle.textContent = currentSpot.label;
      insDesc.textContent = currentSpot.readings[activeLight] || currentSpot.readings.white;
      fixBtn.disabled = false;
    }

    function showFailScreen(reason, msg) {
      phase = 'fail';
      stage.style.display = 'none';
      inspectorEl.style.display = 'none';
      panel.style.display = 'none';
      var box = document.createElement('div');
      box.className = 'mg-df-stamp-box';
      var st = document.createElement('div');
      st.className = 'mg-df-stamp';
      st.textContent = 'ЭКСПЕРТИЗА ОТКЛОНЕНА';
      var txt = document.createElement('div');
      txt.className = 'mg-df-dq';
      txt.textContent = msg || 'Превышен лимит ошибочных отметок экспертизы.';
      box.appendChild(st);
      box.appendChild(txt);
      shell.body.appendChild(box);
      timers.setTimeout(function () {
        triggerDocFail({ minigame: 'doc_forgery', mode: mode, reason: reason, errors: errorsCount });
      }, 950);
    }

    function openDeductionPhase() {
      phase = 'deduce';
      stage.style.display = 'none';
      inspectorEl.style.display = 'none';
      panel.style.display = 'none';

      var card = document.createElement('div');
      card.className = 'mg-df-deduce';
      var kicker = document.createElement('div');
      kicker.className = 'mg-df-dkicker';
      kicker.textContent = 'ФАЗА 3 // КРИМИНАЛИСТИЧЕСКИЙ ВЫВОД';
      card.appendChild(kicker);

      var facts = document.createElement('div');
      facts.className = 'mg-df-dfacts';
      for (var i = 0; i < evidenceSpots.length; i++) {
        var row = document.createElement('div');
        row.textContent = '• ' + evidenceSpots[i].label;
        facts.appendChild(row);
      }
      card.appendChild(facts);

      var q = document.createElement('div');
      q.className = 'mg-df-dq';
      q.textContent = scenario.conclusion.question;
      card.appendChild(q);

      var optsWrap = document.createElement('div');
      optsWrap.className = 'mg-df-dopts';
      var fb = document.createElement('div');
      fb.className = 'mg-df-dfb';

      var settled = false;
      var opts = scenario.conclusion.options || [];
      for (var oi = 0; oi < opts.length; oi++) {
        (function (opt) {
          var ob = document.createElement('button');
          ob.type = 'button';
          ob.className = 'mg-df-dopt';
          ob.textContent = opt.text;
          listeners.on(ob, 'click', function () {
            if (settled || phase !== 'deduce') return;
            if (opt.isCorrect) {
              settled = true;
              ob.classList.add('is-correct');
              fb.className = 'mg-df-dfb is-ok';
              fb.textContent = opt.reason;
              haptic('success'); sfx('stamp');
              timers.setTimeout(function () {
                card.innerHTML = '';
                var box = document.createElement('div');
                box.className = 'mg-df-stamp-box';
                var st = document.createElement('div');
                st.className = 'mg-df-stamp is-ok';
                st.textContent = scenario.stampWin;
                var btnDone = document.createElement('button');
                btnDone.type = 'button';
                btnDone.className = 'mg-f2-btn is-ready';
                btnDone.textContent = 'ПРИОБЩИТЬ К ДЕЛУ';
                listeners.on(btnDone, 'click', function () {
                  haptic('success'); sfx('success');
                  triggerWin({
                    minigame: 'doc_forgery',
                    mode: mode,
                    scenarioId: scenario.id,
                    errors: errorsCount,
                    deduced: opt.id,
                    found: evidenceSpots.map(function (it) { return { id: it.id, label: it.label }; })
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
              fb.className = 'mg-df-dfb';
              fb.textContent = opt.reason;
              haptic('error'); sfx('alert');
              flashShake(card);
              if (errorsCount >= maxErrors) {
                settled = true;
                timers.setTimeout(function () {
                  showFailScreen('wrong_deduction', 'Лимит ошибок исчерпан — криминалистический вывод отклонён.');
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

    function triggerDocError(title, desc) {
      errorsCount += 1;
      errFlash = 0.85;
      syncHeaderMeta();
      haptic('error'); sfx('alert');
      flashShake(stage);
      if (errorsCount >= maxErrors) {
        timers.setTimeout(function () { showFailScreen('too_many_errors', desc); }, 520);
        return;
      }
      setTempFlash(title, desc, 'err', 1900);
    }

    listeners.on(fixBtn, 'click', function () {
      if (phase !== 'inspect' || !currentSpot || currentSpot.found || currentSpot.cover > 0.02) return;

      if (!currentSpot.isEvidence) {
        triggerDocError('ЛОЖНЫЙ СЛЕД (+1 ОШИБКА)', currentSpot.falseReason);
        return;
      }
      if (currentSpot.requiredLight !== 'none' && activeLight !== currentSpot.requiredLight) {
        triggerDocError('НАРУШЕНА МЕТОДИКА (+1)', currentSpot.wrongModeMsg);
        return;
      }

      currentSpot.found = true;
      foundCount += 1;
      captureFlash = 1;
      haptic('success'); sfx('stamp');

      if (cluePills[foundCount - 1]) {
        cluePills[foundCount - 1].classList.add('is-found');
        cluePills[foundCount - 1].textContent = currentSpot.shortLabel;
      }
      syncHeaderMeta();
      setTempFlash('УЛИКА ЗАФИКСИРОВАНА', currentSpot.label, 'ok', 1500);

      if (foundCount >= totalEvidence) {
        timers.setTimeout(function () {
          if (phase === 'inspect') openDeductionPhase();
        }, 720);
      }
    });

    function scrubCoverAt(nx, ny, distNorm) {
      if (activeLight !== 'white') return;
      for (var k = 0; k < spots.length; k++) {
        var sp = spots[k];
        if (sp.cover <= 0) continue;
        if (Math.hypot(sp.x - nx, sp.y - ny) <= sp.radius + 0.04) {
          sp.cover = Math.max(0, sp.cover - Math.max(0.14, distNorm * 2.8));
          for (var p = 0; p < 3; p++) {
            coverParticles.push({
              x: sp.x + (Math.random() - 0.5) * 0.06,
              y: sp.y + (Math.random() - 0.5) * 0.05,
              vx: (Math.random() - 0.5) * 0.24,
              vy: (Math.random() - 0.2) * 0.2 + 0.05,
              r: 1.4 + Math.random() * 2,
              alpha: 0.9
            });
          }
          if (sp.cover <= 0.14) {
            sp.cover = 0;
            haptic('medium'); sfx('paper');
            setTempFlash('СЛОЙ СНЯТ', 'Участок очищен — изучите его в БЕЛОМ, КОСОМ или УФ-свете.', 'ok', 1450);
          }
        }
      }
    }

    function moveLoupe(ev) {
      var rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      var nx = clamp((ev.clientX - rect.left) / rect.width, 0.08, 0.92);
      var ny = clamp((ev.clientY - rect.top) / rect.height, 0.10, 0.90);
      var dist = Math.hypot(nx - lastDragX, ny - lastDragY);
      lastDragX = nx; lastDragY = ny;
      targetX = nx; targetY = ny;
      scrubCoverAt(nx, ny, dist);
    }

    listeners.on(canvas, 'pointerdown', function (ev) {
      if (phase !== 'inspect') return;
      dragging = true;
      try { canvas.setPointerCapture(ev.pointerId); } catch (e) {}
      var rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        lastDragX = clamp((ev.clientX - rect.left) / rect.width, 0.08, 0.92);
        lastDragY = clamp((ev.clientY - rect.top) / rect.height, 0.10, 0.90);
      }
      moveLoupe(ev);
    });
    listeners.on(canvas, 'pointermove', function (ev) {
      if (!dragging || phase !== 'inspect') return;
      moveLoupe(ev);
    });
    listeners.on(canvas, 'pointerup', function () { dragging = false; });
    listeners.on(canvas, 'pointercancel', function () { dragging = false; });

    function findSpotUnderLoupe() {
      var best = null, bestDist = 999;
      for (var k = 0; k < spots.length; k++) {
        var d = Math.hypot(spots[k].x - loupeX, spots[k].y - loupeY);
        if (d <= spots[k].radius && d < bestDist) {
          bestDist = d;
          best = spots[k];
        }
      }
      return best;
    }

    syncHeaderMeta();
    syncLightUI();
    syncInspector();

    function render(now) {
      var dt = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;

      if (phase === 'inspect') {
        loupeX = lerp(loupeX, targetX, Math.min(1, dt * 18));
        loupeY = lerp(loupeY, targetY, Math.min(1, dt * 18));

        var hit = findSpotUnderLoupe();
        if (hit !== currentSpot) {
          currentSpot = hit;
          syncInspector();
        }

        var metrics = canvasMgr.getMetrics();
        var w = metrics.width, h = metrics.height, dpr = metrics.dpr;
        var ctx = canvas.getContext('2d');

        ctx.save();
        ctx.scale(dpr, dpr);

        ctx.drawImage(layers.white, 0, 0, w, h);
        ctx.fillStyle = activeLight === 'uv' ? 'rgba(10, 8, 28, 0.66)' : activeLight === 'oblique' ? 'rgba(14, 11, 8, 0.52)' : 'rgba(8, 10, 14, 0.36)';
        ctx.fillRect(0, 0, w, h);

        // Draw obstructions & captured badges on base scene
        for (var k = 0; k < spots.length; k++) {
          var sp = spots[k], sx = sp.x * w, sy = sp.y * h;
          if (sp.cover > 0.02) {
            ctx.save();
            ctx.globalAlpha = clamp(sp.cover, 0.18, 0.94);
            ctx.fillStyle = mode === 'lock' ? '#2c2520' : '#e6d79c';
            ctx.beginPath(); ctx.ellipse(sx, sy, 26, 17, -0.08, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = mode === 'lock' ? '#c98a2e' : '#991b1b'; ctx.lineWidth = 1.2; ctx.setLineDash([3, 2]); ctx.stroke(); ctx.setLineDash([]);
            ctx.fillStyle = mode === 'lock' ? '#fde68a' : '#231e14';
            ctx.font = '700 8px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText('ПОТРИТЕ', sx, sy);
            ctx.restore();
          }
          if (sp.found) {
            ctx.fillStyle = 'rgba(34, 197, 94, 0.24)';
            ctx.beginPath(); ctx.arc(sx, sy, 12, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#22c55e'; ctx.lineWidth = 1.8; ctx.stroke();
          }
        }

        // Flying cover wipe particles
        for (var p = coverParticles.length - 1; p >= 0; p--) {
          var cp = coverParticles[p];
          cp.x += cp.vx * dt; cp.y += cp.vy * dt; cp.alpha -= dt * 1.9;
          if (cp.alpha <= 0) { coverParticles.splice(p, 1); continue; }
          ctx.fillStyle = mode === 'lock' ? ('rgba(70, 58, 48, ' + cp.alpha.toFixed(2) + ')') : ('rgba(230, 215, 156, ' + cp.alpha.toFixed(2) + ')');
          ctx.beginPath(); ctx.arc(cp.x * w, cp.y * h, cp.r, 0, Math.PI * 2); ctx.fill();
        }

        // 2.2x Optical Magnifying Loupe
        var lx = loupeX * w, ly = loupeY * h;
        var loupeR = clamp(Math.min(w, h) * 0.24, 48, 72);
        var mag = 2.2;
        var srcLayer = layers[activeLight] || layers.white;

        ctx.save();
        ctx.beginPath(); ctx.arc(lx, ly, loupeR, 0, Math.PI * 2); ctx.clip();
        var srcW = ((loupeR * 2) / w) * srcLayer.width / mag;
        var srcH = ((loupeR * 2) / h) * srcLayer.height / mag;
        ctx.fillStyle = activeLight === 'uv' ? '#070614' : '#0b0c0e';
        ctx.fillRect(lx - loupeR, ly - loupeR, loupeR * 2, loupeR * 2);
        ctx.drawImage(srcLayer, loupeX * srcLayer.width - srcW / 2, loupeY * srcLayer.height - srcH / 2, srcW, srcH, lx - loupeR, ly - loupeR, loupeR * 2, loupeR * 2);

        if (currentSpot && currentSpot.cover > 0.02) {
          ctx.fillStyle = 'rgba(12, 12, 16, ' + (currentSpot.cover * 0.82).toFixed(2) + ')';
          ctx.fillRect(lx - loupeR, ly - loupeR, loupeR * 2, loupeR * 2);
          ctx.fillStyle = '#fde68a'; ctx.font = '700 9.5px "IBM Plex Mono", monospace';
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText('СНИМИТЕ СЛОЙ', lx, ly);
        }

        // Neutral optical crosshair (no free spoiler!)
        ctx.strokeStyle = activeLight === 'uv' ? 'rgba(165, 180, 252, 0.78)' : 'rgba(245, 158, 11, 0.78)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(lx - 10, ly); ctx.lineTo(lx - 4, ly);
        ctx.moveTo(lx + 4, ly); ctx.lineTo(lx + 10, ly);
        ctx.moveTo(lx, ly - 10); ctx.lineTo(lx, ly - 4);
        ctx.moveTo(lx, ly + 4); ctx.lineTo(lx, ly + 10);
        ctx.stroke();
        ctx.restore();

        // Loupe bezel
        var bezelCol = activeLight === 'uv' ? '#6366f1' : activeLight === 'oblique' ? '#f59e0b' : '#cbd5e1';
        ctx.strokeStyle = '#0b0c0e'; ctx.lineWidth = 5;
        ctx.beginPath(); ctx.arc(lx, ly, loupeR + 1.5, 0, Math.PI * 2); ctx.stroke();
        ctx.strokeStyle = bezelCol; ctx.lineWidth = 2.4;
        ctx.beginPath(); ctx.arc(lx, ly, loupeR, 0, Math.PI * 2); ctx.stroke();

        var tagY = ly + loupeR + 10 > h - 12 ? ly - loupeR - 12 : ly + loupeR + 11;
        ctx.font = '700 9.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillStyle = bezelCol;
        ctx.fillText(activeLight === 'uv' ? 'UV 365nm • 2.2×' : activeLight === 'oblique' ? 'OBLIQUE • 2.2×' : 'WHITE • 2.2×', clamp(lx, 56, w - 56), tagY);

        if (captureFlash > 0.01) {
          ctx.fillStyle = 'rgba(34, 197, 94, ' + (captureFlash * 0.34).toFixed(3) + ')';
          ctx.fillRect(0, 0, w, h);
          captureFlash = Math.max(0, captureFlash - dt * 3.2);
        }
        if (errFlash > 0.01) {
          ctx.fillStyle = 'rgba(220, 38, 38, ' + (errFlash * 0.34).toFixed(3) + ')';
          ctx.fillRect(0, 0, w, h);
          errFlash = Math.max(0, errFlash - dt * 2.5);
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
  // MINIGAME 3: timeline_reconstruct (Multi-scenario case418 + case412 + Phase 3)
  // ============================================================================

  var TL_EXTRA_STYLE_ID = 'minigames-f2-tl-extra';

  var TL_EXTRA_CSS = [
    '.mg-tl-meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-top: 3px; }',
    '.mg-tl-stat { font-family: "IBM Plex Mono", monospace; font-size: 10.5px; font-weight: 600; color: var(--case-accent, #c98a2e); }',
    '.mg-tl-err { font-family: "IBM Plex Mono", monospace; font-size: 10.5px; font-weight: 600; color: #9ca3af; }',
    '.mg-tl-err.is-warn { color: #f87171; }',
    '.mg-tl-cover-wrap { position: relative; }',
    '.mg-tl-folder-slip {',
    '  position: absolute; inset: -2px; z-index: 8; border-radius: 7px; padding: 14px 12px;',
    '  background: linear-gradient(168deg, #3c261c 0%, #241712 65%, #170f0c 100%);',
    '  border: 1.5px solid var(--case-accent, #c98a2e); border-left: 4px solid #dc2626;',
    '  box-shadow: 0 10px 26px rgba(0,0,0,0.78); display: flex; flex-direction: column;',
    '  justify-content: center; align-items: center; gap: 10px; text-align: center;',
    '  touch-action: none; cursor: grab; transition: transform 0.25s ease, opacity 0.25s ease;',
    '}',
    '.mg-tl-folder-slip.is-dragging { transition: none; cursor: grabbing; }',
    '.mg-tl-folder-slip.is-peeled { transform: translate3d(115%, -10px, 0) rotate(8deg) !important; opacity: 0 !important; pointer-events: none; }',
    '.mg-tl-folder-stamp { padding: 4px 10px; border: 2px double #ef4444; color: #fca5a5; font-family: "Oswald", sans-serif; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; transform: rotate(-4deg); }',
    '.mg-tl-folder-txt { font-family: "IBM Plex Mono", monospace; font-size: 10.8px; line-height: 1.42; color: #e2d8c5; max-width: 280px; }',
    '.mg-tl-card-row { display: flex; align-items: stretch; gap: 6px; }',
    '.mg-tl-card-row .mg-tl-card { flex: 1; min-width: 0; }',
    '.mg-tl-reject-btn {',
    '  flex-shrink: 0; width: 42px; border-radius: 6px; border: 1px solid #3c292b;',
    '  background: rgba(153, 27, 27, 0.22); color: #fca5a5; font-family: "IBM Plex Mono", monospace;',
    '  font-size: 9px; font-weight: 700; cursor: pointer; display: flex; flex-direction: column;',
    '  align-items: center; justify-content: center; gap: 2px; padding: 4px 2px;',
    '}',
    '.mg-tl-reject-btn:active { transform: scale(0.95); background: rgba(185, 28, 28, 0.38); }',
    '.mg-tl-deduce { display: flex; flex-direction: column; gap: 9px; padding: 12px; background: #14171f; border: 1px solid #353b4a; border-top: 3px solid var(--case-accent, #c98a2e); border-radius: 8px; }',
    '.mg-tl-dkicker { font-family: "IBM Plex Mono", monospace; font-size: 10px; font-weight: 700; color: var(--case-accent, #c98a2e); text-transform: uppercase; }',
    '.mg-tl-dfacts { padding: 8px 9px; background: #0d1016; border: 1px solid #262b36; border-radius: 6px; font-family: "IBM Plex Mono", monospace; font-size: 9.8px; line-height: 1.4; color: #c2cad8; display: flex; flex-direction: column; gap: 3px; }',
    '.mg-tl-dq { font-size: 12.8px; line-height: 1.4; color: #f3efe6; font-weight: 500; }',
    '.mg-tl-dopts { display: flex; flex-direction: column; gap: 6px; }',
    '.mg-tl-dopt { width: 100%; text-align: left; padding: 9px 10px; background: #1b202b; border: 1px solid #353d4e; border-radius: 6px; color: #e4e0d8; font-size: 12px; line-height: 1.36; cursor: pointer; }',
    '.mg-tl-dopt.is-wrong { border-color: #ef4444; background: rgba(153, 27, 27, 0.25); color: #fecaca; }',
    '.mg-tl-dopt.is-correct { border-color: #22c55e; background: rgba(34, 197, 94, 0.2); color: #bbf7d0; }',
    '.mg-tl-dfb { font-family: "IBM Plex Mono", monospace; font-size: 10.5px; line-height: 1.38; min-height: 16px; color: #fca5a5; }',
    '.mg-tl-dfb.is-ok { color: #86efac; }',
    '.mg-tl-stamp-box { padding: 24px 14px; background: #0d1016; border: 1px solid #2a2e38; border-radius: 8px; display: flex; flex-direction: column; align-items: center; gap: 14px; text-align: center; }',
    '.mg-tl-bigstamp { padding: 8px 14px; font-family: "Oswald", sans-serif; font-size: 17px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #ef4444; border: 3px double #ef4444; border-radius: 4px; transform: rotate(-5deg); line-height: 1.25; }',
    '.mg-tl-bigstamp.is-ok { color: #4ade80; border-color: #22c55e; background: rgba(34, 197, 94, 0.12); }'
  ].join('\n');

  function injectTlStyles() {
    if (document.getElementById(TL_EXTRA_STYLE_ID)) return;
    var el = document.createElement('style');
    el.id = TL_EXTRA_STYLE_ID;
    el.textContent = TL_EXTRA_CSS;
    document.head.appendChild(el);
  }

  function buildTlCase418Scenario(config) {
    return {
      id: 'case418_act6_timeline',
      title: config.title || 'РЕКОНСТРУКЦИЯ ХРОНОЛОГИИ // №418',
      coverStamp: 'ВЕРСИЯ ПРИКРЫТИЯ // СПИСАТЬ В АРХИВ',
      coverText: 'На доске лежит сводка Мельникова о «бытовом замыкании». Сдвиньте папку в сторону, чтобы открыть следственную цепь.',
      stampWin: 'ОРДЕР ПРОКУРОРА ПОДПИСАН // ДЕЛО №418',
      slots: [
        { id: 'ev_well', time: '21:00', title: 'Убийство настоящего Сафонова и сброс в старый колодец', tag: 'УЛИКА: ЗУБНАЯ КАРТА / КОЛОДЕЦ' },
        { id: 'ev_gun', time: '22:40', title: 'Взлом гаража Белова отмычкой и кража ПМ ЛРО-207', tag: 'УЛИКА: ЛИЧИНКА ЗАМКА / ЛРО-207' },
        { id: 'ev_house', time: '23:55', title: 'Исполнитель отжимает дверь ломом и ликвидирует семью', tag: 'УЛИКА: СЛЕД ЛОМА / ПУЛЯ 9×18' },
        { id: 'ev_arson', time: '00:20', title: 'Зуев устраняет исполнителя и разливает уайт-спирит', tag: 'УЛИКА: УАЙТ-СПИРИТ / 3 ОЧАГА' },
        { id: 'ev_delay', time: '00:50', title: 'Мельников придерживает выезд пожарного расчёта', tag: 'УЛИКА: ЖУРНАЛ МЧС / ЗВОНОК' },
        { id: 'ev_cash', time: '01:15', title: 'Ломов приезжает к бане за чёрной кассой', tag: 'УЛИКА: КАМЕРА КПП / СЕЙФ' }
      ],
      decoys: [
        {
          id: 'decoy_wire',
          title: 'Короткое замыкание электрощитка случайно зажигает дом',
          tag: 'СВОДКА ПОЖАРНЫХ (ПРОВЕРЬТЕ)',
          rejectMsg: 'Верно отсеяно: медные жилы щитка целы, а на полу 3 очага уайт-спирита.',
          slotErrMsg: 'ЛОЖНАЯ ВЕРСИЯ НА ДОСКЕ: щиток обгорел лишь снаружи — замыкания не было!'
        },
        {
          id: 'decoy_belov',
          title: 'Игорь Белов сам открывает гараж и едет мстить Сафонову',
          tag: 'ВЕРСИЯ ПОДСТАВЫ (ПРОВЕРЬТЕ)',
          rejectMsg: 'Верно отсеяно: замок гаража Белова вскрыли чужой отмычкой и графитовой смазкой.',
          slotErrMsg: 'ЛОЖНАЯ ВЕРСИЯ НА ДОСКЕ: трасология доказала, что ствол украли из гаража отмычкой!'
        }
      ],
      conclusion: {
        question: 'Вся 6-звенная хронология ночи сведена воедино, а версии о проводке и вине Белова отброшены. Постановление для прокурора:',
        options: [
          {
            id: 'lomov_master',
            text: 'Главный организатор убийства — Ломов, который в 01:15 поджёг дом ради чёрной кассы.',
            isCorrect: false,
            reason: 'Противоречие: к 01:15 дом уже горел 55 минут; Ломов лишь случайно приехал за кассой.'
          },
          {
            id: 'zuev_melnikov',
            text: 'Требуется ордер на задержание организатора Аркадия Зуева и его пособника майора Мельникова, прикрывшего поджог.',
            isCorrect: true,
            reason: 'Верно: хронология, фальшивая доверенность и задержка МЧС неопровержимо изобличают Зуева и Мельникова.'
          },
          {
            id: 'belov_accomplice',
            text: 'Арестовать Белова и Зуева как сообщников по краже оружия, а Мельникова оставить свидетелем.',
            isCorrect: false,
            reason: 'Противоречие: Белова подставили взломом отмычкой, а Мельников умышленно сорвал выезд пожарных.'
          }
        ]
      }
    };
  }

  function buildTlCase412Scenario(config) {
    return {
      id: 'case412_act6_timeline',
      title: config.title || 'РЕКОНСТРУКЦИЯ НОЧИ ПОХИЩЕНИЯ // №412',
      coverStamp: 'ОТКАЗНОЙ МАТЕРИАЛ ГРОМОВА // ПОБЕГ',
      coverText: 'На планшете лежит отказной рапорт участкового Громова. Сдвиньте лист в сторону, чтобы собрать цепь для прокуратуры.',
      stampWin: 'ДОСЬЕ ЗАКРЫТО // ЗАДЕРЖАНИЕ КРАВЦОВА',
      slots: [
        { id: 'c412_sms', time: '21:40', title: 'Алина сходит с электрички и пишет матери со входа на Садовую', tag: 'УЛИКА: ТЕХЛОГ БС-14 / SMS' },
        { id: 'c412_grab', time: '21:53', title: 'Кравцов усыпляет её хлороформом у забора и тащит в гараж №14', tag: 'УЛИКА: НОГОТЬ / ВЕТОШЬ / КАМЕРА' },
        { id: 'c412_pwr', time: '22:15', title: 'Запуск скрытого бункера под гаражом: расход сети растёт ×4', tag: 'УЛИКА: ЭНЕРГОСБЫТ / БТИ' },
        { id: 'c412_well', time: '03:42', title: 'Кравцов выносит рюкзак к колодцу: 40 сек сети и отпечаток на латуни', tag: 'УЛИКА: БИЛЛИНГ R=50М / КАРАБИН' },
        { id: 'c412_cam', time: '08:15', title: 'Участковый Громов приезжает к Беляеву и стирает 14 минут видео', tag: 'УЛИКА: КЭШ КАМЕРЫ №12' },
        { id: 'c412_alibi', time: '11:00', title: 'Кравцов прикрывается фальшивой квитанцией и ждёт районного судью', tag: 'УЛИКА: ФАЛЬШИВАЯ КВИТАНЦИЯ' }
      ],
      decoys: [
        {
          id: 'decoy_artem',
          title: 'Алина добровольно уезжает по трассе М-7 с Артёмом (Рыжим)',
          tag: 'РАПОРТ ГРОМОВА (ПРОВЕРЬТЕ)',
          rejectMsg: 'Верно отсеяно: телефон Артёма всю ночь был в 12 км на АЗС, а сигнал Алины остался на Садовой.',
          slotErrMsg: 'ЛОЖНАЯ ВЕРСИЯ НА ДОСКЕ: алиби Артёма подтверждено, а на трассе БС-09 было 0 пакетов Алины!'
        },
        {
          id: 'decoy_wood',
          title: 'Кравцов всю ночь просто сушит дубовые доски в обычном гараже',
          tag: 'АЛИБИ КРАВЦОВА (ПРОВЕРЬТЕ)',
          rejectMsg: 'Верно отсеяно: за весь прошлый год таких пиков не было, а под гаражом скрытый ввод > 2.2 м.',
          slotErrMsg: 'ЛОЖНАЯ ВЕРСИЯ НА ДОСКЕ: нагрузка выросла ×4 ровно в 22:15 в ночь похищения!'
        }
      ],
      conclusion: {
        question: 'Все звенья ночи похищения (от 21:40 до 11:00) замкнулись без единого пробела. Итог протокола для областного прокурора:',
        options: [
          {
            id: 'belyaev_guilty',
            text: 'Виновен сосед Беляев (участок №12), который стер свою камеру и подбросил улики Кравцову.',
            isCorrect: false,
            reason: 'Противоречие: камеру зачистил Громов в 08:15, отпечаток со шрамом принадлежит Кравцову, а бункер под гаражом №14.'
          },
          {
            id: 'kravtsov_gromov',
            text: 'Неопровержимо доказано похищение и удержание Алины Виктором Кравцовым в бункере №14 при сокрытии улик участковым Громовым.',
            isCorrect: true,
            reason: 'Верно: цепь из 6 звеньев закрывает все лазейки для районного судьи и фиксирует состав преступления.'
          },
          {
            id: 'missing_case',
            text: 'Оснований для задержания недостаточно — следует закрыть дело как добровольный уход.',
            isCorrect: false,
            reason: 'Противоречие: ноготь, хлороформ, отпечаток на карабине, скрытый бункер и живой стук по трубе доказывают похищение.'
          }
        ]
      }
    };
  }

  function buildTlGenericScenario(config, storyNode) {
    var title = (config && config.title) || (storyNode && storyNode.title) || 'РЕКОНСТРУКЦИЯ ХРОНОЛОГИИ';
    var raw = Array.isArray(config && config.slots) && config.slots.length > 0
      ? config.slots
      : Array.isArray(config && config.events) && config.events.length > 0
      ? config.events
      : [
          { id: 'g_1', time: '21:00', title: 'Исходное событие (начало эпизода)', tag: 'ПРОТОКОЛ #1' },
          { id: 'g_2', time: '22:15', title: 'Ключевое криминальное действие', tag: 'ПРОТОКОЛ #2' },
          { id: 'g_3', time: '23:30', title: 'Попытка сокрытия следов преступления', tag: 'ПРОТОКОЛ #3' },
          { id: 'g_4', time: '01:00', title: 'Фиксация противоречия в алиби', tag: 'ПРОТОКОЛ #4' }
        ];
    var slots = raw.map(function (it, i) {
      return {
        id: it.id || ('ev_' + i),
        time: it.time || ('0' + i + ':00'),
        title: it.title || it.label || ('Событие #' + (i + 1)),
        tag: it.tag || it.evidence || 'ПРОТОКОЛ СК'
      };
    });
    return {
      id: 'generic_timeline',
      title: title,
      coverStamp: 'ПРЕДВАРИТЕЛЬНАЯ СВОДКА',
      coverText: 'Сдвиньте верхний лист в сторону, чтобы начать реконструкцию хронологии.',
      stampWin: 'ХРОНОЛОГИЯ ПОДТВЕРЖДЕНА',
      slots: slots,
      decoys: Array.isArray(config && config.decoys) ? config.decoys : [
        {
          id: 'gen_decoy',
          title: 'Неподтверждённая версия случайного совпадения',
          tag: 'ОШИБОЧНАЯ ВЕРСИЯ',
          rejectMsg: 'Верно отсеяно: эта версия противоречит собранным вещдокам.',
          slotErrMsg: 'ЛОЖНАЯ ВЕРСИЯ НА ДОСКЕ: отсейте неподтверждённую гипотезу!'
        }
      ],
      conclusion: (config && config.conclusion) || {
        question: 'Последовательность событий восстановлена без противоречий. Итог для следствия:',
        options: [
          { id: 'random', text: 'События не связаны между собой.', isCorrect: false, reason: 'Противоречие: временная шкала выстраивается в единую цепь.' },
          { id: 'ok', text: 'Хронология полностью подтверждает умышленную связь всех звеньев преступления.', isCorrect: true, reason: 'Верно: следственная картина собрана.' },
          { id: 'gap', text: 'Ключевое событие невозможно датировать.', isCorrect: false, reason: 'Противоречие: все временные слоты подтверждены уликами.' }
        ]
      }
    };
  }

  function resolveTlScenario(config) {
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

    if ((Array.isArray(cfg.slots) && cfg.slots.length > 0) || (Array.isArray(cfg.events) && cfg.events.length > 0)) {
      return buildTlGenericScenario(cfg, storyNode);
    }
    var hint = String(cfg.title || (storyNode && storyNode.title) || '');
    if (cfg.preset === 'case412' || caseId === 'case412' || nodeId === 'act6_mg_timeline' || /похищ/i.test(hint)) {
      return buildTlCase412Scenario(cfg);
    }
    if (cfg.preset === 'case418' || caseId === 'case418' || nodeId === 'act6_timeline_game') {
      return buildTlCase418Scenario(cfg);
    }
    return buildTlGenericScenario(cfg, storyNode);
  }

  function shuffleNonSolved(arr) {
    var copy = arr.slice();
    var rand = mulberry32((Date.now() ^ 41806) >>> 0);
    var i, j, tmp;
    for (i = copy.length - 1; i > 0; i--) {
      j = Math.floor(rand() * (i + 1));
      tmp = copy[i]; copy[i] = copy[j]; copy[j] = tmp;
    }
    var allSame = true;
    for (i = 0; i < copy.length; i++) {
      if (copy[i].id !== arr[i].id) { allSame = false; break; }
    }
    if (allSame && copy.length > 1) {
      tmp = copy[0]; copy[0] = copy[copy.length - 1]; copy[copy.length - 1] = tmp;
    }
    return copy;
  }


  function initTimelineReconstruct(containerEl, config, callbacks) {
    config = config || {};
    injectTlStyles();

    var timers = createTimerBag();
    var listeners = createListenerBag();
    var triggerWin = createWinTrigger(callbacks);
    var failFired = false;
    function triggerTlFail(res) {
      if (failFired) return;
      failFired = true;
      if (callbacks && typeof callbacks.onFail === 'function') {
        callbacks.onFail(res || { success: false });
      }
    }

    var scenario = resolveTlScenario(config);
    var maxErrors = typeof config.maxErrors === 'number' && config.maxErrors > 0 ? config.maxErrors : 4;
    var correctSeq = scenario.slots.slice();
    var decoys = (scenario.decoys || []).slice();

    var allCards = [];
    var cardById = {};
    var i;
    for (i = 0; i < correctSeq.length; i++) {
      var cObj = Object.assign({}, correctSeq[i], { isDecoy: false });
      allCards.push(cObj);
      cardById[cObj.id] = cObj;
    }
    for (i = 0; i < decoys.length; i++) {
      var dObj = Object.assign({}, decoys[i], { isDecoy: true });
      allCards.push(dObj);
      cardById[dObj.id] = dObj;
    }

    var placedIds = new Array(correctSeq.length);
    var slotVerdict = new Array(correctSeq.length);
    for (i = 0; i < correctSeq.length; i++) {
      placedIds[i] = null;
      slotVerdict[i] = null;
    }

    var poolOrder = shuffleNonSolved(allCards).map(function (c) { return c.id; });
    var rejectedIds = {};
    var selectedPoolId = null;
    var selectedSlotIdx = -1;
    var coverRemoved = false;
    var errorsCount = 0;
    var phase = 'board'; // 'board' | 'deduce' | 'fail'

    var shell = createShell(containerEl, {
      title: scenario.title,
      subtitle: '',
      extraClass: 'mg-tl-wrap'
    });

    shell.subEl.style.display = 'none';
    var metaRow = document.createElement('div');
    metaRow.className = 'mg-tl-meta';
    var statSlots = document.createElement('span');
    statSlots.className = 'mg-tl-stat';
    var statErr = document.createElement('span');
    statErr.className = 'mg-tl-err';
    metaRow.appendChild(statSlots);
    metaRow.appendChild(statErr);
    shell.subEl.parentNode.appendChild(metaRow);

    listeners.on(shell.cancelBtn, 'click', function () {
      haptic('light'); sfx('click');
      triggerCancel(callbacks);
    });

    var statusEl = document.createElement('div');
    statusEl.className = 'mg-f2-status';
    var statusText = document.createElement('span');
    statusText.textContent = 'Сдвиньте папку прикрытия, отсейте ложные версии и расставьте ' + correctSeq.length + ' звеньев.';
    statusEl.appendChild(statusText);
    shell.body.appendChild(statusEl);

    var coverWrap = document.createElement('div');
    coverWrap.className = 'mg-tl-cover-wrap';

    var board = document.createElement('div');
    board.className = 'mg-tl-board';
    var slotsContainer = document.createElement('div');
    slotsContainer.className = 'mg-tl-slots';
    board.appendChild(slotsContainer);
    coverWrap.appendChild(board);

    // Physical draggable cover folder blocking the board initially
    var folderSlip = document.createElement('div');
    folderSlip.className = 'mg-tl-folder-slip';
    var fStamp = document.createElement('div');
    fStamp.className = 'mg-tl-folder-stamp';
    fStamp.textContent = scenario.coverStamp;
    var fTxt = document.createElement('div');
    fTxt.className = 'mg-tl-folder-txt';
    fTxt.textContent = scenario.coverText;
    var fBtn = document.createElement('button');
    fBtn.type = 'button';
    fBtn.className = 'mg-f2-btn-sec is-active';
    fBtn.textContent = 'СДВИНУТЬ ПАПКУ ⇄';
    folderSlip.appendChild(fStamp);
    folderSlip.appendChild(fTxt);
    folderSlip.appendChild(fBtn);
    coverWrap.appendChild(folderSlip);
    shell.body.appendChild(coverWrap);

    var checkBtn = document.createElement('button');
    checkBtn.type = 'button';
    checkBtn.className = 'mg-f2-btn';
    checkBtn.textContent = 'ПРОВЕРИТЬ ХРОНОЛОГИЮ';
    checkBtn.disabled = true;
    shell.body.appendChild(checkBtn);

    var poolPanel = document.createElement('div');
    poolPanel.className = 'mg-f2-panel';
    var poolHead = document.createElement('div');
    poolHead.className = 'mg-f2-row';
    var poolLbl = document.createElement('span');
    poolLbl.className = 'mg-f2-label';
    poolLbl.textContent = 'КАРТОЧКИ (ПОСТАВЬТЕ В СЛОТ ИЛИ ОТСЕЙТЕ ЛОЖЬ)';
    var poolCount = document.createElement('span');
    poolCount.className = 'mg-f2-value';
    poolHead.appendChild(poolLbl);
    poolHead.appendChild(poolCount);
    poolPanel.appendChild(poolHead);

    var poolContainer = document.createElement('div');
    poolContainer.className = 'mg-tl-pool';
    poolPanel.appendChild(poolContainer);
    shell.body.appendChild(poolPanel);

    // Draggable folder peel logic
    var slipDragging = false, slipPtrId = null, slipStartX = 0;
    function peelFolder() {
      if (coverRemoved) return;
      coverRemoved = true;
      slipDragging = false;
      folderSlip.classList.remove('is-dragging');
      folderSlip.classList.add('is-peeled');
      checkBtn.disabled = false;
      haptic('medium'); sfx('paper');
      statusEl.className = 'mg-f2-status is-ok';
      statusText.textContent = 'Доска открыта! Отсейте ' + decoys.length + ' ложные версии и расставьте ' + correctSeq.length + ' событий.';
      timers.setTimeout(function () { folderSlip.style.display = 'none'; }, 270);
    }

    listeners.on(fBtn, 'pointerdown', function (e) { e.stopPropagation(); });
    listeners.on(fBtn, 'click', function (e) { e.stopPropagation(); peelFolder(); });
    listeners.on(folderSlip, 'pointerdown', function (e) {
      if (coverRemoved) return;
      slipDragging = true; slipPtrId = e.pointerId; slipStartX = e.clientX;
      folderSlip.classList.add('is-dragging');
      try { folderSlip.setPointerCapture(e.pointerId); } catch (err) {}
    });
    listeners.on(folderSlip, 'pointermove', function (e) {
      if (!slipDragging || coverRemoved || e.pointerId !== slipPtrId) return;
      var dx = e.clientX - slipStartX;
      folderSlip.style.transform = 'translate3d(' + dx + 'px, 0, 0) rotate(' + clamp(dx * 0.06, -12, 12) + 'deg)';
      folderSlip.style.opacity = String(clamp(1 - Math.abs(dx) / 150, 0.25, 1));
      if (Math.abs(dx) >= 48) peelFolder();
    });
    function endSlipDrag(e) {
      if (!slipDragging || (slipPtrId !== null && e.pointerId !== slipPtrId)) return;
      slipDragging = false; slipPtrId = null;
      if (!coverRemoved) {
        folderSlip.classList.remove('is-dragging');
        folderSlip.style.transform = ''; folderSlip.style.opacity = '';
      }
    }
    listeners.on(folderSlip, 'pointerup', endSlipDrag);
    listeners.on(folderSlip, 'pointercancel', endSlipDrag);

    function clearVerdicts() {
      for (var k = 0; k < slotVerdict.length; k++) slotVerdict[k] = null;
    }

    function countFilled() {
      var n = 0;
      for (var k = 0; k < placedIds.length; k++) if (placedIds[k]) n++;
      return n;
    }

    function syncHeaderMeta() {
      statSlots.textContent = 'СЛОТЫ: ' + countFilled() + ' / ' + correctSeq.length;
      statErr.textContent = 'ОШИБКИ: ' + errorsCount + ' / ' + maxErrors;
      statErr.classList.toggle('is-warn', errorsCount >= maxErrors - 1);
    }

    function showFailScreen(reason, msg) {
      phase = 'fail';
      statusEl.style.display = 'none';
      coverWrap.style.display = 'none';
      checkBtn.style.display = 'none';
      poolPanel.style.display = 'none';

      var box = document.createElement('div');
      box.className = 'mg-tl-stamp-box';
      var st = document.createElement('div');
      st.className = 'mg-tl-bigstamp';
      st.textContent = 'ПРОТОКОЛ ОТКЛОНЁН';
      var txt = document.createElement('div');
      txt.className = 'mg-tl-dq';
      txt.textContent = msg || 'Превышен лимит ошибок при реконструкции хронологии.';
      box.appendChild(st);
      box.appendChild(txt);
      shell.body.appendChild(box);
      timers.setTimeout(function () {
        triggerTlFail({ minigame: 'timeline_reconstruct', scenarioId: scenario.id, reason: reason, errors: errorsCount });
      }, 950);
    }

    function openDeductionPhase() {
      phase = 'deduce';
      statusEl.style.display = 'none';
      coverWrap.style.display = 'none';
      checkBtn.style.display = 'none';
      poolPanel.style.display = 'none';

      var card = document.createElement('div');
      card.className = 'mg-tl-deduce';
      var kicker = document.createElement('div');
      kicker.className = 'mg-tl-dkicker';
      kicker.textContent = 'ФАЗА 3 // ПОСТАНОВЛЕНИЕ ДЛЯ ПРОКУРОРА';
      card.appendChild(kicker);

      var facts = document.createElement('div');
      facts.className = 'mg-tl-dfacts';
      for (var k = 0; k < correctSeq.length; k++) {
        var row = document.createElement('div');
        row.textContent = correctSeq[k].time + ' — ' + correctSeq[k].title;
        facts.appendChild(row);
      }
      card.appendChild(facts);

      var q = document.createElement('div');
      q.className = 'mg-tl-dq';
      q.textContent = scenario.conclusion.question;
      card.appendChild(q);

      var optsWrap = document.createElement('div');
      optsWrap.className = 'mg-tl-dopts';
      var fb = document.createElement('div');
      fb.className = 'mg-tl-dfb';

      var settled = false;
      var opts = scenario.conclusion.options || [];
      for (var oi = 0; oi < opts.length; oi++) {
        (function (opt) {
          var ob = document.createElement('button');
          ob.type = 'button';
          ob.className = 'mg-tl-dopt';
          ob.textContent = opt.text;
          listeners.on(ob, 'click', function () {
            if (settled || phase !== 'deduce') return;
            if (opt.isCorrect) {
              settled = true;
              ob.classList.add('is-correct');
              fb.className = 'mg-tl-dfb is-ok';
              fb.textContent = opt.reason;
              haptic('success'); sfx('stamp');
              timers.setTimeout(function () {
                card.innerHTML = '';
                var box = document.createElement('div');
                box.className = 'mg-tl-stamp-box';
                var st = document.createElement('div');
                st.className = 'mg-tl-bigstamp is-ok';
                st.textContent = scenario.stampWin;
                var btnDone = document.createElement('button');
                btnDone.type = 'button';
                btnDone.className = 'mg-f2-btn is-ready';
                btnDone.textContent = 'ПЕРЕДАТЬ В ДЕЛО';
                listeners.on(btnDone, 'click', function () {
                  haptic('success'); sfx('success');
                  triggerWin({
                    minigame: 'timeline_reconstruct',
                    scenarioId: scenario.id,
                    order: placedIds.slice(),
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
              fb.className = 'mg-tl-dfb';
              fb.textContent = opt.reason;
              haptic('error'); sfx('alert');
              flashShake(card);
              if (errorsCount >= maxErrors) {
                settled = true;
                timers.setTimeout(function () {
                  showFailScreen('wrong_deduction', 'Лимит ошибок исчерпан — постановление отклонено.');
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

    function registerTlError(msg, reason) {
      errorsCount += 1;
      syncHeaderMeta();
      haptic('error'); sfx('alert');
      flashShake(board);
      statusEl.className = 'mg-f2-status is-err';
      statusText.textContent = msg;
      if (errorsCount >= maxErrors) {
        timers.setTimeout(function () { showFailScreen(reason || 'too_many_errors', msg); }, 620);
      }
    }

    function handleSlotClick(slotIdx) {
      if (phase !== 'board' || !coverRemoved) return;
      clearVerdicts();
      if (selectedPoolId) {
        placedIds[slotIdx] = selectedPoolId;
        selectedPoolId = null; selectedSlotIdx = -1;
        haptic('light'); sfx('click');
        renderBoard();
        return;
      }
      if (selectedSlotIdx !== -1) {
        if (selectedSlotIdx === slotIdx) {
          selectedSlotIdx = -1;
        } else {
          var tmp = placedIds[slotIdx];
          placedIds[slotIdx] = placedIds[selectedSlotIdx];
          placedIds[selectedSlotIdx] = tmp;
          selectedSlotIdx = -1;
        }
        haptic('light'); sfx('click');
        renderBoard();
        return;
      }
      if (placedIds[slotIdx]) {
        selectedSlotIdx = slotIdx;
        haptic('light'); sfx('click');
        statusEl.className = 'mg-f2-status is-warn';
        statusText.textContent = 'Нажмите другой слот для обмена или «×», чтобы вернуть в пул.';
        renderBoard();
      } else {
        haptic('light');
        statusEl.className = 'mg-f2-status';
        statusText.textContent = 'Сначала выберите карточку события в пуле ниже.';
      }
    }

    function handleRejectCard(evId, e) {
      if (e) e.stopPropagation();
      if (phase !== 'board' || !coverRemoved) return;
      var cardObj = cardById[evId];
      if (!cardObj) return;
      if (cardObj.isDecoy) {
        rejectedIds[evId] = true;
        if (selectedPoolId === evId) selectedPoolId = null;
        haptic('medium'); sfx('stamp');
        statusEl.className = 'mg-f2-status is-ok';
        statusText.textContent = cardObj.rejectMsg || 'Ложная версия отбракована!';
        renderBoard();
      } else {
        registerTlError('ОШИБКА ОТСЕВА (+1): «' + cardObj.title + '» — подлинное звено дела!', 'rejected_real');
      }
    }

    function renderBoard() {
      syncHeaderMeta();
      var filled = countFilled();
      checkBtn.classList.toggle('is-ready', coverRemoved && filled === correctSeq.length && phase === 'board');

      slotsContainer.innerHTML = '';
      for (var s = 0; s < correctSeq.length; s++) {
        (function (idx) {
          var row = document.createElement('div');
          var cls = 'mg-tl-slot';
          if (selectedSlotIdx === idx) cls += ' is-selected';
          if (slotVerdict[idx] === 'correct') cls += ' is-correct';
          if (slotVerdict[idx] === 'wrong') cls += ' is-wrong';
          row.className = cls;

          var timeBox = document.createElement('div');
          timeBox.className = 'mg-tl-time';
          timeBox.textContent = correctSeq[idx].time;
          row.appendChild(timeBox);

          var content = document.createElement('div');
          content.className = 'mg-tl-slot-content';
          var placedId = placedIds[idx];
          if (placedId && cardById[placedId]) {
            var evData = cardById[placedId];
            var tDiv = document.createElement('div');
            tDiv.className = 'mg-tl-card-title';
            tDiv.textContent = evData.title;
            var tagDiv = document.createElement('div');
            tagDiv.className = 'mg-tl-card-tag';
            tagDiv.textContent = evData.tag;
            content.appendChild(tDiv);
            content.appendChild(tagDiv);
          } else {
            var ph = document.createElement('div');
            ph.className = 'mg-tl-placeholder';
            ph.textContent = selectedPoolId ? '→ НАЖМИТЕ, ЧТОБЫ ПОМЕСТИТЬ СЮДА' : '[ ПУСТОЙ СЛОТ ВРЕМЕНИ ]';
            content.appendChild(ph);
          }
          row.appendChild(content);

          if (placedId && phase === 'board') {
            var clearBtn = document.createElement('button');
            clearBtn.type = 'button';
            clearBtn.className = 'mg-tl-clear';
            clearBtn.textContent = '×';
            clearBtn.addEventListener('click', function (e) {
              e.stopPropagation();
              clearVerdicts();
              placedIds[idx] = null;
              if (selectedSlotIdx === idx) selectedSlotIdx = -1;
              haptic('light'); sfx('click');
              renderBoard();
            });
            row.appendChild(clearBtn);
          }

          row.addEventListener('click', function () { handleSlotClick(idx); });
          slotsContainer.appendChild(row);
        })(s);
      }

      poolContainer.innerHTML = '';
      var remaining = 0;
      for (var p = 0; p < poolOrder.length; p++) {
        var cid = poolOrder[p];
        if (rejectedIds[cid] || placedIds.indexOf(cid) !== -1) continue;
        remaining += 1;
        (function (id) {
          var evData = cardById[id];
          var wrapRow = document.createElement('div');
          wrapRow.className = 'mg-tl-card-row';

          var card = document.createElement('div');
          card.className = 'mg-tl-card' + (selectedPoolId === id ? ' is-selected' : '');
          var tDiv = document.createElement('div');
          tDiv.className = 'mg-tl-card-title';
          tDiv.textContent = evData.title;
          var tagDiv = document.createElement('div');
          tagDiv.className = 'mg-tl-card-tag';
          tagDiv.textContent = evData.tag;
          card.appendChild(tDiv);
          card.appendChild(tagDiv);

          card.addEventListener('click', function () {
            if (phase !== 'board' || !coverRemoved) return;
            clearVerdicts();
            if (selectedSlotIdx !== -1) {
              placedIds[selectedSlotIdx] = id;
              selectedSlotIdx = -1; selectedPoolId = null;
            } else {
              selectedPoolId = selectedPoolId === id ? null : id;
            }
            haptic('light'); sfx('click');
            renderBoard();
          });

          var rejBtn = document.createElement('button');
          rejBtn.type = 'button';
          rejBtn.className = 'mg-tl-reject-btn';
          rejBtn.innerHTML = '<span>✕</span><span>ЛОЖЬ</span>';
          rejBtn.addEventListener('click', function (e) { handleRejectCard(id, e); });

          wrapRow.appendChild(card);
          wrapRow.appendChild(rejBtn);
          poolContainer.appendChild(wrapRow);
        })(cid);
      }

      poolCount.textContent = 'В ПУЛЕ: ' + remaining;
      poolPanel.style.display = remaining === 0 ? 'none' : 'flex';
    }

    listeners.on(checkBtn, 'click', function () {
      if (phase !== 'board' || !coverRemoved) return;
      var filled = countFilled();
      if (filled < correctSeq.length) {
        haptic('light');
        statusEl.className = 'mg-f2-status is-warn';
        statusText.textContent = 'Заполните все ' + correctSeq.length + ' временных слотов (' + filled + ' из ' + correctSeq.length + ').';
        return;
      }

      selectedPoolId = null; selectedSlotIdx = -1;
      var wrongCount = 0;
      var decoyPlacedMsg = '';
      for (var k = 0; k < correctSeq.length; k++) {
        var pid = placedIds[k];
        if (pid === correctSeq[k].id) {
          slotVerdict[k] = 'correct';
        } else {
          slotVerdict[k] = 'wrong';
          wrongCount += 1;
          if (cardById[pid] && cardById[pid].isDecoy && !decoyPlacedMsg) {
            decoyPlacedMsg = cardById[pid].slotErrMsg || 'ЛОЖНАЯ ВЕРСИЯ НА ДОСКЕ — отсейте её кнопкой «✕ ЛОЖЬ»!';
          }
        }
      }

      renderBoard();
      if (wrongCount === 0) {
        checkBtn.disabled = true;
        statusEl.className = 'mg-f2-status is-ok';
        statusText.textContent = 'Все 6 звеньев сошлись идеально! Переход к постановлению...';
        haptic('success'); sfx('success');
        timers.setTimeout(function () {
          if (phase === 'board') openDeductionPhase();
        }, 720);
      } else {
        var msg = decoyPlacedMsg || ('Нарушена хронология (+1 ошибка): не на своих местах — ' + wrongCount + ' слот(а).');
        registerTlError(msg, 'wrong_timeline');
      }
    });

    renderBoard();
    return function cleanup() {
      timers.clearAll();
      listeners.clearAll();
      containerEl.innerHTML = '';
    };
  }

  // ============================================================================
  // REGISTRATION
  // ============================================================================

  window.GameMinigames.register('dental_xray', initDentalXray);
  window.GameMinigames.register('doc_forgery', initDocForgery);
  window.GameMinigames.register('timeline_reconstruct', initTimelineReconstruct);
})();
