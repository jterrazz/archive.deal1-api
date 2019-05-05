import { gql } from "apollo-server-koa";
import * as DataLoader from "dataloader";
import * as Joi from "joi";

import { getUsers, getStoresFromUsers, getDefaultStoreFromUsers, createUser } from "@managers/user";
import { AuthRoles } from "@middlewares/graphql-auth";
import { User, Product, Store } from "@entities";

export const typeDef = gql`
  input UserInput {
    firstName: String
    lastName: String
    email: String
    password: String
  }

  extend type Query {
    user(id: Int!): User
    users(ids: [Int!]!): [User]
  }

  extend type Mutation {
    createUser(input: UserInput!): User
    updateUser(id: ID!, input: UserInput): User
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
    user: (_, { id }) => userLoader.load(id),
    users: (_, { ids }) => ids.map((id: number) => userLoader.load(id))
  },
  Mutation: {
    createUser: {
      rules: {
        input: {
          firstName: Joi.string().required(),
          lastName: Joi.string().required(),
          email: Joi.string()
            .email()
            .required(),
          password: Joi.string()
            .min(8)
            .required()
        }
      },
      resolve: (_, { input }) => createUser(input)
    },
    updateUser: {
      auth: AuthRoles.User,
      resolve: (_, __, { user }) => console.log(user)
    }
  },
  User: {
    stores: (user: User) => userStoresLoader.load(user.id),
    defaultStore: (user: User) => userDefaultStoreLoader.load(user.id)
  }
};
