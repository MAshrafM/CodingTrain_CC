class Puck{
  constructor(){
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.r = 12;
    this.reset();
  }
  
  checkPaddleLeft(p){
    if(this.y - this.r < p.y + p.h/2 && this.y + this.r > p.y - p.h/2 && this.x - this.r < p.x + p.w/2){
      if(this.x > p.x){
        let diff = this.y - (p.y - p.h/2);
        let rad = radians(45);
        let angle = map(diff, 0, p.h, -rad, rad);
        this.xSpeed = 5 * cos(angle);
        this.ySpeed = 5 * sin(angle);
        this.x = p.x + p.w/2 + this.r;
      }
    }
  }
  
  checkPaddleRight(p){
    if(this.y - this.r < p.y + p.h/2 && this.y + this.r > p.y - p.h/2 && this.x + this.r > p.x - p.w/2){
      if(this.x < p.x){
        let diff = this.y - (p.y - p.h/2);
        let angle = map(diff, 0, p.h, radians(225), radians(135));
        this.xSpeed = 5 * cos(angle);
        this.ySpeed = 5 * sin(angle);
        this.x = p.x - p.w/2 - this.r;
      }
    }
  }
  
  update(){
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  
  reset(){
    this.x = width / 2;
    this.y = height / 2;
    let angle = random(-PI/4, PI/4);
    this.xSpeed = 5 * cos(angle);
    this.ySpeed = 5 * sin(angle);
    
    if(random(1) < 0.5){
      this.xSpeed *= -1;
    }
  }
  
  edges(){
    if(this.y < 0 || this.y > height){
      this.ySpeed *= -1;
    }
    
    if(this.x - this.r > width){
      ding.play();
      leftScore++;
      this.reset();
    }
    
    if(this.x + this.r < 0){
      ding.play();
      rightScore++;
      this.reset();
    }
  }
  
  show(){
    fill(255);
    ellipse(this.x, this.y, this.r * 2);
  }
}