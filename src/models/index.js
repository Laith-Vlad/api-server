'use strict';
require('dotenv').config();
const { Sequelize } = require('sequelize');
const URI = process.env.DBURI
// Configure and initialize Sequelize
const sequelize = new Sequelize(`${URI}`, {
  // Additional Sequelize configurations if needed
});

// Import models
const Food = require('./food');
const Clothes = require('./clothes');

// Initialize models
Food.init(sequelize);
Clothes.init(sequelize);

// Define model associations
// ...

// Export models and sequelize instance
module.exports = {
  Food,
  Clothes,
  sequelize,
};