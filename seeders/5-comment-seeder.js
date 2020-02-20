'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [{
        comment: "Wow this looks good",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1,
        PostId: 1
      },
      {
        comment: "Yuck",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 2,
        PostId: 1
      },
      {
        comment: "why would you say that",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 3,
        PostId: 1
      },
      {
        comment: "How'd you make",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1,
        PostId: 2
      },
      {
        comment: "yumm!",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 2,
        PostId: 3
      },
      {
        comment: "Hey",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 4,
        PostId: 3
      },
      
      
      
      
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};