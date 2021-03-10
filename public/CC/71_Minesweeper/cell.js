class Cell {
    constructor(i, j, w) {
        this.x = i;
        this.y = j;
        this.x = i * w;
        this.y = j * w;
        this.w = w;
        this.bee = true;
        this.revealed = true;
    }

    show(){
        rect(this.x, this.y, this.w, this.w);
    }
}

