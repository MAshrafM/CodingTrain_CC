/*
Supershapes: http://paulbourke.net/geometry/supershape/
*/

// globals
var n1 = 0.3,
    n2 = 0.3,
    n3 = 0.3;
var m = 5,
    a = 1,
    b = 1;
var osc = 0;

// constant
const SCREEN_SIZE = 400;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
}
// Draw
function draw(){
  background(51);
  m = map(sin(osc), -1, 1, 0, 10);
  osc += 0.02;
  translate(width/2, height/2);
  stroke(255);
  noFill();
  
  let radius = 100;
  let total = 500;
  let inc = TWO_PI / total;
  
  beginShape();
  for(let angle = 0; angle < TWO_PI; angle += inc){
    let r = Supershape(angle);
    let x = radius * r * cos(angle);
    let y = radius * r * sin(angle);
    vertex(x,y);
  }
  endShape(CLOSE);
}

// Action
function Supershape(theta){
  let p1 = (1/a) * cos(theta * m / 4);
  p1 = abs(p1);
  p1 = pow(p1, n2);
  
  let p2 = (1/b) * sin(theta * m / 4);
  p2 = abs(p2);
  p2 = pow(p2, n3);
  
  let p3 = pow(p1 + p2, 1/n1);
  
  if(p3 === 0){return 0;}
  return (1/p3);
}