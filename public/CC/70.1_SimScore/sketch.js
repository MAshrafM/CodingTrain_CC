let data,resultP;

function preload() {
  data = loadJSON('./public/CC/70.1_SimScore/movies.json');
}

function setup() {
  noCanvas();
  
  let users = {};
  let dropdown1 = createSelect('');
  let dropdown2 = createSelect('');
  
  for (let user of data.users) {
    let name = user.name;
    dropdown1.option(name);
    dropdown2.option(name);
    users[name] = user;
  }

  let button = createButton('submit');
  button.mousePressed(euclideanSimilarity);

  resultP = createP('');

  function euclideanSimilarity() {
    let name1 = dropdown1.value();
    let name2 = dropdown2.value();

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
    resultP.html(similarity);
  }
}