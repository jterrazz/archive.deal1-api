import { gql } from "apollo-server-koa";
import * as DataLoader from "dataloader";

import { Store } from "@entities";
import { getProductsFromStores, getStores } from "@managers/store";

export const typeDef = gql`
  extend type Query {
    store(id: Int!): Store
  }

  type Store {
    id: ID
    name: String
    description: String
    products: [Product]
  }
`;

const storeLoader = new DataLoader<number, Store[]>(getStores);
const storeProductsLoader = new DataLoader<number, Store[]>(getProductsFromStores);

export const resolvers = {
  Query: {
    store: (_, { id }) => storeLoader.load(id)
  },
  Store: {
    products: (store: Store) => storeProductsLoader.load(store.id)
  }
};
