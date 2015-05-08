'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var router = _express.Router();

exports['default'] = router;

router.get('/:group', getBalances);
router.post('/settle/:group', settle);

function settle(req, res, next) {
  var groups = req.user.groups;
  var group = req.params.group;

  // validate group is in groups i.e. allowed

  res.json({ message: 'Not implemented yet' });
}

function getBalances(req, res, next) {
  var groups = req.user.groups;
  var group = req.params.group;

  // validate group is in groups i.e. allowed

  _model2['default'].get(group).then(function (balances) {
    return res.json(balances);
  });
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhbGFuY2UvY29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozt1QkFBcUIsU0FBUzs7cUJBQ1YsU0FBUzs7OztBQUU3QixJQUFNLE1BQU0sR0FBRyxTQUhQLE1BQU0sRUFHUyxDQUFDOztxQkFFVCxNQUFNOztBQUNyQixNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDOztBQUV0QyxTQUFTLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtNQUV6QixNQUFNLEdBQUksR0FBRyxDQUFDLElBQUksQ0FBbEIsTUFBTTtNQUNOLEtBQUssR0FBSSxHQUFHLENBQUMsTUFBTSxDQUFuQixLQUFLOzs7O0FBSVYsS0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxxQkFBcUIsRUFBQyxDQUFDLENBQUM7Q0FFNUM7O0FBRUQsU0FBUyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7TUFFOUIsTUFBTSxHQUFJLEdBQUcsQ0FBQyxJQUFJLENBQWxCLE1BQU07TUFDTixLQUFLLEdBQUksR0FBRyxDQUFDLE1BQU0sQ0FBbkIsS0FBSzs7OztBQUlWLHFCQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRO1dBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7R0FBQSxDQUFDLENBQUM7Q0FDekQiLCJmaWxlIjoiYmFsYW5jZS9jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IEJhbGFuY2UgZnJvbSAnLi9tb2RlbCc7XG5cbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG5yb3V0ZXIuZ2V0KCcvOmdyb3VwJywgZ2V0QmFsYW5jZXMpO1xucm91dGVyLnBvc3QoJy9zZXR0bGUvOmdyb3VwJywgc2V0dGxlKTtcblxuZnVuY3Rpb24gc2V0dGxlKHJlcSwgcmVzLCBuZXh0KSB7XG5cbiAgbGV0IHtncm91cHN9ID0gcmVxLnVzZXI7XG4gIGxldCB7Z3JvdXB9ID0gcmVxLnBhcmFtc1xuXG4gIC8vIHZhbGlkYXRlIGdyb3VwIGlzIGluIGdyb3VwcyBpLmUuIGFsbG93ZWRcblxuICByZXMuanNvbih7bWVzc2FnZTogJ05vdCBpbXBsZW1lbnRlZCB5ZXQnfSk7XG5cbn1cblxuZnVuY3Rpb24gZ2V0QmFsYW5jZXMocmVxLCByZXMsIG5leHQpIHtcblxuICBsZXQge2dyb3Vwc30gPSByZXEudXNlcjtcbiAgbGV0IHtncm91cH0gPSByZXEucGFyYW1zXG5cbiAgLy8gdmFsaWRhdGUgZ3JvdXAgaXMgaW4gZ3JvdXBzIGkuZS4gYWxsb3dlZFxuXG4gIEJhbGFuY2UuZ2V0KGdyb3VwKS50aGVuKGJhbGFuY2VzID0+IHJlcy5qc29uKGJhbGFuY2VzKSk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=