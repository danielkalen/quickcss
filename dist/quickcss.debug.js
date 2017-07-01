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
var QuickCss;

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uc3RhbnRzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLGlCQUFBLEdBQW9CLENBQUMsUUFBRCxFQUFVLEtBQVYsRUFBZ0IsSUFBaEIsRUFBcUIsR0FBckI7O0FBQ3BCLG1CQUFBLEdBQXNCLENBQ3JCLHFCQURxQixFQUVyQixxQkFGcUIsRUFHckIsV0FIcUIsRUFJckIsYUFKcUIsRUFLckIsaUJBTHFCLEVBTXJCLElBTnFCLEVBT3JCLElBUHFCLEVBUXJCLFVBUnFCLEVBU3JCLGVBVHFCLEVBVXJCLFlBVnFCLEVBV3JCLFFBWHFCLEVBWXJCLFlBWnFCLEVBYXJCLFlBYnFCLEVBY3JCLGNBZHFCLEVBZXJCLFdBZnFCLEVBZ0JyQixlQWhCcUIsRUFpQnJCLFVBakJxQixFQWtCckIsV0FsQnFCLEVBbUJyQixVQW5CcUIsRUFvQnJCLGVBcEJxQixFQXFCckIsY0FyQnFCLEVBc0JyQixhQXRCcUIsRUF1QnJCLGFBdkJxQixFQXdCckIsa0JBeEJxQixFQXlCckIsYUF6QnFCLEVBMEJyQixZQTFCcUIsRUEyQnJCLE9BM0JxQixFQTRCckIsYUE1QnFCLEVBNkJyQixLQTdCcUIsRUE4QnJCLFFBOUJxQixFQStCckIsTUEvQnFCLEVBZ0NyQixPQWhDcUIsRUFpQ3JCLEdBakNxQixFQWtDckIsR0FsQ3FCOztBQXFDdEIsZUFBQSxHQUFrQixDQUNqQixRQURpQixFQUVqQixTQUZpQixFQUdqQixRQUhpQixFQUlqQixjQUppQjs7QUFNbEIsZUFBZSxDQUFDLE9BQWhCLENBQXdCLFNBQUMsUUFBRDtBQUN2QixNQUFBO0VBQUEsbUJBQW1CLENBQUMsSUFBcEIsQ0FBeUIsUUFBekI7QUFDQTtBQUFBO09BQUEscUNBQUE7O2lCQUNDLG1CQUFtQixDQUFDLElBQXBCLENBQXlCLFFBQUEsR0FBUyxTQUFsQztBQUREOztBQUZ1QixDQUF4QiIsInNvdXJjZXNDb250ZW50IjpbIlBPU1NJQkxFX1BSRUZJWEVTID0gWyd3ZWJraXQnLCdtb3onLCdtcycsJ28nXVxuUkVRVUlSRVNfVU5JVF9WQUxVRSA9IFtcblx0J2JhY2tncm91bmRQb3NpdGlvblgnXG5cdCdiYWNrZ3JvdW5kUG9zaXRpb25ZJ1xuXHQnYmxvY2tTaXplJ1xuXHQnYm9yZGVyV2lkdGgnXG5cdCdjb2x1bW5SdWxlV2lkdGgnXG5cdCdjeCdcblx0J2N5J1xuXHQnZm9udFNpemUnXG5cdCdncmlkQ29sdW1uR2FwJ1xuXHQnZ3JpZFJvd0dhcCdcblx0J2hlaWdodCdcblx0J2lubGluZVNpemUnXG5cdCdsaW5lSGVpZ2h0J1xuXHQnbWluQmxvY2tTaXplJ1xuXHQnbWluSGVpZ2h0J1xuXHQnbWluSW5saW5lU2l6ZSdcblx0J21pbldpZHRoJ1xuXHQnbWF4SGVpZ2h0J1xuXHQnbWF4V2lkdGgnXG5cdCdvdXRsaW5lT2Zmc2V0J1xuXHQnb3V0bGluZVdpZHRoJ1xuXHQncGVyc3BlY3RpdmUnXG5cdCdzaGFwZU1hcmdpbidcblx0J3N0cm9rZURhc2hvZmZzZXQnXG5cdCdzdHJva2VXaWR0aCdcblx0J3RleHRJbmRlbnQnXG5cdCd3aWR0aCdcblx0J3dvcmRTcGFjaW5nJ1xuXHQndG9wJ1xuXHQnYm90dG9tJ1xuXHQnbGVmdCdcblx0J3JpZ2h0J1xuXHQneCdcblx0J3knXG5dXG5cblFVQURfU0hPUlRIQU5EUyA9IFtcblx0J21hcmdpbidcblx0J3BhZGRpbmcnXG5cdCdib3JkZXInXG5cdCdib3JkZXJSYWRpdXMnXG5dXG5RVUFEX1NIT1JUSEFORFMuZm9yRWFjaCAocHJvcGVydHkpLT5cblx0UkVRVUlSRVNfVU5JVF9WQUxVRS5wdXNoIHByb3BlcnR5XG5cdGZvciBkaXJlY3Rpb24gaW4gWydUb3AnLCdCb3R0b20nLCdMZWZ0JywnUmlnaHQnXVxuXHRcdFJFUVVJUkVTX1VOSVRfVkFMVUUucHVzaCBwcm9wZXJ0eStkaXJlY3Rpb24iXX0=
;

var helpers, regEx, sampleDiv, sampleStyle;

sampleDiv = document.createElement('div');

sampleStyle = sampleDiv.style;

regEx = {
  lengthValue: /^\d+(?:[a-z]|\%)+$/i,
  digits: /\d+$/,
  whitespace: /\s/
};

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

helpers.toTitleCase = function(string) {
  return string[0].toUpperCase() + string.slice(1);
};

helpers.normalizeProperty = function(property) {
  var i, len, prefix, propertyPrefixed, propertyTitled;
  if (this.isPropSupported(property)) {
    return property;
  } else {
    propertyTitled = this.toTitleCase(property);
    for (i = 0, len = POSSIBLE_PREFIXES.length; i < len; i++) {
      prefix = POSSIBLE_PREFIXES[i];
      propertyPrefixed = "" + prefix + propertyTitled;

      /* istanbul ignore next */
      if (this.isPropSupported(propertyPrefixed)) {
        return propertyPrefixed;
      }
    }
  }
};

helpers.normalizeValue = function(property, value) {
  if (this.includes(REQUIRES_UNIT_VALUE, property) && value !== null) {
    value = '' + value;
    if (regEx.digits.test(value) && !regEx.lengthValue.test(value) && !regEx.whitespace.test(value)) {
      value += 'px';
    }
  }
  return value;
};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhlbHBlcnMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsU0FBQSxHQUFZLFFBQVEsQ0FBQyxhQUFULENBQXVCLEtBQXZCOztBQUNaLFdBQUEsR0FBYyxTQUFTLENBQUM7O0FBQ3hCLEtBQUEsR0FDQztFQUFBLFdBQUEsRUFBYSxxQkFBYjtFQUNBLE1BQUEsRUFBUSxNQURSO0VBRUEsVUFBQSxFQUFZLElBRlo7OztBQUlELE9BQUEsR0FBVTs7QUFFVixPQUFPLENBQUMsUUFBUixHQUFtQixTQUFDLE1BQUQsRUFBUyxJQUFUO1NBQ2xCLE1BQUEsSUFBVyxNQUFNLENBQUMsT0FBUCxDQUFlLElBQWYsQ0FBQSxLQUEwQixDQUFDO0FBRHBCOztBQUduQixPQUFPLENBQUMsVUFBUixHQUFxQixTQUFDLE1BQUQ7U0FDcEIsTUFBQSxJQUNBLE9BQU8sTUFBUCxLQUFpQixRQURqQixJQUVBLE9BQU8sTUFBTSxDQUFDLE1BQWQsS0FBd0IsUUFGeEIsSUFHQSxDQUFJLE1BQU0sQ0FBQztBQUpTOztBQU1yQixPQUFPLENBQUMsZUFBUixHQUEwQixTQUFDLFFBQUQ7U0FDekIsT0FBTyxXQUFZLENBQUEsUUFBQSxDQUFuQixLQUFrQztBQURUOztBQUcxQixPQUFPLENBQUMsV0FBUixHQUFzQixTQUFDLE1BQUQ7U0FDckIsTUFBTyxDQUFBLENBQUEsQ0FBRSxDQUFDLFdBQVYsQ0FBQSxDQUFBLEdBQXdCLE1BQU0sQ0FBQyxLQUFQLENBQWEsQ0FBYjtBQURIOztBQUd0QixPQUFPLENBQUMsaUJBQVIsR0FBNEIsU0FBQyxRQUFEO0FBQzNCLE1BQUE7RUFBQSxJQUFHLElBQUMsQ0FBQSxlQUFELENBQWlCLFFBQWpCLENBQUg7QUFDQyxXQUFPLFNBRFI7R0FBQSxNQUFBO0lBR0MsY0FBQSxHQUFpQixJQUFDLENBQUEsV0FBRCxDQUFhLFFBQWI7QUFFakIsU0FBQSxtREFBQTs7TUFDQyxnQkFBQSxHQUFtQixFQUFBLEdBQUcsTUFBSCxHQUFZOztBQUMvQjtNQUNBLElBQTJCLElBQUMsQ0FBQSxlQUFELENBQWlCLGdCQUFqQixDQUEzQjtBQUFBLGVBQU8saUJBQVA7O0FBSEQsS0FMRDs7QUFEMkI7O0FBVzVCLE9BQU8sQ0FBQyxjQUFSLEdBQXlCLFNBQUMsUUFBRCxFQUFXLEtBQVg7RUFDeEIsSUFBRyxJQUFDLENBQUEsUUFBRCxDQUFVLG1CQUFWLEVBQStCLFFBQS9CLENBQUEsSUFBNkMsS0FBQSxLQUFXLElBQTNEO0lBQ0MsS0FBQSxHQUFRLEVBQUEsR0FBRztJQUNYLElBQWlCLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBYixDQUFrQixLQUFsQixDQUFBLElBQTZCLENBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFsQixDQUF1QixLQUF2QixDQUFqQyxJQUFtRSxDQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBakIsQ0FBc0IsS0FBdEIsQ0FBeEY7TUFBQSxLQUFBLElBQVMsS0FBVDtLQUZEOztBQUlBLFNBQU87QUFMaUIiLCJzb3VyY2VzQ29udGVudCI6WyJzYW1wbGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuc2FtcGxlU3R5bGUgPSBzYW1wbGVEaXYuc3R5bGVcbnJlZ0V4ID0gXG5cdGxlbmd0aFZhbHVlOiAvXlxcZCsoPzpbYS16XXxcXCUpKyQvaVxuXHRkaWdpdHM6IC9cXGQrJC9cblx0d2hpdGVzcGFjZTogL1xccy9cblxuaGVscGVycyA9IHt9XG5cbmhlbHBlcnMuaW5jbHVkZXMgPSAodGFyZ2V0LCBpdGVtKS0+XG5cdHRhcmdldCBhbmQgdGFyZ2V0LmluZGV4T2YoaXRlbSkgaXNudCAtMVxuXG5oZWxwZXJzLmlzSXRlcmFibGUgPSAodGFyZ2V0KS0+XG5cdHRhcmdldCBhbmRcblx0dHlwZW9mIHRhcmdldCBpcyAnb2JqZWN0JyBhbmRcblx0dHlwZW9mIHRhcmdldC5sZW5ndGggaXMgJ251bWJlcicgYW5kXG5cdG5vdCB0YXJnZXQubm9kZVR5cGVcblxuaGVscGVycy5pc1Byb3BTdXBwb3J0ZWQgPSAocHJvcGVydHkpLT5cblx0dHlwZW9mIHNhbXBsZVN0eWxlW3Byb3BlcnR5XSBpc250ICd1bmRlZmluZWQnXG5cbmhlbHBlcnMudG9UaXRsZUNhc2UgPSAoc3RyaW5nKS0+XG5cdHN0cmluZ1swXS50b1VwcGVyQ2FzZSgpK3N0cmluZy5zbGljZSgxKVxuXG5oZWxwZXJzLm5vcm1hbGl6ZVByb3BlcnR5ID0gKHByb3BlcnR5KS0+XG5cdGlmIEBpc1Byb3BTdXBwb3J0ZWQocHJvcGVydHkpXG5cdFx0cmV0dXJuIHByb3BlcnR5XG5cdGVsc2Vcblx0XHRwcm9wZXJ0eVRpdGxlZCA9IEB0b1RpdGxlQ2FzZShwcm9wZXJ0eSlcblx0XHRcblx0XHRmb3IgcHJlZml4IGluIFBPU1NJQkxFX1BSRUZJWEVTXG5cdFx0XHRwcm9wZXJ0eVByZWZpeGVkID0gXCIje3ByZWZpeH0je3Byb3BlcnR5VGl0bGVkfVwiXG5cdFx0XHQjIyMgaXN0YW5idWwgaWdub3JlIG5leHQgIyMjXG5cdFx0XHRyZXR1cm4gcHJvcGVydHlQcmVmaXhlZCBpZiBAaXNQcm9wU3VwcG9ydGVkKHByb3BlcnR5UHJlZml4ZWQpXG5cbmhlbHBlcnMubm9ybWFsaXplVmFsdWUgPSAocHJvcGVydHksIHZhbHVlKS0+XG5cdGlmIEBpbmNsdWRlcyhSRVFVSVJFU19VTklUX1ZBTFVFLCBwcm9wZXJ0eSkgYW5kIHZhbHVlIGlzbnQgbnVsbFxuXHRcdHZhbHVlID0gJycrdmFsdWVcblx0XHR2YWx1ZSArPSAncHgnIGlmIHJlZ0V4LmRpZ2l0cy50ZXN0KHZhbHVlKSBhbmQgbm90IHJlZ0V4Lmxlbmd0aFZhbHVlLnRlc3QodmFsdWUpIGFuZCBub3QgcmVnRXgud2hpdGVzcGFjZS50ZXN0KHZhbHVlKVxuXG5cdHJldHVybiB2YWx1ZVxuXG5cblxuXG5cbiJdfQ==
;

QuickCss = function(targetEl, property, value) {
  var i, len, subEl, subProperty, subValue;
  if (helpers.isIterable(targetEl)) {
    for (i = 0, len = targetEl.length; i < len; i++) {
      subEl = targetEl[i];
      QuickCss(subEl, property, value);
    }
  } else if (typeof property === 'object') {
    for (subProperty in property) {
      subValue = property[subProperty];
      QuickCss(targetEl, subProperty, subValue);
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

QuickCss.version = "1.0.6";

module.exports = QuickCss;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpY2tjc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJxdWlja2Nzcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxJQUFBLENBQUssaUJBQUw7O0FBQ0EsSUFBQSxDQUFLLGVBQUw7O0FBRUEsUUFBQSxHQUFXLFNBQUMsUUFBRCxFQUFXLFFBQVgsRUFBcUIsS0FBckI7QUFDVixNQUFBO0VBQUEsSUFBRyxPQUFPLENBQUMsVUFBUixDQUFtQixRQUFuQixDQUFIO0FBQ0MsU0FBQSwwQ0FBQTs7TUFBQSxRQUFBLENBQVMsS0FBVCxFQUFnQixRQUFoQixFQUEwQixLQUExQjtBQUFBLEtBREQ7R0FBQSxNQUdLLElBQUcsT0FBTyxRQUFQLEtBQW1CLFFBQXRCO0FBQ0osU0FBQSx1QkFBQTs7TUFBQSxRQUFBLENBQVMsUUFBVCxFQUFtQixXQUFuQixFQUFnQyxRQUFoQztBQUFBLEtBREk7R0FBQSxNQUFBO0lBSUosUUFBQSxHQUFXLE9BQU8sQ0FBQyxpQkFBUixDQUEwQixRQUExQjtJQUNYLElBQUcsT0FBTyxLQUFQLEtBQWdCLFdBQW5CO0FBQ0MsYUFBTyxnQkFBQSxDQUFpQixRQUFqQixDQUEyQixDQUFBLFFBQUEsRUFEbkM7S0FBQSxNQUdLLElBQUcsUUFBSDtNQUNKLFFBQVEsQ0FBQyxLQUFNLENBQUEsUUFBQSxDQUFmLEdBQTJCLE9BQU8sQ0FBQyxjQUFSLENBQXVCLFFBQXZCLEVBQWlDLEtBQWpDLEVBRHZCO0tBUkQ7O0FBSks7O0FBb0JYLFFBQVEsQ0FBQyxPQUFULEdBQW1CLElBQUEsQ0FBSywyQkFBTDs7QUFDbkIsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJfJHNtKCdwYXJ0cy9jb25zdGFudHMnIClcbl8kc20oJ3BhcnRzL2hlbHBlcnMnIClcblxuUXVpY2tDc3MgPSAodGFyZ2V0RWwsIHByb3BlcnR5LCB2YWx1ZSktPlxuXHRpZiBoZWxwZXJzLmlzSXRlcmFibGUodGFyZ2V0RWwpXG5cdFx0UXVpY2tDc3Moc3ViRWwsIHByb3BlcnR5LCB2YWx1ZSkgZm9yIHN1YkVsIGluIHRhcmdldEVsXG5cdFxuXHRlbHNlIGlmIHR5cGVvZiBwcm9wZXJ0eSBpcyAnb2JqZWN0JyAjIFBhc3NlZCBhIHN0eWxlIG1hcFxuXHRcdFF1aWNrQ3NzKHRhcmdldEVsLCBzdWJQcm9wZXJ0eSwgc3ViVmFsdWUpIGZvciBzdWJQcm9wZXJ0eSxzdWJWYWx1ZSBvZiBwcm9wZXJ0eVxuXHRcblx0ZWxzZVxuXHRcdHByb3BlcnR5ID0gaGVscGVycy5ub3JtYWxpemVQcm9wZXJ0eShwcm9wZXJ0eSlcblx0XHRpZiB0eXBlb2YgdmFsdWUgaXMgJ3VuZGVmaW5lZCdcblx0XHRcdHJldHVybiBnZXRDb21wdXRlZFN0eWxlKHRhcmdldEVsKVtwcm9wZXJ0eV1cblx0XHRcblx0XHRlbHNlIGlmIHByb3BlcnR5XG5cdFx0XHR0YXJnZXRFbC5zdHlsZVtwcm9wZXJ0eV0gPSBoZWxwZXJzLm5vcm1hbGl6ZVZhbHVlKHByb3BlcnR5LCB2YWx1ZSlcblxuXHRyZXR1cm5cblxuXG5cblxuUXVpY2tDc3MudmVyc2lvbiA9IF8kc20oJy4uL3BhY2thZ2UuanNvbiAkIHZlcnNpb24nIClcbm1vZHVsZS5leHBvcnRzID0gUXVpY2tDc3MiXX0=
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
