import { SequenceModel } from '../src/SequenceModel';
import { debugConsole } from '../src/debugConsole';

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
