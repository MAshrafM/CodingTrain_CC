// globals
var data;
var txt = '$$Exclamation$$! they said $$Adverb$$ as they jumped into their $$Noun$$ and flew off with their $$Adjective$$ $$PluralNoun$$.';

// Setup
function setup() {
  noCanvas();
  createPage();
  Tabletop.init({
    key: '15WyEmfu6B1UCzzqeacYnzI8lutrxF6uWvFDiSteBqTs',
    callback: goData,
    simpleSheet: true
  });
  
  const btn = createButton('Generate Madlib');
  btn.mousePressed(generate);
}
// Draw


// Action
function replacer(math, pos){
  let entry = random(data);
  return entry[pos];
}

function generate(){
  let madlib = txt.replace(/\$\$(.*?)\$\$/g, replacer);
  createP(madlib);
}

function goData(stuff, tabletop){
  data = stuff;
}

function createPage(){
  // create Page
  let div = document.createElement("div");
  div.innerHTML = '<h1>Mad Libs</h1>' +
                  '<p>_____________! they said ________ as they jumped into their _____________ and flew off with their __________ __________.</p>';
                                   
  document.body.appendChild(div);
  document.body.style.flexDirection = "column";
  document.body.style.position = "relative";
  document.body.style.left = "5%";
}