'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Router = require('express');

var _Expense = require('../expense/model');

var _Expense2 = _interopRequireWildcard(_Expense);

var _isError = require('js-type-check');

var _r$conn = require('../db');

var router = _Router.Router();

exports['default'] = router;

function getBalances(req, res, next) {

  _r$conn.r.table('users').outerJoin(_r$conn.r.table('expenses'), function (user, expense) {
    return user('id').eq(expense('email'));
  }).zip().map(function (doc) {
    return doc.merge({ amt: doc('amount')['default'](0) });
  }).group('name').sum('amt').ungroup().map(function (x) {
    return { name: x('group'), amount: x('reduction') };
  }).run(_r$conn.conn).then(function (results) {

    var balances = undefined;

    if (results) {
      (function () {
        var total = results.map(function (result) {
          return result.amount;
        }).reduce(function (prev, curr) {
          return prev + curr;
        });

        var largest = results.map(function (result) {
          return result.amount;
        }).reduce(function (prev, curr) {
          return prev > curr ? prev : curr;
        });

        var each = total / results.length;
        var largestCredit = results.map(function (result) {
          return result.amount - each;
        }).reduce(function (p, c) {
          return p > c ? p : c;
        });

        balances = results.map(function (result) {
          return {
            name: result.name,
            Oldbalance: +(result.amount - largest).toFixed(2),
            balance: +(result.amount - each - largestCredit).toFixed(2),
            behind: result.amount - each
          };
        })
        // empty if not balances, let's show them all for the timebeing
        //.filter(result => result.balance < 0)
        .sort(function (a, b) {
          return a.name.toLowerCase() > b.name.toLowerCase();
        });
      })();
    }
    res.json(balances || []);
  });
}

router.get('/', getBalances);
module.exports = exports['default'];
//# sourceMappingURL=controller.js.map