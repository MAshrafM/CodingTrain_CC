// globals
var drops = [];

// Constants
const SCREEN_SIZE = 600;
const RAIN = 500;

// Setup 
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  for(let i = 0; i < RAIN; i++){
    drops[i] = new Drop();
  }
}

// Control



// Draw
function draw() {
  background(230, 230, 250);
  for(let i = 0; i < drops.length; i++){
    drops[i].fall();
    drops[i].show();
  }
}
