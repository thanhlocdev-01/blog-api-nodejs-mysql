"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories", [
      {
        name: "NodeJs",
      },
      {
        name: "ReactJs",
      },
      {
        name: "JavaScript",
      },
      {
        name: "Python",
      },
      {
        name: "Java",
      },
      {
        name: "C++",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", {}, null);
  },
};
