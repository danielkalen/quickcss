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
}).call(this, null);


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmNvZmZlZSIsIi4uL3BhY2thZ2UuanNvbiIsImhlbHBlcnMuY29mZmVlIiwiY29uc3RhbnRzLmNvZmZlZSJdLCJuYW1lcyI6WyJxdWlja2NzcyIsInRhcmdldEVsIiwicHJvcGVydHkiLCJ2YWx1ZSIsImltcG9ydGFudCIsImNvbXB1dGVkU3R5bGUiLCJoZWxwZXJzIiwiaXNJdGVyYWJsZSIsImkiLCJzdWJFbCIsInN1YlByb3BlcnR5Iiwic3ViVmFsdWUiLCJub3JtYWxpemVQcm9wZXJ0eSIsIl9jb21wdXRlZFN0eWxlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInN0eWxlIiwic2V0UHJvcGVydHkiLCJub3JtYWxpemVWYWx1ZSIsImFuaW1hdGlvbiIsIm5hbWUiLCJmcmFtZXMiLCJmcmFtZSIsInByZWZpeCIsImdldFByZWZpeCIsImdlbmVyYXRlZCIsInJ1bGVUb1N0cmluZyIsInJ1bGVzIiwiaW5saW5lU3R5bGUiLCJyZWdpc3RlciIsInJ1bGUiLCJsZXZlbCIsImNsYXNzTmFtZSIsImhhc2giLCJjbGVhclJlZ2lzdGVyZWQiLCJjbGVhcklubGluZVN0eWxlIiwiVU5TRVQiLCJpc1ZhbHVlU3VwcG9ydGVkIiwic3VwcG9ydHMiLCJzdXBwb3J0c1Byb3BlcnR5IiwiaXNQcm9wU3VwcG9ydGVkIiwidmVyc2lvbiIsIm1vZHVsZSIsImV4cG9ydHMiLCJTQU1QTEVfU1RZTEUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbmNsdWRlcyIsInRhcmdldCIsIml0ZW0iLCJpbmRleE9mIiwibGVuZ3RoIiwibm9kZVR5cGUiLCJ0b0tlYmFiQ2FzZSIsInN0cmluZyIsInJlcGxhY2UiLCJlIiwibGV0dGVyIiwidG9Mb3dlckNhc2UiLCJ3aW5kb3ciLCJDU1MiLCJza2lwSW5pdGlhbENoZWNrIiwiaiIsImxlbjEiLCJ0ZXN0Iiwic29ydCIsImFycmF5IiwiZ3JlYXQiLCJsZW4iLCJsZXNzIiwicGl2b3QiLCJwdXNoIiwiY29uY2F0IiwiaHNoIiwiY2hhckNvZGVBdCIsIm91dHB1dCIsInByb3AiLCJwcm9wcyIsIk9iamVjdCIsImtleXMiLCJpbmxpbmVTdHlsZUNvbmZpZyIsInN0eWxlQ29uZmlnIiwiY3JlYXRlIiwidmFsdWVUb1N0b3JlIiwiY29uZmlnIiwic3R5bGVFbCIsImlkIiwiaGVhZCIsImFwcGVuZENoaWxkIiwiZWwiLCJjb250ZW50IiwiY2FjaGUiLCJ0ZXh0Q29udGVudCIsImtleSIsIlJFR0VYX0xFTl9WQUwiLCJSRUdFWF9ESUdJVFMiLCJSRUdFWF9TUEFDRSIsIlJFR0VYX0tFQkFCIiwiSU1QT1JUQU5UIiwiUE9TU0lCTEVfUFJFRklYRVMiLCJSRVFVSVJFU19VTklUX1ZBTFVFIiwiUVVBRF9TSE9SVEhBTkRTIiwiRElSRUNUSU9OUyIsImZvckVhY2giLCJkaXJlY3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBQTtBQUVBO0FBRUE7QUFEQUEsV0FBVyxVQUFDQyxVQUFVQyxVQUFVQyxPQUFPQyxXQUE1QjtBQUNWQzs7TUFDTUMsUUFBUUMsV0FBV047QUFDVU87O0FBQWpDUixTQUFTUyxPQUFPUCxVQUFVQzs7O0tBRXRCLE9BQU9ELGFBQVk7QUFDbUJROztBQUExQ1YsU0FBU0MsVUFBVVMsYUFBYUM7O0FBRDVCOztBQUlKVCxXQUFXSSxRQUFRTSxrQkFBa0JWO0FBQ3JDLElBQUcsT0FBT0MsVUFBUyxhQUFuQjtBQUNDRSxnQkFBZ0JKLFNBQVNZLG1CQUFUWixTQUFTWSxpQkFBbUJDLGlCQUFpQmI7QUFDN0QsT0FBT0ksY0FBY0g7T0FFakIsSUFBR0EsVUFBSDtBQUNKRCxTQUFTYyxNQUFNQyxZQUFZZCxVQUFVSSxRQUFRVyxlQUFlZixVQUFVQyxRQUFxQkMscUNBQWI7Ozs7QUFLbEZKLFNBQVNrQixZQUFZLFVBQUNDLE1BQU1DLFFBQVA7QUFBaUJDO0lBQUdGLFFBQVMsT0FBT0EsU0FBUSxZQUFhQyxVQUFXLE9BQU9BLFdBQVUsVUFBcEU7QUFDckNFLFNBQVNoQixRQUFRaUIsVUFBVTtBQUMzQkMsWUFBWTtBQUVaSDs7QUFDQ0csZ0JBQWdCSCxVQUFVZixRQUFRbUIsYUFBYUM7O0FBRWhERixnQkFBZ0JGLG1CQUFtQkgsU0FBU0s7T0FDNUNsQixRQUFRcUIsWUFBWUgsV0FBVyxNQUFNOzs7QUFHdEN4QixTQUFTNEIsV0FBVyxVQUFDQyxNQUFNQyxPQUFPMUIsV0FBZDtBQUEyQjJCO0lBQUdGLFFBQVMsT0FBT0EsU0FBUSxVQUEzQjtBQUM5Q0Msa0JBQVU7QUFDVkQsT0FBT3ZCLFFBQVFtQixhQUFhSSxNQUFNekI7QUFFbEMsS0FBTzJCLG9FQUE4Q0YsaUJBQXJEO0FBQ0NFLFlBQVl6QixRQUFRMEIsS0FBS0g7QUFDekJkLFlBQVlnQixjQUFjRjtBQUMxQnZCLFFBQVFxQixZQUFZWixPQUFPZ0IsV0FBV0Q7O0FBRXZDLE9BQU9DOzs7QUFHUi9CLFNBQVNpQyxrQkFBa0IsVUFBQ0gsT0FBRDtPQUMxQnhCLFFBQVE0QixpQkFBaUJKLFNBQVM7O0FBSW5DOUIsU0FBU21DLFFBQVQ7QUFBaUI7TUFDWDdCLFFBQVE4QixpQkFBaUIsV0FBVTtPQUFjO0tBRHRDLENBRVg5QixRQUFROEIsaUJBQWlCLFdBQVU7T0FBZ0I7S0FGeEMsQ0FHWDlCLFFBQVE4QixpQkFBaUIsV0FBVTtPQUFnQjs7O0FBRXpEcEMsU0FBU3FDLFdBQVcvQixRQUFROEI7QUFDNUJwQyxTQUFTc0MsbUJBQW1CaEMsUUFBUWlDO0FBQ3BDdkMsU0FBU1ksb0JBQW9CTixRQUFRTTtBQUNyQ1osU0FBU2lCLGlCQUFpQlgsUUFBUVc7QUFDbENqQixTQUFTd0MsVUM1RFQ7QUQrREFDLE9BQU9DLFVBQVUxQzs7OztBRS9EakIyQztBQUVBO0FBREFBLGVBQWVDLFNBQVNDLGNBQWMsT0FBTzlCO0FBSzdDLEFBQU8sSUFBSStCLDhCQUFXLGtCQUFTQyxRQUFRQyxNQUFNO0FBQzNDLE9BQU9ELFVBQVVBLE9BQU9FLFFBQVFELFVBQVUsQ0FBQzs7QUFHN0MsQUFBTyxJQUFJekMsa0NBQWEsb0JBQVN3QyxRQUFRO0FBQ3ZDLE9BQU9BLFVBQVUsT0FBT0EsV0FBVyxZQUFZLE9BQU9BLE9BQU9HLFdBQVcsWUFBWSxDQUFDSCxPQUFPSTs7QUFHOUYsQUFBTyxJQUFJQyxvQ0FBYyxxQkFBU0MsUUFBUTtBQUN4QyxPQUFPQSxPQUFPQyxpQ0FBcUIsVUFBU0MsR0FBR0MsUUFBUTtBQUNyRCxXQUFXQSxPQUFPQzs7O0FBSXRCLEFBQU8sSUFBSWxCLDRDQUFrQix5QkFBU3JDLFVBQVU7QUFDOUMsT0FBTyxPQUFPeUMsYUFBYXpDLGNBQWM7O0FBRzNDLEFBQU8sSUFBSWtDLDhDQUFtQiwwQkFBU2xDLFVBQVVDLE9BQU87QUFDdEQsSUFBSXVELE9BQU9DLE9BQU9ELE9BQU9DLElBQUl0QixVQUFVO0FBQ3JDLE9BQU9xQixPQUFPQyxJQUFJdEIsU0FBU25DLFVBQVVDO09BQ2hDO0FBQ0x3QyxhQUFhekMsWUFBWUM7QUFDekIsT0FBT3dDLGFBQWF6QyxjQUFjLEtBQUtDOzs7QUFJM0MsQUFBTyxJQUFJb0IsZ0NBQVksbUJBQVNyQixVQUFVMEQsa0JBQWtCO0FBQzFELElBQUlDLEdBQUdDLE1BQU14QztBQUNiLElBQUlzQyxvQkFBb0IsQ0FBQ3JCLGdCQUFnQnJDLFdBQVc7QUFDbEQsS0FBSzJELEtBQUksR0FBR0MsT0FBTyw4QkFBa0JaLFNBQVFXLElBQUlDLE1BQU1ELEtBQUs7QUFDMUR2QyxTQUFTLDhCQUFrQnVDO0FBQzNCLElBQUl0QixvQkFBb0JqQixVQUFVcEIsYUFBYTtBQUU3QyxXQUFXb0I7Ozs7QUFJakIsT0FBTzs7QUFHVCxBQUFPLElBQUlWLGdEQUFvQiwyQkFBU1YsVUFBVTtBQUNoREEsV0FBV2tELFlBQVlsRDtBQUN2QixJQUFJcUMsZ0JBQWdCckMsV0FBVztBQUM3QixPQUFPQTtPQUNGO0FBQ0wsVUFBVXFCLFVBQVVyQixVQUFVLFFBQVFBOzs7QUFJMUMsQUFBTyxJQUFJZSwwQ0FBaUIsd0JBQVNmLFVBQVVDLE9BQU87QUFDcEQsSUFBSTJDLDBDQUE4QjVDLGFBQWFDLFVBQVUsTUFBTTtBQUM3REEsUUFBUSxLQUFLQTtBQUNiLElBQUkseUJBQWE0RCxLQUFLNUQsVUFBVSxDQUFDLDBCQUFjNEQsS0FBSzVELFVBQVUsQ0FBQyx3QkFBWTRELEtBQUs1RCxRQUFRO0FBQ3RGQSxTQUFTRCxhQUFhLGdCQUFnQixPQUFPOzs7QUFHakQsT0FBT0M7O0FBR1QsQUFBTyxJQUFJNkQsc0JBQU8sY0FBU0MsT0FBTztBQUNoQyxJQUFJQyxPQUFPMUQsR0FBRzJELEtBQUtDLE1BQU1DO0FBQ3pCLElBQUlKLE1BQU1mLFNBQVMsR0FBRztBQUNwQixPQUFPZTtPQUNGO0FBQ0xJLFFBQVFKLE1BQU07QUFDZEcsT0FBTztBQUNQRixRQUFRO0FBQ1JDLE1BQU1GLE1BQU1mO0FBQ1oxQyxJQUFJO0FBQ0osT0FBTyxFQUFFQSxNQUFNMkQsS0FBSztBQUNsQixJQUFJRixNQUFNekQsTUFBTTZELE9BQU87QUFDckJELEtBQUtFLEtBQUtMLE1BQU16RDtPQUNYO0FBQ0wwRCxNQUFNSSxLQUFLTCxNQUFNekQ7OztBQUdyQixPQUFPd0QsS0FBS0ksTUFBTUcsT0FBT0YsT0FBT0wsS0FBS0U7OztBQUl6QyxBQUFPLElBQUlsQyxzQkFBTyxjQUFTcUIsUUFBUTtBQUNqQyxJQUFJbUIsS0FBS2hFLEdBQUcwQztBQUNac0IsTUFBTTtBQUNOaEUsSUFBSSxDQUFDO0FBQ0wwQyxTQUFTRyxPQUFPSDtBQUNoQixPQUFPLEVBQUUxQyxNQUFNNkMsT0FBT0gsUUFBUTtBQUM1QnNCLE1BQU0sQ0FBQyxDQUFDQSxPQUFPLEtBQUtBLE9BQU9uQixPQUFPb0IsV0FBV2pFO0FBQzdDZ0UsT0FBTzs7QUFFVCxPQUFPLE1BQU0sQ0FBQ0EsTUFBTSxJQUFJQSxNQUFNLENBQUMsSUFBSUE7O0FBR3JDLEFBQU8sSUFBSS9DLHNDQUFlLHNCQUFTSSxNQUFNekIsV0FBVztBQUNsRCxJQUFJeUQsR0FBR0MsTUFBTVksUUFBUUMsTUFBTXpFLFVBQVUwRSxPQUFPekU7QUFDNUN1RSxTQUFTO0FBQ1RFLFFBQVFaLEtBQUthLE9BQU9DLEtBQUtqRDtBQUN6QixLQUFLZ0MsS0FBSSxHQUFHQyxPQUFPYyxNQUFNMUIsU0FBUVcsSUFBSUMsTUFBTUQsS0FBSztBQUM5Q2MsT0FBT0MsTUFBTWY7QUFDYixJQUFJLE9BQU9oQyxLQUFLOEMsVUFBVSxZQUFZLE9BQU85QyxLQUFLOEMsVUFBVSxVQUFVO0FBQ3BFekUsV0FBV1Usa0JBQWtCK0Q7QUFDN0J4RSxRQUFRYyxlQUFlZixVQUFVMkIsS0FBSzhDO0FBQ3RDLElBQUl2RSxXQUFXO0FBQ2JELFNBQVM7O0FBRVh1RSxhQUFheEUsWUFBWUM7OztBQUc3QixPQUFPdUU7O0FBR1QsQUFBTyxJQUFJSyxnREFBb0JDLGNBQWNILE9BQU9JLE9BQU87QUFFM0QsQUFBTyxJQUFJdEQsb0NBQWMscUJBQVNFLE1BQU1xRCxjQUFjcEQsT0FBTztBQUMzRCxJQUFJcUQsUUFBUUM7QUFDWixJQUFJLENBQUMsQ0FBQ0QsU0FBU0gsWUFBWWxELFNBQVM7QUFDbENzRCxVQUFVeEMsU0FBU0MsY0FBYztBQUNqQ3VDLFFBQVFDLGdCQUFnQnZELFNBQVM7QUFDakNjLFNBQVMwQyxLQUFLQyxZQUFZSDtBQUMxQkosWUFBWWxELFNBQVNxRCxTQUFTO0FBQzVCSyxJQUFJSjtBQUNKSyxTQUFTO0FBQ1RDLE9BQU9iLE9BQU9JLE9BQU87OztBQUd6QixJQUFJLENBQUNFLE9BQU9PLE1BQU03RCxPQUFPO0FBQ3ZCc0QsT0FBT08sTUFBTTdELFFBQVFxRCxnQkFBZ0I7QUFDckNDLE9BQU9LLEdBQUdHLGNBQWNSLE9BQU9NLFdBQVc1RDs7O0FBSTlDLEFBQU8sSUFBSUssOENBQW1CLDBCQUFTSixPQUFPO0FBQzVDLElBQUlxRCxRQUFRdEIsR0FBRytCLEtBQUtkLE1BQU1oQjtBQUMxQixJQUFJcUIsU0FBU0gsWUFBWWxELFFBQVE7QUFDL0IsSUFBSSxDQUFDcUQsT0FBT00sU0FBUztBQUNuQjs7QUFFRk4sT0FBT0ssR0FBR0csY0FBY1IsT0FBT00sVUFBVTtBQUN6Q1gsT0FBT0QsT0FBT0MsS0FBS0ssT0FBT087QUFDMUIsS0FBSzdCLEtBQUksR0FBR0MsT0FBT2dCLEtBQUs1QixTQUFRVyxJQUFJQyxNQUFNRCxLQUFLO0FBQzdDK0IsTUFBTWQsS0FBS2pCO0FBQ1hzQixPQUFPTyxNQUFNRSxPQUFPOzs7Ozs7O0FDbkoxQixBQUFPLElBQUlDLHdDQUFnQjtBQUUzQixBQUFPLElBQUlDLHNDQUFlO0FBRTFCLEFBQU8sSUFBSUMsb0NBQWM7QUFFekIsQUFBTyxJQUFJQyxvQ0FBYztBQUV6QixBQUFPLElBQUlDLGdDQUFZO0FBRXZCLEFBQU8sSUFBSUMsZ0RBQW9CLENBQUMsVUFBVSxPQUFPLE1BQU07QUFFdkQsQUFBTyxJQUFJQyxvREFBc0IsQ0FBQyx5QkFBeUIseUJBQXlCLGNBQWMsZ0JBQWdCLG9CQUFvQixNQUFNLE1BQU0sYUFBYSxtQkFBbUIsZ0JBQWdCLFVBQVUsZUFBZSxlQUFlLGlCQUFpQixjQUFjLG1CQUFtQixhQUFhLGNBQWMsYUFBYSxrQkFBa0IsaUJBQWlCLGVBQWUsZ0JBQWdCLHFCQUFxQixnQkFBZ0IsZUFBZSxTQUFTLGdCQUFnQixPQUFPLFVBQVUsUUFBUSxTQUFTLEtBQUs7QUFFMWYsQUFBTyxJQUFJQyw0Q0FBa0IsQ0FBQyxVQUFVLFdBQVcsVUFBVTtBQUU3RCxBQUFPLElBQUlDLGtDQUFhLENBQUMsT0FBTyxVQUFVLFFBQVE7QUF5Q2xERCxnQkFBZ0JFLFFBQVEsVUFBQ3BHLFVBQUQ7QUFDdkJxRztvQkFBb0JqQyxLQUFLcEU7QUFDekJNOztBQUNDMkYsb0JBQW9CN0IsS0FBS3BFLFdBQVMsTUFBSXFHIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGhlbHBlcnMgZnJvbSAnLi9oZWxwZXJzJ1xuaW1wb3J0IHtJTVBPUlRBTlR9IGZyb20gJy4vY29uc3RhbnRzJ1xuXG5xdWlja2NzcyA9ICh0YXJnZXRFbCwgcHJvcGVydHksIHZhbHVlLCBpbXBvcnRhbnQpLT5cblx0c3dpdGNoXG5cdFx0d2hlbiBoZWxwZXJzLmlzSXRlcmFibGUodGFyZ2V0RWwpXG5cdFx0XHRxdWlja2NzcyhzdWJFbCwgcHJvcGVydHksIHZhbHVlKSBmb3Igc3ViRWwgaW4gdGFyZ2V0RWxcblx0XG5cdFx0d2hlbiB0eXBlb2YgcHJvcGVydHkgaXMgJ29iamVjdCcgIyBQYXNzZWQgYSBzdHlsZSBtYXBcblx0XHRcdHF1aWNrY3NzKHRhcmdldEVsLCBzdWJQcm9wZXJ0eSwgc3ViVmFsdWUpIGZvciBzdWJQcm9wZXJ0eSxzdWJWYWx1ZSBvZiBwcm9wZXJ0eVxuXHRcblx0XHRlbHNlXG5cdFx0XHRwcm9wZXJ0eSA9IGhlbHBlcnMubm9ybWFsaXplUHJvcGVydHkocHJvcGVydHkpXG5cdFx0XHRpZiB0eXBlb2YgdmFsdWUgaXMgJ3VuZGVmaW5lZCdcblx0XHRcdFx0Y29tcHV0ZWRTdHlsZSA9IHRhcmdldEVsLl9jb21wdXRlZFN0eWxlIHx8PSBnZXRDb21wdXRlZFN0eWxlKHRhcmdldEVsKVxuXHRcdFx0XHRyZXR1cm4gY29tcHV0ZWRTdHlsZVtwcm9wZXJ0eV1cblx0XHRcdFxuXHRcdFx0ZWxzZSBpZiBwcm9wZXJ0eVxuXHRcdFx0XHR0YXJnZXRFbC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eSwgaGVscGVycy5ub3JtYWxpemVWYWx1ZShwcm9wZXJ0eSwgdmFsdWUpLCBJTVBPUlRBTlQgaWYgaW1wb3J0YW50KVxuXG5cdHJldHVyblxuXG5cbnF1aWNrY3NzLmFuaW1hdGlvbiA9IChuYW1lLCBmcmFtZXMpLT4gaWYgbmFtZSBhbmQgdHlwZW9mIG5hbWUgaXMgJ3N0cmluZycgYW5kIGZyYW1lcyBhbmQgdHlwZW9mIGZyYW1lcyBpcyAnb2JqZWN0J1xuXHRwcmVmaXggPSBoZWxwZXJzLmdldFByZWZpeCgnYW5pbWF0aW9uJylcblx0Z2VuZXJhdGVkID0gJydcblx0XG5cdGZvciBmcmFtZSxydWxlcyBvZiBmcmFtZXNcblx0XHRnZW5lcmF0ZWQgKz0gXCIje2ZyYW1lfSB7I3toZWxwZXJzLnJ1bGVUb1N0cmluZyhydWxlcyl9fVwiXG5cblx0Z2VuZXJhdGVkID0gXCJAI3twcmVmaXh9a2V5ZnJhbWVzICN7bmFtZX0geyN7Z2VuZXJhdGVkfX1cIlxuXHRoZWxwZXJzLmlubGluZVN0eWxlKGdlbmVyYXRlZCwgdHJ1ZSwgMClcblxuXG5xdWlja2Nzcy5yZWdpc3RlciA9IChydWxlLCBsZXZlbCwgaW1wb3J0YW50KS0+IGlmIHJ1bGUgYW5kIHR5cGVvZiBydWxlIGlzICdvYmplY3QnXG5cdGxldmVsIHx8PSAwXG5cdHJ1bGUgPSBoZWxwZXJzLnJ1bGVUb1N0cmluZyhydWxlLCBpbXBvcnRhbnQpXG5cblx0dW5sZXNzIGNsYXNzTmFtZSA9IGhlbHBlcnMuaW5saW5lU3R5bGVDb25maWdbbGV2ZWxdP1tydWxlXVxuXHRcdGNsYXNzTmFtZSA9IGhlbHBlcnMuaGFzaChydWxlKVxuXHRcdHN0eWxlID0gXCIuI3tjbGFzc05hbWV9IHsje3J1bGV9fVwiXG5cdFx0aGVscGVycy5pbmxpbmVTdHlsZShzdHlsZSwgY2xhc3NOYW1lLCBsZXZlbClcblxuXHRyZXR1cm4gY2xhc3NOYW1lXG5cblxucXVpY2tjc3MuY2xlYXJSZWdpc3RlcmVkID0gKGxldmVsKS0+XG5cdGhlbHBlcnMuY2xlYXJJbmxpbmVTdHlsZShsZXZlbCBvciAwKVxuXG5cbiMjIyBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAjIyNcbnF1aWNrY3NzLlVOU0VUID0gc3dpdGNoXG5cdHdoZW4gaGVscGVycy5pc1ZhbHVlU3VwcG9ydGVkKCdkaXNwbGF5JywndW5zZXQnKSB0aGVuICd1bnNldCdcblx0d2hlbiBoZWxwZXJzLmlzVmFsdWVTdXBwb3J0ZWQoJ2Rpc3BsYXknLCdpbml0aWFsJykgdGhlbiAnaW5pdGlhbCdcblx0d2hlbiBoZWxwZXJzLmlzVmFsdWVTdXBwb3J0ZWQoJ2Rpc3BsYXknLCdpbmhlcml0JykgdGhlbiAnaW5oZXJpdCdcblxucXVpY2tjc3Muc3VwcG9ydHMgPSBoZWxwZXJzLmlzVmFsdWVTdXBwb3J0ZWRcbnF1aWNrY3NzLnN1cHBvcnRzUHJvcGVydHkgPSBoZWxwZXJzLmlzUHJvcFN1cHBvcnRlZFxucXVpY2tjc3Mubm9ybWFsaXplUHJvcGVydHkgPSBoZWxwZXJzLm5vcm1hbGl6ZVByb3BlcnR5XG5xdWlja2Nzcy5ub3JtYWxpemVWYWx1ZSA9IGhlbHBlcnMubm9ybWFsaXplVmFsdWVcbnF1aWNrY3NzLnZlcnNpb24gPSBpbXBvcnQgJy4uL3BhY2thZ2UuanNvbiAkIHZlcnNpb24nXG5cblxubW9kdWxlLmV4cG9ydHMgPSBxdWlja2NzcyIsIntcbiAgXCJuYW1lXCI6IFwicXVpY2tjc3NcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMS40LjFcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIuKaoe+4jy1mYXN0IHRpbnkgQ1NTIG1hbmFnZW1lbnQgdG9vbCBzcHJpbmtsZWQgd2l0aCBBUEkgc3VnYXJcIixcbiAgXCJtYWluXCI6IFwiZGlzdC9xdWlja2Nzcy5qc1wiLFxuICBcImJyb3dzZXJcIjoge1xuICAgIFwiLi9kZWJ1Z1wiOiBcImRpc3QvcXVpY2tjc3MuZGVidWcuanNcIixcbiAgICBcIi4vZGlzdC9xdWlja2Nzcy5qc1wiOiBcInNyYy9pbmRleC5jb2ZmZWVcIlxuICB9LFxuICBcImJyb3dzZXJpZnlcIjoge1xuICAgIFwidHJhbnNmb3JtXCI6IFtcbiAgICAgIFwic2ltcGx5aW1wb3J0L2NvbXBhdFwiXG4gICAgXVxuICB9LFxuICBcInNpbXBseWltcG9ydFwiOiB7XG4gICAgXCJmaW5hbFRyYW5zZm9ybVwiOiBbXG4gICAgICBbXG4gICAgICAgIFwiYmFiZWxpZnlcIixcbiAgICAgICAge1xuICAgICAgICAgIFwicHJlc2V0c1wiOiBbXG4gICAgICAgICAgICBbXCJAYmFiZWwvcHJlc2V0LWVudlwiLCB7XCJtb2R1bGVzXCI6ZmFsc2V9XVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFwiLmNvbmZpZy90cmFuc2Zvcm1zL21pbmlmeS1zdXBlclwiLFxuICAgICAgXCIuY29uZmlnL3RyYW5zZm9ybXMvbWluaWZ5LXJlbmFtZVwiLFxuICAgICAgXCIuY29uZmlnL3RyYW5zZm9ybXMvbWluaWZ5LXNpbXBsZVwiXG4gICAgXVxuICB9LFxuICBcImRpcmVjdG9yaWVzXCI6IHtcbiAgICBcInRlc3RcIjogXCJ0ZXN0XCJcbiAgfSxcbiAgXCJmaWxlc1wiOiBbXG4gICAgXCJkaXN0XCIsXG4gICAgXCJzcmNcIlxuICBdLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwicG9zdHZlcnNpb25cIjogXCJucG0gcnVuIGJ1aWxkICYmIGdpdCBhZGQgLiAmJiBnaXQgY29tbWl0IC1hIC1tICdbQnVpbGRdJ1wiLFxuICAgIFwicHJlcHVibGlzaE9ubHlcIjogXCJucG0gcnVuIHRlc3Q6dHJhdmlzXCIsXG4gICAgXCJwb3N0cHVibGlzaFwiOiBcImdpdCBwdXNoXCIsXG4gICAgXCJ3YXRjaFwiOiBcImNha2UgLWQgd2F0Y2hcIixcbiAgICBcImJ1aWxkXCI6IFwiY2FrZSAtZCBidWlsZCAmJiBjYWtlIGJ1aWxkICYmIGNha2UgbWVhc3VyZSAmJiBjcCAtciBidWlsZC8qIGRpc3QvXCIsXG4gICAgXCJ0ZXN0XCI6IFwibnBtIHJ1biB0ZXN0OmJyb3dzZXIgLXMgfHwgdHJ1ZVwiLFxuICAgIFwidGVzdDp0cmF2aXNcIjogXCJucG0gcnVuIHRlc3Q6YnJvd3NlciAtcyAmJiBucG0gcnVuIHRlc3Q6bWluaWZpZWQgLXNcIixcbiAgICBcInRlc3Q6bG9jYWxcIjogXCJvcGVuIHRlc3QvdGVzdHJ1bm5lci5odG1sXCIsXG4gICAgXCJ0ZXN0Om1pbmlmaWVkXCI6IFwibWluaWZpZWQ9MSBucG0gcnVuIHRlc3Q6YnJvd3NlciAtcyB8fCB0cnVlXCIsXG4gICAgXCJ0ZXN0Omthcm1hXCI6IFwiY2FrZSBpbnN0YWxsOnRlc3Q7ICAga2FybWEgc3RhcnQgLmNvbmZpZy9rYXJtYS5jb25mLmNvZmZlZVwiLFxuICAgIFwidGVzdDpicm93c2VyXCI6IFwiY2FrZSBpbnN0YWxsOnRlc3Q7IGthcm1hIHN0YXJ0IC0tc2luZ2xlLXJ1biAtLWJyb3dzZXJzIEVsZWN0cm9uIC5jb25maWcva2FybWEuY29uZi5jb2ZmZWVcIixcbiAgICBcInRlc3Q6Y2hyb21lXCI6IFwiY2FrZSBpbnN0YWxsOnRlc3Q7ICBrYXJtYSBzdGFydCAtLXNpbmdsZS1ydW4gLS1icm93c2VycyBDaHJvbWUgLmNvbmZpZy9rYXJtYS5jb25mLmNvZmZlZVwiLFxuICAgIFwidGVzdDpmaXJlZm94XCI6IFwiY2FrZSBpbnN0YWxsOnRlc3Q7IGthcm1hIHN0YXJ0IC0tc2luZ2xlLXJ1biAtLWJyb3dzZXJzIEZpcmVmb3ggLmNvbmZpZy9rYXJtYS5jb25mLmNvZmZlZVwiLFxuICAgIFwidGVzdDpzYWZhcmlcIjogXCJjYWtlIGluc3RhbGw6dGVzdDsgIGthcm1hIHN0YXJ0IC0tc2luZ2xlLXJ1biAtLWJyb3dzZXJzIFNhZmFyaSAuY29uZmlnL2thcm1hLmNvbmYuY29mZmVlXCIsXG4gICAgXCJ0ZXN0OnNhdWNlXCI6IFwiY2FrZSBpbnN0YWxsOnRlc3Q7ICAgc2F1Y2U9MSBrYXJtYSBzdGFydCAuY29uZmlnL2thcm1hLmNvbmYuY29mZmVlXCIsXG4gICAgXCJjb3ZlcmFnZVwiOiBcImNha2UgaW5zdGFsbDpjb3ZlcmFnZTsgbnBtIHJ1biBjb3ZlcmFnZTpydW4gJiYgbnBtIHJ1biBjb3ZlcmFnZTpiYWRnZVwiLFxuICAgIFwiY292ZXJhZ2U6cnVuXCI6IFwiY292ZXJhZ2U9dHJ1ZSBucG0gcnVuIHRlc3Q6ZWxlY3Ryb25cIixcbiAgICBcImNvdmVyYWdlOmJhZGdlXCI6IFwiYmFkZ2UtZ2VuIC1kIC4vLmNvbmZpZy9iYWRnZXMvY292ZXJhZ2VcIixcbiAgICBcImNvdmVyYWdlOnNob3dcIjogXCJvcGVuIGNvdmVyYWdlL2xjb3YtcmVwb3J0L2luZGV4Lmh0bWxcIlxuICB9LFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiZ2l0K2h0dHBzOi8vZ2l0aHViLmNvbS9kYW5pZWxrYWxlbi9xdWlja2Nzcy5naXRcIlxuICB9LFxuICBcImF1dGhvclwiOiBcImRhbmllbGthbGVuXCIsXG4gIFwibGljZW5zZVwiOiBcIklTQ1wiLFxuICBcImJ1Z3NcIjoge1xuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2RhbmllbGthbGVuL3F1aWNrY3NzL2lzc3Vlc1wiXG4gIH0sXG4gIFwiaG9tZXBhZ2VcIjogXCJodHRwczovL2dpdGh1Yi5jb20vZGFuaWVsa2FsZW4vcXVpY2tjc3MjcmVhZG1lXCIsXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBiYWJlbC9jb3JlXCI6IFwiXjcuMS42XCIsXG4gICAgXCJAYmFiZWwvcHJlc2V0LWVudlwiOiBcIl43LjEuNlwiLFxuICAgIFwiYmFiZWxpZnlcIjogXCJeMTAuMC4wXCIsXG4gICAgXCJibHVlYmlyZFwiOiBcIl4zLjUuMFwiLFxuICAgIFwiY2hhbGtcIjogXCJeMi4wLjFcIixcbiAgICBcImNvZmZlZS1zY3JpcHRcIjogXCJeMS4xMi42XCIsXG4gICAgXCJleGVjYVwiOiBcIl4wLjcuMFwiLFxuICAgIFwiZnMtamV0cGFja1wiOiBcIl4wLjEzLjNcIixcbiAgICBcInByb21pc2UtYnJlYWtcIjogXCJeMC4xLjFcIixcbiAgICBcInNlbXZlclwiOiBcIl41LjMuMFwiLFxuICAgIFwic2ltcGx5aW1wb3J0XCI6IFwiXjQuMC45XCIsXG4gICAgXCJzaW1wbHl3YXRjaFwiOiBcIl4zLjAuMFwiXG4gIH1cbn1cbiIsImltcG9ydCB7SU1QT1JUQU5ULCBSRUdFWF9LRUJBQiwgUkVHRVhfU1BBQ0UsIFJFR0VYX0RJR0lUUywgUkVHRVhfTEVOX1ZBTCwgUE9TU0lCTEVfUFJFRklYRVMsIFJFUVVJUkVTX1VOSVRfVkFMVUV9IGZyb20gJy4vY29uc3RhbnRzJ1xuU0FNUExFX1NUWUxFID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jykuc3R5bGVcblxuZXhwb3J0IGluY2x1ZGVzID0gKHRhcmdldCwgaXRlbSktPlxuXHR0YXJnZXQgYW5kIHRhcmdldC5pbmRleE9mKGl0ZW0pIGlzbnQgLTFcblxuZXhwb3J0IGlzSXRlcmFibGUgPSAodGFyZ2V0KS0+XG5cdHRhcmdldCBhbmRcblx0dHlwZW9mIHRhcmdldCBpcyAnb2JqZWN0JyBhbmRcblx0dHlwZW9mIHRhcmdldC5sZW5ndGggaXMgJ251bWJlcicgYW5kXG5cdG5vdCB0YXJnZXQubm9kZVR5cGVcblxuZXhwb3J0IHRvS2ViYWJDYXNlID0gKHN0cmluZyktPlxuXHRzdHJpbmcucmVwbGFjZSBSRUdFWF9LRUJBQiwgKGUsbGV0dGVyKS0+IFwiLSN7bGV0dGVyLnRvTG93ZXJDYXNlKCl9XCJcblxuZXhwb3J0IGlzUHJvcFN1cHBvcnRlZCA9IChwcm9wZXJ0eSktPlxuXHR0eXBlb2YgU0FNUExFX1NUWUxFW3Byb3BlcnR5XSBpc250ICd1bmRlZmluZWQnXG5cbmV4cG9ydCBpc1ZhbHVlU3VwcG9ydGVkID0gKHByb3BlcnR5LCB2YWx1ZSktPlxuXHRpZiB3aW5kb3cuQ1NTIGFuZCB3aW5kb3cuQ1NTLnN1cHBvcnRzXG5cdFx0cmV0dXJuIHdpbmRvdy5DU1Muc3VwcG9ydHMocHJvcGVydHksIHZhbHVlKVxuXHRlbHNlXG5cdFx0U0FNUExFX1NUWUxFW3Byb3BlcnR5XSA9IHZhbHVlXG5cdFx0cmV0dXJuIFNBTVBMRV9TVFlMRVtwcm9wZXJ0eV0gaXMgJycrdmFsdWVcblxuZXhwb3J0IGdldFByZWZpeCA9IChwcm9wZXJ0eSwgc2tpcEluaXRpYWxDaGVjayktPlxuXHRpZiBza2lwSW5pdGlhbENoZWNrIG9yIG5vdCBpc1Byb3BTdXBwb3J0ZWQocHJvcGVydHkpXG5cdFx0Zm9yIHByZWZpeCBpbiBQT1NTSUJMRV9QUkVGSVhFU1xuXHRcdFx0IyMjIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICMjI1xuXHRcdFx0cmV0dXJuIFwiLSN7cHJlZml4fS1cIiBpZiBpc1Byb3BTdXBwb3J0ZWQoXCItI3twcmVmaXh9LSN7cHJvcGVydHl9XCIpXG5cdFxuXHRyZXR1cm4gJydcblxuZXhwb3J0IG5vcm1hbGl6ZVByb3BlcnR5ID0gKHByb3BlcnR5KS0+XHRcblx0cHJvcGVydHkgPSB0b0tlYmFiQ2FzZShwcm9wZXJ0eSlcblx0XG5cdGlmIGlzUHJvcFN1cHBvcnRlZChwcm9wZXJ0eSlcblx0XHRyZXR1cm4gcHJvcGVydHlcblx0ZWxzZVxuXHRcdHJldHVybiBcIiN7Z2V0UHJlZml4KHByb3BlcnR5LHRydWUpfSN7cHJvcGVydHl9XCJcblxuZXhwb3J0IG5vcm1hbGl6ZVZhbHVlID0gKHByb3BlcnR5LCB2YWx1ZSktPlxuXHRpZiBpbmNsdWRlcyhSRVFVSVJFU19VTklUX1ZBTFVFLCBwcm9wZXJ0eSkgYW5kIHZhbHVlIGlzbnQgbnVsbFxuXHRcdHZhbHVlID0gJycrdmFsdWVcblx0XHRpZiAgUkVHRVhfRElHSVRTLnRlc3QodmFsdWUpIGFuZFxuXHRcdFx0bm90IFJFR0VYX0xFTl9WQUwudGVzdCh2YWx1ZSkgYW5kXG5cdFx0XHRub3QgUkVHRVhfU1BBQ0UudGVzdCh2YWx1ZSlcblx0XHRcdFx0dmFsdWUgKz0gaWYgcHJvcGVydHkgaXMgJ2xpbmUtaGVpZ2h0JyB0aGVuICdlbScgZWxzZSAncHgnXG5cblx0cmV0dXJuIHZhbHVlXG5cblxuZXhwb3J0IHNvcnQgPSAoYXJyYXkpLT5cblx0aWYgYXJyYXkubGVuZ3RoIDwgMlxuXHRcdHJldHVybiBhcnJheVxuXHRlbHNlXG5cdFx0cGl2b3QgPSBhcnJheVswXTsgbGVzcyA9IFtdOyBncmVhdCA9IFtdOyBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPSAwO1xuXHRcdFxuXHRcdHdoaWxlICsraSBpc250IGxlblxuXHRcdFx0aWYgYXJyYXlbaV0gPD0gcGl2b3Rcblx0XHRcdFx0bGVzcy5wdXNoKGFycmF5W2ldKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRncmVhdC5wdXNoKGFycmF5W2ldKVxuXG5cdFx0cmV0dXJuIHNvcnQobGVzcykuY29uY2F0KHBpdm90LCBzb3J0KGdyZWF0KSlcblxuXG5leHBvcnQgaGFzaCA9IChzdHJpbmcpLT5cblx0aHNoID0gNTM4MTsgaSA9IC0xOyBsZW5ndGggPSBzdHJpbmcubGVuZ3RoXG5cdFxuXHR3aGlsZSArK2kgaXNudCBzdHJpbmcubGVuZ3RoXG5cdFx0aHNoID0gKChoc2ggPDwgNSkgLSBoc2gpICsgc3RyaW5nLmNoYXJDb2RlQXQoaSlcblx0XHRoc2ggfD0gMFxuXG5cdHJldHVybiAnXycrKGlmIGhzaCA8IDAgdGhlbiBoc2ggKiAtMiBlbHNlIGhzaClcblxuXG5leHBvcnQgcnVsZVRvU3RyaW5nID0gKHJ1bGUsIGltcG9ydGFudCktPlxuXHRvdXRwdXQgPSAnJ1xuXHRwcm9wcyA9IHNvcnQoT2JqZWN0LmtleXMocnVsZSkpXG5cdFxuXHRmb3IgcHJvcCBpbiBwcm9wc1xuXHRcdGlmIHR5cGVvZiBydWxlW3Byb3BdIGlzICdzdHJpbmcnIG9yIHR5cGVvZiBydWxlW3Byb3BdIGlzICdudW1iZXInXG5cdFx0XHRwcm9wZXJ0eSA9IG5vcm1hbGl6ZVByb3BlcnR5KHByb3ApXG5cdFx0XHR2YWx1ZSA9IG5vcm1hbGl6ZVZhbHVlKHByb3BlcnR5LCBydWxlW3Byb3BdKVxuXHRcdFx0dmFsdWUgKz0gXCIgIWltcG9ydGFudFwiIGlmIGltcG9ydGFudFxuXHRcdFx0b3V0cHV0ICs9IFwiI3twcm9wZXJ0eX06I3t2YWx1ZX07XCJcblx0XG5cdHJldHVybiBvdXRwdXRcblxuZXhwb3J0IGlubGluZVN0eWxlQ29uZmlnID0gc3R5bGVDb25maWcgPSBPYmplY3QuY3JlYXRlKG51bGwpXG5leHBvcnQgaW5saW5lU3R5bGUgPSAocnVsZSwgdmFsdWVUb1N0b3JlLCBsZXZlbCktPlxuXHRpZiBub3QgY29uZmlnPXN0eWxlQ29uZmlnW2xldmVsXVxuXHRcdHN0eWxlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG5cdFx0c3R5bGVFbC5pZCA9IFwicXVpY2tjc3Mje2xldmVsIG9yICcnfVwiXG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsKVxuXHRcdHN0eWxlQ29uZmlnW2xldmVsXSA9IGNvbmZpZyA9IGVsOnN0eWxlRWwsIGNvbnRlbnQ6JycsIGNhY2hlOk9iamVjdC5jcmVhdGUobnVsbClcblx0XG5cdHVubGVzcyBjb25maWcuY2FjaGVbcnVsZV1cblx0XHRjb25maWcuY2FjaGVbcnVsZV0gPSB2YWx1ZVRvU3RvcmUgb3IgdHJ1ZVxuXHRcdGNvbmZpZy5lbC50ZXh0Q29udGVudCA9IGNvbmZpZy5jb250ZW50ICs9IHJ1bGVcblx0XG5cdHJldHVyblxuXG5cbmV4cG9ydCBjbGVhcklubGluZVN0eWxlID0gKGxldmVsKS0+IGlmIGNvbmZpZyA9IHN0eWxlQ29uZmlnW2xldmVsXVxuXHRyZXR1cm4gaWYgbm90IGNvbmZpZy5jb250ZW50XG5cdGNvbmZpZy5lbC50ZXh0Q29udGVudCA9IGNvbmZpZy5jb250ZW50ID0gJydcblx0a2V5cyA9IE9iamVjdC5rZXlzKGNvbmZpZy5jYWNoZSlcblx0Y29uZmlnLmNhY2hlW2tleV0gPSBudWxsIGZvciBrZXkgaW4ga2V5c1xuXHRyZXR1cm5cblxuXG5cblxuXG4iLCJleHBvcnQgUkVHRVhfTEVOX1ZBTCA9IC9eXFxkKyg/OlthLXpdfFxcJSkrJC9pXG5leHBvcnQgUkVHRVhfRElHSVRTID0gL1xcZCskL1xuZXhwb3J0IFJFR0VYX1NQQUNFID0gL1xccy9cbmV4cG9ydCBSRUdFWF9LRUJBQiA9IC8oW0EtWl0pKy9nXG5leHBvcnQgSU1QT1JUQU5UID0gJ2ltcG9ydGFudCdcblxuZXhwb3J0IFBPU1NJQkxFX1BSRUZJWEVTID0gW1xuXHQnd2Via2l0J1xuXHQnbW96J1xuXHQnbXMnXG5cdCdvJ1xuXVxuZXhwb3J0IFJFUVVJUkVTX1VOSVRfVkFMVUUgPSBbXG5cdCdiYWNrZ3JvdW5kLXBvc2l0aW9uLXgnXG5cdCdiYWNrZ3JvdW5kLXBvc2l0aW9uLXknXG5cdCdibG9jay1zaXplJ1xuXHQnYm9yZGVyLXdpZHRoJ1xuXHQnY29sdW1uUnVsZS13aWR0aCdcblx0J2N4J1xuXHQnY3knXG5cdCdmb250LXNpemUnXG5cdCdncmlkLWNvbHVtbi1nYXAnXG5cdCdncmlkLXJvdy1nYXAnXG5cdCdoZWlnaHQnXG5cdCdpbmxpbmUtc2l6ZSdcblx0J2xpbmUtaGVpZ2h0J1xuXHQnbWluQmxvY2stc2l6ZSdcblx0J21pbi1oZWlnaHQnXG5cdCdtaW4taW5saW5lLXNpemUnXG5cdCdtaW4td2lkdGgnXG5cdCdtYXgtaGVpZ2h0J1xuXHQnbWF4LXdpZHRoJ1xuXHQnb3V0bGluZS1vZmZzZXQnXG5cdCdvdXRsaW5lLXdpZHRoJ1xuXHQncGVyc3BlY3RpdmUnXG5cdCdzaGFwZS1tYXJnaW4nXG5cdCdzdHJva2UtZGFzaG9mZnNldCdcblx0J3N0cm9rZS13aWR0aCdcblx0J3RleHQtaW5kZW50J1xuXHQnd2lkdGgnXG5cdCd3b3JkLXNwYWNpbmcnXG5cdCd0b3AnXG5cdCdib3R0b20nXG5cdCdsZWZ0J1xuXHQncmlnaHQnXG5cdCd4J1xuXHQneSdcbl1cblxuZXhwb3J0IFFVQURfU0hPUlRIQU5EUyA9IFtcblx0J21hcmdpbidcblx0J3BhZGRpbmcnXG5cdCdib3JkZXInXG5cdCdib3JkZXItcmFkaXVzJ1xuXVxuZXhwb3J0IERJUkVDVElPTlMgPSBbJ3RvcCcsJ2JvdHRvbScsJ2xlZnQnLCdyaWdodCddXG5cblFVQURfU0hPUlRIQU5EUy5mb3JFYWNoIChwcm9wZXJ0eSktPlxuXHRSRVFVSVJFU19VTklUX1ZBTFVFLnB1c2ggcHJvcGVydHlcblx0Zm9yIGRpcmVjdGlvbiBpbiBESVJFQ1RJT05TXG5cdFx0UkVRVUlSRVNfVU5JVF9WQUxVRS5wdXNoIHByb3BlcnR5KyctJytkaXJlY3Rpb25cblx0cmV0dXJuXG5cblxuXG5cblxuIl19