'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _findUser = require('./findUser');

var _findUser2 = _interopRequireDefault(_findUser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authMiddleware = require('auth-middleware');

var _authMiddleware2 = _interopRequireDefault(_authMiddleware);

var _parseConfig = require('parse-config');

var _authUtilities = require('auth-utilities');

var _authUtilities2 = _interopRequireDefault(_authUtilities);

var _userDetails = require('./userDetails');

var _userDetails2 = _interopRequireDefault(_userDetails);

var password = _express2['default'].Router();
var token = _express2['default'].Router();

var _util$password = _authUtilities2['default'].password(_parseConfig.rounds);

var hash = _util$password.hash;

// returned validation middleware
password.post('/', _authMiddleware2['default'].password(_findUser2['default'], _parseConfig.secret, _parseConfig.rounds));
token.use('/', _authMiddleware2['default'].token(_parseConfig.secret, _userDetails2['default']));

exports['default'] = { password: password, token: token };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGgvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7d0JBQXFCLFlBQVk7Ozs7dUJBQ2IsU0FBUzs7Ozs4QkFDTixpQkFBaUI7Ozs7MkJBQ1gsY0FBYzs7NkJBQzFCLGdCQUFnQjs7OzsyQkFDVCxlQUFlOzs7O0FBRXZDLElBQU0sUUFBUSxHQUFHLHFCQUFRLE1BQU0sRUFBRSxDQUFDO0FBQ2xDLElBQU0sS0FBSyxHQUFHLHFCQUFRLE1BQU0sRUFBRSxDQUFDOztxQkFDaEIsMkJBQUssUUFBUSxjQU5aLE1BQU0sQ0FNYzs7SUFBN0IsSUFBSSxrQkFBSixJQUFJOzs7QUFHWCxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSw0QkFBVyxRQUFRLHFDQVQ5QixNQUFNLGVBQUUsTUFBTSxDQVMwQyxDQUFDLENBQUM7QUFDbEUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsNEJBQVcsS0FBSyxjQVZ2QixNQUFNLDJCQVVzQyxDQUFDLENBQUM7O3FCQUV2QyxFQUFDLFFBQVEsRUFBUixRQUFRLEVBQUUsS0FBSyxFQUFMLEtBQUssRUFBQyIsImZpbGUiOiJhdXRoL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZpbmRVc2VyIGZyb20gJy4vZmluZFVzZXInO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgbWlkZGxld2FyZSBmcm9tICdhdXRoLW1pZGRsZXdhcmUnO1xuaW1wb3J0IHtzZWNyZXQsIHJvdW5kc30gZnJvbSAncGFyc2UtY29uZmlnJztcbmltcG9ydCB1dGlsIGZyb20gJ2F1dGgtdXRpbGl0aWVzJztcbmltcG9ydCB1c2VyRGV0YWlscyBmcm9tICcuL3VzZXJEZXRhaWxzJztcblxuY29uc3QgcGFzc3dvcmQgPSBleHByZXNzLlJvdXRlcigpO1xuY29uc3QgdG9rZW4gPSBleHByZXNzLlJvdXRlcigpO1xuY29uc3Qge2hhc2h9ID0gdXRpbC5wYXNzd29yZChyb3VuZHMpO1xuXG4vLyByZXR1cm5lZCB2YWxpZGF0aW9uIG1pZGRsZXdhcmVcbnBhc3N3b3JkLnBvc3QoJy8nLCBtaWRkbGV3YXJlLnBhc3N3b3JkKGZpbmRVc2VyLCBzZWNyZXQsIHJvdW5kcykpO1xudG9rZW4udXNlKCcvJywgbWlkZGxld2FyZS50b2tlbihzZWNyZXQsIHVzZXJEZXRhaWxzKSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtwYXNzd29yZCwgdG9rZW59O1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9