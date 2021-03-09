import * as UserRepo from '../repo/user';
import {
  ErrUserNotExist,
  ErrInvalidAuthCredentials,
  ErrEmailHasBeenUsed,
  ErrUserAlreadyActivated,
  ErrUsernameHasBeenUsed,
} from '../core/error';
import {
  generateAccessToken,
  hashAndCompare,
  hashPassword,
} from '../utils/token';

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

  delete user.password;
  const authResponse = {
    user,
    accessToken: token,
  };
  return authResponse;
};

export const userActivateAccount = async ({
  uid,
  username,
  email,
  password,
  firstName,
  lastName,
  fullName,
}) => {
  let user;
  // find user with this uid, email
  user = await UserRepo.getByUID(uid);
  if (!user) {
    const err = ErrUserNotExist;
    err.fields.push({
      name: 'uid',
      error: 'user with this UID does not exist',
    });
    throw ErrUserNotExist;
  }

  if (user.activatedAt) {
    const err = ErrUserAlreadyActivated;
    err.fields.push({ name: 'uid', error: 'user has already activated' });
    throw ErrUserAlreadyActivated;
  }

  // check email existed
  const userByEmail = await UserRepo.getByEmail(email);
  if (userByEmail) {
    const err = ErrEmailHasBeenUsed;
    err.fields.push({ name: 'email', error: 'email has already been used' });
    throw ErrEmailHasBeenUsed;
  }

  // check username existed
  const userByUsername = await UserRepo.getByUsername(username);
  if (userByUsername) {
    const err = ErrUsernameHasBeenUsed;
    err.fields.push({
      name: 'username',
      error: 'username has already been used',
    });
    throw ErrUsernameHasBeenUsed;
  }

  // hashpassword
  const hashedPassword = await hashPassword(password);

  // update User profile
  await UserRepo.updateByUID(uid, {
    username,
    email,
    password: hashedPassword,
    activatedAt: new Date(),
    firstName,
    lastName,
    fullName,
  });

  const updatedUser = await UserRepo.getByUID(uid);
  delete updatedUser.password;

  // generate access token
  // now we don't use refresh token
  const token = await generateAccessToken({
    id: user._id,
    uid: user.uid,
    email: user.email,
    phone: user.phone,
    username: user.username,
  });

  return {
    user: updatedUser,
    accessToken: token,
  };
};
