import { config } from "@/config";
import mongoose from "mongoose";

// Close the Mongoose default connection is the event of application termination
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

export const mongoDBConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// removes deprecated warnings due to third-party libraries
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Your Mongoose setup goes here
export default async (): Promise<mongoose.Mongoose> =>
  mongoose.connect(config.mongoDB.uri, mongoDBConfig);
