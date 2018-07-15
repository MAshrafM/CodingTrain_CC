function Sun(radius, distance, orbitSpeed) {
  this.radius = radius;
  this.distance = distance;
  this.angle = random(TWO_PI);
  this.orbit_speed = orbitSpeed;
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
    let radius = this.radius / 4;
    let distance = random(100, 250); 
    let orbitSpeed = random(0.01, 0.05);
    return new Planet(radius, distance, orbitSpeed);
  }
  
  this.show = () => {
    fill(252, 212, 64);
    rotate(this.angle);
    translate(this.distance, 0);
    ellipse(0, 0, this.radius * 2, this.radius * 2);
    if(this.planets != null){
      for(let i = 0; i < this.planets.length; i++){
       this.planets[i].show();
      }
    }
  }
}
