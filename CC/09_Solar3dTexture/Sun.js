function Sun(radius, distance, orbitSpeed, sunTexture) {
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
      let radius = this.radius / 2;
      let distance = random((this.radius + radius), (this.radius + radius) * 3); 
      let orbitSpeed = random(0.01, 0.05);
      let planet = new Sun(radius, distance, orbitSpeed, textures[i]);
      this.planets.push(planet);
    }
  }
  
  
  this.show = () => {
    sphere(this.radius);
    texture(sunTexture);
    push();
    rotate(this.angle);
    translate(this.vector.x, this.vector.y, this.vector.z);
    sphere(this.radius);
    texture(sunTexture);
    if(this.planets != null){
      for(let i = 0; i < this.planets.length; i++){
       this.planets[i].show();
      }
    }
    pop();
  }
}
