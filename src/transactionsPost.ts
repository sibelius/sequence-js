import * as yup from 'yup';

type Transaction = {
  from: string,
  to: string,
  amount: number,
  currency: string,
  metadata: any, // improve this
}

const transactionSchema = yup.object().shape({
  from: yup.string().required(), // length > 1
  to: yup.string().required(), // length > 1
  amount: yup.number().required(), // integer
  currency: yup.string().required(), // length > 1
})

export const transactionsPost = async (ctx) => {
  const tx: Transaction = ctx.request.body;

  try {
    // validate transaction
    const isValid = await transactionSchema.validate(tx);

  } catch (error) {
    console.log({ error });
    if (error instanceof yup.ValidationError) {
      ctx.status = 400;
      ctx.body = {
        error: error.message,
      };
      return;
    }

    ctx.status = 400;
    ctx.body = {
      error: error.message,
    };
    return;
  }

  ctx.status = 200;
  ctx.body = {
    message: 'Insufficient funds, check origin account balance.',
  };
};
