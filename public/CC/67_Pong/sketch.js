// globals
let leftScore = 0;
let rightScore = 0;
let ding, puck, left, right;

function preload(){
  ding = loadSound('./public/CC/62_Plinko/ding.mp3');
}
// constant
const SCREEN_SIZE = 400;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  puck = new Puck();
  left = new Paddle(true);
  right = new Paddle(false);  
}
// Draw
function draw(){
  background(0);
  
  puck.checkPaddleRight(right);
  puck.checkPaddleLeft(left);
  
  left.show();
  right.show();
  left.update();
  right.update();
  
  puck.update();
  puck.edges();
  puck.show();
  
  fill(255);
  textSize(32);
  text(leftScore, 32, 40);
  text(rightScore, width - 64, 40);
}

// Action
function keyReleased(){
  left.move(0);
  right.move(0);
}

function keyPressed(){
  if(key == 'W'){
    left.move(-10);
  } else if(key == 'S'){
    left.move(10);
  }
  
  if(key == 'P'){
    right.move(-10);
  } else if(key == 'L'){
    right.move(10);
  }
}