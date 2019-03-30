import { gql } from "apollo-server-koa";

export const typeDef = gql`
  type Product {
    title: String
    description: String
  }
`;

export const resolvers = {};
