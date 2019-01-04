// globals
let end, start, base;

// constant
const SCREEN_SIZE = 400;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE * 1.5, SCREEN_SIZE);
  
  let x = width / 2;
  let y = height;
  let point = new p5.Vector(x, y/2);
  start = new Segment(point, 50, 0);
  let current = start;
  
  for(let i = 0; i < 4; i++){
    let next = new Segment(current, 50, i);
    current.child = next;
    current = next;
  }
  end = current;
  base = new p5.Vector(x, y)
}
// Draw
function draw(){
  background(51);
  
  end.follow(mouseX, mouseY);
  end.update();
    
  let next = end.par;
  while(next){
    next.follow();
    next.update();
    next = next.par;
  }
  
  start.setA(base);
  start.calculateB();
  next = start.child;
  
  while(next){
    next.attachA();
    next.calculateB();
    next = next.child;
  }
  
  end.show();
  next = end.par;
  
  while(next){
    next.show();
    next = next.par;
  }
}

// Action