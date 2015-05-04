import findUser from './findUser';
import express from 'express';
import middleware from 'auth-middleware';
import {secret, rounds} from 'parse-config';
import util from 'auth-utilities';
import userDetails from './userDetails';

const password = express.Router();
const token = express.Router();
const {hash} = util.password(rounds);

// returned validation middleware
password.post('/', middleware.password(findUser, secret, rounds));
token.use('/', middleware.token(secret, userDetails));

export default {password, token};
