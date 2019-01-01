function Spring(a, b){
  this.spring = new toxi.physics3d.VerletSpring3D(a, b, w, 1);
  
  this.get = () => {return this.spring;}
  
  this.display = () => {
    stroke(255);
    strokeWeight(2);
    line(this.spring.a.x, this.spring.a.y, this.spring.a.z, this.spring.b.x, this.spring.b.y, this.spring.b.z);
  }
}