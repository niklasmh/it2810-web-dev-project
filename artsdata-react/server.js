var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var os = require('os')
var io = require('socket.io')
var MongoClient = require('mongodb').MongoClient, assert = require('assert')

app.use(express.static(__dirname))
app.use('/dist', express.static(__dirname + '/dist'))
app.use('/node_modules', express.static(__dirname + '/node_modules'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  'extended': true
}))

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
})

// API routes
var router = express.Router()

// Test route
router.get('/', function (req, res) {
  res.json({
    'error': false,
    'message': 'This is the artsdata API'
  })
})

// Register API routes
app.use('/api', router)

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

// MongoDB functions for calling and recieveing from the database

// Connection URL
var url = 'mongodb://localhost:27017/myproject'

// Use connect method to connect to the server
MongoClient.connect(url, function (err, db) {
  assert.equal(null, err)
  console.log('Connected successfully to server')

  var insertDocuments = function (db, callback) {
  // Get the documents collection
    var collection = db.collection('artsdata')
  // Insert some documents
    collection.insertMany([], function (err, result) {
      assert.equal(null, err)
    })
  }
  //  db.close() - for use to close the database
})
