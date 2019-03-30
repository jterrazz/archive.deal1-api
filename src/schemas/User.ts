import { gql } from "apollo-server-koa";
import { getProductsOfUsers, getUsers, getUser } from "@managers/user";
import * as DataLoader from "dataloader";

export const typeDef = gql`
  extend type Query {
    user(id: Int!): User
    users(ids: [Int!]!): [User]
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    products: [Product]
  }
`;

const productsLoader = new DataLoader<number, object[]>(getProductsOfUsers);

export const resolvers = {
  Query: {
    user: (_, { id }) => getUser(id),
    users: (_, { ids }) => getUsers(ids)
  },
  User: {
    products: user => productsLoader.load(user.id)
  }
};
