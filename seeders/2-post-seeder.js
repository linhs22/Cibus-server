'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [{
        description: "Steak Sandwich",
        image: "https://www.foxvalleyfoodie.com/wp-content/uploads/2018/07/steak-sandwich-feature.jpg",
        recipe: "add bread and steak",
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: "Pizza",
        image: "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/dc23cd051d2249a5903d25faf8eeee4c/BFV36537_CC2017_2IngredintDough4Ways-FB.jpg",
        recipe: "Go to dominoes",
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: "Ramen",
        image: "https://glebekitchen.com/wp-content/uploads/2017/04/tonkotsuramenfront.jpg",
        recipe: "Go to a ramen restaurant",
        UserId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: "Cheeseburger",
        image: "https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Cheeseburger.jpg",
        recipe: "Go to a Mcdonalds",
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