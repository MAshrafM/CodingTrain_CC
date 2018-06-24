function Ship() {
  this.x = width / 2;
  
  this.show = () => {
    fill(255);
    rectMode(CENTER);
    rect(this.x, height-20, 20, 20);
  }
  
  this.move = (dir) => this.x += dir * 5;
  

}