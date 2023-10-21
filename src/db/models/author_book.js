"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class author_book extends Model {
    static associate(models) {
      // define association here
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
