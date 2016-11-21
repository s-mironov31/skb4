import { AsyncRouter } from 'express-async-router';

export default (ctx) => {
  const api = AsyncRouter();
  api.all('/', () => ({ok: true, version: '1.0.1'}));
  api.all('/test', () => ({test: 123123}));
  return api;
};
