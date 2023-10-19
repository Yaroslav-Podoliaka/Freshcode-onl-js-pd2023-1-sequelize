"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Customer, { foreignKey: "customer_id" });
      Order.belongsToMany(models.Book, {
        through: "orders_books",
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
