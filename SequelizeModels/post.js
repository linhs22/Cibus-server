module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: ""
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "http://foo.com",
            // validate: {
            //     isUrl: true
            // }
        },
        recipe: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: "",
            validate: {
                max: 1000
              }
        }

    });

    Post.associate = function (models) {
        // We're saying that a Tasks should belong to an Author
        // A Tasks can't be created without an Author due to the foreign key constraint
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Post.belongsToMany(models.User, { through: "Bookmark" });
        Post.hasMany(models.Ingredient, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: true
              }
        });
        Post.hasMany(models.Comment, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: true
              }
        });
        
        Post.hasOne(models.Nutrition, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: true
              }
        })


    };

    return Post;
};