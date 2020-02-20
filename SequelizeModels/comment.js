module.exports = function (sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        }

    });

    Comment.associate = function (models) {
        // We're saying that a Tasks should belong to an Author
        // A Tasks can't be created without an Author due to the foreign key constraint
        Comment.belongsTo(models.Post, {
            foreignKey: {
                allowNull: true
            }
        });
        Comment.belongsTo(models.User, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    return Comment;
};