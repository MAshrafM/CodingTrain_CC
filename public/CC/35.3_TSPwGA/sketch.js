// globals
var nodes = [];
var population = [];
var fitness = [];

var recordDistance = Infinity;
var bestPath;
var currentBest;
var statusP;

// constant
const SCREEN_SIZE = 600;
const totalNodes = 15;
const popSize = 500;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  let order = [];
  for(let i = 0; i < totalNodes; i++){
    let v = createVector(random(width), random(height/2));
    nodes[i] = v;
    order[i] = i;   
  }
  for(let i = 0; i < popSize; i++){
    population[i] = shuffle(order);
  }
  
  statusP = createP('').style('font-size', '32pt');
}
// Draw
function draw(){
  background(0);
  
  calculateFitness();
  normalizeFitness();
  nextGeneration();
  
  // connect the nodes
  stroke(255, 0, 255);
  strokeWeight(4);
  noFill();
  beginShape();
  for(let i = 0; i < bestPath.length; i++){
    let n = bestPath[i];
    vertex(nodes[n].x, nodes[n].y);
    ellipse(nodes[n].x, nodes[n].y, 16, 16);
  }
  endShape();
  
  // draw shortest path
  translate(0, height/2);
  stroke(255);
  strokeWeight(4);
  noFill();
  beginShape();
  for(let i = 0; i < currentBest.length; i++){
    let n = currentBest[i];
    vertex(nodes[n].x, nodes[n].y);
    ellipse(nodes[n].x, nodes[n].y, 16, 16)
  }
  endShape();
    
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
