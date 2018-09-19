function Leaf() {
  this.pos = p5.Vector.random3D();
  this.pos.mult(random(width/2));
  this.pos.y -= height/4;
  this.reached = false;
  
  this.show = function() {
    fill(255);
    noStroke();
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    ellipse(0, 0, 4, 4);
    pop();
  }
}