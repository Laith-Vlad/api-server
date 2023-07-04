'use strict';
require('dotenv').config();

const { Sequelize } = require('sequelize');
const URI = process.env.NODE_ENV === 'test' ? 'sqlite::memory:' : process.env.DBURI;

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};

const sequelize = new Sequelize(URI, DATABASE_CONFIG);

// Import models

const Food = require('./food');
const Recipe = require('./recipe');

// Initialize models

Food.init(sequelize);
Recipe.init(sequelize);

// Define model associations
Food.hasMany(Recipe, {
  foreignKey: 'foodId',
  as: 'recipes',
});

Recipe.belongsTo(Food, {
  foreignKey: 'foodId',
  as: 'food',
});

// Export models and sequelize instance
module.exports = {
  Food,
  Recipe,
  sequelize,
};