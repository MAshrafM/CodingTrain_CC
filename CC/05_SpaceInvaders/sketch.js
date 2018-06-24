// globals
var ship;
var rocks = [];
var blasts = [];

// Constants
const SCREEN_SIZE = 600;


// Setup 
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  ship = new Ship();
  for(let i = 0; i < 10; i++){
    rocks[i] = new Rock(i * 80 + 80, 60);
  }
  
}

// Control
function keyPressed(){
  if(keyCode === RIGHT_ARROW){
    ship.move(1);
  } else if (keyCode === LEFT_ARROW) {
    ship.move(-1)
  } 
  
  if(key === ' '){
    let blast = new Blast(ship.x, height - 30);
    blasts.push(blast)
  }
}


// Draw
function draw() {
  background(51);
  ship.show();
  
  for(let i = 0; i < rocks.length; i++){
    rocks[i].show();
  }
  
  for(let i = 0; i < blasts.length; i++){
    blasts[i].show();
    blasts[i].move();
    if(blasts[i].y < 0) { blasts[i].out(); }
    for(let j = 0; j < rocks.length; j++){
      if(blasts[i].hits(rocks[j])) {
        blasts[i].out();
        rocks[j].out();
      }
    }
  }
  
  for(let i = rocks.length -1; i >= 0; i--){
    if(rocks[i].gone) {rocks.splice(i, 1);}
  }
  for(let i = blasts.length -1; i >= 0; i--){
    if(blasts[i].gone) {blasts.splice(i, 1);}
  }
  
}
