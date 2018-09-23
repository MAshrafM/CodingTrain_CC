// globals
var angle = 0;

// constant
const SCREEN_SIZE = 400;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);  
}
// Draw
function draw(){
  // constant values for julia set
  // vars to animate it only
  let ca = cos(angle*3.213);
  let cb = sin(angle);
  angle += 0.01;
  
  background(52);
  
  let w = 5;
  let h = (w * height) / width;
  
  let xmin = -w/2;
  let ymin = -h/2;
  
  loadPixels();
  
  let xmax = xmin + w;
  let ymax = ymin + h;
  
  let dx = (xmax - xmin) / width;
  let dy = (ymax - ymin) / height;
  
  let y = ymin;
  for(let j = 0; j < height; j++){
    let x = xmin;
    for(let i = 0; i < width; i++){
      let a = x;
      let b = y;
      
      let itr = 0;
      while(itr < 100){
        let real = a * a - b * b;
        if(a*a + b*b > 4){break;}
        let img = 2 * a * b;
        a = real + ca;
        b = img + cb;
        itr++;
      }
      
      let bright = map(itr, 0, 100, 0, 1);
      bright = map(sqrt(bright), 0, 1, 0, 255);
      
      if(itr == 100){bright = 0;}
      
      let pix = (i + j * SCREEN_SIZE) * 4;
      pixels[pix + 0] = bright;
      pixels[pix + 1] = bright;
      pixels[pix + 2] = bright;
      pixels[pix + 3] = 255;
      x += dx;
    }
    y += dy;
  }
  updatePixels();
  
}

// Action

