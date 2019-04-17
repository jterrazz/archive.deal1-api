import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-koa";
import { makeExecutableSchema } from "graphql-tools";
import { applyMiddleware } from "graphql-middleware";

import auth from "./auth";
import logs from "@logs";
import config from "@config";
import validationMiddleware from "@middlewares/graphql-validation";
import authMiddleware from "@middlewares/graphql-auth";
import { router } from "./routes";
import { typeDefs, resolvers } from "./schemas";
import * as session from "koa-session";

import "reflect-metadata"; // TypeORM Requirement

const app = new Koa();

// Will sign the cookies
app.keys = ["newest secret key", "older secret key"];

const sessionOptions: Partial<session.opts> = {
  // store: redisStore({}),
  maxAge: 1000 * 60 * 60 * 24 * 14
};
// {
//   secret: 'asdasdsada',
//   resave: false,
//   saveUninitialized: true
// }

app.use(session(sessionOptions, app));
// App middlewares

app.use(auth());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

// GraphQL // TODO Put in /graphql only

const schema = makeExecutableSchema({ typeDefs, resolvers });
const schemaWithMiddleware = applyMiddleware(schema, authMiddleware, validationMiddleware);
const apolloServer = new ApolloServer({
  mocks: false,
  schema: schemaWithMiddleware,
  context: ({ ctx }) => ({ user: ctx.state.user })
});
apolloServer.applyMiddleware({ app });

createConnection()
  .then(() => {
    logs.info(`Database connected`);

    app.listen(config.port, () => {
      logs.info(`API available at http://localhost:${config.port} 🥰`);
      logs.info(`GraphQL available at http://localhost:${config.port}/graphql`);
    });
  })
  .catch(err => {
    logs.error(err);
    process.exit();
  });
