// globals
var nodes = [];
var recordDistance;
var bestPath;

// constant
const SCREEN_SIZE = 400;
const totalNodes = 8;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  for(let i = 0; i < totalNodes; i++){
    let v = createVector(random(width), random(height));
    nodes[i] = v;
  }
  let d = calcDistance(nodes);
  recordDistance = d;
  bestPath = nodes.slice();
}
// Draw
function draw(){
  background(0);
  fill(255);
  // draw the nodes
  for(let i = 0; i < nodes.length; i++){
    ellipse(nodes[i].x, nodes[i].y, 8, 8);
  }
  // connect the nodes
  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for(let i = 0; i < nodes.length; i++){
    vertex(nodes[i].x, nodes[i].y);
  }
  endShape();
  // draw shortest path
  stroke(255, 0, 255);
  strokeWeight(4);
  noFill();
  beginShape();
  for(let i = 0; i < nodes.length; i++){
    vertex(bestPath[i].x, bestPath[i].y);
  }
  endShape();
  
  // random shuffle
  let i = floor(random(nodes.length));
  let j = floor(random(nodes.length));
  swap(nodes, i, j);
  
  // check for shortest distance for the best path
  let d = calcDistance(nodes);
  if(d < recordDistance){
    recordDistance = d;
    bestPath = nodes.slice();
  }
}

// swap nodes for shuffle
function swap(arr, i, j){
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// calc distance between nodes
function calcDistance(points){
  let sum = 0;
  for(let i = 0; i < points.length - 1; i++){
    let d = dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
    sum += d;
  }
  return sum;
}

// Action