'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bookmark', [{
        PostId: 1,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        PostId: 2,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        PostId: 3,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        PostId: 4,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        PostId: 1,
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        PostId: 4,
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        PostId: 1,
        UserId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        PostId: 1,
        UserId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        PostId: 3,
        UserId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
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