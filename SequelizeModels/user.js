
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1]
      }
    },
    // Giving the User model a password of type STRING with a minimum length
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      }
    },
    // Giving the User model a email of type STRING with a minimum length
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      }
    },

    profilePic: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
      validate: {
        isUrl: true
      }
    }
  });

  User.associate = function (models) {
    // We're saying that a Users should belong to an Author
    // A User can't be created without an Author due to the foreign key constraint
    User.hasMany(models.Post, {
      foreignKey: {
        allowNull: true
    }
      
    });
    User.hasMany(models.Comment, {
      foreignKey: {
        allowNull: true
    }  
    });
    
    // junction table with follower table
    User.belongsToMany(models.User, { through: "Follower" , as: 'followerUserId',foreignKey:"followerUserId"});
    User.belongsToMany(models.User, { through: "Follower", as: 'followerId',foreignKey:"followerId"});

    User.belongsToMany(models.Post, { through: "Bookmark"});
    
  };
  return User;
};