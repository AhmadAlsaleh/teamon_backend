'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FCMTokens extends Model {
    static associate(models) {
      FCMTokens.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  FCMTokens.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'FCMTokens',
  });
  return FCMTokens;
};
