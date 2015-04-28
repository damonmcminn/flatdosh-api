'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = errorHandler;
var CODES = {
  AuthError: 401
};

function errorHandler(err, req, res, next) {

  console.log(err);
  var message = err.message;
  var name = err.name;

  res.status(CODES[name] || 400).json({ message: message, name: name });
}

module.exports = exports['default'];
//# sourceMappingURL=index.js.map