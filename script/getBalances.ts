import "isomorphic-fetch";

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
const authorization = 'MTIzOg==';

const getBalances = async () => {
  const account = "sibelius";

  const getUrl = (account: string) => `http://localhost:8910/v1/transactions?account=${account}`

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${authorization}`,
    },
  };

  const url = getUrl(account);

  const response = await fetch(url, options);

  console.log({
    ok: response.ok,
  });
  if (response.ok) {
    const data = await response.json();

    console.log({
      data,
    });
  } else {
    const data = await response.text();

    console.log({
      data,
    });
  }

};

(async () => {
  try {
    await getBalances();
  } catch (err) {
    // eslint-disable-next-line
    console.log("err: ", err);
  }

  process.exit(0);
})();
