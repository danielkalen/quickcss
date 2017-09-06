constants = import './constants'
helpers = import './helpers'

QuickCSS = (targetEl, property, value)->
	if helpers.isIterable(targetEl)
		QuickCSS(subEl, property, value) for subEl in targetEl
	
	else if typeof property is 'object' # Passed a style map
		QuickCSS(targetEl, subProperty, subValue) for subProperty,subValue of property
	
	else
		property = helpers.normalizeProperty(property)
		if typeof value is 'undefined'
			computedStyle = targetEl._computedStyle ||= getComputedStyle(targetEl)
			return computedStyle[property]
		
		else if property
			targetEl.style[property] = helpers.normalizeValue(property, value)

	return


QuickCSS.animation = (name, frames)-> if name and typeof name is 'string' and frames and typeof frames is 'object'
	prefix = helpers.getPrefix('animation')
	generated = ''
	
	for frame,rules of frames
		generated += "#{frame} {#{helpers.ruleToString(rules)}}"

	generated = "@#{prefix}keyframes #{name} {#{generated}}"
	helpers.inlineStyle(generated, true, 0)


QuickCSS.register = (rule, level, important)-> if rule and typeof rule is 'object'
	level ||= 0
	rule = helpers.ruleToString(rule, important)
	
	unless className = helpers.inlineStyleConfig[level]?[rule]
		className = helpers.hash(rule)
		style = ".#{className} {#{rule}}"
		helpers.inlineStyle(style, className, level)

	return className


QuickCSS.clearRegistered = (level)->
	helpers.clearInlineStyle(level or 0)


### istanbul ignore next ###
QuickCSS.UNSET = switch
	when helpers.isValueSupported('display','unset') then 'unset'
	when helpers.isValueSupported('display','initial') then 'initial'
	when helpers.isValueSupported('display','inherit') then 'inherit'

QuickCSS.supports = helpers.isValueSupported
QuickCSS.supportsProperty = helpers.isPropSupported
QuickCSS.normalizeProperty = helpers.normalizeProperty
QuickCSS.normalizeValue = helpers.normalizeValue
QuickCSS.version = import '../package.json $ version'
module.exports = QuickCSS