class Segment{
  constructor(point, len, i){
    if(point.hasOwnProperty("angle")){
      this.par = point;
      this.a = this.par.b.copy();
    } else {
      this.par = false;
      this.a = point;
    }
    
    this.b = new p5.Vector();
    this.angle = 0;
    this.sw = map(i, 0, 20, 1, 10);
    this.len = len;
    this.calculateB();
  }
  
  wiggle(){
    let maxAngle = 1;
    let minAngle = -1;
    this.selfAngle = map(noise(this.xoff), 0, 1, maxAngle, minAngle);
    this.xoff += 0.03;
  }
  
  follow(tx, ty){
    if(typeof(ty) == "undefined"){
      let targetX = this.child.a.x;
      let targetY = this.child.a.y;
      this.follow(targetX, targetY);
    } else {
      let target = new p5.Vector(tx, ty);
      let dir = p5.Vector.sub(target, this.a);
      this.angle = dir.heading();
      dir.setMag(this.len);
      dir.mult(-1);
      this.a = p5.Vector.add(target, dir);
    }
  }
  
  update(){
    this.calculateB();
  }
  
  calculateB(){
    let dx = this.len * cos(this.angle);
    let dy = this.len * sin(this.angle);
    this.b.set(this.a.x + dx, this.a.y + dy);
  }
  
  show(){
    stroke(255);
    strokeWeight(this.sw);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}