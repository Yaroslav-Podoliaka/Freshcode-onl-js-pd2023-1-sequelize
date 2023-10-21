"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_Book extends Model {
    static associate(models) {
      // define association here
    }
  }
  Order_Book.init(
    {
      order_id: DataTypes.INTEGER,
      book_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order_Book",
    }
  );
  return Order_Book;
};
