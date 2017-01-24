mocha.setup('tdd')
mocha.slow(400)
mocha.timeout(12000)
mocha.bail()
expect = chai.expect
should = chai.should()
divs = $(('<div />' for i in [1..3]).join '').appendTo('body')
styles = divs.toArray().map (div)-> getComputedStyle(div)

resetDivs = ()->
	for div in divs
		div.removeAttribute('style')
		div.style.width = '40px'
		div.style.height = '40px'
		div.style.backgroundColor = 'blue'
	return


suite "QuickCss", ()->
	setup(resetDivs)
	suiteTeardown(resetDivs)

	test "Apply Basic Styles", ()->
		Css(divs[0], 'width', '10px')
		expect(styles[0].width).to.equal '10px'
		
		Css(divs[1], 'width', '50vw')
		expect(divs[1].style.width).to.equal '50vw'
		expect(Math.round parseFloat(styles[0].width)).not.to.equal 40


	test "Suffix unit-less values for length properties", ()->
		Css(divs[0], 'width', '10')
		Css(divs[1], 'width', 10)
		Css(divs[2], 'width', '10%')
		expect(divs[0].style.width).to.equal '10px'
		expect(divs[1].style.width).to.equal '10px'
		expect(divs[2].style.width).to.equal '10%'
		expect(styles[0].width).to.equal '10px'
		expect(styles[1].width).to.equal '10px'
		expect(Math.round parseFloat(styles[2].width)).not.to.equal 40
	

	test "Suffix won't be added for unit-less values on non-length properties", ()->
		Css(divs[0], 'width', 'auto')
		expect(divs[0].style.width).to.equal 'auto'
		expect(Math.round parseFloat(styles[0].width)).not.to.equal 40
		
		Css(divs[1], 'opacity', .5)
		expect(divs[1].style.opacity).to.equal '0.5'
		expect(styles[1].opacity).to.equal '0.5'


	test "An iterable collection of elements can be passed", ()->
		Css divs, 'width', 15
		expect(divs[0].style.width).to.equal '15px'
		expect(divs[1].style.width).to.equal '15px'
		expect(divs[2].style.width).to.equal '15px'


	test "A style object can be passed", ()->
		Css divs[0],
			'position': 'fixed'
			'width': '55'
			'height': 12
			'opacity': 0.8

		expect(divs[0].style.position).to.equal 'fixed'
		expect(divs[0].style.width).to.equal '55px'
		expect(divs[0].style.height).to.equal '12px'
		expect(divs[0].style.opacity).to.equal '0.8'


	test "An iterable collection of elements can be passed along with a style object", ()->
		Css divs, {width:'32px', height:'99px'}
	
		expect(divs[0].style.width).to.equal '32px'
		expect(divs[1].style.width).to.equal '32px'
		expect(divs[2].style.width).to.equal '32px'
		expect(divs[0].style.height).to.equal '99px'
		expect(divs[1].style.height).to.equal '99px'
		expect(divs[2].style.height).to.equal '99px'


	test "Kebab-cased properties will be transformed to camel-case", ()->
		Css divs[0], 'margin-top', '10px'

		expect(divs[0].style.marginTop).to.equal '10px'
		expect(styles[0].marginTop).to.equal '10px'


	test "Invalid properties will be ignored", ()->
		Css divs[1], 'topMargin', '25px'

		expect(divs[0].style.topMargin).not.to.exist
		expect(styles[0].topMargin).not.to.exist


	test "If a value is not provided, the current computed value for the selected property will be returned", ()->
		Css divs[2], 'marginTop', '5vh'
		computedValue = styles[2].marginTop
		
		expect(Css divs[2], 'marginTop', '5vh').to.equal(undefined)
		expect(Css divs[2], 'marginTop', '5vh').to.equal(undefined)
		expect(Css divs[2], 'marginTop').to.equal(styles[2].marginTop)
		expect(Css divs[2], 'topMargin').to.equal(undefined)


	test "If a null value is provided for a property, the property will be deleted", ()->
		Css divs[1], 'marginTop', '10px'
		expect(divs[1].style.marginTop).to.equal '10px'
		expect(styles[1].marginTop).to.equal '10px'
		
		Css divs[1], 'marginTop', null
		expect(divs[1].style.marginTop).to.equal ''
		expect(styles[1].marginTop).to.equal '0px'








import ../src/parts/constants