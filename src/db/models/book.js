"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsTo(models.Genre, { foreignKey: "genre_id" });
      Book.belongsTo(models.Shelf, { foreignKey: "shelf_id" });
      Book.belongsToMany(models.Author, {
        through: "authors_books",
        // timestamps: false,
      });
      Book.belongsToMany(models.Order, {
        through: "orders_books",
        // timestamps: false,
      });
    }
  }
  Book.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      genre_id: {
        type: DataTypes.INTEGER,
        // defaultValue: 0,
      },
      shelf_id: {
        type: DataTypes.INTEGER,
        // defaultValue: 0,
      },
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Book",
      // timestamps: false,
    }
  );
  return Book;
};
