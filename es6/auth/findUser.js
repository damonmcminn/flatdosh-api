import authUtil from 'auth-utilities';
import auth from 'auth-middleware';
import ErrorFactory from 'simple-error-factory';
import log from '../log';
import User from '../user/model';
import hash from './hash';

const parseBasic = authUtil.parseHeader('basic');
const AuthError = ErrorFactory('auth');

export default function findUser(req) {

  const TODAY = Date.now();
  const THREE_MONTHS = TODAY + (365*24*60*60*1000)/4;
  let header = req.headers.authorization;

  // undefined if false
  let parsed = parseBasic(header);
  let {user, password} = parsed;

  // logging base64 encoded password here... possibly
  log.info({login: user || header});

  if (!parsed) return Promise.reject(AuthError(`Couldn't parse: ${header}`));

  return User.get(user).then(result => {

    if (result) {
      let payload = {
        user: result.id,
        exp: THREE_MONTHS,
        name: result.name,
        group: result.group,
        shared: result.shared
      };

      let hash = result.password;
      let plain = password;

      return Promise.resolve({payload, hash, plain});
    } else {
      return Promise.reject(AuthError('User not found'));
    }

  })
  .catch(err => Promise.reject(err));

}
