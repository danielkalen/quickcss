mocha.setup('tdd')
mocha.slow(400)
mocha.timeout(12000)
mocha.bail()
expect = chai.expect
should = chai.should()


suite "QuickCss", ()->
	suite "Basics", ()->
		test "", ()->
			# 





