//
// This script is used to remove all the DB collections from the artsdata db
//
var mongo = require('mongodb')

mongo.MongoClient.connect('mongodb://localhost:27017/artsdata', function(err, db) {
  if (err) {
    console.log(err)
    process.exit(1)
  }

  console.log('Connected successfully to the MongoDB server\r\n')
  db.collection('users').drop()
  db.collection('taxons').drop()
  db.collection('observations').drop()
  db.close()
  console.log('Successfully deleted collections in artsdata\r\n')
})
