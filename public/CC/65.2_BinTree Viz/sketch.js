// globals
let tree;

// constant
const SIZE = 400;
// Setup
function setup() {
  createCanvas(SIZE * 1.5, SIZE);
  background(51);
  
  tree = new Tree();
  for(let i = 0; i < 100; i++){
    tree.addValue(floor(random(0, 100)));
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