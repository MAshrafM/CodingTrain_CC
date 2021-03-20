class Frog extends Rectangle {
    constructor(x, y, size){
        super(x, y, size, size);  
    }

    show(){
        fill(0, 255, 0, 200);
        rect(this.x, this.y, this.w, this.h)
    }

}