"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsTo(models.Genre, { foreignKey: "genre_id" });
      Book.belongsTo(models.Shelf, { foreignKey: "shelf_id" });
      Book.belongsToMany(models.Author, {
        through: models.Author_Book,
        // timestamps: false,
      });
      Book.belongsToMany(models.Order, {
        through: models.Order_Book,
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
      image:DataTypes.STRING,
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
