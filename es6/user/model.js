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
  },
  {
    field: 'shared',
    type: String
  }
]);


function insert(user) {
  
  let {email, name, password, group, shared} = user;

  return hash(password).then(hashed => {
    let doc = {id: email, name, password: hashed, group};

    // rethink no like undefined values
    if (shared) {
      doc.shared = shared;
    }

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

function inGroup(email) {

  return r.table('groups')
    .filter(group => group('members').contains(email))
    ('id')
    .nth(0)
    .default(false) // catch index out of bounds error
    .run(conn);

}

export default {insert, all, validate, get, inGroup};
