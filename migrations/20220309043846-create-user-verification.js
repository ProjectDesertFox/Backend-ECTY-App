'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserVerifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      validEmail: {
        type: Sequelize.STRING
      },
      validPhoneNumber: {
        type: Sequelize.STRING
      },
      validKTP: {
        type: Sequelize.STRING
      },
      statusValidEmail: {
        type : Sequelize.STRING,
      },
      statusValidPhoneNumber: {
        type : Sequelize.STRING
      },
      UserId: {
        type: Sequelize.INTEGER,
        unique: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      UserEmail: {
        type: Sequelize.STRING,
        unique: true
      },
      UniqueNumberVerificationEmail: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('UserVerifications');
  }
};