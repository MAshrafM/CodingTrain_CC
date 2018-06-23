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

// Challenges
const challenges = {
                    '01' : 'StarField',
                    '02' : 'SpongeFractal',
                    '03' : 'Snake'
                  }
Object.keys(challenges).forEach(function (c) {
  app.get(`/cc${c}`, function(request, response) {
    response.sendFile(`/CC/${c}_${challenges[c]}/index.html`, { root: __dirname })
  })
})

// Listen
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})