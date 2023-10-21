'use strict';
const { Nationalities } = require("../../constants/db-start-info");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Nationalities', Nationalities, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Nationalities', null, {});
  }
};
