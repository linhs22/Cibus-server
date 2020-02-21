'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Nutrition', [{
            calories: 10,
            fat: 10,
            calfat: 10,
            fatpercent: 10,
            satfat: 10,
            transfat: 10,
            cholesterol: 10,
            cholesterolpercent: 10,
            sodium: 10,
            totalcarbs: 10,
            carbpercent: 10,
            fiber: 10,
            fiberpercent: 10,
            sugar: 10,
            vitd: 10,
            vita: 10,
            vitc: 10,
            calcium: 10,
            iron: 10,
            serving: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
            PostId: 1
        },
        {
            calories: 10,
            fat: 10,
            calfat: 10,
            fatpercent: 10,
            satfat: 10,
            transfat: 10,
            cholesterol: 10,
            cholesterolpercent: 10,
            sodium: 10,
            totalcarbs: 10,
            carbpercent: 10,
            fiber: 10,
            fiberpercent: 10,
            sugar: 10,
            vitd: 10,
            vita: 10,
            vitc: 10,
            calcium: 10,
            iron: 10,
            serving: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
            PostId: 2
        },
        {
            calories: 10,
            fat: 10,
            calfat: 10,
            fatpercent: 10,
            satfat: 10,
            transfat: 10,
            cholesterol: 10,
            cholesterolpercent: 10,
            sodium: 10,
            totalcarbs: 10,
            carbpercent: 10,
            fiber: 10,
            fiberpercent: 10,
            sugar: 10,
            vitd: 10,
            vita: 10,
            vitc: 10,
            calcium: 10,
            iron: 10,
            serving: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
            PostId: 3
        },
        {
            calories: 10,
            fat: 10,
            calfat: 10,
            fatpercent: 10,
            satfat: 10,
            transfat: 10,
            cholesterol: 10,
            cholesterolpercent: 10,
            sodium: 10,
            totalcarbs: 10,
            carbpercent: 10,
            fiber: 10,
            fiberpercent: 10,
            sugar: 10,
            vitd: 10,
            vita: 10,
            vitc: 10,
            calcium: 10,
            iron: 10,
            serving: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
            PostId: 4
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