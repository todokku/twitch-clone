import { Router } from 'express';
import multer from 'multer';

import {
  AvatarController,
  SessionController,
  UserController,
} from './app/controllers';
import authMiddleware from './app/middlewares/auth';
import avatarUploadConfig from './config/multer';

const routes = Router();
const upload = multer(avatarUploadConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/users', UserController.index);
routes.get('/users/:user_id', UserController.show);

routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

routes.post('/avatars', upload.single('file'), AvatarController.store);
routes.delete('/avatars/:file_id', AvatarController.delete);

export default routes;
