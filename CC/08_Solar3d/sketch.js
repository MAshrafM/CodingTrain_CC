// globals
var easycam;
var sun;
// Constants
const SCREEN_SIZE = 600;

// Setup 
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE, WEBGL);
  easycam = createEasyCam();
  easycam = new Dw.EasyCam(this._renderer, {distance:500, center:[0,0,0]});
  
  sun = new Sun(50, 0, 0);
  sun.spawnPlanets(5);
}

// Controls


// Draw
function draw() {
  background(0);
  fill(255);
  ambientLight(150);
  sun.show();
  sun.orbit();
}