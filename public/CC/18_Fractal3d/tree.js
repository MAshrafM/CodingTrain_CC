function Tree(){
  this.leaves = [];
  this.branches = [];
  // add leaves 
  for(let i = 0; i < 500; i++){
    this.leaves.push(new Leaf());
  }
  // Object vars
  let pos = createVector(0, SCREEN_SIZE / 2);
  let dir = createVector(0, -1);
  let root = new Branch(null, pos, dir);
  this.branches.push(root);
  let curr = new Branch(root, pos, dir);
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
      let closestDir = null;
      let record = -1;
      
      for(let j = 0; j < this.branches.length; j++){
        let branch = this.branches[j];
        let dd = p5.Vector.sub(leaf.pos, branch.pos);
        let d = dd.mag();
        if(d < min_dist){
          leaf.reached = true;
          closestBranch = null;
          break;
        } else if(d > max_dist) {
        } else if (closestBranch == null || d < record) {
          closestBranch = branch;
          closestDir = dd;
          record = d;
        }
      }
      if(closestBranch != null){
        closestDir.normalize();
        closestBranch.dir.add(closestDir);
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
        let rand = createVector(p5.Vector.random2D());
        rand.setMag(0.3);
        branch.dir.add(rand);
        branch.dir.normalize();
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