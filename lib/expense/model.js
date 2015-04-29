'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _db = require('../db');

var _db2 = _interopRequireWildcard(_db);

var _createSchema = require('schema');

var _createSchema2 = _interopRequireWildcard(_createSchema);

var _hash = require('../auth');

var _schema = require('./schema');

var _schema2 = _interopRequireWildcard(_schema);

var r = _db2['default'].r;
var conn = _db2['default'].conn;

var expenses = r.table('expenses');
var validate = _createSchema2['default'](_schema2['default']);

function insert(expense) {
  return expenses.insert(expense).run(conn);
};

function all(group) {
  return expenses.filter({ group: group }).eqJoin('email', r.table('users')).zip().without('group', 'id', 'password', 'shared', 'email').orderBy(r.desc('timestamp')).run(conn).then(_db2['default'].toArray);
}

exports['default'] = { insert: insert, all: all, validate: validate };
module.exports = exports['default'];
//# sourceMappingURL=model.js.map