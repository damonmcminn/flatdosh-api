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
    .without({right: 'id'}) // need expense document id, not user id which is email
    .zip()
    .map(expense => {
      return {
        amount: expense('amount'),
        deleted: expense('deleted').default(false),
        description: expense('description').default('NONE'),
        name: expense('name'),
        user: expense('email'),
        id: expense('id'),
        timestamp: expense('timestamp'),
        creator: expense('creator'),
        shareId: expense('shareId').default(null)
      }
    })
    .orderBy(r.desc('timestamp'))
    .run(conn)
    .then(db.toArray);
}

function destroy(user, expenseList) {

  return expenses.getAll(r.args(expenseList))
    .filter(r.or(
      r.row('email').eq(user),
      r.row('creator').eq(user)
    ))
    .update({deleted: true})
    .run(conn);

}

export default {insert, all, validate, destroy};
