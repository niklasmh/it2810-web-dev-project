var express = require('express')
var app = express()
var bodyParser = require("body-parser");

app.use(express.static(__dirname));
app.use('/dist', express.static(__dirname + '/dist'))
app.use('/node_modules', express.static(__dirname + '/node_modules'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  "extended": true
}));

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
})

// API routes
var router = express.Router();

// Test route
router.get("/", function(req, res) {
  res.json({
    "error": false,
    "message": "This is the artsdata API"
  });
});

// Register API routes
app.use('/api', router);

// Start the server
app.listen(3000, function() {
  console.log('Artsdata app listening on port 3000');
});
