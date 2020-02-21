'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Followers', [{
        followerUserId: 1,
        followerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerUserId: 1,
        followerId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerUserId: 1,
        followerId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerUserId: 2,
        followerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerUserId: 2,
        followerId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerUserId: 3,
        followerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerUserId: 4,
        followerId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerUserId: 3,
        followerId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerUserId: 4,
        followerId: 1,
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