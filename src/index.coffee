import * as helpers from './helpers'
import {version} from '../package.json'
import {IMPORTANT} from './constants'

export default quickcss = (targetEl, property, value, important)->
	switch
		when helpers.isIterable(targetEl)
			quickcss(subEl, property, value) for subEl in targetEl
	
		when typeof property is 'object' # Passed a style map
			quickcss(targetEl, subProperty, subValue) for subProperty,subValue of property
	
		else
			property = helpers.normalizeProperty(property)
			if typeof value is 'undefined'
				computedStyle = targetEl._computedStyle ||= getComputedStyle(targetEl)
				return computedStyle[property]
			
			else if property
				targetEl.style.setProperty(property, helpers.normalizeValue(property, value), IMPORTANT if important)

	return


quickcss.animation = (name, frames)-> if name and typeof name is 'string' and frames and typeof frames is 'object'
	prefix = helpers.getPrefix('animation')
	generated = ''
	
	for frame,rules of frames
		generated += "#{frame} {#{helpers.ruleToString(rules)}}"

	generated = "@#{prefix}keyframes #{name} {#{generated}}"
	helpers.inlineStyle(generated, true, 0)


quickcss.register = (rule, level, important)-> if rule and typeof rule is 'object'
	level ||= 0
	rule = helpers.ruleToString(rule, important)

	unless className = helpers.inlineStyleConfig[level]?[rule]
		className = helpers.hash(rule)
		style = ".#{className} {#{rule}}"
		helpers.inlineStyle(style, className, level)

	return className


quickcss.clearRegistered = (level)->
	helpers.clearInlineStyle(level or 0)


### istanbul ignore next ###
quickcss.UNSET = switch
	when helpers.isValueSupported('display','unset') then 'unset'
	when helpers.isValueSupported('display','initial') then 'initial'
	when helpers.isValueSupported('display','inherit') then 'inherit'

quickcss.supports = helpers.isValueSupported
quickcss.supportsProperty = helpers.isPropSupported
quickcss.normalizeProperty = helpers.normalizeProperty
quickcss.normalizeValue = helpers.normalizeValue
quickcss.version = version


