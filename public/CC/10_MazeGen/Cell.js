function Cell(i, j){
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;
  
  this.checkNeighbours = function() {
    let neighbours= [];
    
    let top = grid[index(this.i, this.j -1)];
    let right = grid[index(this.i + 1, this.j)];
    let bottom = grid[index(this.i, this.j + 1)];
    let left = grid[index(this.i - 1, this.j)];
    
    if(top && !top.visited){
      neighbours.push(top);
    }
    if(right && !right.visited){
      neighbours.push(right);
    }
    if(bottom && !bottom.visited){
      neighbours.push(bottom);
    }
    if(left && !left.visited){
      neighbours.push(left);
    }
    
    return neighbours;
    
  }
  
  this.highlight = function() {
    let x = this.i * w;
    let y = this.j * w;
    noStroke();
    fill(0, 0, 255, 100);
    rect(x, y, w, w);
  }
  
  this.show = function() {
    let x = this.i * w;
    let y = this.j * w;
    stroke(255);
    
    if(this.walls[0]) {
      line(x, y, x + w, y)
    }
    if(this.walls[1]){
      line(x + w, y, x + w, y + w);
    }
    if(this.walls[2]){
      line(x , y + w, x + w, y + w);
    }
    if(this.walls[3]){
      line(x, y, x, y + w);
    }
    
    if(this.visited){
      noStroke();
      fill(255, 20, 255, 100);
      rect(x, y, w, w);
    }
  }
  
}