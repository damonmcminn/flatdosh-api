import express from 'express';
import auth from './auth';
import CONFIG from './config';
import log from './log';

import user from './user/model';

const api = express();

export default api;

api.initialise = function() {

  return new Promise(function(resolve, reject) {

    api.listen(CONFIG.port, function(err) {
      if (!err) {
        log.info(`Listening on ${CONFIG.port}`);
        Promise.resolve();
      } else {
        Promise.reject(err);
      }
    });

  });
}

api.use('/user', function(req, res, next) {
  //res.send(200);
  user.all()
    .then(function(users) {
      res.json(users);
    })
    .catch(function(err) {
      res.json(err);
    });
});
api.use('/auth', auth.password);
api.use(auth.token);

api.use('*', function(err, req, res, next) {
  res.json(err);
});
