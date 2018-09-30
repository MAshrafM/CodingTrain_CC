function Rocket(dna){
  //physics
  this.pos = createVector(width/2, height);
  this.vel = createVector(0, -1);
  this.acc = createVector(0, 1);
  
  this.completed = false; // target flag
  this.crashed = false; // hit flag
  
  this.dna = dna ? dna : new DNA();
  this.fitness = 0;
  
  this.applyForce = (force) => { this.acc.add(force); }
  
  // calc rocket fitness
  this.calcFitness = () => {
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    this.fitness = map(d, 0, width, width, 0);
    if(this.completed){this.fitness *= 10;}
    if(this.crashed){this.fitness /= 10;}
  }
  
  //update rocket state
  this.update = () => {
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    // hit target
    if(d < 10){
      this.completed = true;
      this.pos = target.copy();
    }
    // hit barrier
    if(this.pos.x > barrierDimension.rx && 
       this.pos.x < (barrierDimension.rx + barrierDimension.rw) && 
       this.pos.y > barrierDimension.ry && 
       this.pos.y < (barrierDimension.ry + barrierDimension.rh)){
      
      this.crashed = true;
    }
    // hit edge
    if(this.pos.x > width || this.pos.x < 0){
      this.crashed = true;
    }
    if(this.pos.y > height || this.pos.y < 0){
      this.crashed = true;
    }
    // apply force to genes
    this.applyForce(this.dna.genes[count]);
    // update physics
    if(!this.completed && !this.crashed){
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);
    }
    //console.log(this.pos.y);
  }
  
  // display
  this.show = () => {
    push();
    noStroke();
    fill(255, 150);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0, 0, 25, 5);
    pop();
  }
}