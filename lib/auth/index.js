'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _findUser = require('./findUser');

var _findUser2 = _interopRequireWildcard(_findUser);

var _express = require('express');

var _express2 = _interopRequireWildcard(_express);

var _middleware = require('auth-middleware');

var _middleware2 = _interopRequireWildcard(_middleware);

var _secret$rounds = require('parse-config');

var _util = require('auth-utilities');

var _util2 = _interopRequireWildcard(_util);

var password = _express2['default'].Router();
var token = _express2['default'].Router();

var _util$password = _util2['default'].password(_secret$rounds.rounds);

var hash = _util$password.hash;

// returned validation middleware
password.post('/', _middleware2['default'].password(_findUser2['default'], _secret$rounds.secret, _secret$rounds.rounds));
token.use('/', _middleware2['default'].token(_secret$rounds.secret));

exports['default'] = { password: password, token: token };
module.exports = exports['default'];
//# sourceMappingURL=index.js.map