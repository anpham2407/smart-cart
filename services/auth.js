import * as UserRepo from '../repo/user';
import { ErrUserNotExist, ErrInvalidAuthCredentials } from '../core/error';
import { generateAccessToken, hashAndCompare } from '../utils/token';

// userLogin tries fuzzy login with id can be username/email/phone
export const userLogin = async ({ id, password }) => {
  let user;

  // try find user with email
  user = await UserRepo.getByEmail(id);

  if (!user) {
    // try find user with phone
    user = await UserRepo.getByPhone(id);
  }

  if (!user) {
    // try with username ??
    user = await UserRepo.getByUsername(id);
  }

  if (!user) {
    throw ErrUserNotExist;
  }

  // validate password
  const matched = await hashAndCompare(password, user.password);
  if (!matched) {
    throw ErrInvalidAuthCredentials;
  }

  // generate access token
  // now we don't use refresh token
  const token = await generateAccessToken({
    id: user._id,
    uid: user.uid,
    email: user.email,
    phone: user.phone,
    username: user.username,
  });

  const authResponse = {
    ...user,
    accessToken: token,
  };
  delete authResponse.password;
  return authResponse;
};
