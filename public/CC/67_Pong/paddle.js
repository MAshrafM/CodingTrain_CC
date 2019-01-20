class Paddle{
  constructor(isLeft){
    this.y = height / 2;
    this.w = 20;
    this.h = 100;
    this.yChange = 0;
    
    if(isLeft){
      this.x = this.w;
    } else {
      this.x = width - this.w;
    }
  }
  
  update(){
    this.y += this.yChange;
    this.y = constrain(this.y, this.h / 2, height - this.h / 2);
  }
  
  move(steps){
    this.yChange = steps;
  }
  
  show(){
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }
}