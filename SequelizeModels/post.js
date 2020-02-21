module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            len: [1]
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            // unique: true,
            validate: {
                isUrl: true
            }
        },
        recipe: {
            type: DataTypes.TEXT,
            allowNull: true,
            len: [1]
        }

    });

    Post.associate = function (models) {
        // We're saying that a Tasks should belong to an Author
        // A Tasks can't be created without an Author due to the foreign key constraint
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: true
            }
        });
        Post.belongsToMany(models.User, { through: "Bookmark" });
        Post.hasMany(models.Ingredient, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: false
              }
        });
        Post.hasMany(models.Comment, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: false
              }
        });
        
        Post.hasOne(models.Nutrition, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: false
              }
        })


    };

    return Post;
};