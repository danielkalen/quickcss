pkg = require '../package'
pkg.main = pkg.main.replace 'dist', 'build'
pkg.module = pkg.module.replace 'dist', 'build'
pkg.unpkg = pkg.unpkg.replace 'dist', 'build'


onwarn = (warning, warn)->
	return if warning.code is 'MISSING_GLOBAL_NAME'
	return if warning.code is 'THIS_IS_UNDEFINED'
	warn(warning)


config = ({input, output, minify})->
	input: input
	output: [].concat(output).map (config)-> Object.assign {name:pkg.name, compact:true}, config
	external: Object.keys(pkg.dependencies or {})
	onwarn: onwarn
	plugins: [
		require('rollup-plugin-coffee-script')()
		require('rollup-plugin-node-resolve')(
			extensions: ['.js', '.coffee']
			jsnext: true
			preferBuiltins: true
			browser: true
		)
		require('rollup-plugin-commonjs')(extensions: ['.js', '.coffee'])
		require('rollup-plugin-json')()
		require('rollup-plugin-babel')(extensions: ['.js', '.coffee'])
		if minify
			require('rollup-plugin-terser').terser()
	]


module.exports = [
	config
		input: 'src/index.coffee'
		output: [
			{file:pkg.main, format:'umd'}
			{file:pkg.module, format:'esm'}
			{file:pkg.module.replace('esm', 'debug'), format:'umd', sourcemap:'inline'}
		]
,
	config
		input: 'src/index.coffee'
		minify: true
		output: [
			{file:pkg.unpkg, format:'umd'}
		]
]
