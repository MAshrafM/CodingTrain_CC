// globals
let timeLeft = 10;
let startTime = 0;
let currentTime = 0;
let ding;

// constant
const SCREEN_SIZE = 400;

function preload(){
  ding = loadSound('./public/CC/62_Plinko/ding.mp3');
}
// Setup
function setup() {
  noCanvas();
  createPage();
  startTime = millis();
  let params = getURLParams();
  console.log(params);
  if(params.minute){
    let min = params.minute;
    timeLeft = min * 60;
  }
  let timer = select('#timer');
  timer.html(convertSeconds(timeLeft - currentTime));
  
  let interval = setInterval(timeIt, 1000);
  
  function timeIt(){
    currentTime = floor((millis() - startTime) / 1000);
    timer.html(convertSeconds(timeLeft - currentTime));
    if(currentTime == timeLeft){
      ding.play();
      clearInterval(interval);
    }
  }
  
}

// Action
function convertSeconds(s){
  let min = floor(s / 60);
  let sec = s % 60;
  return nf(min, 2) + ':' + nf(sec, 2);
}

function createPage(){
  // create Page
 let div = document.createElement("div");
 div.innerHTML = '<p id="timer">______</p>';
  document.body.appendChild(div);
  document.body.style.flexDirection = "column";
}