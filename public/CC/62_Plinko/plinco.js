function Plinko(x, y, r){
  let options = {
    restitution: 1,
    friction: 0,
    isStatic: true
  }
  this.body = Bodies.circle(x, y, r, options);
  this.body.label = "plinko";
  this.r = r;
  World.add(world, this.body);
  
  this.show = () => {
    noStroke();
    fill(127);
    let pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r*2);
    pop();
  }
}