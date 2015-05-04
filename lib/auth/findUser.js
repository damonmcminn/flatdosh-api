'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = findUser;

var _authUtil = require('auth-utilities');

var _authUtil2 = _interopRequireWildcard(_authUtil);

var _auth = require('auth-middleware');

var _auth2 = _interopRequireWildcard(_auth);

var _ErrorFactory = require('simple-error-factory');

var _ErrorFactory2 = _interopRequireWildcard(_ErrorFactory);

var _log = require('../log');

var _log2 = _interopRequireWildcard(_log);

var _User = require('../user/model');

var _User2 = _interopRequireWildcard(_User);

var _hash2 = require('./hash');

var _hash3 = _interopRequireWildcard(_hash2);

var parseBasic = _authUtil2['default'].parseHeader('basic');
var AuthError = _ErrorFactory2['default']('auth');

function findUser(req) {

  var TODAY = Date.now();
  var THREE_MONTHS = TODAY + 365 * 24 * 60 * 60 * 1000 / 4;
  var header = req.headers.authorization;

  // undefined if false
  var parsed = parseBasic(header);
  var user = parsed.user;
  var password = parsed.password;

  // logging base64 encoded password here... possibly
  _log2['default'].info({ login: user || header });

  if (!parsed) {
    return Promise.reject(AuthError('Couldn\'t parse: ' + header));
  }return _User2['default'].get(user).then(function (result) {

    if (result) {
      var id = result.id;
      var _name = result.name;
      var groups = result.groups;
      var shared = result.shared;

      var payload = {
        id: id,
        exp: THREE_MONTHS
      };

      var _hash = result.password;
      var plain = password;
      var data = { id: id, name: _name, shared: shared, groups: groups };

      return Promise.resolve({ payload: payload, hash: _hash, plain: plain, data: data });
    } else {
      return Promise.reject(AuthError('User not found'));
    }
  })['catch'](function (err) {
    return Promise.reject(err);
  });
}

module.exports = exports['default'];
//# sourceMappingURL=findUser.js.map