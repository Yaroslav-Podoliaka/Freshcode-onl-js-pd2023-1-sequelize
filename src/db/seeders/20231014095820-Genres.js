"use strict";
const { Genres } = require("../../constants/db-start-info");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Genres", Genres, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Genres", null, {});
  },
};
