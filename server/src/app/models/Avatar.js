import { Model, STRING, VIRTUAL } from 'sequelize';

class Avatar extends Model {
  static init(sequelize) {
    super.init(
      {
        file_name: STRING,
        original_name: STRING,
        file_type: STRING,
        url: {
          type: VIRTUAL,
          get() {
            return `${process.env.APP_ADDRESS}:${process.env.APP_PORT}/static/avatars/${this.file_name}`;
          },
        },
      },
      { sequelize }
    );

    return this;
  }
}

export default Avatar;
