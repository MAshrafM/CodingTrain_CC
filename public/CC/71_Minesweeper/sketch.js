function makeGrid(cols, rows){
    let arr = new Array(cols);
    for(let i = 0; i < arr.length; i++){
        arr[i] = new Array(rows);
    }

    return arr;
}

const SCREEN = 400;
const w = 40;
const cols = SCREEN / w;
const rows = SCREEN / w;
const mines = 20;
let grid;

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

    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            grid[i][j].countNeighbors();
        }
    }

}

function mousePressed(){
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            if(grid[i][j].contains(mouseX, mouseY)){
                grid[i][j].reveal();
            }
        }
    }
}

function draw(){
    background(255);
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            grid[i][j].show();
        }
    }
}