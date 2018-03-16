// globals
var axis = 0;
var sponge = [];

// Constants
const SCREEN_SIZE = 600;
const LENGTH = 200;

// Setup 
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE, WEBGL);
  // init boxes
  let box = new Box(0, 0, 0, LENGTH);
  sponge.push(box);
}

// Control
/*
  Create more boxes when pressed
  Fractal behaviour
*/
function mousePressed() {
  let next = [];
  for(let i = 0; i < sponge.length; i++){
    let frac = sponge[i];
    let newBoxes = frac.generate();
    next = next.concat(newBoxes);
  }
  sponge = next;
}

// Draw
function draw() {
  background(51); // background color
  // init rotation on 3-axis
  rotateX(axis);
  rotateY(axis * 0.4);
  rotateZ(axis * 0.7);
  // show Fractal
  for(let i = 0; i < sponge.length; i++){
    sponge[i].show();
  }
  // update rotation to make motion
  axis += 0.01;
}

// Box Object
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
