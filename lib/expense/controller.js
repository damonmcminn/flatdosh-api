'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Router = require('express');

var _Expense = require('./model');

var _Expense2 = _interopRequireWildcard(_Expense);

var _isError = require('js-type-check');

var _uuid = require('node-uuid');

var _uuid2 = _interopRequireWildcard(_uuid);

var router = _Router.Router();

exports['default'] = router;

function findAll(req, res, next) {
  var group = req.params.group;

  _Expense2['default'].all(group).then(function (expenses) {
    res.json(expenses);
  });
}

function insert(req, res, next) {

  // need to check if spender in group
  var spender = req.body.spender;

  // user == the user
  // shared == the user with whom user shares a bank account
  var user = req.user.id;

  // saving expense on behalf of another member?
  var onBehalfOf = spender !== user && spender !== req.user.shared;

  // false, undefined or a members email
  var shared = onBehalfOf ? false : req.user.shared;

  // if share undefined|false, filter it from array
  var people = [user, shared].filter(function (email) {
    return email;
  });
  var timestamp = new Date();
  var amount = req.body.amount / people.length;

  // validate group against req.user.groups
  var group = req.body.group;

  var expenses = people.map(function (email) {
    return {
      amount: amount,
      creator: user,
      description: req.body.description,
      email: email,
      group: group,
      timestamp: timestamp
    };
  });

  var shareId = _uuid2['default'].v4();
  expenses.forEach(function (expense) {
    if (shared) {
      expense.shareId = shareId;
    }
    if (onBehalfOf) {
      expense.email = spender;
    }
  });

  console.log(expenses);

  var validatedExpense = _Expense2['default'].validate(expenses[0]);

  return _isError.isError(validatedExpense) ? next(validatedExpense) : _Expense2['default'].insert(expenses).then(function (result) {
    return result.errors === 0 ? res.json(result) : next(result);
  })
  // errors not handled above
  ['catch'](function (err) {
    return next(err);
  });
}

function destroy(req, res, next) {

  var user = req.user.id;
  var expenses = req.body;

  _Expense2['default'].destroy(user, expenses).then(function (result) {
    res.json({ deleted: expenses });
  })['catch'](next);
}

router.get('/:group', findAll);
router.post('/', insert);
router['delete']('/', destroy);
module.exports = exports['default'];
//# sourceMappingURL=controller.js.map