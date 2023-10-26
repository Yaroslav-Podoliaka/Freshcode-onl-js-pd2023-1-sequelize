"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shelf extends Model {
    static associate(models) {
      Shelf.hasMany(models.Book, {
        foreignKey: "shelf_id",
        onDelete: "CASCADE",
      });
    }
  }
  Shelf.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Shelf",
      // timestamps: false,
    }
  );
  return Shelf;
};
