'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FriendList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FriendList.belongsTo(models.User, { foreignKey: "UserId" })
      FriendList.belongsTo(models.User, { foreignKey: "EctyId" })
    }
  }
  FriendList.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "User Id is Required"
        }
      }
    },
    FriendId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Friend Id is Required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'FriendList',
  });
  return FriendList;
};