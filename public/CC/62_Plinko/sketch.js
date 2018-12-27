// globals
let engine, world, ding;
let particles = [],
    plinkos   = [],
    bounds    = [];

// constant
const SCREEN_SIZE = 600;
const Engine = Matter.Engine,
      World  = Matter.World,
      Events = Matter.Events,
      Bodies = Matter.Bodies;
const cols = 11,
      rows = 8;

function preload(){
  ding = loadSound('./public/CC/62_Plinko/ding.mp3');
}

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  colorMode(HSB);
  engine = Engine.create();
  world = engine.world;
  
  function collision(event){
    let pairs = event.pairs;
    for(p of pairs){
      let labelA = p.bodyA.label;
      let labelB = p.bodyB.label;
      if(labelA == 'particle' && labelB == 'plinko'){
        //ding.play();
      }
      if(labelB == 'particle' && labelA == 'plinko'){
        //ding.play();
      }
    }
  }
  
  Events.on(engine, 'collisionStart', collision);
  
  newParticle();
  
  let spacing = width / cols;
  for(let j = 0; j < rows; j++){
    for(let i = 0; i < cols + 1; i++){
      let x = i * spacing;
      if(j % 2 == 0){ x += spacing / 2;}
      let y = spacing + j * spacing;
      let p = new Plinko(x, y, 16);
      plinkos.push(p);
    }
  }
  
  let b = new Boundary(width/2, height + 50, width, 100);
  bounds.push(b);
  
  for(let i = 0; i < cols + 2; i++){
    let x = i * spacing;
    const h = 100;
    const w = 10;
    let y = height - h / 2;
    let b = new Boundary(x, y, w, h);
    bounds.push(b);
  }
}
// Draw
function draw(){
  background(0, 0, 0);
  if(frameCount % 20 == 0){
    newParticle();
  }
  Engine.update(engine, 1000/30);
  for(let i = 0; i < particles.length; i++){
    particles[i].show();
    if(particles[i].isOffScreen()){
      World.remove(world, particles[i].body);
      particles.splice(i, 1);
      i--;
    }
  }
  
  for(let p of plinkos){
    p.show();
  }
  
  for(let b of bounds){
    b.show();
  }
}

// Action

function newParticle(){
  let p = new Particle(300, 0, 10);
  particles.push(p);
}