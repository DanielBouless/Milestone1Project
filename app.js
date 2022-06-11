const counterDiv = document.getElementById('counter');
const scoreDiv = document.getElementById('score');
const multiplerDiv = document.getElementById('multipler');
const timerDiv = document.getElementById('timer');
const gameboardDiv = document.getElementById('gameboard');
const findMeDiv = document.getElementById('find-me');
const startBtn = document.getElementById('start-btn');
const playState = document.getElementById('play-state');


let clicks=0;
let initScore = 100;
let score;
let bet = 0;
let multiplier = 1;
let clicksForMulti = 5;
let maxClicks = 10;
let timer = 120;

//Get number of gameboard clicks
gameboardDiv.addEventListener('click',()=>{
    clicks += 1;
    let clicksRemaining = maxClicks - clicks;
    counterDiv.textContent = clicksRemaining;

    //Update Multiplier after every click
    changeMulti(clicks, clicksForMulti);

    //display score after every click
    displayScore(clicks);
})

//Create events when hit start
        //start timer when you hit start button, change "Ready?" to "SEEK!", change display to black and text to white, randomize black box location

startBtn.addEventListener('click',()=>{
    //start timer
    setInterval(()=>{
    timer--;
    timerDiv.textContent = timer;
    if(timer <=0){
        timerDiv.textContent = 0;
    }
    },1000);

    //change words
    playState.textContent = 'SEEK!';

    //change colors
    document.body.style.backgroundColor = 'black';
    document.getElementById('container-1').style.color = 'white';
    gameboardDiv.style.backgroundColor = 'blue';

    //change location of square
    let topDist = Math.floor(Math.random()* gameboardDiv.offsetHeight);
    let leftDist = Math.floor(Math.random()* gameboardDiv.offsetWidth);
    findMeDiv.style.cssText = 'bottom:'+ topDist + 'px; left:'+ leftDist + 'px;';
    })

    

//Display score Function
        //Scoring formula = [InitalScore - (#ofClicks*CurrentScore)]*X, where X = Multiplier + (Bet*2) and Bet <= ScoreBeforePlaying. X gets shown at the end of the game for final score

function displayScore(clicks){
    score = initScore-clicks;
    scoreDiv.textContent = score;
    console.log(clicks, score);
}

//Clicks to change multiplier. Will need to cycle back to zero once max multi is reached.

function changeMulti(clicks, clicksForMulti){
    if (clicks%clicksForMulti==0){
        multiplier++;
        if (multiplier>5){
            multiplier=0;
        };
        multiplerDiv.textContent = multiplier;
    }
}