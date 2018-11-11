function Circle(x, y){
  this.x = x;
  this.y = y;
  this.r = 0.5;
  this.growing = true;
  
  this.grow = () => {
    if(this.growing){this.r += 1;}
  }
  
  this.show = () => {
    stroke(255);
    noFill();
    strokeWeight(2);
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }
  
  this.edges = () => {
    return (this.x + this.r >= width || this.x - this.r <= 0 || this.y + this.r >= height || this.y - this.r <= 0)
  }
}