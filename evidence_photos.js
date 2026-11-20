(function () {
  'use strict';

  var PHOTOS = [
    {
      src: 'assets/locations/ditch_night.jpg',
      title: 'СНИМОК №1 // КАНАВА, КМ 14',
      desc: 'Ночной осмотр места обнаружения тела. Жёлтые маркеры вещдоков.'
    },
    {
      src: 'assets/locations/ditch_climax.jpg',
      title: 'СНИМОК №2 // ОЦЕПЛЕНИЕ',
      desc: 'Осмотр склона у товарной ветки под светом прожекторов.'
    },
    {
      src: 'assets/items/personal_ruins.jpg',
      title: 'ВЕЩДОК №1 // ЛИЧНЫЕ ВЕЩИ',
      desc: 'Повреждённая куртка, сумка и документы А. Савельевой.'
    },
    {
      src: 'assets/items/knife_uv.jpg',
      title: 'ВЕЩДОК №2 // НОЖ (УФ-СЪЁМКА)',
      desc: 'Следы люминола на лезвии, флакон антисептика и обрывок форменной ткани.'
    },
    {
      src: 'assets/items/phone_broken.jpg',
      title: 'ВЕЩДОК №3 // СМАРТФОН',
      desc: 'Разбитый телефон в грязи у щебня, кровавый отпечаток на экране.'
    },
    {
      src: 'assets/items/archive_falsification.jpg',
      title: 'АРХИВ // ЭКСПЕРТИЗЫ',
      desc: 'Подложные бланки и старые протокольные фото по прошлым эпизодам.'
    }
  ];

  function init() {
    if (document.getElementById('btn-evidence-photos')) return;

    // Кнопка внизу экрана
    var btn = document.createElement('button');
    btn.id = 'btn-evidence-photos';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Фото вещдоков');
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>' +
      '<circle cx="12" cy="13" r="4"/>' +
      '</svg>' +
      '<span>ВЕЩДОКИ</span>';
    document.body.appendChild(btn);

    // Модальное окно фототаблицы
    var modal = document.createElement('div');
    modal.id = 'evidence-modal';
    modal.innerHTML =
      '<div class="ev-panel">' +
        '<div class="ev-header">' +
          '<div class="ev-title"><span>СК-409 //</span> ФОТОТАБЛИЦА ВЕЩДОКОВ</div>' +
          '<button type="button" class="ev-close" id="ev-close-modal">ЗАКРЫТЬ [ESC]</button>' +
        '</div>' +
        '<div class="ev-grid" id="ev-grid"></div>' +
      '</div>';
    document.body.appendChild(modal);

    // Лайтбокс для увеличения фото
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
      card.innerHTML =
        '<img src="' + item.src + '" alt="' + item.title + '" loading="lazy">' +
        '<div class="ev-card-body">' +
          '<div class="ev-card-title">' + item.title + '</div>' +
          '<div class="ev-card-desc">' + item.desc + '</div>' +
        '</div>';
      card.addEventListener('click', function () {
        lbImg.src = item.src;
        lbImg.alt = item.title;
        lbTitle.textContent = item.title;
        lbDesc.textContent = item.desc;
        lightbox.classList.add('open');
      });
      grid.appendChild(card);
    });

    btn.addEventListener('click', function () {
      modal.classList.add('open');
    });

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
