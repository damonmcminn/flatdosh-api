'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _jsTypeCheck = require('js-type-check');

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var router = _express.Router();

exports['default'] = router;

function findAll(req, res, next) {
  var group = req.params.group;

  _model2['default'].all(group).then(function (expenses) {
    res.json(expenses);
  });
}

function insert(req, res, next) {

  // need to check if spender in group
  var spender = req.body.spender;

  // user == the user
  // shared == the user with whom user shares a bank account
  var user = req.user.id;

  // saving expense on behalf of another member?
  var onBehalfOf = spender !== user && spender !== req.user.shared;

  // false, undefined or a members email
  var shared = onBehalfOf ? false : req.user.shared;

  // if share undefined|false, filter it from array
  var people = [user, shared].filter(function (email) {
    return email;
  });
  var timestamp = new Date();
  var amount = req.body.amount / people.length;

  // validate group against req.user.groups
  var group = req.body.group;

  var expenses = people.map(function (email) {
    return {
      amount: amount,
      creator: user,
      description: req.body.description,
      email: email,
      group: group,
      timestamp: timestamp
    };
  });

  var shareId = _nodeUuid2['default'].v4();
  expenses.forEach(function (expense) {
    if (shared) {
      expense.shareId = shareId;
    }
    if (onBehalfOf) {
      expense.email = spender;
    }
  });

  var validatedExpense = _model2['default'].validate(expenses[0]);

  return _jsTypeCheck.isError(validatedExpense) ? next(validatedExpense) : _model2['default'].insert(expenses).then(function (result) {
    return result.errors === 0 ? res.json(result) : next(result);
  })
  // errors not handled above
  ['catch'](function (err) {
    return next(err);
  });
}

function destroy(req, res, next) {

  var user = req.user.id;
  var expenses = req.body;

  _model2['default'].destroy(user, expenses).then(function (result) {
    res.json({ deleted: expenses });
  })['catch'](next);
}

router.get('/:group', findAll);
router.post('/', insert);
router['delete']('/', destroy);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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R0FBQSxDQUFDLENBQUM7Q0FDNUI7O0FBRUQsU0FBUyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7O0FBRS9CLE1BQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0FBQ3ZCLE1BQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7O0FBRXhCLHFCQUFRLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQzVCLElBQUksQ0FBQyxVQUFBLE1BQU0sRUFBSTtBQUNkLE9BQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQztHQUMvQixDQUFDLFNBQ0ksQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUVoQjs7QUFFRCxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN6QixNQUFNLFVBQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUMiLCJmaWxlIjoiZXhwZW5zZS9jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IEV4cGVuc2UgZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge2lzRXJyb3J9IGZyb20gJ2pzLXR5cGUtY2hlY2snO1xuaW1wb3J0IHV1aWQgZnJvbSAnbm9kZS11dWlkJztcblxuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcblxuZnVuY3Rpb24gZmluZEFsbChyZXEsIHJlcywgbmV4dCkge1xuXG4gIGxldCB7Z3JvdXB9ID0gcmVxLnBhcmFtcztcblxuICBFeHBlbnNlLmFsbChncm91cCkudGhlbihleHBlbnNlcyA9PiB7XG4gICAgcmVzLmpzb24oZXhwZW5zZXMpO1xuICB9KTtcblxufVxuXG5mdW5jdGlvbiBpbnNlcnQocmVxLCByZXMsIG5leHQpIHtcblxuICAvLyBuZWVkIHRvIGNoZWNrIGlmIHNwZW5kZXIgaW4gZ3JvdXBcbiAgbGV0IHNwZW5kZXIgPSByZXEuYm9keS5zcGVuZGVyO1xuXG4gIC8vIHVzZXIgPT0gdGhlIHVzZXJcbiAgLy8gc2hhcmVkID09IHRoZSB1c2VyIHdpdGggd2hvbSB1c2VyIHNoYXJlcyBhIGJhbmsgYWNjb3VudFxuICBsZXQgdXNlciA9IHJlcS51c2VyLmlkO1xuXG4gIC8vIHNhdmluZyBleHBlbnNlIG9uIGJlaGFsZiBvZiBhbm90aGVyIG1lbWJlcj9cbiAgbGV0IG9uQmVoYWxmT2YgPSAoc3BlbmRlciAhPT0gdXNlciAmJiBzcGVuZGVyICE9PSByZXEudXNlci5zaGFyZWQpO1xuXG4gIC8vIGZhbHNlLCB1bmRlZmluZWQgb3IgYSBtZW1iZXJzIGVtYWlsXG4gIGxldCBzaGFyZWQgPSBvbkJlaGFsZk9mID8gZmFsc2UgOiByZXEudXNlci5zaGFyZWQ7XG5cbiAgLy8gaWYgc2hhcmUgdW5kZWZpbmVkfGZhbHNlLCBmaWx0ZXIgaXQgZnJvbSBhcnJheVxuICBsZXQgcGVvcGxlID0gW3VzZXIsIHNoYXJlZF0uZmlsdGVyKGVtYWlsID0+IGVtYWlsKTtcbiAgbGV0IHRpbWVzdGFtcCA9IG5ldyBEYXRlKCk7XG4gIGxldCBhbW91bnQgPSByZXEuYm9keS5hbW91bnQvcGVvcGxlLmxlbmd0aDtcblxuICAvLyB2YWxpZGF0ZSBncm91cCBhZ2FpbnN0IHJlcS51c2VyLmdyb3Vwc1xuICBsZXQgZ3JvdXAgPSByZXEuYm9keS5ncm91cDtcblxuICBsZXQgZXhwZW5zZXMgPSBwZW9wbGUubWFwKGVtYWlsID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgYW1vdW50LFxuICAgICAgY3JlYXRvcjogdXNlcixcbiAgICAgIGRlc2NyaXB0aW9uOiByZXEuYm9keS5kZXNjcmlwdGlvbixcbiAgICAgIGVtYWlsLFxuICAgICAgZ3JvdXAsXG4gICAgICB0aW1lc3RhbXBcbiAgICB9XG4gIH0pO1xuXG4gIGxldCBzaGFyZUlkID0gdXVpZC52NCgpO1xuICBleHBlbnNlcy5mb3JFYWNoKGV4cGVuc2UgPT4ge1xuICAgIGlmIChzaGFyZWQpIHtcbiAgICAgIGV4cGVuc2Uuc2hhcmVJZCA9IHNoYXJlSWQ7XG4gICAgfVxuICAgIGlmIChvbkJlaGFsZk9mKSB7XG4gICAgICBleHBlbnNlLmVtYWlsID0gc3BlbmRlcjtcbiAgICB9XG4gIH0pO1xuXG4gIGxldCB2YWxpZGF0ZWRFeHBlbnNlID0gRXhwZW5zZS52YWxpZGF0ZShleHBlbnNlc1swXSk7XG5cbiAgcmV0dXJuIGlzRXJyb3IodmFsaWRhdGVkRXhwZW5zZSkgPyBuZXh0KHZhbGlkYXRlZEV4cGVuc2UpIDogXG4gICAgRXhwZW5zZS5pbnNlcnQoZXhwZW5zZXMpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIHJldHVybiByZXN1bHQuZXJyb3JzID09PSAwID8gcmVzLmpzb24ocmVzdWx0KSA6IG5leHQocmVzdWx0KTtcbiAgICB9KVxuICAgIC8vIGVycm9ycyBub3QgaGFuZGxlZCBhYm92ZVxuICAgIC5jYXRjaChlcnIgPT4gbmV4dChlcnIpKTtcbn1cblxuZnVuY3Rpb24gZGVzdHJveShyZXEsIHJlcywgbmV4dCkge1xuXG4gIGxldCB1c2VyID0gcmVxLnVzZXIuaWQ7XG4gIGxldCBleHBlbnNlcyA9IHJlcS5ib2R5O1xuXG4gIEV4cGVuc2UuZGVzdHJveSh1c2VyLCBleHBlbnNlcylcbiAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgcmVzLmpzb24oe2RlbGV0ZWQ6IGV4cGVuc2VzfSk7XG4gICAgfSlcbiAgICAuY2F0Y2gobmV4dCk7XG5cbn1cblxucm91dGVyLmdldCgnLzpncm91cCcsIGZpbmRBbGwpO1xucm91dGVyLnBvc3QoJy8nLCBpbnNlcnQpO1xucm91dGVyLmRlbGV0ZSgnLycsIGRlc3Ryb3kpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9