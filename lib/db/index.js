'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _r = require('rethinkdb');

var _r2 = _interopRequireWildcard(_r);

var _name = require('parse-config');

var self = {

  initialise: function initialise() {

    if (!self.conn) {

      return _r2['default'].connect({ db: _name.name }).then(function (conn) {

        self.conn = conn;
        self.r = _r2['default'];

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
//# sourceMappingURL=index.js.map