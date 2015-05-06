'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Group = require('./model');

var _Group2 = _interopRequireWildcard(_Group);

var _Router = require('express');

var _toArray$conn = require('../db');

var router = _Router.Router();
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

  return _Group2['default'].getMembers(group).then(function (members) {
    return res.json(members);
  });
}
module.exports = exports['default'];
//# sourceMappingURL=controller.js.map