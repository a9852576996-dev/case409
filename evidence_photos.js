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

  var CAMERA_SVG =
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>' +
    '<circle cx="12" cy="13" r="4"/>' +
    '</svg>';

  function findNavButton() {
    var btns = document.querySelectorAll('button, .nav-btn, .tab-btn');
    for (var i = 0; i < btns.length; i++) {
      var txt = (btns[i].textContent || '').trim().toUpperCase();
      if (txt.indexOf('ЖУРНАЛ') !== -1) {
        return btns[i];
      }
    }
    return null;
  }

  function mountNavButton(onOpen) {
    if (document.getElementById('btn-evidence-photos-tab')) return;

    var refBtn = findNavButton();
    if (refBtn && refBtn.parentElement) {
      var nav = refBtn.parentElement;
      var computed = window.getComputedStyle(nav);
      if (computed.display === 'grid') {
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
        if (oldSvg.getAttribute('class')) {
          newSvg.setAttribute('class', oldSvg.getAttribute('class'));
        }
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
      if (!replaced) {
        tabBtn.innerHTML = CAMERA_SVG + '<span>ФОТО</span>';
      }

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
