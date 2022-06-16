const counterDiv = document.getElementById('counter');
const scoreDiv = document.getElementById('score');
const multiplerDiv = document.getElementById('multiplier');
const timerDiv = document.getElementById('timer');
const gameboardDiv = document.getElementById('gameboard');
const findMeDiv = document.getElementById('find-me');
const startBtn = document.getElementById('start-btn');
const playState = document.getElementById('play-state');
const submitBtn = document.getElementById('submit-btn');


let clicks=0;
let multiplier = 1;
let initScore = 420;
let score;
let bet = 0;
let maxClicks;
let startTimer;
let timer = 420;
let ptsPerClick;
let diffState;
let moneyBag = 0;
const insults = ['Nope', 'HA! Nope!','Not that one', 'Not this one ma dude','FIND ME!!!!']

//Setup game
//create event listener on submit-btn to update playerInfo

submitBtn.addEventListener('click', ()=>{
    //Counter
    maxClicks = document.getElementById('number-clicks').value;
    document.getElementById('number-clicks').value = '';
    counterDiv.textContent = maxClicks;
    
    //timer, also clearInterval if timer less than 420
    timerDiv.textContent =  timer;
     if(timer<420){
        clearInterval(startTimer)
        timer = 420;
        timerDiv.textContent =  timer;
    }
    //Change score
    scoreDiv.textContent = initScore;

    //change multiplier
    multiplerDiv.textContent = 1;

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

    //Hide submit-btn and show Start-btn
    submitBtn.style.display = 'none';
    startBtn.style.display = 'inline';
   
})

//Get number of gameboard clicks
gameboardDiv.addEventListener('click',()=>{
    clicks += 1;
    let clicksRemaining = maxClicks - clicks;
    counterDiv.textContent = clicksRemaining;

    //Update Multiplier after every click
    changeMulti(clicks);

    //display score after every click
    displayScore(clicks);
    
    //display different insult for every click
    // displayInsult();
})

//Create events when hit start
        //start timer when you hit start button, change "Ready?" to "SEEK!", change display to black and text to white, randomize black box location

startBtn.addEventListener('click',()=>{
    //start timer
    startTimer = setInterval(myTimer,1000)
   
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
    
    //hide Start-btn and show submit-btn
    startBtn.style.display = 'none';
    submitBtn.style.display = 'inline';
})

//Create event listener on black box; save timer, show modal score box
findMeDiv.addEventListener('click',()=>{
    timer = 0;
    moneyBag += bet;
    console.log(moneyBag)
    document.getElementById('money-bag').innerHTML = moneyBag;
})

//Display score Function
function displayScore(clicks){
    score = (initScore - clicks)*multiplier;
    scoreDiv.textContent = score;
    console.log(clicks, score);
}

//Clicks to change multiplier. Will need to cycle back to zero once max multi is reached.

function changeMulti(clicks){
    if (clicks%10==0){
        multiplier++;
        if (multiplier>5){
            multiplier=5;
        };
        multiplerDiv.textContent = multiplier;
    }
}

//Change difficulty function

function setDifficulty(size){
    findMeDiv.style.width = size;
    findMeDiv.style.height = size;
    boxsize = 'width:' + size+'; height:'+size+';';
    return boxsize
}

//timer

function myTimer(){    
    timer--;
    timerDiv.textContent = timer;
    if(timer <=0){
        timerDiv.textContent = 0;
    }
    };

//insult

