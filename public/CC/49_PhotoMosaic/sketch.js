// globals
var photo;
var smaller;
var allImages = [];
var brightness;
var brightImages = [];
var w, h;

// constant
const SCREEN_SIZE = 400;
var scl = 16;


// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  photo = loadImages('./lib/mosaic/image.jpg');
  let files = listFiles(sketchPath('./lib/mosiac'));
  for(let i = 0; i < files.length; i++){
    let filename = files[i+1].toString();
    let img = loadImage('./lib/mosiac/' + filename);
    allImages[i] = createImage(scl, scl, RGB);
    allImages[i].copy(img, 0, 0, img.width, img.height, 0, 0, scl, scl);
    allImages[i].loadPixels();
    
    let avg = 0;
    for(let j = 0; j < allImages[i].pixels.length; j++){
      let b = brightness(allImages[i].pixels[j]);
      avg += b;
    }
    avg /= allImages[i].pixels.length;
    brightness[i] = avg;
  }
  
  for(let i = 0; i < 256; i++){
    let record = 256;
    for(let j = 0; j < brightness.length; j++){
      let diff = abs(i - brightness[j]);
      if(diff < record){
        record = diff;
        brightImages[i] = allImages[j];
      }
    }
  }
  
  w = photo.width/scl;
  h = photo.height/scl;
  
  smaller = createImage(w, h, RGB);
  smaller.copy(photo, 0, 0, photo.width, photo.height, 0, 0, w, h);
}
// Draw
function draw(){
  background(0);
  smaller.loadPixels();
  for(let x = 0; x < w; x++){
    for(let y = 0; y < h; y++){
      let index = x + y * w;
      let c = smaller.pixels[index];
      let imageIndex = brightness(c);
      image(brightImages[imageIndex], x * scl, y * scl, scl, scl);
    }
  }
  
  noLoop();
}

// Action
function listFiles(dir){
  let file = new File(dir);
  if(file.isDirectory()){
    let files = file.listFiles();
    return files;
  } else {
    return null;
  }
}