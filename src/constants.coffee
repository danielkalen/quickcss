export REGEX_LEN_VAL = /^\d+(?:[a-z]|\%)+$/i
export REGEX_DIGITS = /\d+$/
export REGEX_SPACE = /\s/
export REGEX_KEBAB = /([A-Z])+/g
export IMPORTANT = 'important'

export POSSIBLE_PREFIXES = [
	'webkit'
	'moz'
	'ms'
	'o'
]
export REQUIRES_UNIT_VALUE = [
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

export QUAD_SHORTHANDS = [
	'margin'
	'padding'
	'border'
	'border-radius'
]
export DIRECTIONS = ['top','bottom','left','right']

QUAD_SHORTHANDS.forEach (property)->
	REQUIRES_UNIT_VALUE.push property
	for direction in DIRECTIONS
		REQUIRES_UNIT_VALUE.push property+'-'+direction
	return





