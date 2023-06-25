'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const foodRoutes = require('./routes/food');
const clothesRoutes = require('./routes/clothes');
const errorHandler = require('./error-handlers/500');
const notFoundHandler = require('./error-handlers/404');
const { sequelize } = require('./models');
const recipeRoutes = require('../src/routes/recipe');
const app = express();

app.use(express.json());

app.use('/food', foodRoutes);
// app.use('/clothes', clothesRoutes);
app.use('/foods', recipeRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

sequelize
  .sync()
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = app;