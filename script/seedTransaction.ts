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

const transactionOutput = {
  amount: 100,
  date: "2020-11-21T12:10:01.102Z",
  currency: "BRL",
  balance: 100,
  from: "abc",
  id: "ed8f1221f490ea667bde5719cbc2b9ce",
  to: "sibelius",
};

type Transaction = {
  amount: number;
  date: string;
  currency: string;
  balance: number;
  from: string;
  id: string;
  to: string;
};

// echo '123:' | base64
const authorization = "MTIzOg==";

const errorExample = {
  error: {
    "clojure.spec.alpha/problems": [
      {
        path: [],
        pred: [
          "clojure.core/fn",
          ["%"],
          ["clojure.core/contains?", "%", "amount"],
        ],
        val: {
          from: "abc",
          to: "sibelius",
          currency: "BRL",
        },
        via: ["decimals.transactions/transaction"],
        in: [],
      },
    ],
    "clojure.spec.alpha/spec": "decimals.transactions/transaction",
    "clojure.spec.alpha/value": {
      from: "abc",
      to: "sibelius",
      currency: "BRL",
    },
  },
};

const seeTransaction = async () => {
  const url = `http://localhost:8910/v1/transactions`;

  const payload = {
    from: keys[0]["public-key"],
    to: "sibelius",
    // amount: 100,
    currency: "BRL",
  };

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${authorization}`,
    },
    body: JSON.stringify(payload),
  };

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
    await seeTransaction();
  } catch (err) {
    // eslint-disable-next-line
    console.log("err: ", err);
  }

  process.exit(0);
})();
