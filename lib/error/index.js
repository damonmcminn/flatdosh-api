'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = errorHandler;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _log = require('../log');

var _log2 = _interopRequireDefault(_log);

var CODES = {
  'AuthError': 401
};

function errorHandler(err, req, res, next) {
  var message = err.message;
  var name = err.name;

  _log2['default'].info({
    message: message,
    user: req.user,
    auth_header: req.headers.authorization
  });

  res.status(CODES[name] || 400).json({ message: message, name: name });
}

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVycm9yL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O3FCQU13QixZQUFZOzs7O21CQU5wQixRQUFROzs7O0FBRXhCLElBQU0sS0FBSyxHQUFHO0FBQ1osYUFBVyxFQUFFLEdBQUc7Q0FDakIsQ0FBQTs7QUFFYyxTQUFTLFlBQVksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7TUFFbkQsT0FBTyxHQUFVLEdBQUcsQ0FBcEIsT0FBTztNQUFFLElBQUksR0FBSSxHQUFHLENBQVgsSUFBSTs7QUFDbEIsbUJBQUksSUFBSSxDQUFDO0FBQ1AsV0FBTyxFQUFQLE9BQU87QUFDUCxRQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7QUFDZCxlQUFXLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhO0dBQ3ZDLENBQUMsQ0FBQzs7QUFFSCxLQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQVAsT0FBTyxFQUFFLElBQUksRUFBSixJQUFJLEVBQUMsQ0FBQyxDQUFDO0NBRXREIiwiZmlsZSI6ImVycm9yL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGxvZyBmcm9tICcuLi9sb2cnO1xuXG5jb25zdCBDT0RFUyA9IHtcbiAgJ0F1dGhFcnJvcic6IDQwMVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlcnJvckhhbmRsZXIoZXJyLCByZXEsIHJlcywgbmV4dCkge1xuXG4gIGxldCB7bWVzc2FnZSwgbmFtZX0gPSBlcnI7XG4gIGxvZy5pbmZvKHtcbiAgICBtZXNzYWdlLFxuICAgIHVzZXI6IHJlcS51c2VyLFxuICAgIGF1dGhfaGVhZGVyOiByZXEuaGVhZGVycy5hdXRob3JpemF0aW9uXG4gIH0pO1xuXG4gIHJlcy5zdGF0dXMoQ09ERVNbbmFtZV0gfHwgNDAwKS5qc29uKHttZXNzYWdlLCBuYW1lfSk7XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==