// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/color.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Color =
/** @class */
function () {
  function Color(r, g, b, a) {
    if (r === void 0) {
      r = 0;
    }

    if (g === void 0) {
      g = 0;
    }

    if (b === void 0) {
      b = 0;
    }

    if (a === void 0) {
      a = 255;
    }

    this.red = r;
    this.green = g;
    this.blue = b;
    this.alpha = a;
  }

  Color.prototype.distanceTo = function (that) {
    //compare distance between colors
    var distance = new Color(Math.abs(this.red - that.red), Math.abs(this.green - that.green), Math.abs(this.blue - that.blue), Math.abs(this.alpha - that.alpha));
    var cumulative = distance.red + distance.green + distance.blue + distance.alpha;
    return cumulative;
  };

  Color.prototype.toString = function () {
    return "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.alpha + ")";
  };

  Color.prototype.render = function (c, x, y) {
    c.fillStyle = this.toString();
    c.fillRect(x, y, 1, 1);
  };

  return Color;
}();

exports.default = Color;
},{}],"src/math.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Grid = exports.Line = void 0;

var Vector =
/** @class */
function () {
  function Vector(x, y) {
    if (x === void 0) {
      x = 0;
    }

    if (y === void 0) {
      y = 0;
    }

    this.x = x;
    this.y = y;
  }

  Vector.prototype.subtract = function (that) {
    return new Vector(this.x - that.x, this.y - that.y);
  };

  Vector.prototype.add = function (that) {
    return new Vector(this.x + that.x, this.y + that.y);
  };

  Vector.prototype.multiply = function (that) {
    if (typeof that === "number") {
      return new Vector(this.x * that, this.y * that);
    }

    return new Vector(this.x * that.x, this.y * that.y);
  };

  Object.defineProperty(Vector.prototype, "normalize", {
    get: function get() {
      //simplifies the distances to a simple fraction
      var normal = new Vector(this.x / this.length, this.y / this.length);
      return normal;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Vector.prototype, "length", {
    get: function get() {
      var dist = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
      return dist;
    },
    enumerable: false,
    configurable: true
  });
  return Vector;
}();

exports.default = Vector;

var Line =
/** @class */
function () {
  function Line(a, b) {
    if (a === void 0) {
      a = new Vector();
    }

    if (b === void 0) {
      b = new Vector();
    }

    this.a = a;
    this.b = b;
  }

  return Line;
}();

exports.Line = Line;

var Grid =
/** @class */
function () {
  function Grid(pos, size, dimensions) {
    if (pos === void 0) {
      pos = new Vector(0, 0);
    }

    if (size === void 0) {
      size = new Vector(1, 1);
    }

    if (dimensions === void 0) {
      dimensions = new Vector(10, 10);
    }

    this.pos = pos;
    this.size = size;
    this.dim = dimensions;
  }

  Grid.prototype.render = function (ctx, color) {
    if (color === void 0) {
      color = "black";
    }

    var _a = this,
        size = _a.size,
        pos = _a.pos,
        dim = _a.dim;

    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    for (var y = 0; y < size.y; y++) {
      for (var x = 0; x < size.x; x++) {
        var cellSize = new Vector(dim.x / size.x, dim.y / size.y);
        var cellPos = new Vector(pos.x + x * cellSize.x, pos.y + y * cellSize.y);
        ctx.strokeRect(cellPos.x, cellPos.y, cellSize.x, cellSize.y);
        ctx.font = (cellSize.y / 2).toString() + "px times new roman"; //x-axis labels

        ctx.fillText((cellPos.x - pos.x).toString(), cellPos.x, pos.y); //y-axis labels

        ctx.fillText((cellPos.y - pos.y).toString(), pos.x - cellSize.x / 2, cellPos.y);
      }
    }
  };

  return Grid;
}();

exports.Grid = Grid;
},{}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var color_1 = __importDefault(require("./color"));

var math_1 = __importDefault(require("./math")); //document access


var player = document.getElementById('player');
var canvas = document.getElementById("display");
var red = document.getElementById('red');
var green = document.getElementById('green');
var blue = document.getElementById('blue');
var alpha = document.getElementById('alpha');
var colorDelta = document.getElementById('ColorDelta');
var fps = document.getElementById('fps');
var backgroundColor = document.getElementById('backgroundColor'); //world

navigator.mediaDevices.getUserMedia({
  audio: false,
  video: true
}).then(function (stream) {
  player.srcObject = stream;
});
var c = canvas.getContext('2d');
var results = c.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight / 2);
var searchColor = new color_1.default(Number(red.value), Number(green.value), Number(blue.value), Number(alpha.value));
var dots = [];
var center = new math_1.default(); //world change

function update() {
  searchColor = new color_1.default(Number(red.value), Number(green.value), Number(blue.value), Number(alpha.value));
  results = c.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight / 2);
  dots = [];

  for (var x = 0; x < results.width; x++) {
    for (var y = 0; y < results.height; y++) {
      var index = (y * results.width + x) * 4;
      var foundColor = new color_1.default(results.data[index], results.data[index + 1], results.data[index + 2], results.data[index + 3]);
      var distance = foundColor.distanceTo(searchColor);

      if (distance <= Number(colorDelta.value)) {
        var dot = new math_1.default(x, y);
        dots.push(dot);
      }
    }
  } //center finder


  var cumulative = new math_1.default();
  dots.forEach(function (dot) {
    cumulative = cumulative.add(dot);
  });
  center = new math_1.default(cumulative.x / dots.length, cumulative.y / dots.length);
}

function render() {
  //clears canvas
  c.fillStyle = backgroundColor.value;
  c.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  var yOffset = canvas.clientHeight / 2;
  c.drawImage(player, 0, 0, player.videoWidth, player.videoHeight, 0, 0, player.width, player.height / 2);
  c.fillStyle = "black";
  c.font = "20px Arial";
  c.fillText(fps.value + "fps", 0, 30 + yOffset);
  dots.forEach(function (dot) {
    c.fillStyle = searchColor.toString();
    c.fillRect(dot.x, dot.y + yOffset, 1, 1);
  }); //center
  // c.fillStyle = "red";
  // c.fillRect(center.x, center.y + yOffset, 30, 30);
}

function reload() {
  update();
  render();
  window.setTimeout(reload, 1000 / Number(fps.value));
}

reload();
},{"./color":"src/color.ts","./math":"src/math.ts"}],"../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63164" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map