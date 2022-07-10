import express from "express";
import { ApolloServer } from "apollo-server-express";
import apolloLoader from "@/bootstrap/loaders/apollo";
import expressLoader from "@/bootstrap/loaders/express";
import mongooseLoader from "@/bootstrap/loaders/mongoose";

export default async (app: express.Application): Promise<ApolloServer> => {
  // Load everything related to express
  await expressLoader(app);

  // Connect to mongoose
  await mongooseLoader();

  // load apollo server config
  return apolloLoader();
};
