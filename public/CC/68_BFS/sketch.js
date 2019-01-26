// globals
let data, graph, dropdown;

// constant

function preload(){
  data = loadJSON('./public/CC/68_BFS/data.json');
}
// Setup
function setup() {
  noCanvas();
  graph = new Graph();
  dropdown = createSelect();
  dropdown.changed(BFS);
  
  let movies = data.movies;
  
  for(let m of movies){
    let movie = m.title;
    let cast = m.cast;
    let movieNode = new Node(movie);
    graph.addNode(movieNode);
    
    for(let actor of cast){
      let actorNode = graph.getNode(actor);
      if(actorNode == undefined){
        actorNode = new Node(actor);
        dropdown.option(actor);
      }
      
      graph.addNode(actorNode);
      movieNode.addEdge(actorNode);
    }
  }
}

// Action
function BFS(){
  graph.reset();
  let start = graph.setStart(dropdown.value());
  let end = graph.setEnd("Kevin Bacon");
  let queue = [];
  
  start.searched = true;
  queue.push(start);
  
  while (queue.length > 0) {
    let current = queue.shift();
    if (current == end) {
      break;
    }
    let edges = current.edges;
    for(let neighbor of edges) {
      if (!neighbor.searched) {
        neighbor.searched = true;
        neighbor.parent = current;
        queue.push(neighbor);
      }
    }
  }
  
  let path = [];
  path.push(end);
  let next = end.parent;
  while (next != null) {
    path.push(next);
    next = next.parent;
  }

  let txt = '';
  for (let i = path.length - 1; i >= 0; i--) {
    let n = path[i];
    txt += n.value
    if (i != 0) {
      txt += ' --> '
    };
  }
  createP(txt);
}