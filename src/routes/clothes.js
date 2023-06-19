'use strict';
const express = require('express');
const router = express.Router();

// Import the Clothes model
const { Clothes } = require('../models');
// Import the custom error handlers
const notFoundHandler = require('../error-handlers/404');
const errorHandler = require('../error-handlers/500');

// Get all clothes
router.get('/', async (req, res, next) => {
  try {
    const clothes = await Clothes.findAll();
    res.json(clothes);
  } catch (err) {
    next(err);
  }
});

// Get a single clothes by ID
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const clothes = await Clothes.findByPk(id);
    if (!clothes) {
      notFoundHandler(res, 'Clothes not found');
    } else {
      res.json(clothes);
    }
  } catch (err) {
    next(err);
  }
});

// Create new clothes
router.post('/', async (req, res, next) => {
  const { brand, size, color } = req.body;
  try {
    const clothes = await Clothes.create({ brand, size, color });
    res.status(201).json(clothes);
  } catch (err) {
    next(err);
  }
});

// Update a clothes
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { brand, size, color } = req.body;
  try {
    const clothes = await Clothes.findByPk(id);
    if (!clothes) {
      notFoundHandler(res, 'Clothes not found');
    } else {
      await clothes.update({ brand, size, color });
      res.json(clothes);
    }
  } catch (err) {
    next(err);
  }
});

// Delete a clothes
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const clothes = await Clothes.findByPk(id);
    if (!clothes) {
      notFoundHandler(res, 'Clothes not found');
    } else {
      await clothes.destroy();
      res.json(clothes);
    }
  } catch (err) {
    next(err);
  }
});

// Handle 404 Not Found errors
router.use((req, res, next) => {
  notFoundHandler(req, res);
});

// Handle 500 Internal Server Error
router.use((err, req, res, next) => {
  errorHandler(err, req, res);
});

module.exports = router;