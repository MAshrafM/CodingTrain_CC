function Box(x, y, z, l) {
  // init position and length
  this.pos = createVector(x, y, z);
  this.l = l;
  // make incremental boxes - fractal
  this.generate = function() {
    let boxes = [];
    // coordination init loop
    // start from -1 0 1 
    for(let u = -1; u < 2; u++){
      for(let v = -1; v < 2; v++){
        for(let w = -1; w < 2; w++){
          // find the middle box on box
          let sum = abs(u) + abs(v) + abs(w);
          // update length
          let newL = this.l / 3;
          // remove middle
          if(sum > 1){
            // new positon
            let newX = this.pos.x + u * newL;
            let newY = this.pos.y + v * newL;
            let newZ = this.pos.z + w * newL;
            // add at new position
            let box = new Box(newX, newY, newZ, newL);
            boxes.push(box);
          }
        }
      }
    }
    return boxes;
  }
  // show boxes
  this.show = function() {
    push();
    
    translate(this.pos.x, this.pos.y, this.pos.z);
    stroke(33);
    fill(248);
    box(this.l);
    
    pop();
  }
}
