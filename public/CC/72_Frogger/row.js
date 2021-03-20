class Row extends Rectangle{
    constructor(y, count, speed, obs_width, spacing, offset, inverted){
        super(0, y, WIDTH, GSIZE);
        this.obstacles = [];
        this.inverted = inverted;
        for(let i = 0; i < count; i++){
            let x = i * spacing + offset;
            this.obstacles.push(new Obstacle(x, y, obs_width, GSIZE, speed));
        }
    }

    show(){
        for(let o of this.obstacles){
            o.show();
        }
    }

    update(){
        for(let o of this.obstacles){
            o.update();
        }
    }

    hits(collider){
        let obstacle = null;
        for(let o of this.obstacles){
            if(collider.intersects(o)){
                obstacle = o;
            }
        }

        return obstacle;
    }
}