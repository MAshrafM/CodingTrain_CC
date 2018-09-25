function Particle() {
  this.pos = createVector(random(width), random(height));
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.maxSpeed = 4;
  this.h = 0;
  
  this.prevPos = this.pos.copy();
  
  this.update = () => {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.pos.add(this.velocity);
    this.acceleration.mult(0);
  }
  
  this.follow = (vectors) => {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
  }
  
  this.applyForce = (force) => { this.acceleration.add(force); }
  
  this.show = () => {
   stroke(this.h, 100, 150, 25);
   this.h += 1;
   if(this.h > 255){this.h = 0;}
   strokeWeight(1);
   line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
   this.updatePrev();
  }
  
  this.updatePrev = () => {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }
  
  this.edges = () => {
    if(this.pos.x > width){this.pos.x = 0;this.updatePrev();}
    if(this.pos.x < 0){this.pos.x = width;this.updatePrev();}
    if(this.pos.y > height){this.pos.y = 0;this.updatePrev();}
    if(this.pos.y < 0){this.pos.y = height;this.updatePrev();}
  }
}