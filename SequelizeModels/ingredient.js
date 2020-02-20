module.exports = function (sequelize, DataTypes) {
    var Ingredient = sequelize.define("Ingredient", {
        ingredient: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        amount:{
            type: DataTypes.FLOAT(10, 1),
            allowNull: false,
        },

    });

    Ingredient.associate = function (models) {
        // We're saying that a Tasks should belong to an Author
        // A Tasks can't be created without an Author due to the foreign key constraint
        Ingredient.belongsTo(models.Post, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    return Ingredient;
};