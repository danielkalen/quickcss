(function (require, global) {
require = (function (cache, modules, cx) {
var loader = function (r) {
if (!modules[r]) throw new Error(r + ' is not a module');
return cache[r] ? cache[r].exports : ((cache[r] = {
exports: {}
}, cache[r].exports = modules[r].call(cx, require, cache[r], cache[r].exports)));
};
loader.modules = modules;
return loader;
})({}, {
0: function (require, module, exports) {
var chai, divs, expect, i, resetDivs, styles;
this.quickcss = window.quickcss;
chai = require(1);
chai.use(require(2));
mocha.setup('tdd');
mocha.slow(400);
mocha.timeout(12000);
if (!window.__karma__) {
mocha.bail();
}
expect = chai.expect;
divs = $(((function () {
var j, results;
results = [];
for (i = j = 1; j <= 3; i = ++j) {
results.push('<div />');
}
return results;
})()).join('')).appendTo('body');
styles = divs.toArray().map(function (div) {
return getComputedStyle(div);
});
resetDivs = function () {
var div, j, len;
for ((j = 0, len = divs.length); j < len; j++) {
div = divs[j];
div.removeAttribute('style');
if (arguments[0] === true) {
continue;
}
div.style.width = '40px';
div.style.height = '40px';
div.style.backgroundColor = 'blue';
}
};
suite("QuickCss", function () {
setup(resetDivs);
suiteTeardown(resetDivs);
test("Apply Basic Styles", function () {
quickcss(divs[0], 'width', '10px');
expect(styles[0].width).to.equal('10px');
quickcss(divs[1], 'width', '50vw');
expect(divs[1].style.width).to.equal('50vw');
return expect(Math.round(parseFloat(styles[0].width))).not.to.equal(40);
});
test("Suffix unit-less values for length properties", function () {
quickcss(divs[0], 'width', '10');
quickcss(divs[1], 'width', 10);
quickcss(divs[2], 'width', '10%');
expect(divs[0].style.width).to.equal('10px');
expect(divs[1].style.width).to.equal('10px');
expect(divs[2].style.width).to.equal('10%');
expect(styles[0].width).to.equal('10px');
expect(styles[1].width).to.equal('10px');
expect(Math.round(parseFloat(styles[2].width))).not.to.equal(40);
quickcss(divs[0], 'marginTop', '10');
quickcss(divs[1], 'marginTop', 10);
quickcss(divs[2], 'marginTop', '10%');
expect(divs[0].style.marginTop).to.equal('10px');
expect(divs[1].style.marginTop).to.equal('10px');
expect(divs[2].style.marginTop).to.equal('10%');
quickcss(divs[0], 'fontSize', '10');
quickcss(divs[1], 'fontSize', 10);
quickcss(divs[2], 'fontSize', '10%');
expect(divs[0].style.fontSize).to.equal('10px');
expect(divs[1].style.fontSize).to.equal('10px');
expect(divs[2].style.fontSize).to.equal('10%');
quickcss(divs[0], 'lineHeight', '10');
quickcss(divs[1], 'lineHeight', 10);
quickcss(divs[2], 'lineHeight', '10%');
expect(divs[0].style.lineHeight).to.equal('10em');
expect(divs[1].style.lineHeight).to.equal('10em');
return expect(divs[2].style.lineHeight).to.equal('10%');
});
test("Suffix won't be added for unit-less values on non-length properties", function () {
quickcss(divs[0], 'width', 'auto');
expect(divs[0].style.width).to.equal('auto');
expect(Math.round(parseFloat(styles[0].width))).not.to.equal(40);
quickcss(divs[1], 'opacity', .5);
expect(divs[1].style.opacity).to.equal('0.5');
return expect(styles[1].opacity).to.equal('0.5');
});
test("An iterable collection of elements can be passed", function () {
quickcss(divs, 'width', 15);
expect(divs[0].style.width).to.equal('15px');
expect(divs[1].style.width).to.equal('15px');
return expect(divs[2].style.width).to.equal('15px');
});
test("A style object can be passed", function () {
quickcss(divs[0], {
'position': 'fixed',
'width': '55',
'height': 12,
'opacity': 0.8
});
expect(divs[0].style.position).to.equal('fixed');
expect(divs[0].style.width).to.equal('55px');
expect(divs[0].style.height).to.equal('12px');
return expect(divs[0].style.opacity).to.equal('0.8');
});
test("An iterable collection of elements can be passed along with a style object", function () {
quickcss(divs, {
width: '32px',
height: '99px'
});
expect(divs[0].style.width).to.equal('32px');
expect(divs[1].style.width).to.equal('32px');
expect(divs[2].style.width).to.equal('32px');
expect(divs[0].style.height).to.equal('99px');
expect(divs[1].style.height).to.equal('99px');
return expect(divs[2].style.height).to.equal('99px');
});
test("Kebab-cased/camel-cased properties will be normalized", function () {
quickcss(divs[0], 'margin-top', '10px');
expect(divs[0].style.marginTop).to.equal('10px');
expect(styles[0].marginTop).to.equal('10px');
quickcss(divs[0], 'marginBottom', '12px');
expect(divs[0].style.marginBottom).to.equal('12px');
return expect(styles[0].marginBottom).to.equal('12px');
});
test("Invalid properties will be ignored", function () {
quickcss(divs[1], 'topMargin', '25px');
expect(divs[0].style.topMargin).not.to.exist;
return expect(styles[0].topMargin).not.to.exist;
});
test("If a value is not provided, the current computed value for the selected property will be returned", function () {
var computedValue;
quickcss(divs[2], 'marginTop', '5vh');
computedValue = styles[2].marginTop;
expect(quickcss(divs[2], 'marginTop', '5vh')).to.equal(void 0);
expect(quickcss(divs[2], 'marginTop', '5vh')).to.equal(void 0);
expect(quickcss(divs[2], 'marginTop')).to.equal(styles[2].marginTop);
return expect(quickcss(divs[2], 'topMargin')).to.equal(void 0);
});
test("If a null value is provided for a property, the property will be deleted", function () {
quickcss(divs[1], 'marginTop', '10px');
expect(divs[1].style.marginTop).to.equal('10px');
expect(styles[1].marginTop).to.equal('10px');
quickcss(divs[1], 'marginTop', null);
expect(divs[1].style.marginTop).to.equal('');
expect(styles[1].marginTop).to.equal('0px');
quickcss(divs[1], 'marginTop', '10px');
expect(divs[1].style.marginTop).to.equal('10px');
expect(styles[1].marginTop).to.equal('10px');
quickcss(divs[1], {
'marginTop': null
});
expect(divs[1].style.marginTop).to.equal('');
return expect(styles[1].marginTop).to.equal('0px');
});
test("!important flag will be set when truthy value will be passed as the 4th argument to QuickCss", function () {
resetDivs(true);
expect(divs[0].getAttribute('style')).to.equal('');
quickcss(divs[0], 'width', '50px');
expect(divs[0].getAttribute('style')).to.include('50px');
expect(divs[0].getAttribute('style')).not.to.include('50px !important');
quickcss(divs[0], 'width', '50px', true);
expect(divs[0].getAttribute('style')).to.include('50px !important');
quickcss(divs[0], 'height', '75px', true);
expect(divs[0].getAttribute('style')).to.include('75px !important');
return quickcss(divs[0], 'height', '75px');
});
test("quickcss.supports & quickcss.supportsProperty", function () {
expect(typeof quickcss.supports).to.equal('function');
expect(typeof quickcss.supportsProperty).to.equal('function');
expect(quickcss.supports('display', 'inline')).to.be.true;
expect(quickcss.supports('display', 'block')).to.be.true;
expect(quickcss.supports('display', 'blockl')).to.be.false;
expect(quickcss.supports('display', '')).to.be.false;
expect(quickcss.supports('display', null)).to.be.false;
expect(quickcss.supports('opacity', '0.5')).to.be.true;
expect(quickcss.supports('opacity', 0.5)).to.be.true;
expect(quickcss.supportsProperty('opacity')).to.be.true;
return expect(quickcss.supportsProperty('opacityy')).to.be.false;
});
suite("animation", function () {
test(".animation(name, keyframes) will create a @keyframes rule", function () {
var lastEl;
lastEl = $(document.head).children().last()[0];
expect(lastEl.id).not.to.equal('quickcss');
quickcss.animation('myAnimation', {
'0%': {
transform: 'rotate(0deg)',
opacity: 1,
width: 100,
marginTop: 5
},
'50%': {
width: 150
},
'100%': {
transform: 'rotate(360deg)',
opacity: 0.5,
width: 50
}
});
lastEl = $(document.head).children().last()[0];
expect(lastEl.id).to.equal('quickcss');
expect(lastEl.innerHTML).to.include('keyframes myAnimation {');
expect(lastEl.innerHTML).to.include('0% {');
expect(lastEl.innerHTML).to.include('transform:rotate(0deg)');
expect(lastEl.innerHTML).to.include('opacity:1');
expect(lastEl.innerHTML).to.include('width:100px');
expect(lastEl.innerHTML).to.include('margin-top:5px');
expect(lastEl.innerHTML).to.include('50% {');
expect(lastEl.innerHTML).to.include('width:150px');
expect(lastEl.innerHTML).to.include('100% {');
expect(lastEl.innerHTML).to.include('transform:rotate(360deg)');
expect(lastEl.innerHTML).to.include('opacity:0.5');
return expect(lastEl.innerHTML).to.include('width:50px');
});
return test("calling .animation() with the same args multiple times should only insert the keyframes once", function () {
var animation, lastEl, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7;
animation = {
'0%': {
transform: 'rotate(0deg)'
},
'100%': {
transform: 'rotate(360deg)'
}
};
quickcss.animation('someAnimation', animation);
lastEl = $(document.head).children().last()[0];
expect(lastEl.innerHTML).to.include('keyframes someAnimation {');
expect((ref = lastEl.innerHTML.match(/someAnimation/g)) != null ? ref.length : void 0).to.equal(1);
quickcss.animation('someAnimation', animation);
expect((ref1 = lastEl.innerHTML.match(/someAnimation/g)) != null ? ref1.length : void 0).to.equal(1);
quickcss.animation('someAnimation2', animation);
expect((ref2 = lastEl.innerHTML.match(/someAnimation/g)) != null ? ref2.length : void 0).to.equal(2);
expect((ref3 = lastEl.innerHTML.match(/someAnimation2/g)) != null ? ref3.length : void 0).to.equal(1);
quickcss.animation('someAnimation2', animation);
expect((ref4 = lastEl.innerHTML.match(/someAnimation/g)) != null ? ref4.length : void 0).to.equal(2);
expect((ref5 = lastEl.innerHTML.match(/someAnimation2/g)) != null ? ref5.length : void 0).to.equal(1);
quickcss.animation('someAnimation2', {
'from': {
width: 50
},
'to': {
width: 100
}
});
expect((ref6 = lastEl.innerHTML.match(/someAnimation/g)) != null ? ref6.length : void 0).to.equal(3);
return expect((ref7 = lastEl.innerHTML.match(/someAnimation2/g)) != null ? ref7.length : void 0).to.equal(2);
});
});
return suite("style registration", function () {
setup(function () {
return resetDivs(true);
});
test("a className will be returned from quickcss.register() for a given rule object which can be applied to elements", function () {
var className;
className = quickcss.register({
width: '150px',
'margin-top': '25px'
});
expect(typeof className).to.equal('string');
expect(quickcss(divs[0], 'width')).not.to.equal('150px');
expect(quickcss(divs[0], 'marginTop')).not.to.equal('25px');
divs[0].className += ` ${className}`;
expect(quickcss(divs[0], 'width')).to.equal('150px');
return expect(quickcss(divs[0], 'marginTop')).to.equal('25px');
});
test("values and properties will be normalized", function () {
var className;
className = quickcss.register({
width: 125,
height: 70,
zIndex: 12,
marginTop: 20,
fontSize: 20,
position: 'relative'
});
expect(quickcss(divs[0], 'width')).not.to.equal('125px');
expect(quickcss(divs[0], 'height')).not.to.equal('70px');
expect(quickcss(divs[0], 'marginTop')).not.to.equal('20px');
expect(quickcss(divs[0], 'fontSize')).not.to.equal('20px');
expect(quickcss(divs[0], 'zIndex')).not.to.equal('12');
divs[0].className += ` ${className}`;
expect(quickcss(divs[0], 'width')).to.equal('125px');
expect(quickcss(divs[0], 'height')).to.equal('70px');
expect(quickcss(divs[0], 'marginTop')).to.equal('20px');
expect(quickcss(divs[0], 'fontSize')).to.equal('20px');
return expect(quickcss(divs[0], 'zIndex')).to.equal('12');
});
test("only valid property values will be registered", function () {
var className, inserted, ref;
className = quickcss.register({
width: 20,
height: {
value: '20px'
},
opacity: 0.5,
lineHeight: (function () {
return '2em';
}),
fontSize: '12'
});
inserted = (ref = (document.querySelector('#quickcss').textContent).match(new RegExp(`\\.${className} {(.+?)}`))) != null ? ref[1] : void 0;
expect(typeof inserted).to.equal('string');
expect(inserted).to.include('width:20px');
expect(inserted).to.include('opacity:0.5');
expect(inserted).to.include('font-size:12px');
expect(inserted).not.to.include('height');
return expect(inserted).not.to.include('line-height');
});
test("a rule object will be only defined once inside the style element", function () {
var className1, className2, match;
className1 = quickcss.register({
width: 30,
height: '50'
});
className2 = quickcss.register({
width: 30,
height: '50'
});
expect(className1).to.equal(className2);
match = (document.querySelector('#quickcss').textContent).match(new RegExp(`${className1}`, 'g'));
return expect(match.length).to.equal(1);
});
test("styles can be registered at different levels for specificity (default=0)", function () {
var className1, className2;
className1 = quickcss.register({
width: 10,
height: 10
});
className2 = quickcss.register({
width: 20,
height: 20
});
divs[0].className = `${className1}`;
expect(styles[0].width).to.equal('10px');
expect(styles[0].height).to.equal('10px');
divs[0].className += ` ${className2}`;
expect(styles[0].width).to.equal('20px');
expect(styles[0].height).to.equal('20px');
quickcss.register({
width: 10,
height: 10
});
expect(styles[0].width).to.equal('20px');
expect(styles[0].height).to.equal('20px');
expect(document.querySelector('#quickcss1')).to.equal(null);
quickcss.register({
width: 10,
height: 10
}, 1);
expect(styles[0].width).to.equal('10px');
expect(styles[0].height).to.equal('10px');
quickcss.register({
width: 20,
height: 20
}, 5);
expect(styles[0].width).to.equal('20px');
expect(styles[0].height).to.equal('20px');
expect(document.querySelector('#quickcss1')).not.to.equal(null);
expect(document.querySelector('#quickcss5')).not.to.equal(null);
expect(document.querySelector('#quickcss').textContent).to.include(className1);
expect(document.querySelector('#quickcss1').textContent).to.include(className1);
expect(document.querySelector('#quickcss5').textContent).not.to.include(className1);
expect(document.querySelector('#quickcss').textContent).to.include(className2);
expect(document.querySelector('#quickcss1').textContent).not.to.include(className2);
expect(document.querySelector('#quickcss5').textContent).to.include(className2);
quickcss.register({
width: 10,
height: 10
}, 5);
expect(styles[0].width).to.equal('10px');
expect(styles[0].height).to.equal('10px');
return expect(document.querySelector('#quickcss5').textContent).to.include(className1);
});
test("styles will be registered with '!important' flag when passed quickcss.register(..., ..., true)", function () {
var className1, className2, className3, className4, className5, inserted, ref;
className1 = quickcss.register({
width: 30,
height: 30
}, 0);
className2 = quickcss.register({
width: 30,
height: 30
}, 0, true);
className4 = quickcss.register({
width: 50
}, 1, true);
className5 = quickcss.register({
height: 50
}, 1);
className3 = quickcss.register({
width: 25,
height: 25
}, 2);
expect(className1).not.to.equal(className2);
divs[0].className = `${className3} ${className4} ${className5}`;
expect(styles[0].width).to.equal('50px');
expect(styles[0].height).to.equal('25px');
inserted = (ref = (document.querySelector('#quickcss').textContent).match(new RegExp(`\\.${className2} {(.+?)}`))) != null ? ref[1] : void 0;
return expect(inserted).to.include('!important');
});
test("clearing registered", function () {
var className;
className = quickcss.register({
a: '1px',
b: '2px'
});
quickcss.register({
a: '1px',
b: '2px'
}, 1);
expect(document.querySelector('#quickcss').textContent).to.include(className);
expect(document.querySelector('#quickcss1').textContent).to.include(className);
quickcss.clearRegistered();
expect(document.querySelector('#quickcss').textContent).not.to.include(className);
expect(document.querySelector('#quickcss1').textContent).to.include(className);
quickcss.register({
a: '1px',
b: '2px'
});
expect(document.querySelector('#quickcss').textContent).to.include(className);
expect(document.querySelector('#quickcss1').textContent).to.include(className);
quickcss.clearRegistered(1);
expect(document.querySelector('#quickcss').textContent).to.include(className);
return expect(document.querySelector('#quickcss1').textContent).not.to.include(className);
});
return suite("the returned className will be the same (i.e. hashsum)", function () {
test("for the same object", function () {
var rule;
rule = {
width: 125,
height: 70,
zIndex: 12
};
return expect(quickcss.register(rule)).to.equal(quickcss.register(rule));
});
test("for diff objects with the same config", function () {
return expect(quickcss.register({
width: 125,
height: 70,
zIndex: 13
})).to.equal(quickcss.register({
width: 125,
height: 70,
zIndex: 13
}));
});
test("for diff objects with the same config but different notations", function () {
return expect(quickcss.register({
width: 115,
height: 70,
zIndex: 14
})).to.equal(quickcss.register({
width: '115px',
height: 70,
'z-index': 14
}));
});
test("for diff objects with the same config but different property order", function () {
expect(quickcss.register({
width: 100,
height: 70,
zIndex: 15
})).to.equal(quickcss.register({
'z-index': 15,
width: '100px',
height: 70
}));
return expect(quickcss.register({
width: 100,
height: 70,
zIndex: 15
})).not.to.equal(quickcss.register({
'z-index': 15,
width: '100px',
height: 71
}));
});
return test("for diff object with the same config when some properties are rejected", function () {
return expect(quickcss.register({
width: 20,
height: {
value: '20px'
},
opacity: 0.5,
lineHeight: (function () {
return '2em';
}),
fontSize: '12'
})).to.equal(quickcss.register({
width: 20,
height: {
value: '20px'
},
opacity: 0.5,
fontSize: '12',
lineHeight: (function () {
return '2em';
})
}));
});
});
});
});
require(3);
return module.exports;
},
1: function (require, module, exports) {
module.exports = require(4);
return module.exports;
},
2: function (require, module, exports) {
'use strict';
var deepEqual = require(5);
var type = require(6);
var DEFAULT_TOLERANCE = 1e-6;
function isNumber(val) {
return type(val) === 'number';
}
function bothNumbers(left, right) {
return isNumber(right) && isNumber(left);
}
function almostEqual(left, right, tol) {
return Math.abs(left - right) <= tol;
}
function comparator(tolerance) {
return function (left, right) {
if (bothNumbers(left, right)) {
return almostEqual(left, right, tolerance);
}
return null;
};
}
function chaiAlmost(customTolerance) {
var standardTolerance = customTolerance || DEFAULT_TOLERANCE;
return function (chai, utils) {
var Assertion = chai.Assertion;
var flag = utils.flag;
function overrideAssertEqual(_super) {
return function assertEqual(val, msg) {
if (msg) flag(this, 'message', msg);
var deep = flag(this, 'deep');
var tolerance = flag(this, 'tolerance');
if (deep) {
return this.eql(val);
} else if (tolerance && bothNumbers(val, this._obj)) {
this.assert(almostEqual(val, this._obj, tolerance), 'expected #{this} to almost equal #{exp}', 'expected #{this} to not almost equal #{exp}', val, this._obj, true);
} else {
return _super.apply(this, arguments);
}
};
}
function overrideAssertEql(_super) {
return function assertEql(val, msg) {
if (msg) flag(this, 'message', msg);
var tolerance = flag(this, 'tolerance');
if (tolerance) {
this.assert(deepEqual(val, this._obj, {
comparator: comparator(tolerance)
}), 'expected #{this} to deeply almost equal #{exp}', 'expected #{this} to not deeply almost equal #{exp}', val, this._obj, true);
} else {
return _super.apply(this, arguments);
}
};
}
function method(val, toleranceOverride) {
var tolerance = toleranceOverride || standardTolerance;
flag(this, 'tolerance', tolerance);
return this.equal(val);
}
function chainingBehavior() {
flag(this, 'tolerance', standardTolerance);
}
Assertion.addChainableMethod('almost', method, chainingBehavior);
Assertion.overwriteMethod('equal', overrideAssertEqual);
Assertion.overwriteMethod('equals', overrideAssertEqual);
Assertion.overwriteMethod('eq', overrideAssertEqual);
Assertion.overwriteMethod('eql', overrideAssertEql);
Assertion.overwriteMethod('eqls', overrideAssertEql);
};
}
module.exports = chaiAlmost;
return module.exports;
},
3: function (require, module, exports) {
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
for ((i = 0, len = DIRECTIONS.length); i < len; i++) {
direction = DIRECTIONS[i];
REQUIRES_UNIT_VALUE.push(property + '-' + direction);
}
});
return module.exports;
},
4: function (require, module, exports) {
var used = [];
exports.version = '4.1.2';
exports.AssertionError = require(7);
var util = require(8);
exports.use = function (fn) {
if (!~used.indexOf(fn)) {
fn(exports, util);
used.push(fn);
}
return exports;
};
exports.util = util;
var config = require(9);
exports.config = config;
var assertion = require(10);
exports.use(assertion);
var core = require(11);
exports.use(core);
var expect = require(12);
exports.use(expect);
var should = require(13);
exports.use(should);
var assert = require(14);
exports.use(assert);
return module.exports;
},
5: function (require, module, exports) {
'use strict';
var type = require(15);
function FakeMap() {
this.clear();
}
FakeMap.prototype = {
clear: function clearMap() {
this.keys = [];
this.values = [];
return this;
},
set: function setMap(key, value) {
var index = this.keys.indexOf(key);
if (index >= 0) {
this.values[index] = value;
} else {
this.keys.push(key);
this.values.push(value);
}
return this;
},
get: function getMap(key) {
return this.values[this.keys.indexOf(key)];
},
delete: function deleteMap(key) {
var index = this.keys.indexOf(key);
if (index >= 0) {
this.values = this.values.slice(0, index).concat(this.values.slice(index + 1));
this.keys = this.keys.slice(0, index).concat(this.keys.slice(index + 1));
}
return this;
}
};
var MemoizeMap = null;
if (typeof WeakMap === 'function') {
MemoizeMap = WeakMap;
} else {
MemoizeMap = FakeMap;
}
function memoizeCompare(leftHandOperand, rightHandOperand, memoizeMap) {
if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
return null;
}
var leftHandMap = memoizeMap.get(leftHandOperand);
if (leftHandMap) {
var result = leftHandMap.get(rightHandOperand);
if (typeof result === 'boolean') {
return result;
}
}
return null;
}
function memoizeSet(leftHandOperand, rightHandOperand, memoizeMap, result) {
if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
return;
}
var leftHandMap = memoizeMap.get(leftHandOperand);
if (leftHandMap) {
leftHandMap.set(rightHandOperand, result);
} else {
leftHandMap = new MemoizeMap();
leftHandMap.set(rightHandOperand, result);
memoizeMap.set(leftHandOperand, leftHandMap);
}
}
module.exports = deepEqual;
module.exports.MemoizeMap = MemoizeMap;
function deepEqual(leftHandOperand, rightHandOperand, options) {
if (options && options.comparator) {
return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
}
var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
if (simpleResult !== null) {
return simpleResult;
}
return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
}
function simpleEqual(leftHandOperand, rightHandOperand) {
if (leftHandOperand === rightHandOperand) {
return leftHandOperand !== 0 || 1 / leftHandOperand === 1 / rightHandOperand;
}
if (leftHandOperand !== leftHandOperand && rightHandOperand !== rightHandOperand) {
return true;
}
if (isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
return false;
}
return null;
}
function extensiveDeepEqual(leftHandOperand, rightHandOperand, options) {
options = options || ({});
options.memoize = options.memoize === false ? false : options.memoize || new MemoizeMap();
var comparator = options && options.comparator;
var memoizeResultLeft = memoizeCompare(leftHandOperand, rightHandOperand, options.memoize);
if (memoizeResultLeft !== null) {
return memoizeResultLeft;
}
var memoizeResultRight = memoizeCompare(rightHandOperand, leftHandOperand, options.memoize);
if (memoizeResultRight !== null) {
return memoizeResultRight;
}
if (comparator) {
var comparatorResult = comparator(leftHandOperand, rightHandOperand);
if (comparatorResult === false || comparatorResult === true) {
memoizeSet(leftHandOperand, rightHandOperand, options.memoize, comparatorResult);
return comparatorResult;
}
var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
if (simpleResult !== null) {
return simpleResult;
}
}
var leftHandType = type(leftHandOperand);
if (leftHandType !== type(rightHandOperand)) {
memoizeSet(leftHandOperand, rightHandOperand, options.memoize, false);
return false;
}
memoizeSet(leftHandOperand, rightHandOperand, options.memoize, true);
var result = extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options);
memoizeSet(leftHandOperand, rightHandOperand, options.memoize, result);
return result;
}
function extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options) {
switch (leftHandType) {
case 'String':
case 'Number':
case 'Boolean':
case 'Date':
return deepEqual(leftHandOperand.valueOf(), rightHandOperand.valueOf());
case 'Promise':
case 'Symbol':
case 'function':
case 'WeakMap':
case 'WeakSet':
case 'Error':
return leftHandOperand === rightHandOperand;
case 'Arguments':
case 'Int8Array':
case 'Uint8Array':
case 'Uint8ClampedArray':
case 'Int16Array':
case 'Uint16Array':
case 'Int32Array':
case 'Uint32Array':
case 'Float32Array':
case 'Float64Array':
case 'Array':
return iterableEqual(leftHandOperand, rightHandOperand, options);
case 'RegExp':
return regexpEqual(leftHandOperand, rightHandOperand);
case 'Generator':
return generatorEqual(leftHandOperand, rightHandOperand, options);
case 'DataView':
return iterableEqual(new Uint8Array(leftHandOperand.buffer), new Uint8Array(rightHandOperand.buffer), options);
case 'ArrayBuffer':
return iterableEqual(new Uint8Array(leftHandOperand), new Uint8Array(rightHandOperand), options);
case 'Set':
return entriesEqual(leftHandOperand, rightHandOperand, options);
case 'Map':
return entriesEqual(leftHandOperand, rightHandOperand, options);
default:
return objectEqual(leftHandOperand, rightHandOperand, options);
}
}
function regexpEqual(leftHandOperand, rightHandOperand) {
return leftHandOperand.toString() === rightHandOperand.toString();
}
function entriesEqual(leftHandOperand, rightHandOperand, options) {
if (leftHandOperand.size !== rightHandOperand.size) {
return false;
}
if (leftHandOperand.size === 0) {
return true;
}
var leftHandItems = [];
var rightHandItems = [];
leftHandOperand.forEach(function gatherEntries(key, value) {
leftHandItems.push([key, value]);
});
rightHandOperand.forEach(function gatherEntries(key, value) {
rightHandItems.push([key, value]);
});
return iterableEqual(leftHandItems.sort(), rightHandItems.sort(), options);
}
function iterableEqual(leftHandOperand, rightHandOperand, options) {
var length = leftHandOperand.length;
if (length !== rightHandOperand.length) {
return false;
}
if (length === 0) {
return true;
}
var index = -1;
while (++index < length) {
if (deepEqual(leftHandOperand[index], rightHandOperand[index], options) === false) {
return false;
}
}
return true;
}
function generatorEqual(leftHandOperand, rightHandOperand, options) {
return iterableEqual(getGeneratorEntries(leftHandOperand), getGeneratorEntries(rightHandOperand), options);
}
function hasIteratorFunction(target) {
return typeof Symbol !== 'undefined' && typeof target === 'object' && typeof Symbol.iterator !== 'undefined' && typeof target[Symbol.iterator] === 'function';
}
function getIteratorEntries(target) {
if (hasIteratorFunction(target)) {
try {
return getGeneratorEntries(target[Symbol.iterator]());
} catch (iteratorError) {
return [];
}
}
return [];
}
function getGeneratorEntries(generator) {
var generatorResult = generator.next();
var accumulator = [generatorResult.value];
while (generatorResult.done === false) {
generatorResult = generator.next();
accumulator.push(generatorResult.value);
}
return accumulator;
}
function getEnumerableKeys(target) {
var keys = [];
for (var key in target) {
keys.push(key);
}
return keys;
}
function keysEqual(leftHandOperand, rightHandOperand, keys, options) {
var length = keys.length;
if (length === 0) {
return true;
}
for (var i = 0; i < length; i += 1) {
if (deepEqual(leftHandOperand[keys[i]], rightHandOperand[keys[i]], options) === false) {
return false;
}
}
return true;
}
function objectEqual(leftHandOperand, rightHandOperand, options) {
var leftHandKeys = getEnumerableKeys(leftHandOperand);
var rightHandKeys = getEnumerableKeys(rightHandOperand);
if (leftHandKeys.length && leftHandKeys.length === rightHandKeys.length) {
leftHandKeys.sort();
rightHandKeys.sort();
if (iterableEqual(leftHandKeys, rightHandKeys) === false) {
return false;
}
return keysEqual(leftHandOperand, rightHandOperand, leftHandKeys, options);
}
var leftHandEntries = getIteratorEntries(leftHandOperand);
var rightHandEntries = getIteratorEntries(rightHandOperand);
if (leftHandEntries.length && leftHandEntries.length === rightHandEntries.length) {
leftHandEntries.sort();
rightHandEntries.sort();
return iterableEqual(leftHandEntries, rightHandEntries, options);
}
if (leftHandKeys.length === 0 && leftHandEntries.length === 0 && rightHandKeys.length === 0 && rightHandEntries.length === 0) {
return true;
}
return false;
}
function isPrimitive(value) {
return value === null || typeof value !== 'object';
}
return module.exports;
},
6: function (require, module, exports) {
'use strict';
var promiseExists = typeof Promise === 'function';
var globalObject = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : self;
var isDom = ('location' in globalObject) && ('document' in globalObject);
var symbolExists = typeof Symbol !== 'undefined';
var mapExists = typeof Map !== 'undefined';
var setExists = typeof Set !== 'undefined';
var weakMapExists = typeof WeakMap !== 'undefined';
var weakSetExists = typeof WeakSet !== 'undefined';
var dataViewExists = typeof DataView !== 'undefined';
var symbolIteratorExists = symbolExists && typeof Symbol.iterator !== 'undefined';
var symbolToStringTagExists = symbolExists && typeof Symbol.toStringTag !== 'undefined';
var setEntriesExists = setExists && typeof Set.prototype.entries === 'function';
var mapEntriesExists = mapExists && typeof Map.prototype.entries === 'function';
var setIteratorPrototype = setEntriesExists && Object.getPrototypeOf(new Set().entries());
var mapIteratorPrototype = mapEntriesExists && Object.getPrototypeOf(new Map().entries());
var arrayIteratorExists = symbolIteratorExists && typeof Array.prototype[Symbol.iterator] === 'function';
var arrayIteratorPrototype = arrayIteratorExists && Object.getPrototypeOf([][Symbol.iterator]());
var stringIteratorExists = symbolIteratorExists && typeof String.prototype[Symbol.iterator] === 'function';
var stringIteratorPrototype = stringIteratorExists && Object.getPrototypeOf(('')[Symbol.iterator]());
var toStringLeftSliceLength = 8;
var toStringRightSliceLength = -1;
module.exports = function typeDetect(obj) {
var typeofObj = typeof obj;
if (typeofObj !== 'object') {
return typeofObj;
}
if (obj === null) {
return 'null';
}
if (obj === globalObject) {
return 'global';
}
if (Array.isArray(obj) && (symbolToStringTagExists === false || !((Symbol.toStringTag in obj)))) {
return 'Array';
}
if (isDom) {
if (obj === globalObject.location) {
return 'Location';
}
if (obj === globalObject.document) {
return 'Document';
}
if (obj === (globalObject.navigator || ({})).mimeTypes) {
return 'MimeTypeArray';
}
if (obj === (globalObject.navigator || ({})).plugins) {
return 'PluginArray';
}
if (obj instanceof HTMLElement && obj.tagName === 'BLOCKQUOTE') {
return 'HTMLQuoteElement';
}
if (obj instanceof HTMLElement && obj.tagName === 'TD') {
return 'HTMLTableDataCellElement';
}
if (obj instanceof HTMLElement && obj.tagName === 'TH') {
return 'HTMLTableHeaderCellElement';
}
}
var stringTag = (symbolToStringTagExists && obj[Symbol.toStringTag]);
if (typeof stringTag === 'string') {
return stringTag;
}
var objPrototype = Object.getPrototypeOf(obj);
if (objPrototype === RegExp.prototype) {
return 'RegExp';
}
if (objPrototype === Date.prototype) {
return 'Date';
}
if (promiseExists && objPrototype === Promise.prototype) {
return 'Promise';
}
if (setExists && objPrototype === Set.prototype) {
return 'Set';
}
if (mapExists && objPrototype === Map.prototype) {
return 'Map';
}
if (weakSetExists && objPrototype === WeakSet.prototype) {
return 'WeakSet';
}
if (weakMapExists && objPrototype === WeakMap.prototype) {
return 'WeakMap';
}
if (dataViewExists && objPrototype === DataView.prototype) {
return 'DataView';
}
if (mapExists && objPrototype === mapIteratorPrototype) {
return 'Map Iterator';
}
if (setExists && objPrototype === setIteratorPrototype) {
return 'Set Iterator';
}
if (arrayIteratorExists && objPrototype === arrayIteratorPrototype) {
return 'Array Iterator';
}
if (stringIteratorExists && objPrototype === stringIteratorPrototype) {
return 'String Iterator';
}
if (objPrototype === null) {
return 'Object';
}
return Object.prototype.toString.call(obj).slice(toStringLeftSliceLength, toStringRightSliceLength);
};
module.exports.typeDetect = module.exports;
return module.exports;
},
7: function (require, module, exports) {
function exclude() {
var excludes = [].slice.call(arguments);
function excludeProps(res, obj) {
Object.keys(obj).forEach(function (key) {
if (!~excludes.indexOf(key)) res[key] = obj[key];
});
}
return function extendExclude() {
var args = [].slice.call(arguments), i = 0, res = {};
for (; i < args.length; i++) {
excludeProps(res, args[i]);
}
return res;
};
}
;
module.exports = AssertionError;
function AssertionError(message, _props, ssf) {
var extend = exclude('name', 'message', 'stack', 'constructor', 'toJSON'), props = extend(_props || ({}));
this.message = message || 'Unspecified AssertionError';
this.showDiff = false;
for (var key in props) {
this[key] = props[key];
}
ssf = ssf || arguments.callee;
if (ssf && Error.captureStackTrace) {
Error.captureStackTrace(this, ssf);
} else {
try {
throw new Error();
} catch (e) {
this.stack = e.stack;
}
}
}
AssertionError.prototype = Object.create(Error.prototype);
AssertionError.prototype.name = 'AssertionError';
AssertionError.prototype.constructor = AssertionError;
AssertionError.prototype.toJSON = function (stack) {
var extend = exclude('constructor', 'toJSON', 'stack'), props = extend({
name: this.name
}, this);
if (false !== stack && this.stack) {
props.stack = this.stack;
}
return props;
};
return module.exports;
},
8: function (require, module, exports) {
var pathval = require(16);
exports.test = require(17);
exports.type = require(6);
exports.expectTypes = require(18);
exports.getMessage = require(19);
exports.getActual = require(20);
exports.inspect = require(21);
exports.objDisplay = require(22);
exports.flag = require(23);
exports.transferFlags = require(24);
exports.eql = require(25);
exports.getPathInfo = pathval.getPathInfo;
exports.hasProperty = pathval.hasProperty;
exports.getName = require(26);
exports.addProperty = require(27);
exports.addMethod = require(28);
exports.overwriteProperty = require(29);
exports.overwriteMethod = require(30);
exports.addChainableMethod = require(31);
exports.overwriteChainableMethod = require(32);
exports.compareByInspect = require(33);
exports.getOwnEnumerablePropertySymbols = require(34);
exports.getOwnEnumerableProperties = require(35);
exports.checkError = require(36);
exports.proxify = require(37);
exports.addLengthGuard = require(38);
exports.isProxyEnabled = require(39);
exports.isNaN = require(40);
return module.exports;
},
9: function (require, module, exports) {
module.exports = {
includeStack: false,
showDiff: true,
truncateThreshold: 40,
useProxy: true,
proxyExcludedKeys: ['then', 'inspect', 'toJSON']
};
return module.exports;
},
10: function (require, module, exports) {
var config = require(9);
module.exports = function (_chai, util) {
var AssertionError = _chai.AssertionError, flag = util.flag;
_chai.Assertion = Assertion;
function Assertion(obj, msg, ssfi, lockSsfi) {
flag(this, 'ssfi', ssfi || Assertion);
flag(this, 'lockSsfi', lockSsfi);
flag(this, 'object', obj);
flag(this, 'message', msg);
return util.proxify(this);
}
Object.defineProperty(Assertion, 'includeStack', {
get: function () {
console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
return config.includeStack;
},
set: function (value) {
console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
config.includeStack = value;
}
});
Object.defineProperty(Assertion, 'showDiff', {
get: function () {
console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
return config.showDiff;
},
set: function (value) {
console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
config.showDiff = value;
}
});
Assertion.addProperty = function (name, fn) {
util.addProperty(this.prototype, name, fn);
};
Assertion.addMethod = function (name, fn) {
util.addMethod(this.prototype, name, fn);
};
Assertion.addChainableMethod = function (name, fn, chainingBehavior) {
util.addChainableMethod(this.prototype, name, fn, chainingBehavior);
};
Assertion.overwriteProperty = function (name, fn) {
util.overwriteProperty(this.prototype, name, fn);
};
Assertion.overwriteMethod = function (name, fn) {
util.overwriteMethod(this.prototype, name, fn);
};
Assertion.overwriteChainableMethod = function (name, fn, chainingBehavior) {
util.overwriteChainableMethod(this.prototype, name, fn, chainingBehavior);
};
Assertion.prototype.assert = function (expr, msg, negateMsg, expected, _actual, showDiff) {
var ok = util.test(this, arguments);
if (false !== showDiff) showDiff = true;
if (undefined === expected && undefined === _actual) showDiff = false;
if (true !== config.showDiff) showDiff = false;
if (!ok) {
msg = util.getMessage(this, arguments);
var actual = util.getActual(this, arguments);
throw new AssertionError(msg, {
actual: actual,
expected: expected,
showDiff: showDiff
}, ((config.includeStack)) ? this.assert : flag(this, 'ssfi'));
}
};
Object.defineProperty(Assertion.prototype, '_obj', {
get: function () {
return flag(this, 'object');
},
set: function (val) {
flag(this, 'object', val);
}
});
};
return module.exports;
},
11: function (require, module, exports) {
module.exports = function (chai, _) {
var Assertion = chai.Assertion, AssertionError = chai.AssertionError, flag = _.flag;
['to', 'be', 'been', 'is', 'and', 'has', 'have', 'with', 'that', 'which', 'at', 'of', 'same', 'but', 'does'].forEach(function (chain) {
Assertion.addProperty(chain);
});
Assertion.addProperty('not', function () {
flag(this, 'negate', true);
});
Assertion.addProperty('deep', function () {
flag(this, 'deep', true);
});
Assertion.addProperty('nested', function () {
flag(this, 'nested', true);
});
Assertion.addProperty('own', function () {
flag(this, 'own', true);
});
Assertion.addProperty('ordered', function () {
flag(this, 'ordered', true);
});
Assertion.addProperty('any', function () {
flag(this, 'any', true);
flag(this, 'all', false);
});
Assertion.addProperty('all', function () {
flag(this, 'all', true);
flag(this, 'any', false);
});
function an(type, msg) {
if (msg) flag(this, 'message', msg);
type = type.toLowerCase();
var obj = flag(this, 'object'), article = ~['a', 'e', 'i', 'o', 'u'].indexOf(type.charAt(0)) ? 'an ' : 'a ';
this.assert(type === _.type(obj).toLowerCase(), 'expected #{this} to be ' + article + type, 'expected #{this} not to be ' + article + type);
}
Assertion.addChainableMethod('an', an);
Assertion.addChainableMethod('a', an);
function SameValueZero(a, b) {
return (_.isNaN(a) && _.isNaN(b)) || a === b;
}
function includeChainingBehavior() {
flag(this, 'contains', true);
}
function include(val, msg) {
if (msg) flag(this, 'message', msg);
var obj = flag(this, 'object'), objType = _.type(obj).toLowerCase(), flagMsg = flag(this, 'message'), negate = flag(this, 'negate'), ssfi = flag(this, 'ssfi'), isDeep = flag(this, 'deep'), descriptor = isDeep ? 'deep ' : '';
flagMsg = flagMsg ? flagMsg + ': ' : '';
var included = false;
switch (objType) {
case 'string':
included = obj.indexOf(val) !== -1;
break;
case 'weakset':
if (isDeep) {
throw new AssertionError(flagMsg + 'unable to use .deep.include with WeakSet', undefined, ssfi);
}
included = obj.has(val);
break;
case 'map':
var isEql = isDeep ? _.eql : SameValueZero;
obj.forEach(function (item) {
included = included || isEql(item, val);
});
break;
case 'set':
if (isDeep) {
obj.forEach(function (item) {
included = included || _.eql(item, val);
});
} else {
included = obj.has(val);
}
break;
case 'array':
if (isDeep) {
included = obj.some(function (item) {
return _.eql(item, val);
});
} else {
included = obj.indexOf(val) !== -1;
}
break;
default:
if (val !== Object(val)) {
throw new AssertionError(flagMsg + 'object tested must be an array, a map, an object,' + ' a set, a string, or a weakset, but ' + objType + ' given', undefined, ssfi);
}
var props = Object.keys(val), firstErr = null, numErrs = 0;
props.forEach(function (prop) {
var propAssertion = new Assertion(obj);
_.transferFlags(this, propAssertion, true);
flag(propAssertion, 'lockSsfi', true);
if (!negate || props.length === 1) {
propAssertion.property(prop, val[prop]);
return;
}
try {
propAssertion.property(prop, val[prop]);
} catch (err) {
if (!_.checkError.compatibleConstructor(err, AssertionError)) {
throw err;
}
if (firstErr === null) firstErr = err;
numErrs++;
}
}, this);
if (negate && props.length > 1 && numErrs === props.length) {
throw firstErr;
}
return;
}
this.assert(included, 'expected #{this} to ' + descriptor + 'include ' + _.inspect(val), 'expected #{this} to not ' + descriptor + 'include ' + _.inspect(val));
}
Assertion.addChainableMethod('include', include, includeChainingBehavior);
Assertion.addChainableMethod('contain', include, includeChainingBehavior);
Assertion.addChainableMethod('contains', include, includeChainingBehavior);
Assertion.addChainableMethod('includes', include, includeChainingBehavior);
Assertion.addProperty('ok', function () {
this.assert(flag(this, 'object'), 'expected #{this} to be truthy', 'expected #{this} to be falsy');
});
Assertion.addProperty('true', function () {
this.assert(true === flag(this, 'object'), 'expected #{this} to be true', 'expected #{this} to be false', flag(this, 'negate') ? false : true);
});
Assertion.addProperty('false', function () {
this.assert(false === flag(this, 'object'), 'expected #{this} to be false', 'expected #{this} to be true', flag(this, 'negate') ? true : false);
});
Assertion.addProperty('null', function () {
this.assert(null === flag(this, 'object'), 'expected #{this} to be null', 'expected #{this} not to be null');
});
Assertion.addProperty('undefined', function () {
this.assert(undefined === flag(this, 'object'), 'expected #{this} to be undefined', 'expected #{this} not to be undefined');
});
Assertion.addProperty('NaN', function () {
this.assert(_.isNaN(flag(this, 'object')), 'expected #{this} to be NaN', 'expected #{this} not to be NaN');
});
Assertion.addProperty('exist', function () {
var val = flag(this, 'object');
this.assert(val !== null && val !== undefined, 'expected #{this} to exist', 'expected #{this} to not exist');
});
Assertion.addProperty('empty', function () {
var val = flag(this, 'object'), ssfi = flag(this, 'ssfi'), flagMsg = flag(this, 'message'), itemsCount;
flagMsg = flagMsg ? flagMsg + ': ' : '';
switch (_.type(val).toLowerCase()) {
case 'array':
case 'string':
itemsCount = val.length;
break;
case 'map':
case 'set':
itemsCount = val.size;
break;
case 'weakmap':
case 'weakset':
throw new AssertionError(flagMsg + '.empty was passed a weak collection', undefined, ssfi);
case 'function':
var msg = flagMsg + '.empty was passed a function ' + _.getName(val);
throw new AssertionError(msg.trim(), undefined, ssfi);
default:
if (val !== Object(val)) {
throw new AssertionError(flagMsg + '.empty was passed non-string primitive ' + _.inspect(val), undefined, ssfi);
}
itemsCount = Object.keys(val).length;
}
this.assert(0 === itemsCount, 'expected #{this} to be empty', 'expected #{this} not to be empty');
});
function checkArguments() {
var obj = flag(this, 'object'), type = _.type(obj);
this.assert('Arguments' === type, 'expected #{this} to be arguments but got ' + type, 'expected #{this} to not be arguments');
}
Assertion.addProperty('arguments', checkArguments);
Assertion.addProperty('Arguments', checkArguments);
function assertEqual(val, msg) {
if (msg) flag(this, 'message', msg);
var obj = flag(this, 'object');
if (flag(this, 'deep')) {
return this.eql(val);
} else {
this.assert(val === obj, 'expected #{this} to equal #{exp}', 'expected #{this} to not equal #{exp}', val, this._obj, true);
}
}
Assertion.addMethod('equal', assertEqual);
Assertion.addMethod('equals', assertEqual);
Assertion.addMethod('eq', assertEqual);
function assertEql(obj, msg) {
if (msg) flag(this, 'message', msg);
this.assert(_.eql(obj, flag(this, 'object')), 'expected #{this} to deeply equal #{exp}', 'expected #{this} to not deeply equal #{exp}', obj, this._obj, true);
}
Assertion.addMethod('eql', assertEql);
Assertion.addMethod('eqls', assertEql);
function assertAbove(n, msg) {
if (msg) flag(this, 'message', msg);
var obj = flag(this, 'object'), doLength = flag(this, 'doLength'), flagMsg = flag(this, 'message'), msgPrefix = (((flagMsg)) ? flagMsg + ': ' : ''), ssfi = flag(this, 'ssfi'), objType = _.type(obj).toLowerCase(), nType = _.type(n).toLowerCase(), shouldThrow = true;
if (doLength) {
new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
}
if (!doLength && (objType === 'date' && nType !== 'date')) {
errorMessage = msgPrefix + 'the argument to above must be a date';
} else if (nType !== 'number' && (doLength || objType === 'number')) {
errorMessage = msgPrefix + 'the argument to above must be a number';
} else if (!doLength && (objType !== 'date' && objType !== 'number')) {
var printObj = ((objType === 'string')) ? "'" + obj + "'" : obj;
errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
} else {
shouldThrow = false;
}
if (shouldThrow) {
throw new AssertionError(errorMessage, undefined, ssfi);
}
if (doLength) {
var len = obj.length;
this.assert(len > n, 'expected #{this} to have a length above #{exp} but got #{act}', 'expected #{this} to not have a length above #{exp}', n, len);
} else {
this.assert(obj > n, 'expected #{this} to be above #{exp}', 'expected #{this} to be at most #{exp}', n);
}
}
Assertion.addMethod('above', assertAbove);
Assertion.addMethod('gt', assertAbove);
Assertion.addMethod('greaterThan', assertAbove);
function assertLeast(n, msg) {
if (msg) flag(this, 'message', msg);
var obj = flag(this, 'object'), doLength = flag(this, 'doLength'), flagMsg = flag(this, 'message'), msgPrefix = (((flagMsg)) ? flagMsg + ': ' : ''), ssfi = flag(this, 'ssfi'), objType = _.type(obj).toLowerCase(), nType = _.type(n).toLowerCase(), shouldThrow = true;
if (doLength) {
new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
}
if (!doLength && (objType === 'date' && nType !== 'date')) {
errorMessage = msgPrefix + 'the argument to least must be a date';
} else if (nType !== 'number' && (doLength || objType === 'number')) {
errorMessage = msgPrefix + 'the argument to least must be a number';
} else if (!doLength && (objType !== 'date' && objType !== 'number')) {
var printObj = ((objType === 'string')) ? "'" + obj + "'" : obj;
errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
} else {
shouldThrow = false;
}
if (shouldThrow) {
throw new AssertionError(errorMessage, undefined, ssfi);
}
if (doLength) {
var len = obj.length;
this.assert(len >= n, 'expected #{this} to have a length at least #{exp} but got #{act}', 'expected #{this} to have a length below #{exp}', n, len);
} else {
this.assert(obj >= n, 'expected #{this} to be at least #{exp}', 'expected #{this} to be below #{exp}', n);
}
}
Assertion.addMethod('least', assertLeast);
Assertion.addMethod('gte', assertLeast);
function assertBelow(n, msg) {
if (msg) flag(this, 'message', msg);
var obj = flag(this, 'object'), doLength = flag(this, 'doLength'), flagMsg = flag(this, 'message'), msgPrefix = (((flagMsg)) ? flagMsg + ': ' : ''), ssfi = flag(this, 'ssfi'), objType = _.type(obj).toLowerCase(), nType = _.type(n).toLowerCase(), shouldThrow = true;
if (doLength) {
new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
}
if (!doLength && (objType === 'date' && nType !== 'date')) {
errorMessage = msgPrefix + 'the argument to below must be a date';
} else if (nType !== 'number' && (doLength || objType === 'number')) {
errorMessage = msgPrefix + 'the argument to below must be a number';
} else if (!doLength && (objType !== 'date' && objType !== 'number')) {
var printObj = ((objType === 'string')) ? "'" + obj + "'" : obj;
errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
} else {
shouldThrow = false;
}
if (shouldThrow) {
throw new AssertionError(errorMessage, undefined, ssfi);
}
if (doLength) {
var len = obj.length;
this.assert(len < n, 'expected #{this} to have a length below #{exp} but got #{act}', 'expected #{this} to not have a length below #{exp}', n, len);
} else {
this.assert(obj < n, 'expected #{this} to be below #{exp}', 'expected #{this} to be at least #{exp}', n);
}
}
Assertion.addMethod('below', assertBelow);
Assertion.addMethod('lt', assertBelow);
Assertion.addMethod('lessThan', assertBelow);
function assertMost(n, msg) {
if (msg) flag(this, 'message', msg);
var obj = flag(this, 'object'), doLength = flag(this, 'doLength'), flagMsg = flag(this, 'message'), msgPrefix = (((flagMsg)) ? flagMsg + ': ' : ''), ssfi = flag(this, 'ssfi'), objType = _.type(obj).toLowerCase(), nType = _.type(n).toLowerCase(), shouldThrow = true;
if (doLength) {
new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
}
if (!doLength && (objType === 'date' && nType !== 'date')) {
errorMessage = msgPrefix + 'the argument to most must be a date';
} else if (nType !== 'number' && (doLength || objType === 'number')) {
errorMessage = msgPrefix + 'the argument to most must be a number';
} else if (!doLength && (objType !== 'date' && objType !== 'number')) {
var printObj = ((objType === 'string')) ? "'" + obj + "'" : obj;
errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
} else {
shouldThrow = false;
}
if (shouldThrow) {
throw new AssertionError(errorMessage, undefined, ssfi);
}
if (doLength) {
var len = obj.length;
this.assert(len <= n, 'expected #{this} to have a length at most #{exp} but got #{act}', 'expected #{this} to have a length above #{exp}', n, len);
} else {
this.assert(obj <= n, 'expected #{this} to be at most #{exp}', 'expected #{this} to be above #{exp}', n);
}
}
Assertion.addMethod('most', assertMost);
Assertion.addMethod('lte', assertMost);
Assertion.addMethod('within', function (start, finish, msg) {
if (msg) flag(this, 'message', msg);
var obj = flag(this, 'object'), doLength = flag(this, 'doLength'), flagMsg = flag(this, 'message'), msgPrefix = (((flagMsg)) ? flagMsg + ': ' : ''), ssfi = flag(this, 'ssfi'), objType = _.type(obj).toLowerCase(), startType = _.type(start).toLowerCase(), finishType = _.type(finish).toLowerCase(), shouldThrow = true, range = ((startType === 'date' && finishType === 'date')) ? start.toUTCString() + '..' + finish.toUTCString() : start + '..' + finish;
if (doLength) {
new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
}
if (!doLength && (objType === 'date' && (startType !== 'date' || finishType !== 'date'))) {
errorMessage = msgPrefix + 'the arguments to within must be dates';
} else if ((startType !== 'number' || finishType !== 'number') && (doLength || objType === 'number')) {
errorMessage = msgPrefix + 'the arguments to within must be numbers';
} else if (!doLength && (objType !== 'date' && objType !== 'number')) {
var printObj = ((objType === 'string')) ? "'" + obj + "'" : obj;
errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
} else {
shouldThrow = false;
}
if (shouldThrow) {
throw new AssertionError(errorMessage, undefined, ssfi);
}
if (doLength) {
var len = obj.length;
this.assert(len >= start && len <= finish, 'expected #{this} to have a length within ' + range, 'expected #{this} to not have a length within ' + range);
} else {
this.assert(obj >= start && obj <= finish, 'expected #{this} to be within ' + range, 'expected #{this} to not be within ' + range);
}
});
function assertInstanceOf(constructor, msg) {
if (msg) flag(this, 'message', msg);
var target = flag(this, 'object');
var ssfi = flag(this, 'ssfi');
var flagMsg = flag(this, 'message');
try {
var isInstanceOf = target instanceof constructor;
} catch (err) {
if (err instanceof TypeError) {
flagMsg = flagMsg ? flagMsg + ': ' : '';
throw new AssertionError(flagMsg + 'The instanceof assertion needs a constructor but ' + _.type(constructor) + ' was given.', undefined, ssfi);
}
throw err;
}
var name = _.getName(constructor);
if (name === null) {
name = 'an unnamed constructor';
}
this.assert(isInstanceOf, 'expected #{this} to be an instance of ' + name, 'expected #{this} to not be an instance of ' + name);
}
;
Assertion.addMethod('instanceof', assertInstanceOf);
Assertion.addMethod('instanceOf', assertInstanceOf);
function assertProperty(name, val, msg) {
if (msg) flag(this, 'message', msg);
var isNested = flag(this, 'nested'), isOwn = flag(this, 'own'), flagMsg = flag(this, 'message'), obj = flag(this, 'object'), ssfi = flag(this, 'ssfi');
if (isNested && isOwn) {
flagMsg = flagMsg ? flagMsg + ': ' : '';
throw new AssertionError(flagMsg + 'The "nested" and "own" flags cannot be combined.', undefined, ssfi);
}
if (obj === null || obj === undefined) {
flagMsg = flagMsg ? flagMsg + ': ' : '';
throw new AssertionError(flagMsg + 'Target cannot be null or undefined.', undefined, ssfi);
}
var isDeep = flag(this, 'deep'), negate = flag(this, 'negate'), pathInfo = isNested ? _.getPathInfo(obj, name) : null, value = isNested ? pathInfo.value : obj[name];
var descriptor = '';
if (isDeep) descriptor += 'deep ';
if (isOwn) descriptor += 'own ';
if (isNested) descriptor += 'nested ';
descriptor += 'property ';
var hasProperty;
if (isOwn) hasProperty = Object.prototype.hasOwnProperty.call(obj, name); else if (isNested) hasProperty = pathInfo.exists; else hasProperty = _.hasProperty(obj, name);
if (!negate || arguments.length === 1) {
this.assert(hasProperty, 'expected #{this} to have ' + descriptor + _.inspect(name), 'expected #{this} to not have ' + descriptor + _.inspect(name));
}
if (arguments.length > 1) {
this.assert(hasProperty && (isDeep ? _.eql(val, value) : val === value), 'expected #{this} to have ' + descriptor + _.inspect(name) + ' of #{exp}, but got #{act}', 'expected #{this} to not have ' + descriptor + _.inspect(name) + ' of #{act}', val, value);
}
flag(this, 'object', value);
}
Assertion.addMethod('property', assertProperty);
function assertOwnProperty(name, value, msg) {
flag(this, 'own', true);
assertProperty.apply(this, arguments);
}
Assertion.addMethod('ownProperty', assertOwnProperty);
Assertion.addMethod('haveOwnProperty', assertOwnProperty);
function assertOwnPropertyDescriptor(name, descriptor, msg) {
if (typeof descriptor === 'string') {
msg = descriptor;
descriptor = null;
}
if (msg) flag(this, 'message', msg);
var obj = flag(this, 'object');
var actualDescriptor = Object.getOwnPropertyDescriptor(Object(obj), name);
if (actualDescriptor && descriptor) {
this.assert(_.eql(descriptor, actualDescriptor), 'expected the own property descriptor for ' + _.inspect(name) + ' on #{this} to match ' + _.inspect(descriptor) + ', got ' + _.inspect(actualDescriptor), 'expected the own property descriptor for ' + _.inspect(name) + ' on #{this} to not match ' + _.inspect(descriptor), descriptor, actualDescriptor, true);
} else {
this.assert(actualDescriptor, 'expected #{this} to have an own property descriptor for ' + _.inspect(name), 'expected #{this} to not have an own property descriptor for ' + _.inspect(name));
}
flag(this, 'object', actualDescriptor);
}
Assertion.addMethod('ownPropertyDescriptor', assertOwnPropertyDescriptor);
Assertion.addMethod('haveOwnPropertyDescriptor', assertOwnPropertyDescriptor);
function assertLengthChain() {
flag(this, 'doLength', true);
}
function assertLength(n, msg) {
if (msg) flag(this, 'message', msg);
var obj = flag(this, 'object'), flagMsg = flag(this, 'message'), ssfi = flag(this, 'ssfi');
new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
var len = obj.length;
this.assert(len == n, 'expected #{this} to have a length of #{exp} but got #{act}', 'expected #{this} to not have a length of #{act}', n, len);
}
Assertion.addChainableMethod('length', assertLength, assertLengthChain);
Assertion.addChainableMethod('lengthOf', assertLength, assertLengthChain);
function assertMatch(re, msg) {
if (msg) flag(this, 'message', msg);
var obj = flag(this, 'object');
this.assert(re.exec(obj), 'expected #{this} to match ' + re, 'expected #{this} not to match ' + re);
}
Assertion.addMethod('match', assertMatch);
Assertion.addMethod('matches', assertMatch);
Assertion.addMethod('string', function (str, msg) {
if (msg) flag(this, 'message', msg);
var obj = flag(this, 'object'), flagMsg = flag(this, 'message'), ssfi = flag(this, 'ssfi');
new Assertion(obj, flagMsg, ssfi, true).is.a('string');
this.assert(~obj.indexOf(str), 'expected #{this} to contain ' + _.inspect(str), 'expected #{this} to not contain ' + _.inspect(str));
});
function assertKeys(keys) {
var obj = flag(this, 'object'), objType = _.type(obj), keysType = _.type(keys), ssfi = flag(this, 'ssfi'), isDeep = flag(this, 'deep'), str, deepStr = '', ok = true, flagMsg = flag(this, 'message');
flagMsg = flagMsg ? flagMsg + ': ' : '';
var mixedArgsMsg = flagMsg + 'when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments';
if (objType === 'Map' || objType === 'Set') {
deepStr = isDeep ? 'deeply ' : '';
actual = [];
obj.forEach(function (val, key) {
actual.push(key);
});
if (keysType !== 'Array') {
keys = Array.prototype.slice.call(arguments);
}
} else {
actual = _.getOwnEnumerableProperties(obj);
switch (keysType) {
case 'Array':
if (arguments.length > 1) {
throw new AssertionError(mixedArgsMsg, undefined, ssfi);
}
break;
case 'Object':
if (arguments.length > 1) {
throw new AssertionError(mixedArgsMsg, undefined, ssfi);
}
keys = Object.keys(keys);
break;
default:
keys = Array.prototype.slice.call(arguments);
}
keys = keys.map(function (val) {
return typeof val === 'symbol' ? val : String(val);
});
}
if (!keys.length) {
throw new AssertionError(flagMsg + 'keys required', undefined, ssfi);
}
var len = keys.length, any = flag(this, 'any'), all = flag(this, 'all'), expected = keys, actual;
if (!any && !all) {
all = true;
}
if (any) {
ok = expected.some(function (expectedKey) {
return actual.some(function (actualKey) {
if (isDeep) {
return _.eql(expectedKey, actualKey);
} else {
return expectedKey === actualKey;
}
});
});
}
if (all) {
ok = expected.every(function (expectedKey) {
return actual.some(function (actualKey) {
if (isDeep) {
return _.eql(expectedKey, actualKey);
} else {
return expectedKey === actualKey;
}
});
});
if (!flag(this, 'contains')) {
ok = ok && keys.length == actual.length;
}
}
if (len > 1) {
keys = keys.map(function (key) {
return _.inspect(key);
});
var last = keys.pop();
if (all) {
str = keys.join(', ') + ', and ' + last;
}
if (any) {
str = keys.join(', ') + ', or ' + last;
}
} else {
str = _.inspect(keys[0]);
}
str = (len > 1 ? 'keys ' : 'key ') + str;
str = (flag(this, 'contains') ? 'contain ' : 'have ') + str;
this.assert(ok, 'expected #{this} to ' + deepStr + str, 'expected #{this} to not ' + deepStr + str, expected.slice(0).sort(_.compareByInspect), actual.sort(_.compareByInspect), true);
}
Assertion.addMethod('keys', assertKeys);
Assertion.addMethod('key', assertKeys);
function assertThrows(errorLike, errMsgMatcher, msg) {
if (msg) flag(this, 'message', msg);
var obj = flag(this, 'object'), ssfi = flag(this, 'ssfi'), flagMsg = flag(this, 'message'), negate = flag(this, 'negate') || false;
new Assertion(obj, flagMsg, ssfi, true).is.a('function');
if (errorLike instanceof RegExp || typeof errorLike === 'string') {
errMsgMatcher = errorLike;
errorLike = null;
}
var caughtErr;
try {
obj();
} catch (err) {
caughtErr = err;
}
var everyArgIsUndefined = errorLike === undefined && errMsgMatcher === undefined;
var everyArgIsDefined = Boolean(errorLike && errMsgMatcher);
var errorLikeFail = false;
var errMsgMatcherFail = false;
if (everyArgIsUndefined || !everyArgIsUndefined && !negate) {
var errorLikeString = 'an error';
if (errorLike instanceof Error) {
errorLikeString = '#{exp}';
} else if (errorLike) {
errorLikeString = _.checkError.getConstructorName(errorLike);
}
this.assert(caughtErr, 'expected #{this} to throw ' + errorLikeString, 'expected #{this} to not throw an error but #{act} was thrown', errorLike && errorLike.toString(), (caughtErr instanceof Error ? caughtErr.toString() : (typeof caughtErr === 'string' ? caughtErr : caughtErr && _.checkError.getConstructorName(caughtErr))));
}
if (errorLike && caughtErr) {
if (errorLike instanceof Error) {
var isCompatibleInstance = _.checkError.compatibleInstance(caughtErr, errorLike);
if (isCompatibleInstance === negate) {
if (everyArgIsDefined && negate) {
errorLikeFail = true;
} else {
this.assert(negate, 'expected #{this} to throw #{exp} but #{act} was thrown', 'expected #{this} to not throw #{exp}' + (caughtErr && !negate ? ' but #{act} was thrown' : ''), errorLike.toString(), caughtErr.toString());
}
}
}
var isCompatibleConstructor = _.checkError.compatibleConstructor(caughtErr, errorLike);
if (isCompatibleConstructor === negate) {
if (everyArgIsDefined && negate) {
errorLikeFail = true;
} else {
this.assert(negate, 'expected #{this} to throw #{exp} but #{act} was thrown', 'expected #{this} to not throw #{exp}' + (caughtErr ? ' but #{act} was thrown' : ''), (errorLike instanceof Error ? errorLike.toString() : errorLike && _.checkError.getConstructorName(errorLike)), (caughtErr instanceof Error ? caughtErr.toString() : caughtErr && _.checkError.getConstructorName(caughtErr)));
}
}
}
if (caughtErr && errMsgMatcher !== undefined && errMsgMatcher !== null) {
var placeholder = 'including';
if (errMsgMatcher instanceof RegExp) {
placeholder = 'matching';
}
var isCompatibleMessage = _.checkError.compatibleMessage(caughtErr, errMsgMatcher);
if (isCompatibleMessage === negate) {
if (everyArgIsDefined && negate) {
errMsgMatcherFail = true;
} else {
this.assert(negate, 'expected #{this} to throw error ' + placeholder + ' #{exp} but got #{act}', 'expected #{this} to throw error not ' + placeholder + ' #{exp}', errMsgMatcher, _.checkError.getMessage(caughtErr));
}
}
}
if (errorLikeFail && errMsgMatcherFail) {
this.assert(negate, 'expected #{this} to throw #{exp} but #{act} was thrown', 'expected #{this} to not throw #{exp}' + (caughtErr ? ' but #{act} was thrown' : ''), (errorLike instanceof Error ? errorLike.toString() : errorLike && _.checkError.getConstructorName(errorLike)), (caughtErr instanceof Error ? caughtErr.toString() : caughtErr && _.checkError.getConstructorName(caughtErr)));
}
flag(this, 'object', caughtErr);
}
;
Assertion.addMethod('throw', assertThrows);
Assertion.addMethod('throws', assertThrows);
Assertion.addMethod('Throw', assertThrows);
function respondTo(method, msg) {
if (msg) flag(this, 'message', msg);
var obj = flag(this, 'object'), itself = flag(this, 'itself'), context = (('function' === typeof obj && !itself)) ? obj.prototype[method] : obj[method];
this.assert('function' === typeof context, 'expected #{this} to respond to ' + _.inspect(method), 'expected #{this} to not respond to ' + _.inspect(method));
}
Assertion.addMethod('respondTo', respondTo);
Assertion.addMethod('respondsTo', respondTo);
Assertion.addProperty('itself', function () {
flag(this, 'itself', true);
});
function satisfy(matcher, msg) {
if (msg) flag(this, 'message', msg);
var obj = flag(this, 'object');
var result = matcher(obj);
this.assert(result, 'expected #{this} to satisfy ' + _.objDisplay(matcher), 'expected #{this} to not satisfy' + _.objDisplay(matcher), flag(this, 'negate') ? false : true, result);
}
Assertion.addMethod('satisfy', satisfy);
Assertion.addMethod('satisfies', satisfy);
function closeTo(expected, delta, msg) {
if (msg) flag(this, 'message', msg);
var obj = flag(this, 'object'), flagMsg = flag(this, 'message'), ssfi = flag(this, 'ssfi');
new Assertion(obj, flagMsg, ssfi, true).is.a('number');
if (typeof expected !== 'number' || typeof delta !== 'number') {
flagMsg = flagMsg ? flagMsg + ': ' : '';
throw new AssertionError(flagMsg + 'the arguments to closeTo or approximately must be numbers', undefined, ssfi);
}
this.assert(Math.abs(obj - expected) <= delta, 'expected #{this} to be close to ' + expected + ' +/- ' + delta, 'expected #{this} not to be close to ' + expected + ' +/- ' + delta);
}
Assertion.addMethod('closeTo', closeTo);
Assertion.addMethod('approximately', closeTo);
function isSubsetOf(subset, superset, cmp, contains, ordered) {
if (!contains) {
if (subset.length !== superset.length) return false;
superset = superset.slice();
}
return subset.every(function (elem, idx) {
if (ordered) return cmp ? cmp(elem, superset[idx]) : elem === superset[idx];
if (!cmp) {
var matchIdx = superset.indexOf(elem);
if (matchIdx === -1) return false;
if (!contains) superset.splice(matchIdx, 1);
return true;
}
return superset.some(function (elem2, matchIdx) {
if (!cmp(elem, elem2)) return false;
if (!contains) superset.splice(matchIdx, 1);
return true;
});
});
}
Assertion.addMethod('members', function (subset, msg) {
if (msg) flag(this, 'message', msg);
var obj = flag(this, 'object'), flagMsg = flag(this, 'message'), ssfi = flag(this, 'ssfi');
new Assertion(obj, flagMsg, ssfi, true).to.be.an('array');
new Assertion(subset, flagMsg, ssfi, true).to.be.an('array');
var contains = flag(this, 'contains');
var ordered = flag(this, 'ordered');
var subject, failMsg, failNegateMsg, lengthCheck;
if (contains) {
subject = ordered ? 'an ordered superset' : 'a superset';
failMsg = 'expected #{this} to be ' + subject + ' of #{exp}';
failNegateMsg = 'expected #{this} to not be ' + subject + ' of #{exp}';
} else {
subject = ordered ? 'ordered members' : 'members';
failMsg = 'expected #{this} to have the same ' + subject + ' as #{exp}';
failNegateMsg = 'expected #{this} to not have the same ' + subject + ' as #{exp}';
}
var cmp = flag(this, 'deep') ? _.eql : undefined;
this.assert(isSubsetOf(subset, obj, cmp, contains, ordered), failMsg, failNegateMsg, subset, obj, true);
});
function oneOf(list, msg) {
if (msg) flag(this, 'message', msg);
var expected = flag(this, 'object'), flagMsg = flag(this, 'message'), ssfi = flag(this, 'ssfi');
new Assertion(list, flagMsg, ssfi, true).to.be.an('array');
this.assert(list.indexOf(expected) > -1, 'expected #{this} to be one of #{exp}', 'expected #{this} to not be one of #{exp}', list, expected);
}
Assertion.addMethod('oneOf', oneOf);
function assertChanges(subject, prop, msg) {
if (msg) flag(this, 'message', msg);
var fn = flag(this, 'object'), flagMsg = flag(this, 'message'), ssfi = flag(this, 'ssfi');
new Assertion(fn, flagMsg, ssfi, true).is.a('function');
var initial;
if (!prop) {
new Assertion(subject, flagMsg, ssfi, true).is.a('function');
initial = subject();
} else {
new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
initial = subject[prop];
}
fn();
var final = prop === undefined || prop === null ? subject() : subject[prop];
var msgObj = prop === undefined || prop === null ? initial : '.' + prop;
flag(this, 'deltaMsgObj', msgObj);
flag(this, 'initialDeltaValue', initial);
flag(this, 'finalDeltaValue', final);
flag(this, 'deltaBehavior', 'change');
flag(this, 'realDelta', final !== initial);
this.assert(initial !== final, 'expected ' + msgObj + ' to change', 'expected ' + msgObj + ' to not change');
}
Assertion.addMethod('change', assertChanges);
Assertion.addMethod('changes', assertChanges);
function assertIncreases(subject, prop, msg) {
if (msg) flag(this, 'message', msg);
var fn = flag(this, 'object'), flagMsg = flag(this, 'message'), ssfi = flag(this, 'ssfi');
new Assertion(fn, flagMsg, ssfi, true).is.a('function');
var initial;
if (!prop) {
new Assertion(subject, flagMsg, ssfi, true).is.a('function');
initial = subject();
} else {
new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
initial = subject[prop];
}
new Assertion(initial, flagMsg, ssfi, true).is.a('number');
fn();
var final = prop === undefined || prop === null ? subject() : subject[prop];
var msgObj = prop === undefined || prop === null ? initial : '.' + prop;
flag(this, 'deltaMsgObj', msgObj);
flag(this, 'initialDeltaValue', initial);
flag(this, 'finalDeltaValue', final);
flag(this, 'deltaBehavior', 'increase');
flag(this, 'realDelta', final - initial);
this.assert(final - initial > 0, 'expected ' + msgObj + ' to increase', 'expected ' + msgObj + ' to not increase');
}
Assertion.addMethod('increase', assertIncreases);
Assertion.addMethod('increases', assertIncreases);
function assertDecreases(subject, prop, msg) {
if (msg) flag(this, 'message', msg);
var fn = flag(this, 'object'), flagMsg = flag(this, 'message'), ssfi = flag(this, 'ssfi');
new Assertion(fn, flagMsg, ssfi, true).is.a('function');
var initial;
if (!prop) {
new Assertion(subject, flagMsg, ssfi, true).is.a('function');
initial = subject();
} else {
new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
initial = subject[prop];
}
new Assertion(initial, flagMsg, ssfi, true).is.a('number');
fn();
var final = prop === undefined || prop === null ? subject() : subject[prop];
var msgObj = prop === undefined || prop === null ? initial : '.' + prop;
flag(this, 'deltaMsgObj', msgObj);
flag(this, 'initialDeltaValue', initial);
flag(this, 'finalDeltaValue', final);
flag(this, 'deltaBehavior', 'decrease');
flag(this, 'realDelta', initial - final);
this.assert(final - initial < 0, 'expected ' + msgObj + ' to decrease', 'expected ' + msgObj + ' to not decrease');
}
Assertion.addMethod('decrease', assertDecreases);
Assertion.addMethod('decreases', assertDecreases);
function assertDelta(delta, msg) {
if (msg) flag(this, 'message', msg);
var msgObj = flag(this, 'deltaMsgObj');
var initial = flag(this, 'initialDeltaValue');
var final = flag(this, 'finalDeltaValue');
var behavior = flag(this, 'deltaBehavior');
var realDelta = flag(this, 'realDelta');
var expression;
if (behavior === 'change') {
expression = Math.abs(final - initial) === Math.abs(delta);
} else {
expression = realDelta === Math.abs(delta);
}
this.assert(expression, 'expected ' + msgObj + ' to ' + behavior + ' by ' + delta, 'expected ' + msgObj + ' to not ' + behavior + ' by ' + delta);
}
Assertion.addMethod('by', assertDelta);
Assertion.addProperty('extensible', function () {
var obj = flag(this, 'object');
var isExtensible = obj === Object(obj) && Object.isExtensible(obj);
this.assert(isExtensible, 'expected #{this} to be extensible', 'expected #{this} to not be extensible');
});
Assertion.addProperty('sealed', function () {
var obj = flag(this, 'object');
var isSealed = obj === Object(obj) ? Object.isSealed(obj) : true;
this.assert(isSealed, 'expected #{this} to be sealed', 'expected #{this} to not be sealed');
});
Assertion.addProperty('frozen', function () {
var obj = flag(this, 'object');
var isFrozen = obj === Object(obj) ? Object.isFrozen(obj) : true;
this.assert(isFrozen, 'expected #{this} to be frozen', 'expected #{this} to not be frozen');
});
Assertion.addProperty('finite', function (msg) {
var obj = flag(this, 'object');
this.assert(typeof obj === "number" && isFinite(obj), 'expected #{this} to be a finite number', 'expected #{this} to not be a finite number');
});
};
return module.exports;
},
12: function (require, module, exports) {
module.exports = function (chai, util) {
chai.expect = function (val, message) {
return new chai.Assertion(val, message);
};
chai.expect.fail = function (actual, expected, message, operator) {
message = message || 'expect.fail()';
throw new chai.AssertionError(message, {
actual: actual,
expected: expected,
operator: operator
}, chai.expect.fail);
};
};
return module.exports;
},
13: function (require, module, exports) {
module.exports = function (chai, util) {
var Assertion = chai.Assertion;
function loadShould() {
function shouldGetter() {
if (this instanceof String || this instanceof Number || this instanceof Boolean || typeof Symbol === 'function' && this instanceof Symbol) {
return new Assertion(this.valueOf(), null, shouldGetter);
}
return new Assertion(this, null, shouldGetter);
}
function shouldSetter(value) {
Object.defineProperty(this, 'should', {
value: value,
enumerable: true,
configurable: true,
writable: true
});
}
Object.defineProperty(Object.prototype, 'should', {
set: shouldSetter,
get: shouldGetter,
configurable: true
});
var should = {};
should.fail = function (actual, expected, message, operator) {
message = message || 'should.fail()';
throw new chai.AssertionError(message, {
actual: actual,
expected: expected,
operator: operator
}, should.fail);
};
should.equal = function (val1, val2, msg) {
new Assertion(val1, msg).to.equal(val2);
};
should.Throw = function (fn, errt, errs, msg) {
new Assertion(fn, msg).to.Throw(errt, errs);
};
should.exist = function (val, msg) {
new Assertion(val, msg).to.exist;
};
should.not = {};
should.not.equal = function (val1, val2, msg) {
new Assertion(val1, msg).to.not.equal(val2);
};
should.not.Throw = function (fn, errt, errs, msg) {
new Assertion(fn, msg).to.not.Throw(errt, errs);
};
should.not.exist = function (val, msg) {
new Assertion(val, msg).to.not.exist;
};
should['throw'] = should['Throw'];
should.not['throw'] = should.not['Throw'];
return should;
}
;
chai.should = loadShould;
chai.Should = loadShould;
};
return module.exports;
},
14: function (require, module, exports) {
module.exports = function (chai, util) {
var Assertion = chai.Assertion, flag = util.flag;
var assert = chai.assert = function (express, errmsg) {
var test = new Assertion(null, null, chai.assert, true);
test.assert(express, errmsg, '[ negation message unavailable ]');
};
assert.fail = function (actual, expected, message, operator) {
message = message || 'assert.fail()';
throw new chai.AssertionError(message, {
actual: actual,
expected: expected,
operator: operator
}, assert.fail);
};
assert.isOk = function (val, msg) {
new Assertion(val, msg, assert.isOk, true).is.ok;
};
assert.isNotOk = function (val, msg) {
new Assertion(val, msg, assert.isNotOk, true).is.not.ok;
};
assert.equal = function (act, exp, msg) {
var test = new Assertion(act, msg, assert.equal, true);
test.assert(exp == flag(test, 'object'), 'expected #{this} to equal #{exp}', 'expected #{this} to not equal #{act}', exp, act, true);
};
assert.notEqual = function (act, exp, msg) {
var test = new Assertion(act, msg, assert.notEqual, true);
test.assert(exp != flag(test, 'object'), 'expected #{this} to not equal #{exp}', 'expected #{this} to equal #{act}', exp, act, true);
};
assert.strictEqual = function (act, exp, msg) {
new Assertion(act, msg, assert.strictEqual, true).to.equal(exp);
};
assert.notStrictEqual = function (act, exp, msg) {
new Assertion(act, msg, assert.notStrictEqual, true).to.not.equal(exp);
};
assert.deepEqual = assert.deepStrictEqual = function (act, exp, msg) {
new Assertion(act, msg, assert.deepEqual, true).to.eql(exp);
};
assert.notDeepEqual = function (act, exp, msg) {
new Assertion(act, msg, assert.notDeepEqual, true).to.not.eql(exp);
};
assert.isAbove = function (val, abv, msg) {
new Assertion(val, msg, assert.isAbove, true).to.be.above(abv);
};
assert.isAtLeast = function (val, atlst, msg) {
new Assertion(val, msg, assert.isAtLeast, true).to.be.least(atlst);
};
assert.isBelow = function (val, blw, msg) {
new Assertion(val, msg, assert.isBelow, true).to.be.below(blw);
};
assert.isAtMost = function (val, atmst, msg) {
new Assertion(val, msg, assert.isAtMost, true).to.be.most(atmst);
};
assert.isTrue = function (val, msg) {
new Assertion(val, msg, assert.isTrue, true).is['true'];
};
assert.isNotTrue = function (val, msg) {
new Assertion(val, msg, assert.isNotTrue, true).to.not.equal(true);
};
assert.isFalse = function (val, msg) {
new Assertion(val, msg, assert.isFalse, true).is['false'];
};
assert.isNotFalse = function (val, msg) {
new Assertion(val, msg, assert.isNotFalse, true).to.not.equal(false);
};
assert.isNull = function (val, msg) {
new Assertion(val, msg, assert.isNull, true).to.equal(null);
};
assert.isNotNull = function (val, msg) {
new Assertion(val, msg, assert.isNotNull, true).to.not.equal(null);
};
assert.isNaN = function (val, msg) {
new Assertion(val, msg, assert.isNaN, true).to.be.NaN;
};
assert.isNotNaN = function (val, msg) {
new Assertion(val, msg, assert.isNotNaN, true).not.to.be.NaN;
};
assert.exists = function (val, msg) {
new Assertion(val, msg, assert.exists, true).to.exist;
};
assert.notExists = function (val, msg) {
new Assertion(val, msg, assert.notExists, true).to.not.exist;
};
assert.isUndefined = function (val, msg) {
new Assertion(val, msg, assert.isUndefined, true).to.equal(undefined);
};
assert.isDefined = function (val, msg) {
new Assertion(val, msg, assert.isDefined, true).to.not.equal(undefined);
};
assert.isFunction = function (val, msg) {
new Assertion(val, msg, assert.isFunction, true).to.be.a('function');
};
assert.isNotFunction = function (val, msg) {
new Assertion(val, msg, assert.isNotFunction, true).to.not.be.a('function');
};
assert.isObject = function (val, msg) {
new Assertion(val, msg, assert.isObject, true).to.be.a('object');
};
assert.isNotObject = function (val, msg) {
new Assertion(val, msg, assert.isNotObject, true).to.not.be.a('object');
};
assert.isArray = function (val, msg) {
new Assertion(val, msg, assert.isArray, true).to.be.an('array');
};
assert.isNotArray = function (val, msg) {
new Assertion(val, msg, assert.isNotArray, true).to.not.be.an('array');
};
assert.isString = function (val, msg) {
new Assertion(val, msg, assert.isString, true).to.be.a('string');
};
assert.isNotString = function (val, msg) {
new Assertion(val, msg, assert.isNotString, true).to.not.be.a('string');
};
assert.isNumber = function (val, msg) {
new Assertion(val, msg, assert.isNumber, true).to.be.a('number');
};
assert.isNotNumber = function (val, msg) {
new Assertion(val, msg, assert.isNotNumber, true).to.not.be.a('number');
};
assert.isFinite = function (val, msg) {
new Assertion(val, msg, assert.isFinite, true).to.be.finite;
};
assert.isBoolean = function (val, msg) {
new Assertion(val, msg, assert.isBoolean, true).to.be.a('boolean');
};
assert.isNotBoolean = function (val, msg) {
new Assertion(val, msg, assert.isNotBoolean, true).to.not.be.a('boolean');
};
assert.typeOf = function (val, type, msg) {
new Assertion(val, msg, assert.typeOf, true).to.be.a(type);
};
assert.notTypeOf = function (val, type, msg) {
new Assertion(val, msg, assert.notTypeOf, true).to.not.be.a(type);
};
assert.instanceOf = function (val, type, msg) {
new Assertion(val, msg, assert.instanceOf, true).to.be.instanceOf(type);
};
assert.notInstanceOf = function (val, type, msg) {
new Assertion(val, msg, assert.notInstanceOf, true).to.not.be.instanceOf(type);
};
assert.include = function (exp, inc, msg) {
new Assertion(exp, msg, assert.include, true).include(inc);
};
assert.notInclude = function (exp, inc, msg) {
new Assertion(exp, msg, assert.notInclude, true).not.include(inc);
};
assert.deepInclude = function (exp, inc, msg) {
new Assertion(exp, msg, assert.deepInclude, true).deep.include(inc);
};
assert.notDeepInclude = function (exp, inc, msg) {
new Assertion(exp, msg, assert.notDeepInclude, true).not.deep.include(inc);
};
assert.nestedInclude = function (exp, inc, msg) {
new Assertion(exp, msg, assert.nestedInclude, true).nested.include(inc);
};
assert.notNestedInclude = function (exp, inc, msg) {
new Assertion(exp, msg, assert.notNestedInclude, true).not.nested.include(inc);
};
assert.deepNestedInclude = function (exp, inc, msg) {
new Assertion(exp, msg, assert.deepNestedInclude, true).deep.nested.include(inc);
};
assert.notDeepNestedInclude = function (exp, inc, msg) {
new Assertion(exp, msg, assert.notDeepNestedInclude, true).not.deep.nested.include(inc);
};
assert.ownInclude = function (exp, inc, msg) {
new Assertion(exp, msg, assert.ownInclude, true).own.include(inc);
};
assert.notOwnInclude = function (exp, inc, msg) {
new Assertion(exp, msg, assert.notOwnInclude, true).not.own.include(inc);
};
assert.deepOwnInclude = function (exp, inc, msg) {
new Assertion(exp, msg, assert.deepOwnInclude, true).deep.own.include(inc);
};
assert.notDeepOwnInclude = function (exp, inc, msg) {
new Assertion(exp, msg, assert.notDeepOwnInclude, true).not.deep.own.include(inc);
};
assert.match = function (exp, re, msg) {
new Assertion(exp, msg, assert.match, true).to.match(re);
};
assert.notMatch = function (exp, re, msg) {
new Assertion(exp, msg, assert.notMatch, true).to.not.match(re);
};
assert.property = function (obj, prop, msg) {
new Assertion(obj, msg, assert.property, true).to.have.property(prop);
};
assert.notProperty = function (obj, prop, msg) {
new Assertion(obj, msg, assert.notProperty, true).to.not.have.property(prop);
};
assert.propertyVal = function (obj, prop, val, msg) {
new Assertion(obj, msg, assert.propertyVal, true).to.have.property(prop, val);
};
assert.notPropertyVal = function (obj, prop, val, msg) {
new Assertion(obj, msg, assert.notPropertyVal, true).to.not.have.property(prop, val);
};
assert.deepPropertyVal = function (obj, prop, val, msg) {
new Assertion(obj, msg, assert.deepPropertyVal, true).to.have.deep.property(prop, val);
};
assert.notDeepPropertyVal = function (obj, prop, val, msg) {
new Assertion(obj, msg, assert.notDeepPropertyVal, true).to.not.have.deep.property(prop, val);
};
assert.ownProperty = function (obj, prop, msg) {
new Assertion(obj, msg, assert.ownProperty, true).to.have.own.property(prop);
};
assert.notOwnProperty = function (obj, prop, msg) {
new Assertion(obj, msg, assert.notOwnProperty, true).to.not.have.own.property(prop);
};
assert.ownPropertyVal = function (obj, prop, value, msg) {
new Assertion(obj, msg, assert.ownPropertyVal, true).to.have.own.property(prop, value);
};
assert.notOwnPropertyVal = function (obj, prop, value, msg) {
new Assertion(obj, msg, assert.notOwnPropertyVal, true).to.not.have.own.property(prop, value);
};
assert.deepOwnPropertyVal = function (obj, prop, value, msg) {
new Assertion(obj, msg, assert.deepOwnPropertyVal, true).to.have.deep.own.property(prop, value);
};
assert.notDeepOwnPropertyVal = function (obj, prop, value, msg) {
new Assertion(obj, msg, assert.notDeepOwnPropertyVal, true).to.not.have.deep.own.property(prop, value);
};
assert.nestedProperty = function (obj, prop, msg) {
new Assertion(obj, msg, assert.nestedProperty, true).to.have.nested.property(prop);
};
assert.notNestedProperty = function (obj, prop, msg) {
new Assertion(obj, msg, assert.notNestedProperty, true).to.not.have.nested.property(prop);
};
assert.nestedPropertyVal = function (obj, prop, val, msg) {
new Assertion(obj, msg, assert.nestedPropertyVal, true).to.have.nested.property(prop, val);
};
assert.notNestedPropertyVal = function (obj, prop, val, msg) {
new Assertion(obj, msg, assert.notNestedPropertyVal, true).to.not.have.nested.property(prop, val);
};
assert.deepNestedPropertyVal = function (obj, prop, val, msg) {
new Assertion(obj, msg, assert.deepNestedPropertyVal, true).to.have.deep.nested.property(prop, val);
};
assert.notDeepNestedPropertyVal = function (obj, prop, val, msg) {
new Assertion(obj, msg, assert.notDeepNestedPropertyVal, true).to.not.have.deep.nested.property(prop, val);
};
assert.lengthOf = function (exp, len, msg) {
new Assertion(exp, msg, assert.lengthOf, true).to.have.lengthOf(len);
};
assert.hasAnyKeys = function (obj, keys, msg) {
new Assertion(obj, msg, assert.hasAnyKeys, true).to.have.any.keys(keys);
};
assert.hasAllKeys = function (obj, keys, msg) {
new Assertion(obj, msg, assert.hasAllKeys, true).to.have.all.keys(keys);
};
assert.containsAllKeys = function (obj, keys, msg) {
new Assertion(obj, msg, assert.containsAllKeys, true).to.contain.all.keys(keys);
};
assert.doesNotHaveAnyKeys = function (obj, keys, msg) {
new Assertion(obj, msg, assert.doesNotHaveAnyKeys, true).to.not.have.any.keys(keys);
};
assert.doesNotHaveAllKeys = function (obj, keys, msg) {
new Assertion(obj, msg, assert.doesNotHaveAllKeys, true).to.not.have.all.keys(keys);
};
assert.hasAnyDeepKeys = function (obj, keys, msg) {
new Assertion(obj, msg, assert.hasAnyDeepKeys, true).to.have.any.deep.keys(keys);
};
assert.hasAllDeepKeys = function (obj, keys, msg) {
new Assertion(obj, msg, assert.hasAllDeepKeys, true).to.have.all.deep.keys(keys);
};
assert.containsAllDeepKeys = function (obj, keys, msg) {
new Assertion(obj, msg, assert.containsAllDeepKeys, true).to.contain.all.deep.keys(keys);
};
assert.doesNotHaveAnyDeepKeys = function (obj, keys, msg) {
new Assertion(obj, msg, assert.doesNotHaveAnyDeepKeys, true).to.not.have.any.deep.keys(keys);
};
assert.doesNotHaveAllDeepKeys = function (obj, keys, msg) {
new Assertion(obj, msg, assert.doesNotHaveAllDeepKeys, true).to.not.have.all.deep.keys(keys);
};
assert.throws = function (fn, errorLike, errMsgMatcher, msg) {
if ('string' === typeof errorLike || errorLike instanceof RegExp) {
errMsgMatcher = errorLike;
errorLike = null;
}
var assertErr = new Assertion(fn, msg, assert.throws, true).to.throw(errorLike, errMsgMatcher);
return flag(assertErr, 'object');
};
assert.doesNotThrow = function (fn, errorLike, errMsgMatcher, msg) {
if ('string' === typeof errorLike || errorLike instanceof RegExp) {
errMsgMatcher = errorLike;
errorLike = null;
}
new Assertion(fn, msg, assert.doesNotThrow, true).to.not.throw(errorLike, errMsgMatcher);
};
assert.operator = function (val, operator, val2, msg) {
var ok;
switch (operator) {
case '==':
ok = val == val2;
break;
case '===':
ok = val === val2;
break;
case '>':
ok = val > val2;
break;
case '>=':
ok = val >= val2;
break;
case '<':
ok = val < val2;
break;
case '<=':
ok = val <= val2;
break;
case '!=':
ok = val != val2;
break;
case '!==':
ok = val !== val2;
break;
default:
msg = msg ? msg + ': ' : msg;
throw new chai.AssertionError(msg + 'Invalid operator "' + operator + '"', undefined, assert.operator);
}
var test = new Assertion(ok, msg, assert.operator, true);
test.assert(true === flag(test, 'object'), 'expected ' + util.inspect(val) + ' to be ' + operator + ' ' + util.inspect(val2), 'expected ' + util.inspect(val) + ' to not be ' + operator + ' ' + util.inspect(val2));
};
assert.closeTo = function (act, exp, delta, msg) {
new Assertion(act, msg, assert.closeTo, true).to.be.closeTo(exp, delta);
};
assert.approximately = function (act, exp, delta, msg) {
new Assertion(act, msg, assert.approximately, true).to.be.approximately(exp, delta);
};
assert.sameMembers = function (set1, set2, msg) {
new Assertion(set1, msg, assert.sameMembers, true).to.have.same.members(set2);
};
assert.notSameMembers = function (set1, set2, msg) {
new Assertion(set1, msg, assert.notSameMembers, true).to.not.have.same.members(set2);
};
assert.sameDeepMembers = function (set1, set2, msg) {
new Assertion(set1, msg, assert.sameDeepMembers, true).to.have.same.deep.members(set2);
};
assert.notSameDeepMembers = function (set1, set2, msg) {
new Assertion(set1, msg, assert.notSameDeepMembers, true).to.not.have.same.deep.members(set2);
};
assert.sameOrderedMembers = function (set1, set2, msg) {
new Assertion(set1, msg, assert.sameOrderedMembers, true).to.have.same.ordered.members(set2);
};
assert.notSameOrderedMembers = function (set1, set2, msg) {
new Assertion(set1, msg, assert.notSameOrderedMembers, true).to.not.have.same.ordered.members(set2);
};
assert.sameDeepOrderedMembers = function (set1, set2, msg) {
new Assertion(set1, msg, assert.sameDeepOrderedMembers, true).to.have.same.deep.ordered.members(set2);
};
assert.notSameDeepOrderedMembers = function (set1, set2, msg) {
new Assertion(set1, msg, assert.notSameDeepOrderedMembers, true).to.not.have.same.deep.ordered.members(set2);
};
assert.includeMembers = function (superset, subset, msg) {
new Assertion(superset, msg, assert.includeMembers, true).to.include.members(subset);
};
assert.notIncludeMembers = function (superset, subset, msg) {
new Assertion(superset, msg, assert.notIncludeMembers, true).to.not.include.members(subset);
};
assert.includeDeepMembers = function (superset, subset, msg) {
new Assertion(superset, msg, assert.includeDeepMembers, true).to.include.deep.members(subset);
};
assert.notIncludeDeepMembers = function (superset, subset, msg) {
new Assertion(superset, msg, assert.notIncludeDeepMembers, true).to.not.include.deep.members(subset);
};
assert.includeOrderedMembers = function (superset, subset, msg) {
new Assertion(superset, msg, assert.includeOrderedMembers, true).to.include.ordered.members(subset);
};
assert.notIncludeOrderedMembers = function (superset, subset, msg) {
new Assertion(superset, msg, assert.notIncludeOrderedMembers, true).to.not.include.ordered.members(subset);
};
assert.includeDeepOrderedMembers = function (superset, subset, msg) {
new Assertion(superset, msg, assert.includeDeepOrderedMembers, true).to.include.deep.ordered.members(subset);
};
assert.notIncludeDeepOrderedMembers = function (superset, subset, msg) {
new Assertion(superset, msg, assert.notIncludeDeepOrderedMembers, true).to.not.include.deep.ordered.members(subset);
};
assert.oneOf = function (inList, list, msg) {
new Assertion(inList, msg, assert.oneOf, true).to.be.oneOf(list);
};
assert.changes = function (fn, obj, prop, msg) {
if (arguments.length === 3 && typeof obj === 'function') {
msg = prop;
prop = null;
}
new Assertion(fn, msg, assert.changes, true).to.change(obj, prop);
};
assert.changesBy = function (fn, obj, prop, delta, msg) {
if (arguments.length === 4 && typeof obj === 'function') {
var tmpMsg = delta;
delta = prop;
msg = tmpMsg;
} else if (arguments.length === 3) {
delta = prop;
prop = null;
}
new Assertion(fn, msg, assert.changesBy, true).to.change(obj, prop).by(delta);
};
assert.doesNotChange = function (fn, obj, prop, msg) {
if (arguments.length === 3 && typeof obj === 'function') {
msg = prop;
prop = null;
}
return new Assertion(fn, msg, assert.doesNotChange, true).to.not.change(obj, prop);
};
assert.changesButNotBy = function (fn, obj, prop, delta, msg) {
if (arguments.length === 4 && typeof obj === 'function') {
var tmpMsg = delta;
delta = prop;
msg = tmpMsg;
} else if (arguments.length === 3) {
delta = prop;
prop = null;
}
new Assertion(fn, msg, assert.changesButNotBy, true).to.change(obj, prop).but.not.by(delta);
};
assert.increases = function (fn, obj, prop, msg) {
if (arguments.length === 3 && typeof obj === 'function') {
msg = prop;
prop = null;
}
return new Assertion(fn, msg, assert.increases, true).to.increase(obj, prop);
};
assert.increasesBy = function (fn, obj, prop, delta, msg) {
if (arguments.length === 4 && typeof obj === 'function') {
var tmpMsg = delta;
delta = prop;
msg = tmpMsg;
} else if (arguments.length === 3) {
delta = prop;
prop = null;
}
new Assertion(fn, msg, assert.increasesBy, true).to.increase(obj, prop).by(delta);
};
assert.doesNotIncrease = function (fn, obj, prop, msg) {
if (arguments.length === 3 && typeof obj === 'function') {
msg = prop;
prop = null;
}
return new Assertion(fn, msg, assert.doesNotIncrease, true).to.not.increase(obj, prop);
};
assert.increasesButNotBy = function (fn, obj, prop, delta, msg) {
if (arguments.length === 4 && typeof obj === 'function') {
var tmpMsg = delta;
delta = prop;
msg = tmpMsg;
} else if (arguments.length === 3) {
delta = prop;
prop = null;
}
new Assertion(fn, msg, assert.increasesButNotBy, true).to.increase(obj, prop).but.not.by(delta);
};
assert.decreases = function (fn, obj, prop, msg) {
if (arguments.length === 3 && typeof obj === 'function') {
msg = prop;
prop = null;
}
return new Assertion(fn, msg, assert.decreases, true).to.decrease(obj, prop);
};
assert.decreasesBy = function (fn, obj, prop, delta, msg) {
if (arguments.length === 4 && typeof obj === 'function') {
var tmpMsg = delta;
delta = prop;
msg = tmpMsg;
} else if (arguments.length === 3) {
delta = prop;
prop = null;
}
new Assertion(fn, msg, assert.decreasesBy, true).to.decrease(obj, prop).by(delta);
};
assert.doesNotDecrease = function (fn, obj, prop, msg) {
if (arguments.length === 3 && typeof obj === 'function') {
msg = prop;
prop = null;
}
return new Assertion(fn, msg, assert.doesNotDecrease, true).to.not.decrease(obj, prop);
};
assert.doesNotDecreaseBy = function (fn, obj, prop, delta, msg) {
if (arguments.length === 4 && typeof obj === 'function') {
var tmpMsg = delta;
delta = prop;
msg = tmpMsg;
} else if (arguments.length === 3) {
delta = prop;
prop = null;
}
return new Assertion(fn, msg, assert.doesNotDecreaseBy, true).to.not.decrease(obj, prop).by(delta);
};
assert.decreasesButNotBy = function (fn, obj, prop, delta, msg) {
if (arguments.length === 4 && typeof obj === 'function') {
var tmpMsg = delta;
delta = prop;
msg = tmpMsg;
} else if (arguments.length === 3) {
delta = prop;
prop = null;
}
new Assertion(fn, msg, assert.decreasesButNotBy, true).to.decrease(obj, prop).but.not.by(delta);
};
assert.ifError = function (val) {
if (val) {
throw (val);
}
};
assert.isExtensible = function (obj, msg) {
new Assertion(obj, msg, assert.isExtensible, true).to.be.extensible;
};
assert.isNotExtensible = function (obj, msg) {
new Assertion(obj, msg, assert.isNotExtensible, true).to.not.be.extensible;
};
assert.isSealed = function (obj, msg) {
new Assertion(obj, msg, assert.isSealed, true).to.be.sealed;
};
assert.isNotSealed = function (obj, msg) {
new Assertion(obj, msg, assert.isNotSealed, true).to.not.be.sealed;
};
assert.isFrozen = function (obj, msg) {
new Assertion(obj, msg, assert.isFrozen, true).to.be.frozen;
};
assert.isNotFrozen = function (obj, msg) {
new Assertion(obj, msg, assert.isNotFrozen, true).to.not.be.frozen;
};
assert.isEmpty = function (val, msg) {
new Assertion(val, msg, assert.isEmpty, true).to.be.empty;
};
assert.isNotEmpty = function (val, msg) {
new Assertion(val, msg, assert.isNotEmpty, true).to.not.be.empty;
};
(function alias(name, as) {
assert[as] = assert[name];
return alias;
})('isOk', 'ok')('isNotOk', 'notOk')('throws', 'throw')('throws', 'Throw')('isExtensible', 'extensible')('isNotExtensible', 'notExtensible')('isSealed', 'sealed')('isNotSealed', 'notSealed')('isFrozen', 'frozen')('isNotFrozen', 'notFrozen')('isEmpty', 'empty')('isNotEmpty', 'notEmpty');
};
return module.exports;
},
15: function (require, module, exports) {
'use strict';
var getPrototypeOfExists = typeof Object.getPrototypeOf === 'function';
var promiseExists = typeof Promise === 'function';
var globalObject = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : self;
var isDom = ('location' in globalObject) && ('document' in globalObject);
var htmlElementExists = typeof HTMLElement !== 'undefined';
var isArrayExists = typeof Array.isArray === 'function';
var symbolExists = typeof Symbol !== 'undefined';
var mapExists = typeof Map !== 'undefined';
var setExists = typeof Set !== 'undefined';
var weakMapExists = typeof WeakMap !== 'undefined';
var weakSetExists = typeof WeakSet !== 'undefined';
var dataViewExists = typeof DataView !== 'undefined';
var symbolIteratorExists = symbolExists && typeof Symbol.iterator !== 'undefined';
var symbolToStringTagExists = symbolExists && typeof Symbol.toStringTag !== 'undefined';
var setEntriesExists = setExists && typeof Set.prototype.entries === 'function';
var mapEntriesExists = mapExists && typeof Map.prototype.entries === 'function';
var setIteratorPrototype = getPrototypeOfExists && setEntriesExists && Object.getPrototypeOf(new Set().entries());
var mapIteratorPrototype = getPrototypeOfExists && mapEntriesExists && Object.getPrototypeOf(new Map().entries());
var arrayIteratorExists = symbolIteratorExists && typeof Array.prototype[Symbol.iterator] === 'function';
var arrayIteratorPrototype = arrayIteratorExists && Object.getPrototypeOf([][Symbol.iterator]());
var stringIteratorExists = symbolIteratorExists && typeof Array.prototype[Symbol.iterator] === 'function';
var stringIteratorPrototype = stringIteratorExists && Object.getPrototypeOf(('')[Symbol.iterator]());
var toStringLeftSliceLength = 8;
var toStringRightSliceLength = -1;
module.exports = function typeDetect(obj) {
var typeofObj = typeof obj;
if (typeofObj !== 'object') {
return typeofObj;
}
if (obj === null) {
return 'null';
}
if (obj === globalObject) {
return 'global';
}
if (isArrayExists && Array.isArray(obj)) {
return 'Array';
}
if (isDom) {
if (obj === globalObject.location) {
return 'Location';
}
if (obj === globalObject.document) {
return 'Document';
}
if (obj === (globalObject.navigator || ({})).mimeTypes) {
return 'MimeTypeArray';
}
if (obj === (globalObject.navigator || ({})).plugins) {
return 'PluginArray';
}
if (htmlElementExists && obj instanceof HTMLElement && obj.tagName === 'BLOCKQUOTE') {
return 'HTMLQuoteElement';
}
if (htmlElementExists && obj instanceof HTMLElement && obj.tagName === 'TD') {
return 'HTMLTableDataCellElement';
}
if (htmlElementExists && obj instanceof HTMLElement && obj.tagName === 'TH') {
return 'HTMLTableHeaderCellElement';
}
}
var stringTag = (symbolToStringTagExists && obj[Symbol.toStringTag]);
if (typeof stringTag === 'string') {
return stringTag;
}
if (getPrototypeOfExists) {
var objPrototype = Object.getPrototypeOf(obj);
if (objPrototype === RegExp.prototype) {
return 'RegExp';
}
if (objPrototype === Date.prototype) {
return 'Date';
}
if (promiseExists && objPrototype === Promise.prototype) {
return 'Promise';
}
if (setExists && objPrototype === Set.prototype) {
return 'Set';
}
if (mapExists && objPrototype === Map.prototype) {
return 'Map';
}
if (weakSetExists && objPrototype === WeakSet.prototype) {
return 'WeakSet';
}
if (weakMapExists && objPrototype === WeakMap.prototype) {
return 'WeakMap';
}
if (dataViewExists && objPrototype === DataView.prototype) {
return 'DataView';
}
if (mapExists && objPrototype === mapIteratorPrototype) {
return 'Map Iterator';
}
if (setExists && objPrototype === setIteratorPrototype) {
return 'Set Iterator';
}
if (arrayIteratorExists && objPrototype === arrayIteratorPrototype) {
return 'Array Iterator';
}
if (stringIteratorExists && objPrototype === stringIteratorPrototype) {
return 'String Iterator';
}
if (objPrototype === null) {
return 'Object';
}
}
return Object.prototype.toString.call(obj).slice(toStringLeftSliceLength, toStringRightSliceLength);
};
module.exports.typeDetect = module.exports;
return module.exports;
},
16: function (require, module, exports) {
'use strict';
function hasProperty(obj, name) {
if (typeof obj === 'undefined' || obj === null) {
return false;
}
return (name in Object(obj));
}
function parsePath(path) {
var str = path.replace(/([^\\])\[/g, '$1.[');
var parts = str.match(/(\\\.|[^.]+?)+/g);
return parts.map(function mapMatches(value) {
var regexp = /^\[(\d+)\]$/;
var mArr = regexp.exec(value);
var parsed = null;
if (mArr) {
parsed = {
i: parseFloat(mArr[1])
};
} else {
parsed = {
p: value.replace(/\\([.\[\]])/g, '$1')
};
}
return parsed;
});
}
function internalGetPathValue(obj, parsed, pathDepth) {
var temporaryValue = obj;
var res = null;
pathDepth = (typeof pathDepth === 'undefined' ? parsed.length : pathDepth);
for (var i = 0; i < pathDepth; i++) {
var part = parsed[i];
if (temporaryValue) {
if (typeof part.p === 'undefined') {
temporaryValue = temporaryValue[part.i];
} else {
temporaryValue = temporaryValue[part.p];
}
if (i === (pathDepth - 1)) {
res = temporaryValue;
}
}
}
return res;
}
function internalSetPathValue(obj, val, parsed) {
var tempObj = obj;
var pathDepth = parsed.length;
var part = null;
for (var i = 0; i < pathDepth; i++) {
var propName = null;
var propVal = null;
part = parsed[i];
if (i === (pathDepth - 1)) {
propName = typeof part.p === 'undefined' ? part.i : part.p;
tempObj[propName] = val;
} else if (typeof part.p !== 'undefined' && tempObj[part.p]) {
tempObj = tempObj[part.p];
} else if (typeof part.i !== 'undefined' && tempObj[part.i]) {
tempObj = tempObj[part.i];
} else {
var next = parsed[i + 1];
propName = typeof part.p === 'undefined' ? part.i : part.p;
propVal = typeof next.p === 'undefined' ? [] : {};
tempObj[propName] = propVal;
tempObj = tempObj[propName];
}
}
}
function getPathInfo(obj, path) {
var parsed = parsePath(path);
var last = parsed[parsed.length - 1];
var info = {
parent: parsed.length > 1 ? internalGetPathValue(obj, parsed, parsed.length - 1) : obj,
name: last.p || last.i,
value: internalGetPathValue(obj, parsed)
};
info.exists = hasProperty(info.parent, info.name);
return info;
}
function getPathValue(obj, path) {
var info = getPathInfo(obj, path);
return info.value;
}
function setPathValue(obj, path, val) {
var parsed = parsePath(path);
internalSetPathValue(obj, val, parsed);
return obj;
}
module.exports = {
hasProperty: hasProperty,
getPathInfo: getPathInfo,
getPathValue: getPathValue,
setPathValue: setPathValue
};
return module.exports;
},
17: function (require, module, exports) {
var flag = require(23);
module.exports = function test(obj, args) {
var negate = flag(obj, 'negate'), expr = args[0];
return negate ? !expr : expr;
};
return module.exports;
},
18: function (require, module, exports) {
var AssertionError = require(7);
var flag = require(23);
var type = require(6);
module.exports = function expectTypes(obj, types) {
var flagMsg = flag(obj, 'message');
var ssfi = flag(obj, 'ssfi');
flagMsg = flagMsg ? flagMsg + ': ' : '';
obj = flag(obj, 'object');
types = types.map(function (t) {
return t.toLowerCase();
});
types.sort();
var str = types.map(function (t, index) {
var art = ~['a', 'e', 'i', 'o', 'u'].indexOf(t.charAt(0)) ? 'an' : 'a';
var or = types.length > 1 && index === types.length - 1 ? 'or ' : '';
return or + art + ' ' + t;
}).join(', ');
var objType = type(obj).toLowerCase();
if (!types.some(function (expected) {
return objType === expected;
})) {
throw new AssertionError(flagMsg + 'object tested must be ' + str + ', but ' + objType + ' given', undefined, ssfi);
}
};
return module.exports;
},
19: function (require, module, exports) {
var flag = require(23), getActual = require(20), inspect = require(21), objDisplay = require(22);
module.exports = function getMessage(obj, args) {
var negate = flag(obj, 'negate'), val = flag(obj, 'object'), expected = args[3], actual = getActual(obj, args), msg = negate ? args[2] : args[1], flagMsg = flag(obj, 'message');
if (typeof msg === "function") msg = msg();
msg = msg || '';
msg = msg.replace(/#\{this\}/g, function () {
return objDisplay(val);
}).replace(/#\{act\}/g, function () {
return objDisplay(actual);
}).replace(/#\{exp\}/g, function () {
return objDisplay(expected);
});
return flagMsg ? flagMsg + ': ' + msg : msg;
};
return module.exports;
},
20: function (require, module, exports) {
module.exports = function getActual(obj, args) {
return args.length > 4 ? args[4] : obj._obj;
};
return module.exports;
},
21: function (require, module, exports) {
var getName = require(26);
var getProperties = require(41);
var getEnumerableProperties = require(42);
var config = require(9);
module.exports = inspect;
function inspect(obj, showHidden, depth, colors) {
var ctx = {
showHidden: showHidden,
seen: [],
stylize: function (str) {
return str;
}
};
return formatValue(ctx, obj, (typeof depth === 'undefined' ? 2 : depth));
}
var isDOMElement = function (object) {
if (typeof HTMLElement === 'object') {
return object instanceof HTMLElement;
} else {
return object && typeof object === 'object' && ('nodeType' in object) && object.nodeType === 1 && typeof object.nodeName === 'string';
}
};
function formatValue(ctx, value, recurseTimes) {
if (value && typeof value.inspect === 'function' && value.inspect !== exports.inspect && !(value.constructor && value.constructor.prototype === value)) {
var ret = value.inspect(recurseTimes, ctx);
if (typeof ret !== 'string') {
ret = formatValue(ctx, ret, recurseTimes);
}
return ret;
}
var primitive = formatPrimitive(ctx, value);
if (primitive) {
return primitive;
}
if (isDOMElement(value)) {
if (('outerHTML' in value)) {
return value.outerHTML;
} else {
try {
if (document.xmlVersion) {
var xmlSerializer = new XMLSerializer();
return xmlSerializer.serializeToString(value);
} else {
var ns = "http://www.w3.org/1999/xhtml";
var container = document.createElementNS(ns, '_');
container.appendChild(value.cloneNode(false));
var html = container.innerHTML.replace('><', '>' + value.innerHTML + '<');
container.innerHTML = '';
return html;
}
} catch (err) {}
}
}
var visibleKeys = getEnumerableProperties(value);
var keys = ctx.showHidden ? getProperties(value) : visibleKeys;
var name, nameSuffix;
if (keys.length === 0 || (isError(value) && ((keys.length === 1 && keys[0] === 'stack') || (keys.length === 2 && keys[0] === 'description' && keys[1] === 'stack')))) {
if (typeof value === 'function') {
name = getName(value);
nameSuffix = name ? ': ' + name : '';
return ctx.stylize('[Function' + nameSuffix + ']', 'special');
}
if (isRegExp(value)) {
return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
}
if (isDate(value)) {
return ctx.stylize(Date.prototype.toUTCString.call(value), 'date');
}
if (isError(value)) {
return formatError(value);
}
}
var base = '', array = false, typedArray = false, braces = ['{', '}'];
if (isTypedArray(value)) {
typedArray = true;
braces = ['[', ']'];
}
if (isArray(value)) {
array = true;
braces = ['[', ']'];
}
if (typeof value === 'function') {
name = getName(value);
nameSuffix = name ? ': ' + name : '';
base = ' [Function' + nameSuffix + ']';
}
if (isRegExp(value)) {
base = ' ' + RegExp.prototype.toString.call(value);
}
if (isDate(value)) {
base = ' ' + Date.prototype.toUTCString.call(value);
}
if (isError(value)) {
return formatError(value);
}
if (keys.length === 0 && (!array || value.length == 0)) {
return braces[0] + base + braces[1];
}
if (recurseTimes < 0) {
if (isRegExp(value)) {
return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
} else {
return ctx.stylize('[Object]', 'special');
}
}
ctx.seen.push(value);
var output;
if (array) {
output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
} else if (typedArray) {
return formatTypedArray(value);
} else {
output = keys.map(function (key) {
return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
});
}
ctx.seen.pop();
return reduceToSingleString(output, base, braces);
}
function formatPrimitive(ctx, value) {
switch (typeof value) {
case 'undefined':
return ctx.stylize('undefined', 'undefined');
case 'string':
var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
return ctx.stylize(simple, 'string');
case 'number':
if (value === 0 && (1 / value) === -Infinity) {
return ctx.stylize('-0', 'number');
}
return ctx.stylize('' + value, 'number');
case 'boolean':
return ctx.stylize('' + value, 'boolean');
case 'symbol':
return ctx.stylize(value.toString(), 'symbol');
}
if (value === null) {
return ctx.stylize('null', 'null');
}
}
function formatError(value) {
return '[' + Error.prototype.toString.call(value) + ']';
}
function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
var output = [];
for (var i = 0, l = value.length; i < l; ++i) {
if (Object.prototype.hasOwnProperty.call(value, String(i))) {
output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
} else {
output.push('');
}
}
keys.forEach(function (key) {
if (!key.match(/^\d+$/)) {
output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
}
});
return output;
}
function formatTypedArray(value) {
var str = '[ ';
for (var i = 0; i < value.length; ++i) {
if (str.length >= config.truncateThreshold - 7) {
str += '...';
break;
}
str += value[i] + ', ';
}
str += ' ]';
if (str.indexOf(',  ]') !== -1) {
str = str.replace(',  ]', ' ]');
}
return str;
}
function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
var name;
var propDescriptor = Object.getOwnPropertyDescriptor(value, key);
var str;
if (propDescriptor) {
if (propDescriptor.get) {
if (propDescriptor.set) {
str = ctx.stylize('[Getter/Setter]', 'special');
} else {
str = ctx.stylize('[Getter]', 'special');
}
} else {
if (propDescriptor.set) {
str = ctx.stylize('[Setter]', 'special');
}
}
}
if (visibleKeys.indexOf(key) < 0) {
name = '[' + key + ']';
}
if (!str) {
if (ctx.seen.indexOf(value[key]) < 0) {
if (recurseTimes === null) {
str = formatValue(ctx, value[key], null);
} else {
str = formatValue(ctx, value[key], recurseTimes - 1);
}
if (str.indexOf('\n') > -1) {
if (array) {
str = str.split('\n').map(function (line) {
return '  ' + line;
}).join('\n').substr(2);
} else {
str = '\n' + str.split('\n').map(function (line) {
return '   ' + line;
}).join('\n');
}
}
} else {
str = ctx.stylize('[Circular]', 'special');
}
}
if (typeof name === 'undefined') {
if (array && key.match(/^\d+$/)) {
return str;
}
name = JSON.stringify('' + key);
if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
name = name.substr(1, name.length - 2);
name = ctx.stylize(name, 'name');
} else {
name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
name = ctx.stylize(name, 'string');
}
}
return name + ': ' + str;
}
function reduceToSingleString(output, base, braces) {
var numLinesEst = 0;
var length = output.reduce(function (prev, cur) {
numLinesEst++;
if (cur.indexOf('\n') >= 0) numLinesEst++;
return prev + cur.length + 1;
}, 0);
if (length > 60) {
return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
}
return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}
function isTypedArray(ar) {
return (typeof ar === 'object' && (/\w+Array]$/).test(objectToString(ar)));
}
function isArray(ar) {
return Array.isArray(ar) || (typeof ar === 'object' && objectToString(ar) === '[object Array]');
}
function isRegExp(re) {
return typeof re === 'object' && objectToString(re) === '[object RegExp]';
}
function isDate(d) {
return typeof d === 'object' && objectToString(d) === '[object Date]';
}
function isError(e) {
return typeof e === 'object' && objectToString(e) === '[object Error]';
}
function objectToString(o) {
return Object.prototype.toString.call(o);
}
return module.exports;
},
22: function (require, module, exports) {
var inspect = require(21);
var config = require(9);
module.exports = function objDisplay(obj) {
var str = inspect(obj), type = Object.prototype.toString.call(obj);
if (config.truncateThreshold && str.length >= config.truncateThreshold) {
if (type === '[object Function]') {
return !obj.name || obj.name === '' ? '[Function]' : '[Function: ' + obj.name + ']';
} else if (type === '[object Array]') {
return '[ Array(' + obj.length + ') ]';
} else if (type === '[object Object]') {
var keys = Object.keys(obj), kstr = keys.length > 2 ? keys.splice(0, 2).join(', ') + ', ...' : keys.join(', ');
return '{ Object (' + kstr + ') }';
} else {
return str;
}
} else {
return str;
}
};
return module.exports;
},
23: function (require, module, exports) {
module.exports = function flag(obj, key, value) {
var flags = obj.__flags || (obj.__flags = Object.create(null));
if (arguments.length === 3) {
flags[key] = value;
} else {
return flags[key];
}
};
return module.exports;
},
24: function (require, module, exports) {
module.exports = function transferFlags(assertion, object, includeAll) {
var flags = assertion.__flags || (assertion.__flags = Object.create(null));
if (!object.__flags) {
object.__flags = Object.create(null);
}
includeAll = arguments.length === 3 ? includeAll : true;
for (var flag in flags) {
if (includeAll || (flag !== 'object' && flag !== 'ssfi' && flag !== 'lockSsfi' && flag != 'message')) {
object.__flags[flag] = flags[flag];
}
}
};
return module.exports;
},
25: function (require, module, exports) {
'use strict';
var type = require(6);
function FakeMap() {
this._key = 'chai/deep-eql__' + Math.random() + Date.now();
}
FakeMap.prototype = {
get: function getMap(key) {
return key[this._key];
},
set: function setMap(key, value) {
if (!Object.isFrozen(key)) {
Object.defineProperty(key, this._key, {
value: value,
configurable: true
});
}
}
};
var MemoizeMap = typeof WeakMap === 'function' ? WeakMap : FakeMap;
function memoizeCompare(leftHandOperand, rightHandOperand, memoizeMap) {
if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
return null;
}
var leftHandMap = memoizeMap.get(leftHandOperand);
if (leftHandMap) {
var result = leftHandMap.get(rightHandOperand);
if (typeof result === 'boolean') {
return result;
}
}
return null;
}
function memoizeSet(leftHandOperand, rightHandOperand, memoizeMap, result) {
if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
return;
}
var leftHandMap = memoizeMap.get(leftHandOperand);
if (leftHandMap) {
leftHandMap.set(rightHandOperand, result);
} else {
leftHandMap = new MemoizeMap();
leftHandMap.set(rightHandOperand, result);
memoizeMap.set(leftHandOperand, leftHandMap);
}
}
module.exports = deepEqual;
module.exports.MemoizeMap = MemoizeMap;
function deepEqual(leftHandOperand, rightHandOperand, options) {
if (options && options.comparator) {
return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
}
var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
if (simpleResult !== null) {
return simpleResult;
}
return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
}
function simpleEqual(leftHandOperand, rightHandOperand) {
if (leftHandOperand === rightHandOperand) {
return leftHandOperand !== 0 || 1 / leftHandOperand === 1 / rightHandOperand;
}
if (leftHandOperand !== leftHandOperand && rightHandOperand !== rightHandOperand) {
return true;
}
if (isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
return false;
}
return null;
}
function extensiveDeepEqual(leftHandOperand, rightHandOperand, options) {
options = options || ({});
options.memoize = options.memoize === false ? false : options.memoize || new MemoizeMap();
var comparator = options && options.comparator;
var memoizeResultLeft = memoizeCompare(leftHandOperand, rightHandOperand, options.memoize);
if (memoizeResultLeft !== null) {
return memoizeResultLeft;
}
var memoizeResultRight = memoizeCompare(rightHandOperand, leftHandOperand, options.memoize);
if (memoizeResultRight !== null) {
return memoizeResultRight;
}
if (comparator) {
var comparatorResult = comparator(leftHandOperand, rightHandOperand);
if (comparatorResult === false || comparatorResult === true) {
memoizeSet(leftHandOperand, rightHandOperand, options.memoize, comparatorResult);
return comparatorResult;
}
var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
if (simpleResult !== null) {
return simpleResult;
}
}
var leftHandType = type(leftHandOperand);
if (leftHandType !== type(rightHandOperand)) {
memoizeSet(leftHandOperand, rightHandOperand, options.memoize, false);
return false;
}
memoizeSet(leftHandOperand, rightHandOperand, options.memoize, true);
var result = extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options);
memoizeSet(leftHandOperand, rightHandOperand, options.memoize, result);
return result;
}
function extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options) {
switch (leftHandType) {
case 'String':
case 'Number':
case 'Boolean':
case 'Date':
return deepEqual(leftHandOperand.valueOf(), rightHandOperand.valueOf());
case 'Promise':
case 'Symbol':
case 'function':
case 'WeakMap':
case 'WeakSet':
case 'Error':
return leftHandOperand === rightHandOperand;
case 'Arguments':
case 'Int8Array':
case 'Uint8Array':
case 'Uint8ClampedArray':
case 'Int16Array':
case 'Uint16Array':
case 'Int32Array':
case 'Uint32Array':
case 'Float32Array':
case 'Float64Array':
case 'Array':
return iterableEqual(leftHandOperand, rightHandOperand, options);
case 'RegExp':
return regexpEqual(leftHandOperand, rightHandOperand);
case 'Generator':
return generatorEqual(leftHandOperand, rightHandOperand, options);
case 'DataView':
return iterableEqual(new Uint8Array(leftHandOperand.buffer), new Uint8Array(rightHandOperand.buffer), options);
case 'ArrayBuffer':
return iterableEqual(new Uint8Array(leftHandOperand), new Uint8Array(rightHandOperand), options);
case 'Set':
return entriesEqual(leftHandOperand, rightHandOperand, options);
case 'Map':
return entriesEqual(leftHandOperand, rightHandOperand, options);
default:
return objectEqual(leftHandOperand, rightHandOperand, options);
}
}
function regexpEqual(leftHandOperand, rightHandOperand) {
return leftHandOperand.toString() === rightHandOperand.toString();
}
function entriesEqual(leftHandOperand, rightHandOperand, options) {
if (leftHandOperand.size !== rightHandOperand.size) {
return false;
}
if (leftHandOperand.size === 0) {
return true;
}
var leftHandItems = [];
var rightHandItems = [];
leftHandOperand.forEach(function gatherEntries(key, value) {
leftHandItems.push([key, value]);
});
rightHandOperand.forEach(function gatherEntries(key, value) {
rightHandItems.push([key, value]);
});
return iterableEqual(leftHandItems.sort(), rightHandItems.sort(), options);
}
function iterableEqual(leftHandOperand, rightHandOperand, options) {
var length = leftHandOperand.length;
if (length !== rightHandOperand.length) {
return false;
}
if (length === 0) {
return true;
}
var index = -1;
while (++index < length) {
if (deepEqual(leftHandOperand[index], rightHandOperand[index], options) === false) {
return false;
}
}
return true;
}
function generatorEqual(leftHandOperand, rightHandOperand, options) {
return iterableEqual(getGeneratorEntries(leftHandOperand), getGeneratorEntries(rightHandOperand), options);
}
function hasIteratorFunction(target) {
return typeof Symbol !== 'undefined' && typeof target === 'object' && typeof Symbol.iterator !== 'undefined' && typeof target[Symbol.iterator] === 'function';
}
function getIteratorEntries(target) {
if (hasIteratorFunction(target)) {
try {
return getGeneratorEntries(target[Symbol.iterator]());
} catch (iteratorError) {
return [];
}
}
return [];
}
function getGeneratorEntries(generator) {
var generatorResult = generator.next();
var accumulator = [generatorResult.value];
while (generatorResult.done === false) {
generatorResult = generator.next();
accumulator.push(generatorResult.value);
}
return accumulator;
}
function getEnumerableKeys(target) {
var keys = [];
for (var key in target) {
keys.push(key);
}
return keys;
}
function keysEqual(leftHandOperand, rightHandOperand, keys, options) {
var length = keys.length;
if (length === 0) {
return true;
}
for (var i = 0; i < length; i += 1) {
if (deepEqual(leftHandOperand[keys[i]], rightHandOperand[keys[i]], options) === false) {
return false;
}
}
return true;
}
function objectEqual(leftHandOperand, rightHandOperand, options) {
var leftHandKeys = getEnumerableKeys(leftHandOperand);
var rightHandKeys = getEnumerableKeys(rightHandOperand);
if (leftHandKeys.length && leftHandKeys.length === rightHandKeys.length) {
leftHandKeys.sort();
rightHandKeys.sort();
if (iterableEqual(leftHandKeys, rightHandKeys) === false) {
return false;
}
return keysEqual(leftHandOperand, rightHandOperand, leftHandKeys, options);
}
var leftHandEntries = getIteratorEntries(leftHandOperand);
var rightHandEntries = getIteratorEntries(rightHandOperand);
if (leftHandEntries.length && leftHandEntries.length === rightHandEntries.length) {
leftHandEntries.sort();
rightHandEntries.sort();
return iterableEqual(leftHandEntries, rightHandEntries, options);
}
if (leftHandKeys.length === 0 && leftHandEntries.length === 0 && rightHandKeys.length === 0 && rightHandEntries.length === 0) {
return true;
}
return false;
}
function isPrimitive(value) {
return value === null || typeof value !== 'object';
}
return module.exports;
},
26: function (require, module, exports) {
'use strict';
var toString = Function.prototype.toString;
var functionNameMatch = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\s\(\/]+)/;
function getFuncName(aFunc) {
if (typeof aFunc !== 'function') {
return null;
}
var name = '';
if (typeof Function.prototype.name === 'undefined' && typeof aFunc.name === 'undefined') {
var match = toString.call(aFunc).match(functionNameMatch);
if (match) {
name = match[1];
}
} else {
name = aFunc.name;
}
return name;
}
module.exports = getFuncName;
return module.exports;
},
27: function (require, module, exports) {
var chai = require(4);
var flag = require(23);
var isProxyEnabled = require(39);
var transferFlags = require(24);
module.exports = function addProperty(ctx, name, getter) {
getter = getter === undefined ? function () {} : getter;
Object.defineProperty(ctx, name, {
get: function propertyGetter() {
if (!isProxyEnabled() && !flag(this, 'lockSsfi')) {
flag(this, 'ssfi', propertyGetter);
}
var result = getter.call(this);
if (result !== undefined) return result;
var newAssertion = new chai.Assertion();
transferFlags(this, newAssertion);
return newAssertion;
},
configurable: true
});
};
return module.exports;
},
28: function (require, module, exports) {
var addLengthGuard = require(38);
var chai = require(4);
var flag = require(23);
var proxify = require(37);
var transferFlags = require(24);
module.exports = function addMethod(ctx, name, method) {
var methodWrapper = function () {
if (!flag(this, 'lockSsfi')) {
flag(this, 'ssfi', methodWrapper);
}
var result = method.apply(this, arguments);
if (result !== undefined) return result;
var newAssertion = new chai.Assertion();
transferFlags(this, newAssertion);
return newAssertion;
};
addLengthGuard(methodWrapper, name, false);
ctx[name] = proxify(methodWrapper, name);
};
return module.exports;
},
29: function (require, module, exports) {
var chai = require(4);
var flag = require(23);
var isProxyEnabled = require(39);
var transferFlags = require(24);
module.exports = function overwriteProperty(ctx, name, getter) {
var _get = Object.getOwnPropertyDescriptor(ctx, name), _super = function () {};
if (_get && 'function' === typeof _get.get) _super = _get.get;
Object.defineProperty(ctx, name, {
get: function overwritingPropertyGetter() {
if (!isProxyEnabled() && !flag(this, 'lockSsfi')) {
flag(this, 'ssfi', overwritingPropertyGetter);
}
var origLockSsfi = flag(this, 'lockSsfi');
flag(this, 'lockSsfi', true);
var result = getter(_super).call(this);
flag(this, 'lockSsfi', origLockSsfi);
if (result !== undefined) {
return result;
}
var newAssertion = new chai.Assertion();
transferFlags(this, newAssertion);
return newAssertion;
},
configurable: true
});
};
return module.exports;
},
30: function (require, module, exports) {
var addLengthGuard = require(38);
var chai = require(4);
var flag = require(23);
var proxify = require(37);
var transferFlags = require(24);
module.exports = function overwriteMethod(ctx, name, method) {
var _method = ctx[name], _super = function () {
throw new Error(name + ' is not a function');
};
if (_method && 'function' === typeof _method) _super = _method;
var overwritingMethodWrapper = function () {
if (!flag(this, 'lockSsfi')) {
flag(this, 'ssfi', overwritingMethodWrapper);
}
var origLockSsfi = flag(this, 'lockSsfi');
flag(this, 'lockSsfi', true);
var result = method(_super).apply(this, arguments);
flag(this, 'lockSsfi', origLockSsfi);
if (result !== undefined) {
return result;
}
var newAssertion = new chai.Assertion();
transferFlags(this, newAssertion);
return newAssertion;
};
addLengthGuard(overwritingMethodWrapper, name, false);
ctx[name] = proxify(overwritingMethodWrapper, name);
};
return module.exports;
},
31: function (require, module, exports) {
var addLengthGuard = require(38);
var chai = require(4);
var flag = require(23);
var proxify = require(37);
var transferFlags = require(24);
var canSetPrototype = typeof Object.setPrototypeOf === 'function';
var testFn = function () {};
var excludeNames = Object.getOwnPropertyNames(testFn).filter(function (name) {
var propDesc = Object.getOwnPropertyDescriptor(testFn, name);
if (typeof propDesc !== 'object') return true;
return !propDesc.configurable;
});
var call = Function.prototype.call, apply = Function.prototype.apply;
module.exports = function addChainableMethod(ctx, name, method, chainingBehavior) {
if (typeof chainingBehavior !== 'function') {
chainingBehavior = function () {};
}
var chainableBehavior = {
method: method,
chainingBehavior: chainingBehavior
};
if (!ctx.__methods) {
ctx.__methods = {};
}
ctx.__methods[name] = chainableBehavior;
Object.defineProperty(ctx, name, {
get: function chainableMethodGetter() {
chainableBehavior.chainingBehavior.call(this);
var chainableMethodWrapper = function () {
if (!flag(this, 'lockSsfi')) {
flag(this, 'ssfi', chainableMethodWrapper);
}
var result = chainableBehavior.method.apply(this, arguments);
if (result !== undefined) {
return result;
}
var newAssertion = new chai.Assertion();
transferFlags(this, newAssertion);
return newAssertion;
};
addLengthGuard(chainableMethodWrapper, name, true);
if (canSetPrototype) {
var prototype = Object.create(this);
prototype.call = call;
prototype.apply = apply;
Object.setPrototypeOf(chainableMethodWrapper, prototype);
} else {
var asserterNames = Object.getOwnPropertyNames(ctx);
asserterNames.forEach(function (asserterName) {
if (excludeNames.indexOf(asserterName) !== -1) {
return;
}
var pd = Object.getOwnPropertyDescriptor(ctx, asserterName);
Object.defineProperty(chainableMethodWrapper, asserterName, pd);
});
}
transferFlags(this, chainableMethodWrapper);
return proxify(chainableMethodWrapper);
},
configurable: true
});
};
return module.exports;
},
32: function (require, module, exports) {
var chai = require(4);
var transferFlags = require(24);
module.exports = function overwriteChainableMethod(ctx, name, method, chainingBehavior) {
var chainableBehavior = ctx.__methods[name];
var _chainingBehavior = chainableBehavior.chainingBehavior;
chainableBehavior.chainingBehavior = function overwritingChainableMethodGetter() {
var result = chainingBehavior(_chainingBehavior).call(this);
if (result !== undefined) {
return result;
}
var newAssertion = new chai.Assertion();
transferFlags(this, newAssertion);
return newAssertion;
};
var _method = chainableBehavior.method;
chainableBehavior.method = function overwritingChainableMethodWrapper() {
var result = method(_method).apply(this, arguments);
if (result !== undefined) {
return result;
}
var newAssertion = new chai.Assertion();
transferFlags(this, newAssertion);
return newAssertion;
};
};
return module.exports;
},
33: function (require, module, exports) {
var inspect = require(21);
module.exports = function compareByInspect(a, b) {
return inspect(a) < inspect(b) ? -1 : 1;
};
return module.exports;
},
34: function (require, module, exports) {
module.exports = function getOwnEnumerablePropertySymbols(obj) {
if (typeof Object.getOwnPropertySymbols !== 'function') return [];
return Object.getOwnPropertySymbols(obj).filter(function (sym) {
return Object.getOwnPropertyDescriptor(obj, sym).enumerable;
});
};
return module.exports;
},
35: function (require, module, exports) {
var getOwnEnumerablePropertySymbols = require(34);
module.exports = function getOwnEnumerableProperties(obj) {
return Object.keys(obj).concat(getOwnEnumerablePropertySymbols(obj));
};
return module.exports;
},
36: function (require, module, exports) {
'use strict';
function compatibleInstance(thrown, errorLike) {
return errorLike instanceof Error && thrown === errorLike;
}
function compatibleConstructor(thrown, errorLike) {
if (errorLike instanceof Error) {
return thrown.constructor === errorLike.constructor || thrown instanceof errorLike.constructor;
} else if (errorLike.prototype instanceof Error || errorLike === Error) {
return thrown.constructor === errorLike || thrown instanceof errorLike;
}
return false;
}
function compatibleMessage(thrown, errMatcher) {
var comparisonString = typeof thrown === 'string' ? thrown : thrown.message;
if (errMatcher instanceof RegExp) {
return errMatcher.test(comparisonString);
} else if (typeof errMatcher === 'string') {
return comparisonString.indexOf(errMatcher) !== -1;
}
return false;
}
var functionNameMatch = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\(\/]+)/;
function getFunctionName(constructorFn) {
var name = '';
if (typeof constructorFn.name === 'undefined') {
var match = String(constructorFn).match(functionNameMatch);
if (match) {
name = match[1];
}
} else {
name = constructorFn.name;
}
return name;
}
function getConstructorName(errorLike) {
var constructorName = errorLike;
if (errorLike instanceof Error) {
constructorName = getFunctionName(errorLike.constructor);
} else if (typeof errorLike === 'function') {
constructorName = getFunctionName(errorLike).trim() || getFunctionName(new errorLike());
}
return constructorName;
}
function getMessage(errorLike) {
var msg = '';
if (errorLike && errorLike.message) {
msg = errorLike.message;
} else if (typeof errorLike === 'string') {
msg = errorLike;
}
return msg;
}
module.exports = {
compatibleInstance: compatibleInstance,
compatibleConstructor: compatibleConstructor,
compatibleMessage: compatibleMessage,
getMessage: getMessage,
getConstructorName: getConstructorName
};
return module.exports;
},
37: function (require, module, exports) {
var config = require(9);
var flag = require(23);
var getProperties = require(41);
var isProxyEnabled = require(39);
var builtins = ['__flags', '__methods', '_obj', 'assert'];
module.exports = function proxify(obj, nonChainableMethodName) {
if (!isProxyEnabled()) return obj;
return new Proxy(obj, {
get: function proxyGetter(target, property) {
if (typeof property === 'string' && config.proxyExcludedKeys.indexOf(property) === -1 && !Reflect.has(target, property)) {
if (nonChainableMethodName) {
throw Error('Invalid Chai property: ' + nonChainableMethodName + '.' + property + '. See docs for proper usage of "' + nonChainableMethodName + '".');
}
var orderedProperties = getProperties(target).filter(function (property) {
return !Object.prototype.hasOwnProperty(property) && builtins.indexOf(property) === -1;
}).sort(function (a, b) {
return stringDistance(property, a) - stringDistance(property, b);
});
if (orderedProperties.length && stringDistance(orderedProperties[0], property) < 4) {
throw Error('Invalid Chai property: ' + property + '. Did you mean "' + orderedProperties[0] + '"?');
} else {
throw Error('Invalid Chai property: ' + property);
}
}
if (builtins.indexOf(property) === -1 && !flag(target, 'lockSsfi')) {
flag(target, 'ssfi', proxyGetter);
}
return Reflect.get(target, property);
}
});
};
function stringDistance(strA, strB, memo) {
if (!memo) {
memo = [];
for (var i = 0; i <= strA.length; i++) {
memo[i] = [];
}
}
if (!memo[strA.length] || !memo[strA.length][strB.length]) {
if (strA.length === 0 || strB.length === 0) {
memo[strA.length][strB.length] = Math.max(strA.length, strB.length);
} else {
memo[strA.length][strB.length] = Math.min(stringDistance(strA.slice(0, -1), strB, memo) + 1, stringDistance(strA, strB.slice(0, -1), memo) + 1, stringDistance(strA.slice(0, -1), strB.slice(0, -1), memo) + (strA.slice(-1) === strB.slice(-1) ? 0 : 1));
}
}
return memo[strA.length][strB.length];
}
return module.exports;
},
38: function (require, module, exports) {
var config = require(9);
var fnLengthDesc = Object.getOwnPropertyDescriptor(function () {}, 'length');
module.exports = function addLengthGuard(fn, assertionName, isChainable) {
if (!fnLengthDesc.configurable) return fn;
Object.defineProperty(fn, 'length', {
get: function () {
if (isChainable) {
throw Error('Invalid Chai property: ' + assertionName + '.length. Due' + ' to a compatibility issue, "length" cannot directly follow "' + assertionName + '". Use "' + assertionName + '.lengthOf" instead.');
}
throw Error('Invalid Chai property: ' + assertionName + '.length. See' + ' docs for proper usage of "' + assertionName + '".');
}
});
return fn;
};
return module.exports;
},
39: function (require, module, exports) {
var config = require(9);
module.exports = function isProxyEnabled() {
return config.useProxy && typeof Proxy !== 'undefined' && typeof Reflect !== 'undefined';
};
return module.exports;
},
40: function (require, module, exports) {
function isNaN(value) {
return value !== value;
}
module.exports = Number.isNaN || isNaN;
return module.exports;
},
41: function (require, module, exports) {
module.exports = function getProperties(object) {
var result = Object.getOwnPropertyNames(object);
function addProperty(property) {
if (result.indexOf(property) === -1) {
result.push(property);
}
}
var proto = Object.getPrototypeOf(object);
while (proto !== null) {
Object.getOwnPropertyNames(proto).forEach(addProperty);
proto = Object.getPrototypeOf(proto);
}
return result;
};
return module.exports;
},
42: function (require, module, exports) {
module.exports = function getEnumerableProperties(object) {
var result = [];
for (var name in object) {
result.push(name);
}
return result;
};
return module.exports;
}
}, this);
return require(0);
}).call(this, null, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : this);
