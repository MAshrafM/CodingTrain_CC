// globals
let font;
let vehicles = [];

// constant
const SCREEN_SIZE = 300;

function preload(){
  font = loadFont('/public/CC/59_SteerText/AvenirNextLTPro-Demi.otf');
}
// Setup
function setup() {
  createCanvas(SCREEN_SIZE * 2, SCREEN_SIZE);
 
  let points = font.textToPoints('MAshraf', 5, 200, 150, {sampleFactor: 0.25});
  for(let p of points){
    let vehicle = new Vehicle(p.x, p.y);
    vehicles.push(vehicle);
  }
}
// Draw
function draw(){
  background(51);
  for(let v of vehicles){
    v.behaviors();
    v.update();
    v.show();
  }
}

// Action