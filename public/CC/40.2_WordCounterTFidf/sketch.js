// globals
var txt = [];
var counts = {};
var keys = [];
var allwords = [];

var files = ['sports.txt', 'eclipse.txt', 'tree.txt', 'fish.txt'];

// Setup
function setup() {
  noCanvas();
  createPage();
  // join text data
  for(let i = 0; i < txt.length; i++){
    allwords[i] = txt.join("\n");
  } 
  let tokens = allwords[0].split(/\W+/);
  // set term frequency and doc frequency for every words
  // in the intended doc.
  for(let i = 0; i < tokens.length; i++){
    let word = tokens[i].toLowerCase();
    if(counts[word] === undefined){
      counts[word] = {
        tf: 1,
        df: 1
      };
      keys.push(word);
    } else {
      counts[word].tf = counts[word].tf + 1;
    }
  }
  
  // counts for other documents in the data set
  let othercounts = [];
  for(let j = 1; j < allwords.length; j++){
    let tempcounts = {};
    let tokens = allwords[j].split(/\W+/);
    for(let k = 0; k < tokens.length; k++){
      let w = tokens[k].toLowerCase();
      if(tempcounts[w] === undefined){
        tempcounts[w] = true;
      }
    }
    othercounts.push(tempcounts);
  }
  // check doc frequnecy for words
  for(let i = 0; i < keys.length; i++){
    let word = keys[i];
    for(let j = 0; j < othercounts.length; j++){
      let tempcounts = othercounts[j];
      if(tempcounts[word]){
        counts[word].df++;
      }
    }
  }
  // take log scale of term freq according to Algorithm
  for(let i = 0; i < keys.length; i++){
    let word = keys[i];
    let wordobj = counts[word];
    wordobj.tfidf = wordobj.tf * log(files.length / wordobj.df);
  }
  // sort keys
  keys.sort(compare);
  // display results
  for(let i = 0; i < keys.length; i++){
    let key = keys[i];
    createDiv(key + " " + counts[key].tfidf);
  }
}
// Draw
function draw(){
  background(51);
}

// Action
function preload(){ 
  for(let i = 0; i < files.length; i++){
    txt[i] = loadStrings('./public/CC/40.2_WordCounterTFidf/' + files[i]);
  }
  txt[files.length] = loadStrings('./public/CC/37_DiasticMachine/rainbow.txt');
}

function compare(a, b){
  let countA = counts[a].tfidf;
  let countB = counts[b].tfidf;
  return countA - countB;
}

function createPage(){
  // create Page
  let div = document.createElement("div");
  div.innerHTML = '<h1>Word Counting - TF/IDF</h1>';
  document.body.appendChild(div);
  document.body.style.flexDirection = "column";
}