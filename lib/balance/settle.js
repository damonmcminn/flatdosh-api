"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

var EPSILON = 1e-8;

function hi2low(a, b) {
  return a.amt < b.amt;
}

function splitBalances(xs, id, amt) {
  // returns [plus, minue]
  // id = prop
  // amt = prop

  var minus = xs.filter(function (x) {
    return x[amt] < 0;
  }).map(function (x) {
    return {
      id: x[id],
      // want positive numbers
      amt: -x[amt]
    };
  }).sort(hi2low);

  var plus = xs.filter(function (x) {
    return x[amt] > 0;
  }).map(function (x) {
    return {
      id: x[id],
      amt: x[amt]
    };
  }).sort(hi2low);

  return [plus, minus];
}

function settle(balances, idField, amtField) {
  var _splitBalances = splitBalances(balances, idField, amtField);

  var _splitBalances2 = _slicedToArray(_splitBalances, 2);

  var credit = _splitBalances2[0];
  var debt = _splitBalances2[1];

  return mapDebts(credit, debt);
}

function mapDebts(credit, debt) {

  /* returns {debtorId: [{id: creditorId, amt: amountOwedToCreditor}]}
   */

  if (credit.length === 0 || debt.length === 0) {
    return [];
  }

  var creditor = { amt: 0 };

  var debtorsMap = {};

  debt.forEach(function (val) {

    var balance = val.amt;
    debtorsMap[val.id] = [];

    // balance as close to ZERO to be ZERO
    loop: while (balance > EPSILON) {

      var subtracted = undefined;
      try {
        // only process next debtor if their balance is paid
        if (creditor.amt === 0) {
          creditor = credit.shift();
        } else {}

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
        debtorsMap[val.id].push({ id: creditor.id, amt: creditor.amt });
        balance -= creditor.amt;
        creditor.amt -= creditor.amt;
      } else {
        // subtracted is negative
        var some = creditor.amt - -subtracted;
        debtorsMap[val.id].push({ id: creditor.id, amt: some });
        balance -= some;
        creditor.amt -= some;
      }
    }
  });
  return debtorsMap;
}

exports["default"] = settle;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,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QyxDQUFDO0FBQzlELGVBQU8sSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDO0FBQ3hCLGdCQUFRLENBQUMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUM7T0FDOUIsTUFBTTs7QUFFTCxZQUFJLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxHQUFJLENBQUMsVUFBVSxBQUFDLENBQUM7QUFDeEMsa0JBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7QUFDdEQsZUFBTyxJQUFJLElBQUksQ0FBQztBQUNoQixnQkFBUSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUM7T0FDdEI7S0FFRjtHQUVGLENBQUMsQ0FBQztBQUNILFNBQU8sVUFBVSxDQUFDO0NBQ25COztxQkFFYyxNQUFNIiwiZmlsZSI6ImJhbGFuY2Uvc2V0dGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRVBTSUxPTiA9IDAuMDAwMDAwMDE7XG5cbmZ1bmN0aW9uIGhpMmxvdyhhLCBiKSB7IHJldHVybiBhLmFtdCA8IGIuYW10OyB9XG5cbmZ1bmN0aW9uIHNwbGl0QmFsYW5jZXMoeHMsIGlkLCBhbXQpIHtcbiAgLy8gcmV0dXJucyBbcGx1cywgbWludWVdXG4gIC8vIGlkID0gcHJvcFxuICAvLyBhbXQgPSBwcm9wXG5cbiAgbGV0IG1pbnVzID0geHMuZmlsdGVyKHggPT4geFthbXRdIDwgMClcbiAgICAubWFwKHggPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IHhbaWRdLFxuICAgICAgICAvLyB3YW50IHBvc2l0aXZlIG51bWJlcnNcbiAgICAgICAgYW10OiAteFthbXRdXG4gICAgICB9O1xuICAgIH0pXG4gICAgLnNvcnQoaGkybG93KTtcblxuICBsZXQgcGx1cyA9IHhzLmZpbHRlcih4ID0+IHhbYW10XSA+IDApXG4gICAgLm1hcCh4ID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiB4W2lkXSxcbiAgICAgICAgYW10OiB4W2FtdF1cbiAgICAgIH07XG4gICAgfSlcbiAgICAuc29ydChoaTJsb3cpO1xuXG4gIHJldHVybiBbcGx1cywgbWludXNdO1xuXG59XG5cbmZ1bmN0aW9uIHNldHRsZShiYWxhbmNlcywgaWRGaWVsZCwgYW10RmllbGQpIHtcblxuICBsZXQgW2NyZWRpdCwgZGVidF0gPSBzcGxpdEJhbGFuY2VzKGJhbGFuY2VzLCBpZEZpZWxkLCBhbXRGaWVsZCk7XG4gIHJldHVybiBtYXBEZWJ0cyhjcmVkaXQsIGRlYnQpO1xuXG59XG5cbmZ1bmN0aW9uIG1hcERlYnRzKGNyZWRpdCwgZGVidCkge1xuXG4gIC8qIHJldHVybnMge2RlYnRvcklkOiBbe2lkOiBjcmVkaXRvcklkLCBhbXQ6IGFtb3VudE93ZWRUb0NyZWRpdG9yfV19XG4gICAqL1xuXG4gIGlmIChjcmVkaXQubGVuZ3RoID09PSAwIHx8IGRlYnQubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgbGV0IGNyZWRpdG9yID0ge2FtdDogMH07XG5cbiAgbGV0IGRlYnRvcnNNYXAgPSB7fTtcblxuICBkZWJ0LmZvckVhY2godmFsID0+IHtcblxuICAgIGxldCBiYWxhbmNlID0gdmFsLmFtdDtcbiAgICBkZWJ0b3JzTWFwW3ZhbC5pZF0gPSBbXTtcblxuICAgIC8vIGJhbGFuY2UgYXMgY2xvc2UgdG8gWkVSTyB0byBiZSBaRVJPXG4gICAgbG9vcDogd2hpbGUgKGJhbGFuY2UgPiBFUFNJTE9OKSB7XG5cbiAgICAgIGxldCBzdWJ0cmFjdGVkO1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gb25seSBwcm9jZXNzIG5leHQgZGVidG9yIGlmIHRoZWlyIGJhbGFuY2UgaXMgcGFpZFxuICAgICAgICBpZiAoY3JlZGl0b3IuYW10ID09PSAwKSB7XG4gICAgICAgICAgY3JlZGl0b3IgPSBjcmVkaXQuc2hpZnQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1YnRyYWN0ZWQgPSBiYWxhbmNlIC0gY3JlZGl0b3IuYW10O1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBicmVhayBsb29wO1xuICAgICAgfVxuXG4gICAgICAvLyBmbG9hdGluZyBwb2ludCBwYWluIGNhdXNpbmcgaW5maW5pdGUgbG9vcFxuICAgICAgLy8gaWYgYmFsYW5jZSBub3QgWkVSTyBidXQgYWxtb3N0IHplcm8sIHRoZSBlbHNlIHN0YXRlbWVudCBiZWxvdyBpcyBleGVjdXRlZFxuICAgICAgLy8gc29tZSBpcyB0aGVuIFpFUk9cbiAgICAgIC8vIGFuZCBiYWxhbmNlIChhbG1vc3QgWkVSTykgbWludXMgZXF1YWwgWkVSTyBpcyBub3QgcXVpdGUgWkVST1xuICAgICAgLy8gc28gaW5maW5pdGUgbG9vcCFcbiAgICAgIC8vIC4xICsgLjIgPT09IDAuMzAwMDAwMDAwMDAwMDAwMDQgPC0tLS0tIEdBSCFcbiAgICAgIC8vIE9iamVjdCh7IC0wLjIzOiBbIE9iamVjdCh7IGlkOiAwLjU5NSwgYW10OiAwLjIyOTk5OTk5OTk5OTk5OTk4IH0pLCBPYmplY3QoeyBpZDogMC41OTUsIGFtdDogMC4zNjUgfSkgXSwgLTAuMTk6IFsgIF0sIC0wLjE3NTogWyAgXSB9KVxuXG4gICAgICBpZiAoc3VidHJhY3RlZCA+PSAwKSB7XG4gICAgICAgIC8vIHB1c2ggcHJpbWl0aXZlcywgbm90IHJlZmVyZW5jZXMuLlxuICAgICAgICBkZWJ0b3JzTWFwW3ZhbC5pZF0ucHVzaCh7aWQ6IGNyZWRpdG9yLmlkLCBhbXQ6IGNyZWRpdG9yLmFtdH0pO1xuICAgICAgICBiYWxhbmNlIC09IGNyZWRpdG9yLmFtdDtcbiAgICAgICAgY3JlZGl0b3IuYW10IC09IGNyZWRpdG9yLmFtdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHN1YnRyYWN0ZWQgaXMgbmVnYXRpdmVcbiAgICAgICAgbGV0IHNvbWUgPSBjcmVkaXRvci5hbXQgLSAoLXN1YnRyYWN0ZWQpO1xuICAgICAgICBkZWJ0b3JzTWFwW3ZhbC5pZF0ucHVzaCh7aWQ6IGNyZWRpdG9yLmlkLCBhbXQ6IHNvbWV9KTtcbiAgICAgICAgYmFsYW5jZSAtPSBzb21lO1xuICAgICAgICBjcmVkaXRvci5hbXQgLT0gc29tZTtcbiAgICAgIH1cblxuICAgIH1cblxuICB9KTtcbiAgcmV0dXJuIGRlYnRvcnNNYXA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNldHRsZTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==