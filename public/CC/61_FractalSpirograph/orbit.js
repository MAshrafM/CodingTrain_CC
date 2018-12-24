let k = -4;

function Orbit(x, y, r, n, p){
  this.x = x;
  this.y = y;
  this.r = r;
  this.parent = p;
  this.child = null;
  this.speed = (radians(pow(k, n-1)))/RES;
  this.angle = -PI/2;
  
  this.addChild = () => {
    let newR = this.r / 3.0;
    let newX = this.x + this.r + newR;
    let newY = this.y;
    this.child = new Orbit(newX, newY, newR, n+1, this);
    return this.child;
  }
  
  this.update = () => {
    let parent = this.parent;
    if(parent != null){
      this.angle += this.speed;
      let rSum = this.r + parent.r;
      this.x = parent.x + rSum * cos(this.angle);
      this.y = parent.y + rSum * sin(this.angle);
    }
  }
  
  this.show = () => {
    stroke(255, 100);
    strokeWeight(1);
    noFill();
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
}