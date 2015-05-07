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

        // always round up to closest 1p
        let each = Math.ceil((total/results.length)*100)/100;

        balances = results.map(result => {

          let owe = each - result.amount;
          let owed = result.amount - each;

          return {
            name: result.name,
            balance: result.amount,
            each,
            owe,
            owed 
          };
        })
        .sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase());
      }
      res.json(balances || []);
    });
}
