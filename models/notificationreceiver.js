"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class NotificationReceiver extends Model {
    static associate(models) {
      NotificationReceiver.belongsTo(models.Notification, {
        foreignKey: "notificationId",
      });
      NotificationReceiver.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  NotificationReceiver.init(
    {
      notificationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Notification",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      status: {
        type: DataTypes.ENUM(["read", "unread"]),
        allowNull: false,
        defaultValue: "unread",
      },
    },
    {
      sequelize,
      modelName: "NotificationReceiver",
      timestamps: true,
    }
  );
  return NotificationReceiver;
};
