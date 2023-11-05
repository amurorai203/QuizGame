var highScoreObj = document.querySelector("#highscores");
var clearButton = document.querySelector("#clear");
var scoreList = [];

// Load Score result from loadstorage
function init(){
    scoreList = JSON.parse(localStorage.getItem("GameScoreResult"));
}

init();

// Display the score result into screen
for (let i=0;i<scoreList.length;i++){
    var scoreItem = document.createElement("ul");
    scoreItem.textContent = i + ". " + scoreList[i];
    highScoreObj.appendChild(scoreItem);
}

// Clear the score result in localStorage and on screen
clearButton.addEventListener("click", function(){
    scoreList = [];
    localStorage.setItem("GameScoreResult", JSON.stringify(scoreList));
    alert("Clear score done!");
    highScoreObj.innerHTML = "";
})