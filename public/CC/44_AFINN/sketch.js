// globals
var afinn;

// Setup
function setup() {
  noCanvas();
  createPage();
  
  var txt = select('#txt');
  txt.input(typing);
  
  function typing(){
    let txtInput = txt.value();
    let words = txtInput.split(/\W/);
    let scoreWords = [];
    let totalScore = 0;
    for(let i = 0; i < words.length; i++){
      let word = words[i].toLowerCase();
      if(afinn.hasOwnProperty(word)){
        let score = afinn[word];
        totalScore += Number(score);
        scoreWords.push(word + ': ' + score + ' ');
      }
    }
    let scorePar = select('#scoreP');
    scorePar.html('score: ' + totalScore);
    let comp = select('#comparativeP');
    comp.html('comparative: ' + totalScore / words.length);
    let wordList = select('#wordlistP');
    wordList.html(scoreWords);
  }
}

// Action
function preload(){
  afinn= loadJSON('./public/CC/44_AFINN/afinn111.json');
}

function createPage(){
  // create Page
 let div = document.createElement("div");
 div.innerHTML = '<h1>AFINN Sentiment Analysis</h1>' +
                  '<p>Type here: <br /> <textarea id="txt" cols="50" rows="10"></textarea></p>' +
                  '<p id="scoreP"></p>' +
                  '<p id="comparativeP"></p>' +
                  '<p id="wordlistP"></p>';
  document.body.appendChild(div);
  document.body.style.flexDirection = "column";
}