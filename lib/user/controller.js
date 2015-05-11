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

var _log = require('../log');

var _log2 = _interopRequireDefault(_log);

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
      _log2['default'].info({ registration_attempt: email });
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
//# sourceMappingURL=data:application/json;base64,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LEVBQUMsUUFBUSxFQUFSLFFBQVEsRUFBRSxJQUFJLEVBQUosSUFBSSxFQUFDIiwiZmlsZSI6InVzZXIvY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Um91dGVyfSBmcm9tICdleHByZXNzJztcbmltcG9ydCBVc2VyIGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtpc0Vycm9yfSBmcm9tICdqcy10eXBlLWNoZWNrJztcbmltcG9ydCB7Z3JvdXB9IGZyb20gJ3BhcnNlLWNvbmZpZyc7XG5pbXBvcnQgbG9nIGZyb20gJy4uL2xvZyc7XG5cbmNvbnN0IHJlZ2lzdGVyID0gUm91dGVyKCk7XG5jb25zdCBpbmZvID0gUm91dGVyKCk7XG5cbi8vIG5vdCBpbiB1c2VcbmZ1bmN0aW9uIGZpbmRBbGwocmVxLCByZXMsIG5leHQpIHtcblxuICBVc2VyLmFsbCgpLnRoZW4odXNlcnMgPT4ge1xuICAgIHJlcy5qc29uKHVzZXJzKTtcbiAgfSk7XG5cbn1cblxuZnVuY3Rpb24gaW5zZXJ0KHJlcSwgcmVzLCBuZXh0KSB7XG5cbiAgLy8gbG9naWNcbiAgLy8gc2FtZSBhcyByZWdpc3RlciBwYWdlLCBidXQgd2l0aCBleHRyYSBmaWVsZCBmb3IgZ3JvdXAgbmFtZVxuICAvLyBjcmVhdGUgZ3JvdXAsIHdpdGggcHJpbWFyeSBjb250YWN0IGVtYWlsIChncm91cCBjb25zZW5zdXMgYWxsb3dzIGNoYW5nZSlcbiAgLy8gY3JlYXRlIHVzZXJcbiAgLy8gcmV0dXJuIHRva2VuXG4gIC8vIGNhcnJ5IG9uXG4gIC8vcmVxLmJvZHkuZ3JvdXAgPSBncm91cDtcblxuICBsZXQgcyA9IHtcbiAgICAnZGFtb25ybWNtaW5uQGdtYWlsLmNvbSc6ICdzYXJhaC5yLm0uZ2lic29uQGdtYWlsLmNvbScsXG4gICAgJ3NhcmFoLnIubS5naWJzb25AZ21haWwuY29tJzogJ2RhbW9ucm1jbWlubkBnbWFpbC5jb20nXG4gIH07XG5cbiAgbGV0IHtlbWFpbCwgbmFtZSwgcGFzc3dvcmR9ID0gcmVxLmJvZHk7XG4gIGxldCBzaGFyZWQgPSBzW2VtYWlsXTtcblxuICByZXR1cm4gVXNlci5pbkdyb3VwKGVtYWlsKS50aGVuKGdyb3VwcyA9PiB7XG5cbiAgICBsZXQgbm90SW5Hcm91cCA9IGdyb3Vwcy5sZW5ndGggPT09IDA7XG5cbiAgICBpZiAobm90SW5Hcm91cCkge1xuICAgICAgbG9nLmluZm8oe3JlZ2lzdHJhdGlvbl9hdHRlbXB0OiBlbWFpbH0pO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAzKS5qc29uKHttZXNzYWdlOiAnWW91IG5lZWQgYW4gaW52aXRlJywgZW1haWx9KTtcbiAgICB9XG5cbiAgICBsZXQgdXNlciA9IHtncm91cHMsIGVtYWlsLCBuYW1lLCBwYXNzd29yZCwgc2hhcmVkfTtcblxuICAgIHVzZXIgPSBVc2VyLnZhbGlkYXRlKHVzZXIpO1xuXG4gICAgcmV0dXJuIGlzRXJyb3IodXNlcikgPyBuZXh0KHVzZXIpIDogXG4gICAgICBVc2VyLmluc2VydCh1c2VyKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIHJldHVybiByZXN1bHQuZXJyb3JzID09PSAwID8gcmVzLnNlbmRTdGF0dXMoMjAwKSA6IHJlcy5zdGF0dXMoNDAwKS5qc29uKHttZXNzYWdlOiAnRW1haWwgYWxyZWFkeSBleGlzdHMnfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVyciA9PiBuZXh0KGVycikpO1xuXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBmaW5kKHJlcSwgcmVzLCBuZXh0KSB7XG5cbiAgZGVsZXRlIHJlcS51c2VyLnBhc3N3b3JkO1xuICByZXMuanNvbihyZXEudXNlcik7XG59XG5cbi8vcm91dGVyLmdldCgnLycsIGZpbmRBbGwpO1xuXG5pbmZvLmdldCgnLycsIGZpbmQpO1xucmVnaXN0ZXIucG9zdCgnLycsIGluc2VydCk7XG5cbmV4cG9ydCBkZWZhdWx0IHtyZWdpc3RlciwgaW5mb307XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=