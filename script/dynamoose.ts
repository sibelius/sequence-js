import { SequenceModel } from '../src/sequence';
import { debugConsole } from '../../../feedback-server/packages/graphql';

const play = async () => {
  debugConsole(await SequenceModel.table.create.request());
};

(async () => {
  try {
    await play();
  } catch (err) {
    // eslint-disable-next-line
    console.log("err: ", err);
  }

  process.exit(0);
})();
