@Css = window.quickcss
chai = import 'chai'
chai.use(import 'chai-almost')
mocha.setup('tdd')
mocha.slow(400)
mocha.timeout(12000)
mocha.bail()
expect = chai.expect
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


	test "Kebab-cased/camel-cased properties will be normalized", ()->
		Css divs[0], 'margin-top', '10px'
		expect(divs[0].style.marginTop).to.equal '10px'
		expect(styles[0].marginTop).to.equal '10px'

		Css divs[0], 'marginBottom', '12px'
		expect(divs[0].style.marginBottom).to.equal '12px'
		expect(styles[0].marginBottom).to.equal '12px'



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

		Css divs[1], 'marginTop', '10px'
		expect(divs[1].style.marginTop).to.equal '10px'
		expect(styles[1].marginTop).to.equal '10px'
		
		Css divs[1], {'marginTop': null}
		expect(divs[1].style.marginTop).to.equal ''
		expect(styles[1].marginTop).to.equal '0px'

	suite "animation", ()->
		test ".animation(name, keyframes) will create a @keyframes rule", ()->
			lastEl = $(document.head).children().last()[0]
			expect(lastEl.id).not.to.equal 'quickcss'

			Css.animation 'myAnimation',
				'0%':
					transform: 'rotate(0deg)'
					opacity: 1
					width: 100
					marginTop: 5
				'50%':
					width: 150
				'100%':
					transform: 'rotate(360deg)'
					opacity: 0.5
					width: 50
			
			lastEl = $(document.head).children().last()[0]
			expect(lastEl.id).to.equal 'quickcss'
			expect(lastEl.innerHTML).to.include 'keyframes myAnimation {'
			expect(lastEl.innerHTML).to.include '0% {'
			expect(lastEl.innerHTML).to.include 'transform: rotate(0deg)'
			expect(lastEl.innerHTML).to.include 'opacity: 1'
			expect(lastEl.innerHTML).to.include 'width: 100px'
			expect(lastEl.innerHTML).to.include 'margin-top: 5px'
			expect(lastEl.innerHTML).to.include '50% {'
			expect(lastEl.innerHTML).to.include 'width: 150px'
			expect(lastEl.innerHTML).to.include '100% {'
			expect(lastEl.innerHTML).to.include 'transform: rotate(360deg)'
			expect(lastEl.innerHTML).to.include 'opacity: 0.5'
			expect(lastEl.innerHTML).to.include 'width: 50px'
		

		test "calling .animation() with the same args multiple times should only insert the keyframes once", ()->
			animation =
				'0%':
					transform: 'rotate(0deg)'
				'100%':
					transform: 'rotate(360deg)'
			
			Css.animation 'someAnimation', animation
			lastEl = $(document.head).children().last()[0]
			expect(lastEl.innerHTML).to.include 'keyframes someAnimation {'
			expect(lastEl.innerHTML.match(/someAnimation/g)?.length).to.equal 1
			
			Css.animation 'someAnimation', animation
			expect(lastEl.innerHTML.match(/someAnimation/g)?.length).to.equal 1
			
			Css.animation 'someAnimation2', animation
			expect(lastEl.innerHTML.match(/someAnimation/g)?.length).to.equal 2
			expect(lastEl.innerHTML.match(/someAnimation2/g)?.length).to.equal 1
			
			Css.animation 'someAnimation2', animation
			expect(lastEl.innerHTML.match(/someAnimation/g)?.length).to.equal 2
			expect(lastEl.innerHTML.match(/someAnimation2/g)?.length).to.equal 1
			
			Css.animation 'someAnimation2', {'from':{width:50}, 'to':{width:100}}
			expect(lastEl.innerHTML.match(/someAnimation/g)?.length).to.equal 3
			expect(lastEl.innerHTML.match(/someAnimation2/g)?.length).to.equal 2






import '../src/constants'