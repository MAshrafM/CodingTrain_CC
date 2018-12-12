// globals
let attractors = [];
let particles = [];

// constant
const SCREEN_SIZE = 400;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
}

// Draw
function draw(){
  background(51);
  stroke(255);
  strokeWeight(4);
  particles.push(new Particle(random(width), random(height)));
  
  if(particles.length > 100){
    particles.splice(0, 1);
  }
  
  for(let a of attractors){
    stroke(0, 255, 0);
    point(a.x, a.y);
  }
  
  for(let p of particles){
    for(let a of attractors){
      p.attracted(a);
    }
    p.update();
    p.show();
  }
  
  
}

// Action
function mousePressed(){
  attractors.push(createVector(mouseX, mouseY));
}