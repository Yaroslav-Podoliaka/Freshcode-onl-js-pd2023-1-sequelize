"use strict";
const { Shelves } = require("../../constants/db-start-info");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Shelves", Shelves, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Shelves", null, {});
  },
};
