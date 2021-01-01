import * as UserRepo from '../repo/user';
import { APIError } from '../core/error';

// errors
const ErrUserNotActivated = APIError({
  code: 'USER_NOT_ACTIVATED',
  status: 401,
  message: 'user/profile has not been activated',
});

const ErrUserNotExist = APIError({
  code: 'USER_NOT_FOUND',
  status: 404,
  message: 'user/profile uid not found in this system',
});

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
  const user = await UserRepo.getByUsername(username);
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
