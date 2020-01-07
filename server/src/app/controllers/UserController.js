import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const user = await User.create(req.body);

      user.excludePasswordFromReturn();

      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

export default new UserController();
