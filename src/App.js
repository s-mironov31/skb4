import bunyan from 'bunyan';
import express from 'express';
import mongoose from 'mongoose';
import getMiddlewares from './middlewares';
import getModels from './modelsr';
import getResourses from './resourses';
import getApi from './api';

class App {
  constructor(params = {}) {
    Object.assign(this, params);
    if(!this.log) this.log = this.getLogger();
    this.init();
  }

  getLogger() {
    return bunyan.createLogger(Object.assign({
        name: 'app',
        src: __DEV__,
        level: 'trace'
    }, params));
  }

  getMiddlewares() {
    return getMiddlewares(this);
  }

  getModels() {
    return getModels(this);
  }

  getResourses() {
    return getResourses(this);
  }

  getDatabase() {
    return {
      run: () => {
        new Promise((resolve) {
          mongoose.connect(this.config.db.url);
          resolve();
        });
      }
    }
  }

  init() {
    this.log.trace('App init');

    this.app = express();
    this.db = getDatabase;
    this.middlewares = getMiddlewares();
    this.log.trace('middlewares', Object.key(this.middlewares));
    this.models = getModels();
    this.log.trace('models', Object.key(this.models));
    this.resourse = getResourses();
    this.log.trace('resourse', Object.key(this.resourse));

    this.useMiddlewares();
    this.useRoutes();
  }

  useMiddlewares() {
    this.app.use(middlewares.reqLog);
    this.app.use(middlewares.accessLogger);
    this.app.use(middlewares.reqParser);
    this.app.use(resourse.Auth.parseToken);
    this.app.use(resourse.Auth.parseUser);
  }
  useRoutes() {
    const api = getApi(this)
    this.app.use('/api', api);
  }
  useDefaultRoute() {
    this.app.use((req, res, next) => {
      const err = ('Route not found');
      next(err);
    });
  }

  async run() {
    this.log.trace('App run');
    try {
      await this.db.run()
    } catch (err) {
      this.log.fatal(err);
    }

    return new Promise((resolve) => {
      this.app.listen(this.config.port, () => {
        console.log(`App ${this.config.name} running on port ${this.config.port}!`);
        resolve(this);
      });
    })

  }
}
