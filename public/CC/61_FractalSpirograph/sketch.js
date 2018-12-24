// globals
let path = [];
let sun, end;
let angle = 0;

// constant
const SCREEN_SIZE = 400;
const RES = 50;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  sun = new Orbit(width/2, height/2, width/4, 0);
  let next = sun;
  for(let i = 0; i < 10; i++){
    next = next.addChild();
  }
  end = next;
}
// Draw
function draw(){
  background(51);
  for(let i = 0; i < RES; i++){
    let next = sun;
    while(next != null){
      next.update();
      next = next.child;
    }
    path.push(createVector(end.x, end.y));
  }
  
  let next = sun;
  while(next != null){
    next.show();
    next = next.child;
  }
  
  beginShape();
  stroke(255, 0, 255);
  noFill();
  for(let pos of path){
    vertex(pos.x, pos.y);
  }
  endShape();
}

// Action