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
      'gap: 8px;' +
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
      'padding: 9px 11px;' +
      'background: rgba(18, 21, 28, 0.9);' +
      'border: 1px solid #2a2e38;' +
      'border-left: 3px solid #c98a2e;' +
      'border-radius: 6px;' +
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
      'letter-spacing: 0.07em;' +
      'text-transform: uppercase;' +
      'color: #e6dcc8;' +
      'line-height: 1.15;' +
      'white-space: nowrap;' +
      'overflow: hidden;' +
      'text-overflow: ellipsis;' +
    '}' +
    '.mg-counter {' +
      'font-family: "IBM Plex Mono", monospace;' +
      'font-size: 10.5px;' +
      'font-weight: 600;' +
      'letter-spacing: 0.06em;' +
      'color: #c98a2e;' +
      'text-transform: uppercase;' +
    '}' +
    '.mg-body {' +
      'flex: 1;' +
      'min-height: 0;' +
      'position: relative;' +
      'overflow: hidden;' +
      'touch-action: none;' +
      'background: #080a0d;' +
      'border: 1px solid #2a2e38;' +
      'border-radius: 8px;' +
      'box-shadow: inset 0 0 26px rgba(0, 0, 0, 0.88);' +
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
      'padding: 8px 10px;' +
      'background: rgba(18, 21, 28, 0.9);' +
      'border: 1px solid #2a2e38;' +
      'border-radius: 6px;' +
    '}' +
    '.mg-btn {' +
      'display: inline-flex;' +
      'align-items: center;' +
      'justify-content: center;' +
      'padding: 9px 12px;' +
      'font-family: "Oswald", sans-serif;' +
      'font-size: 13px;' +
      'font-weight: 700;' +
      'letter-spacing: 0.08em;' +
      'text-transform: uppercase;' +
      'color: #d4cab4;' +
      'background: #1c1f26;' +
      'border: 1px solid #353b48;' +
      'border-radius: 6px;' +
      'cursor: pointer;' +
      'transition: transform 0.1s ease, border-color 0.15s ease, background-color 0.15s ease, opacity 0.15s ease;' +
    '}' +
    '.mg-btn:active:not(:disabled) {' +
      'transform: scale(0.96);' +
      'border-color: #c98a2e;' +
      'background: #252933;' +
    '}' +
    '.mg-btn:disabled { opacity: 0.4; cursor: not-allowed; }' +
    '.mg-btn-cancel { flex-shrink: 0; padding: 7px 11px; font-size: 12px; color: #b7b3a8; }' +
    '.mg-btn-primary {' +
      'color: #1a1815;' +
      'background: linear-gradient(180deg, #e0a343 0%, #c98a2e 100%);' +
      'border-color: #f0ba64;' +
    '}' +
    '.mg-btn-danger {' +
      'color: #f4efe6;' +
      'background: linear-gradient(180deg, #a62020 0%, #991b1b 100%);' +
      'border-color: #c93333;' +
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
    '}' +
    '.mguv-meta-bar { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }' +
    '.mguv-errors { font-family: "IBM Plex Mono", monospace; font-size: 10.5px; font-weight: 600; color: #9ba3b2; }' +
    '.mguv-errors.is-warn { color: #f87171; }' +
    '.mguv-views { flex-shrink: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }' +
    '.mguv-view-btn {' +
      'padding: 7px 6px; background: #14171e; border: 1px solid #2b303c; border-radius: 6px;' +
      'font-family: "IBM Plex Mono", monospace; font-size: 10px; font-weight: 600; letter-spacing: 0.04em;' +
      'text-transform: uppercase; color: #8f96a4; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;' +
    '}' +
    '.mguv-view-btn.is-active { background: #1f2430; border-color: #c98a2e; color: #f3e8d2; }' +
    '.mguv-view-dot { width: 6px; height: 6px; border-radius: 50%; background: #c98a2e; flex-shrink: 0; }' +
    '.mguv-view-btn.is-clear .mguv-view-dot { background: #22c55e; }' +
    '.mguv-view-hint {' +
      'position: absolute; left: 10px; right: 10px; top: 8px; padding: 6px 9px;' +
      'background: rgba(10, 12, 16, 0.84); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 6px;' +
      'font-family: "IBM Plex Mono", monospace; font-size: 10px; line-height: 1.35; color: #cfd6e3;' +
      'text-align: center; pointer-events: none; transition: opacity 0.25s ease;' +
    '}' +
    '.mguv-view-hint.is-faded { opacity: 0; }' +
    '.mguv-inspector {' +
      'flex-shrink: 0; display: flex; align-items: center; justify-content: space-between; gap: 8px;' +
      'padding: 8px 10px; background: rgba(18, 21, 28, 0.92); border: 1px solid #2c313d; border-radius: 7px;' +
    '}' +
    '.mguv-scan-info { flex: 1; min-width: 0; }' +
    '.mguv-scan-title { font-family: "IBM Plex Mono", monospace; font-size: 10px; font-weight: 700; color: #e2b15f; text-transform: uppercase; margin-bottom: 2px; }' +
    '.mguv-scan-title.is-uv { color: #818cf8; }' +
    '.mguv-scan-title.is-ok { color: #4ade80; }' +
    '.mguv-scan-title.is-err { color: #f87171; }' +
    '.mguv-scan-desc { font-size: 11.5px; line-height: 1.34; color: #d4d0c7; }' +
    '.mguv-fix-btn { flex-shrink: 0; padding: 8px 10px; font-size: 11.5px; }' +
    '.mguv-modes { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; width: 100%; }' +
    '.mguv-mode-btn {' +
      'padding: 8px 5px; background: #171b23; border: 1px solid #2f3644; border-radius: 6px;' +
      'font-family: "IBM Plex Mono", monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.04em;' +
      'color: #9ba3b2; cursor: pointer; text-transform: uppercase;' +
    '}' +
    '.mguv-mode-btn.is-white { background: rgba(212, 202, 180, 0.14); border-color: #d4cab4; color: #f5efe2; }' +
    '.mguv-mode-btn.is-uv { background: rgba(79, 70, 229, 0.24); border-color: #818cf8; color: #e0e7ff; box-shadow: 0 0 10px rgba(99, 102, 241, 0.3); }' +
    '.mguv-mode-btn.is-loupe { background: rgba(201, 138, 46, 0.22); border-color: #e0a343; color: #fde68a; }' +
    '.mguv-deduce-overlay {' +
      'position: absolute; inset: 0; z-index: 20; background: rgba(8, 10, 14, 0.94);' +
      'backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);' +
      'padding: 12px; overflow-y: auto; display: flex; flex-direction: column; justify-content: center;' +
    '}' +
    '.mguv-deduce-card {' +
      'background: #14171f; border: 1px solid #353b4a; border-top: 3px solid #c98a2e; border-radius: 8px;' +
      'padding: 12px; display: flex; flex-direction: column; gap: 8px;' +
    '}' +
    '.mguv-deduce-kicker { font-family: "IBM Plex Mono", monospace; font-size: 10px; font-weight: 700; color: #c98a2e; text-transform: uppercase; }' +
    '.mguv-deduce-q { font-size: 13px; line-height: 1.4; color: #f3efe6; font-weight: 500; }' +
    '.mguv-deduce-facts {' +
      'padding: 7px 9px; background: #0d1015; border: 1px solid #262b36; border-radius: 6px;' +
      'font-family: "IBM Plex Mono", monospace; font-size: 10px; line-height: 1.4; color: #b7c0cf;' +
      'display: flex; flex-direction: column; gap: 3px;' +
    '}' +
    '.mguv-deduce-opts { display: flex; flex-direction: column; gap: 6px; }' +
    '.mguv-deduce-opt {' +
      'width: 100%; text-align: left; padding: 9px 10px; background: #1b1f29; border: 1px solid #343b4b;' +
      'border-radius: 6px; color: #e2dfd7; font-size: 12px; line-height: 1.35; cursor: pointer;' +
    '}' +
    '.mguv-deduce-opt.is-wrong { border-color: #ef4444; background: rgba(153, 27, 27, 0.25); color: #fecaca; }' +
    '.mguv-deduce-opt.is-correct { border-color: #22c55e; background: rgba(34, 197, 94, 0.2); color: #bbf7d0; }' +
    '.mguv-deduce-feedback { font-family: "IBM Plex Mono", monospace; font-size: 10.5px; line-height: 1.35; min-height: 15px; color: #fca5a5; }' +
    '.mguv-deduce-feedback.is-ok { color: #86efac; }' +
    '@keyframes mguvShake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 50% { transform: translateX(5px); } 75% { transform: translateX(-3px); } }' +
    '.mguv-shake { animation: mguvShake 0.3s ease; }';

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
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
    } catch (e) {}
  }

  function safeSfx(name) {
    try {
      if (!name || !window.GameAudio) return;
      if (typeof window.GameAudio[name] === 'function') {
        window.GameAudio[name]();
        return;
      }
      var prefixed = 'sfx' + name.charAt(0).toUpperCase() + name.slice(1);
      if (typeof window.GameAudio[prefixed] === 'function') {
        window.GameAudio[prefixed]();
      }
    } catch (e) {}
  }

  function destroy() {
    if (typeof activeCleanup === 'function') {
      var fn = activeCleanup;
      activeCleanup = null;
      try { fn(); } catch (e) {}
    }
  }

  function register(id, handlerFn) {
    if (typeof id === 'string' && id && typeof handlerFn === 'function') {
      handlers[id] = handlerFn;
    }
  }

  function start(minigameId, containerEl, config, callbacks) {
    var _mgAliases = {
      archive_search: 'archive_audit',
      phone_pin: 'phone_hack',
      blood_test: 'blood_lab'
    };
    if (typeof minigameId === 'string' && _mgAliases[minigameId]) {
      minigameId = _mgAliases[minigameId];
    }

    destroy();
    injectStyles();
    if (!containerEl) return;
    containerEl.innerHTML = '';

    var cb = callbacks || {};
    var finished = false;
    var wrappedCallbacks = {
      onSuccess: function (res) {
        if (finished) return;
        finished = true;
        destroy();
        if (typeof cb.onSuccess === 'function') cb.onSuccess(res);
      },
      onFail: function (res) {
        if (finished) return;
        finished = true;
        destroy();
        if (typeof cb.onFail === 'function') cb.onFail(res);
      },
      onCancel: function () {
        if (finished) return;
        finished = true;
        destroy();
        if (typeof cb.onCancel === 'function') cb.onCancel();
      }
    };

    var handler = handlers[minigameId];
    if (typeof handler !== 'function') {
      var wrap = document.createElement('div');
      wrap.className = 'mg-wrap';
      wrap.innerHTML =
        '<div class="mg-header"><div class="mg-header-info"><div class="mg-header-title">ТЕРМИНАЛ ЭКСПЕРТИЗЫ</div></div>' +
        '<button type="button" class="mg-btn mg-btn-cancel">НАЗАД</button></div>' +
        '<div class="mg-body"><div class="mg-missing">Модуль «' + String(minigameId || 'unknown') + '» не найден.</div></div>';
      wrap.querySelector('.mg-btn-cancel').addEventListener('click', wrappedCallbacks.onCancel);
      containerEl.appendChild(wrap);
      return;
    }

    var cleanupFn = handler(containerEl, config || {}, wrappedCallbacks);
    if (typeof cleanupFn === 'function') activeCleanup = cleanupFn;
  }

  window.GameMinigames = {
    register: register,
    start: start,
    destroy: destroy,
    haptic: safeHaptic,
    sfx: safeSfx
  };

  function clamp(v, min, max) {
    return v < min ? min : v > max ? max : v;
  }

  /* ===== UV_SEARCH: 3-РАКУРСНЫЙ ОСМОТР НОЖА И СКРЫТЫХ СЛЕДОВ ===== */

  function buildKnifeDataset(config) {
    var spots = [
      {
        id: 'fuller_luminol', view: 'front', ux: -78, uy: -8, hitR: 25,
        isEvidence: true, requiredMode: 'uv', mud: 0, title: 'Дол клинка',
        readings: {
          white: 'Вдоль дола виден влажный развод и слабая плёнка. Без реактива состав неясен.',
          uv: 'УФ-365: вспыхивает ярко-голубой люминол — замытая кровь в углублении дола!',
          loupe: 'ЛУПА ×4: гладкий металлический жёлоб с плёнкой. Биослед подтверждается в УФ-365.'
        },
        wrongModeMsg: 'В обычном свете след выглядит как влага — проверьте в УФ-365!',
        foundLabel: 'Замытая кровь в доле клинка'
      },
      {
        id: 'guard_fiber', view: 'front', ux: -4, uy: 20, hitR: 25,
        isEvidence: true, requiredMode: 'loupe', mud: 1.0, mudLabel: 'Слой ила и травы', title: 'Нижний паз гарды',
        readings: {
          white: 'В щели у гарды торчит крошечный тёмный ворс. Без увеличения плетение не видно.',
          uv: 'УФ-365: слабое синее мерцание пропитки на ворсе — нужен макро-осмотр.',
          loupe: 'ЛУПА ×4: свежее волокно тёмно-синей смесовой ткани с кантом ведомственной куртки!'
        },
        wrongModeMsg: 'Без увеличения нить не опознать — примените ЛУПУ ×4!',
        foundLabel: 'Ведомственное волокно в пазу гарды'
      },
      {
        id: 'noise_grind', view: 'front', ux: -112, uy: 9, hitR: 22,
        isEvidence: false, requiredMode: 'none', mud: 0, title: 'Царапины на спуске',
        readings: {
          white: 'Резкие поперечные риски у острия от заточки.',
          uv: 'УФ-365: свечение полностью отсутствует (0%).',
          loupe: 'ЛУПА ×4: старые окисленные борозды от наждачной ленты.'
        },
        falseReason: 'ЛОЖНЫЙ СЛЕД: старые бытовые царапины от заточки без биоследов.',
        foundLabel: ''
      },
      {
        id: 'noise_reed', view: 'front', ux: -44, uy: 19, hitR: 22,
        isEvidence: false, requiredMode: 'none', mud: 0, title: 'Стебель на кромке',
        readings: {
          white: 'Тонкий зеленоватый стебель, прилипший к лезвию.',
          uv: 'УФ-365: тусклый красноватый хлорофилл (не люминол).',
          loupe: 'ЛУПА ×4: обычный обрывок осоки из дренажной канавы.'
        },
        falseReason: 'ЛОЖНЫЙ СЛЕД: стебель болотной осоки из канавы.',
        foundLabel: ''
      },
      {
        id: 'handle_seam_blood', view: 'back', ux: -68, uy: -11, hitR: 25,
        isEvidence: true, requiredMode: 'uv', mud: 1.0, mudLabel: 'Сгусток глины на шве', title: 'Тыльный стык накладки',
        readings: {
          white: 'Бурые капли в стыке между сталью и резиной — похоже на ржавчину.',
          uv: 'УФ-365: яркий голубой мазок крови нападавшего + спиртовой ореол антисептика!',
          loupe: 'ЛУПА ×4: подсохшие кристаллы в зазоре. Для доказательства крови нужен УФ-365.'
        },
        wrongModeMsg: 'В обычном свете стык выглядит как ржавчина — проверьте в УФ-365!',
        foundLabel: 'Кровь и антисептик под тыльной накладкой'
      },
      {
        id: 'noise_oil', view: 'back', ux: 56, uy: -8, hitR: 24,
        isEvidence: false, requiredMode: 'none', mud: 0, title: 'Пятно на тыльной плоскости',
        readings: {
          white: 'Тёмный маслянистый развод на обратной стороне клинка.',
          uv: 'УФ-365: тусклый жёлто-зелёный отблеск нефтепродукта — техническая смазка.',
          loupe: 'ЛУПА ×4: вязкий солидол с угольной пылью с насыпи.'
        },
        falseReason: 'ЛОЖНЫЙ СЛЕД: жёлто-зелёное свечение выдаёт техническое масло, не кровь.',
        foundLabel: ''
      },
      {
        id: 'notch_microglass', view: 'edge', ux: -38, uy: 2, hitR: 26,
        isEvidence: true, requiredMode: 'loupe', mud: 0, title: 'Поперечная насечка рукояти',
        readings: {
          white: 'С торца в пазу рукояти блестит крошечная песчинка.',
          uv: 'УФ-365: частица не светится, лишь ловит блик лампы.',
          loupe: 'ЛУПА ×4: острый микроосколок тёмного закалённого стекла экрана смартфона!'
        },
        wrongModeMsg: 'Мелкую крошку нельзя опознать без ЛУПЫ ×4!',
        foundLabel: 'Осколок стекла экрана в насечке рукояти'
      },
      {
        id: 'noise_chip', view: 'edge', ux: -112, uy: 0, hitR: 22,
        isEvidence: false, requiredMode: 'none', mud: 0, title: 'Скол на торце тыльника',
        readings: {
          white: 'Старый вырванный кусочек резинового тыльника.',
          uv: 'УФ-365: свечения нет, следы крови отсутствуют.',
          loupe: 'ЛУПА ×4: скруглённые затёртые края старого бытового удара.'
        },
        falseReason: 'ЛОЖНЫЙ СЛЕД: старый бытовой скол резины от давнего ношения.',
        foundLabel: ''
      }
    ];

    if (config && Array.isArray(config.items) && config.items.length > 0) {
      var evIdx = 0;
      for (var j = 0; j < spots.length; j++) {
        if (spots[j].isEvidence && config.items[evIdx]) {
          var lbl = config.items[evIdx].name || config.items[evIdx].title || config.items[evIdx].label;
          if (lbl) spots[j].foundLabel = String(lbl);
          evIdx++;
        }
      }
    }

    return {
      spots: spots,
      conclusion: {
        question: 'На клинке и под тыльной накладкой — смытая антисептиком кровь, в гарде — нить ведомственной формы, в насечке — стекло экрана. Вывод:',
        options: [
          {
            id: 'gromov',
            text: 'Царапины, масло и скол тыльника указывают на бытовой рабочий нож слесаря из депо.',
            isCorrect: false,
            reason: 'Противоречие: царапины и масло — бытовой шум, а свежая нить формы и антисептик им не принадлежат.'
          },
          {
            id: 'cop',
            text: 'Нападавший был в ведомственной форме, порезал руку при ударе, замыл нож антисептиком и разбил телефон.',
            isCorrect: true,
            reason: 'Верно: все 4 улики с трёх ракурсов сходятся в единую картину.'
          },
          {
            id: 'train',
            text: 'Повреждения нанесли проходящие поезда, нож потерян случайно.',
            isCorrect: false,
            reason: 'Противоречие: следы смытой крови и спиртового антисептика доказывают умышленное сокрытие.'
          }
        ]
      }
    };
  }

  function drawKnifeView(ctx, w, h, view, mode, spots, beamX, beamY, kt, timeSec, mudParticles) {
    ctx.save();
    ctx.fillStyle = mode === 'uv' ? '#05060b' : '#0b0e14';
    ctx.fillRect(0, 0, w, h);

    // Lab mat millimeter grid
    ctx.strokeStyle = mode === 'uv' ? 'rgba(99, 102, 241, 0.06)' : 'rgba(212, 202, 180, 0.04)';
    ctx.lineWidth = 1;
    var g;
    for (g = 0; g < w; g += 24) {
      ctx.beginPath(); ctx.moveTo(g, 0); ctx.lineTo(g, h); ctx.stroke();
    }
    for (g = 0; g < h; g += 24) {
      ctx.beginPath(); ctx.moveTo(0, g); ctx.lineTo(w, g); ctx.stroke();
    }

    function renderObject(detailScale, isUvMask) {
      ctx.save();
      ctx.translate(kt.cx, kt.cy);
      ctx.scale(kt.scale, kt.scale);

      var steelLight = isUvMask ? '#1a1f36' : (view === 'back' ? '#6c7482' : '#8c96a6');
      var steelDark = isUvMask ? '#0b0e1a' : '#2a303a';
      var gripCol = isUvMask ? '#0d0e14' : '#1b1d22';

      if (view === 'front' || view === 'back') {
        var bladeDir = view === 'front' ? -1 : 1; // Flip silhouette left/right when turned over!
        ctx.save();
        if (view === 'back') ctx.scale(-1, 1);

        // Blade body (from x=-145 tip to x=-6 guard)
        var bGrad = ctx.createLinearGradient(0, -24, 0, 24);
        bGrad.addColorStop(0, steelDark);
        bGrad.addColorStop(0.35, steelLight);
        bGrad.addColorStop(0.68, '#4a5260');
        bGrad.addColorStop(1, '#a9b3c4');

        ctx.fillStyle = bGrad;
        ctx.beginPath();
        ctx.moveTo(-144, 2);
        ctx.quadraticCurveTo(-125, -20, -96, -21);
        ctx.lineTo(-6, -20);
        ctx.lineTo(-6, 18);
        ctx.lineTo(-104, 19);
        ctx.quadraticCurveTo(-128, 17, -144, 2);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.18)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Fuller groove
        ctx.fillStyle = isUvMask ? '#090b15' : 'rgba(15, 18, 24, 0.55)';
        roundRectPath(ctx, -108, -13, 92, 8, 4);
        ctx.fill();

        // Guard bolster
        ctx.fillStyle = isUvMask ? '#141724' : '#323741';
        roundRectPath(ctx, -8, -26, 14, 52, 3);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.16)';
        ctx.stroke();

        // Rubberized handle (x=6..136)
        ctx.fillStyle = gripCol;
        roundRectPath(ctx, 6, -18, 130, 36, 10);
        ctx.fill();
        ctx.strokeStyle = '#363c48';
        ctx.stroke();

        // Grip ribs
        ctx.strokeStyle = isUvMask ? '#171a26' : '#0d0f13';
        ctx.lineWidth = 2.5;
        for (var rx = 20; rx < 118; rx += 12) {
          ctx.beginPath(); ctx.moveTo(rx, -13); ctx.lineTo(rx, 13); ctx.stroke();
        }
        ctx.restore();
      } else {
        // VIEW 2: Edge / crevices profile (looking straight into bottom/seam of knife)
        var spineGrad = ctx.createLinearGradient(0, -10, 0, 10);
        spineGrad.addColorStop(0, '#2a303a');
        spineGrad.addColorStop(0.5, isUvMask ? '#1e243d' : '#9ca6b8');
        spineGrad.addColorStop(1, '#232832');
        ctx.fillStyle = spineGrad;
        roundRectPath(ctx, -142, -5, 138, 10, 3);
        ctx.fill();

        // Guard slot profile
        ctx.fillStyle = isUvMask ? '#151828' : '#3b414d';
        roundRectPath(ctx, -6, -20, 14, 40, 4);
        ctx.fill();

        // Handle bottom seam with deep transverse notches
        ctx.fillStyle = gripCol;
        roundRectPath(ctx, 8, -14, 126, 28, 8);
        ctx.fill();

        // Central assembly seam line along handle
        ctx.strokeStyle = '#050608';
        ctx.lineWidth = 2.2;
        ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(132, 0); ctx.stroke();

        // Deep cross notches along bottom edge
        ctx.fillStyle = '#07090c';
        for (var nx = 24; nx <= 104; nx += 20) {
          ctx.fillRect(-nx - 5, -15, 7, 30); //Wait: handle is +x, let's place on blade/handle!
        }
        // Correct notches on handle (+22..+114) AND guard seam (-38 is on blade-side? Let's match spot ux=-38!)
        ctx.fillStyle = '#07090c';
        roundRectPath(ctx, -45, -11, 14, 22, 2); // Recessed serration/notch at ux=-38!
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Chipped pommel edge at ux=-112? Wait: ux=-112 is near tip! Let's render protective rubber sleeve / tip guard chip OR move noise_chip to +122!
        ctx.fillStyle = '#181a20';
        ctx.beginPath();
        ctx.arc(-112, 0, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw spots belonging to active view
      for (var i = 0; i < spots.length; i++) {
        var sp = spots[i];
        if (sp.view !== view) continue;

        ctx.save();
        ctx.translate(sp.ux, sp.uy);

        // Specific visual features for each spot
        if (sp.id === 'fuller_luminol') {
          if (isUvMask) {
            var lg = ctx.createRadialGradient(0, 0, 2, 0, 0, 26);
            lg.addColorStop(0, 'rgba(96, 245, 255, 0.95)');
            lg.addColorStop(0.5, 'rgba(56, 189, 248, 0.45)');
            lg.addColorStop(1, 'rgba(56, 189, 248, 0)');
            ctx.fillStyle = lg;
            ctx.beginPath(); ctx.ellipse(0, 0, 26, 7, 0, 0, Math.PI * 2); ctx.fill();
          } else {
            ctx.fillStyle = 'rgba(200, 215, 230, 0.24)';
            ctx.beginPath(); ctx.ellipse(0, 0, 18, 3, 0, 0, Math.PI * 2); ctx.fill();
          }
        } else if (sp.id === 'guard_fiber' && sp.cleared) {
          ctx.strokeStyle = isUvMask ? '#818cf8' : '#1d4ed8';
          ctx.lineWidth = detailScale > 1.3 ? 2.2 : 1.4;
          ctx.beginPath();
          ctx.moveTo(-4, -3); ctx.quadraticCurveTo(2, 2, 7, 6);
          ctx.moveTo(-1, -1); ctx.quadraticCurveTo(4, -5, 8, -2);
          ctx.stroke();
          if (detailScale > 1.3) {
            ctx.strokeStyle = '#60a5fa';
            ctx.lineWidth = 0.8;
            ctx.beginPath(); ctx.moveTo(-3, -2); ctx.lineTo(6, 5); ctx.stroke();
          }
        } else if (sp.id === 'noise_grind') {
          ctx.strokeStyle = isUvMask ? 'rgba(100,110,140,0.2)' : 'rgba(230, 235, 245, 0.5)';
          ctx.lineWidth = 1.1;
          for (var sc = -8; sc <= 8; sc += 4) {
            ctx.beginPath(); ctx.moveTo(sc, -6); ctx.lineTo(sc + 3, 6); ctx.stroke();
          }
        } else if (sp.id === 'noise_reed') {
          ctx.strokeStyle = isUvMask ? '#7f1d1d' : '#4d6b3c';
          ctx.lineWidth = 2;
          ctx.beginPath(); ctx.moveTo(-10, 4); ctx.quadraticCurveTo(0, -3, 12, 2); ctx.stroke();
        } else if (sp.id === 'handle_seam_blood' && sp.cleared) {
          if (isUvMask) {
            var hg = ctx.createRadialGradient(0, 0, 2, 0, 0, 22);
            hg.addColorStop(0, 'rgba(103, 232, 249, 0.95)');
            hg.addColorStop(0.55, 'rgba(99, 102, 241, 0.4)');
            hg.addColorStop(1, 'rgba(99, 102, 241, 0)');
            ctx.fillStyle = hg;
            ctx.beginPath(); ctx.arc(0, 0, 22, 0, Math.PI * 2); ctx.fill();
          } else {
            ctx.fillStyle = '#5c1818';
            ctx.beginPath(); ctx.ellipse(0, 0, 9, 4, 0.1, 0, Math.PI * 2); ctx.fill();
          }
        } else if (sp.id === 'noise_oil') {
          if (isUvMask) {
            var og = ctx.createRadialGradient(0, 0, 2, 0, 0, 18);
            og.addColorStop(0, 'rgba(190, 242, 100, 0.55)');
            og.addColorStop(1, 'rgba(163, 230, 53, 0)');
            ctx.fillStyle = og;
            ctx.beginPath(); ctx.arc(0, 0, 18, 0, Math.PI * 2); ctx.fill();
          } else {
            ctx.fillStyle = 'rgba(28, 25, 22, 0.55)';
            ctx.beginPath(); ctx.ellipse(0, 0, 12, 6, -0.2, 0, Math.PI * 2); ctx.fill();
          }
        } else if (sp.id === 'notch_microglass') {
          ctx.fillStyle = isUvMask ? '#93c5fd' : '#0f172a';
          ctx.strokeStyle = '#e2e8f0';
          ctx.lineWidth = detailScale > 1.3 ? 1.4 : 0.7;
          ctx.beginPath();
          ctx.moveTo(-3, 2); ctx.lineTo(4, -3); ctx.lineTo(2, 4); ctx.closePath();
          ctx.fill();
          ctx.stroke();
        } else if (sp.id === 'noise_chip') {
          ctx.fillStyle = '#090a0d';
          ctx.beginPath(); ctx.arc(0, 0, 4.5, 0, Math.PI * 2); ctx.fill();
        }

        // Physical mud / clay layer covering hidden spots
        if (!sp.cleared && sp.mud > 0) {
          ctx.save();
          ctx.globalAlpha = clamp(sp.mud, 0.15, 1);
          ctx.fillStyle = '#362d22';
          ctx.beginPath(); ctx.ellipse(0, 0, 20, 14, 0.2, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#4c4030';
          ctx.beginPath(); ctx.ellipse(-4, -3, 11, 7, -0.3, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = 'rgba(201, 138, 46, 0.65)';
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 3]);
          ctx.beginPath(); ctx.arc(0, 0, 21, 0, Math.PI * 2); ctx.stroke();
          ctx.restore();
        }

        // Evidence captured badge
        if (sp.found) {
          ctx.strokeStyle = '#22c55e';
          ctx.lineWidth = 1.8;
          ctx.beginPath(); ctx.arc(0, 0, 15, 0, Math.PI * 2); ctx.stroke();
          ctx.fillStyle = 'rgba(34, 197, 94, 0.22)';
          ctx.fill();
        }

        ctx.restore();
      }

      ctx.restore();
    }

    // 1. Base white-light / ambient scene
    renderObject(1.0, false);

    // 2. Optical beam / lens overlay
    if (mode === 'uv') {
      ctx.save();
      ctx.fillStyle = 'rgba(4, 5, 10, 0.88)';
      ctx.fillRect(0, 0, w, h);

      var uvR = 68;
      ctx.save();
      ctx.beginPath();
      ctx.arc(beamX, beamY, uvR, 0, Math.PI * 2);
      ctx.clip();

      renderObject(1.0, true);

      var uvGlow = ctx.createRadialGradient(beamX, beamY, 4, beamX, beamY, uvR);
      uvGlow.addColorStop(0, 'rgba(99, 102, 241, 0.24)');
      uvGlow.addColorStop(0.7, 'rgba(67, 56, 202, 0.16)');
      uvGlow.addColorStop(1, 'rgba(15, 12, 48, 0.45)');
      ctx.fillStyle = uvGlow;
      ctx.fillRect(beamX - uvR, beamY - uvR, uvR * 2, uvR * 2);
      ctx.restore();

      ctx.strokeStyle = 'rgba(129, 140, 248, 0.72)';
      ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.arc(beamX, beamY, uvR, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
    } else if (mode === 'loupe') {
      var lR = 54;
      var mag = 2.15;
      ctx.save();
      ctx.fillStyle = 'rgba(5, 7, 10, 0.42)';
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.beginPath();
      ctx.arc(beamX, beamY, lR, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = '#0d1118';
      ctx.fillRect(beamX - lR, beamY - lR, lR * 2, lR * 2);

      // Magnified render centered around beamX, beamY
      ctx.translate(beamX, beamY);
      ctx.scale(mag, mag);
      ctx.translate(-beamX, -beamY);
      renderObject(mag, false);
      ctx.restore();

      ctx.strokeStyle = '#e0a343';
      ctx.lineWidth = 2.4;
      ctx.beginPath(); ctx.arc(beamX, beamY, lR, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = 'rgba(255,255,255,0.22)';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(beamX, beamY, lR - 4, -2.3, -1.1); ctx.stroke();
      ctx.restore();
    } else {
      // Subtle warm flashlight halo in white mode
      var wg = ctx.createRadialGradient(beamX, beamY, 6, beamX, beamY, 72);
      wg.addColorStop(0, 'rgba(255, 244, 222, 0.16)');
      wg.addColorStop(1, 'rgba(255, 244, 222, 0)');
      ctx.fillStyle = wg;
      ctx.beginPath(); ctx.arc(beamX, beamY, 72, 0, Math.PI * 2); ctx.fill();
    }

    // 3. Falling mud particles
    for (var p = mudParticles.length - 1; p >= 0; p--) {
      var mp = mudParticles[p];
      ctx.fillStyle = 'rgba(76, 64, 48, ' + mp.alpha.toFixed(2) + ')';
      ctx.beginPath(); ctx.arc(mp.x, mp.y, mp.r, 0, Math.PI * 2); ctx.fill();
    }

    // 4. Subtle reticle at pointer
    var pulse = 0.5 + 0.5 * Math.sin(timeSec * 5);
    ctx.strokeStyle = mode === 'uv' ? 'rgba(129, 140, 248, 0.85)' : 'rgba(224, 163, 67, 0.85)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(beamX, beamY, 10 + pulse * 2, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  register('uv_search', function (containerEl, config, callbacks) {
    var dataset = buildKnifeDataset(config);
    var spots = dataset.spots;
    var conclusion = dataset.conclusion;

    var totalEvidence = 0;
    for (var s = 0; s < spots.length; s++) {
      spots[s].found = false;
      spots[s].cleared = spots[s].mud <= 0;
      if (spots[s].isEvidence) totalEvidence++;
    }

    var views = [
      { id: 'front', label: '1. ЛИЦЕВАЯ' },
      { id: 'back', label: '2. ТЫЛЬНАЯ' },
      { id: 'edge', label: '3. ТОРЦЫ/ЩЕЛИ' }
    ];

    var activeView = 'front';
    var activeMode = 'white';
    var foundCount = 0;
    var errorsCount = 0;
    var maxErrors = typeof config.maxErrors === 'number' && config.maxErrors > 0 ? config.maxErrors : 4;
    var selectedSpot = null;
    var phase = 'inspect';
    var destroyed = false;

    var wrap = document.createElement('div');
    wrap.className = 'mg-wrap';

    var header = document.createElement('div');
    header.className = 'mg-header';

    var headInfo = document.createElement('div');
    headInfo.className = 'mg-header-info';

    var titleEl = document.createElement('div');
    titleEl.className = 'mg-header-title';
    titleEl.textContent = config.title || 'ОСМОТР НОЖА И СКРЫТЫХ СЛЕДОВ';

    var metaBar = document.createElement('div');
    metaBar.className = 'mguv-meta-bar';

    var counterEl = document.createElement('span');
    counterEl.className = 'mg-counter';
    counterEl.textContent = 'УЛИКИ: 0 / ' + totalEvidence;

    var errorsEl = document.createElement('span');
    errorsEl.className = 'mguv-errors';
    errorsEl.textContent = 'ОШИБКИ: 0 / ' + maxErrors;

    metaBar.appendChild(counterEl);
    metaBar.appendChild(errorsEl);
    headInfo.appendChild(titleEl);
    headInfo.appendChild(metaBar);

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

    var viewsBar = document.createElement('div');
    viewsBar.className = 'mguv-views';
    var viewButtons = {};

    for (var vi = 0; vi < views.length; vi++) {
      (function (vw) {
        var vb = document.createElement('button');
        vb.type = 'button';
        vb.className = 'mguv-view-btn';
        vb.innerHTML = '<span class="mguv-view-dot"></span><span>' + vw.label + '</span>';
        vb.addEventListener('click', function () {
          if (phase !== 'inspect' || activeView === vw.id) return;
          activeView = vw.id;
          selectedSpot = null;
          safeSfx('sfxClick');
          safeHaptic('light');
          syncViewsUI();
          syncInspector();
        });
        viewsBar.appendChild(vb);
        viewButtons[vw.id] = vb;
      })(views[vi]);
    }

    var body = document.createElement('div');
    body.className = 'mg-body';

    var canvas = document.createElement('canvas');
    canvas.className = 'mg-canvas';
    body.appendChild(canvas);

    var hintEl = document.createElement('div');
    hintEl.className = 'mguv-view-hint';
    hintEl.textContent = 'Переключайте ракурсы сверху. В режиме СВЕТ сотрите грязь, затем проверяйте УФ-365 и ЛУПОЙ ×4.';
    body.appendChild(hintEl);

    var inspectorEl = document.createElement('div');
    inspectorEl.className = 'mguv-inspector';

    var scanInfo = document.createElement('div');
    scanInfo.className = 'mguv-scan-info';
    var scanTitle = document.createElement('div');
    scanTitle.className = 'mguv-scan-title';
    var scanDesc = document.createElement('div');
    scanDesc.className = 'mguv-scan-desc';
    scanInfo.appendChild(scanTitle);
    scanInfo.appendChild(scanDesc);

    var fixBtn = document.createElement('button');
    fixBtn.type = 'button';
    fixBtn.className = 'mg-btn mg-btn-primary mguv-fix-btn';
    fixBtn.textContent = 'ЗАФИКСИРОВАТЬ';
    fixBtn.disabled = true;

    inspectorEl.appendChild(scanInfo);
    inspectorEl.appendChild(fixBtn);

    var footer = document.createElement('div');
    footer.className = 'mg-footer';

    var modesBar = document.createElement('div');
    modesBar.className = 'mguv-modes';
    var modeSpecs = [
      { id: 'white', label: 'СВЕТ (ОЧИСТКА)' },
      { id: 'uv', label: 'УФ-365' },
      { id: 'loupe', label: 'ЛУПА ×4' }
    ];
    var modeButtons = {};

    for (var mi = 0; mi < modeSpecs.length; mi++) {
      (function (ms) {
        var mb = document.createElement('button');
        mb.type = 'button';
        mb.className = 'mguv-mode-btn';
        mb.textContent = ms.label;
        mb.addEventListener('click', function () {
          if (phase !== 'inspect' || activeMode === ms.id) return;
          activeMode = ms.id;
          safeSfx('sfxClick');
          safeHaptic('light');
          syncModesUI();
          syncInspector();
        });
        modesBar.appendChild(mb);
        modeButtons[ms.id] = mb;
      })(modeSpecs[mi]);
    }
    footer.appendChild(modesBar);

    wrap.appendChild(header);
    wrap.appendChild(viewsBar);
    wrap.appendChild(body);
    wrap.appendChild(inspectorEl);
    wrap.appendChild(footer);
    containerEl.appendChild(wrap);

    var ctx = canvas.getContext('2d');
    var cssW = 320;
    var cssH = 260;
    var dpr = 1;
    var pointerDragging = false;
    var activePointerId = null;
    var beamCssX = 160;
    var beamCssY = 130;
    var lastDragX = 0;
    var lastDragY = 0;
    var hintFaded = false;
    var mudParticles = [];
    var flashMsg = null;
    var rafId = null;
    var resizeObserver = null;
    var endTimer = null;
    var lastFrameTs = performance.now();

    function getKnifeTransform(w, h) {
      var scale = clamp(Math.min((w - 22) / 310, (h - 22) / 130), 0.7, 1.65);
      return { cx: w * 0.5, cy: h * 0.54, scale: scale };
    }

    function toKnifeCoords(px, py) {
      var kt = getKnifeTransform(cssW, cssH);
      return { ux: (px - kt.cx) / kt.scale, uy: (py - kt.cy) / kt.scale };
    }

    function fromKnifeCoords(ux, uy) {
      var kt = getKnifeTransform(cssW, cssH);
      return { x: kt.cx + ux * kt.scale, y: kt.cy + uy * kt.scale };
    }

    function syncViewsUI() {
      for (var i = 0; i < views.length; i++) {
        var vw = views[i];
        var done = true;
        for (var j = 0; j < spots.length; j++) {
          if (spots[j].view === vw.id && spots[j].isEvidence && !spots[j].found) {
            done = false;
            break;
          }
        }
        viewButtons[vw.id].classList.toggle('is-active', activeView === vw.id);
        viewButtons[vw.id].classList.toggle('is-clear', done);
      }
    }

    function syncModesUI() {
      modeButtons.white.className = 'mguv-mode-btn' + (activeMode === 'white' ? ' is-white' : '');
      modeButtons.uv.className = 'mguv-mode-btn' + (activeMode === 'uv' ? ' is-uv' : '');
      modeButtons.loupe.className = 'mguv-mode-btn' + (activeMode === 'loupe' ? ' is-loupe' : '');
    }

    function syncMetaHeader() {
      counterEl.textContent = 'УЛИКИ: ' + foundCount + ' / ' + totalEvidence;
      errorsEl.textContent = 'ОШИБКИ: ' + errorsCount + ' / ' + maxErrors;
      errorsEl.classList.toggle('is-warn', errorsCount >= maxErrors - 1);
    }

    function setTempFlash(title, text, tone, ms) {
      flashMsg = { title: title, text: text, tone: tone || 'err', until: performance.now() + (ms || 1450) };
      syncInspector();
    }

    function syncInspector() {
      var now = performance.now();
      if (flashMsg && now < flashMsg.until) {
        scanTitle.textContent = flashMsg.title;
        scanTitle.className = 'mguv-scan-title ' + (flashMsg.tone === 'ok' ? 'is-ok' : 'is-err');
        scanDesc.textContent = flashMsg.text;
        fixBtn.disabled = !selectedSpot || selectedSpot.found;
        return;
      }
      flashMsg = null;

      if (!selectedSpot) {
        scanTitle.className = 'mguv-scan-title' + (activeMode === 'uv' ? ' is-uv' : '');
        scanTitle.textContent = activeMode === 'uv' ? 'УФ-365 // ПОИСК БИОСЛЕДОВ' : activeMode === 'loupe' ? 'ЛУПА ×4 // МИКРОСТРУКТУРА' : 'ОБЫЧНЫЙ СВЕТ // ОЧИСТКА';
        scanDesc.textContent = 'Водите по поверхности объекта для изучения деталей и снятия грязи.';
        fixBtn.disabled = true;
        return;
      }

      if (selectedSpot.found) {
        scanTitle.className = 'mguv-scan-title is-ok';
        scanTitle.textContent = 'ЗАФИКСИРОВАНО // ' + selectedSpot.title;
        scanDesc.textContent = selectedSpot.foundLabel;
        fixBtn.disabled = true;
        return;
      }

      if (!selectedSpot.cleared) {
        scanTitle.className = 'mguv-scan-title';
        scanTitle.textContent = 'ПЕРЕКРЫТИЕ // ' + selectedSpot.mudLabel;
        scanDesc.textContent = activeMode === 'white' ? 'Потрите пальцем по грязному сгустку, чтобы счистить его.' : 'Переключитесь в СВЕТ (ОЧИСТКА), чтобы убрать грязь.';
        fixBtn.disabled = true;
        return;
      }

      scanTitle.className = 'mguv-scan-title' + (activeMode === 'uv' ? ' is-uv' : '');
      scanTitle.textContent = selectedSpot.title;
      scanDesc.textContent = selectedSpot.readings[activeMode] || selectedSpot.readings.white;
      fixBtn.disabled = false;
    }

    function findNearestSpot(ux, uy) {
      var best = null;
      var bestDist = 9999;
      for (var i = 0; i < spots.length; i++) {
        var sp = spots[i];
        if (sp.view !== activeView) continue;
        var d = Math.hypot(ux - sp.ux, uy - sp.uy);
        if (d <= sp.hitR && d < bestDist) {
          bestDist = d;
          best = sp;
        }
      }
      return best;
    }

    function triggerError(title, reason) {
      errorsCount += 1;
      syncMetaHeader();
      safeSfx('sfxAlert');
      safeHaptic('error');
      inspectorEl.classList.remove('mguv-shake');
      void inspectorEl.offsetWidth;
      inspectorEl.classList.add('mguv-shake');

      if (errorsCount >= maxErrors) {
        phase = 'failed';
        fixBtn.disabled = true;
        setTempFlash('МЕТОДИКА ПРОВАЛЕНА', reason + ' Экспертиза прервана.', 'err', 1500);
        endTimer = window.setTimeout(function () {
          endTimer = null;
          callbacks.onFail({ reason: 'too_many_errors', errors: errorsCount });
        }, 900);
        return;
      }
      setTempFlash(title, reason, 'err', 1750);
    }

    fixBtn.addEventListener('click', function () {
      if (phase !== 'inspect' || !selectedSpot || selectedSpot.found) return;
      if (!selectedSpot.cleared) {
        setTempFlash('УЧАСТОК ЗАКРЫТ ГРЯЗЬЮ', 'Счистите слой ила в режиме СВЕТ.', 'err', 1200);
        return;
      }
      if (!selectedSpot.isEvidence) {
        triggerError('ЛОЖНЫЙ СЛЕД (+1 ОШИБКА)', selectedSpot.falseReason);
        return;
      }
      if (selectedSpot.requiredMode !== 'none' && activeMode !== selectedSpot.requiredMode) {
        triggerError('НАРУШЕНА МЕТОДИКА (+1 ОШИБКА)', selectedSpot.wrongModeMsg);
        return;
      }

      selectedSpot.found = true;
      foundCount += 1;
      safeSfx('sfxSuccess');
      safeHaptic('success');
      syncMetaHeader();
      syncViewsUI();
      setTempFlash('УЛИКА ЗАФИКСИРОВАНА', selectedSpot.foundLabel, 'ok', 1300);

      if (foundCount >= totalEvidence) {
        endTimer = window.setTimeout(function () {
          endTimer = null;
          openDeductionPhase();
        }, 680);
      }
    });

    function openDeductionPhase() {
      if (destroyed) return;
      phase = 'deduce';

      var overlay = document.createElement('div');
      overlay.className = 'mguv-deduce-overlay';

      var card = document.createElement('div');
      card.className = 'mguv-deduce-card';
      card.innerHTML = '<div class="mguv-deduce-kicker">ФАЗА 3 // КРИМИНАЛИСТИЧЕСКИЙ ВЫВОД</div>';

      var factsBox = document.createElement('div');
      factsBox.className = 'mguv-deduce-facts';
      for (var i = 0; i < spots.length; i++) {
        if (spots[i].isEvidence) {
          var row = document.createElement('div');
          row.textContent = '• ' + spots[i].foundLabel;
          factsBox.appendChild(row);
        }
      }

      var qEl = document.createElement('div');
      qEl.className = 'mguv-deduce-q';
      qEl.textContent = conclusion.question;

      var optsEl = document.createElement('div');
      optsEl.className = 'mguv-deduce-opts';

      var fbEl = document.createElement('div');
      fbEl.className = 'mguv-deduce-feedback';

      var settled = false;
      for (var oi = 0; oi < conclusion.options.length; oi++) {
        (function (opt) {
          var ob = document.createElement('button');
          ob.type = 'button';
          ob.className = 'mguv-deduce-opt';
          ob.textContent = opt.text;
          ob.addEventListener('click', function () {
            if (settled || destroyed) return;
            if (opt.isCorrect) {
              settled = true;
              ob.classList.add('is-correct');
              fbEl.className = 'mguv-deduce-feedback is-ok';
              fbEl.textContent = opt.reason;
              safeSfx('sfxStamp');
              safeHaptic('success');
              endTimer = window.setTimeout(function () {
                endTimer = null;
                callbacks.onSuccess({ found: foundCount, errors: errorsCount, deduced: opt.id });
              }, 720);
            } else {
              errorsCount += 1;
              syncMetaHeader();
              ob.classList.add('is-wrong');
              fbEl.className = 'mguv-deduce-feedback';
              fbEl.textContent = opt.reason;
              safeSfx('sfxAlert');
              safeHaptic('error');
              if (errorsCount >= maxErrors) {
                settled = true;
                fbEl.textContent = 'Лимит ошибок исчерпан — заключение отклонено.';
                endTimer = window.setTimeout(function () {
                  endTimer = null;
                  callbacks.onFail({ reason: 'wrong_deduction', errors: errorsCount });
                }, 900);
              }
            }
          });
          optsEl.appendChild(ob);
        })(conclusion.options[oi]);
      }

      card.appendChild(factsBox);
      card.appendChild(qEl);
      card.appendChild(optsEl);
      card.appendChild(fbEl);
      overlay.appendChild(card);
      body.appendChild(overlay);
    }

    function scrubMudAt(ux, uy, distPx) {
      if (activeMode !== 'white') return;
      for (var i = 0; i < spots.length; i++) {
        var sp = spots[i];
        if (sp.view !== activeView || sp.cleared) continue;
        if (Math.hypot(ux - sp.ux, uy - sp.uy) <= sp.hitR + 8) {
          sp.mud = Math.max(0, sp.mud - Math.max(0.16, distPx * 0.015));
          var pt = fromKnifeCoords(sp.ux, sp.uy);
          for (var k = 0; k < 2; k++) {
            mudParticles.push({
              x: pt.x + (Math.random() - 0.5) * 16,
              y: pt.y + (Math.random() - 0.5) * 12,
              vx: (Math.random() - 0.5) * 48,
              vy: (Math.random() - 0.2) * 34 + 14,
              r: 1.4 + Math.random() * 2,
              alpha: 0.85
            });
          }
          if (sp.mud <= 0.14) {
            sp.mud = 0;
            sp.cleared = true;
            safeSfx('sfxPaper');
            safeHaptic('medium');
            setTempFlash('СЛОЙ СНЯТ', 'Поверхность очищена — проверьте участок в УФ-365 или ЛУПЕ ×4.', 'ok', 1450);
          }
        }
      }
    }

    function updatePointerFromEvent(e) {
      var rect = canvas.getBoundingClientRect();
      beamCssX = clamp(e.clientX - rect.left, 8, cssW - 8);
      beamCssY = clamp(e.clientY - rect.top, 8, cssH - 8);
    }

    function onPointerDown(e) {
      if (destroyed || phase !== 'inspect') return;
      e.preventDefault();
      if (activePointerId !== null && activePointerId !== e.pointerId) return;
      activePointerId = e.pointerId;
      pointerDragging = true;
      updatePointerFromEvent(e);
      lastDragX = beamCssX;
      lastDragY = beamCssY;
      try { canvas.setPointerCapture(e.pointerId); } catch (err) {}

      if (!hintFaded) {
        hintFaded = true;
        hintEl.classList.add('is-faded');
      }

      var k = toKnifeCoords(beamCssX, beamCssY);
      scrubMudAt(k.ux, k.uy, 10);
      selectedSpot = findNearestSpot(k.ux, k.uy);
      syncInspector();
      safeHaptic('light');
    }

    function onPointerMove(e) {
      if (destroyed || phase !== 'inspect' || !pointerDragging || e.pointerId !== activePointerId) return;
      e.preventDefault();
      updatePointerFromEvent(e);
      var dist = Math.hypot(beamCssX - lastDragX, beamCssY - lastDragY);
      lastDragX = beamCssX;
      lastDragY = beamCssY;
      var k = toKnifeCoords(beamCssX, beamCssY);
      scrubMudAt(k.ux, k.uy, dist);
      var hit = findNearestSpot(k.ux, k.uy);
      if (hit !== selectedSpot) {
        selectedSpot = hit;
        syncInspector();
      }
    }

    function onPointerUp(e) {
      if (activePointerId !== null && e.pointerId !== activePointerId) return;
      pointerDragging = false;
      activePointerId = null;
    }

    function onContextMenu(e) { e.preventDefault(); }

    function resizeCanvas() {
      if (destroyed) return;
      var rect = body.getBoundingClientRect();
      cssW = Math.max(180, Math.floor(rect.width));
      cssH = Math.max(150, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      var pw = Math.floor(cssW * dpr);
      var ph = Math.floor(cssH * dpr);
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
        beamCssX = cssW * 0.5;
        beamCssY = cssH * 0.5;
      }
    }

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

    resizeCanvas();
    syncMetaHeader();
    syncViewsUI();
    syncModesUI();
    syncInspector();

    function tick(now) {
      if (destroyed) return;
      var dt = Math.min((now - lastFrameTs) / 1000, 0.1);
      lastFrameTs = now;

      for (var i = mudParticles.length - 1; i >= 0; i--) {
        var mp = mudParticles[i];
        mp.x += mp.vx * dt;
        mp.y += mp.vy * dt;
        mp.vy += 85 * dt;
        mp.alpha -= dt * 1.5;
        if (mp.alpha <= 0) mudParticles.splice(i, 1);
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var kt = getKnifeTransform(cssW, cssH);
      drawKnifeView(ctx, cssW, cssH, activeView, activeMode, spots, beamCssX, beamCssY, kt, now * 0.001, mudParticles);
      rafId = window.requestAnimationFrame(tick);
    }

    rafId = window.requestAnimationFrame(tick);

    return function cleanup() {
      destroyed = true;
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      if (endTimer !== null) window.clearTimeout(endTimer);
      if (resizeObserver) {
        try { resizeObserver.disconnect(); } catch (e) {}
      }
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('lostpointercapture', onPointerUp);
      canvas.removeEventListener('contextmenu', onContextMenu);
    };
  });
})();
