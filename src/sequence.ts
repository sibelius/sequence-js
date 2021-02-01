import * as dynamoose from "dynamoose";

dynamoose.aws.ddb.local();

const SequenceSchema = new dynamoose.Schema({
  PK: {
    type: String,
    hashKey: true, // Technically this isn't needed since it's the first key in the object it will default to true for this, but I added it in to be verbose.
    index: {
      global: true,
      name: "LSI1", // Kinda a strange name here, it's a global index but it's name indicates it's a LocalSecondaryIndex? Kinda strange name, but just trying to match the file you sent me.
      rangeKey: "LSI1_SK",
    },
  },
  SK: {
    type: String,
    rangeKey: true,
  },
  GSI1_PK: {
    type: String,
    index: {
      global: true,
      name: "GSI1",
      rangeKey: "GSI1_SK",
    },
  },
  GSI1_SK: String,
  currency: String,
  timestamp: String, // Could also convert this to the Dynamoose `Date` type at some point, but that would likely require more in depth changes to your system.
  LSI1_SK: String,
});
export const SequenceModel = dynamoose.model("sequence", SequenceSchema);
