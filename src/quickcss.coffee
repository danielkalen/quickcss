do ()->
	import parts/constants
	import parts/helpers
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











	QuickCss.version = import ../.config/.version
	### istanbul ignore next ###
	if module?.exports?
		module.exports = QuickCss
	else if typeof define is 'function' and define.amd
		define ['quickdom'], ()-> QuickCss
	else
		@Css = QuickCss