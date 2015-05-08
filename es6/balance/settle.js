const EPSILON = 0.00000001;

function hi2low(a, b) { return a.amt < b.amt; }

function splitBalances(xs, id, amt) {
  // returns [plus, minue]
  // id = prop
  // amt = prop

  let minus = xs.filter(x => x[amt] < 0)
    .map(x => {
      return {
        id: x[id],
        // want positive numbers
        amt: -x[amt]
      };
    })
    .sort(hi2low);

  let plus = xs.filter(x => x[amt] > 0)
    .map(x => {
      return {
        id: x[id],
        amt: x[amt]
      };
    })
    .sort(hi2low);

  return [plus, minus];

}

function settle(balances, idField, amtField) {

  let [credit, debt] = splitBalances(balances, idField, amtField);
  return mapDebts(credit, debt);

}

function mapDebts(credit, debt) {

  /* returns {debtorId: [{id: creditorId, amt: amountOwedToCreditor}]}
   */

  if (credit.length === 0 || debt.length === 0) {
    return [];
  }

  let creditor = {amt: 0};

  let debtorsMap = {};

  debt.forEach(val => {

    let balance = val.amt;
    debtorsMap[val.id] = [];

    // balance as close to ZERO to be ZERO
    loop: while (balance > EPSILON) {

      let subtracted;
      try {
        // only process next debtor if their balance is paid
        if (creditor.amt === 0) {
          creditor = credit.shift();
        } else {
        }

        subtracted = balance - creditor.amt;
      } catch (e) {
        break loop;
      }

      // floating point pain causing infinite loop
      // if balance not ZERO but almost zero, the else statement below is executed
      // some is then ZERO
      // and balance (almost ZERO) minus equal ZERO is not quite ZERO
      // so infinite loop!
      // .1 + .2 === 0.30000000000000004 <----- GAH!
      // Object({ -0.23: [ Object({ id: 0.595, amt: 0.22999999999999998 }), Object({ id: 0.595, amt: 0.365 }) ], -0.19: [  ], -0.175: [  ] })

      if (subtracted >= 0) {
        // push primitives, not references..
        debtorsMap[val.id].push({id: creditor.id, amt: creditor.amt});
        balance -= creditor.amt;
        creditor.amt -= creditor.amt;
      } else {
        // subtracted is negative
        let some = creditor.amt - (-subtracted);
        debtorsMap[val.id].push({id: creditor.id, amt: some});
        balance -= some;
        creditor.amt -= some;
      }

    }

  });
  return debtorsMap;
}

export default settle;
