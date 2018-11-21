"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (require) {
  require = function (cache, modules, cx) {
    var loader = function loader(r) {
      if (!modules[r]) throw new Error(r + ' is not a module');
      return cache[r] ? cache[r].exports : (cache[r] = {
        exports: {}
      }, cache[r].exports = modules[r].call(cx, require, cache[r], cache[r].exports));
    };

    loader.modules = modules;
    return loader;
  }({}, {
    0: function _(require, module, exports) {
      var _quickcss;

      var helpers = require(1);

      var __constants2 = require(2);

      _quickcss = function quickcss(targetEl, property, value, important) {
        var computedStyle, i, len, subEl, subProperty, subValue;

        switch (false) {
          case !helpers.isIterable(targetEl):
            for (i = 0, len = targetEl.length; i < len; i++) {
              subEl = targetEl[i];

              _quickcss(subEl, property, value);
            }

            break;

          case _typeof(property) !== 'object':
            for (subProperty in property) {
              subValue = property[subProperty];

              _quickcss(targetEl, subProperty, subValue);
            }

            break;

          default:
            property = helpers.normalizeProperty(property);

            if (typeof value === 'undefined') {
              computedStyle = targetEl._computedStyle || (targetEl._computedStyle = getComputedStyle(targetEl));
              return computedStyle[property];
            } else if (property) {
              targetEl.style.setProperty(property, helpers.normalizeValue(property, value), important ? __constants2.IMPORTANT : void 0);
            }

        }
      };

      _quickcss.animation = function (name, frames) {
        var frame, generated, prefix, rules;

        if (name && typeof name === 'string' && frames && _typeof(frames) === 'object') {
          prefix = helpers.getPrefix('animation');
          generated = '';

          for (frame in frames) {
            rules = frames[frame];
            generated += "".concat(frame, " {").concat(helpers.ruleToString(rules), "}");
          }

          generated = "@".concat(prefix, "keyframes ").concat(name, " {").concat(generated, "}");
          return helpers.inlineStyle(generated, true, 0);
        }
      };

      _quickcss.register = function (rule, level, important) {
        var className, ref, style;

        if (rule && _typeof(rule) === 'object') {
          level || (level = 0);
          rule = helpers.ruleToString(rule, important);

          if (!(className = (ref = helpers.inlineStyleConfig[level]) != null ? ref[rule] : void 0)) {
            className = helpers.hash(rule);
            style = ".".concat(className, " {").concat(rule, "}");
            helpers.inlineStyle(style, className, level);
          }

          return className;
        }
      };

      _quickcss.clearRegistered = function (level) {
        return helpers.clearInlineStyle(level || 0);
      };

      _quickcss.UNSET = function () {
        switch (false) {
          case !helpers.isValueSupported('display', 'unset'):
            return 'unset';

          case !helpers.isValueSupported('display', 'initial'):
            return 'initial';

          case !helpers.isValueSupported('display', 'inherit'):
            return 'inherit';
        }
      }();

      _quickcss.supports = helpers.isValueSupported;
      _quickcss.supportsProperty = helpers.isPropSupported;
      _quickcss.normalizeProperty = helpers.normalizeProperty;
      _quickcss.normalizeValue = helpers.normalizeValue;
      _quickcss.version = "1.4.1";
      module.exports = _quickcss;
      return module.exports;
    },
    1: function _(require, module, exports) {
      var SAMPLE_STYLE, styleConfig;

      var __constants = require(2);

      SAMPLE_STYLE = document.createElement('div').style;

      var includes = exports.includes = function includes(target, item) {
        return target && target.indexOf(item) !== -1;
      };

      var isIterable = exports.isIterable = function isIterable(target) {
        return target && _typeof(target) === 'object' && typeof target.length === 'number' && !target.nodeType;
      };

      var toKebabCase = exports.toKebabCase = function toKebabCase(string) {
        return string.replace(__constants.REGEX_KEBAB, function (e, letter) {
          return "-".concat(letter.toLowerCase());
        });
      };

      var isPropSupported = exports.isPropSupported = function isPropSupported(property) {
        return typeof SAMPLE_STYLE[property] !== 'undefined';
      };

      var isValueSupported = exports.isValueSupported = function isValueSupported(property, value) {
        if (window.CSS && window.CSS.supports) {
          return window.CSS.supports(property, value);
        } else {
          SAMPLE_STYLE[property] = value;
          return SAMPLE_STYLE[property] === '' + value;
        }
      };

      var getPrefix = exports.getPrefix = function getPrefix(property, skipInitialCheck) {
        var j, len1, prefix;

        if (skipInitialCheck || !isPropSupported(property)) {
          for (j = 0, len1 = __constants.POSSIBLE_PREFIXES.length; j < len1; j++) {
            prefix = __constants.POSSIBLE_PREFIXES[j];

            if (isPropSupported("-".concat(prefix, "-").concat(property))) {
              return "-".concat(prefix, "-");
            }
          }
        }

        return '';
      };

      var normalizeProperty = exports.normalizeProperty = function normalizeProperty(property) {
        property = toKebabCase(property);

        if (isPropSupported(property)) {
          return property;
        } else {
          return "".concat(getPrefix(property, true)).concat(property);
        }
      };

      var normalizeValue = exports.normalizeValue = function normalizeValue(property, value) {
        if (includes(__constants.REQUIRES_UNIT_VALUE, property) && value !== null) {
          value = '' + value;

          if (__constants.REGEX_DIGITS.test(value) && !__constants.REGEX_LEN_VAL.test(value) && !__constants.REGEX_SPACE.test(value)) {
            value += property === 'line-height' ? 'em' : 'px';
          }
        }

        return value;
      };

      var sort = exports.sort = function sort(array) {
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

      var hash = exports.hash = function hash(string) {
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

      var ruleToString = exports.ruleToString = function ruleToString(rule, important) {
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

      var inlineStyleConfig = exports.inlineStyleConfig = styleConfig = Object.create(null);

      var inlineStyle = exports.inlineStyle = function inlineStyle(rule, valueToStore, level) {
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

      var clearInlineStyle = exports.clearInlineStyle = function clearInlineStyle(level) {
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
      };

      return module.exports;
    },
    2: function _(require, module, exports) {
      var REGEX_LEN_VAL = exports.REGEX_LEN_VAL = /^\d+(?:[a-z]|\%)+$/i;
      var REGEX_DIGITS = exports.REGEX_DIGITS = /\d+$/;
      var REGEX_SPACE = exports.REGEX_SPACE = /\s/;
      var REGEX_KEBAB = exports.REGEX_KEBAB = /([A-Z])+/g;
      var IMPORTANT = exports.IMPORTANT = 'important';
      var POSSIBLE_PREFIXES = exports.POSSIBLE_PREFIXES = ['webkit', 'moz', 'ms', 'o'];
      var REQUIRES_UNIT_VALUE = exports.REQUIRES_UNIT_VALUE = ['background-position-x', 'background-position-y', 'block-size', 'border-width', 'columnRule-width', 'cx', 'cy', 'font-size', 'grid-column-gap', 'grid-row-gap', 'height', 'inline-size', 'line-height', 'minBlock-size', 'min-height', 'min-inline-size', 'min-width', 'max-height', 'max-width', 'outline-offset', 'outline-width', 'perspective', 'shape-margin', 'stroke-dashoffset', 'stroke-width', 'text-indent', 'width', 'word-spacing', 'top', 'bottom', 'left', 'right', 'x', 'y'];
      var QUAD_SHORTHANDS = exports.QUAD_SHORTHANDS = ['margin', 'padding', 'border', 'border-radius'];
      var DIRECTIONS = exports.DIRECTIONS = ['top', 'bottom', 'left', 'right'];
      QUAD_SHORTHANDS.forEach(function (property) {
        var direction, i, len;
        REQUIRES_UNIT_VALUE.push(property);

        for (i = 0, len = DIRECTIONS.length; i < len; i++) {
          direction = DIRECTIONS[i];
          REQUIRES_UNIT_VALUE.push(property + '-' + direction);
        }
      });
      return module.exports;
    }
  }, this);

  if (typeof define === 'function' && define.umd) {
    define(function () {
      return require(0);
    });
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module.exports) {
    module.exports = require(0);
  } else {
    return this['quickcss'] = require(0);
  }
}).call(void 0, null);


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmNvZmZlZSIsIi4uL3BhY2thZ2UuanNvbiIsImhlbHBlcnMuY29mZmVlIiwiY29uc3RhbnRzLmNvZmZlZSJdLCJuYW1lcyI6WyJxdWlja2NzcyIsInRhcmdldEVsIiwicHJvcGVydHkiLCJ2YWx1ZSIsImltcG9ydGFudCIsImNvbXB1dGVkU3R5bGUiLCJoZWxwZXJzIiwiaXNJdGVyYWJsZSIsImkiLCJzdWJFbCIsInN1YlByb3BlcnR5Iiwic3ViVmFsdWUiLCJub3JtYWxpemVQcm9wZXJ0eSIsIl9jb21wdXRlZFN0eWxlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInN0eWxlIiwic2V0UHJvcGVydHkiLCJub3JtYWxpemVWYWx1ZSIsImFuaW1hdGlvbiIsIm5hbWUiLCJmcmFtZXMiLCJmcmFtZSIsInByZWZpeCIsImdldFByZWZpeCIsImdlbmVyYXRlZCIsInJ1bGVUb1N0cmluZyIsInJ1bGVzIiwiaW5saW5lU3R5bGUiLCJyZWdpc3RlciIsInJ1bGUiLCJsZXZlbCIsImNsYXNzTmFtZSIsImhhc2giLCJjbGVhclJlZ2lzdGVyZWQiLCJjbGVhcklubGluZVN0eWxlIiwiVU5TRVQiLCJpc1ZhbHVlU3VwcG9ydGVkIiwic3VwcG9ydHMiLCJzdXBwb3J0c1Byb3BlcnR5IiwiaXNQcm9wU3VwcG9ydGVkIiwidmVyc2lvbiIsIm1vZHVsZSIsImV4cG9ydHMiLCJTQU1QTEVfU1RZTEUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbmNsdWRlcyIsInRhcmdldCIsIml0ZW0iLCJpbmRleE9mIiwibGVuZ3RoIiwibm9kZVR5cGUiLCJ0b0tlYmFiQ2FzZSIsInN0cmluZyIsInJlcGxhY2UiLCJlIiwibGV0dGVyIiwidG9Mb3dlckNhc2UiLCJ3aW5kb3ciLCJDU1MiLCJza2lwSW5pdGlhbENoZWNrIiwiaiIsImxlbjEiLCJ0ZXN0Iiwic29ydCIsImFycmF5IiwiZ3JlYXQiLCJsZW4iLCJsZXNzIiwicGl2b3QiLCJwdXNoIiwiY29uY2F0IiwiaHNoIiwiY2hhckNvZGVBdCIsIm91dHB1dCIsInByb3AiLCJwcm9wcyIsIk9iamVjdCIsImtleXMiLCJpbmxpbmVTdHlsZUNvbmZpZyIsInN0eWxlQ29uZmlnIiwiY3JlYXRlIiwidmFsdWVUb1N0b3JlIiwiY29uZmlnIiwic3R5bGVFbCIsImlkIiwiaGVhZCIsImFwcGVuZENoaWxkIiwiZWwiLCJjb250ZW50IiwiY2FjaGUiLCJ0ZXh0Q29udGVudCIsImtleSIsIlJFR0VYX0xFTl9WQUwiLCJSRUdFWF9ESUdJVFMiLCJSRUdFWF9TUEFDRSIsIlJFR0VYX0tFQkFCIiwiSU1QT1JUQU5UIiwiUE9TU0lCTEVfUFJFRklYRVMiLCJSRVFVSVJFU19VTklUX1ZBTFVFIiwiUVVBRF9TSE9SVEhBTkRTIiwiRElSRUNUSU9OUyIsImZvckVhY2giLCJkaXJlY3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBQTtBQUVBO0FBRUE7QUFEQUEsV0FBVyxVQUFDQyxVQUFVQyxVQUFVQyxPQUFPQyxXQUE1QjtBQUNWQzs7TUFDTUMsUUFBUUMsV0FBV047QUFDVU87O0FBQWpDUixTQUFTUyxPQUFPUCxVQUFVQzs7O0tBRXRCLE9BQU9ELGFBQVk7QUFDbUJROztBQUExQ1YsU0FBU0MsVUFBVVMsYUFBYUM7O0FBRDVCOztBQUlKVCxXQUFXSSxRQUFRTSxrQkFBa0JWO0FBQ3JDLElBQUcsT0FBT0MsVUFBUyxhQUFuQjtBQUNDRSxnQkFBZ0JKLFNBQVNZLG1CQUFUWixTQUFTWSxpQkFBbUJDLGlCQUFpQmI7QUFDN0QsT0FBT0ksY0FBY0g7T0FFakIsSUFBR0EsVUFBSDtBQUNKRCxTQUFTYyxNQUFNQyxZQUFZZCxVQUFVSSxRQUFRVyxlQUFlZixVQUFVQyxRQUFxQkMscUNBQWI7Ozs7QUFLbEZKLFNBQVNrQixZQUFZLFVBQUNDLE1BQU1DLFFBQVA7QUFBaUJDO0lBQUdGLFFBQVMsT0FBT0EsU0FBUSxZQUFhQyxVQUFXLE9BQU9BLFdBQVUsVUFBcEU7QUFDckNFLFNBQVNoQixRQUFRaUIsVUFBVTtBQUMzQkMsWUFBWTtBQUVaSDs7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TUFBTWQsS0FBS2pCO0FBQ1hzQixPQUFPTyxNQUFNRSxPQUFPOzs7Ozs7O0FDbkoxQixBQUFPLElBQUlDLHdDQUFnQjtBQUUzQixBQUFPLElBQUlDLHNDQUFlO0FBRTFCLEFBQU8sSUFBSUMsb0NBQWM7QUFFekIsQUFBTyxJQUFJQyxvQ0FBYztBQUV6QixBQUFPLElBQUlDLGdDQUFZO0FBRXZCLEFBQU8sSUFBSUMsZ0RBQW9CLENBQUMsVUFBVSxPQUFPLE1BQU07QUFFdkQsQUFBTyxJQUFJQyxvREFBc0IsQ0FBQyx5QkFBeUIseUJBQXlCLGNBQWMsZ0JBQWdCLG9CQUFvQixNQUFNLE1BQU0sYUFBYSxtQkFBbUIsZ0JBQWdCLFVBQVUsZUFBZSxlQUFlLGlCQUFpQixjQUFjLG1CQUFtQixhQUFhLGNBQWMsYUFBYSxrQkFBa0IsaUJBQWlCLGVBQWUsZ0JBQWdCLHFCQUFxQixnQkFBZ0IsZUFBZSxTQUFTLGdCQUFnQixPQUFPLFVBQVUsUUFBUSxTQUFTLEtBQUs7QUFFMWYsQUFBTyxJQUFJQyw0Q0FBa0IsQ0FBQyxVQUFVLFdBQVcsVUFBVTtBQUU3RCxBQUFPLElBQUlDLGtDQUFhLENBQUMsT0FBTyxVQUFVLFFBQVE7QUF5Q2xERCxnQkFBZ0JFLFFBQVEsVUFBQ3BHLFVBQUQ7QUFDdkJxRztvQkFBb0JqQyxLQUFLcEU7QUFDekJNOztBQUNDMkYsb0JBQW9CN0IsS0FBS3BFLFdBQVMsTUFBSXFHIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGhlbHBlcnMgZnJvbSAnLi9oZWxwZXJzJ1xuaW1wb3J0IHtJTVBPUlRBTlR9IGZyb20gJy4vY29uc3RhbnRzJ1xuXG5xdWlja2NzcyA9ICh0YXJnZXRFbCwgcHJvcGVydHksIHZhbHVlLCBpbXBvcnRhbnQpLT5cblx0c3dpdGNoXG5cdFx0d2hlbiBoZWxwZXJzLmlzSXRlcmFibGUodGFyZ2V0RWwpXG5cdFx0XHRxdWlja2NzcyhzdWJFbCwgcHJvcGVydHksIHZhbHVlKSBmb3Igc3ViRWwgaW4gdGFyZ2V0RWxcblx0XG5cdFx0d2hlbiB0eXBlb2YgcHJvcGVydHkgaXMgJ29iamVjdCcgIyBQYXNzZWQgYSBzdHlsZSBtYXBcblx0XHRcdHF1aWNrY3NzKHRhcmdldEVsLCBzdWJQcm9wZXJ0eSwgc3ViVmFsdWUpIGZvciBzdWJQcm9wZXJ0eSxzdWJWYWx1ZSBvZiBwcm9wZXJ0eVxuXHRcblx0XHRlbHNlXG5cdFx0XHRwcm9wZXJ0eSA9IGhlbHBlcnMubm9ybWFsaXplUHJvcGVydHkocHJvcGVydHkpXG5cdFx0XHRpZiB0eXBlb2YgdmFsdWUgaXMgJ3VuZGVmaW5lZCdcblx0XHRcdFx0Y29tcHV0ZWRTdHlsZSA9IHRhcmdldEVsLl9jb21wdXRlZFN0eWxlIHx8PSBnZXRDb21wdXRlZFN0eWxlKHRhcmdldEVsKVxuXHRcdFx0XHRyZXR1cm4gY29tcHV0ZWRTdHlsZVtwcm9wZXJ0eV1cblx0XHRcdFxuXHRcdFx0ZWxzZSBpZiBwcm9wZXJ0eVxuXHRcdFx0XHR0YXJnZXRFbC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eSwgaGVscGVycy5ub3JtYWxpemVWYWx1ZShwcm9wZXJ0eSwgdmFsdWUpLCBJTVBPUlRBTlQgaWYgaW1wb3J0YW50KVxuXG5cdHJldHVyblxuXG5cbnF1aWNrY3NzLmFuaW1hdGlvbiA9IChuYW1lLCBmcmFtZXMpLT4gaWYgbmFtZSBhbmQgdHlwZW9mIG5hbWUgaXMgJ3N0cmluZycgYW5kIGZyYW1lcyBhbmQgdHlwZW9mIGZyYW1lcyBpcyAnb2JqZWN0J1xuXHRwcmVmaXggPSBoZWxwZXJzLmdldFByZWZpeCgnYW5pbWF0aW9uJylcblx0Z2VuZXJhdGVkID0gJydcblx0XG5cdGZvciBmcmFtZSxydWxlcyBvZiBmcmFtZXNcblx0XHRnZW5lcmF0ZWQgKz0gXCIje2ZyYW1lfSB7I3toZWxwZXJzLnJ1bGVUb1N0cmluZyhydWxlcyl9fVwiXG5cblx0Z2VuZXJhdGVkID0gXCJAI3twcmVmaXh9a2V5ZnJhbWVzICN7bmFtZX0geyN7Z2VuZXJhdGVkfX1cIlxuXHRoZWxwZXJzLmlubGluZVN0eWxlKGdlbmVyYXRlZCwgdHJ1ZSwgMClcblxuXG5xdWlja2Nzcy5yZWdpc3RlciA9IChydWxlLCBsZXZlbCwgaW1wb3J0YW50KS0+IGlmIHJ1bGUgYW5kIHR5cGVvZiBydWxlIGlzICdvYmplY3QnXG5cdGxldmVsIHx8PSAwXG5cdHJ1bGUgPSBoZWxwZXJzLnJ1bGVUb1N0cmluZyhydWxlLCBpbXBvcnRhbnQpXG5cblx0dW5sZXNzIGNsYXNzTmFtZSA9IGhlbHBlcnMuaW5saW5lU3R5bGVDb25maWdbbGV2ZWxdP1tydWxlXVxuXHRcdGNsYXNzTmFtZSA9IGhlbHBlcnMuaGFzaChydWxlKVxuXHRcdHN0eWxlID0gXCIuI3tjbGFzc05hbWV9IHsje3J1bGV9fVwiXG5cdFx0aGVscGVycy5pbmxpbmVTdHlsZShzdHlsZSwgY2xhc3NOYW1lLCBsZXZlbClcblxuXHRyZXR1cm4gY2xhc3NOYW1lXG5cblxucXVpY2tjc3MuY2xlYXJSZWdpc3RlcmVkID0gKGxldmVsKS0+XG5cdGhlbHBlcnMuY2xlYXJJbmxpbmVTdHlsZShsZXZlbCBvciAwKVxuXG5cbiMjIyBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAjIyNcbnF1aWNrY3NzLlVOU0VUID0gc3dpdGNoXG5cdHdoZW4gaGVscGVycy5pc1ZhbHVlU3VwcG9ydGVkKCdkaXNwbGF5JywndW5zZXQnKSB0aGVuICd1bnNldCdcblx0d2hlbiBoZWxwZXJzLmlzVmFsdWVTdXBwb3J0ZWQoJ2Rpc3BsYXknLCdpbml0aWFsJykgdGhlbiAnaW5pdGlhbCdcblx0d2hlbiBoZWxwZXJzLmlzVmFsdWVTdXBwb3J0ZWQoJ2Rpc3BsYXknLCdpbmhlcml0JykgdGhlbiAnaW5oZXJpdCdcblxucXVpY2tjc3Muc3VwcG9ydHMgPSBoZWxwZXJzLmlzVmFsdWVTdXBwb3J0ZWRcbnF1aWNrY3NzLnN1cHBvcnRzUHJvcGVydHkgPSBoZWxwZXJzLmlzUHJvcFN1cHBvcnRlZFxucXVpY2tjc3Mubm9ybWFsaXplUHJvcGVydHkgPSBoZWxwZXJzLm5vcm1hbGl6ZVByb3BlcnR5XG5xdWlja2Nzcy5ub3JtYWxpemVWYWx1ZSA9IGhlbHBlcnMubm9ybWFsaXplVmFsdWVcbnF1aWNrY3NzLnZlcnNpb24gPSBpbXBvcnQgJy4uL3BhY2thZ2UuanNvbiAkIHZlcnNpb24nXG5cblxubW9kdWxlLmV4cG9ydHMgPSBxdWlja2NzcyIsIntcbiAgXCJuYW1lXCI6IFwicXVpY2tjc3NcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMS40LjFcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIuKaoe+4jy1mYXN0IHRpbnkgQ1NTIG1hbmFnZW1lbnQgdG9vbCBzcHJpbmtsZWQgd2l0aCBBUEkgc3VnYXJcIixcbiAgXCJtYWluXCI6IFwiZGlzdC9xdWlja2Nzcy5qc1wiLFxuICBcImJyb3dzZXJcIjoge1xuICAgIFwiLi9kZWJ1Z1wiOiBcImRpc3QvcXVpY2tjc3MuZGVidWcuanNcIixcbiAgICBcIi4vZGlzdC9xdWlja2Nzcy5qc1wiOiBcInNyYy9pbmRleC5jb2ZmZWVcIlxuICB9LFxuICBcImJyb3dzZXJpZnlcIjoge1xuICAgIFwidHJhbnNmb3JtXCI6IFtcbiAgICAgIFwic2ltcGx5aW1wb3J0L2NvbXBhdFwiXG4gICAgXVxuICB9LFxuICBcInNpbXBseWltcG9ydFwiOiB7XG4gICAgXCJmaW5hbFRyYW5zZm9ybVwiOiBbXG4gICAgICBbXG4gICAgICAgIFwiYmFiZWxpZnlcIixcbiAgICAgICAge1xuICAgICAgICAgIFwicHJlc2V0c1wiOiBbXG4gICAgICAgICAgICBcIkBiYWJlbC9wcmVzZXQtZW52XCJcbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBcIi5jb25maWcvdHJhbnNmb3Jtcy9taW5pZnktc3VwZXJcIixcbiAgICAgIFwiLmNvbmZpZy90cmFuc2Zvcm1zL21pbmlmeS1yZW5hbWVcIixcbiAgICAgIFwiLmNvbmZpZy90cmFuc2Zvcm1zL21pbmlmeS1zaW1wbGVcIlxuICAgIF1cbiAgfSxcbiAgXCJkaXJlY3Rvcmllc1wiOiB7XG4gICAgXCJ0ZXN0XCI6IFwidGVzdFwiXG4gIH0sXG4gIFwiZmlsZXNcIjogW1xuICAgIFwiZGlzdFwiLFxuICAgIFwic3JjXCJcbiAgXSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcInBvc3R2ZXJzaW9uXCI6IFwibnBtIHJ1biBidWlsZCAmJiBnaXQgYWRkIC4gJiYgZ2l0IGNvbW1pdCAtYSAtbSAnW0J1aWxkXSdcIixcbiAgICBcInByZXB1Ymxpc2hPbmx5XCI6IFwibnBtIHJ1biB0ZXN0OnRyYXZpc1wiLFxuICAgIFwicG9zdHB1Ymxpc2hcIjogXCJnaXQgcHVzaFwiLFxuICAgIFwid2F0Y2hcIjogXCJjYWtlIC1kIHdhdGNoXCIsXG4gICAgXCJidWlsZFwiOiBcImNha2UgLWQgYnVpbGQgJiYgY2FrZSBidWlsZCAmJiBjYWtlIG1lYXN1cmUgJiYgY3AgLXIgYnVpbGQvKiBkaXN0L1wiLFxuICAgIFwidGVzdFwiOiBcIm5wbSBydW4gdGVzdDpicm93c2VyIC1zIHx8IHRydWVcIixcbiAgICBcInRlc3Q6dHJhdmlzXCI6IFwibnBtIHJ1biB0ZXN0OmJyb3dzZXIgLXMgJiYgbnBtIHJ1biB0ZXN0Om1pbmlmaWVkIC1zXCIsXG4gICAgXCJ0ZXN0OmxvY2FsXCI6IFwib3BlbiB0ZXN0L3Rlc3RydW5uZXIuaHRtbFwiLFxuICAgIFwidGVzdDptaW5pZmllZFwiOiBcIm1pbmlmaWVkPTEgbnBtIHJ1biB0ZXN0OmJyb3dzZXIgLXMgfHwgdHJ1ZVwiLFxuICAgIFwidGVzdDprYXJtYVwiOiBcImNha2UgaW5zdGFsbDp0ZXN0OyAgIGthcm1hIHN0YXJ0IC5jb25maWcva2FybWEuY29uZi5jb2ZmZWVcIixcbiAgICBcInRlc3Q6YnJvd3NlclwiOiBcImNha2UgaW5zdGFsbDp0ZXN0OyBrYXJtYSBzdGFydCAtLXNpbmdsZS1ydW4gLS1icm93c2VycyBFbGVjdHJvbiAuY29uZmlnL2thcm1hLmNvbmYuY29mZmVlXCIsXG4gICAgXCJ0ZXN0OmNocm9tZVwiOiBcImNha2UgaW5zdGFsbDp0ZXN0OyAga2FybWEgc3RhcnQgLS1zaW5nbGUtcnVuIC0tYnJvd3NlcnMgQ2hyb21lIC5jb25maWcva2FybWEuY29uZi5jb2ZmZWVcIixcbiAgICBcInRlc3Q6ZmlyZWZveFwiOiBcImNha2UgaW5zdGFsbDp0ZXN0OyBrYXJtYSBzdGFydCAtLXNpbmdsZS1ydW4gLS1icm93c2VycyBGaXJlZm94IC5jb25maWcva2FybWEuY29uZi5jb2ZmZWVcIixcbiAgICBcInRlc3Q6c2FmYXJpXCI6IFwiY2FrZSBpbnN0YWxsOnRlc3Q7ICBrYXJtYSBzdGFydCAtLXNpbmdsZS1ydW4gLS1icm93c2VycyBTYWZhcmkgLmNvbmZpZy9rYXJtYS5jb25mLmNvZmZlZVwiLFxuICAgIFwidGVzdDpzYXVjZVwiOiBcImNha2UgaW5zdGFsbDp0ZXN0OyAgIHNhdWNlPTEga2FybWEgc3RhcnQgLmNvbmZpZy9rYXJtYS5jb25mLmNvZmZlZVwiLFxuICAgIFwiY292ZXJhZ2VcIjogXCJjYWtlIGluc3RhbGw6Y292ZXJhZ2U7IG5wbSBydW4gY292ZXJhZ2U6cnVuICYmIG5wbSBydW4gY292ZXJhZ2U6YmFkZ2VcIixcbiAgICBcImNvdmVyYWdlOnJ1blwiOiBcImNvdmVyYWdlPXRydWUgbnBtIHJ1biB0ZXN0OmVsZWN0cm9uXCIsXG4gICAgXCJjb3ZlcmFnZTpiYWRnZVwiOiBcImJhZGdlLWdlbiAtZCAuLy5jb25maWcvYmFkZ2VzL2NvdmVyYWdlXCIsXG4gICAgXCJjb3ZlcmFnZTpzaG93XCI6IFwib3BlbiBjb3ZlcmFnZS9sY292LXJlcG9ydC9pbmRleC5odG1sXCJcbiAgfSxcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImdpdCtodHRwczovL2dpdGh1Yi5jb20vZGFuaWVsa2FsZW4vcXVpY2tjc3MuZ2l0XCJcbiAgfSxcbiAgXCJhdXRob3JcIjogXCJkYW5pZWxrYWxlblwiLFxuICBcImxpY2Vuc2VcIjogXCJJU0NcIixcbiAgXCJidWdzXCI6IHtcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9kYW5pZWxrYWxlbi9xdWlja2Nzcy9pc3N1ZXNcIlxuICB9LFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2RhbmllbGthbGVuL3F1aWNrY3NzI3JlYWRtZVwiLFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAYmFiZWwvY29yZVwiOiBcIl43LjEuNlwiLFxuICAgIFwiQGJhYmVsL3ByZXNldC1lbnZcIjogXCJeNy4xLjZcIixcbiAgICBcImJhYmVsaWZ5XCI6IFwiXjEwLjAuMFwiLFxuICAgIFwiYmx1ZWJpcmRcIjogXCJeMy41LjBcIixcbiAgICBcImNoYWxrXCI6IFwiXjIuMC4xXCIsXG4gICAgXCJjb2ZmZWUtc2NyaXB0XCI6IFwiXjEuMTIuNlwiLFxuICAgIFwiZXhlY2FcIjogXCJeMC43LjBcIixcbiAgICBcImZzLWpldHBhY2tcIjogXCJeMC4xMy4zXCIsXG4gICAgXCJwcm9taXNlLWJyZWFrXCI6IFwiXjAuMS4xXCIsXG4gICAgXCJzZW12ZXJcIjogXCJeNS4zLjBcIixcbiAgICBcInNpbXBseWltcG9ydFwiOiBcIl40LjAuOVwiLFxuICAgIFwic2ltcGx5d2F0Y2hcIjogXCJeMy4wLjBcIlxuICB9XG59XG4iLCJpbXBvcnQge0lNUE9SVEFOVCwgUkVHRVhfS0VCQUIsIFJFR0VYX1NQQUNFLCBSRUdFWF9ESUdJVFMsIFJFR0VYX0xFTl9WQUwsIFBPU1NJQkxFX1BSRUZJWEVTLCBSRVFVSVJFU19VTklUX1ZBTFVFfSBmcm9tICcuL2NvbnN0YW50cydcblNBTVBMRV9TVFlMRSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLnN0eWxlXG5cbmV4cG9ydCBpbmNsdWRlcyA9ICh0YXJnZXQsIGl0ZW0pLT5cblx0dGFyZ2V0IGFuZCB0YXJnZXQuaW5kZXhPZihpdGVtKSBpc250IC0xXG5cbmV4cG9ydCBpc0l0ZXJhYmxlID0gKHRhcmdldCktPlxuXHR0YXJnZXQgYW5kXG5cdHR5cGVvZiB0YXJnZXQgaXMgJ29iamVjdCcgYW5kXG5cdHR5cGVvZiB0YXJnZXQubGVuZ3RoIGlzICdudW1iZXInIGFuZFxuXHRub3QgdGFyZ2V0Lm5vZGVUeXBlXG5cbmV4cG9ydCB0b0tlYmFiQ2FzZSA9IChzdHJpbmcpLT5cblx0c3RyaW5nLnJlcGxhY2UgUkVHRVhfS0VCQUIsIChlLGxldHRlciktPiBcIi0je2xldHRlci50b0xvd2VyQ2FzZSgpfVwiXG5cbmV4cG9ydCBpc1Byb3BTdXBwb3J0ZWQgPSAocHJvcGVydHkpLT5cblx0dHlwZW9mIFNBTVBMRV9TVFlMRVtwcm9wZXJ0eV0gaXNudCAndW5kZWZpbmVkJ1xuXG5leHBvcnQgaXNWYWx1ZVN1cHBvcnRlZCA9IChwcm9wZXJ0eSwgdmFsdWUpLT5cblx0aWYgd2luZG93LkNTUyBhbmQgd2luZG93LkNTUy5zdXBwb3J0c1xuXHRcdHJldHVybiB3aW5kb3cuQ1NTLnN1cHBvcnRzKHByb3BlcnR5LCB2YWx1ZSlcblx0ZWxzZVxuXHRcdFNBTVBMRV9TVFlMRVtwcm9wZXJ0eV0gPSB2YWx1ZVxuXHRcdHJldHVybiBTQU1QTEVfU1RZTEVbcHJvcGVydHldIGlzICcnK3ZhbHVlXG5cbmV4cG9ydCBnZXRQcmVmaXggPSAocHJvcGVydHksIHNraXBJbml0aWFsQ2hlY2spLT5cblx0aWYgc2tpcEluaXRpYWxDaGVjayBvciBub3QgaXNQcm9wU3VwcG9ydGVkKHByb3BlcnR5KVxuXHRcdGZvciBwcmVmaXggaW4gUE9TU0lCTEVfUFJFRklYRVNcblx0XHRcdCMjIyBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAjIyNcblx0XHRcdHJldHVybiBcIi0je3ByZWZpeH0tXCIgaWYgaXNQcm9wU3VwcG9ydGVkKFwiLSN7cHJlZml4fS0je3Byb3BlcnR5fVwiKVxuXHRcblx0cmV0dXJuICcnXG5cbmV4cG9ydCBub3JtYWxpemVQcm9wZXJ0eSA9IChwcm9wZXJ0eSktPlx0XG5cdHByb3BlcnR5ID0gdG9LZWJhYkNhc2UocHJvcGVydHkpXG5cdFxuXHRpZiBpc1Byb3BTdXBwb3J0ZWQocHJvcGVydHkpXG5cdFx0cmV0dXJuIHByb3BlcnR5XG5cdGVsc2Vcblx0XHRyZXR1cm4gXCIje2dldFByZWZpeChwcm9wZXJ0eSx0cnVlKX0je3Byb3BlcnR5fVwiXG5cbmV4cG9ydCBub3JtYWxpemVWYWx1ZSA9IChwcm9wZXJ0eSwgdmFsdWUpLT5cblx0aWYgaW5jbHVkZXMoUkVRVUlSRVNfVU5JVF9WQUxVRSwgcHJvcGVydHkpIGFuZCB2YWx1ZSBpc250IG51bGxcblx0XHR2YWx1ZSA9ICcnK3ZhbHVlXG5cdFx0aWYgIFJFR0VYX0RJR0lUUy50ZXN0KHZhbHVlKSBhbmRcblx0XHRcdG5vdCBSRUdFWF9MRU5fVkFMLnRlc3QodmFsdWUpIGFuZFxuXHRcdFx0bm90IFJFR0VYX1NQQUNFLnRlc3QodmFsdWUpXG5cdFx0XHRcdHZhbHVlICs9IGlmIHByb3BlcnR5IGlzICdsaW5lLWhlaWdodCcgdGhlbiAnZW0nIGVsc2UgJ3B4J1xuXG5cdHJldHVybiB2YWx1ZVxuXG5cbmV4cG9ydCBzb3J0ID0gKGFycmF5KS0+XG5cdGlmIGFycmF5Lmxlbmd0aCA8IDJcblx0XHRyZXR1cm4gYXJyYXlcblx0ZWxzZVxuXHRcdHBpdm90ID0gYXJyYXlbMF07IGxlc3MgPSBbXTsgZ3JlYXQgPSBbXTsgbGVuID0gYXJyYXkubGVuZ3RoOyBpID0gMDtcblx0XHRcblx0XHR3aGlsZSArK2kgaXNudCBsZW5cblx0XHRcdGlmIGFycmF5W2ldIDw9IHBpdm90XG5cdFx0XHRcdGxlc3MucHVzaChhcnJheVtpXSlcblx0XHRcdGVsc2Vcblx0XHRcdFx0Z3JlYXQucHVzaChhcnJheVtpXSlcblxuXHRcdHJldHVybiBzb3J0KGxlc3MpLmNvbmNhdChwaXZvdCwgc29ydChncmVhdCkpXG5cblxuZXhwb3J0IGhhc2ggPSAoc3RyaW5nKS0+XG5cdGhzaCA9IDUzODE7IGkgPSAtMTsgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aFxuXHRcblx0d2hpbGUgKytpIGlzbnQgc3RyaW5nLmxlbmd0aFxuXHRcdGhzaCA9ICgoaHNoIDw8IDUpIC0gaHNoKSArIHN0cmluZy5jaGFyQ29kZUF0KGkpXG5cdFx0aHNoIHw9IDBcblxuXHRyZXR1cm4gJ18nKyhpZiBoc2ggPCAwIHRoZW4gaHNoICogLTIgZWxzZSBoc2gpXG5cblxuZXhwb3J0IHJ1bGVUb1N0cmluZyA9IChydWxlLCBpbXBvcnRhbnQpLT5cblx0b3V0cHV0ID0gJydcblx0cHJvcHMgPSBzb3J0KE9iamVjdC5rZXlzKHJ1bGUpKVxuXHRcblx0Zm9yIHByb3AgaW4gcHJvcHNcblx0XHRpZiB0eXBlb2YgcnVsZVtwcm9wXSBpcyAnc3RyaW5nJyBvciB0eXBlb2YgcnVsZVtwcm9wXSBpcyAnbnVtYmVyJ1xuXHRcdFx0cHJvcGVydHkgPSBub3JtYWxpemVQcm9wZXJ0eShwcm9wKVxuXHRcdFx0dmFsdWUgPSBub3JtYWxpemVWYWx1ZShwcm9wZXJ0eSwgcnVsZVtwcm9wXSlcblx0XHRcdHZhbHVlICs9IFwiICFpbXBvcnRhbnRcIiBpZiBpbXBvcnRhbnRcblx0XHRcdG91dHB1dCArPSBcIiN7cHJvcGVydHl9OiN7dmFsdWV9O1wiXG5cdFxuXHRyZXR1cm4gb3V0cHV0XG5cbmV4cG9ydCBpbmxpbmVTdHlsZUNvbmZpZyA9IHN0eWxlQ29uZmlnID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuZXhwb3J0IGlubGluZVN0eWxlID0gKHJ1bGUsIHZhbHVlVG9TdG9yZSwgbGV2ZWwpLT5cblx0aWYgbm90IGNvbmZpZz1zdHlsZUNvbmZpZ1tsZXZlbF1cblx0XHRzdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuXHRcdHN0eWxlRWwuaWQgPSBcInF1aWNrY3NzI3tsZXZlbCBvciAnJ31cIlxuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbClcblx0XHRzdHlsZUNvbmZpZ1tsZXZlbF0gPSBjb25maWcgPSBlbDpzdHlsZUVsLCBjb250ZW50OicnLCBjYWNoZTpPYmplY3QuY3JlYXRlKG51bGwpXG5cdFxuXHR1bmxlc3MgY29uZmlnLmNhY2hlW3J1bGVdXG5cdFx0Y29uZmlnLmNhY2hlW3J1bGVdID0gdmFsdWVUb1N0b3JlIG9yIHRydWVcblx0XHRjb25maWcuZWwudGV4dENvbnRlbnQgPSBjb25maWcuY29udGVudCArPSBydWxlXG5cdFxuXHRyZXR1cm5cblxuXG5leHBvcnQgY2xlYXJJbmxpbmVTdHlsZSA9IChsZXZlbCktPiBpZiBjb25maWcgPSBzdHlsZUNvbmZpZ1tsZXZlbF1cblx0cmV0dXJuIGlmIG5vdCBjb25maWcuY29udGVudFxuXHRjb25maWcuZWwudGV4dENvbnRlbnQgPSBjb25maWcuY29udGVudCA9ICcnXG5cdGtleXMgPSBPYmplY3Qua2V5cyhjb25maWcuY2FjaGUpXG5cdGNvbmZpZy5jYWNoZVtrZXldID0gbnVsbCBmb3Iga2V5IGluIGtleXNcblx0cmV0dXJuXG5cblxuXG5cblxuIiwiZXhwb3J0IFJFR0VYX0xFTl9WQUwgPSAvXlxcZCsoPzpbYS16XXxcXCUpKyQvaVxuZXhwb3J0IFJFR0VYX0RJR0lUUyA9IC9cXGQrJC9cbmV4cG9ydCBSRUdFWF9TUEFDRSA9IC9cXHMvXG5leHBvcnQgUkVHRVhfS0VCQUIgPSAvKFtBLVpdKSsvZ1xuZXhwb3J0IElNUE9SVEFOVCA9ICdpbXBvcnRhbnQnXG5cbmV4cG9ydCBQT1NTSUJMRV9QUkVGSVhFUyA9IFtcblx0J3dlYmtpdCdcblx0J21veidcblx0J21zJ1xuXHQnbydcbl1cbmV4cG9ydCBSRVFVSVJFU19VTklUX1ZBTFVFID0gW1xuXHQnYmFja2dyb3VuZC1wb3NpdGlvbi14J1xuXHQnYmFja2dyb3VuZC1wb3NpdGlvbi15J1xuXHQnYmxvY2stc2l6ZSdcblx0J2JvcmRlci13aWR0aCdcblx0J2NvbHVtblJ1bGUtd2lkdGgnXG5cdCdjeCdcblx0J2N5J1xuXHQnZm9udC1zaXplJ1xuXHQnZ3JpZC1jb2x1bW4tZ2FwJ1xuXHQnZ3JpZC1yb3ctZ2FwJ1xuXHQnaGVpZ2h0J1xuXHQnaW5saW5lLXNpemUnXG5cdCdsaW5lLWhlaWdodCdcblx0J21pbkJsb2NrLXNpemUnXG5cdCdtaW4taGVpZ2h0J1xuXHQnbWluLWlubGluZS1zaXplJ1xuXHQnbWluLXdpZHRoJ1xuXHQnbWF4LWhlaWdodCdcblx0J21heC13aWR0aCdcblx0J291dGxpbmUtb2Zmc2V0J1xuXHQnb3V0bGluZS13aWR0aCdcblx0J3BlcnNwZWN0aXZlJ1xuXHQnc2hhcGUtbWFyZ2luJ1xuXHQnc3Ryb2tlLWRhc2hvZmZzZXQnXG5cdCdzdHJva2Utd2lkdGgnXG5cdCd0ZXh0LWluZGVudCdcblx0J3dpZHRoJ1xuXHQnd29yZC1zcGFjaW5nJ1xuXHQndG9wJ1xuXHQnYm90dG9tJ1xuXHQnbGVmdCdcblx0J3JpZ2h0J1xuXHQneCdcblx0J3knXG5dXG5cbmV4cG9ydCBRVUFEX1NIT1JUSEFORFMgPSBbXG5cdCdtYXJnaW4nXG5cdCdwYWRkaW5nJ1xuXHQnYm9yZGVyJ1xuXHQnYm9yZGVyLXJhZGl1cydcbl1cbmV4cG9ydCBESVJFQ1RJT05TID0gWyd0b3AnLCdib3R0b20nLCdsZWZ0JywncmlnaHQnXVxuXG5RVUFEX1NIT1JUSEFORFMuZm9yRWFjaCAocHJvcGVydHkpLT5cblx0UkVRVUlSRVNfVU5JVF9WQUxVRS5wdXNoIHByb3BlcnR5XG5cdGZvciBkaXJlY3Rpb24gaW4gRElSRUNUSU9OU1xuXHRcdFJFUVVJUkVTX1VOSVRfVkFMVUUucHVzaCBwcm9wZXJ0eSsnLScrZGlyZWN0aW9uXG5cdHJldHVyblxuXG5cblxuXG5cbiJdfQ==