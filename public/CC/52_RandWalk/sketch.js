// globals
var x, y;

// constant
const SCREEN_SIZE = 400;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  x = 200;
  y = 200;
  
}
// Draw
function draw(){
  background(51);
  stroke(255, 100);
  strokeWeight(2);
  point(x, y);
  
  let r = floor(random(4));
  
  switch(r){
    case 0:
      x = x + 1;
      break;
    case 1:
      x = x - 1;
      break;
    case 2:
      y = y + 1;
      break;
    case 3:
      y = y - 1;
      break;
  }
}

// Action