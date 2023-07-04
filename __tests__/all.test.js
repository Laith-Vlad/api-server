"use strict";
const request = require('supertest');
const express = require('express');
const router = require('../src/routes/food');
const router2 = require('../src/routes/recipe');

const { Food, Recipe, sequelize } = require('../src/models/index');
const app = express();

app.use(express.json());
app.use('/', router);
app.use('/rec', router2);

beforeAll(async () => {
  await sequelize.sync();
});

// Clear the database after running the tests
afterAll(async () => {
  await sequelize.drop();
});

describe('Food Router', () => {
  it('should create a new food record', async () => {
    const response = await request(app)
      .post('/')
      .send({ name: 'chicken' }); // Use the provided input
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(expect.objectContaining({
      id: expect.any(Number),
      name: 'chicken',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    }));
  });

  it('should get all food records', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        name: 'chicken',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    ]));
  });
  it('should get a specific food record', async () => {
    // Create a new food record
    const createResponse = await request(app)
      .post('/')
      .send({ name: 'chicken' });

    const foodId = createResponse.body.id;

    // Retrieve the newly created food record
    const getResponse = await request(app).get(`/${foodId}`);
    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.body).toEqual(expect.objectContaining({
      id: foodId,
      name: 'chicken',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    }));
  });
  it('should update a specific food record', async () => {
    const createResponse = await request(app)
      .post('/')
      .send({ name: 'chicken' });

    const foodId = createResponse.body.id;

    const updateResponse = await request(app)
      .put(`/${foodId}`)
      .send({ name: 'updated chicken' });

    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body).toEqual(expect.objectContaining({
      id: foodId,
      name: 'updated chicken',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    }));
  });

  it('should delete a specific food record', async () => {
    const createResponse = await request(app)
      .post('/')
      .send({ name: 'chicken' });

    const foodId = createResponse.body.id;

    const deleteResponse = await request(app).delete(`/${foodId}`);
    expect(deleteResponse.statusCode).toBe(204);
  });

  it('should get all recipes for a specific food', async () => {
    // Create a new food record
    const createFoodResponse = await request(app)
      .post('/')
      .send({
        name: 'Chicken',
      });
  
    const foodId = createFoodResponse.body.id;
  
    // Create multiple recipe records associated with the food
    const createRecipePromises = [
      request(app)
        .post('/rec')
        .send({
          title: 'Chocolate Cake',
          description: 'A delicious chocolate cake recipe',
          foodId,
        }),
      request(app)
        .post('/rec')
        .send({
          title: 'Black Chocolate Cake',
          description: 'Another delicious chocolate cake recipe',
          foodId,
        }),
      // Add more recipe records if needed
    ];
  
    await Promise.all(createRecipePromises);
  
    // Retrieve all recipes for the food
    const getRecipesResponse = await request(app).get(`/${foodId}/recipes`);
  
    expect(getRecipesResponse.statusCode).toBe(200);
    expect(getRecipesResponse.body).toEqual(
      expect.objectContaining({
        id: foodId,
        name: 'Chicken',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        recipes: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            description: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            foodId,
          }),
        ]),
      })
    );
  });
  
 
    



});
////////////////////////////////////////////////////////////////////////// recipe tests //////////////////////////////////////////////////////////////////////////

describe('Recipe Router', () => {
  it('should create a new recipe', async () => {
    const response = await request(app)
      .post('/rec')
      .send({
        title: 'Chocolate Cake',
        description: 'A delicious chocolate cake recipe',
        foodId: 1,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('Chocolate Cake');
  });

  it('should get a specific recipe', async () => {
    // Create a new recipe
    const createResponse = await request(app)
      .post('/rec')
      .send({
        title: 'Chocolate Cake',
        description: 'A delicious chocolate cake recipe',
        foodId: 1,
      });

    const recipeId = createResponse.body.id;

    // Retrieve the newly created recipe
    const getResponse = await request(app).get(`/rec/${recipeId}`);

    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.body.title).toBe('Chocolate Cake');
  });

  it('should update a specific recipe', async () => {
    // Create a new recipe
    const createResponse = await request(app)
      .post('/rec')
      .send({
        title: 'Chocolate Cake',
        description: 'A delicious chocolate cake recipe',
        foodId: 1,
      });

    const recipeId = createResponse.body.id;

    // Update the recipe
    const updateResponse = await request(app)
      .put(`/rec/${recipeId}`)
      .send({
        title: 'Updated Chocolate Cake',
        description: 'An updated chocolate cake recipe',
        foodId: 1,
      });

    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body.title).toBe('Updated Chocolate Cake');
  });

  it('should delete a specific recipe', async () => {
    // Create a new recipe
    const createResponse = await request(app)
      .post('/rec')
      .send({
        title: 'Chocolate Cake',
        description: 'A delicious chocolate cake recipe',
        foodId: 1,
      });

    const recipeId = createResponse.body.id;

    // Delete the recipe
    const deleteResponse = await request(app).delete(`/rec/${recipeId}`);

    expect(deleteResponse.statusCode).toBe(200);
  });
});