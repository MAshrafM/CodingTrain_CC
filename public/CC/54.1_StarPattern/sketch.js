/* Islamic Star Pattern
   http://www.cgl.uwaterloo.ca/csk/projects/starpatterns/
*/
// globals
var polygons = [];
var deltaSlider, angleSlider;
var angle = 75;
var delta = 10;

// constant
const SCREEN_SIZE = 400;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  deltaSlider = createSlider(0, 25, 10);
  angleSlider = createSlider(0, 90, 75);
  
  let inc = 100;
  for(let x = 0; x < width; x += inc){
    for(let y = 0; y < height; y += inc){
      let p = new Polygon();
      p.addVertex(x, y);
      p.addVertex(x + inc, y);
      p.addVertex(x + inc, y + inc);
      p.addVertex(x, y + inc);
      p.close();
      polygons.push(p);
    }
  }
}
// Draw
function draw(){
  background(51);
  angle = angleSlider.value();
  delta = deltaSlider.value();
  
  for(let i = 0; i < polygons.length; i++){
    polygons[i].hankin();
    polygons[i].show();
  }
}

// Action