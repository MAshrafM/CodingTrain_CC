// globals
var sun;
// Constants
const SCREEN_SIZE = 600;
const RADIUS = 50;

// Setup 
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  sun = new Sun(RADIUS, 0, 0);
  sun.spawnPlanets(8);
}

// Controls

// Draw
function draw() {
  background(0);
  translate(width/2, height/2);
  sun.show();
  sun.orbit();
}