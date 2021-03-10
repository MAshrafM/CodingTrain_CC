class Cell {
    constructor(i, j, w) {
        this.x = i;
        this.y = j;
        this.x = i * w;
        this.y = j * w;
        this.w = w;
        this.bee = true;
        this.revealed = false;
    }

    show(){
        stroke(0);
        noFill();
        rect(this.x, this.y, this.w, this.w);
        if(this.revealed){
            if(this.bee){
                stroke(0)
                fill(128);
                ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
            }
            else{
                fill(200);
                noStroke();
                rect(this.x, this.y, this.w, this.w);
            }
        }
    }

    contains(x, y){
        return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w)
    }

    reveal(){
        this.revealed = true;
    }
}

