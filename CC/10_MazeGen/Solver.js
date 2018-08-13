function Solver(){
  this.started = false;
  this.paths = [new getPaths(0, longest.i + longest.j * cols)];
  
  this.draw = function() {
    this.paths[0].update();
    this.paths[0].draw();
  }
}

function getPaths(x, z) {
  this.pathCells = [];
  this.stack = [];
  this.way= [];
  this.found = false;
  this.distance = 0;
  
  for(let j = 0; j < rows; j++){
    for(let i = 0; i < cols; i++){
      this.pathCells[i + j * cols] = new getCells(i, j);
      this.pathCells[i + j * cols].walls = grid[i + j * cols].walls;
    }
  }
  
  this.current = this.pathCells[x];
  this.current.visited = true;
  this.target = this.pathCells[z];
  
  this.update = function() {
    if(this.current) {
      var freeCell = this.current.fcell(this.pathCells);
    }
    if(freeCell && freeCell.length > 0 && !this.found) {
      let move = random(freeCell);
      move.visited = true;
      this.stack.push(move);
      this.current = move;
    } else {
      this.current = this.stack.pop();
      if(this.current && this.current.visited && this.found){
        this.way.push(this.current);
      }
      if(this.current == this.target){
        this.found = true;
      }
    }
  }
  
  this.draw = function() {
    fill(255);
    if(this.current){
      this.current.draw();
    }
    for(let i = 0; i < this.way.length; i++){
      stroke(33, 33, 33);
      strokeWeight(5)
      if(this.way[i+1]){
        line(w * this.way[i].i + w / 2,
             w * this.way[i].j + w / 2,
             w * this.way[i + 1].i + w / 2,
             w * this.way[i + 1].j + w / 2
            );
      }
    }
  }
}

function getCells(i, j) {
  this.i = i;
  this.j = j;
  this.visited = false;
  this.walls = [];
  
  this.draw = function() {
    this.drawWalls();
    ellipse( w * this.i + w / 2, w * this.j + w / 2, 10, 10);
  }
  
  this.fcell = function(pcells) {
    let neighbours= [];
    
    let top = pcells[index(this.i, this.j -1)];
    let right = pcells[index(this.i + 1, this.j)];
    let bottom = pcells[index(this.i, this.j + 1)];
    let left = pcells[index(this.i - 1, this.j)];
    
    if(top && !this.walls[0] && !top.visited){
      neighbours.push(top);
    }
    if(right && !this.walls[1] && !right.visited){
      neighbours.push(right);
    }
    if(bottom && !this.walls[2] && !bottom.visited){
      neighbours.push(bottom);
    }
    if(left && !this.walls[3] && !left.visited){
      neighbours.push(left);
    }
    
    return neighbours;
  }
  
  this.drawWalls = function() {
    stroke(255);
    let x = this.i * w;
    let y = this.j * w;
    
    if(!this.walls[0]) {
      line(x, y, x + w, y)
    }
    if(!this.walls[1]){
      line(x + w, y, x + w, y + w);
    }
    if(!this.walls[2]){
      line(x , y + w, x + w, y + w);
    }
    if(!this.walls[3]){
      line(x, y, x, y + w);
    }
  }
}