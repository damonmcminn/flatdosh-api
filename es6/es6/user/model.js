import db from '../db';

const r = db.r;
const conn = db.conn;

const users = r.table('users');

// need to create databse and tables
//r.tableCreate('users').run(conn);

function insert() {
  return users.insert({timestamp: Date.now()}).run(conn);
};

function all() {
  return users.run(conn)
    .then(db.toArray);
}

export default {insert, all};
