const WIDTH = 500;

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