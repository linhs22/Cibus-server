'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Ingredients', [{
        ingredient: "steak",
        amount: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
        PostId: 1,
      },
      {
        ingredient: "cheddar cheese",
        amount: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
        PostId: 1,
      },
      {
        ingredient: "bun",
        amount: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
        PostId: 1,
      },
      {
        ingredient: "pepperoni",
        amount: 10,
        PostId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ingredient: "mozarella cheese",
        amount: 10,
        PostId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ingredient: "marinara sauce",
        amount: 10,
        PostId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ingredient: "dough",
        amount: 10,
        PostId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ingredient: "noodles",
        amount: 10,
        PostId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ingredient: "pork broth",
        amount: 10,
        PostId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ingredient: "pork",
        amount: 10,
        PostId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ingredient: "bun",
        amount: 10,
        PostId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ingredient: "beef patty",
        amount: 10,
        PostId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ingredient: "pickles",
        amount: 10,
        PostId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ingredient: "cheddar cheese",
        amount: 10,
        PostId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ingredient: "onions",
        amount: 10,
        PostId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ingredient: "ketchup",
        amount: 10,
        PostId: 4,
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