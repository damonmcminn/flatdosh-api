import {Router} from 'express';
import Expense from './model';
import {isError} from 'js-type-check';

const router = Router();

export default router;

function findAll(req, res, next) {

  let {group} = req.user;

  Expense.all(group).then(expenses => {
    res.json(expenses);
  });

}

function insert(req, res, next) {

  let people = [req.user.user, req.user.shared].filter(email => email);
  let timestamp = new Date();
  let amount = req.body.amount/people.length;

  let expenses = people.map(email => {
    return {
      amount,
      description: req.body.description,
      timestamp,
      email,
      group: req.user.group
    }
  });

  return isError(Expense.validate(expenses[0])) ? next(expenses[0]) : 
    Expense.insert(expenses).then(result => {
      return result.errors === 0 ? res.json(result) : next(result);
    })
    .catch(err => next(err));
}

router.get('/', findAll);
router.post('/', insert);
