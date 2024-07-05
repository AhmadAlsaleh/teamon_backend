'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'salary', {
      type: Sequelize.DOUBLE,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'workHours', {
      type: Sequelize.DOUBLE,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'breakHours', {
      type: Sequelize.DOUBLE,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'status', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'workdays', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'salary');
    await queryInterface.removeColumn('Users', 'workHours');
    await queryInterface.removeColumn('Users', 'breakHours');
    await queryInterface.removeColumn('Users', 'status');
    await queryInterface.removeColumn('Users', 'workdays');
  }
};
