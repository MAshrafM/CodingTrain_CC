function Laser(pos, angle){
  this.pos = createVector(pos.x, pos.y);
  this.vel = p5.Vector.fromAngle(angle);
  this.vel.mult(10);
  
  this.update = () => {this.pos.add(this.vel);}
  
  this.render = () => {
    push();
    stroke(255, 0, 0);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
    pop();
  }
  
  this.hits = (asteroid) => {
    let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    return d < asteroid.r ? true : false;
  }
  
  this.offscreen = () => {
    if(this.pos.x > width || this.pos.x < 0){return true;}
    if(this.pos.y > height || this.pos.y < 0){return true;}
    return false;
  }
}