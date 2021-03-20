class Obstacle extends Rectangle{
    constructor(x, y, w, h, s){
        super(x, y, w, h);
        this.speed = s;
    }

    update(){
        this.move(this.speed, 0);
        if(this.x > WIDTH + GSIZE){
            this.x = -this.w - GSIZE;
        }

        if(this.x < -this.w - GSIZE){
            this.x = WIDTH + GSIZE;
        }
    }

    show(){
        fill(200);
        rect(this.x, this.y, this.w, this.h);
    }
}