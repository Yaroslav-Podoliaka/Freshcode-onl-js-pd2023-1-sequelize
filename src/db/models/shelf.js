"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shelf extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shelf.hasMany(models.Book, {
        foreignKey: "shelf_id",
        onDelete: "SET DEFAULT",
      });
    }
  }
  Shelf.init(
    {
      title: DataTypes.STRING,
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
