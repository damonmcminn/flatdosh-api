'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _schema = require('schema');

var _schema2 = _interopRequireDefault(_schema);

var _authHash = require('../auth/hash');

var _authHash2 = _interopRequireDefault(_authHash);

var r = _db2['default'].r;
var conn = _db2['default'].conn;

var users = r.table('users');

var validate = _schema2['default']([{
  field: 'email',
  type: String,
  required: true
}, {
  field: 'name',
  type: String,
  required: true
}, {
  field: 'password',
  type: String,
  required: true
}, {
  field: 'groups',
  type: Array,
  required: true
}, {
  field: 'shared',
  type: String
}]);

function insert(user) {
  var email = user.email;
  var name = user.name;
  var password = user.password;
  var groups = user.groups;
  var shared = user.shared;

  return _authHash2['default'](password).then(function (hashed) {
    var doc = { id: email, name: name, password: hashed, groups: groups };

    // rethink no like undefined values
    if (shared) {
      doc.shared = shared;
    }

    return users.insert(doc).run(conn);
  });
};

function all() {
  return users.run(conn).then(_db2['default'].toArray);
}

function get(email) {

  return users.get(email).run(conn);
}

function inGroup(email) {

  return r.table('groups').filter(r.row('members').contains(email)).withFields('id', 'name').run(conn).then(_db2['default'].toArray);
}

exports['default'] = { insert: insert, all: all, validate: validate, get: get, inGroup: inGroup };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIvbW9kZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBQWUsT0FBTzs7OztzQkFDRyxRQUFROzs7O3dCQUNoQixjQUFjOzs7O0FBRS9CLElBQU0sQ0FBQyxHQUFHLGdCQUFHLENBQUMsQ0FBQztBQUNmLElBQU0sSUFBSSxHQUFHLGdCQUFHLElBQUksQ0FBQzs7QUFFckIsSUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFL0IsSUFBSSxRQUFRLEdBQUcsb0JBQWEsQ0FDMUI7QUFDRSxPQUFLLEVBQUUsT0FBTztBQUNkLE1BQUksRUFBRSxNQUFNO0FBQ1osVUFBUSxFQUFFLElBQUk7Q0FDZixFQUNEO0FBQ0UsT0FBSyxFQUFFLE1BQU07QUFDYixNQUFJLEVBQUUsTUFBTTtBQUNaLFVBQVEsRUFBRSxJQUFJO0NBQ2YsRUFDRDtBQUNFLE9BQUssRUFBRSxVQUFVO0FBQ2pCLE1BQUksRUFBRSxNQUFNO0FBQ1osVUFBUSxFQUFFLElBQUk7Q0FDZixFQUNEO0FBQ0UsT0FBSyxFQUFFLFFBQVE7QUFDZixNQUFJLEVBQUUsS0FBSztBQUNYLFVBQVEsRUFBRSxJQUFJO0NBQ2YsRUFDRDtBQUNFLE9BQUssRUFBRSxRQUFRO0FBQ2YsTUFBSSxFQUFFLE1BQU07Q0FDYixDQUNGLENBQUMsQ0FBQzs7QUFHSCxTQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUU7TUFFZixLQUFLLEdBQW9DLElBQUksQ0FBN0MsS0FBSztNQUFFLElBQUksR0FBOEIsSUFBSSxDQUF0QyxJQUFJO01BQUUsUUFBUSxHQUFvQixJQUFJLENBQWhDLFFBQVE7TUFBRSxNQUFNLEdBQVksSUFBSSxDQUF0QixNQUFNO01BQUUsTUFBTSxHQUFJLElBQUksQ0FBZCxNQUFNOztBQUUxQyxTQUFPLHNCQUFLLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU0sRUFBSTtBQUNuQyxRQUFJLEdBQUcsR0FBRyxFQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFKLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBTixNQUFNLEVBQUMsQ0FBQzs7O0FBR3RELFFBQUksTUFBTSxFQUFFO0FBQ1YsU0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7S0FDckI7O0FBRUQsV0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztHQUNwQyxDQUFDLENBQUM7Q0FDSixDQUFDOztBQUVGLFNBQVMsR0FBRyxHQUFHO0FBQ2IsU0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUNuQixJQUFJLENBQUMsZ0JBQUcsT0FBTyxDQUFDLENBQUM7Q0FDckI7O0FBRUQsU0FBUyxHQUFHLENBQUMsS0FBSyxFQUFFOztBQUVsQixTQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0NBRW5DOztBQUVELFNBQVMsT0FBTyxDQUFDLEtBQUssRUFBRTs7QUFFdEIsU0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUNyQixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FDeEMsVUFBVSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FDeEIsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUNULElBQUksQ0FBQyxnQkFBRyxPQUFPLENBQUMsQ0FBQztDQUVyQjs7cUJBRWMsRUFBQyxNQUFNLEVBQU4sTUFBTSxFQUFFLEdBQUcsRUFBSCxHQUFHLEVBQUUsUUFBUSxFQUFSLFFBQVEsRUFBRSxHQUFHLEVBQUgsR0FBRyxFQUFFLE9BQU8sRUFBUCxPQUFPLEVBQUMiLCJmaWxlIjoidXNlci9tb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkYiBmcm9tICcuLi9kYic7XG5pbXBvcnQgY3JlYXRlU2NoZW1hIGZyb20gJ3NjaGVtYSc7XG5pbXBvcnQgaGFzaCBmcm9tICcuLi9hdXRoL2hhc2gnO1xuXG5jb25zdCByID0gZGIucjtcbmNvbnN0IGNvbm4gPSBkYi5jb25uO1xuXG5jb25zdCB1c2VycyA9IHIudGFibGUoJ3VzZXJzJyk7XG5cbmxldCB2YWxpZGF0ZSA9IGNyZWF0ZVNjaGVtYShbXG4gIHtcbiAgICBmaWVsZDogJ2VtYWlsJyxcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgcmVxdWlyZWQ6IHRydWVcbiAgfSxcbiAge1xuICAgIGZpZWxkOiAnbmFtZScsXG4gICAgdHlwZTogU3RyaW5nLFxuICAgIHJlcXVpcmVkOiB0cnVlXG4gIH0sXG4gIHtcbiAgICBmaWVsZDogJ3Bhc3N3b3JkJyxcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgcmVxdWlyZWQ6IHRydWVcbiAgfSxcbiAge1xuICAgIGZpZWxkOiAnZ3JvdXBzJyxcbiAgICB0eXBlOiBBcnJheSxcbiAgICByZXF1aXJlZDogdHJ1ZVxuICB9LFxuICB7XG4gICAgZmllbGQ6ICdzaGFyZWQnLFxuICAgIHR5cGU6IFN0cmluZ1xuICB9XG5dKTtcblxuXG5mdW5jdGlvbiBpbnNlcnQodXNlcikge1xuICBcbiAgbGV0IHtlbWFpbCwgbmFtZSwgcGFzc3dvcmQsIGdyb3Vwcywgc2hhcmVkfSA9IHVzZXI7XG5cbiAgcmV0dXJuIGhhc2gocGFzc3dvcmQpLnRoZW4oaGFzaGVkID0+IHtcbiAgICBsZXQgZG9jID0ge2lkOiBlbWFpbCwgbmFtZSwgcGFzc3dvcmQ6IGhhc2hlZCwgZ3JvdXBzfTtcblxuICAgIC8vIHJldGhpbmsgbm8gbGlrZSB1bmRlZmluZWQgdmFsdWVzXG4gICAgaWYgKHNoYXJlZCkge1xuICAgICAgZG9jLnNoYXJlZCA9IHNoYXJlZDtcbiAgICB9XG5cbiAgICByZXR1cm4gdXNlcnMuaW5zZXJ0KGRvYykucnVuKGNvbm4pO1xuICB9KTtcbn07XG5cbmZ1bmN0aW9uIGFsbCgpIHtcbiAgcmV0dXJuIHVzZXJzLnJ1bihjb25uKVxuICAgIC50aGVuKGRiLnRvQXJyYXkpO1xufVxuXG5mdW5jdGlvbiBnZXQoZW1haWwpIHtcblxuICByZXR1cm4gdXNlcnMuZ2V0KGVtYWlsKS5ydW4oY29ubik7XG5cbn1cblxuZnVuY3Rpb24gaW5Hcm91cChlbWFpbCkge1xuXG4gIHJldHVybiByLnRhYmxlKCdncm91cHMnKVxuICAgIC5maWx0ZXIoci5yb3coJ21lbWJlcnMnKS5jb250YWlucyhlbWFpbCkpXG4gICAgLndpdGhGaWVsZHMoJ2lkJywgJ25hbWUnKVxuICAgIC5ydW4oY29ubilcbiAgICAudGhlbihkYi50b0FycmF5KTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCB7aW5zZXJ0LCBhbGwsIHZhbGlkYXRlLCBnZXQsIGluR3JvdXB9O1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9