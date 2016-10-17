'use strict';

export default function(){

	(function (window, document, $){
		console.log('calculator');

		const $calculator = $('#calculator');

		if ($calculator.length === 0){
			return;
		}


		const $form = $calculator.find('form');
		const $result = $calculator.find('.js-result');

	    /*
	     * Расписание приемов воды для сервиса
	     */
	    var $serviceSchedule = [
	        {
	            'icon': 'glass',//Тип иконки(стакан или бутылочка)
	            'title': 'Вода натощак',//Заголовок
	            'desc': 'До завтрака желательно выпивать от 50 до 200 мл воды в зависимости от возраста;',//Описание
	            'fixed': true//Фиксированное кол-во воды
	        },
	        {
	            'icon': 'glass',
	            'title': 'Вода за завтраком',
	            'desc': 'К завтраку можно подать теплый чай, какао или морс;',
	            'fixed': false,//Динамическое кол-во воды
	            'time': 'breakfast'//Связь с переменной времени завтрака
	        },
	        {
	            'icon': 'glass',
	            'title': 'Вода после приема пищи',
	            'desc': 'Через 2-3 часа после плотного завтрака нужно предложить ребенку выпить воды;',
	            'fixed': true
	        },
	        {
	            'icon': 'bottle',
	            'title': 'Вода в школе или детском саду',
	            'desc': 'В учебном заведении ребенок проводит много времени, поэтому он должен иметь возможность выпить воды тогда, когда ему этого захочется;',
	            'fixed': false,
	            'relation': 'school'//Связь с переменной школы или детского сада
	        },
	        {
	            'icon': 'glass',
	            'title': 'Вода перед обедом или во время обеда',
	            'desc': 'Рекомендуется выпивать стакан воды за 30 минут до приема пищи. В обед предложите ребенку суп, а к десерту лучше подать компот или кисель.',
	            'fixed': true,
	            'time': 'lunch'//Связь с переменной времени обеда
	        },
	        {
	            'icon': 'bottle',
	            'title': 'Вода во время прогулки',
	            'desc': 'Во время прогулок и подвижных игр дети должны иметь возможность утолить жажду;',
	            'fixed': false,
	            'relation': 'walk'//Связь с переменной игры во дворе
	        },
	        {
	            'icon': 'glass',
	            'title': 'Вода перед полдником',
	            'desc': 'Не стоит давать ребенку сладкую газированную воду — замените их 200 мл простой питьевой воды;',
	            'fixed': false,
	            'time': 'dinner'//Связь с переменной времени полдника
	        },
	        {
	            'icon': 'bottle',
	            'title': 'Вода после секций или уроков физической культуры',
	            'desc': 'После тренировки ребенок должен выпить столько воды, сколько требуется его организму;',
	            'fixed': false,
	            'relation': 'section'//Связь с переменной спортивные или творческие секции
	        },
	        {
	            'icon': 'glass',
	            'title': 'Вода после ужина',
	            'desc': 'Пополняем баланс жидкости в организме с помощью любимого напитка — это может быть чай, какао или ягодный морс.',
	            'fixed': true,
	            'time': 'supper'//Связь с переменной времени ужина
	        },
	    ];


	    /*
	     * Ориентировочное количество потребления воды для разного возраста в сутки
	     */
	    function getNeedWater($age) {
	        $age = parseInt($age);
	        if($age <= 1) { //От 6 до 12 месяцев – 0,2-0,5 л;
	            return 500;
	        } else if($age <= 2) {//От 1 года до 2 лет – 0,5-1,2 л;
	            return 1200;
	        } else if($age <= 4) {//От 2 до 4 лет – 1,2-1,5 л;
	            return 1500;
	        } else if($age <= 6) {//От 4 до 6 лет – 1,5-1,7 л;
	            return 1700;
	        } else {//От 7 до 12 лет – 1,7-2 л.
	            return 2000;
	        }
	    }

	    /*
	     * Сколько нужно воды в фиксированные приемы(Вода натощак, Вода после приема пищи,
	     * Вода перед обедом или во время обеда, Вода после ужина)
	     */
	    function getNeedWaterFix($age) {
	        $age = parseInt($age);
	        if($age <= 1) { //От 6 до 12 месяцев;
	            return 50;
	        } else if($age <= 2) {//От 1 года до 2 лет;
	            return 100;
	        } else if($age <= 4) {//От 2 до 4 лет;
	            return 150;
	        } else if($age <= 6) {//От 4 до 6 лет;
	            return 150;
	        } else {//От 7 до 12 лет.
	            return 200;
	        }
	    }


	   /*
	     * Подводка под результатами расчета
	     */
	    function getResultText($age) {
	        $age = parseInt($age);
	        if($age <= 1) { //От 6 до 12 месяцев;
	            return 'С введением прикорма дополнительное питье предлагают всем деткам. Делать это следует мягко и ненавязчиво, желательно между кормлениями. Давайте своему малышу только качественную питьевую воду.';
	        } else if($age <= 2) {//От 1 года до 2 лет;
	            return 'Суточная потребность в жидкости в возрасте 1-2 года существенно увеличивается, поскольку это период наиболее активного физического роста и развития двигательных навыков. Важным моментом является и удобный формат бутылочки с водой, которую вы предлагаете крохе.';
	        } else if($age <= 4) {//От 2 до 4 лет;
	            return 'Минералы и микроэлементы, содержащиеся в качественной питьевой воде, необходимы для того, чтобы ваш ребенок целый день был бодрым и полным энергии. Обратите внимание на спортивный колпачок – он позволит вашему непоседе чувствовать себя более самостоятельным.';
	        } else if($age <= 6) {//От 4 до 6 лет;
	            return 'Все ребята-дошкольники обожают подвижные игры. После такой активности ребенку просто необходимо пополнить баланс жидкости в организме, не допуская обезвоживания А закрепить полезную привычку поможет яркая и веселая упаковка.';
	        } else {//От 7 до 12 лет.
	            return 'В школьном возрасте потребность в воде еще больше возрастает, и к 12 годам ребенок выпивает уже около 2 л в день. Помните о том, что помимо чая, соков и компотов обязательно нужно пить воду – жизненно важный напиток для человека любого возраста. А поддерживать питьевой баланс вашему школьнику поможет интересная бутылочка с «детским» дизайном.';
	        }
	    }

	    /*
	     * Кол-во приемов воды с фиксированной нормой
	     */
	    function getFixedCount() {	       
	       	const fixed = $serviceSchedule.filter( item => item.fixed);
	        return fixed.length;
	    }

	    /*
	     * Сколько нужно воды в динамичные приемы(Вода за завтраком, Вода в школе или детском саду,
	     * Вода во время прогулки, Вода перед полдником, Вода после секций или уроков физической культуры)
	     */
	    function getNeedWaterDynamic($needWaterDay, $needWaterFix) {
	        $needWaterDay = parseInt($needWaterDay);
	        $needWaterFix = parseInt($needWaterFix);

	        const $countFix = getFixedCount();
	        const $countDynamic = $serviceSchedule.length - $countFix;

	        if($needWaterDay && $needWaterFix) {
	            return ($needWaterDay - ($needWaterFix * $countFix)) / $countDynamic;
	        } else {
	            return false;
	        }
	    }


		function calculate(form){

				const outdoor = [];

	            if (form.elements.kindergarten.value === '1' || form.elements.school.value === '1') {
	                outdoor.push('school');
	            }

	            if ( form.elements.creative_section.value === '1' || form.elements.sport_sections.value === '1' ) {
	                outdoor.push('section');
	            }

	            if ( form.elements.walk.value === '1') {
	                outdoor.push('walk');
	            }

	            const times = {
	            	breakfast: form.elements.time_breakfast.value,
            		lunch: form.elements.time_lunch.value,
           		 	dinner: form.elements.time_dinner.value,
            		supper: form.elements.time_supper.value,
	            };

	            const age = form.elements.age.value;

	            function getTime(itemTime){
	            	if (!itemTime || times[itemTime] === ''){
	            		return '';
	            	}
	            	return '<div class="calc-results-item__time">' + times[itemTime] + '</div>';
	            }

	            console.log('age', age);



	            //Сколько всего нужно воды в день
	            const needWaterDay = getNeedWater(age);

	            //Сколько нужно воды в фиксированные приемы(Вода натощак, Вода после приема пищи,
	            //Вода перед обедом или во время обеда, Вода после ужина)
	            const needWaterFix = getNeedWaterFix(age);

	            //Сколько нужно воды в динамичные приемы(Вода за завтраком, Вода в школе или детском саду,
	            //Вода во время прогулки, Вода перед полдником, Вода после секций или уроков физической культуры)
	            const needWaterDynamic = getNeedWaterDynamic(needWaterDay, needWaterFix);

	            const resultText = getResultText(age);



				let html = `
					<ul class="calc-results__list">
				`;


				$serviceSchedule.map( $item => {

					const icon =  $item.icon ? $item.icon : '';

					const time = getTime($item.time);

					const needWater = $item.fixed ? needWaterFix : needWaterDynamic;

					const descr = ($item.relation && outdoor.indexOf($item.relation) > -1)
                        			?
                        			`
										<h4 class="calc-results-item__title">Прием воды в течение дня</h4>
                        			`
                        			:
                        			`										 
										<h4 class="calc-results-item__title">${$item['title']}</h4>
										<div class="calc-results-item__text">
                               				<p>${$item['desc']}</p>
                               			</div>
                        			`
                        			;

					html += `
						<li class="calc-results__item calc-results-item">
							<div class="calc-results-item__col">
								<span class="calc-results-item__icon calc-results-item__icon--${icon}">${icon}</span>
							</div>
							<div class="calc-results-item__col">
								${time}
							</div>
							<div class="calc-results-item__col">
								<div class="calc-results-item__water">
									<span class="calc-results-item__water-number">${needWater}</span> 
									гр.
								</div>
							</div>
							<div class="calc-results-item__col">
								<div class="calc-results-item__desr">
									${descr}
								</div>
							</div>
						</div>
					`
					;

                });
				html += `
					</ul>
				`
				;

                html += `
					<div class="calc-results__total-water">
						<div> 
							<span class="calc-results__total-water-number">${needWaterDay}</span> гр
						</div>
						ВСЕГО ВОДЫ В ДЕНЬ
					</div>
                `;

                html += `
					<div class="calc-results__text">
						${resultText}
					</div>
                `;

                $form.hide();
                $result.show();
                $result.html(html);

		}

		$form.on('submit', function(e){
			e.preventDefault();

			calculate(this);
		});

	})(window, document, jQuery, undefined);

}
