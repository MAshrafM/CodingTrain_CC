// globals
var drawing = [];
var currPath =[];
var isDrawing = false

// constant
const SCREEN_SIZE = 400;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
}
// Draw
function draw(){
  background(0);
  if(isDrawing){
    let point = {
      x: mouseX,
      y: mouseY
    }
    currPath.push(point);
  }
  
  stroke(255);
  strokeWeight(4);
  noFill();
  for(let i = 0; i < drawing.length; i++){
    let path = drawing[i];
    beginShape();
      for(let j = 0; j < path.length; j++){
        vertex(path[j].x, path[j].y)
      }
    endShape();
  }
}

// Action
function mousePressed(){
  isDrawing = true;
  currPath = [];
  drawing.push(currPath);
}

function mouseReleased(){
  isDrawing = false;
}