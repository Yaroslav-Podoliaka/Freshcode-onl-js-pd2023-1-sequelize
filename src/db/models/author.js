"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Author.belongsTo(models.Nationality, {foreignKey: 'nationality_id'});
      Author.belongsToMany(models.Book, {
        through: "authors_books",
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
