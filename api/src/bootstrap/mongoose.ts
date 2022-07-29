import { Logger } from '@nestjs/common';
import { config } from '@/config';
import mongoose from 'mongoose';
import * as chalk from 'chalk';

// Close the Mongoose default connection is the event of application termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

export default async function (): Promise<mongoose.Mongoose> {
  let host = config.mongoDB.uri.substring(config.mongoDB.uri.indexOf('@') + 1);
  host = host.substring(0, host.indexOf('/'));
  Logger.log(
    `🥭 Connecting to Mongo database at ${chalk.yellow(host)}...`,
    'MongooseBootstrapper',
  );
  return await mongoose.connect(config.mongoDB.uri);
}
