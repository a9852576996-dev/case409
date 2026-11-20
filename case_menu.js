(function () {
  'use strict';

  var params = new URLSearchParams(window.location.search);
  var autoStart = params.get('autostart') === '1';
  var menuOpen = !autoStart;
  var pendingPlay = null;

  function wrapVoice() {
    if (!window.GameVoice || window.GameVoice.__menuWrapped) return;
    var origPlay = window.GameVoice.play;
    var origStop = window.GameVoice.stop;

    if (menuOpen) {
      try { origStop.call(window.GameVoice); } catch (e) {}
    }

    window.GameVoice.play = function (src, onDone) {
      if (menuOpen) {
        pendingPlay = { src: src, onDone: onDone };
        return;
      }
      return origPlay.call(window.GameVoice, src, onDone);
    };

    window.GameVoice.stop = function () {
      pendingPlay = null;
      return origStop.call(window.GameVoice);
    };

    window.GameVoice.__menuWrapped = true;
  }

  wrapVoice();

  function detectCaseStatus(caseId) {
    try {
      var raw = window.localStorage.getItem(caseId + '_save_v1') || '';
      if (raw && raw.length >= 10) {
        if (raw.indexOf('ending_') !== -1) {
          return { text: 'РАСКРЫТО / ФИНАЛ', cls: 'status-done', btn: 'ОТКРЫТЬ СНОВА' };
        }
        return { text: 'В РАБОТЕ', cls: 'status-progress', btn: 'ПРОДОЛЖИТЬ ДЕЛО' };
      }
    } catch (e) {}
    return { text: 'ДОСТУПНО', cls: '', btn: 'ОТКРЫТЬ ПАПКУ' };
  }

  function refreshStatuses() {
    var badges = document.querySelectorAll('[data-status-for]');
    for (var i = 0; i < badges.length; i++) {
      var cid = badges[i].getAttribute('data-status-for');
      var st = detectCaseStatus(cid);
      badges[i].textContent = st.text;
      badges[i].className = 'case-status' + (st.cls ? ' ' + st.cls : '');
      var btn = document.querySelector('[data-open-case="' + cid + '"]');
      if (btn && !btn.disabled) btn.textContent = st.btn;
    }
  }

  function mountBackButton(onBack) {
    if (document.getElementById('btn-back-to-cases')) return;

    var btn = document.createElement('button');
    btn.id = 'btn-back-to-cases';
    btn.type = 'button';
    btn.textContent = 'К ДЕЛАМ';
    btn.addEventListener('click', onBack);

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
    wrapVoice();
    var screen = document.getElementById('case-select-screen');
    if (!screen) return;

    if (autoStart) {
      menuOpen = false;
      screen.classList.add('hidden');
      try {
        var cleanUrl = window.location.pathname + '?case=' + encodeURIComponent(window.ACTIVE_CASE_ID || 'case409');
        window.history.replaceState(null, '', cleanUrl);
      } catch (e) {}
    } else {
      menuOpen = !screen.classList.contains('hidden');
      if (menuOpen && window.GameVoice && typeof window.GameVoice.stop === 'function') {
        window.GameVoice.stop();
      }
    }

    refreshStatuses();

    function openCase(caseId) {
      var currentId = window.ACTIVE_CASE_ID || 'case409';
      if (caseId === currentId) {
        menuOpen = false;
        screen.classList.add('hidden');
        if (pendingPlay && window.GameVoice && typeof window.GameVoice.play === 'function') {
          var p = pendingPlay;
          pendingPlay = null;
          window.GameVoice.play(p.src, p.onDone);
        }
        return;
      }
      window.location.href = '?case=' + encodeURIComponent(caseId) + '&autostart=1';
    }

    function showDesk() {
      menuOpen = true;
      if (window.GameVoice && typeof window.GameVoice.stop === 'function') {
        window.GameVoice.stop();
      }
      refreshStatuses();
      screen.classList.remove('hidden');
    }

    var buttons = screen.querySelectorAll('[data-open-case]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        if (this.disabled) return;
        var cid = this.getAttribute('data-open-case');
        openCase(cid);
      });
    }

    mountBackButton(showDesk);

    window.CaseMenu = {
      show: showDesk,
      hide: function () {
        menuOpen = false;
        screen.classList.add('hidden');
      },
      refresh: refreshStatuses
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
