class Tree{
  constructor(){
    this.root = null;
  }
  
  traverse(){
    this.root.visit(this.root);
  }
  
  search(val){
    let found = this.root.search(val);
    return found;
  }
  
  addValue(val){
    let n = new Node(val);
    if (this.root == null) {
      this.root = n;
      this.root.x = width / 2;
      this.root.y = 16;
    } else {
      this.root.addNode(n);
    }
  }
}