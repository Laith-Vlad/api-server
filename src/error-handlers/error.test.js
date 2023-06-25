const request = require('supertest');
const app = require('../server'); // Import your server application
describe('Error Handlers', () => {
    // Test case: 404 error handler
    it('should handle 404 errors', async () => {
      const response = await request(app).get('/nonexistent-route');
  
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: 'Not found' });
    });
  
    // Test case: Custom error handler
    it('should handle custom errors', async () => {
      const response = await request(app).post('/food');
  
      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ error: 'Internal server error' });
    });
  
    // Add more test cases for other error handlers if needed
  });
  
