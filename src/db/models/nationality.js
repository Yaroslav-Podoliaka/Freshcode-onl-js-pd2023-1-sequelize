"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Nationality extends Model {
    static associate(models) {
      Nationality.hasMany(models.Author, {
        foreignKey: "nationality_id",
        onDelete: "CASCADE",
      });
    }
  }
  Nationality.init(
    {
      title: {
        type: DataTypes.STRING,
        // get() {
        //   rawValue = this.getDataValue(title);
        //   return rawValue ? rawValue.toUpperCase() : null;
        // },
      },
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Nationality",
      // timestamps: false,
    }
  );
  return Nationality;
};
