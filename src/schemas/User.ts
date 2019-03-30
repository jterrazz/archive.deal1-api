import { gql } from "apollo-server-koa";

export const typeDef = gql(`
  extend type Query {
    user: User
  }

  type User {
    name: String
  }
`);

export const resolvers = {
  Query: {
    user: () => ({ name: "JB" })
  }
};
