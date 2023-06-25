const express = require('express');
const router = express.Router();
const { Clothes } = require('../models');
const Collection = require('../models/collections');

const clothesCollection = new Collection(Clothes);
// Create new clothes
router.post('/', async (req, res, next) => {
  const { brand, size, color } = req.body;
  try {
    const clothes = await clothesCollection.create({ brand, size, color });
    res.status(201).json(clothes);
  } catch (err) {
    next(err);
  }
});
// Get all clothes
router.get('/', async (req, res, next) => {
  try {
    const clothes = await clothesCollection.read();
    res.json(clothes);
  } catch (err) {
    next(err);
  }
});

// Get a single clothes by ID
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const clothes = await clothesCollection.read(id);
    if (!clothes) {
      res.status(404).json({ message: 'Clothes not found' });
    } else {
      res.json(clothes);
    }
  } catch (err) {
    next(err);
  }
});



// Update a clothes
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { brand, size, color } = req.body;
  try {
    const clothes = await clothesCollection.update(id, { brand, size, color });
    res.json(clothes);
  } catch (err) {
    next(err);
  }
});

// Delete a clothes
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    await clothesCollection.delete(id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;