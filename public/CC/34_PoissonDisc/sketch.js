// globals
var cols, rows;
var ordered = [];
var active = [];
var grid = [];
// constant
const SCREEN_SIZE = 400;

const k = 30; // limit of sample before rejection
const n = 2; // n-dimensional background grid
const r = 8; // min dist between points
const w = r / Math.sqrt(n); // bound of cell size


// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  background(0);
  strokeWeight(4);
  colorMode(HSB);
  
  // divide screen to bounded cells
  cols = floor(width/w); 
  rows = floor(height/w);
  // make the grid
  for(let i = 0; i < cols * rows; i++){
    grid[i] = undefined;
  }
  // pick a random point, instead we will chose the center for better visualization
  let x = width / 2;
  let y = height / 2;
  // the index of the random point in the bounded cells
  let i = floor(x / w);
  let j = floor(y / w);
  // create as a vector
  let pos = createVector(x, y);
  // insert that random point to the background grid
  grid[i + j * cols] = pos;
  active.push(pos);
  
}
// Draw
function draw(){
  // Main Algorithm
  // make it grow faster changing total limit
  for(let total = 0; total < 25; total++){
    // use the loop of the draw p5 function to see the algorithm
    if(active.length > 0){
      // chose a random index from the active array
      let randIndex = floor(random(active.length));
      let pos = active[randIndex];
      let found = false; // flag if the point found
      // generate a sample up to the limit
      for(let m = 0; m < k; m++){
        // pick a random angle aka vector
        let sample = p5.Vector.random2D();
        // set the dist limit between r and 2r of length 
        let p = random(r, 2*r);
        // normalize the vector the limit dist thus be the magnitude of the random vector
        sample.setMag(p);
        // add the random position to the sample.
        sample.add(pos);
        
        // get the position of the random/sample point in the grid
        let col = floor(sample.x / w);
        let row = floor(sample.y / w);
        // check the sample is in the grid away from the edge
        if (col > -1 && row > -1 && col < cols && row < rows && !grid[col + row * cols]) {
          let ok = true;
          // check neighbor cells
          for(let i = -1; i <= 1; i++){
            for(let j = -1; j <=1; j++){
              // index of the neighbor cells
              let index = (col + i) + (row + j) * cols;
              // get neibor cells
              let neighbor = grid[index];
              // if it exists
              if(neighbor){
                // calc the distance between the sample and the neighbor cell
                let d = p5.Vector.dist(sample, neighbor);
                // if distance with in limit then neigbor is ok to check and you find the point
                if(d < r){
                  ok = false;
                }
              }
            }
          }
          // if neighbor cell is ok
          if(ok){
            // raise the found flag
            found = true;
            //add the sample to the background grid
            grid[col + row * cols] = sample;
            // add the sample to the active list
            active.push(sample);
            // add the sample to the ordered list
            ordered.push(sample);
            // exit loop
            break;
          }
        }
      }
      // if nothing is found shed that index from the active list
      if(!found){active.splice(randIndex, 1);}
      
    }
  }
  // display according to the order of check thus the poisson disc appe
  for(let i = 0; i < ordered.length; i++){
    if(ordered[i]){
      stroke(i%360, 100, 100);
      strokeWeight(r*0.5);
      point(ordered[i].x, ordered[i].y);
    }
  }
}

// Action