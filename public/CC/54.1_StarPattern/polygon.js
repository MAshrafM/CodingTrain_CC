function Polygon(){
  this.vertices = [];
  this.edges = [];
  
  this.addVertex = (x, y) => {
    let a = createVector(x, y);
    let total = this.vertices.length;
    if(total > 0){
      let prev = this.vertices[total - 1];
      let edge = new Edge(prev, a);
      this.edges.push(edge);
    }
    this.vertices.push(a);
  }
  
  this.close = () => {
    let total = this.vertices.length;
    let last = this.vertices[total - 1];
    let first = this.vertices[0];
    let edge = new Edge(last, first);
    this.edges.push(edge);
  }
  
  this.hankin = () => {
    for(let i = 0; i < this.edges.length; i++){
      this.edges[i].hankin();
    }
    
    for(let i = 0; i < this.edges.length; i++){
      for(let j = 0; j < this.edges.length; j++){
        if(i !== j){this.edges[i].findEnds(this.edges[j]);}
      }
    }
  }
  
  this.show = () => {
    for(let i = 0; i < this.edges.length; i++){
      this.edges[i].show();
    }
  }
}