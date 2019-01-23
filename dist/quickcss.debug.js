(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?module.exports=f():typeof define==='function'&&define.amd?define(f):(g=g||self,g.quickcss=f());}(this,function(){'use strict';function _typeof(obj) {
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
};var version = "1.4.1";var _quickcss;
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
        targetEl.style.setProperty(property, normalizeValue(property, value), important ? IMPORTANT : void 0);
      }

  }
};

_quickcss.animation = function (name$$1, frames) {
  var frame, generated, prefix, rules;

  if (name$$1 && typeof name$$1 === 'string' && frames && _typeof(frames) === 'object') {
    prefix = getPrefix('animation');
    generated = '';

    for (frame in frames) {
      rules = frames[frame];
      generated += "".concat(frame, " {").concat(ruleToString(rules), "}");
    }

    generated = "@".concat(prefix, "keyframes ").concat(name$$1, " {").concat(generated, "}");
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
_quickcss.version = version;return index;}));//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpY2tjc3MuZGVidWcuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25zdGFudHMuY29mZmVlIiwiLi4vc3JjL2hlbHBlcnMuY29mZmVlIiwiLi4vc3JjL2luZGV4LmNvZmZlZSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgUkVHRVhfTEVOX1ZBTCA9IC9eXFxkKyg/OlthLXpdfFxcJSkrJC9pXG5leHBvcnQgUkVHRVhfRElHSVRTID0gL1xcZCskL1xuZXhwb3J0IFJFR0VYX1NQQUNFID0gL1xccy9cbmV4cG9ydCBSRUdFWF9LRUJBQiA9IC8oW0EtWl0pKy9nXG5leHBvcnQgSU1QT1JUQU5UID0gJ2ltcG9ydGFudCdcblxuZXhwb3J0IFBPU1NJQkxFX1BSRUZJWEVTID0gW1xuXHQnd2Via2l0J1xuXHQnbW96J1xuXHQnbXMnXG5cdCdvJ1xuXVxuZXhwb3J0IFJFUVVJUkVTX1VOSVRfVkFMVUUgPSBbXG5cdCdiYWNrZ3JvdW5kLXBvc2l0aW9uLXgnXG5cdCdiYWNrZ3JvdW5kLXBvc2l0aW9uLXknXG5cdCdibG9jay1zaXplJ1xuXHQnYm9yZGVyLXdpZHRoJ1xuXHQnY29sdW1uUnVsZS13aWR0aCdcblx0J2N4J1xuXHQnY3knXG5cdCdmb250LXNpemUnXG5cdCdncmlkLWNvbHVtbi1nYXAnXG5cdCdncmlkLXJvdy1nYXAnXG5cdCdoZWlnaHQnXG5cdCdpbmxpbmUtc2l6ZSdcblx0J2xpbmUtaGVpZ2h0J1xuXHQnbWluQmxvY2stc2l6ZSdcblx0J21pbi1oZWlnaHQnXG5cdCdtaW4taW5saW5lLXNpemUnXG5cdCdtaW4td2lkdGgnXG5cdCdtYXgtaGVpZ2h0J1xuXHQnbWF4LXdpZHRoJ1xuXHQnb3V0bGluZS1vZmZzZXQnXG5cdCdvdXRsaW5lLXdpZHRoJ1xuXHQncGVyc3BlY3RpdmUnXG5cdCdzaGFwZS1tYXJnaW4nXG5cdCdzdHJva2UtZGFzaG9mZnNldCdcblx0J3N0cm9rZS13aWR0aCdcblx0J3RleHQtaW5kZW50J1xuXHQnd2lkdGgnXG5cdCd3b3JkLXNwYWNpbmcnXG5cdCd0b3AnXG5cdCdib3R0b20nXG5cdCdsZWZ0J1xuXHQncmlnaHQnXG5cdCd4J1xuXHQneSdcbl1cblxuZXhwb3J0IFFVQURfU0hPUlRIQU5EUyA9IFtcblx0J21hcmdpbidcblx0J3BhZGRpbmcnXG5cdCdib3JkZXInXG5cdCdib3JkZXItcmFkaXVzJ1xuXVxuZXhwb3J0IERJUkVDVElPTlMgPSBbJ3RvcCcsJ2JvdHRvbScsJ2xlZnQnLCdyaWdodCddXG5cblFVQURfU0hPUlRIQU5EUy5mb3JFYWNoIChwcm9wZXJ0eSktPlxuXHRSRVFVSVJFU19VTklUX1ZBTFVFLnB1c2ggcHJvcGVydHlcblx0Zm9yIGRpcmVjdGlvbiBpbiBESVJFQ1RJT05TXG5cdFx0UkVRVUlSRVNfVU5JVF9WQUxVRS5wdXNoIHByb3BlcnR5KyctJytkaXJlY3Rpb25cblx0cmV0dXJuXG5cblxuXG5cblxuIiwiaW1wb3J0IHtJTVBPUlRBTlQsIFJFR0VYX0tFQkFCLCBSRUdFWF9TUEFDRSwgUkVHRVhfRElHSVRTLCBSRUdFWF9MRU5fVkFMLCBQT1NTSUJMRV9QUkVGSVhFUywgUkVRVUlSRVNfVU5JVF9WQUxVRX0gZnJvbSAnLi9jb25zdGFudHMnXG5TQU1QTEVfU1RZTEUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKS5zdHlsZVxuXG5leHBvcnQgaW5jbHVkZXMgPSAodGFyZ2V0LCBpdGVtKS0+XG5cdHRhcmdldCBhbmQgdGFyZ2V0LmluZGV4T2YoaXRlbSkgaXNudCAtMVxuXG5leHBvcnQgaXNJdGVyYWJsZSA9ICh0YXJnZXQpLT5cblx0dGFyZ2V0IGFuZFxuXHR0eXBlb2YgdGFyZ2V0IGlzICdvYmplY3QnIGFuZFxuXHR0eXBlb2YgdGFyZ2V0Lmxlbmd0aCBpcyAnbnVtYmVyJyBhbmRcblx0bm90IHRhcmdldC5ub2RlVHlwZVxuXG5leHBvcnQgdG9LZWJhYkNhc2UgPSAoc3RyaW5nKS0+XG5cdHN0cmluZy5yZXBsYWNlIFJFR0VYX0tFQkFCLCAoZSxsZXR0ZXIpLT4gXCItI3tsZXR0ZXIudG9Mb3dlckNhc2UoKX1cIlxuXG5leHBvcnQgaXNQcm9wU3VwcG9ydGVkID0gKHByb3BlcnR5KS0+XG5cdHR5cGVvZiBTQU1QTEVfU1RZTEVbcHJvcGVydHldIGlzbnQgJ3VuZGVmaW5lZCdcblxuZXhwb3J0IGlzVmFsdWVTdXBwb3J0ZWQgPSAocHJvcGVydHksIHZhbHVlKS0+XG5cdGlmIHdpbmRvdy5DU1MgYW5kIHdpbmRvdy5DU1Muc3VwcG9ydHNcblx0XHRyZXR1cm4gd2luZG93LkNTUy5zdXBwb3J0cyhwcm9wZXJ0eSwgdmFsdWUpXG5cdGVsc2Vcblx0XHRTQU1QTEVfU1RZTEVbcHJvcGVydHldID0gdmFsdWVcblx0XHRyZXR1cm4gU0FNUExFX1NUWUxFW3Byb3BlcnR5XSBpcyAnJyt2YWx1ZVxuXG5leHBvcnQgZ2V0UHJlZml4ID0gKHByb3BlcnR5LCBza2lwSW5pdGlhbENoZWNrKS0+XG5cdGlmIHNraXBJbml0aWFsQ2hlY2sgb3Igbm90IGlzUHJvcFN1cHBvcnRlZChwcm9wZXJ0eSlcblx0XHRmb3IgcHJlZml4IGluIFBPU1NJQkxFX1BSRUZJWEVTXG5cdFx0XHQjIyMgaXN0YW5idWwgaWdub3JlIG5leHQgIyMjXG5cdFx0XHRyZXR1cm4gXCItI3twcmVmaXh9LVwiIGlmIGlzUHJvcFN1cHBvcnRlZChcIi0je3ByZWZpeH0tI3twcm9wZXJ0eX1cIilcblx0XG5cdHJldHVybiAnJ1xuXG5leHBvcnQgbm9ybWFsaXplUHJvcGVydHkgPSAocHJvcGVydHkpLT5cdFxuXHRwcm9wZXJ0eSA9IHRvS2ViYWJDYXNlKHByb3BlcnR5KVxuXHRcblx0aWYgaXNQcm9wU3VwcG9ydGVkKHByb3BlcnR5KVxuXHRcdHJldHVybiBwcm9wZXJ0eVxuXHRlbHNlXG5cdFx0cmV0dXJuIFwiI3tnZXRQcmVmaXgocHJvcGVydHksdHJ1ZSl9I3twcm9wZXJ0eX1cIlxuXG5leHBvcnQgbm9ybWFsaXplVmFsdWUgPSAocHJvcGVydHksIHZhbHVlKS0+XG5cdGlmIGluY2x1ZGVzKFJFUVVJUkVTX1VOSVRfVkFMVUUsIHByb3BlcnR5KSBhbmQgdmFsdWUgaXNudCBudWxsXG5cdFx0dmFsdWUgPSAnJyt2YWx1ZVxuXHRcdGlmICBSRUdFWF9ESUdJVFMudGVzdCh2YWx1ZSkgYW5kXG5cdFx0XHRub3QgUkVHRVhfTEVOX1ZBTC50ZXN0KHZhbHVlKSBhbmRcblx0XHRcdG5vdCBSRUdFWF9TUEFDRS50ZXN0KHZhbHVlKVxuXHRcdFx0XHR2YWx1ZSArPSBpZiBwcm9wZXJ0eSBpcyAnbGluZS1oZWlnaHQnIHRoZW4gJ2VtJyBlbHNlICdweCdcblxuXHRyZXR1cm4gdmFsdWVcblxuXG5leHBvcnQgc29ydCA9IChhcnJheSktPlxuXHRpZiBhcnJheS5sZW5ndGggPCAyXG5cdFx0cmV0dXJuIGFycmF5XG5cdGVsc2Vcblx0XHRwaXZvdCA9IGFycmF5WzBdOyBsZXNzID0gW107IGdyZWF0ID0gW107IGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA9IDA7XG5cdFx0XG5cdFx0d2hpbGUgKytpIGlzbnQgbGVuXG5cdFx0XHRpZiBhcnJheVtpXSA8PSBwaXZvdFxuXHRcdFx0XHRsZXNzLnB1c2goYXJyYXlbaV0pXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGdyZWF0LnB1c2goYXJyYXlbaV0pXG5cblx0XHRyZXR1cm4gc29ydChsZXNzKS5jb25jYXQocGl2b3QsIHNvcnQoZ3JlYXQpKVxuXG5cbmV4cG9ydCBoYXNoID0gKHN0cmluZyktPlxuXHRoc2ggPSA1MzgxOyBpID0gLTE7IGxlbmd0aCA9IHN0cmluZy5sZW5ndGhcblx0XG5cdHdoaWxlICsraSBpc250IHN0cmluZy5sZW5ndGhcblx0XHRoc2ggPSAoKGhzaCA8PCA1KSAtIGhzaCkgKyBzdHJpbmcuY2hhckNvZGVBdChpKVxuXHRcdGhzaCB8PSAwXG5cblx0cmV0dXJuICdfJysoaWYgaHNoIDwgMCB0aGVuIGhzaCAqIC0yIGVsc2UgaHNoKVxuXG5cbmV4cG9ydCBydWxlVG9TdHJpbmcgPSAocnVsZSwgaW1wb3J0YW50KS0+XG5cdG91dHB1dCA9ICcnXG5cdHByb3BzID0gc29ydChPYmplY3Qua2V5cyhydWxlKSlcblx0XG5cdGZvciBwcm9wIGluIHByb3BzXG5cdFx0aWYgdHlwZW9mIHJ1bGVbcHJvcF0gaXMgJ3N0cmluZycgb3IgdHlwZW9mIHJ1bGVbcHJvcF0gaXMgJ251bWJlcidcblx0XHRcdHByb3BlcnR5ID0gbm9ybWFsaXplUHJvcGVydHkocHJvcClcblx0XHRcdHZhbHVlID0gbm9ybWFsaXplVmFsdWUocHJvcGVydHksIHJ1bGVbcHJvcF0pXG5cdFx0XHR2YWx1ZSArPSBcIiAhaW1wb3J0YW50XCIgaWYgaW1wb3J0YW50XG5cdFx0XHRvdXRwdXQgKz0gXCIje3Byb3BlcnR5fToje3ZhbHVlfTtcIlxuXHRcblx0cmV0dXJuIG91dHB1dFxuXG5leHBvcnQgaW5saW5lU3R5bGVDb25maWcgPSBzdHlsZUNvbmZpZyA9IE9iamVjdC5jcmVhdGUobnVsbClcbmV4cG9ydCBpbmxpbmVTdHlsZSA9IChydWxlLCB2YWx1ZVRvU3RvcmUsIGxldmVsKS0+XG5cdGlmIG5vdCBjb25maWc9c3R5bGVDb25maWdbbGV2ZWxdXG5cdFx0c3R5bGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcblx0XHRzdHlsZUVsLmlkID0gXCJxdWlja2NzcyN7bGV2ZWwgb3IgJyd9XCJcblx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlRWwpXG5cdFx0c3R5bGVDb25maWdbbGV2ZWxdID0gY29uZmlnID0gZWw6c3R5bGVFbCwgY29udGVudDonJywgY2FjaGU6T2JqZWN0LmNyZWF0ZShudWxsKVxuXHRcblx0dW5sZXNzIGNvbmZpZy5jYWNoZVtydWxlXVxuXHRcdGNvbmZpZy5jYWNoZVtydWxlXSA9IHZhbHVlVG9TdG9yZSBvciB0cnVlXG5cdFx0Y29uZmlnLmVsLnRleHRDb250ZW50ID0gY29uZmlnLmNvbnRlbnQgKz0gcnVsZVxuXHRcblx0cmV0dXJuXG5cblxuZXhwb3J0IGNsZWFySW5saW5lU3R5bGUgPSAobGV2ZWwpLT4gaWYgY29uZmlnID0gc3R5bGVDb25maWdbbGV2ZWxdXG5cdHJldHVybiBpZiBub3QgY29uZmlnLmNvbnRlbnRcblx0Y29uZmlnLmVsLnRleHRDb250ZW50ID0gY29uZmlnLmNvbnRlbnQgPSAnJ1xuXHRrZXlzID0gT2JqZWN0LmtleXMoY29uZmlnLmNhY2hlKVxuXHRjb25maWcuY2FjaGVba2V5XSA9IG51bGwgZm9yIGtleSBpbiBrZXlzXG5cdHJldHVyblxuXG5cblxuXG5cbiIsImltcG9ydCAqIGFzIGhlbHBlcnMgZnJvbSAnLi9oZWxwZXJzJ1xuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICcuLi9wYWNrYWdlLmpzb24nXG5pbXBvcnQge0lNUE9SVEFOVH0gZnJvbSAnLi9jb25zdGFudHMnXG5cbmV4cG9ydCBkZWZhdWx0IHF1aWNrY3NzID0gKHRhcmdldEVsLCBwcm9wZXJ0eSwgdmFsdWUsIGltcG9ydGFudCktPlxuXHRzd2l0Y2hcblx0XHR3aGVuIGhlbHBlcnMuaXNJdGVyYWJsZSh0YXJnZXRFbClcblx0XHRcdHF1aWNrY3NzKHN1YkVsLCBwcm9wZXJ0eSwgdmFsdWUpIGZvciBzdWJFbCBpbiB0YXJnZXRFbFxuXHRcblx0XHR3aGVuIHR5cGVvZiBwcm9wZXJ0eSBpcyAnb2JqZWN0JyAjIFBhc3NlZCBhIHN0eWxlIG1hcFxuXHRcdFx0cXVpY2tjc3ModGFyZ2V0RWwsIHN1YlByb3BlcnR5LCBzdWJWYWx1ZSkgZm9yIHN1YlByb3BlcnR5LHN1YlZhbHVlIG9mIHByb3BlcnR5XG5cdFxuXHRcdGVsc2Vcblx0XHRcdHByb3BlcnR5ID0gaGVscGVycy5ub3JtYWxpemVQcm9wZXJ0eShwcm9wZXJ0eSlcblx0XHRcdGlmIHR5cGVvZiB2YWx1ZSBpcyAndW5kZWZpbmVkJ1xuXHRcdFx0XHRjb21wdXRlZFN0eWxlID0gdGFyZ2V0RWwuX2NvbXB1dGVkU3R5bGUgfHw9IGdldENvbXB1dGVkU3R5bGUodGFyZ2V0RWwpXG5cdFx0XHRcdHJldHVybiBjb21wdXRlZFN0eWxlW3Byb3BlcnR5XVxuXHRcdFx0XG5cdFx0XHRlbHNlIGlmIHByb3BlcnR5XG5cdFx0XHRcdHRhcmdldEVsLnN0eWxlLnNldFByb3BlcnR5KHByb3BlcnR5LCBoZWxwZXJzLm5vcm1hbGl6ZVZhbHVlKHByb3BlcnR5LCB2YWx1ZSksIElNUE9SVEFOVCBpZiBpbXBvcnRhbnQpXG5cblx0cmV0dXJuXG5cblxucXVpY2tjc3MuYW5pbWF0aW9uID0gKG5hbWUsIGZyYW1lcyktPiBpZiBuYW1lIGFuZCB0eXBlb2YgbmFtZSBpcyAnc3RyaW5nJyBhbmQgZnJhbWVzIGFuZCB0eXBlb2YgZnJhbWVzIGlzICdvYmplY3QnXG5cdHByZWZpeCA9IGhlbHBlcnMuZ2V0UHJlZml4KCdhbmltYXRpb24nKVxuXHRnZW5lcmF0ZWQgPSAnJ1xuXHRcblx0Zm9yIGZyYW1lLHJ1bGVzIG9mIGZyYW1lc1xuXHRcdGdlbmVyYXRlZCArPSBcIiN7ZnJhbWV9IHsje2hlbHBlcnMucnVsZVRvU3RyaW5nKHJ1bGVzKX19XCJcblxuXHRnZW5lcmF0ZWQgPSBcIkAje3ByZWZpeH1rZXlmcmFtZXMgI3tuYW1lfSB7I3tnZW5lcmF0ZWR9fVwiXG5cdGhlbHBlcnMuaW5saW5lU3R5bGUoZ2VuZXJhdGVkLCB0cnVlLCAwKVxuXG5cbnF1aWNrY3NzLnJlZ2lzdGVyID0gKHJ1bGUsIGxldmVsLCBpbXBvcnRhbnQpLT4gaWYgcnVsZSBhbmQgdHlwZW9mIHJ1bGUgaXMgJ29iamVjdCdcblx0bGV2ZWwgfHw9IDBcblx0cnVsZSA9IGhlbHBlcnMucnVsZVRvU3RyaW5nKHJ1bGUsIGltcG9ydGFudClcblxuXHR1bmxlc3MgY2xhc3NOYW1lID0gaGVscGVycy5pbmxpbmVTdHlsZUNvbmZpZ1tsZXZlbF0/W3J1bGVdXG5cdFx0Y2xhc3NOYW1lID0gaGVscGVycy5oYXNoKHJ1bGUpXG5cdFx0c3R5bGUgPSBcIi4je2NsYXNzTmFtZX0geyN7cnVsZX19XCJcblx0XHRoZWxwZXJzLmlubGluZVN0eWxlKHN0eWxlLCBjbGFzc05hbWUsIGxldmVsKVxuXG5cdHJldHVybiBjbGFzc05hbWVcblxuXG5xdWlja2Nzcy5jbGVhclJlZ2lzdGVyZWQgPSAobGV2ZWwpLT5cblx0aGVscGVycy5jbGVhcklubGluZVN0eWxlKGxldmVsIG9yIDApXG5cblxuIyMjIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICMjI1xucXVpY2tjc3MuVU5TRVQgPSBzd2l0Y2hcblx0d2hlbiBoZWxwZXJzLmlzVmFsdWVTdXBwb3J0ZWQoJ2Rpc3BsYXknLCd1bnNldCcpIHRoZW4gJ3Vuc2V0J1xuXHR3aGVuIGhlbHBlcnMuaXNWYWx1ZVN1cHBvcnRlZCgnZGlzcGxheScsJ2luaXRpYWwnKSB0aGVuICdpbml0aWFsJ1xuXHR3aGVuIGhlbHBlcnMuaXNWYWx1ZVN1cHBvcnRlZCgnZGlzcGxheScsJ2luaGVyaXQnKSB0aGVuICdpbmhlcml0J1xuXG5xdWlja2Nzcy5zdXBwb3J0cyA9IGhlbHBlcnMuaXNWYWx1ZVN1cHBvcnRlZFxucXVpY2tjc3Muc3VwcG9ydHNQcm9wZXJ0eSA9IGhlbHBlcnMuaXNQcm9wU3VwcG9ydGVkXG5xdWlja2Nzcy5ub3JtYWxpemVQcm9wZXJ0eSA9IGhlbHBlcnMubm9ybWFsaXplUHJvcGVydHlcbnF1aWNrY3NzLm5vcm1hbGl6ZVZhbHVlID0gaGVscGVycy5ub3JtYWxpemVWYWx1ZVxucXVpY2tjc3MudmVyc2lvbiA9IHZlcnNpb25cblxuXG4iXSwibmFtZXMiOlsiUkVHRVhfTEVOX1ZBTCIsIlJFR0VYX0RJR0lUUyIsIlJFR0VYX1NQQUNFIiwiUkVHRVhfS0VCQUIiLCJJTVBPUlRBTlQiLCJQT1NTSUJMRV9QUkVGSVhFUyIsIlJFUVVJUkVTX1VOSVRfVkFMVUUiLCJRVUFEX1NIT1JUSEFORFMiLCJESVJFQ1RJT05TIiwiZm9yRWFjaCIsInByb3BlcnR5IiwiZGlyZWN0aW9uIiwiaSIsImxlbiIsInB1c2giLCJTQU1QTEVfU1RZTEUiLCJzdHlsZUNvbmZpZyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInN0eWxlIiwiaW5jbHVkZXMiLCJ0YXJnZXQiLCJpdGVtIiwiaW5kZXhPZiIsImlzSXRlcmFibGUiLCJsZW5ndGgiLCJub2RlVHlwZSIsInRvS2ViYWJDYXNlIiwic3RyaW5nIiwicmVwbGFjZSIsImUiLCJsZXR0ZXIiLCJ0b0xvd2VyQ2FzZSIsImlzUHJvcFN1cHBvcnRlZCIsImlzVmFsdWVTdXBwb3J0ZWQiLCJ2YWx1ZSIsIndpbmRvdyIsIkNTUyIsInN1cHBvcnRzIiwiZ2V0UHJlZml4Iiwic2tpcEluaXRpYWxDaGVjayIsImoiLCJsZW4xIiwicHJlZml4Iiwibm9ybWFsaXplUHJvcGVydHkiLCJub3JtYWxpemVWYWx1ZSIsInRlc3QiLCJzb3J0IiwiYXJyYXkiLCJncmVhdCIsImxlc3MiLCJwaXZvdCIsImNvbmNhdCIsImhhc2giLCJoc2giLCJjaGFyQ29kZUF0IiwicnVsZVRvU3RyaW5nIiwicnVsZSIsImltcG9ydGFudCIsIm91dHB1dCIsInByb3AiLCJwcm9wcyIsIk9iamVjdCIsImtleXMiLCJpbmxpbmVTdHlsZUNvbmZpZyIsImNyZWF0ZSIsImlubGluZVN0eWxlIiwidmFsdWVUb1N0b3JlIiwibGV2ZWwiLCJjb25maWciLCJzdHlsZUVsIiwiaWQiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJlbCIsImNvbnRlbnQiLCJjYWNoZSIsInRleHRDb250ZW50IiwiY2xlYXJJbmxpbmVTdHlsZSIsImtleSIsInF1aWNrY3NzIiwidGFyZ2V0RWwiLCJjb21wdXRlZFN0eWxlIiwic3ViRWwiLCJzdWJQcm9wZXJ0eSIsInN1YlZhbHVlIiwiaGVscGVycyIsIl9jb21wdXRlZFN0eWxlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInNldFByb3BlcnR5IiwiYW5pbWF0aW9uIiwibmFtZSIsImZyYW1lcyIsImZyYW1lIiwiZ2VuZXJhdGVkIiwicnVsZXMiLCJyZWdpc3RlciIsImNsYXNzTmFtZSIsInJlZiIsImNsZWFyUmVnaXN0ZXJlZCIsIlVOU0VUIiwic3VwcG9ydHNQcm9wZXJ0eSIsInZlcnNpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztDQUFBLElBQU9BLGFBQVAsR0FBdUIscUJBQXZCO0FBQ0EsQUFBQSxJQUFPQyxZQUFQLEdBQXNCLE1BQXRCO0FBQ0EsQUFBQSxJQUFPQyxXQUFQLEdB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
