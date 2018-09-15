function Cell(pos, radius, col){
  pos ? this.pos = pos.copy() : this.pos = createVector(random(width), random(height));
  this.r = radius || random(60, 120);
  this.col = col || color(random(100, 255), random(100, 255), random(100, 255));
  // cell mitosis click action
  this.clicked = (x, y) => {
    let d = dist(this.pos.x, this.pos.y, x, y);
    return d < this.r ? true : false
  }
  // mitosis action
  this.mitosis = () => {
    let cell = new Cell(this.pos, this.r * 0.8, this.col);
    return cell;
  }
  // random motion
  this.move = () => {
    let vel = p5.Vector.random2D();
    this.pos.add(vel);
  }
  // show cells
  this.show = () => {
    fill(this.col);
    ellipse(this.pos.x, this.pos.y, this.r, this.r)
  }
}