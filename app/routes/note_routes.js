// routes/note_routes.js
/* This routing is created based on a tutorial:
https://medium.freecodecamp.com/building-a-simple-node-js-api-in-under-30-minutes-a07ea9e390d2
*/

//since _id is an object, not a string 
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    // without the below it will not work, since _id is an object, 
    // not a string 
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  }); //get END


  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  }); //post END

  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      } 
    });
  }); //Delete END

// Essentially Update
// So getting it and changing it (in the calls 'Body', i.e. not 'Header')
// The 'Body' contains title and Body
// Getting and changing in one swoop
  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      } 
    });
  }); // Put END

}; //module.exports