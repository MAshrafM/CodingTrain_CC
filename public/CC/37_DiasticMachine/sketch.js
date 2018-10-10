// globals
var srctxt;
var words;

// Setup
function setup() {
  noCanvas();
  createPage();
  srctxt = join(srctxt, ' ');
  words = splitTokens(srctxt, ' ,!.?');
  
  let seed = select("#seed");
  let submit = select("#submit");
  submit.mousePressed(function(){
    let phrase = diastic(seed.value(), words);
    createP(phrase);
  });
  
}
// Draw
function draw(){
  background(51);
}

// Action
function preload(){
  srctxt = loadStrings('./public/CC/37_DiasticMachine/rainbow.txt');
}

function diastic(seed, words){
  let phrase = "";
  let currWord = 0;
  
  for(let i = 0; i < seed.length; i++){
    let c = seed.charAt(i);
    
    for(let j = currWord; j < words.length; j++){
      if(words[j].charAt(i) == c){
        phrase += words[j];
        phrase += " ";
        currWord = j + 1;
        break;
      }
    }
  }
  return phrase;
}

function createPage(){
  // create Page
  let div = document.createElement("div");
  div.innerHTML = '<h1>Jackson Mac Low Diastic</h1>' +
                  '<p>Seed Word: <input id="seed" value="rainbow" /></p>' +
                  '<button id="submit">Submit</button>';
  document.body.appendChild(div);
  document.body.style.flexDirection = "column";
}