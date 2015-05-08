'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _express = require('express');

var _db = require('../db');

var router = _express.Router();
exports['default'] = router;

router.get('/:group', members);

function members(req, res, next) {
  var groups = req.user.groups;
  var group = req.params.group;

  var authorized = groups.filter(function (g) {
    return g.id === group;
  }).length > 0;

  if (!authorized) {
    return res.status(403).json({ message: 'Not group member' });
  }

  return _model2['default'].getMembers(group).then(function (members) {
    return res.json(members);
  });
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyb3VwL2NvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7cUJBQWtCLFNBQVM7Ozs7dUJBQ04sU0FBUzs7a0JBQ0YsT0FBTzs7QUFFbkMsSUFBTSxNQUFNLEdBQUcsU0FIUCxNQUFNLEVBR1MsQ0FBQztxQkFDVCxNQUFNOztBQUVyQixNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFFL0IsU0FBUyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7TUFFMUIsTUFBTSxHQUFJLEdBQUcsQ0FBQyxJQUFJLENBQWxCLE1BQU07TUFDTixLQUFLLEdBQUksR0FBRyxDQUFDLE1BQU0sQ0FBbkIsS0FBSzs7QUFFVixNQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQztXQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssS0FBSztHQUFBLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDOztBQUUvRCxNQUFJLENBQUMsVUFBVSxFQUFFO0FBQ2YsV0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxrQkFBa0IsRUFBQyxDQUFDLENBQUM7R0FDNUQ7O0FBRUQsU0FBTyxtQkFBTSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQzNCLElBQUksQ0FBQyxVQUFBLE9BQU87V0FBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztHQUFBLENBQUMsQ0FBQztDQUV2QyIsImZpbGUiOiJncm91cC9jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdyb3VwIGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHt0b0FycmF5LCBjb25ufSBmcm9tICcuLi9kYic7XG5cbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xuXG5yb3V0ZXIuZ2V0KCcvOmdyb3VwJywgbWVtYmVycyk7XG5cbmZ1bmN0aW9uIG1lbWJlcnMocmVxLCByZXMsIG5leHQpIHtcblxuICBsZXQge2dyb3Vwc30gPSByZXEudXNlcjtcbiAgbGV0IHtncm91cH0gPSByZXEucGFyYW1zXG5cbiAgbGV0IGF1dGhvcml6ZWQgPSBncm91cHMuZmlsdGVyKGcgPT4gZy5pZCA9PT0gZ3JvdXApLmxlbmd0aCA+IDA7XG4gIFxuICBpZiAoIWF1dGhvcml6ZWQpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDMpLmpzb24oe21lc3NhZ2U6ICdOb3QgZ3JvdXAgbWVtYmVyJ30pO1xuICB9XG5cbiAgcmV0dXJuIEdyb3VwLmdldE1lbWJlcnMoZ3JvdXApXG4gICAgLnRoZW4obWVtYmVycyA9PiByZXMuanNvbihtZW1iZXJzKSk7XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==