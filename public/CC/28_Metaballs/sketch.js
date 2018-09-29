// globals
var blobs = [];

// constant
const SCREEN_SIZE = 400;
const TOTAL = 4;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  for(let i = 0; i < TOTAL; i++){
    blobs.push(new Blob(random(width), random(height)));
  }
  
}
// Draw
function draw(){
  loadPixels();
  for(let x = 0; x < width; x++){
    for(let y = 0; y < height; y++){
      let index = (x + y * width) * 4;
      let sum = 0;
      for(let k = 0; k < TOTAL; k++){
        let b = blobs[k];
        let d = dist(x, y, b.pos.x, b.pos.y);
        sum += 25 * b.r / d;
      }
      pixels[index + 0] = sum;
      pixels[index + 1] = 100;
      pixels[index + 2] = 100;
      pixels[index + 3] = 255;
    }
  }
  updatePixels();
  
  for(let blob = 0; blob < TOTAL; blob++){
    let newBlob = blobs[blob];
    newBlob.update();
    //newBlob.show();
  }
}

// Action