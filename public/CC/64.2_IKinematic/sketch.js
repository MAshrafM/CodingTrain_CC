// globals
let tentacle;

// constant
const SCREEN_SIZE = 400;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE * 1.5, SCREEN_SIZE);
  
  let x = width / 2;
  let y = height;
  let point = new p5.Vector(x, y);
  let current = new Segment(point, 10, 0);
  
  for(let i = 0; i < 20; i++){
    let next = new Segment(current, 10, i);
    current.child = next;
    current = next;
  }
  tentacle = current;
}
// Draw
function draw(){
  background(51);
  
  tentacle.follow(mouseX, mouseY);
  tentacle.update();
  tentacle.show();
  
  let next = tentacle.par;
  while(next){
    next.follow();
    next.update();
    next.show();
    next = next.par;
  }
}

// Action