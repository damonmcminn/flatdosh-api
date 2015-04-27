import {Router} from 'express';
import User from './model';
import {isError} from 'js-type-check';
import {group} from 'parse-config';

const register = Router();

// not in use
function findAll(req, res, next) {

  User.all().then(users => {
    res.json(users);
  });

}

function insert(req, res, next) {

  // logic
  // same as register page, but with extra field for group name
  // create group, with primary contact email (group consensus allows change)
  // create user
  // return token
  // carry on
  req.body.group = group;

  let user = User.validate(req.body);

  return isError(user) ? next(user) : 
    User.insert(user).then(result => {
      return result.errors === 0 ? res.json(result) : next(result);
    })
    .catch(err => next(err));
}

// not in use
function find(req, res, next) {

  let email = req.params.email;

  User.get(email)
    .then(user => {
      user ? res.json(user) : res.status(404).json({message: 'User not found'});
    })
    .catch(err => next(err));

}

//router.get('/', findAll);

//find.get('/:email', find);
register.post('/', insert);

export default {register};
