// globals
var cols, rows;
var w = 50;
var grid = [];
var distance = 0;
var longdist = 0;
var longest;
var current;

var stack = [];
var btn;
var solve;
var mazeDone = false;

// Constants
const SCREEN_SIZE = 600;

// Setup 
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  cols = floor(width/w);
  rows = floor(height/w);
  
  for(let i = 0; i < rows; i++){
    for(let j = 0; j < cols; j++){
      let cell = new Cell(j, i);
      grid.push(cell);
    }
  }
  
  current = grid[0];
  longest = current;
  current.visited = true;
  
  btn = createButton("Solve Maze");
  actionButton();
}

// Controls


// Draw
function draw() {
  background(100, 100, 100, 50);
  
  for(let i = 0; i < grid.length; i++){
    grid[i].show();
  }
  
  let neighbours = current.checkNeighbours();
  if(neighbours.length > 0){
    let next = random(neighbours);
    next.visited = true;
    removeWalls(current, next);
    stack.push(next);
    current = next;
    distance++;
  } else {
    if(stack.length > 0) {
      current = stack.pop();
    } else {
      current = grid[0];
      mazeDone = true;
    }
    distance--;
  }
  if(longdist < distance){
    longdist = distance;
    longest = current;
  }
  
  fill(100,255,100);
  noStroke();
  ellipse(0.5 * w + w * current.i, 0.5 * w + w * current.j, w/2, w/2);
  fill(255, 0, 255);
  ellipse(0.5 * w + w * longest.i, 0.5 * w + w * longest.j, w/2, w/2);
  if(mazeDone) {
    solve ? solve.draw() : btn.show();
  }
  
}

// Helper functions
function index(i, j){
  if(i < 0 || j < 0 || i > cols - 1 || j > rows - 1){
    return -1;
  }
  
  return i + j * cols;
}

function removeWalls(a, b){
  let x = a.i - b.i;
  if(x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  
  let y = a.j - b.j;
  if(y === 1){
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
  
}

function actionButton(){
  btn.mousePressed(RunSolver);
  btn.position(10, 16);
  btn.style('width', '150px');
  btn.style('height', '100px');
  btn.style('background', 'rgb(91,192,222)');
  btn.style('border', '0px');
  btn.style('color', 'white');
  btn.style('font-weight', 'bold')
  btn.style('cursor', 'pointer')
  btn.hide();
}

function RunSolver(){
  solve = new Solver();
  btn.hide();
}