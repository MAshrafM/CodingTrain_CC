/* globals */
const SCREEN = 400;
const w = 40;
const cols = SCREEN / w;
const rows = SCREEN / w;
const mines = 20;
let grid;

/* make the grid */
function makeGrid(cols, rows){
    let arr = new Array(cols);
    for(let i = 0; i < arr.length; i++){
        arr[i] = new Array(rows);
    }

    return arr;
}

/*
    P5 Setup
    - make the grid
    - add the mines
    - count neighbors squares
*/
function setup(){
    createCanvas(SCREEN, SCREEN);
    grid = makeGrid(cols, rows);
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            grid[i][j] = new Cell(i, j, w);
        }
    }

    // add mines
    let options = [];
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            options.push([i, j]);
        }
    }

    for(let m = 0; m < mines; m++){
        let idx = Math.floor(random(options.length));
        let choice = options[idx];
        let x = choice[0],
            y = choice[1];
        options.splice(idx, 1);
        grid[x][y].mine = true;
    }

    // count squares
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            grid[i][j].countNeighbors();
        }
    }

}

// game over reveal everything
function gameOver(){
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            grid[i][j].revealed = true;
        }
    }
}

// mouse press functionality
function mousePressed(){
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            if(grid[i][j].contains(mouseX, mouseY)){
                grid[i][j].reveal();

                if(grid[i][j].mine){
                    gameOver();
                }
            }
        }
    }
}

// draw grid
function draw(){
    background(255);
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            grid[i][j].show();
        }
    }
}