'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FCMToken extends Model {
    static associate(models) {
      FCMToken.belongsTo(models.User, { as: 'User', foreignKey: 'userId' });
    }
  }
  FCMToken.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'FCMToken',
    timestamps: true,
  });
  return FCMToken;
};