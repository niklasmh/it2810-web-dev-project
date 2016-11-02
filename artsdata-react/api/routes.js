var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient,
  Server = require('mongodb').Server,
  assert = require('assert')

const router = require('express').Router()
  // const taxons = require('resources/data/taxons.json')

// var database;
// var url = 'mongodb://localhost:27017/test'
// MongoClient.connect(url, function(err, db) {
//   // assert.equal(null, err)
//   console.log("Connected successfully to the server")
//   database = db
//   db.close()
// })


/**
 * TEST
 */
router.get('/test', (req, res) => {
  res.status(200).json({
    message: 'This is a test'
  })
})

/**
 * USER DATA
 */



/**
 * OBSERVATION DATA
 */
// router.get('/observations', (req, res) => {
//   return database.collection('artsdata', function(err, collection) {
//     collection.find().toArray(function(err, items) {
//       res.send(items)
//     })
//   })
// })

/**
 * SPECIES DATA
 */
router.get('/taxons', (req, res) => {
  //TODO: Torjus: Encoding.
  res.status(200).json(taxons)
})

/**
 * DEFAULT
 */
router.get('/*', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the artsdata API'
  })
})

module.exports = router;
