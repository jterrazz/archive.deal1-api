import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-koa";

import logs from "@logs";
import config from "@config";
import { router } from "./routes";
import { typeDefs, resolvers } from "./schemas";

import "reflect-metadata"; // TypeORM Requirement

const app = new Koa();
const apolloServer = new ApolloServer({ typeDefs, resolvers });

// Middlewares

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
apolloServer.applyMiddleware({ app });

createConnection()
  .then(() => {
    logs.info(`Database connected`);

    app.listen(config.port, () => {
      logs.info(`Server alive - PORT: ${config.port} 🥰`);
      logs.info(`GraphQL available at http://localhost:${config.port}/graphql`);
    });
  })
  .catch(err => {
    logs.error(err);
    process.exit();
  });
