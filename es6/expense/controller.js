import {Router} from 'express';
import Expense from './model';
import {isError} from 'js-type-check';
import uuid from 'node-uuid';

const router = Router();

export default router;

function findAll(req, res, next) {

  let {group} = req.params;

  Expense.all(group).then(expenses => {
    res.json(expenses);
  });

}

function insert(req, res, next) {

  // need to check if spender in group
  let spender = req.body.spender;

  // user == the user
  // shared == the user with whom user shares a bank account
  let user = req.user.id;

  // saving expense on behalf of another member?
  let onBehalfOf = (spender !== user && spender !== req.user.shared);

  // false, undefined or a members email
  let shared = onBehalfOf ? false : req.user.shared;

  // if share undefined|false, filter it from array
  let people = [user, shared].filter(email => email);
  let timestamp = new Date();
  let amount = req.body.amount/people.length;

  // validate group against req.user.groups
  let group = req.body.group;

  let expenses = people.map(email => {
    return {
      amount,
      creator: user,
      description: req.body.description,
      email,
      group,
      timestamp
    }
  });

  let shareId = uuid.v4();
  expenses.forEach(expense => {
    if (shared) {
      expense.shareId = shareId;
    }
    if (onBehalfOf) {
      expense.email = spender;
    }
  });

  let validatedExpense = Expense.validate(expenses[0]);

  return isError(validatedExpense) ? next(validatedExpense) : 
    Expense.insert(expenses).then(result => {
      return result.errors === 0 ? res.json(result) : next(result);
    })
    // errors not handled above
    .catch(err => next(err));
}

function destroy(req, res, next) {

  let user = req.user.id;
  let expenses = req.body;

  Expense.destroy(user, expenses)
    .then(result => {
      res.json({deleted: expenses});
    })
    .catch(next);

}

router.get('/:group', findAll);
router.post('/', insert);
router.delete('/', destroy);
