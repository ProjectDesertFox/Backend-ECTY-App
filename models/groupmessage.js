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
      GroupMessage.belongsTo(models.GroupMember, { foreignKey: "GroupMemberId" })
    }
  }
  GroupMessage.init({
    message: DataTypes.STRING,
    GroupMemberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Group Member Id is Required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'GroupMessage',
  });
  return GroupMessage;
};