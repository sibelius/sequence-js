import { unbase64 } from './base64';
import { sha256 } from 'js-sha256';

export const keys = [
  {
    name: "test",
    email: "test@decimals.app",
    "public-key": "abc",
    "secret-key-hash":
      "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3",
  },
];

export const auth = async (ctx, next) => {
  const { authorization } = ctx.headers;

  if (!authorization) {
    ctx.status = 401;
    ctx.body = {
      message: 'Invalid credentials.'
    };

    return;
  }

  const [tokenType, accessToken] = authorization.split(' ');

  const value = unbase64(accessToken);

  const [clientId, clientSecret] = value.split(':');

  const digest = sha256(clientId);

  const customer = keys.find(k => k['secret-key-hash'] === digest);

  console.log({
    tokenType,
    accessToken,
    clientId,
    clientSecret,
    value,
    customer,
    digest,
  });

  ctx.customer = customer;

  await next();
};
