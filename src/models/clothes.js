'use strict';
const { DataTypes, Model } = require('sequelize');

class Clothes extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        brand: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        size: {
          type: DataTypes.STRING,
        },
        color: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: 'Clothes',
      }
    );
  }
}

module.exports = Clothes;