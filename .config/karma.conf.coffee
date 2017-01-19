module.exports = (config)-> config.set
	basePath: '../'
	client: captureConsole: true
	browserConsoleLogOptions: level:'log', terminal:true
	frameworks: ['mocha', 'chai']
	files: [
		'dist/transitioner.pretty.js'
		'test/bower_components/bluebird/js/browser/bluebird.js'
		'test/bower_components/jquery/dist/jquery.min.js'
		'test/test.js'
	]
	exclude: [
		'**/*.git'
	]

	preprocessors: 'dist/transitioner.pretty.js': 'coverage'
	
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