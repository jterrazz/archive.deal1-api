// Inspired from https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2

import { merge } from "lodash";
import { gql } from "apollo-server-koa";
import { typeDef as User, resolvers as userResolvers } from "./User";

const Query = gql(`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`);

export const typeDefs = [Query, User];
export const resolvers = merge(userResolvers);
