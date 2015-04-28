'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = errorHandler;

var _log = require('../log');

var _log2 = _interopRequireWildcard(_log);

var CODES = {
  AuthError: 401
};

function errorHandler(err, req, res, next) {
  var message = err.message;
  var name = err.name;

  _log2['default'].error(err);

  res.status(CODES[name] || 400).json({ message: message, name: name });
}

module.exports = exports['default'];
//# sourceMappingURL=index.js.map