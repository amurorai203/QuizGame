var timerObj = document.querySelector(".timer");
var startScreenObj = document.querySelector("#start-screen");
var questionObj = document.querySelector("#questions");
var choiceAvailable = document.querySelector("#choices");
var endScreenObj = document.querySelector("#end-screen");
var feedBackObj = document.querySelector("#feedback");
var startButtonObj = document.querySelector("#start")
var submitButtonObj = document.querySelector("#submit");
var allowTimePerQuestion = 10;
var currentQuestion = 0;
var reduceTimeWhenWrong = 2;
var secondsLeft = 0;
var answered = false;
var wrongCount = 0;
var correctCount = 0;
var currentQuestionTimeLeft = allowTimePerQuestion;
var scoreList = [];

function init(){
    scoreList = JSON.parse(localStorage.getItem("GameScoreResult"));
    if (scoreList === null){
        scoreList = [];
    }
    console.log(scoreList);
}

function startGame(){
// trigger timer
    secondsLeft = quizQuestions.length * allowTimePerQuestion;
    timerObj.textContent = secondsLeft + " seconds left";

    
    if (quizQuestions.length > 0){
        startScreenObj.innerHTML = "";
        rendorQuestion(0);
    } else{
        alert("No question defined to play game.");
        return;
    }

    var timerInterval = setInterval(function() {
        timerObj.textContent = secondsLeft + " seconds left";
        // console.log(secondsLeft + " "+ allowTimePerQuestion + " " + secondsLeft % allowTimePerQuestion + "|" + currentQuestionTimeLeft);

        if (secondsLeft % allowTimePerQuestion === 0 || answered) {
        // Stops execution of action at set interval
            if (currentQuestionTimeLeft === 0){
                validateAnswer(currentQuestion);
                console.log(secondsLeft);
                if (secondsLeft != 0){
                    currentQuestion++;
                    rendorQuestion(currentQuestion);
                    currentQuestionTimeLeft = allowTimePerQuestion;
                } else {
                    clearInterval(timerInterval);
                    endGame();
                }
            }
        }        
         else {

        }
        secondsLeft--;
        currentQuestionTimeLeft--;
        if (secondsLeft === 0) {
            timerObj.textContent = "0 seconds left";
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function displayResult(result){
    var seperator = document.createElement("h3");
    seperator.textContent = "----------------------------------------";
    choiceAvailable.appendChild(seperator);
    var resultText = document.createElement("h3");
    if (result){
        resultText.textContent = "Correct !";
    } else{
        resultText.textContent = "Incorrect !";
    }
    choiceAvailable.appendChild(resultText);
}

function answerCorrect(){
    var audio = new Audio("./assets/sfx/correct.wav");
    audio.play();
    currentQuestionTimeLeft = 0;
    correctCount++;
    displayResult(true);
}

function answerIncorrect(){
    var audio = new Audio("./assets/sfx/incorrect.wav");
    audio.play();
    secondsLeft = secondsLeft - reduceTimeWhenWrong;
    currentQuestionTimeLeft = 0;
    wrongCount++;
    displayResult(false);
}

function rendorQuestion(questionNumber){
    // load question and answers array
    // console.log("rendor Question " + questionNumber);
    if (questionNumber >= quizQuestions.length){
        endGame();
        return;
    }
    questionObj.setAttribute("class", "show");
    answered = false;
    var questionTitle = document.querySelector("#question-title");
    questionTitle.textContent = quizQuestions[questionNumber].question;

    choiceAvailable.innerHTML = "";

    for (let i=0;i<quizQuestions[questionNumber].answers.length;i++){
        var choiceItem = document.createElement("div");
        choiceItem.textContent = quizQuestions[questionNumber].answers[i];
        choiceAvailable.appendChild(choiceItem);
    }
}

function validateAnswer(questionNumber){
    console.log("Validate Question " + questionNumber);
}

function endGame(){
    secondsLeft = 1;
    console.log("End Game");
    questionObj.innerHTML = "";
    document.querySelector("#final-score").textContent = correctCount;
    endScreenObj.setAttribute("class", "show");
}

startButtonObj.addEventListener("click", function(event){
    startGame();
})

choiceAvailable.addEventListener("click", function(event){
    var element = event.target;
    // console.log("Validate " + currentQuestion, + " " + quizQuestions[currentQuestion].correctAnswerIndex + " " + quizQuestions[currentQuestion].answers[quizQuestions[currentQuestion].correctAnswerIndex - 1]);

    // If that element is a button...
    if (element.matches("div") === true) {
        var userSelection = element.textContent;
        answered = true;
        if (quizQuestions[currentQuestion].answers[quizQuestions[currentQuestion].correctAnswerIndex - 1] === userSelection){
            console.log("Correct");
            answerCorrect();
        } else {
            console.log("Incorrect")
            answerIncorrect();
        }
    }
    else{
        return;
    }
})

submitButtonObj.addEventListener("click", function(event){
    var thisResult = document.querySelector("#initials").value + " - " + correctCount
    scoreList.push(thisResult);
    localStorage.setItem("GameScoreResult", JSON.stringify(scoreList) );
    alert("Record saved.");
})

init();