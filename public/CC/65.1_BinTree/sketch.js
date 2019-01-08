// globals
let tree;

// Setup
function setup() {
  noCanvas();
  tree = new Tree();
  for(let i = 0; i < 10; i++){
    tree.addValue(floor(random(0, 10)));
  }
  console.log(tree);
  tree.traverse();
  let result = tree.search(10);
  if(result == null){
    console.log("not found");
  } else {
    console.log(result);
  }
  
}
// Draw

// Action