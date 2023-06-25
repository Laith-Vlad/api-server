const request = require('supertest');
const express = require('express');
const router = require('../src/routes/food');
const router2 = require('../src/routes/recipe');

const app = express();
app.use(express.json());
app.use('/', router);
app.use('/rec/', router2);


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
    let createdRecipeId;
  
    // Test case: Create a new recipe record
    it('should create a new recipe record', async () => {
      const response = await request(app)
        .post('/rec')
        .send({
          title: 'Chocolate Cake',
          description: 'A delicious chocolate cake recipe',
          foodId: 80,
        });
  
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: 'Chocolate Cake',
          description: 'A delicious chocolate cake recipe',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          foodId: 80,
        })
      );
  
      createdRecipeId = response.body.id;
    });
  
    // Test case: Get a specific recipe record
    it('should get a specific recipe record', async () => {
      const response = await request(app).get(`/rec/${createdRecipeId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: 'Chocolate Cake',
          description: 'A delicious chocolate cake recipe',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          foodId: 80,
        })
      );
    });
  
    // Test case: Update a specific recipe record
    it('should update a specific recipe record', async () => {
      const response = await request(app)
        .put(`/rec/${createdRecipeId}`)
        .send({
          title: 'Updated Chocolate Cake',
          description: 'An updated delicious chocolate cake recipe',
          foodId: createdRecipeId,
        });
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: createdRecipeId,
          title: 'Updated Chocolate Cake',
          description: 'An updated delicious chocolate cake recipe',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          foodId: createdRecipeId,
        })
      );
    });
  
    // Test case: Delete a specific recipe record
    it('should delete a specific recipe record', async () => {
      const response = await request(app).delete(`/rec/${createdRecipeId}`);
      expect(response.statusCode).toBe(200);
    });
  
    // Add more test cases for other routes if needed
  });
  