// globals
var stars = [];
var speed;

// Constants
const SCREEN_SIZE = 600;
const STAR_NUM = 800;
const SPEED = 20;
const STAR_SIZE = 2;
// Setup 
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  for(let i = 0; i < STAR_NUM; i++){
    stars[i] = new Star();
  }
}

// Draw
function draw() {
  // speed depend on mouse position on screen
  speed = map(mouseX, 0, width, 0, SPEED);
  // black background
  background(0);
  // center screen
  translate(width/2, height/2);
  // play
  for(let i = 0; i < stars.length; i++){
    stars[i].update();
    stars[i].show();
  }
}

// Star Object
function Star() {
  // random positioning
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.z = random(width);
  this.pz = this.z;
  // update function change position and speed
  this.update = function() {
    this.z = this.z - speed;
    // handle corner case
    if (this.z < 1){
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.z = random(width);
      this.pz = this.z;
    }
  }
  
  // 
  this.show = function() {
    fill(255);
    noStroke();
    // motion
    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);
    // star radius
    let r = map(this.z, 0, width, STAR_SIZE, 0);
    ellipse(sx, sy, r, r);
    // perspective
    let px = map(this.x / this.pz, 0, 1, 0, width);
    let py = map(this.y / this.pz, 0, 1, 0, height);
    // corner case
    this.pz = this.z;
    // speeding line at the end
    stroke(255);
    line(px, py, sx, sy);
  }
}