import { getRepository } from "typeorm";

import { User } from "@entities";

// OPTIMIZATION IDEAS
// Most of these methods could be combined to use only one Dataloader

export const getUsers = async (userIds: number[]): Promise<any> => {
  const users = await getRepository(User).find({
    where: userIds.map(id => ({ id }))
  });

  return userIds.map(userId => users.find(user => user.id === userId));
};

export const getStoresFromUsers = async (userIds: number[]): Promise<any> => {
  const users = await getRepository(User).find({
    where: userIds.map(id => ({ id })),
    relations: ["stores"]
  });

  return userIds.map(userId => users.find(user => user.id === userId).stores);
};

export const getDefaultStoreFromUsers = async (userIds: number[]): Promise<any> => {
  // const users = await getRepository(User).find({
  //   where: userIds.map(id => ({ id })),
  //   relations: ["stores"]
  // });
  //
  // return userIds.map(userId => users.find(user => user.id === userId).stores);
};
