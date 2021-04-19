import "isomorphic-fetch";
import { sequenceApi } from '../src/api';
import { authorization } from '../src/authorization';
import { debugConsole } from '../src/debugConsole';

const transfer = async () => {
  const [, , ...unsanitizedArgs] = process.argv;

  if (unsanitizedArgs.length !== 3) {
    // eslint-disable-next-line
    console.log('Usage: yarn w ./script/transfer.ts <from> <to> <amount>')
    return;
  }

  const [from, to, amountStr] = unsanitizedArgs;

  const amount = parseInt(amountStr);

  const url = `http://localhost:8910/v1/transactions`;

  const payload = {
    from,
    to,
    amount,
    currency: "BRL",
  };

  const options = {
    method: "POST",
    body: JSON.stringify(payload),
  };

  const api = sequenceApi(authorization);
  const data = await api(url, options);

  debugConsole({
    data,
  });
};

(async () => {
  try {
    await transfer();
  } catch (err) {
    // eslint-disable-next-line
    console.log("err: ", err);
  }

  process.exit(0);
})();
