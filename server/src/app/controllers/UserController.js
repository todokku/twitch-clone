import { Op } from 'sequelize';

import User from '../models/User';

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll({
        where: {
          stream_key: { [Op.ne]: null, [Op.ne]: '' },
        },
      });

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).error(error.message);
    }
  }

  async store(req, res) {
    try {
      const user = await User.create(req.body);

      user.excludePasswordFromReturn();

      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async update(req, res) {
    const { password, old_password, name, email } = req.body;

    try {
      const user = await User.findByPk(req.user_id);

      if (!user) return res.status(404).json({ error: 'User not found.' });

      if (password && !(await user.checkPassword(old_password)))
        return res.status(401).json({ error: 'Wrong old password.' });

      await user.update({ password, name, email });

      await user.reload({
        attributes: ['name', 'username', 'email', 'stream_key'],
      });

      user.excludePasswordFromReturn();

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

export default new UserController();
