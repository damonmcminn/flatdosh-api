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
  //req.body.group = group;

  let s = {
    'damonrmcminn@gmail.com': 'sarah.r.m.gibson@gmail.com',
    'sarah.r.m.gibson@gmail.com': 'damonrmcminn@gmail.com'
  };

  let {email, name, password} = req.body;
  let shared = s[email];

  return User.inGroup(email).then(group => {

    if (!group) {
      return res.status(403).json({message: 'bad email', email});
    }

    let user = {group, email, name, password, shared};

    user = User.validate(user);

    return isError(user) ? next(user) : 
      User.insert(user).then(result => {
        return result.errors === 0 ? res.sendStatus(200) : res.status(400).json({message: 'Email already exists'});
      })
      .catch(err => next(err));

  });
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
