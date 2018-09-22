// globals
var minSlider, maxSlider;
var frameDiv;


// constant
const SCREEN_SIZE = 600;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  pixelDensity(1);
  
  minSlider = createSlider(-2.5, 0, -2.5, 0.01);
  maxSlider = createSlider(0, 2.5, 2.5, 0.01);
  
  frameDiv = createDiv('');
  
}
// Draw
function draw(){
  background(51);
  
  loadPixels();
  for(let x = 0; x < SCREEN_SIZE; x++){
    for(let y = 0; y < SCREEN_SIZE; y++){
      
      let a = map(x, 0, SCREEN_SIZE, minSlider.value(), maxSlider.value());
      let b = map(y, 0, SCREEN_SIZE, minSlider.value(), maxSlider.value());
      
      let copyA = a;
      let copyB = b;
      
      let num = 0;
      
      while(num < 100){
        // calc z^2
        let real = a*a - b*b;
        let img = 2*a*b;
        // get to f(z) = z^2 + c
        a = real + copyA;
        b = img + copyB;
      
        if(a*a+b*b > 16){
          break;
        }
        num++;
      }
      let bright = map(num, 0, 100, 0, 1);
      bright = map(sqrt(bright), 0, 1, 0, 255);
      
      if(num == 100){bright = 0;}
      
      let pix = (x + y * SCREEN_SIZE) * 4;
      pixels[pix + 0] = bright;
      pixels[pix + 1] = bright;
      pixels[pix + 2] = bright;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
  
  frameDiv.html(floor(frameRate()));
}

// Action