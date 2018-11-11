// globals
var circles = [];
var spots = [];
var img;

// constant
const SCREEN_SIZE = 600;

function preload(){
  img = loadImage('./lib/y.png');
}
// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  let density = displayDensity();
  pixelDensity(1);
  img.loadPixels();
  for(let x = 0; x < img.width; x++){
    for(let y = 0; y < img.height; y++){
      let index = x + y * img.width;
      let c = img.pixels[index*4];
      let b = brightness([c]);
      if(b > 1){
        spots.push(createVector(x, y));
      }
    }
  }
  
}
// Draw
function draw(){
  background(0);
  
  let total = 10;
  let count = 0;
  let attempts = 0;
  
  while(count < total){
    let newC = newCircle();
    if(newC !== null){
      circles.push(newC);
      count++;
    }
    attempts++;
    if(attempts > 100){
      noLoop();
      break;
    }
  }
  
  for(let i = 0; i < circles.length; i++){
    let circle = circles[i];
    if(circle.growing){
      if(circle.edges()){
        circle.growing = false;
      } else {
        for(let j = 0; j < circles.length; j++){
          let other = circles[j];
          if(circle !== other){
            let d = dist(circle.x, circle.y, other.x, other.y);
            let distance = circle.r + other.r;
            if(d - 5 < distance){
              circle.growing = false;
              break;
            }
          }
        }
      }
    }
    
    circle.show();
    circle.grow();
  }
}

function newCircle(){
  let r = int(random(0, spots.length));
  let spot = spots[r];
  let x = spot.x;
  let y = spot.y;
  let valid = true;
  
  for(circle in circles){
    let d = dist(x, y, circle.x, circle.y);
    if(d < circle.r + 5){
      valid = false;
      break;
    }
  }
  
  return valid ? new Circle(x, y) : null;
}

// Action