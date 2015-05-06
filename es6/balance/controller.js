import {Router} from 'express';
import Expense from '../expense/model';
import {isError} from 'js-type-check';
import {r, conn} from '../db';

import Group from '../group/model';

const router = Router();

export default router;
router.get('/:group', getBalances);

function getBalances(req, res, next) {

  let {groups} = req.user;
  let {group} = req.params

  // validate group is in groups i.e. allowed

  Group.members(group)
    .outerJoin(r.table('expenses').filter(r.not(r.row.hasFields('deleted'))),
      (user, expense) => {
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

        let each = total/results.length;

        balances = results.map(result => {
          return {
            name: result.name,
            balance: result.amount,
            each,
            owe: each - result.amount
          };
        })
        .sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase());
      }
      res.json(balances || []);
    });
}
