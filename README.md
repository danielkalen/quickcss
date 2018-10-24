# QuickCSS
[![Build Status](https://travis-ci.org/danielkalen/quickcss.svg?branch=master)](https://travis-ci.org/danielkalen/quickcss)
[![Coverage](.config/badges/coverage.png?raw=true)](https://github.com/danielkalen/quickcss)
[![Code Climate](https://codeclimate.com/github/danielkalen/quickcss/badges/gpa.svg)](https://codeclimate.com/github/danielkalen/quickcss)
[![NPM](https://img.shields.io/npm/v/quickcss.svg)](https://npmjs.com/package/quickcss)
[![Sauce Test Status](https://saucelabs.com/browser-matrix/quickcss.svg)](https://saucelabs.com/u/quickcss)

⚡️-fast tiny CSS management tool sprinkled with API sugar

**Features**
- fetch *computed* style values of elements.
- apply styles with either kebab-case or camel-case property names.
- automatic value conversion (`width:10 === '10px'`)
- automatic browser prefixing
- global style registration
- animation registration
- check CSS browser support with `.supports()` and `.supportsProperty()`
- simple `!important` flag application
- global style levels (i.e. overriding styles)

## Usage
```javascript
var quickcss = require('quickcss')

// Fetch *computed* styles
quickcss(element, 'width') //=> 133.92px

// Apply styles
quickcss(element, 'width', 100) //=> 100px
quickcss(element, 'height', '50%') //=> 50%

// Multiple element application
quickcss(elements, 'font-size', 18) //=> 18px

// Multiple style application
quickcss(element, {
    'position': 'fixed',
    'fontWeight': 600,
    'line-height': '1.3em'
})

// !important flag
quickcss(element, 'opacity', 0.5, true) //=> opacity:0.5 !important

// Deleting style
quickcss(element, 'position', null) //=> 'static'

// Animation registration (with auto-prefixing)
quickcss.animation('spin', {
    '0%': {
        'opacity': 0.2,
        'transform': 'rotate(0deg)'
    },
    '100%': {
        'opacity': 1,
        'transform': 'rotate(360deg)'
    }
})
```


## API
### `quickcss(element, property)`
Returns the element's [computed](https://developer.mozilla.org/en-US/docs/Web/CSS/computed_value) value for the given property.

- **element**: DOM element object.
- **property**: CSS property in camel/kebab-case (`font-size` or `fontSize`).

```javascript
// Assuming that {fontSize:'2.5em'}
quickcss(element, 'font-size') //=> 40px
```

### `quickcss(element[], property, value[, important])`
Formats and applies `value` for the given `property` on `element`.

- **element**: DOM element object or an array of elements.
- **property**: CSS property in camel/kebab-case (`font-size` or `fontSize`).
- **value**: value that will be applied to `property`. For some properties, values will be [normalized and translated](#value_normalization) to provide API sugar.
- **important**: optional boolean to control the addition of `!important` flag.

### `quickcss(element[], propertiesObject)`
Iterates over `propertiesObject`, using the key as the `property` and applies its value to the `element`.

- **element**: DOM element object or an array of elements.
- **properties**: A `{property:value}` pair object.
    - **property**: CSS property in camel/kebab-case (`font-size` or `fontSize`).
    - **value**: value that will be applied to `property`.

```javascript
quickcss(elements, {
    'background-color': '#0f0f0f',
    fontSize: 12,
    opacity: 0.2
})
```

### `quickcss.animation(name, frames)`
Registers the provided animation which can be used globally on the page. All properties will be automatically prefixed if needed.

- **name**: name of the animation
- **frames**: an object containing `{step:properties}` pairs.
    - **step**: CSS step string e.g. `50%`
    - **properties**: A `{property:value}` pair object.

```javascript
quickcss.animation('spin', {
    '0%': {
        'transform': 'rotate(0deg)'
    },
    '100%': {
        'transform': 'rotate(360deg)'
    }
})

quickcss(element, 'animation', 'spin 200ms linear 0ms infinite')
```

### `quickcss.register(rule[, level, important])`
Registers the provided `rule` object globally and returns the class name string which can be added to any element later.

- **rule**: A `{property:value}` pair object.
    - **property**: CSS property in camel/kebab-case (`font-size` or `fontSize`).
    - **value**: value that will be applied to `property`.
- **level**: the level to declare the rule under. The higher the level the higher the importance e.g. rules declared in level `2` will override rules declared in level `1` and `0`. Default level is `0`.
- **important**: boolean which when `true` will cause all declarations to be declared along with an `!important` flag.

```javascript
var newClass = quickcss.register({
    width: 100,
    opacity: 0.5,
    color: '#000'
})

element.className += ` ${newClass}`
quickcss(element, 'width') //=> '100px'
```


### `quickcss.clearRegisered([level])`
Clears/erases all of the globally registered rules for the given `level`.

- **level**: the target level to clear styles of. Default level is `0`.


### `quickcss.supports(property, value)`
Checks if the provided `value` is a valid value for `property`.


### `quickcss.supportsProperty(property)`
Checks if the provided `property` is supported by the browser.

### `quickcss.normalizeProperty(property)`
Converts the property name into kebeb-case e.g. `'fontSize' -> `font-size``.

### `quickcss.normalizeValue(property, value)`
Converts the value to a valid CSS value e.g. `50 -> `50px``.



## Value normalization
For many properites you can supply a value with typeof `number` instead of `string` (i.e. `10 vs "10px"`) and the value will be automatically normalized to a `px` string. These properties include `width`, `height`, `margin-left`, `font-size`, `z-index`, and more (refer to [REQUIRES_UNIT_VALUE](https://github.com/danielkalen/quickcss/blob/master/src/constants.coffee)).

There is one property that receives slightly different normalization which is the `line-height` property. If a numerical value is provided, it will be converted to `em`.

```javascript
quickcss(element, 'width', 10) //=> '10px'
quickcss(element, 'line-height', 10) //=> '10em'
```

## License
MIT © [Daniel Kalen](https://github.com/danielkalen)