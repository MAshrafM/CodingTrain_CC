// Snake Object
function Snake() {
  this.x = 0;
  this.y = 0;
  this.xSpeed = 1;
  this.ySpeed = 0;
  this.length = 0;
  this.tail = [];
  // snake movement
  // TO DO: Protect against moving backward
  this.direction = function(x, y){
    this.xSpeed = x;
    this.ySpeed = y;
  }
  // Eat food action
  this.eat = function(pos) {
    // check position
    let distance = dist(this.x, this.y, pos.x, pos.y);
    if (distance < 1){
      this.length++;
      return true;
    } else {
      return false;
    }
  }
  // Game Over when eat itself
  this.death = function(){
    for(let i = 0; i < this.tail.length; i++){
      let pos = this.tail[i];
      let distance = dist(this.x, this.y, pos.x, pos.y);
      if (distance < 1){
        this.length = 0;
        this.tail = [];
      }
    }
  }
  
  // Update snake position
  this.update= function() {
    // Elongate the snake if eaten food 
    for(let i = 0; i < this.tail.length - 1; i++){
      this.tail[i] = this.tail[i+1];
    }
    this.tail[this.length - 1] = createVector(this.x, this.y);
    
    this.x = this.x + this.xSpeed * SNAKE_SIZE;
    this.y = this.y + this.ySpeed * SNAKE_SIZE;
   
    // protect from edges
    // To DO: either wrap around edges or death 
    this.x = constrain(this.x, 0, width - SNAKE_SIZE);
    this.y = constrain(this.y, 0, height - SNAKE_SIZE);
  }
  // Draw snake on screen
  this.show = function(){
    fill(255);
    for(let i = 0; i < this.length; i++){
      rect(this.tail[i].x, this.tail[i].y, SNAKE_SIZE, SNAKE_SIZE);
    }
    rect(this.x, this.y, SNAKE_SIZE, SNAKE_SIZE);
  }
}