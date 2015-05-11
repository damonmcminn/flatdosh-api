'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = findUser;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _authUtilities = require('auth-utilities');

var _authUtilities2 = _interopRequireDefault(_authUtilities);

var _authMiddleware = require('auth-middleware');

var _authMiddleware2 = _interopRequireDefault(_authMiddleware);

var _simpleErrorFactory = require('simple-error-factory');

var _simpleErrorFactory2 = _interopRequireDefault(_simpleErrorFactory);

var _log = require('../log');

var _log2 = _interopRequireDefault(_log);

var _userModel = require('../user/model');

var _userModel2 = _interopRequireDefault(_userModel);

var _hash2 = require('./hash');

var _hash3 = _interopRequireDefault(_hash2);

var parseBasic = _authUtilities2['default'].parseHeader('basic');
var AuthError = _simpleErrorFactory2['default']('auth');

function findUser(req) {

  var TODAY = Date.now();
  var THREE_MONTHS = TODAY + 365 * 24 * 60 * 60 * 1000 / 4;
  var header = req.headers.authorization;

  // undefined if false
  var parsed = parseBasic(header);
  var user = parsed.user;
  var password = parsed.password;

  // logging base64 encoded password here... possibly
  _log2['default'].info({ login_attempt: user || header });

  if (!parsed) return Promise.reject(AuthError('Couldn\'t parse: ' + header));

  return _userModel2['default'].get(user).then(function (result) {

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGgvZmluZFVzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7cUJBVXdCLFFBQVE7Ozs7NkJBVlgsZ0JBQWdCOzs7OzhCQUNwQixpQkFBaUI7Ozs7a0NBQ1Qsc0JBQXNCOzs7O21CQUMvQixRQUFROzs7O3lCQUNQLGVBQWU7Ozs7cUJBQ2YsUUFBUTs7OztBQUV6QixJQUFNLFVBQVUsR0FBRywyQkFBUyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDakQsSUFBTSxTQUFTLEdBQUcsZ0NBQWEsTUFBTSxDQUFDLENBQUM7O0FBRXhCLFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRTs7QUFFcEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3pCLE1BQU0sWUFBWSxHQUFHLEtBQUssR0FBRyxBQUFDLEdBQUcsR0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFDLEVBQUUsR0FBQyxJQUFJLEdBQUUsQ0FBQyxDQUFDO0FBQ25ELE1BQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDOzs7QUFHdkMsTUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO01BQzNCLElBQUksR0FBYyxNQUFNLENBQXhCLElBQUk7TUFBRSxRQUFRLEdBQUksTUFBTSxDQUFsQixRQUFROzs7QUFHbkIsbUJBQUksSUFBSSxDQUFDLEVBQUMsYUFBYSxFQUFFLElBQUksSUFBSSxNQUFNLEVBQUMsQ0FBQyxDQUFDOztBQUUxQyxNQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLHVCQUFvQixNQUFNLENBQUcsQ0FBQyxDQUFDOztBQUUzRSxTQUFPLHVCQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNLEVBQUk7O0FBRW5DLFFBQUksTUFBTSxFQUFFO1VBQ0wsRUFBRSxHQUEwQixNQUFNLENBQWxDLEVBQUU7VUFBRSxLQUFJLEdBQW9CLE1BQU0sQ0FBOUIsSUFBSTtVQUFFLE1BQU0sR0FBWSxNQUFNLENBQXhCLE1BQU07VUFBRSxNQUFNLEdBQUksTUFBTSxDQUFoQixNQUFNOztBQUU3QixVQUFJLE9BQU8sR0FBRztBQUNaLFVBQUUsRUFBRixFQUFFO0FBQ0YsV0FBRyxFQUFFLFlBQVk7T0FDbEIsQ0FBQzs7QUFFRixVQUFJLEtBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO0FBQzNCLFVBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQztBQUNyQixVQUFJLElBQUksR0FBRyxFQUFDLEVBQUUsRUFBRixFQUFFLEVBQUUsSUFBSSxFQUFKLEtBQUksRUFBRSxNQUFNLEVBQU4sTUFBTSxFQUFFLE1BQU0sRUFBTixNQUFNLEVBQUMsQ0FBQzs7QUFFdEMsYUFBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUMsT0FBTyxFQUFQLE9BQU8sRUFBRSxJQUFJLEVBQUosS0FBSSxFQUFFLEtBQUssRUFBTCxLQUFLLEVBQUUsSUFBSSxFQUFKLElBQUksRUFBQyxDQUFDLENBQUM7S0FDdEQsTUFBTTtBQUNMLGFBQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0tBQ3BEO0dBRUYsQ0FBQyxTQUNJLENBQUMsVUFBQSxHQUFHO1dBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7R0FBQSxDQUFDLENBQUM7Q0FFcEMiLCJmaWxlIjoiYXV0aC9maW5kVXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhdXRoVXRpbCBmcm9tICdhdXRoLXV0aWxpdGllcyc7XG5pbXBvcnQgYXV0aCBmcm9tICdhdXRoLW1pZGRsZXdhcmUnO1xuaW1wb3J0IEVycm9yRmFjdG9yeSBmcm9tICdzaW1wbGUtZXJyb3ItZmFjdG9yeSc7XG5pbXBvcnQgbG9nIGZyb20gJy4uL2xvZyc7XG5pbXBvcnQgVXNlciBmcm9tICcuLi91c2VyL21vZGVsJztcbmltcG9ydCBoYXNoIGZyb20gJy4vaGFzaCc7XG5cbmNvbnN0IHBhcnNlQmFzaWMgPSBhdXRoVXRpbC5wYXJzZUhlYWRlcignYmFzaWMnKTtcbmNvbnN0IEF1dGhFcnJvciA9IEVycm9yRmFjdG9yeSgnYXV0aCcpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaW5kVXNlcihyZXEpIHtcblxuICBjb25zdCBUT0RBWSA9IERhdGUubm93KCk7XG4gIGNvbnN0IFRIUkVFX01PTlRIUyA9IFRPREFZICsgKDM2NSoyNCo2MCo2MCoxMDAwKS80O1xuICBsZXQgaGVhZGVyID0gcmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbjtcblxuICAvLyB1bmRlZmluZWQgaWYgZmFsc2VcbiAgbGV0IHBhcnNlZCA9IHBhcnNlQmFzaWMoaGVhZGVyKTtcbiAgbGV0IHt1c2VyLCBwYXNzd29yZH0gPSBwYXJzZWQ7XG5cbiAgLy8gbG9nZ2luZyBiYXNlNjQgZW5jb2RlZCBwYXNzd29yZCBoZXJlLi4uIHBvc3NpYmx5XG4gIGxvZy5pbmZvKHtsb2dpbl9hdHRlbXB0OiB1c2VyIHx8IGhlYWRlcn0pO1xuXG4gIGlmICghcGFyc2VkKSByZXR1cm4gUHJvbWlzZS5yZWplY3QoQXV0aEVycm9yKGBDb3VsZG4ndCBwYXJzZTogJHtoZWFkZXJ9YCkpO1xuXG4gIHJldHVybiBVc2VyLmdldCh1c2VyKS50aGVuKHJlc3VsdCA9PiB7XG5cbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICBsZXQge2lkLCBuYW1lLCBncm91cHMsIHNoYXJlZH0gPSByZXN1bHQ7XG5cbiAgICAgIGxldCBwYXlsb2FkID0ge1xuICAgICAgICBpZCxcbiAgICAgICAgZXhwOiBUSFJFRV9NT05USFNcbiAgICAgIH07XG5cbiAgICAgIGxldCBoYXNoID0gcmVzdWx0LnBhc3N3b3JkO1xuICAgICAgbGV0IHBsYWluID0gcGFzc3dvcmQ7XG4gICAgICBsZXQgZGF0YSA9IHtpZCwgbmFtZSwgc2hhcmVkLCBncm91cHN9O1xuXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtwYXlsb2FkLCBoYXNoLCBwbGFpbiwgZGF0YX0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoQXV0aEVycm9yKCdVc2VyIG5vdCBmb3VuZCcpKTtcbiAgICB9XG5cbiAgfSlcbiAgLmNhdGNoKGVyciA9PiBQcm9taXNlLnJlamVjdChlcnIpKTtcblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9