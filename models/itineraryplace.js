'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class itineraryPlace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  itineraryPlace.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    estimatedPrice: DataTypes.INTEGER,
    rating: DataTypes.STRING,
    itineraryOrder: DataTypes.INTEGER,
    date: DataTypes.STRING,
    ItineraryId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'itineraryPlace',
  });
  return itineraryPlace;
};