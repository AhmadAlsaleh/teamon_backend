"use strict";

const { encryptPassword } = require("../services/passwordService");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
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
