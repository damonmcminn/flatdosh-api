'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _db = require('../db');

var _db2 = _interopRequireWildcard(_db);

var r = _db2['default'].r;
var conn = _db2['default'].conn;

var groups = r.table('groups');

exports['default'] = { members: members, getMembers: getMembers };

function members(group) {

  // validation that user requesting group info
  // belongs to group
  // must come from elsewhere
  // like balance/controller

  return groups.get(group).getField('members').outerJoin(r.table('users'), function (member, user) {
    return member.eq(user('id'));
  }).map(function (u) {
    return {
      email: u('left'),
      name: u('right')('name')['default'](u('left'))
    };
  });
}

function getMembers(group) {
  return members(group).run(conn).then(_db2['default'].toArray);
}
module.exports = exports['default'];
//# sourceMappingURL=model.js.map