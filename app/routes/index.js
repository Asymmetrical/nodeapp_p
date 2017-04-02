// routes/index.js

const noteRoutes = require('./note_routes');
const pythonRoutes = require('./python_routes');

module.exports = function(app, db) {
  noteRoutes(app, db);
  pythonRoutes(app, db);
  // Other route groups could go here, in the future
};