'use strict';

import Cookie from 'js-cookie';

import { PromoOptions } from 'appSettings';

export default function(){

	const store = {
		cookies: {
			chosenPers: false,
		}		
	};

	function getCookies(){
		const cookies = Cookie.get(PromoOptions.cookieName);

		if (!cookies){
			return;
		}

		try{

			store.cookies = {
				...store.cookies,
				...JSON.parse(cookies),
			}

		}catch(e){
			console.error(e);
			return;
		}

		console.log(store.cookies);
		
		return true;
	}

	function setCookies(){
		const data = JSON.stringify(store.cookies);

		Cookie.set(PromoOptions.cookieName, data, { 
			domain: PromoOptions.cookieDomain, 
			expires: 365,
			path: '/'
		});		
	}


	(function (window, document, $){
		console.log('pers');

		const $modalPers = $('#modal-pers');
		const $menuPers = $('.js-menu-pers');
		const $html = $('.html');

		if ($menuPers.length === 0){
			return;
		}

		function menu(){

			$menuPers.attr('data-menu-pers', store.cookies.chosenPers);
		}

		function modal(){

			const $persItems = $modalPers.find('.js-pers-input');
			const $persItemsParent = $persItems.parent();
		
			function activeInputs(){
				if (store.cookies.chosenPers){
					$persItems.addClass('modal-pers-item__input--active');
				}
				const $activeInput = $persItems.filter('[value="' + store.cookies.chosenPers + '"]');

				if (!$activeInput.is(':checked')){
					$activeInput.attr('checked', true);
				}
			}

			function show(){
				if (store.cookies.chosenPers){
					return false;
				}

				if (typeof ar_sendPixel === 'function'){
					ar_sendPixel( 'button_55' );
				}

				$html.addClass('html--modal');
				$modalPers.addClass('modal--visible');
			}			
			
			$persItems.on('change', function(e){

				const persId = this.value;
				
				store.cookies.chosenPers = persId;

				setCookies();
				activeInputs();
				menu();
				//$modalPers.removeClass('modal--visible');

				$html.removeClass('html--modal');
				$modalPers.removeClass('modal--visible');

			});

			$persItemsParent.on('mouseenter', function(){
				$persItems.addClass('modal-pers-item__input--active');
			});

			function init(){
				activeInputs();
				show();
			}

			init();
		}

		$menuPers.on('click', function(){
			$html.addClass('html--modal');
			$modalPers.addClass('modal--visible');
		});

		function init(){
			getCookies();
			modal();
			menu();
		}
		init();
		

	})(window, document, jQuery, undefined);

}
