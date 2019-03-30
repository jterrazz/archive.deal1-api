import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import { createConnection } from "typeorm";

import logs from "@logs";
import config from "@config";

import "reflect-metadata"; // TypeORM Requirement

const app = new Koa();

app.use(bodyParser());

createConnection()
  .then(() => {
    logs.info(`Database is connected 🥰`);

    app.listen(config.port, () =>
      logs.info(`API is listening - PORT: ${config.port} 🥰`)
    );
  })
  .catch(err => {
    logs.error(err);
    process.exit();
  });
