var express = require('express')
var session = require('express-session')
var app = express()
var bodyParser = require('body-parser')
var os = require('os')
var MongoClient = require('mongodb').MongoClient, assert = require('assert')
var routes = require('./api/routes.js')

app.use(express.static(__dirname))
app.use('/dist', express.static(__dirname + '/dist'))
app.use('/node_modules', express.static(__dirname + '/node_modules'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  'extended': true
}))
app.use('/api', routes)
app.use(session({
  cookieName: 'uuid',
  secret: '3te1ler4nn3tR4nd0M',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  resave: true,
  saveUninitialized: true,
  ephemeral: true
}))

app.get('/id', function (req, res) {
  res.end(req.session.uuid)
})
app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
})

// Start the server. But first check if it is online. Else we want to run a devserver at port 3000.
// If we had the possibility to change the nginx og apache config, then we could have used the
// same port.
if (os.hostname() !== 'it2810-04') {
  app.listen(3000, function () {
    console.log('Artsdata app listening on port 3000')
  })
} else {
  app.listen(80)
}
