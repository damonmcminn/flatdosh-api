/*eslint new-cap: 0 */
'use strict';

var supertest = require('supertest');
var r = require('rethinkdb');
var request = supertest('http://localhost:8092');
var _ = require('lodash');


describe('Server API', function() {

  var auth;
  var conn;
  var groupId;
  var userId = 'test@user.com';
  var m2 = 'm2@user.com';
  var m3 = 'm3@user.com';

  before('setup group', function() {
    r.connect({db: 'flatdosh'}, function(err, connection) {
      conn = connection;
      r.table('groups').insert({members: [userId, m2, m3], name: 'testGroup'}).run(conn)
      .then(function(doc) {
        groupId = doc.generated_keys[0];
      });
    });
  });

  after('remove test data', function() {
    r.table('groups').get(groupId).delete().run(conn);
    r.table('users').get(userId).delete().run(conn);
    r.table('expenses').filter({group: groupId}).delete().run(conn);
  });

  describe('POST /register', function() {
    // bcrypt is 10 rounds, ergo response is slow

    it('should return 200 OK', function(done) {

      request.post('/register')
      .send({
        email: userId,
        password: 'foo',
        name: 'testUser'
        })
      .expect(200, done);
    });
  });

  describe('POST /login', function() {
    // bcrypt is 10 rounds, ergo response is slow

    it('should return a JWT', function(done) {
      request.post('/login')
      .set({'Authorization': 'Basic ' + (new Buffer('test@user.com:foo')).toString('base64')})
      .expect(function(res) {
        auth = {'Authorization': 'Bearer ' + res.body.token};
      })
      .end(done);
    });
  });

  describe('/expense', function() {

    var expenseId;

    describe('POST', function() {
      it('should save an expense', function(done) {
        request.post('/expense')
        .set(auth)
        .send({
          spender: userId,
          amount: 1,
          description: 'test expense',
          group: groupId
        })
        .expect(function(res) {
          expenseId = res.body.generated_keys[0];
          if (res.status !== 200) {
            throw new Error();
          }
        })
        .end(done);
      });

      it('should save an expense on behalf of another member', function(done) {
        request.post('/expense')
        .set(auth)
        .send({
          spender: m2,
          amount: 3,
          description: 'test expense',
          group: groupId
        })
        .expect(200, done);
      });

    });

    describe('DELETE', function() {
      it('should delete expenses', function(done) {
        request.delete('/expense')
        .set(auth)
        .send([expenseId])
        .expect({deleted: [expenseId]}, done);
      });
    });

    describe('GET /:group', function() {
      it('should return group expenses', function(done) {
        request.get('/expense/' + groupId)
        .set(auth)
        .expect(200, done);
      });
    });

  });

  describe('GET /members/:group', function() {
    it('should return list of group members', function(done) {
      request.get('/members/' + groupId)
      .set(auth)
      .expect(function(res) {
        if (res.status !== 200 || res.body.length !== 3) {
          throw new Error();
        }
      })
      .end(done);
    });
  });

  describe('GET /settings', function() {

    it('should return the user\'s info without password', function(done) {
      request.get('/settings')
      .set(auth)
      .expect({
        groups: [{id: groupId, name: 'testGroup'}],
        id: 'test@user.com',
        name: 'testUser'
      }, done);
    });
  });

  describe('/balance', function() {
    describe('GET /:group', function() {
      it('should return the balances for each group member', function(done) {
        request.get('/balance/' + groupId)
        .set(auth)
        .expect(function(res) {
          var balances = res.body;
          var testUser = _.find(balances, {name: 'testUser'});
          // m2 spent 3 therefore each owe 1
          if (testUser.owe !== 1) {
            throw new Error('balance error');
          }
        })
        .end(done);
      });
    });
  });

});
