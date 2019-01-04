// globals
let pos, vel, gravity;
let tentacles = [];

// constant
const SCREEN_SIZE = 400;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE * 2, SCREEN_SIZE * 1.5);
  
  pos = new p5.Vector(0, 0);
  vel = new p5.Vector(2, 1.3);
  gravity = new p5.Vector(0, 0.1);
  vel.mult(3);
  
  let da = TWO_PI / 2;
  
  for(let a = 0; a < TWO_PI; a += da){
    let x = width / 2 + cos(a) * 300;
    let y = height / 2 + sin(a) * 300;
    tentacles.push(new Tentacle(x, y));
  }
}
// Draw
function draw(){
  background(51);
  
  noFill();
  ellipse(width / 2, height / 2, 400, 400);
  for(let t of tentacles){
    t.update();
    t.show();
  }
  pos.add(vel);
  vel.add(gravity);
  noStroke();
  fill(100, 255, 0);
  ellipse(pos.x, pos.y, 32, 32);
  
  if(pos.x > width || pos.x < 0){vel.x *= -1;}
  if(pos.y > height){
    pos.y = height;
    vel.y *= -1;
    vel.mult(0.95);
  }
}

// Action