'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireWildcard(_express);

var _auth = require('./auth');

var _auth2 = _interopRequireWildcard(_auth);

var _CONFIG = require('parse-config');

var _CONFIG2 = _interopRequireWildcard(_CONFIG);

var _log = require('./log');

var _log2 = _interopRequireWildcard(_log);

var _errorHandler = require('./error');

var _errorHandler2 = _interopRequireWildcard(_errorHandler);

var _route404 = require('./404');

var _route4042 = _interopRequireWildcard(_route404);

var _CORS = require('./cors');

var _CORS2 = _interopRequireWildcard(_CORS);

var _json = require('body-parser');

// controllers

var _User = require('./user/controller');

var _User2 = _interopRequireWildcard(_User);

var _Expense = require('./expense/controller');

var _Expense2 = _interopRequireWildcard(_Expense);

var _Balance = require('./balance/controller');

var _Balance2 = _interopRequireWildcard(_Balance);

var api = _express2['default']();

exports['default'] = api;

api.initialise = function () {

  return new Promise(function (resolve, reject) {

    api.listen(_CONFIG2['default'].port, function (err) {
      if (!err) {
        _log2['default'].info('Listening on ' + _CONFIG2['default'].port);
        Promise.resolve();
      } else {
        Promise.reject(err);
      }
    });
  });
};

api.use(_CORS2['default']);
api.use(_json.json());

api.use('/register', _User2['default'].register);
api.use('/login', _auth2['default'].password);

api.use(_auth2['default'].token);

api.use('/expense', _Expense2['default']);
api.use('/balance', _Balance2['default']);

api.use(_route4042['default']);
api.use('*', _errorHandler2['default']);
module.exports = exports['default'];
//# sourceMappingURL=api.js.map