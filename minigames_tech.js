(function () {
  'use strict';

  if (!window.GameMinigames || typeof window.GameMinigames.register !== 'function') {
    return;
  }

  var TECH_STYLE_ID = 'minigames-tech-styles';

  var TECH_CSS =
    '.mgt-bat-row {' +
      'display: flex;' +
      'align-items: center;' +
      'gap: 8px;' +
      'flex-wrap: wrap;' +
    '}' +
    '.mgt-battery {' +
      'display: inline-flex;' +
      'align-items: center;' +
      'gap: 5px;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 11px;' +
      'font-weight: 600;' +
      'letter-spacing: 0.06em;' +
      'color: #ef4444;' +
      'animation: mgtBatBlink 1.1s ease-in-out infinite;' +
    '}' +
    '.mgt-bat-icon {' +
      'display: inline-flex;' +
      'align-items: center;' +
      'width: 22px;' +
      'height: 11px;' +
      'padding: 1.5px;' +
      'border: 1.5px solid #ef4444;' +
      'border-radius: 2px;' +
      'position: relative;' +
    '}' +
    '.mgt-bat-icon::after {' +
      'content: "";' +
      'position: absolute;' +
      'right: -3.5px;' +
      'top: 2px;' +
      'width: 2px;' +
      'height: 5px;' +
      'background: #ef4444;' +
      'border-radius: 0 1px 1px 0;' +
    '}' +
    '.mgt-bat-fill {' +
      'height: 100%;' +
      'background: #dc2626;' +
      'transition: width 0.25s ease;' +
    '}' +
    '@keyframes mgtBatBlink {' +
      '0%, 100% { opacity: 1; }' +
      '50% { opacity: 0.48; }' +
    '}' +
    '.mgt-phase-tag {' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 10px;' +
      'font-weight: 600;' +
      'color: #8b8f99;' +
      'letter-spacing: 0.06em;' +
      'text-transform: uppercase;' +
    '}' +
    '.mgt-screen-wrap {' +
      'height: 100%;' +
      'width: 100%;' +
      'display: flex;' +
      'flex-direction: column;' +
      'justify-content: space-between;' +
      'padding: 10px;' +
      'gap: 10px;' +
      'background: radial-gradient(circle at 50% 25%, #151820 0%, #0b0c0e 85%);' +
      'position: relative;' +
      'overflow: hidden;' +
    '}' +
    '.mgt-phone-display {' +
      'position: relative;' +
      'padding: 14px 12px 12px;' +
      'background: linear-gradient(180deg, #12161d 0%, #0d1016 100%);' +
      'border: 1px solid #2d3340;' +
      'border-radius: 6px;' +
      'display: flex;' +
      'flex-direction: column;' +
      'align-items: center;' +
      'gap: 10px;' +
      'overflow: hidden;' +
      'box-shadow: inset 0 0 22px rgba(0, 0, 0, 0.8);' +
    '}' +
    '.mgt-crack-svg {' +
      'position: absolute;' +
      'inset: 0;' +
      'width: 100%;' +
      'height: 100%;' +
      'pointer-events: none;' +
      'opacity: 0.42;' +
      'z-index: 3;' +
    '}' +
    '.mgt-pin-note {' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 10px;' +
      'font-weight: 600;' +
      'letter-spacing: 0.06em;' +
      'text-align: center;' +
      'color: #c98a2e;' +
      'line-height: 1.4;' +
      'position: relative;' +
      'z-index: 2;' +
    '}' +
    '.mgt-pin-slots {' +
      'display: flex;' +
      'align-items: center;' +
      'justify-content: center;' +
      'gap: 10px;' +
      'position: relative;' +
      'z-index: 2;' +
    '}' +
    '.mgt-pin-slots.is-shake {' +
      'animation: mgtShake 0.34s ease;' +
    '}' +
    '@keyframes mgtShake {' +
      '0%, 100% { transform: translateX(0); }' +
      '20% { transform: translateX(-8px); }' +
      '40% { transform: translateX(8px); }' +
      '60% { transform: translateX(-6px); }' +
      '80% { transform: translateX(5px); }' +
    '}' +
    '.mgt-pin-cell {' +
      'width: 44px;' +
      'height: 50px;' +
      'display: flex;' +
      'align-items: center;' +
      'justify-content: center;' +
      'background: #0b0c0e;' +
      'border: 1.5px solid #343a47;' +
      'border-radius: 4px;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 22px;' +
      'font-weight: 600;' +
      'color: #d4cab4;' +
      'transition: border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease;' +
    '}' +
    '.mgt-pin-cell.is-filled {' +
      'border-color: #c98a2e;' +
      'color: #f3d7a3;' +
      'background: rgba(201, 138, 46, 0.1);' +
    '}' +
    '.mgt-pin-cell.is-error {' +
      'border-color: #dc2626;' +
      'color: #fca5a5;' +
      'background: rgba(153, 27, 27, 0.25);' +
    '}' +
    '.mgt-pin-cell.is-ok {' +
      'border-color: #3f6a58;' +
      'color: #9ae6c5;' +
      'background: rgba(63, 106, 88, 0.28);' +
    '}' +
    '.mgt-pin-status {' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 11px;' +
      'color: #9096a3;' +
      'text-align: center;' +
      'min-height: 16px;' +
      'position: relative;' +
      'z-index: 2;' +
    '}' +
    '.mgt-pin-status.is-err {' +
      'color: #f87171;' +
    '}' +
    '.mgt-pin-status.is-ok {' +
      'color: #6ec4a0;' +
    '}' +
    '.mgt-keypad {' +
      'display: grid;' +
      'grid-template-columns: repeat(3, 1fr);' +
      'gap: 7px;' +
      'flex: 1;' +
      'max-height: 244px;' +
    '}' +
    '.mgt-key {' +
      'min-height: 44px;' +
      'display: flex;' +
      'align-items: center;' +
      'justify-content: center;' +
      'background: linear-gradient(180deg, #1d212a 0%, #15171c 100%);' +
      'border: 1px solid #303644;' +
      'border-radius: 4px;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 19px;' +
      'font-weight: 600;' +
      'color: #e2dfd7;' +
      'cursor: pointer;' +
      'touch-action: manipulation;' +
      'transition: transform 0.08s ease, border-color 0.12s ease, background-color 0.12s ease;' +
    '}' +
    '.mgt-key:active {' +
      'transform: scale(0.95);' +
      'border-color: #c98a2e;' +
      'background: #272c38;' +
    '}' +
    '.mgt-key.is-fn {' +
      'font-size: 14px;' +
      'color: #c98a2e;' +
      'background: #14161c;' +
    '}' +
    '.mgt-scan-head {' +
      'display: flex;' +
      'flex-direction: column;' +
      'gap: 6px;' +
      'padding: 8px 10px;' +
      'background: #15171c;' +
      'border: 1px solid #2a2e38;' +
      'border-radius: 3px;' +
    '}' +
    '.mgt-scan-row {' +
      'display: flex;' +
      'align-items: center;' +
      'justify-content: space-between;' +
      'gap: 8px;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 10.5px;' +
      'font-weight: 600;' +
      'color: #d4cab4;' +
    '}' +
    '.mgt-scan-err-count {' +
      'color: #ef4444;' +
    '}' +
    '.mgt-pulse-track {' +
      'width: 100%;' +
      'height: 5px;' +
      'background: #0b0c0e;' +
      'border: 1px solid #262b36;' +
      'border-radius: 1px;' +
      'overflow: hidden;' +
    '}' +
    '.mgt-pulse-bar {' +
      'height: 100%;' +
      'width: 0%;' +
      'background: #c98a2e;' +
    '}' +
    '.mgt-pulse-bar.is-firing {' +
      'background: #5ea385;' +
      'box-shadow: 0 0 8px rgba(94, 163, 133, 0.7);' +
    '}' +
    '.mgt-hex-grid {' +
      'flex: 1;' +
      'min-height: 0;' +
      'display: grid;' +
      'grid-template-columns: repeat(4, 1fr);' +
      'grid-template-rows: repeat(4, 1fr);' +
      'gap: 7px;' +
    '}' +
    '.mgt-hex-cell {' +
      'display: flex;' +
      'flex-direction: column;' +
      'align-items: center;' +
      'justify-content: center;' +
      'gap: 3px;' +
      'background: #14171d;' +
      'border: 1px solid #2b303c;' +
      'border-radius: 4px;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 13px;' +
      'font-weight: 600;' +
      'color: #9ba1ae;' +
      'cursor: pointer;' +
      'touch-action: manipulation;' +
      'transition: background-color 0.16s ease, border-color 0.16s ease, color 0.16s ease, transform 0.08s ease, box-shadow 0.16s ease;' +
    '}' +
    '.mgt-hex-cell:active {' +
      'transform: scale(0.95);' +
    '}' +
    '.mgt-hex-sub {' +
      'font-size: 8.5px;' +
      'letter-spacing: 0.08em;' +
      'color: #5b6170;' +
      'text-transform: uppercase;' +
    '}' +
    '.mgt-hex-cell.is-pulse-target {' +
      'background: rgba(201, 138, 46, 0.2);' +
      'border-color: #c98a2e;' +
      'color: #f3d7a3;' +
      'box-shadow: inset 0 0 12px rgba(201, 138, 46, 0.25);' +
    '}' +
    '.mgt-hex-cell.is-pulse-target .mgt-hex-sub {' +
      'color: #e2b15f;' +
    '}' +
    '.mgt-hex-cell.is-pulse-bad {' +
      'background: rgba(153, 27, 27, 0.24);' +
      'border-color: #b91c1c;' +
      'color: #fca5a5;' +
      'box-shadow: inset 0 0 12px rgba(220, 38, 38, 0.22);' +
    '}' +
    '.mgt-hex-cell.is-pulse-bad .mgt-hex-sub {' +
      'color: #f87171;' +
    '}' +
    '.mgt-hex-cell.is-captured {' +
      'background: rgba(63, 106, 88, 0.34);' +
      'border-color: #56967b;' +
      'color: #bbf0d9;' +
      'pointer-events: none;' +
    '}' +
    '.mgt-hex-cell.is-captured .mgt-hex-sub {' +
      'color: #84d6b4;' +
    '}' +
    '.mgt-hex-cell.is-tripped {' +
      'background: rgba(153, 27, 27, 0.42);' +
      'border-color: #dc2626;' +
      'color: #fecaca;' +
      'pointer-events: none;' +
    '}' +
    '.mgt-hex-cell.is-tripped .mgt-hex-sub {' +
      'color: #fca5a5;' +
    '}' +
    '.mgt-hex-cell.is-empty-hit {' +
      'background: #0f1116;' +
      'border-color: #20242d;' +
      'color: #4f5563;' +
    '}' +
    '.mgt-chat-wrap {' +
      'flex: 1;' +
      'min-height: 0;' +
      'display: flex;' +
      'flex-direction: column;' +
      'gap: 10px;' +
      'overflow-y: auto;' +
    '}' +
    '.mgt-chat-badge {' +
      'padding: 7px 10px;' +
      'background: rgba(63, 106, 88, 0.24);' +
      'border: 1px solid #3f6a58;' +
      'border-left: 3px solid #6ec4a0;' +
      'border-radius: 3px;' +
      'font-family: "Oswald", sans-serif;' +
      'font-size: 15px;' +
      'font-weight: 700;' +
      'letter-spacing: 0.1em;' +
      'color: #c6f2df;' +
      'text-transform: uppercase;' +
    '}' +
    '.mgt-chat-log {' +
      'flex: 1;' +
      'display: flex;' +
      'flex-direction: column;' +
      'gap: 8px;' +
      'padding: 10px;' +
      'background: #12151b;' +
      'border: 1px solid #2a2e38;' +
      'border-radius: 4px;' +
    '}' +
    '.mgt-chat-msg {' +
      'padding: 9px 10px;' +
      'background: #1a1e26;' +
      'border: 1px solid #2d3340;' +
      'border-left: 2px solid #c98a2e;' +
      'border-radius: 3px;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 11.5px;' +
      'line-height: 1.5;' +
      'color: #e2dfd7;' +
    '}' +
    '.mgt-chat-msg.is-audio {' +
      'background: rgba(153, 27, 27, 0.2);' +
      'border-color: rgba(220, 38, 38, 0.5);' +
      'border-left: 3px solid #dc2626;' +
      'color: #ffd7d7;' +
    '}' +
    '.mgt-fail-overlay {' +
      'position: absolute;' +
      'inset: 0;' +
      'z-index: 12;' +
      'display: flex;' +
      'align-items: center;' +
      'justify-content: center;' +
      'padding: 16px;' +
      'background: rgba(9, 10, 13, 0.94);' +
    '}' +
    '.mgt-fail-card {' +
      'width: 100%;' +
      'max-width: 320px;' +
      'padding: 18px 14px;' +
      'background: linear-gradient(180deg, rgba(153, 27, 27, 0.25) 0%, #15171c 100%);' +
      'border: 1px solid #991b1b;' +
      'border-top: 4px solid #dc2626;' +
      'border-radius: 4px;' +
      'text-align: center;' +
      'display: flex;' +
      'flex-direction: column;' +
      'gap: 8px;' +
    '}' +
    '.mgt-fail-title {' +
      'font-family: "Oswald", sans-serif;' +
      'font-size: 19px;' +
      'font-weight: 700;' +
      'letter-spacing: 0.08em;' +
      'color: #fca5a5;' +
      'text-transform: uppercase;' +
    '}' +
    '.mgt-fail-desc {' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 11.5px;' +
      'line-height: 1.48;' +
      'color: #d4cab4;' +
    '}' +
    '.mgt-audio-layout {' +
      'height: 100%;' +
      'width: 100%;' +
      'display: flex;' +
      'flex-direction: column;' +
      'padding: 8px;' +
      'gap: 8px;' +
      'background: #0b0c0e;' +
      'overflow: hidden;' +
    '}' +
    '.mgt-spec-box {' +
      'flex: 0 0 116px;' +
      'position: relative;' +
      'background: #080a0c;' +
      'border: 1px solid #2a2e38;' +
      'border-radius: 3px;' +
      'overflow: hidden;' +
      'touch-action: none;' +
    '}' +
    '.mgt-mixer {' +
      'flex-shrink: 0;' +
      'display: flex;' +
      'flex-direction: column;' +
      'gap: 7px;' +
      'padding: 8px 9px;' +
      'background: #15171c;' +
      'border: 1px solid #2a2e38;' +
      'border-radius: 3px;' +
    '}' +
    '.mgt-slider-row {' +
      'display: flex;' +
      'flex-direction: column;' +
      'gap: 4px;' +
    '}' +
    '.mgt-slider-head {' +
      'display: flex;' +
      'align-items: center;' +
      'justify-content: space-between;' +
      'gap: 6px;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 10.5px;' +
      'font-weight: 600;' +
      'color: #c8c3b8;' +
    '}' +
    '.mgt-slider-right {' +
      'display: inline-flex;' +
      'align-items: center;' +
      'gap: 6px;' +
    '}' +
    '.mgt-led {' +
      'width: 7px;' +
      'height: 7px;' +
      'border-radius: 50%;' +
      'background: #383d4a;' +
      'transition: background-color 0.2s ease, box-shadow 0.2s ease;' +
    '}' +
    '.mgt-led.is-near {' +
      'background: #c98a2e;' +
      'box-shadow: 0 0 6px rgba(201, 138, 46, 0.75);' +
    '}' +
    '.mgt-led.is-lock {' +
      'background: #4fa883;' +
      'box-shadow: 0 0 7px rgba(79, 168, 131, 0.85);' +
    '}' +
    '.mgt-slider-val {' +
      'min-width: 28px;' +
      'text-align: right;' +
      'color: #c98a2e;' +
      'font-variant-numeric: tabular-nums;' +
    '}' +
    '.mgt-range {' +
      '-webkit-appearance: none;' +
      'appearance: none;' +
      'width: 100%;' +
      'height: 24px;' +
      'background: transparent;' +
      'touch-action: none;' +
      'cursor: pointer;' +
      'outline: none;' +
    '}' +
    '.mgt-range::-webkit-slider-runnable-track {' +
      'height: 6px;' +
      'background: linear-gradient(90deg, #0b0c0e 0%, #242934 100%);' +
      'border: 1px solid #343b4a;' +
      'border-radius: 2px;' +
    '}' +
    '.mgt-range::-webkit-slider-thumb {' +
      '-webkit-appearance: none;' +
      'appearance: none;' +
      'width: 24px;' +
      'height: 22px;' +
      'margin-top: -9px;' +
      'background: linear-gradient(180deg, #434957 0%, #1d2028 100%);' +
      'border: 1.5px solid #c98a2e;' +
      'border-radius: 3px;' +
      'box-shadow: 0 2px 6px rgba(0, 0, 0, 0.75);' +
    '}' +
    '.mgt-range::-moz-range-track {' +
      'height: 6px;' +
      'background: linear-gradient(90deg, #0b0c0e 0%, #242934 100%);' +
      'border: 1px solid #343b4a;' +
      'border-radius: 2px;' +
    '}' +
    '.mgt-range::-moz-range-thumb {' +
      'width: 24px;' +
      'height: 22px;' +
      'background: linear-gradient(180deg, #434957 0%, #1d2028 100%);' +
      'border: 1.5px solid #c98a2e;' +
      'border-radius: 3px;' +
      'box-shadow: 0 2px 6px rgba(0, 0, 0, 0.75);' +
    '}' +
    '.mgt-transcript-card {' +
      'flex: 1;' +
      'min-height: 76px;' +
      'display: flex;' +
      'flex-direction: column;' +
      'gap: 6px;' +
      'padding: 8px 10px;' +
      'background: #12151a;' +
      'border: 1px solid #2a2e38;' +
      'border-left: 3px solid #991b1b;' +
      'border-radius: 3px;' +
      'overflow: hidden;' +
      'transition: border-color 0.25s ease;' +
    '}' +
    '.mgt-transcript-card.is-clean {' +
      'border-color: #3f6a58;' +
      'border-left-color: #5ea385;' +
      'background: linear-gradient(180deg, rgba(63, 106, 88, 0.18) 0%, #12151a 100%);' +
    '}' +
    '.mgt-clarity-head {' +
      'display: flex;' +
      'align-items: center;' +
      'justify-content: space-between;' +
      'gap: 8px;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 10px;' +
      'font-weight: 600;' +
      'letter-spacing: 0.08em;' +
      'color: #8b8f99;' +
      'text-transform: uppercase;' +
    '}' +
    '.mgt-clarity-val {' +
      'color: #c98a2e;' +
      'font-variant-numeric: tabular-nums;' +
    '}' +
    '.mgt-clarity-val.is-clean {' +
      'color: #6ec4a0;' +
    '}' +
    '.mgt-transcript-text {' +
      'flex: 1;' +
      'overflow-y: auto;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 11.5px;' +
      'line-height: 1.48;' +
      'color: #b7b3a8;' +
      'word-break: break-word;' +
    '}' +
    '.mgt-transcript-card.is-clean .mgt-transcript-text {' +
      'color: #e8f5ee;' +
    '}' +
    '.mgt-confirm-btn {' +
      'width: 100%;' +
    '}' +
    '.mgt-confirm-btn:disabled {' +
      'opacity: 0.38;' +
      'pointer-events: none;' +
      'background: #1c1f26;' +
      'color: #7c8290;' +
      'border-color: #2c313d;' +
    '}';

  function injectTechStyles() {
    if (document.getElementById(TECH_STYLE_ID)) {
      return;
    }
    var styleEl = document.createElement('style');
    styleEl.id = TECH_STYLE_ID;
    styleEl.textContent = TECH_CSS;
    document.head.appendChild(styleEl);
  }

  function haptic(type) {
    window.GameMinigames.haptic(type);
  }

  function sfx(name) {
    window.GameMinigames.sfx(name);
  }

  function isGameAudioMuted() {
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
     MINIGAME 1: 'phone_hack' (Комплекс взлома «КОРДОН-М»)
     ========================================================================== */

  var CRACK_SVG =
    '<svg class="mgt-crack-svg" viewBox="0 0 320 140" preserveAspectRatio="none" aria-hidden="true">' +
      '<g fill="none" stroke="#dce7f5" stroke-linecap="round">' +
        '<path d="M248 22 L212 46 L176 58 L138 96 L96 138" stroke-width="1.4" opacity="0.8"/>' +
        '<path d="M248 22 L276 0" stroke-width="1.2" opacity="0.7"/>' +
        '<path d="M248 22 L318 42" stroke-width="1.1" opacity="0.65"/>' +
        '<path d="M248 22 L258 76 L296 118" stroke-width="1.1" opacity="0.6"/>' +
        '<path d="M212 46 L190 12 L172 0" stroke-width="0.9" opacity="0.55"/>' +
        '<path d="M176 58 L122 44 L64 62 L18 46" stroke-width="1.0" opacity="0.6"/>' +
        '<path d="M176 58 L208 106 L224 140" stroke-width="0.9" opacity="0.5"/>' +
        '<path d="M138 96 L84 94 L32 126" stroke-width="0.85" opacity="0.5"/>' +
        '<circle cx="248" cy="22" r="4" stroke-width="1.1" opacity="0.75"/>' +
      '</g>' +
    '</svg>';

  window.GameMinigames.register('phone_hack', function (containerEl, config, callbacks) {
    injectTechStyles();

    var targetPin = String(config.pin || '1908').replace(/\D/g, '') || '1908';
    var pinLen = targetPin.length;
    var battery = 14;
    var pinAttempts = 0;
    var maxPinAttempts = 4;
    var enteredPin = '';
    var inputLocked = false;
    var phase = 'pin'; // 'pin' | 'cache' | 'restored' | 'failed'
    var destroyed = false;

    var timers = [];
    var rafId = null;

    function addTimer(fn, delay) {
      var id = window.setTimeout(function () {
        var idx = timers.indexOf(id);
        if (idx !== -1) {
          timers.splice(idx, 1);
        }
        if (!destroyed) {
          fn();
        }
      }, delay);
      timers.push(id);
      return id;
    }

    function clearAllTimers() {
      for (var i = 0; i < timers.length; i++) {
        window.clearTimeout(timers[i]);
      }
      timers = [];
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    // Build shell
    var wrap = document.createElement('div');
    wrap.className = 'mg-wrap';

    var header = document.createElement('div');
    header.className = 'mg-header';

    var headInfo = document.createElement('div');
    headInfo.className = 'mg-header-info';

    var titleEl = document.createElement('div');
    titleEl.className = 'mg-header-title';
    titleEl.textContent = config.title || 'КОРДОН-М // ИЗЪЯТЫЙ СМАРТФОН';

    var batRow = document.createElement('div');
    batRow.className = 'mgt-bat-row';

    var batEl = document.createElement('span');
    batEl.className = 'mgt-battery';
    batEl.innerHTML =
      '<span class="mgt-bat-icon"><span class="mgt-bat-fill" data-role="bat-fill" style="width:14%;"></span></span>' +
      '<span data-role="bat-val">БАТАРЕЯ: 14%</span>';

    var phaseTagEl = document.createElement('span');
    phaseTagEl.className = 'mgt-phase-tag';
    phaseTagEl.textContent = 'ФАЗА 1: ПИН';

    batRow.appendChild(batEl);
    batRow.appendChild(phaseTagEl);

    headInfo.appendChild(titleEl);
    headInfo.appendChild(batRow);

    var btnBack = document.createElement('button');
    btnBack.type = 'button';
    btnBack.className = 'mg-btn mg-btn-cancel';
    btnBack.textContent = 'НАЗАД / В УЛИКИ';
    btnBack.addEventListener('click', function () {
      sfx('sfxClick');
      haptic('light');
      callbacks.onCancel();
    });

    header.appendChild(headInfo);
    header.appendChild(btnBack);

    var body = document.createElement('div');
    body.className = 'mg-body';

    var screenWrap = document.createElement('div');
    screenWrap.className = 'mgt-screen-wrap';
    body.appendChild(screenWrap);

    var footer = document.createElement('div');
    footer.className = 'mg-footer';

    var footerStatus = document.createElement('div');
    footerStatus.className = 'mgt-phase-tag';
    footerStatus.style.color = '#a0a5b0';
    footerStatus.textContent = 'КОМПЛЕКС «КОРДОН-М» v4.2 // ПОДКЛЮЧЕНИЕ ПО USB-JTAG';
    footer.appendChild(footerStatus);

    wrap.appendChild(header);
    wrap.appendChild(body);
    wrap.appendChild(footer);
    containerEl.appendChild(wrap);

    var batFillEl = batEl.querySelector('[data-role="bat-fill"]');
    var batValEl = batEl.querySelector('[data-role="bat-val"]');

    function updateBatteryUI() {
      var pct = Math.max(0, Math.min(100, Math.round(battery)));
      batValEl.textContent = 'БАТАРЕЯ: ' + pct + '%';
      batFillEl.style.width = Math.max(pct > 0 ? 8 : 0, pct) + '%';
    }

    function showFailOverlay(titleText, descText, reason) {
      phase = 'failed';
      inputLocked = true;
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }

      var ov = document.createElement('div');
      ov.className = 'mgt-fail-overlay';
      ov.innerHTML =
        '<div class="mgt-fail-card">' +
          '<div class="mgt-fail-title"></div>' +
          '<div class="mgt-fail-desc"></div>' +
        '</div>';
      ov.querySelector('.mgt-fail-title').textContent = titleText;
      ov.querySelector('.mgt-fail-desc').textContent = descText;
      screenWrap.appendChild(ov);

      addTimer(function () {
        callbacks.onFail({ reason: reason });
      }, 950);
    }

    /* ----- PHASE 1: PIN ENTRY ----- */
    function renderPhase1Pin() {
      phase = 'pin';
      phaseTagEl.textContent = 'ФАЗА 1: ПИН-КОД';
      screenWrap.innerHTML = '';

      var display = document.createElement('div');
      display.className = 'mgt-phone-display';
      display.innerHTML = CRACK_SVG;

      var noteEl = document.createElement('div');
      noteEl.className = 'mgt-pin-note';
      noteEl.textContent = 'СВЕРЬТЕ ДАТЫ И ЦИФРЫ ПО ИЗЪЯТЫМ ВЕЩДОКАМ';

      var slotsEl = document.createElement('div');
      slotsEl.className = 'mgt-pin-slots';

      var cellEls = [];
      for (var i = 0; i < pinLen; i++) {
        var cell = document.createElement('div');
        cell.className = 'mgt-pin-cell';
        slotsEl.appendChild(cell);
        cellEls.push(cell);
      }

      var statusEl = document.createElement('div');
      statusEl.className = 'mgt-pin-status';
      statusEl.textContent = 'ВВЕДИТЕ 4-ЗНАЧНЫЙ ПИН · ПОПЫТОК: ' + maxPinAttempts;

      display.appendChild(noteEl);
      display.appendChild(slotsEl);
      display.appendChild(statusEl);

      var keypad = document.createElement('div');
      keypad.className = 'mgt-keypad';

      var keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'СБРОС', '0', '⌫'];

      function syncPinCells(stateClass) {
        for (var c = 0; c < cellEls.length; c++) {
          var ch = enteredPin[c] || '';
          cellEls[c].textContent = ch;
          cellEls[c].classList.remove('is-filled', 'is-error', 'is-ok');
          if (stateClass) {
            cellEls[c].classList.add(stateClass);
          } else if (ch) {
            cellEls[c].classList.add('is-filled');
          }
        }
      }

      function verifyPin() {
        inputLocked = true;
        if (enteredPin === targetPin) {
          syncPinCells('is-ok');
          statusEl.className = 'mgt-pin-status is-ok';
          statusEl.textContent = 'КОД ПРИНЯТ — ДОСТУП К ДАМПУ ПАМЯТИ...';
          sfx('sfxSuccess');
          haptic('success');
          addTimer(function () {
            renderPhase2Cache();
          }, 620);
        } else {
          pinAttempts += 1;
          syncPinCells('is-error');
          slotsEl.classList.remove('is-shake');
          void slotsEl.offsetWidth;
          slotsEl.classList.add('is-shake');
          sfx('sfxAlert');
          haptic('error');

          if (pinAttempts >= maxPinAttempts) {
            battery = 0;
            updateBatteryUI();
            statusEl.className = 'mgt-pin-status is-err';
            statusEl.textContent = 'КРИТИЧЕСКИЙ РАЗРЯД — 0%';
            showFailOverlay(
              'БАТАРЕЯ РАЗРЯЖЕНА (0%)',
              'Смартфон отключился до снятия блокировки. Контроллер питания не отвечает.',
              'battery_dead'
            );
          } else {
            battery = Math.max(1, battery - 3);
            updateBatteryUI();
            var left = maxPinAttempts - pinAttempts;
            statusEl.className = 'mgt-pin-status is-err';
            statusEl.textContent = 'НЕВЕРНЫЙ ПИН · ОСТАЛОСЬ ПОПЫТОК: ' + left;
            addTimer(function () {
              enteredPin = '';
              syncPinCells('');
              inputLocked = false;
            }, 420);
          }
        }
      }

      for (var k = 0; k < keys.length; k++) {
        (function (val) {
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'mgt-key';
          if (val === '⌫' || val === 'СБРОС') {
            btn.classList.add('is-fn');
          }
          btn.textContent = val;

          btn.addEventListener('click', function () {
            if (inputLocked || phase !== 'pin') {
              return;
            }
            sfx('sfxClick');
            haptic('light');

            if (val === '⌫') {
              if (enteredPin.length > 0) {
                enteredPin = enteredPin.slice(0, -1);
                syncPinCells('');
              }
              return;
            }
            if (val === 'СБРОС') {
              enteredPin = '';
              syncPinCells('');
              return;
            }

            if (enteredPin.length < pinLen) {
              enteredPin += val;
              syncPinCells('');
              if (enteredPin.length === pinLen) {
                inputLocked = true;
                addTimer(verifyPin, 140);
              }
            }
          });

          keypad.appendChild(btn);
        })(keys[k]);
      }

      screenWrap.appendChild(display);
      screenWrap.appendChild(keypad);
    }

    /* ----- PHASE 2: DELETED CACHE DUMP (4x4 HEX SECTORS) ----- */
    function renderPhase2Cache() {
      phase = 'cache';
      inputLocked = false;
      phaseTagEl.textContent = 'ФАЗА 2: ДАМП КЭША';
      footerStatus.textContent = 'ПЕРЕХВАТИТЕ 4 ЯНТАРНЫЕ СИГНАТУРЫ · ИЗБЕГАЙТЕ КРАСНЫХ БИТЫХ СЕКТОРОВ';
      screenWrap.innerHTML = '';

      var hexLabels = [
        '0x0A', '0x1F', '0x2C', '0x3E',
        '0x4B', '0x59', '0x6D', '0x7A',
        '0x84', '0x91', '0xA8', '0xB3',
        '0xC7', '0xD5', '0xE2', '0xFF'
      ];

      // Shuffle roles: 4 targets, 3 bad self-wipe sectors, 9 empty
      var roles = [
        'target', 'target', 'target', 'target',
        'bad', 'bad', 'bad',
        'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'
      ];
      for (var i = roles.length - 1; i > 0; i--) {
        var r = Math.floor(Math.random() * (i + 1));
        var tmp = roles[i];
        roles[i] = roles[r];
        roles[r] = tmp;
      }

      var capturedCount = 0;
      var badHits = 0;
      var maxBadAllowed = 2; // 3rd hit triggers wipe
      var sectors = [];

      var scanHead = document.createElement('div');
      scanHead.className = 'mgt-scan-head';

      var scanRow = document.createElement('div');
      scanRow.className = 'mgt-scan-row';

      var sigCounter = document.createElement('span');
      sigCounter.textContent = 'СИГНАТУРЫ: 0 / 4';

      var errCounter = document.createElement('span');
      errCounter.className = 'mgt-scan-err-count';
      errCounter.textContent = 'СБОИ: 0 / 3';

      scanRow.appendChild(sigCounter);
      scanRow.appendChild(errCounter);

      var pulseTrack = document.createElement('div');
      pulseTrack.className = 'mgt-pulse-track';
      var pulseBar = document.createElement('div');
      pulseBar.className = 'mgt-pulse-bar';
      pulseTrack.appendChild(pulseBar);

      scanHead.appendChild(scanRow);
      scanHead.appendChild(pulseTrack);

      var hexGrid = document.createElement('div');
      hexGrid.className = 'mgt-hex-grid';

      for (var s = 0; s < 16; s++) {
        (function (idx) {
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'mgt-hex-cell';

          var codeSpan = document.createElement('span');
          codeSpan.textContent = hexLabels[idx];

          var subSpan = document.createElement('span');
          subSpan.className = 'mgt-hex-sub';
          subSpan.textContent = 'MEM';

          btn.appendChild(codeSpan);
          btn.appendChild(subSpan);

          var sector = {
            role: roles[idx],
            captured: false,
            tripped: false,
            el: btn,
            subEl: subSpan
          };
          sectors.push(sector);

          btn.addEventListener('click', function () {
            if (inputLocked || phase !== 'cache' || sector.captured || sector.tripped) {
              return;
            }

            if (sector.role === 'target') {
              sector.captured = true;
              capturedCount += 1;
              btn.classList.remove('is-pulse-target');
              btn.classList.add('is-captured');
              subSpan.textContent = 'ДАМП OK';
              sigCounter.textContent = 'СИГНАТУРЫ: ' + capturedCount + ' / 4';
              sfx('sfxClick');
              haptic('light');

              if (capturedCount >= 4) {
                inputLocked = true;
                if (rafId !== null) {
                  window.cancelAnimationFrame(rafId);
                  rafId = null;
                }
                sfx('sfxSuccess');
                haptic('success');
                addTimer(function () {
                  renderPhase3Restored();
                }, 460);
              }
            } else if (sector.role === 'bad') {
              sector.tripped = true;
              badHits += 1;
              btn.classList.remove('is-pulse-bad');
              btn.classList.add('is-tripped');
              subSpan.textContent = 'WIPE!';
              errCounter.textContent = 'СБОИ: ' + badHits + ' / 3';
              sfx('sfxAlert');
              haptic('error');

              if (badHits > maxBadAllowed) {
                battery = Math.max(0, battery - 3);
                updateBatteryUI();
                showFailOverlay(
                  'СРАБОТАЛА САМООЧИСТКА',
                  'Критические ошибки чтения запустили аппаратное стирание кэша. Файлы уничтожены.',
                  'wipe_triggered'
                );
              } else {
                battery = Math.max(1, battery - 2);
                updateBatteryUI();
              }
            } else {
              btn.classList.add('is-empty-hit');
              subSpan.textContent = 'ПУСТО';
              sfx('sfxClick');
              haptic('light');
            }
          });

          hexGrid.appendChild(btn);
        })(s);
      }

      screenWrap.appendChild(scanHead);
      screenWrap.appendChild(hexGrid);

      // Scanner pulse loop: every 2.5s lights up for 0.7s (first pulse after 0.4s)
      var CYCLE_MS = 2500;
      var PULSE_MS = 700;
      var cycleStart = performance.now() - (CYCLE_MS - 400);
      var wasPulsing = false;

      function tickScanner(now) {
        if (destroyed || phase !== 'cache') {
          return;
        }
        var elapsed = (now - cycleStart) % CYCLE_MS;
        var isPulsing = elapsed < PULSE_MS;

        if (isPulsing) {
          var rem = 1 - elapsed / PULSE_MS;
          pulseBar.style.width = Math.round(rem * 100) + '%';
          pulseBar.classList.add('is-firing');
        } else {
          var prog = (elapsed - PULSE_MS) / (CYCLE_MS - PULSE_MS);
          pulseBar.style.width = Math.round(prog * 100) + '%';
          pulseBar.classList.remove('is-firing');
        }

        if (isPulsing !== wasPulsing) {
          wasPulsing = isPulsing;
          for (var j = 0; j < sectors.length; j++) {
            var sec = sectors[j];
            if (sec.captured || sec.tripped) {
              continue;
            }
            if (sec.role === 'target') {
              sec.el.classList.toggle('is-pulse-target', isPulsing);
              sec.subEl.textContent = isPulsing ? 'SIG' : 'MEM';
            } else if (sec.role === 'bad') {
              sec.el.classList.toggle('is-pulse-bad', isPulsing);
              sec.subEl.textContent = isPulsing ? 'ERR' : 'MEM';
            }
          }
        }

        rafId = window.requestAnimationFrame(tickScanner);
      }

      rafId = window.requestAnimationFrame(tickScanner);
    }

    /* ----- PHASE 3: RESTORED CACHE ----- */
    function renderPhase3Restored() {
      phase = 'restored';
      phaseTagEl.textContent = 'КЭШ ВОССТАНОВЛЕН';
      footerStatus.textContent = 'ДАМП СОХРАНЁН В БУФЕР «КОРДОН-М»';
      screenWrap.innerHTML = '';

      var defaultLines = [
        '[22:14] Алина: «Электричка встала, иду пешком мимо депо, тут темень жуткая»',
        '[22:19] Алина: «Всё норм, остановилась машина. Знакомый, в форме, с нашей стороны, обещал докинуть до переезда»',
        '[22:21] [АУДИОЗАПИСЬ 00:12 — ЗАПИСАНО ИЗ КАРМАНА, ПОВРЕЖДЕНО]'
      ];
      var lines =
        Array.isArray(config.chatLines) && config.chatLines.length > 0
          ? config.chatLines
          : defaultLines;

      var chatWrap = document.createElement('div');
      chatWrap.className = 'mgt-chat-wrap';

      var badge = document.createElement('div');
      badge.className = 'mgt-chat-badge';
      badge.textContent = 'КЭШ ВОССТАНОВЛЕН // МЕССЕНДЖЕР';

      var chatLog = document.createElement('div');
      chatLog.className = 'mgt-chat-log';

      for (var i = 0; i < lines.length; i++) {
        var msg = document.createElement('div');
        msg.className = 'mgt-chat-msg';
        var lineText = String(lines[i]);
        if (lineText.indexOf('АУДИОЗАПИСЬ') !== -1 || i === lines.length - 1) {
          msg.classList.add('is-audio');
        }
        msg.textContent = lineText;
        chatLog.appendChild(msg);
      }

      var btnExtract = document.createElement('button');
      btnExtract.type = 'button';
      btnExtract.className = 'mg-btn mg-btn-primary';
      btnExtract.style.width = '100%';
      btnExtract.textContent = 'ИЗВЛЕЧЬ АУДИОФАЙЛ';
      btnExtract.addEventListener('click', function () {
        sfx('sfxSuccess');
        haptic('success');
        callbacks.onSuccess({ hacked: true });
      });

      chatWrap.appendChild(badge);
      chatWrap.appendChild(chatLog);
      screenWrap.appendChild(chatWrap);
      screenWrap.appendChild(btnExtract);
    }

    updateBatteryUI();
    renderPhase1Pin();

    return function cleanup() {
      destroyed = true;
      clearAllTimers();
    };
  });

  /* ==========================================================================
     MINIGAME 2: 'audio_clean' (Спектрограмма и очистка записи от шума товарняка)
     ========================================================================== */

  window.GameMinigames.register('audio_clean', function (containerEl, config, callbacks) {
    injectTechStyles();

    var targetsCfg = config.targets || {};
    var targetLow = Array.isArray(targetsCfg.low) && targetsCfg.low.length === 2 ? targetsCfg.low : [72, 88];
    var targetMid = Array.isArray(targetsCfg.mid) && targetsCfg.mid.length === 2 ? targetsCfg.mid : [56, 72];
    var targetHigh = Array.isArray(targetsCfg.high) && targetsCfg.high.length === 2 ? targetsCfg.high : [64, 80];

    var transcript =
      config.transcript ||
      '«...куда ты свернул? Переезд же в другую сторону... открой дверь, пусти!.. [РЕЗКИЙ ПИСК РАЦИИ МВД: "Борт-4, приём..."] — Заткнись. Всё тихо.»';

    var values = {
      low: 18,
      mid: 16,
      high: 20
    };

    var clarityPct = 0;
    var isCleanLocked = false;
    var destroyed = false;
    var radioPulseAlpha = 0;
    var lastRadioTime = performance.now() - 1200;

    // Deterministic scramble thresholds per character
    var rand = createPrng(40988);
    var noiseChars = '*#~%^░▒/';
    var charMeta = [];
    for (var ci = 0; ci < transcript.length; ci++) {
      var ch = transcript.charAt(ci);
      var isSpaceOrPunct = /[\s.,!?:;«»"—\-()\[\]]/.test(ch);
      var inRadioTag =
        transcript.indexOf('[РЕЗКИЙ') !== -1 &&
        ci >= transcript.indexOf('[РЕЗКИЙ') &&
        ci <= transcript.indexOf('"]') + 1;
      var thresh = isSpaceOrPunct
        ? 0.0
        : inRadioTag
          ? 0.56 + rand() * 0.35
          : 0.14 + rand() * 0.76;
      charMeta.push({
        ch: ch,
        keep: ch === ' ' || ch === '\n',
        thresh: thresh,
        noise: noiseChars.charAt(Math.floor(rand() * noiseChars.length))
      });
    }

    // Procedural Web Audio engine (isolated & strictly closed on cleanup)
    var audioEngine = {
      ctx: null,
      masterGain: null,
      trainGain: null,
      windGain: null,
      voiceGain: null,
      radioBus: null,
      nodesToStop: [],
      allNodes: [],
      started: false,
      closed: false
    };

    function createNoiseBuffer(audioCtx, seconds, pink) {
      var sr = audioCtx.sampleRate || 44100;
      var len = Math.floor(sr * seconds);
      var buf = audioCtx.createBuffer(1, len, sr);
      var data = buf.getChannelData(0);
      if (!pink) {
        for (var i = 0; i < len; i++) {
          data[i] = Math.random() * 2 - 1;
        }
      } else {
        var b0 = 0;
        var b1 = 0;
        var b2 = 0;
        for (var j = 0; j < len; j++) {
          var w = Math.random() * 2 - 1;
          b0 = 0.997 * b0 + w * 0.029;
          b1 = 0.985 * b1 + w * 0.032;
          b2 = 0.950 * b2 + w * 0.048;
          data[j] = (b0 + b1 + b2 + w * 0.08) * 1.6;
        }
      }
      return buf;
    }

    function initLocalAudio() {
      if (audioEngine.started || audioEngine.closed || destroyed) {
        return;
      }
      try {
        var AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) {
          return;
        }
        var aCtx = new AudioCtx();
        var now = aCtx.currentTime;

        var comp = aCtx.createDynamicsCompressor();
        comp.threshold.setValueAtTime(-16, now);
        comp.ratio.setValueAtTime(5, now);

        var masterGain = aCtx.createGain();
        masterGain.gain.setValueAtTime(isGameAudioMuted() ? 0 : 0.72, now);

        comp.connect(masterGain);
        masterGain.connect(aCtx.destination);

        var whiteBuf = createNoiseBuffer(aCtx, 2.0, false);
        var pinkBuf = createNoiseBuffer(aCtx, 2.5, true);

        // 1. Low freight train rumble + rhythmic wheel clatter
        var trainGain = aCtx.createGain();
        trainGain.gain.setValueAtTime(0.32, now);

        var trainLp = aCtx.createBiquadFilter();
        trainLp.type = 'lowpass';
        trainLp.frequency.setValueAtTime(195, now);
        trainLp.Q.setValueAtTime(1.5, now);

        var trainOsc1 = aCtx.createOscillator();
        trainOsc1.type = 'sawtooth';
        trainOsc1.frequency.setValueAtTime(54, now);

        var trainOsc2 = aCtx.createOscillator();
        trainOsc2.type = 'triangle';
        trainOsc2.frequency.setValueAtTime(41.5, now);

        var trainNoise = aCtx.createBufferSource();
        trainNoise.buffer = pinkBuf;
        trainNoise.loop = true;

        // Rhythmic wheel-joint clatter modulation
        var clatterGain = aCtx.createGain();
        clatterGain.gain.setValueAtTime(0.68, now);

        var clatterLfo = aCtx.createOscillator();
        clatterLfo.type = 'square';
        clatterLfo.frequency.setValueAtTime(2.35, now);

        var clatterLfoLp = aCtx.createBiquadFilter();
        clatterLfoLp.type = 'lowpass';
        clatterLfoLp.frequency.setValueAtTime(8, now);

        var clatterDepth = aCtx.createGain();
        clatterDepth.gain.setValueAtTime(0.32, now);

        clatterLfo.connect(clatterLfoLp);
        clatterLfoLp.connect(clatterDepth);
        clatterDepth.connect(clatterGain.gain);

        trainOsc1.connect(trainLp);
        trainOsc2.connect(trainLp);
        trainNoise.connect(trainLp);
        trainLp.connect(clatterGain);
        clatterGain.connect(trainGain);
        trainGain.connect(comp);

        // 2. High-frequency wind whistle & static hiss
        var windGain = aCtx.createGain();
        windGain.gain.setValueAtTime(0.24, now);

        var windNoise = aCtx.createBufferSource();
        windNoise.buffer = whiteBuf;
        windNoise.loop = true;

        var windBp = aCtx.createBiquadFilter();
        windBp.type = 'bandpass';
        windBp.frequency.setValueAtTime(2750, now);
        windBp.Q.setValueAtTime(2.6, now);

        var windLfo = aCtx.createOscillator();
        windLfo.type = 'sine';
        windLfo.frequency.setValueAtTime(0.28, now);

        var windLfoGain = aCtx.createGain();
        windLfoGain.gain.setValueAtTime(580, now);

        windLfo.connect(windLfoGain);
        windLfoGain.connect(windBp.frequency);

        var staticHp = aCtx.createBiquadFilter();
        staticHp.type = 'highpass';
        staticHp.frequency.setValueAtTime(3800, now);

        var staticTrim = aCtx.createGain();
        staticTrim.gain.setValueAtTime(0.28, now);

        windNoise.connect(windBp);
        windBp.connect(windGain);
        windNoise.connect(staticHp);
        staticHp.connect(staticTrim);
        staticTrim.connect(windGain);
        windGain.connect(comp);

        // 3. Subtle mid-band pocket voice channel presence
        var voiceGain = aCtx.createGain();
        voiceGain.gain.setValueAtTime(0.02, now);

        var voiceNoise = aCtx.createBufferSource();
        voiceNoise.buffer = pinkBuf;
        voiceNoise.loop = true;

        var voiceBp = aCtx.createBiquadFilter();
        voiceBp.type = 'bandpass';
        voiceBp.frequency.setValueAtTime(980, now);
        voiceBp.Q.setValueAtTime(3.2, now);

        voiceNoise.connect(voiceBp);
        voiceBp.connect(voiceGain);
        voiceGain.connect(comp);

        // 4. Radio chirp bus
        var radioBus = aCtx.createGain();
        radioBus.gain.setValueAtTime(1.0, now);
        radioBus.connect(comp);

        trainOsc1.start(now);
        trainOsc2.start(now);
        trainNoise.start(now);
        clatterLfo.start(now);
        windNoise.start(now);
        windLfo.start(now);
        voiceNoise.start(now);

        audioEngine.ctx = aCtx;
        audioEngine.masterGain = masterGain;
        audioEngine.trainGain = trainGain;
        audioEngine.windGain = windGain;
        audioEngine.voiceGain = voiceGain;
        audioEngine.radioBus = radioBus;
        audioEngine.nodesToStop = [
          trainOsc1,
          trainOsc2,
          trainNoise,
          clatterLfo,
          windNoise,
          windLfo,
          voiceNoise
        ];
        audioEngine.allNodes = [
          trainOsc1,
          trainOsc2,
          trainNoise,
          trainLp,
          clatterLfo,
          clatterLfoLp,
          clatterDepth,
          clatterGain,
          trainGain,
          windNoise,
          windBp,
          windLfo,
          windLfoGain,
          staticHp,
          staticTrim,
          windGain,
          voiceNoise,
          voiceBp,
          voiceGain,
          radioBus,
          comp,
          masterGain
        ];
        audioEngine.started = true;

        if (aCtx.state === 'suspended') {
          var p = aCtx.resume();
          if (p && typeof p.catch === 'function') {
            p.catch(function () {});
          }
        }
      } catch (e) {
        // Safe fallback if audio blocked
      }
    }

    function resumeLocalAudio() {
      if (!audioEngine.started && !audioEngine.closed) {
        initLocalAudio();
      }
      try {
        if (audioEngine.ctx && audioEngine.ctx.state === 'suspended') {
          var p = audioEngine.ctx.resume();
          if (p && typeof p.catch === 'function') {
            p.catch(function () {});
          }
        }
      } catch (e) {
        // Ignore resume errors
      }
    }

    function playEmbeddedRadioBeep(clarityNorm) {
      if (destroyed || audioEngine.closed || isGameAudioMuted()) {
        return;
      }
      if (!audioEngine.ctx || !audioEngine.radioBus || clarityNorm < 0.22) {
        return;
      }
      try {
        var aCtx = audioEngine.ctx;
        if (aCtx.state !== 'running') {
          return;
        }
        var now = aCtx.currentTime;
        var vol = Math.min(0.24, clarityNorm * clarityNorm * 0.24);

        var osc = aCtx.createOscillator();
        osc.type = 'square';
        osc.frequency.setValueAtTime(1340, now);
        osc.frequency.setValueAtTime(985, now + 0.048);

        var bp = aCtx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.setValueAtTime(1320, now);
        bp.Q.setValueAtTime(2.2, now);

        var env = aCtx.createGain();
        env.gain.setValueAtTime(0.0001, now);
        env.gain.linearRampToValueAtTime(vol, now + 0.008);
        env.gain.setValueAtTime(vol * 0.85, now + 0.088);
        env.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);

        osc.connect(bp);
        bp.connect(env);
        env.connect(audioEngine.radioBus);

        osc.start(now);
        osc.stop(now + 0.12);
      } catch (e) {
        // Ignore chirp errors
      }
    }

    function stopLocalAudio() {
      if (audioEngine.closed) {
        return;
      }
      audioEngine.closed = true;
      try {
        if (audioEngine.ctx && audioEngine.masterGain) {
          var now = audioEngine.ctx.currentTime;
          audioEngine.masterGain.gain.cancelScheduledValues(now);
          audioEngine.masterGain.gain.setValueAtTime(0, now);
        }
      } catch (e) {
        // Ignore gain mute error
      }

      for (var i = 0; i < audioEngine.nodesToStop.length; i++) {
        try {
          audioEngine.nodesToStop[i].stop();
        } catch (e) {
          // Already stopped
        }
      }
      for (var j = 0; j < audioEngine.allNodes.length; j++) {
        try {
          audioEngine.allNodes[j].disconnect();
        } catch (e) {
          // Already disconnected
        }
      }

      if (audioEngine.ctx && typeof audioEngine.ctx.close === 'function') {
        try {
          var closeP = audioEngine.ctx.close();
          if (closeP && typeof closeP.catch === 'function') {
            closeP.catch(function () {});
          }
        } catch (e) {
          // Ignore close error
        }
      }

      audioEngine.ctx = null;
      audioEngine.nodesToStop = [];
      audioEngine.allNodes = [];
    }

    function calcBandAccuracy(val, range) {
      var min = range[0];
      var max = range[1];
      if (val >= min && val <= max) {
        return 1.0;
      }
      var dist = val < min ? min - val : val - max;
      return Math.max(0, 1 - dist / 58);
    }

    function calcCenterPrecision(val, range) {
      var mid = (range[0] + range[1]) * 0.5;
      var half = Math.max(1, (range[1] - range[0]) * 0.5);
      var normDist = Math.min(1, Math.abs(val - mid) / half);
      return 1 - normDist;
    }

    // Build DOM
    var wrap = document.createElement('div');
    wrap.className = 'mg-wrap';

    var header = document.createElement('div');
    header.className = 'mg-header';

    var headInfo = document.createElement('div');
    headInfo.className = 'mg-header-info';

    var titleEl = document.createElement('div');
    titleEl.className = 'mg-header-title';
    titleEl.textContent = config.title || 'АКУСТИЧЕСКАЯ ОЧИСТКА ЗАПИСИ';

    var counterEl = document.createElement('div');
    counterEl.className = 'mg-counter';
    counterEl.textContent = 'ЧИСТОТА СИГНАЛА: 0%';

    headInfo.appendChild(titleEl);
    headInfo.appendChild(counterEl);

    var btnBack = document.createElement('button');
    btnBack.type = 'button';
    btnBack.className = 'mg-btn mg-btn-cancel';
    btnBack.textContent = 'НАЗАД';
    btnBack.addEventListener('click', function () {
      stopLocalAudio();
      sfx('sfxClick');
      haptic('light');
      callbacks.onCancel();
    });

    header.appendChild(headInfo);
    header.appendChild(btnBack);

    var body = document.createElement('div');
    body.className = 'mg-body';

    var layout = document.createElement('div');
    layout.className = 'mgt-audio-layout';

    var specBox = document.createElement('div');
    specBox.className = 'mgt-spec-box';

    var canvas = document.createElement('canvas');
    canvas.className = 'mg-canvas';
    specBox.appendChild(canvas);

    // 3 Mixer Sliders
    var mixer = document.createElement('div');
    mixer.className = 'mgt-mixer';

    var sliderConfigs = [
      { key: 'low', label: 'НЧ-ФИЛЬТР (Грохот ветки)', target: targetLow },
      { key: 'mid', label: 'СЧ-УСИЛЕНИЕ (Голосовой канал)', target: targetMid },
      { key: 'high', label: 'ВЧ-ШУМОДАВ (Ветер / статика)', target: targetHigh }
    ];

    var sliderRefs = {};

    for (var si = 0; si < sliderConfigs.length; si++) {
      (function (sc) {
        var row = document.createElement('div');
        row.className = 'mgt-slider-row';

        var head = document.createElement('div');
        head.className = 'mgt-slider-head';

        var label = document.createElement('span');
        label.textContent = sc.label;

        var right = document.createElement('span');
        right.className = 'mgt-slider-right';

        var led = document.createElement('span');
        led.className = 'mgt-led';

        var valEl = document.createElement('span');
        valEl.className = 'mgt-slider-val';
        valEl.textContent = String(values[sc.key]);

        right.appendChild(led);
        right.appendChild(valEl);
        head.appendChild(label);
        head.appendChild(right);

        var range = document.createElement('input');
        range.type = 'range';
        range.className = 'mgt-range';
        range.min = '0';
        range.max = '100';
        range.step = '1';
        range.value = String(values[sc.key]);

        range.addEventListener('pointerdown', function () {
          resumeLocalAudio();
        });

        range.addEventListener('input', function () {
          resumeLocalAudio();
          values[sc.key] = Number(range.value) || 0;
          valEl.textContent = String(values[sc.key]);
          evaluateFilters();
        });

        row.appendChild(head);
        row.appendChild(range);
        mixer.appendChild(row);

        sliderRefs[sc.key] = {
          led: led,
          valEl: valEl,
          range: range,
          target: sc.target
        };
      })(sliderConfigs[si]);
    }

    // Auto-transcript card
    var transcriptCard = document.createElement('div');
    transcriptCard.className = 'mgt-transcript-card';

    var clarityHead = document.createElement('div');
    clarityHead.className = 'mgt-clarity-head';

    var transLabel = document.createElement('span');
    transLabel.textContent = 'АВТОРАСШИФРОВКА';

    var clarityValEl = document.createElement('span');
    clarityValEl.className = 'mgt-clarity-val';
    clarityValEl.textContent = 'ЧИСТОТА СИГНАЛА: 0%';

    clarityHead.appendChild(transLabel);
    clarityHead.appendChild(clarityValEl);

    var transcriptTextEl = document.createElement('div');
    transcriptTextEl.className = 'mgt-transcript-text';

    transcriptCard.appendChild(clarityHead);
    transcriptCard.appendChild(transcriptTextEl);

    layout.appendChild(specBox);
    layout.appendChild(mixer);
    layout.appendChild(transcriptCard);
    body.appendChild(layout);

    // Footer confirm button
    var footer = document.createElement('div');
    footer.className = 'mg-footer';

    var btnConfirm = document.createElement('button');
    btnConfirm.type = 'button';
    btnConfirm.className = 'mg-btn mg-btn-primary mgt-confirm-btn';
    btnConfirm.textContent = 'ЗАФИКСИРОВАТЬ ОЧИЩЕННУЮ ЗАПИСЬ';
    btnConfirm.disabled = true;
    btnConfirm.addEventListener('click', function () {
      if (!isCleanLocked || destroyed) {
        return;
      }
      stopLocalAudio();
      sfx('sfxStamp');
      haptic('success');
      callbacks.onSuccess({ cleaned: true });
    });

    footer.appendChild(btnConfirm);

    wrap.appendChild(header);
    wrap.appendChild(body);
    wrap.appendChild(footer);
    containerEl.appendChild(wrap);

    // Filter state metrics for audio + visuals
    var bandAcc = { low: 0, mid: 0, high: 0 };

    function buildScrambledTranscript(pct) {
      if (pct >= 92) {
        return transcript;
      }
      if (pct < 20) {
        return '*#... [ГРОХОТ ТОВАРНЯКА] ...куда т*... [ШУМ ВЕТРА] ...**... [ПОМЕХИ] ...*#...';
      }
      var norm = pct / 100;
      var out = '';
      for (var i = 0; i < charMeta.length; i++) {
        var m = charMeta[i];
        if (m.keep || norm >= m.thresh) {
          out += m.ch;
        } else {
          out += m.noise;
        }
      }
      return out;
    }

    function evaluateFilters() {
      bandAcc.low = calcBandAccuracy(values.low, targetLow);
      bandAcc.mid = calcBandAccuracy(values.mid, targetMid);
      bandAcc.high = calcBandAccuracy(values.high, targetHigh);

      var keys = ['low', 'mid', 'high'];
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var acc = bandAcc[k];
        var led = sliderRefs[k].led;
        led.classList.remove('is-near', 'is-lock');
        if (acc >= 1) {
          led.classList.add('is-lock');
        } else if (acc >= 0.72) {
          led.classList.add('is-near');
        }
      }

      var allLocked = bandAcc.low >= 1 && bandAcc.mid >= 1 && bandAcc.high >= 1;
      if (allLocked) {
        var prec =
          (calcCenterPrecision(values.low, targetLow) +
            calcCenterPrecision(values.mid, targetMid) +
            calcCenterPrecision(values.high, targetHigh)) /
          3;
        clarityPct = Math.min(100, Math.round(93 + prec * 7));
      } else {
        var avg = (bandAcc.low + bandAcc.mid + bandAcc.high) / 3;
        clarityPct = Math.min(89, Math.round(avg * 90));
      }

      var wasClean = isCleanLocked;
      isCleanLocked = clarityPct >= 92 && allLocked;

      counterEl.textContent = 'ЧИСТОТА СИГНАЛА: ' + clarityPct + '%';
      counterEl.style.color = isCleanLocked ? '#6ec4a0' : '#c98a2e';

      clarityValEl.textContent = 'ЧИСТОТА СИГНАЛА: ' + clarityPct + '%';
      clarityValEl.classList.toggle('is-clean', isCleanLocked);
      transcriptCard.classList.toggle('is-clean', isCleanLocked);
      transcriptTextEl.textContent = buildScrambledTranscript(clarityPct);
      btnConfirm.disabled = !isCleanLocked;

      if (isCleanLocked && !wasClean) {
        haptic('success');
        sfx('sfxSuccess');
      }

      syncLocalAudioGains();
    }

    function syncLocalAudioGains() {
      if (!audioEngine.started || audioEngine.closed || !audioEngine.ctx) {
        return;
      }
      try {
        var now = audioEngine.ctx.currentTime;
        var muted = isGameAudioMuted();
        audioEngine.masterGain.gain.setTargetAtTime(muted ? 0 : 0.72, now, 0.04);

        var trainLevel = 0.014 + Math.pow(1 - bandAcc.low, 1.45) * 0.36;
        var windLevel = 0.008 + Math.pow(1 - bandAcc.high, 1.45) * 0.25;
        var voiceLevel = 0.01 + bandAcc.mid * 0.085;

        audioEngine.trainGain.gain.setTargetAtTime(trainLevel, now, 0.05);
        audioEngine.windGain.gain.setTargetAtTime(windLevel, now, 0.05);
        audioEngine.voiceGain.gain.setTargetAtTime(voiceLevel, now, 0.05);
      } catch (e) {
        // Ignore audio param errors
      }
    }

    // Canvas spectrogram & oscilloscope rendering
    var ctx = canvas.getContext('2d');
    var cssW = 320;
    var cssH = 116;
    var dpr = 1;
    var rafId = null;
    var resizeObserver = null;
    var barLevels = [];
    var BAR_COUNT = 28;
    for (var b = 0; b < BAR_COUNT; b++) {
      barLevels.push(0.15);
    }

    function resizeCanvas() {
      if (destroyed) {
        return;
      }
      var rect = specBox.getBoundingClientRect();
      var nextW = Math.max(160, Math.floor(rect.width));
      var nextH = Math.max(88, Math.floor(rect.height));

      dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      cssW = nextW;
      cssH = nextH;

      var physW = Math.floor(cssW * dpr);
      var physH = Math.floor(cssH * dpr);
      if (canvas.width !== physW || canvas.height !== physH) {
        canvas.width = physW;
        canvas.height = physH;
      }
    }

    if (typeof window.ResizeObserver === 'function') {
      resizeObserver = new window.ResizeObserver(function () {
        resizeCanvas();
      });
      resizeObserver.observe(specBox);
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    initLocalAudio();
    evaluateFilters();

    function renderSpectrogram(now) {
      if (destroyed) {
        return;
      }

      var t = now * 0.001;
      var clarityNorm = clarityPct / 100;

      // Sync mute status continuously & fire periodic MVD radio chirp (~2.5s)
      syncLocalAudioGains();
      if (now - lastRadioTime >= 2500) {
        lastRadioTime = now;
        if (clarityNorm >= 0.25) {
          radioPulseAlpha = Math.min(1, 0.3 + clarityNorm * 0.7);
          playEmbeddedRadioBeep(clarityNorm);
        }
      }
      radioPulseAlpha = Math.max(0, radioPulseAlpha - 0.032);

      var lowNoise = 1 - bandAcc.low;
      var midPower = bandAcc.mid;
      var highNoise = 1 - bandAcc.high;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // CRT forensic background
      ctx.fillStyle = '#080a0d';
      ctx.fillRect(0, 0, cssW, cssH);

      var splitY = Math.floor(cssH * 0.48);

      // Subtle oscilloscope grid
      ctx.strokeStyle = 'rgba(63, 106, 88, 0.16)';
      ctx.lineWidth = 1;
      for (var gx = 0; gx < cssW; gx += 28) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, cssH);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(0, splitY * 0.5);
      ctx.lineTo(cssW, splitY * 0.5);
      ctx.moveTo(0, splitY);
      ctx.lineTo(cssW, splitY);
      ctx.stroke();

      // 1. Live Oscillogram (top half)
      var waveMidY = splitY * 0.5;
      var maxAmp = splitY * 0.42;

      ctx.save();
      ctx.beginPath();
      var samples = 96;
      for (var s = 0; s <= samples; s++) {
        var frac = s / samples;
        var x = frac * cssW;

        var trainWave =
          (Math.sin(frac * 14 + t * 13) * 0.65 + Math.sin(frac * 7 - t * 9.5) * 0.35) *
          lowNoise *
          0.72;
        var windWave =
          (Math.sin(frac * 85 + t * 44) * Math.cos(frac * 49 - t * 31)) *
          highNoise *
          0.48;
        var voiceEnv = Math.sin(frac * Math.PI);
        var voiceWave =
          (Math.sin(frac * 28 + t * 18) * 0.5 + Math.sin(frac * 44 - t * 23) * 0.3) *
          voiceEnv *
          (0.18 + midPower * 0.45);
        var radioBurst =
          radioPulseAlpha > 0.05
            ? Math.sin(frac * 110 + t * 70) * radioPulseAlpha * 0.55 * voiceEnv
            : 0;

        var y = waveMidY + Math.max(-1, Math.min(1, trainWave + windWave + voiceWave + radioBurst)) * maxAmp;
        if (s === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.strokeStyle = isCleanLocked
        ? '#6ec4a0'
        : radioPulseAlpha > 0.3
          ? '#eab354'
          : '#c98a2e';
      ctx.lineWidth = 1.65;
      ctx.stroke();
      ctx.restore();

      // 2. Spectrum Analyzer Bars (bottom half)
      var specTop = splitY + 4;
      var specH = cssH - specTop - 13;
      var barGap = 2;
      var barW = (cssW - 12 - (BAR_COUNT - 1) * barGap) / BAR_COUNT;

      for (var i = 0; i < BAR_COUNT; i++) {
        var bandPos = i / (BAR_COUNT - 1);
        var targetLevel = 0.08;

        if (bandPos < 0.33) {
          // Low frequency train rumble band
          var clatterPulse = 0.7 + 0.3 * Math.sin(t * 14.8 + i * 0.5);
          targetLevel = 0.08 + lowNoise * 0.85 * clatterPulse * (1 - bandPos * 1.2);
        } else if (bandPos < 0.67) {
          // Mid voice + radio chirp band
          var centerBell = 1 - Math.abs(bandPos - 0.5) * 4.8;
          var voiceFlicker = 0.62 + 0.38 * Math.sin(t * 11 + i * 1.4);
          targetLevel = 0.1 + Math.max(0.15, centerBell) * (0.2 + midPower * 0.64) * voiceFlicker;
          if (radioPulseAlpha > 0.05 && Math.abs(bandPos - 0.56) < 0.09) {
            targetLevel = Math.min(1, targetLevel + radioPulseAlpha * 0.72);
          }
        } else {
          // High frequency wind / static band
          var staticJitter = 0.55 + 0.45 * Math.abs(Math.sin(t * 29 + i * 2.7));
          targetLevel = 0.06 + highNoise * 0.84 * staticJitter;
        }

        barLevels[i] += (Math.min(1, targetLevel) - barLevels[i]) * 0.24;

        var bh = Math.max(2, barLevels[i] * specH);
        var bx = 6 + i * (barW + barGap);
        var by = specTop + specH - bh;

        if (bandPos < 0.33) {
          ctx.fillStyle = lowNoise > 0.25 ? '#b91c1c' : '#5ea385';
        } else if (bandPos < 0.67) {
          ctx.fillStyle =
            radioPulseAlpha > 0.25 && Math.abs(bandPos - 0.56) < 0.09
              ? '#ef4444'
              : midPower >= 1
                ? '#5ea385'
                : '#c98a2e';
        } else {
          ctx.fillStyle = highNoise > 0.25 ? '#c98a2e' : '#5ea385';
        }

        ctx.fillRect(bx, by, barW, bh);
      }

      // Frequency scale & radio chirp HUD markers
      ctx.font = '600 8.5px "IBM Plex Mono", monospace';
      ctx.textBaseline = 'bottom';
      ctx.fillStyle = '#6f7685';
      ctx.textAlign = 'left';
      ctx.fillText('60Hz НЧ', 6, cssH - 2);
      ctx.textAlign = 'center';
      ctx.fillText('1.2kHz ГОЛОС', cssW * 0.5, cssH - 2);
      ctx.textAlign = 'right';
      ctx.fillText('6kHz ВЧ', cssW - 6, cssH - 2);

      if (radioPulseAlpha > 0.2) {
        ctx.fillStyle = 'rgba(239, 68, 68, ' + radioPulseAlpha.toFixed(2) + ')';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'top';
        ctx.fillText('● СИГНАЛ РАЦИИ МВД', cssW - 7, 5);
      } else {
        ctx.fillStyle = 'rgba(201, 138, 46, 0.65)';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText('AUDIO_2221.RAW // 00:12', 7, 5);
      }

      rafId = window.requestAnimationFrame(renderSpectrogram);
    }

    rafId = window.requestAnimationFrame(renderSpectrogram);

    return function cleanup() {
      destroyed = true;
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      if (resizeObserver) {
        try {
          resizeObserver.disconnect();
        } catch (e) {
          // Ignore disconnect error
        }
        resizeObserver = null;
      }
      window.removeEventListener('resize', resizeCanvas);
      stopLocalAudio();
    };
  });
})();
