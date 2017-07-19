sampleStyle = document.createElement('div').style
REGEX_LEN_VAL = /^\d+(?:[a-z]|\%)+$/i
REGEX_DIGITS = /\d+$/
REGEX_SPACE = /\s/
REGEX_KEBAB = /([A-Z])+/g

helpers = {}

helpers.includes = (target, item)->
	target and target.indexOf(item) isnt -1

helpers.isIterable = (target)->
	target and
	typeof target is 'object' and
	typeof target.length is 'number' and
	not target.nodeType

helpers.isPropSupported = (property)->
	typeof sampleStyle[property] isnt 'undefined'

helpers.toKebabCase = (string)->
	string.replace REGEX_KEBAB, (e,letter)-> "-#{letter.toLowerCase()}"

helpers.normalizeProperty = (property)->	
	property = helpers.toKebabCase(property)
	
	if helpers.isPropSupported(property)
		return property
	else
		return "#{helpers.getPrefix(property,true)}#{property}"

helpers.getPrefix = (property, skipInitialCheck)->
	if skipInitialCheck or not helpers.isPropSupported(property)
		for prefix in POSSIBLE_PREFIXES
			### istanbul ignore next ###
			return "-#{prefix}-" if helpers.isPropSupported("-#{prefix}-#{property}")
	
	return ''

helpers.normalizeValue = (property, value)->
	if helpers.includes(REQUIRES_UNIT_VALUE, property) and value isnt null
		value = ''+value
		if REGEX_DIGITS.test(value) and not REGEX_LEN_VAL.test(value) and not REGEX_SPACE.test(value)
			value += if property is 'line-height' then 'em' else 'px'

	return value


styleEl = null
styleContent = ''
helpers.inlineStyle = (rule)->
	if not styleEl
		styleEl = document.createElement('style')
		styleEl.id = 'quickcss'
		document.head.appendChild(styleEl)

	unless helpers.includes(styleContent, rule)
		styleEl.innerHTML = styleContent += rule




