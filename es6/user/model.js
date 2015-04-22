import db from '../db';
import createSchema from 'schema';
import hash from '../auth/hash';

const r = db.r;
const conn = db.conn;

const users = r.table('users');

let validate = createSchema([
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
    required: true
  },
  {
    field: 'group',
    type: String,
    required: true
  }
]);


function insert(user) {
  
  let {email, name, password, group} = user;

  return hash(password).then(hashed => {
    let doc = {id: email, name, password: hashed, group};
    return users.insert(doc).run(conn);
  });
};

function all() {
  return users.run(conn)
    .then(db.toArray);
}

function get(email) {

  return users.get(email).run(conn);

}

export default {insert, all, validate, get};
