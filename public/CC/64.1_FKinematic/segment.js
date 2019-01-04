class Segment{
  constructor(point, len, angle){
    if(point.hasOwnProperty("angle")){
      this.par = point;
      this.a = new p5.Vector(this.par.b.x, this.par.b.y);
    } else {
      this.par = false;
      this.a = point;
    }
    this.len = len;
    this.angle = angle;
    this.selfAngle = angle;
    this.calculateB();
    this.xoff = random(100);
  }
  
  wiggle(){
    let maxAngle = 1;
    let minAngle = -1;
    this.selfAngle = map(noise(this.xoff), 0, 1, maxAngle, minAngle);
    this.xoff += 0.03;
  }
  
  update(){
    this.angle = this.selfAngle;
    if(this.par){
      this.a = this.par.b.copy();
      this.angle += this.par.angle;
    } else {
      this.angle += -PI/2;
    }
    this.calculateB();
  }
  
  calculateB(){
    let dx = this.len * Math.cos(this.angle);
    let dy = this.len * Math.sin(this.angle);
    this.b = new p5.Vector(this.a.x + dx, this.a.y + dy);
  }
  
  show(){
    stroke(255);
    strokeWeight(4);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}