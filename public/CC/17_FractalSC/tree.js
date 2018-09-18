function Tree(){
  this.leaves = [];
  this.branches = [];
  // add leaves 
  for(let i = 0; i < 1500; i++){
    this.leaves.push(new Leaf());
  }
  // Object vars
  let pos = createVector(SCREEN_SIZE / 2, SCREEN_SIZE);
  let dir = createVector(0, -1);
  let root = new Branch(null, pos, dir);
  this.branches.push(root);
  let curr = root;
  let found = false;
  // branches
  while(!found){
    for(let i = 0; i < this.leaves.length; i++){
      // distance between branch and leaf
      // if distance less than max distance defined found the branch
      // if not found move to the next branch
      let d = p5.Vector.dist(curr.pos, this.leaves[i].pos);
      if(d < max_dist){
        found = true;
      }
    }
    if(!found){
      let branch = curr.next();
      curr = branch;
      this.branches.push(curr);
    }
  }
  
  // grow function
  // grow both branches and leaves
  // find the closest branch in the tree
  // attach leaves to closest branches 
  this.grow = function() {
    for(let i = 0; i < this.leaves.length; i++){
      let leaf = this.leaves[i];
      let closestBranch = null;
      let record = max_dist;
      for(let j = 0; j < this.branches.length; j++){
        let branch = this.branches[j];
        let d = p5.Vector.dist(leaf.pos, branch.pos);
        if(d < min_dist){
          leaf.reached = true;
          closestBranch = null;
          break;
        } else if(d < record) {
          closestBranch = branch;
          record = d;
        }
      }
      if(closestBranch != null){
        let newDir = p5.Vector.sub(leaf.pos, closestBranch.pos);
        newDir.normalize();
        closestBranch.dir.add(newDir);
        closestBranch.count++;
      }
    }
    // delete leaves that is too close to min distance defined
    for(let i = this.leaves.length - 1; i >= 0; i--){
      if(this.leaves[i].reached){
        this.leaves.splice(i, 1);
      }
    }
    // add branch to a branch with leaves
    // average them to not over populate
    for(let i = this.branches.length - 1; i >= 0; i--){
      let branch = this.branches[i];
      if(branch.count > 0){
        branch.dir.div(branch.count + 1);
        this.branches.push(branch.next());
        branch.reset();
      }
    }
  }
  
  // show leaves and branches
  this.show = function(){
    for(let i = 0; i < this.leaves.length; i++){
      this.leaves[i].show();
    }
    
    for(let i = 0; i < this.branches.length; i++){
      this.branches[i].show();
    }
  }
  
  
}