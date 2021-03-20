class Frog extends Rectangle {
    constructor(x, y, size){
        super(x, y, size, size);  
        this.sitting_on = null;
    }

    attach(other){
        this.sitting_on = other;
    }

    update(){
        if(this.sitting_on !== null){
            this.x += this.sitting_on.speed;
        }
        this.x = constrain(this.x, 0, WIDTH - this.w);
    }

    show(){
        fill(0, 255, 0, 200);
        rect(this.x, this.y, this.w, this.h)
    }

}