"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WorkSession extends Model {
    static associate(models) {
      WorkSession.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      WorkSession.hasMany(models.WorkStep, {
        foreignKey: "workSessionId",
        as: "workSteps",
      });
    }
  }
  WorkSession.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "WorkSession",
    }
  );
  return WorkSession;
};
