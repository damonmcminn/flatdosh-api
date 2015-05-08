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

  _log2['default'].error(err);

  res.status(CODES[name] || 400).json({ message: message, name: name });
}

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVycm9yL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O3FCQU13QixZQUFZOzs7O21CQU5wQixRQUFROzs7O0FBRXhCLElBQU0sS0FBSyxHQUFHO0FBQ1osYUFBVyxFQUFFLEdBQUc7Q0FDakIsQ0FBQTs7QUFFYyxTQUFTLFlBQVksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7TUFFbkQsT0FBTyxHQUFVLEdBQUcsQ0FBcEIsT0FBTztNQUFFLElBQUksR0FBSSxHQUFHLENBQVgsSUFBSTs7QUFDbEIsbUJBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVmLEtBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBUCxPQUFPLEVBQUUsSUFBSSxFQUFKLElBQUksRUFBQyxDQUFDLENBQUM7Q0FFdEQiLCJmaWxlIjoiZXJyb3IvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbG9nIGZyb20gJy4uL2xvZyc7XG5cbmNvbnN0IENPREVTID0ge1xuICAnQXV0aEVycm9yJzogNDAxXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVycm9ySGFuZGxlcihlcnIsIHJlcSwgcmVzLCBuZXh0KSB7XG5cbiAgbGV0IHttZXNzYWdlLCBuYW1lfSA9IGVycjtcbiAgbG9nLmVycm9yKGVycik7XG5cbiAgcmVzLnN0YXR1cyhDT0RFU1tuYW1lXSB8fCA0MDApLmpzb24oe21lc3NhZ2UsIG5hbWV9KTtcblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9