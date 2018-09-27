// globals
var easycam;
var globe;

var offset = 0;

var osc = 0;
var dosc = 0;

var a = 1, b = 1;

// constant
const SCREEN_SIZE = 600;
const TOTAL = 100;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE, WEBGL);
  colorMode(HSB, 255);
  easycam = createEasyCam();
  easycam = new Dw.EasyCam(this._renderer, {distance:500, center:[0,0,0]});
  globe = new Array(TOTAL + 1);
  for(let i = 0; i < TOTAL + 1; i++){
    globe[i] = new Array(TOTAL + 1);
  }
}
// Draw
function draw(){
  background(0);
  noStroke();
  
  osc = map(sin(dosc), -1, 1, 0, 7);
  dosc += 0.02;
  let r = 200;
  for(let i = 0; i < TOTAL + 1; i++){
    let lat = map(i, 0, TOTAL, -HALF_PI, HALF_PI);
    let r2 = Supershape(lat, osc, 0.2, 1.7, 1.7);
    for(let j = 0; j < TOTAL + 1; j++){
      let lon = map(j, 0, TOTAL, -PI, PI);
      let r1 = Supershape(lon, osc, 0.2, 1.7, 1.7);
      
      let x = r * r1 * cos(lon) * r2 * cos(lat);
      let y = r * r1 * sin(lon) * r2 * cos(lat);
      let z = r * r2 * sin(lat);
      
      globe[i][j] = createVector(x, y, z);
    }
  }
  
  offset += 5;
  for(let i = 0; i < TOTAL; i++){
    let h = map(i, 0, TOTAL, 0, 255*6);
    fill((h+offset)%255,255,255);
    beginShape(TRIANGLE_STRIP);
    for(let j = 0; j < TOTAL + 1; j++){
      let v1 = globe[i][j];
      vertex(v1.x, v1.y, v1.z);
      let v2 = globe[i+1][j];
      vertex(v2.x, v2.y, v2.z);
    }
    endShape();
  }
}

// Action
function Supershape(theta, m, n1, n2, n3){
  let t1 = abs((1/a) * cos(m * theta / 4));
  t1 = pow(t1, n2);
  let t2 = abs((a/b) * sin(m * theta / 4));
  t2 = pow(t2, n3);
  let t3 = t1 + t2;
  return pow(t3, -1/n1);
}