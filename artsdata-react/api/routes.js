var mongo = require('mongodb')
var assert = require('assert')
var router = require('express').Router()
var ObjectID = mongo.ObjectID
// var encoding = require('encoding')
// var http = require('http')
// var fetch = require('node-fetch')

var db, observations, species, users

//MongoDB

//Page size and page index strategy:
//https://scalegrid.io/blog/fast-paging-with-mongodb/
//TODO: To make this efficient it is important to index _id and attributes that will be used for sorting.

//TODO: Lag dokumentasjon for API-et.
var url = 'mongodb://localhost:27017/artsdata'
mongo.MongoClient.connect(url, function(err, database) {
  // Cancel app session if database fails
  if (err) {
    console.log(err)
    process.exit(1)
  }

  console.log('Connected successfully to the MongoDB server\r\n')
  db = database
  users = db.collection('users')
  taxons = db.collection('taxons')
  observations = db.collection('observations')
  //TODO: Only call this method once to initiate the DB.
  populateDB(users, taxons, observations)
})

function populateDB(users, taxons, observations) {
  users.drop()
  taxons.drop()
  observations.drop()
  users = db.collection('users')
  taxons = db.collection('taxons')
  observations = db.collection('observations')

  console.log("Initiating database collections...")

  var torjuss = {
    username: 'torjuss',
    email: 'torjuss@stud.ntnu.no',
    password: '1234'
  }

  users.insert(torjuss, function(err, docs) {
    if (err) {
      handleError(res, err.message, 'Failed to add user')
    } else {
      console.log('Added user ' + torjuss.username)
    }
  })

  var newTaxons = require('../resources/data/taxons.json')['Taxons']
  taxons.insert(newTaxons, function(err, docs) {
    if (err) {
      handleError(res, err.message, 'Failed to add user')
    } else {
      console.log('Added ' + newTaxons.length + ' taxons')
    }
  })

  //TODO: Encodinga for observations er feil. Må få til UTF-8 på eit vis.
  var newObservations = require('../resources/data/observations.json')['Observations']
  for (var i = 0; i < newObservations.length; i++) {
    var doc = newObservations[i]
    var obj = {
      'TaxonId': doc['TaxonId'],
      'Collector': doc['Collector'],
      'CollectedDate': doc['CollectedDate'],
      'Name': doc['Name'],
      'ScientificName': doc['ScientificName'],
      'Count': doc['Count'],
      'Notes': doc['Notes'],
      'County': doc['County'],
      'Municipality': doc['Municipality'],
      'Locality': doc['Locality'],
      'Longitude': doc['Longitude'],
      'Latitude': doc['Latitude']
    }

    observations.insert(obj, function(err, docs) {
      if (err) {
        handleError(res, err.message, 'Failed to add user')
      }
    })
    // console.log('Added observation (' + (i + 1) + ': ' + obj['Name'] + ')')
  }

  console.log('Added ' + newObservations.length + ' observations')
}

/**
 * length - Returns the number of elements in a dictionary (numbr of attributes of a JSON object)
 *
 * @param  {type} obj The object
 * @return {int}      Number of attributes of the object
 */
function length(obj) {
  return Object.keys(obj).length;
}

/**
 * Generic error handler used by all API endpoints.
 */
function handleError(res, reason, message, code) {
  console.log('\r\nERROR: ' + reason)
  res.status(code || 500).json({
    'error': message
  })
}

 // USER DATA

/*  ''/user/:id'
 *    GET: finds user by id
 */
router.get('/users/:id', function(req, res) {
  console.log('\r\nGET users with _id: ' + req.params.id)
  users.findOne({
    _id: new ObjectID(req.params.id)
  }, function(err, doc) {
    if (err) {
      handleError(res, err.message, 'Failed to get user')
    } else {
      res.status(200).json(doc)
    }
  })
})

 // OBSERVATIONS DATA

/*  ''/observations'
 *    GET: finds all observations (optionally: with specified query criteria)
 */
//TODO: Sorting
router.get('/observations', (req, res) => {
  var logText = '\r\nGET observations'
  var filter = {}
  var pageIndex = 1
  var pageSize = 25
  var maxPageSize = 100

  //TODO: Validate query string
  if (req.query.search != null) {
    var search = req.query.search
    filter = {
      $or: [
        {Name: {$regex: '(?i)' + search}},
        {ScientificName: {$regex: '(?i)' + search}},
        {Notes: {$regex: '(?i)' + search}},
        {County: {$regex: '(?i)' + search}},
        {Municipality: {$regex: '(?i)' + search}},
        {Locality: {$regex: '(?i)' + search}}
      ]
    }
    logText += '\r\nFilter: ' + JSON.stringify(filter, null, 2)
  }

  if (req.query.pageSize != null) {
    tmpPageSize = parseInt(req.query.pageSize)
    pageSize = isNaN(tmpPageSize) ? pageSize : Math.min(tmpPageSize, maxPageSize)
    logText += '\r\nPage size: ' + pageSize
  }

  if (req.query.pageIndex != null) {
    tmpPageIndex = parseInt(req.query.pageIndex)
    pageIndex = isNaN(tmpPageIndex) ? pageIndex : Math.max(tmpPageIndex, pageIndex)
    logText += '\r\nPage index: ' + pageIndex
  }
  console.log(logText)

  observations.find(filter).skip(pageSize*(pageIndex-1)).limit(pageSize).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, 'Failed to get observations')
    } else {
      console.log('Result count: ' + length(docs) + '\r\n')
      res.status(200).json(docs)
    }
  })
})

/*  ''/observations/:id'
 *    GET: finds observation by id
 */
router.get('/observations/:id', function(req, res) {
  console.log('\r\nGET observation with _id: ' + req.params.id)
  observations.findOne({
    _id: new ObjectID(req.params.id)
  }, function(err, doc) {
    if (err) {
      handleError(res, err.message, 'Failed to get observation')
    } else {
      res.status(200).json(doc)
    }
  })
})

// SPECIES DATA

/*  ''/taxons'
 *    GET: finds all species (optionally: with specified name or taxon group)
 */
//TODO: Sorting
router.get('/taxons', (req, res) => {
  var logText = '\r\nGET taxons'
  var filter = {}
  var pageIndex = 1
  var pageSize = 25
  var maxPageSize = 100

  //TODO: Validate query string
  if (req.query.search != null) {
    var search = req.query.search
    filter = {
      $or: [
        {TaxonGroup: {$regex: '(?i)' + search}},
        {ValidScientificName: {$regex: '(?i)' + search}},
        {PrefferedPopularname: {$regex: '(?i)' + search}}
      ]
    }
    logText += '\r\nFilter: ' + JSON.stringify(filter, null, 2)
  }

  if (req.query.pageSize != null) {
    tmpPageSize = parseInt(req.query.pageSize)
    pageSize = isNaN(tmpPageSize) ? pageSize : Math.min(tmpPageSize, maxPageSize)
    logText += '\r\nPage size: ' + pageSize
  }

  if (req.query.pageIndex != null) {
    tmpPageIndex = parseInt(req.query.pageIndex)
    pageIndex = isNaN(tmpPageIndex) ? pageIndex : Math.max(tmpPageIndex, pageIndex)
    logText += '\r\nPage index: ' + pageIndex
  }
  console.log(logText)

  taxons.find(filter).skip(pageSize*(pageIndex-1)).limit(pageSize).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, 'Failed to get species')
    } else {
      res.status(200).json(docs)
    }
  })
})

/*  ''/taxons/:id'
 *    GET: finds specie by id
 */
router.get('/taxons/:id', function(req, res) {
  console.log('\r\nGET taxon with _id: ' + req.params.id)
  taxons.findOne({
    _id: new ObjectID(req.params.id)
  }, function(err, doc) {
    if (err) {
      handleError(res, err.message, 'Failed to get specie')
    } else {
      res.status(200).json(doc)
    }
  })
})

//DEFAULT ENDPOINT
router.get('/*', (req, res) => {
  console.log('\r\nGET welcome message')
  res.status(200).json({
    message: 'Welcome to the artsdata API'
  })
})

//TEST ENDPOINT
router.get('/test', (req, res) => {
  console.log('\r\nGET test message')
  res.status(200).json({
    message: 'This is a test'
  })
})

module.exports = router
