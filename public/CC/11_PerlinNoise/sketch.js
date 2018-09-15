// globals
var cols, rows;
var scl = 20;
var w = 1500;
var h = 1000;

var flying = 0;

var terrain = [];

// Constants
const SCREEN_SIZE = 600;

// Setup 
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE, WEBGL);

  createCanvas(600, 600, WEBGL);
  cols = w / scl;
  rows = h/ scl;

  for (let i = 0; i < cols; i++) {
    terrain[i] = [];
    for (let j = 0; j < rows; j++) {
      terrain[i][j] = 0; 
    }
  }
}

// Controls


// Draw
function draw() {
  flying -= 0.1;
  let yoff = flying;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }


  background(0);
  translate(0, 50);
  rotateX(PI/3);
  fill(151, 124, 83, 50);
  translate(-w/2, -h/2);
  for (let y = 0; y < rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x*scl, y*scl, terrain[x][y]);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
    }
    endShape();
  }
}