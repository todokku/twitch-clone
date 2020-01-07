import bcrypt from 'bcryptjs';
import { Model, STRING, VIRTUAL } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: STRING,
        username: STRING,
        email: STRING,
        password: VIRTUAL,
        password_hash: STRING,
        stream_key: STRING,
      },
      { sequelize }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 10);
      }
    });

    return this;
  }
}

export default User;
