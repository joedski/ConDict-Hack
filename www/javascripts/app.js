(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("application", function(exports, require, module) {
/*
    Application
    - Main application class

    Responsible for initialization and bridging modules and views.
*/

var Application;

Application = (function() {
  function Application() {}

  Application.prototype.initialize = function() {
    Lungo.init({
      resources: ['templates/asides/side_drawer.html', 'templates/sections/page_two.html', 'templates/sections/word_page.html']
    });
    this.initVent();
    this.initModel();
    this.initViews();
    return this.vent.internal.trigger('application_ready');
  };

  /* Initializers*/


  Application.prototype.initVent = function() {
    var Vent;
    Vent = require('./modules/vent/vent');
    return this.vent = new Vent();
  };

  Application.prototype.initModel = function() {
    var Dictionary;
    Dictionary = require('./modules/dictionary/dictionary');
    return this.model = {
      dictionary: new Dictionary("Rrnake.json")
    };
  };

  Application.prototype.initViews = function() {
    var MainView;
    MainView = require('./views/MainView');
    return this.mainview = new MainView({
      model: this.model
    });
  };

  return Application;

})();

module.exports = new Application();

});

;require.register("initialize", function(exports, require, module) {
var application, debug;

application = require('application');

debug = true;

Backbone.$ = $$;

console.log("Hooking to deviceready event...");

$(document).on('deviceready', function() {
  var iOS7;
  console.log("Device ready.  Checking for iOS7...");
  iOS7 = window.device && window.device.platform && window.device.platform.toLowerCase() === "ios" && parseFloat(window.device.version) >= 7.0;
  if (iOS7) {
    $('html').addClass('ios7');
  }
  navigator.splashscreen.hide();
  return console.log("Is iOS7?: " + iOS7);
});

console.log("hooking to domready...");

$(function() {
  console.log("domready!");
  return application.initialize();
});

});

;require.register("modules/dictionary/dictionary", function(exports, require, module) {
(function() {
  var Dictionary, app, iced, readFile, __iced_k, __iced_k_noop;

  iced = require('iced-coffee-script').iced;
  __iced_k = __iced_k_noop = function() {};

  app = require('../../application');

  readFile = function(path, callback) {
    var r;
    console.log("fake fs.readFile: " + path);
    r = $.get(path, $.noop, 'text');
    r.done(function(data, textStatus) {
      return callback(null, data);
    });
    return r.fail(function() {
      return callback("couldn't load.", null);
    });
  };

  module.exports = Dictionary = (function() {
    Dictionary.LOADING = "loading";

    Dictionary.INITIALIZED = "initialized";

    function Dictionary(source) {
      this.source = source;
      this.status = Dictionary.LOADING;
      this.loadSource();
    }

    Dictionary.prototype.loadSource = function() {
      var data, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            funcname: "Dictionary.loadSource"
          });
          _this.loadFromDisk(__iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                return data = arguments[0];
              };
            })(),
            lineno: 21
          }));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          return _this.initialize(data);
        };
      })(this));
    };

    Dictionary.prototype.loadFromDisk = function(callback) {
      var data, err, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            funcname: "Dictionary.loadFromDisk"
          });
          readFile(_this.source, __iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                err = arguments[0];
                return data = arguments[1];
              };
            })(),
            lineno: 27
          }));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          console.log("Dictionary.loadFromDisk: readFile finished.");
          if (data) {
            data = JSON.parse(data);
          }
          return callback(data);
        };
      })(this));
    };

    Dictionary.prototype.initialize = function(data) {
      if (data) {
        this.data = data;
      } else {
        this.data = {
          dictionary: {
            entries: []
          }
        };
      }
      this.cacheRelations();
      this.entries = this.data.dictionary.entries;
      this.status = Dictionary.INITIALIZED;
      return app.vent.internal.trigger('dictionary.initialized');
    };

    Dictionary.prototype.cacheRelations = function() {

      /*
      		AKA THIS IS NOT A RELATIONAL DATABASE BOO HOO
       */
      return console.log("Dictionary.cacheRelations: does nothing right now because quick prototyping");
    };

    Dictionary.prototype.findSingleEntry = function(predicate) {
      var entry, _i, _len, _ref;
      _ref = this.entries;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entry = _ref[_i];
        if (predicate(entry)) {
          return entry;
        }
      }
    };

    Dictionary.prototype.findAllEntries = function(predicate) {
      var entry, _i, _len, _ref, _results;
      _ref = this.entries;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entry = _ref[_i];
        if (predicate(entry)) {
          _results.push(entry);
        }
      }
      return _results;
    };

    return Dictionary;

  })();

}).call(this);

});

;require.register("modules/file/simplefile", function(exports, require, module) {
(function() {
  var environment, error, fs, readFile;

  try {
    fs = require('fs');
    environment = 'node';
  } catch (_error) {
    error = _error;
    console.log("Error trying to require fs module.  Assuming non-nodeJS environment.");
    if (typeof window !== "undefined" && window !== null ? window.device : void 0) {
      environment = 'phonegap';
    } else {
      environment = 'web';
    }
  }

  switch (environment) {
    case 'node':
      readFile = function(path, onLoad) {
        var options;
        options = {
          encoding: 'utf8'
        };
        return fs.readFile(path, options, onLoad);
      };
      break;
    case 'phonegap':
    case 'web':
      readFile = function(path, onLoad) {
        var r;
        r = $.get(path, $.noop, 'text');
        r.done(function(data, textStatus) {
          return onLoad(null, data);
        });
        return r.fail(function() {
          return onLoad("couldn't load.", null);
        });
      };
  }

  module.exports = {
    readFile: readFile
  };

}).call(this);

});

;require.register("modules/user/user", function(exports, require, module) {
/*
	User
    - Maintains all data logic for the user
*/

var User, app;

app = require('../../application');

module.exports = User = (function() {
  function User() {
    this.email = '';
    this.password = '';
    this.first_name = '';
    this.last_name = '';
  }

  /* Functions*/


  User.prototype.fetch_init_data = function() {};

  return User;

})();

});

;require.register("modules/vent/vent", function(exports, require, module) {
/*
	Vent
    - Events wrapper class

	I also usually maintiain socket.io here too if I use it in my backend:

		constructor: () ->
			@external = io.connect('http://localhost:3000')

	This make for a nice, semantic way to handle events:

		app.vent.internal.on('event', 'function')
		app.vent.external.on('event', 'function')
*/

var Vent, app;

app = require('../../application');

module.exports = Vent = (function() {
  function Vent() {
    this.internal = LucidJS.emitter();
  }

  /* Functions*/


  return Vent;

})();

});

;require.register("utils/arbitrary_sorter", function(exports, require, module) {
/*
ArbitrarySorter

Port of Wm's code posted on Acta Lingueeni:
http://acta-lingweenie.blogspot.com/2013/10/arbitrary-sort-orders-in-python.html

With some consideration for Javascript's lack of default sorting mechanisms
beyond simple strings.
*/

/*
Use:
	sorter = ArbitrarySorter( "a b c ch d dh e f" )
	wordList.sort sorter

Note, there is no 'new' keyword.

Sorters also have a sort function attached which returns a new sorted array
without touching the original.
	sortedWordList = sorter.sort wordList

Sorters compares 2 strings.

You can sort complex records by defining the .toString() method
on the records' prototype as the sorter calls .toString() on
the items it's comparing.

	Record.prototype.toString = -> @[ "\\lx" ]
	arrayOfRecords.sort sorter

You can as always also wrap it in a destructuring function
which gets the keys to compare out of the records for it.

	compareRecords = ( a, b ) -> sorter( a[ "\\lx" ], b[ "\\lx" ] )
	arrayOfRecords.sort compareRecords
*/

var ArbitrarySorter;

module.exports = ArbitrarySorter = function(order) {
  var comparator, elts, i, ords, splitOrder, splitter, vals, valuesAsWord, wordAsValues, _i, _ref;
  elts = order.split(/\s+/);
  splitOrder = elts.concat();
  splitOrder.sort(function(a, b) {
    return -(a.length - b.length);
  });
  splitter = new RegExp("(" + (splitOrder.join('|')) + ")", "gi");
  ords = {};
  vals = elts.concat();
  /* Coffeescript produces an odd but I guess necessary loop
  		just in case you're trying to iterate backwards...
  */

  for (i = _i = 0, _ref = elts.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
    ords[elts[i]] = i;
  }
  comparator = function(stringA, stringB) {
    var avs, bvs;
    avs = wordAsValues(stringA.toString());
    bvs = wordAsValues(stringB.toString());
    return ArbitrarySorter.compareArraysByValues(avs, bvs);
  };
  comparator.wordAsValues = wordAsValues = function(word) {
    var a, ri, splitParts, _j, _len, _results;
    splitParts = [];
    splitter.lastIndex = 0;
    while (a = splitter.exec(word)) {
      splitParts.push(a[1]);
    }
    _results = [];
    for (_j = 0, _len = splitParts.length; _j < _len; _j++) {
      ri = splitParts[_j];
      _results.push(ords[ri]);
    }
    return _results;
  };
  comparator.valuesAsWord = valuesAsWord = function(values) {
    var splitParts, v, _j, _len;
    for (_j = 0, _len = values.length; _j < _len; _j++) {
      v = values[_j];
      splitParts = vals[v];
    }
    return splitParts.join('');
  };
  comparator.sort = function(wordList) {
    return wordList.concat().sort(comparator);
  };
  return comparator;
};

ArbitrarySorter.compareArraysByValues = function(avs, bvs) {
  var i;
  i = 0;
  while ((avs[i] != null) || (bvs[i] != null)) {
    if (avs[i] === bvs[i]) {
      ++i;
      continue;
    } else if ((avs[i] != null) && (bvs[i] == null)) {
      return 1;
    } else if ((avs[i] == null) && (bvs[i] != null)) {
      return -1;
    } else {
      return avs[i] - bvs[i];
    }
  }
  return 0;
};

});

;require.register("views/BaseView", function(exports, require, module) {
var BaseView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = BaseView = (function(_super) {
  __extends(BaseView, _super);

  BaseView.template = function(templateString) {
    return this.prototype.template = Handlebars.compile(templateString);
  };

  function BaseView(options) {
    if (options != null) {
      switch ((Backbone.$.type || Backbone.$.toType)(options.el)) {
        case 'array':
        case 'object':
          options.el = options.el[0];
      }
    }
    BaseView.__super__.constructor.apply(this, arguments);
  }

  BaseView.prototype.setElement = function(element, delegate) {
    if (this.$el) {
      this.undelegateEvents();
    }
    this.$el = (function() {
      switch (false) {
        case !(element instanceof Backbone.$):
        case !($$ && element.__proto__ === $$.fn):
          return element;
        default:
          return Backbone.$(element);
      }
    })();
    this.el = this.$el[0];
    if (delegate !== false) {
      this.delegateEvents();
    }
    return this;
  };

  BaseView.prototype._ensureElement = function() {
    var $el, attrName, attrValue, attrs;
    if (!this.el) {
      attrs = _.extend({}, _.result(this, 'attributes'));
      if (this.id) {
        attrs.id = _.result(this, 'id');
      }
      if (this.className) {
        attrs['class'] = _.result(this, 'className');
      }
      $el = Backbone.$("<" + (_.result(this, 'tagName')) + ">");
      for (attrName in attrs) {
        if (!__hasProp.call(attrs, attrName)) continue;
        attrValue = attrs[attrName];
        $el.attr(attrName, attrValue);
      }
      return this.setElement($el, false);
    } else {
      return this.setElement(_.result(this, 'el'), false);
    }
  };

  return BaseView;

})(Backbone.View);

});

;require.register("views/ListItemView", function(exports, require, module) {
var BaseView, ListItemView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('./BaseView');

module.exports = ListItemView = (function(_super) {
  __extends(ListItemView, _super);

  function ListItemView() {
    _ref = ListItemView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  ListItemView.prototype.tagName = 'li';

  ListItemView.template("<strong>{{ word }}</strong>\n<small>{{ glosses }}</small>");

  ListItemView.prototype.initialize = function(options) {
    return this.render();
  };

  ListItemView.prototype.render = function() {
    this.$el.html(this.template(this.mapModel()));
    return this;
  };

  ListItemView.prototype.mapModel = function() {
    return this.model;
  };

  return ListItemView;

})(BaseView);

});

;require.register("views/ListView", function(exports, require, module) {
var BaseView, ListItemView, ListView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('./BaseView');

ListItemView = require('./ListItemView');

/*
Expects a model in the form of:
	entries: [ (dictionary entries here)... ]
*/


module.exports = ListView = (function(_super) {
  __extends(ListView, _super);

  function ListView() {
    _ref = ListView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  ListView.template("<ul class=\"list-view\"></ul>");

  ListView.prototype.itemViewClass = ListItemView;

  ListView.prototype.initialize = function(options) {
    this.$el.addClass("list scroll");
    return this.render();
  };

  ListView.prototype.render = function() {
    var listEl;
    listEl = Backbone.$(this.template());
    this.populateListElement(listEl, this.getModelsForListEls());
    return this.$el.empty().append(listEl);
  };

  ListView.prototype.populateListElement = function(listEl, models) {
    var itemModel, itemView, _i, _len, _ref1;
    if (models) {
      this.itemViews = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = models.length; _i < _len; _i++) {
          itemModel = models[_i];
          _results.push(new this.itemViewClass({
            model: itemModel
          }));
        }
        return _results;
      }).call(this);
      _ref1 = this.itemViews;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        itemView = _ref1[_i];
        listEl.append(itemView.el);
      }
    }
    return listEl;
  };

  ListView.prototype.getModelsForListEls = function() {
    var _ref1;
    return (_ref1 = this.model) != null ? _ref1.entries : void 0;
  };

  return ListView;

})(BaseView);

});

;require.register("views/MainView", function(exports, require, module) {
/*
	MainView
    - Handles all view logic for the main view (DOM manipulations, etc)
*/

var ArbitrarySorter, BaseView, MainView, SearchView, WordListView, WordPageView, app, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

app = require('../application');

BaseView = require('./BaseView');

WordListView = require('./WordListView');

WordPageView = require('./WordPageView');

SearchView = require('./SearchView');

ArbitrarySorter = require('utils/arbitrary_sorter');

module.exports = MainView = (function(_super) {
  __extends(MainView, _super);

  function MainView() {
    this.doSearch = __bind(this.doSearch, this);
    _ref = MainView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  MainView.prototype.el = 'body';

  MainView.prototype.events = {};

  MainView.prototype.initialize = function() {
    this.$el.addClass("main-view");
    this.mainSectionEl = this.$("#layout");
    this.registerEvents();
    return this.registerViews();
  };

  /* Events*/


  MainView.prototype.registerEvents = function() {
    var _this = this;
    this.mainSectionEl.on('unload', function() {
      return _this.searchView.blur();
    });
    app.vent.internal.on('dictionary.initialized', function() {
      console.log("MainView: dictionary.initialized fired.");
      return _this.refreshMainListViews();
    });
    return app.vent.internal.on('app.search', this.doSearch);
  };

  MainView.prototype.doSearch = function(searchVal) {
    var matches, pendent, predicate, testDefinitions, testGlosses, testWord;
    console.log("MainView on app.search: " + searchVal);
    testWord = function(entry) {
      return 0 <= entry.word.indexOf(searchVal);
    };
    testGlosses = function(entry) {
      var gloss, _i, _len, _ref1;
      _ref1 = _.collectDeep(entry, "definitionSenses.#.glosses.#");
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        gloss = _ref1[_i];
        if (0 <= gloss.indexOf(searchVal)) {
          return true;
        }
      }
    };
    testDefinitions = function(entry) {
      var definition, _i, _len, _ref1;
      _ref1 = _.collectDeep(entry, "definitionSenses.#.definitions.#.definition");
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        definition = _ref1[_i];
        if (0 <= definition.indexOf(searchVal)) {
          return true;
        }
      }
    };
    if (!searchVal) {
      console.log("MainView on app.search: No search val.  No predicate.");
      this.searchPredicate = null;
      this.refreshMainListViews();
      return;
    }
    matches = /^(\w+:)?(.*)$/.exec(searchVal);
    pendent = matches[1];
    searchVal = (matches[2] || '').toLowerCase();
    predicate = (function() {
      switch (false) {
        case !/^w:/.test(pendent):
          return testWord;
        case !/^g:/.test(pendent):
          return testGlosses;
        case !/^d:/.test(pendent):
          return function(entry) {
            return testGlosses(entry) || testDefinitions(entry);
          };
        default:
          return function(entry) {
            return testWord(entry) || testGlosses(entry) || testDefinitions(entry);
          };
      }
    })();
    console.log("MainView on app.search: predicate:", predicate);
    this.searchPredicate = predicate;
    return this.refreshMainListViews();
  };

  /* Views*/


  MainView.prototype.registerViews = function() {
    this.initSorter();
    this.registerSearchView();
    this.registerStaticViews();
    return this.registerMainListViews();
  };

  MainView.prototype.initSorter = function() {
    return this.sorter = ArbitrarySorter("á a b d é e g í i k c l m n ó o p r s sh t ú u v f w y z '");
  };

  MainView.prototype.registerSearchView = function() {
    return this.searchView = new SearchView({
      el: this.$("#global-search")
    });
  };

  MainView.prototype.registerStaticViews = function() {
    return this.wordPageView = new WordPageView(this.$("#word_page"));
  };

  MainView.prototype.registerMainListViews = function() {
    this.wordsListView = new WordListView({
      el: this.$("#layout-art-words")
    });
    this.affixesListView = new WordListView({
      el: this.$("#layout-art-affixes")
    });
    this.conjsListView = new WordListView({
      el: this.$("#layout-art-conjs")
    });
    return this.mainListViews = [this.wordsListView, this.affixesListView, this.conjsListView];
  };

  MainView.prototype.refreshMainListViews = function() {
    var getEntries, view, _i, _len, _ref1, _results,
      _this = this;
    if (this.model.dictionary.data == null) {
      return;
    }
    getEntries = function(filterFn) {
      return _this.sortEntries(_this.filterEntries(filterFn));
    };
    this.wordsListView.model = {
      entries: getEntries(function(entry) {
        return entry;
      })
    };
    this.affixesListView.model = {
      entries: getEntries(function(entry) {
        var lc, _i, _len, _ref1;
        _ref1 = entry.lexicalClass || [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          lc = _ref1[_i];
          switch (lc) {
            case 'prefix':
            case 'suffix':
            case 'affix':
            case 'infix':
            case 'circumfix':
              return true;
          }
        }
        return false;
      })
    };
    this.conjsListView.model = {
      entries: getEntries(function(entry) {
        var lc, _i, _len, _ref1;
        _ref1 = entry.lexicalClass || [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          lc = _ref1[_i];
          switch (lc) {
            case 'conjunction':
              return true;
          }
        }
        return false;
      })
    };
    _ref1 = this.mainListViews;
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      view = _ref1[_i];
      _results.push(view.render());
    }
    return _results;
  };

  /* Functions*/


  MainView.prototype.filterEntries = function(filterFn) {
    var combinedFilterFn,
      _this = this;
    combinedFilterFn = this.searchPredicate ? function(entry) {
      return filterFn(entry) && _this.searchPredicate(entry);
    } : filterFn;
    return this.model.dictionary.findAllEntries(combinedFilterFn);
  };

  MainView.prototype.getActiveWordList = function() {
    return this.mainSectionEl.children('article').filter(".active");
  };

  MainView.prototype.sortEntries = function(entries) {
    var compareByWord,
      _this = this;
    compareByWord = function(a, b) {
      return _this.sorter(a.word, b.word);
    };
    return (entries || []).concat().sort(compareByWord);
  };

  return MainView;

})(BaseView);

});

;require.register("views/SearchView", function(exports, require, module) {
var BaseView, SearchView, app, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

app = require('application');

BaseView = require('./BaseView');

module.exports = SearchView = (function(_super) {
  __extends(SearchView, _super);

  function SearchView() {
    _ref = SearchView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  SearchView.prototype.initialize = function(options) {
    var _this = this;
    this.searchFieldDom = this.$el.find("input[type=search]");
    app.vent.internal.on('app.search', function(val) {
      return console.log("app.search:", val);
    });
    return this.searchFieldDom.on('keyup', function() {
      return app.vent.internal.trigger('app.search.keypress', _this.searchFieldDom.val());
    });
  };

  SearchView.prototype.blur = function() {
    return this.searchFieldDom[0].blur();
  };

  return SearchView;

})(BaseView);

});

;require.register("views/WordListItemView", function(exports, require, module) {
var ListItemView, WordListItemView, app, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

app = require('../application');

ListItemView = require('./ListItemView');

module.exports = WordListItemView = (function(_super) {
  __extends(WordListItemView, _super);

  function WordListItemView() {
    _ref = WordListItemView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  WordListItemView.prototype.className = 'arrow';

  WordListItemView.prototype.initialize = function(options) {
    var _this = this;
    WordListItemView.__super__.initialize.apply(this, arguments);
    return this.$el.on('singleTap', function() {
      _this.showWord.apply(_this, arguments);
      return false;
    });
  };

  WordListItemView.prototype.mapModel = function() {
    var gloss, glosses, sense, senseGlosses, _i, _j, _len, _len1, _ref1, _ref2;
    if (!this.model) {
      return;
    }
    glosses = [];
    _ref1 = this.model.definitionSenses;
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      sense = _ref1[_i];
      senseGlosses = [];
      glosses.push(senseGlosses);
      if (sense.glosses) {
        _ref2 = sense.glosses;
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          gloss = _ref2[_j];
          senseGlosses.push(gloss);
        }
      }
    }
    if (glosses.length < 1) {
      glosses.push(this.model.definitionSenses[0].definitions[0].definition);
    }
    return {
      word: this.model.word,
      glosses: ((function() {
        var _k, _len2, _results;
        _results = [];
        for (_k = 0, _len2 = glosses.length; _k < _len2; _k++) {
          sense = glosses[_k];
          _results.push(sense.join(", "));
        }
        return _results;
      })()).join("; ")
    };
  };

  WordListItemView.prototype.showWord = function(event) {
    console.log("showWord: " + this.model.word + " from " + (event != null ? event.type : void 0) + " event");
    return app.mainview.wordPageView.showEntry(this.model);
  };

  return WordListItemView;

})(ListItemView);

});

;require.register("views/WordListView", function(exports, require, module) {
var ListView, WordListItemView, WordListView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ListView = require('./ListView');

WordListItemView = require('./WordListItemView');

/*
Expects a model in the form of:
	entries: [ (dictionary entries here)... ]
*/


module.exports = WordListView = (function(_super) {
  __extends(WordListView, _super);

  function WordListView() {
    _ref = WordListView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  WordListView.prototype.itemViewClass = WordListItemView;

  return WordListView;

})(ListView);

});

;require.register("views/WordPageView", function(exports, require, module) {
/*
Currently this just uses Lungo's single section thing.

That won't work for going deeper, if we should even allow that.

Also, the mechanism to show it is also hax.
*/

var ListItemView, ListView, WordPageListItemView, WordPageListView, WordPageView, app, _ref, _ref1,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

app = require('application');

ListView = require('./ListView');

ListItemView = require('./ListItemView');

module.exports = WordPageView = (function() {
  function WordPageView(dom) {
    this.setDom(dom);
  }

  WordPageView.prototype.setDom = function(dom) {
    if (!dom) {
      return;
    }
    this.dom = dom;
    this.dom.addClass("list scroll");
    this.initListView();
    return this.registerEvents();
  };

  WordPageView.prototype.$ = function(selector) {
    return this.dom.find(selector);
  };

  WordPageView.prototype.initListView = function() {
    return this.listView = new WordPageListView({
      el: this.$("#layout-word-stuff")
    });
  };

  WordPageView.prototype.registerEvents = function() {
    var _this = this;
    return this.dom.on('load', function() {
      return _this.refresh(_this.model);
    });
  };

  WordPageView.prototype.refresh = function(model) {
    this.dom.find("header h1").text(model.word);
    this.listView.model = model;
    return this.listView.render();
  };

  WordPageView.prototype.showEntry = function(entry) {
    this.model = entry;
    return Lungo.Router.section("word_page");
  };

  return WordPageView;

})();

WordPageListItemView = (function(_super) {
  __extends(WordPageListItemView, _super);

  function WordPageListItemView() {
    _ref = WordPageListItemView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  WordPageListItemView.template("<h1>{{word}}<sub>{{senseIndex}}</sub></h1>\n{{#each definitions}}\n<p>\n	<em>{{#each parts}}{{this}}. {{/each}}</em>\n	{{definition}}\n</p>\n{{/each}}");

  WordPageListItemView.prototype.mapModel = function() {
    return this.model;
  };

  return WordPageListItemView;

})(ListItemView);

WordPageListView = (function(_super) {
  __extends(WordPageListView, _super);

  function WordPageListView() {
    _ref1 = WordPageListView.__super__.constructor.apply(this, arguments);
    return _ref1;
  }

  WordPageListView.prototype.itemViewClass = WordPageListItemView;

  WordPageListView.prototype.getModelsForListEls = function() {
    var _ref2;
    return (_ref2 = this.model) != null ? _ref2.definitionSenses : void 0;
  };

  return WordPageListView;

})(ListView);

});

;
//# sourceMappingURL=app.js.map