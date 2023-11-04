var highScoreObj = document.querySelector("#highscores");
var clearButton = document.querySelector("#clear");
var scoreList = [];

function init(){
    scoreList = JSON.parse(localStorage.getItem("GameScoreResult"));
    console.log(scoreList);
}

init();
console.log("score..");
console.log(scoreList);
for (let i=0;i<scoreList.length;i++){
    var scoreItem = document.createElement("ul");
    scoreItem.textContent = i + ". " + scoreList[i];
    highScoreObj.appendChild(scoreItem);
}

clearButton.addEventListener("click", function(){
    scoreList = [];
    localStorage.setItem("GameScoreResult", JSON.stringify(scoreList));
    alert("Clear score done!");
})