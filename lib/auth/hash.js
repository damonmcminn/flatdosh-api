'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
/**
 * IMPORTANT!
 * this module exists to avoid cyclic dependencies
 * e.g.
 * auth/index imports auth/findUser which imports user/model
 * 
 * user/model needs to hash a password for insertion into db
 * if auth/index provides that function as part of it's export,
 * then user/model imports auth/index which is a cyclic dependency
 * 
 * so have an independent module that requires explicit import
 * but still removes the need for boilerplate
 */

var _parseConfig = require('parse-config');

var _authUtilities = require('auth-utilities');

exports['default'] = _authUtilities.password(_parseConfig.rounds).hash;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGgvaGFzaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzJCQWNxQixjQUFjOzs2QkFDWixnQkFBZ0I7O3FCQUV4QixlQUZQLFFBQVEsY0FEUixNQUFNLENBR2lCLENBQUMsSUFBSSIsImZpbGUiOiJhdXRoL2hhc2guanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIElNUE9SVEFOVCFcbiAqIHRoaXMgbW9kdWxlIGV4aXN0cyB0byBhdm9pZCBjeWNsaWMgZGVwZW5kZW5jaWVzXG4gKiBlLmcuXG4gKiBhdXRoL2luZGV4IGltcG9ydHMgYXV0aC9maW5kVXNlciB3aGljaCBpbXBvcnRzIHVzZXIvbW9kZWxcbiAqIFxuICogdXNlci9tb2RlbCBuZWVkcyB0byBoYXNoIGEgcGFzc3dvcmQgZm9yIGluc2VydGlvbiBpbnRvIGRiXG4gKiBpZiBhdXRoL2luZGV4IHByb3ZpZGVzIHRoYXQgZnVuY3Rpb24gYXMgcGFydCBvZiBpdCdzIGV4cG9ydCxcbiAqIHRoZW4gdXNlci9tb2RlbCBpbXBvcnRzIGF1dGgvaW5kZXggd2hpY2ggaXMgYSBjeWNsaWMgZGVwZW5kZW5jeVxuICogXG4gKiBzbyBoYXZlIGFuIGluZGVwZW5kZW50IG1vZHVsZSB0aGF0IHJlcXVpcmVzIGV4cGxpY2l0IGltcG9ydFxuICogYnV0IHN0aWxsIHJlbW92ZXMgdGhlIG5lZWQgZm9yIGJvaWxlcnBsYXRlXG4gKi9cblxuaW1wb3J0IHtyb3VuZHN9IGZyb20gJ3BhcnNlLWNvbmZpZyc7XG5pbXBvcnQge3Bhc3N3b3JkfSBmcm9tICdhdXRoLXV0aWxpdGllcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHBhc3N3b3JkKHJvdW5kcykuaGFzaDtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==