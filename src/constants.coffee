POSSIBLE_PREFIXES = ['webkit','moz','ms','o']
REQUIRES_UNIT_VALUE = [
	'backgroundPositionX'
	'backgroundPositionY'
	'blockSize'
	'borderWidth'
	'columnRuleWidth'
	'cx'
	'cy'
	'fontSize'
	'gridColumnGap'
	'gridRowGap'
	'height'
	'inlineSize'
	'lineHeight'
	'minBlockSize'
	'minHeight'
	'minInlineSize'
	'minWidth'
	'maxHeight'
	'maxWidth'
	'outlineOffset'
	'outlineWidth'
	'perspective'
	'shapeMargin'
	'strokeDashoffset'
	'strokeWidth'
	'textIndent'
	'width'
	'wordSpacing'
	'top'
	'bottom'
	'left'
	'right'
	'x'
	'y'
]

QUAD_SHORTHANDS = [
	'margin'
	'padding'
	'border'
	'borderRadius'
]
QUAD_SHORTHANDS.forEach (property)->
	REQUIRES_UNIT_VALUE.push property
	for direction in ['Top','Bottom','Left','Right']
		REQUIRES_UNIT_VALUE.push property+direction