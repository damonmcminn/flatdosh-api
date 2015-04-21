import db from '../db';
import createSchema from 'schema';
import {hash} from '../auth';

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
    require: true
  }
]);


function insert(user) {
  
  let {email, name, password} = user;

  return hash(password).then(hashed => {
    let doc = {id: email, name, password: hashed};
    return users.insert(doc).run(conn);
  });
};

function all() {
  return users.run(conn)
    .then(db.toArray);
}

export default {insert, all, validate};
