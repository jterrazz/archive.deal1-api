import { getRepository } from "typeorm";

import { Product, Store } from "@entities";

export const getStores = async (storeIds: number[]): Promise<any> => {
  const stores = await getRepository(Store).find({ where: storeIds.map(id => ({ id })) });

  return storeIds.map(storeId => stores.find(store => store.id === storeId));
};

export const getProductsFromStores = async (storeIds: number[]): Promise<any> => {
  // TODO Add pagination
  const products = await getRepository(Product).find({ where: storeIds.map(storeId => ({ storeId })) });

  return storeIds.map(storeId => products.filter(product => product.storeId === storeId));
};
