import {Router} from 'express';
import User from './model';
import {isError} from 'js-type-check';
import {group} from 'parse-config';

const register = Router();
const info = Router();

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

  return User.inGroup(email).then(groups => {

    let notInGroup = groups.length === 0;

    if (notInGroup) {
      return res.status(403).json({message: 'You need an invite', email});
    }

    let user = {groups, email, name, password, shared};

    user = User.validate(user);

    return isError(user) ? next(user) : 
      User.insert(user).then(result => {
        return result.errors === 0 ? res.sendStatus(200) : res.status(400).json({message: 'Email already exists'});
      })
      .catch(err => next(err));

  });
}

function find(req, res, next) {

  delete req.user.password;
  res.json(req.user);
}

//router.get('/', findAll);

info.get('/', find);
register.post('/', insert);

export default {register, info};
