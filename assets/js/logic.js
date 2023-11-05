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

// Init function to load Score result from localStorage
function init(){
    scoreList = JSON.parse(localStorage.getItem("GameScoreResult"));
    if (scoreList === null){
        scoreList = [];
    }
//    console.log(scoreList);
}

function startGame(){
    // Define total seconds for the game
    secondsLeft = quizQuestions.length * allowTimePerQuestion;
    
    if (quizQuestions.length > 0){
        startScreenObj.innerHTML = "";
        rendorQuestion(0);
    } else{
        alert("No question defined to play game.");
        return;
    }

    var timerInterval = setInterval(function() {
        // Print time left for the game 
        timerObj.textContent = secondsLeft + " seconds left";
        // Define criteria for loading next question(Current question timeout, total time runs out, question being answered)
        if (secondsLeft % allowTimePerQuestion === 0 || currentQuestionTimeLeft === 0 || answered) {
        // Stops execution of action at set interval
            if (secondsLeft <= 0){
                timerObj.textContent = "0 seconds left";
                clearInterval(timerInterval);
                endGame();
            };
            if (currentQuestionTimeLeft === 0 && secondsLeft > 0){
                currentQuestion++;
                rendorQuestion(currentQuestion);
                // If last question, use all time left as the remaining time
                if (currentQuestion < quizQuestions.length - 1) {
                    currentQuestionTimeLeft = allowTimePerQuestion;
                } else {
                    currentQuestionTimeLeft = secondsLeft;
                }
            }
        }        
        secondsLeft--;
        currentQuestionTimeLeft--;
    }, 1000);
}

function displayResult(result){
    // Print out the correct or incorrect message on screen
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
    // Print correct sound
    var audio = new Audio("./assets/sfx/correct.wav");
    audio.play();
    // Set value and display result
    currentQuestionTimeLeft = 0;
    correctCount++;
    displayResult(true);
}

function answerIncorrect(){
    // Print incorrect sound
    var audio = new Audio("./assets/sfx/incorrect.wav");
    audio.play();
    secondsLeft = secondsLeft - reduceTimeWhenWrong;
    // Set value and display result
    currentQuestionTimeLeft = 0;
    wrongCount++;
    displayResult(false);
}

function rendorQuestion(questionNumber){
    // load question and answers array
    // Stop if last question
    if (questionNumber >= quizQuestions.length){
        endGame();
        return;
    }
    questionObj.setAttribute("class", "show");
    answered = false;
    // Print question on screen
    var questionTitle = document.querySelector("#question-title");
    questionTitle.textContent = quizQuestions[questionNumber].question;
    choiceAvailable.innerHTML = "";
    // Print choices on screen
    for (let i=0;i<quizQuestions[questionNumber].answers.length;i++){
        var choiceItem = document.createElement("div");
        choiceItem.textContent = quizQuestions[questionNumber].answers[i];
        choiceAvailable.appendChild(choiceItem);
    }
}

function endGame(){
    secondsLeft = 0;
    answered = true;
    questionObj.innerHTML = "";
    document.querySelector("#final-score").textContent = correctCount;
    endScreenObj.setAttribute("class", "show");
}

startButtonObj.addEventListener("click", function(event){
    // Trigger to start the game
    startGame();
})

choiceAvailable.addEventListener("click", function(event){
    var element = event.target;
    // check the click on the answer
    if (element.matches("div") === true) {
        var userSelection = element.textContent;
        answered = true;
        // Decide if correct answer
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
    // Prepare and save the current result into loadStorage
    var thisResult = document.querySelector("#initials").value + " - " + correctCount
    scoreList.push(thisResult);
    localStorage.setItem("GameScoreResult", JSON.stringify(scoreList) );
    alert("Record saved.");
})

init();