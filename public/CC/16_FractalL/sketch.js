// globals
var angle,
    axiom = "F",
    sentence = axiom,
    len = 120;
/******************************/
// variables A, B
// axiom: A
// rules: (A -> AB), (B -> A)
/******************************/
var rules = [];
rules[0] = {
  a: "F",
  b: "FF+[+F-F-F]-[-F+F+F]"
}

// constant
const SCREEN_SIZE = 450;

// Setup
function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  angle = radians(25);
  background(51);
  turtle();
  //control
  var btn = createButton("generate");
  btn.mousePressed(generate);
}
// Draw
// Action

function generate(){
  len *= 0.5;
  let nextSentence = "";
  for(let i = 0; i < sentence.length; i++){
    let curr = sentence.charAt(i);
    let found = false;
    for(let j = 0; j < rules.length; j++){
      if(curr == rules[j].a){
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if(!found){
      nextSentence += curr;
    }
  }
  
  sentence = nextSentence;
  turtle();
}

function turtle(){
  background(51);
  resetMatrix();
  translate(SCREEN_SIZE/2, SCREEN_SIZE);
  stroke(255, 100);
  for(let i = 0; i < sentence.length; i++){
    let curr = sentence.charAt(i);
    
    if(curr == "F"){
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (curr == "+"){
      rotate(angle);
    } else if (curr == "-"){
      rotate(-angle);
    } else if (curr == "["){
      push();
    } else if (curr == "]"){
      pop();
    }
  }
}