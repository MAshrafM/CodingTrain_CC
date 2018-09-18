// globals
var tree,
    max_dist = 100,
    min_dist= 10;

// constant
const SCREEN_SIZE = 600;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  tree = new Tree();
}
// Draw
function draw(){
  background(51);
  tree.show();
  tree.grow();
}

// Action