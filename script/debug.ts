import "isomorphic-fetch";
import { sequenceApi } from '../src/api';
import { authorization } from '../src/authorization';
import { debugConsole } from '../src/debugConsole';

const debug = async () => {
  const url = `http://localhost:8910/v1/debug`;

  const options = {
    method: "GET",
  };

  const api = sequenceApi(authorization);

  const data = await api(url, options);

  debugConsole({
    data,
  })
};

(async () => {
  try {
    await debug();
  } catch (err) {
    // eslint-disable-next-line
    console.log("err: ", err);
  }

  process.exit(0);
})();
