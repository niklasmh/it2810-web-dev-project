var mongo = require('mongodb')
var router = require('express').Router()
var ObjectID = mongo.ObjectID
var fetch = require('node-fetch')
var user = require('./user.js')
var observation = require('./observation.js')

var db, observations, users, taxons, res

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

  //TODO: db.close()

  console.log('Connected successfully to the MongoDB server\r\n')
  db = database
  users = db.collection('users')
  taxons = db.collection('taxons')
  observations = db.collection('observations')
  // TODO: Only call this method once to initiate the DB.
  // populateDB(users, taxons, observations)
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

      for (var i = 0; j < newObservations.length; i++) {
        var doc = newObservations[i]
        var obsObj = {
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
          'Latitude': doc['Latitude'],
          'User': ''
        }

        collection.insert(obsObj, function (err, docs) {
          if (err) {
            handleError(res, err.message, 'Failed to add observation to MongoDB')
          }
        })
      }
      console.log('Added ' + speciesCount + ' observations for the species with taxon id: ' + obsObj['TaxonId'])
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

/*  ''/users/:username'
 *    GET: finds user by username
 */
router.get('/users/:username', function (req, res) {
  var username = req.params.username
  console.log('\r\nGET user with username: ' + username)

  users.find({username: username}).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, 'Failed to get user')
    } else {
      if (docs.length == 0) {
        handleError(res, 'User does not exist', 'User does not exist', 404)
      } else {
        var user = docs[0];

        //user = { _id: user['6'], username: user['username'] }
        res.status(200).json(user)
      }
    }
  })
})

/*  ''/users:id'
 *    POST: inserts new user into the collection
 *    https://www.sitepoint.com/creating-restful-apis-express-4/
 */
router.post('/users', function (req, res) {
  console.log('\r\nPOST new user')
  // TODO: Torjus
  //var user = new user.User({ username: 'torjuss2', email: 'torjuss2@stud.ntnu.no', password: '12345' })
  var user = req.body

  var username = user.username
  users.find({username: username}).toArray(function (err, docs) {
    if (err) {

    } else {

      if (docs.length == 0) {
        users.insert(user, {w: 1}, function (err, docs) {
          if (err) {
            handleError(res, err.message, 'Failed to add new user')
          } else {
            res.status(200).json({message: 'Added new user: ' + user['username']})
            console.log('Added new user: ' + user['username'])
          }
        })
      } else {
        handleError(res, 'User already exists', 'User already exists', 404)
      }
    }
  })

  // TODO: What is "{w: 1}"?
})

router.post('/users/login', function (req, res) {
  console.log('\r\nPOST new user')
  // TODO: Torjus
  //var user = new user.User({ username: 'torjuss2', email: 'torjuss2@stud.ntnu.no', password: '12345' })
  var user = req.body
  console.log(user)
  var filter = {
    $and: [
      {username: user['username']},
      {password: user['password']}
    ]
  }
  var username = user.username
  users.find(filter).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, 'Failed to get user')
    } else {
      if (docs.length == 0) {
        handleError(res, 'User does not exist', 'User does not exist', 404)
      } else {
        var user = docs[0];
        //user = { _id: user['6'], username: user['username'] }
        res.status(200).json(user)
      }
    }
  })

  // TODO: What is "{w: 1}"?
})


/*  ''/users:id'
 *    PUT: updates user with the specified id
 *    https://www.sitepoint.com/creating-restful-apis-express-4/
 */
router.put('/users/:id', function (req, res) {
  var id = req.params.id
  console.log('\r\nPUT user with _id: ' + id)
  users.findOne({
    _id: id
  }, function (err, doc) {
    if (err) {
      handleError(res, err.message, 'Failed to find user with _id: ' + id)
    } else {
      for (prop in req.body) {
        doc[prop] = req.body[prop]
      }

      doc.save(function (err) {
        if (err) {
          handleError(res, err.message, 'Failed to update user with _id: ' + id)
        } else {
          console.log('Updated observation with _id: ' + id)
          res.status(200).json({message: 'Updated user with _id: ' + id})
        }
      })
    }
  })
})


/*  ''/users:id'
 *    DELETE: deletes user with the specified id
 *    https://www.sitepoint.com/creating-restful-apis-express-4/
 */
router.delete('/users/:id', function (req, res) {
  console.log('\r\nPUT user')
  var id = req.params.id

  users.remove({_id: id}, function (err, doc) {
    if (err) {
      handleError(res, err.message, 'Failed to delete user with _id: ' + id)
    } else {
      console.log('Deleted user with _id: ' + id)
      res.status(200).json({message: 'Deleted user with _id: ' + id})
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
  if (req.query.search != null && req.query.search != '') {
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

  if (req.query.pageSize !== null && req.query.pageSize !== '') {
    var tmpPageSize = parseInt(req.query.pageSize)
    pageSize = isNaN(tmpPageSize) ? pageSize : Math.min(tmpPageSize, maxPageSize)
    logText += '\r\nPage size: ' + pageSize
  }

  if (req.query.pageIndex !== null && req.query.pageIndex !== '') {
    var tmpPageIndex = parseInt(req.query.pageIndex)
    pageIndex = isNaN(tmpPageIndex) ? pageIndex : Math.max(tmpPageIndex, pageIndex)
    logText += '\r\nPage index: ' + pageIndex
  }
  console.log(logText)

  if (Object.keys(filter).length === 0 && filter.constructor === Object) {
    observations.find().sort({$natural: -1}).skip(pageSize * (pageIndex - 1)).limit(pageSize).toArray(function (err, docs) {
      if (err) {
        handleError(res, err.message, 'Failed to get observations')
      } else {
        console.log('Result count without filter: ' + length(docs) + '\r\n')
        res.status(200).json(docs)
      }
    })
  } else {
    observations.find(filter).sort({$natural: -1}).skip(pageSize * (pageIndex - 1)).limit(pageSize).toArray(function (err, docs) {
      if (err) {
        handleError(res, err.message, 'Failed to get observations')
      } else {
        console.log('Result count: ' + length(docs) + '\r\n')
        res.status(200).json(docs)
      }
    })
  }
})

//TODO: Sikkerhet. Alle kan hente ut alle andre sine observations. Vi bør sjekke username (eller id) opp mot den aktive brukeren i state.
/*  ''/:username/myObservations'
 *    GET: finds observation by user name
 */
router.get('/:username/observations', function (req, res) {
  var logText = '\r\nGET observations registered by a user: ' + req.params.username
  var pageIndex = 1
  var pageSize = 25
  var maxPageSize = 100

  if (req.query.pageSize != null && req.query.pageSize != '') {
    tmpPageSize = parseInt(req.query.pageSize)
    pageSize = isNaN(tmpPageSize) ? pageSize : Math.min(tmpPageSize, maxPageSize)
    logText += '\r\nPage size: ' + pageSize
  }

  if (req.query.pageIndex != null && req.query.pageIndex != '') {
    tmpPageIndex = parseInt(req.query.pageIndex)
    pageIndex = isNaN(tmpPageIndex) ? pageIndex : Math.max(tmpPageIndex, pageIndex)
    logText += '\r\nPage index: ' + pageIndex
  }
  console.log(logText)

  observations.find({User: req.params.username}).skip(pageSize * (pageIndex - 1)).limit(pageSize).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, 'Failed to get observations for user')
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
  observations.findOne({_id: new ObjectID(req.params.id)}, function (err, doc) {
    if (err) {
      handleError(res, err.message, 'Failed to get observation')
    } else {
      res.status(200).json(doc)
    }
  })
})

/*  ''/observations:id'
 *    POST: inserts new observation into the collection
 *    https://www.sitepoint.com/creating-restful-apis-express-4/
 */
router.post('/observations', function (req, res) {
  console.log('\r\nPOST new observation')
  var obs = new observation.Observation(req.body)

  // TODO: What is "{w: 1}"?
  observations.insert(obs, {w: 1}, function (err, docs) {
    if (err) {
      handleError(res, err.message, 'Failed to add new observation')
    } else {
      res.json({message: 'Added new observation of ' + obs['Name']})
      console.log('Added new observation of ' + obs['Name'])
    }
  })
})

/*  ''/observations:id'
 *    PUT: updates observation with the specified id
 *    https://www.sitepoint.com/creating-restful-apis-express-4/
 */
router.put('/observations/:id', function (req, res) {
  console.log('\r\nPUT observation')
  var id = req.params.id
  observations.findOne({
    _id: id
  }, function (err, doc) {
    if (err) {
      handleError(res, err.message, 'Failed to find observation with _id: ' + id)
    } else {
      for (prop in req.body) {
        doc[prop] = req.body[prop]
      }

      doc.save(function (err) {
        if (err) {
          handleError(res, err.message, 'Failed to update observation with _id: ' + id)
        } else {
          console.log('Updated observation with _id: ' + id)
          res.status(200).json({message: 'Updated observation with _id: ' + id})
        }
      })
    }
  })
})

/*  ''/observations:id'
 *    DELETE: deletes observation with the specified id
 *    https://www.sitepoint.com/creating-restful-apis-express-4/
 */
router.delete('/observations/:id', function (req, res) {
  console.log('\r\nPUT observation')
  var id = req.params.id

  observations.remove({_id: id}, function (err, doc) {
    if (err) {
      handleError(res, err.message, 'Failed to delete observation with _id: ' + id)
    } else {
      console.log('Deleted observation with _id: ' + id)
      res.status(200).json({message: 'Deleted observation with _id: ' + id})
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
  if (req.query.search != null && req.query.search != '') {
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

  if (req.query.pageSize != null && req.query.pageSize != '') {
    tmpPageSize = parseInt(req.query.pageSize)
    pageSize = isNaN(tmpPageSize) ? pageSize : Math.min(tmpPageSize, maxPageSize)
    logText += '\r\nPage size: ' + pageSize
  }

  if (req.query.pageIndex != null && req.query.pageIndex != '') {
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
router.get('/', (req, res) => {
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
