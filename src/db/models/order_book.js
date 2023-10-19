"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order_book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order_book.belongsToMany(models.Order, {
        through: "order_book",
      });
      order_book.belongsToMany(models.Book, {
        through: "order_book",
      });
    }
  }
  order_book.init(
    {
      order_id: DataTypes.INTEGER,
      book_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "order_book",
    }
  );
  return order_book;
};
