'use strict';
const express = require('express');
const { Food, Recipe } = require('../models');
const Collection = require('../models/collections');

const router = express.Router();
const foodCollection = new Collection(Food);

// Route handlers

// Create a record
router.post('/', async (req, res, next) => {
  try {
    const food = await foodCollection.create(req.body);
    res.status(201).json(food);
  } catch (error) {
    next(error);
  }
});

// Get all records
router.get('/', async (req, res, next) => {
  try {
    const foodList = await foodCollection.read();
    res.json(foodList);
  } catch (error) {
    next(error);
  }
});

// Get one record
router.get('/:id', async (req, res, next) => {
  try {
    const food = await foodCollection.read(req.params.id);
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
    const food = await foodCollection.update(req.params.id, req.body);
    res.json(food);
  } catch (error) {
    next(error);
  }
});

// Delete a record
router.delete('/:id', async (req, res, next) => {
  try {
    await foodCollection.delete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
// Get recipes for a specific food item
router.get('/:foodId/recipes', async (req, res, next) => {
  try {
    const { foodId } = req.params;

    // Find the food item by its ID and include the Recipe model
    const food = await Food.findByPk(foodId, {
      include: [
        {
          model: Recipe,
          as: 'recipes',
        },
      ],
    });

    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    res.json(food);
  } catch (error) {
    next(error);
  }
});
module.exports = router;