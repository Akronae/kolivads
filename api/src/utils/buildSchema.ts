import Container from "typedi";
import { ObjectId } from "mongodb";
import { buildSchema as typeGraphqlBuildSchema } from "type-graphql";

import { resolvers } from "@/modules";

import { MongoObjectIdScalar } from "@/utils/MongoObjectIdScalar";

export const buildSchema = () =>
  typeGraphqlBuildSchema({
    resolvers,
    container: Container,
    scalarsMap: [{ type: ObjectId, scalar: MongoObjectIdScalar }],
  });
