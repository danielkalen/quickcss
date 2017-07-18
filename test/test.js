var divs, expect, i, resetDivs, should, styles;

mocha.setup('tdd');

mocha.slow(400);

mocha.timeout(12000);

mocha.bail();

expect = chai.expect;

should = chai.should();

divs = $(((function() {
  var j, results;
  results = [];
  for (i = j = 1; j <= 3; i = ++j) {
    results.push('<div />');
  }
  return results;
})()).join('')).appendTo('body');

styles = divs.toArray().map(function(div) {
  return getComputedStyle(div);
});

this.Css = window.quickcss;

resetDivs = function() {
  var div, j, len;
  for (j = 0, len = divs.length; j < len; j++) {
    div = divs[j];
    div.removeAttribute('style');
    div.style.width = '40px';
    div.style.height = '40px';
    div.style.backgroundColor = 'blue';
  }
};

suite("QuickCss", function() {
  setup(resetDivs);
  suiteTeardown(resetDivs);
  test("Apply Basic Styles", function() {
    Css(divs[0], 'width', '10px');
    expect(styles[0].width).to.equal('10px');
    Css(divs[1], 'width', '50vw');
    expect(divs[1].style.width).to.equal('50vw');
    return expect(Math.round(parseFloat(styles[0].width))).not.to.equal(40);
  });
  test("Suffix unit-less values for length properties", function() {
    Css(divs[0], 'width', '10');
    Css(divs[1], 'width', 10);
    Css(divs[2], 'width', '10%');
    expect(divs[0].style.width).to.equal('10px');
    expect(divs[1].style.width).to.equal('10px');
    expect(divs[2].style.width).to.equal('10%');
    expect(styles[0].width).to.equal('10px');
    expect(styles[1].width).to.equal('10px');
    return expect(Math.round(parseFloat(styles[2].width))).not.to.equal(40);
  });
  test("Suffix won't be added for unit-less values on non-length properties", function() {
    Css(divs[0], 'width', 'auto');
    expect(divs[0].style.width).to.equal('auto');
    expect(Math.round(parseFloat(styles[0].width))).not.to.equal(40);
    Css(divs[1], 'opacity', .5);
    expect(divs[1].style.opacity).to.equal('0.5');
    return expect(styles[1].opacity).to.equal('0.5');
  });
  test("An iterable collection of elements can be passed", function() {
    Css(divs, 'width', 15);
    expect(divs[0].style.width).to.equal('15px');
    expect(divs[1].style.width).to.equal('15px');
    return expect(divs[2].style.width).to.equal('15px');
  });
  test("A style object can be passed", function() {
    Css(divs[0], {
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
  test("An iterable collection of elements can be passed along with a style object", function() {
    Css(divs, {
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
  test("Kebab-cased/camel-cased properties will be normalized", function() {
    Css(divs[0], 'margin-top', '10px');
    expect(divs[0].style.marginTop).to.equal('10px');
    expect(styles[0].marginTop).to.equal('10px');
    Css(divs[0], 'marginBottom', '12px');
    expect(divs[0].style.marginBottom).to.equal('12px');
    return expect(styles[0].marginBottom).to.equal('12px');
  });
  test("Invalid properties will be ignored", function() {
    Css(divs[1], 'topMargin', '25px');
    expect(divs[0].style.topMargin).not.to.exist;
    return expect(styles[0].topMargin).not.to.exist;
  });
  test("If a value is not provided, the current computed value for the selected property will be returned", function() {
    var computedValue;
    Css(divs[2], 'marginTop', '5vh');
    computedValue = styles[2].marginTop;
    expect(Css(divs[2], 'marginTop', '5vh')).to.equal(void 0);
    expect(Css(divs[2], 'marginTop', '5vh')).to.equal(void 0);
    expect(Css(divs[2], 'marginTop')).to.equal(styles[2].marginTop);
    return expect(Css(divs[2], 'topMargin')).to.equal(void 0);
  });
  test("If a null value is provided for a property, the property will be deleted", function() {
    Css(divs[1], 'marginTop', '10px');
    expect(divs[1].style.marginTop).to.equal('10px');
    expect(styles[1].marginTop).to.equal('10px');
    Css(divs[1], 'marginTop', null);
    expect(divs[1].style.marginTop).to.equal('');
    expect(styles[1].marginTop).to.equal('0px');
    Css(divs[1], 'marginTop', '10px');
    expect(divs[1].style.marginTop).to.equal('10px');
    expect(styles[1].marginTop).to.equal('10px');
    Css(divs[1], {
      'marginTop': null
    });
    expect(divs[1].style.marginTop).to.equal('');
    return expect(styles[1].marginTop).to.equal('0px');
  });
  return suite("animation", function() {
    test(".animation(name, keyframes) will create a @keyframes rule", function() {
      var lastEl;
      lastEl = $(document.head).children().last()[0];
      expect(lastEl.id).not.to.equal('quickcss');
      Css.animation('myAnimation', {
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
      expect(lastEl.innerHTML).to.include('transform: rotate(0deg)');
      expect(lastEl.innerHTML).to.include('opacity: 1');
      expect(lastEl.innerHTML).to.include('width: 100px');
      expect(lastEl.innerHTML).to.include('margin-top: 5px');
      expect(lastEl.innerHTML).to.include('50% {');
      expect(lastEl.innerHTML).to.include('width: 150px');
      expect(lastEl.innerHTML).to.include('100% {');
      expect(lastEl.innerHTML).to.include('transform: rotate(360deg)');
      expect(lastEl.innerHTML).to.include('opacity: 0.5');
      return expect(lastEl.innerHTML).to.include('width: 50px');
    });
    return test("calling .animation() with the same args multiple times should only insert the keyframes once", function() {
      var animation, lastEl, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7;
      animation = {
        '0%': {
          transform: 'rotate(0deg)'
        },
        '100%': {
          transform: 'rotate(360deg)'
        }
      };
      Css.animation('someAnimation', animation);
      lastEl = $(document.head).children().last()[0];
      expect(lastEl.innerHTML).to.include('keyframes someAnimation {');
      expect((ref = lastEl.innerHTML.match(/someAnimation/g)) != null ? ref.length : void 0).to.equal(1);
      Css.animation('someAnimation', animation);
      expect((ref1 = lastEl.innerHTML.match(/someAnimation/g)) != null ? ref1.length : void 0).to.equal(1);
      Css.animation('someAnimation2', animation);
      expect((ref2 = lastEl.innerHTML.match(/someAnimation/g)) != null ? ref2.length : void 0).to.equal(2);
      expect((ref3 = lastEl.innerHTML.match(/someAnimation2/g)) != null ? ref3.length : void 0).to.equal(1);
      Css.animation('someAnimation2', animation);
      expect((ref4 = lastEl.innerHTML.match(/someAnimation/g)) != null ? ref4.length : void 0).to.equal(2);
      expect((ref5 = lastEl.innerHTML.match(/someAnimation2/g)) != null ? ref5.length : void 0).to.equal(1);
      Css.animation('someAnimation2', {
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
});

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

