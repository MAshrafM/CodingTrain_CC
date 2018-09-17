// globals
var angle = 0;
var slider;

// constant
const SCREEN_SIZE = 600;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  slider = createSlider(0, TWO_PI, PI / 4, 0.01);
}
// Draw
function draw(){
  background(51);
  angle = slider.value();
  stroke(255);
  translate(SCREEN_SIZE/2, SCREEN_SIZE);
  branch(150);
}

// Action
function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  if(len > 4){
    // recursive call to right
    push();
    rotate(angle);
    branch(len * 0.7);
    pop();
    // recursive call to left
    push();
    rotate(-angle);
    branch(len * 0.71);
    pop();
  }
}