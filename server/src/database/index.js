import Sequelize from 'sequelize';

import Avatar from '../app/models/Avatar';
import User from '../app/models/User';
import sequelizeConfig from '../config/database';

const models = [User, Avatar];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(sequelizeConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
