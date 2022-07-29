import { config } from "@/config";
import { buildSchema } from "@/utils/buildSchema";
import { ApolloServer } from "apollo-server-express";

export default async () => {
  const schema = await buildSchema();

  return new ApolloServer({
    schema,
    playground: config.isDev,
  });
};
