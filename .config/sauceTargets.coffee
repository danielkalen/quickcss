RES1 = '1400x1050'
RES2 = '1440x900'
RES3 = '1600x1200'
SIMULATOR = ipad:'iPad Air Simulator', iphone:'iPhone 6 Simulator', android:'Android GoogleAPI Emulator'

device = (browser, version, platform)->
	version = String(version)
	
	switch browser
		when 'safari' then switch version
			when '12' 	then o = platform:'OS X 10.13', browserName:browser, version:version, screenResolution:RES1
			when '10' 	then o = platform:'OS X 10.12', browserName:browser, version:version, screenResolution:RES1
			when '9' 	then o = platform:'OS X 10.11', browserName:browser, version:version, screenResolution:RES3
			when '8' 	then o = platform:'OS X 10.10', browserName:browser, version:version, screenResolution:RES2
			when '7' 	then o = platform:'OS X 10.9', browserName:browser, version:version, screenResolution:RES2
		
		when 'chrome','firefox' then switch platform
			when 'mac' 	then o = platform:'OS X 10.13', browserName:browser, version:version, screenResolution:RES1
			when 'win' 	then o = platform:'Windows 10', browserName:browser, version:version, screenResolution:RES1
		
		when 'iphone','ipad' then switch version
			when '10'	then o = platformName:'iOS', platformVersion:'10.1', browserName:'Safari', deviceName:SIMULATOR[browser]
			when '9'	then o = platformName:'iOS', platformVersion:'9.0', browserName:'Safari', deviceName:SIMULATOR[browser]
			when '8'	then o = platformName:'iOS', platformVersion:'8.4', browserName:'Safari', deviceName:SIMULATOR[browser]
		
		when 'android' then switch version
			when '7'	then o = platformName:'Android', platformVersion:'7.0', browserName:'Chrome', deviceName:SIMULATOR[browser]
			when '6'	then o = platformName:'Android', platformVersion:'6.0', browserName:'Chrome', deviceName:SIMULATOR[browser]
			when '5'	then o = platformName:'Android', platformVersion:'5.1', browserName:'Chrome', deviceName:SIMULATOR[browser]
		
		when 'ie' 		then o = platform:'Windows 7', browserName:'internet explorer', version:version, screenResolution:RES2
		when 'edge'		then o = platform:'Windows 10', browserName:'microsoftedge', version:version, screenResolution:RES1
	
	o.base = 'SauceLabs'
	return o



module.exports = 
	safari12:			device 'safari', 12
	safari10:			device 'safari', 10
	safari8:			device 'safari', 8
	# chrome_new_mac:		device 'chrome', 58, 'mac'
	chrome_semi_mac:	device 'chrome', 40, 'mac'
	chrome_old_mac:		device 'chrome', 31, 'mac'
	chrome_new_win:		device 'chrome', 58, 'win'
	# chrome_semi_win:	device 'chrome', 40, 'win'
	# chrome_old_win:		device 'chrome', 30, 'win'
	firefox_new_mac:	device 'firefox', 53, 'mac'
	# firefox_semi_mac:	device 'firefox', 40, 'mac'
	# firefox_old_mac:	device 'firefox', 35, 'mac'
	# firefox_new_win:	device 'firefox', 53, 'win'
	firefox_semi_win:	device 'firefox', 40, 'win'
	firefox_old_win:	device 'firefox', 35, 'win'
	edge16:				device 'edge', 16
	edge13:				device 'edge', 13
	ie11:				device 'ie', 11
	ie10:				device 'ie', 10
	ie9:				device 'ie', 9
	# iphone10:			device 'iphone', 10
	iphone9:			device 'iphone', 9
	# iphone8:			device 'iphone', 8
	# ipad10:				device 'ipad', 10
	# ipad9:				device 'ipad', 9
	# ipad8:				device 'ipad', 8
	android7:			device 'android', 7
	# android6:			device 'android', 6
	# android5:			device 'android', 5


