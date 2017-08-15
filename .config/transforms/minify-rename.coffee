module.exports = (file, options, file_, content)->
	if options._flags.debug
		return content
	else
		output = content
		replacements.forEach (replacement)->
			source = replacement[0]
			dest = replacement[1]

			output = output.replace(source, dest)
		return output


replacements = [
	[/isIterable/g, 'iT']
	[/includes/g, 'ic']
	[/isPropSupported/g, 'iP']
	[/isValueSupported/g, 'iV']
	[/toKebabCase/g, 'tC']
	[/getPrefix/g, 'gP']
	[/ruleToString/g, 'rS']
	[/inlineStyle/g, 'iS']
	[/helpers/g, 'H']
]
