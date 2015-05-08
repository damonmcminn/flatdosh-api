'use strict';
const settle = require('../../lib/balance/settle');

function num2obj(x) {

  return {

    id: x,
    val: x

  };

}

describe('settle', function() {

  it('should return a list of debtors and how much they owe to whom', function() {

    let b1 = settle([-19, -17.5, -23, 0, 59.5].map(num2obj), 'id', 'val');
    let b2 = settle([-23, 0, 59.5].map(num2obj), 'id', 'val');
    let b3 = settle([-19, 10, 59.5].map(num2obj), 'id', 'val');

    expect(Object.keys(b1).length).toBe(3);
    expect(b1['-23'].length).toBe(1);

    expect(Object.keys(b2).length).toBe(1);
    expect(b2['-23'].pop().amt).toBe(23);

    expect(Object.keys(b3).length).toBe(1);
    expect(b3['-19'].length).toBe(1);

  });

  it('should return an empty list if either credit or debt are empty', function() {

    let noCredit = settle([-19, -17.5, -23, 0].map(num2obj), 'id', 'val');
    let noDebt = settle([0, 1].map(num2obj), 'id', 'val');

    expect(noCredit).toEqual([]);
    expect(noDebt).toEqual([]);

  });

  it('should iterate from largest to smallest', function() {

    let manyPos = settle([-5, -10, -20, 24, 6, 5].map(num2obj), 'id', 'val');
    let singleNeg = settle([-20, 1, 9, 10].map(num2obj), 'id', 'val');

    expect(manyPos['-5'].pop().id).toBe(5);
    expect(manyPos['-20'].pop().id).toBe(24);
    // the first of 2
    expect(manyPos['-10'].shift().id).toBe(24);

    expect(singleNeg['-20'][0].id).toBe(10);
    expect(singleNeg['-20'][1].id).toBe(9);
    expect(singleNeg['-20'][2].id).toBe(1);
  });

  it('should return debtor list regardless whether sum(credit) - sum(debt) === 0', function() {

    let manyNegs = settle([-19, -17.5, -23, 10].map(num2obj), 'id', 'val');
    expect(manyNegs['-19']).toEqual([]);

  });

  it('should work fine for floats', function() {

    const EPSILON = 0.0000000000001;
    let balances = [-19, -17.5, -23, 59.5].map(function(x) {return x/100}).map(num2obj);

    let debtorsMap = settle(balances, 'id', 'val');

    expect(debtorsMap['-0.23'].length).toEqual(1);
    expect(debtorsMap['-0.19'].length).toEqual(1);
    expect(debtorsMap['-0.175'].length).toEqual(1);

    expect(debtorsMap['-0.23'].pop().amt).toBeCloseTo(0.23, 3);
    expect(debtorsMap['-0.19'].pop().amt).toBeCloseTo(0.19, 3);
    expect(debtorsMap['-0.175'].pop().amt).toBeCloseTo(0.175, 3);

  });

});
