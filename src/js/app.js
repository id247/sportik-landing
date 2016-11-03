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
		const $header = $('#header');
		
		$('.js-goto').on('click', function(e){
			//const paddingTop = $(window).width() > maxWidth ? $menu.outerHeight() : 0;
			
			const href = this.href || this.getAttribute('data-href');
			if (!href){
				return;
			}
			const paddingTop = $menu.outerHeight();// + $header.outerHeight();
			const $target = $(href.replace( /^.*\#/, '#' ) );
			const speed = $(this).data('speed') ? $(this).data('speed') : 500;
			
			if ($target.length === 1) {
				e.preventDefault();

				$('body,html').animate({ 
					scrollTop: $target.offset().top - paddingTop,
					easing: 'ease-in'
				}, speed);
			};
		});

	};

	function header(){
		const $header = $('#header');
		const $menu = $('#menu');
		const $menuSection = $menu.find('.menu__section');

		$menu.css('height', $menuSection.outerHeight());

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

				if (rectTop <= 70 //&& rectBottom / 2 <= winHeight 
					){
					$menuHrefs.removeClass('active');
					$menuHrefs.filter('[href*="' + sectionId + '"]').addClass('active');
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

			if ($(e.target).hasClass('js-modal-close')){
				e.preventDefault();
				$modalVideoFrame.attr('src', 'about:blank');
				hide();
			}
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

			if ($bubble.hasClass(openClass)){
				$bubble.removeClass(openClass);
			}else{
			
				$bubble.addClass(openClass);

				const top = $bubble.offset().top - 80;

				if ($win.scrollTop() > top){

					$('body,html').animate({ 
						scrollTop: top,
						easing: 'ease-in'
					}, 500);

				}

			}

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
		      	//console.log(event, page, corner);

		      	if (page >= corner[1]){
		      		console.log('prev');
		      		adRiverSend('button_32');
		      	}else{
		      		console.log('next');
		      		adRiverSend('button_31');
		      	}

		        if (page==1) {
		          return event.preventDefault();
		       	}
		      }
     		},
		});

	}


	function sendGa(title, action){
		console.log('ga',title, action);
		if (typeof ga === 'function'){
			ga('send', 'event', title, action);
		}
	}

	function adRiverSend(label){

		console.log('adriver', label);

		if (typeof ar_sendPixel === 'function'){
			ar_sendPixel( label );
		}

		// switch(label){

		// 	case 'button_47': 
		// 		sendGa('меню_КН_дети', 'увидишь');
		// 		break;

		// 	case 'button_48': 
		// 		sendGa('меню_КН_дети', 'посчитать');
		// 		break;

		// 	case 'button_49': 
		// 		sendGa('меню_КН_дети', 'удивительные');
		// 		break;

		// 	case 'button_50': 
		// 		sendGa('меню_КН_дети', 'питьевой_режим');
		// 		break;

		// 	case 'button_51': 
		// 		sendGa('Меню_видео_КН', 'видео-меню');
		// 		break;

		// 	case 'button_1': 
		// 	case 'button_62': 
		// 		sendGa('видео_КН-ПР', 'газировка');
		// 		break;

		// 	case 'button_2': 
		// 	case 'button_61': 
		// 		sendGa('видео_КН-ПР', 'цветы');
		// 		break;

		// 	case 'button_3': 
		// 		sendGa('видео_КН-ПР', 'рассуждают');
		// 		break;

		// 	case 'button_52': 
		// 		sendGa('Меню_тест_КН', 'пройди-тест');
		// 		break;

		// 	case 'button_4': 
		// 		sendGa('тест_КН', 'узнай_сколько');
		// 		break;

		// 	case 'button_7': 
		// 		sendGa('тест_КН', 'результат');
		// 		break;

		// 	case 'button_53': 
		// 		sendGa('Меню-инфогр_КН', 'инфгрф-меню-дети');
		// 		break;

		// 	case 'button_17': 
		// 		sendGa('Меню-герой-КН', 'герой-меню');
		// 		break;

		// 	case 'button_17': 
		// 		sendGa('Меню-герой-КН', 'герой-меню');
		// 		break;

		// 	case 'button_56': 
		// 		sendGa('меню_КН_взросл', 'важность');
		// 		break;

		// 	case 'button_57': 
		// 		sendGa('меню_КН_взросл', 'диетолог');
		// 		break;

		// 	case 'button_58': 
		// 		sendGa('меню_КН_взросл', 'водный-баланс');
		// 		break;

		// 	case 'button_59': 
		// 		sendGa('меню_КН_взросл', 'видеоролики');
		// 		break;

		// 	case 'button_60': 
		// 		sendGa('Статья_Взросл-вода_КН', 'меню-статьи');
		// 		break;

		// 	case 'button_63': 
		// 		sendGa('Взросл-кальк_КН', 'рассчитать');
		// 		break;

		// 	case 'button_64': 
		// 		sendGa('Взросл-инфогр_КН', 'рассчитать');
		// 		break;

		// 	case 'button_65': 
		// 		sendGa('Взросл-кальк_КН', 'рассчитать');
		// 		break;


		// }

	}

	function adriver(){
		const $links = $('[data-adriver]');
		const $linksGa = $('[data-ga]');


		$links.on('click', function(e){
			
			const label = $(this).data('adriver');

			if (label){
				e.stopPropagation();
				adRiverSend( label );
			}			
		
		});

		$linksGa.on('click', function(e){
			
			const id = parseInt($(this).data('ga'));

			switch (id){
				case 1: 
					sendGa('Видео-ВЗР', 'КН- дети рассуждают о воде');
					break;
				case 2: 
					sendGa('Видео-ВЗР', 'КН- что будет если вскипятить газировку?');
					break;
				case 3: 
					sendGa('Видео-ВЗР', 'КН-выживут ли цветы в газировке?');
					break;
				case 4: 
					sendGa('Видео-Дети', 'КН- дети рассуждают о воде');
					break;
				case 5: 
					sendGa('Видео-Дети', 'КН- что будет если вскипятить газировку?');
					break;
				case 6: 
					sendGa('Видео-Дети', 'КН-выживут ли цветы в газировке?');
					break;
				case 7: 
					sendGa('Статья-Дети', '10 интересных фактов');
					break;
				case 8: 
					sendGa('Инфографика- ВЗР-10Причин', 'КН- Закрыть');
					break;
				case 9: 
					sendGa('Статья-Дети', 'Как вода путешествует');
					break;
				case 10: 
					sendGa('Инфографика- Дети-Как вода помогает нам', 'КН-Узнать');
					break;
				case 11: 
					sendGa('Меню- ВЗР', 'О продукте');
					break;
				case 12: 
					sendGa('Меню- Дети', 'Выбери своего героя');
					break;
				case 13: 
					sendGa('Меню- Дети', 'Твой Спортик');
					break;
				case 14: 
					sendGa('Питьевой режим- ВЗР', 'КН- составить питьевой режим');
					break;
				case 15: 
					sendGa('Статья-ВЗР', 'Почему важно употреблять именно воду?');
					break;
				case 16: 
					sendGa('Статья-ВЗР', 'Как отучить ребёнка от газировки?');
					break;
				case 17: 
					sendGa('Статья-ВЗР', 'Как приучить ребёнка пить воду?');
					break;
				case 18: 
					sendGa('Тест- Дети', 'КН- Пройти еще раз');
					break;
				case 19: 
					sendGa('Тест- Дети', 'КН- Сколько воды Тебе нужно?');
					break;
				case 20: 
					sendGa('Тест- Дети', 'КН- Узнать');
					break;
				
				
			}			
		
		});

		$(document).on('click', '.comments-form__action-placeholder button', function(){

			let label = '';

			if (location.href.indexOf('article-3') > -1){
				label = 'button_20';
			}

			if (location.href.indexOf('article-4') > -1){
				label = 'button_23';
			}

			if (location.href.indexOf('article-5') > -1){
				label = 'button_26';
			}

			adRiverSend(label);

		});

	}


	function init(){

		if (!isMobile){
			header();
		}

		scrollMeTo();
		menu();
		modals();

		important();
		read();
		adriver();
	}
	
	init();

	})(window, document, jQuery, undefined);

}
