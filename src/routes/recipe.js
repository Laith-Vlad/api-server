'use strict';
const express = require('express');
const { Recipe, Food } = require('../models');
const Collection = require('../models/collections');

const router = express.Router();
const recipeCollection = new Collection(Recipe);

// Get all records
router.get('/', async (req, res, next) => {
  try {
    const recipes = await recipeCollection.read(); // Read all recipes
    res.json(recipes);
  } catch (error) {
    next(error);
  }
});

// Get a specific record
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await recipeCollection.read(id); // Read a specific recipe
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    next(error);
  }
});

// Create a record
router.post('/', async (req, res, next) => {
  try {
    // Get the foodId from the request body
    const { foodId } = req.body;

    // Check if the specified food exists
    const food = await Food.findByPk(foodId);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    // Create the recipe and associate it with the food
    const recipe = await recipeCollection.create({ ...req.body, foodId });
    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
});

// Update a record
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    // Get the foodId from the request body
    const { foodId } = req.body;

    // Check if the specified food exists
    const food = await Food.findByPk(foodId);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    // Update the recipe and associate it with the new food
    const recipe = await recipeCollection.update(id, { ...req.body, foodId });
    res.json(recipe);
  } catch (error) {
    next(error);
  }
});

// Delete a record
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    // Check if the recipe exists
    const recipe = await recipeCollection.read(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Delete the recipe
    await recipeCollection.delete(id);
    res.json({ message: 'Recipe deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;