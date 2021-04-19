import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: 'dummy',
  secretAccessKey: 'dummy',
  region: 'us-east-1',
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

const run = async () => {
  const dynamo = new AWS.DynamoDB();

  const data = await listTables(dynamo);

  console.log(data)
};

(async () => {
  try {
    await run();
  } catch (err) {
    console.log(err);
  }

  process.exit(0);
})();
