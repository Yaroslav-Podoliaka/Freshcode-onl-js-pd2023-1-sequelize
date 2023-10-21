"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Customer, { foreignKey: "customer_id" });
      Order.belongsToMany(models.Book, {
        through: models.Orders_Books,
        // timestamps: false,
      });
    }
  }
  Order.init(
    {
      title: DataTypes.STRING,
      order_date: DataTypes.DATEONLY,
      customer_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Order",
      // timestamps: false,
    }
  );
  return Order;
};
