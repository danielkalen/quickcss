import {IMPORTANT, REGEX_KEBAB, REGEX_SPACE, REGEX_DIGITS, REGEX_LEN_VAL, POSSIBLE_PREFIXES, REQUIRES_UNIT_VALUE} from './constants'
SAMPLE_STYLE = document.createElement('div').style

export includes = (target, item)->
	target and target.indexOf(item) isnt -1

export isIterable = (target)->
	target and
	typeof target is 'object' and
	typeof target.length is 'number' and
	not target.nodeType

export toKebabCase = (string)->
	string.replace REGEX_KEBAB, (e,letter)-> "-#{letter.toLowerCase()}"

export isPropSupported = (property)->
	typeof SAMPLE_STYLE[property] isnt 'undefined'

export isValueSupported = (property, value)->
	if window.CSS and window.CSS.supports
		return window.CSS.supports(property, value)
	else
		SAMPLE_STYLE[property] = value
		return SAMPLE_STYLE[property] is ''+value

export getPrefix = (property, skipInitialCheck)->
	if skipInitialCheck or not isPropSupported(property)
		for prefix in POSSIBLE_PREFIXES
			### istanbul ignore next ###
			return "-#{prefix}-" if isPropSupported("-#{prefix}-#{property}")
	
	return ''

export normalizeProperty = (property)->	
	property = toKebabCase(property)
	
	if isPropSupported(property)
		return property
	else
		return "#{getPrefix(property,true)}#{property}"

export normalizeValue = (property, value)->
	if includes(REQUIRES_UNIT_VALUE, property) and value isnt null
		value = ''+value
		if  REGEX_DIGITS.test(value) and
			not REGEX_LEN_VAL.test(value) and
			not REGEX_SPACE.test(value)
				value += if property is 'line-height' then 'em' else 'px'

	return value


export sort = (array)->
	if array.length < 2
		return array
	else
		pivot = array[0]; less = []; great = []; len = array.length; i = 0;
		
		while ++i isnt len
			if array[i] <= pivot
				less.push(array[i])
			else
				great.push(array[i])

		return sort(less).concat(pivot, sort(great))


export hash = (string)->
	hsh = 5381; i = -1; length = string.length
	
	while ++i isnt string.length
		hsh = ((hsh << 5) - hsh) + string.charCodeAt(i)
		hsh |= 0

	return '_'+(if hsh < 0 then hsh * -2 else hsh)


export ruleToString = (rule, important)->
	output = ''
	props = sort(Object.keys(rule))
	
	for prop in props
		if typeof rule[prop] is 'string' or typeof rule[prop] is 'number'
			property = normalizeProperty(prop)
			value = normalizeValue(property, rule[prop])
			value += " !important" if important
			output += "#{property}:#{value};"
	
	return output

export inlineStyleConfig = styleConfig = Object.create(null)
export inlineStyle = (rule, valueToStore, level)->
	if not config=styleConfig[level]
		styleEl = document.createElement('style')
		styleEl.id = "quickcss#{level or ''}"
		document.head.appendChild(styleEl)
		styleConfig[level] = config = el:styleEl, content:'', cache:Object.create(null)
	
	unless config.cache[rule]
		config.cache[rule] = valueToStore or true
		config.el.textContent = config.content += rule
	
	return


export clearInlineStyle = (level)-> if config = styleConfig[level]
	return if not config.content
	config.el.textContent = config.content = ''
	keys = Object.keys(config.cache)
	config.cache[key] = null for key in keys
	return





