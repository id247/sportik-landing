'use strict';

export default (function (window, document, $){
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

	function init(){

		if (!isMobile){
			header();
		}

		scrollMeTo();
		menu();
		form();
		modals();
	}

	return {
		init 
	}

})(window, document, jQuery, undefined);
