function Ship() {
  this.x = width / 2;
  this.dir = 0;
  // methods
  this.show = () => {
    fill(255);
    rectMode(CENTER);
    rect(this.x, height-20, 20, 20);
  }
  // motion function
  this.move = () => this.x += this.dir * 5;
  // set right/left direction
  this.setDir = (dir) => this.dir = dir;
}