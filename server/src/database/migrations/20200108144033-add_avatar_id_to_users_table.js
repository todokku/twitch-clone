'use strict';

module.exports = {
  up: (queryInterface, { INTEGER }) => {
    return queryInterface.addColumn('users', 'avatar_id', {
      type: INTEGER,
      defaultValue: 1,
      allowNull: false,
      references: {
        model: 'avatars',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET DEFAULT',
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
