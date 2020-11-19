import request from 'supertest';
import app from '../app';

it('should return 401 if authorization is missing or invalid', async () => {
  const response = await request(app.callback())
    .get('/v1/balances')
    .set({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }).send();

  expect(response.status).toBe(401);
  expect(response.body.message).toBe('Invalid credentials.');
});
