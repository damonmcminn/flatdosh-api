'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Router = require('express');

var _User = require('./model');

var _User2 = _interopRequireWildcard(_User);

var _isError = require('js-type-check');

var _group = require('parse-config');

var register = _Router.Router();

// not in use
function findAll(req, res, next) {

  _User2['default'].all().then(function (users) {
    res.json(users);
  });
}

function insert(req, res, next) {

  // logic
  // same as register page, but with extra field for group name
  // create group, with primary contact email (group consensus allows change)
  // create user
  // return token
  // carry on
  req.body.group = _group.group;

  var user = _User2['default'].validate(req.body);

  return _isError.isError(user) ? next(user) : _User2['default'].insert(user).then(function (result) {
    return result.errors === 0 ? res.json(result) : next(result);
  })['catch'](function (err) {
    return next(err);
  });
}

// not in use
function find(req, res, next) {

  var email = req.params.email;

  _User2['default'].get(email).then(function (user) {
    user ? res.json(user) : res.status(404).json({ message: 'User not found' });
  })['catch'](function (err) {
    return next(err);
  });
}

//router.get('/', findAll);

//find.get('/:email', find);
register.post('/', insert);

exports['default'] = { register: register };
module.exports = exports['default'];
//# sourceMappingURL=controller.js.map