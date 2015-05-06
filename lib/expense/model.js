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
  return expenses.filter({ group: group })
  //.eqJoin('email', r.table('users'))
  .outerJoin(r.table('users'), function (expense, user) {
    return expense('email').eq(user('id'));
  }).without({ right: 'id' }) // need expense document id, not user id which is email
  .zip().map(function (expense) {
    return {
      amount: expense('amount'),
      deleted: expense('deleted')['default'](false),
      description: expense('description')['default']('NONE'),
      name: expense('name')['default'](expense('email')),
      user: expense('email'),
      id: expense('id'),
      timestamp: expense('timestamp'),
      creator: expense('creator'),
      shareId: expense('shareId')['default'](null)
    };
  }).orderBy(r.desc('timestamp')).run(conn).then(_db2['default'].toArray);
}

function destroy(user, expenseList) {

  return expenses.getAll(r.args(expenseList)).filter(r.or(r.row('email').eq(user), r.row('creator').eq(user))).update({ deleted: true }).run(conn);
}

exports['default'] = { insert: insert, all: all, validate: validate, destroy: destroy };
module.exports = exports['default'];
//# sourceMappingURL=model.js.map