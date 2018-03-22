const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// middleware
app.set('port', (process.env.PORT || 3000))
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/lib", express.static(__dirname + '/lib'));
app.use("/CC", express.static(__dirname + '/CC'));

// routes
/* ToDo Main Route for all challenges later */
// To Do

// Challenge 01
app.get('/cc01', function(request, response) {
  response.sendFile('/CC/01_StarField/index.html', { root: __dirname })
})
// Challenge 02
app.get('/cc02', function(request, response) {
  response.sendFile('/CC/02_SpongeFractal/index.html', { root: __dirname })
})
// Challenge 03
app.get('/cc03', function(request, response) {
  response.sendFile('/CC/03_Snake/index.html', { root: __dirname })
})

// Listen
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})