function Leaf() {
  this.pos = createVector(random(SCREEN_SIZE), random(SCREEN_SIZE - 100));
  this.reached = false;
  
  this.show = function() {
    fill(255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 4, 4);
  }
}