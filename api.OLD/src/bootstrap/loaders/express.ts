import { config } from "@/config";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";

export default async (app: express.Application) => {
  // Body parser only needed during POST on the graphQL path
  app.use(config.graphqlPath, bodyParser.json());

  // Cors configuration
  app.use(cors());

  // Sets various HTTP headers to help protect our app
  app.use(helmet());
};
