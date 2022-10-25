'use strict'

const SpeedModel = require('../models/Speed')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     return await queryInterface.createTable(SpeedModel.TABLE_NAME, SpeedModel.TABLE_ATTRIBUTES)
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.dropTable(SpeedModel.TABLE_NAME, SpeedModel.TABLE_ATTRIBUTES)
  }
};
