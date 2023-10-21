"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    static associate(models) {
      Author.belongsTo(models.Nationality, { foreignKey: "nationality_id" });
      Author.belongsToMany(models.Book, {
        through: models.Authors_Books,
        // timestamps: false
      });
    }
  }
  Author.init(
    {
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { is: /^[A-Z]+$/ },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      nationality_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Author",
      // timestamps: false,
    }
  );
  return Author;
};
