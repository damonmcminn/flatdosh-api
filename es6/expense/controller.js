import {Router} from 'express';
import Expense from './model';
import {isError} from 'js-type-check';

const router = Router();

export default router;

function findAll(req, res, next) {

  Expense.all().then(expenses => {
    res.json(expenses);
  });

}

function insert(req, res, next) {

  req.body.timestamp = new Date();
  let expense = Expense.validate(req.body);

  return isError(expense) ? next(expense) : 
    Expense.insert(expense).then(result => {
      return result.errors === 0 ? res.json(result) : next(result);
    })
    .catch(err => next(err));
}

router.get('/', findAll);
router.post('/', insert);
