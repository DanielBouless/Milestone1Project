const counterDiv = document.getElementById('counter');
const scoreDiv = document.getElementById('score');
const gameboardDiv = document.getElementById('gameboard');

let clicks=0;
let initScore = 100;
let score;
let bet = 0;
let multiplier = 1;

//Get number of gameboard clicks
gameboardDiv.addEventListener('click',()=>{
    clicks += 1
    counterDiv.textContent = clicks
    //display score after every click
    displayScore(clicks)
})

//Display score
//Scoring formula = [InitalScore - (#ofClicks*CurrentScore)]*Multiplier + (Bet*2), where Bet <= ScoreBeforePlaying

function displayScore(clicks){
    score = (initScore-clicks)*multiplier + (bet*2)
    scoreDiv.textContent = score
    console.log(clicks, score)
}