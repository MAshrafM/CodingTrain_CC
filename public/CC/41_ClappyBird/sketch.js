// globals
var bird;
var pipes = [];
var mic;
var clapping = false;

// constant

// Setup
function setup() {
  createCanvas(640, 480);
  mic = new p5.AudioIn();
  mic.start();
  bird = new Bird();
  pipes.push(new Pipe());  
}
// Draw
function draw(){
  background(0);
  let vol = mic.getLevel();
  
  for(let i = pipes.length - 1; i >= 0; i--){
    pipes[i].show();
    pipes[i].update();
    
    if(pipes[i].hits(bird)){console.log("Hit");}
    if(pipes[i].offscreen()){pipes.splice(i, 1);}
  }
  
  bird.update();
  bird.show();
  
  if(frameCount %75 == 0){pipes.push(new Pipe());}
  
  if(vol > 0.2 && !clapping){
    bird.up();
    clapping = true;
  }
  if(vol < 0.1){
    clapping = false;
  }  
}

// Action
function keyPressed() {
  if(key == ' '){
    bird.up();
  }
}