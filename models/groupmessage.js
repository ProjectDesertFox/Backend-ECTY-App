'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GroupMessage.init({
    message: DataTypes.STRING,
    GroupMemberId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GroupMessage',
  });
  return GroupMessage;
};