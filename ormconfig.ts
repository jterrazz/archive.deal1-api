let ormConfig: any = {
  type: "postgres",
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migrations",
    subscribersDir: "src/subscribers"
  },
  extra: {
    ssl: process.env.NODE_ENV === "production"
  }
};

if (process.env.DATABASE_URL) {
  ormConfig.url = process.env.DATABASE_URL;
} else {
  ormConfig = {
    ...ormConfig,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME || "deal41",
    username: process.env.DATABASE_USERNAME || "postgres",
    password: process.env.DATABASE_PASSWORD || "a_really_secure_password"
  };
}

module.exports = ormConfig;
