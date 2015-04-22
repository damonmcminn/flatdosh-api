import db from '../db';
import createSchema from 'schema';
import {hash} from '../auth';
import schema from './schema';

const r = db.r;
const conn = db.conn;

const expenses = r.table('expenses');
const validate = createSchema(schema);

function insert(expense) {
  return expenses.insert(expense).run(conn);
};

function all(group) {
  return expenses.filter({group})
    .eqJoin('email', r.table('users'))
    .zip()
    .withFields('name', 'amount', 'timestamp')
    .run(conn)
    .then(db.toArray);
}

export default {insert, all, validate};
