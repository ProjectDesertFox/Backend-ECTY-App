'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserVerification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserVerification.init({
    validEmail: {
      type: DataTypes.STRING,
      defaultValue: 'false'
    },
    validPhoneNumber: {
      type: DataTypes.STRING,
      defaultValue: 'false'
    },
    validKTP: {
      type: DataTypes.STRING,
      defaultValue: 'false'
    },
    UserId:{
      type : DataTypes.INTEGER
    },
    UserEmail: {
      type: DataTypes.STRING
    },
    UniqueNumberVerificationEmail: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'UserVerification',
  });
  return UserVerification;
};