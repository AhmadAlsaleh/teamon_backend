"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WorkStep extends Model {
    static associate(models) {
      WorkStep.belongsTo(models.WorkSession, { foreignKey: "workSessionId" });
    }
  }
  WorkStep.init(
    {
      workSessionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'WorkSessions',
          key: 'id',
        },
      },
      dateTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(
          "start_work",
          "end_work",
          "start_break",
          "end_break"
        ),
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "WorkStep",
    }
  );
  return WorkStep;
};
