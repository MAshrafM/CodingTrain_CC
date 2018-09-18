function Branch(parent, pos, dir){
  // object elements
  this.pos = pos;
  this.parent = parent;
  this.dir = dir;
  this.originalDir = this.dir.copy();
  this.count = 0;
  this.len = 5;
  // reset branch dirction and count
  this.reset = function() {
    this.dir = this.originalDir.copy();
    this.count = 0;
  }
  // generate next branch with new dir and pos 
  this.next = function() {
    let nextDir = p5.Vector.mult(this.dir, this.len);
    let nextPos = p5.Vector.add(this.pos, nextDir);
    let nextBranch = new Branch(this, nextPos, this.dir.copy());
    return nextBranch;
  }
  // show branch
  this.show = function() {
    if(this.parent != null){
      stroke(255);
      line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);
    }
  }
}