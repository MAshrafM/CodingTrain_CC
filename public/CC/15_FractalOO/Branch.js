function Branch(start, end){
  this.start = start;
  this.end = end;
  this.finished = false;
  
  this.jitter = function(){
    this.end.x += random(-1, 1);
    this.end.y += random(-1, 1);
  }
  
  this.show = function(){
    stroke(255);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
    
  }
  
  this.branchA = function(){
    let dir = p5.Vector.sub(this.end, this.start);
    dir.rotate(PI/6);
    dir.mult(0.71);
    let nend = p5.Vector.add(this.end, dir);
    let b = new Branch(this.end, nend);
    return b;
  }
  
  this.branchB = function(){
    let dir = p5.Vector.sub(this.end, this.start);
    dir.rotate(-PI/4);
    dir.mult(0.71);
    let nend = p5.Vector.add(this.end, dir);
    let b = new Branch(this.end, nend);
    return b;
  }
}