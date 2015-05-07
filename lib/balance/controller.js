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

router.get('/:group', getBalances);

function getBalances(req, res, next) {
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

        // always round up to closest 1p
        var each = Math.ceil(total / results.length * 100) / 100;

        balances = results.map(function (result) {

          var owe = each - result.amount;
          var owed = result.amount - each;

          return {
            name: result.name,
            balance: result.amount,
            each: each,
            owe: owe,
            owed: owed
          };
        }).sort(function (a, b) {
          return a.name.toLowerCase() > b.name.toLowerCase();
        });
      })();
    }
    res.json(balances || []);
  });
}
module.exports = exports['default'];
//# sourceMappingURL=controller.js.map