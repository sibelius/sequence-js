import "isomorphic-fetch";
import { debugConsole } from '../src/debugConsole';
import AWS from 'aws-sdk';
import SequenceModel from '../src/SequenceModel';

AWS.config.update({
  accessKeyId: 'dummy',
  secretAccessKey: 'dummy',
  region: 'us-east-1',
  // endpoint: "http://localhost:8000",
  endpoint: "http://localhost:8888",
});

const query = (client, params) => {
  return new Promise((resolve, reject) => {
    client.query(params, (err, data) => {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  })
}

// list of genesis
export const getGenesis = async (client, publicKey: string, account: string) => {
  const pk = `${publicKey}#${account}`;
  const sk = account;

  const params = {
    TableName: "decimals",
    KeyConditionExpression: 'PK = :pk and begins_with(SK, :sk)',
    ExpressionAttributeValues: {
      ':pk': pk,
      ':sk': sk,
    },
    ScanIndexForward: false,
  };

  const data = await query(client, params);

  return data?.Items;
};

export const queryBalance = async (client, publicKey: string, account: string, currency: string) => {
  const pk = `${publicKey}#${account}`;

  const params = {
    IndexName: 'LSI1',
    TableName: "decimals",
    KeyConditionExpression: 'PK = :pk',
    FilterExpression: 'currency = :currency',
    ExpressionAttributeValues: {
      ':pk': pk,
      ':currency': currency,
    },
    ScanIndexForward: false,
  };

  const data = await query(client, params);

  return data.Items;
}

export const listAccounts = async (client, publicKey: string) => {
  const pk = publicKey;

  const params = {
    TableName: "decimals",
    KeyConditionExpression: 'PK = :pk',
    ExpressionAttributeValues: {
      ':pk': pk,
    },
    ScanIndexForward: false,
  };

  const data = await query(client, params);

  return data.Items;
}

export const getTransactions = async (client, publicKey: string, account: string) => {
  const pk = `${publicKey}#${account}`;

  const params = {
    IndexName: 'LSI1',
    TableName: "decimals",
    KeyConditionExpression: 'PK = :pk',
    ExpressionAttributeValues: {
      ':pk': pk,
    },
    ScanIndexForward: false,
  };

  const data = await query(client, params);

  return data?.Items;
};

const transactions = async () => {
  const [, , ...unsanitizedArgs] = process.argv;

  if (unsanitizedArgs.length !== 1) {
    // eslint-disable-next-line
    console.log('Usage: yarn w ./script/transactions.ts <account>')
    return;
  }

  const [account] = unsanitizedArgs;
  const currency = 'BRL';

  const client = new AWS.DynamoDB.DocumentClient();

  const publicKey = 'abc';

  const allTransactions = await getTransactions(client, publicKey, account);

  debugConsole({
    allTransactions,
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
