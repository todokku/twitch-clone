import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { resolve } from 'path';

import './database';
import routes from './routes';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(
      '/static/avatars',
      express.static(resolve(__dirname, '..', 'uploads', 'avatars'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
