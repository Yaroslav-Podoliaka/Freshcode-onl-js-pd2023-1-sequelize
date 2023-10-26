"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Author_Book extends Model {
    static associate(models) {
      // define association here
    }
  }
  Author_Book.init(
    {
      author_id: DataTypes.INTEGER,
      book_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Author_Book",
    }
  );
  return Author_Book;
};
