import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import convert from "koa-convert";
import cors from "koa-cors";
import { sha256 } from 'js-sha256';
import { unbase64 } from './base64';
import { auth } from './auth';
import { transactionsPost } from './transactionsPost';
import { transactionsGet } from './transactionsGet';
import { transactionsGetAll } from './transactionsGetAll';

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(convert(cors({ maxAge: 86400, credentials: true })));

router.get('/', ctx => {
  const info = [
    'POST /v1/transactions',
    'GET /v1/transactions?account={id}',
    'GET /v1/balances?account={id}'
  ]

  ctx.status = 200;
  ctx.body = info.join('\n');
});

const keys = [
  {
    name: "test",
    email: "test@decimals.app",
    "public-key": "abc",
    "secret-key-hash":
      "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3",
  },
];

router.use(auth);

router.post('/v1/transactions', transactionsPost);

router.get('/v1/transactions/:transaction-id', transactionsGet);

router.get('/v1/transactions', transactionsGetAll);

router.get('/v1/balances', async (ctx) => {
  const { account } = ctx.query;

  ctx.status = 200;
})

app.use(router.routes()).use(router.allowedMethods());

export default app;
