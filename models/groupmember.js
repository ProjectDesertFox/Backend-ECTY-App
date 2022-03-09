'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GroupMember.hasMany(models.GroupMessage, { foreignKey: "GroupMemberId" })
      GroupMember.belongsTo(models.GroupChat, { foreignKey: "GroupChatId" })
      GroupMember.belongsTo(models.User, { foreignKey: "UserId" })
    }
  }
  GroupMember.init({
    GroupChatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Group Chat Id is Required"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "User Id is Required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'GroupMember',
  });
  return GroupMember;
};