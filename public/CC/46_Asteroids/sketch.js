// globals
var ship;
var asteroids = [];
var lasers = [];

// constant
const SCREEN_SIZE = 600;
const AST_NUM = 8;
// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  ship = new Ship();
  for(let i = 0; i < AST_NUM; i++){
    asteroids.push(new Asteroids());
  }
}
// Draw
function draw(){
  background(0);
  // show asteroids
  for(let i = 0; i < asteroids.length; i++){
    if(ship.hits(asteroids[i])){
      console.log("HIT!!!")
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }
  // show lasers
  for(let i = lasers.length - 1; i >= 0; i--){
    lasers[i].render();
    lasers[i].update();
    if(lasers[i].offscreen()){
      lasers.splice(i, 1);
    } else {
      for(let j = asteroids.length - 1; j >= 0; j--){
        if(lasers[i].hits(asteroids[j])){
          if(asteroids[j].r > 10){
            let newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }
  }
  // show ship
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
}

// Action
function keyReleased(){
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed(){
  if(key == ' '){
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if(keyCode == RIGHT_ARROW){
    ship.setRotation(0.1);
  } else if(keyCode == LEFT_ARROW){
    ship.setRotation(-0.1);
  } else if(keyCode == UP_ARROW){
    ship.boosting(true);
  }
}

// Action