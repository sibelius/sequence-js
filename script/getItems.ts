import AWS from "aws-sdk";
import { debugConsole } from '../src/debugConsole';

AWS.config.update({
  accessKeyId: "dummy",
  secretAccessKey: "dummy",
  region: "us-east-1",
  // endpoint: "http://localhost:8000",
  endpoint: "http://localhost:8888",
});

const listTables = (dynamo) => {
  return new Promise((resolve, reject) => {
    dynamo.listTables({}, (err, data) => {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
}

const scan = (client, params) => {
  return new Promise((resolve, reject) => {
    client.scan(params, (err, data) => {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  })
}

const run = async () => {
  const dynamo = new AWS.DynamoDB();
  const client = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: "decimals",
    // FilterExpression: "#user_status = :user_status_val",
    // ExpressionAttributeNames: {
    //   "#user_status": "user_status",
    // },
    // ExpressionAttributeValues: { ":user_status_val": 'somestatus' }
  }

  const data = await scan(client, params);

  debugConsole({
    data,
  });
};

(async () => {
  try {
    await run();
  } catch (err) {
    console.log(err);
  }

  process.exit(0);
})();
