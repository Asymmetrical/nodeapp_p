// server.js
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');

// initialise the app
const app            = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on THIS port: ' + port);
  });               
});

// communicate with Python
// http://stackoverflow.com/questions/23450534/how-to-call-python-function-from-nodejs

var spawn = require("child_process").spawn;
var process = spawn('python',["./python/pscript.py", 5]);

process.stdout.on('data', function (data){
  console.log("From python script: " + data);
// Do something with the data returned from python script
});

