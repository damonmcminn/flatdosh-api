import express from 'express';
import auth from './auth';
import CONFIG from 'parse-config';
import log from './log';
import errorHandler from './error';

import {json} from 'body-parser';

// controllers
import User from './user/controller';
import Expense from './expense/controller';
import Balance from './balance/controller';

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

api.use(json());

// auth here
api.use('/user', User);
api.use('/expense', Expense);
api.use('/balance', Balance);

api.use('*', errorHandler);
