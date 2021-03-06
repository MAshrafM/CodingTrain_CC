function Rock(x, y) {
  this.x = x;
  this.y = y;
  this.r = 30;
  
  this.gone = false;
  this.dirx = 1;
  //methods
  this.show = () => {
    fill(128);
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }
  // motion function
  this.move = () => this.x = this.x + this.dirx;
  // move down
  this.shiftDown = () => {
    this.dirx *= -1;
    this.y += this.r;
  }
  // remove rocks flag
  this.out = () => this.gone = true;
}