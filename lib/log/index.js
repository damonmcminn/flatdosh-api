'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bunyan = require('bunyan');

var _bunyan2 = _interopRequireDefault(_bunyan);

var _parseConfig = require('parse-config');

var _parseConfig2 = _interopRequireDefault(_parseConfig);

var Logger = _bunyan2['default'].createLogger({ name: _parseConfig2['default'].name });
exports['default'] = Logger;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztzQkFBbUIsUUFBUTs7OzsyQkFDUixjQUFjOzs7O0FBRWpDLElBQU0sTUFBTSxHQUFHLG9CQUFPLFlBQVksQ0FBQyxFQUFDLElBQUksRUFBRSx5QkFBTyxJQUFJLEVBQUMsQ0FBQyxDQUFDO3FCQUN6QyxNQUFNIiwiZmlsZSI6ImxvZy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBidW55YW4gZnJvbSAnYnVueWFuJztcbmltcG9ydCBDT05GSUcgZnJvbSAncGFyc2UtY29uZmlnJ1xuXG5jb25zdCBMb2dnZXIgPSBidW55YW4uY3JlYXRlTG9nZ2VyKHtuYW1lOiBDT05GSUcubmFtZX0pO1xuZXhwb3J0IGRlZmF1bHQgTG9nZ2VyO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9