export default function(){

	(function (window, document, $, TweenMax, TimelineMax){

		
		function skate(){
			const $skate = $('.js-skate-animation');
			let visible = false;

			if ($skate.length === 0){
				return;
			}
			//console.log('skate');

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

			if ($bottle.length === 0){
				return;
			}
			
			var scrollTimeout = null,
   			scrollTimeoutDelay = 20,
    		currentScrollProgress = 0;
			
			var     duration = .4,
   			 ease = Power2.easeOut,
   			 staggerFactor = .1,
    		scrollTweenDuration = .4;

			const maxScroll = 5000;
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
			    //console.log(currentScrollProgress);
			    //timeline.progress(currentScrollProgress); // either directly set the [progress] of the timeline which may produce a rather jumpy result
			    TweenMax.to(tl1, scrollTweenDuration, {
			        progress: currentScrollProgress,
			        ease: ease
			    }); // or tween the [timeline] itself to produce a transition from one state to another i.e. it looks smooth
			}

			function roundDecimal(value, place) {
			    return Math.round(value * Math.pow(10, place)) / Math.pow(10, place);
			}

			$box.css('padding-top', '6000px');


			tl1
			.to($bottle, 1, {
				x: 0,
				y: -120,
				scale: .35,
				rotation: '345deg',
			})
			.fromTo($skate, 1,{
				x: 1500,
				y: 0,
				scale: 0,
			}, {			
				x: 72,
				y: 0,	
				scale: 1,
			}, '-=1')
			.fromTo($hand, 0, {				
				visibility: 'hidden',
			},{				
				visibility: 'visible',
			})
			.to($hand, .5,{
				x: -600,
				opacity: 1,	
			})
			.to($hand, .5,{
				//x: -600,
				opacity: 0,	
			}, '+=1')
			.to($bottle, .5, {
				y: 200,
				rotation: '368deg',
			}, '-=0')
			.to($skate, .5, {
				x: -900,
				y: -500,
				opacity: 0,
				rotation: '180deg',
			}, '-=.5')
			.fromTo($bag, 0, {				
				visibility: 'hidden',
			},{				
				visibility: 'visible',
			}, '-=.5')
			.fromTo($bagMask, 0, {				
				visibility: 'hidden',
			},{				
				visibility: 'visible',
			}, '-=.5')
			.fromTo($bag, .7, {
				y: 300,
			},{
				opacity: 1,
				y: 0,
			},'-=0')
			.fromTo($bagMask, .7, {
				y: 300,
			},{
				opacity: 1,
				y: 0,
			},'-=.7')
			.fromTo($bagText, .5, {
				opacity: 0,
				x: -300,
			},{
				opacity: 1,
				x: 0,
			},'-=0')
			;

			listenToScrollEvent();
			onScroll();
		}
		bottle();



		function colors(){

			const $sex = $('.js-select-sex');
			const $bottleColors = $('.js-select-color');
			const $bottle = $('.js-bottle-animate');

			if ($sex.length === 0){
				return;
			}

			function showBottle(){
				const color = $bottleColors.filter(':checked').val();
				const sex = $sex.filter(':checked').val();

				$bottle.attr('data-color', sex + '-' +color);
			}
			showBottle();

			$sex.on('change', function(){
				showBottle();				
			}); //sex

			$bottleColors.on('change', function(){
				showBottle();				
			}); //bottleColors

		}

		colors();

	
	})(window, document, jQuery, TweenMax, TimelineMax, undefined);

}
