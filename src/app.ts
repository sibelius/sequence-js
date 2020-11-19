import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import convert from "koa-convert";
import cors from "koa-cors";

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

const auth = async (ctx, next) => {
  ctx.status = 401;
  return;

  await next();
};

router.use(auth);

router.post('/v1/transactions', async (ctx) => {
  ctx.status = 200;
});

router.get('/v1/transactions/:transaction-id', async (ctx) => {
  const { id } = ctx.params;

  ctx.status = 200;
})

router.get('/v1/transactions', async (ctx) => {
  const { account } = ctx.query;

  ctx.status = 200;
});

router.get('/v1/balances', async (ctx) => {
  const { account } = ctx.query;

  ctx.status = 200;
})

app.use(router.routes()).use(router.allowedMethods());

export default app;
