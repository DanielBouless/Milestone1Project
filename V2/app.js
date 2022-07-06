
/*


MECHANICS OF THE GAME:


A) EACH TIME THE SUBMIT BUTTON IS HIT:
    1) Hide SUBMIT BUTTON / show START BUTTON
    2) Initiate FUNCTION to set BET amount


B) EACH TIME THE START BUTTON IS HIT:
    1) Change color palette
    2) Create an EVENT LISTENER on the GAMEBOARD to track CLICKS
        a) Stop game and mark as loss if click limit reached
    3) Create an EVENT LISTENER on FINDME
        a) Stop game and mark as win if selected
    4) Initiate countdown TIMER FUNCTION
        a) Stop game if timer reaches 0
        b) Stop timer if FINDME selected
    5) Initiate FUNCTION to update SCOREBOARD
    6) Hide START BUTTON / show RESET BUTTON


C) EACH TIME THE RESET BUTTON IS HIT:
    1) Stop TIMER & reset
    2) Reset scoreboard
    3) Remove FINDME EVENT LISTENER
    4) Remove GAMMEBOARD EVENT LISTENER
    5) Hide RESET Button / show SUBMIT BUTTON


NOTES:
    1. Show Reset button always and only alternate between hiding the submit and start button
    2. Make the game board one size as well as the game settings and especially the scoreboard
    3. Winning removes the timer. Starting the game creates a new timer
    4. If no bet value is entered, default to 0
    6. Create PLAYSTATE / WinnerStatus and what happens if win or lose
        a. Decide ==> submit button
        b. Play ==> start button
        c. WinnerCircle ==> Add bet to score, Reset Everything
        d. LoserPit ==> Subtract bet from score, Reset Everything
*/
const submitBtn = document.getElementById('submit-btn');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const betInput = document.getElementById('bet');
const currentBet = document.getElementById('current-bet');
const gameboard = document.getElementById('gameboard');
const findMe = document.getElementById('find-me');
const counter = document.getElementById('counter');
const container1 = document.getElementById('container-1');
const gameOpt = document.getElementById('game-options');
const playerInfo = document.getElementById('player-info');
const exampleDot = document.getElementById('example-dot');
const presetDiff = document.getElementById('preset-difficulty');
const scoreboard = document.getElementById('score');
const timerDiv = document.getElementById('timer');


let maxClicks = 69;
let clicks = 0;
let score = 0;
let diffState;
let playState= 'decide';
let startTimer;
let timer = 420;


presetDiff.addEventListener('change', setDiff); 

/////////////////// SUBMIT BUTTON \\\\\\\\\\\\\\\\\\\\\\\

submitBtn.addEventListener('click',()=>{
            currentBet.textContent = betInput.value;
            changeDisplay('start');
            presetDiff.removeEventListener('change', setDiff);      
});

//\\\\\\\\\\\\\\\\\ SUBMIT BUTTON //////////////////////\\

/////////////////// START BUTTON  \\\\\\\\\\\\\\\\\\\\\\\

startBtn.addEventListener('click',()=>{
    changeDisplay('playing');
    betInput.value = 0;
    startTimer = setInterval(myTimer,1000);
    gameboard.addEventListener('click', look4Clicks);
    findMe.style.cssText += moveBox();


    findMe.addEventListener('click',()=>{
        changeDisplay('winner');
        gameboard.removeEventListener('click',look4Clicks);
        presetDiff.addEventListener('change', setDiff);
        clearInterval(startTimer);
        displayScore();
    });


});


/////////////////// START BUTTON  \\\\\\\\\\\\\\\\\\\\\\\

/////////////////// RESET BUTTON  \\\\\\\\\\\\\\\\\\\\\\\

resetBtn.addEventListener('click', ()=>{
    changeDisplay('decide');
    clearInterval(startTimer);
    timer = 420;
    score = 0;

});


/////////////////// RESET BUTTON  \\\\\\\\\\\\\\\\\\\\\\\

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

function changeDisplay(playState){
        switch(playState){
    case 'decide':
        startBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
        break;
    case 'start':
        startBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
        break;
    case 'playing':
        startBtn.style.display = 'none';
        submitBtn.style.display = 'none';
        document.body.style.backgroundColor = 'black';
        findMe.style.backgroundColor = 'black';
        exampleDot.style.backgroundColor = 'red';
        container1.style.color = 'red';
        container1.style.backgroundColor = 'black';
        gameboard.style.backgroundColor = 'black';
        gameOpt.style.backgroundColor = 'black';
        gameOpt.style.color = 'red';
        gameOpt.style.border = '5px solid red'
        playerInfo.style.backgroundColor = 'black';
        playerInfo.style.color = 'red';
        playerInfo.style.border = '5px solid red';        
        break;
    case 'winner':
        startBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
        findMe.style.backgroundColor = 'red';
        break;
    case 'loser':
        startBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
        break;
    default:
        
}
}


function setDiff(){
    switch(presetDiff.value){
        case 'Easy':
            setBoxSize('100px;');
            break;
        case 'Normal':
            setBoxSize('10px;');
            break;
        case 'Hard':
            setBoxSize('5px;');
            break;
            default:
    }
    console.log('changed', presetDiff.value)
}


function setBoxSize(size){
    boxSize = 'width:' + size +'height:'+ size + ';';
    diffState = boxSize;
    findMe.style.cssText = boxSize;
    exampleDot.style.cssText = boxSize;
}


function look4Clicks(){
        maxClicks--;
        counter.textContent = maxClicks;
        clicks++;
        scoreboard.textContent = clicks;
        displayScore()
    }


function myTimer(){    
    timer--;
    timerDiv.textContent = timer;
    if(timer <=0){
        timerDiv.textContent = 0;
        timer = 0;
        displayScore();
        }
    };


function displayScore(){
    if(timer!=0 && maxClicks!=0){
         score = maxClicks + Number(betInput.value) + Number(timer);
        scoreboard.textContent = score; 
        }
    else{
            scoreboard.textContent = 0;
            gameboard.removeEventListener('click',look4Clicks);
        }
        
    }


    function moveBox(){
        let topDist = Math.floor(Math.random()* (gameboard.offsetHeight - findMe.offsetHeight));
        let leftDist = Math.floor(Math.random()* (gameboard.offsetWidth- findMe.offsetWidth));
        findMe.style.top = topDist + 'px;';
        findMe.style.top = leftDist + 'px;';
        boxLocation = 'top:' + topDist + 'px; left:' + leftDist + 'px;' + diffState + ';';
        return boxLocation
    }
