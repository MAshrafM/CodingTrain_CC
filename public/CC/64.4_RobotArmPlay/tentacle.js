class Tentacle{
  constructor(x, y){
    this.base = new p5.Vector(x, y);
    this.len = 50;
    this.segments = new Array(5);
    let point = new p5.Vector(300, 200);
    this.segments[0] = new Segment(point, this.len, 0);
    for(let i = 1; i < this.segments.length; i++){
      this.segments[i] = new Segment(this.segments[i-1], this.len, i);
    }
  }
  
  update(){
    let total = this.segments.length;
    let end = this.segments[total-1];
    end.follow(pos.x, pos.y);
    end.update();
    
    for(let i = total - 2; i >= 0; i--){
      this.segments[i].follow(this.segments[i+1]);
      this.segments[i].update();
    }
    
    this.segments[0].setA(this.base);
    
    for(let i = 1; i < total; i++){
      this.segments[i].setA(this.segments[i-1].b);
    }
  }
  
  show(){
    for(let s of this.segments){
      s.show();
    }
  }
}