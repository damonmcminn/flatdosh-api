import log from '../log';

export default function(req, res, next) {

  log.info({
    id: req.user.id,
    path: req.originalUrl
  });
  next();

}
