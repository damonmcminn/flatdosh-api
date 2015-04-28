import log from '../log';

const CODES = {
  'AuthError': 401
}

export default function errorHandler(err, req, res, next) {

  let {message, name} = err;
  log.error(err);

  res.status(CODES[name] || 400).json({message, name});

}
