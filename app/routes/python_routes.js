// routes/python_routes.js

module.exports = function(app, db) {
 
app.post('/python', (req, res) => {
   console.log("Python accessed from server");
   pythonFunction();
   res.send('Python executed!');
  }); //python END

}; //module.exports

function pythonFunction() {
    var spawn = require("child_process").spawn;
    var process = spawn('python',["./python/pscript.py", 5]);
    process.stdout.on('data', function (data){
      // Do something with the data returned from python script
      console.log("From python script: " + data);
    });              
}