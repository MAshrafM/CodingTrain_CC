// globals
var slider;
/*
A superellipse, also known as a Lamé curve after Gabriel Lamé, is a closed curve resembling the ellipse, retaining the geometric features of semi-major axis and semi-minor axis, and symmetry about them, but a different overall shape. _ wiki
Superellipse formula
| x/ a | ^ n + | y / b | ^ n = 1 
*/

// constant
const SCREEN_SIZE = 400;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  slider = createSlider(0, 10, 2, 0.1);
}
// Draw
function draw(){
  background(51);
  translate(SCREEN_SIZE/2, SCREEN_SIZE/2);
  let a = 100;
  let b = 100;
  let n = slider.value();
  stroke(255)
  noFill();
  
  beginShape();
  for(let angle = 0; angle < TWO_PI; angle += 0.1){
    let na = 2 / n;
    let x = pow(abs(cos(angle)), na) * a * sgn(cos(angle));
    let y = pow(abs(sin(angle)), na) * b * sgn(sin(angle));
    
    vertex(x, y);
  }
  endShape(CLOSE);
}

// Action

function sgn(x){
  if(x > 0){
    return 1;
  } else if (x < 0){
    return -1;
  } else {
    return 0;
  }
}