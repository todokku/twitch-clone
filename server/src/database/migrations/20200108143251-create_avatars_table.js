'use strict';

module.exports = {
  up: async (queryInterface, { INTEGER, STRING, DATE }) => {
    await queryInterface.createTable('avatars', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      file_name: {
        type: STRING,
        allowNull: false,
      },
      original_name: {
        type: STRING,
        allowNull: false,
      },
      file_type: {
        type: STRING,
        allowNull: false,
      },
      created_at: {
        type: DATE,
        allowNull: false,
      },
      updated_at: {
        type: DATE,
        allowNull: false,
      },
    });

    return queryInterface.bulkInsert('avatars', [
      {
        file_name: 'placeholder.png',
        original_name: 'placeholder.png',
        file_type: 'image/png',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('avatars', { id: 1 });

    return queryInterface.dropTable('avatars');
  },
};
