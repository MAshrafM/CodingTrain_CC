function Particle(x, y){
  this.pos = createVector(x, y);
  this.prev = createVector(x, y);
  this.vel = createVector();
  this.acc = createVector();
  
  this.update = () => {
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  
  this.show = () => {
    stroke(255, 255);
    strokeWeight(4);
    line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
    
    this.prev.x = this.pos.x;
    this.prev.y = this.pos.y;
  }
  
  this.attracted = (target) => {
    let force = p5.Vector.sub(target, this.pos);
    let d = force.mag();
    d = constrain(d, 1, 25);
    const G = 50;
    let strength = G / (d * d);
    force.setMag(strength);
    if(d < 20){force.mult(-10);}
    this.acc.add(force);
  }
}

