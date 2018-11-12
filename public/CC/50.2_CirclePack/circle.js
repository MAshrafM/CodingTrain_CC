function Circle(x, y, color){
  this.x = x;
  this.y = y;
  this.r = 2;
  this.color = color;
  this.growing = true;
  
  this.grow = () => {
    if(this.growing){this.r += 0.5;}
  }
  
  this.show = () => {
    noStroke();
    fill(this.color);
    strokeWeight(2);
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }
  
  this.edges = () => {
    return (this.x + this.r >= width || this.x - this.r <= 0 || this.y + this.r >= height || this.y - this.r <= 0)
  }
}