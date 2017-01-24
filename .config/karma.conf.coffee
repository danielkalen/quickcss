module.exports = (config)-> config.set
	basePath: '../'
	client: captureConsole: true
	browserConsoleLogOptions: level:'log', terminal:true
	frameworks: ['mocha', 'chai']
	files: [
		'dist/quickcss.debug.js'
		'node_modules/bluebird/js/browser/bluebird.js'
		'node_modules/jquery/dist/jquery.min.js'
		'test/test.js'
	]
	exclude: [
		'**/*.git'
	]

	preprocessors: 'dist/quickcss.debug.js': 'coverage'
	
	reporters: ['mocha', 'coverage']

	mochaReporter: 
		output: 'minimal'

	coverageReporter:
		type: 'lcov'
		dir: './coverage/'
		subdir: '.'

	port: 9876
	colors: true
	logLevel: config.LOG_INFO
	autoWatch: true
	autoWatchBatchDelay: 1000
	restartOnFileChange: true
	singleRun: false
	concurrency: Infinity
	browsers: ['Chrome', 'Firefox', 'Opera', 'Safari']