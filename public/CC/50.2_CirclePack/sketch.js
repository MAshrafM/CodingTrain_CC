// globals
var circles = [];
var img;

// constant
const SCREEN_SIZE = 530;

function preload(){
  img = loadImage('./lib/cc50.jpg');
}
// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  let density = displayDensity();
  pixelDensity(1);
  img.loadPixels();
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
  let x = random(0, img.width);
  let y = random(0, img.height);
  let valid = true;
  
  for(circle in circles){
    let d = dist(x, y, circle.x, circle.y);
    if(d - 2 < circle.r){
      valid = false;
      break;
    }
  }
  
  if(valid){
    let index = (int(x) + int(y) * img.width) * 4;
    let r = img.pixels[index];
    let g = img.pixels[index + 1];
    let b = img.pixels[index + 2];
    let c = color(r, g, b);
    return new Circle(x, y, color(c));
  } else {
    return null;
  }
}

// Action