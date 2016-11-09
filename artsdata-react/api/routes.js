var mongo = require('mongodb')
var router = require('express').Router()
var ObjectID = mongo.ObjectID
var fetch = require('node-fetch')

var db, observations, species, users, taxons, res

// MongoDB

// Page size and page index strategy:
// https://scalegrid.io/blog/fast-paging-with-mongodb/
// TODO: To make this efficient it is important to index _id and attributes that will be used for sorting.

// TODO: Lag dokumentasjon for API-et.
var url = 'mongodb://localhost:27017/artsdata'
mongo.MongoClient.connect(url, function (err, database) {
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
  // TODO: Only call this method once to initiate the DB.
  populateDB(users, taxons, observations)
})

function populateDB (users, taxons, observations) {
  console.log('Initiating database collections...')
  var speciesList = ['3846', '31113', '31133', '31140', '31163', '31222', '31237', '31267', '31292', '77987']

  db.createCollection('users', function (err, res) {
    if (err) {
      handleError(res, err.message, 'Failed to create users collection in MongoDB')
    }
  })
  db.createCollection('taxons', function (err, res) {
    if (err) {
      handleError(res, err.message, 'Failed to create taxons collection in MongoDB')
    }
  })
  db.createCollection('observations', function (err, res) {
    if (err) {
      handleError(res, err.message, 'Failed to create observations collection in MongoDB')
    }
  })

  populateUsers(db.collection('users'))
  populateTaxons(db.collection('taxons'), speciesList)
  populateObservations(db.collection('observations'), speciesList)
}

function populateUsers (collection) {
  var user = { username: 'torjuss', email: 'torjuss@stud.ntnu.no', password: '1234' }

  collection.insert(user, function (err, docs) {
    if (err) {
      handleError(res, err.message, 'Failed to add user')
    } else {
      console.log('Added user ' + user.username)
    }
  })
}

function populateTaxons (collection, speciesList) {
  var newTaxons = require('../resources/data/taxons.json')['Taxons']

  for (var i = 0; i < speciesList.length; i++) {
    var id = speciesList[i]
    var url = 'http://webtjenester.artsdatabanken.no/Artskart/api/taxon/' + id
    // Fetch is a modern replacement for XMLHttpRequest.
    fetch(`${url}`, {
      method: 'GET'
    })
    .then((response) => {
      return response.json()
    })
    .then((body) => {
      var doc = body
      var obj = {
        'Id': doc['Id'],
        'TaxonGroup': doc['TaxonGroup'],
        'ValidScientificName': doc['ValidScientificName'],
        'PrefferedPopularname': doc['PrefferedPopularname']
      }

      collection.insert(obj, function (err, docs) {
        if (err) {
          handleError(res, err.message, 'Failed to add taxon to MongoDB')
        } else {
          console.log('Added taxon: ' + obj['PrefferedPopularname'] + ' (' + obj['ValidScientificName'] + ')')
        }
      })
    })
    .catch((err) => {
      handleError(null, err.message, 'Failed to fetch taxons API data')
    })
  }
}

function populateObservations (collection, speciesList) {
  var newObservations = []
  for (var i = 0; i < speciesList.length; i++) {
    var id = speciesList[i]
    var url = 'http://artskart2.artsdatabanken.no/api/observations/list?Taxons=' + id
    // Limit the number of observations of a single species to 1000.
    var pageSize = 1000

    // Fetch is a modern replacement for XMLHttpRequest.
    fetch(`${url}&pageSize=${pageSize}`, {
      method: 'GET'
    })
    .then((response) => {
      return response.json()
    })
    .then((body) => {
      var obs = body['Observations']
      var speciesCount = obs.length
      for (var j = 0; j < speciesCount; j++) {
        var obj = obs[j]
        newObservations.push(obj)
      }

      for (var j = 0; j < newObservations.length; j++) {
        var doc = newObservations[j]
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

        collection.insert(obj, function (err, docs) {
          if (err) {
            handleError(res, err.message, 'Failed to add observation to MongoDB')
          }
        })
      }
      console.log('Added ' + speciesCount + ' observations for the species with taxon id: ' + obj['TaxonId'])
    })
    .catch((err) => {
      handleError(null, err.message, 'Failed to fetch observations API data ')
    })
  }
}

/**
 * length - Returns the number of elements in a dictionary (numbr of attributes of a JSON object)
 *
 * @param  {type} obj The object
 * @return {int}      Number of attributes of the object
 */
function length (obj) {
  return Object.keys(obj).length
}

/**
 * Generic error handler used by all API endpoints.
 */
function handleError (res, reason, message, code) {
  console.log('\r\nERROR: ' + reason)
  if (res == null) return

  res.status(code || 500).json({
    'error': message
  })
}

 // USER DATA

/*  ''/user/:id'
 *    GET: finds user by id
 */
router.get('/users/:id', function (req, res) {
  console.log('\r\nGET users with _id: ' + req.params.id)
  users.findOne({
    _id: new ObjectID(req.params.id)
  }, function (err, doc) {
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
// TODO: Sorting
router.get('/observations', (req, res) => {
  var logText = '\r\nGET observations'
  var filter = {}
  var pageIndex = 1
  var pageSize = 25
  var maxPageSize = 100

  // TODO: Validate query string
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

  observations.find(filter).skip(pageSize * (pageIndex - 1)).limit(pageSize).toArray(function (err, docs) {
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
router.get('/observations/:id', function (req, res) {
  console.log('\r\nGET observation with _id: ' + req.params.id)
  observations.findOne({
    _id: new ObjectID(req.params.id)
  }, function (err, doc) {
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
// TODO: Sorting
router.get('/taxons', (req, res) => {
  var logText = '\r\nGET taxons'
  var filter = {}
  var pageIndex = 1
  var pageSize = 25
  var maxPageSize = 100

  // TODO: Validate query string
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

  taxons.find(filter).skip(pageSize * (pageIndex - 1)).limit(pageSize).toArray(function (err, docs) {
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
router.get('/taxons/:id', function (req, res) {
  console.log('\r\nGET taxon with _id: ' + req.params.id)
  taxons.findOne({
    _id: new ObjectID(req.params.id)
  }, function (err, doc) {
    if (err) {
      handleError(res, err.message, 'Failed to get specie')
    } else {
      res.status(200).json(doc)
    }
  })
})

// DEFAULT ENDPOINT
router.get('/*', (req, res) => {
  console.log('\r\nGET welcome message')
  res.status(200).json({
    message: 'Welcome to the artsdata API'
  })
})

// TEST ENDPOINT
router.get('/test', (req, res) => {
  console.log('\r\nGET test message')
  res.status(200).json({
    message: 'This is a test'
  })
})

module.exports = router
