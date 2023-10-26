"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Customer, { foreignKey: "customer_id" });
      Order.belongsToMany(models.Book, {
        through: models.Order_Book,
        // timestamps: false,
      });
    }
  }
  Order.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      order_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
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
