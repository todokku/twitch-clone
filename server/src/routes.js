import { Router } from 'express';

import { UserController, SessionController } from './app/controllers';
import authMiddleware from './app/middlewares/auth';

const routes = Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/users', UserController.index);
routes.get('/users/:user_id', UserController.show);

routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

export default routes;
