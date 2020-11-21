export const transactionsGet = async (ctx) => {
  const { id } = ctx.params;
  // ctx.params['transaction-id']

  ctx.status = 200;
};
