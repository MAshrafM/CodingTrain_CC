const express = require('express')
const exphbs  = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const app = express()

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

// Challenges
const challenges = [
                    {id: '01', title: 'StarField'},
                    {id: '02', title: 'SpongeFractal'},
                    {id: '03', title: 'Snake'},
                    {id: '04', title: 'ColorRain'},
                    {id: '05', title: 'SpaceInvaders'},
                    {id: '06', title: 'Mitosis'},
                    {id: '07', title: 'Solar2d'},
                    {id: '08', title: 'Solar3d'},
                    {id: '09', title: 'Solar3dTexture'},
                    {id: '10', title: 'MazeGen'},
                    {id: '11', title: 'PerlinNoise'},
                    {id: '12', title: 'LorenzAttractor'},
                    {id: '13', title: 'Diffusion'},
                    {id: '14', title: 'FractalRec'},
                    {id: '15', title: 'FractalOO'},
                    {id: '16', title: 'FractalL'},
                    {id: '17', title: 'FractalSC'},
                    {id: '18', title: 'Fractal3d'},
                    {id: '19', title: 'Superellipse'},
                    {id: '20', title: 'Cloth3d'},
                    {id: '21', title: 'Mandelbrot'},
                    {id: '22', title: 'JuliaSet'},
                    {id: '23', title: 'Supershape2d'},
                    {id: '24', title: 'PerlinNoiseFlowField'},
                    {id: '25', title: 'SphericalGeometry'},
                    {id: '26', title: 'Supershape3d'},
                    {id: '27', title: 'Fireworks'},
                    {id: '28', title: 'Metaballs'},
                    {id: '29', title: 'SmartRockets'},
                    {id: '30', title: 'Phyllotaxis'},
                    {id: '31', title: 'FlappyBird'},
                    {id: '32', title: 'Agario'},
                    {id: '33', title: 'DiffusionLA'},
                    {id: '34', title: 'PoissonDisc'},
                    {id: '35.1', title: 'TSP'},
                    {id: '35.2', title: 'TSPLexical'},
                    {id: '35.3', title: 'TSPwGA'},
                    {id: '36', title: 'Bloppy'},
                    {id: '37', title: 'DiasticMachine'},
                    {id: '38', title: 'WordInteractor'},
                    {id: '39', title: 'Madlibs'},
                    {id: '40.1', title: 'WordCounter'},
                    {id: '40.2', title: 'WordCounterTFidf'},
                    {id: '41', title: 'ClappyBird'},
                    {id: '42', title: 'MarkovChain'},
                    {id: '43', title: 'ContextFreeGrammer'},
                    {id: '44', title: 'AFINN'},
                    {id: '45', title: 'Draw'},
                    {id: '46', title: 'Asteroids'},
                    {id: '47', title: 'PixelSorting'},
                  ]

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

// Listen
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})