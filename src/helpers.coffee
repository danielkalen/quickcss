constants = import './constants'
sampleStyle = document.createElement('div').style

helpers = exports

helpers.includes = (target, item)->
	target and target.indexOf(item) isnt -1

helpers.isIterable = (target)->
	target and
	typeof target is 'object' and
	typeof target.length is 'number' and
	not target.nodeType

helpers.toKebabCase = (string)->
	string.replace constants.REGEX_KEBAB, (e,letter)-> "-#{letter.toLowerCase()}"

helpers.isPropSupported = (property)->
	typeof sampleStyle[property] isnt 'undefined'

helpers.isValueSupported = (property, value)->
	if window.CSS and window.CSS.supports
		return window.CSS.supports(property, value)
	else
		sampleStyle[property] = value
		return sampleStyle[property] is ''+value

helpers.getPrefix = (property, skipInitialCheck)->
	if skipInitialCheck or not helpers.isPropSupported(property)
		for prefix in constants.POSSIBLE_PREFIXES
			### istanbul ignore next ###
			return "-#{prefix}-" if helpers.isPropSupported("-#{prefix}-#{property}")
	
	return ''

helpers.normalizeProperty = (property)->	
	property = helpers.toKebabCase(property)
	
	if helpers.isPropSupported(property)
		return property
	else
		return "#{helpers.getPrefix(property,true)}#{property}"

helpers.normalizeValue = (property, value)->
	if helpers.includes(constants.REQUIRES_UNIT_VALUE, property) and value isnt null
		value = ''+value
		if  constants.REGEX_DIGITS.test(value) and
			not constants.REGEX_LEN_VAL.test(value) and
			not constants.REGEX_SPACE.test(value)
				value += if property is 'line-height' then 'em' else 'px'

	return value


helpers.sort = (array)->
	if array.length < 2
		return array
	else
		pivot = array[0]; less = []; great = []; len = array.length; i = 0;
		
		while ++i isnt len
			if array[i] <= pivot
				less.push(array[i])
			else
				great.push(array[i])

		return helpers.sort(less).concat(pivot, helpers.sort(great))


helpers.hash = (string)->
	hash = 5381; i = -1; length = string.length
	
	while ++i isnt string.length
		hash = ((hash << 5) - hash) + string.charCodeAt(i)
		hash |= 0

	return '_'+(if hash < 0 then hash * -2 else hash)


helpers.ruleToString = (rule)->
	output = ''
	props = helpers.sort(Object.keys(rule))
	
	for prop in props
		if typeof rule[prop] is 'string' or typeof rule[prop] is 'number'
			property = helpers.normalizeProperty(prop)
			value = helpers.normalizeValue(property, rule[prop])
			output += "#{property}:#{value};"
	
	return output

styleEl = null
styleContent = ''
helpers.inlineStyleCache = Object.create(null)
helpers.inlineStyle = (rule, valueToStore)->
	if not styleEl
		styleEl = document.createElement('style')
		styleEl.id = 'quickcss'
		document.head.appendChild(styleEl)

	unless helpers.inlineStyleCache[rule]
		helpers.inlineStyleCache[rule] = valueToStore or true
		styleEl.textContent = styleContent += rule
	return






