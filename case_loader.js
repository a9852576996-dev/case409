(function () {
  'use strict';

  var CASES_REGISTRY = {
    case409: {
      id: 'case409',
      title: 'Дело №409 «Ветка»',
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

  window.ACTIVE_CASE_ID = activeConfig.id;
  window.ACTIVE_CASE_CONFIG = activeConfig;
  window.CASES_REGISTRY = CASES_REGISTRY;

  var queue = activeConfig.scripts.concat([
    'engine.js',
    'evidence_photos.js',
    'case_menu.js'
  ]);

  for (var i = 0; i < queue.length; i++) {
    document.write('<script src="' + queue[i] + '?v=v20261121"><\/script>');
  }
})();
