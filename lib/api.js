'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _parseConfig = require('parse-config');

var _parseConfig2 = _interopRequireDefault(_parseConfig);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

var _ = require('./404');

var _2 = _interopRequireDefault(_);

var _cors = require('./cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

// controllers

var _userController = require('./user/controller');

var _userController2 = _interopRequireDefault(_userController);

var _expenseController = require('./expense/controller');

var _expenseController2 = _interopRequireDefault(_expenseController);

var _balanceController = require('./balance/controller');

var _balanceController2 = _interopRequireDefault(_balanceController);

var _groupController = require('./group/controller');

var _groupController2 = _interopRequireDefault(_groupController);

var api = _express2['default']();

exports['default'] = api;

api.initialise = function () {

  return new Promise(function (resolve, reject) {

    api.listen(_parseConfig2['default'].port, function (err) {
      if (!err) {
        _log2['default'].info('Listening on ' + _parseConfig2['default'].port);
        Promise.resolve();
      } else {
        Promise.reject(err);
      }
    });
  });
};

api.use(_cors2['default']);
api.use(_bodyParser.json());

api.use('/register', _userController2['default'].register);
api.use('/login', _auth2['default'].password);

api.use(_auth2['default'].token);

api.use('/expense', _expenseController2['default']);
api.use('/balance', _balanceController2['default']);
api.use('/settings', _userController2['default'].info);
api.use('/members', _groupController2['default']);

api.use(_2['default']);
api.use('*', _error2['default']);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozt1QkFBb0IsU0FBUzs7OztvQkFDWixRQUFROzs7OzJCQUNOLGNBQWM7Ozs7bUJBQ2pCLE9BQU87Ozs7cUJBQ0UsU0FBUzs7OztnQkFDYixPQUFPOzs7O29CQUNYLFFBQVE7Ozs7MEJBRU4sYUFBYTs7Ozs4QkFHZixtQkFBbUI7Ozs7aUNBQ2hCLHNCQUFzQjs7OztpQ0FDdEIsc0JBQXNCOzs7OytCQUN4QixvQkFBb0I7Ozs7QUFFdEMsSUFBTSxHQUFHLEdBQUcsc0JBQVMsQ0FBQzs7cUJBRVAsR0FBRzs7QUFFbEIsR0FBRyxDQUFDLFVBQVUsR0FBRyxZQUFXOztBQUUxQixTQUFPLElBQUksT0FBTyxDQUFDLFVBQVMsT0FBTyxFQUFFLE1BQU0sRUFBRTs7QUFFM0MsT0FBRyxDQUFDLE1BQU0sQ0FBQyx5QkFBTyxJQUFJLEVBQUUsVUFBUyxHQUFHLEVBQUU7QUFDcEMsVUFBSSxDQUFDLEdBQUcsRUFBRTtBQUNSLHlCQUFJLElBQUksbUJBQWlCLHlCQUFPLElBQUksQ0FBRyxDQUFDO0FBQ3hDLGVBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztPQUNuQixNQUFNO0FBQ0wsZUFBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztPQUNyQjtLQUNGLENBQUMsQ0FBQztHQUVKLENBQUMsQ0FBQztDQUNKLENBQUE7O0FBRUQsR0FBRyxDQUFDLEdBQUcsbUJBQU0sQ0FBQztBQUNkLEdBQUcsQ0FBQyxHQUFHLENBQUMsWUE3QkEsSUFBSSxFQTZCRSxDQUFDLENBQUM7O0FBR2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLDRCQUFLLFFBQVEsQ0FBQyxDQUFDO0FBQ3BDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLGtCQUFLLFFBQVEsQ0FBQyxDQUFDOztBQUVqQyxHQUFHLENBQUMsR0FBRyxDQUFDLGtCQUFLLEtBQUssQ0FBQyxDQUFDOztBQUVwQixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsaUNBQVUsQ0FBQztBQUM3QixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsaUNBQVUsQ0FBQztBQUM3QixHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSw0QkFBSyxJQUFJLENBQUMsQ0FBQztBQUNoQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsK0JBQVEsQ0FBQzs7QUFFM0IsR0FBRyxDQUFDLEdBQUcsZUFBVSxDQUFDO0FBQ2xCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxxQkFBZSxDQUFDIiwiZmlsZSI6ImFwaS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGF1dGggZnJvbSAnLi9hdXRoJztcbmltcG9ydCBDT05GSUcgZnJvbSAncGFyc2UtY29uZmlnJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IGVycm9ySGFuZGxlciBmcm9tICcuL2Vycm9yJztcbmltcG9ydCByb3V0ZTQwNCBmcm9tICcuLzQwNCc7XG5pbXBvcnQgQ09SUyBmcm9tICcuL2NvcnMnO1xuXG5pbXBvcnQge2pzb259IGZyb20gJ2JvZHktcGFyc2VyJztcblxuLy8gY29udHJvbGxlcnNcbmltcG9ydCBVc2VyIGZyb20gJy4vdXNlci9jb250cm9sbGVyJztcbmltcG9ydCBFeHBlbnNlIGZyb20gJy4vZXhwZW5zZS9jb250cm9sbGVyJztcbmltcG9ydCBCYWxhbmNlIGZyb20gJy4vYmFsYW5jZS9jb250cm9sbGVyJztcbmltcG9ydCBHcm91cCBmcm9tICcuL2dyb3VwL2NvbnRyb2xsZXInO1xuXG5jb25zdCBhcGkgPSBleHByZXNzKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFwaTtcblxuYXBpLmluaXRpYWxpc2UgPSBmdW5jdGlvbigpIHtcblxuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICBhcGkubGlzdGVuKENPTkZJRy5wb3J0LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgIGlmICghZXJyKSB7XG4gICAgICAgIGxvZy5pbmZvKGBMaXN0ZW5pbmcgb24gJHtDT05GSUcucG9ydH1gKTtcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH0pO1xufVxuXG5hcGkudXNlKENPUlMpO1xuYXBpLnVzZShqc29uKCkpO1xuXG5cbmFwaS51c2UoJy9yZWdpc3RlcicsIFVzZXIucmVnaXN0ZXIpO1xuYXBpLnVzZSgnL2xvZ2luJywgYXV0aC5wYXNzd29yZCk7XG5cbmFwaS51c2UoYXV0aC50b2tlbik7XG5cbmFwaS51c2UoJy9leHBlbnNlJywgRXhwZW5zZSk7XG5hcGkudXNlKCcvYmFsYW5jZScsIEJhbGFuY2UpO1xuYXBpLnVzZSgnL3NldHRpbmdzJywgVXNlci5pbmZvKTtcbmFwaS51c2UoJy9tZW1iZXJzJywgR3JvdXApO1xuXG5hcGkudXNlKHJvdXRlNDA0KTtcbmFwaS51c2UoJyonLCBlcnJvckhhbmRsZXIpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9