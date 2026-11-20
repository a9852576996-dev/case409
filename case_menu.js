(function () {
  'use strict';

  function detectCase409Status() {
    try {
      for (var i = 0; i < window.localStorage.length; i++) {
        var k = window.localStorage.key(i) || '';
        if (k.indexOf('case409') === -1 || k.indexOf('muted') !== -1) continue;
        var raw = window.localStorage.getItem(k) || '';
        if (!raw || raw.length < 10) continue;
        if (raw.indexOf('ending_') !== -1) {
          return { text: 'РАСКРЫТО / ФИНАЛ', cls: 'status-done', btn: 'ОТКРЫТЬ СНОВА' };
        }
        return { text: 'В РАБОТЕ', cls: 'status-progress', btn: 'ПРОДОЛЖИТЬ ДЕЛО' };
      }
    } catch (e) {}
    return { text: 'ДОСТУПНО', cls: '', btn: 'ОТКРЫТЬ ПАПКУ' };
  }

  function refreshStatuses() {
    var st = detectCase409Status();
    var badge = document.querySelector('[data-status-for="case409"]');
    var btn = document.querySelector('[data-open-case="case409"]');
    if (badge) {
      badge.textContent = st.text;
      badge.className = 'case-status' + (st.cls ? ' ' + st.cls : '');
    }
    if (btn) {
      btn.textContent = st.btn;
    }
  }

  function mountBackButton(onBack) {
    if (document.getElementById('btn-back-to-cases')) return;

    var btn = document.createElement('button');
    btn.id = 'btn-back-to-cases';
    btn.type = 'button';
    btn.textContent = 'К ДЕЛАМ';
    btn.addEventListener('click', onBack);

    // Пробуем встроить кнопку в верхнюю панель игры рядом с кнопками звука/меню
    var topControls =
      document.querySelector('.hud-actions') ||
      document.querySelector('.topbar-actions') ||
      document.querySelector('.top-bar') ||
      document.querySelector('header');

    if (topControls) {
      topControls.appendChild(btn);
    } else {
      btn.classList.add('is-floating');
      document.body.appendChild(btn);
    }
  }

  function init() {
    var screen = document.getElementById('case-select-screen');
    if (!screen) return;

    refreshStatuses();

    function openCase(caseId) {
      if (caseId === 'case409') {
        screen.classList.add('hidden');
        return;
      }
      // Точка расширения для Шага A2 (динамическая загрузка новых дел)
      if (window.CaseLoader && typeof window.CaseLoader.load === 'function') {
        window.CaseLoader.load(caseId).then(function () {
          screen.classList.add('hidden');
        });
      }
    }

    function showDesk() {
      if (window.GameVoice && typeof window.GameVoice.stop === 'function') {
        window.GameVoice.stop();
      }
      refreshStatuses();
      screen.classList.remove('hidden');
    }

    var buttons = screen.querySelectorAll('[data-open-case]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        var cid = this.getAttribute('data-open-case');
        openCase(cid);
      });
    }

    mountBackButton(showDesk);

    window.CaseMenu = {
      show: showDesk,
      hide: function () { screen.classList.add('hidden'); },
      refresh: refreshStatuses
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
