// globals
var nodes = [];
var order = [];
var recordDistance;
var bestPath;
var totalPermutations;
var count = 0;

// constant
const SCREEN_SIZE = 400;
const totalNodes = 6;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  for(let i = 0; i < totalNodes; i++){
    let v = createVector(random(width), random(height));
    nodes[i] = v;
    order[i] = i;   
  }
  let d = calcDistance(nodes, order);
  recordDistance = d;
  bestPath = order.slice();  
  
  totalPermutations = factorial(totalNodes);
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
  stroke(255, 0, 255);
  strokeWeight(4);
  noFill();
  beginShape();
  for(let i = 0; i < order.length; i++){
    let n = bestPath[i];
    vertex(nodes[n].x, nodes[n].y);
  }
  endShape();
  
  // draw shortest path
  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for(let i = 0; i < order.length; i++){
    let n = order[i];
    vertex(nodes[n].x, nodes[n].y);
  }
  endShape();
    
  // check for shortest distance for the best path
  let d = calcDistance(nodes, order);
  if(d < recordDistance){
    recordDistance = d;
    bestPath = order.slice();
  }
  
  textSize(32);
  fill(255);
  let percent = 100 * (count / totalPermutations);
  text(nf(percent, 0, 2) + "% completed", 20, 40);
  nextOrder();
}

// swap nodes for shuffle
function swap(arr, i, j){
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// calc distance between nodes
function calcDistance(points, order){
  let sum = 0;
  for(let i = 0; i < order.length - 1; i++){
    let nodeAdex = order[i];
    let nodeA = points[nodeAdex];
    let nodeBdex = order[i+1];
    let nodeB = points[nodeBdex];
    let d = dist(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
    sum += d;
  }
  return sum;
}

// Lexical Search
function nextOrder(){
  count++;
  
  let largestI = -1;
  for(let i = 0; i < order.length - 1; i++){
    if(order[i] < order[i+1]){
      largestI = i;
    }
  }
  
  if(largestI == -1){noLoop();}
  
  let largestJ = -1;
  for(let j = 0; j < order.length; j++){
    if(order[largestI] < order[j]){
      largestJ = j;
    }
  }
  
  swap(order, largestI, largestJ);
  
  let endArray = order.splice(largestI + 1);
  endArray.reverse();
  order = order.concat(endArray);
}

function factorial(n){
  return n == 1 ? 1 : n * factorial(n-1);  
}
// Action