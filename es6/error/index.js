import log from '../log';

const CODES = {
  'AuthError': 401
}

export default function errorHandler(err, req, res, next) {

  let {message, name} = err;
  log.info({
    message,
    user: req.user,
    auth_header: req.headers.authorization
  });

  res.status(CODES[name] || 400).json({message, name});

}
