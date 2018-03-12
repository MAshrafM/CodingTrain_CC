const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('port', (process.env.PORT || 3000))
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/lib", express.static(__dirname + '/lib'));
app.use("/CC", express.static(__dirname + '/CC'));

app.get('/cc01', function(request, response) {
  response.sendFile('/CC/01_StarField/index.html', { root: __dirname })
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})