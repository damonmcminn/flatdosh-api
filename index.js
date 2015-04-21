'use strict';
var createSchema = require('schema')

let userSchema = [
  {
    field: 'email',
    type: String,
    required: true
  },
  {
    field: 'name',
    type: String,
    required: true
  },
  {
    field: 'password',
    type: String,
    require: true
  }
];

let validateUser = createSchema(userSchema);

let user = {
  email: 'damonrmcminn@gmail.com',
  name: 'Damon',
  age: 32,
  password: 'pass'
};

console.log(validateUser(user));
