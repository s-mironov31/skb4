import { AsyncRouter } from 'express-async-router';

export default (ctx) => {
  const api = AsyncRouter();
  api.post('/signup', ctx.resourses.Auth.signup);
}
