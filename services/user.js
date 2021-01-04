import * as UserRepo from '../repo/user';
import { ErrUserNotActivated, ErrUserNotExist } from '../core/error';

export const getAll = () => {
  return UserRepo.getAll();
};

export const getById = (id) => {
  return UserRepo.getById(id);
};

export const getByUsername = async (username) => {
  const user = await UserRepo.getByUsername(username);
  if (!user) {
    throw ErrUserNotExist;
  }

  if (!user.activatedAt) {
    throw ErrUserNotActivated;
  }

  return user;
};

export const getByUID = async (uid) => {
  const user = await UserRepo.getByUsername(uid);
  if (!user) {
    throw ErrUserNotExist;
  }

  if (!user.activatedAt) {
    throw ErrUserNotActivated;
  }

  return user;
};

export const create = (user) => {
  return UserRepo.create(user);
};
