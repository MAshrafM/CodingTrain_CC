let unikitty, gravity, physics, gb;
let particles = [],
    springs   = [];
let zoff = 0;

const cols = 40,
      rows = 40,
      w    = 10;
      
function preload(){
  unikitty = loadImage("../public/CC/63_Unikitty/unikitty.jpg");
}

function setup(){
  createCanvas(600, 600);
  gravity = new toxi.geom.Vec3D(0, 0.5, 0);
  physics = new toxi.physics3d.VerletPhysics3D();
  gb      = new toxi.physics3d.behaviors.GravityBehavior3D(gravity);
  physics.addBehavior(gravity);
  
  let x = -cols * w / 2 - 100;
  for(let i = 0; i < cols; i++){
    particles[i] = [];
    let y = -rows * w / 2;
    for(let j = 0; j < rows; j++){
      let p = new Particle(x, y, 0);
      particles[i][j] = p;
      physics.addParticle(p.get());
      y = y + w;
    }
    x = x + w;
  }
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let a = particles[i][j];
      if (i != cols - 1) {
        let b1 = particles[i + 1][j];
        let s1 = new Spring(a.get(), b1.get());
        springs.push(s1);
        physics.addSpring(s1.get());
      }
      if (j != rows - 1) {
        let b2 = particles[i][j + 1];
        let s2 = new Spring(a.get(), b2.get());
        springs.push(s2);
        physics.addSpring(s2.get());
      }
    }
  }
  
  for (let i = 0; i < particles[0].length; i += 1) {
    particles[0][i].get().lock();
  }
}

function draw(){
  background(51);
  translate(width/2, height/2);
  physics.update();
  let xoff = 0;
  for (let i = 0; i < cols; i++) {
    let yoff = 0;
    for (let j = 0; j < rows; j++) {
      let n = noise(xoff, yoff);
      let windx = map(noise(xoff, yoff, zoff), 0, 1, 0, 3);
      let windy = map(noise(xoff + 5000, yoff + 5000, zoff), 0, 1, -0.5, 0);
      let windz = map(noise(xoff + 3000, yoff + 3000, zoff), 0, 1, -1, 1);
      let wind = new toxi.geom.Vec3D(windx, windy, windz);
      particles[i][j].get().addForce(wind);
      yoff += 0.1;
    }
    xoff += 0.1;
  }
  zoff += 0.1;
  
  noFill();
  noStroke();
  
  for (let j = 0; j < rows - 1; j++) {
    beginShape(TRIANGLE_STRIP);
    texture(unikitty);
    for (let i = 0; i < cols; i++) {
      let x1 = particles[i][j].get().x;
      let y1 = particles[i][j].get().y;
      let z1 = particles[i][j].get().z;
      let u = map(i, 0, cols - 1, 0, 1);
      let v1 = map(j, 0, rows - 1, 0, 1);
      vertex(x1, y1, z1, u, v1);
      let x2 = particles[i][j + 1].get().x;
      let y2 = particles[i][j + 1].get().y;
      let z2 = particles[i][j + 1].get().z;
      let v2 = map(j + 1, 0, rows - 1, 0, 1);
      vertex(x2, y2, z2, u, v2);
    }
    endShape();
  }
  
  stroke(255);
  strokeWeight(4);
  line(-cols * w / 2 - 100, -rows * w / 2, -cols * w / 2 - 100, height);
}