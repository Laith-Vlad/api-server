'use strict';
require('dotenv').config();
const { Sequelize } = require('sequelize');
const URI = process.env.DBURI;
// Configure and initialize Sequelize
const sequelize = new Sequelize(`${URI}`, {
  // Additional Sequelize configurations if needed
});

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