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
  const user = await UserRepo.getByUID(uid);
  if (!user) {
    throw ErrUserNotExist;
  }

  if (!user.activatedAt) {
    throw ErrUserNotActivated;
  }

  return user;
};

export const getUser = async (identifier) => {
  let user;

  // try with uid
  user = await UserRepo.getByUID(identifier);
  if (!user) {
    // try with username ??
    user = await UserRepo.getByUsername(identifier);
  }

  if (!user) {
    // try find user with email
    user = await UserRepo.getByEmail(identifier);
  }

  if (!user) {
    throw ErrUserNotExist;
  }

  if (!user.activatedAt) {
    throw ErrUserNotActivated;
  }

  delete user.password;
  return user;
};

export const create = (user) => {
  return UserRepo.create(user);
};

export const updateByUID = (uid,user) => {
  return UserRepo.updateByUID(uid,user);
}
