// globals
let mapImg, earthquakes, globe;

// constant
const SCREEN_SIZE = 600;
const r = 200;

// preload
function preload(){
  mapImg = loadImage("/CC/09_Solar3dTexture/earth.jpg");
  earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
}
// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE, WEBGL);
}

function draw(){
  background(51);
  push();
  rotateY(frameCount * 0.5);
  texture(mapImg);
  sphere(r);
  pop();
  
  for(let i = 1; i < earthquakes.length; i++){
    let data = earthquakes[i].split(/,/);
    let lat = data[1];
    let lon = data[2];
    let mag = data[4];
    let theta = radians(lat);
    let phi = radians(lon) + PI;
    let x = r * cos(theta) * cos(phi);
    let y = -r * sin(theta);
    let z = -r * cos(theta) * sin(phi);
    let pos = createVector(x, y, z);
    let h = pow(10, mag);
    let maxh = pow(10, 7);
    h = map(h, 0, maxh, 10, 100);
    let xaxis = createVector(1, 0, 0);
    let angelb = xaxis.angleBetween(pos);
    let raxis = xaxis.cross(pos);
    
    push();
    translate(x, y, z);
    rotate(angelb, raxis.x, raxis.y, raxis.z);
    fill(255);
    box(h, 5, 5);
    pop();
  }
  
}
