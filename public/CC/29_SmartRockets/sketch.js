// globals
var population;
var target;
var count = 0;

// constant
const SCREEN_SIZE = 400;
const lifespan = 500;  // Rocket life span 500 frames
const maxForce = 0.3;

// barrier dimensions
const barrierDimension = {
  rx: 120,
  ry: 180,
  rw: 160,
  rh: 10
}

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  population = new Population();
  target = createVector(width/2, 50);
  
}
// Draw
function draw(){
  background(0);
  population.run();
  count++;
  if(count == lifespan){
    population.evaluate();
    population.selection();
    count = 0;
  }
  
  fill(255);
  rect(barrierDimension.rx, barrierDimension.ry, barrierDimension.rw, barrierDimension.rh);
  ellipse(target.x, target.y, 16, 16)
}

// Action