let data,resultP, resultDivs, users;

function preload() {
  data = loadJSON('./public/CC/70.1_SimScore/movies.json');
}

function setup() {
  noCanvas();
  
  users = {};
  resultDivs = [];
  let dropdown1 = createSelect('');
  
  for (let user of data.users) {
    let name = user.name;
    dropdown1.option(name);
    users[name] = user;
  }

  let button = createButton('submit');
  button.mousePressed(findNearestNeighbors);

  resultP = createP('');

  function findNearestNeighbors(){
    for(let div of resultDivs){
      div.remove();
    }
    resultDivs = [];
    let name = dropdown1.value();
    let simScores = {};
    for(let user of data.users){
      if(user.name != name){
        let similarity = euclideanDistance(name, user.name);
        simScores[user.name] = similarity;
      } else {
        simScores[user.name] = -1;
      }
    }

    data.users.sort(compareSimilarity);
    function compareSimilarity(a, b){
      let score1 = simScores[a.name];
      let score2 = simScores[b.name];
      return score2 - score1;
    }

    let k = 5;
    for(let i = 0; i < k; i++){
      let name = data.users[i].name;
      let div = createDiv(name + ': ' + simScores[name])
      resultDivs.push(div);
      resultP.parent(div)
    }

  }

  function euclideanDistance(name1, name2) {
    let ratings1 = users[name1];
    let ratings2 = users[name2];
    let titles = Object.keys(ratings1);
    let i = titles.indexOf('name');
    titles.splice(i, 1);
    let j = titles.indexOf('timestamp');
    titles.splice(j, 1);


    let sumSquares = 0;
    for (let title of titles) {
      let rating1 = ratings1[title];
      let rating2 = ratings2[title];
      if (rating1 != null && rating2 != null) {
        let diff = rating1 - rating2;
        sumSquares += diff * diff;
      }
    }
    let d = sqrt(sumSquares);
    let similarity = 1 / (1 + d);
    return similarity;
    //resultP.html(similarity);
  }
}