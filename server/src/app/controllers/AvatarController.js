import fs from 'fs';
import { resolve } from 'path';

import Avatar from '../models/Avatar';

class AvatarController {
  async store(req, res) {
    const {
      originalname: original_name,
      filename: file_name,
      mimetype: file_type,
    } = req.file;

    try {
      const file = await Avatar.create({
        original_name,
        file_name,
        file_type,
      });

      return res.status(201).json(file);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async delete(req, res) {
    const { file_id } = req.params;

    const file = await Avatar.findByPk(file_id);

    if (!file) return res.status(404).json({ error: 'File not found.' });

    const path = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'uploads',
      'avatars',
      file.file_name
    );

    try {
      fs.unlinkSync(path);

      await file.destroy();

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

export default new AvatarController();
