function Star() {
 // random positioning
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.z = random(width);
  this.pz = this.z;
  // update function change position and speed
  this.update = function() {
    this.z = this.z - speed;
    // handle corner case
    if (this.z < 1){
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.z = random(width);
      this.pz = this.z;
    }
  }
  
  // 
  this.show = function() {
    fill(255);
    noStroke();
    // motion
    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);
    // star radius
    let r = map(this.z, 0, width, STAR_SIZE, 0);
    ellipse(sx, sy, r, r);
    // perspective
    let px = map(this.x / this.pz, 0, 1, 0, width);
    let py = map(this.y / this.pz, 0, 1, 0, height);
    // corner case
    this.pz = this.z;
    // speeding line at the end
    stroke(255);
    line(px, py, sx, sy);
  }
}