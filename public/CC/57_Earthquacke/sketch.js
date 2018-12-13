// globals
let mapImg, earthquakes;
let clat = 0;
let clon = 0;
let zoom = 1;

// constant
const SCREEN_SIZE = 500;

// preload
function preload(){
  mapImg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' + clon + ',' + clat + ',' + zoom + '/' + SCREEN_SIZE * 2 + 'x' + SCREEN_SIZE +'?access_token=pk.eyJ1IjoiY29kaW5ndHJhaW4iLCJhIjoiY2l6MGl4bXhsMDRpNzJxcDh0a2NhNDExbCJ9.awIfnl6ngyHoB3Xztkzarw');
  earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
}
// Setup
function setup() {
  createCanvas(SCREEN_SIZE * 2, SCREEN_SIZE);
  translate(width/2, height/2);
  imageMode(CENTER);
  image(mapImg, 0, 0);
  
  let cx = mercX(clon);
  let cy = mercY(clat);
  
  for(let i = 1; i < earthquakes.length; i++){
    let data = earthquakes[i].split(/,/);
    let lat = data[1];
    let lon = data[2];
    let mag = data[4];
    let x = mercX(lon) - cx;
    let y = mercY(lat) - cy;
    
    if(x < -width/2){
      x+=width;
    } else if (x > width/2){
      x-=width;
    }
    
    mag = pow(10, mag);
    mag = sqrt(mag);
    let magmax = sqrt(pow(10, 10));
    let d = map(mag, 0, magmax, 0, 180);
    stroke(255, 0, 255);
    fill(255, 0, 255, 200);
    ellipse(x, y, d, d);
  }
  
}

// Helper
function mercX(lon){
  lon = radians(lon);
  let a = (256 / PI) * pow(2, zoom);
  let b = lon + PI;
  return a * b;
}

function mercY(lat){
  lat = radians(lat);
  let a = (256 / PI) * pow(2, zoom);
  let b = tan(PI / 4 + lat / 2);
  let c = PI - log(b);
  return a * c;
}