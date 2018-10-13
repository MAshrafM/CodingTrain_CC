// globals
var txt;
var counts = {};
var keys = [];

// Setup
function setup() {
  noCanvas();
  createPage();
  let allwords = txt.join("\n");
  let tokens = allwords.split(/\W+/);
  for(let i = 0; i < tokens.length; i++){
    let word = tokens[i].toLowerCase();
    if(!/\d+/.test(word)){
      if(counts[word] === undefined){
        counts[word] = 1;
        keys.push(word);
      } else {
        counts[word] = counts[word] + 1;
      }
    }
  }
  
  keys.sort(compare);
  
  for(let i = 0; i < keys.length; i++){
    let key = keys[i];
    createDiv(key + " " + counts[key]);
  }
}
// Draw
function draw(){
  background(51);
}

// Action
function preload(){
  txt = loadStrings('./public/CC/37_DiasticMachine/rainbow.txt');
}

function compare(a, b){
  let countA = counts[a];
  let countB = counts[b];
  return countB - countA;
}

function createPage(){
  // create Page
  let div = document.createElement("div");
  div.innerHTML = '<h1>Word Counting</h1>';
  document.body.appendChild(div);
  document.body.style.flexDirection = "column";
}