(function () {
  'use strict';

  if (!window.GameMinigames || typeof window.GameMinigames.register !== 'function') {
    return;
  }

  var ARCHIVE_STYLE_ID = 'minigames-archive-styles';

  var ARCHIVE_CSS =
    '.mga-stats {' +
      'display: flex;' +
      'align-items: center;' +
      'gap: 10px;' +
      'flex-wrap: wrap;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 10.5px;' +
      'font-weight: 600;' +
      'letter-spacing: 0.05em;' +
      'text-transform: uppercase;' +
    '}' +
    '.mga-stat-found {' +
      'color: var(--case-accent, #c98a2e);' +
    '}' +
    '.mga-stat-err {' +
      'color: #9ba0ab;' +
    '}' +
    '.mga-stat-err.is-warn {' +
      'color: #ef4444;' +
    '}' +
    '.mga-tabs {' +
      'flex-shrink: 0;' +
      'display: grid;' +
      'grid-template-columns: repeat(3, minmax(0, 1fr));' +
      'gap: 6px;' +
    '}' +
    '.mga-tab {' +
      'position: relative;' +
      'display: flex;' +
      'align-items: center;' +
      'justify-content: center;' +
      'gap: 5px;' +
      'padding: 8px 4px;' +
      'background: #14171e;' +
      'border: 1px solid #2b303c;' +
      'border-bottom: 2px solid transparent;' +
      'border-radius: 6px;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 9.8px;' +
      'font-weight: 600;' +
      'letter-spacing: 0.03em;' +
      'color: #8f96a4;' +
      'text-transform: uppercase;' +
      'cursor: pointer;' +
      'transition: background-color 0.14s ease, border-color 0.14s ease, color 0.14s ease;' +
    '}' +
    '.mga-tab.is-active {' +
      'background: #1f2430;' +
      'border-color: #3c4354;' +
      'border-bottom-color: var(--case-accent, #c98a2e);' +
      'color: #f3ece0;' +
    '}' +
    '.mga-tab-dot {' +
      'width: 6px;' +
      'height: 6px;' +
      'border-radius: 50%;' +
      'background: var(--case-accent, #c98a2e);' +
      'flex-shrink: 0;' +
      'opacity: 0.72;' +
    '}' +
    '.mga-tab.is-done .mga-tab-dot {' +
      'background: #22c55e;' +
      'opacity: 1;' +
      'box-shadow: 0 0 6px rgba(34, 197, 94, 0.65);' +
    '}' +
    '.mga-doc-scroll {' +
      'height: 100%;' +
      'width: 100%;' +
      'overflow-y: auto;' +
      'overflow-x: hidden;' +
      '-webkit-overflow-scrolling: touch;' +
      'touch-action: pan-y;' +
      'padding: 10px;' +
      'position: relative;' +
    '}' +
    '.mga-doc-scroll::-webkit-scrollbar {' +
      'display: none;' +
    '}' +
    '.mga-paper {' +
      'position: relative;' +
      'background: linear-gradient(180deg, #dbd2be 0%, #d3c8b1 56%, #cabda4 100%);' +
      'color: #1a1815;' +
      'border: 1px solid #9d9178;' +
      'border-radius: 4px;' +
      'padding: 13px 11px 15px;' +
      'box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6), inset 0 0 28px rgba(84, 68, 42, 0.24);' +
      'font-family: "IBM Plex Mono", monospace;' +
      'transition: background 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;' +
    '}' +
    '.mga-paper.is-backlight {' +
      'background: radial-gradient(circle at 50% 48%, #fff6d6 0%, #f1da9e 48%, #c9a867 100%);' +
      'border-color: #e6b85c;' +
      'box-shadow: 0 0 26px rgba(245, 194, 86, 0.32), inset 0 0 38px rgba(255, 240, 180, 0.55);' +
    '}' +
    '.mga-paper-head {' +
      'position: relative;' +
      'padding-bottom: 8px;' +
      'margin-bottom: 8px;' +
      'border-bottom: 1.5px solid rgba(26, 24, 21, 0.48);' +
    '}' +
    '.mga-paper-kicker {' +
      'font-size: 9.5px;' +
      'letter-spacing: 0.08em;' +
      'color: rgba(26, 24, 21, 0.68);' +
      'text-transform: uppercase;' +
      'padding-right: 68px;' +
    '}' +
    '.mga-paper-title {' +
      'font-family: "Oswald", sans-serif;' +
      'font-size: 16px;' +
      'font-weight: 700;' +
      'letter-spacing: 0.06em;' +
      'color: #1a1815;' +
      'text-transform: uppercase;' +
      'margin-top: 2px;' +
      'padding-right: 68px;' +
    '}' +
    '.mga-paper-stamp {' +
      'position: absolute;' +
      'top: -2px;' +
      'right: 0;' +
      'padding: 2px 7px;' +
      'font-family: "Oswald", sans-serif;' +
      'font-size: 10.5px;' +
      'font-weight: 700;' +
      'letter-spacing: 0.12em;' +
      'color: rgba(153, 27, 27, 0.72);' +
      'border: 2px double rgba(153, 27, 27, 0.65);' +
      'border-radius: 2px;' +
      'transform: rotate(7deg);' +
      'pointer-events: none;' +
    '}' +
    '.mga-field-list {' +
      'display: flex;' +
      'flex-direction: column;' +
      'gap: 3px;' +
    '}' +
    '.mga-covered-zone {' +
      'position: relative;' +
      'display: flex;' +
      'flex-direction: column;' +
      'gap: 3px;' +
      'margin: 2px 0;' +
    '}' +
    '.mga-covered-zone.is-covered > .mga-paper-row,' +
    '.mga-covered-zone.is-covered > .mga-roster-row,' +
    '.mga-covered-zone.is-covered > .mga-log-row {' +
      'pointer-events: none;' +
      'filter: blur(1.4px);' +
      'opacity: 0.42;' +
    '}' +
    '.mga-slip {' +
      'position: absolute;' +
      'inset: -3px -2px;' +
      'z-index: 6;' +
      'display: flex;' +
      'flex-direction: column;' +
      'justify-content: space-between;' +
      'gap: 6px;' +
      'padding: 10px 11px;' +
      'border-radius: 4px;' +
      'touch-action: none;' +
      'cursor: grab;' +
      'user-select: none;' +
      '-webkit-user-select: none;' +
      'transition: transform 0.24s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.24s ease;' +
    '}' +
    '.mga-slip:active {' +
      'cursor: grabbing;' +
    '}' +
    '.mga-slip.is-dragging {' +
      'transition: none;' +
    '}' +
    '.mga-slip.is-peeled {' +
      'transform: translate3d(118%, -14px, 0) rotate(10deg) !important;' +
      'opacity: 0 !important;' +
      'pointer-events: none;' +
    '}' +
    '.mga-slip-paper {' +
      'background: linear-gradient(168deg, #f3e4a8 0%, #e7d48c 65%, #d6be70 100%);' +
      'color: #231e14;' +
      'border: 1px solid #b59a4e;' +
      'border-left: 3px solid #991b1b;' +
      'box-shadow: 0 8px 20px rgba(0, 0, 0, 0.48), inset 0 0 18px rgba(120, 88, 28, 0.16);' +
      'transform: rotate(-0.7deg);' +
    '}' +
    '.mga-slip-digital {' +
      'background: linear-gradient(170deg, rgba(24, 30, 42, 0.97) 0%, rgba(15, 19, 28, 0.98) 100%);' +
      'color: #d9e0ec;' +
      'border: 1px dashed var(--case-accent, #c98a2e);' +
      'border-left: 3px solid var(--case-accent, #c98a2e);' +
      'box-shadow: 0 8px 22px rgba(0, 0, 0, 0.72);' +
    '}' +
    '.mga-slip-head {' +
      'display: flex;' +
      'align-items: center;' +
      'justify-content: space-between;' +
      'gap: 8px;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 9.5px;' +
      'font-weight: 700;' +
      'letter-spacing: 0.08em;' +
      'text-transform: uppercase;' +
    '}' +
    '.mga-slip-paper .mga-slip-head {' +
      'color: #881c1c;' +
      'border-bottom: 1px dashed rgba(35, 30, 20, 0.3);' +
      'padding-bottom: 4px;' +
    '}' +
    '.mga-slip-digital .mga-slip-head {' +
      'color: var(--case-accent, #e0a343);' +
      'border-bottom: 1px dashed rgba(255, 255, 255, 0.16);' +
      'padding-bottom: 4px;' +
    '}' +
    '.mga-slip-body {' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 10.8px;' +
      'line-height: 1.42;' +
      'font-style: italic;' +
    '}' +
    '.mga-slip-foot {' +
      'display: flex;' +
      'align-items: center;' +
      'justify-content: space-between;' +
      'gap: 8px;' +
    '}' +
    '.mga-slip-hint {' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 9px;' +
      'opacity: 0.78;' +
      'letter-spacing: 0.04em;' +
    '}' +
    '.mga-slip-btn {' +
      'flex-shrink: 0;' +
      'padding: 5px 9px;' +
      'border-radius: 4px;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 9.5px;' +
      'font-weight: 700;' +
      'letter-spacing: 0.05em;' +
      'cursor: pointer;' +
      'text-transform: uppercase;' +
    '}' +
    '.mga-slip-paper .mga-slip-btn {' +
      'background: #231e14;' +
      'color: #f3e4a8;' +
      'border: 1px solid #4d4128;' +
    '}' +
    '.mga-slip-digital .mga-slip-btn {' +
      'background: rgba(201, 138, 46, 0.2);' +
      'color: #fde68a;' +
      'border: 1px solid var(--case-accent, #c98a2e);' +
    '}' +
    '.mga-paper-row {' +
      'width: 100%;' +
      'text-align: left;' +
      'padding: 8px 7px;' +
      'background: transparent;' +
      'border: 1px solid transparent;' +
      'border-bottom: 1px dashed rgba(26, 24, 21, 0.24);' +
      'border-radius: 3px;' +
      'color: #1a1815;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 11.2px;' +
      'line-height: 1.44;' +
      'cursor: pointer;' +
      'display: block;' +
      'transition: background-color 0.14s ease, border-color 0.14s ease, box-shadow 0.14s ease;' +
    '}' +
    '.mga-paper-row:last-child {' +
      'border-bottom-color: transparent;' +
    '}' +
    '.mga-paper-row.is-selected {' +
      'background: rgba(26, 24, 21, 0.11);' +
      'border-color: #8b5a14;' +
      'box-shadow: inset 3px 0 0 #8b5a14;' +
    '}' +
    '.mga-field-label {' +
      'display: block;' +
      'font-size: 9.8px;' +
      'font-weight: 700;' +
      'letter-spacing: 0.06em;' +
      'text-transform: uppercase;' +
      'color: rgba(26, 24, 21, 0.68);' +
      'margin-bottom: 2px;' +
    '}' +
    '.mga-whiteout {' +
      'display: inline-block;' +
      'position: relative;' +
      'padding: 1px 5px;' +
      'margin: 0 2px;' +
      'background: linear-gradient(176deg, #efebe0 0%, #e4dccb 100%);' +
      'border-radius: 2px 4px 2px 3px;' +
      'box-shadow: 0 0 2px rgba(239, 235, 224, 0.95);' +
      'font-weight: 700;' +
      'color: #151412;' +
      'transform: rotate(-0.8deg);' +
      'transition: background 0.2s ease, color 0.2s ease;' +
    '}' +
    '.mga-whiteout-hidden {' +
      'display: none;' +
      'margin-left: 5px;' +
      'padding: 0 4px;' +
      'border-radius: 2px;' +
      'background: rgba(153, 27, 27, 0.16);' +
      'border: 1px solid rgba(153, 27, 27, 0.65);' +
      'color: #991b1b;' +
      'font-weight: 700;' +
      'font-size: 10.5px;' +
    '}' +
    '.mga-paper.is-backlight .mga-whiteout {' +
      'background: rgba(255, 243, 198, 0.45);' +
      'color: rgba(26, 24, 21, 0.55);' +
      'text-decoration: line-through;' +
    '}' +
    '.mga-paper.is-backlight .mga-whiteout-hidden {' +
      'display: inline-block;' +
    '}' +
    '.mga-roster-head {' +
      'display: grid;' +
      'grid-template-columns: 1.38fr repeat(4, 1fr);' +
      'gap: 3px;' +
      'padding: 5px 6px;' +
      'background: rgba(26, 24, 21, 0.09);' +
      'border-top: 1px solid rgba(26, 24, 21, 0.45);' +
      'border-bottom: 1px solid rgba(26, 24, 21, 0.45);' +
      'font-size: 9.5px;' +
      'font-weight: 700;' +
      'text-align: center;' +
      'color: #1a1815;' +
    '}' +
    '.mga-roster-head span:first-child {' +
      'text-align: left;' +
    '}' +
    '.mga-roster-row {' +
      'width: 100%;' +
      'text-align: left;' +
      'padding: 8px 6px;' +
      'background: transparent;' +
      'border: 1px solid transparent;' +
      'border-bottom: 1px solid rgba(26, 24, 21, 0.22);' +
      'border-radius: 3px;' +
      'color: #1a1815;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'cursor: pointer;' +
      'display: flex;' +
      'flex-direction: column;' +
      'gap: 4px;' +
      'transition: background-color 0.14s ease, border-color 0.14s ease;' +
    '}' +
    '.mga-roster-row.is-selected {' +
      'background: rgba(26, 24, 21, 0.11);' +
      'border-color: #8b5a14;' +
      'box-shadow: inset 3px 0 0 #8b5a14;' +
    '}' +
    '.mga-roster-cells {' +
      'display: grid;' +
      'grid-template-columns: 1.38fr repeat(4, 1fr);' +
      'gap: 3px;' +
      'align-items: center;' +
      'font-size: 10px;' +
      'text-align: center;' +
    '}' +
    '.mga-roster-name {' +
      'text-align: left;' +
      'font-weight: 700;' +
      'font-size: 10.5px;' +
    '}' +
    '.mga-roster-cell {' +
      'position: relative;' +
      'display: inline-flex;' +
      'flex-direction: column;' +
      'align-items: center;' +
      'justify-content: center;' +
      'line-height: 1.2;' +
    '}' +
    '.mga-cell-ghost {' +
      'display: none;' +
      'font-size: 8.5px;' +
      'font-weight: 700;' +
      'color: #991b1b;' +
      'margin-top: 1px;' +
    '}' +
    '.mga-paper.is-backlight .mga-cell-ghost {' +
      'display: block;' +
    '}' +
    '.mga-roster-note {' +
      'font-size: 9.5px;' +
      'color: rgba(26, 24, 21, 0.74);' +
      'font-style: italic;' +
      'line-height: 1.32;' +
    '}' +
    '.mga-digital {' +
      'display: flex;' +
      'flex-direction: column;' +
      'gap: 9px;' +
    '}' +
    '.mga-radar-card {' +
      'background: #0f131a;' +
      'border: 1px solid #2b3140;' +
      'border-radius: 5px;' +
      'padding: 8px;' +
      'display: flex;' +
      'flex-direction: column;' +
      'gap: 6px;' +
      'transition: border-color 0.2s ease, box-shadow 0.2s ease;' +
    '}' +
    '.mga-digital.is-filtered .mga-radar-card {' +
      'border-color: var(--case-accent, #c98a2e);' +
      'box-shadow: 0 0 14px rgba(201, 138, 46, 0.18);' +
    '}' +
    '.mga-radar-meta {' +
      'display: flex;' +
      'align-items: center;' +
      'justify-content: space-between;' +
      'gap: 6px;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 9.5px;' +
      'font-weight: 600;' +
      'color: var(--case-accent, #c98a2e);' +
      'letter-spacing: 0.04em;' +
    '}' +
    '.mga-radar-svg {' +
      'width: 100%;' +
      'height: 114px;' +
      'display: block;' +
      'background: #080a0f;' +
      'border: 1px solid #1f2532;' +
      'border-radius: 3px;' +
    '}' +
    '.mga-log-list {' +
      'display: flex;' +
      'flex-direction: column;' +
      'gap: 6px;' +
    '}' +
    '.mga-log-row {' +
      'width: 100%;' +
      'text-align: left;' +
      'padding: 8px 9px;' +
      'background: #141820;' +
      'border: 1px solid #2a303d;' +
      'border-radius: 5px;' +
      'color: #d6cfc2;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 10.8px;' +
      'line-height: 1.42;' +
      'cursor: pointer;' +
      'display: flex;' +
      'flex-direction: column;' +
      'gap: 4px;' +
      'transition: background-color 0.14s ease, border-color 0.14s ease, box-shadow 0.14s ease;' +
    '}' +
    '.mga-log-row.is-selected {' +
      'background: #1e2432;' +
      'border-color: var(--case-accent, #c98a2e);' +
      'box-shadow: inset 3px 0 0 var(--case-accent, #c98a2e);' +
    '}' +
    '.mga-log-top {' +
      'display: flex;' +
      'align-items: center;' +
      'justify-content: space-between;' +
      'gap: 6px;' +
      'font-size: 10px;' +
      'color: #969fae;' +
    '}' +
    '.mga-log-id {' +
      'font-weight: 700;' +
      'color: #efeae0;' +
    '}' +
    '.mga-log-telemetry {' +
      'display: none;' +
      'margin-top: 2px;' +
      'padding: 3px 6px;' +
      'background: rgba(15, 23, 42, 0.85);' +
      'border: 1px solid rgba(148, 163, 184, 0.25);' +
      'border-radius: 3px;' +
      'font-size: 9.5px;' +
      'color: #93c5fd;' +
    '}' +
    '.mga-digital.is-filtered .mga-log-telemetry {' +
      'display: block;' +
    '}' +
    '.mga-log-telemetry.is-hot {' +
      'border-color: rgba(245, 158, 11, 0.45);' +
      'color: #fcd34d;' +
    '}' +
    '.mga-paper-row.is-found,' +
    '.mga-roster-row.is-found {' +
      'background: rgba(153, 27, 27, 0.13) !important;' +
      'border: 2px solid #991b1b !important;' +
      'box-shadow: inset 0 0 0 1px rgba(220, 38, 38, 0.24);' +
    '}' +
    '.mga-log-row.is-found {' +
      'background: rgba(153, 27, 27, 0.22) !important;' +
      'border: 2px solid #dc2626 !important;' +
      'box-shadow: 0 0 12px rgba(220, 38, 38, 0.22);' +
    '}' +
    '.mga-callout {' +
      'margin-top: 5px;' +
      'padding: 7px 9px;' +
      'background: rgba(153, 27, 27, 0.92);' +
      'border: 1px solid #ef4444;' +
      'border-left: 3px solid #fca5a5;' +
      'border-radius: 4px;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 10.5px;' +
      'line-height: 1.42;' +
      'color: #fff3f3;' +
    '}' +
    '.mga-inspector {' +
      'flex-shrink: 0;' +
      'display: flex;' +
      'align-items: center;' +
      'justify-content: space-between;' +
      'gap: 8px;' +
      'padding: 8px 10px;' +
      'background: rgba(18, 21, 28, 0.94);' +
      'border: 1px solid #2c3240;' +
      'border-radius: 7px;' +
    '}' +
    '.mga-scan-info {' +
      'flex: 1;' +
      'min-width: 0;' +
    '}' +
    '.mga-scan-title {' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 9.8px;' +
      'font-weight: 700;' +
      'color: var(--case-accent, #e2b15f);' +
      'text-transform: uppercase;' +
      'margin-bottom: 2px;' +
    '}' +
    '.mga-scan-title.is-ok {' +
      'color: #4ade80;' +
    '}' +
    '.mga-scan-title.is-err {' +
      'color: #f87171;' +
    '}' +
    '.mga-scan-desc {' +
      'font-size: 11.3px;' +
      'line-height: 1.34;' +
      'color: #d6d2c9;' +
    '}' +
    '.mga-fix-btn {' +
      'flex-shrink: 0;' +
      'padding: 8px 10px;' +
      'font-size: 11.5px;' +
    '}' +
    '.mga-modes {' +
      'display: grid;' +
      'grid-template-columns: repeat(2, minmax(0, 1fr));' +
      'gap: 6px;' +
      'width: 100%;' +
    '}' +
    '.mga-mode-btn {' +
      'padding: 8px 6px;' +
      'background: #171b23;' +
      'border: 1px solid #2f3644;' +
      'border-radius: 6px;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 10px;' +
      'font-weight: 700;' +
      'letter-spacing: 0.04em;' +
      'color: #9ba3b2;' +
      'cursor: pointer;' +
      'text-transform: uppercase;' +
    '}' +
    '.mga-mode-btn.is-normal-active {' +
      'background: rgba(212, 202, 180, 0.14);' +
      'border-color: #d4cab4;' +
      'color: #f5efe2;' +
    '}' +
    '.mga-mode-btn.is-scan-active {' +
      'background: rgba(201, 138, 46, 0.24);' +
      'border-color: var(--case-accent, #e0a343);' +
      'color: #fde68a;' +
      'box-shadow: 0 0 10px rgba(201, 138, 46, 0.28);' +
    '}' +
    '.mga-phase3-wrap {' +
      'height: 100%;' +
      'width: 100%;' +
      'overflow-y: auto;' +
      '-webkit-overflow-scrolling: touch;' +
      'touch-action: pan-y;' +
      'padding: 12px;' +
      'display: flex;' +
      'flex-direction: column;' +
      'justify-content: center;' +
    '}' +
    '.mga-deduce-card {' +
      'background: #14171f;' +
      'border: 1px solid #353b4a;' +
      'border-top: 3px solid var(--case-accent, #c98a2e);' +
      'border-radius: 8px;' +
      'padding: 13px;' +
      'display: flex;' +
      'flex-direction: column;' +
      'gap: 9px;' +
    '}' +
    '.mga-deduce-kicker {' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 10px;' +
      'font-weight: 700;' +
      'color: var(--case-accent, #c98a2e);' +
      'text-transform: uppercase;' +
      'letter-spacing: 0.06em;' +
    '}' +
    '.mga-deduce-facts {' +
      'padding: 8px 9px;' +
      'background: #0d1016;' +
      'border: 1px solid #262b36;' +
      'border-radius: 6px;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 10px;' +
      'line-height: 1.42;' +
      'color: #c2cad8;' +
      'display: flex;' +
      'flex-direction: column;' +
      'gap: 4px;' +
    '}' +
    '.mga-deduce-q {' +
      'font-size: 13px;' +
      'line-height: 1.42;' +
      'color: #f3efe6;' +
      'font-weight: 500;' +
    '}' +
    '.mga-deduce-opts {' +
      'display: flex;' +
      'flex-direction: column;' +
      'gap: 7px;' +
    '}' +
    '.mga-deduce-opt {' +
      'width: 100%;' +
      'text-align: left;' +
      'padding: 9px 10px;' +
      'background: #1b202b;' +
      'border: 1px solid #353d4e;' +
      'border-radius: 6px;' +
      'color: #e4e0d8;' +
      'font-size: 12px;' +
      'line-height: 1.38;' +
      'cursor: pointer;' +
    '}' +
    '.mga-deduce-opt.is-wrong {' +
      'border-color: #ef4444;' +
      'background: rgba(153, 27, 27, 0.25);' +
      'color: #fecaca;' +
    '}' +
    '.mga-deduce-opt.is-correct {' +
      'border-color: #22c55e;' +
      'background: rgba(34, 197, 94, 0.2);' +
      'color: #bbf7d0;' +
    '}' +
    '.mga-deduce-fb {' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 10.5px;' +
      'line-height: 1.38;' +
      'min-height: 16px;' +
      'color: #fca5a5;' +
    '}' +
    '.mga-deduce-fb.is-ok {' +
      'color: #86efac;' +
    '}' +
    '.mga-stamp-screen {' +
      'height: 100%;' +
      'width: 100%;' +
      'display: flex;' +
      'flex-direction: column;' +
      'align-items: center;' +
      'justify-content: center;' +
      'gap: 16px;' +
      'padding: 18px;' +
      'background: rgba(9, 10, 14, 0.92);' +
      'text-align: center;' +
    '}' +
    '.mga-big-stamp {' +
      'padding: 10px 18px;' +
      'font-family: "Oswald", sans-serif;' +
      'font-size: 21px;' +
      'font-weight: 700;' +
      'letter-spacing: 0.11em;' +
      'line-height: 1.2;' +
      'text-transform: uppercase;' +
      'text-align: center;' +
      'color: #dc2626;' +
      'background: rgba(153, 27, 27, 0.14);' +
      'border: 4px double #dc2626;' +
      'border-radius: 4px;' +
      'transform: rotate(-6deg);' +
      'box-shadow: 0 0 26px rgba(153, 27, 27, 0.45), inset 0 0 0 1px rgba(239, 68, 68, 0.35);' +
      'animation: mgaStampSlam 0.32s cubic-bezier(0.18, 0.88, 0.32, 1.05);' +
    '}' +
    '.mga-big-stamp.is-amber {' +
      'color: #f59e0b;' +
      'border-color: #f59e0b;' +
      'background: rgba(245, 158, 11, 0.12);' +
      'box-shadow: 0 0 24px rgba(245, 158, 11, 0.35);' +
    '}' +
    '@keyframes mgaStampSlam {' +
      '0% { opacity: 0; transform: scale(1.65) rotate(-13deg); }' +
      '100% { opacity: 1; transform: scale(1) rotate(-6deg); }' +
    '}' +
    '.mga-stamp-sub {' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 11.5px;' +
      'line-height: 1.48;' +
      'color: #d4cab4;' +
      'max-width: 320px;' +
    '}' +
    '.mga-complete-btn {' +
      'width: 100%;' +
      'max-width: 310px;' +
    '}' +
    '@keyframes mgaShake {' +
      '0%, 100% { transform: translateX(0); }' +
      '25% { transform: translateX(-5px); }' +
      '50% { transform: translateX(5px); }' +
      '75% { transform: translateX(-3px); }' +
    '}' +
    '.mga-shake {' +
      'animation: mgaShake 0.3s ease;' +
    '}';

  function injectArchiveStyles() {
    if (document.getElementById(ARCHIVE_STYLE_ID)) {
      return;
    }
    var styleEl = document.createElement('style');
    styleEl.id = ARCHIVE_STYLE_ID;
    styleEl.textContent = ARCHIVE_CSS;
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

  function clamp(val, min, max) {
    return val < min ? min : val > max ? max : val;
  }

  function haptic(type) {
    window.GameMinigames.haptic(type);
  }

  function sfx(name) {
    window.GameMinigames.sfx(name);
  }

  function buildSvgGraphic(svgKind, isFiltered, isFound) {
    var hot = Boolean(isFiltered || isFound);

    if (svgKind === 'case409_towers') {
      var t3 = hot ? '#ef4444' : '#c98a2e';
      var t4 = hot ? '#ef4444' : '#6f7787';
      return (
        '<svg class="mga-radar-svg" viewBox="0 0 340 114" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
          '<g stroke="#1b212c" stroke-width="0.8">' +
            '<line x1="0" y1="28" x2="340" y2="28"/><line x1="0" y1="57" x2="340" y2="57"/><line x1="0" y1="86" x2="340" y2="86"/>' +
            '<line x1="85" y1="0" x2="85" y2="114"/><line x1="170" y1="0" x2="170" y2="114"/><line x1="255" y1="0" x2="255" y2="114"/>' +
          '</g>' +
          '<path d="M12 88 Q 92 78, 165 56 T 328 34" fill="none" stroke="#475063" stroke-width="3"/>' +
          '<path d="M12 88 Q 92 78, 165 56 T 328 34" fill="none" stroke="#0b0c0e" stroke-width="1.4" stroke-dasharray="4 4"/>' +
          '<circle cx="48" cy="76" r="17" fill="none" stroke="#3b4456" stroke-width="1" stroke-dasharray="2 3"/>' +
          '<circle cx="128" cy="64" r="17" fill="none" stroke="#3b4456" stroke-width="1" stroke-dasharray="2 3"/>' +
          '<circle cx="212" cy="48" r="22" fill="rgba(153,27,27,0.14)" stroke="' + t3 + '" stroke-width="1.2" stroke-dasharray="3 2"/>' +
          '<circle cx="296" cy="40" r="17" fill="none" stroke="' + t4 + '" stroke-width="1.1" stroke-dasharray="2 3"/>' +
          (hot
            ? '<path d="M212 48 Q 254 17, 296 40" fill="none" stroke="#ef4444" stroke-width="1.7" stroke-dasharray="4 3"/>' +
              '<text x="254" y="20" text-anchor="middle" fill="#fca5a5" font-family="IBM Plex Mono, monospace" font-size="8.5" font-weight="700">OFF 22:00 → ON 22:40</text>'
            : '') +
          '<g font-family="IBM Plex Mono, monospace" font-size="8.5" font-weight="600">' +
            '<circle cx="48" cy="76" r="3.5" fill="#9ba1ae"/><text x="48" y="103" text-anchor="middle" fill="#8f95a3">БС №1</text>' +
            '<circle cx="128" cy="64" r="3.5" fill="#9ba1ae"/><text x="128" y="92" text-anchor="middle" fill="#8f95a3">БС №2 ППС</text>' +
            '<circle cx="212" cy="48" r="4" fill="' + t3 + '"/><text x="212" y="81" text-anchor="middle" fill="#e5d9c0">БС №3 ДЕПО</text>' +
            '<circle cx="296" cy="40" r="3.5" fill="' + t4 + '"/><text x="296" y="70" text-anchor="middle" fill="#8f95a3">БС №4 (+4км)</text>' +
          '</g>' +
          '<text x="198" y="38" fill="#ef4444" font-family="IBM Plex Mono, monospace" font-size="10" font-weight="700">✕</text>' +
        '</svg>'
      );
    }

    if (svgKind === 'case412_billing_wave') {
      var spikeCol = hot ? '#f59e0b' : '#64748b';
      var iotCol = hot ? '#334155' : '#64748b';
      return (
        '<svg class="mga-radar-svg" viewBox="0 0 340 114" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
          '<g stroke="#1a2130" stroke-width="0.8">' +
            '<line x1="0" y1="26" x2="340" y2="26"/><line x1="0" y1="54" x2="340" y2="54"/><line x1="0" y1="84" x2="340" y2="84"/>' +
          '</g>' +
          '<line x1="18" y1="84" x2="324" y2="84" stroke="#364154" stroke-width="1.4"/>' +
          '<rect x="34" y="42" width="12" height="42" fill="#3b82f6" fill-opacity="0.72"/>' +
          '<rect x="92" y="64" width="6" height="20" fill="' + iotCol + '"/>' +
          '<rect x="150" y="64" width="6" height="20" fill="' + iotCol + '"/>' +
          '<rect x="208" y="64" width="6" height="20" fill="' + iotCol + '"/>' +
          '<rect x="266" y="64" width="6" height="20" fill="' + iotCol + '"/>' +
          '<rect x="284" y="24" width="9" height="60" fill="' + spikeCol + '"/>' +
          (hot
            ? '<rect x="278" y="16" width="21" height="70" fill="none" stroke="#ef4444" stroke-width="1.3" stroke-dasharray="3 2"/>' +
              '<text x="276" y="13" text-anchor="end" fill="#fde68a" font-family="IBM Plex Mono, monospace" font-size="8.5" font-weight="700">03:42 · IMEI ...412 · 40 СЕК</text>' +
              '<text x="152" y="54" text-anchor="middle" fill="#64748b" font-family="IBM Plex Mono, monospace" font-size="7.5">M2M КОТЁЛ (КАЖДЫЙ ЧАС)</text>'
            : '') +
          '<g font-family="IBM Plex Mono, monospace" font-size="8" fill="#8c96a8" text-anchor="middle">' +
            '<text x="40" y="100">21:44 SMS</text><text x="115" y="100">00:00</text>' +
            '<text x="195" y="100">02:00</text><text x="288" y="100" fill="' + (hot ? '#fde68a' : '#8c96a8') + '">03:42</text>' +
          '</g>' +
        '</svg>'
      );
    }

    if (svgKind === 'case412_triangulation') {
      var arcCol = hot ? '#22c55e' : '#64748b';
      return (
        '<svg class="mga-radar-svg" viewBox="0 0 340 114" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
          '<g stroke="#1a2232" stroke-width="0.8">' +
            '<line x1="0" y1="38" x2="340" y2="38"/><line x1="0" y1="76" x2="340" y2="76"/>' +
            '<line x1="85" y1="0" x2="85" y2="114"/><line x1="170" y1="0" x2="170" y2="114"/><line x1="255" y1="0" x2="255" y2="114"/>' +
          '</g>' +
          '<line x1="20" y1="62" x2="245" y2="62" stroke="#475569" stroke-width="3"/>' +
          '<line x1="292" y1="8" x2="312" y2="106" stroke="#334155" stroke-width="4"/>' +
          '<g fill="#1c2434" stroke="#4b5a73" stroke-width="1">' +
            '<rect x="76" y="44" width="22" height="14" rx="1"/>' +
            '<rect x="104" y="44" width="22" height="14" rx="1"/>' +
            '<rect x="132" y="44" width="22" height="14" rx="1"/>' +
            '<rect x="160" y="44" width="22" height="14" rx="1"/>' +
          '</g>' +
          '<g font-family="IBM Plex Mono, monospace" font-size="7.5" fill="#9fb0c7" text-anchor="middle">' +
            '<text x="87" y="54">№10</text><text x="115" y="54">№12</text><text x="143" y="54">№14</text><text x="171" y="54">№16</text>' +
          '</g>' +
          '<circle cx="40" cy="26" r="4" fill="#f59e0b"/>' +
          '<text x="48" y="29" fill="#fde68a" font-family="IBM Plex Mono, monospace" font-size="8.5" font-weight="600">БС-14</text>' +
          '<circle cx="304" cy="48" r="3.5" fill="#64748b"/>' +
          '<text x="298" y="34" text-anchor="end" fill="#64748b" font-family="IBM Plex Mono, monospace" font-size="8">БС-09 ТРАССА</text>' +
          (hot
            ? '<path d="M40 26 L128 52" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="3 2"/>' +
              '<ellipse cx="129" cy="54" rx="64" ry="26" fill="rgba(34,197,94,0.14)" stroke="' + arcCol + '" stroke-width="1.6" stroke-dasharray="4 3"/>' +
              '<text x="129" y="96" text-anchor="middle" fill="#86efac" font-family="IBM Plex Mono, monospace" font-size="8.5" font-weight="700">R = 50 М // УЧАСТКИ №10–№16 (TA=1)</text>' +
              '<text x="304" y="68" text-anchor="middle" fill="#ef4444" font-family="IBM Plex Mono, monospace" font-size="8">0 ПАКЕТОВ</text>'
            : '<text x="129" y="96" text-anchor="middle" fill="#7c8799" font-family="IBM Plex Mono, monospace" font-size="8.5">САДОВАЯ УЛ. // СЕКТОР БС-14-В</text>') +
        '</svg>'
      );
    }

    if (svgKind === 'case412_power_chart') {
      return (
        '<svg class="mga-radar-svg" viewBox="0 0 340 114" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
          '<g stroke="#1b2230" stroke-width="0.8">' +
            '<line x1="26" y1="24" x2="326" y2="24"/><line x1="26" y1="54" x2="326" y2="54"/><line x1="26" y1="86" x2="326" y2="86"/>' +
          '</g>' +
          '<path d="M26 76 L326 76" fill="none" stroke="#64748b" stroke-width="1.3" stroke-dasharray="4 3"/>' +
          (hot
            ? '<rect x="134" y="28" width="192" height="58" fill="rgba(239,68,68,0.16)"/>'
            : '') +
          '<path d="M26 74 L132 74 L136 28 L326 28" fill="none" stroke="' + (hot ? '#ef4444' : '#f59e0b') + '" stroke-width="2.2"/>' +
          '<g font-family="IBM Plex Mono, monospace" font-size="8" fill="#8e99ab">' +
            '<text x="4" y="31">2кВт</text><text x="4" y="79">0.4</text>' +
            '<text x="30" y="102">18:00</text><text x="122" y="102" fill="' + (hot ? '#fca5a5' : '#8e99ab') + '">22:15</text>' +
            '<text x="218" y="102">02:00</text><text x="300" y="102">06:00</text>' +
          '</g>' +
          (hot
            ? '<text x="230" y="20" text-anchor="middle" fill="#fca5a5" font-family="IBM Plex Mono, monospace" font-size="8.5" font-weight="700">СКАЧОК ×4 (1.85 КВТ ПЛАТО)</text>' +
              '<text x="80" y="68" text-anchor="middle" fill="#64748b" font-family="IBM Plex Mono, monospace" font-size="7.5">ПРОШЛЫЙ ГОД</text>'
            : '') +
        '</svg>'
      );
    }

    if (svgKind === 'case412_utilities') {
      return (
        '<svg class="mga-radar-svg" viewBox="0 0 340 114" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
          '<line x1="12" y1="22" x2="328" y2="22" stroke="#38bdf8" stroke-width="2.2" stroke-opacity="0.7"/>' +
          '<text x="16" y="15" fill="#7dd3fc" font-family="IBM Plex Mono, monospace" font-size="8">МАГИСТРАЛЬ ВОДОПРОВОДА Ø100</text>' +
          '<rect x="34" y="42" width="76" height="44" fill="#17202e" stroke="#4b5a73" stroke-width="1.2"/>' +
          '<text x="72" y="67" text-anchor="middle" fill="#cbd5e1" font-family="IBM Plex Mono, monospace" font-size="8.5">ДОМ (ЛИТ. А)</text>' +
          '<rect x="136" y="40" width="90" height="48" fill="#1c222e" stroke="' + (hot ? '#ef4444' : '#c98a2e') + '" stroke-width="1.5"/>' +
          '<text x="181" y="61" text-anchor="middle" fill="#f3e8d2" font-family="IBM Plex Mono, monospace" font-size="8.5" font-weight="700">ГАРАЖ (ЛИТ. Б)</text>' +
          '<rect x="252" y="48" width="60" height="34" fill="#131c24" stroke="#3b495e" stroke-width="1"/>' +
          '<text x="282" y="68" text-anchor="middle" fill="#8b96a8" font-family="IBM Plex Mono, monospace" font-size="8">ТЕПЛИЦА</text>' +
          '<path d="M72 22 L72 42" stroke="#38bdf8" stroke-width="1.3"/>' +
          '<path d="M282 22 L282 48" stroke="#64748b" stroke-width="1" stroke-dasharray="2 2"/>' +
          (hot
            ? '<path d="M181 22 L181 74" stroke="#ef4444" stroke-width="2" stroke-dasharray="4 2"/>' +
              '<circle cx="181" cy="74" r="7" fill="rgba(239,68,68,0.28)" stroke="#ef4444" stroke-width="1.5"/>' +
              '<text x="181" y="103" text-anchor="middle" fill="#fca5a5" font-family="IBM Plex Mono, monospace" font-size="8.5" font-weight="700">↓ ГЛУБИНА &gt; 2.2 М (ВБШв + ВРЕЗКА Ø25)</text>'
            : '<text x="181" y="103" text-anchor="middle" fill="#7c8799" font-family="IBM Plex Mono, monospace" font-size="8">УЧАСТОК №14 // СХЕМА НАРУЖНЫХ ВВОДОВ</text>') +
        '</svg>'
      );
    }

    return (
      '<svg class="mga-radar-svg" viewBox="0 0 340 114" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
        '<g stroke="#1b212c" stroke-width="0.8">' +
          '<line x1="0" y1="38" x2="340" y2="38"/><line x1="0" y1="76" x2="340" y2="76"/>' +
          '<line x1="85" y1="0" x2="85" y2="114"/><line x1="170" y1="0" x2="170" y2="114"/><line x1="255" y1="0" x2="255" y2="114"/>' +
        '</g>' +
        '<path d="M18 82 L110 66 L186 42 L264 60 L322 30" fill="none" stroke="' + (hot ? '#ef4444' : '#c98a2e') + '" stroke-width="2"/>' +
        '<text x="170" y="102" text-anchor="middle" fill="#9ba3b2" font-family="IBM Plex Mono, monospace" font-size="8.5">СВОДКА ДАННЫХ // ТЕРМИНАЛ СК</text>' +
      '</svg>'
    );
  }

  function buildCase409Scenario(config) {
    var suspectName = config.suspectName || 'Краснов И.С.';
    var dates =
      Array.isArray(config.dates) && config.dates.length === 4
        ? config.dates
        : ['14.09', '19.11', '03.03', '22.10'];

    return {
      id: 'case409_act3_archive',
      title: config.title || 'АРХИВНЫЙ АУДИТ // ДЕЛО №409',
      stampWin: 'ФАЛЬСИФИКАЦИЯ ПОДТВЕРЖДЕНА',
      stampTone: 'red',
      winSummary: 'Все три подлога (Протокол №1, Табель смен и Биллинг БС №3–№4) сведены в единый акт.',
      tabs: [
        {
          key: 'protocol',
          label: 'ПРОТОКОЛ №1',
          kind: 'paper',
          paperKicker: 'АРХИВ СК // ЭПИЗОД №1 · КОПИЯ',
          paperTitle: 'ПРОТОКОЛ ОСМОТРА №114-08',
          paperStamp: 'В АРХИВ',
          slip: {
            tone: 'paper',
            kicker: 'СТИКЕР КАНЦЕЛЯРИИ',
            text: '«Подшито в архив. Группа I(0) Rh+ сверена деж. частью. Лист 4 не перешивать.»',
            btnText: 'СДВИНУТЬ ⇄'
          },
          items: [
            {
              id: 'p_date',
              label: 'Дата и условия осмотра',
              text: '14.09.2022, 05:20–07:05 (испр. с 05:15 — «испр. верить», роспись эксперта). +6°C, мелкий дождь.',
              isForgery: false,
              covered: false,
              requiresScan: false,
              readings: {
                normal: 'Уточнение времени на 5 минут заверено штатной подписью судмедэксперта.',
                scan: 'ПРОСВЕТ: бумага без подчистки и замазки — законная оговорённая правка времени.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: уточнение времени на 5 минут заверено экспертом по регламенту — это не подлог.'
            },
            {
              id: 'p_place',
              label: 'Место обнаружения',
              text: 'Товарная ветка, 4-й км, дренажный лоток у переезда №2. Признаков волочения по щебню нет.',
              isForgery: false,
              covered: false,
              requiresScan: false,
              readings: {
                normal: 'Координаты и описание места полностью совпадают со схемой выезда.',
                scan: 'ПРОСВЕТ: печатный текст однородный, дописок нет.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: описание места осмотра соответствует протоколу выезда.'
            },
            {
              id: 'p_witness',
              label: 'Понятые при осмотре',
              text: 'Смирнов П.А. (обходчик), Кузнецова Л.Н. (переезд). Подпись Смирнова съехала ниже линейки.',
              isForgery: false,
              covered: false,
              requiresScan: false,
              readings: {
                normal: 'Подпись понятого Смирнова кривовата и слегка выходит за поле графы.',
                scan: 'ПРОСВЕТ: нажим естественный, чернила старые — следов обводки или замазки нет.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: неровная подпись путевого обходчика под дождём — обычная бытовая деталь.'
            },
            {
              id: 'p_blood',
              label: 'Группа крови образца №2 (смыв)',
              hasWhiteout: true,
              beforeWhiteout: 'По смыву с фрагмента установлена группа ',
              whiteoutText: 'I(0)',
              hiddenText: 'IV(AB)',
              afterWhiteout: ' Rh+. Заверено: деж. по ОВД Соколов (графа эксперта пуста).',
              isForgery: true,
              covered: true,
              requiresScan: true,
              readings: {
                normal: 'Поверх группы «I(0)» лежит слой белой замазки, а графа эксперта пуста. Включите ПРОСВЕТ (ЛАМПА)!',
                scan: 'ПРОСВЕТ: сквозь замазку проступает «IV(AB)»! Редкую группу крови убийцы заменили на «I(0)» (как у Громова).'
              },
              wrongModeMsg: 'Без ПРОСВЕТА исходная цифра под замазкой не доказана — включите ПРОСВЕТ (ЛАМПА)!',
              callout: 'ПОДЛОГ ПРОТОКОЛА №1: На просвет сквозь замазку чётко проступает «IV(AB)» вместо «I(0)», подпись эксперта подменена дежурным.',
              foundSummary: 'Протокол №1: под замазкой скрыта группа IV(AB) Rh+ (совпадает с кровью на ноже).'
            },
            {
              id: 'p_evidence',
              label: 'Изъятые вещественные доказательства',
              text: 'Пакет №1 — обрывок ткани со смазкой; Пакет №2 — марлевый смыв; смартфон и документы не найдены.',
              isForgery: false,
              covered: true,
              requiresScan: false,
              readings: {
                normal: 'Опись пакетов совпадает с бирками камеры вещдоков.',
                scan: 'ПРОСВЕТ: исправлений и подтёртостей в описи пакетов нет.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: отсутствие смартфона у жертвы Эпизода №1 — обстоятельство нападения, а не подлог.'
            },
            {
              id: 'p_resolution',
              label: 'Резолюция начальника СО',
              text: 'Приобщить к архивному накопителю Эпизода №1. Производство приостановить за неустановлением лица.',
              isForgery: false,
              covered: false,
              requiresScan: false,
              readings: {
                normal: 'Стандартная канцелярская резолюция о сдаче приостановленного тома.',
                scan: 'ПРОСВЕТ: подлинная печать и подпись.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: типовая процессуальная резолюция о приостановлении дела.'
            }
          ]
        },
        {
          key: 'roster',
          label: 'ТАБЕЛЬ СМЕН',
          kind: 'roster',
          paperKicker: 'ОТДЕЛ КАДРОВ // ДАТЫ 4 ЭПИЗОДОВ',
          paperTitle: 'ТАБЕЛЬ НОЧНЫХ СМЕН ОПЕРГРУППЫ',
          paperStamp: 'КАДРЫ',
          columns: dates,
          slip: {
            tone: 'paper',
            kicker: 'ПРИКОЛОТАЯ ЗАПИСКА ШТАБА',
            text: '«Сводка по личному составу проверена. Нарушений по графику ночных смен не выявлено.»',
            btnText: 'ОТКРЕПИТЬ ⇄'
          },
          items: [
            {
              id: 'r_1',
              name: 'Воронов А.П.',
              cells: ['Деж.', 'Вых.', 'Деж.', 'Деж.'],
              note: 'Прим.: график утверждён приказом №41',
              isForgery: false,
              covered: false,
              requiresScan: false,
              readings: {
                normal: 'Смены подтверждены журналом развода и приказом №41.',
                scan: 'ПРОСВЕТ: чернила однородные, подтёртостей нет.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: у Воронова А.П. смены полностью подтверждены приказом №41.'
            },
            {
              id: 'r_2',
              name: 'Мельников Д.В.',
              cells: ['Вых.', 'Отп.', 'Бол.', 'Вых.'],
              note: 'Прим.: отпускной №118, б/лист №804 закрыт в поликлинике',
              isForgery: false,
              covered: false,
              requiresScan: false,
              readings: {
                normal: 'Не дежурил в ночи всех 4 эпизодов, но на каждый пропуск указан документ.',
                scan: 'ПРОСВЕТ: записи внесены старыми чернилами, номера больничного №804 и отпуска №118 не перебивались.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: отсутствия Мельникова Д.В. закрыты подлинным отпускным №118 и больничным №804.'
            },
            {
              id: 'r_3',
              name: 'Савельева Е.Г.',
              cells: ['Деж.', 'Деж.', 'Отг.', 'Бол.'],
              note: 'Прим.: однофамилица, отгул по приказу №92 от 01.03',
              isForgery: false,
              covered: true,
              requiresScan: false,
              readings: {
                normal: 'Однофамилица погибшей, но отгул 03.03 оформлен приказом заранее.',
                scan: 'ПРОСВЕТ: правок задним числом в строке нет.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: Савельева Е.Г. — однофамилица; все смены и отгул подтверждены приказами.'
            },
            {
              id: 'r_4',
              name: suspectName,
              cells: ['Отг/хоз', 'Отг/хоз', 'Отг/хоз', 'Отг/хоз'],
              ghostCells: ['Деж.', 'Деж.', 'Деж.', 'Деж.'],
              note: 'Прим.: отгул / хозработы — согласовано устно (без приказа)',
              isForgery: true,
              covered: true,
              requiresScan: true,
              readings: {
                normal: 'Во все 4 ночи убийств оформлены «устные отгулы» без приказов! Проверьте строку на ПРОСВЕТ.',
                scan: 'ПРОСВЕТ: под свежими чернилами «Отг/хоз» проступают вытертые отметки «Деж.» — табель переписали задним числом!'
              },
              wrongModeMsg: 'Проверьте подозрительную строку через ПРОСВЕТ (ЛАМПА), чтобы выявить подчистку!',
              callout: 'ПОДЛОГ ТАБЕЛЯ: У сотрудника «' + suspectName + '» во все 4 ночи эпизодов поверх вытертых дежурств вписаны «устные отгулы» без приказов.',
              foundSummary: 'Табель смен: у «' + suspectName + '» все 4 ночи убийств переписаны на устные отгулы поверх вытертых дежурств.'
            },
            {
              id: 'r_5',
              name: 'Тихонов О.Р.',
              cells: ['Деж.', 'Вых.', 'Деж.', 'Вых.'],
              note: 'Прим.: сверен кадровой службой ОВД',
              isForgery: false,
              covered: true,
              requiresScan: false,
              readings: {
                normal: 'Обычный график «сутки через трое».',
                scan: 'ПРОСВЕТ: бумага чистая, подчисток нет.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: штатный график без подчисток и совпадений с эпизодами.'
            }
          ]
        },
        {
          key: 'billing',
          label: 'БИЛЛИНГ',
          kind: 'digital',
          svgKind: 'case409_towers',
          radarLeft: 'СХЕМА БС №1–№4 // ВЕТКА',
          radarRight: 'СМЕРТЬ: ~22:25',
          slip: {
            tone: 'digital',
            kicker: 'ЗАГЛУШКА СВОДКИ ОВД',
            text: '«Часть служебных IMEI и транзита скрыта из отчёта по указанию координатора группы.»',
            btnText: 'СНЯТЬ ЗАГЛУШКУ ⇄'
          },
          items: [
            {
              id: 'b_1',
              abonent: 'АБ-7912***44 (Гражд.)',
              time: '21:50–22:38',
              detail: 'БС №1 → БС №2. Стабильная сессия 4G, проезд по окружному шоссе.',
              telemetry: 'ТЕЛЕМЕТРИЯ: ШОССЕ · 72 КМ/Ч · БЕЗ ОБРЫВОВ',
              hotTelemetry: false,
              isForgery: false,
              covered: false,
              requiresScan: false,
              readings: {
                normal: 'Транзитный гражданский автомобиль на окружной дороге.',
                scan: 'ФИЛЬТР: ровная скорость 72 км/ч, в сектор БС №3 (депо) абонент не заходил.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: обычный транзитный автомобиль на окружном шоссе вдали от депо.'
            },
            {
              id: 'b_2',
              abonent: 'СЛУЖ-09 (Экипаж ППС)',
              time: '22:04–22:55',
              detail: 'БС №2 (Переезд). Телеметрия бортового терминала на дежурстве.',
              telemetry: 'ТЕЛЕМЕТРИЯ: ПОСТ БС №2 · СИГНАЛ 100% · 2.5 КМ ОТ ДЕПО',
              hotTelemetry: false,
              isForgery: false,
              covered: false,
              requiresScan: false,
              readings: {
                normal: 'Служебный экипаж ППС в ночь убийства — проверьте его телеметрию фильтром.',
                scan: 'ФИЛЬТР: терминал не отключался и оставался стационарно на переезде у БС №2.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: экипаж ППС непрерывно находился у БС №2 без отключений и смены вышки.'
            },
            {
              id: 'b_3',
              abonent: 'АБ-7905***18 (Потерпевшая)',
              time: '22:14–22:22',
              detail: 'БС №3 (Депо). Исходящие сообщения мессенджера, обрыв сети в 22:22.',
              telemetry: 'ТЕЛЕМЕТРИЯ: А. САВЕЛЬЕВА · ОБРЫВ В 22:22 (НАПАДЕНИЕ)',
              hotTelemetry: false,
              isForgery: false,
              covered: false,
              requiresScan: false,
              readings: {
                normal: 'Смартфон потерпевшей Алины: обрыв в 22:22 соответствует моменту нападения.',
                scan: 'ФИЛЬТР: это опорная точка времени смерти (~22:25), а не биллинг преступника.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: это телефон самой потерпевшей — ищите скрытый терминал убийцы.'
            },
            {
              id: 'b_4',
              abonent: 'АБ-7981***63 (Машинист)',
              time: '22:18–22:29',
              detail: 'БС №2 → БС №3 → БС №4. Сквозной проход товарного состава №2104.',
              telemetry: 'ТЕЛЕМЕТРИЯ: 58 КМ/Ч ВДОЛЬ ПУТЕЙ · ГРАФИК РЖД OK',
              hotTelemetry: false,
              isForgery: false,
              covered: true,
              requiresScan: false,
              readings: {
                normal: 'Проходил прямо через БС №3 в 22:23 — проверьте скорость через фильтр.',
                scan: 'ФИЛЬТР: линейный проход без остановок на 58 км/ч — товарный состав №2104 по расписанию.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: равномерный проход товарного поезда №2104 подтверждён графиком РЖД.'
            },
            {
              id: 'b_5',
              abonent: 'IMEI-409-C (Служебный, допуск «С»)',
              time: '22:00 / 22:40',
              detail: 'БС №3 (Депо): принудительный «АВИАРЕЖИМ» в 22:00. Выход в сеть в 22:40 у БС №4 (+4 км от ветки).',
              telemetry: 'ТЕЛЕМЕТРИЯ: OFF -25 МИН ДО СМЕРТИ · ON +15 МИН (+4 КМ)',
              hotTelemetry: true,
              isForgery: true,
              covered: true,
              requiresScan: true,
              readings: {
                normal: 'Скрытый служебный IMEI допуска «С» в секторе депо! Включите ФИЛЬТР ТЕЛЕМЕТРИИ для сверки окна.',
                scan: 'ФИЛЬТР: идеальное 40-минутное «слепое окно» прямо вокруг убийства (~22:25) — вход у БС №3, выход в 4 км у БС №4!'
              },
              wrongModeMsg: 'Включите ФИЛЬТР ТЕЛЕМЕТРИИ, чтобы наложить «слепое окно» на карту вышек!',
              callout: 'ПОДЛОГ БИЛЛИНГА: Служебный IMEI допуска «С» ушёл в авиарежим у БС №3 ровно за 25 минут до смерти и включился через 15 минут в 4 км.',
              foundSummary: 'Биллинг: служебный IMEI-409-C ушёл в авиарежим у БС №3 в 22:00 и вышел в сеть в 22:40 в 4 км.'
            }
          ]
        }
      ],
      conclusion: {
        question: 'В Эпизоде №1 замазана IV(AB) группа крови, у «' + suspectName + '» подделаны отгулы во все 4 ночи, а служебный IMEI уходил в авиарежим у депо. Вывод:',
        options: [
          {
            id: 'gromov',
            text: 'Подлог устроили в канцелярии по ошибке, а убийцей остаётся Громов (I группа крови).',
            isCorrect: false,
            reason: 'Противоречие: именно IV(AB) замазали на I(0) Громова, а у депо отключался служебный IMEI допуска «С».'
          },
          {
            id: 'insider',
            text: 'Серийный убийца — действующий сотрудник с допуском «С» (' + suspectName + '), прикрывавшийся устными отгулами и подлогом архива.',
            isCorrect: true,
            reason: 'Верно: все три подлога (кровь IV(AB), переписанный табель и авиарежим IMEI-409-C) сходятся на одном фигуранте.'
          },
          {
            id: 'pps',
            text: 'Убийство совершил экипаж ППС с переезда БС №2 при участии Мельникова Д.В.',
            isCorrect: false,
            reason: 'Противоречие: терминал ППС не покидал БС №2, а больничный Мельникова №804 подлинный.'
          }
        ]
      }
    };
  }

  function buildCase412BillingScenario(config) {
    return {
      id: 'case412_act1_billing',
      title: config.title || 'АНАЛИЗ БИЛЛИНГА ВЫШКИ // ДЕЛО №412',
      stampWin: 'СЕССИЯ 03:42 ПОДТВЕРЖДЕНА',
      stampTone: 'amber',
      winSummary: '40-секундная сессия в 03:42, радиус 50 м на Садовой улице и профиль экранирования зафиксированы.',
      tabs: [
        {
          key: 'dump',
          label: 'ВЫГРУЗКА БС-14',
          kind: 'digital',
          svgKind: 'case412_billing_wave',
          radarLeft: 'БС-14 «ТИХИЕ КЛЮЧИ» // ЛОГ',
          radarRight: '21:30 — 04:00',
          slip: {
            tone: 'digital',
            kicker: 'ФИЛЬТР ОВД (ГРОМОВ)',
            text: '«Ночные пакеты после 00:00 свёрнуты участковым как фоновый шум и транзит трассы М-7.»',
            btnText: 'СНЯТЬ ФИЛЬТР ⇄'
          },
          items: [
            {
              id: 'b1_sms',
              abonent: 'IMEI 3589...412 (А. Соколова)',
              time: '21:44:05',
              detail: 'БС-14-В (Садовая). Исходящее SMS матери: «Повернула на Садовую, скоро буду».',
              telemetry: 'ТЕЛЕМЕТРИЯ: ШТАТНАЯ СЕССИЯ ДО ПРОПАЖИ · RSSI -72 dBm',
              hotTelemetry: false,
              isForgery: false,
              covered: false,
              requiresScan: false,
              readings: {
                normal: 'Последнее известное сообщение Алины матери при заходе на Садовую улицу.',
                scan: 'ФИЛЬТР: обычная вечерняя сессия до исчезновения — ищите скрытый выход в сеть глубокой ночью.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: это штатное вечернее SMS матери в 21:44, а не ночная 40-секундная сессия.'
            },
            {
              id: 'b1_artem',
              abonent: 'АБ-7925***71 (Артём)',
              time: '22:05–03:50',
              detail: 'БС-02 (АЗС на трассе, 12 км от посёлка). Стабильная регистрация без перемещения.',
              telemetry: 'ТЕЛЕМЕТРИЯ: 12 КМ ОТ ПОСЁЛКА · НЕПОДВИЖЕН',
              hotTelemetry: false,
              isForgery: false,
              covered: false,
              requiresScan: false,
              readings: {
                normal: 'Телефон парня Алины всю ночь находился в 12 км на трассе.',
                scan: 'ФИЛЬТР: на вышке БС-14 в посёлке этот номер не появлялся.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: абонент всю ночь находился за 12 км от Садовой улицы.'
            },
            {
              id: 'b1_iot',
              abonent: 'АБ-7903***88 (Участок №8)',
              time: '03:18:04 (38 сек)',
              detail: 'БС-14-В. Короткий пакет 38 сек — телеметрия GSM-модуля газового котла.',
              telemetry: 'ТЕЛЕМЕТРИЯ: M2M/IOT ЦИКЛ 60 МИН (01:18 / 02:18 / 03:18)',
              hotTelemetry: false,
              isForgery: false,
              covered: true,
              requiresScan: false,
              readings: {
                normal: 'Похожая короткая сессия (38 сек) глубокой ночью — проверьте её через фильтр.',
                scan: 'ФИЛЬТР: регулярный почасовой автопинг GSM-датчика котла на участке №8 (чужой IMEI).'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: короткая длительность похожа, но это почасовой пинг GSM-котла на участке №8.'
            },
            {
              id: 'b1_truck',
              abonent: 'АБ-7916***09 (Транзит)',
              time: '03:41:20–03:43:10',
              detail: 'БС-09 (Трасса) → БС-10. Ночной проезд грузового транспорта по шоссе.',
              telemetry: 'ТЕЛЕМЕТРИЯ: БС-09 ШОССЕ · 84 КМ/Ч · ЧУЖОЙ IMEI',
              hotTelemetry: false,
              isForgery: false,
              covered: true,
              requiresScan: false,
              readings: {
                normal: 'Совпадает по времени с 03:42 — проверьте вышку и IMEI через фильтр.',
                scan: 'ФИЛЬТР: чужой абонент на трассовой вышке БС-09 (1.8 км от Садовой).'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: совпало лишь время — это транзитная фура на трассе БС-09.'
            },
            {
              id: 'b1_burst',
              abonent: 'IMEI 3589...412 (А. Соколова)',
              time: '03:42:11–03:42:51 (40 сек)',
              detail: 'БС-14-В (Садовая). Внезапный выход смартфона Алины в сеть ровно на 40 секунд спустя 6 часов после пропажи и повторный обрыв.',
              telemetry: 'ТЕЛЕМЕТРИЯ: IMEI ЖЕРТВЫ · 40 СЕК · БС-14-В · ВНЕЗАПНЫЙ DROP',
              hotTelemetry: true,
              isForgery: true,
              covered: true,
              requiresScan: true,
              readings: {
                normal: 'Телефон Алины вышел в сеть в 03:42 ровно на 40 секунд! Включите ФИЛЬТР ТЕЛЕМЕТРИИ для подтверждения пакета.',
                scan: 'ФИЛЬТР: чистый 40-секундный импульс IMEI 3589...412 прямо в секторе посёлка БС-14-В!'
              },
              wrongModeMsg: 'Включите ФИЛЬТР ТЕЛЕМЕТРИИ, чтобы отсечь шум и подтвердить 40-секундный пакет!',
              callout: 'СЕССИЯ 03:42 ВЫДЕЛЕНА: Через 6 часов после пропажи смартфон Алины на 40 секунд поймал сеть прямо в секторе посёлка БС-14-В.',
              foundSummary: 'Выгрузка БС-14: в 03:42:11 телефон Алины вышел в сеть ровно на 40 секунд внутри посёлка.'
            }
          ]
        },
        {
          key: 'sectors',
          label: 'ТРИАНГУЛЯЦИЯ',
          kind: 'digital',
          svgKind: 'case412_triangulation',
          radarLeft: 'САДОВАЯ УЛ. // АЗИМУТ БС-14',
          radarRight: 'СЕССИЯ 03:42',
          slip: {
            tone: 'paper',
            kicker: 'КАЛЬКА УЧАСТКОВОГО ГРОМОВА',
            text: '«Предполагаемый маршрут ухода к шоссе М-7 (БС-09). Соседей по Садовой не беспокоить.»',
            btnText: 'УБРАТЬ КАЛЬКУ ⇄'
          },
          items: [
            {
              id: 'b2_highway',
              abonent: 'Сектор БС-09-А · Трасса М-7 (1.8 км)',
              time: '0 пакетов',
              detail: 'За всю ночь IMEI Алины ни разу не фиксировался на вышках вдоль шоссе.',
              telemetry: 'ТЕЛЕМЕТРИЯ: НУЛЕВАЯ АКТИВНОСТЬ IMEI ЖЕРТВЫ НА ТРАССЕ',
              hotTelemetry: false,
              isForgery: false,
              covered: false,
              requiresScan: false,
              readings: {
                normal: 'На трассе М-7 нет ни одной отметки смартфона Алины.',
                scan: 'ФИЛЬТР: отсутствие сигнала на трассе лишь косвенно бьёт по версии побега — зафиксируйте реальную точку 03:42.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: здесь 0 пакетов — найдите сектор, где реально прошла триангуляция в 03:42.'
            },
            {
              id: 'b2_station',
              abonent: 'Сектор БС-14-А · Платформа электрички',
              time: '21:38',
              detail: 'Вечерняя регистрация после прибытия пригородного поезда (620 м от Садовой).',
              telemetry: 'ТЕЛЕМЕТРИЯ: ВЕЧЕРНИЙ ПРОХОД · 4.5 КМ/Ч',
              hotTelemetry: false,
              isForgery: false,
              covered: false,
              requiresScan: false,
              readings: {
                normal: 'Обычная отметка, когда Алина сошла с электрички и пошла домой.',
                scan: 'ФИЛЬТР: в 03:42 сигнал на платформе не появлялся.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: это вечерняя отметка 21:38 у электрички, а не точка ночной сессии.'
            },
            {
              id: 'b2_radius',
              abonent: 'Сектор БС-14-В · Садовая ул., участки №10–№16',
              time: 'R = 50 м (TA=1)',
              detail: 'Дуга триангуляции в 03:42 сходится в круге радиусом 50 метров — ровно четыре соседних участка на Садовой улице.',
              telemetry: 'ТЕЛЕМЕТРИЯ: TIMING ADVANCE TA=1 · R <= 50 М · 4 УЧАСТКА',
              hotTelemetry: true,
              isForgery: true,
              covered: true,
              requiresScan: true,
              readings: {
                normal: 'Дуга указывает на четыре соседних участка Садовой! Запустите ФИЛЬТР ТЕЛЕМЕТРИИ для расчёта радиуса TA=1.',
                scan: 'ФИЛЬТР: радиус ровно 50 метров вокруг участков №10–№16 на Садовой улице! Никакой трассы и никакого города.'
              },
              wrongModeMsg: 'Включите ФИЛЬТР ТЕЛЕМЕТРИИ, чтобы рассчитать точную дугу триангуляции R=50м!',
              callout: 'ТРИАНГУЛЯЦИЯ ЗАКРЕПЛЕНА: Радиус 50 м накрывает ровно четыре соседних участка Садовой улицы (№10–№16).',
              foundSummary: 'Триангуляция: сессия 03:42 локализована в радиусе 50 м (четыре участка Садовой улицы).'
            },
            {
              id: 'b2_forest',
              abonent: 'Сектор БС-14-С · Лесополоса за рекой',
              time: 'Эхо -114 dBm',
              detail: 'Слабый отражённый сигнал от мокрой листвы без декодирования IMEI.',
              telemetry: 'ТЕЛЕМЕТРИЯ: MULTIPATH ШУМ · IMEI НЕ ОПРЕДЕЛЁН',
              hotTelemetry: false,
              isForgery: false,
              covered: true,
              requiresScan: false,
              readings: {
                normal: 'Слабый отражённый отклик со стороны леса.',
                scan: 'ФИЛЬТР: обычное переотражение в сырую погоду без привязки к IMEI.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: отражённое радиоэхо в мокрой листве без привязки к телефону Алины.'
            }
          ]
        },
        {
          key: 'simlog',
          label: 'ТЕХЛОГ SIM',
          kind: 'paper',
          paperKicker: 'ОПЕРАТОР СВЯЗИ // ЗАПРОС СК-412',
          paperTitle: 'ПРОТОКОЛ ОТКЛЮЧЕНИЙ И RSSI',
          paperStamp: 'СРОЧНО',
          slip: {
            tone: 'paper',
            kicker: 'СОПРОВОДИТЕЛЬНАЯ СПРАВКА',
            text: '«Предварительная пометка дежурного: вероятный разряд батареи смартфона абонента.»',
            btnText: 'ОТКРЕПИТЬ ⇄'
          },
          items: [
            {
              id: 'b3_handover',
              label: '21:41:12 — Переключение сектора',
              text: 'Плавный handover БС-14-А → БС-14-В при пешей скорости ~4.5 км/ч.',
              isForgery: false,
              covered: false,
              requiresScan: false,
              readings: {
                normal: 'Стандартная смена сектора по пути от станции к Садовой улице.',
                scan: 'ПРОСВЕТ: штатная запись, аномалий уровня сигнала нет.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: обычный переход между секторами, пока Алина шла пешком.'
            },
            {
              id: 'b3_push',
              label: '03:42:14 — Сервисный трафик (14 КБ)',
              text: 'Входящие push-пакеты мессенджера и прогноза погоды сразу после появления сети.',
              isForgery: false,
              covered: false,
              requiresScan: false,
              readings: {
                normal: 'Фоновые уведомления успели дойти за 40 секунд в сети.',
                scan: 'ПРОСВЕТ: автоматическая синхронизация приложений; сама по себе причину обрыва не раскрывает.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: это автоматический push-трафик при появлении сети, а не причина её обрыва.'
            },
            {
              id: 'b3_shield',
              label: '21:53:08 и 03:42:51 — Статус обрыва связи',
              hasWhiteout: true,
              beforeWhiteout: 'Причина потери сети: ',
              whiteoutText: 'АВТО-ОТМЕТКА: разряд АКБ',
              hiddenText: 'АКБ 61% · НЕТ POWER-OFF · ЭКРАН БЕТОНА',
              afterWhiteout: '. Команда IMSI DETACH (выключение кнопкой) отсутствует оба раза.',
              isForgery: true,
              covered: true,
              requiresScan: true,
              readings: {
                normal: 'Нет команды выключения кнопкой, а поверх строки стоит штамп «разряд АКБ». Включите ПРОСВЕТ (ЛАМПА)!',
                scan: 'ПРОСВЕТ: телеметрия 03:42 передала остаток заряда 61% и скачок -109→-74 dBm — телефон на минуту вынесли из-под бетонного/подземного экрана!'
              },
              wrongModeMsg: 'Просветите строку статуса отключения через ПРОСВЕТ (ЛАМПА), чтобы считать реальный профиль RSSI и заряд!',
              callout: 'ПРОФИЛЬ ЭКРАНИРОВАНИЯ: Заряд АКБ 61%, штатного выключения нет — резкий обрыв типичен для бетона или подземелья.',
              foundSummary: 'Техлог SIM: при заряде 61% телефон не выключали — сигнал дважды наглухо резал плотный бетонный/подземный экран.'
            },
            {
              id: 'b3_dlv',
              label: '21:44:08 — Квитанция доставки SMS',
              text: 'Сообщение абоненту (М. Соколова) доставлено за 0.4 сек без повторов.',
              isForgery: false,
              covered: true,
              requiresScan: false,
              readings: {
                normal: 'Обычное подтверждение доставки SMS матери.',
                scan: 'ПРОСВЕТ: технический лог без отклонений.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: обычное подтверждение доставки вечернего SMS.'
            }
          ]
        }
      ],
      conclusion: {
        question: 'В 03:42 смартфон Алины (заряд 61%) на 40 секунд вышел в сеть в радиусе 50 м на Садовой улице и снова мгновенно оборвался без выключения. Вывод:',
        options: [
          {
            id: 'runaway',
            text: 'Алина сама выключила телефон и уехала с Артёмом по трассе М-7, а в 03:42 вышка дала ложный сбой.',
            isCorrect: false,
            reason: 'Противоречие: трассовая БС-09 не видела её IMEI, а в техлоге нет команды штатного выключения (IMSI DETACH).'
          },
          {
            id: 'local_shield',
            text: 'Телефон не увозили из посёлка: кто-то на одном из четырёх участков Садовой на 40 секунд вынес его из-под бетонного или подземного экрана.',
            isCorrect: true,
            reason: 'Верно: радиус 50 м (TA=1), заряд 61% и резкое экранирование полностью опровергают версию побега.'
          },
          {
            id: 'dead_battery',
            text: 'Телефон полностью разрядился ещё на платформе электрички, а ночью сработал датчик котла на участке №8.',
            isCorrect: false,
            reason: 'Противоречие: в 03:42 в сеть вышел именно IMEI Алины Соколовой с остатком заряда 61%.'
          }
        ]
      }
    };
  }

  function buildCase412PowerScenario(config) {
    return {
      id: 'case412_act3_power',
      title: config.title || 'СВЕРКА СЧЁТЧИКА И БТИ // ДЕЛО №412',
      stampWin: 'СКРЫТЫЙ КОНТУР ПОДТВЕРЖДЁН',
      stampTone: 'amber',
      winSummary: 'Ночной скачок нагрузки в 22:15 (×4), расхождение техпаспорта БТИ и вертикальный ввод под гараж подтверждены.',
      tabs: [
        {
          key: 'power',
          label: 'ЭНЕРГОСБЫТ',
          kind: 'digital',
          svgKind: 'case412_power_chart',
          radarLeft: 'УЧАСТОК №14 (КРАВЦОВ) // КВТ',
          radarRight: 'СРАВНЕНИЕ С ГОДОМ',
          slip: {
            tone: 'paper',
            kicker: 'КВИТАНЦИЯ СНТ // ОПЛАТА',
            text: '«Участок №14 (Кравцов В.И.): долгов нет. Объяснение расхода: сушка досок в гараже.»',
            btnText: 'СДВИНУТЬ ⇄'
          },
          items: [
            {
              id: 'e1_day',
              abonent: 'Участок №14 · 14:10–14:40',
              time: '2.10 кВт (30 мин)',
              detail: 'Кратковременное дневное включение циркулярной пилы и электрочайника.',
              telemetry: 'ТЕЛЕМЕТРИЯ: ДНЕВНОЙ БЫТОВОЙ ПИК · СОВПАДАЕТ С ПРОШЛЫМ ГОДОМ',
              hotTelemetry: false,
              isForgery: false,
              covered: false,
              requiresScan: false,
              readings: {
                normal: 'Мощность 2.10 кВт высокая, но длилась всего полчаса днём.',
                scan: 'ФИЛЬТР: короткие дневные пики фиксировались и весь прошлый год — обычная работа в мастерской.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: короткий получасовой пик днём — штатная работа электроинструмента.'
            },
            {
              id: 'e1_belyaev',
              abonent: 'Участок №12 (Беляев) · 22:00–06:00',
              time: '1.10 кВт (ровно)',
              detail: 'Ночное питание уличных прожекторов камер и тёплого пола крыльца.',
              telemetry: 'ТЕЛЕМЕТРИЯ: СТАБИЛЬНО С МАЯ · СКАЧКА В НОЧЬ ПРОПАЖИ НЕТ',
              hotTelemetry: false,
              isForgery: false,
              covered: false,
              requiresScan: false,
              readings: {
                normal: 'Повышенный ночной расход у соседа Беляева — проверьте динамику через фильтр.',
                scan: 'ФИЛЬТР: график участка №12 ровный с мая, никаких изменений в ночь исчезновения Алины.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: у Беляева (участок №12) эта нагрузка стабильна с мая и не связана с ночью пропажи.'
            },
            {
              id: 'e1_jump',
              abonent: 'Участок №14 (Кравцов) · 22:15 → 06:00',
              time: '0.45 → 1.85 кВт (×4)',
              detail: 'Через 20 минут после пропажи Алины ночной расход подскочил в 4 раза и держится ровным плато каждую ночь (за прошлый год таких пиков 0).',
              telemetry: 'ТЕЛЕМЕТРИЯ: +311% РОВНО В 22:15 · НЕПРЕРЫВНОЕ ПЛАТО (ВЫТЯЖКА/ОБОГРЕВ)',
              hotTelemetry: true,
              isForgery: true,
              covered: true,
              requiresScan: true,
              readings: {
                normal: 'Четырёхкратный скачок в 22:15 прямо в ночь пропажи! Включите ФИЛЬТР ТЕЛЕМЕТРИИ для сверки с прошлым годом.',
                scan: 'ФИЛЬТР: никакой «давней сушки досок» не было — постоянный контур на 1.85 кВт впервые запустили ровно в 22:15 в ночь похищения!'
              },
              wrongModeMsg: 'Включите ФИЛЬТР ТЕЛЕМЕТРИИ, чтобы сверить скачок 22:15 с прошлогодней базой!',
              callout: 'АНОМАЛИЯ ЭНЕРГОСБЫТА: В 22:15 расход на участке №14 вырос в 4 раза и держится ровным ночным плато — за прошлый год таких нагрузок не было.',
              foundSummary: 'Энергосбыт: ровно в 22:15 (через 20 мин после пропажи) нагрузка участка №14 выросла в 4 раза.'
            },
            {
              id: 'e1_base',
              abonent: 'Участок №14 · Архив за прошлый год',
              time: '~0.42 кВт/ночь',
              detail: 'Средний ночной фон (холодильник и дежурная лампочка на крыльце).',
              telemetry: 'ТЕЛЕМЕТРИЯ: БАЗОВАЯ ЛИНИЯ 12 МЕСЯЦЕВ · ОТКЛОНЕНИЙ НЕТ',
              hotTelemetry: false,
              isForgery: false,
              covered: true,
              requiresScan: false,
              readings: {
                normal: 'Подтверждает, что раньше расход у Кравцова был копеечным.',
                scan: 'ФИЛЬТР: это контрольный фон — зафиксируйте именно скачок нагрузки в 22:15.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: это фоновая статистика прошлого года — зафиксируйте саму ступеньку скачка в 22:15.'
            }
          ]
        },
        {
          key: 'bti',
          label: 'ПЛАН БТИ',
          kind: 'paper',
          paperKicker: 'БТИ РАЙОНА // УЧАСТОК №14 (САДОВАЯ)',
          paperTitle: 'ТЕХПАСПОРТ И ЭКСПЛИКАЦИЯ СТРОЕНИЙ',
          paperStamp: 'БТИ',
          slip: {
            tone: 'paper',
            kicker: 'ВЫПИСКА РОСРЕЕСТРА',
            text: '«Подземных сооружений и перепланировок на участке №14 не зарегистрировано.»',
            btnText: 'ОТКРЕПИТЬ ⇄'
          },
          items: [
            {
              id: 'e2_house',
              label: 'Литер А — Жилой дом (64 м²)',
              text: 'Кирпичная печь, под кухней учтён малый овощной погреб 1.8 м² (глубина 1.4 м, без воды и вытяжки).',
              isForgery: false,
              covered: false,
              requiresScan: false,
              readings: {
                normal: 'Небольшой погреб под кухней дома официально оформлен с 1996 года.',
                scan: 'ПРОСВЕТ: запись старая, исправлений в плане дома нет.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: малый овощной погреб под кухней дома официально учтён в БТИ.'
            },
            {
              id: 'e2_greenhouse',
              label: 'Литер В — Садовая теплица (12 м²)',
              text: 'Замена деревянных рам на поликарбонат в 2021 г. без нового обмера БТИ.',
              isForgery: false,
              covered: false,
              requiresScan: false,
              readings: {
                normal: 'Мелкое бытовое обновление садовой теплицы.',
                scan: 'ПРОСВЕТ: к подземным коммуникациям отношения не имеет.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: обновление поликарбоната на теплице — обычная дачная мелочь.'
            },
            {
              id: 'e2_garage',
              label: 'Литер Б — Старый кирпичный гараж (28 м²)',
              hasWhiteout: true,
              beforeWhiteout: 'Основание по акту БТИ: ',
              whiteoutText: 'голый бетон (без подвала)',
              hiddenText: 'списано 14 м³ бетона + короб Ø150 под плитой',
              afterWhiteout: '. Примечание техника внизу строки вымарано.',
              isForgery: true,
              covered: true,
              requiresScan: true,
              readings: {
                normal: 'По бумагам под гаражом «голый бетон», но примечание техника аккуратно вымарано! Включите ПРОСВЕТ (ЛАМПА).',
                scan: 'ПРОСВЕТ: под замазкой читается отметка о заливке 14 м³ бетона и вытяжном коробе Ø150 под плитой гаража!'
              },
              wrongModeMsg: 'Просветите подтёртую строку фундамента гаража через ПРОСВЕТ (ЛАМПА)!',
              callout: 'РАСХОЖДЕНИЕ БТИ: Под «голым бетоном» гаража на просвет обнаружена вымаранная запись о 14 м³ бетона и венткоробе Ø150.',
              foundSummary: 'План БТИ: под гаражом скрыта заливка 14 м³ бетона и венткороб Ø150 вместо «голого бетона».'
            },
            {
              id: 'e2_fence',
              label: 'Межевой план границы с участком №12',
              text: 'Расхождение линии забора с Беляевым на 18 см, спор закрыт устно в 2019 г.',
              isForgery: false,
              covered: true,
              requiresScan: false,
              readings: {
                normal: 'Типичный дачный спор по меже.',
                scan: 'ПРОСВЕТ: следов фальсификации нет.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: расхождение забора на 18 см — бытовая мелочь.'
            }
          ]
        },
        {
          key: 'utilities',
          label: 'СХЕМА ВВОДОВ',
          kind: 'digital',
          svgKind: 'case412_utilities',
          radarLeft: 'СХЕМА СЕТЕЙ // УЧАСТОК №14',
          radarRight: 'КАБЕЛЬ + ВОДОПРОВОД',
          slip: {
            tone: 'digital',
            kicker: 'АКТ БАЛАНСОВОЙ ПРИНАДЛЕЖНОСТИ',
            text: '«Наружные сети согласованы. Подземных вводов глубже 0.8 м на участке №14 не числится.»',
            btnText: 'СНЯТЬ АКТ ⇄'
          },
          items: [
            {
              id: 'e3_air',
              abonent: 'Воздушный ввод СИП-4 → Жилой дом',
              time: '220В (учтён)',
              detail: 'Штатная линия от уличной опоры через фасадный счётчик дома.',
              telemetry: 'ТЕЛЕМЕТРИЯ: ОФИЦИАЛЬНАЯ ЛИНИЯ · НАДЗЕМНАЯ ПРОКЛАДКА',
              hotTelemetry: false,
              isForgery: false,
              covered: false,
              requiresScan: false,
              readings: {
                normal: 'Обычный воздушный провод в жилой дом.',
                scan: 'ФИЛЬТР: полностью соответствует техусловиям энергосбыта.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: стандартный зарегистрированный воздушный ввод в жилой дом.'
            },
            {
              id: 'e3_garden',
              abonent: 'Поливочный отвод ПНД Ø20 → Теплица',
              time: 'Глубина 0.3 м',
              detail: 'Летняя пластиковая труба к грядкам, перекрыта на зиму шаровым краном.',
              telemetry: 'ТЕЛЕМЕТРИЯ: ДАВЛЕНИЕ 0 БАР · ПЕРЕКРЫТ НА ЗИМУ',
              hotTelemetry: false,
              isForgery: false,
              covered: false,
              requiresScan: false,
              readings: {
                normal: 'Неглубокий летний полив к теплице.',
                scan: 'ФИЛЬТР: труба сухая и перекрыта — звук по ней идти не может.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: летняя поливочная труба перекрыта и залегает у поверхности (0.3 м).'
            },
            {
              id: 'e3_drain',
              abonent: 'Дренажная труба от отмостки → Канава',
              time: 'Глубина 0.5 м',
              detail: 'Ливневый отвод дождевой воды к придорожной канаве.',
              telemetry: 'ТЕЛЕМЕТРИЯ: ЛИВНЕВКА ПВХ · БЕЗ ВРЕЗКИ В МАГИСТРАЛЬ',
              hotTelemetry: false,
              isForgery: false,
              covered: true,
              requiresScan: false,
              readings: {
                normal: 'Обычный поверхностный водосток от дождя.',
                scan: 'ФИЛЬТР: пластиковая ливневка без связи с водопроводом и электрикой.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: обычная дождевая ливневка на глубине 0.5 м.'
            },
            {
              id: 'e3_hidden',
              abonent: 'Неучтённый отвод → Под Литером Б (Гараж)',
              time: 'Глубина > 2.2 м',
              detail: 'Бронированный кабель ВБШв и стальная врезка Ø25 от магистрального водопровода уходят строго вертикально вниз под бетонную плиту гаража.',
              telemetry: 'ТЕЛЕМЕТРИЯ: ВЕРТИКАЛЬНЫЙ СПУСК > 2.2 М · ПРЯМАЯ СВЯЗЬ С МАГИСТРАЛЬЮ',
              hotTelemetry: true,
              isForgery: true,
              covered: true,
              requiresScan: true,
              readings: {
                normal: 'Под гараж уходят бронированный кабель и врезка водопровода! Просканируйте контур через ФИЛЬТР ТЕЛЕМЕТРИИ.',
                scan: 'ФИЛЬТР: подтверждён скрытый глубинный ввод (> 2.2 м) под плиту гаража — прямой канал от магистрали, по которой шёл стук!'
              },
              wrongModeMsg: 'Включите ФИЛЬТР ТЕЛЕМЕТРИИ, чтобы зафиксировать глубинный спуск коммуникаций под гараж!',
              callout: 'СКРЫТЫЙ КОНТУР ОБНАРУЖЕН: Бронированный кабель и врезка водопровода уходят под бетон гаража глубже 2.2 м.',
              foundSummary: 'Схема вводов: под гараж глубже 2.2 м уходят бронированный кабель и врезка от магистрального водопровода.'
            }
          ]
        }
      ],
      conclusion: {
        question: 'В 22:15 расход на участке №14 вырос в 4 раза и держится плато; под гаражом, где по БТИ «голый бетон», кабель и водопровод уходят глубже 2 м. Вывод:',
        options: [
          {
            id: 'wood_dry',
            text: 'Кравцов просто сушит доски в гараже на обогревателе, а труба под полом — обычная ливневка.',
            isCorrect: false,
            reason: 'Противоречие: за весь прошлый год таких нагрузок не было, скачок начался в 22:15, а под гараж идёт врезка водопровода > 2.2 м.'
          },
          {
            id: 'bunker',
            text: 'Под старым гаражом участка №14 оборудовано скрытое подземное помещение с питанием и врезкой в водопровод, запущенное в ночь пропажи Алины.',
            isCorrect: true,
            reason: 'Верно: скачок нагрузки в 22:15, вымаранный бетон в БТИ и глубинный ввод под гараж однозначно доказывают наличие тайного бункера.'
          },
          {
            id: 'belyaev_leak',
            text: 'Произошла утечка тока от камер Беляева (участок №12) в зарегистрированный овощной погреб под кухней дома.',
            isCorrect: false,
            reason: 'Противоречие: у Беляева ровный график с мая, а скрытый ввод уходит под гараж, не под кухню.'
          }
        ]
      }
    };
  }

  function buildGenericScenario(config, storyNode) {
    var title = (config && config.title) || (storyNode && storyNode.title) || 'АРХИВНЫЙ АУДИТ';
    var desc = (config && config.desc) || (storyNode && storyNode.desc) || 'Проверьте документы и выявите 3 нестыковки.';
    var subject = (config && config.suspectName) || 'Фигурант проверки';

    if (config && Array.isArray(config.tabs) && config.tabs.length > 0 && config.conclusion) {
      return {
        id: config.id || 'custom_archive_audit',
        title: title,
        stampWin: config.stampWin || 'АУДИТ ПОДТВЕРЖДЁН',
        stampTone: config.stampTone || 'red',
        winSummary: config.winSummary || 'Все расхождения в материалах подтверждены.',
        tabs: config.tabs,
        conclusion: config.conclusion
      };
    }

    return {
      id: 'generic_archive_audit',
      title: title,
      stampWin: 'НЕСТЫКОВКИ ПОДТВЕРЖДЕНЫ',
      stampTone: 'amber',
      winSummary: 'Все три расхождения в архивных материалах зафиксированы.',
      tabs: [
        {
          key: 'doc1',
          label: 'ПРОТОКОЛ',
          kind: 'paper',
          paperKicker: 'МАТЕРИАЛЫ ПРОВЕРКИ // ДОКУМЕНТ №1',
          paperTitle: 'ВЫПИСКА ИЗ ПРОТОКОЛА',
          paperStamp: 'КОПИЯ',
          slip: {
            tone: 'paper',
            kicker: 'СТИКЕР КАНЦЕЛЯРИИ',
            text: '«Документ сверен при передаче в архив. Повторной проверки не требует.»',
            btnText: 'СДВИНУТЬ ⇄'
          },
          items: [
            {
              id: 'g1_ok',
              label: 'Регистрационные данные',
              text: desc,
              isForgery: false,
              covered: false,
              requiresScan: false,
              readings: {
                normal: 'Вводные реквизиты проверки соответствуют описи.',
                scan: 'ПРОСВЕТ: реквизиты подлинные, следов правки нет.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: вводные реквизиты документа не содержат фальсификации.'
            },
            {
              id: 'g1_bad',
              label: 'Ключевая запись протокола',
              hasWhiteout: true,
              beforeWhiteout: 'Отметка исполнителя: ',
              whiteoutText: 'НАРУШЕНИЙ НЕТ',
              hiddenText: 'ДАННЫЕ ИЗМЕНЕНЫ ЗАДНИМ ЧИСЛОМ',
              afterWhiteout: '. Подпись эксперта отсутствует.',
              isForgery: true,
              covered: true,
              requiresScan: true,
              readings: {
                normal: 'Заметен плотный слой корректора в графе вывода. Включите ПРОСВЕТ (ЛАМПА)!',
                scan: 'ПРОСВЕТ: под замазкой проступает исходная запись о внесении изменений задним числом!'
              },
              wrongModeMsg: 'Просветите исправленную графу через ПРОСВЕТ (ЛАМПА)!',
              callout: 'ПОДЛОГ ДОКУМЕНТА: Выявлена правка задним числом под слоем корректора.',
              foundSummary: 'Протокол: обнаружена замазанная правка задним числом без подписи эксперта.'
            }
          ]
        },
        {
          key: 'doc2',
          label: 'ЖУРНАЛ',
          kind: 'paper',
          paperKicker: 'УЧЁТНАЯ ВЕДОМОСТЬ // ДОКУМЕНТ №2',
          paperTitle: 'ЖУРНАЛ УЧЁТА И ДОСТУПА',
          paperStamp: 'АРХИВ',
          slip: {
            tone: 'paper',
            kicker: 'ПРИКОЛОТАЯ СПРАВКА',
            text: '«Сводный реестр закрыт без замечаний по графику.»',
            btnText: 'ОТКРЕПИТЬ ⇄'
          },
          items: [
            {
              id: 'g2_ok',
              label: 'Штатные записи смены',
              text: 'Плановые отметки дежурных с подтверждёнными номерами приказов.',
              isForgery: false,
              covered: false,
              requiresScan: false,
              readings: {
                normal: 'Обычные подтверждённые записи учёта.',
                scan: 'ПРОСВЕТ: подтёртостей нет.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: штатные записи заверены приказами.'
            },
            {
              id: 'g2_bad',
              label: 'Запись: ' + subject,
              hasWhiteout: true,
              beforeWhiteout: 'Статус присутствия: ',
              whiteoutText: 'УСТНОЕ СОГЛАСОВАНИЕ',
              hiddenText: 'ОТСУТСТВОВАЛ БЕЗ ПРИКАЗА',
              afterWhiteout: ' (подтверждающий приказ отсутствует).',
              isForgery: true,
              covered: true,
              requiresScan: true,
              readings: {
                normal: 'Устное согласование без приказа выглядит подозрительно — проверьте на ПРОСВЕТ.',
                scan: 'ПРОСВЕТ: под свежей записью проступает вытертая отметка о несанкционированном отсутствии!'
              },
              wrongModeMsg: 'Проверьте запись через ПРОСВЕТ (ЛАМПА) перед фиксацией!',
              callout: 'ПОДЛОГ ЖУРНАЛА: Статус присутствия переписан задним числом без приказа.',
              foundSummary: 'Журнал: отметка присутствия переписана без официального приказа.'
            }
          ]
        },
        {
          key: 'doc3',
          label: 'ТЕЛЕМЕТРИЯ',
          kind: 'digital',
          svgKind: 'generic_radar',
          radarLeft: 'ЦИФРОВОЙ ЛОГ // СВЕРКА',
          radarRight: 'АНАЛИЗ АНОМАЛИЙ',
          slip: {
            tone: 'digital',
            kicker: 'ФИЛЬТР СВОДКИ',
            text: '«Часть технических записей скрыта стандартным фильтром.»',
            btnText: 'СНЯТЬ ФИЛЬТР ⇄'
          },
          items: [
            {
              id: 'g3_ok',
              abonent: 'ФОНОВЫЙ ТРАФИК #01',
              time: 'Штатно',
              detail: 'Непрерывная фоновая телеметрия без разрывов.',
              telemetry: 'ТЕЛЕМЕТРИЯ: ОТКЛОНЕНИЙ НЕТ',
              hotTelemetry: false,
              isForgery: false,
              covered: false,
              requiresScan: false,
              readings: {
                normal: 'Стабильный фоновый сигнал.',
                scan: 'ФИЛЬТР: аномальных провалов и скачков нет.'
              },
              falseReason: 'ЛОЖНЫЙ СЛЕД: фоновая запись не содержит аномалий.'
            },
            {
              id: 'g3_bad',
              abonent: 'АНОМАЛЬНЫЙ ПАКЕТ #02',
              time: 'Разрыв окна',
              detail: 'Резкое выпадение сигнала и несоответствие официальному отчёту.',
              telemetry: 'ТЕЛЕМЕТРИЯ: ЗАФИКСИРОВАН СКРЫТЫЙ РАЗРЫВ СЕССИИ',
              hotTelemetry: true,
              isForgery: true,
              covered: true,
              requiresScan: true,
              readings: {
                normal: 'Зафиксирован разрыв в ключевое время — включите ФИЛЬТР ТЕЛЕМЕТРИИ.',
                scan: 'ФИЛЬТР: скрытый разрыв подтверждает умышленное сокрытие следов!'
              },
              wrongModeMsg: 'Активируйте ФИЛЬТР ТЕЛЕМЕТРИИ для подтверждения аномалии!',
              callout: 'ТЕХНИЧЕСКАЯ АНОМАЛИЯ: Выявлен скрытый разрыв телеметрии в ключевой интервал.',
              foundSummary: 'Телеметрия: выявлена скрытая техническая аномалия в ключевое время.'
            }
          ]
        }
      ],
      conclusion: {
        question: 'В протоколе, учётном журнале и цифровой телеметрии обнаружены скоординированные искажения. Вывод:',
        options: [
          {
            id: 'typo',
            text: 'Речь идёт о случайных опечатках канцелярии без признаков умысла.',
            isCorrect: false,
            reason: 'Противоречие: следы замазки, подчистка журнала и разрыв телеметрии указывают на умышленный подлог.'
          },
          {
            id: 'confirmed',
            text: 'Материалы проверки были намеренно сфальсифицированы для сокрытия ключевого события.',
            isCorrect: true,
            reason: 'Верно: все три нестыковки подтверждают умышленную фальсификацию.'
          },
          {
            id: 'glitch',
            text: 'Виноват единичный технический сбой базы данных.',
            isCorrect: false,
            reason: 'Противоречие: технический сбой не мог оставить физическую замазку на бумажных бланках.'
          }
        ]
      }
    };
  }

  function resolveScenario(config) {
    var cfg = config || {};
    var caseId = String(window.ACTIVE_CASE_ID || '').toLowerCase();
    var nodeId = '';
    try {
      if (window.GameEngine && typeof window.GameEngine.getState === 'function') {
        var st = window.GameEngine.getState();
        if (st && st.nodeId) {
          nodeId = String(st.nodeId);
        }
      }
    } catch (e) {}

    var storyNode = null;
    try {
      if (window.GameStory && window.GameStory.nodes && nodeId) {
        storyNode = window.GameStory.nodes[nodeId] || null;
      }
    } catch (e) {}

    if (Array.isArray(cfg.tabs) && cfg.tabs.length > 0 && cfg.conclusion) {
      return buildGenericScenario(cfg, storyNode);
    }

    var hintTitle = String(cfg.title || (storyNode && storyNode.title) || '');

    if (
      cfg.preset === 'case412_billing' ||
      (caseId === 'case412' && (nodeId === 'act1_mg_billing' || /биллинг|вышк/i.test(hintTitle)))
    ) {
      return buildCase412BillingScenario(cfg);
    }

    if (
      cfg.preset === 'case412_power' ||
      (caseId === 'case412' && (nodeId === 'act3_mg_archive' || /счётчик|счетчик|коммуникац|бти/i.test(hintTitle)))
    ) {
      return buildCase412PowerScenario(cfg);
    }

    if (
      cfg.preset === 'case409_archive' ||
      caseId === 'case409' ||
      nodeId === 'act3_archive_game' ||
      Boolean(cfg.suspectName)
    ) {
      return buildCase409Scenario(cfg);
    }

    return buildGenericScenario(cfg, storyNode);
  }

  window.GameMinigames.register('archive_audit', function (containerEl, config, callbacks) {
    injectArchiveStyles();

    var cfg = config || {};
    var scenario = resolveScenario(cfg);
    var tabs = scenario.tabs;
    var totalAnomalies = 0;

    for (var ti = 0; ti < tabs.length; ti++) {
      var tabItems = tabs[ti].items || [];
      for (var ii = 0; ii < tabItems.length; ii++) {
        tabItems[ii].found = false;
        if (tabItems[ii].isForgery) {
          totalAnomalies += 1;
        }
      }
    }
    if (totalAnomalies < 1) {
      totalAnomalies = tabs.length;
    }

    var maxErrors =
      typeof cfg.maxErrors === 'number' && cfg.maxErrors > 0 ? cfg.maxErrors : 4;

    var activeTabIndex = 0;
    var activeMode = 'normal';
    var selectedItemId = null;
    var foundCount = 0;
    var errorsCount = 0;
    var phase = 'audit';
    var destroyed = false;
    var timers = [];
    var flashMsg = null;

    var tabStates = {};
    for (var ts = 0; ts < tabs.length; ts++) {
      tabStates[tabs[ts].key] = {
        slipRemoved: !tabs[ts].slip,
        found: false
      };
    }

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

    function clearTimers() {
      for (var i = 0; i < timers.length; i++) {
        window.clearTimeout(timers[i]);
      }
      timers = [];
    }

    function getCurrentTab() {
      return tabs[activeTabIndex] || tabs[0];
    }

    function findItemById(tab, itemId) {
      if (!tab || !itemId) {
        return null;
      }
      var list = tab.items || [];
      for (var i = 0; i < list.length; i++) {
        if (list[i].id === itemId) {
          return list[i];
        }
      }
      return null;
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

    var statsRow = document.createElement('div');
    statsRow.className = 'mga-stats';

    var foundStatEl = document.createElement('span');
    foundStatEl.className = 'mga-stat-found';

    var errStatEl = document.createElement('span');
    errStatEl.className = 'mga-stat-err';

    statsRow.appendChild(foundStatEl);
    statsRow.appendChild(errStatEl);
    headInfo.appendChild(titleEl);
    headInfo.appendChild(statsRow);

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

    var tabsBar = document.createElement('div');
    tabsBar.className = 'mga-tabs';
    if (tabs.length !== 3) {
      tabsBar.style.gridTemplateColumns = 'repeat(' + tabs.length + ', minmax(0, 1fr))';
    }
    var tabButtons = [];

    for (var bIdx = 0; bIdx < tabs.length; bIdx++) {
      (function (idx, tabObj) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'mga-tab';
        btn.innerHTML =
          '<span class="mga-tab-dot"></span><span>' + escapeHtml(tabObj.label) + '</span>';
        btn.addEventListener('click', function () {
          if (phase !== 'audit' || activeTabIndex === idx) {
            return;
          }
          activeTabIndex = idx;
          selectedItemId = null;
          flashMsg = null;
          sfx(tabObj.kind === 'digital' ? 'sfxClick' : 'sfxPaper');
          haptic('light');
          syncHeaderAndTabs();
          syncModeButtons();
          renderActiveDocument();
          syncInspector();
        });
        tabsBar.appendChild(btn);
        tabButtons.push(btn);
      })(bIdx, tabs[bIdx]);
    }

    var body = document.createElement('div');
    body.className = 'mg-body';

    var docScroll = document.createElement('div');
    docScroll.className = 'mga-doc-scroll';
    body.appendChild(docScroll);

    var inspectorEl = document.createElement('div');
    inspectorEl.className = 'mga-inspector';

    var scanInfo = document.createElement('div');
    scanInfo.className = 'mga-scan-info';

    var scanTitle = document.createElement('div');
    scanTitle.className = 'mga-scan-title';

    var scanDesc = document.createElement('div');
    scanDesc.className = 'mga-scan-desc';

    scanInfo.appendChild(scanTitle);
    scanInfo.appendChild(scanDesc);

    var fixBtn = document.createElement('button');
    fixBtn.type = 'button';
    fixBtn.className = 'mg-btn mg-btn-primary mga-fix-btn';
    fixBtn.textContent = 'ЗАФИКСИРОВАТЬ';
    fixBtn.disabled = true;

    inspectorEl.appendChild(scanInfo);
    inspectorEl.appendChild(fixBtn);

    var footer = document.createElement('div');
    footer.className = 'mg-footer';

    var modesBar = document.createElement('div');
    modesBar.className = 'mga-modes';

    var btnNormalMode = document.createElement('button');
    btnNormalMode.type = 'button';
    btnNormalMode.className = 'mga-mode-btn';
    btnNormalMode.textContent = '1. ОСМОТР';
    btnNormalMode.addEventListener('click', function () {
      if (phase !== 'audit' || activeMode === 'normal') {
        return;
      }
      activeMode = 'normal';
      flashMsg = null;
      sfx('sfxClick');
      haptic('light');
      syncModeButtons();
      applyModeClasses();
      syncInspector();
    });

    var btnScanMode = document.createElement('button');
    btnScanMode.type = 'button';
    btnScanMode.className = 'mga-mode-btn';
    btnScanMode.addEventListener('click', function () {
      if (phase !== 'audit' || activeMode === 'scan') {
        return;
      }
      activeMode = 'scan';
      flashMsg = null;
      sfx('sfxClick');
      haptic('light');
      syncModeButtons();
      applyModeClasses();
      syncInspector();
    });

    modesBar.appendChild(btnNormalMode);
    modesBar.appendChild(btnScanMode);
    footer.appendChild(modesBar);

    wrap.appendChild(header);
    wrap.appendChild(tabsBar);
    wrap.appendChild(body);
    wrap.appendChild(inspectorEl);
    wrap.appendChild(footer);
    containerEl.appendChild(wrap);

    function syncHeaderAndTabs() {
      foundStatEl.textContent = 'УЛИКИ: ' + foundCount + ' / ' + totalAnomalies;
      errStatEl.textContent = 'ОШИБКИ: ' + errorsCount + ' / ' + maxErrors;
      errStatEl.classList.toggle('is-warn', errorsCount >= maxErrors - 1);

      for (var i = 0; i < tabButtons.length; i++) {
        var key = tabs[i].key;
        tabButtons[i].classList.toggle('is-active', activeTabIndex === i);
        tabButtons[i].classList.toggle('is-done', Boolean(tabStates[key] && tabStates[key].found));
      }
    }

    function syncModeButtons() {
      var curTab = getCurrentTab();
      btnScanMode.textContent =
        curTab.kind === 'digital' ? '2. ФИЛЬТР ТЕЛЕМЕТРИИ' : '2. ПРОСВЕТ (ЛАМПА)';
      btnNormalMode.className =
        'mga-mode-btn' + (activeMode === 'normal' ? ' is-normal-active' : '');
      btnScanMode.className =
        'mga-mode-btn' + (activeMode === 'scan' ? ' is-scan-active' : '');
    }

    function applyModeClasses() {
      var curTab = getCurrentTab();
      var paperEl = docScroll.querySelector('.mga-paper');
      if (paperEl) {
        paperEl.classList.toggle('is-backlight', activeMode === 'scan');
      }
      var digitalEl = docScroll.querySelector('.mga-digital');
      if (digitalEl) {
        digitalEl.classList.toggle('is-filtered', activeMode === 'scan');
        var svgHolder = digitalEl.querySelector('[data-role="svg-holder"]');
        if (svgHolder && curTab.svgKind) {
          svgHolder.innerHTML = buildSvgGraphic(
            curTab.svgKind,
            activeMode === 'scan',
            Boolean(tabStates[curTab.key].found)
          );
        }
      }
    }

    function setFlash(title, text, tone, ms) {
      flashMsg = { title: title, text: text, tone: tone || 'err' };
      syncInspector();
      addTimer(function () {
        if (flashMsg && flashMsg.title === title && flashMsg.text === text) {
          flashMsg = null;
          syncInspector();
        }
      }, ms || 1750);
    }

    function syncInspector() {
      var curTab = getCurrentTab();
      var tState = tabStates[curTab.key];
      var sel = findItemById(curTab, selectedItemId);

      if (flashMsg) {
        scanTitle.textContent = flashMsg.title;
        scanTitle.className =
          'mga-scan-title ' + (flashMsg.tone === 'ok' ? 'is-ok' : 'is-err');
        scanDesc.textContent = flashMsg.text;
        fixBtn.disabled = !sel || sel.found || phase !== 'audit';
        return;
      }

      if (!sel) {
        scanTitle.className = 'mga-scan-title';
        if (!tState.slipRemoved) {
          scanTitle.textContent = 'СЛОЙ ПЕРЕКРЫТ // ' + curTab.label;
          scanDesc.textContent =
            'Сдвиньте мешающий стикер/накладку в сторону, затем выберите строку для проверки.';
        } else {
          scanTitle.textContent =
            activeMode === 'scan'
              ? curTab.kind === 'digital'
                ? 'ФИЛЬТР ТЕЛЕМЕТРИИ АКТИВЕН'
                : 'ПРОСВЕТ (ЛАМПА) АКТИВЕН'
              : 'ВЫБЕРИТЕ ЗАПИСЬ // ' + curTab.label;
          scanDesc.textContent =
            'Тапните по строке для чтения и нажмите «ЗАФИКСИРОВАТЬ» на доказанном подлоге.';
        }
        fixBtn.disabled = true;
        return;
      }

      if (sel.found) {
        scanTitle.className = 'mga-scan-title is-ok';
        scanTitle.textContent = 'ЗАФИКСИРОВАНО // ' + curTab.label;
        scanDesc.textContent = sel.foundSummary || sel.callout || 'Нестыковка приобщена к делу.';
        fixBtn.disabled = true;
        return;
      }

      scanTitle.className = 'mga-scan-title';
      scanTitle.textContent = sel.label || sel.name || sel.abonent || curTab.label;
      var readingText =
        activeMode === 'scan'
          ? (sel.readings && sel.readings.scan) || ''
          : (sel.readings && sel.readings.normal) || '';
      scanDesc.textContent = readingText || 'Изучите строку и примите решение о фиксации.';
      fixBtn.disabled = false;
    }

    function triggerFailScreen(reason, subMessage) {
      phase = 'fail';
      tabsBar.classList.add('hidden');
      inspectorEl.classList.add('hidden');
      footer.classList.add('hidden');
      body.innerHTML = '';

      var screen = document.createElement('div');
      screen.className = 'mga-stamp-screen';

      var stamp = document.createElement('div');
      stamp.className = 'mga-big-stamp';
      stamp.textContent = 'АУДИТ ПРОВАЛЕН';

      var sub = document.createElement('div');
      sub.className = 'mga-stamp-sub';
      sub.textContent =
        subMessage || 'Превышен лимит ошибочных отметок. Архивная проверка прервана.';

      screen.appendChild(stamp);
      screen.appendChild(sub);
      body.appendChild(screen);

      addTimer(function () {
        callbacks.onFail({
          reason: reason || 'too_many_errors',
          errors: errorsCount,
          scenarioId: scenario.id
        });
      }, 950);
    }

    function showWinStampScreen(deducedId) {
      phase = 'win';
      tabsBar.classList.add('hidden');
      inspectorEl.classList.add('hidden');
      footer.classList.add('hidden');
      body.innerHTML = '';

      sfx('sfxStamp');
      haptic('heavy');

      var screen = document.createElement('div');
      screen.className = 'mga-stamp-screen';

      var stamp = document.createElement('div');
      stamp.className =
        'mga-big-stamp' + (scenario.stampTone === 'amber' ? ' is-amber' : '');
      stamp.textContent = scenario.stampWin;

      var sub = document.createElement('div');
      sub.className = 'mga-stamp-sub';
      sub.textContent = scenario.winSummary;

      var btnAttach = document.createElement('button');
      btnAttach.type = 'button';
      btnAttach.className = 'mg-btn mg-btn-danger mga-complete-btn';
      btnAttach.textContent = 'ПРИОБЩИТЬ К МАТЕРИАЛАМ ДЕЛА';
      btnAttach.addEventListener('click', function () {
        sfx('sfxStamp');
        haptic('success');
        callbacks.onSuccess({
          anomaliesFound: foundCount,
          errors: errorsCount,
          scenarioId: scenario.id,
          deduced: deducedId
        });
      });

      screen.appendChild(stamp);
      screen.appendChild(sub);
      screen.appendChild(btnAttach);
      body.appendChild(screen);
    }

    function openDeductionPhase() {
      if (destroyed) {
        return;
      }
      phase = 'deduce';
      tabsBar.classList.add('hidden');
      inspectorEl.classList.add('hidden');
      footer.classList.add('hidden');
      body.innerHTML = '';

      var wrapP3 = document.createElement('div');
      wrapP3.className = 'mga-phase3-wrap';

      var card = document.createElement('div');
      card.className = 'mga-deduce-card';

      var kicker = document.createElement('div');
      kicker.className = 'mga-deduce-kicker';
      kicker.textContent = 'ФАЗА 3 // КРИМИНАЛИСТИЧЕСКИЙ ВЫВОД';
      card.appendChild(kicker);

      var factsBox = document.createElement('div');
      factsBox.className = 'mga-deduce-facts';
      for (var t = 0; t < tabs.length; t++) {
        var tList = tabs[t].items || [];
        for (var k = 0; k < tList.length; k++) {
          if (tList[k].isForgery) {
            var line = document.createElement('div');
            line.textContent = '• ' + (tList[k].foundSummary || tList[k].callout || tabs[t].label);
            factsBox.appendChild(line);
          }
        }
      }
      card.appendChild(factsBox);

      var qEl = document.createElement('div');
      qEl.className = 'mga-deduce-q';
      qEl.textContent = scenario.conclusion.question;
      card.appendChild(qEl);

      var optsEl = document.createElement('div');
      optsEl.className = 'mga-deduce-opts';

      var fbEl = document.createElement('div');
      fbEl.className = 'mga-deduce-fb';

      var settled = false;
      var opts = scenario.conclusion.options || [];

      for (var oi = 0; oi < opts.length; oi++) {
        (function (opt) {
          var ob = document.createElement('button');
          ob.type = 'button';
          ob.className = 'mga-deduce-opt';
          ob.textContent = opt.text;
          ob.addEventListener('click', function () {
            if (settled || destroyed) {
              return;
            }
            if (opt.isCorrect) {
              settled = true;
              ob.classList.add('is-correct');
              fbEl.className = 'mga-deduce-fb is-ok';
              fbEl.textContent = opt.reason;
              sfx('sfxSuccess');
              haptic('success');
              addTimer(function () {
                showWinStampScreen(opt.id);
              }, 620);
            } else {
              errorsCount += 1;
              syncHeaderAndTabs();
              ob.classList.add('is-wrong');
              fbEl.className = 'mga-deduce-fb';
              fbEl.textContent = opt.reason;
              sfx('sfxAlert');
              haptic('error');
              card.classList.remove('mga-shake');
              void card.offsetWidth;
              card.classList.add('mga-shake');

              if (errorsCount >= maxErrors) {
                settled = true;
                addTimer(function () {
                  triggerFailScreen(
                    'wrong_deduction',
                    'Лимит ошибок исчерпан — криминалистический вывод отклонён.'
                  );
                }, 720);
              }
            }
          });
          optsEl.appendChild(ob);
        })(opts[oi]);
      }

      card.appendChild(optsEl);
      card.appendChild(fbEl);
      wrapP3.appendChild(card);
      body.appendChild(wrapP3);
    }

    function triggerError(title, reason) {
      errorsCount += 1;
      syncHeaderAndTabs();
      sfx('sfxAlert');
      haptic('error');

      inspectorEl.classList.remove('mga-shake');
      void inspectorEl.offsetWidth;
      inspectorEl.classList.add('mga-shake');

      if (errorsCount >= maxErrors) {
        triggerFailScreen('too_many_errors', reason);
        return;
      }

      setFlash(title, reason, 'err', 1900);
    }

    fixBtn.addEventListener('click', function () {
      if (phase !== 'audit') {
        return;
      }
      var curTab = getCurrentTab();
      var sel = findItemById(curTab, selectedItemId);
      if (!sel || sel.found) {
        return;
      }

      if (!sel.isForgery) {
        triggerError(
          'ЛОЖНЫЙ СЛЕД (+1 ОШИБКА)',
          sel.falseReason || 'Нарушений в этой записи не выявлено.'
        );
        return;
      }

      if (sel.requiresScan && activeMode !== 'scan') {
        triggerError(
          'НАРУШЕНА МЕТОДИКА (+1 ОШИБКА)',
          sel.wrongModeMsg || 'Включите режим ПРОСВЕТ / ФИЛЬТР для подтверждения подлога!'
        );
        return;
      }

      sel.found = true;
      tabStates[curTab.key].found = true;
      foundCount += 1;

      sfx('sfxStamp');
      haptic('success');
      syncHeaderAndTabs();
      renderActiveDocument();
      setFlash(
        'УЛИКА ЗАФИКСИРОВАНА',
        sel.foundSummary || sel.callout || 'Нестыковка подтверждена.',
        'ok',
        1400
      );

      if (foundCount >= totalAnomalies) {
        addTimer(function () {
          openDeductionPhase();
        }, 720);
      }
    });

    function selectItem(itemObj) {
      if (phase !== 'audit') {
        return;
      }
      selectedItemId = itemObj.id;
      flashMsg = null;
      sfx('sfxClick');
      haptic('light');

      var rows = docScroll.querySelectorAll('[data-item-id]');
      for (var i = 0; i < rows.length; i++) {
        rows[i].classList.toggle(
          'is-selected',
          rows[i].getAttribute('data-item-id') === selectedItemId
        );
      }
      syncInspector();
    }

    function attachSlipInteraction(slipEl, tabKey, zoneEl, peelBtn) {
      var peeled = false;
      var dragging = false;
      var pointerId = null;
      var startX = 0;
      var startY = 0;

      function doPeel() {
        if (peeled || destroyed) {
          return;
        }
        peeled = true;
        dragging = false;
        tabStates[tabKey].slipRemoved = true;
        slipEl.classList.remove('is-dragging');
        slipEl.classList.add('is-peeled');
        zoneEl.classList.remove('is-covered');
        sfx('sfxPaper');
        haptic('medium');
        setFlash(
          'СЛОЙ СНЯТ',
          'Скрытые записи открыты. Проверьте их и примените ПРОСВЕТ или ФИЛЬТР.',
          'ok',
          1500
        );
        addTimer(function () {
          slipEl.style.display = 'none';
        }, 260);
      }

      if (peelBtn) {
        peelBtn.addEventListener('pointerdown', function (e) {
          e.stopPropagation();
        });
        peelBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          doPeel();
        });
      }

      slipEl.addEventListener('pointerdown', function (e) {
        if (peeled || phase !== 'audit') {
          return;
        }
        pointerId = e.pointerId;
        dragging = true;
        startX = e.clientX;
        startY = e.clientY;
        slipEl.classList.add('is-dragging');
        try {
          slipEl.setPointerCapture(e.pointerId);
        } catch (err) {}
      });

      slipEl.addEventListener('pointermove', function (e) {
        if (!dragging || peeled || e.pointerId !== pointerId) {
          return;
        }
        var dx = e.clientX - startX;
        var dy = e.clientY - startY;
        var rot = clamp(dx * 0.075, -14, 14);
        var op = clamp(1 - Math.abs(dx) / 145, 0.25, 1);
        slipEl.style.transform =
          'translate3d(' + dx + 'px, ' + (dy * 0.22) + 'px, 0) rotate(' + rot + 'deg)';
        slipEl.style.opacity = String(op);

        if (Math.abs(dx) >= 44) {
          doPeel();
        }
      });

      function onEnd(e) {
        if (!dragging || (pointerId !== null && e.pointerId !== pointerId)) {
          return;
        }
        dragging = false;
        pointerId = null;
        if (!peeled) {
          slipEl.classList.remove('is-dragging');
          slipEl.style.transform = '';
          slipEl.style.opacity = '';
        }
      }

      slipEl.addEventListener('pointerup', onEnd);
      slipEl.addEventListener('pointercancel', onEnd);
    }

    function renderItemsWithCover(listEl, tab, buildRowFn) {
      var tState = tabStates[tab.key];
      var items = tab.items || [];
      var coveredItems = [];
      var firstCoveredIdx = -1;

      for (var i = 0; i < items.length; i++) {
        if (items[i].covered) {
          if (firstCoveredIdx === -1) {
            firstCoveredIdx = i;
          }
          coveredItems.push(items[i]);
        }
      }

      var zoneInserted = false;
      for (var j = 0; j < items.length; j++) {
        var it = items[j];
        if (it.covered) {
          if (!zoneInserted) {
            zoneInserted = true;
            var zoneEl = document.createElement('div');
            zoneEl.className =
              'mga-covered-zone' + (!tState.slipRemoved ? ' is-covered' : '');

            for (var c = 0; c < coveredItems.length; c++) {
              buildRowFn(zoneEl, coveredItems[c]);
            }

            if (tab.slip && !tState.slipRemoved) {
              var slipEl = document.createElement('div');
              slipEl.className =
                'mga-slip ' +
                (tab.slip.tone === 'digital' ? 'mga-slip-digital' : 'mga-slip-paper');

              var sHead = document.createElement('div');
              sHead.className = 'mga-slip-head';
              sHead.innerHTML =
                '<span>' + escapeHtml(tab.slip.kicker) + '</span><span>📎</span>';

              var sBody = document.createElement('div');
              sBody.className = 'mga-slip-body';
              sBody.textContent = tab.slip.text;

              var sFoot = document.createElement('div');
              sFoot.className = 'mga-slip-foot';

              var sHint = document.createElement('span');
              sHint.className = 'mga-slip-hint';
              sHint.textContent = 'Потяните в сторону или нажмите →';

              var sBtn = document.createElement('button');
              sBtn.type = 'button';
              sBtn.className = 'mga-slip-btn';
              sBtn.textContent = tab.slip.btnText || 'СДВИНУТЬ ⇄';

              sFoot.appendChild(sHint);
              sFoot.appendChild(sBtn);

              slipEl.appendChild(sHead);
              slipEl.appendChild(sBody);
              slipEl.appendChild(sFoot);

              zoneEl.appendChild(slipEl);
              attachSlipInteraction(slipEl, tab.key, zoneEl, sBtn);
            }

            listEl.appendChild(zoneEl);
          }
          continue;
        }

        buildRowFn(listEl, it);
      }
    }

    function renderPaperTab(tab) {
      var paper = document.createElement('div');
      paper.className = 'mga-paper' + (activeMode === 'scan' ? ' is-backlight' : '');

      var head = document.createElement('div');
      head.className = 'mga-paper-head';
      head.innerHTML =
        '<div class="mga-paper-kicker">' + escapeHtml(tab.paperKicker || '') + '</div>' +
        '<div class="mga-paper-title">' + escapeHtml(tab.paperTitle || tab.label) + '</div>' +
        '<div class="mga-paper-stamp">' + escapeHtml(tab.paperStamp || 'АРХИВ') + '</div>';
      paper.appendChild(head);

      var list = document.createElement('div');
      list.className = 'mga-field-list';

      renderItemsWithCover(list, tab, function (parentEl, field) {
        var row = document.createElement('button');
        row.type = 'button';
        row.className = 'mga-paper-row';
        row.setAttribute('data-item-id', field.id);

        if (field.found) {
          row.classList.add('is-found');
        }
        if (selectedItemId === field.id) {
          row.classList.add('is-selected');
        }

        var lbl = document.createElement('span');
        lbl.className = 'mga-field-label';
        lbl.textContent = field.label || '';
        row.appendChild(lbl);

        if (field.hasWhiteout) {
          var valWrap = document.createElement('span');
          valWrap.appendChild(document.createTextNode(field.beforeWhiteout || ''));

          var wo = document.createElement('span');
          wo.className = 'mga-whiteout';
          wo.textContent = field.whiteoutText || '';
          valWrap.appendChild(wo);

          var hiddenSpan = document.createElement('span');
          hiddenSpan.className = 'mga-whiteout-hidden';
          hiddenSpan.textContent = 'ПРОСВЕТ: ' + (field.hiddenText || '');
          valWrap.appendChild(hiddenSpan);

          valWrap.appendChild(document.createTextNode(field.afterWhiteout || ''));
          row.appendChild(valWrap);
        } else {
          var txt = document.createElement('span');
          txt.textContent = field.text || '';
          row.appendChild(txt);
        }

        row.addEventListener('click', function () {
          selectItem(field);
        });

        parentEl.appendChild(row);

        if (field.found && field.callout) {
          var callout = document.createElement('div');
          callout.className = 'mga-callout';
          callout.textContent = field.callout;
          parentEl.appendChild(callout);
        }
      });

      paper.appendChild(list);
      docScroll.appendChild(paper);
    }

    function renderRosterTab(tab) {
      var paper = document.createElement('div');
      paper.className = 'mga-paper' + (activeMode === 'scan' ? ' is-backlight' : '');

      var head = document.createElement('div');
      head.className = 'mga-paper-head';
      head.innerHTML =
        '<div class="mga-paper-kicker">' + escapeHtml(tab.paperKicker || '') + '</div>' +
        '<div class="mga-paper-title">' + escapeHtml(tab.paperTitle || tab.label) + '</div>' +
        '<div class="mga-paper-stamp">' + escapeHtml(tab.paperStamp || 'КАДРЫ') + '</div>';
      paper.appendChild(head);

      var tHead = document.createElement('div');
      tHead.className = 'mga-roster-head';
      var col0 = document.createElement('span');
      col0.textContent = 'СОТРУДНИК';
      tHead.appendChild(col0);
      var cols = tab.columns || [];
      for (var c = 0; c < cols.length; c++) {
        var colEl = document.createElement('span');
        colEl.textContent = cols[c];
        tHead.appendChild(colEl);
      }
      paper.appendChild(tHead);

      var list = document.createElement('div');
      list.className = 'mga-field-list';

      renderItemsWithCover(list, tab, function (parentEl, rObj) {
        var row = document.createElement('button');
        row.type = 'button';
        row.className = 'mga-roster-row';
        row.setAttribute('data-item-id', rObj.id);

        if (rObj.found) {
          row.classList.add('is-found');
        }
        if (selectedItemId === rObj.id) {
          row.classList.add('is-selected');
        }

        var cellsRow = document.createElement('div');
        cellsRow.className = 'mga-roster-cells';

        var nameEl = document.createElement('span');
        nameEl.className = 'mga-roster-name';
        nameEl.textContent = rObj.name || '';
        cellsRow.appendChild(nameEl);

        var rCells = rObj.cells || [];
        var gCells = rObj.ghostCells || [];
        for (var k = 0; k < rCells.length; k++) {
          var cellWrap = document.createElement('span');
          cellWrap.className = 'mga-roster-cell';

          var mainSpan = document.createElement('span');
          mainSpan.textContent = rCells[k];
          cellWrap.appendChild(mainSpan);

          if (gCells[k]) {
            var ghostSpan = document.createElement('span');
            ghostSpan.className = 'mga-cell-ghost';
            ghostSpan.textContent = '[' + gCells[k] + ']';
            cellWrap.appendChild(ghostSpan);
          }

          cellsRow.appendChild(cellWrap);
        }

        var noteEl = document.createElement('div');
        noteEl.className = 'mga-roster-note';
        noteEl.textContent = rObj.note || '';

        row.appendChild(cellsRow);
        row.appendChild(noteEl);

        row.addEventListener('click', function () {
          selectItem(rObj);
        });

        parentEl.appendChild(row);

        if (rObj.found && rObj.callout) {
          var callout = document.createElement('div');
          callout.className = 'mga-callout';
          callout.textContent = rObj.callout;
          parentEl.appendChild(callout);
        }
      });

      paper.appendChild(list);
      docScroll.appendChild(paper);
    }

    function renderDigitalTab(tab) {
      var dWrap = document.createElement('div');
      dWrap.className = 'mga-digital' + (activeMode === 'scan' ? ' is-filtered' : '');

      var radarCard = document.createElement('div');
      radarCard.className = 'mga-radar-card';

      var meta = document.createElement('div');
      meta.className = 'mga-radar-meta';
      var mLeft = document.createElement('span');
      mLeft.textContent = tab.radarLeft || tab.label;
      var mRight = document.createElement('span');
      mRight.textContent = tab.radarRight || 'СВЕРКА';
      meta.appendChild(mLeft);
      meta.appendChild(mRight);

      var svgHolder = document.createElement('div');
      svgHolder.setAttribute('data-role', 'svg-holder');
      svgHolder.innerHTML = buildSvgGraphic(
        tab.svgKind,
        activeMode === 'scan',
        Boolean(tabStates[tab.key].found)
      );

      radarCard.appendChild(meta);
      radarCard.appendChild(svgHolder);
      dWrap.appendChild(radarCard);

      var list = document.createElement('div');
      list.className = 'mga-log-list';

      renderItemsWithCover(list, tab, function (parentEl, entry) {
        var row = document.createElement('button');
        row.type = 'button';
        row.className = 'mga-log-row';
        row.setAttribute('data-item-id', entry.id);

        if (entry.found) {
          row.classList.add('is-found');
        }
        if (selectedItemId === entry.id) {
          row.classList.add('is-selected');
        }

        var top = document.createElement('div');
        top.className = 'mga-log-top';

        var idEl = document.createElement('span');
        idEl.className = 'mga-log-id';
        idEl.textContent = entry.abonent || '';

        var timeEl = document.createElement('span');
        timeEl.textContent = entry.time || '';

        top.appendChild(idEl);
        top.appendChild(timeEl);

        var detailEl = document.createElement('div');
        detailEl.textContent = entry.detail || '';

        row.appendChild(top);
        row.appendChild(detailEl);

        if (entry.telemetry) {
          var telEl = document.createElement('div');
          telEl.className =
            'mga-log-telemetry' + (entry.hotTelemetry ? ' is-hot' : '');
          telEl.textContent = entry.telemetry;
          row.appendChild(telEl);
        }

        row.addEventListener('click', function () {
          selectItem(entry);
        });

        parentEl.appendChild(row);

        if (entry.found && entry.callout) {
          var callout = document.createElement('div');
          callout.className = 'mga-callout';
          callout.textContent = entry.callout;
          parentEl.appendChild(callout);
        }
      });

      dWrap.appendChild(list);
      docScroll.appendChild(dWrap);
    }

    function renderActiveDocument() {
      var curTab = getCurrentTab();
      docScroll.innerHTML = '';
      docScroll.scrollTop = 0;

      if (curTab.kind === 'roster') {
        renderRosterTab(curTab);
      } else if (curTab.kind === 'digital') {
        renderDigitalTab(curTab);
      } else {
        renderPaperTab(curTab);
      }
    }

    syncHeaderAndTabs();
    syncModeButtons();
    renderActiveDocument();
    syncInspector();

    return function cleanup() {
      destroyed = true;
      clearTimers();
    };
  });
})();
