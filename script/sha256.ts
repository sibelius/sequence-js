import { sha256 } from 'js-sha256';

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

const reference = 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3';

const testSha = async () => {
  const key = '123';

  const s = sha256(key);

  console.log({
    key,
    s,
    e: s === reference,
  });
};

(async () => {
  try {
    await testSha();
  } catch (err) {
    // eslint-disable-next-line
    console.log("err: ", err);
  }

  process.exit(0);
})();
