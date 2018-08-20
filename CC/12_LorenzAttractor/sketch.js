// http://paulbourke.net/fractals/lorenz/
// globals
var x = 0.01,
    y = 0,
    z = 0;
let points = new Array();

// Constants
const SCREEN_SIZE = 600;
const a = 10,
      b = 28,
      c = 8.0 / 3.0;
      
// Setup 
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE, WEBGL);
  colorMode(HSB);
}

// Controls


// Draw
function draw() {
  background(0);

	let dt = 0.01;
	let dx = (a * (y - x)) * dt;
	let dy = (x * (b - z) - y) * dt;
	let dz = (x * y - c * z) * dt;
	x = x + dx;
	y = y + dy;
	z = z + dz;

	points.push(new p5.Vector(x, y, z));
  
  translate(0, 0, -80);
	let camX = map(mouseX, 0, width, -200, 200);
	let camY = map(mouseY, 0, height, -200,200); 
	camera(camX, camY, (height/2.0) / tan(PI*30.0 / 180.0), 0, 0, 0, 0, 1, 0);
	scale(5);
	//stroke(255);
	noFill();
  
  let hu = 0;
  push();
	beginShape();
  points.forEach(function(v) {
    stroke(hu, 255, 255);
		vertex(v.x, v.y, v.z);
    hu > 255 ? hu = 1 : hu += 1;
  });
	endShape();
  pop();
}