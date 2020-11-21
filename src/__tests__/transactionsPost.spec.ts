import request from 'supertest';
import app from '../app';
import { base64 } from '../base64';

it('should return 400 for invalid transaction', async () => {
  const clientId = '123';
  const clientSecret = '';

  const token = base64(`${clientId}:${clientSecret}`);

  const authorization = `Basic ${token}`;

  const url = `/v1/transactions`;

  const payload = {
    currency: 'BRL',
    from: 'andrios',
    to: 'lucas',
  };

  const response = await request(app.callback())
    .post(url)
    .set({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: authorization,
    })
    .send(JSON.stringify(payload));

  expect(response.status).toBe(400);
  expect(response.body).toEqual({
    error: 'amount is a required field',
  });
});
