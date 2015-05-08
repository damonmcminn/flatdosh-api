'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _jsTypeCheck = require('js-type-check');

var _parseConfig = require('parse-config');

var register = _express.Router();
var info = _express.Router();

// not in use
function findAll(req, res, next) {

  _model2['default'].all().then(function (users) {
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

  return _model2['default'].inGroup(email).then(function (groups) {

    var notInGroup = groups.length === 0;

    if (notInGroup) {
      return res.status(403).json({ message: 'You need an invite', email: email });
    }

    var user = { groups: groups, email: email, name: name, password: password, shared: shared };

    user = _model2['default'].validate(user);

    return _jsTypeCheck.isError(user) ? next(user) : _model2['default'].insert(user).then(function (result) {
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
//# sourceMappingURL=data:application/json;base64,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LCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JvdXRlcn0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgVXNlciBmcm9tICcuL21vZGVsJztcbmltcG9ydCB7aXNFcnJvcn0gZnJvbSAnanMtdHlwZS1jaGVjayc7XG5pbXBvcnQge2dyb3VwfSBmcm9tICdwYXJzZS1jb25maWcnO1xuXG5jb25zdCByZWdpc3RlciA9IFJvdXRlcigpO1xuY29uc3QgaW5mbyA9IFJvdXRlcigpO1xuXG4vLyBub3QgaW4gdXNlXG5mdW5jdGlvbiBmaW5kQWxsKHJlcSwgcmVzLCBuZXh0KSB7XG5cbiAgVXNlci5hbGwoKS50aGVuKHVzZXJzID0+IHtcbiAgICByZXMuanNvbih1c2Vycyk7XG4gIH0pO1xuXG59XG5cbmZ1bmN0aW9uIGluc2VydChyZXEsIHJlcywgbmV4dCkge1xuXG4gIC8vIGxvZ2ljXG4gIC8vIHNhbWUgYXMgcmVnaXN0ZXIgcGFnZSwgYnV0IHdpdGggZXh0cmEgZmllbGQgZm9yIGdyb3VwIG5hbWVcbiAgLy8gY3JlYXRlIGdyb3VwLCB3aXRoIHByaW1hcnkgY29udGFjdCBlbWFpbCAoZ3JvdXAgY29uc2Vuc3VzIGFsbG93cyBjaGFuZ2UpXG4gIC8vIGNyZWF0ZSB1c2VyXG4gIC8vIHJldHVybiB0b2tlblxuICAvLyBjYXJyeSBvblxuICAvL3JlcS5ib2R5Lmdyb3VwID0gZ3JvdXA7XG5cbiAgbGV0IHMgPSB7XG4gICAgJ2RhbW9ucm1jbWlubkBnbWFpbC5jb20nOiAnc2FyYWguci5tLmdpYnNvbkBnbWFpbC5jb20nLFxuICAgICdzYXJhaC5yLm0uZ2lic29uQGdtYWlsLmNvbSc6ICdkYW1vbnJtY21pbm5AZ21haWwuY29tJ1xuICB9O1xuXG4gIGxldCB7ZW1haWwsIG5hbWUsIHBhc3N3b3JkfSA9IHJlcS5ib2R5O1xuICBsZXQgc2hhcmVkID0gc1tlbWFpbF07XG5cbiAgcmV0dXJuIFVzZXIuaW5Hcm91cChlbWFpbCkudGhlbihncm91cHMgPT4ge1xuXG4gICAgbGV0IG5vdEluR3JvdXAgPSBncm91cHMubGVuZ3RoID09PSAwO1xuXG4gICAgaWYgKG5vdEluR3JvdXApIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMykuanNvbih7bWVzc2FnZTogJ1lvdSBuZWVkIGFuIGludml0ZScsIGVtYWlsfSk7XG4gICAgfVxuXG4gICAgbGV0IHVzZXIgPSB7Z3JvdXBzLCBlbWFpbCwgbmFtZSwgcGFzc3dvcmQsIHNoYXJlZH07XG5cbiAgICB1c2VyID0gVXNlci52YWxpZGF0ZSh1c2VyKTtcblxuICAgIHJldHVybiBpc0Vycm9yKHVzZXIpID8gbmV4dCh1c2VyKSA6IFxuICAgICAgVXNlci5pbnNlcnQodXNlcikudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICByZXR1cm4gcmVzdWx0LmVycm9ycyA9PT0gMCA/IHJlcy5zZW5kU3RhdHVzKDIwMCkgOiByZXMuc3RhdHVzKDQwMCkuanNvbih7bWVzc2FnZTogJ0VtYWlsIGFscmVhZHkgZXhpc3RzJ30pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnIgPT4gbmV4dChlcnIpKTtcblxuICB9KTtcbn1cblxuZnVuY3Rpb24gZmluZChyZXEsIHJlcywgbmV4dCkge1xuXG4gIGRlbGV0ZSByZXEudXNlci5wYXNzd29yZDtcbiAgcmVzLmpzb24ocmVxLnVzZXIpO1xufVxuXG4vL3JvdXRlci5nZXQoJy8nLCBmaW5kQWxsKTtcblxuaW5mby5nZXQoJy8nLCBmaW5kKTtcbnJlZ2lzdGVyLnBvc3QoJy8nLCBpbnNlcnQpO1xuXG5leHBvcnQgZGVmYXVsdCB7cmVnaXN0ZXIsIGluZm99O1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9