@Css = window.quickcss
chai = import 'chai'
chai.use(import 'chai-almost')
mocha.setup('tdd')
mocha.slow(400)
mocha.timeout(12000)
mocha.bail() unless window.__karma__
expect = chai.expect
divs = $(('<div />' for i in [1..3]).join '').appendTo('body')
styles = divs.toArray().map (div)-> getComputedStyle(div)

resetDivs = ()->
	for div in divs
		div.removeAttribute('style')
		continue if arguments[0] is true
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
		
		Css(divs[0], 'marginTop', '10')
		Css(divs[1], 'marginTop', 10)
		Css(divs[2], 'marginTop', '10%')
		expect(divs[0].style.marginTop).to.equal '10px'
		expect(divs[1].style.marginTop).to.equal '10px'
		expect(divs[2].style.marginTop).to.equal '10%'
		
		Css(divs[0], 'fontSize', '10')
		Css(divs[1], 'fontSize', 10)
		Css(divs[2], 'fontSize', '10%')
		expect(divs[0].style.fontSize).to.equal '10px'
		expect(divs[1].style.fontSize).to.equal '10px'
		expect(divs[2].style.fontSize).to.equal '10%'
		
		Css(divs[0], 'lineHeight', '10')
		Css(divs[1], 'lineHeight', 10)
		Css(divs[2], 'lineHeight', '10%')
		expect(divs[0].style.lineHeight).to.equal '10em'
		expect(divs[1].style.lineHeight).to.equal '10em'
		expect(divs[2].style.lineHeight).to.equal '10%'
	

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


	test "!important flag will be set when truthy value will be passed as the 4th argument to QuickCss", ()->
		resetDivs(true)
		expect(divs[0].getAttribute 'style').to.equal ''

		Css(divs[0], 'width', '50px')
		expect(divs[0].getAttribute 'style').to.include '50px'
		expect(divs[0].getAttribute 'style').not.to.include '50px !important'
		
		Css(divs[0], 'width', '50px', true)
		expect(divs[0].getAttribute 'style').to.include '50px !important'
		
		Css(divs[0], 'height', '75px', true)
		expect(divs[0].getAttribute 'style').to.include '75px !important'
		
		Css(divs[0], 'height', '75px')
		expect(divs[0].getAttribute 'style').not.to.include '75px !important'


	test "QuickCss.supports & QuickCss.supportsProperty", ()->
		expect(typeof Css.supports).to.equal 'function'
		expect(typeof Css.supportsProperty).to.equal 'function'
		expect(Css.supports('display','inline')).to.be.true
		expect(Css.supports('display','block')).to.be.true
		expect(Css.supports('display','blockl')).to.be.false
		expect(Css.supports('display','')).to.be.false
		expect(Css.supports('display',null)).to.be.false
		expect(Css.supports('opacity','0.5')).to.be.true
		expect(Css.supports('opacity',0.5)).to.be.true
		expect(Css.supportsProperty('opacity')).to.be.true
		expect(Css.supportsProperty('opacityy')).to.be.false



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
			expect(lastEl.innerHTML).to.include 'transform:rotate(0deg)'
			expect(lastEl.innerHTML).to.include 'opacity:1'
			expect(lastEl.innerHTML).to.include 'width:100px'
			expect(lastEl.innerHTML).to.include 'margin-top:5px'
			expect(lastEl.innerHTML).to.include '50% {'
			expect(lastEl.innerHTML).to.include 'width:150px'
			expect(lastEl.innerHTML).to.include '100% {'
			expect(lastEl.innerHTML).to.include 'transform:rotate(360deg)'
			expect(lastEl.innerHTML).to.include 'opacity:0.5'
			expect(lastEl.innerHTML).to.include 'width:50px'
		

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



	suite "style registration", ()->
		setup ()-> resetDivs(true)

		test "a className will be returned from QuickCss.register() for a given rule object which can be applied to elements", ()->
			className = Css.register {width:'150px', 'margin-top':'25px'}

			expect(typeof className).to.equal 'string'
			expect(Css(divs[0], 'width')).not.to.equal '150px'
			expect(Css(divs[0], 'marginTop')).not.to.equal '25px'

			divs[0].className += " #{className}"
			expect(Css(divs[0], 'width')).to.equal '150px'
			expect(Css(divs[0], 'marginTop')).to.equal '25px'


		test "values and properties will be normalized", ()->
			className = Css.register {width:125, height:70, zIndex:12, marginTop:20, fontSize:20, position: 'relative'}

			expect(Css(divs[0], 'width')).not.to.equal '125px'
			expect(Css(divs[0], 'height')).not.to.equal '70px'
			expect(Css(divs[0], 'marginTop')).not.to.equal '20px'
			expect(Css(divs[0], 'fontSize')).not.to.equal '20px'
			expect(Css(divs[0], 'zIndex')).not.to.equal '12'

			divs[0].className += " #{className}"
			expect(Css(divs[0], 'width')).to.equal '125px'
			expect(Css(divs[0], 'height')).to.equal '70px'
			expect(Css(divs[0], 'marginTop')).to.equal '20px'
			expect(Css(divs[0], 'fontSize')).to.equal '20px'
			expect(Css(divs[0], 'zIndex')).to.equal '12'


		test "only valid property values will be registered", ()->
			className = Css.register {width:20, height:{value:'20px'}, opacity:0.5, lineHeight:(->'2em'), fontSize:'12'}
			inserted = (document.querySelector('#quickcss').textContent).match(new RegExp "\\.#{className} {(.+?)}")?[1]

			expect(typeof inserted).to.equal 'string'
			expect(inserted).to.include 'width:20px'
			expect(inserted).to.include 'opacity:0.5'
			expect(inserted).to.include 'font-size:12px'
			expect(inserted).not.to.include 'height'
			expect(inserted).not.to.include 'line-height'


		test "a rule object will be only defined once inside the style element", ()->
			className1 = Css.register {width:30, height:'50'}
			className2 = Css.register {width:30, height:'50'}
			expect(className1).to.equal(className2)
			
			match = (document.querySelector('#quickcss').textContent).match(new RegExp "#{className1}", 'g')
			expect(match.length).to.equal 1


		test "styles can be registered at different levels for specificity (default=0)", ()->
			className1 = Css.register {width:10, height:10}
			className2 = Css.register {width:20, height:20}

			divs[0].className = "#{className1}"
			expect(styles[0].width).to.equal('10px')
			expect(styles[0].height).to.equal('10px')
			
			divs[0].className += " #{className2}"
			expect(styles[0].width).to.equal('20px')
			expect(styles[0].height).to.equal('20px')
			
			Css.register {width:10, height:10}
			expect(styles[0].width).to.equal('20px')
			expect(styles[0].height).to.equal('20px')
			expect(document.querySelector('#quickcss1')).to.equal null
			
			Css.register {width:10, height:10}, 1
			expect(styles[0].width).to.equal('10px')
			expect(styles[0].height).to.equal('10px')
			
			Css.register {width:20, height:20}, 5
			expect(styles[0].width).to.equal('20px')
			expect(styles[0].height).to.equal('20px')

			expect(document.querySelector('#quickcss1')).not.to.equal null
			expect(document.querySelector('#quickcss5')).not.to.equal null
			expect(document.querySelector('#quickcss').textContent).to.include(className1)
			expect(document.querySelector('#quickcss1').textContent).to.include(className1)
			expect(document.querySelector('#quickcss5').textContent).not.to.include(className1)
			expect(document.querySelector('#quickcss').textContent).to.include(className2)
			expect(document.querySelector('#quickcss1').textContent).not.to.include(className2)
			expect(document.querySelector('#quickcss5').textContent).to.include(className2)

			Css.register {width:10, height:10}, 5
			expect(styles[0].width).to.equal('10px')
			expect(styles[0].height).to.equal('10px')
			expect(document.querySelector('#quickcss5').textContent).to.include(className1)


		test "styles will be registered with '!important' flag when passed QuickCss.register(..., ..., true)", ()->
			className1 = Css.register {width:30, height:30}, 0
			className2 = Css.register {width:30, height:30}, 0, true
			className4 = Css.register {width:50}, 1, true
			className5 = Css.register {height:50}, 1
			className3 = Css.register {width:25, height:25}, 2

			expect(className1).not.to.equal(className2)
			
			divs[0].className = "#{className3} #{className4} #{className5}"
			expect(styles[0].width).to.equal('50px')
			expect(styles[0].height).to.equal('25px')

			inserted = (document.querySelector('#quickcss').textContent).match(new RegExp "\\.#{className2} {(.+?)}")?[1]
			expect(inserted).to.include '!important'


		test "clearing registered", ()->
			className = Css.register {a:'1px', b:'2px'}
			Css.register {a:'1px', b:'2px'}, 1
			expect(document.querySelector('#quickcss').textContent).to.include(className)
			expect(document.querySelector('#quickcss1').textContent).to.include(className)
			
			Css.clearRegistered()
			expect(document.querySelector('#quickcss').textContent).not.to.include(className)
			expect(document.querySelector('#quickcss1').textContent).to.include(className)
			
			Css.register {a:'1px', b:'2px'}
			expect(document.querySelector('#quickcss').textContent).to.include(className)
			expect(document.querySelector('#quickcss1').textContent).to.include(className)
			
			Css.clearRegistered(1)
			expect(document.querySelector('#quickcss').textContent).to.include(className)
			expect(document.querySelector('#quickcss1').textContent).not.to.include(className)


		suite "the returned className will be the same (i.e. hashsum)", ()->
			test "for the same object", ()->
				rule = {width:125, height:70, zIndex:12}
				expect(Css.register(rule)).to.equal(Css.register(rule))


			test "for diff objects with the same config", ()->
				expect(Css.register({width:125, height:70, zIndex:13}))
				.to.equal(Css.register({width:125, height:70, zIndex:13}))


			test "for diff objects with the same config but different notations", ()->
				expect(Css.register({width:115, height:70, zIndex:14}))
				.to.equal(Css.register({width:'115px', height:70, 'z-index':14}))


			test "for diff objects with the same config but different property order", ()->
				expect(Css.register({width:100, height:70, zIndex:15}))
				.to.equal(Css.register({'z-index':15, width:'100px', height:70}))
				
				expect(Css.register({width:100, height:70, zIndex:15})).not
				.to.equal(Css.register({'z-index':15, width:'100px', height:71}))

			test "for diff object with the same config when some properties are rejected", ()->
				expect(Css.register {width:20, height:{value:'20px'}, opacity:0.5, lineHeight:(->'2em'), fontSize:'12'})
				.to.equal(Css.register {width:20, height:{value:'20px'}, opacity:0.5, fontSize:'12', lineHeight:(->'2em')})







import '../src/constants'