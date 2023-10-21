"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    static associate(models) {
      Genre.hasMany(models.Book, {
        foreignKey: "genre_id",
        onDelete: "CASCADE",
        // onUpdate: 'SET DEFAULT',
      });
    }
  }
  Genre.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Genre",
      // timestamps: false,
    }
  );
  return Genre;
};
