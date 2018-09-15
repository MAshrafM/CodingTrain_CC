// globals
var stars = [];
var speed;

// Constants
const SCREEN_SIZE = 600;
const STAR_NUM = 800;
const SPEED = 20;
const STAR_SIZE = 2;
// Setup 
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  for(let i = 0; i < STAR_NUM; i++){
    stars[i] = new Star();
  }
}

// Draw
function draw() {
  // speed depend on mouse position on screen
  speed = map(mouseX, 0, width, 0, SPEED);
  // black background
  background(0);
  // center screen
  translate(width/2, height/2);
  // play
  for(let i = 0; i < stars.length; i++){
    stars[i].update();
    stars[i].show();
  }
}