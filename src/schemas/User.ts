import { gql } from "apollo-server-koa";
import * as DataLoader from "dataloader";

import { getUsersProducts, getUsers } from "@managers/user";
import { User, Product } from "@entities";

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

const userLoader = new DataLoader<number, Product[]>(getUsers);
const userProductsLoader = new DataLoader<number, User[]>(getUsersProducts);

export const resolvers = {
  Query: {
    user: (_, { id }) => userLoader.load(id),
    users: (_, { ids }) => ids.map((id: number) => userLoader.load(id))
  },
  User: {
    products: (user: User) => userProductsLoader.load(user.id)
  }
};
