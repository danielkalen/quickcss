sampleDiv = document.createElement('div')
sampleStyle = sampleDiv.style
regEx = 
	lengthValue: /^\d+(?:[a-z]|\%)+$/i
	digits: /\d+$/
	whitespace: /\s/

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
			return propertyPrefixed if @isPropSupported(propertyPrefixed)

helpers.normalizeValue = (property, value)->
	if @includes(REQUIRES_UNIT_VALUE, property)
		value = ''+value
		value += 'px' if regEx.digits.test(value) and not regEx.lengthValue.test(value) and not regEx.whitespace.test(value)

	return value





