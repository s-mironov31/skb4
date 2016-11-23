import _ from 'lodash';
import { AsyncRouter } from 'express-async-router';

export default (ctx) => {
  if(!_.has(ctx, 'resourses.Auth.validate')) throw '!resourses.Auth.validate';
  if(!_.has(ctx, 'resourses.Auth.signup')) throw '!resourses.Auth.signup';
  if(!_.has(ctx, 'resourses.Auth.login')) throw '!resourses.Auth.login';
  const api = AsyncRouter();

  api.all('/validate', ctx.resourses.Auth.validate);
  api.post('/signup', ctx.resourses.Auth.signup);
  api.post('/login', ctx.resourses.Auth.login);
  
  return api;
}
