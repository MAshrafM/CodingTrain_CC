// globals
var snake;
var food;

// Constants
const SCREEN_SIZE = 400;
const SCREEN_RATE = 10;
const SNAKE_SIZE = 20;

// Setup 
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  frameRate(SCREEN_RATE);
  snake = new Snake();
  foodLocation();
}

// Control
function keyPressed() {
  if(keyCode === UP_ARROW){
    snake.direction(0, -1);
  } else if (keyCode == DOWN_ARROW) {
    snake.direction(0, 1);
  } else if (keyCode == RIGHT_ARROW) {
    snake.direction(1, 0);
  } else if (keyCode == LEFT_ARROW) {
    snake.direction(-1, 0);
  }
}

// New food location
function foodLocation(){
  let cols = floor(width/SNAKE_SIZE);
  let rows = floor(height/SNAKE_SIZE);
  // create random food
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(SNAKE_SIZE);
}
// Draw
function draw() {
  background(51); // background color
  snake.update();
  snake.show();
  // create new food location when eaten
  if(snake.eat(food)){
    foodLocation();
  }
  // create food bit
  fill(255, 0, 100);
  rect(food.x, food.y, SNAKE_SIZE, SNAKE_SIZE);
}
