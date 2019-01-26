class Graph{
  constructor(){
    this.nodes = [];
    this.graph = {};
    this.end = null;
    this.start = null;
  }
  
  reset(){
    for (let n of this.nodes) {
      n.searched = false;
      n.parent = null;
    }
  }
  
  setStart(actor){
    this.start = this.graph[actor];
    return this.start;
  }
  
  setEnd(actor){
    this.end = this.graph[actor];
    return this.end;
  }
  
  addNode(n){
    this.nodes.push(n);
    let title = n.value;
    this.graph[title] = n;
  }
  
  getNode(actor){
    return this.graph[actor];
  }
}