import {r, conn} from '../db';
import Group from '../group/model';
import settle from './settle';

export default {get, zero};

function balances(group) {

  return Group.members(group)
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
  });
}

function zero(group) {
}

function get(group) {

  return balances(group)
    .run(conn)
    .then(results => {

      let balances = buildBalances(results);

      let settled = settle(balances, 'name', 'owed');

      balances.forEach(bal => {

        bal.debts = settled[bal.name] || [];

      });

      return balances;

    });

}

function buildBalances(results) {

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

  return balances || [];
}
