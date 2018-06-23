// globals
var axis = 0;
var sponge = [];

// Constants
const SCREEN_SIZE = 600;
const LENGTH = 200;

// Setup 
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE, WEBGL);
  // init boxes
  let box = new Box(0, 0, 0, LENGTH);
  sponge.push(box);
}

// Control
/*
  Create more boxes when pressed
  Fractal behaviour
*/
function mousePressed() {
  let next = [];
  for(let i = 0; i < sponge.length; i++){
    let frac = sponge[i];
    let newBoxes = frac.generate();
    next = next.concat(newBoxes);
  }
  sponge = next;
}

// Draw
function draw() {
  background(51); // background color
  // init rotation on 3-axis
  rotateX(axis);
  rotateY(axis * 0.4);
  rotateZ(axis * 0.7);
  // show Fractal
  for(let i = 0; i < sponge.length; i++){
    sponge[i].show();
  }
  // update rotation to make motion
  axis += 0.01;
}