function Ship() {
  this.x = width / 2;
  this.dir = 0;
  
  this.show = () => {
    fill(255);
    rectMode(CENTER);
    rect(this.x, height-20, 20, 20);
  }
  
  this.move = () => this.x += this.dir * 5;
  
  this.setDir = (dir) => this.dir = dir;

}