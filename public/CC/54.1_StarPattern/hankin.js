function Hankin(a, v){
  this.a = a;
  this.v = v;
  this.b = p5.Vector.add(a, v);
  this.end;
  this.prevD;
  
  this.show = () => {
    stroke(255, 0, 255);
    line(this.a.x, this.a.y, this.end.x, this.end.y);
  }
  
  this.findEnd = (other) => {
    let den = (other.v.y * this.v.x) - (other.v.x * this.v.y);
    if(!den){return;}
    let numA = (other.v.x * (this.a.y - other.a.y)) - (other.v.y * (this.a.x - other.a.x));
    let numB = (this.v.x * (this.a.y - other.a.y)) - (this.v.y * (this.a.x - other.a.x));
    let ua = numA/den;
    let ub = numB/den;
    let x = this.a.x + (ua * this.v.x);
    let y = this.a.y + (ua * this.v.y);
    
    if(ua > 0 && ub > 0){
      let c = createVector(x, y);
      let d1 = p5.Vector.dist(c, this.a);
      let d2 = p5.Vector.dist(c, other.a);
      let d = d1 + d2;
      let diff = abs(d1 - d2);
      if(diff < 0.001){
        if(!this.end){
          this.end = c;
          this.prevD = d;
        } else if(d < this.prevD){
          this.prevD = d;
          this.end = c;
        }
      }
    }
  }
}