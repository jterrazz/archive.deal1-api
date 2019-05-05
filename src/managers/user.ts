import { getRepository, getManager } from "typeorm";
import * as bcrypt from "bcrypt";

import { User } from "@entities";
import config from "@config";

// OPTIMIZATION IDEAS
// Most of these methods could be combined to use only one Dataloader ?

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

// TODO Update to select the default one or first in fallback
export const getDefaultStoreFromUsers = async (userIds: number[]): Promise<any> => {
  const users = await getRepository(User).find({
    where: userIds.map(id => ({ id })),
    relations: ["stores"]
  });

  return userIds.map(userId => users.find(user => user.id === userId).stores[0]);
};

// TODO add restrictions for the creation of users
export const createUser = async (userInput): Promise<any> => {
  let user = await getManager().create(User, userInput);

  user.password = await bcrypt.hash(userInput.password, config.security.saltRounds);
  try {
    await user.save();
  } catch (err) {
    if (err.code === "23505") throw "Email already used";
    else throw err;
  }
};
