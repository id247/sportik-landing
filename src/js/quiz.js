export default function(){

	(function (window, document, $){

		const $quiz = $('#quiz');

		if ($quiz.length === 0){
			return;
		}

		let currentQuestion = 0;
		let age = 5;

		const $boxes = $quiz.find('.js-quiz-box');
		const $nextQuestionButton = $quiz.find('.js-next-question');
		const $select = $quiz.find('.js-select');
		const $resultText = $quiz.find('.js-result-text');
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

			if (currentQuestion === $boxes.length - 1 ){
				results();
			}

			render();
		}

		function results(){
			const $radios = $quiz.find('input[type="radio"]:checked');

			const question2 = parseInt($quiz.find('input[name="question-2"]:checked').val());
			const question3 = parseInt($quiz.find('input[name="question-3"]:checked').val());
			const question4 = parseInt($quiz.find('input[name="question-4"]:checked').val());
			const question5 = parseInt($quiz.find('input[name="question-5"]:checked').val());
			const question6 = parseInt($quiz.find('input[name="question-6"]:checked').val());

			let count = 0;
			let text = '';
			let html = '';

			//$radios.each(function(){
				//count += parseInt(this.value);
			//});
			
			console.log('age', age);
			console.log(2, question2);
			console.log(3, question3);
			console.log(4, question4);
			console.log(5, question5);
			console.log(6, question6);

			switch(true){
				case ( age <= 6):

					//if 6 yes
					if (question6 === 1){
						text = 'Ты молодец! Чтобы не уставать и лучше учиться, не забывай пить воду, ведь из неё на 85% состоит наш мозг! В твоём возрасте нужно выпивать каждый день 1,5 литра воды. Это примерно 4 бутылочки «Спортика»! Возьми одну с собой в школу: природная вода содержит природную силу!';
						count = 4;
					}

					//if 2-4 all no
					else if (question2 === 0 && question3 === 0 && question4 === 0 ){
					
						text = 'Ты молодец! Твоя ежедневная норма — 1,5 литра воды. Это примерно 4 бутылочки «Спортика». Ты заметишь, как у тебя улучшится настроение, если будешь пить воду! Не забывай брать «Спортик» с собой: бутылочка легко поместится даже в самый маленький рюкзачок, а весёлые персонажи на этикетке не дадут тебе заскучать!';
						count = 4;

					} 
					//if 2-4 > 2 yes
					else if (question2 + question3 + question4 > 1 ){
					
						text = 'Ты молодец! Ты ведёшь очень активный образ жизни и любишь движение. Поэтому для тебя особенно важно пить воду. Твоя ежедневная норма — 1,5 литра воды. Это примерно 4 бутылочки «Спортика»! Не забывай брать одну с собой: она легко поместится даже в самый маленький рюкзачок, а удобная крышка позволит тебе в любой момент легко и быстро открыть бутылочку.';
						count = 4;

					}
					
					else if (question2 === 1){
						text = 'Ты молодец! Раз ты любишь физкультуру, для тебя особенно важно пить воду. Чтобы стать настоящим спортсменом, выпивай каждый день 1,5 литра воды — это примерно 4 бутылочки «Спортика»! Не забывай брать одну с собой в школу — удобная бутылочка не займёт много места в рюкзаке!';
						count = 4;
					}

					else if (question3 === 1){
						text = 'Ты молодец! Чтобы у тебя всегда оставались силы на твои хобби и увлечения, не забывай пить воду! Твоя ежедневная норма — 1,5 литра воды. Это примерно 4 бутылочки «Спортика»! Бери одну с собой в школу: она легко поместится даже в самый маленький рюкзачок, а удобная крышка позволит тебе в любой момент легко и быстро открыть бутылочку.';
						count = 4;
					}

					else if (question4 === 1){
						text = 'Ты молодец! Чтобы стать настоящим спортсменом, тебе нужно много тренироваться и не забывать о воде! В твоём возрасте спортсмену нужно выпивать каждый день 1,5 литра воды. Это примерно 4 бутылочки «Спортика»! Выбирай любимый цвет колпачка и бери воду с собой!';
						count = 4;
					}

					break;

				case ( age >= 7):

					//if 6 yes
					if (question6 === 1){
						text = 'Ты молодец! Чтобы не уставать и лучше учиться, не забывай пить воду, ведь из неё на 85% состоит наш мозг! В твоём возрасте нужно выпивать каждый день 1,7 литра воды. Это примерно 5 бутылочек «Спортика»! Возьми одну с собой в школу: природная вода содержит природную силу!';
						count = 5;
					}

					//if 2-4 all no
					else if (question2 === 0 && question3 === 0 && question4 === 0 ){
					
						text = 'Ты молодец! Твоя ежедневная норма — 1,7 литра воды. Это примерно 5 бутылочек «Спортика»! Ты заметишь, как у тебя улучшится настроение, если будешь пить воду! Не забывай брать «Спортик» с собой: бутылочка легко поместится даже в самый маленький рюкзачок, а весёлые персонажи на этикетке не дадут тебе заскучать!';
						count = 5;

					} 
					//if 2-4 > 2 yes
					else if (question2 + question3 + question4 > 1 ){
					
						text = 'Ты молодец! Ты ведёшь очень активный образ жизни и любишь движение. Поэтому для тебя особенно важно пить воду. Твоя ежедневная норма — 1,7 литра воды. Это примерно 5 бутылочек «Спортика»! Не забывай брать одну с собой: она легко поместится даже в самый маленький рюкзачок, а удобная крышка позволит тебе в любой момент легко и быстро открыть бутылочку.';
						count = 5;

					}
					
					else if (question2 === 1){
						text = 'Ты молодец! Раз ты любишь физкультуру, для тебя особенно важно пить воду. Чтобы стать настоящим спортсменом, выпивай каждый день 1,7 литра воды. Это примерно 5 бутылочек «Спортика»! Не забывай брать одну с собой в школу — удобная бутылочка не займёт много места в рюкзаке.';
						count = 5;
					}

					else if (question3 === 1){
						text = 'Ты молодец! Чтобы у тебя всегда оставались силы на твои хобби и увлечения, не забывай пить воду! Твоя ежедневная норма — 1,7 литра воды. Это примерно 5 бутылочек «Спортика»! Бери одну с собой в школу: она легко поместится даже в самый маленький рюкзачок, а удобная крышка позволит тебе в любой момент легко и быстро открыть бутылочку.';
						count = 5;
					}

					else if (question4 === 1){
						text = 'Ты молодец! Чтобы стать настоящим спортсменом, тебе нужно много тренироваться и не забывать о воде! В твоём возрасте спортсмену нужно выпивать каждый день 1,7 литра воды. Это примерно 5 бутылочек «Спортика»! Выбирай любимый цвет колпачка и бери воду с собой!';
						count = 5;
					}

					break;
			}


			for (let i = 0; i < count ; i++){
				html += resultBottleHtml;
			}

			$resultBottles.html(html);

			let resultCount = '';

			switch(count){
				case 1:
					resultCount = count + ' БУТЫЛОЧКА';
					break;
				case 2:
				case 3:
				case 4:
					resultCount = count + ' БУТЫЛОЧКИ';
					break;
				default: 
					resultCount = count + ' БУТЫЛОЧЕК';
			}

			$resultBottlesCount.html(resultCount);
			$resultText.html(text);

		}

		$nextQuestionButton.on('click', function(e){
			e.preventDefault();

			nextQuestion();
		});

		$select.on('change', function(e){			

			if (this.value !== ''){
				age = parseInt(this.value);
				$(this).parents('.js-quiz-box').find('.js-next-question').attr('disabled', false);
			}else{
				$(this).parents('.js-quiz-box').find('.js-next-question').attr('disabled', true);
			}
		});
	
	})(window, document, jQuery, undefined);

}
