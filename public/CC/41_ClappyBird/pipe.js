function Pipe(){
  let spacing = random(50, height/2);
  let centery = random(spacing, height - spacing);
  
  this.top = centery - spacing / 2;
  this.bottom = height - this.top;
  this.x = width;
  this.w = 80;
  this.speed = 6;
  
  this.highlight = false;
  
  this.hits = (bird) => {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
    
    this.highlight = false;
    return false;
  }
  
  this.show = () => {
    fill(255);
    if (this.highlight) {fill(255, 0, 0);}
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height-this.bottom, this.w, this.bottom);
  }
  
  this.update = () => {this.x -= this.speed;}
  
  this.offscreen = () => { return this.x < -this.w ? true : false;}

}