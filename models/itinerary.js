'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Itinerary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Itinerary.hasOne(models.GroupChat, { foreignKey: "ItineraryId" })
      Itinerary.hasMany(models.ItineraryPlace, { foreignKey: "ItineraryId" })
      Itinerary.hasMany(models.ItineraryTransportation, { foreignKey: "ItineraryId" })
      Itinerary.belongsTo(models.UserId, { foreignKey: "UserId" })
    }
  }
  Itinerary.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title is Required"
        }
      }
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Destination is Required"
        }
      }
    },
    dateStart: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Date Start is Required"
        }
      }
    },
    dateEnd: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Date End is Required"
        }
      }
    },
    rating: DataTypes.STRING,
    budget: DataTypes.INTEGER,
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "User Id is Required"
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Active'
    }
  }, {
    sequelize,
    modelName: 'Itinerary',
  });
  return Itinerary;
};