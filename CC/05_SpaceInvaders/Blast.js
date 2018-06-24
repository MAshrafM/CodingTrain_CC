function Blast(x, y) {
  this.x = x;
  this.y = y;
  this.r = 10;
  this.gone = false;
  
  this.show = () => {
    noStroke();
    fill(0, 191, 255);
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }
  
  this.move = () => {
    this.y = this.y - 5;
  }
  
  this.hits = (rock) => {
    let d = dist(this.x, this.y, rock.x, rock.y);
    return d < this.r + rock.r ? true : false;
  }
  
  this.out = () => this.gone = true;
}