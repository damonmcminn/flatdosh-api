import Group from './model';
import {Router} from 'express';
import {toArray, conn} from '../db';

const router = Router();
export default router;

router.get('/:group', members);

function members(req, res, next) {

  let {groups} = req.user;
  let {group} = req.params

  let authorized = groups.filter(g => g.id === group).length > 0;
  
  if (!authorized) {
    return res.status(403).json({message: 'Not group member'});
  }

  return Group.getMembers(group)
    .then(members => res.json(members));

}
