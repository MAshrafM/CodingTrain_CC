// globals
var easycam;
var globe;


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
  let r = 200;
  for(let i = 0; i < TOTAL + 1; i++){
    let lat = map(i, 0, TOTAL, 0, PI);
    for(let j = 0; j < TOTAL + 1; j++){
      let lon = map(j, 0, TOTAL, 0, TWO_PI);
      let x = r * sin(lat) * cos(lon);
      let y = r * sin(lat) * sin(lon);
      let z = r * cos(lat);
      globe[i][j] = createVector(x, y, z);
    }
  }
  
  for(let i = 0; i < TOTAL; i++){
    let h = map(i, 0, TOTAL, 0, 255*6);
    fill(h%255, 255, 255);
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