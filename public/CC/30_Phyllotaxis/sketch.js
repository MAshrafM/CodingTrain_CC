// globals
var start = 0; // color
var n = 0; // num


// constant
const SCREEN_SIZE = 400;
const ANGLE = 137.5;
const SCL = 4;
const R = 5;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  angleMode(DEGREES);
  colorMode(HSB);
}
// Draw
function draw(){
  background(0);
  translate(width / 2, height / 2);
  rotate(n * 0.3);
  for(let i = 0; i < n; i++){
    let a = i * ANGLE;
    let r = SCL * sqrt(i);
    let x = r * cos(a);
    let y = r * sin(a);
    let hu = sin(start + i * 0.5);
    hu = map(hu, -1, 1, 0, 360);
    fill(hu, 255, 255);
    noStroke();
    ellipse(x, y, R, R);
  }
  n += 5;
  start += 5;
}

// Action