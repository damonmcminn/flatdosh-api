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

var _Group = require('../group/model');

var _Group2 = _interopRequireWildcard(_Group);

var router = _Router.Router();

exports['default'] = router;

function negativeBalances(req, res, next) {
  var groups = req.user.groups;
  var group = req.params.group;

  // validate group is in groups i.e. allowed

  _Group2['default'].members(group).outerJoin(_r$conn.r.table('expenses').filter(_r$conn.r.not(_r$conn.r.row.hasFields('deleted'))), function (user, expense) {
    return user('email').eq(expense('email'));
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
            //Oldbalance: +((result.amount - largest).toFixed(2)),
            balance: +(result.amount - each - largestCredit).toFixed(2) };
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

function actualBalances(req, res, next) {
  var groups = req.user.groups;
  var group = req.params.group;

  // validate group is in groups i.e. allowed

  _Group2['default'].members(group).outerJoin(_r$conn.r.table('expenses').filter(_r$conn.r.not(_r$conn.r.row.hasFields('deleted'))), function (user, expense) {
    return user('email').eq(expense('email'));
  }).zip().map(function (doc) {
    return doc.merge({ amt: doc('amount')['default'](0) });
  }).group('name').sum('amt').ungroup().map(function (x) {
    return { name: x('group'), balance: x('reduction') };
  }).run(_r$conn.conn).then(function (results) {
    results.sort(function (a, b) {
      return a.name.toLowerCase() > b.name.toLowerCase();
    });
    res.json(results || []);
  });
}
router.get('/:group', negativeBalances);
module.exports = exports['default'];

//behind: result.amount - each
//# sourceMappingURL=controller.js.map