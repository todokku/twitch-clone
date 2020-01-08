import jwt from 'jsonwebtoken';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { username, email, password } = req.body;

    try {
      const user = await User.findOne({
        where: {
          [username ? 'username' : 'email']: username || email,
        },
      });

      if (!user) return res.status(401).json({ error: 'Invalid credentials.' });

      const passwordMatch = await user.checkPassword(password);

      if (!passwordMatch)
        return res.status(401).json({ error: 'Invalid credentials.' });

      const payload = {
        id: user.id,
        name: user.name,
        username: user.username,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET);

      return res.status(200).json({ ...payload, token });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

export default new SessionController();
