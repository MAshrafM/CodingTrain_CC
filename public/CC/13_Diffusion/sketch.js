// globals
var grid;
var next;

// math rate of diffusion
var dA = 1,
    dB = 0.5,
    feed = 0.055,
    k = 0.062;

// Constants
const SCREEN_SIZE = 400;

// Setup 
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  pixelDensity(1);
  // initialize reaction
  grid = [];
  next = [];
  
  for(let i = 0; i < SCREEN_SIZE; i++){
    grid[i] = [];
    next[i] = [];
    for(let j = 0; j < SCREEN_SIZE; j++){
      grid[i][j] = {
        a: 1,
        b: 0
      };
      next[i][j] = {
        a: 1,
        b: 0
      };
    }
  }
  // add the reacting agent
  for(let i = SCREEN_SIZE/2; i < SCREEN_SIZE/2 + 10; i++){
    for(let j = SCREEN_SIZE/2; j < SCREEN_SIZE/2+10; j++){
      grid[i][j].b = 1;
    }
  }
}

// Controls


// Draw
function draw() {
  background(51);
  
  for(let i = 1; i < SCREEN_SIZE - 1; i++){
    for(let j = 1; j < SCREEN_SIZE - 1; j++){
      let a = grid[i][j].a;
      let b = grid[i][j].b;
      // apply laplace diffusion function
      next[i][j].a = a + 
                    (dA * laplaceA(i,j)) - 
                    (a * b * b) + 
                    (feed * (1 - a));
      next[i][j].b = b + 
                    (dB * laplaceB(i,j)) + 
                    (a * b * b) - 
                    ((k + feed) * b);
      
      next[i][j].a = constrain(next[i][j].a, 0, 1);
      next[i][j].b = constrain(next[i][j].b, 0, 1);
    }
  }
  
  // load pixels on the screen
  loadPixels();
  
  for(let i = 0; i < SCREEN_SIZE; i++){
    for(let j = 0; j < SCREEN_SIZE; j++){
      let p = (i + j * SCREEN_SIZE) * 4;
      let a = next[i][j].a;
      let b = next[i][j].b;
      let c = floor((a - b) * 255);
      c = constrain(c, 0, 255);
      pixels[p + 0] = c;
      pixels[p + 1] = c;
      pixels[p + 2] = c;
      pixels[p + 3] = 255;
    }
  }
  updatePixels();
  // swap current with next
  swap();
}

function laplaceA(x, y){
  let sumA = 0;
  sumA += grid[x][y].a * -1;
  sumA += grid[x - 1][y].a * 0.2;
  sumA += grid[x + 1][y].a * 0.2;
  sumA += grid[x][y + 1].a * 0.2;
  sumA += grid[x][y - 1].a * 0.2;
  sumA += grid[x - 1][y - 1].a * 0.05;
  sumA += grid[x + 1][y - 1].a * 0.05;
  sumA += grid[x + 1][y + 1].a * 0.05;
  sumA += grid[x - 1][y + 1].a * 0.05;
  return sumA;
}

function laplaceB(x, y){
  let sumB = 0;
  sumB += grid[x][y].b * -1;
  sumB += grid[x - 1][y].b * 0.2;
  sumB += grid[x + 1][y].b * 0.2;
  sumB += grid[x][y + 1].b * 0.2;
  sumB += grid[x][y - 1].b * 0.2;
  sumB += grid[x - 1][y - 1].b * 0.05;
  sumB += grid[x + 1][y - 1].b * 0.05;
  sumB += grid[x + 1][y + 1].b * 0.05;
  sumB += grid[x - 1][y + 1].b * 0.05;
  return sumB;
}

function swap() {
  let temp = grid;
  grid = next;
  next = temp;
}







