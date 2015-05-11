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

var _requests = require('./requests');

var _requests2 = _interopRequireDefault(_requests);

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
api.use('*', _requests2['default']);

api.use('/expense', _expenseController2['default']);
api.use('/balance', _balanceController2['default']);
api.use('/settings', _userController2['default'].info);
api.use('/members', _groupController2['default']);

api.use(_2['default']);
api.use('*', _error2['default']);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozt1QkFBb0IsU0FBUzs7OztvQkFDWixRQUFROzs7OzJCQUNOLGNBQWM7Ozs7bUJBQ2pCLE9BQU87Ozs7cUJBQ0UsU0FBUzs7OztnQkFDYixPQUFPOzs7O29CQUNYLFFBQVE7Ozs7d0JBQ0osWUFBWTs7OzswQkFFZCxhQUFhOzs7OzhCQUdmLG1CQUFtQjs7OztpQ0FDaEIsc0JBQXNCOzs7O2lDQUN0QixzQkFBc0I7Ozs7K0JBQ3hCLG9CQUFvQjs7OztBQUV0QyxJQUFNLEdBQUcsR0FBRyxzQkFBUyxDQUFDOztxQkFFUCxHQUFHOztBQUVsQixHQUFHLENBQUMsVUFBVSxHQUFHLFlBQVc7O0FBRTFCLFNBQU8sSUFBSSxPQUFPLENBQUMsVUFBUyxPQUFPLEVBQUUsTUFBTSxFQUFFOztBQUUzQyxPQUFHLENBQUMsTUFBTSxDQUFDLHlCQUFPLElBQUksRUFBRSxVQUFTLEdBQUcsRUFBRTtBQUNwQyxVQUFJLENBQUMsR0FBRyxFQUFFO0FBQ1IseUJBQUksSUFBSSxtQkFBaUIseUJBQU8sSUFBSSxDQUFHLENBQUM7QUFDeEMsZUFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO09BQ25CLE1BQU07QUFDTCxlQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO09BQ3JCO0tBQ0YsQ0FBQyxDQUFDO0dBRUosQ0FBQyxDQUFDO0NBQ0osQ0FBQTs7QUFFRCxHQUFHLENBQUMsR0FBRyxtQkFBTSxDQUFDO0FBQ2QsR0FBRyxDQUFDLEdBQUcsQ0FBQyxZQTdCQSxJQUFJLEVBNkJFLENBQUMsQ0FBQzs7QUFHaEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsNEJBQUssUUFBUSxDQUFDLENBQUM7QUFDcEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQUssUUFBUSxDQUFDLENBQUM7O0FBRWpDLEdBQUcsQ0FBQyxHQUFHLENBQUMsa0JBQUssS0FBSyxDQUFDLENBQUM7QUFDcEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLHdCQUFXLENBQUM7O0FBRXZCLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxpQ0FBVSxDQUFDO0FBQzdCLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxpQ0FBVSxDQUFDO0FBQzdCLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLDRCQUFLLElBQUksQ0FBQyxDQUFDO0FBQ2hDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSwrQkFBUSxDQUFDOztBQUUzQixHQUFHLENBQUMsR0FBRyxlQUFVLENBQUM7QUFDbEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLHFCQUFlLENBQUMiLCJmaWxlIjoiYXBpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgYXV0aCBmcm9tICcuL2F1dGgnO1xuaW1wb3J0IENPTkZJRyBmcm9tICdwYXJzZS1jb25maWcnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZyc7XG5pbXBvcnQgZXJyb3JIYW5kbGVyIGZyb20gJy4vZXJyb3InO1xuaW1wb3J0IHJvdXRlNDA0IGZyb20gJy4vNDA0JztcbmltcG9ydCBDT1JTIGZyb20gJy4vY29ycyc7XG5pbXBvcnQgcmVxdWVzdHMgZnJvbSAnLi9yZXF1ZXN0cyc7XG5cbmltcG9ydCB7anNvbn0gZnJvbSAnYm9keS1wYXJzZXInO1xuXG4vLyBjb250cm9sbGVyc1xuaW1wb3J0IFVzZXIgZnJvbSAnLi91c2VyL2NvbnRyb2xsZXInO1xuaW1wb3J0IEV4cGVuc2UgZnJvbSAnLi9leHBlbnNlL2NvbnRyb2xsZXInO1xuaW1wb3J0IEJhbGFuY2UgZnJvbSAnLi9iYWxhbmNlL2NvbnRyb2xsZXInO1xuaW1wb3J0IEdyb3VwIGZyb20gJy4vZ3JvdXAvY29udHJvbGxlcic7XG5cbmNvbnN0IGFwaSA9IGV4cHJlc3MoKTtcblxuZXhwb3J0IGRlZmF1bHQgYXBpO1xuXG5hcGkuaW5pdGlhbGlzZSA9IGZ1bmN0aW9uKCkge1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgIGFwaS5saXN0ZW4oQ09ORklHLnBvcnQsIGZ1bmN0aW9uKGVycikge1xuICAgICAgaWYgKCFlcnIpIHtcbiAgICAgICAgbG9nLmluZm8oYExpc3RlbmluZyBvbiAke0NPTkZJRy5wb3J0fWApO1xuICAgICAgICBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfSk7XG59XG5cbmFwaS51c2UoQ09SUyk7XG5hcGkudXNlKGpzb24oKSk7XG5cblxuYXBpLnVzZSgnL3JlZ2lzdGVyJywgVXNlci5yZWdpc3Rlcik7XG5hcGkudXNlKCcvbG9naW4nLCBhdXRoLnBhc3N3b3JkKTtcblxuYXBpLnVzZShhdXRoLnRva2VuKTtcbmFwaS51c2UoJyonLCByZXF1ZXN0cyk7XG5cbmFwaS51c2UoJy9leHBlbnNlJywgRXhwZW5zZSk7XG5hcGkudXNlKCcvYmFsYW5jZScsIEJhbGFuY2UpO1xuYXBpLnVzZSgnL3NldHRpbmdzJywgVXNlci5pbmZvKTtcbmFwaS51c2UoJy9tZW1iZXJzJywgR3JvdXApO1xuXG5hcGkudXNlKHJvdXRlNDA0KTtcbmFwaS51c2UoJyonLCBlcnJvckhhbmRsZXIpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9