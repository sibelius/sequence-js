export const transactionsGetAll = async (ctx) => {
  const { account } = ctx.query;

  ctx.status = 200;
};
