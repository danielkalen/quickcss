import 'parts/constants'
import 'parts/helpers'

QuickCss = (targetEl, property, value)->
	if helpers.isIterable(targetEl)
		QuickCss(subEl, property, value) for subEl in targetEl
	
	else if typeof property is 'object' # Passed a style map
		QuickCss(targetEl, subProperty, subValue) for subProperty,subValue of property
	
	else
		property = helpers.normalizeProperty(property)
		if typeof value is 'undefined'
			return getComputedStyle(targetEl)[property]
		
		else if property
			targetEl.style[property] = helpers.normalizeValue(property, value)

	return

QuickCss.animation = (name, frames)-> if name and typeof name is 'string' and frames and typeof frames is 'object'
	prefix = helpers.getPrefix('animation')
	generated = ''
	
	for frame,rules of frames
		generated += "#{frame} {"

		for property,value of rules
			generated += "#{helpers.normalizeProperty(property)}: #{helpers.normalizeValue(property,value)};"
		
		generated += "}"

	generated = "@#{prefix}keyframes #{name} {#{generated}}"
	helpers.inlineStyle(generated)



QuickCss.version = import '../package.json $ version'
module.exports = QuickCss