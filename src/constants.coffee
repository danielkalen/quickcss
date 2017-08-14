exports.REGEX_LEN_VAL = /^\d+(?:[a-z]|\%)+$/i
exports.REGEX_DIGITS = /\d+$/
exports.REGEX_SPACE = /\s/
exports.REGEX_KEBAB = /([A-Z])+/g

exports.POSSIBLE_PREFIXES = [
	'webkit'
	'moz'
	'ms'
	'o'
]
exports.REQUIRES_UNIT_VALUE = [
	'background-position-x'
	'background-position-y'
	'block-size'
	'border-width'
	'columnRule-width'
	'cx'
	'cy'
	'font-size'
	'grid-column-gap'
	'grid-row-gap'
	'height'
	'inline-size'
	'line-height'
	'minBlock-size'
	'min-height'
	'min-inline-size'
	'min-width'
	'max-height'
	'max-width'
	'outline-offset'
	'outline-width'
	'perspective'
	'shape-margin'
	'stroke-dashoffset'
	'stroke-width'
	'text-indent'
	'width'
	'word-spacing'
	'top'
	'bottom'
	'left'
	'right'
	'x'
	'y'
]

exports.QUAD_SHORTHANDS = [
	'margin'
	'padding'
	'border'
	'border-radius'
]
exports.DIRECTIONS = ['top','bottom','left','right']

exports.QUAD_SHORTHANDS.forEach (property)->
	exports.REQUIRES_UNIT_VALUE.push property
	for direction in exports.DIRECTIONS
		exports.REQUIRES_UNIT_VALUE.push property+'-'+direction
	return





