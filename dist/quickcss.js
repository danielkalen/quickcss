(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?module.exports=f():typeof define==='function'&&define.amd?define(f):(g=g||self,g.quickcss=f());}(this,(function(){'use strict';function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}var REGEX_LEN_VAL = /^\d+(?:[a-z]|\%)+$/i;
var REGEX_DIGITS = /\d+$/;
var REGEX_SPACE = /\s/;
var REGEX_KEBAB = /([A-Z])+/g;
var IMPORTANT = 'important';
var POSSIBLE_PREFIXES = ['webkit', 'moz', 'ms', 'o'];
var REQUIRES_UNIT_VALUE = ['background-position-x', 'background-position-y', 'block-size', 'border-width', 'columnRule-width', 'cx', 'cy', 'font-size', 'grid-column-gap', 'grid-row-gap', 'height', 'inline-size', 'line-height', 'minBlock-size', 'min-height', 'min-inline-size', 'min-width', 'max-height', 'max-width', 'outline-offset', 'outline-width', 'perspective', 'shape-margin', 'stroke-dashoffset', 'stroke-width', 'text-indent', 'width', 'word-spacing', 'top', 'bottom', 'left', 'right', 'x', 'y'];
var QUAD_SHORTHANDS = ['margin', 'padding', 'border', 'border-radius'];
var DIRECTIONS = ['top', 'bottom', 'left', 'right'];
QUAD_SHORTHANDS.forEach(function (property) {
  var direction, i, len;
  REQUIRES_UNIT_VALUE.push(property);

  for (i = 0, len = DIRECTIONS.length; i < len; i++) {
    direction = DIRECTIONS[i];
    REQUIRES_UNIT_VALUE.push(property + '-' + direction);
  }
});var SAMPLE_STYLE, styleConfig;
SAMPLE_STYLE = document.createElement('div').style;
var includes = function includes(target, item) {
  return target && target.indexOf(item) !== -1;
};
var isIterable = function isIterable(target) {
  return target && _typeof(target) === 'object' && typeof target.length === 'number' && !target.nodeType;
};
var toKebabCase = function toKebabCase(string) {
  return string.replace(REGEX_KEBAB, function (e, letter) {
    return "-".concat(letter.toLowerCase());
  });
};
var isPropSupported = function isPropSupported(property) {
  return typeof SAMPLE_STYLE[property] !== 'undefined';
};
var isValueSupported = function isValueSupported(property, value) {
  if (window.CSS && window.CSS.supports) {
    return window.CSS.supports(property, value);
  } else {
    SAMPLE_STYLE[property] = value;
    return SAMPLE_STYLE[property] === '' + value;
  }
};
var getPrefix = function getPrefix(property, skipInitialCheck) {
  var j, len1, prefix;

  if (skipInitialCheck || !isPropSupported(property)) {
    for (j = 0, len1 = POSSIBLE_PREFIXES.length; j < len1; j++) {
      prefix = POSSIBLE_PREFIXES[j];

      if (isPropSupported("-".concat(prefix, "-").concat(property))) {
        /* istanbul ignore next */
        return "-".concat(prefix, "-");
      }
    }
  }

  return '';
};
var normalizeProperty = function normalizeProperty(property) {
  property = toKebabCase(property);

  if (isPropSupported(property)) {
    return property;
  } else {
    return "".concat(getPrefix(property, true)).concat(property);
  }
};
var normalizeValue = function normalizeValue(property, value) {
  if (includes(REQUIRES_UNIT_VALUE, property) && value !== null) {
    value = '' + value;

    if (REGEX_DIGITS.test(value) && !REGEX_LEN_VAL.test(value) && !REGEX_SPACE.test(value)) {
      value += property === 'line-height' ? 'em' : 'px';
    }
  }

  return value;
};
var sort = function sort(array) {
  var great, i, len, less, pivot;

  if (array.length < 2) {
    return array;
  } else {
    pivot = array[0];
    less = [];
    great = [];
    len = array.length;
    i = 0;

    while (++i !== len) {
      if (array[i] <= pivot) {
        less.push(array[i]);
      } else {
        great.push(array[i]);
      }
    }

    return sort(less).concat(pivot, sort(great));
  }
};
var hash = function hash(string) {
  var hsh, i, length;
  hsh = 5381;
  i = -1;
  length = string.length;

  while (++i !== string.length) {
    hsh = (hsh << 5) - hsh + string.charCodeAt(i);
    hsh |= 0;
  }

  return '_' + (hsh < 0 ? hsh * -2 : hsh);
};
var ruleToString = function ruleToString(rule, important) {
  var j, len1, output, prop, property, props, value;
  output = '';
  props = sort(Object.keys(rule));

  for (j = 0, len1 = props.length; j < len1; j++) {
    prop = props[j];

    if (typeof rule[prop] === 'string' || typeof rule[prop] === 'number') {
      property = normalizeProperty(prop);
      value = normalizeValue(property, rule[prop]);

      if (important) {
        value += " !important";
      }

      output += "".concat(property, ":").concat(value, ";");
    }
  }

  return output;
};
var inlineStyleConfig = styleConfig = Object.create(null);
var inlineStyle = function inlineStyle(rule, valueToStore, level) {
  var config, styleEl;

  if (!(config = styleConfig[level])) {
    styleEl = document.createElement('style');
    styleEl.id = "quickcss".concat(level || '');
    document.head.appendChild(styleEl);
    styleConfig[level] = config = {
      el: styleEl,
      content: '',
      cache: Object.create(null)
    };
  }

  if (!config.cache[rule]) {
    config.cache[rule] = valueToStore || true;
    config.el.textContent = config.content += rule;
  }
};
var clearInlineStyle = function clearInlineStyle(level) {
  var config, j, key, keys, len1;

  if (config = styleConfig[level]) {
    if (!config.content) {
      return;
    }

    config.el.textContent = config.content = '';
    keys = Object.keys(config.cache);

    for (j = 0, len1 = keys.length; j < len1; j++) {
      key = keys[j];
      config.cache[key] = null;
    }
  }
};var version = "1.4.4";var _quickcss;
var index = _quickcss = function quickcss(targetEl, property, value, important) {
  var computedStyle, i, len, subEl, subProperty, subValue;

  switch (false) {
    case !isIterable(targetEl):
      for (i = 0, len = targetEl.length; i < len; i++) {
        subEl = targetEl[i];

        _quickcss(subEl, property, value);
      }

      break;

    case _typeof(property) !== 'object':
      // Passed a style map
      for (subProperty in property) {
        subValue = property[subProperty];

        _quickcss(targetEl, subProperty, subValue);
      }

      break;

    default:
      property = normalizeProperty(property);

      if (typeof value === 'undefined') {
        computedStyle = targetEl._computedStyle || (targetEl._computedStyle = getComputedStyle(targetEl));
        return computedStyle[property];
      } else if (property) {
        targetEl.style.setProperty(property, normalizeValue(property, value), important ? IMPORTANT : null);
      }

  }
};

_quickcss.animation = function (name, frames) {
  var frame, generated, prefix, rules;

  if (name && typeof name === 'string' && frames && _typeof(frames) === 'object') {
    prefix = getPrefix('animation');
    generated = '';

    for (frame in frames) {
      rules = frames[frame];
      generated += "".concat(frame, " {").concat(ruleToString(rules), "}");
    }

    generated = "@".concat(prefix, "keyframes ").concat(name, " {").concat(generated, "}");
    return inlineStyle(generated, true, 0);
  }
};

_quickcss.register = function (rule, level, important) {
  var className, ref, style;

  if (rule && _typeof(rule) === 'object') {
    level || (level = 0);
    rule = ruleToString(rule, important);

    if (!(className = (ref = inlineStyleConfig[level]) != null ? ref[rule] : void 0)) {
      className = hash(rule);
      style = ".".concat(className, " {").concat(rule, "}");
      inlineStyle(style, className, level);
    }

    return className;
  }
};

_quickcss.clearRegistered = function (level) {
  return clearInlineStyle(level || 0);
};
/* istanbul ignore next */


_quickcss.UNSET = function () {
  switch (false) {
    case !isValueSupported('display', 'unset'):
      return 'unset';

    case !isValueSupported('display', 'initial'):
      return 'initial';

    case !isValueSupported('display', 'inherit'):
      return 'inherit';
  }
}();

_quickcss.supports = isValueSupported;
_quickcss.supportsProperty = isPropSupported;
_quickcss.normalizeProperty = normalizeProperty;
_quickcss.normalizeValue = normalizeValue;
_quickcss.version = version;return index;})));