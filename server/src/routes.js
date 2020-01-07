import { Router } from 'express';

import { UserController, SessionController } from './app/controllers';
import authMiddleware from './app/middlewares/auth';

const routes = Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

export default routes;
