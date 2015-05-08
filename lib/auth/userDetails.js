'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _userModel = require('../user/model');

var _userModel2 = _interopRequireDefault(_userModel);

exports['default'] = function (payload) {

  return _userModel2['default'].get(payload.id);
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGgvdXNlckRldGFpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7eUJBQWlCLGVBQWU7Ozs7cUJBRWpCLFVBQVMsT0FBTyxFQUFFOztBQUUvQixTQUFPLHVCQUFLLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FFN0IiLCJmaWxlIjoiYXV0aC91c2VyRGV0YWlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVc2VyIGZyb20gJy4uL3VzZXIvbW9kZWwnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihwYXlsb2FkKSB7XG5cbiAgcmV0dXJuIFVzZXIuZ2V0KHBheWxvYWQuaWQpO1xuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=