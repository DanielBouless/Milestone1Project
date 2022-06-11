const counterDiv = document.getElementById('counter');
const scoreDiv = document.getElementById('score');
const multiplerDiv = document.getElementById('multipler');
const timerDiv = document.getElementById('timer');
const gameboardDiv = document.getElementById('gameboard');
const findMeDiv = document.getElementById('find-me');
const startBtn = document.getElementById('start-btn');
const playState = document.getElementById('play-state');
const submitBtn = document.getElementById('submit-btn');

let clicks=0;
let initScore;
let score = initScore;
let bet;
let multiplier = 1;
let multiUp;
let maxClicks;
let timer;
let ptsPerClick;
let diffState;


//Setup game
//create event listener on submit-btn to update playerInfo

submitBtn.addEventListener('click', ()=>{
    //Counter
    maxClicks = document.getElementById('number-clicks').value;
    document.getElementById('number-clicks').value = '';
    counterDiv.textContent = 'Clicks Remaining: ' + maxClicks;

    //Score
    scoreDiv.textContent = 'Score: ' + document.getElementById('start-points').value;
    initScore = document.getElementById('start-points').value;
    document.getElementById('start-points').value = '';
    ptsPerClick = document.getElementById('points-minus').value;
    document.getElementById('points-minus').value = '';
    
    //timer
    timerDiv.textContent =  'Time Remaining: ' + document.getElementById('time-limit').value;
    timer =document.getElementById('time-limit').value;

    //Store Clicks to increase multi
    multiUp = document.getElementById('increase-multi').value;
    document.getElementById('increase-multi').value = '';

    //Store Bet amount
    bet = document.getElementById('bet').value;
    document.getElementById('bet').value = '';

    //Set Difficulty

    switch (document.getElementById('preset-difficulty').value){
        case 'Easy':
            diffState = setDifficulty('100px');
            break;
        case 'Normal':
            diffState = setDifficulty('10px');
            break;
        case 'Hard':
            diffState = setDifficulty('5px');
            break;
        default:
    }

})



//Get number of gameboard clicks
gameboardDiv.addEventListener('click',()=>{
    clicks += 1;
    let clicksRemaining = maxClicks - clicks;
    counterDiv.textContent = clicksRemaining;

    //Update Multiplier after every click
    changeMulti(clicks, multiUp);

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
    findMeDiv.style.cssText = 'bottom:'+ topDist + 'px; left:'+ leftDist + 'px;'+ diffState;
    })

//Create event listener on black box; save timer
findMeDiv.addEventListener('click',()=>{
    let timeLeft = timer;
    console.log(timeLeft)
    timer = 0;
})

//Display score Function
        //Scoring formula = [InitalScore - (#ofClicks*CurrentScore)]*X, where X = Multiplier + (Bet*2) and Bet <= ScoreBeforePlaying. X gets shown at the end of the game for final score

function displayScore(clicks){
    score = initScore - (clicks*ptsPerClick);
    scoreDiv.textContent = score;
    console.log(clicks, score);
}

//Clicks to change multiplier. Will need to cycle back to zero once max multi is reached.

function changeMulti(clicks, multiUp){
    if (clicks%multiUp==0){
        multiplier++;
        if (multiplier>5){
            multiplier=1;
        };
        multiplerDiv.textContent = 'Multiplier: ' + multiplier;
    }
}

//Change difficulty function

function setDifficulty(size){
    findMeDiv.style.width = size;
    findMeDiv.style.height = size;
    boxsize = 'width:' + size+'; height:'+size+';';
    return boxsize
}