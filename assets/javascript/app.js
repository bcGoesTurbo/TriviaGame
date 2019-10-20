var triviaQuestions = [{
	question: "In what year was the first star wars movie released?",
	answerList: ["1977", "1979", "1987", "1995"],
	answer: 0
},{
	question: "Who was Luke Skywalkers father?",
	answerList: ["Yoda", "Darth Sidious", "Darth Vader", "Mr Skywalker"],
	answer: 2
},{
	question: "What was the name of Han Solo's ship?",
	answerList: ["Ebon Hawk", "X-wing Starfighter", "Death Star", "Millennium Falcon"],
	answer: 3
},{
	question: "Which young Jedi Knight becomes Darth Vader in Star Wars?",
	answerList: ["Kanan Jaras", "Jacen Solo", "Anakin Skywalker", "Luke Skywalker"],
	answer: 2
},{
	question: "Who kills Jabba The Hutt?",
	answerList: ["Obi-Wan Kenobi", "Luke Skywalker", "Princess Leia", "Han Solo"],
	answer: 2
},{
	question: "What was Luke Skywalker’s original surname?",
	answerList: ["Skywalker", "Solo", "Amidala", "Starkiller"],
	answer: 3
},{
	question: "Who was originally called Buffy?",
	answerList: ["Obi-Wan Kenobi", "Han Solo", "Yoda", "Jabba the Hut"],
	answer: 2
},{
	question: "What planet do Wookiees come from?",
	answerList: ["Kashyyk", "Tatooine", "Wobani", "Jedha"],
	answer: 0
}];

var jpgArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
    console.log(this);
    newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

// 
function newGame()
{
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#jpg').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#jpg').html('<img src = "assets/images/'+ jpgArray[currentQuestion] +'.jpg" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#jpg').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}