'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Router = require('express');

var _Expense = require('./model');

var _Expense2 = _interopRequireWildcard(_Expense);

var _isError = require('js-type-check');

var router = _Router.Router();

exports['default'] = router;

function findAll(req, res, next) {
  var group = req.user.group;

  _Expense2['default'].all(group).then(function (expenses) {
    res.json(expenses);
  });
}

function insert(req, res, next) {

  var people = [req.user.user, req.user.shared].filter(function (email) {
    return email;
  });
  var timestamp = new Date();
  var amount = req.body.amount / people.length;

  var expenses = people.map(function (email) {
    return {
      amount: amount,
      description: req.body.description,
      timestamp: timestamp,
      email: email,
      group: req.user.group
    };
  });

  return _isError.isError(_Expense2['default'].validate(expenses[0])) ? next(expenses[0]) : _Expense2['default'].insert(expenses).then(function (result) {
    return result.errors === 0 ? res.json(result) : next(result);
  })['catch'](function (err) {
    return next(err);
  });
}

router.get('/', findAll);
router.post('/', insert);
module.exports = exports['default'];
//# sourceMappingURL=controller.js.map