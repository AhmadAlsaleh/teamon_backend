'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WalletTransactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM('credit', 'debit'),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      referance: {
        type: Sequelize.STRING,
        allowNull: true
      },
      walletId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'UserWallets',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('WalletTransactions');
  }
};