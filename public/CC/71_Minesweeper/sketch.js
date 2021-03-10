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
let grid;

function setup(){
    createCanvas(SCREEN, SCREEN);
    grid = makeGrid(cols, rows);
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            grid[i][j] = new Cell(i, j, w);
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