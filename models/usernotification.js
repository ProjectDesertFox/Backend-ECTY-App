'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userNotification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userNotification.init({
    message: DataTypes.TEXT,
    status: DataTypes.STRING,
    type: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    DataId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userNotification',
  });
  return userNotification;
};