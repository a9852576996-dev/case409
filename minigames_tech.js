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
     MINIGAME 1: 'phone_hack' (4 scenarios: case409 + case412 acts 2/5/6 + Phase 3)
     ========================================================================== */

  var PH_EXTRA_STYLE_ID = 'minigames-tech-ph-extra';

  var PH_EXTRA_CSS =
    '.mgt-cover-slip {' +
      'position: absolute; inset: 8px; z-index: 8; border-radius: 6px; padding: 14px 12px;' +
      'display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 10px;' +
      'text-align: center; touch-action: none; cursor: grab;' +
      'background: linear-gradient(166deg, #252a36 0%, #14171f 68%, #0d1016 100%);' +
      'border: 1.5px solid var(--case-accent, #c98a2e); border-left: 4px solid var(--case-accent, #c98a2e);' +
      'box-shadow: 0 12px 28px rgba(0,0,0,0.85);' +
      'transition: transform 0.24s ease, opacity 0.24s ease;' +
    '}' +
    '.mgt-cover-slip.is-paper {' +
      'background: linear-gradient(166deg, #efe2b0 0%, #dec986 68%, #cbb36b 100%);' +
      'color: #211c13; border-color: #9b823f; border-left-color: #991b1b;' +
    '}' +
    '.mgt-cover-slip.is-dragging { transition: none; cursor: grabbing; }' +
    '.mgt-cover-slip.is-peeled { transform: translate3d(118%, -12px, 0) rotate(9deg) !important; opacity: 0 !important; pointer-events: none; }' +
    '.mgt-cover-kicker { font-family: "Oswald", sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase; color: var(--case-accent, #f59e0b); }' +
    '.mgt-cover-slip.is-paper .mgt-cover-kicker { color: #881c1c; }' +
    '.mgt-cover-txt { font-family: "IBM Plex Mono", monospace; font-size: 11px; line-height: 1.44; color: #d6d2c8; max-width: 280px; }' +
    '.mgt-cover-slip.is-paper .mgt-cover-txt { color: #2b2419; }' +
    '.mgt-cover-btn { padding: 7px 12px; border-radius: 4px; font-family: "IBM Plex Mono", monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; background: rgba(201,138,46,0.22); color: #fde68a; border: 1px solid var(--case-accent, #c98a2e); }' +
    '.mgt-cover-slip.is-paper .mgt-cover-btn { background: #211c13; color: #f3e4a8; border-color: #4d4128; }' +
    '.mgt-key.is-smudge { position: relative; border-color: #444d61; }' +
    '.mgt-key.is-smudge::after { content: ""; position: absolute; width: 18px; height: 18px; border-radius: 50%; background: radial-gradient(circle, rgba(212,202,180,0.16) 0%, rgba(212,202,180,0) 72%); pointer-events: none; }' +
    '.mgt-deduce-card { flex: 1; overflow-y: auto; background: #14171f; border: 1px solid #353b4a; border-top: 3px solid var(--case-accent, #c98a2e); border-radius: 6px; padding: 11px; display: flex; flex-direction: column; gap: 8px; }' +
    '.mgt-dkicker { font-family: "IBM Plex Mono", monospace; font-size: 9.8px; font-weight: 700; color: var(--case-accent, #c98a2e); text-transform: uppercase; }' +
    '.mgt-dfacts { padding: 7px 8px; background: #0d1016; border: 1px solid #262b36; border-radius: 5px; font-family: "IBM Plex Mono", monospace; font-size: 9.8px; line-height: 1.4; color: #c2cad8; display: flex; flex-direction: column; gap: 3px; }' +
    '.mgt-dq { font-size: 12.2px; line-height: 1.38; color: #f3efe6; font-weight: 500; }' +
    '.mgt-dopts { display: flex; flex-direction: column; gap: 6px; }' +
    '.mgt-dopt { width: 100%; text-align: left; padding: 8px 9px; background: #1b202b; border: 1px solid #353d4e; border-radius: 5px; color: #e4e0d8; font-size: 11.5px; line-height: 1.34; cursor: pointer; }' +
    '.mgt-dopt.is-wrong { border-color: #ef4444; background: rgba(153,27,27,0.25); color: #fecaca; }' +
    '.mgt-dopt.is-correct { border-color: #22c55e; background: rgba(34,197,94,0.2); color: #bbf7d0; }' +
    '.mgt-dfb { font-family: "IBM Plex Mono", monospace; font-size: 10.2px; line-height: 1.35; min-height: 15px; color: #fca5a5; }' +
    '.mgt-dfb.is-ok { color: #86efac; }';

  function injectPhExtraStyles() {
    if (document.getElementById(PH_EXTRA_STYLE_ID)) return;
    var el = document.createElement('style');
    el.id = PH_EXTRA_STYLE_ID;
    el.textContent = PH_EXTRA_CSS;
    document.head.appendChild(el);
  }

  var CRACK_SVG =
    '<svg class="mgt-crack-svg" viewBox="0 0 320 140" preserveAspectRatio="none" aria-hidden="true">' +
      '<g fill="none" stroke="#dce7f5" stroke-linecap="round">' +
        '<path d="M248 22 L212 46 L176 58 L138 96 L96 138" stroke-width="1.4" opacity="0.8"/>' +
        '<path d="M248 22 L276 0" stroke-width="1.2" opacity="0.7"/>' +
        '<path d="M248 22 L318 42" stroke-width="1.1" opacity="0.65"/>' +
        '<path d="M248 22 L258 76 L296 118" stroke-width="1.1" opacity="0.6"/>' +
        '<path d="M212 46 L190 12 L172 0" stroke-width="0.9" opacity="0.55"/>' +
        '<path d="M176 58 L122 44 L64 62 L18 46" stroke-width="1.0" opacity="0.6"/>' +
        '<circle cx="248" cy="22" r="4" stroke-width="1.1" opacity="0.75"/>' +
      '</g>' +
    '</svg>';

  function resolvePhoneScenario(config) {
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

    var hint = String(cfg.title || (storyNode && storyNode.title) || '');

    // 1. case412 Act II: Artem's phone
    if (cfg.preset === 'case412_artem' || (caseId === 'case412' && (nodeId === 'act2_mg_phone' || /арт[её]м/i.test(hint)))) {
      return {
        id: 'case412_act2_phone',
        title: cfg.title || 'СМАРТФОН АРТЁМА // КОРДОН-М',
        pin: String(cfg.pin || '4812').replace(/\D/g, '') || '4812',
        battery: 18,
        showCracks: false,
        cover: {
          tone: 'paper',
          kicker: 'ПРИКОЛОТЫЙ ЧЕК АЗС №12',
          text: 'На экране лежит бумажный чек ночной смены Артёма (22:05). Сдвиньте его — на обороте записан код карты «4812».',
          btnText: 'СДВИНУТЬ ЧЕК ⇄'
        },
        pinHint: 'НА ОБОРОТЕ ЧЕКА АЗС: 4812 · СЛЕДЫ НА КЛАВИШАХ',
        footerIdle: 'КОМПЛЕКС «КОРДОН-М» // АНАЛИЗ ГЕОМЕТОК И ГОЛОСОВЫХ',
        phase2Title: 'ФАЗА 2: ДАМП ГЕОМЕТОК',
        phase2Hint: 'ПЕРЕХВАТИТЕ 4 ЯНТАРНЫЕ СИГНАТУРЫ · ИЗБЕГАЙТЕ КРАСНЫХ БИТЫХ СЕКТОРОВ',
        hexBadge: 'КЭШ ВОССТАНОВЛЕН // ТЕЛЕФОН АРТЁМА',
        chatLines: [
          '[22:05–03:50] GPS-трек: круглосуточная АЗС на трассе, 12 км от «Тихих Ключей» (чек подтверждён).',
          '[2 дня назад] Голосовое от Алины: «Странный вежливый сосед с Садовой третий вечер притормаживает рядом на универсале и молча смотрит в зеркало...»',
          '[ИТОГ ПРОВЕРКИ] Ни одной геометки Артёма в посёлке в ночь пропажи нет.'
        ],
        extractBtn: 'ПЕРЕЙТИ К ВЫВОДУ',
        finalBtn: 'ПРИОБЩИТЬ К ДЕЛУ',
        conclusion: {
          question: 'GPS-трек и чек АЗС держат Артёма в 12 км всю ночь, а в голосовом Алина жаловалась на «вежливого соседа на универсале». Вывод:',
          options: [
            { id: 'artem_guilty', text: 'Артём подделал чек и всё равно похитил Алину на трассе.', isCorrect: false, reason: 'Противоречие: GPS-трек, вышка БС-02 и чек АЗС сходятся до минуты в 12 км от посёлка.' },
            { id: 'artem_clear', text: 'Алиби Артёма подтверждено (версия Громова рухнула); за Алиной следил сосед с Садовой на универсале.', isCorrect: true, reason: 'Верно: Рыжий чист, а след ведёт прямо на Садовую улицу.' },
            { id: 'runaway_alone', text: 'Алина сбежала одна, испугавшись ссоры с матерью.', isCorrect: false, reason: 'Противоречие: в голосовом Алина прямо говорит о слежке со стороны вежливого соседа.' }
          ]
        }
      };
    }

    // 2. case412 Act V: Hidden garage electrical panel
    if (cfg.preset === 'case412_panel' || (caseId === 'case412' && (nodeId === 'act5_mg_pin' || /щит|бункер/i.test(hint)))) {
      return {
        id: 'case412_act5_panel',
        title: cfg.title || 'СКРЫТЫЙ ЩИТОК БУНКЕРА // №14',
        pin: String(cfg.pin || '1416').replace(/\D/g, '') || '1416',
        battery: 16,
        showCracks: false,
        cover: {
          tone: 'metal',
          kicker: 'ФАЛЬШ-КРЫШКА ЭЛЕКТРОСЧЁТЧИКА',
          text: 'За муляжом счётчика в гараже скрыта кодовая плата замка и вентиляции. На внутренней маркировке: «УЧАСТОК 14 / ЗАЛИВКА 16 → 1416».',
          btnText: 'СНЯТЬ КРЫШКУ ⇄'
        },
        pinHint: 'МАРКИРОВКА ПЛАТЫ: УЧАСТОК 14 · ГОД 16 (1416)',
        footerIdle: 'КОНТУР ЭЛЕКТРОМАГНИТНОГО ЗАМКА И ВЕНТИЛЯЦИИ',
        phase2Title: 'ФАЗА 2: РЕЛЕ ЗАСОВА',
        phase2Hint: 'АКТИВИРУЙТЕ 4 ЯНТАРНЫХ РЕЛЕ ЗАМКА · НЕ ЗАДЕНЬТЕ 3 КРАСНЫХ РЕЛЕ ВЫТЯЖКИ',
        hexBadge: 'ЭЛЕКТРОМАГНИТНЫЙ ЗАСОВ РАЗБЛОКИРОВАН',
        chatLines: [
          '[РЕЛЕ-1..4] Электромагнитный засов стального люка под верстаком обесточен — слышен тяжёлый щелчок.',
          '[ВЕНТИЛЯЦИЯ] Вытяжка на 3 секунды перешла в тихий режим — и по трубе стояка сразу раздался живой стук: три удара, пауза, три удара!',
          '[ВНИМАНИЕ] Немедленно вернуть питание вытяжки, чтобы не перекрыть воздух внизу.'
        ],
        extractBtn: 'ПЕРЕЙТИ К ВЫВОДУ',
        finalBtn: 'ЗАФИКСИРОВАТЬ ВСКРЫТИЕ',
        conclusion: {
          question: 'Засов люка под верстаком открыт, а в момент паузы вытяжки из железного стояка раздался отчётливый тройной стук. Вывод:',
          options: [
            { id: 'cut_power', text: 'Нужно полностью обесточить гараж Кравцова и уйти ждать утра.', isCorrect: false, reason: 'Противоречие: отключение питания остановит подземную вытяжку и лишит пленницу воздуха!' },
            { id: 'alive_below', text: 'Алина жива и находится прямо под бетонной плитой гаража — сохраняем вытяжку и немедленно идём вниз.', isCorrect: true, reason: 'Верно: живой сигнал по трубе подтверждает, что дорога каждая минута.' },
            { id: 'pipe_air', text: 'Стук вызвал гидроудар в водопроводе при отключении реле.', isCorrect: false, reason: 'Противоречие: чёткий ритм «три удара — пауза — три удара» — осознанный сигнал бедствия.' }
          ]
        }
      };
    }

    // 3. case412 Act VI: Emergency cellar inner steel door lock
    if (cfg.preset === 'case412_lock' || (caseId === 'case412' && (nodeId === 'act6_mg_lock' || /аварийн|камер/i.test(hint)))) {
      return {
        id: 'case412_act6_lock',
        title: cfg.title || 'АВАРИЙНЫЙ ЗАМОК КАМЕРЫ // №412',
        pin: String(cfg.pin || '0412').replace(/\D/g, '') || '0412',
        battery: 12,
        showCracks: false,
        cover: {
          tone: 'metal',
          kicker: 'КОЖУХ АВАРИЙНОГО СБРОСА',
          text: 'Резервный АКБ садится! Сдвиньте защитный кожух — под ним сервисная бирка сброса ригелей и клапана продувки: «0412».',
          btnText: 'СДВИНУТЬ КОЖУХ ⇄'
        },
        pinHint: 'СЕРВИСНЫЙ КОД СБРОСА РИГЕЛЕЙ: 0412',
        footerIdle: 'ПАНЕЛЬ СТАЛЬНОЙ ДВЕРИ // РЕЗЕРВНЫЙ АКБ',
        phase2Title: 'ФАЗА 2: СБРОС РИГЕЛЕЙ',
        phase2Hint: 'РАЗБЛОКИРУЙТЕ 4 ЯНТАРНЫХ РИГЕЛЯ · ИЗБЕГАЙТЕ 3 КРАСНЫХ КОНТУРОВ БЛОКИРОВКИ',
        hexBadge: 'РИГЕЛИ ОТОШЛИ // КЛАПАН ПРОДУВКИ ОТКРЫТ',
        chatLines: [
          '[ДВЕРЬ] Три массивных стальных ригеля с гулким лязгом отошли в корпус двери.',
          '[ПРОДУВКА] Аварийный клапан пассивной вентиляции открыт — свежий воздух пошёл внутрь камеры!',
          '[СТАТУС] Алина в безопасности, но наверху Кравцов рассчитывает на прикрытие районного судьи.'
        ],
        extractBtn: 'ПЕРЕЙТИ К ВЫВОДУ',
        finalBtn: 'ОТКРЫТЬ ДВЕРЬ КАМЕРЫ',
        conclusion: {
          question: 'Замок стальной камеры разблокирован и клапан продувки открыт. Что критично сделать дальше по делу №412?',
          options: [
            { id: 'leave_docs', text: 'Не тратить время на улики и отпустить Кравцова под подписку.', isCorrect: false, reason: 'Противоречие: без бумажного досье покровитель Кравцова в суде развалит дело.' },
            { id: 'save_and_lock', text: 'Обеспечить доступ воздуха в камеру и добить бумажную защиту Кравцова неопровержимой хронологией.', isCorrect: true, reason: 'Верно: жизнь Алины спасена, теперь закрываем все лазейки Кравцова.' },
            { id: 'close_valve', text: 'Снова заблокировать ригели до приезда участкового Громова.', isCorrect: false, reason: 'Противоречие: Громов сам замешан в сокрытии улик, а в камере заканчивался воздух.' }
          ]
        }
      };
    }

    // 4. case409 Act III: Alina Savelieva's broken smartphone (default for case409)
    if (cfg.preset === 'case409' || caseId === 'case409' || nodeId === 'act3_phone_game' || cfg.pin === '1908') {
      return {
        id: 'case409_act3_phone',
        title: cfg.title || 'КОРДОН-М // СМАРТФОН АЛИНЫ',
        pin: String(cfg.pin || '1908').replace(/\D/g, '') || '1908',
        battery: 14,
        showCracks: true,
        cover: {
          tone: 'metal',
          kicker: 'НАЛЁТ ИЛА И ЗАЩИТНАЯ ПЛЁНКА',
          text: 'Смартфон поднят из дренажной канавы. Сдвиньте грязную плёнку, чтобы увидеть потёртые цифры на экране и ввести ПИН из личных вещей (дата рождения).',
          btnText: 'СНЯТЬ ПЛЁНКУ ⇄'
        },
        pinHint: 'СВЕРЬТЕ ДАТУ ИЗ ЛИЧНЫХ ВЕЩЕЙ АЛИНЫ (4 ЦИФРЫ)',
        footerIdle: 'КОМПЛЕКС «КОРДОН-М» v4.2 // ПОДКЛЮЧЕНИЕ ПО USB-JTAG',
        phase2Title: 'ФАЗА 2: ДАМП КЭША',
        phase2Hint: 'ПЕРЕХВАТИТЕ 4 ЯНТАРНЫЕ СИГНАТУРЫ · ИЗБЕГАЙТЕ 3 КРАСНЫХ БИТЫХ СЕКТОРОВ',
        hexBadge: 'КЭШ ВОССТАНОВЛЕН // МЕССЕНДЖЕР',
        chatLines: Array.isArray(cfg.chatLines) && cfg.chatLines.length > 0 ? cfg.chatLines : [
          '[22:14] Алина: «Электричка встала, иду пешком мимо депо, тут темень жуткая»',
          '[22:19] Алина: «Всё норм, остановилась машина. Знакомый, в форме, с нашей стороны, обещал докинуть до переезда»',
          '[22:21] [АУДИОЗАПИСЬ 00:12 — ЗАПИСАНО ИЗ КАРМАНА, ПОВРЕЖДЕНО]'
        ],
        extractBtn: 'ПЕРЕЙТИ К ВЫВОДУ',
        finalBtn: 'ИЗВЛЕЧЬ АУДИОФАЙЛ',
        conclusion: {
          question: 'В 22:19 Алина добровольно села в машину к «знакомому в форме», а в 22:21 началась скрытая аудиозапись из кармана. Вывод:',
          options: [
            { id: 'stranger_ditch', text: 'На Алину напал случайный бродяга в канаве, пока она шла пешком от депо.', isCorrect: false, reason: 'Противоречие: в 22:19 она сама написала, что села в машину к знакомому сотруднику в форме.' },
            { id: 'cop_car', text: 'Убийца воспользовался доверием и ведомственной формой, чтобы посадить Алину в машину — повреждённую запись 22:21 нужно срочно очистить.', isCorrect: true, reason: 'Верно: сообщение 22:19 и аудиофайл 22:21 прямо указывают на сотрудника в форме.' },
            { id: 'gromov_car', text: 'Её подвёз слесарь Громов на служебном дрезинном поезде.', isCorrect: false, reason: 'Противоречие: Алина прямо указала, что остановилась машина со «знакомым в форме».' }
          ]
        }
      };
    }

    // 5. Neutral generic fallback
    var gPin = String(cfg.pin || '2408').replace(/\D/g, '') || '2408';
    return {
      id: 'generic_phone_hack',
      title: cfg.title || 'КОРДОН-М // ИЗВЛЕЧЕНИЕ ДАННЫХ',
      pin: gPin,
      battery: 16,
      showCracks: true,
      cover: {
        tone: 'metal',
        kicker: 'ЗАЩИТНАЯ БИРКА ВЕЩДОКА',
        text: 'Сдвиньте защитный чехол, чтобы открыть клавиатуру ввода кода доступа (' + gPin + ').',
        btnText: 'СНЯТЬ ЧЕХОЛ ⇄'
      },
      pinHint: 'ВВЕДИТЕ КОД ДОСТУПА (ПОТЁРТЫЕ КЛАВИШИ)',
      footerIdle: 'ТЕРМИНАЛ «КОРДОН-М» // ИЗВЛЕЧЕНИЕ ДАМПА',
      phase2Title: 'ФАЗА 2: ДАМП ПАМЯТИ',
      phase2Hint: 'ПЕРЕХВАТИТЕ 4 ЯНТАРНЫЕ СИГНАТУРЫ · ИЗБЕГАЙТЕ 3 КРАСНЫХ БИТЫХ СЕКТОРОВ',
      hexBadge: 'ДАННЫЕ ВОССТАНОВЛЕНЫ',
      chatLines: Array.isArray(cfg.chatLines) && cfg.chatLines.length > 0 ? cfg.chatLines : [
        '[ДАМП #1] Системный журнал и метаданные успешно извлечены.',
        '[ДАМП #2] Обнаружен удалённый фрагмент ключевой записи.'
      ],
      extractBtn: 'ПЕРЕЙТИ К ВЫВОДУ',
      finalBtn: 'ПРИОБЩИТЬ ДАМП К ДЕЛУ',
      conclusion: cfg.conclusion || {
        question: 'Доступ получен и 4 удалённых сектора кэша успешно восстановлены. Вывод:',
        options: [
          { id: 'corrupt', text: 'Дамп полностью пуст и не содержит улик.', isCorrect: false, reason: 'Противоречие: все 4 целевые сигнатуры восстановлены без повреждений.' },
          { id: 'ok', text: 'Удалённые данные успешно извлечены и пригодны для приобщения к материалам дела.', isCorrect: true, reason: 'Верно: цифровой след зафиксирован.' },
          { id: 'wipe', text: 'Сработала самоочистка памяти.', isCorrect: false, reason: 'Противоречие: битые сектора самоочистки успешно обойдены.' }
        ]
      }
    };
  }


  window.GameMinigames.register('phone_hack', function (containerEl, config, callbacks) {
    injectTechStyles();
    injectPhExtraStyles();

    var cfg = config || {};
    var scenario = resolvePhoneScenario(cfg);
    var targetPin = scenario.pin;
    var pinLen = targetPin.length;
    var pinDigitsSet = {};
    for (var pd = 0; pd < targetPin.length; pd++) {
      pinDigitsSet[targetPin.charAt(pd)] = true;
    }

    var battery = scenario.battery || 14;
    var pinAttempts = 0;
    var maxPinAttempts = 4;
    var enteredPin = '';
    var inputLocked = false;
    var coverRemoved = !scenario.cover;
    var phase = 'pin'; // 'pin' | 'cache' | 'restored' | 'deduce' | 'failed'
    var destroyed = false;

    var timers = [];
    var rafId = null;

    function addTimer(fn, delay) {
      var id = window.setTimeout(function () {
        var idx = timers.indexOf(id);
        if (idx !== -1) timers.splice(idx, 1);
        if (!destroyed) fn();
      }, delay);
      timers.push(id);
      return id;
    }

    function clearAllTimers() {
      for (var i = 0; i < timers.length; i++) window.clearTimeout(timers[i]);
      timers = [];
      if (rafId !== null) { window.cancelAnimationFrame(rafId); rafId = null; }
    }

    var wrap = document.createElement('div');
    wrap.className = 'mg-wrap';

    var header = document.createElement('div');
    header.className = 'mg-header';

    var headInfo = document.createElement('div');
    headInfo.className = 'mg-header-info';

    var titleEl = document.createElement('div');
    titleEl.className = 'mg-header-title';
    titleEl.textContent = scenario.title;

    var batRow = document.createElement('div');
    batRow.className = 'mgt-bat-row';

    var batEl = document.createElement('span');
    batEl.className = 'mgt-battery';
    batEl.innerHTML =
      '<span class="mgt-bat-icon"><span class="mgt-bat-fill" data-role="bat-fill" style="width:' + battery + '%;"></span></span>' +
      '<span data-role="bat-val">ЗАРЯД: ' + battery + '%</span>';

    var phaseTagEl = document.createElement('span');
    phaseTagEl.className = 'mgt-phase-tag';
    phaseTagEl.textContent = 'ФАЗА 1: КОД ДОСТУПА';

    batRow.appendChild(batEl);
    batRow.appendChild(phaseTagEl);
    headInfo.appendChild(titleEl);
    headInfo.appendChild(batRow);

    var btnBack = document.createElement('button');
    btnBack.type = 'button';
    btnBack.className = 'mg-btn mg-btn-cancel';
    btnBack.textContent = 'НАЗАД / УЛИКИ';
    btnBack.addEventListener('click', function () {
      sfx('sfxClick'); haptic('light');
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
    footerStatus.textContent = scenario.footerIdle;
    footer.appendChild(footerStatus);

    wrap.appendChild(header);
    wrap.appendChild(body);
    wrap.appendChild(footer);
    containerEl.appendChild(wrap);

    var batFillEl = batEl.querySelector('[data-role="bat-fill"]');
    var batValEl = batEl.querySelector('[data-role="bat-val"]');

    function updateBatteryUI() {
      var pct = Math.max(0, Math.min(100, Math.round(battery)));
      batValEl.textContent = 'ЗАРЯД: ' + pct + '%';
      batFillEl.style.width = Math.max(pct > 0 ? 8 : 0, pct) + '%';
    }

    function showFailOverlay(titleText, descText, reason) {
      phase = 'failed';
      inputLocked = true;
      if (rafId !== null) { window.cancelAnimationFrame(rafId); rafId = null; }
      var ov = document.createElement('div');
      ov.className = 'mgt-fail-overlay';
      ov.innerHTML = '<div class="mgt-fail-card"><div class="mgt-fail-title"></div><div class="mgt-fail-desc"></div></div>';
      ov.querySelector('.mgt-fail-title').textContent = titleText;
      ov.querySelector('.mgt-fail-desc').textContent = descText;
      screenWrap.appendChild(ov);
      addTimer(function () {
        callbacks.onFail({ reason: reason, scenarioId: scenario.id });
      }, 950);
    }

    function attachCoverSlip() {
      if (!scenario.cover || coverRemoved) return;
      var slip = document.createElement('div');
      slip.className = 'mgt-cover-slip' + (scenario.cover.tone === 'paper' ? ' is-paper' : '');

      var kicker = document.createElement('div');
      kicker.className = 'mgt-cover-kicker';
      kicker.textContent = scenario.cover.kicker;

      var txt = document.createElement('div');
      txt.className = 'mgt-cover-txt';
      txt.textContent = scenario.cover.text;

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'mgt-cover-btn';
      btn.textContent = scenario.cover.btnText || 'СДВИНУТЬ ⇄';

      slip.appendChild(kicker);
      slip.appendChild(txt);
      slip.appendChild(btn);
      screenWrap.appendChild(slip);

      var dragging = false, ptrId = null, startX = 0;
      function peel() {
        if (coverRemoved || destroyed) return;
        coverRemoved = true; dragging = false;
        slip.classList.remove('is-dragging');
        slip.classList.add('is-peeled');
        sfx('sfxPaper'); haptic('medium');
        addTimer(function () { slip.style.display = 'none'; }, 260);
      }

      btn.addEventListener('pointerdown', function (e) { e.stopPropagation(); });
      btn.addEventListener('click', function (e) { e.stopPropagation(); peel(); });
      slip.addEventListener('pointerdown', function (e) {
        if (coverRemoved) return;
        dragging = true; ptrId = e.pointerId; startX = e.clientX;
        slip.classList.add('is-dragging');
        try { slip.setPointerCapture(e.pointerId); } catch (err) {}
      });
      slip.addEventListener('pointermove', function (e) {
        if (!dragging || coverRemoved || e.pointerId !== ptrId) return;
        var dx = e.clientX - startX;
        slip.style.transform = 'translate3d(' + dx + 'px, 0, 0) rotate(' + Math.max(-12, Math.min(12, dx * 0.07)) + 'deg)';
        slip.style.opacity = String(Math.max(0.25, Math.min(1, 1 - Math.abs(dx) / 145)));
        if (Math.abs(dx) >= 46) peel();
      });
      function endDrag(e) {
        if (!dragging || (ptrId !== null && e.pointerId !== ptrId)) return;
        dragging = false; ptrId = null;
        if (!coverRemoved) {
          slip.classList.remove('is-dragging');
          slip.style.transform = ''; slip.style.opacity = '';
        }
      }
      slip.addEventListener('pointerup', endDrag);
      slip.addEventListener('pointercancel', endDrag);
    }

    function renderPhase1Pin() {
      phase = 'pin';
      phaseTagEl.textContent = 'ФАЗА 1: КОД ДОСТУПА';
      screenWrap.innerHTML = '';

      var display = document.createElement('div');
      display.className = 'mgt-phone-display';
      if (scenario.showCracks) display.innerHTML = CRACK_SVG;

      var noteEl = document.createElement('div');
      noteEl.className = 'mgt-pin-note';
      noteEl.textContent = scenario.pinHint;

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
      statusEl.textContent = 'ВВЕДИТЕ 4-ЗНАЧНЫЙ КОД · ПОПЫТОК: ' + maxPinAttempts;

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
          if (stateClass) cellEls[c].classList.add(stateClass);
          else if (ch) cellEls[c].classList.add('is-filled');
        }
      }

      function verifyPin() {
        inputLocked = true;
        if (enteredPin === targetPin) {
          syncPinCells('is-ok');
          statusEl.className = 'mgt-pin-status is-ok';
          statusEl.textContent = 'КОД ПРИНЯТ — ПЕРЕХОД К ДАМПУ / РЕЛЕ...';
          sfx('sfxSuccess'); haptic('success');
          addTimer(renderPhase2Cache, 600);
        } else {
          pinAttempts += 1;
          syncPinCells('is-error');
          slotsEl.classList.remove('is-shake'); void slotsEl.offsetWidth; slotsEl.classList.add('is-shake');
          sfx('sfxAlert'); haptic('error');

          if (pinAttempts >= maxPinAttempts) {
            battery = 0; updateBatteryUI();
            statusEl.className = 'mgt-pin-status is-err';
            statusEl.textContent = 'КРИТИЧЕСКИЙ РАЗРЯД — 0%';
            showFailOverlay('ЗАРЯД ИСЧЕРПАН (0%)', 'Питание отключилось до снятия блокировки.', 'battery_dead');
          } else {
            battery = Math.max(2, battery - 3); updateBatteryUI();
            statusEl.className = 'mgt-pin-status is-err';
            statusEl.textContent = 'НЕВЕРНЫЙ КОД · ОСТАЛОСЬ ПОПЫТОК: ' + (maxPinAttempts - pinAttempts);
            addTimer(function () { enteredPin = ''; syncPinCells(''); inputLocked = false; }, 420);
          }
        }
      }

      for (var k = 0; k < keys.length; k++) {
        (function (val) {
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'mgt-key';
          if (val === '⌫' || val === 'СБРОС') btn.classList.add('is-fn');
          if (pinDigitsSet[val]) btn.classList.add('is-smudge');
          btn.textContent = val;

          btn.addEventListener('click', function () {
            if (inputLocked || phase !== 'pin' || !coverRemoved) return;
            sfx('sfxClick'); haptic('light');
            if (val === '⌫') {
              if (enteredPin.length > 0) { enteredPin = enteredPin.slice(0, -1); syncPinCells(''); }
              return;
            }
            if (val === 'СБРОС') { enteredPin = ''; syncPinCells(''); return; }
            if (enteredPin.length < pinLen) {
              enteredPin += val;
              syncPinCells('');
              if (enteredPin.length === pinLen) { inputLocked = true; addTimer(verifyPin, 140); }
            }
          });
          keypad.appendChild(btn);
        })(keys[k]);
      }

      screenWrap.appendChild(display);
      screenWrap.appendChild(keypad);
      attachCoverSlip();
    }

    function renderPhase2Cache() {
      phase = 'cache';
      inputLocked = false;
      phaseTagEl.textContent = scenario.phase2Title;
      footerStatus.textContent = scenario.phase2Hint;
      screenWrap.innerHTML = '';

      var hexLabels = ['0x0A','0x1F','0x2C','0x3E','0x4B','0x59','0x6D','0x7A','0x84','0x91','0xA8','0xB3','0xC7','0xD5','0xE2','0xFF'];
      var roles = ['target','target','target','target','bad','bad','bad','empty','empty','empty','empty','empty','empty','empty','empty','empty'];
      for (var i = roles.length - 1; i > 0; i--) {
        var r = Math.floor(Math.random() * (i + 1));
        var tmp = roles[i]; roles[i] = roles[r]; roles[r] = tmp;
      }

      var capturedCount = 0, badHits = 0, maxBadAllowed = 2, sectors = [];

      var scanHead = document.createElement('div');
      scanHead.className = 'mgt-scan-head';
      var scanRow = document.createElement('div');
      scanRow.className = 'mgt-scan-row';
      var sigCounter = document.createElement('span');
      sigCounter.textContent = 'ЦЕЛИ: 0 / 4';
      var errCounter = document.createElement('span');
      errCounter.className = 'mgt-scan-err-count';
      errCounter.textContent = 'СБОИ: 0 / 3';
      scanRow.appendChild(sigCounter); scanRow.appendChild(errCounter);

      var pulseTrack = document.createElement('div');
      pulseTrack.className = 'mgt-pulse-track';
      var pulseBar = document.createElement('div');
      pulseBar.className = 'mgt-pulse-bar';
      pulseTrack.appendChild(pulseBar);
      scanHead.appendChild(scanRow); scanHead.appendChild(pulseTrack);

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
          btn.appendChild(codeSpan); btn.appendChild(subSpan);

          var sector = { role: roles[idx], captured: false, tripped: false, el: btn, subEl: subSpan };
          sectors.push(sector);

          btn.addEventListener('click', function () {
            if (inputLocked || phase !== 'cache' || sector.captured || sector.tripped) return;
            if (sector.role === 'target') {
              sector.captured = true; capturedCount += 1;
              btn.classList.remove('is-pulse-target'); btn.classList.add('is-captured');
              subSpan.textContent = 'OK';
              sigCounter.textContent = 'ЦЕЛИ: ' + capturedCount + ' / 4';
              sfx('sfxClick'); haptic('light');
              if (capturedCount >= 4) {
                inputLocked = true;
                if (rafId !== null) { window.cancelAnimationFrame(rafId); rafId = null; }
                sfx('sfxSuccess'); haptic('success');
                addTimer(renderPhase3Restored, 460);
              }
            } else if (sector.role === 'bad') {
              sector.tripped = true; badHits += 1;
              btn.classList.remove('is-pulse-bad'); btn.classList.add('is-tripped');
              subSpan.textContent = 'ERR!';
              errCounter.textContent = 'СБОИ: ' + badHits + ' / 3';
              sfx('sfxAlert'); haptic('error');
              if (badHits > maxBadAllowed) {
                battery = Math.max(0, battery - 4); updateBatteryUI();
                showFailOverlay('АВАРИЙНАЯ БЛОКИРОВКА', 'Три сбоя запустили защитное стирание / блокировку контура.', 'wipe_triggered');
              } else {
                battery = Math.max(1, battery - 2); updateBatteryUI();
              }
            } else {
              btn.classList.add('is-empty-hit'); subSpan.textContent = 'ПУСТО';
              sfx('sfxClick'); haptic('light');
            }
          });
          hexGrid.appendChild(btn);
        })(s);
      }

      screenWrap.appendChild(scanHead);
      screenWrap.appendChild(hexGrid);

      var CYCLE_MS = 2450, PULSE_MS = 720;
      var cycleStart = performance.now() - (CYCLE_MS - 380);
      var wasPulsing = false;

      function tickScanner(now) {
        if (destroyed || phase !== 'cache') return;
        var elapsed = (now - cycleStart) % CYCLE_MS;
        var isPulsing = elapsed < PULSE_MS;
        pulseBar.style.width = isPulsing
          ? Math.round((1 - elapsed / PULSE_MS) * 100) + '%'
          : Math.round(((elapsed - PULSE_MS) / (CYCLE_MS - PULSE_MS)) * 100) + '%';
        pulseBar.classList.toggle('is-firing', isPulsing);

        if (isPulsing !== wasPulsing) {
          wasPulsing = isPulsing;
          for (var j = 0; j < sectors.length; j++) {
            var sec = sectors[j];
            if (sec.captured || sec.tripped) continue;
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

    function renderPhase3Restored() {
      phase = 'restored';
      phaseTagEl.textContent = 'ДАННЫЕ ИЗВЛЕЧЕНЫ';
      footerStatus.textContent = 'ИЗУЧИТЕ ИЗВЛЕЧЁННЫЙ ДАМП И ПЕРЕЙДИТЕ К ВЫВОДУ';
      screenWrap.innerHTML = '';

      var chatWrap = document.createElement('div');
      chatWrap.className = 'mgt-chat-wrap';

      var badge = document.createElement('div');
      badge.className = 'mgt-chat-badge';
      badge.textContent = scenario.hexBadge;

      var chatLog = document.createElement('div');
      chatLog.className = 'mgt-chat-log';
      var lines = scenario.chatLines || [];
      for (var i = 0; i < lines.length; i++) {
        var msg = document.createElement('div');
        msg.className = 'mgt-chat-msg' + (i === lines.length - 1 ? ' is-audio' : '');
        msg.textContent = String(lines[i]);
        chatLog.appendChild(msg);
      }

      var btnNext = document.createElement('button');
      btnNext.type = 'button';
      btnNext.className = 'mg-btn mg-btn-primary';
      btnNext.style.width = '100%';
      btnNext.textContent = scenario.extractBtn || 'ПЕРЕЙТИ К ВЫВОДУ';
      btnNext.addEventListener('click', function () {
        sfx('sfxClick'); haptic('light');
        renderPhase3Deduction();
      });

      chatWrap.appendChild(badge);
      chatWrap.appendChild(chatLog);
      screenWrap.appendChild(chatWrap);
      screenWrap.appendChild(btnNext);
    }

    function renderPhase3Deduction() {
      phase = 'deduce';
      phaseTagEl.textContent = 'ФАЗА 3: ВЫВОД';
      footerStatus.textContent = 'ПОДТВЕРДИТЕ ОПЕРАТИВНЫЙ ВЫВОД ПО ИЗВЛЕЧЁННЫМ ДАННЫМ';
      screenWrap.innerHTML = '';

      var card = document.createElement('div');
      card.className = 'mgt-deduce-card';
      var kicker = document.createElement('div');
      kicker.className = 'mgt-dkicker';
      kicker.textContent = 'ФАЗА 3 // ОПЕРАТИВНЫЙ ВЫВОД';
      card.appendChild(kicker);

      var facts = document.createElement('div');
      facts.className = 'mgt-dfacts';
      for (var fi = 0; fi < scenario.chatLines.length; fi++) {
        var r = document.createElement('div');
        r.textContent = '• ' + scenario.chatLines[fi];
        facts.appendChild(r);
      }
      card.appendChild(facts);

      var q = document.createElement('div');
      q.className = 'mgt-dq';
      q.textContent = scenario.conclusion.question;
      card.appendChild(q);

      var optsEl = document.createElement('div');
      optsEl.className = 'mgt-dopts';
      var fb = document.createElement('div');
      fb.className = 'mgt-dfb';

      var settled = false;
      var deduceFails = 0;
      var opts = scenario.conclusion.options || [];
      for (var oi = 0; oi < opts.length; oi++) {
        (function (opt) {
          var ob = document.createElement('button');
          ob.type = 'button';
          ob.className = 'mgt-dopt';
          ob.textContent = opt.text;
          ob.addEventListener('click', function () {
            if (settled || destroyed) return;
            if (opt.isCorrect) {
              settled = true;
              ob.classList.add('is-correct');
              fb.className = 'mgt-dfb is-ok';
              fb.textContent = opt.reason;
              sfx('sfxStamp'); haptic('success');
              var btnFinish = document.createElement('button');
              btnFinish.type = 'button';
              btnFinish.className = 'mg-btn mg-btn-primary';
              btnFinish.style.width = '100%';
              btnFinish.textContent = scenario.finalBtn || 'ПРИОБЩИТЬ К ДЕЛУ';
              btnFinish.addEventListener('click', function () {
                sfx('sfxSuccess'); haptic('success');
                callbacks.onSuccess({ hacked: true, scenarioId: scenario.id, deduced: opt.id });
              });
              card.appendChild(btnFinish);
            } else {
              deduceFails += 1;
              battery = Math.max(0, battery - 5); updateBatteryUI();
              ob.classList.add('is-wrong');
              fb.className = 'mgt-dfb';
              fb.textContent = opt.reason;
              sfx('sfxAlert'); haptic('error');
              if (deduceFails >= 2 || battery <= 0) {
                settled = true;
                addTimer(function () {
                  showFailOverlay('ВЫВОД ОТКЛОНЁН', 'Заряд исчерпан до фиксации верного протокола.', 'wrong_deduction');
                }, 680);
              }
            }
          });
          optsEl.appendChild(ob);
        })(opts[oi]);
      }

      card.appendChild(optsEl);
      card.appendChild(fb);
      screenWrap.appendChild(card);
    }

    updateBatteryUI();
    renderPhase1Pin();

    return function cleanup() {
      destroyed = true;
      clearAllTimers();
    };
  });

  /* ==========================================================================
     MINIGAME 2: 'audio_clean' (Multi-scenario case409 + case412 + 3-phase)
     ========================================================================== */

  var AU_EXTRA_STYLE_ID = 'minigames-tech-au-extra';

  var AU_EXTRA_CSS =
    '.mgt-au-meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }' +
    '.mgt-au-err { font-family: "IBM Plex Mono", monospace; font-size: 10px; font-weight: 600; color: #9ba0ab; }' +
    '.mgt-au-err.is-warn { color: #f87171; }' +
    '.mgt-ch-bar { flex-shrink: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 5px; }' +
    '.mgt-ch-btn { padding: 6px 4px; background: #14171f; border: 1px solid #2b3140; border-radius: 5px; font-family: "IBM Plex Mono", monospace; font-size: 9.5px; font-weight: 600; color: #8f96a6; text-transform: uppercase; cursor: pointer; }' +
    '.mgt-ch-btn.is-active { background: #1f2533; border-color: var(--case-accent, #c98a2e); color: #f3ece0; }' +
    '.mgt-au-toast { font-family: "IBM Plex Mono", monospace; font-size: 10px; color: #fca5a5; min-height: 14px; line-height: 1.3; }' +
    '.mgt-au-deduce { flex: 1; overflow-y: auto; background: #14171f; border: 1px solid #353b4a; border-top: 3px solid var(--case-accent, #c98a2e); border-radius: 6px; padding: 12px; display: flex; flex-direction: column; gap: 8px; }' +
    '.mgt-au-stamp { align-self: center; padding: 7px 14px; font-family: "Oswald", sans-serif; font-size: 17px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #4ade80; border: 3px double #22c55e; background: rgba(34,197,94,0.12); border-radius: 4px; transform: rotate(-5deg); text-align: center; }';

  function injectAuExtraStyles() {
    if (document.getElementById(AU_EXTRA_STYLE_ID)) return;
    var el = document.createElement('style');
    el.id = AU_EXTRA_STYLE_ID;
    el.textContent = AU_EXTRA_CSS;
    document.head.appendChild(el);
  }

  function resolveAudioScenario(config) {
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

    var hint = String(cfg.title || (storyNode && storyNode.title) || '');

    if (cfg.preset === 'case412' || caseId === 'case412' || nodeId === 'act3_mg_audio' || /люк|труб|насос|стук/i.test(hint)) {
      return {
        id: 'case412_act3_audio',
        audioMode: 'pipe',
        title: cfg.title || 'АУДИОФИЛЬТР // ВОДОПРОВОДНЫЙ ЛЮК',
        fileTag: 'PIPE_HATCH.WAV // 00:18',
        signalTag: '● СТУК ПО ТРУБЕ (3–ПАУЗА–3)',
        scaleMid: '850Hz МЕТАЛЛ',
        lowLabel: 'НЧ-ФИЛЬТР (Гул магистрального насоса)',
        midLabel: 'СЧ-УСИЛЕНИЕ (Резонанс стальной трубы)',
        highLabel: 'ВЧ-ШУМОДАВ (Шип ночного дождя)',
        targets: { low: [68, 84], mid: [58, 74], high: [62, 78] },
        stampWin: 'СИГНАЛ ПОДТВЕРЖДЁН: ОНА ЖИВА',
        channels: [
          {
            id: 'ch_air', label: 'A: ПРОБКА', isTarget: false,
            cleanText: '[КАНАЛ A] Ровные механические щелчки воздушной пробки строго раз в 2.00 сек — бытовая работа насоса.',
            dirtyText: '*#... [ГУЛ НАСОСА] ...щёлк... [ДОЖДЬ] ...щёлк... ровно 2.00с...',
            wrongMsg: 'ЛОЖНЫЙ КАНАЛ (+1): на канале A ровный механический такт воздушной пробки — найдите живой рваный перестук!'
          },
          {
            id: 'ch_pipe', label: 'B: СТОЯК Ø100', isTarget: true,
            cleanText: '[СТОЯК Ø100] «...ТУК-ТУК-ТУК... [пауза 1.2с] ...ТУК-ТУК-тук...» — интервалы рваные, удары металлом по трубе слабеют к концу!',
            dirtyText: '*#... [ГУЛ НАСОСА 50Гц] ...ту*... [ШИП ДОЖДЯ] ...*к-ту*... [ПОМЕХИ]...',
            wrongMsg: ''
          },
          {
            id: 'ch_drain', label: 'C: ЛИВНЕВКА', isTarget: false,
            cleanText: '[КАНАЛ C] Только монотонное журчание дождевой воды по пластиковому жёлобу канавы.',
            dirtyText: '*#... [ДОЖДЬ] ...шум воды в канаве... [СТАТИКА]...',
            wrongMsg: 'ЛОЖНЫЙ КАНАЛ (+1): на канале C обычный шум дождевой ливневки, ударов по металлу нет!'
          }
        ],
        facts: [
          '• Гул магистрального насоса (НЧ) и шип ночного дождя (ВЧ) полностью срезаны',
          '• На стояке Ø100 выделен ритм: три быстрых удара по металлу, пауза, снова три удара',
          '• Интервалы рваные и затухают по силе — физически невозможно для воздушной пробки'
        ],
        conclusion: {
          question: 'В очищенной записи из люка слышен рваный слабеющий тройной перестук металлом по водопроводной магистрали. Вывод:',
          options: [
            { id: 'air_lock', text: 'Это обычная воздушная пробка в трубах после включения насоса.', isCorrect: false, reason: 'Противоречие: воздушная пробка бьёт равномерно, а здесь живой ритм «3–пауза–3» с разной силой.' },
            { id: 'alina_alive', text: 'Алина жива и бьёт металлом по водопроводному стояку из подземного помещения, подключённого к этой магистрали!', isCorrect: true, reason: 'Верно: нужно срочно проверить схему врезок водопровода и счётчики на Садовой!' },
            { id: 'rain_echo', text: 'Эхо капель дождя по железной крышке люка создало иллюзию стука.', isCorrect: false, reason: 'Противоречие: шум дождя отфильтрован на ВЧ, а резонанс идёт из глубины стальной трубы.' }
          ]
        }
      };
    }

    if (cfg.preset === 'case409' || caseId === 'case409' || nodeId === 'act3_audio_game') {
      return {
        id: 'case409_act3_audio',
        audioMode: 'radio',
        title: cfg.title || 'АКУСТИЧЕСКАЯ ОЧИСТКА // ДЕЛО №409',
        fileTag: 'AUDIO_2221.RAW // 00:12',
        signalTag: '● СИГНАЛ РАЦИИ МВД',
        scaleMid: '1.2kHz ГОЛОС',
        lowLabel: 'НЧ-ФИЛЬТР (Грохот ветки)',
        midLabel: 'СЧ-УСИЛЕНИЕ (Голосовой канал)',
        highLabel: 'ВЧ-ШУМОДАВ (Ветер / статика)',
        targets: {
          low: (cfg.targets && cfg.targets.low) || [72, 88],
          mid: (cfg.targets && cfg.targets.mid) || [56, 72],
          high: (cfg.targets && cfg.targets.high) || [64, 80]
        },
        stampWin: 'ПОЗЫВНОЙ «БОРТ-4» ПОДТВЕРЖДЁН',
        channels: [
          {
            id: 'ch_train', label: 'A: 22:14', isTarget: false,
            cleanText: '[22:14] Глухое шуршание подкладки куртки и объявление остановки электрички. Посторонних голосов нет.',
            dirtyText: '*#... [ШУРШАНИЕ КАРМАНА] ...остановка... [ПОМЕХИ]...',
            wrongMsg: 'ЛОЖНЫЙ КАНАЛ (+1): это ранняя фоновая запись в 22:14 из электрички — ищите момент нападения в 22:21!'
          },
          {
            id: 'ch_attack', label: 'B: 22:21', isTarget: true,
            cleanText: cfg.transcript || '«...куда ты свернул? Переезд же в другую сторону... открой дверь, пусти!.. [РЕЗКИЙ ПИСК РАЦИИ МВД: "Борт-4, приём..."] — Заткнись. Всё тихо.»',
            dirtyText: '*#... [ГРОХОТ ТОВАРНЯКА] ...куда т*... [ШУМ ВЕТРА] ...**... [ПОМЕХИ]...',
            wrongMsg: ''
          },
          {
            id: 'ch_freight', label: 'C: 22:26', isTarget: false,
            cleanText: '[22:26] После разбития телефона микрофон уловил лишь удаляющийся грохот товарного состава №2104.',
            dirtyText: '*#... [ТОВАРНЯК №2104] ...стук колёс... [ОБРЫВ]...',
            wrongMsg: 'ЛОЖНЫЙ КАНАЛ (+1): в 22:26 телефон уже лежал разбитым в канаве — слышен только товарняк.'
          }
        ],
        facts: [
          '• Выделена запись 22:21 из кармана Алины; грохот товарняка и ветер отфильтрованы',
          '• Отчётливо слышна мольба Алины открыть дверь машины на повороте к старой ветке',
          '• В салоне сработала служебная рация МВД с вызовом «Борт-4, приём...»'
        ],
        conclusion: {
          question: 'На очищенной записи 22:21 в момент нападения в салоне авто звучит служебная рация МВД («Борт-4, приём...»). Вывод:',
          options: [
            { id: 'passing_pps', text: 'Рация доносилась с улицы от проезжавшего мимо патруля, а в машине был Громов.', isCorrect: false, reason: 'Противоречие: писк рации записан вплотную внутри закрытого салона, и «Борт-4» — позывной координатора, а не ППС.' },
            { id: 'krasnov_bort4', text: 'Убийца вёз Алину на своей машине с включённой ведомственной рацией позывного «Борт-4» (координатор Краснов).', isCorrect: true, reason: 'Верно: позывной «Борт-4» на записи 22:21 — прямая улика против координатора опергруппы.' },
            { id: 'radio_music', text: 'Это реплика из детективного сериала по обычному FM-радио.', isCorrect: false, reason: 'Противоречие: зафиксирован характерный двухтоновый тональный писк цифровой служебной рации МВД.' }
          ]
        }
      };
    }

    return {
      id: 'generic_audio_clean',
      audioMode: 'radio',
      title: cfg.title || 'АКУСТИЧЕСКАЯ ОЧИСТКА ЗАПИСИ',
      fileTag: 'AUDIO_REC.RAW',
      signalTag: '● ЦЕЛЕВОЙ СИГНАЛ',
      scaleMid: '1.2kHz ГОЛОС',
      lowLabel: 'НЧ-ФИЛЬТР (Низкочастотный гул)',
      midLabel: 'СЧ-УСИЛЕНИЕ (Целевой канал)',
      highLabel: 'ВЧ-ШУМОДАВ (Высокочастотный шум)',
      targets: { low: [70, 86], mid: [56, 72], high: [64, 80] },
      stampWin: 'ЗАПИСЬ ОЧИЩЕНА И ПОДТВЕРЖДЕНА',
      channels: [
        { id: 'g_a', label: 'КАНАЛ A', isTarget: false, cleanText: '[КАНАЛ A] Фоновая запись без информативных сигналов.', dirtyText: '*#... [ФОН] ...*#...', wrongMsg: 'ЛОЖНЫЙ КАНАЛ (+1): на канале A только бытовой фон.' },
        { id: 'g_b', label: 'КАНАЛ B', isTarget: true, cleanText: cfg.transcript || 'Целевой голосовой и сигнальный фрагмент успешно очищен от помех.', dirtyText: '*#... [ШУМ] ...фрагм*... [ПОМЕХИ]...', wrongMsg: '' },
        { id: 'g_c', label: 'КАНАЛ C', isTarget: false, cleanText: '[КАНАЛ C] Пустой статический шум после обрыва записи.', dirtyText: '*#... [СТАТИКА] ...*#...', wrongMsg: 'ЛОЖНЫЙ КАНАЛ (+1): канал C содержит только статический шум.' }
      ],
      facts: ['• Целевой канал выделен среди фоновых записей', '• НЧ- и ВЧ-помехи подавлены (>92% чистоты)', '• Авторасшифровка подтверждена'],
      conclusion: cfg.conclusion || {
        question: 'Аудиозапись очищена до >92% чистоты. Подтвердите заключение:',
        options: [
          { id: 'noise', text: 'На записи только неразборчивый шум.', isCorrect: false, reason: 'Противоречие: сигнал очищен выше 92%.' },
          { id: 'ok', text: 'Очищенная фонограмма пригодна для приобщения к материалам дела.', isCorrect: true, reason: 'Верно: фоноскопическая экспертиза завершена.' },
          { id: 'wrong', text: 'Нужно приобщить пустой канал C.', isCorrect: false, reason: 'Противоречие: полезный сигнал находится на канале B.' }
        ]
      }
    };
  }

  function createNoiseBuffer(audioCtx, seconds, pink) {
    var sr = audioCtx.sampleRate || 44100;
    var len = Math.floor(sr * seconds);
    var buf = audioCtx.createBuffer(1, len, sr);
    var data = buf.getChannelData(0);
    if (!pink) {
      for (var i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    } else {
      var b0 = 0, b1 = 0, b2 = 0;
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


  window.GameMinigames.register('audio_clean', function (containerEl, config, callbacks) {
    injectTechStyles();
    injectAuExtraStyles();

    var cfg = config || {};
    var scenario = resolveAudioScenario(cfg);
    var targets = scenario.targets;
    var targetLow = targets.low;
    var targetMid = targets.mid;
    var targetHigh = targets.high;
    var maxErrors = typeof cfg.maxErrors === 'number' && cfg.maxErrors > 0 ? cfg.maxErrors : 4;

    var channels = scenario.channels;
    var activeChIdx = 0; // Starts on Channel A (decoy!) so player actively inspects & selects right track
    var values = { low: 18, mid: 16, high: 20 };
    var clarityPct = 0;
    var isCleanLocked = false;
    var errorsCount = 0;
    var phase = 'clean'; // 'clean' | 'deduce' | 'fail'
    var destroyed = false;
    var signalPulseAlpha = 0;
    var lastPulseTime = performance.now() - 1200;
    var timers = [];

    function addTimer(fn, delay) {
      var id = window.setTimeout(function () {
        var idx = timers.indexOf(id);
        if (idx !== -1) timers.splice(idx, 1);
        if (!destroyed) fn();
      }, delay);
      timers.push(id);
      return id;
    }

    function clearTimers() {
      for (var i = 0; i < timers.length; i++) window.clearTimeout(timers[i]);
      timers = [];
    }

    // Precompute deterministic scramble tables for each channel
    var noiseChars = '*#~%^░▒/';
    var chCharMeta = channels.map(function (ch, idx) {
      var r = createPrng(40988 + idx * 131);
      var txt = String(ch.cleanText || '');
      var list = [];
      for (var ci = 0; ci < txt.length; ci++) {
        var c = txt.charAt(ci);
        var isPunct = /[\s.,!?:;«»"—\-()\[\]]/.test(c);
        list.push({
          ch: c,
          keep: c === ' ' || c === '\n',
          thresh: isPunct ? 0 : (0.16 + r() * 0.75),
          noise: noiseChars.charAt(Math.floor(r() * noiseChars.length))
        });
      }
      return list;
    });

    // Procedural Web Audio engine (supports both MVD radio chirp & metallic pipe 3-knock!)
    var audioEngine = {
      ctx: null, masterGain: null, lowGain: null, highGain: null, midGain: null, pulseBus: null,
      nodesToStop: [], allNodes: [], started: false, closed: false
    };

    function initLocalAudio() {
      if (audioEngine.started || audioEngine.closed || destroyed) return;
      try {
        var AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        var aCtx = new AudioCtx();
        var now = aCtx.currentTime;

        var comp = aCtx.createDynamicsCompressor();
        comp.threshold.setValueAtTime(-16, now);
        comp.ratio.setValueAtTime(5, now);

        var masterGain = aCtx.createGain();
        masterGain.gain.setValueAtTime(isGameAudioMuted() ? 0 : 0.7, now);
        comp.connect(masterGain);
        masterGain.connect(aCtx.destination);

        var whiteBuf = createNoiseBuffer(aCtx, 2.0, false);
        var pinkBuf = createNoiseBuffer(aCtx, 2.5, true);

        // Low hum (train rumble OR water main pump hum)
        var lowGain = aCtx.createGain();
        lowGain.gain.setValueAtTime(0.30, now);
        var lowLp = aCtx.createBiquadFilter();
        lowLp.type = 'lowpass';
        lowLp.frequency.setValueAtTime(scenario.audioMode === 'pipe' ? 145 : 195, now);
        var lowOsc = aCtx.createOscillator();
        lowOsc.type = scenario.audioMode === 'pipe' ? 'sine' : 'sawtooth';
        lowOsc.frequency.setValueAtTime(scenario.audioMode === 'pipe' ? 50 : 54, now);
        var lowNoise = aCtx.createBufferSource();
        lowNoise.buffer = pinkBuf; lowNoise.loop = true;

        lowOsc.connect(lowLp); lowNoise.connect(lowLp);
        lowLp.connect(lowGain); lowGain.connect(comp);

        // High hiss (wind OR night rain)
        var highGain = aCtx.createGain();
        highGain.gain.setValueAtTime(0.22, now);
        var highNoise = aCtx.createBufferSource();
        highNoise.buffer = whiteBuf; highNoise.loop = true;
        var highBp = aCtx.createBiquadFilter();
        highBp.type = 'bandpass';
        highBp.frequency.setValueAtTime(scenario.audioMode === 'pipe' ? 3400 : 2750, now);
        highBp.Q.setValueAtTime(2.0, now);
        highNoise.connect(highBp); highBp.connect(highGain); highGain.connect(comp);

        // Mid band presence
        var midGain = aCtx.createGain();
        midGain.gain.setValueAtTime(0.02, now);
        var midNoise = aCtx.createBufferSource();
        midNoise.buffer = pinkBuf; midNoise.loop = true;
        var midBp = aCtx.createBiquadFilter();
        midBp.type = 'bandpass'; midBp.frequency.setValueAtTime(980, now); midBp.Q.setValueAtTime(3.0, now);
        midNoise.connect(midBp); midBp.connect(midGain); midGain.connect(comp);

        var pulseBus = aCtx.createGain();
        pulseBus.gain.setValueAtTime(1.0, now);
        pulseBus.connect(comp);

        lowOsc.start(now); lowNoise.start(now); highNoise.start(now); midNoise.start(now);

        audioEngine.ctx = aCtx;
        audioEngine.masterGain = masterGain;
        audioEngine.lowGain = lowGain;
        audioEngine.highGain = highGain;
        audioEngine.midGain = midGain;
        audioEngine.pulseBus = pulseBus;
        audioEngine.nodesToStop = [lowOsc, lowNoise, highNoise, midNoise];
        audioEngine.allNodes = [lowOsc, lowNoise, lowLp, lowGain, highNoise, highBp, highGain, midNoise, midBp, midGain, pulseBus, comp, masterGain];
        audioEngine.started = true;
        if (aCtx.state === 'suspended') { var p = aCtx.resume(); if (p && p.catch) p.catch(function () {}); }
      } catch (e) {}
    }

    function resumeLocalAudio() {
      if (!audioEngine.started && !audioEngine.closed) initLocalAudio();
      try {
        if (audioEngine.ctx && audioEngine.ctx.state === 'suspended') {
          var p = audioEngine.ctx.resume(); if (p && p.catch) p.catch(function () {});
        }
      } catch (e) {}
    }

    function playTargetCue(clarityNorm) {
      if (destroyed || audioEngine.closed || isGameAudioMuted()) return;
      if (!audioEngine.ctx || !audioEngine.pulseBus || clarityNorm < 0.22) return;
      if (!channels[activeChIdx] || !channels[activeChIdx].isTarget) return;
      try {
        var aCtx = audioEngine.ctx;
        if (aCtx.state !== 'running') return;
        var now = aCtx.currentTime;
        var vol = Math.min(0.24, clarityNorm * clarityNorm * 0.24);

        if (scenario.audioMode === 'pipe') {
          // 3 metallic pipe knocks (t=0, 0.19s, 0.40s — fading on 3rd strike)
          var offsets = [0, 0.19, 0.41];
          var gains = [1.0, 0.88, 0.62];
          for (var k = 0; k < offsets.length; k++) {
            var st = now + offsets[k];
            var oscP = aCtx.createOscillator();
            oscP.type = 'triangle';
            oscP.frequency.setValueAtTime(760 - k * 25, st);
            oscP.frequency.exponentialRampToValueAtTime(340, st + 0.085);
            var envP = aCtx.createGain();
            envP.gain.setValueAtTime(0.0001, st);
            envP.gain.linearRampToValueAtTime(vol * gains[k], st + 0.006);
            envP.gain.exponentialRampToValueAtTime(0.0001, st + 0.095);
            oscP.connect(envP); envP.connect(audioEngine.pulseBus);
            oscP.start(st); oscP.stop(st + 0.105);
          }
        } else {
          // 2-tone MVD radio chirp
          var osc = aCtx.createOscillator();
          osc.type = 'square';
          osc.frequency.setValueAtTime(1340, now);
          osc.frequency.setValueAtTime(985, now + 0.048);
          var bp = aCtx.createBiquadFilter();
          bp.type = 'bandpass'; bp.frequency.setValueAtTime(1320, now); bp.Q.setValueAtTime(2.2, now);
          var env = aCtx.createGain();
          env.gain.setValueAtTime(0.0001, now);
          env.gain.linearRampToValueAtTime(vol, now + 0.008);
          env.gain.setValueAtTime(vol * 0.85, now + 0.088);
          env.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);
          osc.connect(bp); bp.connect(env); env.connect(audioEngine.pulseBus);
          osc.start(now); osc.stop(now + 0.12);
        }
      } catch (e) {}
    }

    function stopLocalAudio() {
      if (audioEngine.closed) return;
      audioEngine.closed = true;
      try {
        if (audioEngine.ctx && audioEngine.masterGain) {
          audioEngine.masterGain.gain.setValueAtTime(0, audioEngine.ctx.currentTime);
        }
      } catch (e) {}
      for (var i = 0; i < audioEngine.nodesToStop.length; i++) { try { audioEngine.nodesToStop[i].stop(); } catch (e) {} }
      for (var j = 0; j < audioEngine.allNodes.length; j++) { try { audioEngine.allNodes[j].disconnect(); } catch (e) {} }
      if (audioEngine.ctx && typeof audioEngine.ctx.close === 'function') {
        try { var cp = audioEngine.ctx.close(); if (cp && cp.catch) cp.catch(function () {}); } catch (e) {}
      }
      audioEngine.ctx = null; audioEngine.nodesToStop = []; audioEngine.allNodes = [];
    }

    function calcBandAccuracy(val, range) {
      if (val >= range[0] && val <= range[1]) return 1.0;
      var dist = val < range[0] ? range[0] - val : val - range[1];
      return Math.max(0, 1 - dist / 58);
    }

    function calcCenterPrecision(val, range) {
      var mid = (range[0] + range[1]) * 0.5;
      var half = Math.max(1, (range[1] - range[0]) * 0.5);
      return 1 - Math.min(1, Math.abs(val - mid) / half);
    }

    // Build Shell DOM
    var wrap = document.createElement('div');
    wrap.className = 'mg-wrap';

    var header = document.createElement('div');
    header.className = 'mg-header';

    var headInfo = document.createElement('div');
    headInfo.className = 'mg-header-info';

    var titleEl = document.createElement('div');
    titleEl.className = 'mg-header-title';
    titleEl.textContent = scenario.title;

    var metaRow = document.createElement('div');
    metaRow.className = 'mgt-au-meta';
    var counterEl = document.createElement('span');
    counterEl.className = 'mg-counter';
    var errEl = document.createElement('span');
    errEl.className = 'mgt-au-err';
    metaRow.appendChild(counterEl);
    metaRow.appendChild(errEl);
    headInfo.appendChild(titleEl);
    headInfo.appendChild(metaRow);

    var btnBack = document.createElement('button');
    btnBack.type = 'button';
    btnBack.className = 'mg-btn mg-btn-cancel';
    btnBack.textContent = 'НАЗАД';
    btnBack.addEventListener('click', function () {
      stopLocalAudio();
      sfx('sfxClick'); haptic('light');
      callbacks.onCancel();
    });

    header.appendChild(headInfo);
    header.appendChild(btnBack);

    var body = document.createElement('div');
    body.className = 'mg-body';

    var layout = document.createElement('div');
    layout.className = 'mgt-audio-layout';

    // Channel selector bar (3 tracks: 2 decoys + 1 target)
    var chBar = document.createElement('div');
    chBar.className = 'mgt-ch-bar';
    var chBtns = [];
    for (var ci = 0; ci < channels.length; ci++) {
      (function (idx, chObj) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'mgt-ch-btn' + (idx === activeChIdx ? ' is-active' : '');
        b.textContent = chObj.label;
        b.addEventListener('click', function () {
          if (phase !== 'clean' || activeChIdx === idx) return;
          resumeLocalAudio();
          activeChIdx = idx;
          for (var j = 0; j < chBtns.length; j++) chBtns[j].classList.toggle('is-active', j === activeChIdx);
          toastEl.textContent = '';
          sfx('sfxClick'); haptic('light');
          evaluateFilters();
        });
        chBar.appendChild(b);
        chBtns.push(b);
      })(ci, channels[ci]);
    }

    var specBox = document.createElement('div');
    specBox.className = 'mgt-spec-box';
    var canvas = document.createElement('canvas');
    canvas.className = 'mg-canvas';
    specBox.appendChild(canvas);

    var mixer = document.createElement('div');
    mixer.className = 'mgt-mixer';
    var sliderConfigs = [
      { key: 'low', label: scenario.lowLabel, target: targetLow },
      { key: 'mid', label: scenario.midLabel, target: targetMid },
      { key: 'high', label: scenario.highLabel, target: targetHigh }
    ];
    var sliderRefs = {};

    for (var si = 0; si < sliderConfigs.length; si++) {
      (function (sc) {
        var row = document.createElement('div');
        row.className = 'mgt-slider-row';
        var head = document.createElement('div');
        head.className = 'mgt-slider-head';
        var lbl = document.createElement('span');
        lbl.textContent = sc.label;
        var right = document.createElement('span');
        right.className = 'mgt-slider-right';
        var led = document.createElement('span');
        led.className = 'mgt-led';
        var valEl = document.createElement('span');
        valEl.className = 'mgt-slider-val';
        valEl.textContent = String(values[sc.key]);
        right.appendChild(led); right.appendChild(valEl);
        head.appendChild(lbl); head.appendChild(right);

        var range = document.createElement('input');
        range.type = 'range'; range.className = 'mgt-range';
        range.min = '0'; range.max = '100'; range.step = '1';
        range.value = String(values[sc.key]);
        range.addEventListener('pointerdown', resumeLocalAudio);
        range.addEventListener('input', function () {
          if (phase !== 'clean') return;
          resumeLocalAudio();
          values[sc.key] = Number(range.value) || 0;
          valEl.textContent = String(values[sc.key]);
          toastEl.textContent = '';
          evaluateFilters();
        });

        row.appendChild(head); row.appendChild(range);
        mixer.appendChild(row);
        sliderRefs[sc.key] = { led: led, valEl: valEl, range: range };
      })(sliderConfigs[si]);
    }

    var transcriptCard = document.createElement('div');
    transcriptCard.className = 'mgt-transcript-card';
    var clarityHead = document.createElement('div');
    clarityHead.className = 'mgt-clarity-head';
    var transLabel = document.createElement('span');
    transLabel.textContent = 'АВТОРАСШИФРОВКА ДОРОЖКИ';
    var clarityValEl = document.createElement('span');
    clarityValEl.className = 'mgt-clarity-val';
    clarityHead.appendChild(transLabel); clarityHead.appendChild(clarityValEl);

    var transcriptTextEl = document.createElement('div');
    transcriptTextEl.className = 'mgt-transcript-text';
    var toastEl = document.createElement('div');
    toastEl.className = 'mgt-au-toast';

    transcriptCard.appendChild(clarityHead);
    transcriptCard.appendChild(transcriptTextEl);
    transcriptCard.appendChild(toastEl);

    layout.appendChild(chBar);
    layout.appendChild(specBox);
    layout.appendChild(mixer);
    layout.appendChild(transcriptCard);
    body.appendChild(layout);

    var footer = document.createElement('div');
    footer.className = 'mg-footer';
    var btnConfirm = document.createElement('button');
    btnConfirm.type = 'button';
    btnConfirm.className = 'mg-btn mg-btn-primary mgt-confirm-btn';
    btnConfirm.textContent = 'ЗАФИКСИРОВАТЬ ВЫБРАННУЮ ЗАПИСЬ';
    btnConfirm.disabled = true;
    footer.appendChild(btnConfirm);

    wrap.appendChild(header);
    wrap.appendChild(body);
    wrap.appendChild(footer);
    containerEl.appendChild(wrap);

    var bandAcc = { low: 0, mid: 0, high: 0 };

    function syncErrHeader() {
      errEl.textContent = 'ОШИБКИ: ' + errorsCount + ' / ' + maxErrors;
      errEl.classList.toggle('is-warn', errorsCount >= maxErrors - 1);
    }

    function showFailOverlay(reason, msg) {
      phase = 'fail';
      stopLocalAudio();
      footer.classList.add('hidden');
      layout.innerHTML = '';
      var ov = document.createElement('div');
      ov.className = 'mgt-fail-overlay';
      ov.innerHTML = '<div class="mgt-fail-card"><div class="mgt-fail-title">ЭКСПЕРТИЗА ПРОВАЛЕНА</div><div class="mgt-fail-desc"></div></div>';
      ov.querySelector('.mgt-fail-desc').textContent = msg || 'Превышен лимит ошибок фоноскопического анализа.';
      layout.appendChild(ov);
      addTimer(function () {
        callbacks.onFail({ reason: reason, errors: errorsCount, scenarioId: scenario.id });
      }, 950);
    }

    function openPhase3Deduction() {
      phase = 'deduce';
      stopLocalAudio();
      counterEl.textContent = 'ФАЗА 3 // ФОНОСКОПИЯ';
      footer.classList.add('hidden');
      layout.innerHTML = '';

      var card = document.createElement('div');
      card.className = 'mgt-au-deduce';

      var kicker = document.createElement('div');
      kicker.className = 'mgt-dkicker';
      kicker.textContent = 'ФАЗА 3 // ФОНОСКОПИЧЕСКИЙ ВЫВОД';
      card.appendChild(kicker);

      var facts = document.createElement('div');
      facts.className = 'mgt-dfacts';
      for (var fi = 0; fi < scenario.facts.length; fi++) {
        var r = document.createElement('div');
        r.textContent = scenario.facts[fi];
        facts.appendChild(r);
      }
      card.appendChild(facts);

      var q = document.createElement('div');
      q.className = 'mgt-dq';
      q.textContent = scenario.conclusion.question;
      card.appendChild(q);

      var optsEl = document.createElement('div');
      optsEl.className = 'mgt-dopts';
      var fb = document.createElement('div');
      fb.className = 'mgt-dfb';

      var settled = false;
      var opts = scenario.conclusion.options || [];
      for (var oi = 0; oi < opts.length; oi++) {
        (function (opt) {
          var ob = document.createElement('button');
          ob.type = 'button';
          ob.className = 'mgt-dopt';
          ob.textContent = opt.text;
          ob.addEventListener('click', function () {
            if (settled || destroyed) return;
            if (opt.isCorrect) {
              settled = true;
              ob.classList.add('is-correct');
              fb.className = 'mgt-dfb is-ok';
              fb.textContent = opt.reason;
              sfx('sfxStamp'); haptic('success');
              addTimer(function () {
                card.innerHTML = '';
                var st = document.createElement('div');
                st.className = 'mgt-au-stamp';
                st.textContent = scenario.stampWin;
                var btnDone = document.createElement('button');
                btnDone.type = 'button';
                btnDone.className = 'mg-btn mg-btn-primary';
                btnDone.style.width = '100%';
                btnDone.textContent = 'ПРИОБЩИТЬ ФОНОГРАММУ К ДЕЛУ';
                btnDone.addEventListener('click', function () {
                  sfx('sfxSuccess'); haptic('success');
                  callbacks.onSuccess({
                    cleaned: true,
                    scenarioId: scenario.id,
                    errors: errorsCount,
                    deduced: opt.id
                  });
                });
                card.style.justifyContent = 'center';
                card.style.gap = '16px';
                card.appendChild(st);
                card.appendChild(btnDone);
              }, 550);
            } else {
              errorsCount += 1;
              syncErrHeader();
              ob.classList.add('is-wrong');
              fb.className = 'mgt-dfb';
              fb.textContent = opt.reason;
              sfx('sfxAlert'); haptic('error');
              if (errorsCount >= maxErrors) {
                settled = true;
                addTimer(function () {
                  showFailOverlay('wrong_deduction', 'Превышен лимит ошибок — фоноскопический вывод отклонён.');
                }, 680);
              }
            }
          });
          optsEl.appendChild(ob);
        })(opts[oi]);
      }

      card.appendChild(optsEl);
      card.appendChild(fb);
      layout.appendChild(card);
    }

    btnConfirm.addEventListener('click', function () {
      if (phase !== 'clean' || !isCleanLocked || destroyed) return;
      var ch = channels[activeChIdx];
      if (!ch.isTarget) {
        errorsCount += 1;
        syncErrHeader();
        sfx('sfxAlert'); haptic('error');
        toastEl.textContent = ch.wrongMsg || 'ЛОЖНЫЙ КАНАЛ (+1 ОШИБКА): проверьте другую звуковую дорожку!';
        if (errorsCount >= maxErrors) {
          addTimer(function () {
            showFailOverlay('wrong_channel', toastEl.textContent);
          }, 620);
        }
        return;
      }

      sfx('sfxSuccess'); haptic('success');
      openPhase3Deduction();
    });

    function buildScrambledTranscript(pct) {
      var ch = channels[activeChIdx];
      if (pct >= 92) return ch.cleanText;
      if (pct < 20) return ch.dirtyText;
      var meta = chCharMeta[activeChIdx] || [];
      var norm = pct / 100, out = '';
      for (var i = 0; i < meta.length; i++) {
        out += (meta[i].keep || norm >= meta[i].thresh) ? meta[i].ch : meta[i].noise;
      }
      return out;
    }

    function syncLocalAudioGains() {
      if (!audioEngine.started || audioEngine.closed || !audioEngine.ctx) return;
      try {
        var now = audioEngine.ctx.currentTime;
        audioEngine.masterGain.gain.setTargetAtTime(isGameAudioMuted() ? 0 : 0.7, now, 0.04);
        audioEngine.lowGain.gain.setTargetAtTime(0.014 + Math.pow(1 - bandAcc.low, 1.45) * 0.34, now, 0.05);
        audioEngine.highGain.gain.setTargetAtTime(0.008 + Math.pow(1 - bandAcc.high, 1.45) * 0.24, now, 0.05);
        audioEngine.midGain.gain.setTargetAtTime(0.01 + bandAcc.mid * 0.08, now, 0.05);
      } catch (e) {}
    }

    function evaluateFilters() {
      bandAcc.low = calcBandAccuracy(values.low, targetLow);
      bandAcc.mid = calcBandAccuracy(values.mid, targetMid);
      bandAcc.high = calcBandAccuracy(values.high, targetHigh);

      var keys = ['low', 'mid', 'high'];
      for (var i = 0; i < keys.length; i++) {
        var acc = bandAcc[keys[i]];
        var led = sliderRefs[keys[i]].led;
        led.classList.remove('is-near', 'is-lock');
        if (acc >= 1) led.classList.add('is-lock');
        else if (acc >= 0.72) led.classList.add('is-near');
      }

      var allLocked = bandAcc.low >= 1 && bandAcc.mid >= 1 && bandAcc.high >= 1;
      if (allLocked) {
        var prec = (calcCenterPrecision(values.low, targetLow) + calcCenterPrecision(values.mid, targetMid) + calcCenterPrecision(values.high, targetHigh)) / 3;
        clarityPct = Math.min(100, Math.round(93 + prec * 7));
      } else {
        clarityPct = Math.min(89, Math.round(((bandAcc.low + bandAcc.mid + bandAcc.high) / 3) * 90));
      }

      var wasClean = isCleanLocked;
      isCleanLocked = clarityPct >= 92 && allLocked;

      counterEl.textContent = 'ЧИСТОТА: ' + clarityPct + '%';
      counterEl.style.color = isCleanLocked ? '#6ec4a0' : '#c98a2e';
      clarityValEl.textContent = 'ЧИСТОТА: ' + clarityPct + '%';
      clarityValEl.classList.toggle('is-clean', isCleanLocked);
      transcriptCard.classList.toggle('is-clean', isCleanLocked);
      transcriptTextEl.textContent = buildScrambledTranscript(clarityPct);
      btnConfirm.disabled = !isCleanLocked;

      if (isCleanLocked && !wasClean) { haptic('success'); sfx('sfxSuccess'); }
      syncLocalAudioGains();
    }

    // Canvas Spectrogram & Oscillogram
    var ctx = canvas.getContext('2d');
    var cssW = 320, cssH = 112, dpr = 1, rafId = null, resizeObserver = null;
    var BAR_COUNT = 28, barLevels = [];
    for (var b = 0; b < BAR_COUNT; b++) barLevels.push(0.15);

    function resizeCanvas() {
      if (destroyed) return;
      var rect = specBox.getBoundingClientRect();
      cssW = Math.max(160, Math.floor(rect.width));
      cssH = Math.max(84, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      var pw = Math.floor(cssW * dpr), ph = Math.floor(cssH * dpr);
      if (canvas.width !== pw || canvas.height !== ph) { canvas.width = pw; canvas.height = ph; }
    }

    if (typeof window.ResizeObserver === 'function') {
      resizeObserver = new window.ResizeObserver(resizeCanvas);
      resizeObserver.observe(specBox);
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    syncErrHeader();
    initLocalAudio();
    evaluateFilters();

    function renderSpectrogram(now) {
      if (destroyed) return;
      if (phase === 'clean') {
        var t = now * 0.001;
        var clarityNorm = clarityPct / 100;
        var onTargetTrack = Boolean(channels[activeChIdx] && channels[activeChIdx].isTarget);

        syncLocalAudioGains();
        if (now - lastPulseTime >= 2400) {
          lastPulseTime = now;
          if (clarityNorm >= 0.25 && onTargetTrack) {
            signalPulseAlpha = Math.min(1, 0.35 + clarityNorm * 0.65);
            playTargetCue(clarityNorm);
          }
        }
        signalPulseAlpha = Math.max(0, signalPulseAlpha - 0.032);

        var lowNoise = 1 - bandAcc.low, midPower = bandAcc.mid, highNoise = 1 - bandAcc.high;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.fillStyle = '#080a0d'; ctx.fillRect(0, 0, cssW, cssH);

        var splitY = Math.floor(cssH * 0.48);
        ctx.strokeStyle = 'rgba(63, 106, 88, 0.16)'; ctx.lineWidth = 1;
        for (var gx = 0; gx < cssW; gx += 28) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, cssH); ctx.stroke(); }
        ctx.beginPath(); ctx.moveTo(0, splitY); ctx.lineTo(cssW, splitY); ctx.stroke();

        // Oscillogram
        var waveMidY = splitY * 0.5, maxAmp = splitY * 0.42;
        ctx.beginPath();
        for (var s = 0; s <= 96; s++) {
          var frac = s / 96, x = frac * cssW;
          var wLow = Math.sin(frac * 14 + t * 13) * lowNoise * 0.72;
          var wHigh = Math.sin(frac * 85 + t * 44) * Math.cos(frac * 49 - t * 31) * highNoise * 0.48;
          var env = Math.sin(frac * Math.PI);
          var wMid = Math.sin(frac * 28 + t * 18) * env * (0.16 + midPower * 0.44);
          var burst = signalPulseAlpha > 0.05 ? Math.sin(frac * 110 + t * 70) * signalPulseAlpha * 0.58 * env : 0;
          var y = waveMidY + Math.max(-1, Math.min(1, wLow + wHigh + wMid + burst)) * maxAmp;
          if (s === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = isCleanLocked ? '#6ec4a0' : signalPulseAlpha > 0.3 ? '#eab354' : '#c98a2e';
        ctx.lineWidth = 1.65; ctx.stroke();

        // Spectrum bars
        var specTop = splitY + 4, specH = cssH - specTop - 13, barGap = 2;
        var barW = (cssW - 12 - (BAR_COUNT - 1) * barGap) / BAR_COUNT;
        for (var i = 0; i < BAR_COUNT; i++) {
          var bp = i / (BAR_COUNT - 1), tgt = 0.08;
          if (bp < 0.33) tgt = 0.08 + lowNoise * 0.85 * (0.7 + 0.3 * Math.sin(t * 14 + i * 0.5));
          else if (bp < 0.67) {
            tgt = 0.1 + (0.2 + midPower * 0.62) * (0.62 + 0.38 * Math.sin(t * 11 + i * 1.4));
            if (signalPulseAlpha > 0.05 && Math.abs(bp - 0.54) < 0.1) tgt = Math.min(1, tgt + signalPulseAlpha * 0.72);
          } else tgt = 0.06 + highNoise * 0.84 * (0.55 + 0.45 * Math.abs(Math.sin(t * 29 + i * 2.7)));
          barLevels[i] += (Math.min(1, tgt) - barLevels[i]) * 0.24;
          var bh = Math.max(2, barLevels[i] * specH);
          ctx.fillStyle = bp < 0.33 ? (lowNoise > 0.25 ? '#b91c1c' : '#5ea385')
            : bp < 0.67 ? (signalPulseAlpha > 0.25 && Math.abs(bp - 0.54) < 0.1 ? '#ef4444' : midPower >= 1 ? '#5ea385' : '#c98a2e')
            : (highNoise > 0.25 ? '#c98a2e' : '#5ea385');
          ctx.fillRect(6 + i * (barW + barGap), specTop + specH - bh, barW, bh);
        }

        ctx.font = '600 8.5px "IBM Plex Mono", monospace';
        ctx.textBaseline = 'bottom'; ctx.fillStyle = '#6f7685';
        ctx.textAlign = 'left'; ctx.fillText('60Hz НЧ', 6, cssH - 2);
        ctx.textAlign = 'center'; ctx.fillText(scenario.scaleMid, cssW * 0.5, cssH - 2);
        ctx.textAlign = 'right'; ctx.fillText('6kHz ВЧ', cssW - 6, cssH - 2);

        ctx.textBaseline = 'top';
        if (signalPulseAlpha > 0.2 && onTargetTrack) {
          ctx.fillStyle = 'rgba(239, 68, 68, ' + signalPulseAlpha.toFixed(2) + ')';
          ctx.textAlign = 'right'; ctx.fillText(scenario.signalTag, cssW - 7, 5);
        } else {
          ctx.fillStyle = 'rgba(201, 138, 46, 0.7)';
          ctx.textAlign = 'left'; ctx.fillText(scenario.fileTag + ' [' + channels[activeChIdx].label + ']', 7, 5);
        }
      }
      rafId = window.requestAnimationFrame(renderSpectrogram);
    }
    rafId = window.requestAnimationFrame(renderSpectrogram);

    return function cleanup() {
      destroyed = true;
      clearTimers();
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      if (resizeObserver) { try { resizeObserver.disconnect(); } catch (e) {} }
      window.removeEventListener('resize', resizeCanvas);
      stopLocalAudio();
    };
  });
})();
