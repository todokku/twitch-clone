import crypto from 'crypto';
import multer from 'multer';
import { resolve, extname } from 'path';

const avatarUploadConfig = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads', 'avatars'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};

export default avatarUploadConfig;
