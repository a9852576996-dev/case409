(function () {
  'use strict';

  var ASSET_VER = 'v20261122a';

  var CASES_REGISTRY = {
    case409: {
      id: 'case409',
      title: 'Дело №409 «Ветка»',
      theme: {
        bg: '#090b0f',
        bar: '#11141b'
      },
      scripts: [
        'story_core.js',
        'story_act1.js',
        'story_act2.js',
        'story_act3.js',
        'story_act4.js'
      ]
    },
    case418: {
      id: 'case418',
      title: 'Дело №418 «Пепелище»',
      theme: {
        bg: '#0a0807',
        bar: '#14100e'
      },
      scripts: [
        'minigames_forensics.js',
        'minigames_forensics2.js',
        'cases/case418/story_core.js',
        'cases/case418/story_act1.js',
        'cases/case418/story_act2.js',
        'cases/case418/story_act3.js',
        'cases/case418/story_act4.js',
        'cases/case418/story_act5.js',
        'cases/case418/story_act6.js'
      ]
    },
    case412: {
      id: 'case412',
      title: 'Дело №412 «Погреб»',
      theme: {
        bg: '#080c12',
        bar: '#0f1621'
      },
      scripts: [
        'minigames_forensics.js',
        'minigames_forensics2.js',
        'cases/case412/story_core.js',
        'cases/case412/story_act1.js',
        'cases/case412/story_act2.js',
        'cases/case412/story_act3.js',
        'cases/case412/story_act4.js',
        'cases/case412/story_act5.js',
        'cases/case412/story_act6.js'
      ]
    }
  };

  var params = new URLSearchParams(window.location.search);
  var requested = params.get('case') || 'case409';
  var activeConfig = CASES_REGISTRY[requested] || CASES_REGISTRY.case409;
  var activeTheme = activeConfig.theme || { bg: '#090b0f', bar: '#11141b' };

  window.ACTIVE_CASE_ID = activeConfig.id;
  window.ACTIVE_CASE_CONFIG = activeConfig;
  window.ACTIVE_CASE_THEME = activeTheme;
  window.CASES_REGISTRY = CASES_REGISTRY;

  document.documentElement.setAttribute('data-case', activeConfig.id);
  document.title = activeConfig.title;

  var metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', activeTheme.bg);
  }

  function applyTelegramTheme() {
    try {
      var tg = window.Telegram && window.Telegram.WebApp;
      if (!tg) return;
      if (typeof tg.setHeaderColor === 'function') {
        tg.setHeaderColor(activeTheme.bar);
      }
      if (typeof tg.setBackgroundColor === 'function') {
        tg.setBackgroundColor(activeTheme.bg);
      }
    } catch (e) {}
  }

  applyTelegramTheme();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      window.setTimeout(applyTelegramTheme, 0);
    });
  } else {
    window.setTimeout(applyTelegramTheme, 0);
  }

  var queue = activeConfig.scripts.concat([
    'engine.js',
    'evidence_photos.js',
    'case_menu.js'
  ]);

  for (var i = 0; i < queue.length; i++) {
    document.write('<script src="' + queue[i] + '?v=' + ASSET_VER + '"><\/script>');
  }
})();
