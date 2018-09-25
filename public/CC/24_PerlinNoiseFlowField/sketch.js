// globals
var inc = 0.1;
var scl = 20;
var cols, rows;
var zoff = 0;
var particles = [];
var flowfield;

// constant
const SCREEN_SIZE = 400;
const PARTICLE_NUM = 300;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  //colorMode(HSB, 255);
  cols = floor(width/scl);
  rows = floor(height/scl);
  flowfield = new Array(cols * rows);
  
  for(let i = 0; i < PARTICLE_NUM; i++){
    particles[i] = new Particle();
  }
}
// Draw
function draw(){
 // background(255);
  let yoff = 0;
  for(let y = 0; y < rows; y++){
    let xoff = 0;
    for(let x = 0; x < cols; x++){
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 50);

    }
    yoff += inc;
    zoff += 0.0003;
  }
  
  for(let i = 0; i < PARTICLE_NUM; i++){
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  
}

// Action