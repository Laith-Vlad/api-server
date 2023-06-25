'use strict';
const { DataTypes, Model } = require('sequelize');

class Recipe extends Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Recipe',
      }
    );
  }

  static associate(models) {
    // Establish the belongs-to relationship with the Food model
    Recipe.belongsTo(models.Food, {
      foreignKey: 'foodId',
      as: 'food',
    });
  }
}

module.exports = Recipe;