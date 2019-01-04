// globals
let tentacle;

// constant
const SCREEN_SIZE = 400;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE * 1.5, SCREEN_SIZE);
  
  let x = width / 2;
  let y = height;
  let pos = new p5.Vector(x, y);
  
  tentacle = new Segment(pos, 10, 0);
  
  let current = tentacle;
  for(let i = 0; i < 20; i++){
    let next = new Segment(current, 10, 0);
    current.child = next;
    current = next;
  }
}
// Draw
function draw(){
  background(51);
  let next = tentacle;
  while(next){
    next.wiggle();
    next.update();
    next.show();
    next = next.child;
  }
}

// Action