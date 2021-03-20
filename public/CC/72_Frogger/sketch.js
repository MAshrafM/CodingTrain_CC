const WIDTH = 500;
const GSIZE = 50;
let frog;

function setup(){
    createCanvas(WIDTH, WIDTH);
    frog = new Frog(100, 100, 50);
}

function draw(){
    background(0);
    fill(255, 100);
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