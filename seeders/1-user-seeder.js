'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        firstname: "Paolo",
        lastname: "Torrado",
        username: 'mechea',
        password: 'coolstuff',
        email: 'ptorrado@email.com',
        aboutMe: "I'm having a kid",
        profilePic: "https://www.thenation.com/wp-content/uploads/2016/01/obama_sotu_2016_ap_img.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstname: "Jack",
        lastname: "Sorenson",
        username: 'javeyn',
        password: 'coolstuff',
        email: 'jsorenson@email.com',
        aboutMe: "Call me jack or jon or jackjon",
        profilePic: "https://www.thenation.com/wp-content/uploads/2016/01/obama_sotu_2016_ap_img.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstname: "Henry",
        lastname: "Lin",
        username: 'linhs22',
        password: 'coolstuff',
        email: 'hlin@email.com',
        aboutMe: "yup",
        profilePic: "https://www.thenation.com/wp-content/uploads/2016/01/obama_sotu_2016_ap_img.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstname: "Liam",
        lastname: "Hayes",
        username: 'crunchy126',
        password: 'coolstuff',
        email: 'lhayes@email.com',
        aboutMe: "I like crunchy stuff",
        profilePic: "https://www.thenation.com/wp-content/uploads/2016/01/obama_sotu_2016_ap_img.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    
      // Add reverting commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return queryInterface.bulkDelete('Users', null, {});
    
  }
};