'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _db = require('../db');

var _db2 = _interopRequireWildcard(_db);

var _createSchema = require('schema');

var _createSchema2 = _interopRequireWildcard(_createSchema);

var _hash = require('../auth/hash');

var _hash2 = _interopRequireWildcard(_hash);

var r = _db2['default'].r;
var conn = _db2['default'].conn;

var users = r.table('users');

var validate = _createSchema2['default']([{
  field: 'email',
  type: String,
  required: true
}, {
  field: 'name',
  type: String,
  required: true
}, {
  field: 'password',
  type: String,
  required: true
}, {
  field: 'group',
  type: String,
  required: true
}, {
  field: 'shared',
  type: String
}]);

function insert(user) {
  var email = user.email;
  var name = user.name;
  var password = user.password;
  var group = user.group;
  var shared = user.shared;

  return _hash2['default'](password).then(function (hashed) {
    var doc = { id: email, name: name, password: hashed, group: group, shared: shared };
    return users.insert(doc).run(conn);
  });
};

function all() {
  return users.run(conn).then(_db2['default'].toArray);
}

function get(email) {

  return users.get(email).run(conn);
}

function inGroup(email) {

  return r.table('groups').filter(function (group) {
    return group('members').contains(email);
  })('id').nth(0)['default'](false) // catch index out of bounds error
  .run(conn);
}

exports['default'] = { insert: insert, all: all, validate: validate, get: get, inGroup: inGroup };
module.exports = exports['default'];
//# sourceMappingURL=model.js.map