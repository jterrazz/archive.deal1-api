import { gql } from "apollo-server-koa";
import * as DataLoader from "dataloader";
import * as Joi from "joi";

import { getUsersProducts, getUsers } from "@managers/user";
import { AuthRoles } from "@middlewares/graphql-auth";
import { User, Product } from "@entities";

export const typeDef = gql`
  extend type Query {
    user(id: Int!): User
    users(ids: [Int!]!): [User]
  }

  extend type Mutation {
    addUser(firstName: String!): User
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    products: [Product]
  }
`;

// TODO Check if cache is cleared after two separate calls
const userLoader = new DataLoader<number, Product[]>(getUsers);
const userProductsLoader = new DataLoader<number, User[]>(getUsersProducts);

export const resolvers = {
  Query: {
    user: {
      auth: AuthRoles.User, // TODO Remove
      resolve: (_, { id }) => userLoader.load(id)
    },
    users: (_, { ids }) => ids.map((id: number) => userLoader.load(id))
  },
  Mutation: {
    addUser: {
      rules: {
        firstName: Joi.string().min(7) // TODO temp
      },
      resolve: (_, __, { user }) => console.log(user)
    }
  },
  User: {
    products: (user: User) => userProductsLoader.load(user.id)
  }
};
