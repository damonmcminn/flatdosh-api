'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _bunyan = require('bunyan');

var _bunyan2 = _interopRequireWildcard(_bunyan);

var _CONFIG = require('parse-config');

var _CONFIG2 = _interopRequireWildcard(_CONFIG);

var Logger = _bunyan2['default'].createLogger({ name: _CONFIG2['default'].name });
exports['default'] = Logger;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map