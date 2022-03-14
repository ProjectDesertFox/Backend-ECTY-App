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
      UserVerification.belongsTo(models.User)
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
    statusValidEmail: {
      type : DataTypes.STRING,
      defaultValue: '2'
    },
    statusValidPhoneNumber: {
      type : DataTypes.STRING,
      defaultValue: '2'
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