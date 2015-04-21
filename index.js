'use strict';
const CONFIG = require('parse-config');
const log = require('./lib/log');
const db = require('./lib/db');


db.initialise()
  .then(function(data) {
    require('./lib/api').initialise();
  })
  .catch(function(err) {
    throw err;
  });
