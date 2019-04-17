import { gql } from "apollo-server-koa";
import * as DataLoader from "dataloader";
import * as Joi from "joi";

import { getUsers, getStoresFromUsers, getDefaultStoreFromUsers } from "@managers/user";
import { AuthRoles } from "@middlewares/graphql-auth";
import { User, Product, Store } from "@entities";

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
    stores: [Store]
    defaultStore: Store
  }
`;

// TODO Check if cache is cleared after two separate calls
const userLoader = new DataLoader<number, Product[]>(getUsers);
const userStoresLoader = new DataLoader<number, Store[]>(getStoresFromUsers);
const userDefaultStoreLoader = new DataLoader<number, Store[]>(getDefaultStoreFromUsers);

export const resolvers = {
  Query: {
    user: {
      // auth: AuthRoles.User, // TODO Remove
      resolve: (_, { id }) => userLoader.load(id)
    },
    users: (_, { ids }) => ids.map((id: number) => userLoader.load(id))
  },
  Mutation: {
    addUser: {
      rules: {
        // firstName: Joi.string().min(7) // TODO temp
      },
      resolve: (_, __, { user }) => console.log(user) // TODO
    }
  },
  User: {
    stores: (user: User) => userStoresLoader.load(user.id),
    defaultStore: (user: User) => userDefaultStoreLoader.load(user.id)
  }
};
