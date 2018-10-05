function Walker(x, y){
  if(arguments.length == 2){
    this.pos = createVector(x, y);
    this.stick = true;
  } else {
    this.pos = randomPoint();
    this.stuck = false;
  }
  this.r = radius;
  
  this.walk = () => {
    let vel = p5.Vector.random2D();
    this.pos.add(vel);
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
  }
  
  this.checkStuck = (others) => {
    for(let i = 0; i < others.length; i++){
      let d = distSq(this.pos, others[i].pos);
      if(d < (this.r * this.r + others[i].r * others[i].r + 2 * this.r * others[i].r)){
        this.stuck = true;
        return true;
        break;
      }
    }
    return false;
  }
  
  this.setHue = (hu) => {this.hu = hu;}
  
  this.show = () => {
    noStroke();
    if (this.stuck && typeof this.hu !== 'undefined') {
      fill(this.hu, 255, 100, 200);
    } else {
      fill(360, 0, 255);
    }
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  }
}

// helper functions
function randomPoint(){
  let i = floor(random(4));
  if(i === 0){
    let rx = random(width);
    return createVector(rx, 0);
  } else if(i === 1){
    let rx = random(width);
    return createVector(rx, height);
  } else if(i === 2){
    let ry = random(height);
    return createVector(0, ry);
  } else {
    let ry = random(height);
    return createVector(width, ry);
  }
}

function distSq(a, b){
  let dx = b.x - a.x;
  let dy = b.y - a.y;
  return dx*dx + dy*dy;
}