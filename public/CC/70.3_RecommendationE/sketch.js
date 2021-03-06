let data, users, resultP, resultDivs;

function preload() {
  data = loadJSON('./public/CC/70.3_RecommendationE/movies.json');
}

function setup() {
  noCanvas();
  users = {};
  resultDivs = [];
  let choice = createDiv('');
  choice.id("ratings")
  let titles = data.titles;
  let dropdowns = [];

  for(let title of titles){
    let div = createDiv(title);
    div.class('drops')
    choice.child(div);
    let dropdown = createSelect('');
    dropdown.title = title;
    dropdown.option('not seen');
    dropdown.parent(div);
    dropdowns.push(dropdown);
    for(let star = 1; star < 6; star++){
      dropdown.option(star);
    }
  }
  
  let button = createButton('submit');
  button.mousePressed(() => {
    let newUser = {};
    for(let dropdown of dropdowns){
      let title = dropdown.title;
      let rating = dropdown.value();
      if(rating == 'not seen'){
        rating = null;
      }
      newUser[title] = rating;
    }
    findNearestNeighbors(newUser)
  });
  resultP = createP('');
/*
  function predictRatings(){
    
  }
*/
  function findNearestNeighbors(userM){
    for(let div of resultDivs){
      div.remove();
    }
    resultDivs = [];
    let simScores = {};
    for(let user of data.users){
      let similarity = euclideanDistance(userM, user);
      simScores[user.name] = similarity;
    }

    data.users.sort((a, b) => {
      let score1 = simScores[a.name];
      let score2 = simScores[b.name];
      return score2 - score1;
    });
    
    let results = createDiv('');
    results.id('results');

    for(let title of data.titles){
      if(userM.title == null){
        let k = 5;
        let weightedSum = 0;
        let simSum = 0;
        for(let i = 0; i < k; i++){
          let name = data.users[i].name;
          let sim = simScores[name];
          let ratings = data.users[i];
          let rating = ratings[title];
          if(rating != null){
            weightedSum += rating * sim;
            simSum += sim;
          }
        }

        let stars = nf(weightedSum / simSum, 1, 2);
        let div = createDiv(title + ': ' + stars);
        resultDivs.push(div);
        results.child(div);
        resultP.parent(div)
      }
    }
  }

  function euclideanDistance(ratings1, ratings2) {
    let titles = data.titles;

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
  }
}