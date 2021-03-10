class Cell {
    constructor(i, j, w) {
        this.i = i;
        this.j = j;
        this.x = i * w;
        this.y = j * w;
        this.w = w;
        this.mine = false;
        this.revealed = false;
        this.neighborCount = 0;
    }

    show(){
        stroke(0);
        noFill();
        rect(this.x, this.y, this.w, this.w);
        if(this.revealed){
            if(this.mine){
                stroke(0)
                fill(128);
                ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
            }
            else{
                fill(200);
                stroke(0);
                rect(this.x, this.y, this.w, this.w);
                if(this.neighborCount > 0){
                    textAlign(CENTER);
                    fill(0)
                    text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 15);
                }
            }
        }
    }

    contains(x, y){
        return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w)
    }

    reveal(){
        this.revealed = true;
        if(this.neighborCount == 0){
            this.floodFill();
        }
    }

    countNeighbors(){
        if(this.mine){
            this.neighborCount = -1;
            return;
        }
        let total = 0;
        for(let i = -1; i <=1; i++){
            let idx = this.i + i;
            if(idx < 0 || idx >= cols) continue;
            for(let j = -1; j <=1; j++){     
                let jdx = this.j + j;
                if(jdx <0 || jdx >= rows) continue;
                let neighbor = grid[idx][jdx];
                if(neighbor.mine){
                    total++;
                }
            }
        }
        this.neighborCount = total;
    }

    floodFill(){
        for(let i = -1; i <=1; i++){
            let idx = this.i + i;
            if(idx < 0 || idx >= cols) continue;
            for(let j = -1; j <=1; j++){     
                let jdx = this.j + j;
                if(jdx <0 || jdx >= rows) continue;
                let neighbor = grid[idx][jdx];
                if(!neighbor.revealed){
                    neighbor.reveal();
                }
            }
        }
    }
}

