module.exports = (file, options, file_, content)->
	if options._flags.debug
		return content
	else
		MinifyJS = require('uglify-js').minify
		minified = MinifyJS(content, compress:{unused:false,keep_fnames:true}, mangle:{keep_fnames:true})
		throw minified.error if minified.error
		return minified.code
