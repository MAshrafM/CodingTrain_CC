// globals
var easycam;
var tree,
    max_dist = 200,
    min_dist= 10;
// constant
const SCREEN_SIZE = 600;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE, WEBGL);
  easycam = createEasyCam();
  easycam = new Dw.EasyCam(this._renderer, {distance:500, center:[0,0,0]});
  tree = new Tree();
}
// Draw
function draw(){
  background(51);
  tree.show();
  tree.grow();
}

// Action