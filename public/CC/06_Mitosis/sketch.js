// globals
var cells = [];

// Constants
const SCREEN_SIZE = 600;

// Setup 
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  // add two cells
  cells.push(new Cell());
  cells.push(new Cell());
}

// Controls
// mouse action cell mistosis
function mousePressed() {
  for(let i = cells.length - 1; i >= 0; i--){
    // cell mitosis when clicked
    // remove original cell
    if(cells[i].clicked(mouseX, mouseY)){
      cells.push(cells[i].mitosis());
      cells.push(cells[i].mitosis());
      cells.splice(i, 1);
    }
  }
}

// Draw
function draw() {
  background(200);
  for(let i = 0; i < cells.length; i++){
    cells[i].move();
    cells[i].show();
  }
}