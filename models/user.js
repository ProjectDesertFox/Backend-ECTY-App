'use strict';
const {
  Model
} = require('sequelize');
const { encrypt } = require('../helper/bycrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.FriendList, { foreignKey: "UserId" })
      User.hasMany(models.FriendList, { foreignKey: "EctyId" })
      User.hasMany(models.UserNotification, { foreignKey: "UserId" })
      User.hasMany(models.GroupMember, { foreignKey: "UserId" })
      User.hasMany(models.Itinerary, { foreignKey: "UserId" })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Username is Required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Format Email is not Valid"
        },
        notEmpty: {
          msg: "Email is Required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is Required"
        },
        isLength: {
          args: [5],
          msg: "Password Characters minimun is 5"
        }
      },
    },
    phoneNumber: DataTypes.STRING,
    ktp: DataTypes.STRING,
    EctyId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Ecty Id is Required"
        }
      }
    },
    planStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Basic'
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = encrypt(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};