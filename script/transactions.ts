import "isomorphic-fetch";
import { sequenceApi } from '../src/api';
import { authorization } from '../src/authorization';
import { debugConsole } from '../src/debugConsole';

const keys = [
  {
    name: "test",
    email: "test@decimals.app",
    "public-key": "abc",
    "secret-key-hash":
      "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3",
  },
];

// echo '123:' | base64
// const authorization = 'MTIzOg==';

const transactions = async () => {
  const [, , ...unsanitizedArgs] = process.argv;

  if (unsanitizedArgs.length !== 1) {
    // eslint-disable-next-line
    console.log('Usage: yarn w ./script/transactions.ts <account>')
    return;
  }

  const [account] = unsanitizedArgs;

  const getUrl = (account: string) => `http://localhost:8910/v1/transactions?account=${account}`

  const options = {
    method: 'GET',
  };

  const url = getUrl(account);

  const api = sequenceApi(authorization);
  const data = await api(url, options);

  debugConsole({
    data,
  });
};

(async () => {
  try {
    await transactions();
  } catch (err) {
    // eslint-disable-next-line
    console.log("err: ", err);
  }

  process.exit(0);
})();
