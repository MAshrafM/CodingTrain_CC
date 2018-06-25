function Blast(x, y) {
  this.x = x;
  this.y = y;
  this.r = 10;
  this.gone = false;
  // methods
  this.show = () => {
    noStroke();
    fill(0, 191, 255);
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }
  // motion function
  this.move = () => this.y = this.y - 5;
  // check intersection
  this.hits = (rock) => {
    let d = dist(this.x, this.y, rock.x, rock.y);
    return d < this.r + rock.r ? true : false;
  }
  // remove blasts
  this.out = () => this.gone = true;
}