// Structure inspired from https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2
// Using dataloaders for N+1 queries https://codeburst.io/using-dataloader-with-graphql-a-concrete-example-9b21352f1676

import { merge } from "lodash";
import { gql } from "apollo-server-koa";

import { typeDef as User, resolvers as userResolvers } from "./User";
import { typeDef as Product, resolvers as productResolvers } from "./Product";

const Query = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

export const typeDefs = [Query, User, Product];
export const resolvers = merge(userResolvers, productResolvers);
