// globals
var ship;
var rocks = [];
var blasts = [];

// Constants
const SCREEN_SIZE = 600;
const ROCKS = 5;

// Setup 
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  // init player
  ship = new Ship();
  // spawn rocks
  for(let i = 0; i < ROCKS; i++){
    rocks[i] = new Rock(i * 80 + 80, 60);
  }
}

// Control
function keyPressed(){
  // hold key down movement
  if(keyCode === RIGHT_ARROW){
    ship.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    ship.setDir(-1)
  } 
  // fire blasts with space key
  if(key === ' '){
    let blast = new Blast(ship.x, height - 30);
    blasts.push(blast)
  }
}
// stop sliding after key release
function keyReleased(){
  if(keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW){
    ship.setDir(0);
  }
}


// Draw
function draw() {
  background(51);
  let edge = false; // rocks limit edges
  ship.show(); // show player
  ship.move(); // ship motion hold key
  // spawn rocks
  // rocks motion with limit edges
  for(let i = 0; i < rocks.length; i++){
    rocks[i].show();
    rocks[i].move();
    if(rocks[i].x > width || rocks[i].x < 0) { edge = true; }
  }
  // rocks motion
  if(edge) {
    for(let i = 0; i < rocks.length; i++){
      rocks[i].shiftDown();
    }
  }
  // add new rocks
  if(rocks.length === 0 ){
    for(let i = 0; i < ROCKS; i++){
      rocks[i] = new Rock(i * 80 + 80, 60);
    }
  }
  // fire blasts
  // check blasts hits rocks
  // remove blasts and rocks
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
  // remove blasts and rocks better memory
  for(let i = rocks.length -1; i >= 0; i--){
    if(rocks[i].gone) {rocks.splice(i, 1);}
  }
  for(let i = blasts.length -1; i >= 0; i--){
    if(blasts[i].gone) {blasts.splice(i, 1);}
  }
}
