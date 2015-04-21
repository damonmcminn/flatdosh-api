import authUtil from 'auth-utilities';
import auth from 'auth-middleware';
import ErrorFactory from 'simple-error-factory';

const parseBasic = authUtil.parseHeader('basic');


export default function findUser(req) {

  return Promise.reject(ErrorFactory('rejection')());

}
