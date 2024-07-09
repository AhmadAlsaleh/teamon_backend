"use strict";

const { encryptPassword } = require("../services/passwordService");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.UserWallet, { foreignKey: 'userId' });

      User.hasMany(models.WorkSession, {
        foreignKey: "userId",
        as: "workSessions",
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("admin", "employee"),
        allowNull: false,
      },
      profession: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      salary: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      workHours: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      breakHours: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true
      },
      workdays: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      timestamps: true,
      modelName: "User",
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await encryptPassword(user.password);
          }
        },
        beforeUpdate: async (user) => {
          if (user.password) {
            user.password = await encryptPassword(user.password);
          }
        },
      },
    }
  );
  return User;
};
