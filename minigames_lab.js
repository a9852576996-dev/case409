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
     MINIGAME 1: 'fingerprint' (Multi-scenario case409 + case412 + 3-phase)
     ========================================================================== */

  var FP_EXTRA_STYLE_ID = 'minigames-lab-fp-extra';

  var FP_EXTRA_CSS =
    '.mgl-fp-meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }' +
    '.mgl-fp-err { font-family: "IBM Plex Mono", monospace; font-size: 10px; font-weight: 600; color: #9ba0ab; }' +
    '.mgl-fp-err.is-warn { color: #f87171; }' +
    '.mgl-fp-deduce { width: 100%; max-width: 350px; background: #14171f; border: 1px solid #353b4a; border-top: 3px solid var(--case-accent, #c98a2e); border-radius: 7px; padding: 12px; display: flex; flex-direction: column; gap: 8px; text-align: left; }' +
    '.mgl-fp-dkicker { font-family: "IBM Plex Mono", monospace; font-size: 9.8px; font-weight: 700; color: var(--case-accent, #c98a2e); text-transform: uppercase; }' +
    '.mgl-fp-dfacts { padding: 7px 8px; background: #0d1016; border: 1px solid #262b36; border-radius: 5px; font-family: "IBM Plex Mono", monospace; font-size: 9.8px; line-height: 1.4; color: #c2cad8; display: flex; flex-direction: column; gap: 3px; }' +
    '.mgl-fp-dq { font-size: 12.4px; line-height: 1.38; color: #f3efe6; font-weight: 500; }' +
    '.mgl-fp-dopts { display: flex; flex-direction: column; gap: 6px; }' +
    '.mgl-fp-dopt { width: 100%; text-align: left; padding: 8px 9px; background: #1b202b; border: 1px solid #353d4e; border-radius: 5px; color: #e4e0d8; font-size: 11.6px; line-height: 1.34; cursor: pointer; }' +
    '.mgl-fp-dopt.is-wrong { border-color: #ef4444; background: rgba(153, 27, 27, 0.25); color: #fecaca; }' +
    '.mgl-fp-dopt.is-correct { border-color: #22c55e; background: rgba(34, 197, 94, 0.2); color: #bbf7d0; }' +
    '.mgl-fp-dfb { font-family: "IBM Plex Mono", monospace; font-size: 10.2px; line-height: 1.35; min-height: 15px; color: #fca5a5; }' +
    '.mgl-fp-dfb.is-ok { color: #86efac; }';

  function injectFpExtraStyles() {
    if (document.getElementById(FP_EXTRA_STYLE_ID)) return;
    var el = document.createElement('style');
    el.id = FP_EXTRA_STYLE_ID;
    el.textContent = FP_EXTRA_CSS;
    document.head.appendChild(el);
  }

  var MINUTIAE_POINTS = [
    { id: 0, nx: -0.44, ny: -0.46, type: 'bifurcation' },
    { id: 1, nx: 0.36, ny: -0.34, type: 'ending' },
    { id: 2, nx: -0.14, ny: 0.08, type: 'bifurcation' },
    { id: 3, nx: 0.32, ny: 0.44, type: 'ending' }
  ];

  var NOISE_DECOY_POINTS = [
    { id: 100, nx: -0.52, ny: 0.36, reason: 'ЛОЖНАЯ ТОЧКА (+1 ОШИБКА): это микроцарапина/пылинка на поверхности, а не папиллярная минуция!' },
    { id: 101, nx: 0.50, ny: -0.02, reason: 'ЛОЖНАЯ ТОЧКА (+1 ОШИБКА): случайный разрыв порошка на поре — на эталоне этой точки нет!' }
  ];

  function resolveFpScenario(config) {
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
    if (cfg.preset === 'case412' || caseId === 'case412' || nodeId === 'act4_mg_fingerprint' || /карабин|колодц/i.test(hint)) {
      return {
        id: 'case412_act4_fp',
        title: cfg.title || 'ДАКТИЛОСКОПИЯ КАРАБИНА // №412',
        surfaceStyle: 'brass',
        hasScar: true,
        surface1Label: 'ОБЪЕКТ: ЛАТУННЫЙ КАРАБИН РЮКЗАКА (ИЗ КОЛОДЦА)',
        surface2Label: 'ЗАПАСНОЙ УЧАСТОК: БОКОВАЯ ПЛАСТИНА ПРЯЖКИ (#2)',
        backupBtnText: 'ПЕРЕЙТИ НА ЗАПАСНУЮ ПЛАСТИНУ ПРЯЖКИ',
        phase1Tag1: 'ФАЗА 1: ОПЫЛЕНИЕ (ЛАТУННЫЙ КАРАБИН)',
        phase1Tag2: 'ФАЗА 1: ЗАПАСНАЯ ПЛАСТИНА ПРЯЖКИ',
        rightPanelTitle: 'ЭТАЛОН (КРАВЦОВ)',
        scanTitle: 'СВЕРКА С ФОТО РУКИ КРАВЦОВА...',
        scanSub: 'Сопоставление 4 минуций и глубокого косого шрама от стамески на правом большом пальце...',
        resultStamp: 'СОВПАДЕНИЕ: КРАВЦОВ В.И.',
        resultStat: 'ОСОБАЯ ПРИМЕТА: СТАРЫЙ КОСОЙ ШРАМ ОТ СТАМЕСКИ',
        resultAlert: 'УСТАНОВЛЕНО СОВПАДЕНИЕ: ПРАВЫЙ БОЛЬШОЙ ПАЛЕЦ КРАВЦОВА В.И. НА ЛАТУННОЙ ЗАСТЁЖКЕ РЮКЗАКА АЛИНЫ!',
        facts: [
          '• Носитель: латунный карабин рюкзака Алины, поднятый из колодца',
          '• Узор: большой палец правой руки + глубокий старый косой рубец от стамески',
          '• Сличение: 4/4 минуций и траектория шрама полностью совпали с рукой Кравцова'
        ],
        conclusion: {
          question: 'На латунной застёжке рюкзака Алины из заброшенного колодца проявлен чёткий палец с косым шрамом от стамески. Вывод:',
          options: [
            {
              id: 'artem_fp',
              text: 'Рюкзак в колодец бросил Артём (Рыжий), порезавшись о край пряжки.',
              isCorrect: false,
              reason: 'Противоречие: это старый белый рубец от стамески, идентичный шраму на правой руке Кравцова.'
            },
            {
              id: 'kravtsov_glove',
              text: 'У колодца в 4 утра Кравцов В.И. на секунду снял перчатку, чтобы оторвать заклинившую пряжку — и оставил собственную подпись.',
              isCorrect: true,
              reason: 'Верно: старый шрам от стамески и 4 минуции напрямую связывают Кравцова с вещами Алины.'
            },
            {
              id: 'accident_drop',
              text: 'Алина сама уронила рюкзак в колодец, а отпечаток принадлежит случайному прохожему.',
              isCorrect: false,
              reason: 'Противоречие: совпадение 4 минуций и уникального рубца исключает случайного человека.'
            }
          ]
        }
      };
    }

    if (cfg.preset === 'case409' || caseId === 'case409' || nodeId === 'act2_fp_game') {
      return {
        id: 'case409_act2_fp',
        title: cfg.title || 'ДАКТИЛОСКОПИЯ // ДЕЛО №409',
        surfaceStyle: 'glass',
        hasScar: false,
        surface1Label: 'ОБЪЕКТ: СТЕКЛЯННЫЙ ФЛАКОН АНТИСЕПТИКА (#1)',
        surface2Label: 'ЗАПАСНОЙ УЧАСТОК: РУКОЯТЬ НОЖА (#2)',
        backupBtnText: 'ПЕРЕЙТИ НА ЗАПАСНОЙ УЧАСТОК (РУКОЯТЬ НОЖА)',
        phase1Tag1: 'ФАЗА 1: ОПЫЛЕНИЕ (ФЛАКОН)',
        phase1Tag2: 'ФАЗА 1: ЗАПАСНОЙ УЧАСТОК (НОЖ)',
        rightPanelTitle: 'ЭТАЛОН БД',
        scanTitle: 'ПРОБИВ ПО АДИС "ПАПИЛОН"...',
        scanSub: 'Сравнение 4 опорных минуций с массивом Громова В.И. и ведомственными картотеками...',
        resultStamp: 'ДОПУСК УРОВНЯ "С"',
        resultStat: 'СОВПАДЕНИЕ С ГРОМОВЫМ В.И.: 0%',
        resultAlert: 'ВНИМАНИЕ: НАЙДЕНО СОВПАДЕНИЕ В ЗАКРЫТОМ РЕЕСТРЕ МВД — ДОПУСК УРОВНЯ "С" (СОТРУДНИКИ)',
        facts: [
          '• Снятый след: 4/4 опорных минуций ульнарной петли подтверждены без шумов',
          '• Сверка с подозреваемым Громовым В.И.: 0% совпадения',
          '• АДИС «Папилон»: сработала блокировка закрытого реестра МВД (допуск «С»)'
        ],
        conclusion: {
          question: 'АДИС «Папилон» показал 0% совпадения с Громовым, но заблокировал карточку в закрытом реестре МВД (допуск «С»). Вывод:',
          options: [
            {
              id: 'gromov_smudge',
              text: 'След принадлежит Громову В.И., просто база дала сбой из-за дождя.',
              isCorrect: false,
              reason: 'Противоречие: все 4 минуции чётко совпали, но не с Громовым (0%), а с закрытым реестром.'
            },
            {
              id: 'mvd_insider',
              text: 'Флакон антисептика на месте убийства держал не Громов, а действующий сотрудник МВД с допуском уровня «С».',
              isCorrect: true,
              reason: 'Верно: блокировка реестра допуска «С» доказывает причастность своего сотрудника.'
            },
            {
              id: 'victim_fp',
              text: 'Это отпечаток самой потерпевшей Алины, случайно попавший в базу МВД.',
              isCorrect: false,
              reason: 'Противоречие: потерпевшая не является сотрудником МВД с допуском уровня «С».'
            }
          ]
        }
      };
    }

    return {
      id: 'generic_fp',
      title: cfg.title || 'ДАКТИЛОСКОПИЯ',
      surfaceStyle: 'glass',
      hasScar: false,
      surface1Label: 'ОБЪЕКТ: ПОВЕРХНОСТЬ ВЕЩДОКА (#1)',
      surface2Label: 'ЗАПАСНОЙ УЧАСТОК ВЕЩДОКА (#2)',
      backupBtnText: 'ПЕРЕЙТИ НА ЗАПАСНОЙ УЧАСТОК (#2)',
      phase1Tag1: 'ФАЗА 1: МАГНИТНОЕ ОПЫЛЕНИЕ',
      phase1Tag2: 'ФАЗА 1: ЗАПАСНОЙ УЧАСТОК',
      rightPanelTitle: 'ЭТАЛОН БД',
      scanTitle: 'ПОИСК ПО БАЗЕ АДИС...',
      scanSub: 'Сопоставление 4 опорных минуций с базой данных...',
      resultStamp: 'СЛЕД ИДЕНТИФИЦИРОВАН',
      resultStat: 'СОВПАДЕНИЕ ПО 4 ОПОРНЫМ МИНУЦИЯМ: 100%',
      resultAlert: 'ИДЕНТИФИКАЦИЯ ПОДТВЕРЖДЕНА: ПРОТОКОЛ ГОТОВ К ПРИОБЩЕНИЮ.',
      facts: [
        '• Потожировой след проявлен магнитной кистью без смазывания',
        '• Отсеяны ложные шумовые точки, подтверждены 4/4 минуций',
        '• АДИС подтвердила совпадение с контрольной карточкой'
      ],
      conclusion: cfg.conclusion || {
        question: 'Проявленный след совпал с эталоном по 4 характерным минуциям. Вывод:',
        options: [
          { id: 'noise', text: 'Отпечаток непригоден из-за шумов.', isCorrect: false, reason: 'Противоречие: шумовые дефекты отсеяны, все 4 минуции подтверждены.' },
          { id: 'ok', text: 'Идентичность потожирового следа на вещдоке и эталона доказана.', isCorrect: true, reason: 'Верно: протокол дактилоскопии подтверждён.' },
          { id: 'miss', text: 'Совпадения нет.', isCorrect: false, reason: 'Противоречие: все 4 парные минуции совпали.' }
        ]
      }
    };
  }

  function drawFingerprintPattern(ctx, cx, cy, rx, ry, options) {
    var opts = options || {};
    var strokeColor = opts.strokeColor || 'rgba(218, 224, 235, 0.88)';
    var lineWidth = opts.lineWidth || 1.65;
    var tilt = typeof opts.tilt === 'number' ? opts.tilt : -0.06;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(tilt);

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

    for (var i = 1; i <= ridgeCount; i++) {
      var t = i / ridgeCount;
      var lRx = rx * (0.09 + t * 0.96);
      var lRy = ry * (0.14 + t * 0.92);
      var segments = 46;
      var drawing = false;
      ctx.beginPath();
      for (var s = 0; s <= segments; s++) {
        var frac = s / segments;
        var ang = -Math.PI * 1.18 + frac * Math.PI * 1.72;
        var wave = Math.sin(ang * 3 + i * 0.7) * (rx * 0.015);
        var px = coreX + Math.cos(ang) * (lRx + wave);
        var py = coreY + Math.sin(ang) * (lRy + wave);
        if (ang > 0.1) { px += (ang - 0.1) * rx * 0.18; py += (ang - 0.1) * ry * 0.14; }
        if (ang < -Math.PI * 0.85) { px -= (-Math.PI * 0.85 - ang) * rx * 0.16; py += (-Math.PI * 0.85 - ang) * ry * 0.22; }
        var nearBreak1 = Math.hypot(px - MINUTIAE_POINTS[1].nx * rx, py - MINUTIAE_POINTS[1].ny * ry) < rx * 0.085 && i % 3 === 1;
        var nearBreak3 = Math.hypot(px - MINUTIAE_POINTS[3].nx * rx, py - MINUTIAE_POINTS[3].ny * ry) < rx * 0.085 && i % 2 === 0;
        if (nearBreak1 || nearBreak3) { drawing = false; continue; }
        if (!drawing) { ctx.moveTo(px, py); drawing = true; } else { ctx.lineTo(px, py); }
      }
      ctx.stroke();
    }

    for (var b = 0; b < 5; b++) {
      var by = ry * (0.58 + b * 0.11);
      ctx.beginPath();
      ctx.moveTo(-rx * 1.05, by + ry * 0.08);
      ctx.quadraticCurveTo(0, by - ry * (0.12 - b * 0.015), rx * 1.05, by + ry * 0.06);
      ctx.stroke();
    }

    ctx.lineWidth = lineWidth * 1.1;
    for (var m = 0; m < MINUTIAE_POINTS.length; m++) {
      var pt = MINUTIAE_POINTS[m];
      var mx = pt.nx * rx, my = pt.ny * ry;
      if (pt.type === 'bifurcation') {
        ctx.beginPath();
        ctx.moveTo(mx - rx * 0.1, my + ry * 0.05); ctx.lineTo(mx, my); ctx.lineTo(mx + rx * 0.1, my - ry * 0.06);
        ctx.moveTo(mx, my); ctx.lineTo(mx + rx * 0.11, my + ry * 0.04);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(mx - rx * 0.12, my - ry * 0.04);
        ctx.quadraticCurveTo(mx - rx * 0.04, my - ry * 0.01, mx, my);
        ctx.stroke();
      }
    }

    // Diagonal white chisel scar for case412 (Kravtsov's thumb!)
    if (opts.hasScar) {
      ctx.save();
      ctx.strokeStyle = 'rgba(10, 12, 16, 0.92)';
      ctx.lineWidth = 6.2;
      ctx.beginPath();
      ctx.moveTo(-rx * 0.78, ry * 0.44);
      ctx.quadraticCurveTo(-rx * 0.12, ry * 0.08, rx * 0.68, -ry * 0.42);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(248, 250, 252, 0.85)';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(-rx * 0.76, ry * 0.44);
      ctx.quadraticCurveTo(-rx * 0.12, ry * 0.08, rx * 0.66, -ry * 0.42);
      ctx.stroke();
      ctx.restore();
    }

    if (opts.noisy) {
      var rand = createPrng(904);
      ctx.fillStyle = opts.poreColor || 'rgba(12, 14, 18, 0.35)';
      for (var p = 0; p < 75; p++) {
        ctx.beginPath();
        ctx.arc((rand() - 0.5) * rx * 1.9, (rand() - 0.5) * ry * 1.9, 0.7 + rand() * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  function getMinutiaCanvasPos(cx, cy, rx, ry, tilt, pt) {
    var lx = pt.nx * rx, ly = pt.ny * ry;
    var cos = Math.cos(tilt), sin = Math.sin(tilt);
    return { x: cx + lx * cos - ly * sin, y: cy + lx * sin + ly * cos };
  }

  function drawSurfaceBackground(bCtx, w, h, surfaceIndex, scenario) {
    var rand = createPrng(surfaceIndex === 0 ? 4091 : 4092);
    var bg = bCtx.createRadialGradient(w * 0.5, h * 0.45, 20, w * 0.5, h * 0.5, Math.max(w, h) * 0.75);
    bg.addColorStop(0, '#161920'); bg.addColorStop(1, '#08090c');
    bCtx.fillStyle = bg; bCtx.fillRect(0, 0, w, h);

    bCtx.strokeStyle = 'rgba(212, 202, 180, 0.035)'; bCtx.lineWidth = 1;
    for (var gx = 0; gx < w; gx += 20) { bCtx.beginPath(); bCtx.moveTo(gx, 0); bCtx.lineTo(gx, h); bCtx.stroke(); }
    for (var gy = 0; gy < h; gy += 20) { bCtx.beginPath(); bCtx.moveTo(0, gy); bCtx.lineTo(w, gy); bCtx.stroke(); }

    var isBrass = scenario && scenario.surfaceStyle === 'brass';
    var objW = Math.min(w * 0.68, 224);
    var objH = Math.min(h * 0.74, 326);
    var ox = (w - objW) * 0.5;
    var oy = (h - objH) * 0.54;

    if (isBrass) {
      // Brass backpack buckle/carabiner plate from the well (case412)
      var ringR = objW * 0.24;
      bCtx.strokeStyle = '#9d742c'; bCtx.lineWidth = 10;
      bCtx.beginPath(); bCtx.arc(w * 0.5, Math.max(24, oy - 4), ringR, Math.PI, 0); bCtx.stroke();

      var brassGrad = bCtx.createLinearGradient(ox, oy, ox + objW, oy + objH);
      if (surfaceIndex === 0) {
        brassGrad.addColorStop(0, '#4d3610'); brassGrad.addColorStop(0.28, '#b58734');
        brassGrad.addColorStop(0.55, '#8a621c'); brassGrad.addColorStop(0.85, '#c79b44'); brassGrad.addColorStop(1, '#3d2a0b');
      } else {
        brassGrad.addColorStop(0, '#3a2b14'); brassGrad.addColorStop(0.45, '#7e5d28'); brassGrad.addColorStop(1, '#2a1e0d');
      }
      bCtx.fillStyle = brassGrad;
      bCtx.fillRect(ox, oy, objW, objH);
      bCtx.strokeStyle = 'rgba(253, 224, 152, 0.38)'; bCtx.lineWidth = 2;
      bCtx.strokeRect(ox, oy, objW, objH);

      // Rivets on brass clasp
      var rivets = [[ox + 22, oy + 24], [ox + objW - 22, oy + 24], [ox + 22, oy + objH - 24], [ox + objW - 22, oy + objH - 24]];
      for (var rv = 0; rv < rivets.length; rv++) {
        bCtx.fillStyle = '#473210'; bCtx.beginPath(); bCtx.arc(rivets[rv][0], rivets[rv][1], 7, 0, Math.PI * 2); bCtx.fill();
        bCtx.strokeStyle = 'rgba(253, 224, 152, 0.45)'; bCtx.lineWidth = 1.2; bCtx.stroke();
      }
    } else if (surfaceIndex === 0) {
      // Glass antiseptic vial (case409)
      var neckW = objW * 0.44;
      bCtx.fillStyle = '#202630';
      bCtx.fillRect(w * 0.5 - neckW * 0.5, Math.max(8, oy - 24), neckW, 28);
      var glassGrad = bCtx.createLinearGradient(ox, 0, ox + objW, 0);
      glassGrad.addColorStop(0, '#0d1115'); glassGrad.addColorStop(0.18, '#2b3744');
      glassGrad.addColorStop(0.38, '#171f26'); glassGrad.addColorStop(0.82, '#1c252f'); glassGrad.addColorStop(1, '#0a0d10');
      bCtx.fillStyle = glassGrad;
      bCtx.fillRect(ox, oy, objW, objH);
      bCtx.strokeStyle = 'rgba(130, 165, 195, 0.28)'; bCtx.lineWidth = 1.5;
      bCtx.strokeRect(ox, oy, objW, objH);
    } else {
      // Backup knife handle (case409)
      var hw = Math.min(w * 0.56, 192), hx = (w - hw) * 0.5;
      bCtx.fillStyle = '#4a5260';
      bCtx.fillRect(hx - 14, Math.max(8, oy - 14), hw + 28, 16);
      var gripGrad = bCtx.createLinearGradient(hx, 0, hx + hw, 0);
      gripGrad.addColorStop(0, '#101215'); gripGrad.addColorStop(0.5, '#252830'); gripGrad.addColorStop(1, '#0e1013');
      bCtx.fillStyle = gripGrad; bCtx.fillRect(hx, oy, hw, objH);
      bCtx.strokeStyle = 'rgba(170, 178, 192, 0.25)'; bCtx.lineWidth = 1.5; bCtx.strokeRect(hx, oy, hw, objH);
      for (var d = 0; d < 180; d++) {
        bCtx.fillStyle = rand() > 0.5 ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.16)';
        bCtx.fillRect(hx + rand() * hw, oy + rand() * objH, 2, 2);
      }
    }

    bCtx.fillStyle = 'rgba(212, 202, 180, 0.45)';
    bCtx.font = '600 9.5px "IBM Plex Mono", monospace';
    bCtx.textAlign = 'center';
    var lbl = surfaceIndex === 0 ? (scenario ? scenario.surface1Label : '') : (scenario ? scenario.surface2Label : '');
    bCtx.fillText(lbl, w * 0.5, h - 10);
  }


  window.GameMinigames.register('fingerprint', function (containerEl, config, callbacks) {
    injectLabStyles();
    injectFpExtraStyles();

    var cfg = config || {};
    var scenario = resolveFpScenario(cfg);
    var maxErrors = typeof cfg.maxErrors === 'number' && cfg.maxErrors > 0 ? cfg.maxErrors : 4;

    var phase = 'dusting'; // 'dusting' | 'smudged' | 'transition' | 'matching' | 'scanning' | 'deduce' | 'result' | 'fail'
    var surfaceIndex = 0;
    var integrity = 100;
    var revealPct = 0;
    var errorsCount = 0;
    var destroyed = false;

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
    metaRow.className = 'mgl-fp-meta';

    var counterEl = document.createElement('span');
    counterEl.className = 'mg-counter';
    counterEl.textContent = scenario.phase1Tag1;

    var errEl = document.createElement('span');
    errEl.className = 'mgl-fp-err';
    errEl.textContent = 'ОШИБКИ: 0 / ' + maxErrors;

    metaRow.appendChild(counterEl);
    metaRow.appendChild(errEl);
    headInfo.appendChild(titleEl);
    headInfo.appendChild(metaRow);

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
    footerNote.textContent = 'Плавно водите магнитной кистью. Резкие рывки смазывают порошок.';
    footer.appendChild(footerNote);

    wrap.appendChild(header);
    wrap.appendChild(body);
    wrap.appendChild(footer);
    containerEl.appendChild(wrap);

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

    var cssW = 320, cssH = 420, dpr = 1;
    var fpCx = 160, fpCy = 220, fpRx = 62, fpRy = 94;

    var GRID_COLS = 12, GRID_ROWS = 16;
    var gridCells = [], totalActiveCells = 0;

    var pointerDown = false, activePointerId = null;
    var brushX = 0, brushY = 0, lastX = 0, lastY = 0, lastMoveTime = 0;
    var smoothSpeed = 0, lastErrorHaptic = 0;
    var particles = [];

    var matchedPairs = [false, false, false, false];
    var matchedCount = 0;
    var selectedSide = null;
    var selectedId = -1;
    var wrongFlash = { active: false, side: null, id: -1, until: 0 };

    var rafId = null, warnTimer = null, phaseTimer = null, scanTimer = null, resizeObserver = null;
    var lastFrameTime = performance.now();

    function syncErrHeader() {
      errEl.textContent = 'ОШИБКИ: ' + errorsCount + ' / ' + maxErrors;
      errEl.classList.toggle('is-warn', errorsCount >= maxErrors - 1);
    }

    function showBanner(msg, isOk, durationMs) {
      if (warnTimer !== null) { window.clearTimeout(warnTimer); warnTimer = null; }
      warnFlashEl.textContent = msg;
      warnFlashEl.classList.toggle('is-ok', Boolean(isOk));
      warnFlashEl.classList.add('is-visible');
      warnTimer = window.setTimeout(function () {
        warnTimer = null;
        warnFlashEl.classList.remove('is-visible');
      }, durationMs || 1100);
    }

    function updateDustMeters() {
      var rPct = Math.min(100, Math.round(revealPct));
      var iPct = Math.max(0, Math.round(integrity));
      revealValEl.textContent = rPct + '%';
      revealBarEl.style.width = rPct + '%';
      intValEl.textContent = iPct + '%';
      intBarEl.style.width = iPct + '%';
      intBarEl.classList.remove('is-integrity', 'is-warn', 'is-crit');
      intBarEl.classList.add(iPct <= 35 ? 'is-crit' : iPct <= 65 ? 'is-warn' : 'is-integrity');
    }

    function initCoverageGrid() {
      gridCells = [];
      totalActiveCells = 0;
      for (var r = 0; r < GRID_ROWS; r++) {
        for (var c = 0; c < GRID_COLS; c++) {
          var nx = ((c + 0.5) / GRID_COLS) * 2 - 1;
          var ny = ((r + 0.5) / GRID_ROWS) * 2 - 1;
          var inside = nx * nx + ny * ny <= 0.88;
          if (inside) totalActiveCells += 1;
          gridCells.push({ nx: nx, ny: ny, active: inside, val: 0 });
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
      drawSurfaceBackground(bgCtx, cssW, cssH, surfaceIndex, scenario);

      printCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      printCtx.clearRect(0, 0, cssW, cssH);
      drawFingerprintPattern(printCtx, fpCx, fpCy, fpRx, fpRy, {
        strokeColor: scenario.surfaceStyle === 'brass' ? 'rgba(235, 240, 248, 0.94)' : 'rgba(218, 226, 236, 0.92)',
        lineWidth: 1.7,
        tilt: -0.08,
        noisy: true,
        hasScar: scenario.hasScar
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
      counterEl.textContent = surfaceIndex === 0 ? scenario.phase1Tag1 : scenario.phase1Tag2;
      footerNote.textContent = 'Плавно водите магнитной кистью. Слишком быстрые движения смажут след.';
    }

    function resizeCanvas() {
      if (destroyed) return;
      var rect = body.getBoundingClientRect();
      var nextW = Math.max(180, Math.floor(rect.width));
      var nextH = Math.max(220, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      cssW = nextW; cssH = nextH;
      var physW = Math.floor(cssW * dpr), physH = Math.floor(cssH * dpr);
      if (canvas.width !== physW || canvas.height !== physH) {
        canvas.width = physW; canvas.height = physH;
        bgCanvas.width = physW; bgCanvas.height = physH;
        printCanvas.width = physW; printCanvas.height = physH;
        revealCanvas.width = physW; revealCanvas.height = physH;
        smudgeCanvas.width = physW; smudgeCanvas.height = physH;
        compCanvas.width = physW; compCanvas.height = physH;
        rebuildDustCanvases();
      }
    }

    function getPhase2Layout() {
      var padTop = 34, padBot = 14, halfW = cssW * 0.5, availH = cssH - padTop - padBot;
      return {
        padTop: padTop, halfW: halfW, leftCx: halfW * 0.5, rightCx: halfW * 1.5,
        cy: padTop + availH * 0.52, rx: Math.min(halfW * 0.36, 58), ry: Math.min(availH * 0.36, 94),
        leftTilt: -0.07, rightTilt: 0.0
      };
    }

    function showFailOverlay(reason, titleText, descText) {
      phase = 'fail';
      pointerDown = false;
      hudBar.style.display = 'none';
      overlaySlot.innerHTML = '';
      var panel = document.createElement('div');
      panel.className = 'mgl-overlay-panel';
      var card = document.createElement('div');
      card.className = 'mgl-overlay-card is-alert';
      var st = document.createElement('div');
      st.className = 'mgl-stamp';
      st.textContent = titleText || 'СВЕРКА ПРОВАЛЕНА';
      var txt = document.createElement('div');
      txt.className = 'mgl-card-text';
      txt.textContent = descText || 'Превышен лимит ошибок дактилоскопической экспертизы.';
      card.appendChild(st);
      card.appendChild(txt);
      panel.appendChild(card);
      overlaySlot.appendChild(panel);
      phaseTimer = window.setTimeout(function () {
        phaseTimer = null;
        callbacks.onFail({ reason: reason, errors: errorsCount, scenarioId: scenario.id });
      }, 950);
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
        text.textContent = 'Резкие движения кисти смазали порошок. Остался последний пригодный участок вещдока.';
        var btnBackup = document.createElement('button');
        btnBackup.type = 'button';
        btnBackup.className = 'mg-btn mg-btn-primary';
        btnBackup.textContent = scenario.backupBtnText;
        btnBackup.addEventListener('click', function () {
          sfx('sfxClick'); haptic('medium');
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
        showFailOverlay('smudged', 'СЛЕД УНИЧТОЖЕН', 'Запасной участок также смазан. Дактилоскопия провалена.');
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
      counterEl.textContent = 'ФАЗА 2: МИНУЦИИ (0 / 4)';
      footerNote.textContent = 'Соедините 4 парные минуции слева и справа. Остерегайтесь 2 ложных дефектов поверхности слева!';
    }

    function showFinalResultCard(deducedId) {
      phase = 'result';
      sfx('sfxStamp');
      haptic('heavy');
      overlaySlot.innerHTML = '';

      var panel = document.createElement('div');
      panel.className = 'mgl-overlay-panel';
      var card = document.createElement('div');
      card.className = 'mgl-overlay-card is-alert';

      var stamp = document.createElement('div');
      stamp.className = 'mgl-stamp';
      stamp.textContent = scenario.resultStamp;

      var statLine = document.createElement('div');
      statLine.className = 'mgl-alert-stat';
      statLine.textContent = scenario.resultStat;

      var alertBox = document.createElement('div');
      alertBox.className = 'mgl-alert-box';
      alertBox.textContent = scenario.resultAlert;

      var btnAttach = document.createElement('button');
      btnAttach.type = 'button';
      btnAttach.className = 'mg-btn mg-btn-danger';
      btnAttach.textContent = 'ПРИОБЩИТЬ К ДЕЛУ';
      btnAttach.addEventListener('click', function () {
        sfx('sfxStamp');
        haptic('success');
        callbacks.onSuccess({
          registryAlert: scenario.id === 'case409_act2_fp',
          scenarioId: scenario.id,
          errors: errorsCount,
          deduced: deducedId
        });
      });

      card.appendChild(stamp);
      card.appendChild(statLine);
      card.appendChild(alertBox);
      card.appendChild(btnAttach);
      panel.appendChild(card);
      overlaySlot.appendChild(panel);
    }

    function openPhase3Deduction() {
      phase = 'deduce';
      counterEl.textContent = 'ФАЗА 3 // ВЫВОД';
      footerNote.textContent = 'Сделайте криминалистический вывод по итогам дактилоскопии.';
      overlaySlot.innerHTML = '';

      var panel = document.createElement('div');
      panel.className = 'mgl-overlay-panel';
      var card = document.createElement('div');
      card.className = 'mgl-fp-deduce';

      var kicker = document.createElement('div');
      kicker.className = 'mgl-fp-dkicker';
      kicker.textContent = 'ФАЗА 3 // ДАКТИЛОСКОПИЧЕСКИЙ ВЫВОД';
      card.appendChild(kicker);

      var facts = document.createElement('div');
      facts.className = 'mgl-fp-dfacts';
      for (var fi = 0; fi < scenario.facts.length; fi++) {
        var r = document.createElement('div');
        r.textContent = scenario.facts[fi];
        facts.appendChild(r);
      }
      card.appendChild(facts);

      var q = document.createElement('div');
      q.className = 'mgl-fp-dq';
      q.textContent = scenario.conclusion.question;
      card.appendChild(q);

      var optsEl = document.createElement('div');
      optsEl.className = 'mgl-fp-dopts';
      var fb = document.createElement('div');
      fb.className = 'mgl-fp-dfb';

      var settled = false;
      var opts = scenario.conclusion.options || [];
      for (var oi = 0; oi < opts.length; oi++) {
        (function (opt) {
          var ob = document.createElement('button');
          ob.type = 'button';
          ob.className = 'mgl-fp-dopt';
          ob.textContent = opt.text;
          ob.addEventListener('click', function () {
            if (settled || destroyed) return;
            if (opt.isCorrect) {
              settled = true;
              ob.classList.add('is-correct');
              fb.className = 'mgl-fp-dfb is-ok';
              fb.textContent = opt.reason;
              sfx('sfxSuccess');
              haptic('success');
              phaseTimer = window.setTimeout(function () {
                phaseTimer = null;
                showFinalResultCard(opt.id);
              }, 600);
            } else {
              errorsCount += 1;
              syncErrHeader();
              ob.classList.add('is-wrong');
              fb.className = 'mgl-fp-dfb';
              fb.textContent = opt.reason;
              sfx('sfxAlert');
              haptic('error');
              if (errorsCount >= maxErrors) {
                settled = true;
                phaseTimer = window.setTimeout(function () {
                  phaseTimer = null;
                  showFailOverlay('wrong_deduction', 'ВЫВОД ОТКЛОНЁН', 'Превышен лимит ошибок дактилоскопии.');
                }, 680);
              }
            }
          });
          optsEl.appendChild(ob);
        })(opts[oi]);
      }

      card.appendChild(optsEl);
      card.appendChild(fb);
      panel.appendChild(card);
      overlaySlot.appendChild(panel);
    }

    function runDbScan() {
      phase = 'scanning';
      sfx('sfxRadio');
      haptic('medium');
      counterEl.textContent = 'СВЕРКА С КАРТОТЕКОЙ...';
      footerNote.textContent = 'Выполняется автоматическое сличение опорных точек...';

      overlaySlot.innerHTML = '';
      var panel = document.createElement('div');
      panel.className = 'mgl-overlay-panel';
      var card = document.createElement('div');
      card.className = 'mgl-overlay-card';
      var title = document.createElement('div');
      title.className = 'mgl-card-title';
      title.textContent = scenario.scanTitle;
      var sub = document.createElement('div');
      sub.className = 'mgl-card-text';
      sub.textContent = scenario.scanSub;
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
      function animateScan() {
        if (destroyed || phase !== 'scanning') return;
        var p = Math.min(1, (performance.now() - scanStart) / 1100);
        fill.style.width = Math.round(p * 100) + '%';
        if (p < 1) {
          scanTimer = window.setTimeout(animateScan, 40);
        } else {
          scanTimer = null;
          openPhase3Deduction();
        }
      }
      animateScan();
    }

    function registerMatchError(msg) {
      errorsCount += 1;
      syncErrHeader();
      sfx('sfxAlert');
      haptic('error');
      showBanner(msg, false, 1300);
      if (errorsCount >= maxErrors) {
        phaseTimer = window.setTimeout(function () {
          phaseTimer = null;
          showFailOverlay('too_many_errors', 'СВЕРКА ПРОВАЛЕНА', msg);
        }, 560);
      }
    }

    function handleMatchingTap(x, y) {
      var layout = getPhase2Layout();
      var hitRadius = 26;

      // Check decoy surface noise specks on left lifted print first!
      for (var d = 0; d < NOISE_DECOY_POINTS.length; d++) {
        var dp = getMinutiaCanvasPos(layout.leftCx, layout.cy, layout.rx, layout.ry, layout.leftTilt, NOISE_DECOY_POINTS[d]);
        if (Math.hypot(x - dp.x, y - dp.y) < 20) {
          wrongFlash = { active: true, side: 'left', id: NOISE_DECOY_POINTS[d].id, until: performance.now() + 500 };
          selectedSide = null; selectedId = -1;
          registerMatchError(NOISE_DECOY_POINTS[d].reason);
          return;
        }
      }

      var tappedSide = null, tappedId = -1, bestDist = hitRadius;
      for (var i = 0; i < MINUTIAE_POINTS.length; i++) {
        if (matchedPairs[i]) continue;
        var lp = getMinutiaCanvasPos(layout.leftCx, layout.cy, layout.rx, layout.ry, layout.leftTilt, MINUTIAE_POINTS[i]);
        var ld = Math.hypot(x - lp.x, y - lp.y);
        if (ld < bestDist) { bestDist = ld; tappedSide = 'left'; tappedId = i; }

        var rp = getMinutiaCanvasPos(layout.rightCx, layout.cy, layout.rx, layout.ry, layout.rightTilt, MINUTIAE_POINTS[i]);
        var rd = Math.hypot(x - rp.x, y - rp.y);
        if (rd < bestDist) { bestDist = rd; tappedSide = 'right'; tappedId = i; }
      }

      if (tappedId === -1) return;

      if (selectedSide === null || selectedSide === tappedSide) {
        selectedSide = tappedSide;
        selectedId = tappedId;
        sfx('sfxClick'); haptic('light');
        return;
      }

      if (tappedId === selectedId) {
        matchedPairs[tappedId] = true;
        matchedCount += 1;
        selectedSide = null; selectedId = -1;
        sfx('sfxClick'); haptic('light');
        counterEl.textContent = 'ФАЗА 2: МИНУЦИИ (' + matchedCount + ' / 4)';
        if (matchedCount >= MINUTIAE_POINTS.length) {
          sfx('sfxSuccess'); haptic('success');
          phaseTimer = window.setTimeout(function () { phaseTimer = null; runDbScan(); }, 420);
        }
      } else {
        wrongFlash = { active: true, side: tappedSide, id: tappedId, until: performance.now() + 480 };
        selectedSide = null; selectedId = -1;
        registerMatchError('ТОЧКИ НЕ ПАРНЫЕ (+1 ОШИБКА) — сверьте геометрию минуций!');
      }
    }

    function spawnPowderParticles(x, y, count, fast) {
      for (var i = 0; i < count; i++) {
        if (particles.length > 70) particles.shift();
        particles.push({
          x: x + (Math.random() - 0.5) * 18, y: y + (Math.random() - 0.5) * 14,
          vx: (Math.random() - 0.5) * (fast ? 92 : 30), vy: (Math.random() - 0.2) * (fast ? 52 : 20) + 14,
          size: 1.1 + Math.random() * 1.8, alpha: fast ? 0.8 : 0.65, dark: fast && Math.random() > 0.35
        });
      }
    }

    function paintBrushStep(x1, y1, x2, y2, isSmudging) {
      var dist = Math.hypot(x2 - x1, y2 - y1);
      var steps = Math.max(1, Math.ceil(dist / 6));
      var brushR = 23;
      for (var s = 1; s <= steps; s++) {
        var frac = s / steps;
        var px = x1 + (x2 - x1) * frac, py = y1 + (y2 - y1) * frac;
        if (isSmudging) {
          smudgeCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
          var sg = smudgeCtx.createRadialGradient(px, py, 3, px, py, brushR * 1.15);
          sg.addColorStop(0, 'rgba(34, 37, 44, 0.32)'); sg.addColorStop(1, 'rgba(34, 37, 44, 0)');
          smudgeCtx.fillStyle = sg;
          smudgeCtx.beginPath(); smudgeCtx.arc(px, py, brushR * 1.15, 0, Math.PI * 2); smudgeCtx.fill();
        } else {
          revealCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
          var rg = revealCtx.createRadialGradient(px, py, 2, px, py, brushR);
          rg.addColorStop(0, 'rgba(255, 255, 255, 0.26)'); rg.addColorStop(1, 'rgba(255, 255, 255, 0)');
          revealCtx.fillStyle = rg;
          revealCtx.beginPath(); revealCtx.arc(px, py, brushR, 0, Math.PI * 2); revealCtx.fill();
          var hitSum = 0;
          for (var c = 0; c < gridCells.length; c++) {
            var cell = gridCells[c];
            if (!cell.active) continue;
            var d = Math.hypot(px - (fpCx + cell.nx * fpRx), py - (fpCy + cell.ny * fpRy));
            if (d < brushR) cell.val = Math.min(1, cell.val + (1 - d / brushR) * 0.28);
            hitSum += cell.val;
          }
          revealPct = totalActiveCells > 0 ? (hitSum / totalActiveCells) * 100 : 0;
        }
      }
    }

    function getCanvasPoint(e) {
      var rect = canvas.getBoundingClientRect();
      return { x: Math.max(0, Math.min(cssW, e.clientX - rect.left)), y: Math.max(0, Math.min(cssH, e.clientY - rect.top)) };
    }

    function onPointerDown(e) {
      if (destroyed) return;
      e.preventDefault();
      var pt = getCanvasPoint(e);
      if (phase === 'matching') { handleMatchingTap(pt.x, pt.y); return; }
      if (phase !== 'dusting') return;
      if (activePointerId !== null && activePointerId !== e.pointerId) return;
      activePointerId = e.pointerId; pointerDown = true;
      brushX = lastX = pt.x; brushY = lastY = pt.y;
      lastMoveTime = performance.now(); smoothSpeed = 0;
      try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
    }

    function onPointerMove(e) {
      if (destroyed || phase !== 'dusting' || !pointerDown || e.pointerId !== activePointerId) return;
      e.preventDefault();
      var pt = getCanvasPoint(e);
      var now = performance.now();
      var dtMs = Math.max(4, now - lastMoveTime);
      var dist = Math.hypot(pt.x - lastX, pt.y - lastY);
      if (dist < 1.2) return;
      smoothSpeed = smoothSpeed * 0.52 + (dist / dtMs) * 0.48;
      var inPrintZone = Math.hypot((pt.x - fpCx) / (fpRx * 1.25), (pt.y - fpCy) / (fpRy * 1.25)) <= 1.15;

      if (smoothSpeed > 0.92 && inPrintZone) {
        integrity = Math.max(0, integrity - Math.min(11, 2.6 + (smoothSpeed - 0.92) * 7.2));
        paintBrushStep(lastX, lastY, pt.x, pt.y, true);
        spawnPowderParticles(pt.x, pt.y, 4, true);
        if (now - lastErrorHaptic > 260) { lastErrorHaptic = now; haptic('error'); }
        showBanner('СЛИШКОМ РЕЗКО — СЛЕД СМАЗЫВАЕТСЯ!', false, 700);
        updateDustMeters();
        if (integrity <= 0) { triggerSmudgeFailure(); return; }
      } else {
        paintBrushStep(lastX, lastY, pt.x, pt.y, false);
        spawnPowderParticles(pt.x, pt.y, 2, false);
        updateDustMeters();
        if (revealPct >= 85) {
          phase = 'transition'; pointerDown = false; activePointerId = null;
          sfx('sfxSuccess'); haptic('success');
          showBanner('СЛЕД ПРОЯВЛЕН — ПЕРЕХОД К СВЕРКЕ', true, 750);
          phaseTimer = window.setTimeout(function () { phaseTimer = null; enterPhase2Matching(); }, 680);
          return;
        }
      }
      brushX = lastX = pt.x; brushY = lastY = pt.y; lastMoveTime = now;
    }

    function onPointerUp(e) {
      if (activePointerId !== null && e.pointerId !== activePointerId) return;
      pointerDown = false; activePointerId = null; smoothSpeed = 0;
    }
    function onContextMenu(e) { e.preventDefault(); }

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);
    canvas.addEventListener('lostpointercapture', onPointerUp);
    canvas.addEventListener('contextmenu', onContextMenu);

    if (typeof window.ResizeObserver === 'function') {
      resizeObserver = new window.ResizeObserver(resizeCanvas);
      resizeObserver.observe(body);
    }
    window.addEventListener('resize', resizeCanvas);

    initCoverageGrid();
    resizeCanvas();
    resetDustingAttempt();
    syncErrHeader();

    function renderDustingFrame(dt) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.drawImage(bgCanvas, 0, 0, cssW, cssH);
      ctx.save(); ctx.globalAlpha = 0.055; ctx.drawImage(printCanvas, 0, 0, cssW, cssH); ctx.restore();

      compCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      compCtx.globalCompositeOperation = 'source-over';
      compCtx.clearRect(0, 0, cssW, cssH);
      compCtx.drawImage(printCanvas, 0, 0, cssW, cssH);
      compCtx.globalCompositeOperation = 'destination-in';
      compCtx.drawImage(revealCanvas, 0, 0, cssW, cssH);
      compCtx.globalCompositeOperation = 'source-over';

      ctx.drawImage(compCanvas, 0, 0, cssW, cssH);
      ctx.drawImage(smudgeCanvas, 0, 0, cssW, cssH);

      for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
        p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 65 * dt; p.alpha -= dt * 1.35;
        if (p.alpha <= 0) { particles.splice(i, 1); continue; }
        ctx.fillStyle = p.dark ? ('rgba(55,58,66,' + p.alpha.toFixed(2) + ')') : ('rgba(215,222,232,' + p.alpha.toFixed(2) + ')');
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
      }

      if (pointerDown && phase === 'dusting') {
        ctx.save(); ctx.translate(brushX, brushY);
        var tuft = ctx.createRadialGradient(0, 0, 2, 0, 0, 22);
        tuft.addColorStop(0, 'rgba(185, 194, 210, 0.45)'); tuft.addColorStop(1, 'rgba(30, 34, 42, 0)');
        ctx.fillStyle = tuft; ctx.beginPath(); ctx.arc(0, 0, 22, 0, Math.PI * 2); ctx.fill();
        ctx.rotate(-0.68);
        ctx.fillStyle = '#9ba3b2'; ctx.fillRect(6, -4.5, 44, 9);
        ctx.fillStyle = '#252932'; ctx.beginPath(); ctx.arc(4, 0, 5.5, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = smoothSpeed > 0.92 ? '#ef4444' : '#c98a2e'; ctx.lineWidth = 1.4; ctx.stroke();
        ctx.restore();
      }
    }

    function renderMatchingFrame(now) {
      var layout = getPhase2Layout();
      var pulse = 0.65 + 0.35 * Math.sin(now * 0.0042);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#0e1014'; ctx.fillRect(0, 0, layout.halfW, cssH);
      ctx.fillStyle = '#111514'; ctx.fillRect(layout.halfW, 0, layout.halfW, cssH);

      ctx.fillStyle = '#15171c'; ctx.fillRect(0, 0, cssW, layout.padTop);
      ctx.strokeStyle = '#2a2e38'; ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, layout.padTop); ctx.lineTo(cssW, layout.padTop);
      ctx.moveTo(layout.halfW, 0); ctx.lineTo(layout.halfW, cssH);
      ctx.stroke();

      ctx.font = '600 10px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = '#d4cab4'; ctx.fillText('СНЯТЫЙ СЛЕД', layout.leftCx, layout.padTop * 0.52);
      ctx.fillStyle = '#c98a2e'; ctx.fillText(scenario.rightPanelTitle, layout.rightCx, layout.padTop * 0.52);

      drawFingerprintPattern(ctx, layout.leftCx, layout.cy, layout.rx, layout.ry, {
        strokeColor: 'rgba(208, 216, 228, 0.72)', lineWidth: 1.45, tilt: layout.leftTilt, noisy: true, hasScar: scenario.hasScar
      });
      drawFingerprintPattern(ctx, layout.rightCx, layout.cy, layout.rx, layout.ry, {
        strokeColor: 'rgba(212, 202, 180, 0.72)', lineWidth: 1.45, tilt: layout.rightTilt, noisy: false, hasScar: scenario.hasScar
      });

      // Draw decoy noise specks on left side ONLY (no counterpart on right!)
      for (var d = 0; d < NOISE_DECOY_POINTS.length; d++) {
        var dp = getMinutiaCanvasPos(layout.leftCx, layout.cy, layout.rx, layout.ry, layout.leftTilt, NOISE_DECOY_POINTS[d]);
        var isWrongD = wrongFlash.active && now < wrongFlash.until && wrongFlash.id === NOISE_DECOY_POINTS[d].id;
        ctx.beginPath(); ctx.arc(dp.x, dp.y, isWrongD ? 11 : 5.2, 0, Math.PI * 2);
        ctx.strokeStyle = isWrongD ? '#ef4444' : 'rgba(212, 202, 180, 0.34)';
        ctx.lineWidth = isWrongD ? 2 : 1; ctx.stroke();
        ctx.fillStyle = 'rgba(201, 138, 46, 0.45)';
        ctx.beginPath(); ctx.arc(dp.x, dp.y, 1.5, 0, Math.PI * 2); ctx.fill();
      }

      for (var m = 0; m < MINUTIAE_POINTS.length; m++) {
        if (!matchedPairs[m]) continue;
        var lpM = getMinutiaCanvasPos(layout.leftCx, layout.cy, layout.rx, layout.ry, layout.leftTilt, MINUTIAE_POINTS[m]);
        var rpM = getMinutiaCanvasPos(layout.rightCx, layout.cy, layout.rx, layout.ry, layout.rightTilt, MINUTIAE_POINTS[m]);
        ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = 'rgba(201, 138, 46, 0.44)'; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(lpM.x, lpM.y); ctx.lineTo(rpM.x, rpM.y); ctx.stroke(); ctx.restore();
      }

      for (var i = 0; i < MINUTIAE_POINTS.length; i++) {
        var sides = [
          { key: 'left', pos: getMinutiaCanvasPos(layout.leftCx, layout.cy, layout.rx, layout.ry, layout.leftTilt, MINUTIAE_POINTS[i]) },
          { key: 'right', pos: getMinutiaCanvasPos(layout.rightCx, layout.cy, layout.rx, layout.ry, layout.rightTilt, MINUTIAE_POINTS[i]) }
        ];
        for (var s = 0; s < sides.length; s++) {
          var side = sides[s], px = side.pos.x, py = side.pos.y;
          var isMatched = matchedPairs[i];
          var isSel = selectedSide === side.key && selectedId === i;
          var isWrong = wrongFlash.active && now < wrongFlash.until && wrongFlash.side === side.key && wrongFlash.id === i;
          ctx.save();
          if (isMatched) {
            ctx.beginPath(); ctx.arc(px, py, 10, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(201, 138, 46, 0.26)'; ctx.fill();
            ctx.strokeStyle = '#e5a443'; ctx.lineWidth = 1.8; ctx.stroke();
            ctx.fillStyle = '#f6dfa8'; ctx.font = '600 9.5px "IBM Plex Mono", monospace';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(String(i + 1), px, py + 0.5);
          } else if (isWrong) {
            ctx.beginPath(); ctx.arc(px, py, 12, 0, Math.PI * 2);
            ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2; ctx.stroke();
          } else if (isSel) {
            ctx.beginPath(); ctx.arc(px, py, 12 + pulse * 2.4, 0, Math.PI * 2);
            ctx.strokeStyle = '#e5a443'; ctx.lineWidth = 2; ctx.stroke();
            ctx.beginPath(); ctx.arc(px, py, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = '#e5a443'; ctx.fill();
          } else {
            ctx.beginPath(); ctx.arc(px, py, 5.5, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(212, 202, 180, ' + (0.28 + 0.14 * pulse).toFixed(2) + ')';
            ctx.lineWidth = 1; ctx.stroke();
            ctx.beginPath(); ctx.arc(px, py, 1.6, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(201, 138, 46, ' + (0.45 + 0.22 * pulse).toFixed(2) + ')'; ctx.fill();
          }
          ctx.restore();
        }
      }
    }

    function tick(now) {
      if (destroyed) return;
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
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      if (warnTimer !== null) window.clearTimeout(warnTimer);
      if (phaseTimer !== null) window.clearTimeout(phaseTimer);
      if (scanTimer !== null) window.clearTimeout(scanTimer);
      if (resizeObserver) { try { resizeObserver.disconnect(); } catch (e) {} }
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('lostpointercapture', onPointerUp);
      canvas.removeEventListener('contextmenu', onContextMenu);
    };
  });

  /* ==========================================================================
     MINIGAME 2: 'blood_lab' (Multi-scenario case409 + case412 + 3-phase)
     ========================================================================== */

  var BLOOD_EXTRA_STYLE_ID = 'minigames-lab-blood-extra';

  var BLOOD_EXTRA_CSS =
    '.mgl-bl-meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }' +
    '.mgl-bl-err { font-family: "IBM Plex Mono", monospace; font-size: 10px; font-weight: 600; color: #9ba0ab; }' +
    '.mgl-bl-err.is-warn { color: #f87171; }' +
    '.mgl-pipette-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; width: 100%; }' +
    '.mgl-pipette-grid.is-six { grid-template-columns: repeat(3, 1fr); }' +
    '.mgl-pipette-grid .mgl-pipette { padding: 7px 4px; font-size: 10px; gap: 4px; }' +
    '.mgl-drop-saline { background: radial-gradient(circle at 35% 35%, #a7f3d0, #0d9488); }' +
    '.mgl-drop-fuji { background: radial-gradient(circle at 35% 35%, #f472b6, #be185d); }' +
    '.mgl-drop-sudan { background: radial-gradient(circle at 35% 35%, #fb923c, #c2410c); }' +
    '.mgl-drop-acet { background: radial-gradient(circle at 35% 35%, #c4b5fd, #6d28d9); }' +
    '.mgl-bl-deduce { width: 100%; max-width: 356px; background: #14171f; border: 1px solid #353b4a; border-top: 3px solid var(--case-accent, #c98a2e); border-radius: 7px; padding: 12px; display: flex; flex-direction: column; gap: 8px; text-align: left; }' +
    '.mgl-bl-dkicker { font-family: "IBM Plex Mono", monospace; font-size: 9.8px; font-weight: 700; color: var(--case-accent, #c98a2e); text-transform: uppercase; }' +
    '.mgl-bl-dfacts { padding: 7px 8px; background: #0d1016; border: 1px solid #262b36; border-radius: 5px; font-family: "IBM Plex Mono", monospace; font-size: 9.8px; line-height: 1.4; color: #c2cad8; display: flex; flex-direction: column; gap: 3px; }' +
    '.mgl-bl-dq { font-size: 12.4px; line-height: 1.38; color: #f3efe6; font-weight: 500; }' +
    '.mgl-bl-dopts { display: flex; flex-direction: column; gap: 6px; }' +
    '.mgl-bl-dopt { width: 100%; text-align: left; padding: 8px 9px; background: #1b202b; border: 1px solid #353d4e; border-radius: 5px; color: #e4e0d8; font-size: 11.6px; line-height: 1.34; cursor: pointer; }' +
    '.mgl-bl-dopt.is-wrong { border-color: #ef4444; background: rgba(153, 27, 27, 0.25); color: #fecaca; }' +
    '.mgl-bl-dopt.is-correct { border-color: #22c55e; background: rgba(34, 197, 94, 0.2); color: #bbf7d0; }' +
    '.mgl-bl-dfb { font-family: "IBM Plex Mono", monospace; font-size: 10.2px; line-height: 1.35; min-height: 15px; color: #fca5a5; }' +
    '.mgl-bl-dfb.is-ok { color: #86efac; }';

  function injectBloodExtraStyles() {
    if (document.getElementById(BLOOD_EXTRA_STYLE_ID)) return;
    var el = document.createElement('style');
    el.id = BLOOD_EXTRA_STYLE_ID;
    el.textContent = BLOOD_EXTRA_CSS;
    document.head.appendChild(el);
  }

  var BLOOD_REAGENTS = {
    antiA: { key: 'antiA', label: 'Анти-А', dropColor: '#3b82f6', dotClass: 'mgl-drop-a' },
    antiB: { key: 'antiB', label: 'Анти-В', dropColor: '#eab308', dotClass: 'mgl-drop-b' },
    antiD: { key: 'antiD', label: 'Анти-D', dropColor: '#e2e8f0', dotClass: 'mgl-drop-d' },
    saline: { key: 'saline', label: 'Физраств.', dropColor: '#14b8a6', dotClass: 'mgl-drop-saline', isDecoy: true },
    fuji: { key: 'fuji', label: 'Фудживара', dropColor: '#ec4899', dotClass: 'mgl-drop-fuji' },
    sudan: { key: 'sudan', label: 'Судан-III', dropColor: '#f97316', dotClass: 'mgl-drop-sudan' },
    acet: { key: 'acet', label: 'Ацетон', dropColor: '#8b5cf6', dotClass: 'mgl-drop-acet' }
  };

  function resolveBloodScenario(config) {
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
    if (cfg.preset === 'case412' || caseId === 'case412' || nodeId === 'act4_mg_blood' || /ветош|хлороформ|канав/i.test(hint)) {
      return {
        id: 'case412_act4_blood',
        title: cfg.title || 'ХИМ-БИО АНАЛИЗ ВЕТОШИ // №412',
        expectedGroup: 'II',
        expectedRh: 'Rh+',
        conclusionTitle: 'ЗАКЛЮЧЕНИЕ: КРОВЬ НА ВЕТОШИ (СТЕКЛО №2)',
        stampWin: 'ХЛОРОФОРМ + КРОВЬ II(A) Rh+',
        pipettes: ['fuji', 'sudan', 'acet', 'antiA', 'antiB', 'antiD'],
        refExtraHtml:
          '<div class="mgl-ref-legend">' +
            '<strong>Хим-пробы (Стекло №1):</strong> Фудживара (+) малиновая — <strong>хлороформ</strong> · ' +
            'Судан-III (+) оранжевые капли — <strong>минеральное масло</strong> · Ацетон (–) прозрачный — <strong>отсутствует</strong>.' +
          '</div>',
        slides: [
          {
            id: 'chem_rag',
            title: 'СТЕКЛО №1: ПРОПИТКА ВЕТОШИ (ХИМ-ПРОБА)',
            film: 0,
            filmLabel: '',
            wells: [
              { reagent: 'fuji', label: 'Фудживара', positive: true, visualKind: 'chem_magenta' },
              { reagent: 'sudan', label: 'Судан-III', positive: true, visualKind: 'chem_oil' },
              { reagent: 'acet', label: 'Ацетон', positive: false, visualKind: 'chem_clear' }
            ]
          },
          {
            id: 'blood_rag',
            title: 'СТЕКЛО №2: МИКРОСЛЕДЫ КРОВИ НА ВЕТОШИ',
            film: 1.0,
            filmLabel: 'МАСЛЯНАЯ ГРЯЗЬ — ПРОТРИТЕ ПАЛЬЦЕМ',
            wells: [
              { reagent: 'antiA', label: 'Анти-А', positive: true, visualKind: 'blood' },
              { reagent: 'antiB', label: 'Анти-В', positive: false, visualKind: 'blood' },
              { reagent: 'antiD', label: 'Анти-D', positive: true, visualKind: 'blood' }
            ]
          }
        ],
        facts: [
          '• Реактив Фудживары (+): ярко-малиновая реакция на технический хлороформ',
          '• Реактив Судан-III (+): примесь старого минерального масла (как на ногте у калитки)',
          '• Серология крови на ветоши: II(A) Rh+ — полностью совпадает с группой Алины Соколовой'
        ],
        conclusion: {
          question: 'На ветоши из канавы за участком №14 — технический хлороформ, старое минеральное масло и кровь II(A) Rh+ Алины. Вывод:',
          options: [
            {
              id: 'paint_rag',
              text: 'Обычная тряпка с ацетоном из мастерской — следы крови не связаны с Алиной.',
              isCorrect: false,
              reason: 'Противоречие: проба на ацетон отрицательная, выявлен хлороформ и кровь II(A) Rh+ Алины.'
            },
            {
              id: 'chloroform_attack',
              text: 'Показания Беляева верны: Кравцов усыпил Алину хлороформом прямо у забора, поэтому на Садовой никто не услышал крика.',
              isCorrect: true,
              reason: 'Верно: хлороформ, то же масло с ногтя и группа II(A) Rh+ наглухо связывают ветошь с похищением.'
            },
            {
              id: 'self_injury',
              text: 'Алина случайно порезалась о забор и сама протёрла рану тряпкой с антисептиком.',
              isCorrect: false,
              reason: 'Противоречие: на ветоши не антисептик, а усыпляющий технический хлороформ с минеральным маслом.'
            }
          ]
        }
      };
    }

    if (cfg.preset === 'case409' || caseId === 'case409' || nodeId === 'act2_blood_game') {
      return {
        id: 'case409_act2_blood',
        title: cfg.title || 'ЛАБОРАТОРИЯ КРОВИ // ДЕЛО №409',
        expectedGroup: 'IV',
        expectedRh: 'Rh+',
        conclusionTitle: 'ЗАКЛЮЧЕНИЕ: ОБРАЗЕЦ №2 (РУКОЯТЬ НОЖА)',
        stampWin: 'УСТАНОВЛЕНО: IV (AB) Rh+',
        pipettes: ['antiA', 'antiB', 'antiD', 'saline'],
        refExtraHtml:
          '<div class="mgl-ref-legend"><strong>Внимание:</strong> Физраствор (NaCl) — контрольный буфер; добавление его вместо сыворотки портит лунку!</div>',
        slides: [
          {
            id: 'sample1',
            title: 'ОБРАЗЕЦ №1 (Одежда жертвы Савельевой)',
            film: 0,
            filmLabel: '',
            wells: [
              { reagent: 'antiA', label: 'Анти-А', positive: true, visualKind: 'blood' },
              { reagent: 'antiB', label: 'Анти-В', positive: false, visualKind: 'blood' },
              { reagent: 'antiD', label: 'Анти-D', positive: true, visualKind: 'blood' }
            ]
          },
          {
            id: 'sample2',
            title: 'ОБРАЗЕЦ №2 (Мазок с рукояти ножа)',
            film: 1.0,
            filmLabel: 'ПЛЁНКА ИЛА/АНТИСЕПТИКА — ПРОТРИТЕ',
            wells: [
              { reagent: 'antiA', label: 'Анти-А', positive: true, visualKind: 'blood' },
              { reagent: 'antiB', label: 'Анти-В', positive: true, visualKind: 'blood' },
              { reagent: 'antiD', label: 'Анти-D', positive: true, visualKind: 'blood' }
            ]
          }
        ],
        facts: [
          '• Образец №1 (жертва, Савельева А.В.): II(A) Rh+ (Анти-А +, Анти-В –, Анти-D +)',
          '• Образец №2 (кровь убийцы с рукояти ножа): редкая IV(AB) Rh+ (все три реакции +)',
          '• Медкарта подозреваемого Громова В.И.: группа крови I(0) Rh+'
        ],
        conclusion: {
          question: 'У жертвы II(A) Rh+, на рукояти ножа кровь убийцы редкой группы IV(AB) Rh+, а у Громова по тюремной карте I(0) Rh+. Вывод:',
          options: [
            {
              id: 'gromov_mixed',
              text: 'На рукояти смешалась кровь Громова I(0) и жертвы II(A), что случайно дало реакцию IV(AB).',
              isCorrect: false,
              reason: 'Противоречие: смесь I(0) и II(A) физически не содержит антиген B и никогда не даст агглютинацию с Анти-В!'
            },
            {
              id: 'not_gromov_ab',
              text: 'Нападавший — точно НЕ Громов В.И.; убийца порезался при ударе и имеет редкую группу крови IV(AB) Rh+.',
              isCorrect: true,
              reason: 'Верно: наличие антигенов A и B на рукояти полностью исключает Громова и даёт важнейший маркер убийцы.'
            },
            {
              id: 'victim_blood',
              text: 'Вся кровь на ноже принадлежит самой потерпевшей Савельевой.',
              isCorrect: false,
              reason: 'Противоречие: у потерпевшей группа II(A) Rh+ (Анти-В отрицательный), а на рукояти — IV(AB) Rh+.'
            }
          ]
        }
      };
    }

    return {
      id: 'generic_blood_lab',
      title: cfg.title || 'СЕРОЛОГИЧЕСКАЯ ЛАБОРАТОРИЯ',
      expectedGroup: cfg.expectedGroup || 'IV',
      expectedRh: cfg.expectedRh || 'Rh+',
      conclusionTitle: 'ЗАКЛЮЧЕНИЕ ПО ОБРАЗЦУ №2',
      stampWin: 'АНАЛИЗ ПОДТВЕРЖДЁН',
      pipettes: ['antiA', 'antiB', 'antiD', 'saline'],
      refExtraHtml: '',
      slides: [
        {
          id: 'g_s1',
          title: 'ОБРАЗЕЦ №1 (Контрольная проба)',
          film: 0,
          filmLabel: '',
          wells: [
            { reagent: 'antiA', label: 'Анти-А', positive: true, visualKind: 'blood' },
            { reagent: 'antiB', label: 'Анти-В', positive: false, visualKind: 'blood' },
            { reagent: 'antiD', label: 'Анти-D', positive: true, visualKind: 'blood' }
          ]
        },
        {
          id: 'g_s2',
          title: 'ОБРАЗЕЦ №2 (Смыв с вещдока)',
          film: 1.0,
          filmLabel: 'ЗАГРЯЗНЕНИЕ — ПРОТРИТЕ ПАЛЬЦЕМ',
          wells: [
            { reagent: 'antiA', label: 'Анти-А', positive: true, visualKind: 'blood' },
            { reagent: 'antiB', label: 'Анти-В', positive: true, visualKind: 'blood' },
            { reagent: 'antiD', label: 'Анти-D', positive: true, visualKind: 'blood' }
          ]
        }
      ],
      facts: [
        '• Стекло №2 очищено от постороннего загрязнения',
        '• Реакции агглютинации по всем 6 лункам завершены',
        '• Группа крови и резус-фактор Образца №2 подтверждены'
      ],
      conclusion: cfg.conclusion || {
        question: 'Серологический анализ образцов завершён. Подтвердите вывод протокола:',
        options: [
          { id: 'err', text: 'Реакции не состоялись из-за загрязнения.', isCorrect: false, reason: 'Противоречие: все 6 лунок отработали чисто.' },
          { id: 'ok', text: 'Группа крови и резус-фактор вещдока достоверно установлены.', isCorrect: true, reason: 'Верно: лабораторное заключение готово.' },
          { id: 'same', text: 'Оба образца полностью идентичны.', isCorrect: false, reason: 'Противоречие: реакции с сывороткой Анти-В различаются.' }
        ]
      }
    };
  }


  window.GameMinigames.register('blood_lab', function (containerEl, config, callbacks) {
    injectLabStyles();
    injectBloodExtraStyles();

    var cfg = config || {};
    var scenario = resolveBloodScenario(cfg);
    var maxErrors = typeof cfg.maxErrors === 'number' && cfg.maxErrors > 0 ? cfg.maxErrors : 4;

    var slides = scenario.slides.map(function (sl, si) {
      var wells = sl.wells.map(function (w, wi) {
        var prng = createPrng(4090 + si * 100 + wi * 17);
        var clumps = [];
        for (var ci = 0; ci < 22; ci++) {
          var ang = prng() * Math.PI * 2;
          var sDist = 0.12 + prng() * 0.72;
          var cAng = (Math.floor(prng() * 6) / 6) * Math.PI * 2 + (prng() - 0.5) * 0.45;
          var eDist = 0.14 + prng() * 0.56;
          clumps.push({
            sx: Math.cos(ang) * sDist, sy: Math.sin(ang) * sDist,
            ex: Math.cos(cAng) * eDist, ey: Math.sin(cAng) * eDist,
            rad: 0.085 + prng() * 0.095, rot: prng() * Math.PI,
            shade: prng() > 0.45 ? '#3a0408' : '#580910'
          });
        }
        return {
          reagent: w.reagent, label: w.label, positive: Boolean(w.positive),
          visualKind: w.visualKind || 'blood',
          reacted: false, reactionTime: 0, errorFlashUntil: 0,
          cx: 0, cy: 0, r: 24, clumps: clumps
        };
      });
      return {
        id: sl.id, title: sl.title,
        film: typeof sl.film === 'number' ? sl.film : 0,
        filmLabel: sl.filmLabel || '',
        wells: wells, x: 0, y: 0, w: 0, h: 0
      };
    });

    var selectedReagent = null;
    var reactedCount = 0;
    var selectedGroup = null;
    var selectedRh = null;
    var errorsCount = 0;
    var phase = 'lab'; // 'lab' | 'formula' | 'deduce' | 'win' | 'fail'
    var refOpen = false;
    var destroyed = false;

    var rafId = null, toastTimer = null, endTimer = null, resizeObserver = null;
    var lastFrameTime = performance.now();
    var filmParticles = [];
    var pointerDown = false, lastPx = 0, lastPy = 0;

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
    metaRow.className = 'mgl-bl-meta';

    var counterEl = document.createElement('span');
    counterEl.className = 'mg-counter';
    counterEl.textContent = 'ЛУНОК: 0 / 6';

    var errEl = document.createElement('span');
    errEl.className = 'mgl-bl-err';
    errEl.textContent = 'ОШИБКИ: 0 / ' + maxErrors;

    metaRow.appendChild(counterEl);
    metaRow.appendChild(errEl);
    headInfo.appendChild(titleEl);
    headInfo.appendChild(metaRow);

    var headActions = document.createElement('div');
    headActions.className = 'mgl-head-actions';

    var btnRef = document.createElement('button');
    btnRef.type = 'button';
    btnRef.className = 'mg-btn mgl-btn-ref';
    btnRef.textContent = 'СПРАВКА';

    var btnBack = document.createElement('button');
    btnBack.type = 'button';
    btnBack.className = 'mg-btn mg-btn-cancel';
    btnBack.textContent = 'НАЗАД';
    btnBack.addEventListener('click', function () {
      sfx('sfxClick'); haptic('light');
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

    var overlaySlot = document.createElement('div');
    body.appendChild(stage);
    body.appendChild(overlaySlot);

    // Phase 2: Blood group formula selector
    var conclusionEl = document.createElement('div');
    conclusionEl.className = 'mgl-conclusion hidden';

    var concHead = document.createElement('div');
    concHead.className = 'mgl-conclusion-head';
    var concTitle = document.createElement('span');
    concTitle.textContent = scenario.conclusionTitle;
    concHead.appendChild(concTitle);

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
          if (phase !== 'formula') return;
          selectedGroup = g.id;
          for (var k = 0; k < groupBtns.length; k++) groupBtns[k].classList.toggle('is-selected', groupBtns[k] === b);
          sfx('sfxClick'); haptic('light');
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
          if (phase !== 'formula') return;
          selectedRh = rhVal;
          for (var k = 0; k < rhBtns.length; k++) rhBtns[k].classList.toggle('is-selected', rhBtns[k] === b);
          sfx('sfxClick'); haptic('light');
        });
        rhGrid.appendChild(b);
        rhBtns.push(b);
      })(rhs[ri]);
    }

    var btnSubmit = document.createElement('button');
    btnSubmit.type = 'button';
    btnSubmit.className = 'mg-btn mg-btn-primary';
    btnSubmit.textContent = 'ПОДТВЕРДИТЬ ФОРМУЛУ';
    btnSubmit.addEventListener('click', function () {
      if (phase !== 'formula') return;
      if (!selectedGroup || !selectedRh) {
        haptic('warning');
        showLabToast('Выберите группу крови и резус-фактор.', false, 1200);
        return;
      }
      if (selectedGroup === scenario.expectedGroup && selectedRh === scenario.expectedRh) {
        sfx('sfxSuccess'); haptic('success');
        showLabToast('Формула подтверждена: ' + selectedGroup + ' ' + selectedRh, true, 1200);
        endTimer = window.setTimeout(function () {
          endTimer = null;
          openPhase3Deduction();
        }, 560);
      } else {
        registerLabError('Неверная формула крови (+1 ошибка) — сверьте хлопья агглютинации со СПРАВКОЙ!', 'wrong_analysis');
      }
    });

    conclusionEl.appendChild(concHead);
    conclusionEl.appendChild(groupGrid);
    conclusionEl.appendChild(rhGrid);
    conclusionEl.appendChild(btnSubmit);
    stage.appendChild(conclusionEl);

    // Reference sheet
    var refOverlay = document.createElement('div');
    refOverlay.className = 'mgl-ref-overlay hidden';
    refOverlay.innerHTML =
      '<div class="mgl-ref-paper">' +
        '<div class="mgl-ref-title">СПРАВОЧНИК ЛАБОРАТОРИИ (AB0 / Rh)</div>' +
        '<div class="mgl-ref-legend">' +
          '<strong>(+) Агглютинация:</strong> тёмные хлопья и просветление краёв.<br>' +
          '<strong>(–) Нет реакции:</strong> гладкая равномерная капля.' +
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
        '<div class="mgl-ref-legend"><strong>Резус:</strong> Анти-D (+) → <strong>Rh+</strong> · Анти-D (–) → <strong>Rh–</strong></div>' +
        (scenario.refExtraHtml || '') +
        '<button type="button" class="mgl-ref-close">ЗАКРЫТЬ СПРАВОЧНИК</button>' +
      '</div>';

    var btnRefClose = refOverlay.querySelector('.mgl-ref-close');
    function toggleReference(force) {
      refOpen = typeof force === 'boolean' ? force : !refOpen;
      refOverlay.classList.toggle('hidden', !refOpen);
      btnRef.classList.toggle('is-open', refOpen);
      sfx('sfxPaper'); haptic('light');
    }
    btnRef.addEventListener('click', function () { toggleReference(); });
    btnRefClose.addEventListener('click', function () { toggleReference(false); });
    body.appendChild(refOverlay);

    // Footer with reagent pipettes
    var footer = document.createElement('div');
    footer.className = 'mg-footer';
    var pipetteGrid = document.createElement('div');
    pipetteGrid.className = 'mgl-pipette-grid' + (scenario.pipettes.length >= 6 ? ' is-six' : '');
    var pipetteBtns = [];

    for (var pi = 0; pi < scenario.pipettes.length; pi++) {
      (function (rKey) {
        var rSpec = BLOOD_REAGENTS[rKey];
        if (!rSpec) return;
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'mgl-pipette';
        btn.innerHTML = '<span class="mgl-drop-dot ' + rSpec.dotClass + '"></span><span>' + rSpec.label + '</span>';
        btn.addEventListener('click', function () {
          if (phase !== 'lab') return;
          selectedReagent = rSpec.key;
          for (var j = 0; j < pipetteBtns.length; j++) pipetteBtns[j].classList.toggle('is-selected', pipetteBtns[j] === btn);
          sfx('sfxClick'); haptic('light');
        });
        pipetteGrid.appendChild(btn);
        pipetteBtns.push(btn);
      })(scenario.pipettes[pi]);
    }
    footer.appendChild(pipetteGrid);

    wrap.appendChild(header);
    wrap.appendChild(body);
    wrap.appendChild(footer);
    containerEl.appendChild(wrap);

    var ctx = canvas.getContext('2d');
    var cssW = 320, cssH = 380, dpr = 1;

    function syncErrHeader() {
      errEl.textContent = 'ОШИБКИ: ' + errorsCount + ' / ' + maxErrors;
      errEl.classList.toggle('is-warn', errorsCount >= maxErrors - 1);
    }

    function showLabToast(text, isOk, durationMs) {
      if (toastTimer !== null) { window.clearTimeout(toastTimer); toastTimer = null; }
      warnBanner.textContent = text;
      warnBanner.classList.toggle('is-ok', Boolean(isOk));
      warnBanner.classList.add('is-visible');
      toastTimer = window.setTimeout(function () {
        toastTimer = null;
        warnBanner.classList.remove('is-visible');
      }, durationMs || 1300);
    }

    function showFailOverlay(reason, msg) {
      phase = 'fail';
      footer.classList.add('hidden');
      conclusionEl.classList.add('hidden');
      overlaySlot.innerHTML = '';
      var panel = document.createElement('div');
      panel.className = 'mgl-overlay-panel';
      var card = document.createElement('div');
      card.className = 'mgl-overlay-card is-alert';
      var st = document.createElement('div');
      st.className = 'mgl-stamp';
      st.textContent = 'ПРОТОКОЛ АННУЛИРОВАН';
      var txt = document.createElement('div');
      txt.className = 'mgl-card-text';
      txt.textContent = msg || 'Превышен лимит ошибок лабораторного анализа.';
      card.appendChild(st); card.appendChild(txt);
      panel.appendChild(card); overlaySlot.appendChild(panel);
      endTimer = window.setTimeout(function () {
        endTimer = null;
        callbacks.onFail({ reason: reason, errors: errorsCount, scenarioId: scenario.id });
      }, 950);
    }

    function registerLabError(msg, reason) {
      errorsCount += 1;
      syncErrHeader();
      sfx('sfxAlert'); haptic('error');
      showLabToast(msg, false, 1500);
      if (errorsCount >= maxErrors) {
        endTimer = window.setTimeout(function () {
          endTimer = null;
          showFailOverlay(reason || 'too_many_errors', msg);
        }, 620);
      }
    }

    function openPhase3Deduction() {
      phase = 'deduce';
      counterEl.textContent = 'ФАЗА 3 // ВЫВОД';
      conclusionEl.classList.add('hidden');
      footer.classList.add('hidden');
      overlaySlot.innerHTML = '';

      var panel = document.createElement('div');
      panel.className = 'mgl-overlay-panel';
      var card = document.createElement('div');
      card.className = 'mgl-bl-deduce';

      var kicker = document.createElement('div');
      kicker.className = 'mgl-bl-dkicker';
      kicker.textContent = 'ФАЗА 3 // ЛАБОРАТОРНЫЙ ВЫВОД';
      card.appendChild(kicker);

      var facts = document.createElement('div');
      facts.className = 'mgl-bl-dfacts';
      for (var fi = 0; fi < scenario.facts.length; fi++) {
        var row = document.createElement('div');
        row.textContent = scenario.facts[fi];
        facts.appendChild(row);
      }
      card.appendChild(facts);

      var q = document.createElement('div');
      q.className = 'mgl-bl-dq';
      q.textContent = scenario.conclusion.question;
      card.appendChild(q);

      var optsEl = document.createElement('div');
      optsEl.className = 'mgl-bl-dopts';
      var fb = document.createElement('div');
      fb.className = 'mgl-bl-dfb';

      var settled = false;
      var opts = scenario.conclusion.options || [];
      for (var oi = 0; oi < opts.length; oi++) {
        (function (opt) {
          var ob = document.createElement('button');
          ob.type = 'button';
          ob.className = 'mgl-bl-dopt';
          ob.textContent = opt.text;
          ob.addEventListener('click', function () {
            if (settled || destroyed) return;
            if (opt.isCorrect) {
              settled = true;
              ob.classList.add('is-correct');
              fb.className = 'mgl-bl-dfb is-ok';
              fb.textContent = opt.reason;
              sfx('sfxStamp'); haptic('success');
              endTimer = window.setTimeout(function () {
                endTimer = null;
                card.innerHTML = '';
                var st = document.createElement('div');
                st.className = 'mgl-stamp';
                st.style.color = '#4ade80';
                st.style.borderColor = '#22c55e';
                st.textContent = scenario.stampWin;
                var btnDone = document.createElement('button');
                btnDone.type = 'button';
                btnDone.className = 'mg-btn mg-btn-primary';
                btnDone.textContent = 'ПРИОБЩИТЬ ПРОТОКОЛ К ДЕЛУ';
                btnDone.addEventListener('click', function () {
                  sfx('sfxStamp'); haptic('success');
                  callbacks.onSuccess({
                    bloodType: scenario.expectedGroup + scenario.expectedRh,
                    scenarioId: scenario.id,
                    errors: errorsCount,
                    deduced: opt.id
                  });
                });
                card.style.alignItems = 'center';
                card.style.gap = '14px';
                card.appendChild(st);
                card.appendChild(btnDone);
              }, 550);
            } else {
              errorsCount += 1;
              syncErrHeader();
              ob.classList.add('is-wrong');
              fb.className = 'mgl-bl-dfb';
              fb.textContent = opt.reason;
              sfx('sfxAlert'); haptic('error');
              if (errorsCount >= maxErrors) {
                settled = true;
                endTimer = window.setTimeout(function () {
                  endTimer = null;
                  showFailOverlay('wrong_deduction', 'Превышен лимит ошибок — протокол лаборатории аннулирован.');
                }, 680);
              }
            }
          });
          optsEl.appendChild(ob);
        })(opts[oi]);
      }

      card.appendChild(optsEl);
      card.appendChild(fb);
      panel.appendChild(card);
      overlaySlot.appendChild(panel);
    }

    function computeSlideLayout() {
      var padX = 12, padY = 10, gap = Math.max(10, Math.min(18, cssH * 0.045));
      var slideW = cssW - padX * 2;
      var slideH = Math.max(88, Math.min(168, (cssH - padY * 2 - gap) * 0.5));
      var startY = Math.max(padY, (cssH - (slideH * 2 + gap)) * 0.5);
      var wellR = Math.max(19, Math.min(30, (slideH - 36) * 0.42, (slideW - 44) / 7.2));
      var spacing = slideW / 3;

      for (var s = 0; s < slides.length; s++) {
        var sy = startY + s * (slideH + gap);
        slides[s].x = padX; slides[s].y = sy; slides[s].w = slideW; slides[s].h = slideH;
        var wellCy = sy + 24 + (slideH - 28) * 0.52;
        for (var w = 0; w < slides[s].wells.length; w++) {
          slides[s].wells[w].cx = padX + spacing * (w + 0.5);
          slides[s].wells[w].cy = wellCy;
          slides[s].wells[w].r = wellR;
        }
      }
    }

    function resizeCanvas() {
      if (destroyed) return;
      var rect = canvasWrap.getBoundingClientRect();
      cssW = Math.max(180, Math.floor(rect.width));
      cssH = Math.max(180, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      var pw = Math.floor(cssW * dpr), ph = Math.floor(cssH * dpr);
      if (canvas.width !== pw || canvas.height !== ph) { canvas.width = pw; canvas.height = ph; }
      computeSlideLayout();
    }

    function drawWell(well, now) {
      var x = well.cx, y = well.cy, r = well.r;
      var isErr = now < well.errorFlashUntil;
      ctx.save();
      ctx.beginPath(); ctx.arc(x, y, r + 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#0c0e13'; ctx.fill();
      ctx.strokeStyle = isErr ? '#ef4444' : well.reacted ? 'rgba(201,138,46,0.7)' : 'rgba(180,196,214,0.25)';
      ctx.lineWidth = isErr ? 2.2 : 1.3; ctx.stroke();

      ctx.save();
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.clip();

      if (!well.reacted) {
        if (well.visualKind === 'blood') {
          var rawG = ctx.createRadialGradient(x - r * 0.25, y - r * 0.25, r * 0.1, x, y, r);
          rawG.addColorStop(0, '#9e1c22'); rawG.addColorStop(0.65, '#6e1116'); rawG.addColorStop(1, '#46080c');
          ctx.fillStyle = rawG;
        } else {
          // Raw colorless-amber rag extract before chemical reagent
          var extG = ctx.createRadialGradient(x, y, r * 0.1, x, y, r);
          extG.addColorStop(0, '#6b6a5e'); extG.addColorStop(1, '#2b2d30');
          ctx.fillStyle = extG;
        }
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
      } else {
        var t = well.reactionTime;
        var reactPhase = Math.max(0, Math.min(1, (t - 0.2) / 1.1));
        if (well.visualKind === 'chem_magenta') {
          // Fujiwara (+) bright crimson-magenta chloroform reaction!
          var mgG = ctx.createRadialGradient(x, y, 2, x, y, r);
          mgG.addColorStop(0, 'rgba(244, 63, 94, ' + (0.4 + reactPhase * 0.6).toFixed(2) + ')');
          mgG.addColorStop(0.6, 'rgba(190, 24, 93, 0.92)');
          mgG.addColorStop(1, '#500724');
          ctx.fillStyle = mgG; ctx.fillRect(x - r, y - r, r * 2, r * 2);
        } else if (well.visualKind === 'chem_oil') {
          // Sudan-III (+) bright orange-red oil droplets
          ctx.fillStyle = '#36261a'; ctx.fillRect(x - r, y - r, r * 2, r * 2);
          for (var oc = 0; oc < 10; oc++) {
            var clO = well.clumps[oc];
            ctx.fillStyle = 'rgba(249, 115, 22, ' + (0.35 + reactPhase * 0.65).toFixed(2) + ')';
            ctx.beginPath();
            ctx.arc(x + clO.ex * r * 0.9, y + clO.ey * r * 0.9, clO.rad * r * 1.45 * (0.4 + 0.6 * reactPhase), 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (well.visualKind === 'chem_clear') {
          // Negative acetone test: pale clear-grey liquid
          ctx.fillStyle = '#475569'; ctx.fillRect(x - r, y - r, r * 2, r * 2);
        } else if (well.positive) {
          var sGrad = ctx.createRadialGradient(x, y, r * 0.15, x, y, r);
          sGrad.addColorStop(0, 'rgba(165, 65, 65, 0.88)');
          sGrad.addColorStop(0.7, 'rgba(160, 105, 98, 0.55)');
          sGrad.addColorStop(1, 'rgba(218, 178, 166, 0.45)');
          ctx.fillStyle = sGrad; ctx.fillRect(x - r, y - r, r * 2, r * 2);
          var ease = 1 - Math.pow(1 - reactPhase, 2.2);
          for (var c = 0; c < well.clumps.length; c++) {
            var cl = well.clumps[c];
            ctx.save();
            ctx.translate(x + (cl.sx + (cl.ex - cl.sx) * ease) * r, y + (cl.sy + (cl.ey - cl.sy) * ease) * r);
            ctx.rotate(cl.rot);
            ctx.fillStyle = cl.shade;
            ctx.beginPath();
            ctx.ellipse(0, 0, cl.rad * r * 1.15, cl.rad * r * 0.8, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        } else {
          var smG = ctx.createRadialGradient(x - r * 0.18, y - r * 0.18, r * 0.12, x, y, r);
          smG.addColorStop(0, '#9c2228'); smG.addColorStop(0.7, '#7a161b'); smG.addColorStop(1, '#580e13');
          ctx.fillStyle = smG; ctx.fillRect(x - r, y - r, r * 2, r * 2);
        }

        if (t < 0.55 && BLOOD_REAGENTS[well.reagent]) {
          ctx.strokeStyle = BLOOD_REAGENTS[well.reagent].dropColor;
          ctx.globalAlpha = Math.max(0, 1 - t / 0.55);
          ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(x, y, r * (0.2 + t * 1.1), 0, Math.PI * 2); ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      ctx.fillStyle = 'rgba(255, 255, 255, 0.16)';
      ctx.beginPath(); ctx.ellipse(x - r * 0.32, y - r * 0.34, r * 0.28, r * 0.13, -0.65, 0, Math.PI * 2); ctx.fill();
      ctx.restore();

      ctx.fillStyle = well.reacted ? '#c98a2e' : '#a2a7b4';
      ctx.font = '600 9.5px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.fillText(well.label, x, y + r + 4);
      ctx.restore();
    }

    function renderLab(now, dt) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#0c0e13'; ctx.fillRect(0, 0, cssW, cssH);

      for (var s = 0; s < slides.length; s++) {
        var sl = slides[s];
        ctx.save();
        ctx.fillStyle = 'rgba(26, 31, 40, 0.78)';
        ctx.strokeStyle = s === 1 ? 'rgba(201, 138, 46, 0.45)' : 'rgba(130, 150, 174, 0.35)';
        ctx.lineWidth = 1.2;
        ctx.fillRect(sl.x, sl.y, sl.w, sl.h);
        ctx.strokeRect(sl.x, sl.y, sl.w, sl.h);
        ctx.fillStyle = 'rgba(212, 202, 180, 0.12)';
        ctx.fillRect(sl.x + 1, sl.y + 1, sl.w - 2, 20);
        ctx.fillStyle = s === 1 ? '#e2c288' : '#d4cab4';
        ctx.font = '600 10px "IBM Plex Mono", monospace';
        ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.fillText(sl.title, sl.x + 8, sl.y + 11);
        ctx.restore();

        for (var w = 0; w < sl.wells.length; w++) drawWell(sl.wells[w], now);

        // Physical grime/oil film covering Slide #2 before wiping
        if (sl.film > 0.02) {
          ctx.save();
          ctx.globalAlpha = Math.max(0.18, Math.min(0.92, sl.film));
          ctx.fillStyle = '#29231b';
          ctx.fillRect(sl.x + 3, sl.y + 22, sl.w - 6, sl.h - 25);
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.7)'; ctx.lineWidth = 1.2; ctx.setLineDash([4, 3]);
          ctx.strokeRect(sl.x + 5, sl.y + 24, sl.w - 10, sl.h - 29); ctx.setLineDash([]);
          ctx.fillStyle = '#fde68a'; ctx.font = '700 10px "IBM Plex Mono", monospace';
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(sl.filmLabel || 'ПРОТРИТЕ ПЛЁНКУ ПАЛЬЦЕМ', sl.x + sl.w * 0.5, sl.y + 22 + (sl.h - 22) * 0.5);
          ctx.restore();
        }
      }

      for (var p = filmParticles.length - 1; p >= 0; p--) {
        var fp = filmParticles[p];
        fp.x += fp.vx * dt; fp.y += fp.vy * dt; fp.alpha -= dt * 1.9;
        if (fp.alpha <= 0) { filmParticles.splice(p, 1); continue; }
        ctx.fillStyle = 'rgba(92, 74, 52, ' + fp.alpha.toFixed(2) + ')';
        ctx.beginPath(); ctx.arc(fp.x, fp.y, fp.r, 0, Math.PI * 2); ctx.fill();
      }
    }

    function scrubSlideFilm(px, py, distPx) {
      for (var s = 0; s < slides.length; s++) {
        var sl = slides[s];
        if (sl.film <= 0) continue;
        if (px >= sl.x && px <= sl.x + sl.w && py >= sl.y + 20 && py <= sl.y + sl.h) {
          sl.film = Math.max(0, sl.film - Math.max(0.12, distPx * 0.008));
          for (var k = 0; k < 2; k++) {
            filmParticles.push({ x: px, y: py, vx: (Math.random() - 0.5) * 55, vy: (Math.random() - 0.3) * 40 + 12, r: 1.8, alpha: 0.9 });
          }
          if (sl.film <= 0.14) {
            sl.film = 0;
            sfx('sfxPaper'); haptic('medium');
            showLabToast('Стекло №2 очищено — теперь капайте реагенты!', true, 1300);
          }
        }
      }
    }

    function onPointerDown(e) {
      if (destroyed || phase !== 'lab' || refOpen) return;
      e.preventDefault();
      var rect = canvas.getBoundingClientRect();
      var px = e.clientX - rect.left, py = e.clientY - rect.top;
      pointerDown = true; lastPx = px; lastPy = py;
      try { canvas.setPointerCapture(e.pointerId); } catch (err) {}

      // If touching dirty film on a slide, scrub instead of dropping reagent
      for (var s = 0; s < slides.length; s++) {
        if (slides[s].film > 0.02 && px >= slides[s].x && px <= slides[s].x + slides[s].w && py >= slides[s].y + 20 && py <= slides[s].y + slides[s].h) {
          scrubSlideFilm(px, py, 10);
          return;
        }
      }

      var hitWell = null;
      for (var si = 0; si < slides.length; si++) {
        for (var wi = 0; wi < slides[si].wells.length; wi++) {
          var w = slides[si].wells[wi];
          if (Math.hypot(px - w.cx, py - w.cy) <= w.r + 10) { hitWell = w; break; }
        }
        if (hitWell) break;
      }
      if (!hitWell) return;
      if (hitWell.reacted) { showLabToast('Реагент уже добавлен в эту лунку.', false, 900); return; }
      if (!selectedReagent) { showLabToast('Выберите пипетку с реагентом внизу.', false, 1000); return; }

      if (BLOOD_REAGENTS[selectedReagent] && BLOOD_REAGENTS[selectedReagent].isDecoy) {
        hitWell.errorFlashUntil = performance.now() + 500;
        registerLabError('ЛОЖНЫЙ РЕАГЕНТ (+1): физраствор NaCl разбавляет пробу и не даёт серологической реакции!', 'decoy_reagent');
        return;
      }

      if (selectedReagent !== hitWell.reagent) {
        hitWell.errorFlashUntil = performance.now() + 500;
        registerLabError('Неверный реагент для лунки «' + hitWell.label + '» (+1 ошибка)!', 'wrong_reagent');
        return;
      }

      hitWell.reacted = true;
      hitWell.reactionTime = 0;
      reactedCount += 1;
      counterEl.textContent = 'ЛУНОК: ' + reactedCount + ' / 6';
      sfx('sfxClick'); haptic('light');

      if (reactedCount >= 6) {
        phase = 'formula';
        sfx('sfxSuccess'); haptic('success');
        counterEl.textContent = 'ФАЗА 2: ФОРМУЛА КРОВИ';
        footer.classList.add('hidden');
        conclusionEl.classList.remove('hidden');
        showLabToast('Изучите реакции на Стекле №2 и укажите группу крови!', true, 1600);
        window.requestAnimationFrame(resizeCanvas);
      }
    }

    function onPointerMove(e) {
      if (!pointerDown || destroyed || phase !== 'lab') return;
      var rect = canvas.getBoundingClientRect();
      var px = e.clientX - rect.left, py = e.clientY - rect.top;
      var dist = Math.hypot(px - lastPx, py - lastPy);
      lastPx = px; lastPy = py;
      scrubSlideFilm(px, py, dist);
    }

    function onPointerUp() { pointerDown = false; }
    function onContextMenu(e) { e.preventDefault(); }

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);
    canvas.addEventListener('contextmenu', onContextMenu);

    if (typeof window.ResizeObserver === 'function') {
      resizeObserver = new window.ResizeObserver(resizeCanvas);
      resizeObserver.observe(canvasWrap);
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function tick(now) {
      if (destroyed) return;
      var dt = Math.min((now - lastFrameTime) / 1000, 0.1);
      lastFrameTime = now;
      for (var s = 0; s < slides.length; s++) {
        for (var w = 0; w < slides[s].wells.length; w++) {
          if (slides[s].wells[w].reacted && slides[s].wells[w].reactionTime < 3) {
            slides[s].wells[w].reactionTime += dt;
          }
        }
      }
      renderLab(now, dt);
      rafId = window.requestAnimationFrame(tick);
    }
    rafId = window.requestAnimationFrame(tick);

    return function cleanup() {
      destroyed = true;
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      if (toastTimer !== null) window.clearTimeout(toastTimer);
      if (endTimer !== null) window.clearTimeout(endTimer);
      if (resizeObserver) { try { resizeObserver.disconnect(); } catch (e) {} }
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('contextmenu', onContextMenu);
    };
  });
})();
