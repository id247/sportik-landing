'use strict';

export default function(){ 

	(function (window, document, $){
	console.log('run');

	var maxHeight = 650;
	var maxWidth = 1020;

	var isMobile = (function() { 
		if( navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
		){
			return true;
		} else {
			return false;
		}
	})();

	function scrollMeTo(){
		
		const $menu = $('#menu');
		
		$('.js-goto').on('click', function(e){
			const paddingTop = $(window).width() > maxWidth ? $menu.outerHeight() : 0;
			const $target = $(this.href.replace( /^.*\#/, '#' ) );
			
			if ($target.length === 1) {
				e.preventDefault();

				$('body,html').animate({ 
					scrollTop: $target.offset().top - paddingTop,
					easing: 'ease-in'
				}, 500);
			};
		});

	};

	function header(){
		const $header = $('#header');
		const $menu = $('#menu');
		const $menuSection = $menu.find('.menu__section');

		$menu.css('height', $menuSection.outerHeight());

		console.log( $menuSection.height());


		function fix(){
			const scrollTop = $(window).scrollTop();
			const showPosition = $header.outerHeight();

			if ( scrollTop > 0 && scrollTop <= showPosition ){
				$menu.addClass('menu--hidden');
				$menu.removeClass('menu--scrolled');
			}else if ( scrollTop > showPosition ){
				$menu.addClass('menu--scrolled');
				$menu.removeClass('menu--hidden');
			}else{
				$menu.removeClass('menu--scrolled');
				$menu.removeClass('menu--hidden');
			}
		}
		fix();

		$(document).on('scroll', fix);
	}


	function menu(){
		var $menuHrefs = $('.menu__href');
		var $sections = $('.section');

		var winHeight = ( window.innerHeight || document.documentElement.clientHeight );

		function setActive(){						
			$sections.each(function(index, section){				
				var sectionId = $(this).attr('id');
				var rect = this.getBoundingClientRect();
				var rectTop = Math.round(rect.top);
				var rectBottom = Math.round(rect.bottom);

				if (rectTop <= 60 && rectBottom / 2 <= winHeight ){
					$menuHrefs.removeClass('active');
					$menuHrefs.filter('[href="#' + sectionId + '"]').addClass('active');
				}
			});
		}
		setActive();

		$(window).on('scroll', function(e){
			setActive();
		});

		$(window).on('resize', function(e){
			winHeight = ( window.innerHeight || document.documentElement.clientHeight );			
			setActive();
		});

	}

	/*
		submit form
	*/

	function form(){		


		$('form').each( function(){

			const $form = $(this);
			const $button = $form.find('button[type="submit"]');
			const $success = $form.find('.order-form__success');
			
			$success.hide();

			$form.on('submit', function(e){

				e.preventDefault();

				const form = e.target;


				$button.text('Отправка данных...');
				$button.attr('disabled', true);

				$.ajax({
					url: $form.attr('action'), 
				    method: 'POST',
				    data: $form.serialize(),
				    dataType: 'json',
				    success: function( response ) {
				    	console.log(response);
						$success.html('Спасибо! Ваша заявка была успешно отправлена!');
						$success.removeClass('order-form__success--error');	
				    },
				    error: function(xhr, ajaxOptions, error){
				    	console.log('Data could not be saved.' + error.message);
						$success.addClass('order-form__success--error');
						$success.html('Ошибка сохранения данных, попробуйте еще раз. Если ошибка повторится - свяжитесь с нами.');

				    },
				    complete: function(){					    	
				    	$success.show();
						$button.attr('disabled', false).text('Отправить заявку');			    	
				    }
				});				
				
				

			});
		});

	}

	function modals(){

		const $html = $('.html');
		const $modals = $('.modal');
		const $modalClose = $('.js-modal-close');
		const $modalOpen = $('.js-modal-open');
		const $modalVideoOpen = $('.js-modal-video-open');
		const $modalVideoFrame = $('#modal-video-frame');

		const visibleClass = 'modal--visible';
		const htmlClass = 'html--modal';

		function show(id){			
			$html.addClass(htmlClass);
			$modals.filter(id).addClass(visibleClass);
		}

		function hide(){
			$html.removeClass(htmlClass);
			$modals.removeClass(visibleClass);
		}

		$modalClose.on('click', function(e){
			e.preventDefault();
			hide();
		});

		$modalOpen.on('click', function(e){
			e.preventDefault();
			
			const id = $(this).attr('href');

			show(id);
		});

		$modalVideoOpen.on('click', function(e){
			e.preventDefault();
			
			const videoId = $(this).attr('href').match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);

			if (!videoId){
				return;
			}

			const embedUrl = 'https://www.youtube.com/embed/' + videoId[1] + '?autoplay=1';

			$modalVideoFrame.attr('src', embedUrl);

			show('#modal-video-player');
		});
	}

	/* ==========================================================================
	 * important
	 * ========================================================================== */


	function important(){

		const $important = $('#important');

		if ($important.length === 0){
			return;
		}

		const $items = $important.find('.js-item');
		const $itemsDots = $important.find('.js-item-dots');
		const $bottle = $important.find('.js-bottle');

		const $open = $important.find('.js-bubble-open');
		const $close = $important.find('.js-bubble-close');
		const $bubbles = $important.find('.js-bubble');
		
		const $bottleFull = $important.find('.js-bottle-full');

		const $win = $(window);
		
		let winWidth = $win.width();
		let winHeight = $win.height();

		const clicked =[0,0,0,0,0];

		const openClass = 'important-list-item__bubble--visible';

		const extras = [
			1.5,
			3.6,
			2.5,
			5.0,
			2.3
		];

		function fillBottle(){
			const clickedCount = clicked.filter( item => item > 0 ).length;
			
			let height = 5;

			switch(clickedCount){
				case 1:
					height = 15;
					break;
				case 2:
					height = 25;
					break;
				case 3:
					height = 35;
					break;
				case 4:
					height = 65;
					break;
				case 5:
					height = 100;
					break;
				default:
			}

			$bottleFull.css('height', height + '%');
		}
		fillBottle();

		$open.on('click', function(e){

			const $this = $(this);
			const $bubble = $this.parent().find('.js-bubble');
			const id = parseInt($this.data('id'));
			
			$bubble.toggleClass(openClass);

			$bubbles.not($bubble).removeClass(openClass);

			clicked[id] = 1;

			fillBottle();
		})

		$close.on('click', function(e){
			$bubbles.removeClass(openClass);
		})

		$(document).on('mousemove', function(e){

			const x = - ( e.clientX - winWidth / 2 ) / 80;
			const y = - ( e.clientY - winHeight / 2 ) / 40;

			const girlX = -x;
			const girlY = -y;


			
			$items.each(function(index){

				const xx = x * extras[index];
				const yy = y * extras[index];

				$(this).css({
					'-ms-transform': 'translate(' + xx + 'px, ' + yy + 'px)',
					'-webkit-transform': 'translate(' + xx + 'px, ' + yy + 'px)',
					'transform': 'translate(' + xx + 'px, ' + yy + 'px)',
				});

				$itemsDots.eq(index).css({
					'-ms-transform': 'translate(' + xx + 'px, ' + yy + 'px)',
					'-webkit-transform': 'translate(' + xx + 'px, ' + yy + 'px)',
					'transform': 'translate(' + xx + 'px, ' + yy + 'px)',
				});

			});
			
			$bottle.css({
				'-ms-transform': 'translate(' + girlX + 'px, ' + girlY + 'px)',
				'-webkit-transform': 'translate(' + girlX + 'px, ' + girlY + 'px)',
				'transform': 'translate(' + girlX + 'px, ' + girlY + 'px)',
			});
		});

		$win.on('resize', function(){
			winWidth = $win.width();
			winHeight = $win.height();
		});
	}	

	function quiz(){

		const $quiz = $('#quiz');

		if ($quiz.length === 0){
			return;
		}

		let currentQuestion = 0;

		const $boxes = $quiz.find('.js-quiz-box');
		const $nextQuestionButton = $quiz.find('.js-next-question');
		const $select = $quiz.find('.js-select');
		const $resultBottles = $quiz.find('.js-result-bottles');
		const $resultBottlesCount = $quiz.find('.js-result-bottles-count');
		const resultBottleHtml = $resultBottles.html();

		function render(){
			$boxes.hide().eq(currentQuestion).show();
		}

		function nextQuestion(){

			if (currentQuestion === $boxes.length - 1){
				currentQuestion = 1;
			}else{
				currentQuestion++;
			}		

			if (currentQuestion === $boxes.length - 2 ){
				results();
			}

			render();
		}

		function results(){
			const $radios = $quiz.find('input[type="radio"]:checked');

			let count = 0;
			let html = '';

			$radios.each(function(){
				count += parseInt(this.value);
			});

			for (let i = 0; i < count ; i++){
				html += resultBottleHtml;
			}

			$resultBottles.html(html);

			const resultCount = count === 1 ? count + ' БУТЫЛОЧКА' : count + ' БУТЫЛОЧКИ'

			$resultBottlesCount.html(resultCount);

		}

		$nextQuestionButton.on('click', function(e){
			e.preventDefault();

			nextQuestion();
		});

		$select.on('change', function(e){			

			if (this.value !== ''){
				$(this).parents('.js-quiz-box').find('.js-next-question').attr('disabled', false);
			}else{
				$(this).parents('.js-quiz-box').find('.js-next-question').attr('disabled', true);
			}
		});

	}

	function read(){
		const $readBook = $('#read-book');

		if ($readBook.length === 0){
			return;
		}

		const $nexts = $readBook.find('.js-next');
		const $prevs = $readBook.find('.js-prev');

		const book = $readBook.turn({
			width: 812,
			height: 579,
			autoCenter: false,
			page: 2,
			gradients: true,
			//turnCorners: false,
			when: {
		      start: function(event, pageObject, corner) {
		       	if (corner != null) {
		        	//return event.preventDefault();
		    	}
		      },
		      turning: function(event, page, corner) {
		        if (page==1) {
		          return event.preventDefault();
		       	}
		      }
     		},
		});

		$nexts.on('click', function(e){
			e.preventDefault();

			console.log('next');

			//$readBook.turn('next');
		})

		$prevs.on('click', function(e){
			e.preventDefault();

			console.log('previous');

			//$readBook.turn('previous');
		})

	}


	function init(){

		if (!isMobile){
			header();
		}

		scrollMeTo();
		menu();
		//form();
		modals();

		important();
		quiz();
		read();
	}
	
	init();

	})(window, document, jQuery, undefined);

}
