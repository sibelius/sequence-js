import { timeSpan } from './timeSpan';
import { debugConsole } from './debugConsole';

export const apiWithLog = (init, options) => {
  const end = timeSpan();

  return fetch(init, options).then(async (response) => {
    const durationTime = end();

    const text = await response.text();
    let json;

    try {
      json = JSON.parse(text);
    } catch (err) {
      // eslint-disable-next-line
    }

    const Response = fetch.Response || global.Response || response.constructor;

    // if (process.env.DEBUG === 'true') {
      // eslint-disable-next-line
      const { agent, ...optionsWithoutAgent } = options;
      // eslint-disable-next-line
      debugConsole({
        time: `${durationTime}ms`,
        init,
        options: optionsWithoutAgent,
        text,
        json,
        ok: response.ok,
        status: response.status,
      });
    // }

    // `clone()` is broken in `node-fetch` and results in a stalled Promise
    // for responses above a certain size threshold. So construct a similar
    // clone ourselves...
    const responseCopy = new Response(text, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      // These are not spec-compliant `Response` options, but `node-fetch`
      // has them.
      ok: response.ok,
      size: response.size,
      url: response.url,
    });

    return responseCopy;
  });
};
