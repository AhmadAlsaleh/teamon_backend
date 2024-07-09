"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserWallet extends Model {
    static associate(models) {
      UserWallet.belongsTo(models.User, { as: "User", foreignKey: "userId" });
      UserWallet.hasMany(models.WalletTransaction, { foreignKey: "walletId" });
    }
  }
  UserWallet.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      balance: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "UserWallet",
    }
  );
  return UserWallet;
};
