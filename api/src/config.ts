import * as dotenv from 'dotenv';
dotenv.config();

// Safely get the environment variable in the process
const env = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing: process.env['${name}'].`);
  }

  return value;
};

export interface Config {
  jwt_secret: string;
  port: number;
  graphqlPath: string;
  isDev: boolean;
  mongoDB: {
    uri: string;
  };
}

// All your secrets, keys go here
export const config: Config = {
  jwt_secret: env('JWT_SECRET'),
  port: Number.parseInt(env('PORT')),
  graphqlPath: env('GRAPHQL_PATH'),
  isDev: env('NODE_ENV') === 'development',
  mongoDB: {
    uri: env('MONGODB_URI'),
  },
};
