// globals
var fireworks = [];
var gravity;

// constant
const SCREEN_SIZE = 400;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  colorMode(HSB);
  gravity = createVector(0, 0.2);
  stroke(255);
  strokeWeight(4);
  background(0);
}
// Draw
function draw(){
  colorMode(RGB);
  background(0, 0, 0, 25);
  if(random(1) < 0.03){
    fireworks.push(new Firework());
  }
  
  for(let i = fireworks.length - 1; i >= 0; i--){
    fireworks[i].update();
    fireworks[i].show();
    
    if(fireworks[i].done()){
      fireworks.splice(i, 1);
    }
  }
}

// Action