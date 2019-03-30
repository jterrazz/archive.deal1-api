import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-koa";
import { makeExecutableSchema } from "graphql-tools";
import { applyMiddleware } from "graphql-middleware";

import logs from "@logs";
import config from "@config";
import validationMiddleware from "@middlewares/graphql-validation";
import { router } from "./routes";
import { typeDefs, resolvers } from "./schemas";

import "reflect-metadata"; // TypeORM Requirement

const app = new Koa();

// GraphQL

const schema = makeExecutableSchema({ typeDefs, resolvers });
const schemaWithMiddleware = applyMiddleware(schema, validationMiddleware);
const apolloServer = new ApolloServer({
  mocks: false,
  schema: schemaWithMiddleware
});

// App middlewares

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
