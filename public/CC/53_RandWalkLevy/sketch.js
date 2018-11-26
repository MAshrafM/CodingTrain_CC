// globals
var pos;
var prev;

// constant
const SCREEN_SIZE = 400;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  pos = createVector(200, 200);
  prev = pos.copy();
  
}
// Draw
function draw(){
  stroke(255);
  strokeWeight(2);
  line(pos.x, pos.y, prev.x, prev.y);
  prev.set(pos);
  
  let step = p5.Vector.random2D();
  let r = random(100);
  
  r < 1 ? step.mult(random(25, 100)) : step.setMag(2);
  pos.add(step);
}

// Action