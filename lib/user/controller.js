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
var info = _Router.Router();

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
  //req.body.group = group;

  var s = {
    'damonrmcminn@gmail.com': 'sarah.r.m.gibson@gmail.com',
    'sarah.r.m.gibson@gmail.com': 'damonrmcminn@gmail.com'
  };

  var _req$body = req.body;
  var email = _req$body.email;
  var name = _req$body.name;
  var password = _req$body.password;

  var shared = s[email];

  return _User2['default'].inGroup(email).then(function (groups) {

    var notInGroup = groups.length === 0;

    if (notInGroup) {
      return res.status(403).json({ message: 'bad email', email: email });
    }

    var user = { groups: groups, email: email, name: name, password: password, shared: shared };

    user = _User2['default'].validate(user);

    return _isError.isError(user) ? next(user) : _User2['default'].insert(user).then(function (result) {
      return result.errors === 0 ? res.sendStatus(200) : res.status(400).json({ message: 'Email already exists' });
    })['catch'](function (err) {
      return next(err);
    });
  });
}

function find(req, res, next) {

  delete req.user.password;
  res.json(req.user);
}

//router.get('/', findAll);

info.get('/', find);
register.post('/', insert);

exports['default'] = { register: register, info: info };
module.exports = exports['default'];
//# sourceMappingURL=controller.js.map