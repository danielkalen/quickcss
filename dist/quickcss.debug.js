(function (require) {
require = (function (cache, modules, cx) {
return function (r) {
if (!modules[r]) throw new Error(r + ' is not a module');
return cache[r] ? cache[r].exports : ((cache[r] = {
exports: {}
}, cache[r].exports = modules[r].call(cx, require, cache[r], cache[r].exports)));
};
})({}, {
0: function (require, module, exports) {
var QuickCSS;

var POSSIBLE_PREFIXES, QUAD_SHORTHANDS, REQUIRES_UNIT_VALUE;

POSSIBLE_PREFIXES = ['webkit', 'moz', 'ms', 'o'];

REQUIRES_UNIT_VALUE = ['backgroundPositionX', 'backgroundPositionY', 'blockSize', 'borderWidth', 'columnRuleWidth', 'cx', 'cy', 'fontSize', 'gridColumnGap', 'gridRowGap', 'height', 'inlineSize', 'lineHeight', 'minBlockSize', 'minHeight', 'minInlineSize', 'minWidth', 'maxHeight', 'maxWidth', 'outlineOffset', 'outlineWidth', 'perspective', 'shapeMargin', 'strokeDashoffset', 'strokeWidth', 'textIndent', 'width', 'wordSpacing', 'top', 'bottom', 'left', 'right', 'x', 'y'];

QUAD_SHORTHANDS = ['margin', 'padding', 'border', 'borderRadius'];

QUAD_SHORTHANDS.forEach(function(property) {
  var direction, i, len, ref, results;
  REQUIRES_UNIT_VALUE.push(property);
  ref = ['Top', 'Bottom', 'Left', 'Right'];
  results = [];
  for (i = 0, len = ref.length; i < len; i++) {
    direction = ref[i];
    results.push(REQUIRES_UNIT_VALUE.push(property + direction));
  }
  return results;
});

;

var REGEX_DIGITS, REGEX_KEBAB, REGEX_LEN_VAL, REGEX_SPACE, helpers, sampleStyle, styleContent, styleEl;

sampleStyle = document.createElement('div').style;

REGEX_LEN_VAL = /^\d+(?:[a-z]|\%)+$/i;

REGEX_DIGITS = /\d+$/;

REGEX_SPACE = /\s/;

REGEX_KEBAB = /([A-Z])+/g;

helpers = {};

helpers.includes = function(target, item) {
  return target && target.indexOf(item) !== -1;
};

helpers.isIterable = function(target) {
  return target && typeof target === 'object' && typeof target.length === 'number' && !target.nodeType;
};

helpers.isPropSupported = function(property) {
  return typeof sampleStyle[property] !== 'undefined';
};

helpers.toKebabCase = function(string) {
  return string.replace(REGEX_KEBAB, function(e, letter) {
    return "-" + (letter.toLowerCase());
  });
};

helpers.normalizeProperty = function(property) {
  property = helpers.toKebabCase(property);
  if (helpers.isPropSupported(property)) {
    return property;
  } else {
    return "" + (helpers.getPrefix(property, true)) + property;
  }
};

helpers.getPrefix = function(property, skipInitialCheck) {
  var i, len, prefix;
  if (skipInitialCheck || !helpers.isPropSupported(property)) {
    for (i = 0, len = POSSIBLE_PREFIXES.length; i < len; i++) {
      prefix = POSSIBLE_PREFIXES[i];

      /* istanbul ignore next */
      if (helpers.isPropSupported("-" + prefix + "-" + property)) {
        return "-" + prefix + "-";
      }
    }
  }
  return '';
};

helpers.normalizeValue = function(property, value) {
  if (helpers.includes(REQUIRES_UNIT_VALUE, property) && value !== null) {
    value = '' + value;
    if (REGEX_DIGITS.test(value) && !REGEX_LEN_VAL.test(value) && !REGEX_SPACE.test(value)) {
      value += 'px';
    }
  }
  return value;
};

styleEl = null;

styleContent = '';

helpers.inlineStyle = function(rule) {
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'quickcss';
    document.head.appendChild(styleEl);
  }
  if (!helpers.includes(styleContent, rule)) {
    return styleEl.innerHTML = styleContent += rule;
  }
};

;

QuickCSS = function(targetEl, property, value) {
  var i, len, subEl, subProperty, subValue;
  if (helpers.isIterable(targetEl)) {
    for (i = 0, len = targetEl.length; i < len; i++) {
      subEl = targetEl[i];
      QuickCSS(subEl, property, value);
    }
  } else if (typeof property === 'object') {
    for (subProperty in property) {
      subValue = property[subProperty];
      QuickCSS(targetEl, subProperty, subValue);
    }
  } else {
    property = helpers.normalizeProperty(property);
    if (typeof value === 'undefined') {
      return getComputedStyle(targetEl)[property];
    } else if (property) {
      targetEl.style[property] = helpers.normalizeValue(property, value);
    }
  }
};

QuickCSS.animation = function(name, frames) {
  var frame, generated, prefix, property, rules, value;
  if (name && typeof name === 'string' && frames && typeof frames === 'object') {
    prefix = helpers.getPrefix('animation');
    generated = '';
    for (frame in frames) {
      rules = frames[frame];
      generated += frame + " {";
      for (property in rules) {
        value = rules[property];
        generated += (helpers.normalizeProperty(property)) + ": " + (helpers.normalizeValue(property, value)) + ";";
      }
      generated += "}";
    }
    generated = "@" + prefix + "keyframes " + name + " {" + generated + "}";
    return helpers.inlineStyle(generated);
  }
};

QuickCSS.version = "1.1.0";

module.exports = QuickCSS;

;
return module.exports;
}
}, this);
if (typeof define === 'function' && define.umd) {
define(function () {
return require(0);
});
} else if (typeof module === 'object' && module.exports) {
module.exports = require(0);
} else {
return this['quickcss'] = require(0);
}
}).call(this, null);
