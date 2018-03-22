// globals
var snake;

// Constants
const SCREEN_SIZE = 600;
const SNAKE_SIZE = 10;
// Setup 
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  snake = new Snake();
}

// Control

// Draw
function draw() {
  background(51); // background color
  snake.update();
  snake.show();
}

// Snake Object
function Snake() {
  this.x = 0;
  this.y = 0;
  this.xSpeed = 1;
  this.ySpeed = 0;
  
  this.update= function() {
    this.x = this.x + this.xSpeed;
    this.y = this.y + this.ySpeed;
  }
  
  this.show = function(){
    fill(255);
    rect(this.x, this.y, SNAKE_SIZE, SNAKE_SIZE);
  }
}

