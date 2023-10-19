"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Nationality extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Nationality.hasMany(models.Author, {foreignKey: 'nationality_id'});
    }
  }
  Nationality.init(
    {
      title: {
        type: DataTypes.STRING,
        get(){
          rawValue = this.getDataValue(title);
          return rawValue ? rawValue.toUpperCase() : null;
        },
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
