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

      user.name = this.capitalize(user.name);
      user.username = user.username.toLowerCase();
      user.email = user.email.toLowerCase();
    });

    return this;
  }

  static capitalize(string) {
    const capitalized = string
      .toLowerCase()
      .replace(/(?:^|\s)\S/g, a => a.toUpperCase());

    return capitalized;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
