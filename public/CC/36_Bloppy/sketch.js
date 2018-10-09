// globals
var yoff = 0.0;

// constant
const SCREEN_SIZE = 400;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
}
// Draw
function draw(){
  background(0);
  translate(width/2, height/2);
  let radius = 150;
  
  beginShape();
  xoff = 0;
  for(let angle = 0; angle < TWO_PI; angle += 0.1){
    let offset = map(noise(xoff, yoff), 0, 1, -25, 25);
    let r = radius + offset;
    let x = r * cos(angle);
    let y = r * sin(angle);
    vertex(x, y);
    xoff += 0.1;
  }
  endShape();
  
  yoff += 0.01;
}

// Action