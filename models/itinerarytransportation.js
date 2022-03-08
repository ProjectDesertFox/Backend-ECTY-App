'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class itineraryTransportation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  itineraryTransportation.init({
    transportationType: DataTypes.STRING,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    distance: DataTypes.STRING,
    estimatedTime: DataTypes.STRING,
    estimatedPrice: DataTypes.INTEGER,
    ItineraryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'itineraryTransportation',
  });
  return itineraryTransportation;
};