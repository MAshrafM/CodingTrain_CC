// globals
var bird;
var pipes = [];

// constant

// Setup
function setup() {
  createCanvas(640, 480);
  bird = new Bird();
  pipes.push(new Pipe());  
}
// Draw
function draw(){
  background(0);
  for(let i = pipes.length - 1; i >= 0; i--){
    pipes[i].show();
    pipes[i].update();
    
    if(pipes[i].hits(bird)){console.log("Hit");}
    if(pipes[i].offscreen()){pipes.splice(i, 1);}
  }
  
  bird.update();
  bird.show();
  
  if(frameCount %75 == 0){pipes.push(new Pipe());}
  
}

// Action
function keyPressed() {
  if(key == ' '){
    bird.up();
  }
}