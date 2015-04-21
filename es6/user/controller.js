import {Router} from 'express';
import User from './model';
import {isError} from 'js-type-check';

const router = Router();

export default router;

function findAll(req, res, next) {

  User.all().then(users => {
    res.json(users);
  });

}

function insert(req, res, next) {

  let user = User.validate(req.body);

  return isError(user) ? next(user) : 
    User.insert(user).then(result => {
      return result.errors === 0 ? res.json(result) : next(result);
    })
    .catch(err => next(err));
}

router.get('/', findAll);
router.post('/', insert);
