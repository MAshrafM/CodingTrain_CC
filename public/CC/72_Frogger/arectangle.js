class Rectangle {
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    // Determine if two rectangles intersects with each other
    intersects(other){
        return !(
            this.x + this.w <= other.x              ||
            this.x          >= other.x + other.w    ||
            this.y + this.h <= other.y              ||
            this.y          >= other.y + other.h
        );
    }
    // Move Rectangle, update position
    move(x, y){
        this.x += x;
        this.y += y;
    }
    // show rectangle
    show(){
        rect(this.x, this.y, this.w, this.h);
    }
}