// globals
var img;
var sorted;
var index = 0;

// constant
const SCREEN_SIZE = 400;

function preload(){
  img = loadImage('./public/CC/47_PixelSorting/sunflower400.jpg');

}
// Setup
function setup() {
  createCanvas(SCREEN_SIZE * 2, SCREEN_SIZE);
  
  sorted = createImage(img.width, img.height, RGB);
  sorted = img.get();
}
// Draw
function draw(){
  sorted.loadPixels();
  
  for(let n = 0; n < 1000; n++){
    let record = -1;
    let selectedPixel = index;
    for(let j = 0; j < sorted.pixels.length; j++){
      let pix = sorted.pixels[j];
      let b = hue(pix);
      if(b > record){
        selectedPixel = j;
        record = b;
      }
    }
    
    let temp = sorted.pixels[index];
    sorted.pixels[index] = sorted.pixels[selectedPixel];
    sorted.pixels[selectedPixel] = temp;
    
    if(index < sorted.pixels.length - 1){index++;}
    
  }
  
  sorted.updatePixels();
  
  background(0);
  image(img, 0, 0);
  image(sorted, 400, 0);
}

// Action