'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItineraryTransportation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ItineraryTransportation.belongsTo(models.Itinerary, { foreignKey: "ItineraryId" })
    }
  }
  ItineraryTransportation.init({
    transportationType: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Transportation Type is Required"
        }
      }
    },
    from: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "From is Required"
        }
      }
    },
    to: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "To is Required"
        }
      }
    },
    distance: DataTypes.STRING,
    estimatedTime: DataTypes.STRING,
    estimatedPrice: DataTypes.INTEGER,
    ItineraryId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Itinerary Id is Required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'ItineraryTransportation',
  });
  return ItineraryTransportation;
};