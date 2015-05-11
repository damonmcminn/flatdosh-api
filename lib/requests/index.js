'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _log = require('../log');

var _log2 = _interopRequireDefault(_log);

exports['default'] = function (req, res, next) {

  _log2['default'].info({
    id: req.user.id,
    path: req.originalUrl
  });
  next();
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcXVlc3RzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O21CQUFnQixRQUFROzs7O3FCQUVULFVBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7O0FBRXRDLG1CQUFJLElBQUksQ0FBQztBQUNQLE1BQUUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDZixRQUFJLEVBQUUsR0FBRyxDQUFDLFdBQVc7R0FDdEIsQ0FBQyxDQUFDO0FBQ0gsTUFBSSxFQUFFLENBQUM7Q0FFUiIsImZpbGUiOiJyZXF1ZXN0cy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsb2cgZnJvbSAnLi4vbG9nJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcblxuICBsb2cuaW5mbyh7XG4gICAgaWQ6IHJlcS51c2VyLmlkLFxuICAgIHBhdGg6IHJlcS5vcmlnaW5hbFVybFxuICB9KTtcbiAgbmV4dCgpO1xuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=