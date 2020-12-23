import * as UserRepo from '../repo/user';

export const getAll = () => {
  return UserRepo.getAll();
};

export const getById = (id) => {
  return UserRepo.getById(id);
};

export const getByUsername = (username) => {
  return UserRepo.getByUsername(username);
};

export const create = (user) => {
  return UserRepo.create(user);
};
