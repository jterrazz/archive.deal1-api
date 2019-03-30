import { getRepository } from "typeorm";
import * as _ from "lodash";

import { Product, User } from "@entities";

export const getUsers = async (userIds: number[]): Promise<any> =>
  await getRepository(User).find({
    where: userIds.map(id => ({ id }))
  });

export const getProductsOfUsers = async (userIds: number[]): Promise<any> => {
  const products = await getRepository(Product).find({
    where: userIds.map(id => ({ userId: id }))
  });

  return userIds.map(userId => products.filter(p => p.userId === userId));
};
