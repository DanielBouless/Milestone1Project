const counterDiv = document.getElementById('counter');
const gameboardDiv = document.getElementById('gameboard');

let clicks=0;

gameboardDiv.addEventListener('click',()=>{
    clicks += 1
    counterDiv.textContent = clicks
})

