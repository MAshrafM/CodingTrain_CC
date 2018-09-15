function Sun(radius, distance, orbitSpeed) {
  this.radius = radius;
  this.distance = distance;
  this.vector = p5.Vector.random3D();
  this.angle = random(TWO_PI);
  this.orbit_speed = orbitSpeed;
  
  this.vector.mult(this.distance)
  this.planets = [];
  
  this.orbit = () => {
    this.angle = this.angle + this.orbit_speed;
    if(this.planets != null){
      for(let i = 0; i < this.planets.length; i++) {
       this.planets[i].orbit();
      }
    }
  }
  
  this.spawnPlanets = (total) => {
    for(let i = 0; i < total; i++){
      this.planets.push(this.makePlanet());
    }
  }
  
  this.makePlanet = () => {
    let radius = this.radius / 2;
    let distance = random((this.radius + radius), (this.radius + radius) * 2); 
    let orbitSpeed = random(0.01, 0.05);
    let planet = new Sun(radius, distance, orbitSpeed);
    return planet;
  }
  
  this.show = () => {
    push();
    noStroke();
    rotate(this.angle);
    stroke(255);
    translate(this.vector.x, this.vector.y, this.vector.z);
    noStroke();
    fill(252, 212, 64);
    ambientLight(200);
    sphere(this.radius);
    if(this.planets != null){
      for(let i = 0; i < this.planets.length; i++){
        ambientLight(150);
       this.planets[i].show();
      }
    }
    pop();
  }
}
