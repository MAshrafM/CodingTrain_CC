const WIDTH = 500;
const GSIZE = 50;
let frog;
let rows = [];

function resetGame(){
    frog = new Frog(WIDTH / 2, WIDTH - GSIZE, GSIZE);
}

function setup(){
    rows = [
        new Row(        0, 1,    0,         WIDTH,   0,   0, true),
        new Row(    GSIZE, 1,    0,         WIDTH,   0,   0, true),
        new Row(2 * GSIZE, 2,  0.5,     4 * GSIZE, 400,  10, true),
        new Row(3 * GSIZE, 3, -1.3,     2 * GSIZE, 200,  30, true),
        new Row(4 * GSIZE, 2,  2.3,     3 * GSIZE, 250,  25, true),
        new Row(5 * GSIZE, 1,    0,         WIDTH,   0,   0, true),
        new Row(6 * GSIZE, 3,  1.2,     1 * GSIZE, 150, 100, false),
        new Row(7 * GSIZE, 2, -3.5,     1 * GSIZE, 200, 150, false),
        new Row(8 * GSIZE, 2,    2,     2 * GSIZE, 300,   0, false),
        new Row(9 * GSIZE, 2,    0,         WIDTH,   0,   0, true), 
    ]
    createCanvas(WIDTH, rows.length * GSIZE);
    resetGame();
}

function draw(){
    background(0);
    fill(255, 100);
    let intersects = null;

    for(let row of rows){
        row.show();
        row.update();
        if(frog.intersects(row)){
            intersects = row.hits(frog);
            if((intersects !== null) ^ row.inverted){
                resetGame();
            }
        }
    }

    frog.attach(intersects);
    frog.update();
    frog.show();
}

function keyPressed(){
    if(keyCode === UP_ARROW){
        frog.move(0, -GSIZE);
    } else if(keyCode === DOWN_ARROW) {
        frog.move(0, GSIZE);
    } else if(keyCode === LEFT_ARROW){
        frog.move(-GSIZE, 0);
    } else if(keyCode === RIGHT_ARROW){
        frog.move(GSIZE, 0);
    }
}