'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ItineraryTransportations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transportationType: {
        type: Sequelize.STRING,
      },
      from: {
        type: Sequelize.STRING,
      },
      to: {
        type: Sequelize.STRING,
      },
      // from: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      //   references: {
      //     model: 'ItineraryPlaces',
      //     key: 'id'
      //   },
      //   onUpdate: 'cascade',
      //   onDelete: 'cascade'
      // },
      // to: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      //   references: {
      //     model: 'ItineraryPlaces',
      //     key: 'id'
      //   },
      //   onUpdate: 'cascade',
      //   onDelete: 'cascade'
      // },
      distance: {
        type: Sequelize.STRING,
      },
      estimatedTime: {
        type: Sequelize.STRING
      },
      estimatedPrice: {
        type: Sequelize.INTEGER
      },
      ItineraryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Itineraries',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ItineraryTransportations');
  }
};