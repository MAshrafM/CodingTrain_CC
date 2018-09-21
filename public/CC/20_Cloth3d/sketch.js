/*
Original challenge in processing java
many problem faced when trying it in p5.js
toxiclips lib in js has issue original open source lib does not include physics3d on of the fork does. merged in one of the branches on github.
after few hours this is what I got need much improvement
Spring3D does not yield the proper behaviors
VerletPhysics3D, Particles and GravityBehavior seems to be working but bugs in my Spring.
plus the Sync. behavior of JS lead me to use Async and wait function as loading the particle and spring takes time.

Need work.
*/

// globals
var cols = 10;
var rows = 10;

var particles = new Array(cols);
for(let i = 0; i < particles.length; i++){
  particles[i] = new Array(rows);
}

var springs = [];
var w = 10;
var physics;
var x = -cols*w/2;
var lines = [];
var rate = 0;
// constant
const SCREEN_SIZE = 400;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE, WEBGL);
  physics = new toxi.physics3d.VerletPhysics3D();
  let gravity = new toxi.geom.Vec3D(0,0.5,0);
  let gb = new toxi.physics3d.behaviors.GravityBehavior(gravity);
  physics.addBehavior(gb);
  createParticles();
  setTimeout(createSprings, 2000);
}

// Draw
function draw(){
  physics.update();
  background(51);
  translate(0, SCREEN_SIZE/4);
  rotateX(rate);
  //rate += 0.01;
  for(let i = 0; i < lines.length; i++){
    let l = lines[i];
    stroke(255);
    strokeWeight(2);
    line(l.a.x, l.a.y, l.a.z, l.b.x, l.b.y, l.b.z);
  }
}

// Action
async function createParticles(){
  for(let i = 0; i < cols; i++){
    let z = 0;
    for(let j = 0; j < rows; j++){
      let v = new toxi.geom.Vec3D(x, -200, z);
      let p = await cr(v);
      particles[i][j] = p;
      physics.addParticle(p);
      z += w;
    }
    x += w;
  }
}

function cr(v){
  return new toxi.physics3d.VerletParticle3D({vector: v});
}

async function createSprings(){
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      let a = particles[i][j];
      if(i != cols-1){
        let b1 = particles[i+1][j];
        let s1 = await sr(a, b1);
        springs.push(s1);
        physics.addSpring(s1);
      }
      if(j != rows-1){
        let b2 = particles[i][j+1];
        let s2 = await sr(a, b2);
        springs.push(s2);
        physics.addSpring(s2);
      }
    }
  }
  //particles[0][0].lock();
  //particles[cols-1][0].lock();
  //particles[cols-2][rows-2].lock();
}

function sr(a, b){
  lines.push({a: a, b: b});
  return new toxi.physics3d.VerletSpring3D(a, b, w, 1);
}