const counterDiv = document.getElementById('counter');
const scoreDiv = document.getElementById('score');
const multiplerDiv = document.getElementById('multiplier');
const timerDiv = document.getElementById('timer');
const gameboardDiv = document.getElementById('gameboard');
const findMeDiv = document.getElementById('find-me');
const startBtn = document.getElementById('start-btn');
const playState = document.getElementById('play-state');
const submitBtn = document.getElementById('submit-btn');
const insultDiv = document.getElementById('distractions');


let clicks=0;
let multiplier = 1;
let initScore = 420;
let score;
let bet = 0;
let maxClicks=69;
let startTimer;
let timer = 420;
let ptsPerClick;
let diffState;
let moneyBag = 0;
const insults = ['Nope', 'HA! Nope!','Not that one', 'Nah mah dude','FIND ME!!!!','Yeah, you win...']

//Setup game
//create event listener on submit-btn to update playerInfo

submitBtn.addEventListener('click', ()=>{
   
    //timer, also clearInterval if timer less than 420
    timerDiv.textContent =  timer;
     if(timer<420){
        clearInterval(startTimer);
        timer = 420;
        timerDiv.textContent =  timer;
    }

    //change multiplier
    multiplier = 1;
    multiplerDiv.textContent = multiplier;
    

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
    submitBtn.style.visibility = 'hidden';
    startBtn.style.display = 'inline';



   
})

<<<<<<< HEAD
// //Get number of gameboard clicks
// gameboardDiv.addEventListener('click',()=>{
//     clicks += 1;
//     let clicksRemaining = maxClicks - clicks;
//     counterDiv.textContent = clicksRemaining;
//     if(clicksRemaining<=0){
//         clicks = 0;
//         clicksRemaining = 0;
//         bet = 0;
//         score = score;
//         counterDiv.textContent = clicksRemaining;
//         insultDiv.textContent = 'Loser :)'
//         timer = timer;
//     }
=======


//Create events when hit start
        //start timer when you hit start button, change "Ready?" to "SEEK!", change display to black and text to white, randomize black box location

startBtn.addEventListener('click',()=>{


//Get number of gameboard clicks
gameboardDiv.addEventListener('click',()=>{
    clicks += 1;
    let clicksRemaining = maxClicks - clicks;
    counterDiv.textContent = clicksRemaining;
    if(clicksRemaining<=0){
        clicks = 0;
        clicksRemaining = 0;
        bet = 0;
        score = score;
        counterDiv.textContent = clicksRemaining;
        insultDiv.textContent = 'Loser :)'
        timer = timer;
    }
>>>>>>> bb022d3dbd51aed6731138c4f2f97c9a08c868e8


//     //Update Multiplier after every click
//     changeMulti(clicks);

//     //display score after every click
//     displayScore(clicks);
    
//     //display different insult for every click
//     displayInsult();
// })



    //start timer
    startTimer = setInterval(myTimer,1000)
   
    //change words
    playState.textContent = 'SEEK!';

    //change colors
    document.body.style.backgroundColor = 'black';
    document.getElementById('container-1').style.color = 'red';
    document.getElementById('container-1').style.backgroundColor = 'black';
    gameboardDiv.style.backgroundColor = 'black';
    document.getElementById('game-options').style.backgroundColor = 'black';
    document.getElementById('game-options').style.color = 'red';
    document.getElementById('game-options').style.border = '5px solid red'
    document.getElementById('player-info').style.backgroundColor = 'black';
    document.getElementById('player-info').style.color = 'red';
    document.getElementById('player-info').style.border = '5px solid red';
    

    //change location of square
    let topDist = Math.floor(Math.random()* (gameboardDiv.offsetHeight - findMeDiv.offsetHeight));
    let leftDist = Math.floor(Math.random()* (gameboardDiv.offsetWidth- findMeDiv.offsetWidth)); 
    findMeDiv.style.cssText = 'bottom:'+ topDist + 'px; left:'+ leftDist + 'px;'+ diffState;
    
    //hide Start-btn and show submit-btn
    startBtn.style.display = 'none';
    submitBtn.style.display = 'inline';



        //Get number of gameboard clicks
gameboardDiv.addEventListener('click',()=>{
    clicks += 1;
    let clicksRemaining = maxClicks - clicks;
    counterDiv.textContent = clicksRemaining;
    if(clicksRemaining<=0){
        clicks = 0;
        clicksRemaining = 0;
        bet = 0;
        score = score;
        counterDiv.textContent = clicksRemaining;
        insultDiv.textContent = 'Loser :)'
        timer = timer;
    }


    //Update Multiplier after every click
    changeMulti(clicks);

    //display score after every click
    displayScore(clicks);
    
    //display different insult for every click
    displayInsult();
})

    //Create event listener on black box; save timer
findMeDiv.addEventListener('click',()=>{
    clearInterval(startTimer)
    if(moneyBag!=0){
        moneyBag += bet + score;
    }
    else{
        moneyBag += score;
    }
    document.getElementById('money-bag').textContent = moneyBag;
    findMeDiv.style.backgroundColor = 'red';
<<<<<<< HEAD
    insultDiv.innerHTML = insults[5];
    this.removeEventListener('click', ()=>{});
    gameboardDiv.removeEventListener('click', ()=>{});
    
=======
    insultDiv.textContent = insults[5];
>>>>>>> bb022d3dbd51aed6731138c4f2f97c9a08c868e8
})
})

// //Create event listener on black box; save timer
// findMeDiv.addEventListener('click',()=>{
//     timer = 0;
//     if(moneyBag!=0){
//         moneyBag += bet + score;
//     }
//     else{
//         moneyBag += score;
//     }
//     document.getElementById('money-bag').textContent = moneyBag;
//     findMeDiv.style.backgroundColor = 'red';
//     insultDiv.innerHTML = insults[5];
// })

//Display score Function
function displayScore(clicks){
    score = (initScore - clicks)*multiplier;
    scoreDiv.textContent = score;
    console.log(clicks, score);
}

//Clicks to change multiplier. Will need to cycle back to zero once max multi is reached.

function changeMulti(clicks){
    if (clicks%10===0){
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
        timer = 0;
    }
    };

//insult

function displayInsult(){
    let i = Math.floor(Math.random()*insults.length);
    insultDiv.textContent = insults[i];
    console.log(insults[i])

}