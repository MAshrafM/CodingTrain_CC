// globals
//var easycam;
var sun;
var sunTexture;
var textures = new Array(5);
// Constants
const SCREEN_SIZE = 600;

// Setup 
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE, WEBGL);
  sunTexture = loadImage("/CC/09_Solar3dTexture/sun.jpg");
  textures[0] = loadImage("/CC/09_Solar3dTexture/venus.jpg");
  textures[1] = loadImage("/CC/09_Solar3dTexture/earth.jpg");
  textures[2] = loadImage("/CC/09_Solar3dTexture/mars.jpg");
  textures[3] = loadImage("/CC/09_Solar3dTexture/jupiter.jpg");
  textures[4] = loadImage("/CC/09_Solar3dTexture/neptune.jpg");
  //easycam = createEasyCam();
  //easycam = new Dw.EasyCam(this._renderer, {distance:500, center:[0,0,0]});
  
  sun = new Sun(50, 0, 0, sunTexture);
  sun.spawnPlanets(5);
}

// Controls


// Draw
function draw() {
  background(0);
  ambientLight(255,255,255);
  pointLight(255, 255, 255, 0, 0, 0);
  sun.show();
  sun.orbit();
}