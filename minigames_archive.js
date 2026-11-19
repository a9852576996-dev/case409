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
      'color: #c98a2e;' +
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
      'grid-template-columns: repeat(3, 1fr);' +
      'gap: 6px;' +
    '}' +
    '.mga-tab {' +
      'position: relative;' +
      'display: flex;' +
      'align-items: center;' +
      'justify-content: center;' +
      'gap: 4px;' +
      'padding: 8px 5px;' +
      'background: #15171c;' +
      'border: 1px solid #2a2e38;' +
      'border-bottom: 2px solid transparent;' +
      'border-radius: 3px;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 10px;' +
      'font-weight: 600;' +
      'letter-spacing: 0.04em;' +
      'color: #8f95a3;' +
      'text-transform: uppercase;' +
      'cursor: pointer;' +
      'transition: background-color 0.14s ease, border-color 0.14s ease, color 0.14s ease;' +
    '}' +
    '.mga-tab.is-active {' +
      'background: #1e222b;' +
      'border-color: #3a404f;' +
      'border-bottom-color: #c98a2e;' +
      'color: #e2dfd7;' +
    '}' +
    '.mga-tab-check {' +
      'display: none;' +
      'align-items: center;' +
      'justify-content: center;' +
      'width: 14px;' +
      'height: 14px;' +
      'border-radius: 50%;' +
      'background: rgba(153, 27, 27, 0.25);' +
      'border: 1px solid #dc2626;' +
      'color: #ef4444;' +
      'font-size: 9px;' +
      'line-height: 1;' +
      'flex-shrink: 0;' +
    '}' +
    '.mga-tab.is-done .mga-tab-check {' +
      'display: inline-flex;' +
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
      'background: linear-gradient(180deg, #dad1bd 0%, #d4cab4 55%, #cbc0a7 100%);' +
      'color: #1a1815;' +
      'border: 1px solid #9d9178;' +
      'border-radius: 2px;' +
      'padding: 14px 12px 16px;' +
      'box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6), inset 0 0 28px rgba(84, 68, 42, 0.24);' +
      'font-family: "IBM Plex Mono", monospace;' +
    '}' +
    '.mga-paper-head {' +
      'position: relative;' +
      'padding-bottom: 8px;' +
      'margin-bottom: 8px;' +
      'border-bottom: 1.5px solid rgba(26, 24, 21, 0.5);' +
    '}' +
    '.mga-paper-kicker {' +
      'font-size: 9.5px;' +
      'letter-spacing: 0.08em;' +
      'color: rgba(26, 24, 21, 0.68);' +
      'text-transform: uppercase;' +
    '}' +
    '.mga-paper-title {' +
      'font-family: "Oswald", sans-serif;' +
      'font-size: 16px;' +
      'font-weight: 700;' +
      'letter-spacing: 0.06em;' +
      'color: #1a1815;' +
      'text-transform: uppercase;' +
      'margin-top: 2px;' +
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
      'gap: 2px;' +
    '}' +
    '.mga-paper-row {' +
      'width: 100%;' +
      'text-align: left;' +
      'padding: 8px 7px;' +
      'background: transparent;' +
      'border: 1px solid transparent;' +
      'border-bottom: 1px dashed rgba(26, 24, 21, 0.24);' +
      'border-radius: 2px;' +
      'color: #1a1815;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 11.5px;' +
      'line-height: 1.46;' +
      'cursor: pointer;' +
      'display: block;' +
      'transition: background-color 0.15s ease, border-color 0.15s ease;' +
    '}' +
    '.mga-paper-row:last-child {' +
      'border-bottom-color: transparent;' +
    '}' +
    '.mga-paper-row:active {' +
      'background: rgba(26, 24, 21, 0.07);' +
    '}' +
    '.mga-field-label {' +
      'display: block;' +
      'font-size: 10px;' +
      'font-weight: 600;' +
      'letter-spacing: 0.06em;' +
      'text-transform: uppercase;' +
      'color: rgba(26, 24, 21, 0.66);' +
      'margin-bottom: 2px;' +
    '}' +
    '.mga-whiteout {' +
      'display: inline-block;' +
      'position: relative;' +
      'padding: 0 4px;' +
      'margin: 0 1px;' +
      'background: linear-gradient(176deg, #e7e1d4 0%, #dfd7c5 100%);' +
      'border-radius: 2px 4px 2px 3px;' +
      'box-shadow: 0 0 2px rgba(231, 225, 212, 0.9);' +
      'font-weight: 600;' +
      'color: #151412;' +
      'transform: rotate(-1.2deg);' +
    '}' +
    '.mga-whiteout::before {' +
      'content: "IV(AB)";' +
      'position: absolute;' +
      'left: 2px;' +
      'top: 0;' +
      'font-size: 10px;' +
      'color: rgba(26, 24, 21, 0.1);' +
      'pointer-events: none;' +
      'letter-spacing: -0.04em;' +
    '}' +
    '.mga-roster-head {' +
      'display: grid;' +
      'grid-template-columns: 1.35fr repeat(4, 1fr);' +
      'gap: 3px;' +
      'padding: 5px 6px;' +
      'background: rgba(26, 24, 21, 0.09);' +
      'border-top: 1px solid rgba(26, 24, 21, 0.45);' +
      'border-bottom: 1px solid rgba(26, 24, 21, 0.45);' +
      'font-size: 9.5px;' +
      'font-weight: 600;' +
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
      'border-radius: 2px;' +
      'color: #1a1815;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'cursor: pointer;' +
      'display: flex;' +
      'flex-direction: column;' +
      'gap: 4px;' +
      'transition: background-color 0.15s ease, border-color 0.15s ease;' +
    '}' +
    '.mga-roster-row:active {' +
      'background: rgba(26, 24, 21, 0.07);' +
    '}' +
    '.mga-roster-cells {' +
      'display: grid;' +
      'grid-template-columns: 1.35fr repeat(4, 1fr);' +
      'gap: 3px;' +
      'align-items: center;' +
      'font-size: 10px;' +
      'text-align: center;' +
    '}' +
    '.mga-roster-name {' +
      'text-align: left;' +
      'font-weight: 600;' +
      'font-size: 10.5px;' +
    '}' +
    '.mga-roster-note {' +
      'font-size: 9.5px;' +
      'color: rgba(26, 24, 21, 0.72);' +
      'font-style: italic;' +
      'line-height: 1.3;' +
    '}' +
    '.mga-billing-wrap {' +
      'display: flex;' +
      'flex-direction: column;' +
      'gap: 9px;' +
    '}' +
    '.mga-radar-card {' +
      'background: #101318;' +
      'border: 1px solid #2a2e38;' +
      'border-radius: 3px;' +
      'padding: 8px;' +
      'display: flex;' +
      'flex-direction: column;' +
      'gap: 6px;' +
    '}' +
    '.mga-radar-meta {' +
      'display: flex;' +
      'align-items: center;' +
      'justify-content: space-between;' +
      'gap: 6px;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 9.5px;' +
      'font-weight: 600;' +
      'color: #c98a2e;' +
      'letter-spacing: 0.04em;' +
    '}' +
    '.mga-radar-svg {' +
      'width: 100%;' +
      'height: 112px;' +
      'display: block;' +
      'background: #090b0f;' +
      'border: 1px solid #202530;' +
      'border-radius: 2px;' +
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
      'background: #15171c;' +
      'border: 1px solid #2a2e38;' +
      'border-radius: 3px;' +
      'color: #d4cab4;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 11px;' +
      'line-height: 1.44;' +
      'cursor: pointer;' +
      'display: flex;' +
      'flex-direction: column;' +
      'gap: 3px;' +
      'transition: background-color 0.15s ease, border-color 0.15s ease;' +
    '}' +
    '.mga-log-row:active {' +
      'background: #1d2129;' +
    '}' +
    '.mga-log-top {' +
      'display: flex;' +
      'align-items: center;' +
      'justify-content: space-between;' +
      'gap: 6px;' +
      'font-size: 10px;' +
      'color: #9ba1ae;' +
    '}' +
    '.mga-log-id {' +
      'font-weight: 600;' +
      'color: #e2dfd7;' +
    '}' +
    '.mga-paper-row.is-miss-flash,' +
    '.mga-roster-row.is-miss-flash {' +
      'background: rgba(185, 28, 28, 0.24) !important;' +
      'border-color: rgba(185, 28, 28, 0.7) !important;' +
    '}' +
    '.mga-log-row.is-miss-flash {' +
      'background: rgba(153, 27, 27, 0.34) !important;' +
      'border-color: #dc2626 !important;' +
    '}' +
    '.mga-paper-row.is-found,' +
    '.mga-roster-row.is-found {' +
      'background: rgba(153, 27, 27, 0.13) !important;' +
      'border: 2px solid #991b1b !important;' +
      'box-shadow: inset 0 0 0 1px rgba(220, 38, 38, 0.28);' +
      'position: relative;' +
    '}' +
    '.mga-log-row.is-found {' +
      'background: rgba(153, 27, 27, 0.24) !important;' +
      'border: 2px solid #dc2626 !important;' +
      'box-shadow: 0 0 12px rgba(220, 38, 38, 0.22);' +
      'position: relative;' +
    '}' +
    '.mga-callout {' +
      'margin-top: 8px;' +
      'padding: 8px 10px;' +
      'background: rgba(153, 27, 27, 0.92);' +
      'border: 1px solid #ef4444;' +
      'border-left: 3px solid #fca5a5;' +
      'border-radius: 3px;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 11px;' +
      'line-height: 1.45;' +
      'color: #fff3f3;' +
      'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.45);' +
    '}' +
    '.mga-footer-status {' +
      'flex: 1;' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 11px;' +
      'line-height: 1.38;' +
      'color: #a1a6b3;' +
    '}' +
    '.mga-footer-status.is-err {' +
      'color: #fca5a5;' +
    '}' +
    '.mga-footer-status.is-ok {' +
      'color: #e2b15f;' +
    '}' +
    '.mga-stamp-overlay {' +
      'position: absolute;' +
      'inset: 0;' +
      'z-index: 16;' +
      'display: flex;' +
      'flex-direction: column;' +
      'align-items: center;' +
      'justify-content: center;' +
      'gap: 18px;' +
      'padding: 18px;' +
      'background: rgba(9, 10, 13, 0.86);' +
      'backdrop-filter: blur(2px);' +
      '-webkit-backdrop-filter: blur(2px);' +
    '}' +
    '.mga-big-stamp {' +
      'padding: 10px 18px;' +
      'font-family: "Oswald", sans-serif;' +
      'font-size: 22px;' +
      'font-weight: 700;' +
      'letter-spacing: 0.12em;' +
      'line-height: 1.2;' +
      'text-transform: uppercase;' +
      'text-align: center;' +
      'color: #dc2626;' +
      'background: rgba(153, 27, 27, 0.14);' +
      'border: 4px double #dc2626;' +
      'border-radius: 4px;' +
      'transform: rotate(-7deg);' +
      'box-shadow: 0 0 26px rgba(153, 27, 27, 0.45), inset 0 0 0 1px rgba(239, 68, 68, 0.35);' +
      'animation: mgaStampSlam 0.32s cubic-bezier(0.18, 0.88, 0.32, 1.05);' +
    '}' +
    '@keyframes mgaStampSlam {' +
      '0% { opacity: 0; transform: scale(1.65) rotate(-13deg); }' +
      '100% { opacity: 1; transform: scale(1) rotate(-7deg); }' +
    '}' +
    '.mga-complete-btn {' +
      'width: 100%;' +
      'max-width: 310px;' +
      'opacity: 0;' +
      'transform: translateY(8px);' +
      'pointer-events: none;' +
      'transition: opacity 0.25s ease, transform 0.25s ease;' +
    '}' +
    '.mga-complete-btn.is-ready {' +
      'opacity: 1;' +
      'transform: translateY(0);' +
      'pointer-events: auto;' +
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

  function haptic(type) {
    window.GameMinigames.haptic(type);
  }

  function sfx(name) {
    window.GameMinigames.sfx(name);
  }

  function buildBillingSvg(anomalyFound) {
    var gapStroke = anomalyFound ? '#ef4444' : 'rgba(201, 138, 46, 0.22)';
    var t3Ring = anomalyFound ? '#ef4444' : '#c98a2e';
    var t4Ring = anomalyFound ? '#ef4444' : '#6f7787';

    return (
      '<svg class="mga-radar-svg" viewBox="0 0 340 112" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
        '<g stroke="#1b212c" stroke-width="0.8">' +
          '<line x1="0" y1="28" x2="340" y2="28"/>' +
          '<line x1="0" y1="56" x2="340" y2="56"/>' +
          '<line x1="0" y1="84" x2="340" y2="84"/>' +
          '<line x1="85" y1="0" x2="85" y2="112"/>' +
          '<line x1="170" y1="0" x2="170" y2="112"/>' +
          '<line x1="255" y1="0" x2="255" y2="112"/>' +
        '</g>' +
        '<path d="M12 86 Q 92 78, 165 56 T 328 34" fill="none" stroke="#475063" stroke-width="3"/>' +
        '<path d="M12 86 Q 92 78, 165 56 T 328 34" fill="none" stroke="#0b0c0e" stroke-width="1.4" stroke-dasharray="4 4"/>' +
        '<circle cx="48" cy="76" r="18" fill="none" stroke="#3b4456" stroke-width="1" stroke-dasharray="2 3"/>' +
        '<circle cx="128" cy="64" r="18" fill="none" stroke="#3b4456" stroke-width="1" stroke-dasharray="2 3"/>' +
        '<circle cx="212" cy="48" r="22" fill="rgba(153,27,27,0.12)" stroke="' + t3Ring + '" stroke-width="1.1" stroke-dasharray="3 2"/>' +
        '<circle cx="296" cy="40" r="18" fill="none" stroke="' + t4Ring + '" stroke-width="1" stroke-dasharray="2 3"/>' +
        (anomalyFound
          ? '<path d="M212 48 Q 254 20, 296 40" fill="none" stroke="' + gapStroke + '" stroke-width="1.6" stroke-dasharray="4 3"/>' +
            '<text x="254" y="23" text-anchor="middle" fill="#fca5a5" font-family="IBM Plex Mono, monospace" font-size="8.5" font-weight="600">OFF 22:00 → ON 22:40</text>'
          : '') +
        '<g font-family="IBM Plex Mono, monospace" font-size="8.5" font-weight="600">' +
          '<circle cx="48" cy="76" r="3.5" fill="#9ba1ae"/>' +
          '<text x="48" y="102" text-anchor="middle" fill="#8f95a3">БС №1</text>' +
          '<circle cx="128" cy="64" r="3.5" fill="#9ba1ae"/>' +
          '<text x="128" y="92" text-anchor="middle" fill="#8f95a3">БС №2</text>' +
          '<circle cx="212" cy="48" r="4" fill="' + t3Ring + '"/>' +
          '<text x="212" y="80" text-anchor="middle" fill="#d4cab4">БС №3 ДЕПО</text>' +
          '<circle cx="296" cy="40" r="3.5" fill="' + t4Ring + '"/>' +
          '<text x="296" y="69" text-anchor="middle" fill="#8f95a3">БС №4 (+4км)</text>' +
        '</g>' +
        '<text x="200" y="38" fill="#ef4444" font-family="IBM Plex Mono, monospace" font-size="10" font-weight="600">✕</text>' +
      '</svg>'
    );
  }

  window.GameMinigames.register('archive_audit', function (containerEl, config, callbacks) {
    injectArchiveStyles();

    var suspectName = config.suspectName || 'Краснов И.С.';
    var maxErrors = typeof config.maxErrors === 'number' && config.maxErrors > 0 ? config.maxErrors : 4;
    var dates =
      Array.isArray(config.dates) && config.dates.length === 4
        ? config.dates
        : ['14.09', '19.11', '03.03', '22.10'];

    var activeTab = 'protocol'; // 'protocol' | 'roster' | 'billing'
    var foundState = {
      protocol: false,
      roster: false,
      billing: false
    };
    var foundCount = 0;
    var errorsCount = 0;
    var locked = false;
    var destroyed = false;
    var timers = [];

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

    // Document data
    var protocolFields = [
      {
        id: 'p_date',
        label: 'Дата и условия осмотра',
        text: '14.09.2022, 05:20–07:05. Освещение искусственное, +6°C, мелкий моросящий дождь, грунт сырой.',
        isForgery: false
      },
      {
        id: 'p_place',
        label: 'Место обнаружения',
        text: 'Товарная ветка, 4-й км, дренажный лоток у переезда №2. Признаков волочения по щебню не зафиксировано.',
        isForgery: false
      },
      {
        id: 'p_witness',
        label: 'Понятые при осмотре',
        text: 'Смирнов П.А. (пут. обходчик), Кузнецова Л.Н. (деж. по переезду). Замечаний по ходу осмотра не поступало.',
        isForgery: false
      },
      {
        id: 'p_evidence',
        label: 'Изъятые вещественные доказательства',
        text: 'Пакет №1 — обрывок ткани со следами смазки; Пакет №2 — марлевый смыв; смартфон и документы не обнаружены.',
        isForgery: false
      },
      {
        id: 'p_blood',
        label: 'Группа крови образца №2',
        hasWhiteout: true,
        beforeWhiteout: 'По результатам смыва с изъятого фрагмента установлена группа ',
        whiteoutText: 'I(0)',
        afterWhiteout: ' Rh+. Заверено: подпись деж. по ОВД Соколов (графа судмедэксперта не заполнена).',
        isForgery: true,
        callout:
          'ПОДЛОГ ПРОТОКОЛА №1: Поверх неаккуратной светлой замазки вписана группа «I(0)» вместо «IV(AB)», а вместо подписи судмедэксперта стоит роспись дежурного.'
      },
      {
        id: 'p_expert',
        label: 'Заключение первичного осмотра',
        text: 'Смерть наступила от острой кровопотери ~6–7 часов назад. Материалы направлены для сверки по базам.',
        isForgery: false
      },
      {
        id: 'p_resolution',
        label: 'Резолюция начальника СО',
        text: 'Приобщить к архивному накопителю Эпизода №1. За неустановлением лица — производство приостановить.',
        isForgery: false
      }
    ];

    var rosterRows = [
      {
        id: 'r_1',
        name: 'Воронов А.П.',
        cells: ['Деж.', 'Вых.', 'Деж.', 'Деж.'],
        note: 'Прим.: график дежурств утверждён приказом №41',
        isForgery: false
      },
      {
        id: 'r_2',
        name: 'Мельников Д.В.',
        cells: ['Вых.', 'Деж.', 'Отп.', 'Деж.'],
        note: 'Прим.: отпускной лист №118 в личном деле',
        isForgery: false
      },
      {
        id: 'r_3',
        name: 'Савельева Е.Г.',
        cells: ['Деж.', 'Деж.', 'Вых.', 'Больн.'],
        note: 'Прим.: лист нетрудоспособности №804 закрыт',
        isForgery: false
      },
      {
        id: 'r_4',
        name: suspectName,
        cells: ['Отг/хоз', 'Отг/хоз', 'Отг/хоз', 'Отг/хоз'],
        note: 'Прим.: отгул / хозработы — согласовано устно',
        isForgery: true,
        callout:
          'ПОДЛОГ ТАБЕЛЯ: У сотрудника «' +
          suspectName +
          '» ровно в ночи всех 4 эпизодов оформлены «отгул / хозработы» с припиской «согласовано устно» — без подтверждённых приказов.'
      },
      {
        id: 'r_5',
        name: 'Тихонов О.Р.',
        cells: ['Деж.', 'Вых.', 'Деж.', 'Вых.'],
        note: 'Прим.: табель сверен кадровой службой ОВД',
        isForgery: false
      }
    ];

    var billingLogs = [
      {
        id: 'b_1',
        abonent: 'АБ-7912***44 (Гражд.)',
        time: '21:50–22:38',
        detail: 'БС №1 → БС №2. Стабильная сессия 4G, транзитный проезд по окружному шоссе без остановок.',
        isForgery: false
      },
      {
        id: 'b_2',
        abonent: 'СЛУЖ-09 (Экипаж ППС)',
        time: '22:04–22:55',
        detail: 'БС №2 (Переезд). Штатная телеметрия бортового терминала, отметка дежурства на переезде.',
        isForgery: false
      },
      {
        id: 'b_3',
        abonent: 'АБ-7905***18 (Потерпевшая)',
        time: '22:14–22:22',
        detail: 'БС №3 (Промзона / депо). Исходящие пакеты мессенджера, обрыв регистрации в 22:22.',
        isForgery: false
      },
      {
        id: 'b_4',
        abonent: 'СЛУЖ-14 (Деж. часть ОВД)',
        time: '21:30–23:10',
        detail: 'БС №1 (Город). Стационарный приём сигнала в здании отдела, смена базовых станций не фиксировалась.',
        isForgery: false
      },
      {
        id: 'b_5',
        abonent: 'IMEI-409-C (Служебный, допуск «С»)',
        time: '22:00 / 22:40',
        detail:
          'БС №3 (Промзона / депо): в 22:00 принудительный «АВИАРЕЖИМ / ПОТЕРЯ СЕТИ» (за 25 мин до смерти). В 22:40 повторный выход в сеть у БС №4 (через 15 мин после смерти, в 4 км от ветки).',
        isForgery: true,
        callout:
          'ПОДЛОГ БИЛЛИНГА: Служебный терминал допуска «С» засветился у БС №3 (депо), принудительно отключился ровно за 25 минут до смерти и снова включился через 15 минут в 4 км от ветки.'
      },
      {
        id: 'b_6',
        abonent: 'АБ-7981***63 (Машинист)',
        time: '22:18–22:29',
        detail: 'БС №2 → БС №3 → БС №4. Сквозной проход товарного состава №2104 по графику ветки.',
        isForgery: false
      }
    ];

    // Build Shell DOM
    var wrap = document.createElement('div');
    wrap.className = 'mg-wrap';

    var header = document.createElement('div');
    header.className = 'mg-header';

    var headInfo = document.createElement('div');
    headInfo.className = 'mg-header-info';

    var titleEl = document.createElement('div');
    titleEl.className = 'mg-header-title';
    titleEl.textContent = config.title || 'АРХИВНЫЙ АУДИТ';

    var statsRow = document.createElement('div');
    statsRow.className = 'mga-stats';

    var foundStatEl = document.createElement('span');
    foundStatEl.className = 'mga-stat-found';
    foundStatEl.textContent = 'НЕСТЫКОВОК: 0 / 3';

    var errStatEl = document.createElement('span');
    errStatEl.className = 'mga-stat-err';
    errStatEl.textContent = 'ОШИБОК: 0 / ' + maxErrors;

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

    // 3 Document Tabs
    var tabsBar = document.createElement('div');
    tabsBar.className = 'mga-tabs';

    var tabSpecs = [
      { key: 'protocol', label: 'ПРОТОКОЛ №1' },
      { key: 'roster', label: 'ТАБЕЛЬ СМЕН' },
      { key: 'billing', label: 'БИЛЛИНГ ВЫШЕК' }
    ];
    var tabButtons = {};

    for (var ti = 0; ti < tabSpecs.length; ti++) {
      (function (spec) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'mga-tab';
        if (spec.key === activeTab) {
          btn.classList.add('is-active');
        }

        var txt = document.createElement('span');
        txt.textContent = spec.label;

        var chk = document.createElement('span');
        chk.className = 'mga-tab-check';
        chk.textContent = '✓';

        btn.appendChild(txt);
        btn.appendChild(chk);

        btn.addEventListener('click', function () {
          if (locked || activeTab === spec.key) {
            return;
          }
          activeTab = spec.key;
          syncTabButtons();
          sfx(spec.key === 'billing' ? 'sfxClick' : 'sfxPaper');
          haptic('light');
          renderActiveDocument();
        });

        tabsBar.appendChild(btn);
        tabButtons[spec.key] = btn;
      })(tabSpecs[ti]);
    }

    var body = document.createElement('div');
    body.className = 'mg-body';

    var docScroll = document.createElement('div');
    docScroll.className = 'mga-doc-scroll';
    body.appendChild(docScroll);

    var footer = document.createElement('div');
    footer.className = 'mg-footer';

    var footerStatus = document.createElement('div');
    footerStatus.className = 'mga-footer-status';
    footerStatus.textContent = 'Изучите сканы и тапните по графе, содержащей фальсификацию.';
    footer.appendChild(footerStatus);

    wrap.appendChild(header);
    wrap.appendChild(tabsBar);
    wrap.appendChild(body);
    wrap.appendChild(footer);
    containerEl.appendChild(wrap);

    function syncHeaderStats() {
      foundStatEl.textContent = 'НЕСТЫКОВОК: ' + foundCount + ' / 3';
      errStatEl.textContent = 'ОШИБОК: ' + errorsCount + ' / ' + maxErrors;
      errStatEl.classList.toggle('is-warn', errorsCount >= maxErrors - 1);
    }

    function syncTabButtons() {
      var keys = Object.keys(tabButtons);
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        tabButtons[k].classList.toggle('is-active', activeTab === k);
        tabButtons[k].classList.toggle('is-done', Boolean(foundState[k]));
      }
    }

    function setFooterStatus(text, tone) {
      footerStatus.textContent = text;
      footerStatus.classList.remove('is-err', 'is-ok');
      if (tone === 'err') {
        footerStatus.classList.add('is-err');
      } else if (tone === 'ok') {
        footerStatus.classList.add('is-ok');
      }
    }

    function triggerFailOverlay() {
      locked = true;
      var ov = document.createElement('div');
      ov.className = 'mga-stamp-overlay';

      var stamp = document.createElement('div');
      stamp.className = 'mga-big-stamp';
      stamp.textContent = 'АУДИТ ПРОВАЛЕН';

      var sub = document.createElement('div');
      sub.style.fontFamily = '"IBM Plex Mono", monospace';
      sub.style.fontSize = '12px';
      sub.style.color = '#d4cab4';
      sub.style.textAlign = 'center';
      sub.textContent = 'Превышен лимит ошибочных отметок. Архив закрыт на повторную проверку.';

      ov.appendChild(stamp);
      ov.appendChild(sub);
      body.appendChild(ov);

      addTimer(function () {
        callbacks.onFail({ reason: 'too_many_misses' });
      }, 950);
    }

    function triggerWinStamp() {
      locked = true;
      sfx('sfxStamp');
      haptic('heavy');
      setFooterStatus('Все 3 подлога подтверждены.', 'ok');

      var ov = document.createElement('div');
      ov.className = 'mga-stamp-overlay';

      var stamp = document.createElement('div');
      stamp.className = 'mga-big-stamp';
      stamp.textContent = 'ФАЛЬСИФИКАЦИЯ ПОДТВЕРЖДЕНА';

      var btnAttach = document.createElement('button');
      btnAttach.type = 'button';
      btnAttach.className = 'mg-btn mg-btn-danger mga-complete-btn';
      btnAttach.textContent = 'ПРИОБЩИТЬ К МАТЕРИАЛАМ ДЕЛА';
      btnAttach.addEventListener('click', function () {
        sfx('sfxStamp');
        haptic('success');
        callbacks.onSuccess({ anomaliesFound: 3 });
      });

      ov.appendChild(stamp);
      ov.appendChild(btnAttach);
      body.appendChild(ov);

      addTimer(function () {
        btnAttach.classList.add('is-ready');
      }, 800);
    }

    function handleItemClick(tabKey, itemObj, rowEl) {
      if (locked || destroyed) {
        return;
      }

      if (itemObj.isForgery) {
        if (foundState[tabKey]) {
          haptic('light');
          setFooterStatus('Подлог в этом документе уже зафиксирован.', 'ok');
          return;
        }

        foundState[tabKey] = true;
        foundCount += 1;
        syncHeaderStats();
        syncTabButtons();
        sfx('sfxStamp');
        haptic('success');
        setFooterStatus('Нестыковка зафиксирована (' + foundCount + ' / 3).', 'ok');
        renderActiveDocument();

        if (foundCount >= 3) {
          addTimer(function () {
            triggerWinStamp();
          }, 480);
        }
        return;
      }

      // Normal non-forged row -> error
      errorsCount += 1;
      syncHeaderStats();
      sfx('sfxAlert');
      haptic('error');
      setFooterStatus('Нарушений в этой графе не выявлено', 'err');

      rowEl.classList.remove('is-miss-flash');
      void rowEl.offsetWidth;
      rowEl.classList.add('is-miss-flash');
      addTimer(function () {
        rowEl.classList.remove('is-miss-flash');
      }, 420);

      if (errorsCount >= maxErrors) {
        triggerFailOverlay();
      }
    }

    function renderProtocolTab() {
      var paper = document.createElement('div');
      paper.className = 'mga-paper';

      var head = document.createElement('div');
      head.className = 'mga-paper-head';
      head.innerHTML =
        '<div class="mga-paper-kicker">АРХИВ СК // ЭПИЗОД №1 · КОПИЯ</div>' +
        '<div class="mga-paper-title">ПРОТОКОЛ ОСМОТРА №114-08</div>' +
        '<div class="mga-paper-stamp">В АРХИВ</div>';
      paper.appendChild(head);

      var list = document.createElement('div');
      list.className = 'mga-field-list';

      for (var i = 0; i < protocolFields.length; i++) {
        (function (field) {
          var row = document.createElement('button');
          row.type = 'button';
          row.className = 'mga-paper-row';

          var isMarked = field.isForgery && foundState.protocol;
          if (isMarked) {
            row.classList.add('is-found');
          }

          var labelEl = document.createElement('span');
          labelEl.className = 'mga-field-label';
          labelEl.textContent = field.label;
          row.appendChild(labelEl);

          if (field.hasWhiteout) {
            var valWrap = document.createElement('span');
            valWrap.appendChild(document.createTextNode(field.beforeWhiteout));
            var wo = document.createElement('span');
            wo.className = 'mga-whiteout';
            wo.textContent = field.whiteoutText;
            valWrap.appendChild(wo);
            valWrap.appendChild(document.createTextNode(field.afterWhiteout));
            row.appendChild(valWrap);
          } else {
            var textEl = document.createElement('span');
            textEl.textContent = field.text;
            row.appendChild(textEl);
          }

          row.addEventListener('click', function () {
            handleItemClick('protocol', field, row);
          });

          list.appendChild(row);

          if (isMarked && field.callout) {
            var callout = document.createElement('div');
            callout.className = 'mga-callout';
            callout.textContent = field.callout;
            list.appendChild(callout);
          }
        })(protocolFields[i]);
      }

      paper.appendChild(list);
      docScroll.appendChild(paper);
    }

    function renderRosterTab() {
      var paper = document.createElement('div');
      paper.className = 'mga-paper';

      var head = document.createElement('div');
      head.className = 'mga-paper-head';
      head.innerHTML =
        '<div class="mga-paper-kicker">ОТДЕЛ КАДРОВ // СВОДКА ЗА 4 ЭПИЗОДА</div>' +
        '<div class="mga-paper-title">ТАБЕЛЬ НОЧНЫХ СМЕН ОПЕРГРУППЫ</div>' +
        '<div class="mga-paper-stamp">В АРХИВ</div>';
      paper.appendChild(head);

      var tableHead = document.createElement('div');
      tableHead.className = 'mga-roster-head';
      var hName = document.createElement('span');
      hName.textContent = 'СОТРУДНИК';
      tableHead.appendChild(hName);
      for (var d = 0; d < dates.length; d++) {
        var hDate = document.createElement('span');
        hDate.textContent = dates[d];
        tableHead.appendChild(hDate);
      }
      paper.appendChild(tableHead);

      var list = document.createElement('div');
      list.className = 'mga-field-list';

      for (var i = 0; i < rosterRows.length; i++) {
        (function (rObj) {
          var row = document.createElement('button');
          row.type = 'button';
          row.className = 'mga-roster-row';

          var isMarked = rObj.isForgery && foundState.roster;
          if (isMarked) {
            row.classList.add('is-found');
          }

          var cellsRow = document.createElement('div');
          cellsRow.className = 'mga-roster-cells';

          var nameCell = document.createElement('span');
          nameCell.className = 'mga-roster-name';
          nameCell.textContent = rObj.name;
          cellsRow.appendChild(nameCell);

          for (var c = 0; c < rObj.cells.length; c++) {
            var cEl = document.createElement('span');
            cEl.textContent = rObj.cells[c];
            cellsRow.appendChild(cEl);
          }

          var noteEl = document.createElement('div');
          noteEl.className = 'mga-roster-note';
          noteEl.textContent = rObj.note;

          row.appendChild(cellsRow);
          row.appendChild(noteEl);

          row.addEventListener('click', function () {
            handleItemClick('roster', rObj, row);
          });

          list.appendChild(row);

          if (isMarked && rObj.callout) {
            var callout = document.createElement('div');
            callout.className = 'mga-callout';
            callout.textContent = rObj.callout;
            list.appendChild(callout);
          }
        })(rosterRows[i]);
      }

      paper.appendChild(list);
      docScroll.appendChild(paper);
    }

    function renderBillingTab() {
      var bWrap = document.createElement('div');
      bWrap.className = 'mga-billing-wrap';

      var radarCard = document.createElement('div');
      radarCard.className = 'mga-radar-card';

      var meta = document.createElement('div');
      meta.className = 'mga-radar-meta';
      var leftMeta = document.createElement('span');
      leftMeta.textContent = 'СХЕМА БС №1–№4 // ВЕТКА';
      var rightMeta = document.createElement('span');
      rightMeta.textContent = 'СМЕРТЬ: ~22:25';
      meta.appendChild(leftMeta);
      meta.appendChild(rightMeta);

      radarCard.appendChild(meta);
      radarCard.insertAdjacentHTML('beforeend', buildBillingSvg(foundState.billing));
      bWrap.appendChild(radarCard);

      var logList = document.createElement('div');
      logList.className = 'mga-log-list';

      for (var i = 0; i < billingLogs.length; i++) {
        (function (entry) {
          var row = document.createElement('button');
          row.type = 'button';
          row.className = 'mga-log-row';

          var isMarked = entry.isForgery && foundState.billing;
          if (isMarked) {
            row.classList.add('is-found');
          }

          var top = document.createElement('div');
          top.className = 'mga-log-top';

          var idEl = document.createElement('span');
          idEl.className = 'mga-log-id';
          idEl.textContent = entry.abonent;

          var timeEl = document.createElement('span');
          timeEl.textContent = entry.time;

          top.appendChild(idEl);
          top.appendChild(timeEl);

          var detailEl = document.createElement('div');
          detailEl.textContent = entry.detail;

          row.appendChild(top);
          row.appendChild(detailEl);

          row.addEventListener('click', function () {
            handleItemClick('billing', entry, row);
          });

          logList.appendChild(row);

          if (isMarked && entry.callout) {
            var callout = document.createElement('div');
            callout.className = 'mga-callout';
            callout.textContent = entry.callout;
            logList.appendChild(callout);
          }
        })(billingLogs[i]);
      }

      bWrap.appendChild(logList);
      docScroll.appendChild(bWrap);
    }

    function renderActiveDocument() {
      docScroll.innerHTML = '';
      docScroll.scrollTop = 0;

      if (activeTab === 'protocol') {
        renderProtocolTab();
      } else if (activeTab === 'roster') {
        renderRosterTab();
      } else {
        renderBillingTab();
      }
    }

    syncHeaderStats();
    syncTabButtons();
    renderActiveDocument();

    return function cleanup() {
      destroyed = true;
      clearTimers();
    };
  });
})();
