'use strict';
const request = require('supertest');
const app = require('../src/server');

describe('API Tests', () => {
  // Test for a bad route
  it('should return 404 for a bad route', async () => {
    const response = await request(app).get('/bad-route');
    expect(response.status).toBe(404);
  });

  // Test for a bad method
  it('should return 404 for a bad method', async () => {
    const response = await request(app).put('/food');
    expect(response.status).toBe(404);
  });

  // Test create a record using POST
  it('should create a new record using POST', async () => {
    const response = await request(app)
      .post('/food')
      .send({ name: 'Example Food' });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Example Food');
  });

  // Test read a list of records using GET
  it('should read a list of records using GET', async () => {
    const response = await request(app).get('/food');
    expect(response.status).toBe(200);
    // Add more assertions to check the returned data
  });

  // Test read a record using GET
  it('should read a record using GET', async () => {
    // Create a new record
    const createResponse = await request(app)
      .post('/food')
      .send({ name: 'Example Food' });
    const { id } = createResponse.body;

    // Read the created record
    const readResponse = await request(app).get(`/food/${id}`);
    expect(readResponse.status).toBe(200);
    expect(readResponse.body.name).toBe('Example Food');
  });

  // Test update a record using PUT
  it('should update a record using PUT', async () => {
    // Create a new record
    const createResponse = await request(app)
      .post('/food')
      .send({ name: 'Example Food' });
    const { id } = createResponse.body;

    // Update the created record
    const updateResponse = await request(app)
      .put(`/food/${id}`)
      .send({ name: 'Updated Food' });
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.name).toBe('Updated Food');
  });

  // Test destroy a record using DELETE
  it('should destroy a record using DELETE', async () => {
    // Create a new record
    const createResponse = await request(app)
      .post('/food')
      .send({ name: 'Example Food' });
    const { id } = createResponse.body;

    // Delete the created record
    const deleteResponse = await request(app).delete(`/food/${id}`);
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.id).toBe(id);
  });
});