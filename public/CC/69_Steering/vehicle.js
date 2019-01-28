class Vehicle{
  constructor(x, y, dna){
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -2);
    this.position = createVector(x, y);
    this.r = 4;
    this.maxSpeed = 5;
    this.maxForce = 0.5;
    this.health = 1;
    this.dna = [];
    if (dna === undefined) {
      // Food weight
      this.dna[0] = random(-2, 2);
      // Poison weight
      this.dna[1] = random(-2, 2);
      // Food perception
      this.dna[2] = random(0, 100);
      // Poision Percepton
      this.dna[3] = random(0, 100);
    } else {
      // Mutation
      this.dna[0] = dna[0];
      if (random(1) < 0.01) {
        this.dna[0] += random(-0.1, 0.1);
      }
      this.dna[1] = dna[1];
      if (random(1) < 0.01) {
        this.dna[1] += random(-0.1, 0.1);
      }
      this.dna[2] = dna[2];
      if (random(1) < 0.01) {
        this.dna[2] += random(-10, 10);
      }
      this.dna[3] = dna[3];
      if (random(1) < 0.01) {
        this.dna[3] += random(-10, 10);
      }
    }
  }
  
  update(){
    this.health -= 0.005;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  
  applyForce(force){
    this.acceleration.add(force);
  }
  
  behaviors(good, bad){
    let steerG = this.eat(good, 0.2, this.dna[2]);
    let steerB = this.eat(bad, -1, this.dna[3]);
    steerG.mult(this.dna[0]);
    steerB.mult(this.dna[1]);
    this.applyForce(steerG);
    this.applyForce(steerB);
  }
  
  clone(){
    if (random(1) < 0.002) {
      return new Vehicle(this.position.x, this.position.y, this.dna);
    } else {
      return null;
    }
  }
  
  eat(list, nutrition, perception){
    let record = Infinity;
    let closest = null;
    for (let i = list.length - 1; i >= 0; i--) {
      let d = this.position.dist(list[i]);

      if (d < this.maxSpeed) {
        list.splice(i, 1);
        this.health += nutrition;
      } else {
        if (d < record && d < perception) {
          record = d;
          closest = list[i];
        }
      }
    }
    
    if (closest != null) {
      return this.seek(closest);
    }

    return createVector(0, 0);
  }
  
  seek(target){
    let desired = p5.Vector.sub(target, this.position); 
    desired.setMag(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    return steer;
  }
  
  dead(){
    return (this.health < 0)
  }
  
  display(){
    let angle = this.velocity.heading() + PI / 2;

    push();
    translate(this.position.x, this.position.y);
    rotate(angle);


    if (debug.checked()) {
      strokeWeight(3);
      stroke(0, 255, 0);
      noFill();
      line(0, 0, 0, -this.dna[0] * 25);
      strokeWeight(2);
      ellipse(0, 0, this.dna[2] * 2);
      stroke(255, 0, 0);
      line(0, 0, 0, -this.dna[1] * 25);
      ellipse(0, 0, this.dna[3] * 2);
    }

    let gr = color(0, 255, 0);
    let rd = color(255, 0, 0);
    let col = lerpColor(rd, gr, this.health);

    fill(col);
    stroke(col);
    strokeWeight(1);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);

    pop();
  }
  
  boundaries(){
    let d = 25;

    let desired = null;

    if (this.position.x < d) {
      desired = createVector(this.maxSpeed, this.velocity.y);
    } else if (this.position.x > width - d) {
      desired = createVector(-this.maxSpeed, this.velocity.y);
    }

    if (this.position.y < d) {
      desired = createVector(this.velocity.x, this.maxSpeed);
    } else if (this.position.y > height - d) {
      desired = createVector(this.velocity.x, -this.maxSpeed);
    }

    if (desired !== null) {
      desired.normalize();
      desired.mult(this.maxSpeed);
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxForce);
      this.applyForce(steer);
    }
  }
}