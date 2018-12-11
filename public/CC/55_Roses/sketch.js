// globals
let d = 8;
let n = 5;
let sliderD, sliderN;

// constant
const SCREEN_SIZE = 400;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  sliderD = createSlider(1, 20, 10, 1);
  sliderN = createSlider(1, 20, 10, 1);
  sliderD.input(draw);
  sliderN.input(draw);
}
// Draw
function draw(){
  background(51);
  d = sliderD.value();
  n = sliderN.value();
  let k = n / d;
  push();
  translate(width/2, height/2);
  beginShape();
  stroke(255);
  noFill();
  strokeWeight(1);
  for(let a = 0; a < TWO_PI * reduceD(n ,d); a+= 0.02){
    let r = 200 * cos(k*a);
    let x = r * cos(a);
    let y = r * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
  noLoop();
}

// Action
function reduceD(num, den){
  function rec(a, b){
    return b ? rec(b, a % b) : a;
  }
  
  return den / rec(num, den);
}