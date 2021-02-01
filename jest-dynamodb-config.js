module.exports = {
  tables: [
    {
      TableName: "sequence",
      ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
      AttributeDefinitions: [
        { AttributeName: "PK", AttributeType: "S" },
        { AttributeName: "SK", AttributeType: "S" },
        { AttributeName: "GSI1_PK", AttributeType: "S" },
        { AttributeName: "LSI1_SK", AttributeType: "S" },
        { AttributeName: "GSI1_SK", AttributeType: "S" },
      ],
      KeySchema: [
        { AttributeName: "PK", KeyType: "HASH" },
        { AttributeName: "SK", KeyType: "RANGE" },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: "LSI1",
          KeySchema: [
            { AttributeName: "PK", KeyType: "HASH" },
            { AttributeName: "LSI1_SK", KeyType: "RANGE" },
          ],
          Projection: { ProjectionType: "ALL" },
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
        {
          IndexName: "GSI1",
          KeySchema: [
            { AttributeName: "GSI1_PK", KeyType: "HASH" },
            { AttributeName: "GSI1_SK", KeyType: "RANGE" },
          ],
          Projection: { ProjectionType: "ALL" },
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      ],
    },
  ],
};
