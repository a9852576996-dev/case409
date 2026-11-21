(function () {
  'use strict';

  var CACHE_VER = 'v20261121';
  var ACTIVE_CASE = (window.ACTIVE_CASE_ID || 'case409').toLowerCase();
  var CASE_CODE = ACTIVE_CASE === 'case412' ? 'СК-412' : (ACTIVE_CASE === 'case418' ? 'СК-418' : 'СК-409');

  var PHOTOS_BY_CASE = {
    case409: [
      {
        src: 'assets/locations/ditch_night.jpg',
        title: 'СНИМОК №1 // КАНАВА, КМ 14',
        desc: 'Ночной осмотр места обнаружения тела. Жёлтые маркеры вещдоков.'
      },
      {
        src: 'assets/locations/ditch_climax.jpg.jpg',
        fallback: 'assets/locations/ditch_climax.jpg',
        title: 'СНИМОК №2 // ОЦЕПЛЕНИЕ',
        desc: 'Осмотр склона у товарной ветки под светом прожекторов.'
      },
      {
        src: 'assets/items/personal_ruins.jpg.jpg',
        title: 'ВЕЩДОК №1 // ЛИЧНЫЕ ВЕЩИ',
        desc: 'Повреждённая куртка, сумка и документы А. Савельевой.'
      },
      {
        src: 'assets/items/knife_uv.jpg.jpg',
        title: 'ВЕЩДОК №2 // НОЖ (УФ-СЪЁМКА)',
        desc: 'Следы люминола на лезвии, флакон антисептика и обрывок форменной ткани.'
      },
      {
        src: 'assets/items/phone_broken.jpg.jpg',
        title: 'ВЕЩДОК №3 // СМАРТФОН',
        desc: 'Разбитый телефон в грязи у щебня, кровавый отпечаток на экране.'
      },
      {
        src: 'assets/items/archive_falsification.jpg.jpg',
        title: 'АРХИВ // ЭКСПЕРТИЗЫ',
        desc: 'Подложные бланки и старые протокольные фото по прошлым эпизодам.'
      }
    ],
    case412: [
      { src: 'cases/case412/assets/scenes/village_street.png?' + CACHE_VER, title: 'СНИМОК №1 // САДОВАЯ УЛИЦА', desc: 'Глухие заборы посёлка «Тихие Ключи» под холодным осенним дождём.' },
      { src: 'cases/case412/assets/scenes/bus_stop.png?' + CACHE_VER, title: 'СНИМОК №2 // ОСТАНОВКА', desc: 'Пустая окраинная остановка в сумерках — место последней ссоры.' },
      { src: 'cases/case412/assets/scenes/belyaev_gate_cameras.png?' + CACHE_VER, title: 'СНИМОК №3 // ПЕРИМЕТР БЕЛЯЕВА', desc: 'Ворота и камеры видеонаблюдения на участке соседа напротив.' },
      { src: 'cases/case412/assets/scenes/kravtsov_garage.png?' + CACHE_VER, title: 'СНИМОК №4 // ГАРАЖ КРАВЦОВА', desc: 'Старый кирпичный гараж с массивным навесным замком.' },
      { src: 'cases/case412/assets/scenes/garage_interior.png?' + CACHE_VER, title: 'СНИМОК №5 // ВНУТРИ ГАРАЖА', desc: 'Верстак, слесарный инструмент и запасные замки в луче фонаря.' },
      { src: 'cases/case412/assets/scenes/cellar_hatch.png?' + CACHE_VER, title: 'СНИМОК №6 // ЛЮК ПОГРЕБА', desc: 'Приоткрытый металлический люк со свежими царапинами и ступени вниз.' },
      { src: 'cases/case412/assets/scenes/forest_edge.png?' + CACHE_VER, title: 'СНИМОК №7 // ОКРАИНА ЛЕСА', desc: 'Узкая грязная тропа вдоль задних заборов у сырой лесополосы.' },
      { src: 'cases/case412/assets/scenes/broken_phone.png?' + CACHE_VER, title: 'ВЕЩДОК №1 // СМАРТФОН', desc: 'Разбитый телефон с треснутым экраном, найденный в мокрой глине.' },
      { src: 'cases/case412/assets/scenes/muddy_tracks.png?' + CACHE_VER, title: 'ВЕЩДОК №2 // СЛЕДЫ В ГЛИНЕ', desc: 'Отпечатки мужских ботинок поверх свежего протектора шин у обочины.' },
      { src: 'cases/case412/assets/scenes/forensic_prints.png?' + CACHE_VER, title: 'ВЕЩДОК №3 // ОТПЕЧАТКИ', desc: 'Проявленные порошком следы пальцев на холодном металле замка.' },
      { src: 'cases/case412/assets/scenes/notes_and_keys.png?' + CACHE_VER, title: 'ВЕЩДОК №4 // ЗАПИСКА И КЛЮЧИ', desc: 'Помятый листок из блокнота и связка запасных ключей.' },
      { src: 'cases/case412/assets/scenes/cctv_monitor.png?' + CACHE_VER, title: 'ВЕЩДОК №5 // ЗАПИСЬ КАМЕР', desc: 'Ночной монитор с пустыми воротами для сверки таймлайна.' },
      { src: 'cases/case412/assets/scenes/timeline_desk.png?' + CACHE_VER, title: 'СХЕМА // ТАЙМЛАЙН', desc: 'Полевой разбор маршрута, схема посёлка и листы детализации.' },
      { src: 'cases/case412/assets/scenes/climax_night.png?' + CACHE_VER, title: 'СНИМОК №8 // НОЧНАЯ РАЗВЯЗКА', desc: 'Свет фар и проблесковых маяков под ливнем у открытого гаража.' }
    ],
    case418: [
      { src: 'cases/case418/assets/scenes/night_fire.png?' + CACHE_VER, title: 'СНИМОК №1 // НОЧНОЙ ПОЖАР', desc: 'Охваченная пламенем постройка и густой чёрный дым над промзоной.' },
      { src: 'cases/case418/assets/scenes/charred_ruins.png?' + CACHE_VER, title: 'СНИМОК №2 // ОБУГЛЕННЫЕ РУИНЫ', desc: 'Обрушенные балки, скрученный металл и тлеющий пепел внутри сгоревшего здания.' },
      { src: 'cases/case418/assets/scenes/morning_mist.png?' + CACHE_VER, title: 'СНИМОК №3 // ПЕПЕЛИЩЕ НА РАССВЕТЕ', desc: 'Остывшие стены в сером утреннем тумане и лужи с плавающей сажей.' },
      { src: 'cases/case418/assets/scenes/checkpoint.png?' + CACHE_VER, title: 'СНИМОК №4 // КПП ПРОМЗОНЫ', desc: 'Шлагбаум и въезд на территорию в ночном тумане под тусклым фонарём.' },
      { src: 'cases/case418/assets/scenes/checkpoint_booth.png?' + CACHE_VER, title: 'СНИМОК №5 // СТОРОЖКА КПП', desc: 'Интерьер поста охраны: пустые крючки для ключей и вид на проезд.' },
      { src: 'cases/case418/assets/scenes/well_and_cellar.png?' + CACHE_VER, title: 'СНИМОК №6 // КОЛОДЕЦ И ПОГРЕБ', desc: 'Закопчённый бетонный колодец и полуразрушенный спуск в погреб.' },
      { src: 'cases/case418/assets/scenes/arson_accelerant.png?' + CACHE_VER, title: 'ВЕЩДОК №1 // СЛЕДЫ ГСМ', desc: 'Радужная масляная плёнка горючего и оплавленная пластиковая канистра.' },
      { src: 'cases/case418/assets/scenes/forensic_samples.png?' + CACHE_VER, title: 'ВЕЩДОК №2 // ПРОБЫ И ПРОВОДКА', desc: 'Пробирки с золой, химическими следами и оплавленная медная проводка.' },
      { src: 'cases/case418/assets/scenes/burnt_documents.png?' + CACHE_VER, title: 'ВЕЩДОК №3 // ОБГОРЕВШИЕ ДОКУМЕНТЫ', desc: 'Вскрытый металлический ящик с обугленными страницами учётной книги.' },
      { src: 'cases/case418/assets/scenes/cellar_evidence.png?' + CACHE_VER, title: 'ВЕЩДОК №4 // ДНО ПОГРЕБА', desc: 'Сброшенные в мутную воду обгоревший лом, тряпка и сбитый замок.' },
      { src: 'cases/case418/assets/scenes/night_confrontation.png?' + CACHE_VER, title: 'СНИМОК №7 // НОЧНАЯ ВСТРЕЧА', desc: 'Заброшенный двор промзоны, две машины с включёнными фарами в дыму.' }
    ]
  };

  var PHOTOS = PHOTOS_BY_CASE[ACTIVE_CASE] || PHOTOS_BY_CASE.case409;

  var CAMERA_SVG =
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>' +
    '<circle cx="12" cy="13" r="4"/>' +
    '</svg>';

  function injectStyles() {
    if (document.getElementById('ev-gallery-inline-css')) return;
    var st = document.createElement('style');
    st.id = 'ev-gallery-inline-css';
    st.textContent =
      '#evidence-modal, #evidence-lightbox { position:fixed; inset:0; z-index:1600; background:rgba(8,9,12,0.93); display:none; align-items:center; justify-content:center; padding:14px; box-sizing:border-box; }' +
      '#evidence-lightbox { z-index:1700; background:rgba(4,5,7,0.97); }' +
      '#evidence-modal.open, #evidence-lightbox.open { display:flex; }' +
      '#evidence-modal .ev-panel { width:100%; max-width:820px; height:86vh; max-height:86vh; background:#12141a; border:1px solid #2b303d; border-top:2px solid #b91c1c; border-radius:4px; display:flex; flex-direction:column; overflow:hidden; }' +
      '#evidence-modal .ev-header { flex:0 0 auto; display:flex; align-items:center; justify-content:space-between; padding:12px 16px; border-bottom:1px solid #232733; background:#171a22; }' +
      '#evidence-modal .ev-grid { flex:1 1 auto; min-height:0; overflow-y:auto; -webkit-overflow-scrolling:touch; padding:14px; display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); align-content:start; gap:12px; }' +
      '@media (min-width:680px){ #evidence-modal .ev-grid { grid-template-columns:repeat(3, minmax(0, 1fr)); } }' +
      '#evidence-modal .ev-card { min-width:0; background:#181b23; border:1px solid #2a2f3b; border-radius:3px; overflow:hidden; cursor:pointer; display:flex; flex-direction:column; }' +
      '#evidence-modal .ev-card img { width:100%; height:130px; object-fit:cover; display:block; background:#0b0d11; }' +
      '#evidence-modal .ev-err { padding:12px 8px; font-family:monospace; font-size:10px; color:#f87171; background:#1f1215; text-align:center; word-break:break-all; }';
    document.head.appendChild(st);
  }

  function findNavButton() {
    var btns = document.querySelectorAll('button, .nav-btn, .tab-btn');
    for (var i = 0; i < btns.length; i++) {
      var txt = (btns[i].textContent || '').trim().toUpperCase();
      if (txt.indexOf('ЖУРНАЛ') !== -1) return btns[i];
    }
    return null;
  }

  function mountNavButton(onOpen) {
    if (document.getElementById('btn-evidence-photos-tab')) return;

    var refBtn = findNavButton();
    if (refBtn && refBtn.parentElement) {
      var nav = refBtn.parentElement;
      if (window.getComputedStyle(nav).display === 'grid') {
        nav.style.gridTemplateColumns = 'repeat(5, minmax(0, 1fr))';
      }

      var tabBtn = refBtn.cloneNode(true);
      tabBtn.id = 'btn-evidence-photos-tab';
      tabBtn.type = 'button';
      tabBtn.classList.remove('active', 'is-active');
      tabBtn.removeAttribute('data-tab');
      tabBtn.removeAttribute('data-view');
      tabBtn.removeAttribute('data-panel');
      tabBtn.setAttribute('aria-label', 'Фото вещдоков');

      var oldSvg = tabBtn.querySelector('svg');
      if (oldSvg) {
        var wrap = document.createElement('span');
        wrap.innerHTML = CAMERA_SVG;
        var newSvg = wrap.firstChild;
        if (oldSvg.getAttribute('class')) newSvg.setAttribute('class', oldSvg.getAttribute('class'));
        oldSvg.parentNode.replaceChild(newSvg, oldSvg);
      }

      var replaced = false;
      var walker = document.createTreeWalker(tabBtn, NodeFilter.SHOW_TEXT, null, false);
      var node;
      while ((node = walker.nextNode())) {
        if (node.nodeValue && node.nodeValue.trim().toUpperCase().indexOf('ЖУРНАЛ') !== -1) {
          node.nodeValue = 'ФОТО';
          replaced = true;
          break;
        }
      }
      if (!replaced) tabBtn.innerHTML = CAMERA_SVG + '<span>ФОТО</span>';

      tabBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        onOpen();
      });

      nav.appendChild(tabBtn);
      return;
    }

    var fallbackBtn = document.createElement('button');
    fallbackBtn.id = 'btn-evidence-photos';
    fallbackBtn.type = 'button';
    fallbackBtn.innerHTML = CAMERA_SVG + '<span>ФОТО</span>';
    fallbackBtn.addEventListener('click', onOpen);
    document.body.appendChild(fallbackBtn);
  }

  function init() {
    if (document.getElementById('evidence-modal')) return;
    injectStyles();

    var modal = document.createElement('div');
    modal.id = 'evidence-modal';
    modal.innerHTML =
      '<div class="ev-panel">' +
        '<div class="ev-header">' +
          '<div class="ev-title"><span>' + CASE_CODE + ' //</span> ФОТОТАБЛИЦА (' + PHOTOS.length + ')</div>' +
          '<button type="button" class="ev-close" id="ev-close-modal">ЗАКРЫТЬ [ESC]</button>' +
        '</div>' +
        '<div class="ev-grid" id="ev-grid"></div>' +
      '</div>';
    document.body.appendChild(modal);

    var lightbox = document.createElement('div');
    lightbox.id = 'evidence-lightbox';
    lightbox.innerHTML =
      '<div class="ev-lb-box">' +
        '<img id="ev-lb-img" src="" alt="">' +
        '<div class="ev-lb-caption">' +
          '<strong id="ev-lb-title"></strong>' +
          '<span id="ev-lb-desc"></span>' +
        '</div>' +
        '<button type="button" class="ev-close" id="ev-close-lb">ЗАКРЫТЬ</button>' +
      '</div>';
    document.body.appendChild(lightbox);

    var grid = document.getElementById('ev-grid');
    var lbImg = document.getElementById('ev-lb-img');
    var lbTitle = document.getElementById('ev-lb-title');
    var lbDesc = document.getElementById('ev-lb-desc');

    PHOTOS.forEach(function (item) {
      var card = document.createElement('div');
      card.className = 'ev-card';

      var img = document.createElement('img');
      img.src = item.src;
      img.alt = item.title;
      img.onerror = function () {
        if (item.fallback && !img.dataset.triedFallback) {
          img.dataset.triedFallback = '1';
          img.src = item.fallback;
          return;
        }
        var err = document.createElement('div');
        err.className = 'ev-err';
        err.textContent = 'НЕТ ФАЙЛА: ' + item.src;
        if (img.parentNode) img.parentNode.replaceChild(err, img);
      };

      var body = document.createElement('div');
      body.className = 'ev-card-body';
      body.innerHTML =
        '<div class="ev-card-title">' + item.title + '</div>' +
        '<div class="ev-card-desc">' + item.desc + '</div>';

      card.appendChild(img);
      card.appendChild(body);
      card.addEventListener('click', function () {
        lbImg.src = img.currentSrc || img.src;
        lbImg.alt = item.title;
        lbTitle.textContent = item.title;
        lbDesc.textContent = item.desc;
        lightbox.classList.add('open');
      });
      grid.appendChild(card);
    });

    function openModal() {
      modal.classList.add('open');
    }

    mountNavButton(openModal);

    document.getElementById('ev-close-modal').addEventListener('click', function () {
      modal.classList.remove('open');
    });
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.classList.remove('open');
    });

    document.getElementById('ev-close-lb').addEventListener('click', function () {
      lightbox.classList.remove('open');
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (lightbox.classList.contains('open')) {
          lightbox.classList.remove('open');
        } else if (modal.classList.contains('open')) {
          modal.classList.remove('open');
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
