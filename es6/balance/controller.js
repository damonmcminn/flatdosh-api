import {Router} from 'express';
import Balance from './model';

const router = Router();

export default router;
router.get('/:group', getBalances);
router.post('/settle/:group', settle);

function settle(req, res, next) {

  let {groups} = req.user;
  let {group} = req.params

  // validate group is in groups i.e. allowed

  res.json({message: 'Not implemented yet'});

}

function getBalances(req, res, next) {

  let {groups} = req.user;
  let {group} = req.params

  // validate group is in groups i.e. allowed

  Balance.get(group).then(balances => res.json(balances));
}
