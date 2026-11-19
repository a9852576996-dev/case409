(function () {
  'use strict';

  var STYLE_ID = 'minigames-styles';
  var handlers = {};
  var activeCleanup = null;

  var SHARED_CSS =
    '.mg-wrap {' +
      'height: 100%;' +
      'width: 100%;' +
      'flex: 1;' +
      'min-height: 0;' +
      'display: flex;' +
      'flex-direction: column;' +
      'gap: 10px;' +
      'color: #e2dfd7;' +
      'font-family: "Inter", sans-serif;' +
      'position: relative;' +
    '}' +
    '.mg-header {' +
      'flex-shrink: 0;' +
      'display: flex;' +
      'align-items: center;' +
      'justify-content: space-between;' +
      'gap: 8px;' +
      'padding: 10px 12px;' +
      'background: #15171c;' +
      'border: 1px solid #2a2e38;' +
      'border-left: 3px solid #c98a2e;' +
      'border-radius: 3px;' +
    '}' +
    '.mg-header-info {' +
      'display: flex;' +
      'flex-direction: column;' +
      'gap: 3px;' +
      'min-width: 0;' +
    '}' +
    '.mg-header-title {' +
      'font-family: "Oswald", sans-serif;' +
      'font-size: 16px;' +
      'font-weight: 700;' +
      'letter-spacing: 0.08em;' +
      'text-transform: uppercase;' +
      'color: #d4cab4;' +
      'line-height: 1.15;' +
      'white-space: nowrap;' +
      'overflow: hidden;' +
      'text-overflow: ellipsis;' +
    '}' +
    '.mg-counter {' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 11px;' +
      'font-weight: 600;' +
      'letter-spacing: 0.08em;' +
      'color: #c98a2e;' +
      'text-transform: uppercase;' +
    '}' +
    '.mg-body {' +
      'flex: 1;' +
      'min-height: 0;' +
      'position: relative;' +
      'overflow: hidden;' +
      'touch-action: none;' +
      'background: #0b0c0e;' +
      'border: 1px solid #2a2e38;' +
      'border-radius: 4px;' +
      'box-shadow: inset 0 0 24px rgba(0, 0, 0, 0.85);' +
    '}' +
    '.mg-canvas {' +
      'width: 100%;' +
      'height: 100%;' +
      'display: block;' +
      'touch-action: none;' +
      '-webkit-user-select: none;' +
      'user-select: none;' +
    '}' +
    '.mg-footer {' +
      'flex-shrink: 0;' +
      'display: flex;' +
      'align-items: center;' +
      'justify-content: space-between;' +
      'gap: 8px;' +
      'padding: 9px 10px;' +
      'background: #15171c;' +
      'border: 1px solid #2a2e38;' +
      'border-radius: 3px;' +
    '}' +
    '.mg-btn {' +
      'display: inline-flex;' +
      'align-items: center;' +
      'justify-content: center;' +
      'padding: 9px 12px;' +
      'font-family: "Oswald", sans-serif;' +
      'font-size: 13px;' +
      'font-weight: 700;' +
      'letter-spacing: 0.1em;' +
      'text-transform: uppercase;' +
      'color: #d4cab4;' +
      'background: #1c1f26;' +
      'border: 1px solid #353b48;' +
      'border-radius: 3px;' +
      'cursor: pointer;' +
      'transition: transform 0.1s ease, border-color 0.15s ease, background-color 0.15s ease;' +
    '}' +
    '.mg-btn:active {' +
      'transform: scale(0.96);' +
      'border-color: #c98a2e;' +
      'background: #252933;' +
    '}' +
    '.mg-btn-cancel {' +
      'flex-shrink: 0;' +
      'padding: 7px 11px;' +
      'font-size: 12px;' +
      'color: #b7b3a8;' +
      'border-color: #353b48;' +
    '}' +
    '.mg-btn-primary {' +
      'color: #1a1815;' +
      'background: linear-gradient(180deg, #d89b3c 0%, #c98a2e 100%);' +
      'border-color: #e2ad58;' +
    '}' +
    '.mg-btn-primary:active {' +
      'background: #b57b24;' +
    '}' +
    '.mg-btn-danger {' +
      'color: #f4efe6;' +
      'background: linear-gradient(180deg, #a62020 0%, #991b1b 100%);' +
      'border-color: #c93333;' +
    '}' +
    '.mg-btn-danger:active {' +
      'background: #7f1616;' +
    '}' +
    '.mg-uv-hint {' +
      'position: absolute;' +
      'left: 12px;' +
      'right: 12px;' +
      'top: 12px;' +
      'padding: 8px 10px;' +
      'background: rgba(11, 12, 14, 0.84);' +
      'border: 1px solid rgba(201, 138, 46, 0.4);' +
      'border-radius: 3px;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 11px;' +
      'line-height: 1.45;' +
      'color: #d4cab4;' +
      'text-align: center;' +
      'pointer-events: none;' +
      'transition: opacity 0.35s ease;' +
    '}' +
    '.mg-uv-hint.is-faded {' +
      'opacity: 0;' +
    '}' +
    '.mg-uv-toast {' +
      'position: absolute;' +
      'left: 12px;' +
      'right: 12px;' +
      'bottom: 14px;' +
      'padding: 9px 12px;' +
      'background: rgba(21, 23, 28, 0.94);' +
      'border: 1px solid #c98a2e;' +
      'border-left: 3px solid #c98a2e;' +
      'border-radius: 3px;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 12px;' +
      'font-weight: 600;' +
      'color: #d4cab4;' +
      'text-align: center;' +
      'pointer-events: none;' +
      'opacity: 0;' +
      'transform: translateY(8px);' +
      'transition: opacity 0.2s ease, transform 0.2s ease;' +
      'box-shadow: 0 6px 18px rgba(0, 0, 0, 0.72);' +
    '}' +
    '.mg-uv-toast.is-visible {' +
      'opacity: 1;' +
      'transform: translateY(0);' +
    '}' +
    '.mg-uv-slots {' +
      'display: flex;' +
      'align-items: center;' +
      'gap: 6px;' +
      'flex: 1;' +
      'min-width: 0;' +
    '}' +
    '.mg-uv-slot {' +
      'flex: 1;' +
      'height: 8px;' +
      'background: #0b0c0e;' +
      'border: 1px solid #2a2e38;' +
      'border-radius: 2px;' +
      'transition: background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;' +
    '}' +
    '.mg-uv-slot.is-found {' +
      'background: #c98a2e;' +
      'border-color: #e4ac55;' +
      'box-shadow: 0 0 8px rgba(201, 138, 46, 0.55);' +
    '}' +
    '.mg-uv-telemetry {' +
      'flex-shrink: 0;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 10px;' +
      'font-weight: 600;' +
      'letter-spacing: 0.08em;' +
      'color: #7c8496;' +
      'text-transform: uppercase;' +
    '}' +
    '.mg-uv-telemetry.is-on {' +
      'color: #7e8cff;' +
    '}' +
    '.mg-missing {' +
      'flex: 1;' +
      'display: flex;' +
      'flex-direction: column;' +
      'align-items: center;' +
      'justify-content: center;' +
      'gap: 12px;' +
      'padding: 18px;' +
      'text-align: center;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 12px;' +
      'color: #8b8f99;' +
    '}';

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) {
      return;
    }
    var styleEl = document.createElement('style');
    styleEl.id = STYLE_ID;
    styleEl.textContent = SHARED_CSS;
    document.head.appendChild(styleEl);
  }

  function safeHaptic(type) {
    try {
      if (window.GameEngine && typeof window.GameEngine.haptic === 'function') {
        window.GameEngine.haptic(type);
      }
    } catch (e) {
      // Safe fallback
    }
  }

  function safeSfx(name) {
    try {
      if (!name || !window.GameAudio) {
        return;
      }
      if (typeof window.GameAudio[name] === 'function') {
        window.GameAudio[name]();
        return;
      }
      var prefixed = 'sfx' + name.charAt(0).toUpperCase() + name.slice(1);
      if (typeof window.GameAudio[prefixed] === 'function') {
        window.GameAudio[prefixed]();
      }
    } catch (e) {
      // Safe fallback
    }
  }

  function destroy() {
    if (typeof activeCleanup === 'function') {
      var fn = activeCleanup;
      activeCleanup = null;
      try {
        fn();
      } catch (e) {
        // Ignore cleanup errors
      }
    }
  }

  function register(id, handlerFn) {
    if (typeof id === 'string' && id && typeof handlerFn === 'function') {
      handlers[id] = handlerFn;
    }
  }

  function start(minigameId, containerEl, config, callbacks) {
    destroy();
    injectStyles();

    if (!containerEl) {
      return;
    }
    containerEl.innerHTML = '';

    var cb = callbacks || {};
    var finished = false;

    var wrappedCallbacks = {
      onSuccess: function (result) {
        if (finished) {
          return;
        }
        finished = true;
        destroy();
        if (typeof cb.onSuccess === 'function') {
          cb.onSuccess(result);
        }
      },
      onFail: function (result) {
        if (finished) {
          return;
        }
        finished = true;
        destroy();
        if (typeof cb.onFail === 'function') {
          cb.onFail(result);
        }
      },
      onCancel: function () {
        if (finished) {
          return;
        }
        finished = true;
        destroy();
        if (typeof cb.onCancel === 'function') {
          cb.onCancel();
        }
      }
    };

    var handler = handlers[minigameId];
    if (typeof handler !== 'function') {
      var wrap = document.createElement('div');
      wrap.className = 'mg-wrap';

      var header = document.createElement('div');
      header.className = 'mg-header';

      var info = document.createElement('div');
      info.className = 'mg-header-info';

      var title = document.createElement('div');
      title.className = 'mg-header-title';
      title.textContent = 'ТЕРМИНАЛ ЭКСПЕРТИЗЫ';
      info.appendChild(title);

      var btnCancel = document.createElement('button');
      btnCancel.type = 'button';
      btnCancel.className = 'mg-btn mg-btn-cancel';
      btnCancel.textContent = 'НАЗАД';
      btnCancel.addEventListener('click', function () {
        wrappedCallbacks.onCancel();
      });

      header.appendChild(info);
      header.appendChild(btnCancel);

      var body = document.createElement('div');
      body.className = 'mg-body';

      var missing = document.createElement('div');
      missing.className = 'mg-missing';
      missing.textContent = 'Модуль мини-игры «' + String(minigameId || 'unknown') + '» не зарегистрирован.';
      body.appendChild(missing);

      wrap.appendChild(header);
      wrap.appendChild(body);
      containerEl.appendChild(wrap);
      return;
    }

    var cleanupFn = handler(containerEl, config || {}, wrappedCallbacks);
    if (typeof cleanupFn === 'function') {
      activeCleanup = cleanupFn;
    }
  }

  window.GameMinigames = {
    register: register,
    start: start,
    destroy: destroy,
    haptic: safeHaptic,
    sfx: safeSfx
  };

  /* ===== MINIGAME 1: UV_SEARCH (Осмотр дренажной канавы с УФ-фонариком) ===== */

  function createPrng(seed) {
    var a = seed >>> 0;
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function detectEvidenceKind(item) {
    var raw = String(
      (item.kind || item.icon || item.type || item.id || '') + ' ' + (item.name || item.title || '')
    ).toLowerCase();

    if (raw.indexOf('knife') !== -1 || raw.indexOf('нож') !== -1 || raw.indexOf('лезв') !== -1) {
      return 'knife';
    }
    if (raw.indexOf('phone') !== -1 || raw.indexOf('смартфон') !== -1 || raw.indexOf('телефон') !== -1) {
      return 'phone';
    }
    if (raw.indexOf('vial') !== -1 || raw.indexOf('bottle') !== -1 || raw.indexOf('флакон') !== -1 || raw.indexOf('антисептик') !== -1) {
      return 'vial';
    }
    if (raw.indexOf('fabric') !== -1 || raw.indexOf('cloth') !== -1 || raw.indexOf('ткан') !== -1 || raw.indexOf('ворс') !== -1 || raw.indexOf('обрыв') !== -1) {
      return 'fabric';
    }
    return 'generic';
  }

  function normalizeCoord(val, fallback) {
    var n = Number(val);
    if (isNaN(n)) {
      return fallback;
    }
    if (n > 1) {
      return Math.max(0.1, Math.min(0.9, n / 100));
    }
    return Math.max(0.1, Math.min(0.9, n));
  }

  function drawDitchBackground(bCtx, w, h) {
    var rand = createPrng(4092026);

    // Base damp earth / drainage channel mud
    var baseGrad = bCtx.createLinearGradient(0, 0, w, h);
    baseGrad.addColorStop(0, '#1e2024');
    baseGrad.addColorStop(0.32, '#171512');
    baseGrad.addColorStop(0.68, '#141517');
    baseGrad.addColorStop(1, '#1b1814');
    bCtx.fillStyle = baseGrad;
    bCtx.fillRect(0, 0, w, h);

    // Wet concrete drainage channel slope on top-left & bottom-right curbs
    bCtx.save();
    bCtx.beginPath();
    bCtx.moveTo(0, 0);
    bCtx.lineTo(w * 0.62, 0);
    bCtx.lineTo(w * 0.34, h * 0.38);
    bCtx.lineTo(0, h * 0.56);
    bCtx.closePath();
    var concGrad1 = bCtx.createLinearGradient(0, 0, w * 0.45, h * 0.45);
    concGrad1.addColorStop(0, '#32363e');
    concGrad1.addColorStop(0.7, '#24272d');
    concGrad1.addColorStop(1, '#17191d');
    bCtx.fillStyle = concGrad1;
    bCtx.fill();

    // Concrete seam & cracks
    bCtx.strokeStyle = 'rgba(10, 11, 14, 0.72)';
    bCtx.lineWidth = 2;
    bCtx.beginPath();
    bCtx.moveTo(w * 0.28, 0);
    bCtx.lineTo(w * 0.12, h * 0.46);
    bCtx.stroke();

    bCtx.strokeStyle = 'rgba(14, 15, 18, 0.55)';
    bCtx.lineWidth = 1;
    for (var cr = 0; cr < 5; cr++) {
      var cx = rand() * w * 0.48;
      var cy = rand() * h * 0.36;
      bCtx.beginPath();
      bCtx.moveTo(cx, cy);
      for (var seg = 0; seg < 4; seg++) {
        cx += (rand() - 0.35) * 26;
        cy += (rand() - 0.2) * 24;
        bCtx.lineTo(cx, cy);
      }
      bCtx.stroke();
    }

    // Bottom concrete curb edge
    bCtx.beginPath();
    bCtx.moveTo(w, h * 0.66);
    bCtx.lineTo(w, h);
    bCtx.lineTo(w * 0.46, h);
    bCtx.lineTo(w * 0.72, h * 0.76);
    bCtx.closePath();
    var concGrad2 = bCtx.createLinearGradient(w, h, w * 0.55, h * 0.7);
    concGrad2.addColorStop(0, '#2d3138');
    concGrad2.addColorStop(1, '#181a1e');
    bCtx.fillStyle = concGrad2;
    bCtx.fill();
    bCtx.restore();

    // Mottled wet mud patches
    for (var m = 0; m < 44; m++) {
      var mx = rand() * w;
      var my = rand() * h;
      var mr = 16 + rand() * 54;
      var mg = bCtx.createRadialGradient(mx, my, 2, mx, my, mr);
      var warm = rand() > 0.45;
      mg.addColorStop(0, warm ? 'rgba(44, 34, 24, 0.42)' : 'rgba(26, 30, 34, 0.42)');
      mg.addColorStop(1, 'rgba(16, 15, 14, 0)');
      bCtx.fillStyle = mg;
      bCtx.beginPath();
      bCtx.arc(mx, my, mr, 0, Math.PI * 2);
      bCtx.fill();
    }

    // Rusty drainage pipe / grate rim in top-right corner
    bCtx.save();
    bCtx.strokeStyle = 'rgba(72, 46, 34, 0.48)';
    bCtx.lineWidth = 4;
    for (var g = 0; g < 5; g++) {
      bCtx.beginPath();
      bCtx.moveTo(w * 0.8 + g * 9, 0);
      bCtx.lineTo(w * 0.75 + g * 9, h * 0.13);
      bCtx.stroke();
    }
    bCtx.restore();

    // Dark stagnant water puddles with subtle glossy rims
    var puddles = [
      { x: w * 0.48, y: h * 0.46, rx: w * 0.24, ry: h * 0.11, rot: -0.22 },
      { x: w * 0.22, y: h * 0.66, rx: w * 0.16, ry: h * 0.08, rot: 0.35 },
      { x: w * 0.74, y: h * 0.42, rx: w * 0.15, ry: h * 0.075, rot: 0.18 },
      { x: w * 0.52, y: h * 0.84, rx: w * 0.2, ry: h * 0.07, rot: -0.1 }
    ];

    for (var p = 0; p < puddles.length; p++) {
      var pd = puddles[p];
      bCtx.save();
      bCtx.translate(pd.x, pd.y);
      bCtx.rotate(pd.rot);

      // Wet mud rim
      bCtx.beginPath();
      bCtx.ellipse(0, 0, pd.rx * 1.12, pd.ry * 1.15, 0, 0, Math.PI * 2);
      bCtx.fillStyle = 'rgba(10, 10, 12, 0.45)';
      bCtx.fill();

      // Puddle body
      bCtx.beginPath();
      bCtx.ellipse(0, 0, pd.rx, pd.ry, 0, 0, Math.PI * 2);
      var pGrad = bCtx.createRadialGradient(-pd.rx * 0.2, -pd.ry * 0.2, 4, 0, 0, pd.rx);
      pGrad.addColorStop(0, '#14202b');
      pGrad.addColorStop(0.65, '#0b1218');
      pGrad.addColorStop(1, '#080c10');
      bCtx.fillStyle = pGrad;
      bCtx.fill();

      // Faint oily shimmer & rim reflection
      bCtx.strokeStyle = 'rgba(110, 138, 165, 0.18)';
      bCtx.lineWidth = 1.2;
      bCtx.stroke();

      bCtx.beginPath();
      bCtx.ellipse(-pd.rx * 0.18, -pd.ry * 0.15, pd.rx * 0.48, pd.ry * 0.28, 0.15, 0, Math.PI * 2);
      bCtx.fillStyle = 'rgba(92, 118, 148, 0.08)';
      bCtx.fill();
      bCtx.restore();
    }

    // Scattered gravel, grit, debris pebbles
    for (var s = 0; s < 240; s++) {
      var sx = rand() * w;
      var sy = rand() * h;
      var sr = 0.8 + rand() * 2.4;
      var shade = Math.floor(32 + rand() * 34);
      bCtx.fillStyle =
        rand() > 0.35
          ? 'rgba(' + shade + ',' + (shade - 2) + ',' + (shade - 6) + ',0.55)'
          : 'rgba(16, 15, 14, 0.65)';
      bCtx.beginPath();
      bCtx.arc(sx, sy, sr, 0, Math.PI * 2);
      bCtx.fill();
    }

    // Withered grass tufts & dry reeds along banks and cracks
    var grassClusters = [
      { x: w * 0.12, y: h * 0.22, n: 16 },
      { x: w * 0.36, y: h * 0.18, n: 14 },
      { x: w * 0.86, y: h * 0.25, n: 18 },
      { x: w * 0.1, y: h * 0.56, n: 20 },
      { x: w * 0.88, y: h * 0.62, n: 18 },
      { x: w * 0.24, y: h * 0.88, n: 16 },
      { x: w * 0.64, y: h * 0.72, n: 15 },
      { x: w * 0.46, y: h * 0.3, n: 12 }
    ];

    for (var gc = 0; gc < grassClusters.length; gc++) {
      var cl = grassClusters[gc];
      for (var b = 0; b < cl.n; b++) {
        var bx = cl.x + (rand() - 0.5) * 34;
        var by = cl.y + (rand() - 0.5) * 26;
        var len = 14 + rand() * 26;
        var ang = -Math.PI * 0.5 + (rand() - 0.5) * 2.2;
        var ex = bx + Math.cos(ang) * len;
        var ey = by + Math.sin(ang) * len;
        var ctrlX = (bx + ex) * 0.5 + (rand() - 0.5) * 14;
        var ctrlY = (by + ey) * 0.5 - rand() * 8;

        bCtx.strokeStyle =
          rand() > 0.5
            ? 'rgba(78, 70, 44, 0.52)'
            : 'rgba(52, 54, 38, 0.56)';
        bCtx.lineWidth = 1 + rand() * 0.9;
        bCtx.beginPath();
        bCtx.moveTo(bx, by);
        bCtx.quadraticCurveTo(ctrlX, ctrlY, ex, ey);
        bCtx.stroke();
      }
    }
  }

  function drawEvidenceSilhouette(ctx, kind, x, y) {
    ctx.save();
    ctx.translate(x, y);
    if (kind === 'knife') {
      ctx.rotate(-0.55);
      ctx.fillStyle = '#25262a';
      ctx.fillRect(-19, -3.5, 14, 7);
      ctx.fillStyle = '#4c525e';
      ctx.beginPath();
      ctx.moveTo(-5, -4);
      ctx.lineTo(19, -1.5);
      ctx.lineTo(23, 2.5);
      ctx.lineTo(-5, 3.5);
      ctx.closePath();
      ctx.fill();
    } else if (kind === 'phone') {
      ctx.rotate(0.28);
      ctx.fillStyle = '#1d2028';
      ctx.strokeStyle = '#3d4452';
      ctx.lineWidth = 1.5;
      ctx.fillRect(-10, -17, 20, 34);
      ctx.strokeRect(-10, -17, 20, 34);
    } else if (kind === 'vial') {
      ctx.rotate(-0.35);
      ctx.fillStyle = '#2c353d';
      ctx.fillRect(-6, -13, 12, 22);
      ctx.fillStyle = '#3f454f';
      ctx.fillRect(-4, -18, 8, 5);
    } else if (kind === 'fabric') {
      ctx.rotate(0.2);
      ctx.fillStyle = '#2b2526';
      ctx.beginPath();
      ctx.moveTo(-14, -8);
      ctx.lineTo(4, -12);
      ctx.lineTo(15, -3);
      ctx.lineTo(10, 10);
      ctx.lineTo(-9, 12);
      ctx.lineTo(-16, 2);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillStyle = '#2f3540';
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawEvidenceFluorescence(ctx, kind, x, y, intensity, timeSec, index) {
    if (intensity <= 0.02) {
      return;
    }

    var pulse = 0.88 + 0.12 * Math.sin(timeSec * 5.2 + index * 1.7);
    var alpha = Math.min(1, intensity * 1.15) * pulse;

    ctx.save();
    ctx.translate(x, y);

    // Outer UV luminol glow
    var glowR = 30 + intensity * 12;
    var halo = ctx.createRadialGradient(0, 0, 2, 0, 0, glowR);
    halo.addColorStop(0, 'rgba(82, 238, 255, ' + (0.34 * alpha).toFixed(3) + ')');
    halo.addColorStop(0.5, 'rgba(116, 98, 255, ' + (0.2 * alpha).toFixed(3) + ')');
    halo.addColorStop(1, 'rgba(72, 48, 190, 0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(0, 0, glowR, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = Math.min(1, alpha * 1.1);
    ctx.shadowColor = '#4ef6ff';
    ctx.shadowBlur = 10 * intensity;

    if (kind === 'knife') {
      ctx.rotate(-0.55);
      // Blade metallic edge glint
      ctx.strokeStyle = '#8ef8ff';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(-5, -4);
      ctx.lineTo(19, -1.5);
      ctx.lineTo(23, 2.5);
      ctx.lineTo(-5, 3.5);
      ctx.closePath();
      ctx.stroke();

      // Glowing luminol smears & droplets on blade and guard
      ctx.fillStyle = '#5cf6ff';
      ctx.beginPath();
      ctx.ellipse(7, 0.5, 7, 2.2, 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(-5, 1, 2.6, 0, Math.PI * 2);
      ctx.arc(16, 0.2, 1.9, 0, Math.PI * 2);
      ctx.arc(-11, -1.2, 1.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (kind === 'phone') {
      ctx.rotate(0.28);
      ctx.strokeStyle = '#92e9ff';
      ctx.lineWidth = 1.4;
      ctx.strokeRect(-10, -17, 20, 34);

      // Spiderweb cracked screen glowing under UV
      ctx.strokeStyle = '#6cf4ff';
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(-2, -3);
      ctx.lineTo(-9, -13);
      ctx.moveTo(-2, -3);
      ctx.lineTo(8, -11);
      ctx.moveTo(-2, -3);
      ctx.lineTo(9, 4);
      ctx.moveTo(-2, -3);
      ctx.lineTo(3, 14);
      ctx.moveTo(-2, -3);
      ctx.lineTo(-8, 9);
      ctx.moveTo(-6, -8);
      ctx.lineTo(2, -7);
      ctx.lineTo(5, 1);
      ctx.stroke();

      // Impact point glint
      ctx.fillStyle = '#d4fdff';
      ctx.beginPath();
      ctx.arc(-2, -3, 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (kind === 'vial') {
      ctx.rotate(-0.35);
      // Medical glass bottle outline
      ctx.strokeStyle = '#8ef5ff';
      ctx.lineWidth = 1.4;
      ctx.strokeRect(-6, -13, 12, 22);
      ctx.strokeRect(-4, -18, 8, 5);

      // Glowing antiseptic liquid residue inside
      ctx.fillStyle = 'rgba(92, 245, 255, 0.72)';
      ctx.fillRect(-4.5, -2, 9, 9.5);

      // Cap/shoulder specular highlight
      ctx.strokeStyle = '#d6fcff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-3.5, -11);
      ctx.lineTo(-3.5, -4);
      ctx.stroke();
    } else if (kind === 'fabric') {
      ctx.rotate(0.2);
      // Torn cloth contour
      ctx.strokeStyle = '#8d9bff';
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(-14, -8);
      ctx.lineTo(4, -12);
      ctx.lineTo(15, -3);
      ctx.lineTo(10, 10);
      ctx.lineTo(-9, 12);
      ctx.lineTo(-16, 2);
      ctx.closePath();
      ctx.stroke();

      // Bright fluorescent synthetic lint fibers
      ctx.strokeStyle = '#6cf7ff';
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.moveTo(-12, -5);
      ctx.lineTo(-19, -9);
      ctx.moveTo(6, -10);
      ctx.lineTo(11, -16);
      ctx.moveTo(13, 2);
      ctx.lineTo(20, 5);
      ctx.moveTo(-6, 10);
      ctx.lineTo(-10, 17);
      ctx.moveTo(-6, -2);
      ctx.lineTo(7, 3);
      ctx.moveTo(-2, 6);
      ctx.lineTo(8, -4);
      ctx.stroke();
    } else {
      ctx.strokeStyle = '#68f4ff';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(0, 0, 11, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#9cfbff';
      ctx.beginPath();
      ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  function drawProgressRing(ctx, x, y, progress) {
    if (progress <= 0.01) {
      return;
    }
    var r = 30;
    var startAngle = -Math.PI * 0.5;
    var endAngle = startAngle + Math.min(1, progress) * Math.PI * 2;

    ctx.save();
    // Subtle dark backing track
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(201, 138, 46, 0.22)';
    ctx.lineWidth = 3.5;
    ctx.stroke();

    // Glowing amber capture progress arc
    ctx.beginPath();
    ctx.arc(x, y, r, startAngle, endAngle);
    ctx.strokeStyle = '#e5a443';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.shadowColor = '#c98a2e';
    ctx.shadowBlur = 10;
    ctx.stroke();

    // Corner reticle ticks
    var tickR = r + 6 - progress * 3;
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(229, 164, 67, 0.75)';
    ctx.lineWidth = 1.2;
    for (var k = 0; k < 4; k++) {
      var a = (Math.PI * 0.5) * k + Math.PI * 0.25;
      ctx.beginPath();
      ctx.moveTo(x + Math.cos(a) * (tickR - 3), y + Math.sin(a) * (tickR - 3));
      ctx.lineTo(x + Math.cos(a) * (tickR + 3), y + Math.sin(a) * (tickR + 3));
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawCollectedMarker(ctx, x, y, num, ripple) {
    ctx.save();

    if (ripple > 0) {
      var rp = 1 - ripple;
      ctx.beginPath();
      ctx.arc(x, y, 16 + rp * 44, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(201, 138, 46, ' + (ripple * 0.85).toFixed(3) + ')';
      ctx.lineWidth = 2.2;
      ctx.stroke();
    }

    // Small amber forensic evidence tag
    ctx.beginPath();
    ctx.arc(x, y, 11, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(201, 138, 46, 0.22)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(201, 138, 46, 0.78)';
    ctx.lineWidth = 1.4;
    ctx.stroke();

    ctx.fillStyle = '#e6c58a';
    ctx.font = '600 10px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(num), x, y + 0.5);
    ctx.restore();
  }

  register('uv_search', function (containerEl, config, callbacks) {
    var defaultItems = [
      { id: 'knife', name: 'Нож со следами люминола', x: 24, y: 29, kind: 'knife' },
      { id: 'phone', name: 'Разбитый смартфон', x: 74, y: 24, kind: 'phone' },
      { id: 'vial', name: 'Флакон антисептика', x: 29, y: 74, kind: 'vial' },
      { id: 'fabric', name: 'Обрывок ткани с ворсом', x: 72, y: 69, kind: 'fabric' }
    ];

    var rawItems = Array.isArray(config.items) && config.items.length > 0 ? config.items : defaultItems;
    var holdDuration =
      typeof config.holdDuration === 'number' && config.holdDuration > 0.2
        ? config.holdDuration
        : 1.2;

    var items = [];
    for (var i = 0; i < rawItems.length; i++) {
      var src = rawItems[i] || {};
      var fallback = defaultItems[i % defaultItems.length];
      items.push({
        id: src.id || 'item_' + (i + 1),
        name: src.name || src.title || src.label || fallback.name,
        nx: normalizeCoord(src.x, fallback.x / 100),
        ny: normalizeCoord(src.y, fallback.y / 100),
        kind: detectEvidenceKind(src),
        found: false,
        foundOrder: 0,
        progress: 0,
        inBeam: false,
        ripple: 0
      });
    }

    var totalCount = items.length;
    var foundCount = 0;

    // Build DOM
    var wrap = document.createElement('div');
    wrap.className = 'mg-wrap';

    var header = document.createElement('div');
    header.className = 'mg-header';

    var headInfo = document.createElement('div');
    headInfo.className = 'mg-header-info';

    var titleEl = document.createElement('div');
    titleEl.className = 'mg-header-title';
    titleEl.textContent = config.title || 'УФ-ОСМОТР ДРЕНАЖНОЙ КАНАВЫ';

    var counterEl = document.createElement('div');
    counterEl.className = 'mg-counter';
    counterEl.textContent = 'ИЗЪЯТО: 0 / ' + totalCount;

    headInfo.appendChild(titleEl);
    headInfo.appendChild(counterEl);

    var btnBack = document.createElement('button');
    btnBack.type = 'button';
    btnBack.className = 'mg-btn mg-btn-cancel';
    btnBack.textContent = 'НАЗАД';
    btnBack.addEventListener('click', function () {
      safeSfx('sfxClick');
      safeHaptic('light');
      callbacks.onCancel();
    });

    header.appendChild(headInfo);
    header.appendChild(btnBack);

    var body = document.createElement('div');
    body.className = 'mg-body';

    var canvas = document.createElement('canvas');
    canvas.className = 'mg-canvas';
    body.appendChild(canvas);

    var hintEl = document.createElement('div');
    hintEl.className = 'mg-uv-hint';
    hintEl.textContent =
      config.hintText ||
      'Водите пальцем по экрану, подсвечивая канаву УФ-фонарём. Удерживайте луч на улике для изъятия.';
    body.appendChild(hintEl);

    var toastEl = document.createElement('div');
    toastEl.className = 'mg-uv-toast';
    body.appendChild(toastEl);

    var footer = document.createElement('div');
    footer.className = 'mg-footer';

    var slotsWrap = document.createElement('div');
    slotsWrap.className = 'mg-uv-slots';
    var slotEls = [];
    for (var s = 0; s < totalCount; s++) {
      var slot = document.createElement('div');
      slot.className = 'mg-uv-slot';
      slotsWrap.appendChild(slot);
      slotEls.push(slot);
    }

    var telemetryEl = document.createElement('div');
    telemetryEl.className = 'mg-uv-telemetry';
    telemetryEl.textContent = 'UV-365 // ВЫКЛ';

    footer.appendChild(slotsWrap);
    footer.appendChild(telemetryEl);

    wrap.appendChild(header);
    wrap.appendChild(body);
    wrap.appendChild(footer);
    containerEl.appendChild(wrap);

    // Canvas & offscreen setup
    var ctx = canvas.getContext('2d');
    var bgCanvas = document.createElement('canvas');
    var bgCtx = bgCanvas.getContext('2d');
    var maskCanvas = document.createElement('canvas');
    var maskCtx = maskCanvas.getContext('2d');

    var cssW = 320;
    var cssH = 420;
    var dpr = 1;
    var beamRadius = 86;
    var captureRadius = 48;

    var pointerActive = false;
    var activePointerId = null;
    var targetX = 0;
    var targetY = 0;
    var beamX = 0;
    var beamY = 0;
    var beamAlpha = 0;
    var hintHidden = false;
    var completed = false;
    var destroyed = false;

    var rafId = null;
    var winTimer = null;
    var toastTimer = null;
    var resizeObserver = null;
    var lastTime = performance.now();

    function showToast(text) {
      if (toastTimer !== null) {
        window.clearTimeout(toastTimer);
        toastTimer = null;
      }
      toastEl.textContent = text;
      toastEl.classList.add('is-visible');
      toastTimer = window.setTimeout(function () {
        toastTimer = null;
        toastEl.classList.remove('is-visible');
      }, 1200);
    }

    function resizeCanvas() {
      if (destroyed) {
        return;
      }
      var rect = body.getBoundingClientRect();
      var nextW = Math.max(160, Math.floor(rect.width));
      var nextH = Math.max(180, Math.floor(rect.height));

      dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      cssW = nextW;
      cssH = nextH;

      var physW = Math.floor(cssW * dpr);
      var physH = Math.floor(cssH * dpr);

      if (canvas.width !== physW || canvas.height !== physH) {
        canvas.width = physW;
        canvas.height = physH;
        bgCanvas.width = physW;
        bgCanvas.height = physH;
        maskCanvas.width = physW;
        maskCanvas.height = physH;

        bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        drawDitchBackground(bgCtx, cssW, cssH);
      }

      beamRadius =
        typeof config.beamRadius === 'number' && config.beamRadius > 30
          ? config.beamRadius
          : Math.max(76, Math.min(104, cssW * 0.25));
      captureRadius = Math.max(42, beamRadius * 0.56);
    }

    function updatePointerCoords(e) {
      var rect = canvas.getBoundingClientRect();
      targetX = Math.max(0, Math.min(cssW, e.clientX - rect.left));
      targetY = Math.max(0, Math.min(cssH, e.clientY - rect.top));
    }

    function onPointerDown(e) {
      if (destroyed || completed) {
        return;
      }
      e.preventDefault();
      if (activePointerId !== null && activePointerId !== e.pointerId) {
        return;
      }
      activePointerId = e.pointerId;
      pointerActive = true;
      updatePointerCoords(e);
      beamX = targetX;
      beamY = targetY;

      try {
        canvas.setPointerCapture(e.pointerId);
      } catch (err) {
        // Ignore capture errors
      }

      if (!hintHidden) {
        hintHidden = true;
        hintEl.classList.add('is-faded');
      }

      telemetryEl.textContent = 'UV-365 // АКТИВЕН';
      telemetryEl.classList.add('is-on');
      safeSfx('sfxClick');
    }

    function onPointerMove(e) {
      if (destroyed || !pointerActive || e.pointerId !== activePointerId) {
        return;
      }
      e.preventDefault();
      updatePointerCoords(e);
    }

    function endPointer(e) {
      if (activePointerId !== null && e.pointerId !== activePointerId) {
        return;
      }
      pointerActive = false;
      activePointerId = null;
      telemetryEl.textContent = 'UV-365 // ВЫКЛ';
      telemetryEl.classList.remove('is-on');
    }

    function onContextMenu(e) {
      e.preventDefault();
    }

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', endPointer);
    canvas.addEventListener('pointercancel', endPointer);
    canvas.addEventListener('lostpointercapture', endPointer);
    canvas.addEventListener('contextmenu', onContextMenu);

    if (typeof window.ResizeObserver === 'function') {
      resizeObserver = new window.ResizeObserver(function () {
        resizeCanvas();
      });
      resizeObserver.observe(body);
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function tick(now) {
      if (destroyed) {
        return;
      }

      var dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      var timeSec = now * 0.001;

      // Smooth beam position & on/off fade
      if (pointerActive) {
        var lerp = 1 - Math.pow(0.001, dt);
        beamX += (targetX - beamX) * Math.min(1, lerp * 0.65);
        beamY += (targetY - beamY) * Math.min(1, lerp * 0.65);
        beamAlpha = Math.min(1, beamAlpha + dt * 9);
      } else {
        beamAlpha = Math.max(0, beamAlpha - dt * 6.5);
      }

      var flicker = 0.96 + 0.04 * Math.sin(timeSec * 31) * Math.cos(timeSec * 13);
      var effectiveRadius = beamRadius * (0.97 + 0.03 * flicker);

      // Update evidence detection & progress
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var ix = item.nx * cssW;
        var iy = item.ny * cssH;

        if (item.ripple > 0) {
          item.ripple = Math.max(0, item.ripple - dt * 1.65);
        }

        if (item.found) {
          continue;
        }

        var dist = Math.hypot(beamX - ix, beamY - iy);
        var insideCapture = pointerActive && beamAlpha > 0.3 && dist <= captureRadius;
        var insideGlow = beamAlpha > 0.05 && dist <= effectiveRadius * 0.96;

        if (insideGlow && !item.inBeam) {
          item.inBeam = true;
          safeHaptic('light');
        } else if (!insideGlow && item.inBeam) {
          item.inBeam = false;
        }

        if (insideCapture && !completed) {
          item.progress = Math.min(1, item.progress + dt / holdDuration);
          if (item.progress >= 1) {
            item.found = true;
            item.progress = 1;
            item.ripple = 1;
            foundCount += 1;
            item.foundOrder = foundCount;

            counterEl.textContent = 'ИЗЪЯТО: ' + foundCount + ' / ' + totalCount;
            if (slotEls[foundCount - 1]) {
              slotEls[foundCount - 1].classList.add('is-found');
            }

            safeSfx('sfxSuccess');
            safeHaptic('success');
            showToast('ИЗЪЯТО: ' + item.name);

            if (foundCount >= totalCount && !completed) {
              completed = true;
              winTimer = window.setTimeout(function () {
                winTimer = null;
                callbacks.onSuccess({ found: foundCount });
              }, 600);
            }
          }
        } else {
          item.progress = Math.max(0, item.progress - dt * 0.55);
        }
      }

      // Render frame
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 1. Offscreen ditch background
      ctx.drawImage(bgCanvas, 0, 0, cssW, cssH);

      // 2. Physical dark silhouettes of hidden items under darkness
      for (var j = 0; j < items.length; j++) {
        if (!items[j].found) {
          drawEvidenceSilhouette(ctx, items[j].kind, items[j].nx * cssW, items[j].ny * cssH);
        }
      }

      // 3. Darkness shadow mask with punched UV beam hole
      maskCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      maskCtx.globalCompositeOperation = 'source-over';
      maskCtx.clearRect(0, 0, cssW, cssH);
      maskCtx.fillStyle = 'rgba(4, 5, 8, 0.955)';
      maskCtx.fillRect(0, 0, cssW, cssH);

      if (beamAlpha > 0.01) {
        maskCtx.globalCompositeOperation = 'destination-out';
        var holeGrad = maskCtx.createRadialGradient(
          beamX,
          beamY,
          effectiveRadius * 0.08,
          beamX,
          beamY,
          effectiveRadius
        );
        holeGrad.addColorStop(0, 'rgba(0, 0, 0, ' + (0.96 * beamAlpha).toFixed(3) + ')');
        holeGrad.addColorStop(0.55, 'rgba(0, 0, 0, ' + (0.72 * beamAlpha).toFixed(3) + ')');
        holeGrad.addColorStop(0.84, 'rgba(0, 0, 0, ' + (0.24 * beamAlpha).toFixed(3) + ')');
        holeGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        maskCtx.fillStyle = holeGrad;
        maskCtx.beginPath();
        maskCtx.arc(beamX, beamY, effectiveRadius, 0, Math.PI * 2);
        maskCtx.fill();
      }

      ctx.drawImage(maskCanvas, 0, 0, cssW, cssH);

      // 4. Violet-blue UV beam color overlay
      if (beamAlpha > 0.01) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        var uvGrad = ctx.createRadialGradient(
          beamX,
          beamY,
          effectiveRadius * 0.04,
          beamX,
          beamY,
          effectiveRadius * 1.05
        );
        uvGrad.addColorStop(0, 'rgba(132, 108, 255, ' + (0.38 * beamAlpha * flicker).toFixed(3) + ')');
        uvGrad.addColorStop(0.42, 'rgba(72, 54, 218, ' + (0.26 * beamAlpha * flicker).toFixed(3) + ')');
        uvGrad.addColorStop(0.78, 'rgba(34, 22, 138, ' + (0.12 * beamAlpha * flicker).toFixed(3) + ')');
        uvGrad.addColorStop(1, 'rgba(14, 10, 56, 0)');
        ctx.fillStyle = uvGrad;
        ctx.beginPath();
        ctx.arc(beamX, beamY, effectiveRadius * 1.05, 0, Math.PI * 2);
        ctx.fill();

        // Subtle flashlight lens ring
        ctx.strokeStyle = 'rgba(138, 122, 255, ' + (0.14 * beamAlpha).toFixed(3) + ')';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(beamX, beamY, effectiveRadius * 0.78, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 5. Luminol fluorescence, amber progress rings, and collected tags
      for (var k = 0; k < items.length; k++) {
        var it = items[k];
        var px = it.nx * cssW;
        var py = it.ny * cssH;

        if (it.found) {
          drawCollectedMarker(ctx, px, py, it.foundOrder, it.ripple);
        } else {
          var d = Math.hypot(beamX - px, beamY - py);
          var glow = beamAlpha > 0.02 ? Math.max(0, 1 - d / (effectiveRadius * 0.98)) * beamAlpha : 0;
          if (glow > 0.02) {
            drawEvidenceFluorescence(ctx, it.kind, px, py, glow, timeSec, k);
          }
          if (it.progress > 0.01) {
            drawProgressRing(ctx, px, py, it.progress);
          }
        }
      }

      rafId = window.requestAnimationFrame(tick);
    }

    rafId = window.requestAnimationFrame(tick);

    return function cleanup() {
      destroyed = true;

      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      if (winTimer !== null) {
        window.clearTimeout(winTimer);
        winTimer = null;
      }
      if (toastTimer !== null) {
        window.clearTimeout(toastTimer);
        toastTimer = null;
      }
      if (resizeObserver) {
        try {
          resizeObserver.disconnect();
        } catch (e) {
          // Ignore disconnect errors
        }
        resizeObserver = null;
      }

      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', endPointer);
      canvas.removeEventListener('pointercancel', endPointer);
      canvas.removeEventListener('lostpointercapture', endPointer);
      canvas.removeEventListener('contextmenu', onContextMenu);

      bgCanvas.width = 0;
      bgCanvas.height = 0;
      maskCanvas.width = 0;
      maskCanvas.height = 0;
    };
  });
})();
