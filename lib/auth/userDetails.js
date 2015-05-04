'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _User = require('../user/model');

var _User2 = _interopRequireWildcard(_User);

exports['default'] = function (payload) {

  return _User2['default'].get(payload.id);
};

module.exports = exports['default'];
//# sourceMappingURL=userDetails.js.map