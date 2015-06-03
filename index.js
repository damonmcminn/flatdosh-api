'use strict';
const db = require('./lib/db');

db.initialise()
  .then(function() {
    require('./lib/api').initialise();
  })
  .catch(function(err) {
    throw err;
  });
