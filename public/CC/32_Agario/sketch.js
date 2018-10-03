// globals
var blob;
var blobs = [];
var zoom = 1;

// constant
const SCREEN_SIZE = 600;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  blob = new Blob(0, 0, 64);
  for(let i = 0; i < 200; i++){
    let x = random(-width, width);
    let y = random(-height, height);
    blobs[i] = new Blob(x, y, 16);
  }
}
// Draw
function draw(){
  background(0);
  translate(width/2, height/2);
  let newZoom = 64 / blob.r;
  zoom = lerp(zoom, newZoom, 0.1);
  scale(zoom);
  translate(-blob.pos.x, -blob.pos.y);
  
  for(let i = blobs.length - 1; i >= 0; i--){
    blobs[i].show();
    if(blob.eats(blobs[i])){blobs.splice(i, 1);}
  }
  
  blob.show();
  blob.update();
}

// Action