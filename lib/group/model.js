'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyb3VwL21vZGVsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O2tCQUFlLE9BQU87Ozs7QUFFdEIsSUFBTSxDQUFDLEdBQUcsZ0JBQUcsQ0FBQyxDQUFDO0FBQ2YsSUFBTSxJQUFJLEdBQUcsZ0JBQUcsSUFBSSxDQUFDOztBQUVyQixJQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztxQkFFbEIsRUFBQyxPQUFPLEVBQVAsT0FBTyxFQUFFLFVBQVUsRUFBVixVQUFVLEVBQUM7O0FBRXBDLFNBQVMsT0FBTyxDQUFDLEtBQUssRUFBRTs7Ozs7OztBQU90QixTQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQ3JCLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FDbkIsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsVUFBQyxNQUFNLEVBQUUsSUFBSTtXQUFLLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQUEsQ0FBQyxDQUNwRSxHQUFHLENBQUMsVUFBQSxDQUFDLEVBQUk7QUFDUixXQUFPO0FBQ0wsV0FBSyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDaEIsVUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUM1QyxDQUFBO0dBQ0YsQ0FBQyxDQUFBO0NBQ0w7O0FBRUQsU0FBUyxVQUFVLENBQUMsS0FBSyxFQUFFO0FBQ3pCLFNBQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUNsQixHQUFHLENBQUMsSUFBSSxDQUFDLENBQ1QsSUFBSSxDQUFDLGdCQUFHLE9BQU8sQ0FBQyxDQUFDO0NBQ3JCIiwiZmlsZSI6Imdyb3VwL21vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRiIGZyb20gJy4uL2RiJztcblxuY29uc3QgciA9IGRiLnI7XG5jb25zdCBjb25uID0gZGIuY29ubjtcblxuY29uc3QgZ3JvdXBzID0gci50YWJsZSgnZ3JvdXBzJyk7XG5cbmV4cG9ydCBkZWZhdWx0IHttZW1iZXJzLCBnZXRNZW1iZXJzfVxuXG5mdW5jdGlvbiBtZW1iZXJzKGdyb3VwKSB7XG5cbiAgLy8gdmFsaWRhdGlvbiB0aGF0IHVzZXIgcmVxdWVzdGluZyBncm91cCBpbmZvXG4gIC8vIGJlbG9uZ3MgdG8gZ3JvdXBcbiAgLy8gbXVzdCBjb21lIGZyb20gZWxzZXdoZXJlXG4gIC8vIGxpa2UgYmFsYW5jZS9jb250cm9sbGVyXG5cbiAgcmV0dXJuIGdyb3Vwcy5nZXQoZ3JvdXApXG4gICAgLmdldEZpZWxkKCdtZW1iZXJzJylcbiAgICAub3V0ZXJKb2luKHIudGFibGUoJ3VzZXJzJyksIChtZW1iZXIsIHVzZXIpID0+IG1lbWJlci5lcSh1c2VyKCdpZCcpKSlcbiAgICAubWFwKHUgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZW1haWw6IHUoJ2xlZnQnKSxcbiAgICAgICAgbmFtZTogdSgncmlnaHQnKSgnbmFtZScpLmRlZmF1bHQodSgnbGVmdCcpKVxuICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGdldE1lbWJlcnMoZ3JvdXApIHtcbiAgcmV0dXJuIG1lbWJlcnMoZ3JvdXApXG4gICAgLnJ1bihjb25uKVxuICAgIC50aGVuKGRiLnRvQXJyYXkpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9