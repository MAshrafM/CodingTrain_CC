function Planet(radius, distance, orbitSpeed){
  this.radius = radius;
  this.distance = distance;
  this.angle = random(TWO_PI);
  this.orbit_speed = orbitSpeed;
  
  this.orbit = () => {
    this.angle = this.angle + this.orbit_speed;
  }

  this.show = () => {
    push();
    fill(255, 100);
    rotate(this.angle);
    translate(this.distance, 0);
    ellipse(0, 0, this.radius * 2, this.radius * 2);
    pop();
  }
}