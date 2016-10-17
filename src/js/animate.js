
export default function(){

	(function (window, document, $){
	
		//console.log(TweenMax);
		//console.log(TimelineMax);
		//
		
		function skate(){
			const $skate = $('.js-skate-animation');
			let visible = false;

			if ($skate.length === 0){
				return;
			}
			console.log('skate');

			const tl1 = new TimelineMax({
				paused: true
			});

			tl1
			.set($skate, {
				zIndex: 300,
			})
			.fromTo($skate, 1, {
				transform: 'translateY(1000px) scale(0)',
			}, {
				transform: 'translateY(0px) scale(1)',
			})
			.to($skate, .2, {
				transform: 'rotate(-8deg)',
			})
			.to($skate, .3, {
				transform: 'rotate(8deg)',
			})
			.to($skate, .1, {
				transform: 'rotate(0deg)',
			})
			;

			function run(){
				if ($(document).scrollTop() > 800){
					tl1.play();
				}else{
					tl1.reverse();
				}				
			}
			run();
			
			$(document).on('scroll', function(){
				run();
			});

		}
		skate();



		function bottle(){
			const $bottle = $('.js-bottle-animate');
			const $skate = $('.js-bottle-skate-animate');
			const $box = $('.js-bottle-animate-box');
			const $hand = $('.js-bottle-hand');
			const $bag = $('.js-bottle-bag');
			const $bagMask = $('.js-bottle-bag-mask');
			const $bagText = $('.js-bottle-bag-text');
			
			var scrollTimeout = null,
   			scrollTimeoutDelay = 20,
    		currentScrollProgress = 0;
			
			var     duration = .4,
   			 ease = Power2.easeOut,
   			 staggerFactor = .1,
    		scrollTweenDuration = .4;

			const maxScroll = 4000;
			const start = 3500;
			
			const tl1 = new TimelineMax({
				paused: true
			});
			
			function listenToScrollEvent() {
			    (window.addEventListener) ? window.addEventListener('scroll', debounceScroll, false) : window.attachEvent('onscroll', debounceScroll);
			}

			function debounceScroll() {
			    clearTimeout(scrollTimeout);
			    scrollTimeout = setTimeout(onScroll, scrollTimeoutDelay);
			}

			function onScroll() {
			    console.log(window.scrollY);

			    if (window.scrollY > start){
					$bottle.addClass('your-bottle__bottle--fixed');
			   		currentScrollProgress = roundDecimal( (window.scrollY - start) / maxScroll, 4);
				}else{
					currentScrollProgress = 0;
					$bottle.removeClass('your-bottle__bottle--fixed');
				}
			    console.log(currentScrollProgress);
			    //timeline.progress(currentScrollProgress); // either directly set the [progress] of the timeline which may produce a rather jumpy result
			    TweenMax.to(tl1, scrollTweenDuration, {
			        progress: currentScrollProgress,
			        ease: ease
			    }); // or tween the [timeline] itself to produce a transition from one state to another i.e. it looks smooth
			}

			function roundDecimal(value, place) {
			    return Math.round(value * Math.pow(10, place)) / Math.pow(10, place);
			}

			$box.css('padding-top', '5500px');


			tl1
			.to($bottle, 5, {
				x: 0,
				y: -120,
				scale: .35,
				rotation: '345deg',
			}, '+=2')
			.fromTo($skate, 2,{
				x: 1500,
				y: 0,
				scale: 0,
			}, {			
				x: 72,
				y: 0,	
				scale: 1,
			}, '-=2')
			.to($hand, 1,{
				x: -600,
				opacity: 1,	
			})
			.to($hand, 1,{
				//x: -600,
				opacity: 0,	
			}, '+=4')
			.to($bottle, 2, {
				y: 200,
				rotation: '368deg',
			})
			.to($skate, 3, {
				x: -900,
				y: -500,
				opacity: 0,
				rotation: '180deg',
			}, '-=3')
			.fromTo($bag, 1, {
				y: 300,
			},{
				opacity: 1,
				y: 0,
			},'-=0')
			.fromTo($bagMask, 1, {
				y: 300,
			},{
				opacity: 1,
				y: 0,
			},'-=1')
			.fromTo($bagText, 1, {
				opacity: 0,
				x: -300,
			},{
				opacity: 1,
				x: 0,
			},'-=0')

			// .to($bottle, .5, {
			// 	x: 0,
			// 	y: 1000,
			// 	scale: .3,
			// 	rotation: '345deg',
			// })
			// .to($skate, .5, {
			// 	x: -250,
			// 	y: 1130,
			// 	scale: 1,
			// }, '-=.5')
			// ;


			// $(document).on('scroll', function(){
			// 	if (window.scrollY > 3600) {
			// 		tl1.play();
			// 	}else{
			// 		tl1.reverse();
			// 	}
			// });

			//tl1.play();

			listenToScrollEvent();
			onScroll();
		}
		bottle();



		function colors(){

			const $sex = $('.js-select-sex');
			const $colors = $('.js-select-color');
			const $bottle = $('.js-bottle-animate');

			console.log($colors);
			console.log($colors.filter('[value="blue"]'));

			function showColors(){
				const sex = $sex.filter(':checked').val();
				console.log(sex);
				$colors.parent().parent().hide();

				if (sex === 'girl'){
					$colors.filter('[value="yellow"]').prop('checked', true);
					$colors.filter('[value="yellow"]').parent().parent().show();
					$colors.filter('[value="red"]').parent().parent().show();
				}else{
					$colors.filter('[value="blue"]').prop('checked', true);
					$colors.filter('[value="blue"]').parent().parent().show();
					$colors.filter('[value="green"]').parent().parent().show();
				}
				showBottle();
			}
			showColors();

			function showBottle(){
				const color = $colors.filter(':checked').val();

				$bottle.attr('data-color', color);
			}

			$sex.on('change', function(){
				showColors();
				
			});

			$colors.on('change', function(){
				//showColors();
				showBottle();
			});
		}
		colors();

	
	})(window, document, jQuery, TweenMax, TimelineMax, undefined);

}
