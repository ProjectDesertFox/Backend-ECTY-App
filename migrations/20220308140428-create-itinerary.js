'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Itineraries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      destination: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dateStart: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dateEnd: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rating: {
        type: Sequelize.STRING
      },
      budget: {
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sharingMemberSlot:{
        type: Sequelize.INTEGER
      },
      type:{
        type: Sequelize.STRING,
        allowNull: false
      },
      imageItinerary:{
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Itineraries');
  }
};