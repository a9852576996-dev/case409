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
  // MINIGAME 1: dental_xray (Сверка рентгена и зубной карты — Морг, Акт 2)
  // ============================================================================

  var DEFAULT_DENTAL_TEETH = [
    {
      num: '17',
      shape: 'molar',
      clinicType: 'rootcanal',
      bodyType: 'rootcanal',
      isMismatch: false
    },
    {
      num: '16',
      shape: 'molar',
      clinicType: 'implant',
      bodyType: 'normal',
      isMismatch: true,
      shortDesc: 'Зуб 16: нет импланта',
      desc: 'Зуб 16: в карте Сафонова — титановый имплант, у тела свой целый моляр'
    },
    {
      num: '14',
      shape: 'premolar',
      clinicType: 'filling',
      bodyType: 'filling',
      isMismatch: false
    },
    {
      num: '12',
      shape: 'incisor',
      clinicType: 'normal',
      bodyType: 'normal',
      isMismatch: false
    },
    {
      num: '11',
      shape: 'incisor',
      clinicType: 'normal',
      bodyType: 'normal',
      isMismatch: false
    },
    {
      num: '21',
      shape: 'incisor',
      clinicType: 'normal',
      bodyType: 'normal',
      isMismatch: false
    },
    {
      num: '24',
      shape: 'premolar',
      clinicType: 'missing',
      bodyType: 'normal',
      isMismatch: true,
      shortDesc: 'Зуб 24: зуб на месте',
      desc: 'Зуб 24: по карте удалён в 2019 году, но у тела зуб на месте'
    },
    {
      num: '26',
      shape: 'molar',
      clinicType: 'filling',
      bodyType: 'filling',
      isMismatch: false
    },
    {
      num: '36',
      shape: 'molar',
      clinicType: 'normal',
      bodyType: 'crown',
      isMismatch: true,
      shortDesc: 'Зуб 36: новая коронка',
      desc: 'Зуб 36: у тела свежая металлокерамическая коронка, отсутствующая в карте'
    },
    {
      num: '37',
      shape: 'molar',
      clinicType: 'normal',
      bodyType: 'normal',
      isMismatch: false
    }
  ];

  function drawToothXray(ctx, cx, gumY, cellW, toothH, shape, type, palette, rootUp) {
    var dir = rootUp ? -1 : 1;
    var crownW = shape === 'molar' ? cellW * 0.78 : shape === 'premolar' ? cellW * 0.64 : cellW * 0.56;
    var crownH = toothH * 0.44;
    var rootH = toothH * 0.56;
    var halfW = crownW / 2;

    ctx.save();
    ctx.translate(cx, gumY);

    if (type === 'missing') {
      // Empty healed alveolar socket gap
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
      // Bright radiopaque threaded titanium screw post in alveolar bone
      var screwW = crownW * 0.42;
      var screwLen = rootH * 0.92;
      ctx.fillStyle = palette.metal;
      ctx.fillRect(-screwW / 2, dir > 0 ? 0 : -screwLen, screwW, screwLen);

      // Screw threads
      ctx.strokeStyle = palette.metalDetail;
      ctx.lineWidth = 1.2;
      for (var t = 4; t < screwLen - 2; t += 4.5) {
        var ty = dir * t;
        ctx.beginPath();
        ctx.moveTo(-screwW * 0.68, ty);
        ctx.lineTo(screwW * 0.68, ty + dir * 1.5);
        ctx.stroke();
      }

      // Prosthetic abutment & bright crown cap
      ctx.fillStyle = palette.metalBright;
      ctx.beginPath();
      ctx.roundRect
        ? ctx.roundRect(-halfW * 0.94, dir > 0 ? -crownH : 0, crownW * 0.94, crownH, 4)
        : ctx.rect(-halfW * 0.94, dir > 0 ? -crownH : 0, crownW * 0.94, crownH);
      ctx.fill();
      ctx.strokeStyle = palette.metalEdge;
      ctx.lineWidth = 1.1;
      ctx.stroke();

      // Collar ring
      ctx.fillStyle = palette.metalDetail;
      ctx.fillRect(-screwW * 0.62, -1.5, screwW * 1.24, 3);
      ctx.restore();
      return;
    }

    // Roots (double root for molars, single tapered root for premolars/incisors)
    ctx.fillStyle = palette.dentin;
    ctx.strokeStyle = palette.outline;
    ctx.lineWidth = 1;

    if (shape === 'molar') {
      // Left root
      ctx.beginPath();
      ctx.moveTo(-halfW * 0.72, 0);
      ctx.quadraticCurveTo(-halfW * 0.85, dir * rootH * 0.55, -halfW * 0.42, dir * rootH);
      ctx.quadraticCurveTo(-halfW * 0.14, dir * rootH * 0.55, -halfW * 0.05, dir * rootH * 0.18);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Right root
      ctx.beginPath();
      ctx.moveTo(halfW * 0.72, 0);
      ctx.quadraticCurveTo(halfW * 0.85, dir * rootH * 0.55, halfW * 0.42, dir * rootH);
      ctx.quadraticCurveTo(halfW * 0.14, dir * rootH * 0.55, halfW * 0.05, dir * rootH * 0.18);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(-halfW * 0.68, 0);
      ctx.quadraticCurveTo(-halfW * 0.42, dir * rootH * 0.75, 0, dir * rootH);
      ctx.quadraticCurveTo(halfW * 0.42, dir * rootH * 0.75, halfW * 0.68, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Crown enamel body
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
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Dark translucent pulp chamber (not visible inside radiopaque metal-ceramic crown)
    if (type !== 'crown') {
      ctx.fillStyle = palette.pulp;
      ctx.beginPath();
      ctx.ellipse(0, -dir * crownH * 0.34, halfW * 0.28, crownH * 0.24, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Dental work overlays
    if (type === 'crown') {
      // Inner metallic coping sheen lines on metal-ceramic crown
      ctx.strokeStyle = palette.metalDetail;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(-halfW * 0.72, -dir * 3);
      ctx.lineTo(halfW * 0.72, -dir * 3);
      ctx.stroke();
      ctx.fillStyle = palette.metal;
      ctx.fillRect(-halfW * 0.62, cyTop + (dir > 0 ? 4 : crownH - 9), crownW * 0.62, 5);
    } else if (type === 'filling') {
      // Bright radiopaque occlusal filling spot
      ctx.fillStyle = palette.metalBright;
      ctx.beginPath();
      ctx.ellipse(halfW * 0.16, -dir * crownH * 0.72, halfW * 0.42, crownH * 0.24, -0.2, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === 'rootcanal') {
      // Bright gutta-percha lines inside roots
      ctx.strokeStyle = palette.metalBright;
      ctx.lineWidth = 1.5;
      if (shape === 'molar') {
        ctx.beginPath();
        ctx.moveTo(-halfW * 0.22, -dir * crownH * 0.3);
        ctx.lineTo(-halfW * 0.45, dir * rootH * 0.88);
        ctx.moveTo(halfW * 0.22, -dir * crownH * 0.3);
        ctx.lineTo(halfW * 0.45, dir * rootH * 0.88);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(0, -dir * crownH * 0.3);
        ctx.lineTo(0, dir * rootH * 0.88);
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  function initDentalXray(containerEl, config, callbacks) {
    config = config || {};
    var timers = createTimerBag();
    var listeners = createListenerBag();
    var triggerWin = createWinTrigger(callbacks);
    var finished = false;

    var rawTeeth =
      Array.isArray(config.teeth) && config.teeth.length > 0
        ? config.teeth
        : DEFAULT_DENTAL_TEETH;

    var teeth = rawTeeth.map(function (t, idx) {
      return {
        num: String(t.num || (11 + idx)),
        shape: t.shape || 'molar',
        clinicType: t.clinicType || 'normal',
        bodyType: t.bodyType || 'normal',
        isMismatch: !!t.isMismatch,
        shortDesc: t.shortDesc || 'Зуб ' + (t.num || idx + 1) + ': расхождение',
        desc: t.desc || 'Выявлено несовпадение по зубу ' + (t.num || idx + 1),
        found: false,
        errFlash: 0
      };
    });

    var totalMismatches = 0;
    for (var i = 0; i < teeth.length; i++) {
      if (teeth[i].isMismatch) totalMismatches++;
    }
    if (totalMismatches === 0) totalMismatches = 3;

    var shell = createShell(containerEl, {
      title: config.title || 'Сверка рентгена и карты',
      subtitle: config.subtitle || 'ДЕЛО №418 • МОРГ • ОПОЗНАНИЕ ТЕЛА',
      extraClass: 'mg-xray-wrap'
    });

    listeners.on(shell.cancelBtn, 'click', function () {
      haptic('light');
      sfx('click');
      triggerCancel(callbacks);
    });

    // Negatoscope canvas stage
    var stage = document.createElement('div');
    stage.className = 'mg-f2-stage mg-xray-stage';
    var canvas = document.createElement('canvas');
    canvas.className = 'mg-f2-canvas';
    stage.appendChild(canvas);
    shell.body.appendChild(stage);

    // Status row
    var statusEl = document.createElement('div');
    statusEl.className = 'mg-f2-status';
    var statusText = document.createElement('span');
    statusText.textContent = 'Нажмите на ' + totalMismatches + ' несовпадения на снимке тела';
    var countBadge = document.createElement('span');
    countBadge.className = 'mg-f2-value';
    countBadge.textContent = '0 / ' + totalMismatches;
    statusEl.appendChild(statusText);
    statusEl.appendChild(countBadge);
    shell.body.appendChild(statusEl);

    // Controls panel
    var panel = document.createElement('div');
    panel.className = 'mg-f2-panel';

    var modesRow = document.createElement('div');
    modesRow.className = 'mg-xray-modes';
    var modeDefs = [
      { id: 'light', label: 'СВЕТ' },
      { id: 'negative', label: 'НЕГАТИВ' },
      { id: 'overlay', label: 'НАЛОЖЕНИЕ' }
    ];
    var modeBtns = {};
    var viewMode = 'light';
    var overlayAlpha = 0.55;

    function updateModeUI() {
      for (var k in modeBtns) {
        if (Object.prototype.hasOwnProperty.call(modeBtns, k)) {
          if (k === viewMode) {
            modeBtns[k].classList.add('is-active');
          } else {
            modeBtns[k].classList.remove('is-active');
          }
        }
      }
      overlayVal.textContent =
        viewMode === 'overlay' ? Math.round(overlayAlpha * 100) + '%' : 'ВЫКЛ';
    }

    for (i = 0; i < modeDefs.length; i++) {
      (function (md) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'mg-f2-btn-sec';
        btn.textContent = md.label;
        listeners.on(btn, 'click', function () {
          if (finished) return;
          viewMode = md.id;
          haptic('light');
          sfx('click');
          updateModeUI();
        });
        modesRow.appendChild(btn);
        modeBtns[md.id] = btn;
      })(modeDefs[i]);
    }
    panel.appendChild(modesRow);

    var sliderWrap = document.createElement('div');
    sliderWrap.className = 'mg-f2-slider-wrap';
    var sliderRow = document.createElement('div');
    sliderRow.className = 'mg-f2-row';
    var sliderLbl = document.createElement('span');
    sliderLbl.className = 'mg-f2-label';
    sliderLbl.textContent = 'ПРОЗРАЧНОСТЬ НАЛОЖЕНИЯ КАРТЫ';
    var overlayVal = document.createElement('span');
    overlayVal.className = 'mg-f2-value';
    overlayVal.textContent = 'ВЫКЛ';
    sliderRow.appendChild(sliderLbl);
    sliderRow.appendChild(overlayVal);

    var overlaySlider = document.createElement('input');
    overlaySlider.type = 'range';
    overlaySlider.className = 'mg-f2-slider';
    overlaySlider.min = '0';
    overlaySlider.max = '100';
    overlaySlider.step = '1';
    overlaySlider.value = '55';

    sliderWrap.appendChild(sliderRow);
    sliderWrap.appendChild(overlaySlider);
    panel.appendChild(sliderWrap);

    // 3 mismatch checklist pills
    var foundList = document.createElement('div');
    foundList.className = 'mg-xray-found-list';
    foundList.style.gridTemplateColumns = 'repeat(' + Math.min(totalMismatches, 3) + ', 1fr)';
    var pills = [];
    for (i = 0; i < totalMismatches; i++) {
      var pill = document.createElement('div');
      pill.className = 'mg-f2-pill';
      pill.textContent = 'НЕСОВПАДЕНИЕ #' + (i + 1);
      foundList.appendChild(pill);
      pills.push(pill);
    }
    panel.appendChild(foundList);
    shell.body.appendChild(panel);

    updateModeUI();

    listeners.on(overlaySlider, 'input', function () {
      if (finished) return;
      overlayAlpha = clamp((parseInt(overlaySlider.value, 10) || 0) / 100, 0, 1);
      if (viewMode !== 'overlay') {
        viewMode = 'overlay';
      }
      updateModeUI();
    });

    var canvasMgr = setupResponsiveCanvas(canvas, stage);
    var hoverIndex = -1;
    var foundCount = 0;
    var globalErrFlash = 0;
    var lastTs = performance.now();

    function getToothRects(w, h) {
      var padX = 16;
      var innerW = w - padX * 2;
      var cellW = innerW / teeth.length;
      var rects = [];
      for (var k = 0; k < teeth.length; k++) {
        var cx = padX + cellW * (k + 0.5);
        if (viewMode === 'overlay') {
          rects.push({
            index: k,
            x: padX + cellW * k,
            y: h * 0.20,
            w: cellW,
            h: h * 0.64,
            cx: cx
          });
        } else {
          // Clickable area covers body scan (bottom half) and corresponding column
          rects.push({
            index: k,
            x: padX + cellW * k,
            y: h * 0.50,
            w: cellW,
            h: h * 0.44,
            cx: cx
          });
        }
      }
      return rects;
    }

    function pickToothAt(clientX, clientY) {
      var rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return -1;
      var x = clientX - rect.left;
      var y = clientY - rect.top;
      var boxes = getToothRects(rect.width, rect.height);
      for (var k = 0; k < boxes.length; k++) {
        var b = boxes[k];
        if (x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) {
          return k;
        }
      }
      return -1;
    }

    listeners.on(canvas, 'pointermove', function (ev) {
      if (finished) return;
      hoverIndex = pickToothAt(ev.clientX, ev.clientY);
    });

    listeners.on(canvas, 'pointerleave', function () {
      hoverIndex = -1;
    });

    listeners.on(canvas, 'pointerdown', function (ev) {
      if (finished) return;
      var idx = pickToothAt(ev.clientX, ev.clientY);
      if (idx === -1) {
        // Gentle hint if user tapped the upper clinic reference instead of lower body X-ray
        var rect = canvas.getBoundingClientRect();
        if (viewMode !== 'overlay' && ev.clientY - rect.top < rect.height * 0.5) {
          statusEl.className = 'mg-f2-status is-warn';
          statusText.textContent = 'Кликайте по несовпадениям на нижнем СНИМКЕ ТЕЛА';
          haptic('light');
        }
        return;
      }

      var tooth = teeth[idx];
      if (tooth.found) {
        statusEl.className = 'mg-f2-status is-ok';
        statusText.textContent = 'Уже зафиксировано: ' + tooth.desc;
        return;
      }

      if (tooth.isMismatch) {
        tooth.found = true;
        foundCount++;
        haptic('medium');
        sfx('scan');

        if (pills[foundCount - 1]) {
          pills[foundCount - 1].classList.add('is-mismatch');
          pills[foundCount - 1].textContent = tooth.shortDesc;
        }
        countBadge.textContent = foundCount + ' / ' + totalMismatches;

        if (foundCount >= totalMismatches) {
          finished = true;
          countBadge.classList.add('is-ok');
          statusEl.className = 'mg-f2-status is-err';
          statusText.textContent = 'ЛИЧНОСТЬ НЕ ПОДТВЕРЖДЕНА: ЭТО НЕ САФОНОВ!';
          timers.setTimeout(function () {
            haptic('success');
            sfx('success');
            triggerWin({
              minigame: 'dental_xray',
              mismatches: teeth
                .filter(function (t) {
                  return t.isMismatch;
                })
                .map(function (t) {
                  return t.num;
                })
            });
          }, 1000);
        } else {
          statusEl.className = 'mg-f2-status is-ok';
          statusText.textContent = tooth.desc;
        }
      } else {
        tooth.errFlash = 1;
        globalErrFlash = 0.7;
        haptic('error');
        sfx('error');
        flashShake(stage);
        statusEl.className = 'mg-f2-status is-err';
        statusText.textContent = 'Зуб ' + tooth.num + ': СОВПАДАЕТ С КАРТОЙ';
      }
    });

    function getPalettes(isNeg) {
      if (isNeg) {
        return {
          bgTop: '#cbd5e1',
          bgBot: '#94a3b8',
          bone: 'rgba(100, 116, 139, 0.34)',
          grid: 'rgba(15, 23, 42, 0.12)',
          label: '#0f172a',
          subLabel: '#1e293b',
          tooth: {
            enamel: 'rgba(30, 41, 59, 0.85)',
            dentin: 'rgba(51, 65, 85, 0.65)',
            pulp: 'rgba(203, 213, 225, 0.55)',
            outline: 'rgba(15, 23, 42, 0.92)',
            metal: '#020617',
            metalBright: '#090d16',
            metalDetail: '#64748b',
            metalEdge: '#000000',
            missingStroke: 'rgba(15, 23, 42, 0.48)',
            missingText: 'rgba(15, 23, 42, 0.72)'
          }
        };
      }
      return {
        bgTop: '#06111e',
        bgBot: '#0a1e33',
        bone: 'rgba(56, 130, 196, 0.15)',
        grid: 'rgba(125, 211, 252, 0.08)',
        label: '#bae6fd',
        subLabel: '#7dd3fc',
        tooth: {
          enamel: 'rgba(186, 230, 253, 0.62)',
          dentin: 'rgba(125, 211, 252, 0.34)',
          pulp: 'rgba(7, 22, 40, 0.72)',
          outline: 'rgba(224, 242, 254, 0.82)',
          metal: '#e0f2fe',
          metalBright: '#ffffff',
          metalDetail: '#0c4a6e',
          metalEdge: '#7dd3fc',
          missingStroke: 'rgba(125, 211, 252, 0.35)',
          missingText: 'rgba(125, 211, 252, 0.65)'
        },
        overlayClinic: {
          enamel: 'rgba(245, 158, 11, 0.58)',
          dentin: 'rgba(201, 138, 46, 0.36)',
          pulp: 'rgba(30, 18, 5, 0.45)',
          outline: 'rgba(253, 224, 71, 0.9)',
          metal: '#fde047',
          metalBright: '#fef08a',
          metalDetail: '#78350f',
          metalEdge: '#f59e0b',
          missingStroke: 'rgba(251, 191, 36, 0.8)',
          missingText: 'rgba(253, 224, 71, 0.95)'
        }
      };
    }

    function render(now) {
      var dt = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;

      if (globalErrFlash > 0) globalErrFlash = Math.max(0, globalErrFlash - dt * 2.8);
      for (var tIdx = 0; tIdx < teeth.length; tIdx++) {
        if (teeth[tIdx].errFlash > 0) {
          teeth[tIdx].errFlash = Math.max(0, teeth[tIdx].errFlash - dt * 2.4);
        }
      }

      var metrics = canvasMgr.getMetrics();
      var w = metrics.width;
      var h = metrics.height;
      var dpr = metrics.dpr;
      var ctx = canvas.getContext('2d');
      var isNeg = viewMode === 'negative';
      var pal = getPalettes(isNeg);

      ctx.save();
      ctx.scale(dpr, dpr);

      // Negatoscope backlit screen gradient
      var bgGrad = ctx.createRadialGradient(w / 2, h / 2, 20, w / 2, h / 2, Math.max(w, h) * 0.72);
      bgGrad.addColorStop(0, pal.bgBot);
      bgGrad.addColorStop(1, pal.bgTop);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Subtle radiology vertical calibration lines
      var padX = 16;
      var innerW = w - padX * 2;
      var cellW = innerW / teeth.length;

      ctx.strokeStyle = pal.grid;
      ctx.lineWidth = 1;
      for (var k = 0; k <= teeth.length; k++) {
        var gx = padX + k * cellW;
        ctx.beginPath();
        ctx.moveTo(gx, 22);
        ctx.lineTo(gx, h - 14);
        ctx.stroke();
      }

      // Radiological R / L side markers
      ctx.font = '700 10px "IBM Plex Mono", monospace';
      ctx.fillStyle = pal.subLabel;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'left';
      ctx.fillText('R', 5, h * 0.5);
      ctx.textAlign = 'right';
      ctx.fillText('L', w - 5, h * 0.5);

      if (viewMode === 'overlay') {
        // OVERLAY MODE: Single large jaw comparing Body (blue-white) + Clinic (translucent amber)
        ctx.font = '600 9.5px "IBM Plex Mono", monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillStyle = '#bae6fd';
        ctx.fillText('НАЛОЖЕНИЕ: ТЕЛО (СИНИЙ) + КАРТА САФОНОВА (ЯНТАРЬ)', 14, 7);

        var gumY = h * 0.55;
        var toothH = Math.min(h * 0.44, 118);

        // Jawbone arch contour
        ctx.fillStyle = pal.bone;
        ctx.fillRect(padX, gumY - toothH * 0.62, innerW, toothH * 0.66);

        for (k = 0; k < teeth.length; k++) {
          var th = teeth[k];
          var cx = padX + cellW * (k + 0.5);

          // Highlight hover / found / error
          if (hoverIndex === k && !finished) {
            ctx.fillStyle = 'rgba(245, 158, 11, 0.09)';
            ctx.fillRect(padX + k * cellW + 1, h * 0.19, cellW - 2, h * 0.66);
          }

          // 1. Draw Body X-ray tooth
          drawToothXray(ctx, cx, gumY, cellW, toothH, th.shape, th.bodyType, pal.tooth, true);

          // 2. Overlay Clinic Chart tooth with slider opacity
          if (overlayAlpha > 0.01) {
            ctx.save();
            ctx.globalAlpha = overlayAlpha;
            drawToothXray(ctx, cx, gumY, cellW, toothH, th.shape, th.clinicType, pal.overlayClinic, true);
            ctx.restore();
          }

          // Tooth FDI number
          ctx.font = '600 10px "IBM Plex Mono", monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillStyle = th.found ? '#f87171' : '#93c5fd';
          ctx.fillText(th.num, cx, gumY + toothH * 0.48);

          if (th.found) {
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 2;
            ctx.strokeRect(padX + k * cellW + 2, h * 0.21, cellW - 4, h * 0.62);
          } else if (th.errFlash > 0.02) {
            ctx.fillStyle = 'rgba(220, 38, 38, ' + (th.errFlash * 0.35).toFixed(2) + ')';
            ctx.fillRect(padX + k * cellW + 2, h * 0.21, cellW - 4, h * 0.62);
          }
        }
      } else {
        // SPLIT MODE (СВЕТ / НЕГАТИВ): Top = Clinic Chart, Bottom = Body X-ray
        var midY = h * 0.50;

        // Horizontal divider
        ctx.strokeStyle = isNeg ? 'rgba(15, 23, 42, 0.42)' : 'rgba(125, 211, 252, 0.35)';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(10, midY);
        ctx.lineTo(w - 10, midY);
        ctx.stroke();

        // Top section header: Clinic Chart
        ctx.font = '600 9.5px "IBM Plex Mono", monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillStyle = pal.label;
        ctx.fillText('КАРТА О. САФОНОВА (КЛИНИКА, 2019)', 14, 6);

        // Bottom section header: Body X-Ray
        ctx.fillStyle = isNeg ? '#991b1b' : '#f59e0b';
        ctx.fillText('СНИМОК ТЕЛА ИЗ ДОМА (#418-Т) — НАЖМИТЕ НА НЕСОВПАДЕНИЯ', 14, midY + 5);

        var topGumY = h * 0.31;
        var botGumY = h * 0.77;
        var splitToothH = Math.min(h * 0.26, 68);

        // Subtle alveolar jawbone strips
        ctx.fillStyle = pal.bone;
        ctx.fillRect(padX, topGumY - splitToothH * 0.58, innerW, splitToothH * 0.60);
        ctx.fillRect(padX, botGumY - splitToothH * 0.58, innerW, splitToothH * 0.60);

        for (k = 0; k < teeth.length; k++) {
          var tooth = teeth[k];
          var tcx = padX + cellW * (k + 0.5);

          // Column highlight on hover
          if (hoverIndex === k && !finished) {
            ctx.fillStyle = isNeg ? 'rgba(15, 23, 42, 0.10)' : 'rgba(245, 158, 11, 0.10)';
            ctx.fillRect(padX + k * cellW + 1, 22, cellW - 2, h - 30);
          }

          // Top: Safonov Clinic Chart tooth
          drawToothXray(ctx, tcx, topGumY, cellW, splitToothH, tooth.shape, tooth.clinicType, pal.tooth, true);

          // Center FDI number between charts
          ctx.font = '600 9px "IBM Plex Mono", monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = tooth.found ? '#ef4444' : pal.subLabel;
          ctx.fillText(tooth.num, tcx, midY - 7);

          // Bottom: Body from the burned house tooth
          drawToothXray(ctx, tcx, botGumY, cellW, splitToothH, tooth.shape, tooth.bodyType, pal.tooth, true);

          // Found mismatch marker box on lower body X-ray
          if (tooth.found) {
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 2;
            ctx.strokeRect(padX + k * cellW + 2, midY + 19, cellW - 4, h - midY - 26);
          } else if (tooth.errFlash > 0.02) {
            ctx.fillStyle = 'rgba(220, 38, 38, ' + (tooth.errFlash * 0.35).toFixed(2) + ')';
            ctx.fillRect(padX + k * cellW + 2, midY + 19, cellW - 4, h - midY - 26);
          }
        }
      }

      // Red mismatch error edge flash
      if (globalErrFlash > 0.01) {
        ctx.fillStyle = 'rgba(220, 38, 38, ' + (globalErrFlash * 0.28).toFixed(3) + ')';
        ctx.fillRect(0, 0, w, h);
      }

      // Final forensic red stamp when all 3 discrepancies are confirmed
      if (finished) {
        ctx.fillStyle = 'rgba(9, 11, 16, 0.62)';
        ctx.fillRect(0, 0, w, h);

        ctx.save();
        ctx.translate(w / 2, h / 2);
        ctx.rotate(-0.09);
        var stW = Math.min(w - 28, 316);
        var stH = 54;
        ctx.fillStyle = 'rgba(69, 10, 10, 0.92)';
        ctx.fillRect(-stW / 2, -stH / 2, stW, stH);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2.6;
        ctx.strokeRect(-stW / 2, -stH / 2, stW, stH);
        ctx.strokeStyle = 'rgba(248, 113, 113, 0.5)';
        ctx.lineWidth = 1;
        ctx.strokeRect(-stW / 2 + 4, -stH / 2 + 4, stW - 8, stH - 8);

        ctx.fillStyle = '#fca5a5';
        ctx.font = '700 13px "Oswald", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('ЛИЧНОСТЬ НЕ ПОДТВЕРЖДЕНА:', 0, -9);
        ctx.fillStyle = '#fef2f2';
        ctx.font = '700 15px "Oswald", sans-serif';
        ctx.fillText('ЭТО НЕ САФОНОВ', 0, 11);
        ctx.restore();
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
  // MINIGAME 2: doc_forgery (Лупа 2.2x и УФ-лампа — режимы 'doc' | 'lock')
  // ============================================================================

  var DEFAULT_DOC_DEFECTS = [
    {
      id: 'date_etch',
      label: 'Химическое травление в графе даты',
      shortLabel: 'УФ: Травление даты',
      x: 0.27,
      y: 0.26,
      requiredLight: 'uv',
      radius: 0.095
    },
    {
      id: 'sig_indent',
      label: 'Продавленный след обводки на подписи',
      shortLabel: 'Косой: Обводка подписи',
      x: 0.72,
      y: 0.74,
      requiredLight: 'oblique',
      radius: 0.10
    },
    {
      id: 'seal_micro',
      label: 'Подмена шрифта и микротекста печати',
      shortLabel: 'Белый: Шрифт/печать',
      x: 0.30,
      y: 0.74,
      requiredLight: 'white',
      radius: 0.10
    }
  ];

  var DEFAULT_LOCK_DEFECTS = [
    {
      id: 'tension_scratch',
      label: 'Поперечные царапины от натяжителя',
      shortLabel: 'Косой: Натяжитель',
      x: 0.24,
      y: 0.65,
      requiredLight: 'oblique',
      radius: 0.095
    },
    {
      id: 'pin3_burr',
      label: 'Заусенец на 3-м пине от отмычки',
      shortLabel: 'Косой: Заусенец пина #3',
      x: 0.65,
      y: 0.45,
      requiredLight: 'oblique',
      radius: 0.095
    },
    {
      id: 'graphite_uv',
      label: 'Следы графитовой смазки на торце',
      shortLabel: 'УФ: Графитовая смазка',
      x: 0.24,
      y: 0.29,
      requiredLight: 'uv',
      radius: 0.095
    }
  ];

  function buildDocCanvases(defects) {
    var W = 960;
    var H = 720;
    var cWhite = document.createElement('canvas');
    var cOblique = document.createElement('canvas');
    var cUv = document.createElement('canvas');
    cWhite.width = cOblique.width = cUv.width = W;
    cWhite.height = cOblique.height = cUv.height = H;

    function getDefect(id, fx, fy) {
      for (var k = 0; k < defects.length; k++) {
        if (defects[k].id === id) return { x: defects[k].x * W, y: defects[k].y * H };
      }
      return { x: fx * W, y: fy * H };
    }

    var ptDate = getDefect('date_etch', 0.27, 0.26);
    var ptSig = getDefect('sig_indent', 0.72, 0.74);
    var ptSeal = getDefect('seal_micro', 0.30, 0.74);

    function drawBaseDocument(ctx, mode) {
      var rand = mulberry32(41855);
      var i;

      // Desk matte
      ctx.fillStyle = mode === 'uv' ? '#070614' : mode === 'oblique' ? '#0d0c0b' : '#121318';
      ctx.fillRect(0, 0, W, H);

      // Paper sheet geometry
      var px = 56;
      var py = 36;
      var pw = W - 112;
      var ph = H - 72;

      if (mode === 'uv') {
        ctx.fillStyle = '#141133';
        ctx.fillRect(px, py, pw, ph);
      } else if (mode === 'oblique') {
        var obGrad = ctx.createLinearGradient(px, py, px + pw, py + ph);
        obGrad.addColorStop(0, '#c8b693');
        obGrad.addColorStop(0.5, '#a89674');
        obGrad.addColorStop(1, '#7c6d51');
        ctx.fillStyle = obGrad;
        ctx.fillRect(px, py, pw, ph);
      } else {
        var wGrad = ctx.createLinearGradient(px, py, px, py + ph);
        wGrad.addColorStop(0, '#ece4d0');
        wGrad.addColorStop(1, '#dfd4bb');
        ctx.fillStyle = wGrad;
        ctx.fillRect(px, py, pw, ph);
      }

      // Subtle paper fiber grain (strong relief shadows in oblique, glowing security fibers in UV)
      for (i = 0; i < 240; i++) {
        var fx = px + rand() * pw;
        var fy = py + rand() * ph;
        var fl = 6 + rand() * 14;
        var fa = rand() * Math.PI;
        if (mode === 'uv') {
          if (i % 5 === 0) {
            ctx.strokeStyle = i % 10 === 0 ? 'rgba(99, 102, 241, 0.45)' : 'rgba(56, 189, 248, 0.35)';
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(fx, fy);
            ctx.lineTo(fx + Math.cos(fa) * fl, fy + Math.sin(fa) * fl);
            ctx.stroke();
          }
        } else if (mode === 'oblique') {
          ctx.strokeStyle = i % 2 === 0 ? 'rgba(255, 245, 220, 0.14)' : 'rgba(30, 22, 12, 0.18)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(fx, fy);
          ctx.lineTo(fx + fl * 0.7, fy + 1.2);
          ctx.stroke();
        } else {
          ctx.fillStyle = 'rgba(90, 75, 55, 0.045)';
          ctx.fillRect(fx, fy, 2, 2);
        }
      }

      // Guilloché official notarial border
      var borderCol = mode === 'uv' ? 'rgba(129, 140, 248, 0.42)' : mode === 'oblique' ? '#4a3d28' : '#574a35';
      ctx.strokeStyle = borderCol;
      ctx.lineWidth = 3;
      ctx.strokeRect(px + 18, py + 18, pw - 36, ph - 36);
      ctx.lineWidth = 1;
      ctx.strokeRect(px + 25, py + 25, pw - 50, ph - 50);

      // Header
      var inkCol = mode === 'uv' ? 'rgba(165, 180, 252, 0.38)' : mode === 'oblique' ? '#261e14' : '#18181b';
      var inkSub = mode === 'uv' ? 'rgba(129, 140, 248, 0.32)' : mode === 'oblique' ? '#3d3020' : '#3f3f46';
      ctx.fillStyle = inkCol;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.font = '700 22px "Oswald", sans-serif';
      ctx.fillText('РОССИЙСКАЯ ФЕДЕРАЦИЯ • НОТАРИАЛЬНАЯ ДОВЕРЕННОСТЬ', W / 2, py + 40);

      ctx.font = '600 13px "IBM Plex Mono", monospace';
      ctx.fillStyle = inkSub;
      ctx.fillText('БЛАНК СЕРИИ 77 АГ № 4918204 • Г. МОСКВА', W / 2, py + 72);

      // Date line (location of Defect 1: chemical etching under UV)
      ctx.textAlign = 'left';
      ctx.font = '600 17px "IBM Plex Mono", monospace';
      ctx.fillStyle = inkCol;
      ctx.fillText('Дата выдачи:  14.10.2024 г.', ptDate.x - 140, ptDate.y - 10);

      // UV Defect 1: Chemical etching bleach blotch + ghost previous date "09.10.2024"
      if (mode === 'uv') {
        var etchGrad = ctx.createRadialGradient(ptDate.x + 25, ptDate.y, 12, ptDate.x + 25, ptDate.y, 92);
        etchGrad.addColorStop(0, 'rgba(129, 140, 248, 0.92)');
        etchGrad.addColorStop(0.45, 'rgba(56, 189, 248, 0.62)');
        etchGrad.addColorStop(0.8, 'rgba(99, 102, 241, 0.24)');
        etchGrad.addColorStop(1, 'rgba(99, 102, 241, 0)');
        ctx.fillStyle = etchGrad;
        ctx.beginPath();
        ctx.ellipse(ptDate.x + 25, ptDate.y, 96, 38, -0.06, 0, Math.PI * 2);
        ctx.fill();

        // Residual leached fibers & ghostly previous date beneath fresh ink
        ctx.fillStyle = 'rgba(224, 242, 254, 0.88)';
        ctx.font = '700 18px "IBM Plex Mono", monospace';
        ctx.fillText('09.10.2024', ptDate.x - 2, ptDate.y - 16);
        ctx.strokeStyle = 'rgba(199, 210, 254, 0.85)';
        ctx.lineWidth = 1.4;
        ctx.setLineDash([5, 3]);
        ctx.strokeRect(ptDate.x - 14, ptDate.y - 24, 142, 36);
        ctx.setLineDash([]);
        ctx.font = '600 11px "IBM Plex Mono", monospace';
        ctx.fillStyle = '#e0e7ff';
        ctx.fillText('СЛЕД ТРАВЛЕНИЯ (ХЛОР/КИСЛОТА)', ptDate.x - 28, ptDate.y + 18);
      }

      // Legal body text paragraphs
      var bodyLines = [
        'Я, гр. Сафонов Олег Викторович, 1974 г.р., паспорт 45 18 № 704921,',
        'настоящей доверенностью уполномочиваю гр. Зуева Аркадия Павловича',
        'распоряжаться долями ООО «Север-Лес», счетами и недвижимым имуществом,',
        'подписывать договоры отчуждения и получать наличные средства без ограничений.',
        'Доверенность выдана сроком на три года с правом передоверия третьим лицам.'
      ];
      ctx.font = '400 17px "Inter", sans-serif';
      ctx.fillStyle = inkCol;
      for (i = 0; i < bodyLines.length; i++) {
        ctx.fillText(bodyLines[i], px + 54, py + 215 + i * 36);
      }

      // Subtle divider line above seal & signature
      ctx.strokeStyle = borderCol;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px + 54, py + 412);
      ctx.lineTo(px + pw - 54, py + 412);
      ctx.stroke();

      // Defect 3: Notary Seal + Font Mismatch & Microtext (sharp & unmistakable in WHITE light)
      ctx.save();
      ctx.translate(ptSeal.x, ptSeal.y);

      var sealCol =
        mode === 'uv'
          ? 'rgba(99, 102, 241, 0.32)'
          : mode === 'oblique'
          ? 'rgba(42, 54, 92, 0.55)'
          : '#1d4ed8';

      ctx.strokeStyle = sealCol;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 68, 0, Math.PI * 2);
      ctx.stroke();

      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(0, 0, 56, 0, Math.PI * 2);
      ctx.stroke();

      // Inner seal emblem
      ctx.fillStyle = sealCol;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '700 11px "IBM Plex Mono", monospace';
      ctx.fillText('НОТАРИАЛЬНЫЙ ОКРУГ', 0, -24);
      ctx.font = '700 14px "Oswald", sans-serif';
      ctx.fillText('Г. МОСКВА', 0, 0);

      if (mode === 'white') {
        // High-CRI 2.2x white light reveals mismatched counterfeit sans font & inkjet dots + broken microtext!
        ctx.fillStyle = '#1e3a8a';
        ctx.font = '700 11px "Arial", sans-serif';
        ctx.fillText('НОТАРIУС • КОПИЯ #00', 0, 22);

        // Inkjet raster halftone scatter around counterfeit stamp rim
        ctx.fillStyle = 'rgba(29, 78, 216, 0.45)';
        for (i = 0; i < 42; i++) {
          var a = (i / 42) * Math.PI * 2;
          var rDot = 59 + (i % 3) * 3.5;
          ctx.fillRect(Math.cos(a) * rDot, Math.sin(a) * rDot, 2.2, 2.2);
        }

        // Font mismatch line directly beneath seal ("Реестр" printed in different grotesque weight/kerning)
        ctx.fillStyle = '#0f172a';
        ctx.font = '400 13px "Georgia", serif';
        ctx.fillText('Зарегистрировано в реестре:', -28, 86);
        ctx.fillStyle = '#b91c1c';
        ctx.font = '700 15px "Courier New", monospace';
        ctx.fillText('№77-99/Ф', 92, 86);
      } else {
        ctx.font = '600 10px "IBM Plex Mono", monospace';
        ctx.fillText('РЕЕСТР № 77-99', 0, 22);
      }
      ctx.restore();

      // Defect 2: Signature block (pressed tracing indentation visible under OBLIQUE side-light)
      ctx.save();
      ctx.translate(ptSig.x, ptSig.y);

      ctx.fillStyle = inkSub;
      ctx.font = '600 14px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Подпись доверителя:', 0, -54);

      // Baseline rule
      ctx.strokeStyle = borderCol;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-110, 22);
      ctx.lineTo(110, 22);
      ctx.stroke();

      ctx.font = '500 14px "Inter", sans-serif';
      ctx.fillText('/ Сафонов О.В. /', 0, 42);

      // Helper to trace signature curve
      function traceSigPath(ox, oy) {
        ctx.beginPath();
        ctx.moveTo(-88 + ox, 10 + oy);
        ctx.bezierCurveTo(-72 + ox, -42 + oy, -44 + ox, -38 + oy, -38 + ox, 8 + oy);
        ctx.bezierCurveTo(-24 + ox, -26 + oy, -2 + ox, -20 + oy, 4 + ox, 6 + oy);
        ctx.bezierCurveTo(22 + ox, -32 + oy, 50 + ox, -14 + oy, 38 + ox, 12 + oy);
        ctx.bezierCurveTo(56 + ox, -8 + oy, 78 + ox, -22 + oy, 92 + ox, 4 + oy);
      }

      if (mode === 'oblique') {
        // Dramatic raking light: deep embossed double stylus groove + bright paper ridge + carbon dust specks
        ctx.strokeStyle = 'rgba(18, 12, 6, 0.85)';
        ctx.lineWidth = 4.2;
        traceSigPath(-6, -4);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(255, 240, 195, 0.92)';
        ctx.lineWidth = 2.2;
        traceSigPath(-3, -2);
        ctx.stroke();

        // Second dry stylus trial pass (un-inked indentation beside actual ink!)
        ctx.strokeStyle = 'rgba(20, 12, 4, 0.75)';
        ctx.lineWidth = 2.5;
        traceSigPath(8, 7);
        ctx.stroke();
        ctx.strokeStyle = 'rgba(255, 232, 168, 0.85)';
        ctx.lineWidth = 1.3;
        traceSigPath(10, 8);
        ctx.stroke();

        // Carbon-paper transfer dots along groove
        ctx.fillStyle = 'rgba(30, 41, 82, 0.72)';
        for (i = 0; i < 28; i++) {
          ctx.fillRect(-82 + i * 6 + (i % 3), -16 + Math.sin(i) * 18, 2.2, 2.2);
        }
      }

      // Main blue ballpoint signature stroke
      ctx.strokeStyle = mode === 'uv' ? 'rgba(99, 102, 241, 0.35)' : '#1e3a8a';
      ctx.lineWidth = 3.2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      traceSigPath(0, 0);
      ctx.stroke();

      ctx.restore();
    }

    drawBaseDocument(cWhite.getContext('2d'), 'white');
    drawBaseDocument(cOblique.getContext('2d'), 'oblique');
    drawBaseDocument(cUv.getContext('2d'), 'uv');

    return { white: cWhite, oblique: cOblique, uv: cUv };
  }

  function buildLockCanvases(defects) {
    var W = 960;
    var H = 720;
    var cWhite = document.createElement('canvas');
    var cOblique = document.createElement('canvas');
    var cUv = document.createElement('canvas');
    cWhite.width = cOblique.width = cUv.width = W;
    cWhite.height = cOblique.height = cUv.height = H;

    function getDefect(id, fx, fy) {
      for (var k = 0; k < defects.length; k++) {
        if (defects[k].id === id) return { x: defects[k].x * W, y: defects[k].y * H };
      }
      return { x: fx * W, y: fy * H };
    }

    var ptTension = getDefect('tension_scratch', 0.24, 0.65);
    var ptPin3 = getDefect('pin3_burr', 0.65, 0.45);
    var ptGraphite = getDefect('graphite_uv', 0.24, 0.29);

    function drawLockScene(ctx, mode) {
      var i;
      // Macro steel bench surface
      ctx.fillStyle = mode === 'uv' ? '#070614' : '#0c0e13';
      ctx.fillRect(0, 0, W, H);

      // Subtle technical grid
      ctx.strokeStyle = mode === 'uv' ? 'rgba(99, 102, 241, 0.08)' : 'rgba(148, 163, 184, 0.07)';
      ctx.lineWidth = 1;
      for (i = 0; i < W; i += 32) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, H);
        ctx.stroke();
      }
      for (i = 0; i < H; i += 32) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(W, i);
        ctx.stroke();
      }

      // Header text
      ctx.fillStyle = mode === 'uv' ? 'rgba(165, 180, 252, 0.55)' : '#94a3b8';
      ctx.font = '600 16px "IBM Plex Mono", monospace';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText('ТРАСОЛОГИЯ ЛИЧИНКИ ЗАМКА • ГАРАЖ БЕЛОВА (#418-З)', 36, 26);

      // === LEFT: FRONT MACRO FACE OF CYLINDER PLUG ===
      var faceCx = W * 0.24;
      var faceCy = H * 0.48;
      var outerR = 165;
      var plugR = 112;

      // Outer steel housing ring
      var ringGrad = ctx.createLinearGradient(faceCx - outerR, faceCy - outerR, faceCx + outerR, faceCy + outerR);
      if (mode === 'uv') {
        ringGrad.addColorStop(0, '#1e1b4b');
        ringGrad.addColorStop(0.5, '#13112b');
        ringGrad.addColorStop(1, '#090817');
      } else if (mode === 'oblique') {
        ringGrad.addColorStop(0, '#64748b');
        ringGrad.addColorStop(0.45, '#1e293b');
        ringGrad.addColorStop(1, '#0f172a');
      } else {
        ringGrad.addColorStop(0, '#475569');
        ringGrad.addColorStop(0.5, '#334155');
        ringGrad.addColorStop(1, '#1e293b');
      }
      ctx.fillStyle = ringGrad;
      ctx.beginPath();
      ctx.arc(faceCx, faceCy, outerR, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = mode === 'uv' ? '#4338ca' : '#64748b';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Inner brass cylinder core face
      var brassGrad = ctx.createLinearGradient(faceCx - plugR, faceCy - plugR, faceCx + plugR, faceCy + plugR);
      if (mode === 'uv') {
        brassGrad.addColorStop(0, '#2e274f');
        brassGrad.addColorStop(1, '#16122e');
      } else if (mode === 'oblique') {
        brassGrad.addColorStop(0, '#e5b963');
        brassGrad.addColorStop(0.45, '#8a6220');
        brassGrad.addColorStop(1, '#3b2609');
      } else {
        brassGrad.addColorStop(0, '#c89b46');
        brassGrad.addColorStop(0.5, '#9d742c');
        brassGrad.addColorStop(1, '#5e4314');
      }
      ctx.fillStyle = brassGrad;
      ctx.beginPath();
      ctx.arc(faceCx, faceCy, plugR, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#0b0c0e';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Keyway notched vertical slot
      ctx.fillStyle = '#050608';
      ctx.beginPath();
      ctx.moveTo(faceCx - 16, faceCy - 72);
      ctx.lineTo(faceCx + 16, faceCy - 72);
      ctx.lineTo(faceCx + 16, faceCy - 20);
      ctx.lineTo(faceCx + 28, faceCy - 6);
      ctx.lineTo(faceCx + 14, faceCy + 14);
      ctx.lineTo(faceCx + 18, faceCy + 84);
      ctx.lineTo(faceCx - 18, faceCy + 84);
      ctx.lineTo(faceCx - 18, faceCy + 24);
      ctx.lineTo(faceCx - 28, faceCy + 6);
      ctx.lineTo(faceCx - 16, faceCy - 12);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = mode === 'oblique' ? '#fde68a' : '#334155';
      ctx.lineWidth = 2;
      ctx.stroke();

      // UV Defect 3: Fluorescent synthetic graphite/lubricant smears on upper rim
      if (mode === 'uv') {
        var smGrad = ctx.createRadialGradient(ptGraphite.x, ptGraphite.y, 10, ptGraphite.x, ptGraphite.y, 76);
        smGrad.addColorStop(0, 'rgba(129, 140, 248, 0.92)');
        smGrad.addColorStop(0.45, 'rgba(56, 189, 248, 0.65)');
        smGrad.addColorStop(0.85, 'rgba(99, 102, 241, 0.18)');
        smGrad.addColorStop(1, 'rgba(99, 102, 241, 0)');
        ctx.fillStyle = smGrad;
        ctx.beginPath();
        ctx.ellipse(ptGraphite.x, ptGraphite.y, 72, 42, 0.25, 0, Math.PI * 2);
        ctx.fill();

        // Swirling oily UV streaks
        ctx.strokeStyle = 'rgba(224, 242, 254, 0.85)';
        ctx.lineWidth = 2.4;
        for (i = 0; i < 6; i++) {
          ctx.beginPath();
          ctx.arc(ptGraphite.x - 16 + i * 8, ptGraphite.y - 6 + (i % 3) * 8, 12 + i * 3, 0.2, 2.2);
          ctx.stroke();
        }
      } else {
        // Very subtle dark smudge barely noticeable in white/oblique
        ctx.fillStyle = 'rgba(12, 12, 15, 0.24)';
        ctx.beginPath();
        ctx.ellipse(ptGraphite.x, ptGraphite.y, 44, 22, 0.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Oblique Defect 1: Fresh transverse tension wrench scratches at bottom of keyway
      if (mode === 'oblique') {
        ctx.save();
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 3.2;
        for (i = 0; i < 7; i++) {
          var sy = ptTension.y - 26 + i * 8.5;
          ctx.beginPath();
          ctx.moveTo(ptTension.x - 38 + (i % 2) * 8, sy);
          ctx.lineTo(ptTension.x + 38 - (i % 3) * 6, sy + 2.5);
          ctx.stroke();

          // Dark raking shadow under each fresh metal scratch
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.85)';
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(ptTension.x - 36 + (i % 2) * 8, sy + 3);
          ctx.lineTo(ptTension.x + 36 - (i % 3) * 6, sy + 5.5);
          ctx.stroke();
          ctx.strokeStyle = '#fef08a';
          ctx.lineWidth = 2.6;
        }
        ctx.restore();
      }

      // === RIGHT: LONGITUDINAL CUTAWAY OF 5 PINS ALONG SHEAR LINE ===
      var cutX = W * 0.48;
      var cutY = H * 0.16;
      var cutW = W * 0.46;
      var cutH = H * 0.66;
      var shearY = H * 0.46;

      // Cylinder body block
      ctx.fillStyle = mode === 'uv' ? '#13112a' : '#1e2430';
      ctx.fillRect(cutX, cutY, cutW, cutH);
      ctx.strokeStyle = mode === 'uv' ? '#4338ca' : '#475569';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(cutX, cutY, cutW, cutH);

      // Lower rotating brass plug cutaway
      ctx.fillStyle = mode === 'uv' ? '#1f1a3d' : mode === 'oblique' ? '#6c4d1a' : '#856022';
      ctx.fillRect(cutX + 4, shearY, cutW - 8, cutY + cutH - shearY - 4);

      // Shear line dashed indicator
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.6;
      ctx.setLineDash([8, 5]);
      ctx.beginPath();
      ctx.moveTo(cutX - 8, shearY);
      ctx.lineTo(cutX + cutW + 8, shearY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#f59e0b';
      ctx.font = '600 12px "IBM Plex Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText('ЛИНИЯ РАЗЪЁМА', cutX + cutW - 8, shearY - 18);

      // 5 Pin chambers + springs + driver pins + key pins
      var pinSpacing = cutW / 5.4;
      var pinW = 34;
      for (var p = 0; p < 5; p++) {
        var pcx = cutX + pinSpacing * (p + 0.7);
        var chamberTop = cutY + 26;
        var chamberBot = shearY + 135;

        // Chamber shaft hollow
        ctx.fillStyle = '#090b10';
        ctx.fillRect(pcx - pinW / 2 - 4, chamberTop, pinW + 8, chamberBot - chamberTop);

        // Coiled spring on top
        ctx.strokeStyle = mode === 'uv' ? '#6366f1' : '#94a3b8';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        for (var sp = 0; sp < 6; sp++) {
          var y1 = chamberTop + 8 + sp * 11;
          ctx.moveTo(pcx - pinW * 0.42, y1);
          ctx.lineTo(pcx + pinW * 0.42, y1 + 5.5);
          ctx.lineTo(pcx - pinW * 0.42, y1 + 11);
        }
        ctx.stroke();

        // Driver pin (upper) & key pin (lower) meeting near shear line
        var splitOffset = p === 2 ? -12 : (p % 2 === 0 ? 18 : -22);
        var splitY = shearY + splitOffset;

        var pGrad = ctx.createLinearGradient(pcx - pinW / 2, 0, pcx + pinW / 2, 0);
        if (mode === 'uv') {
          pGrad.addColorStop(0, '#312e81');
          pGrad.addColorStop(0.5, '#4f46e5');
          pGrad.addColorStop(1, '#1e1b4b');
        } else {
          pGrad.addColorStop(0, '#785014');
          pGrad.addColorStop(0.42, '#f5d07a');
          pGrad.addColorStop(1, '#5c3b0e');
        }

        // Driver pin
        ctx.fillStyle = pGrad;
        ctx.fillRect(pcx - pinW / 2, chamberTop + 76, pinW, Math.max(24, splitY - (chamberTop + 76) - 2));
        // Key pin (conical tip at bottom)
        ctx.beginPath();
        ctx.moveTo(pcx - pinW / 2, splitY + 2);
        ctx.lineTo(pcx + pinW / 2, splitY + 2);
        ctx.lineTo(pcx + pinW / 2, chamberBot - 22);
        ctx.lineTo(pcx, chamberBot - 4);
        ctx.lineTo(pcx - pinW / 2, chamberBot - 22);
        ctx.closePath();
        ctx.fill();

        // Pin number label
        ctx.fillStyle = mode === 'uv' ? '#818cf8' : '#cbd5e1';
        ctx.font = '600 13px "IBM Plex Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('#' + (p + 1), pcx, chamberBot + 16);

        // Oblique Defect 2: Sharp displaced lockpick burr & rake scratches on Pin #3 (index 2)
        if (p === 2 && mode === 'oblique') {
          ctx.save();
          // Displaced jagged brass burr jutting out along shear bevel
          ctx.fillStyle = '#fef08a';
          ctx.beginPath();
          ctx.moveTo(ptPin3.x - 16, ptPin3.y - 6);
          ctx.lineTo(ptPin3.x - 24, ptPin3.y + 4);
          ctx.lineTo(ptPin3.x - 12, ptPin3.y + 12);
          ctx.closePath();
          ctx.fill();

          // Deep diagonal rake-pick scoring lines catching oblique light
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2.6;
          for (var sc = 0; sc < 5; sc++) {
            ctx.beginPath();
            ctx.moveTo(ptPin3.x - 18, ptPin3.y - 16 + sc * 9);
            ctx.lineTo(ptPin3.x + 18, ptPin3.y - 4 + sc * 9);
            ctx.stroke();
          }
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.85)';
          ctx.lineWidth = 1.6;
          for (sc = 0; sc < 5; sc++) {
            ctx.beginPath();
            ctx.moveTo(ptPin3.x - 16, ptPin3.y - 13 + sc * 9);
            ctx.lineTo(ptPin3.x + 18, ptPin3.y - 1 + sc * 9);
            ctx.stroke();
          }
          ctx.restore();
        }
      }
    }

    drawLockScene(cWhite.getContext('2d'), 'white');
    drawLockScene(cOblique.getContext('2d'), 'oblique');
    drawLockScene(cUv.getContext('2d'), 'uv');

    return { white: cWhite, oblique: cOblique, uv: cUv };
  }

  function initDocForgery(containerEl, config, callbacks) {
    config = config || {};
    var mode = config.mode === 'lock' ? 'lock' : 'doc';
    var timers = createTimerBag();
    var listeners = createListenerBag();
    var triggerWin = createWinTrigger(callbacks);
    var finished = false;

    var rawDefects =
      Array.isArray(config.defects) && config.defects.length > 0
        ? config.defects
        : mode === 'lock'
        ? DEFAULT_LOCK_DEFECTS
        : DEFAULT_DOC_DEFECTS;

    var defects = rawDefects.map(function (d, idx) {
      return {
        id: d.id || 'def_' + idx,
        label: d.label || 'Дефект #' + (idx + 1),
        shortLabel: d.shortLabel || 'Улика #' + (idx + 1),
        x: clamp(typeof d.x === 'number' ? d.x : 0.25 + idx * 0.25, 0.1, 0.9),
        y: clamp(typeof d.y === 'number' ? d.y : 0.5, 0.12, 0.88),
        requiredLight: d.requiredLight || 'uv',
        radius: typeof d.radius === 'number' ? d.radius : 0.095,
        found: false
      };
    });

    var shell = createShell(containerEl, {
      title:
        config.title ||
        (mode === 'lock' ? 'Трасология замка гаража' : 'Экспертиза доверенности'),
      subtitle:
        config.subtitle ||
        (mode === 'lock'
          ? 'ДЕЛО №418 • АКТ 3 • ЛУПА И УФ-ЛАМПА'
          : 'ДЕЛО №418 • АКТ 5 • ЛУПА 2.2× И УФ 365 НМ'),
      extraClass: 'mg-doc-wrap'
    });

    listeners.on(shell.cancelBtn, 'click', function () {
      haptic('light');
      sfx('click');
      triggerCancel(callbacks);
    });

    // Canvas stage
    var stage = document.createElement('div');
    stage.className = 'mg-f2-stage mg-doc-stage';
    var canvas = document.createElement('canvas');
    canvas.className = 'mg-f2-canvas';
    stage.appendChild(canvas);
    shell.body.appendChild(stage);

    // Status line
    var statusEl = document.createElement('div');
    statusEl.className = 'mg-f2-status';
    var statusText = document.createElement('span');
    statusText.textContent = 'Водите лупой и переключайте свет, чтобы найти ' + defects.length + ' следа';
    var countVal = document.createElement('span');
    countVal.className = 'mg-f2-value';
    countVal.textContent = '0 / ' + defects.length;
    statusEl.appendChild(statusText);
    statusEl.appendChild(countVal);
    shell.body.appendChild(statusEl);

    // Controls panel
    var panel = document.createElement('div');
    panel.className = 'mg-f2-panel';

    var lightsRow = document.createElement('div');
    lightsRow.className = 'mg-doc-lights';
    var lightDefs = [
      { id: 'white', label: 'БЕЛЫЙ СВЕТ' },
      { id: 'oblique', label: 'КОСОЙ СВЕТ' },
      { id: 'uv', label: 'УФ 365 нм' }
    ];
    var lightBtns = {};
    var activeLight = 'white';

    function updateLightUI() {
      for (var k in lightBtns) {
        if (Object.prototype.hasOwnProperty.call(lightBtns, k)) {
          lightBtns[k].classList.remove('is-active');
          lightBtns[k].classList.remove('is-uv');
          if (k === activeLight) {
            lightBtns[k].classList.add(k === 'uv' ? 'is-uv' : 'is-active');
          }
        }
      }
    }

    for (var i = 0; i < lightDefs.length; i++) {
      (function (ld) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'mg-f2-btn-sec';
        btn.textContent = ld.label;
        listeners.on(btn, 'click', function () {
          if (finished) return;
          activeLight = ld.id;
          haptic('light');
          sfx('click');
          updateLightUI();
        });
        lightsRow.appendChild(btn);
        lightBtns[ld.id] = btn;
      })(lightDefs[i]);
    }
    updateLightUI();
    panel.appendChild(lightsRow);

    var fixBtn = document.createElement('button');
    fixBtn.type = 'button';
    fixBtn.className = 'mg-f2-btn';
    fixBtn.textContent = 'ЗАФИКСИРОВАТЬ УЛИКУ';
    fixBtn.disabled = true;
    panel.appendChild(fixBtn);

    var cluesRow = document.createElement('div');
    cluesRow.className = 'mg-doc-clues';
    cluesRow.style.gridTemplateColumns = 'repeat(' + Math.min(defects.length, 3) + ', 1fr)';
    var cluePills = [];
    for (i = 0; i < defects.length; i++) {
      var pill = document.createElement('div');
      pill.className = 'mg-f2-pill';
      pill.textContent = 'УЛИКА #' + (i + 1);
      cluesRow.appendChild(pill);
      cluePills.push(pill);
    }
    panel.appendChild(cluesRow);
    shell.body.appendChild(panel);

    // Pre-render the 3 spectral offscreen canvases
    var layers = mode === 'lock' ? buildLockCanvases(defects) : buildDocCanvases(defects);
    var canvasMgr = setupResponsiveCanvas(canvas, stage);

    var loupeX = 0.5;
    var loupeY = 0.5;
    var targetX = 0.5;
    var targetY = 0.5;
    var dragging = false;
    var lockedDefect = null;
    var wasLocked = false;
    var foundCount = 0;
    var captureFlash = 0;
    var lastTs = performance.now();

    function moveLoupe(ev) {
      var rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      targetX = clamp((ev.clientX - rect.left) / rect.width, 0.08, 0.92);
      targetY = clamp((ev.clientY - rect.top) / rect.height, 0.10, 0.90);
    }

    listeners.on(canvas, 'pointerdown', function (ev) {
      if (finished) return;
      dragging = true;
      try {
        canvas.setPointerCapture(ev.pointerId);
      } catch (e) {}
      moveLoupe(ev);
    });

    listeners.on(canvas, 'pointermove', function (ev) {
      if (!dragging || finished) return;
      moveLoupe(ev);
    });

    listeners.on(canvas, 'pointerup', function () {
      dragging = false;
    });
    listeners.on(canvas, 'pointercancel', function () {
      dragging = false;
    });

    function evaluateLoupe() {
      var hit = null;
      for (var k = 0; k < defects.length; k++) {
        var d = defects[k];
        if (d.found) continue;
        var dist = Math.hypot(d.x - loupeX, d.y - loupeY);
        if (dist <= d.radius && activeLight === d.requiredLight) {
          hit = d;
          break;
        }
      }

      lockedDefect = hit;
      var ready = !!(hit && !finished);

      if (ready && !wasLocked) {
        haptic('light');
        sfx('scan');
      }
      wasLocked = ready;

      fixBtn.disabled = !ready;
      if (ready) {
        fixBtn.classList.add('is-ready');
        statusEl.className = activeLight === 'uv' ? 'mg-f2-status is-uv' : 'mg-f2-status is-ok';
        statusText.textContent = 'Обнаружен признак фальсификации — нажмите «ЗАФИКСИРОВАТЬ»';
      } else if (!finished) {
        fixBtn.classList.remove('is-ready');
        statusEl.className = activeLight === 'uv' ? 'mg-f2-status is-uv' : 'mg-f2-status';
        statusText.textContent =
          activeLight === 'uv'
            ? 'УФ 365 нм: ищите флуоресцентные следы травления или смазки'
            : activeLight === 'oblique'
            ? 'Косой свет: ищите рельефные царапины, заусенцы и продавливания'
            : 'Белый свет 2.2×: проверяйте шрифты, микротекст и общие детали';
      }
    }

    listeners.on(fixBtn, 'click', function () {
      if (finished || !lockedDefect || lockedDefect.found) return;
      var def = lockedDefect;
      def.found = true;
      foundCount++;
      captureFlash = 1;
      haptic('medium');
      sfx('click');

      if (cluePills[foundCount - 1]) {
        cluePills[foundCount - 1].classList.add('is-found');
        cluePills[foundCount - 1].textContent = def.shortLabel;
        cluePills[foundCount - 1].title = def.label;
      }

      countVal.textContent = foundCount + ' / ' + defects.length;

      if (foundCount >= defects.length) {
        finished = true;
        countVal.classList.add('is-ok');
        fixBtn.disabled = true;
        fixBtn.classList.remove('is-ready');
        statusEl.className = 'mg-f2-status is-ok';
        statusText.textContent =
          mode === 'lock'
            ? 'КРИМИНАЛЬНОЕ ВСКРЫТИЕ ОТМЫЧКОЙ ПОДТВЕРЖДЕНО!'
            : 'ПОДДЕЛКА ДОВЕРЕННОСТИ ДОКАЗАНА!';
        timers.setTimeout(function () {
          haptic('success');
          sfx('success');
          triggerWin({
            minigame: 'doc_forgery',
            mode: mode,
            found: defects.map(function (item) {
              return { id: item.id, label: item.label };
            })
          });
        }, 950);
      } else {
        statusEl.className = 'mg-f2-status is-ok';
        statusText.textContent = 'Зафиксировано: ' + def.label;
      }
    });

    function render(now) {
      var dt = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;

      loupeX = lerp(loupeX, targetX, Math.min(1, dt * 18));
      loupeY = lerp(loupeY, targetY, Math.min(1, dt * 18));

      evaluateLoupe();

      var metrics = canvasMgr.getMetrics();
      var w = metrics.width;
      var h = metrics.height;
      var dpr = metrics.dpr;
      var ctx = canvas.getContext('2d');

      ctx.save();
      ctx.scale(dpr, dpr);

      // 1. Base object outside the magnifying loupe (dimmed white light for orientation)
      ctx.drawImage(layers.white, 0, 0, w, h);
      ctx.fillStyle =
        activeLight === 'uv'
          ? 'rgba(10, 8, 28, 0.64)'
          : activeLight === 'oblique'
          ? 'rgba(14, 11, 8, 0.50)'
          : 'rgba(8, 10, 14, 0.36)';
      ctx.fillRect(0, 0, w, h);

      // Show subtle green check pins on already captured defects
      for (var k = 0; k < defects.length; k++) {
        var df = defects[k];
        if (df.found) {
          var fx = df.x * w;
          var fy = df.y * h;
          ctx.fillStyle = 'rgba(34, 197, 94, 0.25)';
          ctx.beginPath();
          ctx.arc(fx, fy, 12, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#22c55e';
          ctx.lineWidth = 1.8;
          ctx.stroke();
          ctx.fillStyle = '#4ade80';
          ctx.beginPath();
          ctx.arc(fx, fy, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Circular 2.2x Magnifying Loupe with active spectral light layer
      var lx = loupeX * w;
      var ly = loupeY * h;
      var loupeR = clamp(Math.min(w, h) * 0.24, 48, 72);
      var mag = 2.2;
      var srcLayer = layers[activeLight] || layers.white;

      ctx.save();
      ctx.beginPath();
      ctx.arc(lx, ly, loupeR, 0, Math.PI * 2);
      ctx.clip();

      var srcW = ((loupeR * 2) / w) * srcLayer.width / mag;
      var srcH = ((loupeR * 2) / h) * srcLayer.height / mag;
      var srcX = loupeX * srcLayer.width - srcW / 2;
      var srcY = loupeY * srcLayer.height - srcH / 2;

      ctx.fillStyle = activeLight === 'uv' ? '#070614' : '#0b0c0e';
      ctx.fillRect(lx - loupeR, ly - loupeR, loupeR * 2, loupeR * 2);
      ctx.drawImage(srcLayer, srcX, srcY, srcW, srcH, lx - loupeR, ly - loupeR, loupeR * 2, loupeR * 2);

      // Subtle spectral glass tint & glare arc inside lens
      if (activeLight === 'uv') {
        var uvGlow = ctx.createRadialGradient(lx, ly, loupeR * 0.2, lx, ly, loupeR);
        uvGlow.addColorStop(0, 'rgba(99, 102, 241, 0.06)');
        uvGlow.addColorStop(1, 'rgba(79, 70, 229, 0.32)');
        ctx.fillStyle = uvGlow;
        ctx.fillRect(lx - loupeR, ly - loupeR, loupeR * 2, loupeR * 2);
      } else if (activeLight === 'oblique') {
        var obShine = ctx.createLinearGradient(lx - loupeR, ly - loupeR, lx + loupeR, ly + loupeR);
        obShine.addColorStop(0, 'rgba(251, 191, 36, 0.16)');
        obShine.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
        obShine.addColorStop(1, 'rgba(0, 0, 0, 0.22)');
        ctx.fillStyle = obShine;
        ctx.fillRect(lx - loupeR, ly - loupeR, loupeR * 2, loupeR * 2);
      }

      // Curved optical glass highlight
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(lx, ly, loupeR - 5, -Math.PI * 0.78, -Math.PI * 0.34);
      ctx.stroke();

      // Center precision reticle inside lens
      var retCol = lockedDefect
        ? '#22c55e'
        : activeLight === 'uv'
        ? 'rgba(165, 180, 252, 0.75)'
        : 'rgba(245, 158, 11, 0.75)';
      ctx.strokeStyle = retCol;
      ctx.lineWidth = lockedDefect ? 1.8 : 1.1;
      ctx.beginPath();
      ctx.moveTo(lx - 11, ly);
      ctx.lineTo(lx - 4, ly);
      ctx.moveTo(lx + 4, ly);
      ctx.lineTo(lx + 11, ly);
      ctx.moveTo(lx, ly - 11);
      ctx.lineTo(lx, ly - 4);
      ctx.moveTo(lx, ly + 4);
      ctx.lineTo(lx, ly + 11);
      ctx.stroke();

      if (lockedDefect) {
        var pulseR = 17 + Math.sin(now * 0.012) * 3;
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.9)';
        ctx.lineWidth = 1.8;
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.arc(lx, ly, pulseR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.restore();

      // 3. Metallic Loupe Bezel Ring
      var bezelCol = lockedDefect
        ? '#22c55e'
        : activeLight === 'uv'
        ? '#6366f1'
        : activeLight === 'oblique'
        ? '#f59e0b'
        : '#cbd5e1';

      ctx.strokeStyle = '#0b0c0e';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(lx, ly, loupeR + 1.5, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = bezelCol;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.arc(lx, ly, loupeR, 0, Math.PI * 2);
      ctx.stroke();

      // Small magnification tag attached to loupe rim
      var tagY = ly + loupeR + 10 > h - 12 ? ly - loupeR - 12 : ly + loupeR + 11;
      ctx.font = '700 9.5px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = bezelCol;
      var modeTag =
        activeLight === 'uv' ? 'UV 365nm • 2.2×' : activeLight === 'oblique' ? 'OBLIQUE • 2.2×' : 'WHITE • 2.2×';
      ctx.fillText(modeTag, clamp(lx, 56, w - 56), tagY);

      if (captureFlash > 0.01) {
        ctx.fillStyle = 'rgba(34, 197, 94, ' + (captureFlash * 0.34).toFixed(3) + ')';
        ctx.fillRect(0, 0, w, h);
        captureFlash = Math.max(0, captureFlash - dt * 3.2);
      }

      if (finished) {
        ctx.fillStyle = 'rgba(8, 10, 14, 0.62)';
        ctx.fillRect(0, 0, w, h);
        ctx.save();
        ctx.translate(w / 2, h / 2);
        ctx.rotate(-0.07);
        var stW = Math.min(w - 28, 300);
        ctx.fillStyle = 'rgba(5, 46, 22, 0.93)';
        ctx.fillRect(-stW / 2, -24, stW, 48);
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 2.2;
        ctx.strokeRect(-stW / 2, -24, stW, 48);
        ctx.fillStyle = '#86efac';
        ctx.font = '700 14px "Oswald", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(
          mode === 'lock' ? 'ВСКРЫТИЕ ОТМЫЧКОЙ ДОКАЗАНО' : 'ПОДДЕЛКА ДОКУМЕНТА ДОКАЗАНА',
          0,
          0
        );
        ctx.restore();
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
  // MINIGAME 3: timeline_reconstruct (Реконструкция таймлайна — Акт 6)
  // ============================================================================

  var DEFAULT_TIMELINE_SLOTS = [
    {
      id: 'ev_well',
      time: '21:00',
      title: 'Убийство настоящего Сафонова и сброс в колодец',
      tag: 'УЛИКА: ЗУБНАЯ КАРТА / КОЛОДЕЦ'
    },
    {
      id: 'ev_gun',
      time: '22:40',
      title: 'Кража ствола из гаража Белова',
      tag: 'УЛИКА: ЛИЧИНКА ЗАМКА / ЛРО-207'
    },
    {
      id: 'ev_house',
      time: '23:55',
      title: 'Исполнитель входит в дом и ликвидирует семью',
      tag: 'УЛИКА: СЛЕД ЛОМА / ПУЛЯ 9×18'
    },
    {
      id: 'ev_arson',
      time: '00:20',
      title: 'Зуев устраняет исполнителя и разливает растворитель',
      tag: 'УЛИКА: УАЙТ-СПИРИТ / 3 ОЧАГА'
    },
    {
      id: 'ev_delay',
      time: '00:50',
      title: 'Мельников придерживает выезд пожарного расчёта',
      tag: 'УЛИКА: ЖУРНАЛ МЧС / ЗВОНОК'
    },
    {
      id: 'ev_cash',
      time: '01:15',
      title: 'Ломов приезжает к бане за чёрной кассой',
      tag: 'УЛИКА: КАМЕРА КПП / СЕЙФ'
    }
  ];

  function shuffleNonSolved(arr) {
    var copy = arr.slice();
    var rand = mulberry32((Date.now() ^ 41806) >>> 0);
    var i, j, tmp;
    for (i = copy.length - 1; i > 0; i--) {
      j = Math.floor(rand() * (i + 1));
      tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    // Guarantee shuffled list does not match original order
    var allSame = true;
    for (i = 0; i < copy.length; i++) {
      if (copy[i].id !== arr[i].id) {
        allSame = false;
        break;
      }
    }
    if (allSame && copy.length > 1) {
      tmp = copy[0];
      copy[0] = copy[copy.length - 1];
      copy[copy.length - 1] = tmp;
    }
    return copy;
  }

  function initTimelineReconstruct(containerEl, config, callbacks) {
    config = config || {};
    var timers = createTimerBag();
    var listeners = createListenerBag();
    var triggerWin = createWinTrigger(callbacks);
    var finished = false;

    // Normalize config: support config.slots or config.events or defaults
    var sourceItems =
      Array.isArray(config.slots) && config.slots.length > 0
        ? config.slots
        : Array.isArray(config.events) && config.events.length > 0
        ? config.events
        : DEFAULT_TIMELINE_SLOTS;

    var correctSequence = sourceItems.map(function (item, idx) {
      return {
        id: item.id || 'ev_' + idx,
        time: item.time || (DEFAULT_TIMELINE_SLOTS[idx] ? DEFAULT_TIMELINE_SLOTS[idx].time : '0' + idx + ':00'),
        title: item.title || item.label || 'Событие #' + (idx + 1),
        tag: item.tag || item.evidence || 'ПРОТОКОЛ СК'
      };
    });

    var slotTimes = correctSequence.map(function (s) {
      return s.time;
    });
    var placedIds = new Array(correctSequence.length);
    var slotVerdict = new Array(correctSequence.length); // null | 'correct' | 'wrong'
    for (var i = 0; i < correctSequence.length; i++) {
      placedIds[i] = null;
      slotVerdict[i] = null;
    }

    var poolOrder = shuffleNonSolved(correctSequence).map(function (ev) {
      return ev.id;
    });

    var eventById = {};
    for (i = 0; i < correctSequence.length; i++) {
      eventById[correctSequence[i].id] = correctSequence[i];
    }

    var selectedPoolId = null;
    var selectedSlotIdx = -1;

    var shell = createShell(containerEl, {
      title: config.title || 'Реконструкция хронологии',
      subtitle: config.subtitle || 'ДЕЛО №418 • АКТ 6 • СЛЕДСТВЕННАЯ ДОСКА СК',
      extraClass: 'mg-tl-wrap'
    });

    listeners.on(shell.cancelBtn, 'click', function () {
      haptic('light');
      sfx('click');
      triggerCancel(callbacks);
    });

    // Status banner
    var statusEl = document.createElement('div');
    statusEl.className = 'mg-f2-status';
    var statusText = document.createElement('span');
    statusText.textContent = 'Выберите карточку снизу и нажмите на временной слот';
    var filledBadge = document.createElement('span');
    filledBadge.className = 'mg-f2-value';
    filledBadge.textContent = '0 / ' + correctSequence.length;
    statusEl.appendChild(statusText);
    statusEl.appendChild(filledBadge);
    shell.body.appendChild(statusEl);

    // Investigative board wrapper (slots + stamp overlay)
    var board = document.createElement('div');
    board.className = 'mg-tl-board';

    var slotsContainer = document.createElement('div');
    slotsContainer.className = 'mg-tl-slots';
    board.appendChild(slotsContainer);
    shell.body.appendChild(board);

    // Action button
    var checkBtn = document.createElement('button');
    checkBtn.type = 'button';
    checkBtn.className = 'mg-f2-btn';
    checkBtn.textContent = 'ПРОВЕРИТЬ ХРОНОЛОГИЮ';
    shell.body.appendChild(checkBtn);

    // Pool panel
    var poolPanel = document.createElement('div');
    poolPanel.className = 'mg-f2-panel';
    var poolHead = document.createElement('div');
    poolHead.className = 'mg-f2-row';
    var poolLbl = document.createElement('span');
    poolLbl.className = 'mg-f2-label';
    poolLbl.textContent = 'КАРТОЧКИ СОБЫТИЙ (НАЖМИТЕ ДЛЯ ВЫБОРА)';
    var poolCount = document.createElement('span');
    poolCount.className = 'mg-f2-value';
    poolHead.appendChild(poolLbl);
    poolHead.appendChild(poolCount);
    poolPanel.appendChild(poolHead);

    var poolContainer = document.createElement('div');
    poolContainer.className = 'mg-tl-pool';
    poolPanel.appendChild(poolContainer);
    shell.body.appendChild(poolPanel);

    function clearVerdicts() {
      for (var k = 0; k < slotVerdict.length; k++) {
        slotVerdict[k] = null;
      }
    }

    function countFilled() {
      var n = 0;
      for (var k = 0; k < placedIds.length; k++) {
        if (placedIds[k]) n++;
      }
      return n;
    }

    function isInPlaced(evId) {
      return placedIds.indexOf(evId) !== -1;
    }

    function handleSlotClick(slotIdx) {
      if (finished) return;
      clearVerdicts();

      // Case 1: A pool card is currently selected -> place it here (returning old card to pool if any)
      if (selectedPoolId) {
        placedIds[slotIdx] = selectedPoolId;
        selectedPoolId = null;
        selectedSlotIdx = -1;
        haptic('light');
        sfx('click');
        renderBoard();
        return;
      }

      // Case 2: Another slot was selected -> swap contents between the two slots
      if (selectedSlotIdx !== -1) {
        if (selectedSlotIdx === slotIdx) {
          // Clicking same selected slot deselects it
          selectedSlotIdx = -1;
          haptic('light');
          renderBoard();
          return;
        }
        var tmp = placedIds[slotIdx];
        placedIds[slotIdx] = placedIds[selectedSlotIdx];
        placedIds[selectedSlotIdx] = tmp;
        selectedSlotIdx = -1;
        haptic('light');
        sfx('click');
        renderBoard();
        return;
      }

      // Case 3: Nothing selected yet
      if (placedIds[slotIdx]) {
        selectedSlotIdx = slotIdx;
        haptic('light');
        sfx('click');
        statusEl.className = 'mg-f2-status is-warn';
        statusText.textContent = 'Нажмите другой слот для обмена или «×», чтобы вернуть в пул';
        renderBoard();
      } else {
        haptic('light');
        statusEl.className = 'mg-f2-status';
        statusText.textContent = 'Сначала выберите карточку события в списке ниже';
      }
    }

    function handleClearSlot(slotIdx, ev) {
      if (ev) ev.stopPropagation();
      if (finished || !placedIds[slotIdx]) return;
      clearVerdicts();
      placedIds[slotIdx] = null;
      if (selectedSlotIdx === slotIdx) selectedSlotIdx = -1;
      haptic('light');
      sfx('click');
      renderBoard();
    }

    function handlePoolCardClick(evId) {
      if (finished) return;
      clearVerdicts();

      // If a slot was already selected, put this pool card straight into that slot
      if (selectedSlotIdx !== -1) {
        placedIds[selectedSlotIdx] = evId;
        selectedSlotIdx = -1;
        selectedPoolId = null;
        haptic('light');
        sfx('click');
        renderBoard();
        return;
      }

      if (selectedPoolId === evId) {
        selectedPoolId = null;
      } else {
        selectedPoolId = evId;
        statusEl.className = 'mg-f2-status is-warn';
        statusText.textContent = 'Теперь нажмите на подходящее время сверху';
      }
      haptic('light');
      sfx('click');
      renderBoard();
    }

    function renderBoard() {
      var filled = countFilled();
      filledBadge.textContent = filled + ' / ' + correctSequence.length;
      filledBadge.className = 'mg-f2-value' + (filled === correctSequence.length ? ' is-ok' : '');

      if (filled === correctSequence.length && !finished) {
        checkBtn.classList.add('is-ready');
      } else if (!finished) {
        checkBtn.classList.remove('is-ready');
      }

      // Rebuild slots DOM cleanly
      slotsContainer.innerHTML = '';
      for (var s = 0; s < correctSequence.length; s++) {
        (function (idx) {
          var row = document.createElement('div');
          var cls = 'mg-tl-slot';
          if (selectedSlotIdx === idx) cls += ' is-selected';
          if (slotVerdict[idx] === 'correct') cls += ' is-correct';
          if (slotVerdict[idx] === 'wrong') cls += ' is-wrong';
          row.className = cls;

          var timeBox = document.createElement('div');
          timeBox.className = 'mg-tl-time';
          timeBox.textContent = slotTimes[idx];
          row.appendChild(timeBox);

          var content = document.createElement('div');
          content.className = 'mg-tl-slot-content';

          var placedId = placedIds[idx];
          if (placedId && eventById[placedId]) {
            var evData = eventById[placedId];
            var titleDiv = document.createElement('div');
            titleDiv.className = 'mg-tl-card-title';
            titleDiv.textContent = evData.title;
            var tagDiv = document.createElement('div');
            tagDiv.className = 'mg-tl-card-tag';
            tagDiv.textContent = evData.tag;
            content.appendChild(titleDiv);
            content.appendChild(tagDiv);
          } else {
            var ph = document.createElement('div');
            ph.className = 'mg-tl-placeholder';
            ph.textContent = selectedPoolId ? '→ НАЖМИТЕ, ЧТОБЫ ПОМЕСТИТЬ СЮДА' : '[ ПУСТОЙ СЛОТ ВРЕМЕНИ ]';
            content.appendChild(ph);
          }
          row.appendChild(content);

          if (placedId && !finished) {
            var clearBtn = document.createElement('button');
            clearBtn.type = 'button';
            clearBtn.className = 'mg-tl-clear';
            clearBtn.textContent = '×';
            clearBtn.setAttribute('aria-label', 'Убрать карточку');
            clearBtn.addEventListener('click', function (e) {
              handleClearSlot(idx, e);
            });
            row.appendChild(clearBtn);
          }

          row.addEventListener('click', function () {
            handleSlotClick(idx);
          });
          slotsContainer.appendChild(row);
        })(s);
      }

      // Rebuild remaining pool cards
      poolContainer.innerHTML = '';
      var remaining = 0;
      for (var p = 0; p < poolOrder.length; p++) {
        var evId = poolOrder[p];
        if (isInPlaced(evId)) continue;
        remaining++;
        (function (id) {
          var evData = eventById[id];
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
            handlePoolCardClick(id);
          });
          poolContainer.appendChild(card);
        })(evId);
      }

      poolCount.textContent = 'ОСТАЛОСЬ: ' + remaining;
      poolPanel.style.display = remaining === 0 ? 'none' : 'flex';
    }

    listeners.on(checkBtn, 'click', function () {
      if (finished) return;
      var filled = countFilled();
      if (filled < correctSequence.length) {
        haptic('error');
        sfx('error');
        flashShake(board);
        statusEl.className = 'mg-f2-status is-warn';
        statusText.textContent =
          'Заполните все временные слоты (' + filled + ' из ' + correctSequence.length + ')';
        return;
      }

      selectedPoolId = null;
      selectedSlotIdx = -1;

      var wrongCount = 0;
      for (var k = 0; k < correctSequence.length; k++) {
        if (placedIds[k] === correctSequence[k].id) {
          slotVerdict[k] = 'correct';
        } else {
          slotVerdict[k] = 'wrong';
          wrongCount++;
        }
      }

      renderBoard();

      if (wrongCount === 0) {
        finished = true;
        checkBtn.disabled = true;
        checkBtn.classList.add('is-ready');
        statusEl.className = 'mg-f2-status is-ok';
        statusText.textContent = 'СХЕМА ПРЕСТУПЛЕНИЯ ПОДТВЕРЖДЕНА // ОРДЕР ОДОБРЕН';

        var stamp = document.createElement('div');
        stamp.className = 'mg-tl-stamp';
        var stampInner = document.createElement('div');
        stampInner.className = 'mg-tl-stamp-inner';
        stampInner.textContent = 'СХЕМА ПРЕСТУПЛЕНИЯ ПОДТВЕРЖДЕНА // ОРДЕР ОДОБРЕН';
        stamp.appendChild(stampInner);
        board.appendChild(stamp);

        haptic('success');
        sfx('success');

        timers.setTimeout(function () {
          triggerWin({
            minigame: 'timeline_reconstruct',
            order: placedIds.slice()
          });
        }, 1000);
      } else {
        haptic('error');
        sfx('error');
        flashShake(board);
        statusEl.className = 'mg-f2-status is-err';
        var word =
          wrongCount === 1
            ? 'событие'
            : wrongCount >= 2 && wrongCount <= 4
            ? 'события'
            : 'событий';
        statusText.textContent =
          'Нарушена хронология: не на своих местах — ' + wrongCount + ' ' + word;
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
