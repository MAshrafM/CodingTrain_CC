function Asteroids(pos, r){
  this.pos = pos ? pos.copy() : createVector(random(width), random(height));
  this.r = r ? r * 0.5 : random(25, 45);
  this.vel = p5.Vector.random2D();
  this.total = floor(random(5, 15));
  this.offset = [];
  for(let i = 0; i < this.total; i++){
    this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
  }
  
  this.update = () => {this.pos.add(this.vel);}
  
  this.render = () => {
    push();
    stroke(255);
    fill(255);
    translate(this.pos.x, this.pos.y);
    beginShape();
    for(let i = 0; i < this.total; i++){
      let angle = map(i, 0, this.total, 0, TWO_PI);
      let r = this.r + this.offset[i];
      let x = r * cos(angle);
      let y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
  
  this.breakup = () => {
    let newA = [];
    newA[0] = new Asteroids(this.pos, this.r);
    newA[1] = new Asteroids(this.pos, this.r);
    return newA;
  }
  
  this.edges = () => {
    if(this.pos.x > width + this.r){
      this.pos.x = -this.r;
    } else if(this.pos.x < -this.r){
      this.pos.x = width + this.r;
    }
    
    if(this.pos.y > height + this.r){
      this.pos.y = -this.r;
    } else if(this.pos.y < -this.r){
      this.pos.y = height + this.r;
    }
  }
}