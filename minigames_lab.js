(function () {
  'use strict';

  if (!window.GameMinigames || typeof window.GameMinigames.register !== 'function') {
    return;
  }

  var LAB_STYLE_ID = 'minigames-lab-styles';

  var LAB_CSS =
    '.mgl-hud-bar {' +
      'position: absolute;' +
      'left: 10px;' +
      'right: 10px;' +
      'top: 10px;' +
      'display: grid;' +
      'grid-template-columns: 1fr 1fr;' +
      'gap: 8px;' +
      'pointer-events: none;' +
      'z-index: 4;' +
    '}' +
    '.mgl-meter {' +
      'padding: 6px 8px;' +
      'background: rgba(11, 12, 14, 0.86);' +
      'border: 1px solid #2a2e38;' +
      'border-radius: 3px;' +
    '}' +
    '.mgl-meter-head {' +
      'display: flex;' +
      'align-items: baseline;' +
      'justify-content: space-between;' +
      'gap: 4px;' +
      'margin-bottom: 4px;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 9.5px;' +
      'font-weight: 600;' +
      'letter-spacing: 0.06em;' +
      'color: #9ba0ab;' +
      'text-transform: uppercase;' +
    '}' +
    '.mgl-meter-val {' +
      'color: #d4cab4;' +
      'font-variant-numeric: tabular-nums;' +
    '}' +
    '.mgl-meter-track {' +
      'height: 5px;' +
      'background: #0b0c0e;' +
      'border: 1px solid #242833;' +
      'border-radius: 1px;' +
      'overflow: hidden;' +
    '}' +
    '.mgl-meter-fill {' +
      'height: 100%;' +
      'width: 0%;' +
      'transition: width 0.14s linear, background-color 0.2s ease;' +
    '}' +
    '.mgl-meter-fill.is-amber {' +
      'background: linear-gradient(90deg, #9a671e 0%, #c98a2e 100%);' +
    '}' +
    '.mgl-meter-fill.is-integrity {' +
      'background: linear-gradient(90deg, #3f6a58 0%, #5da184 100%);' +
    '}' +
    '.mgl-meter-fill.is-warn {' +
      'background: linear-gradient(90deg, #9a671e 0%, #c98a2e 100%);' +
    '}' +
    '.mgl-meter-fill.is-crit {' +
      'background: linear-gradient(90deg, #991b1b 0%, #dc2626 100%);' +
    '}' +
    '.mgl-warn-flash {' +
      'position: absolute;' +
      'left: 12px;' +
      'right: 12px;' +
      'bottom: 14px;' +
      'padding: 9px 10px;' +
      'background: rgba(153, 27, 27, 0.92);' +
      'border: 1px solid #ef4444;' +
      'border-radius: 3px;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 11px;' +
      'font-weight: 600;' +
      'letter-spacing: 0.04em;' +
      'color: #fff2f2;' +
      'text-align: center;' +
      'pointer-events: none;' +
      'opacity: 0;' +
      'transform: translateY(6px);' +
      'transition: opacity 0.14s ease, transform 0.14s ease;' +
      'z-index: 6;' +
    '}' +
    '.mgl-warn-flash.is-visible {' +
      'opacity: 1;' +
      'transform: translateY(0);' +
    '}' +
    '.mgl-warn-flash.is-ok {' +
      'background: rgba(34, 58, 48, 0.95);' +
      'border-color: #5da184;' +
      'color: #e6f7ef;' +
    '}' +
    '.mgl-overlay-panel {' +
      'position: absolute;' +
      'inset: 0;' +
      'z-index: 10;' +
      'display: flex;' +
      'flex-direction: column;' +
      'align-items: center;' +
      'justify-content: center;' +
      'padding: 16px;' +
      'background: rgba(9, 10, 13, 0.94);' +
      'text-align: center;' +
      'gap: 12px;' +
    '}' +
    '.mgl-overlay-card {' +
      'width: 100%;' +
      'max-width: 340px;' +
      'padding: 18px 15px;' +
      'background: #15171c;' +
      'border: 1px solid #383d4a;' +
      'border-top: 3px solid #991b1b;' +
      'border-radius: 4px;' +
      'display: flex;' +
      'flex-direction: column;' +
      'gap: 11px;' +
      'box-shadow: 0 12px 30px rgba(0, 0, 0, 0.78);' +
    '}' +
    '.mgl-overlay-card.is-alert {' +
      'background: linear-gradient(180deg, rgba(153, 27, 27, 0.25) 0%, #141215 100%);' +
      'border-color: #991b1b;' +
      'border-top-width: 4px;' +
    '}' +
    '.mgl-stamp {' +
      'align-self: center;' +
      'padding: 4px 12px;' +
      'font-family: "Oswald", sans-serif;' +
      'font-size: 16px;' +
      'font-weight: 700;' +
      'letter-spacing: 0.14em;' +
      'text-transform: uppercase;' +
      'color: #ef4444;' +
      'border: 3px double #ef4444;' +
      'border-radius: 2px;' +
      'transform: rotate(-4deg);' +
    '}' +
    '.mgl-card-title {' +
      'font-family: "Oswald", sans-serif;' +
      'font-size: 18px;' +
      'font-weight: 700;' +
      'letter-spacing: 0.06em;' +
      'text-transform: uppercase;' +
      'color: #f0ece1;' +
      'line-height: 1.2;' +
    '}' +
    '.mgl-card-text {' +
      'font-family: "Inter", sans-serif;' +
      'font-size: 13px;' +
      'line-height: 1.5;' +
      'color: #cfc9bc;' +
    '}' +
    '.mgl-alert-stat {' +
      'padding: 8px 10px;' +
      'background: rgba(11, 12, 14, 0.75);' +
      'border: 1px solid #3a2326;' +
      'border-radius: 2px;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 12px;' +
      'font-weight: 600;' +
      'color: #d4cab4;' +
    '}' +
    '.mgl-alert-box {' +
      'padding: 10px;' +
      'background: rgba(153, 27, 27, 0.28);' +
      'border: 1px solid #dc2626;' +
      'border-left: 3px solid #ef4444;' +
      'border-radius: 2px;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 12px;' +
      'font-weight: 600;' +
      'line-height: 1.48;' +
      'color: #ffd7d7;' +
      'text-align: left;' +
    '}' +
    '.mgl-scan-bar {' +
      'width: 100%;' +
      'height: 7px;' +
      'background: #0b0c0e;' +
      'border: 1px solid #353b48;' +
      'border-radius: 2px;' +
      'overflow: hidden;' +
    '}' +
    '.mgl-scan-fill {' +
      'height: 100%;' +
      'width: 0%;' +
      'background: linear-gradient(90deg, #991b1b 0%, #c98a2e 100%);' +
      'transition: width 0.08s linear;' +
    '}' +
    '.mgl-footer-note {' +
      'flex: 1;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 11px;' +
      'line-height: 1.38;' +
      'color: #a4a8b3;' +
    '}' +
    '.mgl-head-actions {' +
      'display: flex;' +
      'align-items: center;' +
      'gap: 6px;' +
      'flex-shrink: 0;' +
    '}' +
    '.mgl-btn-ref {' +
      'padding: 7px 9px;' +
      'font-size: 11px;' +
      'color: #c98a2e;' +
      'border-color: rgba(201, 138, 46, 0.45);' +
    '}' +
    '.mgl-btn-ref.is-open {' +
      'background: rgba(201, 138, 46, 0.2);' +
      'border-color: #c98a2e;' +
      'color: #f3d7a3;' +
    '}' +
    '.mgl-blood-stage {' +
      'display: flex;' +
      'flex-direction: column;' +
      'height: 100%;' +
      'width: 100%;' +
    '}' +
    '.mgl-blood-canvas-wrap {' +
      'flex: 1;' +
      'min-height: 0;' +
      'position: relative;' +
      'touch-action: none;' +
    '}' +
    '.mgl-pipette-row {' +
      'display: grid;' +
      'grid-template-columns: repeat(3, 1fr);' +
      'gap: 7px;' +
      'width: 100%;' +
    '}' +
    '.mgl-pipette {' +
      'display: flex;' +
      'flex-direction: column;' +
      'align-items: center;' +
      'justify-content: center;' +
      'gap: 5px;' +
      'padding: 9px 6px;' +
      'background: #1c1f26;' +
      'border: 1px solid #353b48;' +
      'border-radius: 3px;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 11px;' +
      'font-weight: 600;' +
      'color: #d4cab4;' +
      'cursor: pointer;' +
      'transition: transform 0.1s ease, border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease;' +
    '}' +
    '.mgl-pipette:active {' +
      'transform: scale(0.96);' +
    '}' +
    '.mgl-pipette.is-selected {' +
      'background: #252a36;' +
      'border-color: #c98a2e;' +
      'box-shadow: 0 0 0 1px rgba(201, 138, 46, 0.55), 0 4px 12px rgba(0, 0, 0, 0.55);' +
    '}' +
    '.mgl-drop-dot {' +
      'width: 14px;' +
      'height: 14px;' +
      'border-radius: 50% 50% 50% 0;' +
      'transform: rotate(135deg);' +
      'border: 1px solid rgba(255, 255, 255, 0.35);' +
    '}' +
    '.mgl-drop-a {' +
      'background: radial-gradient(circle at 35% 35%, #60a5fa, #1d4ed8);' +
    '}' +
    '.mgl-drop-b {' +
      'background: radial-gradient(circle at 35% 35%, #fde047, #ca8a04);' +
    '}' +
    '.mgl-drop-d {' +
      'background: radial-gradient(circle at 35% 35%, #f8fafc, #94a3b8);' +
    '}' +
    '.mgl-conclusion {' +
      'flex-shrink: 0;' +
      'padding: 10px;' +
      'background: #15171c;' +
      'border-top: 2px solid #c98a2e;' +
      'display: flex;' +
      'flex-direction: column;' +
      'gap: 8px;' +
    '}' +
    '.mgl-conclusion-head {' +
      'display: flex;' +
      'align-items: center;' +
      'justify-content: space-between;' +
      'gap: 6px;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 10.5px;' +
      'font-weight: 600;' +
      'letter-spacing: 0.06em;' +
      'color: #d4cab4;' +
      'text-transform: uppercase;' +
    '}' +
    '.mgl-conclusion-attempts {' +
      'color: #c98a2e;' +
    '}' +
    '.mgl-choice-grid-4 {' +
      'display: grid;' +
      'grid-template-columns: repeat(4, 1fr);' +
      'gap: 6px;' +
    '}' +
    '.mgl-choice-grid-2 {' +
      'display: grid;' +
      'grid-template-columns: repeat(2, 1fr);' +
      'gap: 6px;' +
    '}' +
    '.mgl-sel-btn {' +
      'padding: 8px 4px;' +
      'background: #1c1f26;' +
      'border: 1px solid #353b48;' +
      'border-radius: 3px;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 12px;' +
      'font-weight: 600;' +
      'color: #c9c4b8;' +
      'text-align: center;' +
      'cursor: pointer;' +
      'transition: transform 0.1s ease, border-color 0.15s ease, background-color 0.15s ease;' +
    '}' +
    '.mgl-sel-btn:active {' +
      'transform: scale(0.96);' +
    '}' +
    '.mgl-sel-btn.is-selected {' +
      'background: rgba(201, 138, 46, 0.22);' +
      'border-color: #c98a2e;' +
      'color: #f6e3ba;' +
    '}' +
    '.mgl-ref-overlay {' +
      'position: absolute;' +
      'inset: 0;' +
      'z-index: 12;' +
      'display: flex;' +
      'flex-direction: column;' +
      'justify-content: center;' +
      'padding: 12px;' +
      'background: rgba(8, 9, 12, 0.92);' +
    '}' +
    '.mgl-ref-paper {' +
      'background: #d4cab4;' +
      'color: #1a1815;' +
      'border: 1px solid #9f9277;' +
      'border-left: 4px solid #991b1b;' +
      'border-radius: 3px;' +
      'padding: 13px 12px;' +
      'display: flex;' +
      'flex-direction: column;' +
      'gap: 9px;' +
      'box-shadow: 0 12px 30px rgba(0, 0, 0, 0.75);' +
    '}' +
    '.mgl-ref-title {' +
      'font-family: "Oswald", sans-serif;' +
      'font-size: 16px;' +
      'font-weight: 700;' +
      'letter-spacing: 0.06em;' +
      'text-transform: uppercase;' +
      'color: #1a1815;' +
      'border-bottom: 1px dashed rgba(26, 24, 21, 0.35);' +
      'padding-bottom: 6px;' +
    '}' +
    '.mgl-ref-table {' +
      'width: 100%;' +
      'border-collapse: collapse;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 11.5px;' +
    '}' +
    '.mgl-ref-table th,' +
    '.mgl-ref-table td {' +
      'border: 1px solid rgba(26, 24, 21, 0.3);' +
      'padding: 5px 6px;' +
      'text-align: center;' +
    '}' +
    '.mgl-ref-table th {' +
      'background: rgba(26, 24, 21, 0.1);' +
      'font-weight: 600;' +
    '}' +
    '.mgl-ref-legend {' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 11px;' +
      'line-height: 1.45;' +
      'color: #2c261f;' +
    '}' +
    '.mgl-ref-close {' +
      'width: 100%;' +
      'padding: 9px;' +
      'background: #1a1815;' +
      'color: #d4cab4;' +
      'border: 1px solid #3c362c;' +
      'border-radius: 2px;' +
      'font-family: "Oswald", sans-serif;' +
      'font-size: 13px;' +
      'font-weight: 700;' +
      'letter-spacing: 0.1em;' +
      'text-transform: uppercase;' +
      'cursor: pointer;' +
    '}';

  function injectLabStyles() {
    if (document.getElementById(LAB_STYLE_ID)) {
      return;
    }
    var styleEl = document.createElement('style');
    styleEl.id = LAB_STYLE_ID;
    styleEl.textContent = LAB_CSS;
    document.head.appendChild(styleEl);
  }

  function haptic(type) {
    window.GameMinigames.haptic(type);
  }

  function sfx(name) {
    window.GameMinigames.sfx(name);
  }

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

  /* ==========================================================================
     MINIGAME 1: 'fingerprint' (Дактилоскопия: опыление + сверка по минуциям)
     ========================================================================== */

  var MINUTIAE_POINTS = [
    { id: 0, nx: -0.44, ny: -0.46, type: 'bifurcation' },
    { id: 1, nx: 0.36, ny: -0.34, type: 'ending' },
    { id: 2, nx: -0.14, ny: 0.08, type: 'bifurcation' },
    { id: 3, nx: 0.32, ny: 0.44, type: 'ending' }
  ];

  function drawFingerprintPattern(ctx, cx, cy, rx, ry, options) {
    var opts = options || {};
    var strokeColor = opts.strokeColor || 'rgba(218, 224, 235, 0.88)';
    var lineWidth = opts.lineWidth || 1.65;
    var tilt = typeof opts.tilt === 'number' ? opts.tilt : -0.06;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(tilt);

    // Clip to organic fingertip oval
    ctx.beginPath();
    ctx.moveTo(0, -ry);
    ctx.bezierCurveTo(rx * 0.82, -ry * 0.98, rx * 1.04, -ry * 0.3, rx * 0.96, ry * 0.35);
    ctx.bezierCurveTo(rx * 0.88, ry * 0.88, rx * 0.42, ry * 1.02, 0, ry * 1.0);
    ctx.bezierCurveTo(-rx * 0.44, ry * 1.02, -rx * 0.9, ry * 0.86, -rx * 0.97, ry * 0.32);
    ctx.bezierCurveTo(-rx * 1.04, -ry * 0.32, -rx * 0.82, -ry * 0.98, 0, -ry);
    ctx.closePath();
    ctx.clip();

    ctx.strokeStyle = strokeColor;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = lineWidth;

    var coreX = -rx * 0.04;
    var coreY = -ry * 0.08;
    var ridgeCount = 15;

    // Concentric ulnar loop ridges wrapping around core
    for (var i = 1; i <= ridgeCount; i++) {
      var t = i / ridgeCount;
      var lRx = rx * (0.09 + t * 0.96);
      var lRy = ry * (0.14 + t * 0.92);

      // Slight intentional ridge gaps near ending minutiae
      var segments = 46;
      var drawing = false;
      ctx.beginPath();

      for (var s = 0; s <= segments; s++) {
        var frac = s / segments;
        var ang = -Math.PI * 1.18 + frac * Math.PI * 1.72;
        var wave = Math.sin(ang * 3 + i * 0.7) * (rx * 0.015);
        var px = coreX + Math.cos(ang) * (lRx + wave);
        var py = coreY + Math.sin(ang) * (lRy + wave);

        // Pull lower-right sweep out like a natural ulnar loop
        if (ang > 0.1) {
          px += (ang - 0.1) * rx * 0.18;
          py += (ang - 0.1) * ry * 0.14;
        }
        if (ang < -Math.PI * 0.85) {
          px -= (-Math.PI * 0.85 - ang) * rx * 0.16;
          py += (-Math.PI * 0.85 - ang) * ry * 0.22;
        }

        // Introduce subtle breaks for realistic ridge interruptions
        var nearBreak1 =
          Math.hypot(px - MINUTIAE_POINTS[1].nx * rx, py - MINUTIAE_POINTS[1].ny * ry) < rx * 0.085 &&
          i % 3 === 1;
        var nearBreak3 =
          Math.hypot(px - MINUTIAE_POINTS[3].nx * rx, py - MINUTIAE_POINTS[3].ny * ry) < rx * 0.085 &&
          i % 2 === 0;

        if (nearBreak1 || nearBreak3) {
          drawing = false;
          continue;
        }

        if (!drawing) {
          ctx.moveTo(px, py);
          drawing = true;
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.stroke();
    }

    // Sweeping basal arch ridges at the bottom of the fingerprint
    for (var b = 0; b < 5; b++) {
      var by = ry * (0.58 + b * 0.11);
      ctx.beginPath();
      ctx.moveTo(-rx * 1.05, by + ry * 0.08);
      ctx.quadraticCurveTo(0, by - ry * (0.12 - b * 0.015), rx * 1.05, by + ry * 0.06);
      ctx.stroke();
    }

    // Explicit characteristic minutiae geometry (forks / endings) at the 4 landmarks
    ctx.lineWidth = lineWidth * 1.1;
    for (var m = 0; m < MINUTIAE_POINTS.length; m++) {
      var pt = MINUTIAE_POINTS[m];
      var mx = pt.nx * rx;
      var my = pt.ny * ry;

      if (pt.type === 'bifurcation') {
        // Distinct Y-fork ridge split
        ctx.beginPath();
        ctx.moveTo(mx - rx * 0.1, my + ry * 0.05);
        ctx.lineTo(mx, my);
        ctx.lineTo(mx + rx * 0.1, my - ry * 0.06);
        ctx.moveTo(mx, my);
        ctx.lineTo(mx + rx * 0.11, my + ry * 0.04);
        ctx.stroke();
      } else {
        // Crisp abrupt ridge termination
        ctx.beginPath();
        ctx.moveTo(mx - rx * 0.12, my - ry * 0.04);
        ctx.quadraticCurveTo(mx - rx * 0.04, my - ry * 0.01, mx, my);
        ctx.stroke();
      }
    }

    // Subtle pore texture breaks
    if (opts.noisy) {
      var rand = createPrng(904);
      ctx.fillStyle = opts.poreColor || 'rgba(12, 14, 18, 0.35)';
      for (var p = 0; p < 80; p++) {
        var gx = (rand() - 0.5) * rx * 1.9;
        var gy = (rand() - 0.5) * ry * 1.9;
        ctx.beginPath();
        ctx.arc(gx, gy, 0.7 + rand() * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }

  function getMinutiaCanvasPos(cx, cy, rx, ry, tilt, pt) {
    var lx = pt.nx * rx;
    var ly = pt.ny * ry;
    var cos = Math.cos(tilt);
    var sin = Math.sin(tilt);
    return {
      x: cx + lx * cos - ly * sin,
      y: cy + lx * sin + ly * cos
    };
  }

  function drawSurfaceBackground(bCtx, w, h, surfaceIndex) {
    var rand = createPrng(surfaceIndex === 0 ? 4091 : 4092);

    // Dark lab examination table
    var bg = bCtx.createRadialGradient(w * 0.5, h * 0.45, 20, w * 0.5, h * 0.5, Math.max(w, h) * 0.75);
    bg.addColorStop(0, '#161920');
    bg.addColorStop(1, '#08090c');
    bCtx.fillStyle = bg;
    bCtx.fillRect(0, 0, w, h);

    // Subtle millimeter lab mat grid
    bCtx.strokeStyle = 'rgba(212, 202, 180, 0.035)';
    bCtx.lineWidth = 1;
    for (var gx = 0; gx < w; gx += 20) {
      bCtx.beginPath();
      bCtx.moveTo(gx, 0);
      bCtx.lineTo(gx, h);
      bCtx.stroke();
    }
    for (var gy = 0; gy < h; gy += 20) {
      bCtx.beginPath();
      bCtx.moveTo(0, gy);
      bCtx.lineTo(w, gy);
      bCtx.stroke();
    }

    if (surfaceIndex === 0) {
      // Curved dark glass antiseptic vial body
      var vialW = Math.min(w * 0.74, 240);
      var vialH = Math.min(h * 0.76, 330);
      var vx = (w - vialW) * 0.5;
      var vy = (h - vialH) * 0.54;

      // Neck & cap hint at top
      var neckW = vialW * 0.44;
      var neckGrad = bCtx.createLinearGradient(w * 0.5 - neckW * 0.5, 0, w * 0.5 + neckW * 0.5, 0);
      neckGrad.addColorStop(0, '#0e1116');
      neckGrad.addColorStop(0.28, '#2b333e');
      neckGrad.addColorStop(0.55, '#151920');
      neckGrad.addColorStop(1, '#090b0e');
      bCtx.fillStyle = neckGrad;
      bCtx.fillRect(w * 0.5 - neckW * 0.5, Math.max(8, vy - 26), neckW, 30);

      // Curved glass cylinder body
      bCtx.save();
      bCtx.beginPath();
      bCtx.moveTo(vx + 22, vy);
      bCtx.lineTo(vx + vialW - 22, vy);
      bCtx.quadraticCurveTo(vx + vialW, vy, vx + vialW, vy + 24);
      bCtx.lineTo(vx + vialW, vy + vialH - 18);
      bCtx.quadraticCurveTo(vx + vialW, vy + vialH, vx + vialW - 18, vy + vialH);
      bCtx.lineTo(vx + 18, vy + vialH);
      bCtx.quadraticCurveTo(vx, vy + vialH, vx, vy + vialH - 18);
      bCtx.lineTo(vx, vy + 24);
      bCtx.quadraticCurveTo(vx, vy, vx + 22, vy);
      bCtx.closePath();

      var glassGrad = bCtx.createLinearGradient(vx, 0, vx + vialW, 0);
      glassGrad.addColorStop(0, '#0d1115');
      glassGrad.addColorStop(0.14, '#242f3a');
      glassGrad.addColorStop(0.24, '#364552');
      glassGrad.addColorStop(0.38, '#171f26');
      glassGrad.addColorStop(0.76, '#12181f');
      glassGrad.addColorStop(0.9, '#242e38');
      glassGrad.addColorStop(1, '#0a0d10');
      bCtx.fillStyle = glassGrad;
      bCtx.fill();

      bCtx.strokeStyle = 'rgba(130, 165, 195, 0.25)';
      bCtx.lineWidth = 1.4;
      bCtx.stroke();

      // Long vertical curved specular reflection
      var specGrad = bCtx.createLinearGradient(vx + vialW * 0.16, 0, vx + vialW * 0.27, 0);
      specGrad.addColorStop(0, 'rgba(210, 232, 255, 0)');
      specGrad.addColorStop(0.5, 'rgba(210, 232, 255, 0.13)');
      specGrad.addColorStop(1, 'rgba(210, 232, 255, 0)');
      bCtx.fillStyle = specGrad;
      bCtx.fillRect(vx + vialW * 0.15, vy + 10, vialW * 0.13, vialH - 20);
      bCtx.restore();

      // Subtle surface label at bottom
      bCtx.fillStyle = 'rgba(212, 202, 180, 0.35)';
      bCtx.font = '600 10px "IBM Plex Mono", monospace';
      bCtx.textAlign = 'center';
      bCtx.fillText('ОБЪЕКТ: СТЕКЛЯННЫЙ ФЛАКОН (УЧАСТОК #1)', w * 0.5, h - 10);
    } else {
      // Backup surface: dark textured knife handle
      var hw = Math.min(w * 0.58, 196);
      var hh = Math.min(h * 0.78, 340);
      var hx = (w - hw) * 0.5;
      var hy = (h - hh) * 0.54;

      // Metallic guard/bolster at top
      var bolsterGrad = bCtx.createLinearGradient(hx - 14, 0, hx + hw + 14, 0);
      bolsterGrad.addColorStop(0, '#1e2128');
      bolsterGrad.addColorStop(0.35, '#5b6370');
      bolsterGrad.addColorStop(0.7, '#2d323b');
      bolsterGrad.addColorStop(1, '#15181e');
      bCtx.fillStyle = bolsterGrad;
      bCtx.fillRect(hx - 14, Math.max(8, hy - 14), hw + 28, 16);

      // Curved ergonomic handle body
      bCtx.save();
      bCtx.beginPath();
      bCtx.moveTo(hx + 8, hy);
      bCtx.lineTo(hx + hw - 8, hy);
      bCtx.bezierCurveTo(hx + hw + 8, hy + hh * 0.36, hx + hw + 4, hy + hh * 0.72, hx + hw - 10, hy + hh);
      bCtx.lineTo(hx + 10, hy + hh);
      bCtx.bezierCurveTo(hx - 4, hy + hh * 0.72, hx - 8, hy + hh * 0.36, hx + 8, hy);
      bCtx.closePath();

      var gripGrad = bCtx.createLinearGradient(hx, 0, hx + hw, 0);
      gripGrad.addColorStop(0, '#101215');
      gripGrad.addColorStop(0.25, '#252830');
      gripGrad.addColorStop(0.55, '#1d2026');
      gripGrad.addColorStop(0.85, '#272a32');
      gripGrad.addColorStop(1, '#0e1013');
      bCtx.fillStyle = gripGrad;
      bCtx.fill();

      bCtx.strokeStyle = 'rgba(170, 178, 192, 0.24)';
      bCtx.lineWidth = 1.5;
      bCtx.stroke();

      // Subtle polymer grain & steel rivets
      bCtx.clip();
      for (var d = 0; d < 280; d++) {
        bCtx.fillStyle = rand() > 0.5 ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.18)';
        bCtx.fillRect(hx + rand() * hw, hy + rand() * hh, 2, 2);
      }

      var rivetY = [hy + 26, hy + hh - 26];
      for (var r = 0; r < rivetY.length; r++) {
        bCtx.beginPath();
        bCtx.arc(w * 0.5, rivetY[r], 7, 0, Math.PI * 2);
        bCtx.fillStyle = '#3d434f';
        bCtx.fill();
        bCtx.strokeStyle = '#121418';
        bCtx.lineWidth = 1.5;
        bCtx.stroke();
      }
      bCtx.restore();

      bCtx.fillStyle = 'rgba(201, 138, 46, 0.58)';
      bCtx.font = '600 10px "IBM Plex Mono", monospace';
      bCtx.textAlign = 'center';
      bCtx.fillText('ЗАПАСНОЙ УЧАСТОК: РУКОЯТЬ НОЖА (ПОПЫТКА #2)', w * 0.5, h - 10);
    }
  }

  window.GameMinigames.register('fingerprint', function (containerEl, config, callbacks) {
    injectLabStyles();

    var phase = 'dusting'; // 'dusting' | 'smudged' | 'matching' | 'scanning' | 'result'
    var surfaceIndex = 0;
    var integrity = 100;
    var revealPct = 0;
    var destroyed = false;

    // Build DOM shell
    var wrap = document.createElement('div');
    wrap.className = 'mg-wrap';

    var header = document.createElement('div');
    header.className = 'mg-header';

    var headInfo = document.createElement('div');
    headInfo.className = 'mg-header-info';

    var titleEl = document.createElement('div');
    titleEl.className = 'mg-header-title';
    titleEl.textContent = config.title || 'ДАКТИЛОСКОПИЯ';

    var counterEl = document.createElement('div');
    counterEl.className = 'mg-counter';
    counterEl.textContent = 'ФАЗА 1: МАГНИТНОЕ ОПЫЛЕНИЕ';

    headInfo.appendChild(titleEl);
    headInfo.appendChild(counterEl);

    var btnBack = document.createElement('button');
    btnBack.type = 'button';
    btnBack.className = 'mg-btn mg-btn-cancel';
    btnBack.textContent = 'НАЗАД';
    btnBack.addEventListener('click', function () {
      sfx('sfxClick');
      haptic('light');
      callbacks.onCancel();
    });

    header.appendChild(headInfo);
    header.appendChild(btnBack);

    var body = document.createElement('div');
    body.className = 'mg-body';

    var canvas = document.createElement('canvas');
    canvas.className = 'mg-canvas';
    body.appendChild(canvas);

    // Phase 1 HUD bars
    var hudBar = document.createElement('div');
    hudBar.className = 'mgl-hud-bar';

    var revealMeter = document.createElement('div');
    revealMeter.className = 'mgl-meter';
    revealMeter.innerHTML =
      '<div class="mgl-meter-head"><span>ПРОЯВКА</span><span class="mgl-meter-val" data-role="reveal-val">0%</span></div>' +
      '<div class="mgl-meter-track"><div class="mgl-meter-fill is-amber" data-role="reveal-bar"></div></div>';

    var integrityMeter = document.createElement('div');
    integrityMeter.className = 'mgl-meter';
    integrityMeter.innerHTML =
      '<div class="mgl-meter-head"><span>ЦЕЛОСТНОСТЬ</span><span class="mgl-meter-val" data-role="int-val">100%</span></div>' +
      '<div class="mgl-meter-track"><div class="mgl-meter-fill is-integrity" data-role="int-bar" style="width:100%;"></div></div>';

    hudBar.appendChild(revealMeter);
    hudBar.appendChild(integrityMeter);
    body.appendChild(hudBar);

    var revealValEl = revealMeter.querySelector('[data-role="reveal-val"]');
    var revealBarEl = revealMeter.querySelector('[data-role="reveal-bar"]');
    var intValEl = integrityMeter.querySelector('[data-role="int-val"]');
    var intBarEl = integrityMeter.querySelector('[data-role="int-bar"]');

    var warnFlashEl = document.createElement('div');
    warnFlashEl.className = 'mgl-warn-flash';
    body.appendChild(warnFlashEl);

    var overlaySlot = document.createElement('div');
    body.appendChild(overlaySlot);

    var footer = document.createElement('div');
    footer.className = 'mg-footer';

    var footerNote = document.createElement('div');
    footerNote.className = 'mgl-footer-note';
    footerNote.textContent = 'Плавно водите магнитной кистью по стеклу. Резкие рывки смазывают порошок.';
    footer.appendChild(footerNote);

    wrap.appendChild(header);
    wrap.appendChild(body);
    wrap.appendChild(footer);
    containerEl.appendChild(wrap);

    // Canvas & offscreen buffers
    var ctx = canvas.getContext('2d');
    var bgCanvas = document.createElement('canvas');
    var bgCtx = bgCanvas.getContext('2d');
    var printCanvas = document.createElement('canvas');
    var printCtx = printCanvas.getContext('2d');
    var revealCanvas = document.createElement('canvas');
    var revealCtx = revealCanvas.getContext('2d');
    var smudgeCanvas = document.createElement('canvas');
    var smudgeCtx = smudgeCanvas.getContext('2d');
    var compCanvas = document.createElement('canvas');
    var compCtx = compCanvas.getContext('2d');

    var cssW = 320;
    var cssH = 420;
    var dpr = 1;

    // Fingerprint oval geometry (Phase 1)
    var fpCx = 160;
    var fpCy = 220;
    var fpRx = 62;
    var fpRy = 94;

    // Coverage grid for Phase 1
    var GRID_COLS = 12;
    var GRID_ROWS = 16;
    var gridCells = [];
    var totalActiveCells = 0;

    // Brush & powder particle state
    var pointerDown = false;
    var activePointerId = null;
    var brushX = 0;
    var brushY = 0;
    var lastX = 0;
    var lastY = 0;
    var lastMoveTime = 0;
    var smoothSpeed = 0;
    var lastErrorHaptic = 0;
    var particles = [];

    // Phase 2 matching state
    var matchedPairs = [false, false, false, false];
    var matchedCount = 0;
    var selectedSide = null; // 'left' | 'right' | null
    var selectedId = -1;
    var wrongFlash = { active: false, side: null, id: -1, until: 0 };

    // Timers & RAF
    var rafId = null;
    var warnTimer = null;
    var phaseTimer = null;
    var scanTimer = null;
    var resizeObserver = null;
    var lastFrameTime = performance.now();

    function showBanner(msg, isOk, durationMs) {
      if (warnTimer !== null) {
        window.clearTimeout(warnTimer);
        warnTimer = null;
      }
      warnFlashEl.textContent = msg;
      warnFlashEl.classList.toggle('is-ok', Boolean(isOk));
      warnFlashEl.classList.add('is-visible');
      warnTimer = window.setTimeout(function () {
        warnTimer = null;
        warnFlashEl.classList.remove('is-visible');
      }, durationMs || 950);
    }

    function updateDustMeters() {
      var rPct = Math.min(100, Math.round(revealPct));
      var iPct = Math.max(0, Math.round(integrity));
      revealValEl.textContent = rPct + '%';
      revealBarEl.style.width = rPct + '%';
      intValEl.textContent = iPct + '%';
      intBarEl.style.width = iPct + '%';

      intBarEl.classList.remove('is-integrity', 'is-warn', 'is-crit');
      if (iPct <= 35) {
        intBarEl.classList.add('is-crit');
      } else if (iPct <= 65) {
        intBarEl.classList.add('is-warn');
      } else {
        intBarEl.classList.add('is-integrity');
      }
    }

    function initCoverageGrid() {
      gridCells = [];
      totalActiveCells = 0;
      for (var r = 0; r < GRID_ROWS; r++) {
        for (var c = 0; c < GRID_COLS; c++) {
          var nx = ((c + 0.5) / GRID_COLS) * 2 - 1;
          var ny = ((r + 0.5) / GRID_ROWS) * 2 - 1;
          var inside = nx * nx + ny * ny <= 0.88;
          if (inside) {
            totalActiveCells += 1;
          }
          gridCells.push({
            nx: nx,
            ny: ny,
            active: inside,
            val: 0
          });
        }
      }
    }

    function rebuildDustCanvases() {
      fpCx = cssW * 0.5;
      fpCy = cssH * 0.54;
      fpRx = Math.min(cssW * 0.21, 66);
      fpRy = Math.min(cssH * 0.25, 98);

      bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bgCtx.clearRect(0, 0, cssW, cssH);
      drawSurfaceBackground(bgCtx, cssW, cssH, surfaceIndex);

      printCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      printCtx.clearRect(0, 0, cssW, cssH);
      drawFingerprintPattern(printCtx, fpCx, fpCy, fpRx, fpRy, {
        strokeColor: 'rgba(218, 226, 236, 0.92)',
        lineWidth: 1.7,
        tilt: -0.08,
        noisy: true
      });
    }

    function resetDustingAttempt() {
      integrity = 100;
      revealPct = 0;
      smoothSpeed = 0;
      particles = [];
      pointerDown = false;
      activePointerId = null;
      overlaySlot.innerHTML = '';
      initCoverageGrid();

      revealCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      revealCtx.clearRect(0, 0, cssW, cssH);
      smudgeCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      smudgeCtx.clearRect(0, 0, cssW, cssH);

      rebuildDustCanvases();
      updateDustMeters();
      hudBar.style.display = 'grid';
      counterEl.textContent =
        surfaceIndex === 0
          ? 'ФАЗА 1: ОПЫЛЕНИЕ (ФЛАКОН)'
          : 'ФАЗА 1: ЗАПАСНОЙ УЧАСТОК (НОЖ)';
      footerNote.textContent = 'Плавно водите магнитной кистью. Слишком быстрые движения смажут след.';
    }

    function resizeCanvas() {
      if (destroyed) {
        return;
      }
      var rect = body.getBoundingClientRect();
      var nextW = Math.max(180, Math.floor(rect.width));
      var nextH = Math.max(220, Math.floor(rect.height));

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
        printCanvas.width = physW;
        printCanvas.height = physH;
        revealCanvas.width = physW;
        revealCanvas.height = physH;
        smudgeCanvas.width = physW;
        smudgeCanvas.height = physH;
        compCanvas.width = physW;
        compCanvas.height = physH;

        rebuildDustCanvases();
        // Restore revealed grid visually on resize during Phase 1
        if (phase === 'dusting') {
          revealCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
          for (var i = 0; i < gridCells.length; i++) {
            var cell = gridCells[i];
            if (cell.active && cell.val > 0.05) {
              var gx = fpCx + cell.nx * fpRx;
              var gy = fpCy + cell.ny * fpRy;
              var gr = revealCtx.createRadialGradient(gx, gy, 2, gx, gy, 22);
              gr.addColorStop(0, 'rgba(255,255,255,' + Math.min(1, cell.val).toFixed(2) + ')');
              gr.addColorStop(1, 'rgba(255,255,255,0)');
              revealCtx.fillStyle = gr;
              revealCtx.beginPath();
              revealCtx.arc(gx, gy, 22, 0, Math.PI * 2);
              revealCtx.fill();
            }
          }
        }
      }
    }

    function getPhase2Layout() {
      var padTop = 34;
      var padBot = 14;
      var halfW = cssW * 0.5;
      var availH = cssH - padTop - padBot;
      var rx = Math.min(halfW * 0.36, 58);
      var ry = Math.min(availH * 0.36, 94);
      var cy = padTop + availH * 0.52;
      return {
        padTop: padTop,
        halfW: halfW,
        leftCx: halfW * 0.5,
        rightCx: halfW * 1.5,
        cy: cy,
        rx: rx,
        ry: ry,
        leftTilt: -0.07,
        rightTilt: 0.0
      };
    }

    function spawnPowderParticles(x, y, count, fast) {
      for (var i = 0; i < count; i++) {
        if (particles.length > 75) {
          particles.shift();
        }
        particles.push({
          x: x + (Math.random() - 0.5) * 18,
          y: y + (Math.random() - 0.5) * 14,
          vx: (Math.random() - 0.5) * (fast ? 95 : 32),
          vy: (Math.random() - 0.2) * (fast ? 55 : 22) + 14,
          size: 1.1 + Math.random() * 1.9,
          alpha: fast ? 0.8 : 0.65,
          dark: fast && Math.random() > 0.35
        });
      }
    }

    function paintBrushStep(x1, y1, x2, y2, isSmudging) {
      var dist = Math.hypot(x2 - x1, y2 - y1);
      var steps = Math.max(1, Math.ceil(dist / 6));
      var brushR = 23;

      for (var s = 1; s <= steps; s++) {
        var frac = s / steps;
        var px = x1 + (x2 - x1) * frac;
        var py = y1 + (y2 - y1) * frac;

        if (isSmudging) {
          smudgeCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
          var sg = smudgeCtx.createRadialGradient(px, py, 3, px, py, brushR * 1.15);
          sg.addColorStop(0, 'rgba(34, 37, 44, 0.32)');
          sg.addColorStop(0.6, 'rgba(54, 58, 68, 0.2)');
          sg.addColorStop(1, 'rgba(34, 37, 44, 0)');
          smudgeCtx.fillStyle = sg;
          smudgeCtx.beginPath();
          smudgeCtx.arc(px, py, brushR * 1.15, 0, Math.PI * 2);
          smudgeCtx.fill();
        } else {
          revealCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
          var rg = revealCtx.createRadialGradient(px, py, 2, px, py, brushR);
          rg.addColorStop(0, 'rgba(255, 255, 255, 0.26)');
          rg.addColorStop(0.65, 'rgba(255, 255, 255, 0.12)');
          rg.addColorStop(1, 'rgba(255, 255, 255, 0)');
          revealCtx.fillStyle = rg;
          revealCtx.beginPath();
          revealCtx.arc(px, py, brushR, 0, Math.PI * 2);
          revealCtx.fill();

          // Update coverage grid cells inside oval
          var hitSum = 0;
          for (var c = 0; c < gridCells.length; c++) {
            var cell = gridCells[c];
            if (!cell.active) {
              continue;
            }
            var cx = fpCx + cell.nx * fpRx;
            var cy = fpCy + cell.ny * fpRy;
            var d = Math.hypot(px - cx, py - cy);
            if (d < brushR) {
              var boost = (1 - d / brushR) * 0.28;
              cell.val = Math.min(1, cell.val + boost);
            }
            hitSum += cell.val;
          }
          revealPct = totalActiveCells > 0 ? (hitSum / totalActiveCells) * 100 : 0;
        }
      }
    }

    function triggerSmudgeFailure() {
      phase = 'smudged';
      pointerDown = false;
      activePointerId = null;
      sfx('sfxAlert');
      haptic('error');

      if (surfaceIndex === 0) {
        overlaySlot.innerHTML = '';
        var panel = document.createElement('div');
        panel.className = 'mgl-overlay-panel';

        var card = document.createElement('div');
        card.className = 'mgl-overlay-card is-alert';

        var stamp = document.createElement('div');
        stamp.className = 'mgl-stamp';
        stamp.textContent = 'СЛЕД СМАЗАН';

        var text = document.createElement('div');
        text.className = 'mgl-card-text';
        text.textContent =
          'Резкие движения кисти превратили порошок в нечитаемые разводы. Поверхность флакона испорчена — остался последний пригодный участок.';

        var btnBackup = document.createElement('button');
        btnBackup.type = 'button';
        btnBackup.className = 'mg-btn mg-btn-primary';
        btnBackup.textContent = 'ПЕРЕЙТИ НА ЗАПАСНОЙ УЧАСТОК (РУКОЯТЬ НОЖА)';
        btnBackup.addEventListener('click', function () {
          sfx('sfxClick');
          haptic('medium');
          surfaceIndex = 1;
          phase = 'dusting';
          resetDustingAttempt();
        });

        card.appendChild(stamp);
        card.appendChild(text);
        card.appendChild(btnBackup);
        panel.appendChild(card);
        overlaySlot.appendChild(panel);
      } else {
        overlaySlot.innerHTML = '';
        var failPanel = document.createElement('div');
        failPanel.className = 'mgl-overlay-panel';

        var failCard = document.createElement('div');
        failCard.className = 'mgl-overlay-card is-alert';

        var failStamp = document.createElement('div');
        failStamp.className = 'mgl-stamp';
        failStamp.textContent = 'СЛЕД УНИЧТОЖЕН';

        var failText = document.createElement('div');
        failText.className = 'mgl-card-text';
        failText.textContent = 'Запасной участок на рукояти ножа также смазан. Дактилоскопия провалена.';

        failCard.appendChild(failStamp);
        failCard.appendChild(failText);
        failPanel.appendChild(failCard);
        overlaySlot.appendChild(failPanel);

        phaseTimer = window.setTimeout(function () {
          phaseTimer = null;
          callbacks.onFail({ reason: 'smudged' });
        }, 950);
      }
    }

    function enterPhase2Matching() {
      phase = 'matching';
      pointerDown = false;
      activePointerId = null;
      hudBar.style.display = 'none';
      overlaySlot.innerHTML = '';
      matchedPairs = [false, false, false, false];
      matchedCount = 0;
      selectedSide = null;
      selectedId = -1;

      counterEl.textContent = 'ФАЗА 2: СВЕРКА МИНУЦИЙ (0 / 4)';
      footerNote.textContent =
        'Найдите 4 парные характерные точки: тапните микромаркер на снятом следе и его пару на эталоне БД.';
    }

    function runPapilonScan() {
      phase = 'scanning';
      sfx('sfxRadio');
      haptic('medium');
      counterEl.textContent = 'АДИС «ПАПИЛОН» // ПОИСК';
      footerNote.textContent = 'Выполняется сверка по федеральной дактилоскопической базе...';

      overlaySlot.innerHTML = '';
      var panel = document.createElement('div');
      panel.className = 'mgl-overlay-panel';

      var card = document.createElement('div');
      card.className = 'mgl-overlay-card';

      var title = document.createElement('div');
      title.className = 'mgl-card-title';
      title.textContent = 'ПРОБИВ ПО АДИС "ПАПИЛОН"...';

      var sub = document.createElement('div');
      sub.className = 'mgl-card-text';
      sub.textContent = 'Сравнение 4 опорных минуций с массивом Громова В.И. и ведомственными картотеками...';

      var bar = document.createElement('div');
      bar.className = 'mgl-scan-bar';
      var fill = document.createElement('div');
      fill.className = 'mgl-scan-fill';
      bar.appendChild(fill);

      card.appendChild(title);
      card.appendChild(sub);
      card.appendChild(bar);
      panel.appendChild(card);
      overlaySlot.appendChild(panel);

      var scanStart = performance.now();
      var scanDuration = 1200;

      function animateScan() {
        if (destroyed || phase !== 'scanning') {
          return;
        }
        var p = Math.min(1, (performance.now() - scanStart) / scanDuration);
        fill.style.width = Math.round(p * 100) + '%';
        if (p < 1) {
          scanTimer = window.setTimeout(animateScan, 40);
        } else {
          scanTimer = null;
          showPapilonResult();
        }
      }
      animateScan();
    }

    function showPapilonResult() {
      phase = 'result';
      sfx('sfxAlert');
      haptic('heavy');
      counterEl.textContent = 'ТРЕВОГА ДОПУСКА // РЕЕСТР "С"';
      footerNote.textContent = 'Результат проверки зафиксирован протоколом АДИС.';

      overlaySlot.innerHTML = '';
      var panel = document.createElement('div');
      panel.className = 'mgl-overlay-panel';

      var card = document.createElement('div');
      card.className = 'mgl-overlay-card is-alert';

      var stamp = document.createElement('div');
      stamp.className = 'mgl-stamp';
      stamp.textContent = 'ДОПУСК УРОВНЯ "С"';

      var statLine = document.createElement('div');
      statLine.className = 'mgl-alert-stat';
      statLine.textContent = 'СОВПАДЕНИЕ С ГРОМОВЫМ В.И.: 0%';

      var alertBox = document.createElement('div');
      alertBox.className = 'mgl-alert-box';
      alertBox.textContent =
        'ВНИМАНИЕ: НАЙДЕНО СОВПАДЕНИЕ В ЗАКРЫТОМ РЕЕСТРЕ МВД — ДОПУСК УРОВНЯ "С" (СОТРУДНИКИ)';

      var btnAttach = document.createElement('button');
      btnAttach.type = 'button';
      btnAttach.className = 'mg-btn mg-btn-danger';
      btnAttach.textContent = 'ПРИОБЩИТЬ К ДЕЛУ';
      btnAttach.addEventListener('click', function () {
        sfx('sfxStamp');
        haptic('success');
        callbacks.onSuccess({ registryAlert: true });
      });

      card.appendChild(stamp);
      card.appendChild(statLine);
      card.appendChild(alertBox);
      card.appendChild(btnAttach);
      panel.appendChild(card);
      overlaySlot.appendChild(panel);
    }

    function handleMatchingTap(x, y) {
      var layout = getPhase2Layout();
      var hitRadius = 26;
      var tappedSide = null;
      var tappedId = -1;
      var bestDist = hitRadius;

      for (var i = 0; i < MINUTIAE_POINTS.length; i++) {
        if (matchedPairs[i]) {
          continue;
        }
        var lp = getMinutiaCanvasPos(
          layout.leftCx,
          layout.cy,
          layout.rx,
          layout.ry,
          layout.leftTilt,
          MINUTIAE_POINTS[i]
        );
        var ld = Math.hypot(x - lp.x, y - lp.y);
        if (ld < bestDist) {
          bestDist = ld;
          tappedSide = 'left';
          tappedId = i;
        }

        var rp = getMinutiaCanvasPos(
          layout.rightCx,
          layout.cy,
          layout.rx,
          layout.ry,
          layout.rightTilt,
          MINUTIAE_POINTS[i]
        );
        var rd = Math.hypot(x - rp.x, y - rp.y);
        if (rd < bestDist) {
          bestDist = rd;
          tappedSide = 'right';
          tappedId = i;
        }
      }

      if (tappedId === -1) {
        return;
      }

      if (selectedSide === null || selectedSide === tappedSide) {
        selectedSide = tappedSide;
        selectedId = tappedId;
        sfx('sfxClick');
        haptic('light');
        return;
      }

      if (tappedId === selectedId) {
        matchedPairs[tappedId] = true;
        matchedCount += 1;
        selectedSide = null;
        selectedId = -1;
        sfx('sfxClick');
        haptic('light');
        counterEl.textContent = 'ФАЗА 2: СВЕРКА МИНУЦИЙ (' + matchedCount + ' / 4)';

        if (matchedCount >= MINUTIAE_POINTS.length) {
          sfx('sfxSuccess');
          haptic('success');
          phaseTimer = window.setTimeout(function () {
            phaseTimer = null;
            runPapilonScan();
          }, 420);
        }
      } else {
        wrongFlash = {
          active: true,
          side: tappedSide,
          id: tappedId,
          until: performance.now() + 450
        };
        selectedSide = null;
        selectedId = -1;
        haptic('error');
        showBanner('ТОЧКИ НЕ СОВПАДАЮТ — СВЕРЬТЕ РАСПОЛОЖЕНИЕ МИНУЦИИ', false, 800);
      }
    }

    function getCanvasPoint(e) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: Math.max(0, Math.min(cssW, e.clientX - rect.left)),
        y: Math.max(0, Math.min(cssH, e.clientY - rect.top))
      };
    }

    function onPointerDown(e) {
      if (destroyed) {
        return;
      }
      e.preventDefault();
      var pt = getCanvasPoint(e);

      if (phase === 'matching') {
        handleMatchingTap(pt.x, pt.y);
        return;
      }

      if (phase !== 'dusting') {
        return;
      }
      if (activePointerId !== null && activePointerId !== e.pointerId) {
        return;
      }

      activePointerId = e.pointerId;
      pointerDown = true;
      brushX = pt.x;
      brushY = pt.y;
      lastX = pt.x;
      lastY = pt.y;
      lastMoveTime = performance.now();
      smoothSpeed = 0;

      try {
        canvas.setPointerCapture(e.pointerId);
      } catch (err) {
        // Ignore capture errors
      }
    }

    function onPointerMove(e) {
      if (destroyed || phase !== 'dusting' || !pointerDown || e.pointerId !== activePointerId) {
        return;
      }
      e.preventDefault();
      var pt = getCanvasPoint(e);
      var now = performance.now();
      var dtMs = Math.max(4, now - lastMoveTime);
      var dist = Math.hypot(pt.x - lastX, pt.y - lastY);

      if (dist < 1.2) {
        return;
      }

      var instantSpeed = dist / dtMs; // px/ms
      smoothSpeed = smoothSpeed * 0.52 + instantSpeed * 0.48;

      var SPEED_LIMIT = 0.92;
      var inPrintZone =
        Math.hypot((pt.x - fpCx) / (fpRx * 1.25), (pt.y - fpCy) / (fpRy * 1.25)) <= 1.15;

      if (smoothSpeed > SPEED_LIMIT && inPrintZone) {
        var excess = smoothSpeed - SPEED_LIMIT;
        var penalty = Math.min(11, 2.6 + excess * 7.2);
        integrity = Math.max(0, integrity - penalty);
        paintBrushStep(lastX, lastY, pt.x, pt.y, true);
        spawnPowderParticles(pt.x, pt.y, 4, true);

        if (now - lastErrorHaptic > 260) {
          lastErrorHaptic = now;
          haptic('error');
        }
        showBanner('СЛИШКОМ РЕЗКО — СЛЕД СМАЗЫВАЕТСЯ!', false, 700);
        updateDustMeters();

        if (integrity <= 0) {
          triggerSmudgeFailure();
          return;
        }
      } else {
        paintBrushStep(lastX, lastY, pt.x, pt.y, false);
        spawnPowderParticles(pt.x, pt.y, 2, false);
        updateDustMeters();

        if (revealPct >= 85) {
          phase = 'transition';
          pointerDown = false;
          activePointerId = null;
          sfx('sfxSuccess');
          haptic('success');
          showBanner('СЛЕД ПРОЯВЛЕН — ПЕРЕХОД К СВЕРКЕ', true, 750);
          phaseTimer = window.setTimeout(function () {
            phaseTimer = null;
            enterPhase2Matching();
          }, 680);
          return;
        }
      }

      brushX = pt.x;
      brushY = pt.y;
      lastX = pt.x;
      lastY = pt.y;
      lastMoveTime = now;
    }

    function onPointerUp(e) {
      if (activePointerId !== null && e.pointerId !== activePointerId) {
        return;
      }
      pointerDown = false;
      activePointerId = null;
      smoothSpeed = 0;
    }

    function onContextMenu(e) {
      e.preventDefault();
    }

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);
    canvas.addEventListener('lostpointercapture', onPointerUp);
    canvas.addEventListener('contextmenu', onContextMenu);

    if (typeof window.ResizeObserver === 'function') {
      resizeObserver = new window.ResizeObserver(function () {
        resizeCanvas();
      });
      resizeObserver.observe(body);
    }
    window.addEventListener('resize', resizeCanvas);

    initCoverageGrid();
    resizeCanvas();
    resetDustingAttempt();

    function renderDustingFrame(dt) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.drawImage(bgCanvas, 0, 0, cssW, cssH);

      // Barely visible latent grease sheen before powder
      ctx.save();
      ctx.globalAlpha = 0.055;
      ctx.drawImage(printCanvas, 0, 0, cssW, cssH);
      ctx.restore();

      // Compose revealed powder fingerprint: printCanvas masked by revealCanvas
      compCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      compCtx.globalCompositeOperation = 'source-over';
      compCtx.clearRect(0, 0, cssW, cssH);
      compCtx.drawImage(printCanvas, 0, 0, cssW, cssH);
      compCtx.globalCompositeOperation = 'destination-in';
      compCtx.drawImage(revealCanvas, 0, 0, cssW, cssH);
      compCtx.globalCompositeOperation = 'source-over';

      ctx.drawImage(compCanvas, 0, 0, cssW, cssH);

      // Draw smudges over the fingerprint
      ctx.drawImage(smudgeCanvas, 0, 0, cssW, cssH);

      // Update & draw falling magnetic powder particles
      for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 65 * dt;
        p.alpha -= dt * 1.35;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.fillStyle = p.dark
          ? 'rgba(55, 58, 66, ' + p.alpha.toFixed(2) + ')'
          : 'rgba(205, 214, 226, ' + p.alpha.toFixed(2) + ')';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw magnetic brush wand tip when active
      if (pointerDown && phase === 'dusting') {
        ctx.save();
        ctx.translate(brushX, brushY);

        // Fluffy iron-powder halo tuft
        var tuft = ctx.createRadialGradient(0, 0, 2, 0, 0, 22);
        tuft.addColorStop(0, 'rgba(185, 194, 210, 0.45)');
        tuft.addColorStop(0.55, 'rgba(92, 98, 112, 0.28)');
        tuft.addColorStop(1, 'rgba(30, 34, 42, 0)');
        ctx.fillStyle = tuft;
        ctx.beginPath();
        ctx.arc(0, 0, 22, 0, Math.PI * 2);
        ctx.fill();

        // Metallic magnetic wand cylinder extending up-right
        ctx.rotate(-0.68);
        var wandGrad = ctx.createLinearGradient(0, -6, 0, 6);
        wandGrad.addColorStop(0, '#788090');
        wandGrad.addColorStop(0.5, '#d1d6e0');
        wandGrad.addColorStop(1, '#3b404b');
        ctx.fillStyle = wandGrad;
        ctx.fillRect(6, -4.5, 44, 9);

        // Dark magnetic tip cone
        ctx.fillStyle = '#252932';
        ctx.beginPath();
        ctx.arc(4, 0, 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = smoothSpeed > 0.92 ? '#ef4444' : '#c98a2e';
        ctx.lineWidth = 1.4;
        ctx.stroke();

        ctx.restore();
      }
    }

    function renderMatchingFrame(now) {
      var layout = getPhase2Layout();
      var timeSec = now * 0.001;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Left panel: lifted print (dark forensic contrast)
      ctx.fillStyle = '#0e1014';
      ctx.fillRect(0, 0, layout.halfW, cssH);

      // Right panel: DB template (muted dark-archival green/amber grid)
      ctx.fillStyle = '#111514';
      ctx.fillRect(layout.halfW, 0, layout.halfW, cssH);

      // Subtle DB grid on right panel
      ctx.strokeStyle = 'rgba(201, 138, 46, 0.06)';
      ctx.lineWidth = 1;
      for (var x = layout.halfW + 14; x < cssW; x += 16) {
        ctx.beginPath();
        ctx.moveTo(x, layout.padTop);
        ctx.lineTo(x, cssH);
        ctx.stroke();
      }
      for (var y = layout.padTop; y < cssH; y += 16) {
        ctx.beginPath();
        ctx.moveTo(layout.halfW, y);
        ctx.lineTo(cssW, y);
        ctx.stroke();
      }

      // Panel headers
      ctx.fillStyle = '#15171c';
      ctx.fillRect(0, 0, cssW, layout.padTop);
      ctx.strokeStyle = '#2a2e38';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, layout.padTop);
      ctx.lineTo(cssW, layout.padTop);
      ctx.moveTo(layout.halfW, 0);
      ctx.lineTo(layout.halfW, cssH);
      ctx.stroke();

      ctx.font = '600 10.5px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#d4cab4';
      ctx.fillText('СНЯТЫЙ СЛЕД', layout.leftCx, layout.padTop * 0.52);
      ctx.fillStyle = '#c98a2e';
      ctx.fillText('ЭТАЛОН БД', layout.rightCx, layout.padTop * 0.52);

      // Draw fingerprints side by side
      drawFingerprintPattern(ctx, layout.leftCx, layout.cy, layout.rx, layout.ry, {
        strokeColor: 'rgba(208, 216, 228, 0.72)',
        lineWidth: 1.45,
        tilt: layout.leftTilt,
        noisy: true
      });

      drawFingerprintPattern(ctx, layout.rightCx, layout.cy, layout.rx, layout.ry, {
        strokeColor: 'rgba(212, 202, 180, 0.72)',
        lineWidth: 1.45,
        tilt: layout.rightTilt,
        noisy: false
      });

      // Draw matched connecting lines across split
      for (var m = 0; m < MINUTIAE_POINTS.length; m++) {
        if (!matchedPairs[m]) {
          continue;
        }
        var lpM = getMinutiaCanvasPos(
          layout.leftCx,
          layout.cy,
          layout.rx,
          layout.ry,
          layout.leftTilt,
          MINUTIAE_POINTS[m]
        );
        var rpM = getMinutiaCanvasPos(
          layout.rightCx,
          layout.cy,
          layout.rx,
          layout.ry,
          layout.rightTilt,
          MINUTIAE_POINTS[m]
        );

        ctx.save();
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = 'rgba(201, 138, 46, 0.42)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(lpM.x, lpM.y);
        ctx.lineTo(rpM.x, rpM.y);
        ctx.stroke();
        ctx.restore();
      }

      // Draw subtle minutiae micro-markers & active selection / matched tags
      var pulse = 0.65 + 0.35 * Math.sin(timeSec * 4.2);

      for (var i = 0; i < MINUTIAE_POINTS.length; i++) {
        var sides = [
          {
            key: 'left',
            pos: getMinutiaCanvasPos(
              layout.leftCx,
              layout.cy,
              layout.rx,
              layout.ry,
              layout.leftTilt,
              MINUTIAE_POINTS[i]
            )
          },
          {
            key: 'right',
            pos: getMinutiaCanvasPos(
              layout.rightCx,
              layout.cy,
              layout.rx,
              layout.ry,
              layout.rightTilt,
              MINUTIAE_POINTS[i]
            )
          }
        ];

        for (var s = 0; s < sides.length; s++) {
          var side = sides[s];
          var px = side.pos.x;
          var py = side.pos.y;
          var isMatched = matchedPairs[i];
          var isSelected = selectedSide === side.key && selectedId === i;
          var isWrong =
            wrongFlash.active &&
            now < wrongFlash.until &&
            wrongFlash.side === side.key &&
            wrongFlash.id === i;

          ctx.save();
          if (isMatched) {
            ctx.beginPath();
            ctx.arc(px, py, 10, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(201, 138, 46, 0.26)';
            ctx.fill();
            ctx.strokeStyle = '#e5a443';
            ctx.lineWidth = 1.8;
            ctx.stroke();

            ctx.fillStyle = '#f6dfa8';
            ctx.font = '600 9.5px "IBM Plex Mono", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(String(i + 1), px, py + 0.5);
          } else if (isWrong) {
            ctx.beginPath();
            ctx.arc(px, py, 12, 0, Math.PI * 2);
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 2;
            ctx.stroke();
          } else if (isSelected) {
            ctx.beginPath();
            ctx.arc(px, py, 12 + pulse * 2.5, 0, Math.PI * 2);
            ctx.strokeStyle = '#e5a443';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(px, py, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = '#e5a443';
            ctx.fill();
          } else {
            // Barely noticeable forensic micro-marker at actual ridge feature
            ctx.beginPath();
            ctx.arc(px, py, 5.5, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(212, 202, 180, ' + (0.28 + 0.14 * pulse).toFixed(2) + ')';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(px, py, 1.6, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(201, 138, 46, ' + (0.45 + 0.22 * pulse).toFixed(2) + ')';
            ctx.fill();
          }
          ctx.restore();
        }
      }
    }

    function tick(now) {
      if (destroyed) {
        return;
      }
      var dt = Math.min((now - lastFrameTime) / 1000, 0.1);
      lastFrameTime = now;

      if (phase === 'dusting' || phase === 'transition' || phase === 'smudged') {
        renderDustingFrame(dt);
      } else {
        renderMatchingFrame(now);
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
      if (warnTimer !== null) {
        window.clearTimeout(warnTimer);
        warnTimer = null;
      }
      if (phaseTimer !== null) {
        window.clearTimeout(phaseTimer);
        phaseTimer = null;
      }
      if (scanTimer !== null) {
        window.clearTimeout(scanTimer);
        scanTimer = null;
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
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('lostpointercapture', onPointerUp);
      canvas.removeEventListener('contextmenu', onContextMenu);

      bgCanvas.width = 0;
      bgCanvas.height = 0;
      printCanvas.width = 0;
      printCanvas.height = 0;
      revealCanvas.width = 0;
      revealCanvas.height = 0;
      smudgeCanvas.width = 0;
      smudgeCanvas.height = 0;
      compCanvas.width = 0;
      compCanvas.height = 0;
    };
  });

  /* ==========================================================================
     MINIGAME 2: 'blood_lab' (Лабораторный анализ крови с реагентами)
     ========================================================================== */

  window.GameMinigames.register('blood_lab', function (containerEl, config, callbacks) {
    injectLabStyles();

    var REAGENTS = {
      antiA: { key: 'antiA', label: 'Анти-А', dropColor: '#3b82f6', glowColor: 'rgba(59, 130, 246, 0.55)' },
      antiB: { key: 'antiB', label: 'Анти-В', dropColor: '#eab308', glowColor: 'rgba(234, 179, 8, 0.55)' },
      antiD: { key: 'antiD', label: 'Анти-D', dropColor: '#e2e8f0', glowColor: 'rgba(226, 232, 240, 0.55)' }
    };

    var slides = [
      {
        id: 'sample1',
        title: 'ОБРАЗЕЦ №1 (Одежда жертвы)',
        wells: [
          { reagent: 'antiA', label: 'Анти-А', positive: true },
          { reagent: 'antiB', label: 'Анти-В', positive: false },
          { reagent: 'antiD', label: 'Анти-D', positive: true }
        ]
      },
      {
        id: 'sample2',
        title: 'ОБРАЗЕЦ №2 (Мазок с рукояти ножа)',
        wells: [
          { reagent: 'antiA', label: 'Анти-А', positive: true },
          { reagent: 'antiB', label: 'Анти-В', positive: true },
          { reagent: 'antiD', label: 'Анти-D', positive: true }
        ]
      }
    ];

    // Pre-generate deterministic agglutination clumps per well
    for (var si = 0; si < slides.length; si++) {
      for (var wi = 0; wi < slides[si].wells.length; wi++) {
        var well = slides[si].wells[wi];
        well.reacted = false;
        well.reactionTime = 0;
        well.errorFlashUntil = 0;
        well.cx = 0;
        well.cy = 0;
        well.r = 24;

        var prng = createPrng(4090 + si * 100 + wi * 17);
        var clumps = [];
        var clumpCount = 22;
        for (var ci = 0; ci < clumpCount; ci++) {
          var ang = prng() * Math.PI * 2;
          var startDist = 0.12 + prng() * 0.72;
          // Target cluster centers pull positive clumps into distinct grainy islands
          var clusterAng = (Math.floor(prng() * 6) / 6) * Math.PI * 2 + (prng() - 0.5) * 0.45;
          var endDist = 0.14 + prng() * 0.56;
          clumps.push({
            sx: Math.cos(ang) * startDist,
            sy: Math.sin(ang) * startDist,
            ex: Math.cos(clusterAng) * endDist,
            ey: Math.sin(clusterAng) * endDist,
            rad: 0.085 + prng() * 0.095,
            rot: prng() * Math.PI,
            shade: prng() > 0.45 ? '#3a0408' : '#580910'
          });
        }
        well.clumps = clumps;
      }
    }

    var selectedReagent = null;
    var reactedCount = 0;
    var selectedGroup = null;
    var selectedRh = null;
    var attemptsUsed = 0;
    var maxAttempts = 2;
    var refOpen = false;
    var settled = false;
    var destroyed = false;

    var rafId = null;
    var toastTimer = null;
    var endTimer = null;
    var resizeObserver = null;
    var lastFrameTime = performance.now();

    // Build DOM
    var wrap = document.createElement('div');
    wrap.className = 'mg-wrap';

    var header = document.createElement('div');
    header.className = 'mg-header';

    var headInfo = document.createElement('div');
    headInfo.className = 'mg-header-info';

    var titleEl = document.createElement('div');
    titleEl.className = 'mg-header-title';
    titleEl.textContent = config.title || 'ЛАБОРАТОРИЯ КРОВИ';

    var counterEl = document.createElement('div');
    counterEl.className = 'mg-counter';
    counterEl.textContent = 'ЛУНОК ОБРАБОТАНО: 0 / 6';

    headInfo.appendChild(titleEl);
    headInfo.appendChild(counterEl);

    var headActions = document.createElement('div');
    headActions.className = 'mgl-head-actions';

    var btnRef = document.createElement('button');
    btnRef.type = 'button';
    btnRef.className = 'mg-btn mgl-btn-ref';
    btnRef.textContent = 'СПРАВОЧНИК';

    var btnBack = document.createElement('button');
    btnBack.type = 'button';
    btnBack.className = 'mg-btn mg-btn-cancel';
    btnBack.textContent = 'НАЗАД';
    btnBack.addEventListener('click', function () {
      sfx('sfxClick');
      haptic('light');
      callbacks.onCancel();
    });

    headActions.appendChild(btnRef);
    headActions.appendChild(btnBack);

    header.appendChild(headInfo);
    header.appendChild(headActions);

    var body = document.createElement('div');
    body.className = 'mg-body';

    var stage = document.createElement('div');
    stage.className = 'mgl-blood-stage';

    var canvasWrap = document.createElement('div');
    canvasWrap.className = 'mgl-blood-canvas-wrap';

    var canvas = document.createElement('canvas');
    canvas.className = 'mg-canvas';
    canvasWrap.appendChild(canvas);

    var warnBanner = document.createElement('div');
    warnBanner.className = 'mgl-warn-flash';
    canvasWrap.appendChild(warnBanner);

    stage.appendChild(canvasWrap);

    // Conclusion form (activated after all 6 wells are done)
    var conclusionEl = document.createElement('div');
    conclusionEl.className = 'mgl-conclusion hidden';

    var concHead = document.createElement('div');
    concHead.className = 'mgl-conclusion-head';
    var concTitle = document.createElement('span');
    concTitle.textContent = 'ЗАКЛЮЧЕНИЕ: ОБРАЗЕЦ №2 (НОЖ)';
    var concAttempts = document.createElement('span');
    concAttempts.className = 'mgl-conclusion-attempts';
    concAttempts.textContent = 'ПОПЫТКА 1 / 2';
    concHead.appendChild(concTitle);
    concHead.appendChild(concAttempts);

    var groupGrid = document.createElement('div');
    groupGrid.className = 'mgl-choice-grid-4';
    var groups = [
      { id: 'I', label: 'I (0)' },
      { id: 'II', label: 'II (A)' },
      { id: 'III', label: 'III (B)' },
      { id: 'IV', label: 'IV (AB)' }
    ];
    var groupBtns = [];
    for (var gi = 0; gi < groups.length; gi++) {
      (function (g) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'mgl-sel-btn';
        b.textContent = g.label;
        b.addEventListener('click', function () {
          if (settled) {
            return;
          }
          selectedGroup = g.id;
          for (var k = 0; k < groupBtns.length; k++) {
            groupBtns[k].classList.toggle('is-selected', groupBtns[k] === b);
          }
          sfx('sfxClick');
          haptic('light');
        });
        groupGrid.appendChild(b);
        groupBtns.push(b);
      })(groups[gi]);
    }

    var rhGrid = document.createElement('div');
    rhGrid.className = 'mgl-choice-grid-2';
    var rhs = ['Rh+', 'Rh-'];
    var rhBtns = [];
    for (var ri = 0; ri < rhs.length; ri++) {
      (function (rhVal) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'mgl-sel-btn';
        b.textContent = rhVal;
        b.addEventListener('click', function () {
          if (settled) {
            return;
          }
          selectedRh = rhVal;
          for (var k = 0; k < rhBtns.length; k++) {
            rhBtns[k].classList.toggle('is-selected', rhBtns[k] === b);
          }
          sfx('sfxClick');
          haptic('light');
        });
        rhGrid.appendChild(b);
        rhBtns.push(b);
      })(rhs[ri]);
    }

    var btnSubmit = document.createElement('button');
    btnSubmit.type = 'button';
    btnSubmit.className = 'mg-btn mg-btn-primary';
    btnSubmit.textContent = 'ПОДПИСАТЬ ЗАКЛЮЧЕНИЕ';
    btnSubmit.addEventListener('click', function () {
      if (settled) {
        return;
      }
      if (!selectedGroup || !selectedRh) {
        haptic('warning');
        showLabToast('Выберите группу крови и резус-фактор для Образца №2', false, 1200);
        return;
      }

      if (selectedGroup === 'IV' && selectedRh === 'Rh+') {
        settled = true;
        sfx('sfxStamp');
        haptic('success');
        showLabToast('ЗАКЛЮЧЕНИЕ ПОДПИСАНО: IV (AB) Rh+', true, 1200);
        endTimer = window.setTimeout(function () {
          endTimer = null;
          callbacks.onSuccess({ bloodType: 'AB+' });
        }, 620);
      } else {
        attemptsUsed += 1;
        sfx('sfxAlert');
        haptic('error');

        if (attemptsUsed >= maxAttempts) {
          settled = true;
          showLabToast('ОШИБКА В ЗАКЛЮЧЕНИИ — ПРОТОКОЛ АННУЛИРОВАН', false, 1400);
          endTimer = window.setTimeout(function () {
            endTimer = null;
            callbacks.onFail({ reason: 'wrong_analysis' });
          }, 950);
        } else {
          concAttempts.textContent = 'ПОПЫТКА ' + (attemptsUsed + 1) + ' / ' + maxAttempts;
          showLabToast('ОШИБКА В ЗАКЛЮЧЕНИИ (осталась 1 попытка)', false, 1500);
        }
      }
    });

    conclusionEl.appendChild(concHead);
    conclusionEl.appendChild(groupGrid);
    conclusionEl.appendChild(rhGrid);
    conclusionEl.appendChild(btnSubmit);
    stage.appendChild(conclusionEl);

    // Reference overlay (no auto-hints!)
    var refOverlay = document.createElement('div');
    refOverlay.className = 'mgl-ref-overlay hidden';
    refOverlay.innerHTML =
      '<div class="mgl-ref-paper">' +
        '<div class="mgl-ref-title">СПРАВОЧНИК АГГЛЮТИНАЦИИ (AB0 / Rh)</div>' +
        '<div class="mgl-ref-legend">' +
          '<strong>(+) Агглютинация есть:</strong> тёмные хлопья/зернистость, просветление краёв капли.<br>' +
          '<strong>(–) Агглютинации нет:</strong> гладкая, равномерно мутно-красная капля.' +
        '</div>' +
        '<table class="mgl-ref-table">' +
          '<thead><tr><th>ГРУППА</th><th>Анти-А</th><th>Анти-В</th></tr></thead>' +
          '<tbody>' +
            '<tr><td>I (0)</td><td>–</td><td>–</td></tr>' +
            '<tr><td>II (A)</td><td>+</td><td>–</td></tr>' +
            '<tr><td>III (B)</td><td>–</td><td>+</td></tr>' +
            '<tr><td>IV (AB)</td><td>+</td><td>+</td></tr>' +
          '</tbody>' +
        '</table>' +
        '<div class="mgl-ref-legend">' +
          '<strong>Резус-фактор:</strong> Анти-D (+) → <strong>Rh+</strong> · Анти-D (–) → <strong>Rh–</strong>' +
        '</div>' +
        '<button type="button" class="mgl-ref-close">ЗАКРЫТЬ СПРАВОЧНИК</button>' +
      '</div>';

    var btnRefClose = refOverlay.querySelector('.mgl-ref-close');

    function toggleReference(forceState) {
      refOpen = typeof forceState === 'boolean' ? forceState : !refOpen;
      refOverlay.classList.toggle('hidden', !refOpen);
      btnRef.classList.toggle('is-open', refOpen);
      sfx('sfxPaper');
      haptic('light');
    }

    btnRef.addEventListener('click', function () {
      toggleReference();
    });
    btnRefClose.addEventListener('click', function () {
      toggleReference(false);
    });

    body.appendChild(stage);
    body.appendChild(refOverlay);

    // Footer with 3 reagent pipettes
    var footer = document.createElement('div');
    footer.className = 'mg-footer';

    var pipetteRow = document.createElement('div');
    pipetteRow.className = 'mgl-pipette-row';

    var pipetteSpecs = [
      { key: 'antiA', label: 'Анти-А', dotClass: 'mgl-drop-a' },
      { key: 'antiB', label: 'Анти-В', dotClass: 'mgl-drop-b' },
      { key: 'antiD', label: 'Анти-D (Rh)', dotClass: 'mgl-drop-d' }
    ];

    var pipetteBtns = [];
    for (var pi = 0; pi < pipetteSpecs.length; pi++) {
      (function (spec) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'mgl-pipette';
        btn.innerHTML =
          '<span class="mgl-drop-dot ' + spec.dotClass + '"></span>' +
          '<span>' + spec.label + '</span>';
        btn.addEventListener('click', function () {
          if (settled) {
            return;
          }
          selectedReagent = spec.key;
          for (var j = 0; j < pipetteBtns.length; j++) {
            pipetteBtns[j].classList.toggle('is-selected', pipetteBtns[j] === btn);
          }
          sfx('sfxClick');
          haptic('light');
        });
        pipetteRow.appendChild(btn);
        pipetteBtns.push(btn);
      })(pipetteSpecs[pi]);
    }

    footer.appendChild(pipetteRow);

    wrap.appendChild(header);
    wrap.appendChild(body);
    wrap.appendChild(footer);
    containerEl.appendChild(wrap);

    // Canvas setup
    var ctx = canvas.getContext('2d');
    var cssW = 320;
    var cssH = 380;
    var dpr = 1;

    function showLabToast(text, isOk, durationMs) {
      if (toastTimer !== null) {
        window.clearTimeout(toastTimer);
        toastTimer = null;
      }
      warnBanner.textContent = text;
      warnBanner.classList.toggle('is-ok', Boolean(isOk));
      warnBanner.classList.add('is-visible');
      toastTimer = window.setTimeout(function () {
        toastTimer = null;
        warnBanner.classList.remove('is-visible');
      }, durationMs || 1100);
    }

    function computeSlideLayout() {
      var padX = 12;
      var padY = 10;
      var gap = Math.max(10, Math.min(18, cssH * 0.045));
      var slideW = cssW - padX * 2;
      var maxSlideH = (cssH - padY * 2 - gap) * 0.5;
      var slideH = Math.max(88, Math.min(168, maxSlideH));
      var totalH = slideH * 2 + gap;
      var startY = Math.max(padY, (cssH - totalH) * 0.5);

      var wellR = Math.max(19, Math.min(31, (slideH - 36) * 0.43, (slideW - 44) / 7.2));
      var spacing = slideW / 3;

      for (var s = 0; s < slides.length; s++) {
        var sy = startY + s * (slideH + gap);
        slides[s].x = padX;
        slides[s].y = sy;
        slides[s].w = slideW;
        slides[s].h = slideH;

        var wellCy = sy + 24 + (slideH - 28) * 0.52;
        for (var w = 0; w < slides[s].wells.length; w++) {
          slides[s].wells[w].cx = padX + spacing * (w + 0.5);
          slides[s].wells[w].cy = wellCy;
          slides[s].wells[w].r = wellR;
        }
      }
    }

    function resizeCanvas() {
      if (destroyed) {
        return;
      }
      var rect = canvasWrap.getBoundingClientRect();
      var nextW = Math.max(180, Math.floor(rect.width));
      var nextH = Math.max(180, Math.floor(rect.height));

      dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      cssW = nextW;
      cssH = nextH;

      var physW = Math.floor(cssW * dpr);
      var physH = Math.floor(cssH * dpr);

      if (canvas.width !== physW || canvas.height !== physH) {
        canvas.width = physW;
        canvas.height = physH;
      }
      computeSlideLayout();
    }

    function drawWell(well, now) {
      var x = well.cx;
      var y = well.cy;
      var r = well.r;
      var isErrorFlash = now < well.errorFlashUntil;

      ctx.save();

      // Recessed glass well socket
      ctx.beginPath();
      ctx.arc(x, y, r + 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#0c0e13';
      ctx.fill();
      ctx.strokeStyle = isErrorFlash
        ? '#ef4444'
        : well.reacted
          ? 'rgba(201, 138, 46, 0.65)'
          : 'rgba(180, 196, 214, 0.25)';
      ctx.lineWidth = isErrorFlash ? 2.2 : 1.3;
      ctx.stroke();

      // Clip interior of blood drop
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.clip();

      if (!well.reacted) {
        // Untreated glossy raw blood sample
        var rawGrad = ctx.createRadialGradient(x - r * 0.25, y - r * 0.25, r * 0.1, x, y, r);
        rawGrad.addColorStop(0, '#9e1c22');
        rawGrad.addColorStop(0.65, '#6e1116');
        rawGrad.addColorStop(1, '#46080c');
        ctx.fillStyle = rawGrad;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
      } else {
        var t = well.reactionTime; // seconds since drop
        var dropPhase = Math.min(1, t / 0.32);
        var reactPhase = Math.max(0, Math.min(1, (t - 0.25) / 1.35));

        if (well.positive) {
          // Positive agglutination (+): serum clarifies at edges while dark red flakes clump tightly
          var clearAlpha = reactPhase;
          var serumGrad = ctx.createRadialGradient(x, y, r * 0.15, x, y, r);
          var rOuter = Math.round(70 + clearAlpha * 118);
          var gOuter = Math.round(8 + clearAlpha * 116);
          var bOuter = Math.round(12 + clearAlpha * 108);
          serumGrad.addColorStop(
            0,
            'rgba(' + Math.round(145 + clearAlpha * 38) + ',' + Math.round(32 + clearAlpha * 68) + ',' + Math.round(34 + clearAlpha * 62) + ',0.9)'
          );
          serumGrad.addColorStop(0.68, 'rgba(' + rOuter + ',' + gOuter + ',' + bOuter + ',0.55)');
          serumGrad.addColorStop(1, 'rgba(218, 178, 166, ' + (0.28 + clearAlpha * 0.25).toFixed(2) + ')');
          ctx.fillStyle = serumGrad;
          ctx.fillRect(x - r, y - r, r * 2, r * 2);

          // Distinct clumping dark flakes/granules
          var ease = 1 - Math.pow(1 - reactPhase, 2.2);
          for (var c = 0; c < well.clumps.length; c++) {
            var cl = well.clumps[c];
            var px = x + (cl.sx + (cl.ex - cl.sx) * ease) * r;
            var py = y + (cl.sy + (cl.ey - cl.sy) * ease) * r;
            var cRad = cl.rad * r * (0.45 + 0.72 * ease);

            ctx.save();
            ctx.translate(px, py);
            ctx.rotate(cl.rot);
            ctx.fillStyle = cl.shade;
            ctx.globalAlpha = 0.25 + 0.75 * ease;
            ctx.beginPath();
            ctx.ellipse(0, 0, cRad * 1.25, cRad * 0.85, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        } else {
          // Negative reaction (-): smooth homogeneous cloudy red drop, zero flakes
          var smoothGrad = ctx.createRadialGradient(x - r * 0.18, y - r * 0.18, r * 0.12, x, y, r);
          smoothGrad.addColorStop(0, '#9c2228');
          smoothGrad.addColorStop(0.68, '#7a161b');
          smoothGrad.addColorStop(1, '#580e13');
          ctx.fillStyle = smoothGrad;
          ctx.fillRect(x - r, y - r, r * 2, r * 2);

          // Subtle silky cloudy sheen
          ctx.fillStyle = 'rgba(215, 130, 130, ' + (0.12 * reactPhase).toFixed(2) + ')';
          ctx.beginPath();
          ctx.arc(x, y, r * 0.88, 0, Math.PI * 2);
          ctx.fill();
        }

        // Falling & splashing reagent droplet animation in first ~0.55s
        var reagentInfo = REAGENTS[well.reagent];
        if (t < 0.65 && reagentInfo) {
          var splashAlpha = Math.max(0, 1 - t / 0.65);
          var dropR = r * (0.18 + dropPhase * 0.72);
          ctx.strokeStyle = reagentInfo.dropColor;
          ctx.globalAlpha = splashAlpha * 0.85;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, dropR, 0, Math.PI * 2);
          ctx.stroke();

          if (dropPhase < 1) {
            ctx.fillStyle = reagentInfo.dropColor;
            ctx.globalAlpha = (1 - dropPhase) * 0.9;
            ctx.beginPath();
            ctx.arc(x, y - (1 - dropPhase) * 14, 5.5 * (1 - dropPhase * 0.35), 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.globalAlpha = 1;
        }
      }

      // Glossy liquid highlight arc on every well
      ctx.fillStyle = 'rgba(255, 255, 255, 0.17)';
      ctx.beginPath();
      ctx.ellipse(x - r * 0.32, y - r * 0.34, r * 0.28, r * 0.13, -0.65, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Well reagent label below well
      ctx.fillStyle = well.reacted ? '#c98a2e' : '#a2a7b4';
      ctx.font = '600 10px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(well.label, x, y + r + 5);

      ctx.restore();
    }

    function renderLab(now) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Dark lab slate bench
      var benchGrad = ctx.createLinearGradient(0, 0, 0, cssH);
      benchGrad.addColorStop(0, '#101217');
      benchGrad.addColorStop(1, '#090a0d');
      ctx.fillStyle = benchGrad;
      ctx.fillRect(0, 0, cssW, cssH);

      // Subtle laboratory bench grid
      ctx.strokeStyle = 'rgba(212, 202, 180, 0.03)';
      ctx.lineWidth = 1;
      for (var gx = 0; gx < cssW; gx += 22) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, cssH);
        ctx.stroke();
      }
      for (var gy = 0; gy < cssH; gy += 22) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(cssW, gy);
        ctx.stroke();
      }

      // Draw both microscope glass slides
      for (var s = 0; s < slides.length; s++) {
        var sl = slides[s];
        ctx.save();

        // Frosted microscope glass slide body
        var glassGrad = ctx.createLinearGradient(sl.x, sl.y, sl.x + sl.w, sl.y + sl.h);
        glassGrad.addColorStop(0, 'rgba(38, 46, 58, 0.56)');
        glassGrad.addColorStop(0.5, 'rgba(24, 29, 36, 0.74)');
        glassGrad.addColorStop(1, 'rgba(34, 42, 52, 0.58)');

        ctx.fillStyle = glassGrad;
        ctx.strokeStyle = s === 1 ? 'rgba(201, 138, 46, 0.42)' : 'rgba(130, 150, 174, 0.34)';
        ctx.lineWidth = 1.2;

        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(sl.x, sl.y, sl.w, sl.h, 4) : ctx.rect(sl.x, sl.y, sl.w, sl.h);
        ctx.fill();
        ctx.stroke();

        // Top paper label strip on slide
        ctx.fillStyle = 'rgba(212, 202, 180, 0.12)';
        ctx.fillRect(sl.x + 1, sl.y + 1, sl.w - 2, 21);

        ctx.fillStyle = s === 1 ? '#e2c288' : '#d4cab4';
        ctx.font = '600 10.5px "IBM Plex Mono", monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(sl.title, sl.x + 9, sl.y + 11.5);

        ctx.restore();

        for (var w = 0; w < sl.wells.length; w++) {
          drawWell(sl.wells[w], now);
        }
      }
    }

    function onPointerDown(e) {
      if (destroyed || settled || refOpen) {
        return;
      }
      e.preventDefault();
      var rect = canvas.getBoundingClientRect();
      var px = e.clientX - rect.left;
      var py = e.clientY - rect.top;

      var hitWell = null;
      for (var s = 0; s < slides.length; s++) {
        for (var w = 0; w < slides[s].wells.length; w++) {
          var well = slides[s].wells[w];
          if (Math.hypot(px - well.cx, py - well.cy) <= well.r + 10) {
            hitWell = well;
            break;
          }
        }
        if (hitWell) {
          break;
        }
      }

      if (!hitWell) {
        return;
      }

      if (hitWell.reacted) {
        haptic('light');
        showLabToast('Реагент уже добавлен в эту лунку', false, 850);
        return;
      }

      if (!selectedReagent) {
        haptic('warning');
        showLabToast('Выберите пипетку с реагентом внизу', false, 1000);
        return;
      }

      if (selectedReagent !== hitWell.reagent) {
        hitWell.errorFlashUntil = performance.now() + 450;
        sfx('sfxAlert');
        haptic('error');
        showLabToast('Неверный реагент для лунки', false, 1000);
        return;
      }

      hitWell.reacted = true;
      hitWell.reactionTime = 0;
      reactedCount += 1;
      counterEl.textContent = 'ЛУНОК ОБРАБОТАНО: ' + reactedCount + ' / 6';
      sfx('sfxClick');
      haptic('light');

      if (reactedCount >= 6) {
        sfx('sfxSuccess');
        haptic('success');
        counterEl.textContent = 'РЕАКЦИИ ЗАВЕРШЕНЫ — ВЫНЕСИТЕ ЗАКЛЮЧЕНИЕ';
        footer.classList.add('hidden');
        conclusionEl.classList.remove('hidden');
        showLabToast('Изучите агглютинацию Образца №2 и подпишите протокол', true, 1700);
        window.requestAnimationFrame(resizeCanvas);
      }
    }

    function onContextMenu(e) {
      e.preventDefault();
    }

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('contextmenu', onContextMenu);

    if (typeof window.ResizeObserver === 'function') {
      resizeObserver = new window.ResizeObserver(function () {
        resizeCanvas();
      });
      resizeObserver.observe(canvasWrap);
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function tick(now) {
      if (destroyed) {
        return;
      }
      var dt = Math.min((now - lastFrameTime) / 1000, 0.1);
      lastFrameTime = now;

      for (var s = 0; s < slides.length; s++) {
        for (var w = 0; w < slides[s].wells.length; w++) {
          var well = slides[s].wells[w];
          if (well.reacted && well.reactionTime < 3) {
            well.reactionTime += dt;
          }
        }
      }

      renderLab(now);
      rafId = window.requestAnimationFrame(tick);
    }

    rafId = window.requestAnimationFrame(tick);

    return function cleanup() {
      destroyed = true;
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      if (toastTimer !== null) {
        window.clearTimeout(toastTimer);
        toastTimer = null;
      }
      if (endTimer !== null) {
        window.clearTimeout(endTimer);
        endTimer = null;
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
      canvas.removeEventListener('contextmenu', onContextMenu);
    };
  });
})();
