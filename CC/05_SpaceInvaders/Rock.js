function Rock(x, y) {
  this.x = x;
  this.y = y;
  this.r = 30;
  this.gone = false;
  
  this.show = () => {
    fill(128);
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }
  
  this.out = () => this.gone = true;
  
}