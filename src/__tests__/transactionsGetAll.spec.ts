import request from 'supertest';
import app from '../app';
import { base64 } from '../base64';

it('should return 200', async () => {
  const clientId = '123';
  const clientSecret = '';

  const token = base64(`${clientId}:${clientSecret}`);

  const authorization = `Basic ${token}`;

  const account = 'sibelius';

  const url = `/v1/transactions?account=${account}`;

  const response = await request(app.callback())
    .get(url)
    .set({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: authorization,
    }).send();

  expect(response.status).toBe(200);
  expect(response.body.message).toBe('Invalid credentials.');
});
