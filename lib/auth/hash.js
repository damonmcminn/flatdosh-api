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

var _rounds = require('parse-config');

var _password = require('auth-utilities');

exports['default'] = _password.password(_rounds.rounds).hash;
module.exports = exports['default'];
//# sourceMappingURL=hash.js.map