import {Router} from 'express';
import Expense from '../expense/model';
import {isError} from 'js-type-check';
import {r, conn} from '../db';

const router = Router();

export default router;

function getBalances(req, res, next) {

  let {group} = req.user;

  r.table('groups')
    .get(group)
    .getField('members')
    .outerJoin(r.table('users'), (member, user) => member.eq(user('id')))
    .map(u => {
      return {
        email: u('left'),
        name: u('right')('name').default(u('left'))
      }
    })
    .outerJoin(r.table('expenses'), (user, expense) => {
      return user('email').eq(expense('email'));
    })
    .zip()
    .map(doc => {
      return doc.merge({amt: doc('amount').default(0)});
    })
    .group('name')
    .sum('amt')
    .ungroup()
    .map(x => {
      return {name: x('group'), amount: x('reduction')}
    })
    .run(conn)
    .then(results => {

      let balances;

      if (results) {
        let total = results.map(result => result.amount)
          .reduce((prev, curr) => prev + curr);

        let largest = results.map(result => result.amount)
          .reduce((prev, curr) => {
            return prev > curr ? prev : curr;
          });

        let each = total/results.length;
        let largestCredit = results.map(result => result.amount - each)
          .reduce((p,c) => p > c ? p : c);
        
        balances = results.map(result => {
          return {
            name: result.name,
            Oldbalance: +((result.amount - largest).toFixed(2)),
            balance: +(((result.amount - each) - largestCredit).toFixed(2)),
            behind: result.amount - each
          };
        })
        // empty if not balances, let's show them all for the timebeing
        //.filter(result => result.balance < 0)
        .sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase());
      }
      res.json(balances || []);
    });
}

router.get('/', getBalances);
