// globals
var tree = [];
var leaves = [];

var count = 0;

// constant
const SCREEN_SIZE = 600;
const TREE_LVL = 8;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  let a = createVector(SCREEN_SIZE / 2, SCREEN_SIZE);
  let b = createVector(SCREEN_SIZE / 2, SCREEN_SIZE - 150);
  let root = new Branch(a, b);
  
  tree[0] = root;
}

// Control
function mousePressed() {
  for(let i = tree.length - 1; i >= 0; i--){
    if(!tree[i].finished){
      tree.push(tree[i].branchA());
      tree.push(tree[i].branchB());
    }
    tree[i].finished = true;
  }
  count++;
  
  if(count === TREE_LVL){
    for(let i = 0; i < tree.length; i++){
      if(!tree[i].finished){
        let leaf = tree[i].end.copy();
        leaves.push(leaf);
      }
    }
  }
}
// Draw
function draw(){
  background(51);
  
  for(let i = 0; i < tree.length; i++){
    tree[i].show();
  }
  
  for(let i = 0; i < leaves.length; i++){
    fill(255, 0, 100, 100);
    noStroke();
    ellipse(leaves[i].x, leaves[i].y, 8, 8);
    leaves[i].y += random(0,2);
    //tree[i].jitter();
  }
}

// Action