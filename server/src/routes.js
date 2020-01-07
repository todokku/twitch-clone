import { Router } from 'express';

import { UserController, SessionController } from './app/controllers';
import authMiddleware from './app/middlewares/auth';

const routes = Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.get('/users', UserController.index);
routes.get('/users/:user_id', UserController.show);
routes.put('/users', UserController.update);

export default routes;
