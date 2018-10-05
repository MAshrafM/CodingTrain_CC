// globals
var tree= [];
var walkers = []
var radius = 8;
var hu = 0;
var shrink = 0.995;
// constant
const SCREEN_SIZE = 400;
const maxWalkers = 50;
const itr = 1000;


// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  colorMode(HSB);
  tree[0] = new Walker(width/2, height/2);
  radius *= shrink;
  for(let i = 0; i < maxWalkers; i++){
    walkers[i] = new Walker();
    radius *= shrink;
  }
}
// Draw
function draw(){
  background(0);
  for(let i = 0; i < tree.length; i++){
    tree[i].show();
  }
  
  for(let i = 0; i < walkers.length; i++){
    walkers[i].show();
  }
  
  for(let i = 0; i < itr; i++){
    for(let j = walkers.length - 1; j >= 0; j--){
      walkers[j].walk();
      if(walkers[j].checkStuck(tree)){
        walkers[j].setHue(hu%360);
        hu += 2;
        tree.push(walkers[j]);
        walkers.splice(j, 1);
      }
    }
  }
  
  let r = walkers[walkers.length - 1].r;
  while(walkers.length < maxWalkers && radius > 1){
    radius *= shrink;
    walkers.push(new Walker());
  }
}

// Action