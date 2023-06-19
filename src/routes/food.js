'use strict';
const express = require('express');
const { Food } = require('../models');
const notFoundHandler = require('../error-handlers/404');
const errorHandler = require('../error-handlers/500');

const router = express.Router();

// Create a record
router.post('/', async (req, res, next) => {
  try {
    const { name, description, price } = req.body;
    const food = await Food.create({ name, description, price });
    res.status(201).json(food);
  } catch (error) {
    next(error);
  }
});

// Get all records
router.get('/', async (req, res, next) => {
  try {
    const foodList = await Food.findAll();
    res.json(foodList);
  } catch (error) {
    next(error);
  }
});

// Get one record
router.get('/:id', async (req, res, next) => {
  try {
    const food = await Food.findByPk(req.params.id);
    if (!food) {
      return notFoundHandler(req, res);
    }
    res.json(food);
  } catch (error) {
    next(error);
  }
});

// Update a record
router.put('/:id', async (req, res, next) => {
  try {
    const food = await Food.findByPk(req.params.id);
    if (!food) {
      return notFoundHandler(req, res);
    }
    const { name, description, price } = req.body;
    await food.update({ name, description, price });
    res.json(food);
  } catch (error) {
    next(error);
  }
});

// Delete a record
router.delete('/:id', async (req, res, next) => {
  try {
    const food = await Food.findByPk(req.params.id);
    if (!food) {
      return notFoundHandler(req, res);
    }
    await food.destroy();
    res.json(food);
  } catch (error) {
    next(error);
  }
});

module.exports = router;