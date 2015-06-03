/*eslint new-cap: 0 */
'use strict';

var api = require('../../index');
var agent = require('supertest').agent(api);

describe('Server API', function() {

  var auth;

  describe('/register', function() {
    it('should return a JWT on success', function(done) {
      agent.post('/register')
      .expect({}, done);
    });
  });

});
