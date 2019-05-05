import { gql } from "apollo-server-koa";
import * as Joi from "joi";

import { createProduct } from "@managers/product";
import { AuthRoles } from "@middlewares/graphql-auth";

export const typeDef = gql`
  input ProductInput {
    title: String
    description: String
    price: Int
  }

  extend type Mutation {
    createProduct(input: ProductInput): Product
  }

  type Product {
    id: ID
    title: String
    description: String
    price: Int
  }
`;

export const resolvers = {
  Mutation: {
    createProduct: {
      auth: AuthRoles.User,
      rules: {
        input: {
          title: Joi.string().required(),
          description: Joi.string(),
          price: Joi.number()
            .positive()
            .required()
        }
      },
      resolve: (_, { input }, { user }) => createProduct(user, input)
    }
  }
};
