"use strict";
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.hasMany(models.Order, {
        foreignKey: "customer_id",
        onDelete: "CASCADE",
      });
    }
  }
  Customer.init(
    {
      full_name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.INTEGER,
      // password: {
      //   type: DataTypes.STRING,
      //   set(value) {
      //     this.setDataValue("password", bcrypt.hashSync(value, 10));
      //   },
      // },
    },
    {
      sequelize,
      modelName: "Customer",
      // timestamps: false,
    }
  );
  return Customer;
};
