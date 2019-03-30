import * as Joi from "joi";
import logs from "@logs";

require("dotenv").config();

const environmentSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .allow(["local", "development", "staging", "production"])
      .required(),
    PORT: Joi.number().default(8080)
  })
  .unknown()
  .required();

const { error, value: env } = Joi.validate(process.env, environmentSchema);

if (error) {
  logs.error(`Environment variables are missing or are invalid: ${error.message}`);
  process.exit();
}

const globalConfig = {
  env: env.NODE_ENV,
  isDev: env.NODE_ENV !== "production",
  isLocal: env.NODE_ENV === "local",
  port: env.PORT
};

export default globalConfig;
