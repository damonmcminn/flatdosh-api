import express from 'express';
import auth from './auth';
import CONFIG from 'parse-config';
import log from './log';
import errorHandler from './error';
import route404 from './404';
import CORS from './cors';
import requests from './requests';

import {json} from 'body-parser';

// controllers
import User from './user/controller';
import Expense from './expense/controller';
import Balance from './balance/controller';
import Group from './group/controller';

const api = express();

export default api;

api.initialise = function() {

  return new Promise(function(resolve, reject) {

    api.listen(CONFIG.port, function(err) {
      if (!err) {
        resolve(log.info(`Listening on ${CONFIG.port}`));
      } else {
        reject(err);
      }
    });

  });
};

api.use(CORS);
api.use(json());


api.use('/register', User.register);
api.use('/login', auth.password);

api.use(auth.token);
api.use('*', requests);

api.use('/expense', Expense);
api.use('/balance', Balance);
api.use('/settings', User.info);
api.use('/members', Group);

api.use(route404);
api.use('*', errorHandler);
