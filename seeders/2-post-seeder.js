'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [
      {
        description: "Steak Sandwich",
        image: "https://www.foxvalleyfoodie.com/wp-content/uploads/2018/07/steak-sandwich-feature.jpg",
        recipe: "add bread and steak",
        UserId: 1,
        location: "Bellevue, WA",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: "Pizza",
        image: "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/dc23cd051d2249a5903d25faf8eeee4c/BFV36537_CC2017_2IngredintDough4Ways-FB.jpg",
        recipe: "Go to dominoes",
        UserId: 2,
        location: "Everett, WA",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: "Ramen",
        image: "https://glebekitchen.com/wp-content/uploads/2017/04/tonkotsuramenfront.jpg",
        recipe: "Go to a ramen restaurant",
        UserId: 3,
        location: "Kirkland, WA",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: "Cheeseburger",
        image: "https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Cheeseburger.jpg",
        recipe: "Go to a Mcdonalds",
        UserId: 4,
        location: "Seattle, WA",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: "Steak (not a sandwich)",
        image: "https://www.foxvalleyfoodie.com/wp-content/uploads/2018/07/steak-sandwich-feature.jpg",
        recipe: "remove bread, and add steak",
        UserId: 1,
        location: "Renton, WA",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: "Steak Salad",
        image: "https://www.foxvalleyfoodie.com/wp-content/uploads/2018/07/steak-sandwich-feature.jpg",
        recipe: "add lots of lettuce, eggs, and steak",
        UserId: 1,
        location: "Seattle, WA",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: "Impossible Steak",
        image: "https://www.foxvalleyfoodie.com/wp-content/uploads/2018/07/steak-sandwich-feature.jpg",
        recipe: "add lots of questionable stuff that looks like steak",
        UserId: 1,
        location: "Seattle, WA",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: "Jamba Juice Juicebox",
        image: "https://www.foxvalleyfoodie.com/wp-content/uploads/2018/07/steak-sandwich-feature.jpg",
        recipe: "2 bananas, 4 strawberries, 9 apples",
        UserId: 1,
        location: "Seattle, WA",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: "Applesauce",
        image: "https://www.foxvalleyfoodie.com/wp-content/uploads/2018/07/steak-sandwich-feature.jpg",
        recipe: "apples, mushed and cooked to perfection",
        UserId: 1,
        location: "Seattle, WA",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: "Paolo Surprise",
        image: "https://www.foxvalleyfoodie.com/wp-content/uploads/2018/07/steak-sandwich-feature.jpg",
        recipe: "made by Paolo, not from him",
        UserId: 1,
        location: "Seattle, WA",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: "Vegan Bacon",
        image: "https://www.foxvalleyfoodie.com/wp-content/uploads/2018/07/steak-sandwich-feature.jpg",
        recipe: "Smoked strips of grade C cow leather",
        UserId: 1,
        location: "Seattle, WA",
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