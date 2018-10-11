// globals
var textField;
var output;
var submit;

// Setup
function setup() {
  noCanvas();
  createPage();
  textField = select("#input");
  output = select("#output");
  submit = select("#submit");
  submit.mousePressed(newText);
}
// Draw
function draw(){
  background(51);
}

// Action
function highlight(){
  this.html('rainbow');
  let c = color(random(255), random(255), random(255));
  this.style('background-color', c);
}

function newText(){
  let s = textField.value();
  let words = s.split(/(\W+)/);
  for(let i = 0; i < words.length; i++){
    let span = createSpan(words[i]);
    span.parent(output);
    
    if(!/\W+/.test(words[i])){
      span.mouseOver(highlight);
    }
  }
}

function createPage(){
  // create Page
  let div = document.createElement("div");
  div.innerHTML = '<h1>Word Interactor</h1>' +
                  '<p>Input Text: <textarea id="input" rows="5" cols="50" /></textarea></p>' +
                  '<p id="output" style="width:600px;"></p>' +
                  '<button id="submit">Submit</button>';
  document.body.appendChild(div);
  document.body.style.flexDirection = "column";
}