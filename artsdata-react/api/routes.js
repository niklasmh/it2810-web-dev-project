var mongo = require('mongodb')
var assert = require('assert')
var router = require('express').Router()
var ObjectID = mongo.ObjectID
// var encoding = require('encoding')
// var http = require('http')
// var fetch = require('node-fetch')

var db, observations, species, users

/**
 * MongoDB Connection
 */
//TODO: Lag dokumentasjon for API-et.
var url = 'mongodb://localhost:27017/artsdata'
mongo.MongoClient.connect(url, function(err, database) {
  // Cancel app session if database fails
  if (err) {
    console.log(err)
    process.exit(1)
  }

  console.log('Connected successfully to the server')
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

  var taxons2 = require('../resources/data/taxons.json')['Taxons']
  taxons.insertMany(taxons2, function(err, docs) {
    if (err) {
      handleError(res, err.message, 'Failed to add user')
    } else {
      console.log('Added taxons (' + taxons2.length + ')')
    }
  })

  //TODO: Encodinga for observations er feil. Må få til UTF-8 på eit vis.
  var observations2 = require('../resources/data/observations.json')['Observations']
  // var observations2Text = require('./observations.json')['Observations']
  // var observations2 = encoding.convert(observations2Text, 'ASCII', 'UTF-8')
  // observations2 = JSON.parse(JSON.stringify(observations2))

  // var observations2 = fetchRawData()['Observations']
  // var observations2 = fetchRawData()

  for (var i = 0; i < observations2.length; i++) {
    var doc = observations2[i]
    var obj = {}
    obj['TaxonId'] = doc['TaxonId']
    obj['Collector'] = doc['Collector']
    obj['CollectedDate'] = doc['CollectedDate']
    obj['Name'] = doc['Name']
    obj['ScientificName'] = doc['ScientificName']
    obj['Count'] = doc['Count']
    obj['Notes'] = doc['Notes']
    obj['County'] = doc['County']
    obj['Municipality'] = doc['Municipality']
    obj['Locality'] = doc['Locality']
    obj['Longitude'] = doc['Longitude']
    obj['Latitude'] = doc['Latitude']

    observations.insert(obj, function(err, docs) {
      if (err) {
        handleError(res, err.message, 'Failed to add user')
      }
    })

    console.log('Added observation (' + i + ': ' + obj['Name'] + ')')
  }
}

// function fetchRawData(observations) {
//   var speciesList = ['31133', '31140', '31237', '31267', '31292']
//   var url = 'http://artskart2.artsdatabanken.no/api/observations/list?Taxons='
//   var pageSize = 1000
//
//   var observations3 = []
//
//   for (var i = 0; i < speciesList.length; i++) {
//     var specie = speciesList[i]
//     fetch(`${url + specie}&pageSize=${pageSize}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json; charset=utf-8'
//         }
//       })
//       .then((response) => {
//         var obj = response.json()
//         // observations.append(obj['Observations'])
//         observations3.append(obj)
//         console.log(obj)
//       })
//   }
//
//   return observations3
// }

/**
 * Generic error handler used by all endpoints.
 */
function handleError(res, reason, message, code) {
  console.log('ERROR: ' + reason)
  res.status(code || 500).json({
    'error': message
  })
}

/**
 * USER DATA
 */
/*  ''/user/:id'
 *    GET: find user by id
 */
router.get('/users/id', function(req, res) {
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

/**
 * OBSERVATIONS DATA
 */

/*  ''/observations'
 *    GET: finds all observations, with specified query criteria.
 */
router.get('/observations', (req, res) => {
  filter = {}
  observations.find(filter).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, 'Failed to get observations')
    } else {
      res.status(200).json(docs)
    }
  })
})

/*  ''/observations/:id'
 *    GET: find observation by id
 */
router.get('/observations/id', function(req, res) {
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

/**
 * SPECIES DATA
 */
/*  ''/taxons'
 *    GET: finds all species, with specified query criteria.
 */
router.get('/taxons', (req, res) => {
  filter = {}
  taxons.find(filter).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, 'Failed to get species')
    } else {
      res.status(200).json(docs)
    }
  })
})

/*  ''/taxons/:id'
 *    GET: find specie by id
 */
router.get('/taxons/id', function(req, res) {
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

/**
 * DEFAULT
 */
router.get('/*', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the artsdata API'
  })
})

/**
 * TEST
 */
router.get('/test', (req, res) => {
  res.status(200).json({
    message: 'This is a test'
  })
})

module.exports = router
