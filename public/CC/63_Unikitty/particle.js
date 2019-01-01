function Particle(x, y, z){
  this.particle = new toxi.physics3d.VerletParticle3D(x, y, z);
  
  this.get = () => {return this.particle;}
  
  this.display = () => {
    push();
    translate(this.particle.x,this.particle.y,this.particle.z);
    noStroke();
    fill(255);
    ellipse(0, 0, 2, 2);
    pop();
  }
}