function Spot(i, j) {
  // Location
  this.i = i;
  this.j = j;
  // A* Values
  this.f = 0; // cost value
  this.g = 0; // node value
  this.h = 0; // heuristic value
  // Neighbors
  this.neighbors = [];
  // Previous Location
  this.previous = undefined;
  // Obstacle
  this.wall = false;
  if (random(1) < 0.4) {this.wall = true;}
  
  // Show
  this.show = (col) => {
    if (this.wall) {
      fill(0);
      noStroke();
      ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);
    } else if (col){
      fill(col);
      rect(this.i * w, this.j * h, w, h);
    }
  }

  // Check Neighbors
  this.addNeighbors = (grid) => {
    let i = this.i;
    let j = this.j;
    if (i < cols - 1) {this.neighbors.push(grid[i + 1][j]);}
    if (i > 0) {this.neighbors.push(grid[i - 1][j]);} 
    if (j < rows - 1) {this.neighbors.push(grid[i][j + 1]);}
    if (j > 0) {this.neighbors.push(grid[i][j - 1]);}
    if (i > 0 && j > 0) {this.neighbors.push(grid[i - 1][j - 1]);}
    if (i < cols - 1 && j > 0) {this.neighbors.push(grid[i + 1][j - 1]);}
    if (i > 0 && j < rows - 1) {this.neighbors.push(grid[i - 1][j + 1]);}
    if (i < cols - 1 && j < rows - 1) {this.neighbors.push(grid[i + 1][j + 1]);}
  }
}