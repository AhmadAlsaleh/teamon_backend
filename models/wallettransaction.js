"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class WalletTransaction extends Model {
    static associate(models) {
      WalletTransaction.belongsTo(models.UserWallet, {
        foreignKey: "walletId",
      });
    }
  }
  WalletTransaction.init(
    {
      walletId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "UserWallet",
          key: "id",
        },
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("credit", "debit"),
        allowNull: false,
      },
      referance: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "WalletTransaction",
      hooks: {
        afterCreate: async (transaction, options) => {
          const walletId = transaction.walletId;
          const amount = transaction.amount;
          const type = transaction.type;
  
          const [wallet] = await sequelize.query(
            'SELECT balance FROM UserWallets WHERE id = ?',
            { replacements: [walletId], type: sequelize.QueryTypes.SELECT }
          );
  
          let newBalance;
          if (type === 'credit') {
            newBalance = wallet.balance + amount;
          } else if (type === 'debit') {
            newBalance = wallet.balance - amount;
          }
  
          await sequelize.query(
            'UPDATE UserWallets SET balance = ? WHERE id = ?',
            { replacements: [newBalance, walletId], type: sequelize.QueryTypes.UPDATE }
          );
        },
        afterUpdate: async (transaction, options) => {
          const walletId = transaction.walletId;
          const newAmount = transaction.amount;
          const newType = transaction.type;
          const previousTransaction = transaction._previousDataValues;
          const oldAmount = previousTransaction.amount;
          const oldType = previousTransaction.type;
  
          const [wallet] = await sequelize.query(
            'SELECT balance FROM UserWallets WHERE id = ?',
            { replacements: [walletId], type: sequelize.QueryTypes.SELECT }
          );
  
          let newBalance = wallet.balance;
  
          if (oldType === 'credit') {
            newBalance -= oldAmount;
          } else if (oldType === 'debit') {
            newBalance += oldAmount;
          }
  
          if (newType === 'credit') {
            newBalance += newAmount;
          } else if (newType === 'debit') {
            newBalance -= newAmount;
          }
  
          await sequelize.query(
            'UPDATE UserWallets SET balance = ? WHERE id = ?',
            { replacements: [newBalance, walletId], type: sequelize.QueryTypes.UPDATE }
          );
        },
        beforeDestroy: async (transaction, options) => {
          const walletId = transaction.walletId;
          const amount = transaction.amount;
          const type = transaction.type;
  
          const [wallet] = await sequelize.query(
            'SELECT balance FROM UserWallets WHERE id = ?',
            { replacements: [walletId], type: sequelize.QueryTypes.SELECT }
          );
  
          let newBalance;
          if (type === 'credit') {
            newBalance = wallet.balance - amount;
          } else if (type === 'debit') {
            newBalance = wallet.balance + amount;
          }
  
          await sequelize.query(
            'UPDATE UserWallets SET balance = ? WHERE id = ?',
            { replacements: [newBalance, walletId], type: sequelize.QueryTypes.UPDATE }
          );
        },
      },
    }
  );
  return WalletTransaction;
};
