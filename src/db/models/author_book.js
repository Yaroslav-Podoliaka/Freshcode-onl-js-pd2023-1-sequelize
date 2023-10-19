"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class author_book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      author_book.belongsToMany(models.Author, {
        through: "author_book",
        // timestamps: false
      });
      author_book.belongsToMany(models.Book, {
        through: "author_book",
        // timestamps: false
      });
    }
  }
  author_book.init(
    {
      author_id: DataTypes.INTEGER,
      book_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "author_book",
    }
  );
  return author_book;
};
