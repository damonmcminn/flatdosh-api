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
    field: 'groups',
    type: Array,
    required: true
  },
  {
    field: 'shared',
    type: String
  }
]);


function insert(user) {
  
  let {email, name, password, groups, shared} = user;

  return hash(password).then(hashed => {
    let doc = {id: email, name, password: hashed, groups};

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
    .filter(r.row('members').contains(email))
    .withFields('id', 'name')
    .run(conn)
    .then(db.toArray);

}

export default {insert, all, validate, get, inGroup};
