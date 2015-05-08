'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rethinkdb = require('rethinkdb');

var _rethinkdb2 = _interopRequireDefault(_rethinkdb);

var _parseConfig = require('parse-config');

var self = {

  initialise: function initialise() {

    if (!self.conn) {

      return _rethinkdb2['default'].connect({ db: _parseConfig.name }).then(function (conn) {

        self.conn = conn;
        self.r = _rethinkdb2['default'];

        return Promise.resolve(self);
      })['catch'](function (err) {
        return Promise.reject(err);
      });
    }
  },

  toArray: function toArray(cursor) {
    return cursor.toArray();
  }
};

exports['default'] = self;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRiL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O3lCQUFjLFdBQVc7Ozs7MkJBQ04sY0FBYzs7QUFFakMsSUFBTSxJQUFJLEdBQUc7O0FBRVgsWUFBVSxFQUFFLHNCQUFXOztBQUVyQixRQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTs7QUFFZCxhQUFPLHVCQUFFLE9BQU8sQ0FBQyxFQUFDLEVBQUUsZUFSbEIsSUFBSSxBQVFvQixFQUFDLENBQUMsQ0FDekIsSUFBSSxDQUFDLFVBQVMsSUFBSSxFQUFFOztBQUVuQixZQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixZQUFJLENBQUMsQ0FBQyx5QkFBSSxDQUFDOztBQUVYLGVBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUM5QixDQUFDLFNBQ0ksQ0FBQyxVQUFTLEdBQUcsRUFBRTtBQUNuQixlQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7T0FDNUIsQ0FBQyxDQUFDO0tBQ047R0FDRjs7QUFFRCxTQUFPLEVBQUUsaUJBQVMsTUFBTSxFQUFFO0FBQ3hCLFdBQU8sTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0dBQ3pCO0NBQ0YsQ0FBQTs7cUJBRWMsSUFBSSIsImZpbGUiOiJkYi9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByIGZyb20gJ3JldGhpbmtkYic7XG5pbXBvcnQge25hbWV9IGZyb20gJ3BhcnNlLWNvbmZpZyc7XG5cbmNvbnN0IHNlbGYgPSB7XG5cbiAgaW5pdGlhbGlzZTogZnVuY3Rpb24oKSB7XG5cbiAgICBpZiAoIXNlbGYuY29ubikge1xuICAgICAgXG4gICAgICByZXR1cm4gci5jb25uZWN0KHtkYjogbmFtZX0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbm4pIHtcblxuICAgICAgICAgIHNlbGYuY29ubiA9IGNvbm47XG4gICAgICAgICAgc2VsZi5yID0gcjtcbiAgICAgICAgICBcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHNlbGYpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICB0b0FycmF5OiBmdW5jdGlvbihjdXJzb3IpIHtcbiAgICByZXR1cm4gY3Vyc29yLnRvQXJyYXkoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBzZWxmO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9