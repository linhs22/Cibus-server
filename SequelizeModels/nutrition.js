module.exports = function (sequelize, DataTypes) {
    var Nutrition = sequelize.define("Nutrition", {

        calories: {
            type: DataTypes.FLOAT(10, 0),
            allowNull: false,
        },
        fat: {
            type: DataTypes.FLOAT(10, 0),
            allowNull: false,
        },
        calfat: {
            type: DataTypes.FLOAT(10, 0),
            allowNull: false,
        },
        fatpercent: {
            type: DataTypes.FLOAT(10, 0),
            allowNull: false,
        },
        satfat: {
            type: DataTypes.FLOAT(10, 1),
            allowNull: false,
        },
        transfat: {
            type: DataTypes.FLOAT(10, 1),
            allowNull: false,
        },
        cholesterol: {
            type: DataTypes.FLOAT(10, 0),
            allowNull: false,
        },
        cholesterolpercent: {
            type: DataTypes.FLOAT(10, 0),
            allowNull: false,
        },
        sodium: {
            type: DataTypes.FLOAT(10, 0),
            allowNull: false,
        },
        totalcarbs: {
            type: DataTypes.FLOAT(10, 0),
            allowNull: false,
        },
        carbpercent: {
            type: DataTypes.FLOAT(10, 0),
            allowNull: false,
        },
        fiber: {
            type: DataTypes.FLOAT(10, 0),
            allowNull: false,
        },
        fiberpercent: {
            type: DataTypes.FLOAT(10, 0),
            allowNull: false,
        },
        sugar: {
            type: DataTypes.FLOAT(10, 0),
            allowNull: false,
        },
        vitd: {
            type: DataTypes.FLOAT(10, 1),
            allowNull: false,
        },
        vita: {
            type: DataTypes.FLOAT(10, 1),
            allowNull: false,
        },
        vitc: {
            type: DataTypes.FLOAT(10, 1),
            allowNull: false,
        },
        calcium: {
            type: DataTypes.FLOAT(10, 1),
            allowNull: false,
        },
        iron: {
            type: DataTypes.FLOAT(10, 1),
            allowNull: false,
        },
        serving: {
            type: DataTypes.FLOAT(10, 0),
            allowNull: false,
        },

    });

    Nutrition.associate = function (models) {
        // We're saying that a Tasks should belong to an Author
        // A Tasks can't be created without an Author due to the foreign key constraint
        Nutrition.belongsTo(models.Post, {
            foreignKey: {
                allowNull: true
            }
        });

    };

    return Nutrition;
};