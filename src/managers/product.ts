import { getManager } from "typeorm";

import { Product } from "@entities";

export const createProduct = async (user, productInput): Promise<any> => {
  console.log(user);
  const product = await getManager().create(Product, productInput);
  // TODO Add the storeId
  await product.save();
};
