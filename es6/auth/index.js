import findUser from './findUser';
import express from 'express';
import auth from 'auth-middleware';
import CONFIG from 'parse-config';
import log from '../log';
import {parseHeader, password} from 'auth-utilities';

const parseBasic = parseHeader('basic');
const validate = auth.password(findUser, CONFIG.secret, 10);
const router = express.Router();

router.get(function(req, res, next) {
  res.json({message: 'GET /auth not allowed'});
});
router.post(function(req, res, next) {
  let {user} = parseBasic(req.headers.authorization);
  log.info({path: req.url, user});
  validate(req, res, next);
});

export default {
  token: express.Router().use(auth.token(CONFIG.secret)),
  router: router,
  hash: password(10).hash
}
