sampleStyle = document.createElement('div').style
REGEX_LEN_VAL = /^\d+(?:[a-z]|\%)+$/i
REGEX_DIGITS = /\d+$/
REGEX_SPACE = /\s/

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

helpers.toTitleCase = (string)->
	string[0].toUpperCase()+string.slice(1)

helpers.normalizeProperty = (property)->
	if @isPropSupported(property)
		return property
	else
		propertyTitled = @toTitleCase(property)
		
		for prefix in POSSIBLE_PREFIXES
			propertyPrefixed = "#{prefix}#{propertyTitled}"
			### istanbul ignore next ###
			return propertyPrefixed if @isPropSupported(propertyPrefixed)

helpers.normalizeValue = (property, value)->
	if @includes(REQUIRES_UNIT_VALUE, property) and value isnt null
		value = ''+value
		value += 'px' if REGEX_DIGITS.test(value) and not REGEX_LEN_VAL.test(value) and not REGEX_SPACE.test(value)

	return value





