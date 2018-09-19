const express = require('express')
const exphbs  = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const app = express()

// middleware
app.set('port', (process.env.PORT || 3000))
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views/CC/'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/lib", express.static(__dirname + '/lib'))
app.use("/CC", express.static(__dirname + '/CC'))
app.use("/public/CC", express.static(__dirname + '/public/CC'))

// routes
/* ToDo Main Route for all challenges later */
// To Do

// Challenges
const challenges = {
                    '01' : 'StarField',
                    '02' : 'SpongeFractal',
                    '03' : 'Snake',
                    '04' : 'ColorRain',
                    '05' : 'SpaceInvaders',
                    '06' : 'Mitosis',
                    '07' : 'Solar2d',
                    '08' : 'Solar3d',
                    '09' : 'Solar3dTexture',
                    '10' : 'MazeGen',
                    '11' : 'PerlinNoise',
                    '12' : 'LorenzAttractor',
                    '13' : 'Diffusion',
                    '14' : 'FractalRec',
                    '15' : 'FractalOO',
                    '16' : 'FractalL',
                    '17' : 'FractalSC',
                    '18' : 'Fractal3d',
                    '19' : 'Superellipse',
                  }

Object.keys(challenges).forEach(function (c) {
  let scripts = []
  let dirPath = path.join(__dirname, 'public/CC', `${c}_${challenges[c]}`)
  fs.readdir(dirPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(function (file) {
      scripts.push({script: `${c}_${challenges[c]}/${file}`})
    })
  })
  app.get(`/cc${c}`, function(request, response) {
    response.render('index', {title: `${c} | ${challenges[c]}`, scripts: scripts})
  })
})

// Listen
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})