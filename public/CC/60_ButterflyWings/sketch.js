// globals
let yoff = 0;

// constant
const SCREEN_SIZE = 400;
const CHANGE_RATE = 0.05;
// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
}
// Draw
function draw(){
  background(51);
  translate(width/2, height/2);
  stroke(255);
  fill(255, 50);
  strokeWeight(1);
  
  const da = PI / 200;
  let xoff = 0;
  
  beginShape();
  for(let a = 0; a <= TWO_PI; a += da){
    let n = noise(xoff, yoff);
    let r = sin(2 * a) * map(n, 0, 1, 50, 300);
    let x = r * cos(a);
    let y = r * sin(a);
    
    if(a < PI){
      xoff += CHANGE_RATE;
    } else {
      xoff -= CHANGE_RATE;
    }
    vertex(x, y);
  }
  endShape();
  
  yoff += 0.01;
}

// Action