const express = require('express')
const exphbs  = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const app = express()

let cc = require('./cc')

// middleware
app.set('port', (process.env.PORT || 3000))

const hbs = exphbs.create({
  helpers: {
    'ifActive': function(curr, chall, options){
      if(curr === chall){
        return options.fn(this);
      }
      return options.inverse(this);
    }
  },
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
})
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views/CC/'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/lib", express.static(__dirname + '/lib'))
app.use("/CC", express.static(__dirname + '/CC'))
app.use("/public/CC", express.static(__dirname + '/public/CC'))

// routes
/* ToDo Main Route for all challenges later */
// To Do

// Get Challenges
const cTable = cc.getChallenges().then(function(table){
  return table;
}).catch((err) => console.log(err));

// Build Challenges Routes
cTable.then(function(challenges){
  challenges.forEach(function (c, index) {
    let scripts = []
    let dirPath = path.join(__dirname, 'public/CC', `${c.id}_${c.title}`)
    fs.readdir(dirPath, function (err, files) {
      if (err) {
        return console.log('Unable to scan directory: ' + err);
      } 
      files.forEach(function (file) {
        if(path.extname(file) === '.js'){
          scripts.push({script: `${c.id}_${c.title}/${file}`})
        }
      })
    })
    app.get(`/cc${c.id}`, function(request, response) {
      response.render('index', {title: `${c.id} | ${c.title}`, scripts: scripts, challenges: challenges, nextC: getNext(index), prevC : getPrev(index), current: c.title})
    })
  })
  
  function getNext(i){
    let c = i  + 1;
    return c >= challenges.length ? '0' : challenges[c].id;
  }
  function getPrev(i){
    let c = i  - 1;
    return c <= 0 ? '0' : challenges[c].id;
  }
  console.log("Routes Built");
}).catch((err) => console.log(err));

// Listen
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})