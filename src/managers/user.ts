import { getRepository } from "typeorm";

import { Product, User } from "@entities";

export const getUsers = async (userIds: number[]): Promise<any> => {
  const users = await getRepository(User).find({
    where: userIds.map(id => ({ id }))
  });

  return userIds.map(userId => users.find(user => user.id === userId));
};

export const getUsersProducts = async (userIds: number[]): Promise<any> => {
  const products = await getRepository(Product).find({
    where: userIds.map(userId => ({ userId }))
  });

  return userIds.map(userId => products.filter(p => p.userId === userId));
};
