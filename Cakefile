global.Promise = require 'bluebird'
Promise.config longStackTraces:process.env.DEBUG?
promiseBreak = require 'promise-break'
execa = require('execa')
extend = require 'smart-extend'
fs = require 'fs-jetpack'
chalk = require 'chalk'
Path = require 'path'
process.env.SOURCE_MAPS ?= 1
cache = {}
buildModules = ['google-closure-compiler-js','uglify-js@3.0.24']
coverageModules = ['istanbul', 'badge-gen', 'coffee-coverage']
testModules = [
	'jquery', 'mocha', 'chai', 'chai-almost'
	'electron', 'karma@1.6.0', 'karma-chrome-launcher', 'karma-coverage', 'karma-electron', 'karma-firefox-launcher',
	'karma-ie-launcher', 'karma-mocha', 'karma-mocha-reporter', 'karma-opera-launcher', 'karma-safari-launcher', 'github:danielkalen/karma-sauce-launcher'
]
MEASURE_LOG = './.config/measure.json'
PACKAGE = './package.json'

option '-t', '--target [target]', 'target measure dir'


task 'build', ()->
	Promise.resolve()
		.then ()-> invoke 'install:build'
		.then ()-> invoke 'build:js'
		.then ()-> invoke 'build:test'


task 'build:js', (options)->
	console.log 'bundling lib'
	compileJS(require './.config/rollup.lib')

task 'build:test', (options)->
	console.log 'bundling test'
	compileJS(require './.config/rollup.test')




task 'watch', ()->
	Promise.resolve()
		.then ()-> invoke 'install:watch'
		.then ()->
			invoke 'watch:js'
			invoke 'watch:test'

task 'watch:js', (options)->
	require('rollup').watch(require './.config/rollup.lib')

task 'watch:test', (options)->
	require('rollup').watch(require './.config/rollup.test')



task 'install', ()->
	Promise.resolve()
		.then ()-> invoke 'install:build'
		.then ()-> invoke 'install:watch'
		.then ()-> invoke 'install:test'
		.then ()-> invoke 'install:coverage'
		.then ()-> invoke 'install:measure'


task 'install:build', ()->
	Promise.resolve()
		.then ()-> buildModules.filter (module)-> not moduleInstalled(module)
		.tap (missingModules)-> promiseBreak() if missingModules.length is 0
		.tap (missingModules)-> installModules(missingModules)
		.catch promiseBreak.end


task 'install:watch', ()->
	Promise.resolve()
		.then ()-> ['listr'].filter (module)-> not moduleInstalled(module)
		.tap (missingModules)-> promiseBreak() if missingModules.length is 0
		.tap (missingModules)-> installModules(missingModules)
		.catch promiseBreak.end


task 'install:test', ()->
	Promise.resolve()
		.then ()-> testModules.filter (module)-> not moduleInstalled(module)
		.tap (missingModules)-> promiseBreak() if missingModules.length is 0
		.tap (missingModules)-> installModules(missingModules)
		.catch promiseBreak.end


task 'install:coverage', ()->
	Promise.resolve()
		.then ()-> coverageModules.filter (module)-> not moduleInstalled(module)
		.tap (missingModules)-> promiseBreak() if missingModules.length is 0
		.tap (missingModules)-> installModules(missingModules)
		.catch promiseBreak.end


task 'install:measure', ()->
	Promise.resolve()
		.then ()-> ['gzipped', 'sugar'].filter (module)-> not moduleInstalled(module)
		.tap (missingModules)-> promiseBreak() if missingModules.length is 0
		.tap (missingModules)-> installModules(missingModules)
		.catch promiseBreak.end



task 'measure', (options)->
	Promise.resolve()
		.then ()-> fs.writeAsync(MEASURE_LOG, {}) if not fs.exists(MEASURE_LOG)
		.then ()-> invoke 'install:measure'
		.then ()->
			DIR = if options.target then options.target else 'build'
			measure {debug:"./#{DIR}/quickcss.debug.js", release:"./#{DIR}/quickcss.js"}




















runTaskList = (tasks)->
	(new (require 'listr')(tasks, concurrent:true)).run()


measure = (file)->
	gzipped = Promise.promisifyAll require('gzipped')
	bytes = require 'sugar/number/bytes'
	isEqual = require 'sugar/object/isEqual'
	results = debug:null, release:null
	
	Promise.resolve()
		.then ()-> gzipped.calculateAsync fs.createReadStream(file.debug)
		.then (result)-> results.debug = 'orig':bytes(result.original,2), 'gzip':bytes(result.compressed,2)
		
		.then ()-> gzipped.calculateAsync fs.createReadStream(file.release)
		.then (result)-> results.release = 'orig':bytes(result.original,2), 'gzip':bytes(result.compressed,2)
		
		.then ()-> Promise.all [fs.readAsync(MEASURE_LOG,'json'), fs.readAsync(PACKAGE,'json').get('version')]
		.then ([log, version])->
			log[version] ?= []
			lastResult = log[version].slice(-1)[0]
			return log if lastResult and isEqual(lastResult, results)
			log[version].push(results)
			return log
		
		.then (updatedLog)-> fs.writeAsync MEASURE_LOG, updatedLog
		.then ()->
			console.log "#{chalk.dim 'DEBUG  '} #{chalk.green results.debug.gzip} (#{chalk.yellow results.debug.orig})"
			console.log "#{chalk.dim 'RELEASE'} #{chalk.green results.release.gzip} (#{chalk.yellow results.release.orig})"
			console.log '\n'


compileJS = (configs)->
	rollup = require 'rollup'

	for config,i in configs
		console.log "bundling config ##{i+1}"
		bundle = await rollup.rollup(config)

		for dest in config.output
			await bundle.write(dest)



installModules = (targetModules)->
	targetModules = targetModules
		.filter (module)-> if typeof module is 'string' then true else module[1]()
		.map (module)-> if typeof module is 'string' then module else module[0]
	
	return if not targetModules.length
	console.log "#{chalk.yellow('Installing')} #{chalk.dim targetModules.join ', '}"
	
	execa('npm', ['install', '--no-save', '--no-purne', targetModules...], {stdio:'inherit'})


moduleInstalled = (targetModule)->
	targetModule = targetModule[0] if typeof targetModule is 'object'
	if (split=targetModule.split('@')) and split[0].length
		targetModule = split[0]
		targetVersion = split[1]

	if /^github:.+?\//.test(targetModule)
		targetModule = targetModule.replace /^github:.+?\//, ''
	
	pkgFile = Path.resolve('node_modules',targetModule,'package.json')
	exists = fs.exists(pkgFile)
	
	if exists and targetVersion?
		currentVersion = fs.read(pkgFile, 'json').version
		exists = require('semver').gte(currentVersion, targetVersion)

	return exists


